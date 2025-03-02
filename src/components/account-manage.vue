<template>
  <div>
    <el-button @click="addVisible = true" class="addButton">+ 添加</el-button>
  </div>
  <!-- 添加管理员模态框 -->
  <el-dialog v-model="addVisible" title="账号信息" width="500">
    <span>
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="Form1"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="所属组别" prop="groupId">
          <el-select v-model="addForm.groupId" placeholder="选择组别">
            <el-option
              v-for="item in groupOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="账户名" prop="username">
          <el-input
            v-model="addForm.username"
            placeholder="请输入账户名"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="addForm.password"
            autocomplete="off"
            placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addVisible = false">退出</el-button>
        <el-button type="primary" @click="addItem('Form1')"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 编辑模态框 -->
  <el-dialog v-model="editVisible" title="编辑账号信息" width="500">
    <span>
      <el-form
        :model="editForm"
        :rules="editRules"
        ref="Form2"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="所属组别" prop="groupId">
          <el-select v-model="editForm.groupId" placeholder="选择组别">
            <el-option
              v-for="item in groupOptions"
              :key="Number(item.value)"
              :label="item.label"
              :value="Number(item.value)"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="账户名" prop="username">
          <el-input
            v-model="editForm.username"
            placeholder="请输入账户名"
            disabled></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="editForm.password"
            autocomplete="off"
            placeholder="置空不修改密码"></el-input>
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editVisible = false">退出</el-button>
        <el-button
          type="primary"
          :loading="editloading"
          @click="editItem('Form2')">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- <el-dialog v-model="deleteVisible" title="删除此账号" width="500">
    <span>删除此账号后，此账号不再能够登录</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button plain @click="deleteVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteItem(id)">确认</el-button>
      </div>
    </template>
  </el-dialog> -->
  <div style="top: 20px; position: relative">
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#5793df', color: '#fff' }"
      border>
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column
        prop="username"
        label="账户名"
        width="150"
        show-overflow-tooltip
        align="center" />
      <el-table-column
        prop="name"
        label="组别"
        width="120"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        show-overflow-tooltip
        align="center">
        <template #default="{ row }">
          {{ dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTTime"
        label="更新时间"
        show-overflow-tooltip
        align="center">
        <template #default="{ row }">
          {{ dayjs(row.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="140"
        prop="id">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="small"
            @click="editAccount(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deleteAccount(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import { ElCollapseItem, ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import * as api from "@/api/account";
import dayjs from "dayjs";

const store = useStore();
const addVisible = ref(false);
const editVisible = ref(false);
const deleteVisible = ref(false);
const editloading = ref(false);
const groupOptions = ref();
// const Form1 = ref(null);
// const Form2 = ref(null);
const { proxy } = getCurrentInstance();

const addForm = ref({
  username: "",
  groupId: "",
  password: "",
});
const editForm = ref({
  username: "",
  groupId: "",
  password: "",
  rawpwd: "",
});
const tableData = ref([]);

onMounted(() => {
  getList();
});

store.dispatch("dict/getDictValue", "groupId").then((res) => {
  groupOptions.value = res;
  // console.log(typeof groupOptions.value[0].value);
});

var validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (value.length < 6 || value.length > 12) {
    callback(new Error("密码长度不得小于6位大于12位"));
  } else if (value.indexOf(" ") != -1) {
    callback(new Error("密码不得包含空格"));
  }
  callback();
};

var EditPass = (rule, value, callback) => {
  if (value === "") {
    callback();
    return;
  }
  if (value.length < 6 || value.length > 12) {
    callback(new Error("密码长度不得小于6位大于12位"));
  } else if (value.indexOf(" ") != -1) {
    callback(new Error("密码不得包含空格"));
  }
  callback();
};

const addRules = ref({
  username: [
    {
      required: true,
      message: "请输入账户名",
      trigger: "change",
    },
    {
      min: 3,
      max: 8,
      message: "长度在 3 到 8 个字符",
      trigger: "change",
    },
  ],
  groupId: [
    {
      required: true,
      message: "请选择组别",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      validator: validatePass,
      trigger: "change",
    },
  ],
});
const editRules = ref({
  groupId: [
    {
      required: true,
      message: "请选择组别",
      trigger: "change",
    },
  ],
  password: [
    {
      validator: EditPass,
      trigger: "change",
    },
  ],
});

const addItem = async (formName) => {
  console.log(addForm.value);
  proxy.$refs[formName].validate((valid) => {
    if (valid) {
      api.addAccount(addForm.value).then((res) => {
        if (res.code === 200) {
          ElMessage({
            type: "success",
            message: "添加成功!",
          });
          addVisible.value = false;
        } else {
          ElMessage({
            type: "error",
            message: res.msg,
          });
        }
        getList();
      });
    } else {
      ElMessage({
        type: "error",
        message: "您有表单未完成或者输入的格式不正确",
      });
      return false;
    }
  });
};

const editItem = async (formName) => {
  const form = {
    // ...editForm.value,
    id: editForm.value.id,
    password: editForm.value.password,
    groupOp: editForm.value.groupId,
  };
  proxy.$refs[formName].validate((valid) => {
    if (valid) {
      editloading.value = true;
      api.updateAccount(form).then((res) => {
        if (res.code === 200) {
          ElMessage({
            type: "success",
            message: "修改成功!",
          });
          editVisible.value = false;
        } else {
          ElMessage({
            type: "error",
            message: res.msg,
          });
        }
        editloading.value = false;
        getList();
      });
    } else {
      ElMessage({
        type: "error",
        message: "您有表单未完成或者输入的格式不正确",
      });
      return false;
    }
  });
};

const getList = async () => {
  const res = await api.getAllAccount();
  if (res.code === 200) tableData.value = Object.freeze(res.data);
};

const editAccount = async (id) => {
  const res = await api.getAccountById(id);
  if (res.code === 200) {
    editForm.value = res.data;
    editForm.value.rawpwd = editForm.value.password;
    editForm.value.password = "";
    editVisible.value = true;
    editForm.value.groupId = parseInt(editForm.value.groupId);
  } else {
    ElMessage({
      type: "error",
      message: res.msg,
    });
  }
};

const deleteAccount = async (id) => {
  // deleteVisible.value = true;
  ElMessageBox.confirm("此操作将永久删除该账号, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    deleteItem(id);
  });
};

const deleteItem = async (id) => {
  const res = await api.deleteAccountById({ id: id });
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "删除成功!",
    });
    getList();
  } else {
    ElMessage({
      type: "error",
      message: res.msg,
    });
  }
};
</script>

<style scoped>
.addButton {
  position: relative;
  margin-top: 15px;
  transform: translateX(-100px);
  left: 100%;
}
</style>
