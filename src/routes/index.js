import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/login.vue";
import AdminSystemView from "../views/admin-system.vue"; //提供组件
import UserSystemView from "../views/user-system.vue";
import HomeView from "../components/home.vue";
import personManage from "../components/person-manage.vue";
import evalutionManage from "../components/evalution-manage.vue";
import appointmentManage from "../components/appointment-manage.vue";
import announcementManage from "../components/announcement-manage.vue";
import groupIntro from "../components/group-intro.vue";
import teamIntro from "../components/team-intro.vue";
import projectIntro from "../components/project-intro.vue";
import selectedIntro from "../components/selected-intro.vue";
import accountManage from "../components/account-manage.vue";
import _404 from "../views/404.vue"; // 网络错误、用户未授权等页面

const routes = [
  //存储路由，自由定义路由规则
  {
    path: "/login", //根路径
    component: LoginView, //导入对应组件
  },
  {
    path: "/superadmin-system",
    component: AdminSystemView, //首页导航组件
    redirect: "/superadmin-system/home",
    children: [
      {
        path: "home", //首页
        component: HomeView,
        name: "home",
        meta: {
          activeMenu: "首页",
          title: "首页",
        },
      },
      {
        path: "person-management", //考核管理-人员管理
        component: personManage,
        name: "person-management",
        meta: {
          activeMenu: "人员管理",
          title: "人员管理",
        },
      },
      {
        path: "evalution-management", //考核管理-考核管理
        component: evalutionManage,
        name: "evalution-management",
        meta: {
          activeMenu: "考核管理",
          title: "考核管理",
        },
      },
      {
        path: "appointment-management", // 考核管理-预约管理
        component: appointmentManage,
        name: "appointment-management",
        meta: {
          activeMenu: "预约管理",
          title: "预约管理",
        },
      },
      {
        path: "announcement-management", //考核管理-公告设置
        component: announcementManage,
        name: "announcement-management",
        meta: {
          activeMenu: "公告设置",
          title: "公告设置",
        },
      },
      {
        path: "group-intro", //信息管理-团队介绍
        component: groupIntro,
        name: "group-intro",
        meta: {
          activeMenu: "团队介绍",
          title: "团队介绍",
        },
      },
      {
        path: "team-intro", //信息管理-组别介绍
        component: teamIntro,
        name: "team-intro",
        meta: {
          activeMenu: "组别介绍",
          title: "组别介绍",
        },
      },
      {
        path: "project-intro", //信息管理-项目介绍
        component: projectIntro,
        name: "project-intro",
        meta: {
          activeMenu: "项目介绍",
          title: "项目介绍",
        },
      },
      {
        path: "selected-post", //信息管理-精选推文
        component: selectedIntro,
        name: "selected-post",
        meta: {
          activeMenu: "精选推文",
          title: "精选推文",
        },
      },
      {
        path: "account-management", //账号管理
        component: accountManage,
        name: "account-management",
        meta: {
          activeMenu: "账号管理",
          title: "账号管理",
        },
      },
    ],
    meta: {
      requireAuth: true,
      permission: "superadmin",
    },
  },
  {
    path: "/user-system",
    redirect: "/user-system/home",
    component: UserSystemView, //首页导航组件
    children: [
      {
        path: "home", //首页
        component: HomeView,
        name: "u-home",
        meta: {
          activeMenu: "home",
          activeTab: "首页",
          title: "首页",
        },
      },
      {
        path: "person-management", //考核管理-人员管理
        component: personManage,
        name: "u-person-management",
        meta: {
          activeMenu: "person-management",
          activeTab: "人员管理",
          title: "人员管理",
        },
      },
      {
        path: "evalution-management", //考核管理-考核管理
        component: evalutionManage,
        name: "u-evalution-management",
        meta: {
          activeMenu: "evalution-management",
          activeTab: "考核管理",
          title: "考核管理",
        },
      },
      {
        path: "appointment-management", // 考核管理-预约管理
        component: appointmentManage,
        name: "u-appointment-management",
        meta: {
          activeMenu: "appointment-management",
          activeTab: "预约管理",
          title: "预约管理",
        },
      },
      {
        path: "announcement-management", //考核管理-公告设置
        component: announcementManage,
        name: "u-announcement-management",
        meta: {
          activeMenu: "announcement-management",
          activeTab: "公告设置",
          title: "公告设置",
        },
      },
      {
        path: "group-intro", //信息管理-团队介绍
        component: groupIntro,
        name: "u-group-intro",
        meta: {
          activeMenu: "group-intro",
          activeTab: "团队介绍",
          title: "团队介绍",
        },
      },
      {
        path: "team-intro", //信息管理-组别介绍
        component: teamIntro,
        name: "u-team-intro",
        meta: {
          activeMenu: "team-intro",
          activeTab: "组别介绍",
          title: "组别介绍",
        },
      },
      {
        path: "project-intro", //信息管理-项目介绍
        component: projectIntro,
        name: "u-project-intro",
        meta: {
          activeMenu: "project-intro",
          activeTab: "项目介绍",
          title: "项目介绍",
        },
      },
      {
        path: "selected-post", //信息管理-精选推文
        component: selectedIntro,
        name: "u-selected-post",
        meta: {
          activeMenu: "selected-post",
          activeTab: "精选推文",
          title: "精选推文",
        },
      },
    ],
    meta: {
      requireAuth: true,
      permission: "admin",
    },
  },
  {
    path: "/404",
    component: _404,
  },
];

const router = createRouter({
  history: createWebHistory(), // createWebHashHistory
  routes,
});

export default router; //路由器导出
