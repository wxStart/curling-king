import Router from "koa-router";

import path, { resolve } from "path";
import multiparty from "multiparty";

import fs from "fs";
import { rejects } from "assert";
const router = new Router();

// let number = 0;
// 上传文件最终路径
const STATIC_FILES = path.join(__dirname, "../file/files");
// 上传文件临时路径
const STATIC_TEMPORARY = path.join(__dirname, "../file/uploads");

// 上传接口
router.post("/upload", async function (ctx, next) {
  const result = await new Promise(function (resolve, reject) {
    const form = new multiparty.Form();

    form.parse(ctx.req, function (err, fields, files) {
      let hash = fields.hash[0];
      let chunkhash = fields.chunkhash[0];
      let chunk = files.file[0];
      let dir = `${STATIC_TEMPORARY}/${hash}`;

      try {
        // if (chunkhash == 2 && number < 3) {
        //   // 模拟失败重连
        //   number++;
        //   resolve({
        //     ok: false,
        //     hash,
        //     chunkhash,
        //     message: "失敗",
        //     error,
        //   });
        //   return;
        // }
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        const buffer = fs.readFileSync(chunk.path);
        const ws = fs.createWriteStream(`${dir}/${chunkhash}`);
        ws.write(buffer);
        ws.close();
        resolve({
          ok: true,
          hash,
          chunkhash,
          message: "成功",
        });
      } catch (error) {
        resolve({
          ok: false,
          hash,
          chunkhash,
          message: "失敗",
          error,
        });
      }
    });
  });
  ctx.body = JSON.stringify(result);
});

//合并切片接口
router.post("/merge_chunks", async (ctx, next) => {
  const { hash, size, name } = ctx.request.body;
  const result = await new Promise(function (resolve) {
    try {
      let len = 0;
      const bufferList = fs
        .readdirSync(`${STATIC_TEMPORARY}/${hash}`)
        .map((file, index) => {
          const buffer = fs.readFileSync(
            `${STATIC_TEMPORARY}/${hash}/${index}`
          );
          len += buffer.length;
          return buffer;
        });
      //合并文件
      const buffer = Buffer.concat(bufferList, len);
      let dir = `${STATIC_FILES}/${hash}`;
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);

      const ws = fs.createWriteStream(`${dir}/${name}`);
      ws.write(buffer);
      ws.close();
      resolve({
        ok: true,
        hash,
        message: "成功",
        url: `/files/${hash}/${name}`,
      });
    } catch (error) {
      resolve({
        ok: false,
        hash,
        message: "合并文件失败",
        error,
      });
    }
  });
  ctx.body = JSON.stringify(result);
});

export default router;
