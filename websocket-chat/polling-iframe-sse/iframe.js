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
                document.domain='localhost'
                parent.document.getElementById('time').innerHTML = new Date().toLocaleString() 
            </script>
            `
    );
  }, 1000);
});

app.listen(3000, function () {
  console.log("run 3000");
});
