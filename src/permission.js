import router from "./routes";
import { useStore } from "vuex";

router.beforeEach(async (to, from, next) => {
  // set page title
  // document.title = getPageTitle(to.meta.title);
  //前置路径守卫 将 部分页面 重定向至 首页
  const store = useStore();
  to.meta.title && store.Setting.commit("setTitle", to.meta.title);
  // console.log(store.state);
  console.log(to.path);
  if (store.state.whiteList.indexOf(to.path) !== -1) {
    //  白名单，准许进入
    next();
  } else {
    // 否则全部重定向到登录页 params 保存 重定向页面路径
    next(`/login?redirect=${to.fullPath}`);
  }
});
