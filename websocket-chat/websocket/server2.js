import net from "net";
import crypto from "crypto";
const number = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

const OPCODE = {
  TEXT: 1,
  BUFFER: 2,
};
const send = function (socket, payload) {
  let opcode;
  if (Buffer.isBuffer(payload)) {
    opcode = OPCODE.BUFFER;
  } else {
    opcode = OPCODE.TEXT;
    payload = Buffer.from(payload);
  }

  let length = payload.length;

  let buffer = Buffer.alloc(length + 2);
  buffer[0] = 0b10000000 | opcode;
  buffer[1] = length;
  payload.copy(buffer, 2);

  socket.write(buffer);
};

const acceptKey = crypto
  .createHash("sha1")
  .update("/0bkQMzhS4idOJQjNE66dw==" + number)
  .digest("base64");
console.log("acceptKey: ", acceptKey);
const server = net.createServer(function (socket) {
  socket.once("data", function (data) {
    data = data.toString();
    if (data.match(/Upgrade: websocket/)) {
      // 说明要升级成 websocket
      let rows = data.split("\r\n");
      // 获取请求头
      const headers = rows.slice(1, -2).reduce((prev, time) => {
        const [key, value] = time.split(": ");
        prev[key.toLocaleLowerCase()] = value;
        return prev;
      }, {});
      const acceptKey = crypto
        .createHash("sha1")
        .update(headers["sec-websocket-key"] + number)
        .digest("base64");
      let response = [
        "HTTP/1.1 101 Switching Protocols",
        "Upgrade: websocket",
        `Sec-WebSocket-Accept: ${acceptKey}`,
        "Connection: Upgrade",
        "\r\n",
      ].join("\r\n");
      socket.write(response); // 响应报文
      // 解析后续的websocket数据
      socket.on("data", function (buffer) {
        // 一个字节是八位
        const FIN = (buffer[0] & 0b10000000) === 0b10000000;
        console.log("FIN: ", FIN);
        const OPCODE = buffer[0] & 0b00001111;
        console.log("OPCODE: ", OPCODE);
        // 客户端给服务器 发送消息是需要掩码的
        const MASKED = (buffer[1] & 0b10000000) === 0b10000000;
        console.log("MASKED: ", MASKED);
        const PAYLOAD_LEN = buffer[1] & 0b01111111;
        console.log("PAYLOAD_LEN: ", PAYLOAD_LEN);

        const MASK_KEY = buffer.slice(2, 6); // 掩码长度4个字节
        console.log("MASK_KEY: ", MASK_KEY);

        const PAYLOAD = buffer.slice(6); // 真实的数据被掩码过，需要用掩码做异或操作^
        console.log("PAYLOAD: ", PAYLOAD);

        for (let index = 0; index < PAYLOAD.length; index++) {
          // 掩码有点像切砖款
          // 原来内容：  'bc cd ee aa d1 b1 c3 ee aa df ff'  掩码内容：'ab c2 d2 dd'
          /**
           *    bc cd ee aa d1 b1 c3 ee aa df ff
           *    ab c2 d2 dd ab c2 d2 dd ab c2 d2 dd // 掩码 反复取用
           */

          PAYLOAD[index] = PAYLOAD[index] ^ MASK_KEY[index % 4]; // 掩码4个字节
          // console.log(' PAYLOAD[i]: ',  PAYLOAD[index]);
        }
        console.log("PAYLOAD: ", PAYLOAD.toString()); // 客户端发送给服务端的东西

        // socket.write(PAYLOAD);
        console.log("PAYLOAD: ", PAYLOAD);
        send(socket, "我写了一次文本内容");
      });
    }
  });
});

server.listen(3000, function () {
  console.log(111);
});
