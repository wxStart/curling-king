// 轮询
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/time", function (req, res) {
  res.send(new Date().toLocaleString());
});

app.listen(3000, function () {
  console.log("run 3000");
});
