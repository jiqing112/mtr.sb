package main

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"git.esd.cc/imlonghao/mtr.sb/proto"
	"github.com/gin-gonic/gin"
	jsoniter "github.com/json-iterator/go"
	"github.com/json-iterator/go/extra"
	"github.com/spf13/viper"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"io"
	"log"
	"os"
	"sync"
	"time"
)

type Result struct {
	Node string
	Data interface{}
}

var (
	serverList map[string]proto.MtrSbWorkerClient
	json       = jsoniter.ConfigCompatibleWithStandardLibrary
)

func init() {
	serverList = make(map[string]proto.MtrSbWorkerClient)
	extra.SetNamingStrategy(extra.LowerCaseWithUnderscores)
}

func ping(c *gin.Context) {
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

	for hostname, connection := range serverList {
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
		}(hostname, connection)
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

func main() {
	viper.SetConfigName("config")
	viper.SetConfigType("hcl")
	viper.AddConfigPath(".")
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
		conn, err := grpc.Dial(node["url"].(string), grpc.WithTransportCredentials(c))
		if err != nil {
			log.Fatalf("did not connect: %v", err)
		}
		client := proto.NewMtrSbWorkerClient(conn)
		conn.GetState()
		serverList[node["name"].(string)] = client
	}

	router := gin.Default()
	router.GET("/ping", ping)
	router.Run(":8085")
}
