/**
 * 基于tcp传输层协议实现Websocket
 */

import net from "net";
import { EventEmitter } from "events";
import { toAcceptKey, unMask, analyseHeaders } from "./utils.js";

const OPCODE = {
  TEXT: 1,
  BUFFER: 2,
};

class Server extends EventEmitter {
  constructor(options) {
    super(options);
    this.options = options;
    this.server = net.createServer(this.listener);
    this.server.listen(options.port || 3000);
  }

  listener = (socket) => {
    socket.setKeepAlive(true);
    socket.send = function (payload) {
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

    // 当服务器收到客户端的数据
    socket.on("data", (chunk) => {
      const data = chunk.toString();
      // 数据里面有
      if (data.match(/Upgrade: websocket/)) {
        this.upgradeProtocol(socket, data);
      } else {
        this.onmessage(socket, chunk);
      }
    });

    // 触发
    this.emit("connection", socket);
  };

  upgradeProtocol(socket, data) {
    let rows = data.split("\r\n");
    const headers = analyseHeaders(rows.slice(1, -2));
    const websocketKey = headers["sec-websocket-key"];
    const acceptKey = toAcceptKey(websocketKey);
    let response = [
      "HTTP/1.1 101 Switching Protocols",
      "Upgrade: websocket",
      `Sec-WebSocket-Accept: ${acceptKey}`,
      "Connection: Upgrade",
      "\r\n",
    ].join("\r\n");
    socket.write(response);
  }

  onmessage(socket, buffer) {
    const FIN = (buffer[0] & 0b10000000) === 0b10000000;
    console.log('FIN: ', FIN);
    const opcode = buffer[0] & 0b00001111;
    console.log("OPCODE: ", opcode);
    // 是否掩码
    const isMasked = (buffer[1] & 0b10000000) === 0b10000000;

    let payloadLen = buffer[1] & 0b01111111;
    console.log('payloadLen: ', payloadLen);

    let payload;
    if (isMasked) {
      let MASK_KEY;
      if (payloadLen == 126) {
        MASK_KEY = buffer.slice(4, 8); // 掩码长度4个字节   16/8 2+2
        payload = buffer.slice(8);
      } else if (payloadLen == 127) {
        MASK_KEY = buffer.slice(10, 14); // 掩码长度4个字节   64/8   2+8
        payload = buffer.slice(14);
      } else {
        MASK_KEY = buffer.slice(2, 6); // 掩码长度4个字节
        payload = buffer.slice(6);
      }

      unMask(payload, MASK_KEY);
    } else {
      payload = buffer.slice(6, 6 + payloadLen);
    }
    if (FIN) {
      switch (opcode) {
        case 1: // 字符串
          socket.emit("message", payload.toString("utf8"));
          break;
        case 2: // 二进制数据
          socket.emit("message", payload);
          break;
        default:
          break;
      }
    }
  }
}
export { Server };
