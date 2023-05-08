package worker

import (
	"context"
	"git.esd.cc/imlonghao/mtr.sb/proto"
)

func (s *Worker) Version(ctx context.Context, in *proto.VersionRequest) (*proto.VersionResponse, error) {
	return &proto.VersionResponse{Version: s.V}, nil
}
