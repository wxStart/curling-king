## 反向代理

实际上访问的是其他服务器

用户访问，实际上访问的就是 nginx---（访问）---nginx 服务器---（转发）---其他服务器

## 正向代理

用户访问 a 服务器，代理服务器帮你访问 a

## 反向代理配置

`proxy_pass`字符，proxy_pass 和 root 二选一 ，共存时候使用的 proxy_pass;

## 负载均衡反向代理

### 最基础的负载均衡

```
    # 定义 abcd
     upstream abcd {
        server 192.168.44.102:80;
        server 192.168.44.103:80;
    }
```

```
    #配置proxy_pass

    location / {
            proxy_pass http://abcd;
    }

```   
完整的配置
```

worker_processes  1; #启动几个worker进程
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    upstream abcd {
        server 192.168.44.102:80;
        server 192.168.44.103:80;
    }
    server {
        listen       80;
        server_name  localhost;
        location / {
            proxy_pass http://abcd;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}

```

### 权重负载均衡  weight

轮询方粉，最常用的    
使用 `weight`进行配置权重，比如根据机器性能去分配     


```
     upstream abcd {
        server 192.168.44.102:80 weight=3;
        server 192.168.44.103:80 weight=1;
    }
```

### down 参数 不参与负载均衡了


```
     upstream abcd {
        server 192.168.44.102:80 weight=3 down; # 访问不到了，主动下线
        server 192.168.44.103:80 weight=1;
    }
```

### backup 参数，备用负载均衡
无机器可用的使用就会用到它

```
   upstream abcd {
        server 192.168.44.102:80 weight=3; # 访问不到了，下线
        server 192.168.44.103:80 weight=1 backup;
    }
```

### ip_hash 负载均衡

判断客户端的ip，指向上次访问的nginx ，客户端ip不变，访问的nginx 地址不变，但是目前的网络情况，导致不常用，网络有可能会变化，比如手机网络，基站变掉了


### least_conn 负载均衡
最小应用连接，主动让去找连接少的nginx，基本用不到的  

### fair
默认不支持，需要第三方插件 根据后台响应时间，决定转发，基本用不到，不可靠，也不能保持会话

### url_hash
默认不支持，需要第三方插件，根据用户访问的url定向转发请求，也不能保持会话    
主要使用场景，固定资源在不同的服务器，可以根据请求的url，访问不同的服务器找问价
