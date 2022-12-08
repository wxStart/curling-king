import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { init } from "./setup";
const config = init();
const { store, router } = config;

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
