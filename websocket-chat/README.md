## http vs websocket

http特点：无状态协议、每个请求都是独立的、请求应答模式、服务器无法主动给客户端推送消息，属于半双工通讯

websocket特点： 双向通讯（全双工协议） 建立链接后可以一直相互通信


### 不用websocket 之前的如何实现双通信

Comet【对这种技术的统称】，主要是为了实现服务器可以向客户端推送数据，解决实时性比较高的情况
1. 轮询  定时通过发起http请求
   缺点：频繁的网络请求，服务端负载压力增大，客户端也会出现性能问题；http报文传输，额外的数据消耗；实时性比较低，服务器短时间内变化多次【在轮询时间范围内】，我们可能获取不到实时的数据
2. 长轮询  后台变化了返回数据了在进行下一次轮询，实时性增强了
   缺点：也会频繁网络请求；链接堆积占用服务器资源
3. iframe流  
   缺点： 单向通讯，客户段不能给服务器端发消息
4. sse EventSource   html中提供的，单向通讯，客户端可以监控服务器端的推送事件
   缺点： 只能推送文本类型的消息，适合小数据，客户端无法给服务器传数据
5. websocket   双向链接，持续连接    发送的消息增加帧，数据非常小   支持多种数据格式，支持跨域



## websocket 协议

### 请求头
GET ws://10.32.18.100:3000/ HTTP/1.1    
Connection: Upgrade  尝试升级链接
Sec-WebSocket-Key:   用户保证是安全的websocket链接，方式是恶意连接
Upgrade: websocket   告诉服务器升级的协议是什么

### 响应头
Connection: Upgrade  // 升级成功
Sec-Websocket-Accept: q6+b4M3qYGxFKg3NYnNi+8YkMtY=
Upgrade: websocket  // 升级为 websocket协议




###  Sec-Websocket-Accept  确保链接是合法的
```
const number = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
crypto.createHash('sha1').update(Sec-WebSocket-Key + number).digest('base64')

```

