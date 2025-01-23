<template>
  <div>
    <el-button @click="addVisible = true" class="addButton">+ 添加</el-button>
  </div>
  <el-dialog v-model="addVisible" title="账号信息" width="500">
    <span>
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="Form1"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="所属组别" prop="group">
          <el-select v-model="addForm.group" placeholder="选择组别">
            <el-option
              v-for="item in groupOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click.native="
                () => {
                  addForm.group = item.label;
                  addForm.group = item.value;
                }
              "></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="账户名" prop="username">
          <el-input
            v-model="addForm.username"
            placeholder="请输入账户名"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="addForm.pass"
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
        <el-form-item label="所属组别" prop="group">
          <el-select v-model="editForm.group" placeholder="选择组别">
            <el-option
              v-for="item in groupOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click.native="
                () => {
                  editForm.group = item.label;
                  editForm.group = item.value;
                }
              "></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="账户名" prop="username">
          <el-input
            v-model="editForm.username"
            placeholder="请输入账户名"
            disabled></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="editForm.pass"
            autocomplete="off"
            placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editVisible = false">退出</el-button>
        <el-button type="primary" @click="editItem('Form2')"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="deleteVisible" title="删除此账号" width="500">
    <span>删除此账号后，此账号不再能够登录</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button plain @click="deleteVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteItem">确认</el-button>
      </div>
    </template>
  </el-dialog>
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
        align="center" />
      <el-table-column
        prop="groupname"
        label="组别"
        width="120"
        align="center" />
      <el-table-column prop="createtime" label="创建时间" align="center" />
      <el-table-column prop="updatetime" label="更新时间" align="center" />
      <el-table-column fixed="right" label="操作" align="center" width="140">
        <template #default>
          <el-button type="primary" size="small" @click="editVisible = true"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="deleteVisible = true"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import { ElMessage } from "element-plus";

const addVisible = ref(false);
const editVisible = ref(false);
const deleteVisible = ref(false);
// const Form1 = ref(null);
// const Form2 = ref(null);
const { proxy } = getCurrentInstance();
const addForm = ref({
  username: "",
  group: "",
  pass: "",
});
const editForm = ref({
  username: "",
  group: "",
  pass: "",
});
const groupOptions = ref([
  {
    label: "运营组",
    value: "运营组",
  },
  {
    label: "前端组",
    value: "前端组",
  },
  {
    label: "后台组",
    value: "后台组",
  },
]);
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
const addRules = ref({
  username: [
    {
      required: true,
      message: "请输入账户名",
      trigger: "blur",
    },
    {
      min: 3,
      max: 8,
      message: "长度在 3 到 8 个字符",
      trigger: "change",
    },
  ],
  group: [
    {
      required: true,
      message: "请选择组别",
      trigger: "blur",
    },
  ],
  pass: [
    {
      required: true,
      validator: validatePass,
      trigger: "change",
    },
  ],
});
const editRules = ref({
  group: [
    {
      required: true,
      message: "请选择组别",
      trigger: "change",
    },
  ],
  pass: [
    {
      required: true,
      validator: validatePass,
      trigger: "change",
    },
  ],
});
const tableData = [
  {
    date: "2016-05-03",
    username: "Tom",
    groupname: "California",
    updatetime: "Los Angeles",
    createtime: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    username: "Tom",
    groupname: "California",
    updatetime: "Los Angeles",
    createtime: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    username: "Tom",
    groupname: "California",
    updatetime: "Los Angeles",
    createtime: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    username: "Tom",
    groupname: "California",
    updatetime: "Los Angeles",
    createtime: "No. 189, Grove St, Los Angeles",
  },
];

const addItem = async (formName) => {
  console.log(addForm.value);
  proxy.$refs[formName].validate((valid) => {
    if (valid) {
      ElMessage({
        type: "success",
        message: "添加成功!",
      });
      addVisible.value = false;
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
  console.log(editForm.value);
  console.log(proxy);
  proxy.$refs[formName].validate((valid) => {
    if (valid) {
      ElMessage({
        type: "success",
        message: "编辑成功!",
      });
      editVisible.value = false;
    } else {
      ElMessage({
        type: "error",
        message: "您有表单未完成或者输入的格式不正确",
      });
      return false;
    }
  });
};

const deleteItem = async () => {
  deleteVisible.value = false;
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
