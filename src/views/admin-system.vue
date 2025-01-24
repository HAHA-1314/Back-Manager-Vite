<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { SwitchButton } from "@element-plus/icons";
import * as userApi from "@/api/user";
import { ElMessage } from "element-plus";
import Cookies from "js-cookie";

const router = useRouter();
const store = useStore();
const goRouter = ref("");
const isCommen = ref(false);
const menuTitle = ref("");

const tabIndex = ref(1);
const editableTabsValue = ref(
  JSON.parse(sessionStorage.getItem("editableTabsValue")) || "home"
);
const editableTabs = ref(
  JSON.parse(sessionStorage.getItem("editableTabs")) || [
    {
      title: "首页",
      name: "home",
      content: "",
    },
  ]
);

const activeMenu = ref("home");
const handleMenuOpen = (keyPath) => {
  isCommen.value = false;
  let activeName = editableTabsValue.value;

  for (let i = 0; i < editableTabs.value.length; i++) {
    if (editableTabs.value[i].name === keyPath) {
      activeName = i;
      isCommen.value = true;
      editableTabsValue.value = keyPath;
      break;
    }
  }

  sessionStorage.setItem(
    "editableTabsValue",
    JSON.stringify(editableTabsValue.value)
  );

  if (isCommen.value) return;

  switch (keyPath) {
    case "home":
      menuTitle.value = "首页";
      break;
    case "person-management":
      menuTitle.value = "人员管理";
      break;
    case "evalution-management":
      menuTitle.value = "考核管理";
      break;
    case "appointment-management":
      menuTitle.value = "预约管理";
      break;
    case "announcement-management":
      menuTitle.value = "公告设置";
      break;
    case "group-intro":
      menuTitle.value = "团队介绍";
      break;
    case "team-intro":
      menuTitle.value = "组别介绍";
      break;
    case "project-intro":
      menuTitle.value = "项目介绍";
      break;
    case "selected-post":
      menuTitle.value = "精选推文";
      break;
    case "account-management":
      menuTitle.value = "账号管理";
      break;
    default:
      menuTitle.value = keyPath; // Fallback to keyPath if not matched
      break;
  }

  editableTabs.value.push({
    title: menuTitle.value,
    name: keyPath,
    content: "",
  });
  editableTabsValue.value = keyPath;
  activeMenu.value = keyPath;
};

const handleMenuClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const clickTab = (key) => {
  goRouter.value = key.props.name;
  router.push(goRouter.value);
  editableTabsValue.value = goRouter.value;
};

const removeTab = (targetName) => {
  let tabs = editableTabs.value;
  let activeName = editableTabsValue.value;

  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }
  editableTabsValue.value = activeName;
  router.push(activeName);
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
const arrowLeft = () => {
  let tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  let index = tabs.findIndex((tab) => tab.name === activeName);
  if (index > 0) {
    activeName = tabs[index - 1].name;
    editableTabsValue.value = activeName;
    router.push(activeName);
  }
};
const arrowRight = () => {
  let tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  let index = tabs.findIndex((tab) => tab.name === activeName);
  if (index < tabs.length - 1) {
    activeName = tabs[index + 1].name;
    editableTabsValue.value = activeName;
    router.push(activeName);
  }
};
const refresh = () => {
  window.location.reload();
};
// Watchers
watch(
  () => editableTabsValue.value,
  (newValue) => {
    sessionStorage.setItem("editableTabsValue", JSON.stringify(newValue));
  },
  { deep: true }
);

watch(
  () => editableTabs.value,
  (newValue) => {
    sessionStorage.setItem("editableTabs", JSON.stringify(newValue));
  },
  { deep: true }
);

onMounted(() => {
  activeMenu.value = "home";
});

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
</script>

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
          <h5 class="nav-header">运营组</h5>
        </div>
        <!-- 侧边==导航栏 -->
        <el-menu
          :default-active="this.$route.name"
          class="el-menu-vertical-demo"
          @click="handleMenuOpen(this.$route.name, this.$route.path)"
          style="user-select: none"
          router>
          <!-- (index) 首页 1  || 考核管理 2 -> 人员管理 2-1 | 考核管理 2-2 | 预约管理 2-3 | 公告设置 2-4 || 信息管理 3 -> 团队管理 3-1 | 组别管理 3-2 | 项目介绍 3-3 | 精选推文 3-4 || -->
          <el-menu-item index="home">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><User /></el-icon>
              <span>考核管理</span>
            </template>
            <el-menu-item class="menu-item" index="person-management"
              >人员管理</el-menu-item
            >
            <el-menu-item class="menu-item" index="evalution-management"
              >考核管理</el-menu-item
            >
            <el-menu-item class="menu-item" index="appointment-management"
              >预约管理</el-menu-item
            >
            <el-menu-item class="menu-item" index="announcement-management"
              >公告设置</el-menu-item
            >
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Message /></el-icon>
              <span>信息管理</span>
            </template>

            <el-menu-item class="menu-item" index="group-intro"
              >团队介绍</el-menu-item
            >
            <el-menu-item class="menu-item" index="team-intro"
              >组别介绍</el-menu-item
            >
            <el-menu-item class="menu-item" index="project-intro"
              >项目介绍</el-menu-item
            >
            <el-menu-item class="menu-item" index="selected-post"
              >精选推文</el-menu-item
            >
          </el-sub-menu>
          <el-menu-item index="account-management">
            <el-icon><User /></el-icon>
            <span>账号管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 主体==头部==蓝色条块 以及 可增减标签页 -->
        <el-header height="85px" class="tabs-box">
          <div class="blue">
            <el-button type="primary" class="sign-out" @click="signOut">
              <el-icon class="el-icon--left"><SwitchButton /></el-icon>退出登录
            </el-button>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 1px solid #e4e7ed;
              height: 40px;
            ">
            <div style="display: flex; align-items: center">
              <el-icon style="width: 40px" @click="arrowLeft"
                ><ArrowLeft
              /></el-icon>
              <el-tabs
                style="margin-bottom: -15px"
                v-model="editableTabsValue"
                type="card"
                class="demo-tabs"
                closable
                @tab-click="clickTab"
                @tab-remove="removeTab">
                <el-tab-pane
                  v-for="item in editableTabs"
                  :key="item.name"
                  :label="item.title"
                  :name="item.name">
                  {{ item.content }}
                </el-tab-pane>
              </el-tabs>
            </div>

            <div>
              <el-icon
                style="width: 40px; /* height: 45px; */"
                @click="arrowRight"
                ><ArrowRight
              /></el-icon>
              <el-icon style="width: 70px" @click="refresh"
                ><Refresh /> 刷新</el-icon
              >
            </div>
          </div>
        </el-header>
        <el-main>
          <!-- 主题==重要内容 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="css" scoped>
.common-layout {
  margin: -8px;
}
.menu-item {
  background-color: #f7f7f7;
}
.tabs-box {
  padding: 0;
}

.el-icon {
  cursor: pointer;
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

.menu-item {
  margin-left: 10px;
}
</style>
