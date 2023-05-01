#!/bin/sh

VERSION=$(printf "r%s.%s" "$(git rev-list --count HEAD)" "$(git rev-parse --short=7 HEAD)")

CGO_ENABLED=0 go build -trimpath \
  -ldflags="-w -s \
  -X main.Version=${VERSION}" \
  -o "$1" cmd/$1/*
