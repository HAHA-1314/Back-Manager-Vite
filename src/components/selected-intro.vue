<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import {
  getArticleList,
  getArticleDetail,
  updateArticle,
} from "../api/article";
const dialogVisible = ref(false);
const title = ref("");
const search = ref("");
const imgArticle = ref("");
const dialogImageUrl = ref("");
const dialogSee = ref(false);
const ruleFormRef = ref();
const articleId = ref("");
interface RuleForm {
  articleName: string;
  fileList: { url: string }[]; // fileList 应该是一个包含 { url: string } 对象的数组
  articleLink: string;
}
const ruleForm = ref<RuleForm>({
  articleName: "",
  fileList: [],
  articleLink: "",
});
const rules = {
  articleName: [{ required: true, message: "请输入推文名称", trigger: "blur" }],
  // fileList: [{ required: true, message: "请上传图片", trigger: "blur" }],
  articleLink: [{ required: true, message: "请输入推文链接", trigger: "blur" }],
};

const handleAdd = () => {
  dialogVisible.value = true;
  title.value = "添加推文";
};
const handleEdit = async (row) => {
  articleId.value = row.id;
  dialogVisible.value = true;
  title.value = "编辑推文";
  console.log(row);
  const { data } = await getArticleDetail(row.id);
  ruleForm.value.articleName = data.name;
  ruleForm.value.fileList = data.pics;
  ruleForm.value.articleLink = data.url;
};
const handleDelete = (row) => {
  console.log(row);
};
const handleClose = () => {
  dialogVisible.value = false;
};
const getArticle = async () => {
  const res = await getArticleList();
  tableData.value = res.data || [];
};

const tableData = ref([]);
const buttonConfirm = async () => {
  await ruleFormRef.value.validate();
  dialogVisible.value = false;
  if (title.value === "添加推文") {
  } else {
    console.log(ruleForm.value.fileList);
    await updateArticle({
      id: articleId.value,
      name: ruleForm.value.articleName,
      pics: [
        "https://sns-webpic-qc.xhscdn.com/202501261939/c2b4fb6913d00e4289683e8fc6235144/1040g00831c2e32vsgs605pqhg87i1359enn2550!nc_n_webp_mw_1",
      ],
      url: ruleForm.value.articleLink,
    });
  }
};

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogSee.value = true;
};
const handleFileChange = (file) => {
  console.log(file);
  ruleForm.value.fileList.push({ url: file.data });
};
onMounted(() => {
  getArticle();
});
</script>

<template>
  <div class="container">
    <el-button class="add_len" @click="handleAdd">添加</el-button>
  </div>
  <el-card class="box-card">
    <el-table
      :data="tableData"
      style="width: 100%"
      :show-header="false"
      size="large"
    >
      <el-table-column prop="name" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button
            type="primary"
            @click="handleEdit(scope.row)"
            class="add_lener"
          >
            编辑
          </el-button>
          <el-button
            @click="handleDelete(scope.row)"
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
      <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm">
        <el-form-item label="推文名称：" prop="articleName">
          <el-input
            placeholder="请输入"
            style="width: 300px"
            v-model="ruleForm.articleName"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="图片添加："
          style="display: flex; flex-direction: column; align-items: start"
          prop="fileList"
        >
          <el-scrollbar>
            <div class="imgList">
              <el-upload
                v-model:file-list="ruleForm.fileList"
                action="http://localhost:8080/api/file/upload"
                list-type="picture-card"
                :on-success="handleFileChange"
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

        <el-form-item label="推文链接：" prop="articleLink">
          <el-input
            placeholder="请输入链接"
            style="width: 300px"
            v-model="ruleForm.articleLink"
          ></el-input>
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
