#!/bin/bash
docker --version

docker run -p 8800:80 --restart always --name bcos-web -d bcos-web nginx -g "daemon off;"
