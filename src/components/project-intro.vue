<script setup>
import { ref, onMounted,nextTick } from "vue";
import group_com from "./groupCom.vue";
import {
  getProjectList,
  deleteProject,
  getProjectById,
  editProject,
} from "../api/project";
import { ElMessage, ElMessageBox } from "element-plus";
const tableData = ref([]);
const dialogVisible = ref(false);
const projectRef = ref();
const title = ref("");
const teamAdd = () => {
  title.value = "添加项目";
  dialogVisible.value = true;
  nextTick(() => {
   projectRef.value.clearForm()
  });
};
const teamEdit = async (row) => {
  title.value = "编辑项目";
  const res = await getProjectById(row.id);
  dialogVisible.value = true;
  console.log(res);
  nextTick(() => {
   projectRef.value.renderProject(res.data,title.value,row.id);
  });
};
const renderData = async () => {
  const res = await getProjectList();
  tableData.value = res.data || [];
};
const teamDelete = async (row) => {
  ElMessageBox.confirm("是否删除项目", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteProject(row.id);
      renderData();
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
const handleProject = (res,state) => {
  if(res.code === 200){
     ElMessage.success(`${state}成功`);
    dialogVisible.value = false;
    renderData();
  }else{
    ElMessage.error(`${state}失败`);
  }
}
const handleClose = () => {
  dialogVisible.value = false;
  projectRef.value.clearForm()
  projectRef.value.clearValidate()
}
onMounted(() => {
  renderData();
});
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
        <template #default="scope">
          <el-button
            type="primary"
            style="margin-right: 50px; width: 120px"
            @click="teamEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            style="width: 80px"
            @click="teamDelete(scope.row)"
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
    <group_com ref="projectRef" :show="true" @handlePro="handleProject"></group_com>
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
