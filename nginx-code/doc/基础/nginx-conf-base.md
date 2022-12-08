#  nginx 最基础的配置

```
worker_processes  1; #// 启动几个worker进程

events {
    worker_connections  1024;
}


http {
    include       mime.types; #// 引入其他配置文件
    default_type  application/octet-stream; #// mime.type 没匹配到 默认

    sendfile        on;  #//  直接发送文件，nginx 进行程序读取
    keepalive_timeout  65;



    // 虚拟主机 vhost
    server {
        listen       80;
        server_name  localhost; #//域名 主机名 
        
        location / { #//指的uri
            root   html;  //从那个目录开始找
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}


```


# server_name

+ 可以匹配多个域名，中间用空格隔开
`server_name  xing.com wang.com;` xing.com 和 wang.com 可以访问；
   
+ 完整匹配
    server_name xing.com;

+ 通配符匹配
     `server_name  *.xing.com;`  任意开头的 + .xing.com可以访问；
     

+ 通配符结束匹配
    `server_name  xing.*;`  任意开头的  xing. 开头的可以访问；

+ 正则匹配
   `server_name  ~^[\d]+\.xing\.com$;` 任意数字开头的的.xing.com结尾的都可以访问

