<script setup>
import { ref } from "vue";
import group_com from "./groupCom.vue";
const tableData = [{ name: "项目1" }, { name: "项目2" }, { name: "项目3" }];
const dialogVisible = ref(false);
const title = ref("");
const teamAdd = () => {
  title.value = "添加项目";
  dialogVisible.value = true;
};
const teamEdit = () => {
  title.value = "编辑项目";
  dialogVisible.value = true;
};
const teamDelete = () => {};
</script>
<template>
  <div class="container">
    <el-button class="add_len" @click="teamAdd">添加</el-button>
  </div>
  <el-card style="margin-top: 25px">
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
            @click="teamEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            style="width: 80px"
            @click="teamDelete(scope.$index, scope.row)"
            >删除</el-button
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
    <group_com></group_com>
  </el-dialog>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: flex-end;
  margin-top: 17px;
  margin-right: 37px;
}
.add_len {
  width: 80px;
}
:deep(.el-table__row) {
  height: 70px;
}
.el-card {
  --el-card-padding: 0;
}
:deep(.el-table--large .el-table__cell) {
  padding: 12px 16px;
}
</style>
