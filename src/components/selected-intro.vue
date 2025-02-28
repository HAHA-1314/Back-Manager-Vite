<script setup>
import { ref, onMounted, watch } from "vue";
import {
  getArticleList,
  getArticleDetail,
  addArticle,
  updateArticle,
  delArticle,
  uploadFile,
} from "../api/article";
import { ElMessage, ElMessageBox } from "element-plus";
import { Picture as IconPicture } from "@element-plus/icons-vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
const dialogVisible = ref(false);
const title = ref("");
const ruleFormRef = ref();
const articleId = ref("");
const ruleForm = ref({
  name: "",
  pics: [],
  url: "",
});
const defaultForm = {
  name: "",
  pics: [],
  url: "",
};
const clearForm = () => {
  ruleForm.value.name = "";
  ruleForm.value.pics = [];
  ruleForm.value.url = "";
};
//蒙层处理
const singleBox = ref(null);
const overlay = ref(null);
const singleBox2 = ref(null);
const overlay2 = ref(null);
const dialogPreview = ref(false);
const dialogPreviewUrl = ref("");
const handleMouseEnter = (box, overlay, index) => {
  box.addEventListener("mouseenter", () => {
    if (index === 0) {
      overlay.style.display = ruleForm.value.pics[0] ? "flex" : "none";
    } else {
      overlay.style.display = ruleForm.value.url ? "flex" : "none";
    }
  });
};

const handleMouseLeave = (box, overlay) => {
  box.addEventListener("mouseleave", () => {
    overlay.style.display = "none";
  });
};

const rules = {
  name: [
    { required: true, message: "请输入推文名称", trigger: "blur" },
    { max: 50, message: "名称长度不能超过50个字符", trigger: "blur" },
  ],
  pics: [{ required: true, message: "请上传图片", trigger: "blur" }],
  url: [{ required: true, message: "请输入推文链接", trigger: "blur" }],
};
const getArticle = async () => {
  const res = await getArticleList();
  console.log(res.data);
  const truncatedData = res.data.map((item) => {
    // 检查 name 属性的长度，如果超过 15，进行截取
    const truncatedName =
      item.name.length > 15 ? item.name.slice(0, 15) + "..." : item.name;

    // 返回一个新的对象，替换 name 属性
    return {
      ...item, // 保留其他属性
      name: truncatedName, // 更新 name 属性
    };
  });
  tableData.value = truncatedData || [];
};
const handleAdd = () => {
  ruleForm.value = defaultForm;
  title.value = "添加推文";
  dialogVisible.value = true;
};
const handleEdit = async (row) => {
  articleId.value = row.id;
  title.value = "编辑推文";
  dialogVisible.value = true;
  const { data } = await getArticleDetail(row.id);
  ruleForm.value = { name: data.name, url: data.url, pics: data.pic };
};
const handleDelete = async (row) => {
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
  clearForm();
  ruleFormRef.value.clearValidate();
};

const tableData = ref([]);
const buttonConfirm = async () => {
  await ruleFormRef.value.validate();

  if (title.value === "添加推文") {
    ElMessageBox.confirm("是否确定添加推文", "注意", {
      type: "warning",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    })
      .then(async () => {
        const res = await addArticle(ruleForm.value);
        if (res.code === 200) {
          ElMessage.success("添加成功");
        } else {
          ElMessage.error("添加失败");
        }
        clearForm();
        dialogVisible.value = false;
        getArticle();
      })
      .catch(() => {
        ElMessage.info("取消添加");
      });
  } else {
    ElMessageBox.confirm("是否确定编辑推文", "注意", {
      type: "warning",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    })
      .then(async () => {
        const res = await updateArticle({
          id: articleId.value,
          ...ruleForm.value,
        });
        if (res.code === 200) {
          ElMessage.success("编辑成功");
        } else {
          ElMessage.error("编辑失败");
        }
        clearForm();
        dialogVisible.value = false;
        getArticle();
      })
      .catch(() => {
        ElMessage.info("取消编辑");
      });
  }
};

const handleFileChange = (file, index) => {
  if (index === 0) {
    ruleForm.value.pics[0] = file.data;
  } else {
    ruleForm.value.url = file.data;
  }
};
const checkPic = (index) => {
  if (index === 0) {
    dialogPreviewUrl.value = ruleForm.value.pics[0];
  } else {
    dialogPreviewUrl.value = ruleForm.value.url;
  }
  dialogPreview.value = true;
};
const delPic = (index) => {
  if (index === 0) {
    ruleForm.value.pics = [];
  } else {
    ruleForm.value.url = "";
  }
};
//裁剪图片
const dialogCropper = ref(false);
const cropperRef = ref(null);
const cropUrl = ref("");
const beforeUpload = (file) => {
  // 生成一个临时 URL
  cropUrl.value = URL.createObjectURL(file);
  console.log("图片路径:", cropUrl.value);
  dialogCropper.value = true;
  return false; // 阻止自动上传
};
const cropImage = async () => {
  const result = cropperRef.value.getResult();
  if (result.canvas) {
    // 将裁剪后的图片转换为 Blob
    result.canvas.toBlob((blob) => {
      if (blob) {
        // 将 Blob 转换为 File
        const timestamp = new Date().getTime(); // 获取当前时间戳
        const fileName = `cropped-image-${timestamp}.png`; // 动态文件名
        const file = new File([blob],fileName, {
          type: "image/png",
        });
        // 上传到服务器
        uploadImage(file);
      }
    }, "image/png");
  }
};
// 上传图片到服务器
const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("file", file); // 将文件添加到 FormData
  console.log("FormData 内容:", formData.get("file")); // 检查文件是否附加成功
  uploadFile(formData)
    .then((response) => {
      ElMessage.success("上传成功！");
      console.log(response.data);
      dialogCropper.value = false;
    
        ruleForm.value.pics[0] = response.data;
      
    })
    .catch((error) => {
      ElMessage.error("上传失败！");
      console.error("上传失败:", error);
    });
};
onMounted(() => {
  getArticle();
});
watch(
  () => singleBox.value,
  (newValue) => {
    if (newValue) {
      console.log(newValue);
      handleMouseEnter(singleBox.value, overlay.value, 0);
      handleMouseLeave(singleBox.value, overlay.value);
      handleMouseEnter(singleBox2.value, overlay2.value, 1);
      handleMouseLeave(singleBox2.value, overlay2.value);
    }
  },
  { deep: true }
);
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
          label="封面图片："
          style="display: flex; flex-direction: column; align-items: start"
          prop="pics"
        >
          <div class="imgList" ref="singleBox">
            <el-upload
              v-model="ruleForm.pics"
              action="http://localhost:8080/api/file/upload"
              list-type="picture"
              :before-upload= "beforeUpload"
              :on-success="(file) => handleFileChange(file, 0)"
              :on-remove="handleRemove"
              class="avatar-uploader"
              :show-file-list="false"
            >
              <img
                :src="ruleForm.pics[0]"
                v-if="ruleForm.pics[0]"
                class="articleImg"
              />
              <el-image v-else>
                <template #error>
                  <div class="image-slot" style="background-color: #e5e5e5">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
            </el-upload>
            <div class="overlay" ref="overlay">
              <el-icon class="hoverIcon" @click="checkPic(0)"
                ><ZoomIn
              /></el-icon>
              <el-icon class="hoverIcon" @click="delPic(0)"><Delete /></el-icon>
            </div>
          </div>
        </el-form-item>

        <el-form-item
          label="推文长图："
          prop="url"
          style="display: flex; flex-direction: column; align-items: start"
        >
          <div class="imgList" ref="singleBox2">
            <el-upload
              v-model="ruleForm.url"
              action="http://localhost:8080/api/file/upload"
              list-type="picture"
              :on-success="(file) => handleFileChange(file, 1)"
              :on-remove="handleRemove"
              class="avatar-uploader"
              :show-file-list="false"
            >
              <img :src="ruleForm.url" v-if="ruleForm.url" class="articleImg" />
              <el-image v-else>
                <template #error>
                  <div class="image-slot" style="background-color: #e5e5e5">
                    <el-icon><icon-picture /></el-icon>
                  </div>
                </template>
              </el-image>
            </el-upload>
            <div class="overlay" ref="overlay2">
              <el-icon class="hoverIcon" @click="checkPic(1)"
                ><ZoomIn
              /></el-icon>
              <el-icon class="hoverIcon" @click="delPic(1)"><Delete /></el-icon>
            </div>
          </div>
        </el-form-item>
        <el-dialog v-model="dialogPreview">
          <img :src="dialogPreviewUrl" alt="Preview Image" class="previewImg" />
        </el-dialog>
        <el-dialog v-model="dialogCropper" title="图片裁剪" width="600px">
          <div v-if="cropUrl" style="height: 300px; width: 300px">
            <cropper
              ref="cropperRef"
              class="cropper"
              :src="cropUrl"
              :stencil-props="{
                aspectRatio: 16 / 9,
              }"
            ></cropper>
          </div>
          <template #footer>
            <el-button @click="dialogCropper = false">取消</el-button>
            <el-button type="primary" @click="cropImage">确认</el-button>
          </template>
        </el-dialog>
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
  margin-top: 15px;
}
:deep(.el-upload) {
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  width: 240px;
  height: 135px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 240px;
  height: 135px;
}
:deep(ul.el-upload-list--picture-card) {
  display: inline-flex;
  flex-wrap: nowrap;
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
.articleImg {
  max-width: 100%;
  height: 135px;
}
.el-upload .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--el-text-color-secondary);
  font-size: 20px;
  width: 240px;
  height: 135px;
}
.overlay {
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明蒙层 */
  justify-content: center;
  align-items: center;
  gap: 20px; /* 图标之间的间距 */
  color: white;
  font-size: 30px;
  border-radius: 6px;
  display: none; /* 默认情况下，蒙层不可见 */
  width: 240px;
  height: 135px;
}
.hoverIcon {
  font-size: 20px;
}
.previewImg {
  width: 100%;
  height: 100%;
}
.cropper {
  width: 400px;
  height: 225px;
  background: #ddd;
}
</style>
