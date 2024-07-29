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
          default-active="1"
          @open="handleMenuOpen"
          @close="handleClose"
          style="user-select: none"
        >
          <!-- (index) 首页 1  || 考核管理 2 -> 人员管理 2-1 | 考核管理 2-2 | 预约管理 2-3 | 公告设置 2-4 || 信息管理 3 -> 团队管理 3-1 | 组别管理 3-2 | 项目介绍 3-3 | 精选推文 3-4 || -->
          <el-menu-item index="1">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><User /></el-icon>
              <span>考核管理</span>
            </template>
            <el-menu-item index="2-1">人员管理</el-menu-item>
            <el-menu-item index="2-2">考核管理</el-menu-item>
            <el-menu-item index="2-3">预约管理</el-menu-item>
            <el-menu-item index="2-4">公告设置</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Message /></el-icon>
              <span>信息管理</span>
            </template>
            <el-menu-item index="3-1">团队介绍</el-menu-item>
            <el-menu-item index="3-2">组别介绍</el-menu-item>
            <el-menu-item index="3-3">项目介绍</el-menu-item>
            <el-menu-item index="3-4">精选推文</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="4">
            <el-icon><User /></el-icon>
            <span>账号管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 主体==头部==蓝色条块 以及 可增减标签页 -->
        <el-header height="85px">
          <div class="blue"></div>
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            class="demo-tabs"
            closable
            @tab-click="clickTab"
            @tab-remove="removeTab"
          >
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              {{ item.content }}
            </el-tab-pane>
          </el-tabs>
        </el-header>
        <el-main>
          <!-- 主题==重要内容 -->
          <span>main内容</span>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 1,
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "首页",
          name: "1",
          content: "",
        },
        {
          title: "test",
          name: "2",
          content: "",
        },
      ],
    };
  },
  methods: {
    handleMenuOpen(key, keyPath) {
      //回调函数 -- 点击菜单
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //回调函数 -- 关闭菜单
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="css" scoped>
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
</style>
