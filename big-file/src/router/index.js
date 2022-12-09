import  Router from "koa-router";

import fileRouter from "./file-api.js";

const router = new Router();

router.use("/api/file", fileRouter.routes());

export default router;
