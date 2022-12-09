import Koa from "koa";
import koaStatic from "koa-static";
import Router from "./router/index.js";
import koaBodyParser from "koa-bodyparser";
import cors from "@koa/cors";

const app = new Koa();

app.use(cors());
app.use(koaBodyParser());

app.use(Router.routes()).use(Router.allowedMethods());
app.use(koaStatic("src/static"));
app.use(koaStatic("src/file"));

app.listen(3000, () => {
  console.log(`server run at: 3000`);
});
