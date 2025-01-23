<script setup>
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { onMounted } from 'vue';
import { ref } from 'vue'
 
 $(document).ready(function() { 
        $('#summernote').summernote('fontName', 'Helvetica');  
        $('#summernote').summernote('destroy'); 
        $('#summernote').summernote({
          height: 250,
          minHeight: null,        
          maxHeight: null,            
          focus: true,
          fontNamesIgnoreCheck: ['Helvetica'],
          fontNames: ['Helvetica'],
        });
        $('#summernote').summernote('fontName', 'Helvetica');  
  })
const imgUrl = ref('')
const buttonConfirm = () => {
}
const onSelectFile = (uploadFile) => {
  // 基于 FileReader 读取图片做预览
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
  console.log(imgUrl.value);
}
</script>
<template>
  <el-card style="margin-top: 20px;">
    <el-header>
      <p>轮播图图片：</p>
      <div class="imgList">
      <el-upload :auto-upload="false" :on-change="onSelectFile">
        <img :src="imgUrl" v-if="imgUrl">
        <el-image v-else>
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
      </el-upload>
      <el-upload :auto-upload="false">
        <el-image>
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
      </el-upload>
      <el-upload class="avatar-uploader" :auto-upload="false">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        </div>
    </el-header>
    <el-main><div id="summernote"></div></el-main>
  </el-card>
  <el-footer><el-button class="buttonConfirm" size="large" @click="buttonConfirm">确定</el-button></el-footer>
</template>

<style scoped lang="scss">
.el-upload img,.el-image {
  padding: 0 5px;
  width: 230px;
  height: 130px;
  margin-right: 40px;
}
/* .el-image {
  padding: 0 5px;
  width: 230px;
  height: 130px;
  margin-right: 40px;
} */
.image-slot {      
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #e5e5e5;
  color: var(--el-text-color-secondary);
  font-size: 20px;
}
.imgList {
  display: flex;
  margin-top: 30px;
  margin-bottom: 40px;
}
.el-header {
  border-bottom: 1px solid #bbb;
  height: 100%;
}
.el-footer {
  display: flex;
  justify-content: flex-end;
}
.buttonConfirm {
  margin-top: 18px;
  color:white;
  background-color: #006eff;
  width: 130px;
}

:deep(.avatar-uploader .el-upload){
  box-sizing: border-box;
  border: 2px dashed #bbb;
  width: 230px;
  height: 130px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover){
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 45px;
  color: #101010;
  text-align: center;
}

</style>