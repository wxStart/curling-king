// 轮询
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/time", function (req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  let n =0;
  setInterval(() => {
    const data = new Date().toLocaleString()
    // res.write(`data:hello${data}\n\n`);
    res.write(`id:${n++}\nevent:my\ndata:hello${data}\n\n`);
  }, 1000);
});

app.listen(3000, function () {
  console.log("run 3000");
});
