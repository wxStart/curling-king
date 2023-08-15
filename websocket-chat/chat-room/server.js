import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";

let SYS = "系统";

const __dirname = path.resolve();

const app = express();

app.use(express.static(__dirname));

const server = http.createServer(app);

let io = new Server(server);

function createMessage(content, user) {
  return { user, content, createTiime: new Date() };
}

let socketMap = {};

// of 是命名空间
io.of("/chat").on("connection", (socket) => {
  let userName; // 每个客户端都给一个名字

  socket.on("message", function (message) {
    console.log("message: ", message);
    if (userName) {
      // 告诉所有的客户端
      let result = message.match(/@([^ ]+) (.+)/);

      if (result) {
        // 认为是私聊
        let toUser = result[1];
        let toContent = result[2];
        const toSocket = socketMap[toUser];
        toSocket &&
          toSocket.emit("message", createMessage(toContent, userName));
      } else {
        // 公聊
        io.of("/chat").emit("message", createMessage(message, userName));
      }
    } else {
      let oldSocket = socketMap[message];
      if (oldSocket) {
        socket.emit(
          "message",
          createMessage(`${userName} 被占用，请使用其他名字！！！ `, SYS)
        );
        return;
      }
      userName = message;
      // 向除了自己外所有的人广播

      socketMap[userName] = socket;

      socket.broadcast.emit(
        "message",
        createMessage(`${userName} 加入房间！！！ `, SYS)
      );
    }
  });
});

server.listen(3000);
