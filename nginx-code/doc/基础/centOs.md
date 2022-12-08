###  连接网络

```
// 查看网络
$ ip addr

/**

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 00:0c:29:c5:cc:cf brd ff:ff:ff:ff:ff:ff
    inet6 fe80::464f:33d2:81d8:f600/64 scope link 
       valid_lft forever preferred_lft forever

可以看到两张网卡： lo 和 ens33（目前是没有网络ip的）

*/

 

```
#### 修改网卡配置 静态配置

```

 $ vi  /etc/sysconfig/network-scripts/ifcfg-ens33
 /**
 
    BOOTPROTO=static // 设置为静态 ，默认dhcp


    。。。

    ONBOOT=yes // 开启 默认是noe
    IPADDR=192.168.44.101 // 设置静态ip 
    NETMASK=255.255.255.0
    GATEWAY=192.168.44.1 // 设置网关ip  
    DNS1=8.8.8.8  // 设置DNS  可以设置多个
 
  */


// 重启网卡配置命令
$  systemctl  restart network

```

