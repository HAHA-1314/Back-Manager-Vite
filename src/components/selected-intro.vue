<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import {
  getArticleList,
  getArticleDetail,
  addArticle,
  updateArticle,
  delArticle,
} from "../api/article";
import { ElMessage, ElMessageBox } from "element-plus";
import { toRaw } from "vue";
const dialogVisible = ref(false);
const title = ref("");
const search = ref("");
const imgArticle = ref("");
const dialogImageUrl = ref("");
const dialogSee = ref(false);
const ruleFormRef = ref();
const articleId = ref("");
const sendPics = ref<{ url: string }[]>([]);
interface ApiResponse {
  code: number;
  // 你可以在这里添加更多字段
}
interface RuleForm {
  name: string;
  pics: { url: string }[]; // pics 应该是一个包含 { url: string } 对象的数组
  url: string;
}
const ruleForm = ref<RuleForm>({
  name: "",
  pics: [],
  url: "",
});
const defaultForm = {
  name: "",
  pics: [],
  url: "",
};
const rules = {
  name: [{ required: true, message: "请输入推文名称", trigger: "blur" }],
  pics: [{ required: true, message: "请上传图片", trigger: "blur" }],
  url: [{ required: true, message: "请输入推文链接", trigger: "blur" }],
};
const getArticle = async () => {
  const res = await getArticleList();
  tableData.value = res.data || [];
};
const handleAdd = () => {
  ruleForm.value = defaultForm;
  title.value = "添加推文";
  dialogVisible.value = true;
};
const handleEdit = async (row) => {
  articleId.value = row.id;
  title.value = "编辑推文";
  const { data } = await getArticleDetail(row.id);
  console.log(data);
  ruleForm.value.name = data.name;
  ruleForm.value.url = data.url;
  console.log(ruleForm.value.pics);
  console.log(data.pic);
  data.pic.forEach((item) => {
    ruleForm.value.pics.push({ url: item });
  });
  sendPics.value = data.pic;
  console.log(ruleForm.value.pics);

  dialogVisible.value = true;
};
const handleDelete = async (row) => {
  console.log(row);
  ElMessageBox.confirm("是否删除项目", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await delArticle(row.id);
      getArticle();
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
const handleClose = () => {
  dialogVisible.value = false;
  ruleForm.value.name = "";
  ruleForm.value.pics = [];
  ruleForm.value.url = "";
  sendPics.value = [];
  ruleFormRef.value.clearValidate();
};

const tableData = ref([]);
const buttonConfirm = async () => {
  await ruleFormRef.value.validate();
  const rawData = toRaw(sendPics.value);
  console.log(ruleForm.value.name, rawData, ruleForm.value.url);
  if (title.value === "添加推文") {
    const res = await addArticle({
      name: ruleForm.value.name,
      pics: rawData,
      url: ruleForm.value.url,
    });
    if (res.code === 200) {
      ElMessage.success("添加成功");
    } else {
      ElMessage.error("添加失败");
    }
  } else {
    console.log(ruleForm.value.pics);
    const res = await updateArticle({
      id: articleId.value,
      name: ruleForm.value.name,
      pics: rawData,
      url: ruleForm.value.url,
    });
    if (res.code === 200) {
      ElMessage.success("编辑成功");
    } else {
      ElMessage.error("编辑失败");
    }
  }
  ruleForm.value.name = "";
  ruleForm.value.pics = [];
  ruleForm.value.url = "";
  sendPics.value = [];
  dialogVisible.value = false;
  getArticle();
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
  sendPics.value.push(file.data);
  console.log(sendPics.value);
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
        <el-form-item label="推文名称：" prop="name">
          <el-input
            placeholder="请输入"
            style="width: 300px"
            v-model="ruleForm.name"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="图片添加："
          style="display: flex; flex-direction: column; align-items: start"
          prop="pics"
        >
          <el-scrollbar>
            <div class="imgList">
              <el-upload
                v-model:file-list="ruleForm.pics"
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

        <el-form-item label="推文链接：" prop="url">
          <el-input
            placeholder="请输入链接"
            style="width: 300px"
            v-model="ruleForm.url"
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
