<script setup>
import { Picture as IconPicture } from "@element-plus/icons-vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import extractTextFromHTML from "../utils/extractText";
import { getDetail, updateInfo } from "../api/object";
import { useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { editProject, addProject } from "../api/project";
const route = useRoute();
const listImages = ref([]);
const state = ref("");
const id = ref("");
const proData = ref([]);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["handlePro"]);
const initSummernote = () => {
  $(document).ready(function () {
    $("#summernote").summernote("fontName", "Helvetica");
    $("#summernote").summernote("destroy");
    $("#summernote").summernote({
      height: 250,
      width: 1400,
      minHeight: null,
      maxHeight: null,
      focus: false,
      fontNamesIgnoreCheck: ["Helvetica"],
      fontNames: ["Helvetica"],
    });
    $("#summernote").summernote("fontName", "Helvetica");
  });
};
const renderDetail = async () => {
  const res = await getDetail();
  console.log(res.data);
  ruleForm.value.introduction = res.data.introduction;
  sendPics.value = res.data.pic;
  listImages.value = res.data.pic.slice(2).map((item) => ({ url: item })); // 取第三位及以后的图片
  initSummernote();
  $("#summernote").summernote("code", ruleForm.value.introduction);
  $("#summernote").summernote("blur");
};
//蒙层处理
const singleBox = ref(null);
const overlay = ref(null);
const singleBox2 = ref(null);
const overlay2 = ref(null);
const handleMouseEnter = (box, overlay, index) => {
  box.addEventListener("mouseenter", () => {
    if (sendPics.value[index]) {
      overlay.style.display = "flex";
    }
  });
};

const handleMouseLeave = (box, overlay) => {
  box.addEventListener("mouseleave", () => {
    overlay.style.display = "none";
  });
};

onMounted(() => {
  console.log(route.name);
  
  if (route.name === "u-group-intro") {
    renderDetail();
  } else {
    initSummernote();
  }
  handleMouseEnter(singleBox.value, overlay.value, 0);
  handleMouseLeave(singleBox.value, overlay.value);

  handleMouseEnter(singleBox2.value, overlay2.value, 1);
  handleMouseLeave(singleBox2.value, overlay2.value);
});

onBeforeUnmount(() => {
  $("#summernote").summernote("destroy");
});

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove = (uploadFile) => {
  sendPics.value = sendPics.value.filter((item) => item !== uploadFile.url);
};
const checkPic = (index) => {
  dialogImageUrl.value = sendPics.value[index];
  dialogVisible.value = true;
};
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};
const isUploaded = ref(false);
//处理表单校验
const sendPics = ref([]);
const ruleFormRef = ref();
const ruleForm = ref({
  name: "",
  pic: [],
  introduction: "",
});
const checkImages = (rule, value, callback) => {
  if (sendPics.value === "") {
    callback(new Error("请上传轮播图图片"));
  } else {
    callback();
  }
};
const rules = ref({
  name: [
    {
      required: true,
      message: "请输入项目名称",
      trigger: "blur",
    },
  ],
  pic: [
    {
      validator: checkImages,
      trigger: "blur",
    },
    {
      required: true,
      message: "请选择图片",
      trigger: "blur",
    },
  ],
  introduction: [
    {
      required: true,
      message: "请输入团队介绍",
      trigger: "blur",
    },
  ],
});
const setPics = () => {
  sendPics.value = sendPics.value.filter((item) => item.trim() !== "");
  listImages.value = sendPics.value.slice(2).map((item) => ({ url: item }));
};
const handleFileChange = (file, index) => {
  console.log(index);
  console.log(file.data);

  if (index === 0) {
    sendPics.value[0] = file.data;
  } else if (index === 1) {
    sendPics.value[1] = file.data;
  } else {
    if (sendPics.value.length < 2) {
      sendPics.value[2] = file.data;
    } else {
      sendPics.value.push(file.data);
    }
  }
  console.log(sendPics.value);
};
// 处理表单提交
const buttonConfirm = async () => {
  $("#summernote").summernote("fontName", "Helvetica");
  const markupStr = $("#summernote").summernote("code");
  ruleForm.value.introduction = extractTextFromHTML(markupStr);

  ruleForm.value.pic = sendPics.value;
  console.log(ruleForm.value.pic);
  await ruleFormRef.value.validate();

  if (route.name === "group-intro") {
    ElMessageBox.confirm("是否确定修改团队信息", "注意", {
      type: "warning",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    })
      .then(async () => {
        setPics();
        const res = await updateInfo({
          id: 1,
          pic: sendPics.value,
          introduction: ruleForm.value.introduction,
        });
        console.log(res);
        if (res.code === 200) {
          ElMessage.success("修改成功");
        } else {
          ElMessage.error("修改失败");
        }
      })
      .catch(() => {
        ElMessage.info("取消修改");
      });
  } else {
    if (state.value === "编辑项目") {
      ElMessageBox.confirm("是否确定编辑项目信息", "注意", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          setPics()
          const res = await editProject({
            id: id.value,
            name: ruleForm.value.name,
            pic: sendPics.value,
            introduction: ruleForm.value.introduction,
          });
          console.log(id.value);
          emit("handlePro", res, "编辑");
        })
        .catch(() => {
          ElMessage.info("取消编辑");
        });
    } else {
      ElMessageBox.confirm("是否确定添加项目信息", "注意", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          setPics();
          const res = await addProject({
            name: ruleForm.value.name,
            pic: sendPics.value,
            introduction: ruleForm.value.introduction,
          });
          emit("handlePro", res, "添加");
        })
        .catch(() => {
          ElMessage.info("取消添加");
        });
    }
  }
  console.log(listImages.value);

  console.log(listImages.value);

  console.log(ruleForm.value.pic);
};
const delPic = (index) => {
  if (index === 0) {
    sendPics.value[0] = "";
  } else {
    sendPics.value[1] = "";
  }
};
const renderProject = (data, title, rowId) => {
  state.value = title;
  proData.value = data;
  id.value = rowId;
  ruleForm.value.name = data.name;
  $("#summernote").summernote("code", data.introduction);
  sendPics.value = data.pic;
  listImages.value = data.pic.slice(2).map((item) => ({ url: item }));
};
const clearForm = () => {
  ruleForm.value.name = "";
  ruleForm.value.pic = [];
  ruleForm.value.introduction = "";
  sendPics.value = [];
  state.value = "添加项目";
  $("#summernote").summernote("code", "");
};
const clearValidate = () => {
  ruleFormRef.value.clearValidate();
};
defineExpose({
  renderProject,
  clearForm,
  clearValidate,
  renderDetail,
});
</script>
<template>
  <el-card style="margin-top: 20px">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-header>
        <el-form-item v-if="props.show" label="项目名称：" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="轮播图图片：" prop="pic" style="display: block">
          <el-scrollbar>
            <div class="imgList">
              <div class="singleBox" ref="singleBox">
                <el-upload
                  v-model="ruleForm.pic"
                  action="http://localhost:8080/api/file/upload"
                  list-type="picture"
                  :on-success="(file) => handleFileChange(file, 0)"
                  :show-file-list="false"
                >
                  <img :src="sendPics[0]" v-if="sendPics[0]" class="imgFirst" />
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
                  <el-icon class="hoverIcon" @click="delPic(0)"
                    ><Delete
                  /></el-icon>
                </div>
              </div>
              <div class="singleBox" ref="singleBox2">
                <el-upload
                  v-model="ruleForm.pic"
                  action="http://localhost:8080/api/file/upload"
                  list-type="picture"
                  :on-success="(file) => handleFileChange(file, 1)"
                  :show-file-list="false"
                  style="margin-right: 8px"
                >
                  <img :src="sendPics[1]" v-if="sendPics[1]" class="imgFirst" />
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
                  <el-icon class="hoverIcon" @click="delPic(1)"
                    ><Delete
                  /></el-icon>
                </div>
              </div>
              <el-upload
                v-model:file-list="listImages"
                action="http://localhost:8080/api/file/upload"
                list-type="picture-card"
                :on-success="handleFileChange"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                class="avatar-uploader"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img
                  :src="dialogImageUrl"
                  alt="Preview Image"
                  class="previewImg"
                />
              </el-dialog>
            </div>
          </el-scrollbar>
        </el-form-item>
      </el-header>
      <el-main>
        <el-form-item prop="introduction">
          <div id="summernote"></div>
        </el-form-item>
      </el-main>
    </el-form>
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
  border-radius: 6px;
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
.singleBox {
  position: relative;
  width: 240px;
  height: 135px;
  margin-right: 8px;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明蒙层 */
  justify-content: center;
  align-items: center;
  gap: 20px; /* 图标之间的间距 */
  color: white;
  font-size: 30px;
  border-radius: 6px;
  display: none; /* 默认情况下，蒙层不可见 */
}
.hoverIcon {
  font-size: 20px;
}
.previewImg {
  width: 100%;
  height: 100%;
}
</style>
