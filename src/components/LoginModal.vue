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
import { ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";
const { proxy } = getCurrentInstance();
const store = useStore();
const loginForm = ref({
  username: "",
  password: "",
});

const loginRules = {
  //表单验证规则
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
};

const handleLogin = () => {
  // console.log(loginForm.value.username, loginForm.valuepassword);
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      store.dispatch("login", loginForm.value);
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
