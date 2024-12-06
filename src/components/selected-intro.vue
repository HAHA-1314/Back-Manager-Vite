<script lang="ts" setup>
import { computed, ref } from "vue";
const someCondition = false;
interface User {
  //date: string
  name: string;
  //address: string
}
const dialogVisible = ref(false);
const title = ref("");
const search = ref("");
const imgArticle = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleAdd = () => {
  dialogVisible.value = true;
  title.value = "添加推文";
};
const handleEdit = (index: number, row: User) => {
  dialogVisible.value = true;
  title.value = "编辑推文";
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};
const handleClose = () => {
  dialogVisible.value = false;
};

const tableData: User[] = [
  {
    name: "推文1",
  },
  {
    name: "推文2",
  },
  {
    name: "推文3",
  },
  {
    name: "推文4",
  },
];
const buttonConfirm = () => {
  dialogVisible.value = false;
};
const dialogImageUrl = ref("");
const dialogSee = ref(false);
const fileList = ref([
  // {
  //   name: 'figure-2.png',
  //   url: '/images/figure-2.png'
  // }
]);
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogSee.value = true;
};
</script>

<template>
  <div class="container">
    <el-button class="add_len" @click="handleAdd">添加</el-button>
  </div>
  <el-card class="box-card">
    <el-table
      :data="filterTableData"
      style="width: 100%"
      :show-header="false"
      size="large"
    >
      <el-table-column prop="name" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            class="add_lener"
            :type="someCondition ? 'primary' : ''"
          >
            编辑
          </el-button>
          <el-button
            @click="handleDelete(scope.$index, scope.row)"
            class="add_len"
            type="danger"
          >
            删除
          </el-button>
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
    <el-card>
      <el-form>
        <el-form-item label="推文名称：">
          <el-input placeholder="请输入" style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item
          label="图片添加："
          style="display: flex; flex-direction: column; align-items: start"
        >
          <el-scrollbar>
            <div class="imgList">
              <el-upload
                v-model:file-list="fileList"
                :auto-upload="false"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                class="avatar-uploader"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>

              <el-dialog v-model="dialogSee">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </div>
          </el-scrollbar>
        </el-form-item>

        <el-form-item label="推文链接：">
          <el-input placeholder="请输入链接" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-footer
      ><el-button class="buttonConfirm" size="large" @click="buttonConfirm"
        >确定</el-button
      ></el-footer
    >
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
.add_lener {
  width: 120px;
  margin-right: 35px;
}
.box-card {
  margin-top: 25px;
  padding: 0;
}
.box-card :deep(.el-table__row) {
  height: 70px;
}
.box-card :deep(.el-card__body) {
  padding: 0 20px;
}
.imgList {
  display: flex;
  width: 1100px;
  margin-top: 15px;
}
:deep(.el-upload) {
  box-sizing: border-box;
  border: 2px dashed #bbb;
  width: 240px;
  height: 135px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 240px;
  height: 135px;
}
:deep(ul.el-upload-list--picture-card) {
  display: inline-flex;
  flex-wrap: nowrap;
}
.el-icon {
  font-size: 40px;
  color: #101010;
  text-align: center;
}
.el-footer {
  display: flex;
  justify-content: flex-end;
}
.buttonConfirm {
  margin-top: 18px;
  color: white;
  background-color: #006eff;
  width: 130px;
}
</style>
