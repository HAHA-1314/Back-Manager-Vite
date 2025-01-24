<template>
  <router-view />
</template>

<script setup>
// import axios from "axios";
import { useStore } from "vuex";
// import router from "./routes";
import { onMounted } from "vue";

const store = useStore();

onMounted(() => {
  window.addEventListener("unload", saveState); //刷新之前完成保存vuex数据
  console.log("store.state.islogin", store.state.islogin);
});

const saveState = () => {
  console.log("store.state.islogin", store.state.islogin);
  if (store.state.islogin == true || store.state.openTab.length != 0) {
    console.log("saveState:islogin == true || store.state.openTab.length != 0");
    sessionStorage.setItem("state", JSON.stringify(store.state));
  } else {
    return;
  }
};

// router.beforeEach(async (to, from) => {
//   // console.log(to);
//   if (
//     to.meta.activeMenu != "home" &&
//     to.meta.activeMenu != "person-management" &&
//     to.meta.activeMenu != "evalution-management" &&
//     to.meta.activeMenu != "appointment-management" &&
//     to.meta.activeMenu != "announcement-management" &&
//     to.meta.activeMenu != "group-intro" &&
//     to.meta.activeMenu != "team-intro" &&
//     to.meta.activeMenu != "project-intro" &&
//     to.meta.activeMenu != "selected-post"
//   ) {
//     return; //无视无效页面
//   }
//   //判断新打开的页面是否已经在tab标签页之中，避免重复，以及保持选中高亮
//   let tabRepeat = false;
//   for (let item of store.state.openTab) {
//     if (to.meta.activeMenu === item.name) {
//       store.commit("setActiveTab", to.meta.activeMenu);
//       tabRepeat = true;
//       break;
//     }
//     //前往的页面在标签中存在->将其标签高亮
//   }
//   if (!tabRepeat) {
//     console.log("Add Tab for direct Enter Url");
//     store.commit("addTab", {
//       title: to.meta.activeTab,
//       name: to.meta.activeMenu,
//     });
//     store.commit("setActiveTab", to.meta.activeMenu);
//     //前往的页面在标签中不存在->添加标签->将其标签高亮
//   }
// });
</script>

<style>
html {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>
