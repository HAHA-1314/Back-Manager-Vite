<script setup>
import { Picture as IconPicture } from "@element-plus/icons-vue";
import { ref } from "vue";
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

const imgUrl = ref("");
const imgUrl2 = ref("");

const imgList = ref([]);
const buttonConfirm = () => {};
const onSelectFile = (uploadFile) => {
  // 基于 FileReader 读取图片做预览
  const reader = new FileReader();
  reader.readAsDataURL(uploadFile.raw);
  reader.onload = () => {
    imgUrl.value = reader.result;
  };
};
const onSelectFile2 = (uploadFile) => {
  // 基于 FileReader 读取图片做预览
  const reader = new FileReader();
  reader.readAsDataURL(uploadFile.raw);
  reader.onload = () => {
    imgUrl2.value = reader.result;
  };
};
const fileList = ref([
  // {
  //   name: 'figure-2.png',
  //   url: '/images/figure-2.png'
  // }
]);
const fileList2 = ref([
  // {
  //   name: 'figure-2.png',
  //   url: '/images/figure-2.png'
  // }
]);
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
const beforeUpload = (file) => {
  // 如果已上传图片，则不再允许上传
  console.log(2);
  if (isUploaded.value) {
    // 这里可以根据需要弹出错误消息或使用Element UI的Message组件
    alert("只能上传一张照片！");
    return false;
  }
  // 可以在这里添加其他文件类型、大小等校验
  isUploaded.value = true; // 标记为已上传
  return true; // 允许上传
};
</script>
<template>
  <el-card style="margin-top: 20px">
    <el-header>
      <p>轮播图图片：</p>
      <el-scrollbar>
        <div class="imgList">
          <el-upload
            :auto-upload="false"
            list-type="picture"
            :on-change="onSelectFile"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
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
            :auto-upload="false"
            list-type="picture"
            :on-change="onSelectFile2"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
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
            v-model:file-list="fileList"
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
