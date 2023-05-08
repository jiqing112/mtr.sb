package main

import (
	"git.esd.cc/imlonghao/mtr.sb/pkgs/worker"
	"git.esd.cc/imlonghao/mtr.sb/proto"
	"google.golang.org/grpc"
	"log"
	"net"
)

func main() {
	var opts []grpc.ServerOption
	opts = append(opts, grpc.InitialWindowSize(64))
	opts = append(opts, grpc.InitialConnWindowSize(64))
	s := grpc.NewServer(opts...)
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
