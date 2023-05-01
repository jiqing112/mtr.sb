package main

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"git.esd.cc/imlonghao/mtr.sb/proto"
	"github.com/gin-gonic/gin"
	"github.com/ip2location/ip2location-go/v9"
	jsoniter "github.com/json-iterator/go"
	"github.com/json-iterator/go/extra"
	"github.com/spf13/viper"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"io"
	"log"
	"net/http"
	"os"
	"sync"
	"time"
)

type Result struct {
	Node string
	Data interface{}
}

type Server struct {
	Name     string
	Provider string
	Country  string
	Location string
	AffLink  string
	Url      string
	Conn     proto.MtrSbWorkerClient `json:"-"`
}

var (
	serverList map[string]*Server
	json       = jsoniter.ConfigCompatibleWithStandardLibrary
	ipDB       *ip2location.DB
)

func init() {
	serverList = make(map[string]*Server)
	extra.SetNamingStrategy(extra.LowerCaseWithUnderscores)
}

func serverListHandler(c *gin.Context) {
	b, _ := json.Marshal(serverList)
	c.String(http.StatusOK, "%s", b)
}

func ipHandler(c *gin.Context) {
	ip, ok := c.GetQuery("t")
	if !ok {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	results, err := ipDB.Get_all(ip)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	c.String(http.StatusOK, "%s, %s, %s", results.City, results.Region, results.Country_long)
}

func pingHandler(c *gin.Context) {
	c.Writer.Header().Set("Content-Type", "text/event-stream")
	c.Writer.Header().Set("Cache-Control", "no-cache")
	c.Writer.Header().Set("Connection", "keep-alive")
	c.Writer.Header().Set("Transfer-Encoding", "chunked")
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	target := c.Query("host")
	ctx, cancel := context.WithTimeout(c.Request.Context(), time.Second*10)
	defer cancel()

	clientChan := make(chan string)
	doneChan := make(chan bool)

	var wg sync.WaitGroup

	for hostname, server := range serverList {
		wg.Add(1)
		go func(hostname string, connection proto.MtrSbWorkerClient) {
			defer wg.Done()
			r, err := connection.Ping(ctx, &proto.PingRequest{
				Host:     target,
				Protocol: 0,
			})
			if err != nil {
				log.Printf("could not greet: %v", err)
				return
			}
			for {
				pingResponse, err := r.Recv()
				if err == io.EOF {
					log.Printf("EOF!")
					break
				}
				if err != nil {
					log.Printf("could not greet: %v", err)
					break
				}
				if pingResponse == nil {
					continue
				}
				a, _ := json.Marshal(Result{
					Node: hostname,
					Data: pingResponse.Response,
				})
				log.Printf("%s", a)
				clientChan <- string(a)
			}
		}(hostname, server.Conn)
	}

	go func() {
		wg.Wait()
		doneChan <- true
	}()

	c.Stream(func(w io.Writer) bool {
		select {
		case msg := <-clientChan:
			c.SSEvent("message", msg)
			return true
		case <-doneChan:
			return false
		}
	})
}

func getParam(m map[string]interface{}, k string) string {
	if s, ok := m[k]; ok {
		return s.(string)
	} else {
		return ""
	}
}

func main() {
	viper.SetConfigName("server")
	viper.SetConfigType("hcl")
	viper.AddConfigPath("/etc/mtr.sb/")
	viper.AddConfigPath("./")
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("fatal error config file: %w", err)
	}
	//
	cert, err := tls.LoadX509KeyPair(viper.GetString("cert_path"), viper.GetString("key_path"))
	if err != nil {
		log.Fatalf("tls.LoadX509KeyPair err: %v", err)
	}
	certPool := x509.NewCertPool()
	ca, err := os.ReadFile(viper.GetString("worker_ca_path"))
	if err != nil {
		log.Fatalf("ioutil.ReadFile err: %v", err)
	}
	if ok := certPool.AppendCertsFromPEM(ca); !ok {
		log.Fatalf("certPool.AppendCertsFromPEM err")
	}
	c := credentials.NewTLS(&tls.Config{
		Certificates: []tls.Certificate{cert},
		RootCAs:      certPool,
	})
	// Set up a connection to the server.
	nodes := viper.Get("nodes").([]map[string]interface{})
	for _, node := range nodes {
		n := Server{
			Name:     getParam(node, "name"),
			Provider: getParam(node, "provider"),
			Country:  getParam(node, "country"),
			Location: getParam(node, "location"),
			AffLink:  getParam(node, "aff"),
			Url:      getParam(node, "url"),
			Conn:     nil,
		}
		conn, err := grpc.Dial(n.Url, grpc.WithTransportCredentials(c))
		if err != nil {
			log.Fatalf("did not connect: %v", err)
		}
		client := proto.NewMtrSbWorkerClient(conn)
		n.Conn = client
		serverList[n.Name] = &n
	}

	// ip2location
	ipDB, err = ip2location.OpenDB(viper.GetString("ip2location_db_path"))
	if err != nil {
		log.Fatalf("fail to load ip2location db: %v", err)
	}

	router := gin.Default()
	api := router.Group("/api")
	api.GET("/ping", pingHandler)
	api.GET("/servers", serverListHandler)
	api.GET("/ip", ipHandler)
	router.NoRoute(gin.WrapH(http.FileServer(gin.Dir("build", false))))
	router.Run(":8085")
}
