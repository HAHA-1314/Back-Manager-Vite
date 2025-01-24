import { createStore } from "vuex";
import * as userApi from "../api/user";
import { ElMessage } from "element-plus";
import Setting from "./modules/setting";

const state = sessionStorage.getItem("state")
  ? JSON.parse(sessionStorage.getItem("state"))
  : {
      islogin: false,
      rule: "运营组",
      username: null, //username
      openTab: [], // 所有打开的路由
      activeIndex: "", //激活状态
      whiteList: ["/login"],
      showPage: "page1",
    };

const mutations = {
  islogin(state, user) {
    state.islogin = user.islogin;
    state.rule = user.authority;
    state.username = user.username;
  },
  // 添加 tabs
  addTab(state, data) {
    state.openTab.push(data);
  },
  //删除 tabs
  deleteTab(state, name) {
    let index = 0;
    for (let option of state.openTab) {
      if (option.name === name) {
        break;
      }
      index++;
    }
    state.openTab.splice(index, 1);
  },
  //设置对当前激活的tabs
  setActiveTab(state, index) {
    state.activeIndex = index;
  },
  setPage(state, newPage) {
    state.showPage = newPage;
  },
};

const actions = {
  //用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      userApi
        .login({ username: username, password: password }) // ../api/user login
        .then((response) => {
          if (response.code !== 200) {
            ElMessage({
              message: response.msg,
              type: "error",
              duration: 2 * 1000,
            });
            reject(error);
          }
          // const { data } = response;
          // console.log('data.tokenValue',data.tokenValue); //debug 不能显示token！！
          // commit('SET_TOKEN', data.tokenValue);
          // setToken(data.tokenValue)
          ElMessage({
            message: "登录成功",
            type: "success",
            duration: 2 * 1000,
          });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updatePage({ commit }, newPage) {
    commit("setPage", newPage);
  },
};

const modules = {
  Setting: Setting,
};

export default createStore({
  state,
  mutations,
  actions,
  modules,
});
