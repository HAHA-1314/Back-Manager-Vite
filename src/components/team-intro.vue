<script setup>
import { ref, onMounted } from "vue";
import team_com from "./teamCom.vue";

const tableData = [
  { name: "前端组" },
  { name: "后台组" },
  { name: "A I 组" },
  { name: "运营组" },
  { name: "项目组" },
  { name: "机械组" },
  { name: "电控组" },
];
const dialogVisible = ref(false);
const title = ref("");
const teamEdit = () => {
  title.value = "编辑组别";
  dialogVisible.value = true;
};
const dialogChange = () => {
  dialogVisible.value = !dialogVisible.value;
};
</script>
<template>
  <el-card style="margin-top: 70px">
    <el-table
      :data="tableData"
      style="width: 100%"
      :show-header="false"
      size="large"
      class="tableBox"
    >
      <el-table-column prop="name" style="padding-left: 50px" />
      <el-table-column align="right">
        <template #default>
          <el-button
            type="primary"
            style="margin-right: 50px; width: 120px"
            @click="teamEdit"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="1200"
    :before-close="handleClose"
    align-center
  >
    <team_com></team_com>
  </el-dialog>
</template>

<style scoped>
:deep(.el-table__row) {
  height: 70px;
}
.el-card {
  --el-card-padding: 0;
}
:deep(.el-table--large .el-table__cell) {
  padding: 12px 16px;
}
.divideBox {
  padding-bottom: 20px;
  border-bottom: 1px solid #dcdfe6;
}
.keyForm {
  display: flex;
  justify-content: space-between;
}
.el-input {
  margin-left: 30px;
}
.titleBox {
  font-size: 16px;
  margin-left: 6px;
  margin-bottom: 20px;
}
.titleBox .el-text {
  margin-left: 50px;
  font-weight: bold;
}
</style>
