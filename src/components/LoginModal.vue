<template>
  <div class="body">
    <el-row class="title" justify="center"> 小程序后台管理系统 </el-row>
    <div class="login-modal">
      <el-form ref="loginRef" :model="loginForm" :rules="loginRules">
        <el-row>
          <el-form-item prop="username" style="width: 100%; margin-left: 80px">
            <el-input
              v-model="loginForm.username"
              style="
                width: 350px;
                height: 40px;
                border-radius: 50%;
                margin-top: 40px;
              "
              placeholder="请输入账号">
              <template #prefix
                ><el-icon><User /></el-icon
              ></template>
            </el-input>
          </el-form-item>
        </el-row>
        <el-row justify="center">
          <el-form-item prop="password" style="width: 100%; margin-left: 80px">
            <el-input
              v-model="loginForm.password"
              style="width: 350px; height: 40px; margin-top: 40px"
              type="password"
              placeholder="请输入密码"
              show-password
              @keyup.enter.native="handleLogin">
              <template #prefix
                ><el-icon><Lock /></el-icon
              ></template>
            </el-input>
          </el-form-item>
        </el-row>
        <el-row justify="center" style="margin-top: 40px">
          <el-button
            type="primary"
            :icon="Edit"
            round
            style="width: 100px; height: 40px; font-size: 18px"
            @click.native.prevent="handleLogin"
            >登录</el-button
          >
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Cookies from "js-cookie";
const { proxy } = getCurrentInstance();
const store = useStore();
const router = useRouter();
const route = useRoute();
const loginForm = ref({
  username: "",
  password: "",
});
const redirect = ref("");

watch(
  //将登录页携带的参数（重定向路径、参数）赋值给 redirect
  route,
  (newRoute) => {
    console.log(newRoute);
    console.log(newRoute.query);
    redirect.value = newRoute.query && newRoute.query.redirect;
  },
  { immediate: true }
);

const loginRules = {
  //表单验证规则
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
};

const handleLogin = () => {
  // console.log(loginForm.value.username, loginForm.valuepassword);
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      Cookies.set("username", loginForm.value.username, { expires: 30 });
      Cookies.set("password", loginForm.value.password, {
        expires: 30,
      });
      store.dispatch("login", loginForm.value).then((res) => {
        console.log(res);
        if (res.code == 200) {
          const query = route.query;
          const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
            if (cur !== "redirect") {
              acc[cur] = query[cur];
            }
            return acc;
          }, {});
          router.push({ path: redirect.value || "/", query: otherQueryParams });
        }
      });
      // console.log(loginForm.value);
    }
  });
};
</script>

<style scoped>
.body {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #5793df;
}
.title {
  margin-top: 180px;
  color: white;
  font-size: 30px;
}
.login-modal {
  display: inline-block;
  position: relative;
  width: 500px;
  height: 300px;
  margin-top: 50px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  left: 50%;
  transform: translateX(-50%);
}
</style>
