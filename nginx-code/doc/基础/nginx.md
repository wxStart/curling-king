# 安装 nginx

下载资源 ：http://nginx.org/download/nginx-1.21.6.tar.gz    



解压：
```
    $ tar zxvf nginx-1.21.6.tar.gz

```


前置安装


```

/**
    错误提示：


checking for OS
 + Linux 3.10.0-693.el7.x86_64 x86_64
checking for C compiler ... not found

./configure: error: C compiler cc is not found



 */
$ yum install -y gcc




/**
错误提示：

./configure: error: the HTTP rewrite module requires the PCRE library.
You can either disable the module by using --without-http_rewrite_module
option, or install the PCRE library into the system, or build the PCRE library
statically from the source with nginx by using --with-pcre=<path> option.

 */

 $ yum install -y pcre  pcre-devel



 /**
    错误提示：
./configure: error: the HTTP gzip module requires the zlib library.
You can either disable the module by using --without-http_gzip_module
option, or install the zlib library into the system, or build the zlib library
statically from the source with nginx by using --with-zlib=<path> option.
 
  */

 $ yum install -y zlib zlib-devel

```  




安装 nginx 

```
$    ./configure --prefix=/usr/local/nginx

```


编译
```
$ make

$ make install

```




# 启动 nginx

```
// 第一次启动
$ cd  /usr/local/nginx/sbin

$ ./nginx 


/**
    其他操作

    ./nginx -s stop  // 快速停止
    ./nginx -s quit  // 比较优雅的关闭，退出前完成已接收的连接请求
    ./nginx -s reload  // 重新加载配置

    ps -ef | grep nginx


 */

```


# 防火墙相关

## 关闭防火墙

`$ systemctl stop firewalld.service `

## 禁止防火墙开机启动

`$ systemctl disable firewalld.service `

## 放行端口

```
$ firewalld-cmd --zone=public -add-port=80/tcp --permanent

```
### 重启防火墙

`$ firewalld-cmd --reload `

# nginx 安装成系统服务

创建脚本
```
$ vi  /usr/lib/systemd/system/nginx.service
```  

脚本内容
```
[Unit]
Description=nginx - web server
After=network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx -c  /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
ExecQuit=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true

[Install]
wantedBy=multi-user.target

```

重新加载系统服务

`$ systemctl daemon-reload`


启动服务
`$ systemctl start nginx.service`

开机启动
`$ systemctl enable nginx.service`

