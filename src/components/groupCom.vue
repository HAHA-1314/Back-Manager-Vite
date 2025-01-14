<script setup>
import { Picture as IconPicture } from "@element-plus/icons-vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
const initSummernote = () => {
  $(document).ready(function () {
    $("#summernote").summernote("fontName", "Helvetica");
    $("#summernote").summernote("destroy");
    $("#summernote").summernote({
      height: 250,
      minHeight: null,
      maxHeight: null,
      focus: true,
      fontNamesIgnoreCheck: ["Helvetica"],
      fontNames: ["Helvetica"],
    });
    $("#summernote").summernote("fontName", "Helvetica");
  });
};

onMounted(() => {
  initSummernote();
});
onBeforeUnmount(() => {
  $("#summernote").summernote("destroy");
});

const imgUrl = ref("");
const imgUrl2 = ref("");

const imgList = ref([]);
const onSelectFile = (file) => {
  imgUrl.value = file.raw ? URL.createObjectURL(file.raw) : "";
};

const onSelectFile2 = (file) => {
  imgUrl2.value = file.raw ? URL.createObjectURL(file.raw) : "";
};

const listImages = ref([]);
const handleexceed = () => {
  console.log(1);
};
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};
const isUploaded = ref(false);
//处理表单校验
const ruleFormRef = ref();
const ruleForm = ref({
  carouselImages: [],
});
const checkImages = (rule, value, callback) => {
  console.log(value);
  console.log(value.length);
  if (value.length === 0) {
    callback(new Error("请上传轮播图图片"));
  } else {
    callback();
  }
};
const rules = ref({
  carouselImages: [
    {
      validator: checkImages,
      trigger: "blur",
    },
  ],
});
const buttonConfirm = () => {
  ruleForm.value.carouselImages = [
    ...ruleForm.value.carouselImages,
    ...listImages._rawValue,
  ];
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      // 表单校验成功
      console.log("提交");
    } else {
      console.log("表单验证失败");
    }
  });
};
const handleSingleFileChange = (file, index) => {
  const fileUrl = file.raw ? URL.createObjectURL(file.raw) : "";
  if (index === 0) imgUrl.value = fileUrl; // 更新图片预览
  if (index === 1) imgUrl2.value = fileUrl; // 更新图片预览
  // 确保 `ruleForm.carouselImages` 的长度足够
  ruleForm.value.carouselImages[index] = {
    name: file.name,
    url: fileUrl,
    uid: file.uid || index, // 使用文件对象中的 UID 或自定义 UID
  };
};

const handleSingleFileRemove = (file, index) => {
  // 删除指定索引的文件
  ruleForm.carouselImages.splice(index, 1, null);
  if (index === 0) imgUrl.value = ""; // 清空图片预览
  if (index === 1) imgUrl2.value = ""; // 清空图片预览
};
</script>
<template>
  <el-card style="margin-top: 20px">
    <el-header>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-form-item
          required
          label="轮播图图片："
          prop="carouselImages"
          style="display: block"
        >
          <el-scrollbar>
            <div class="imgList">
              <el-upload
                v-model="ruleForm.carouselImages"
                :auto-upload="false"
                list-type="picture"
                :on-preview="onSelectFile"
                :on-change="(file) => handleSingleFileChange(file, 0)"
                :on-remove="(file) => handleSingleFileRemove(file, 0)"
                :show-file-list="false"
                style="margin-right: 8px"
              >
                <img :src="imgUrl" v-if="imgUrl" class="imgFirst" />
                <el-image v-else>
                  <template #error>
                    <div class="image-slot" style="background-color: #e5e5e5">
                      <el-icon><icon-picture /></el-icon>
                    </div>
                  </template>
                </el-image>
              </el-upload>

              <el-upload
                v-model="ruleForm.carouselImages"
                :auto-upload="false"
                list-type="picture"
                :on-preview="onSelectFile2"
                :on-change="(file) => handleSingleFileChange(file, 1)"
                :on-remove="(file) => handleSingleFileRemove(file, 1)"
                :show-file-list="false"
                style="margin-right: 8px"
              >
                <img :src="imgUrl2" v-if="imgUrl2" class="imgFirst" />
                <el-image v-else>
                  <template #error>
                    <div class="image-slot" style="background-color: #e5e5e5">
                      <el-icon><icon-picture /></el-icon>
                    </div>
                  </template>
                </el-image>
              </el-upload>
              <el-upload
                v-model:file-list="listImages"
                :auto-upload="false"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                class="avatar-uploader"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </div>
          </el-scrollbar>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main><div id="summernote"></div></el-main>
  </el-card>
  <el-footer
    ><el-button class="buttonConfirm" size="large" @click="buttonConfirm"
      >确定</el-button
    ></el-footer
  >
</template>
<style scoped>
.imgList {
  display: flex;
  margin-top: 30px;
  margin-bottom: 40px;
  flex-direction: row; /* 在一行内显示，即主轴为水平方向 */
  flex-wrap: nowrap;
}

.el-header {
  border-bottom: 1px solid #bbb;
  height: 100%;
  overflow: hidden;
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
.el-upload .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--el-text-color-secondary);
  font-size: 20px;
  width: 240px;
  height: 135px;
}
:deep(.el-upload) {
  width: 240px;
  height: 135px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
}
:deep(.avatar-uploader .el-upload) {
  box-sizing: border-box;
  border: 2px dashed #bbb;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

.imgList .imgFirst {
  height: 135px;
}
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 240px;
  height: 135px;
}
:deep(ul.el-upload-list--picture-card) {
  display: inline-flex;
  flex-wrap: nowrap;
}
.avatar-uploader i.el-icon {
  font-size: 45px;
  color: #101010;
  text-align: center;
}
</style>
