import { createApp } from "vue";
import store from "./store/index"; //Vuex
import App from "./App.vue";
import router from "./routes"; //Vue-Router
import "./permission"; //激活permission.js
import ElementPlus from "element-plus"; //ElementUI
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import * as ElIcon from "@element-plus/icons";
const app = createApp(App);

Object.keys(ElIcon).forEach((key) => {
  //ElementUI-Icon
  app.component(key, ElIcon[key]);
});

app
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount("#app");
