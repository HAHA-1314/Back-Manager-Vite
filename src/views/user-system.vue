<template>
  <div class="common-layout">
    <!-- ElementUI 预设布局 -->
    <el-container>
      <el-aside width="200px">
        <!-- 侧边==账号名字 -->
        <div class="header">
          <span class="circle">
            <el-icon><Monitor /></el-icon>
          </span>
          <h5 class="nav-header">{{ username }}</h5>
        </div>
        <!-- 侧边==导航栏 -->
        <el-menu
          :default-active="$route.meta.activeMenu"
          class="el-menu-vertical-demo"
          style="user-select: none"
          router>
          <!-- (index) 首页 1  || 考核管理 2 -> 人员管理 2-1 | 考核管理 2-2 | 预约管理 2-3 | 公告设置 2-4 || 信息管理 3 -> 团队管理 3-1 | 组别管理 3-2 | 项目介绍 3-3 | 精选推文 3-4 || -->
          <el-menu-item index="home">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="user-system">
            <template #title>
              <el-icon><User /></el-icon>
              <span>考核管理</span>
            </template>
            <el-menu-item index="person-management">人员管理</el-menu-item>
            <el-menu-item index="evalution-management">考核管理</el-menu-item>
            <el-menu-item index="appointment-management">预约管理</el-menu-item>
            <el-menu-item index="announcement-management"
              >公告设置</el-menu-item
            >
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Message /></el-icon>
              <span>信息管理</span>
            </template>
            <el-menu-item index="group-intro">团队介绍</el-menu-item>
            <el-menu-item index="team-intro">组别介绍</el-menu-item>
            <el-menu-item index="project-intro">项目介绍</el-menu-item>
            <el-menu-item index="selected-post">精选推文</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 主体==头部==蓝色条块 以及 可增减标签页 -->
        <el-header height="85px" width="80%" class="tabs-box">
          <div class="blue">
            <el-button type="primary" class="sign-out" @click="signOut">
              <el-icon class="el-icon--left"><SwitchButton /></el-icon>退出登录
            </el-button>
          </div>
          <keep-alive>
            <div style="position: relative">
              <el-tabs
                v-model="store.state.activeIndex"
                type="card"
                class="demo-tabs"
                closable
                @tab-change="clickTab"
                @tab-remove="removeTab"
                style="user-select: none">
                <el-tab-pane
                  v-for="item in store.state.openTab"
                  :key="item.name"
                  :label="item.title"
                  :name="item.name">
                </el-tab-pane>
              </el-tabs>
              <el-button :icon="Refresh" class="refresh-button" @click="refresh"
                >刷新</el-button
              >
            </div>
          </keep-alive>
        </el-header>
        <el-main>
          <!-- 主题==重要内容 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Refresh } from "@element-plus/icons";
import Cookies from "js-cookie";
import { ElMessage } from "element-plus";
import { SwitchButton, House, User, Message } from "@element-plus/icons-vue";
import * as userApi from "@/api/user";

const router = useRouter();
const route = useRoute();
const store = useStore();
const username = store.state.username;

const clickTab = async () => {
  //点击标签 跳转至 对应 路由
  // console.log('active', store.state.activeIndex);
  router.push(store.state.activeIndex);
};

const removeTab = (name) => {
  store.commit("deleteTab", name);
  if (store.state.activeIndex === name) {
    //如果选中状态的标签被删除
    //重新设置激活的标签 并 跳转 对应路由
    if (store.state.openTab.length >= 1) {
      store.commit(
        "setActiveTab",
        store.state.openTab[store.state.openTab.length - 1].name
      );
      router.push({
        path: store.state.openTab[store.state.openTab.length - 1].name,
      });
    } else {
      store.commit("addTab", { title: "首页", name: "home" });
      store.commit("setActiveTab", "home");
      router.push("home");
    }
  }
};

const signOut = () => {
  userApi.signOut().then((res) => {
    if (res.code == 200) {
      ElMessage.success("退出成功");
      store.commit("logout");
      Cookies.remove("username");
      Cookies.remove("password");
      Cookies.remove("satoken");
      router.push(`/login?redirect=${router.currentRoute.value.path}`);
    } else {
      ElMessage.error(res.msg);
    }
  });
};

onMounted(() => {
  store.commit("setActiveTab", route.meta.activeMenu);
});

const refresh = () => {
  //刷新当前页面
  window.location.reload();
};
</script>

<style lang="css" scoped>
.common-layout {
  margin: -8px;
}

.tabs-box {
  padding: 0;
}

.circle {
  height: 30px;
  width: 30px;
  border-radius: 50cqb;
  background-color: #006eff;
  justify-content: center;
  display: flex;
  align-items: center;
  color: white;
}

.header {
  margin-left: 20px;
  width: 100px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-header {
  font-size: 18px;
  font-weight: 400;
  color: #006eff;
}

.blue {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #006eff;
}

.sign-out {
  position: absolute;
  right: 15px;
  top: 12px;
}

.refresh-button {
  box-sizing: border-box;
  position: absolute;
  right: 10px;
  top: 5px;
  right: 8px;
}

:deep(.el-tabs--card) {
  width: calc(100% - 88px);
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
  border-radius: 0;
}
</style>
