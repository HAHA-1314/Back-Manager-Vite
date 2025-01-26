import { createStore } from 'vuex'
import * as userApi from '../api/user'
import { ElMessage } from 'element-plus'
import Setting from './modules/setting'

const state = sessionStorage.getItem('state')
  ? JSON.parse(sessionStorage.getItem('state'))
  : {
      islogin: false,
      rule: '运营组',
      username: null, //username
      openTab: [], // 所有打开的路由
      activeIndex: '', //激活状态
      whiteList: ['/login'],
      showPage: 'page1',
    }

const mutations = {
<<<<<<< Updated upstream
  islogin(state, user) {
    state.islogin = user.islogin
    state.rule = user.authority
    state.username = user.username
=======
  getLogin(state, user) {
    state.islogin = true;
    state.rule = "超级管理员";
    state.username = user.username;
    state.permissionList.push("superadmin");
    state.permissionList.push("admin");
  },
  logout(state) {
    state.islogin = false;
    state.rule = "";
    state.username = "";
    state.openTab = []; // 所有打开的路由
    state.activeIndex = ""; //激活状态
    state.whiteList = ["/login"];
    state.permissionList = [];
    state.showPage = "page1";
    sessionStorage.clear();
>>>>>>> Stashed changes
  },
  // 添加 tabs
  addTab(state, data) {
    state.openTab.push(data)
  },
  //删除 tabs
  deleteTab(state, name) {
    let index = 0
    for (let option of state.openTab) {
      if (option.name === name) {
        break
      }
      index++
    }
    state.openTab.splice(index, 1)
  },
  //设置对当前激活的tabs
  setActiveTab(state, index) {
    state.activeIndex = index
  },
  setPage(state, newPage) {
    state.showPage = newPage
  },
}

const actions = {
  //用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      userApi.login({ username: username, password: password }) // ../api/user login
        .then((response) => {
          if (response.data.code !== 200) {
            ElMessage({
              message: response.data.message,
              type: 'error',
              duration: 2 * 1000, 
            })
            reject(error);
          }
          // const { data } = response;
          // console.log('data.tokenValue',data.tokenValue); //debug 不能显示token！！
          // commit('SET_TOKEN', data.tokenValue);
          // setToken(data.tokenValue)
          ElMessage({
            message: '登录成功',
            type: 'success',
            duration: 2 * 1000,
<<<<<<< Updated upstream
          })
          resolve();
=======
          });
          if (response.data === "superadmin") {
            this.state.permissionList.push("superadmin");
            this.state.permissionList.push("admin");
            this.state.rule = "超级管理员";
            this.state.username = "admin";
          } else {
            this.state.permissionList.push("admin");
            this.state.rule = "普通用户";
            this.state.username = "user";
          }

          this.state.islogin = true;
          resolve(response);
>>>>>>> Stashed changes
        })
        .catch((error) => {
          ElMessage({
            message: "登录失败",
            type: "error",
            duration: 2 * 1000,
          });
          reject(error);
        });
    })
  },
  updatePage({ commit }, newPage) {
    commit('setPage', newPage)
  },
}

const modules = {
  Setting: Setting,
}

export default createStore({
  state,
  mutations,
  actions,
  modules,
})
