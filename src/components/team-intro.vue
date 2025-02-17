<script setup>
import { ref, onMounted, nextTick } from "vue";
import team_com from "./teamCom.vue";
import { getGroupList, getOneGroup } from "@/api/group";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
const store = useStore();
const tableData = ref([]);
const dialogVisible = ref(false);
const title = ref("");
const editGroup = ref();
const teamEdit = (row) => {
  title.value = "编辑组别";
  dialogVisible.value = true;
  nextTick(() => {
    editGroup.value.openEditGroup(row.id);
  });
};
const renderGroupList = async () => {
  const rule = store.state.rule;
  if (rule === "普通用户") {
    const res = await getOneGroup();
    tableData.value[0] = res.data;
  } else {
    const res = await getGroupList();
    tableData.value = res.data || [];
  }
};
const handleClose = () => {
  dialogVisible.value = false;
  editGroup.value.initForm();
  editGroup.value.clearValidate();
};
const handleEdit = (e) => {
  console.log(e);
  if (e === 200) {
    ElMessage.success("编辑成功");
    dialogVisible.value = false;
  } else {
    ElMessage.error("编辑失败");
  }
};
onMounted(() => {
  renderGroupList();
});
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
        <template #default="scope">
          <el-button
            type="primary"
            style="margin-right: 50px; width: 120px"
            @click="teamEdit(scope.row)"
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
    <team_com ref="editGroup" @handleTeam="handleEdit"></team_com>
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
