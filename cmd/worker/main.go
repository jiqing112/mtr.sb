package main

import (
	"crypto/tls"
	"crypto/x509"
	"git.esd.cc/imlonghao/mtr.sb/pkgs/worker"
	"git.esd.cc/imlonghao/mtr.sb/proto"
	"github.com/spf13/viper"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"log"
	"net"
	"os"
)

func main() {
	viper.SetConfigName("worker")
	viper.SetConfigType("hcl")
	viper.AddConfigPath("/etc/mtr.sb/")
	viper.AddConfigPath("./")
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("fatal error config file: %w", err)
	}
	cert, err := tls.LoadX509KeyPair(viper.GetString("cert_path"), viper.GetString("key_path"))
	if err != nil {
		log.Fatalf("tls.LoadX509KeyPair err: %v", err)
	}
	certPool := x509.NewCertPool()
	ca, err := os.ReadFile(viper.GetString("server_ca_path"))
	if err != nil {
		log.Fatalf("ioutil.ReadFile err: %v", err)
	}
	if ok := certPool.AppendCertsFromPEM(ca); !ok {
		log.Fatalf("certPool.AppendCertsFromPEM err")
	}
	c := credentials.NewTLS(&tls.Config{
		Certificates: []tls.Certificate{cert},
		ClientAuth:   tls.RequireAndVerifyClientCert,
		ClientCAs:    certPool,
		MinVersion:   tls.VersionTLS13,
	})
	s := grpc.NewServer(grpc.Creds(c))
	proto.RegisterMtrSbWorkerServer(s, &worker.Worker{})
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
