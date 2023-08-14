// 轮询
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/time", function (req, res) {
  setInterval(() => {
    res.write(
      `
            <script>
                document.domain='localhost';
                var data = new Date().toLocaleString()
                parent.document.getElementById('time').innerHTML = data;
                // 调用父window中的 getIframeData 方法
                parent.getIframeData(data) 
            </script>
            `
    );
  }, 1000);
});

app.listen(3000, function () {
  console.log("run 3000");
});
