<script setup>
import { onMounted, onBeforeUnmount } from "vue";
let markupStr1 = $("#summernote1").summernote("code");
let markupStr2 = $("#summernote2").summernote("code");
const initSummernote = () => {
  // 初始化第一个编辑器
  $(document).ready(function () {
    $("#summernote1").summernote("fontName", "Helvetica");
    $("#summernote2").summernote("fontName", "Helvetica");

    $("#summernote1").summernote("destroy"); // 确保之前的实例被销毁
    $("#summernote1").summernote({
      height: 220,
      minHeight: null,
      maxHeight: null,
      focus: true,
      fontNamesIgnoreCheck: ["Helvetica"],
      fontNames: ["Helvetica"],
    });

    // 初始化第二个编辑器
    $("#summernote2").summernote("destroy"); // 确保之前的实例被销毁
    $("#summernote2").summernote({
      height: 220,
      minHeight: null,
      maxHeight: null,
      focus: true,
      fontNamesIgnoreCheck: ["Helvetica"],
      fontNames: ["Helvetica"],
    });
    $("#summernote1").summernote("fontName", "Helvetica");
    $("#summernote2").summernote("fontName", "Helvetica");
    // 设置字体样式
  });
};
$("#summernote2").on("summernote.change", function (we, contents, $editable) {
  console.log("Content changed:");
  console.log(contents); // 输出变化后的内容
  // 你可以在这里添加你的逻辑，比如更新预览或保存到服务器
});
onMounted(() => {
  initSummernote();
});
onBeforeUnmount(() => {
  // 组件即将销毁时销毁编辑器
  $("#summernote1").summernote("destroy");
  $("#summernote2").summernote("destroy");
});
//保存编辑组别
const teamSave = () => {
  markupStr1 = $("#summernote1").summernote("code");
  console.log(markupStr1);
  markupStr2 = $("#summernote2").summernote("code");
  console.log(markupStr2);
};
</script>
<template>
  <div class="divideBox">
    <div class="titleBox">
      <span>关键词</span>
      <el-text class="mx-1" type="primary"
        ><el-icon><Warning /></el-icon>单个关键词限制在10个字以内</el-text
      >
    </div>
    <el-form inline class="keyForm">
      <el-form-item label="关键词1:" style="margin-left: 6px"
        ><el-input placeholder="请输入关键词1"></el-input
      ></el-form-item>
      <el-form-item label="关键词2:"
        ><el-input placeholder="请输入关键词2"></el-input
      ></el-form-item>
      <el-form-item label="关键词3:"
        ><el-input placeholder="请输入关键词3"></el-input
      ></el-form-item>
    </el-form>
  </div>
  <div class="divideBox">
    <div class="titleBox">
      <span>组别介绍</span>
    </div>
    <div id="summernote1" ref="editableElement"></div>
  </div>
  <div class="divideBox">
    <div class="titleBox">
      <span>招新需求</span>
    </div>
    <div id="summernote2"></div>
  </div>
  <div class="confirmButton">
    <el-button type="primary" @click="teamSave" style="width: 100px"
      >确定</el-button
    >
  </div>
</template>
<style scoped>
.divideBox {
  padding-top: 10px;
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
.confirmButton {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}
.note-editable {
  font-family: "Helvetica", sans-serif !important; /* 强制使用Helvetica字体 */
}
</style>
