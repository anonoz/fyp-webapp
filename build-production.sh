#!/bin/sh
TAG=$(git rev-parse HEAD)
docker build -t anonoz/fyp-webapp-arm64:$TAG -f Dockerfile.prod .
docker tag anonoz/fyp-webapp-arm64:$TAG anonoz/fyp-webapp-arm64:latest
docker push anonoz/fyp-webapp-arm64:$TAG
docker push anonoz/fyp-webapp-arm64:latest
