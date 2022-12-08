import { executor } from "../utils/require";
import { pageVuexPath } from "./path-name";

const files = import.meta.glob("../views/**.puex.ts", { eager: true });

export default (payload: any) => {
  payload.store.registerModule(pageVuexPath, {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {},
    getters: {},
  });
  // 递归加载应用页面目录下所有.puex.js文件, 各.puex.js文件作为page的子模块入口, 注册自身
  executor(files, payload);
};
