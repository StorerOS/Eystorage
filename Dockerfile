FROM ubuntu:18.04 AS builder

RUN apt-get update && apt-get install -y ca-certificates make curl
ENV SRC_DIR /web

COPY . $SRC_DIR

# 安装nodejs以及pnpm
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt update && apt install -y nodejs build-essential

# 编译前端代码
RUN cd $SRC_DIR && npm install -g yarn  && yarn install && yarn build

FROM ubuntu/nginx

RUN ln -fs /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone && apt-get update && apt-get install -y tzdata
ENV TZ Asia/Shanghai
ENV SRC_DIR /web

# 拷贝静态页面assets favicon.ico  index.html
COPY --from=builder $SRC_DIR/dist /var/www/html

# 拷贝Nginx配置
COPY --from=builder $SRC_DIR/dockers/bcos.conf /etc/nginx/conf.d

# SSL证书
COPY --from=builder /etc/ssl/certs /etc/ssl/certs

EXPOSE 80


