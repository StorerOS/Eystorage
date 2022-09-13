#SHELL=/usr/bin/env bash

CLEAN:=
BINS:=

# 构建镜像
docker:
	docker build --tag eybank-web -f ./dockers/Dockerfile.src .

# 检查环境变量
env-%:
	@ if [ "${${*}}" = "" ]; then \
	    echo "Environment variable $* not set"; \
	    exit 1; \
	fi


clean:
	rm -rf $(CLEAN) $(BINS)
.PHONY: clean
