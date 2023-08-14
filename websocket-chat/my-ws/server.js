import { Server } from "./my-ws.js";

const wsServer = new Server({
  port: 3000,
});

wsServer.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log("接收到message", message);
    // 在发送回去
    socket.send(message);
  });
});
