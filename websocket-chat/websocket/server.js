import express from "express";
import http from "http";

import { WebSocketServer } from "ws";


const app = express();
const server = http.createServer(app);

const wsapp = new WebSocketServer({ server });

wsapp.on("connection", (ws) => {
  ws.send("hello ");
  ws.on("message", function (message) {
    console.log("客户端的消息", message);
  });
});

server.listen(3000);
