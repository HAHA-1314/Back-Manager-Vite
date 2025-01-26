import router from "./routes";
import { useStore } from "vuex";

router.beforeEach(async (to, from, next) => {
  // set page title
  // document.title = getPageTitle(to.meta.title);
  //前置路径守卫 将 部分页面 重定向至 首页
  const store = useStore();
  to.meta.title && store.Setting.commit("setTitle", to.meta.title);
  // console.log(store.state);
<<<<<<< Updated upstream
=======
  if (store.state.islogin) {
    // 已登录
    console.log(to);
    console.log(to.path);
    console.log(to.meta.permission);
    if (to.path === "/login" || to.path === "/") {
      if (store.state.rule == "超级管理员") {
        console.log("超级管理员");
        next(`/superadmin-system`);
      } else next();
    } else if (!to.meta.permission) {
      next();
    } else if (store.state.permissionList.indexOf(to.meta.permission) !== -1) {
      next();
    } else {
      next(`/404`);
    }
  } else {
    // 未登录
    if (getToken()) {
      // 有token
    }
    if (store.state.whiteList.indexOf(to.path) !== -1) {
      //  白名单，准许进入
      next();
    } else {
      // 否则全部重定向到登录页 params 保存 重定向页面路径
      next(`/login?redirect=${to.fullPath}`);
    }
  }
>>>>>>> Stashed changes
  console.log(to.path);
  if (store.state.whiteList.indexOf(to.path) !== -1) {
    //  白名单，准许进入
    next();
  } else {
    // 否则全部重定向到登录页 params 保存 重定向页面路径
    next(`/login?redirect=${to.fullPath}`);
  }
});
