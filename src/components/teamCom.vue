<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
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
      width: 1200,
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
      width: 1200,
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
function extractTextFromHTML(htmlString) {
  // 创建一个 DOMParser 实例
  const parser = new DOMParser();
  // 将 HTML 字符串解析为文档
  const doc = parser.parseFromString(htmlString, "text/html");
  // 提取文档中的文本内容
  return doc.body.textContent.trim();
}
// $("#summernote2").on("summernote.change", function (we, contents, $editable) {
//   console.log("Content changed:");
//   console.log(contents); // 输出变化后的内容
//   // 你可以在这里添加你的逻辑，比如更新预览或保存到服务器
// });
onMounted(() => {
  initSummernote();
});
onBeforeUnmount(() => {
  // 组件即将销毁时销毁编辑器
  $("#summernote1").summernote("destroy");
  $("#summernote2").summernote("destroy");
});
//保存编辑组别

const ruleFormRef = ref();
const ruleForm = ref({
  keyword: ["", "", ""],
  teamIntro: "",
  recruitNeed: "",
});
const validateKeywords = (rule, value, callback) => {
  // 检查是否所有关键词均为空
  const allEmpty = ruleForm.value.keyword.every((item) => !item.trim());
  if (allEmpty) {
    callback(new Error("至少填写一个关键词"));
  } else {
    callback();
  }
};
const rules = {
  keyword: [
    { required: true, message: "请至少输入一个关键词", trigger: "blur" },
    {
      validator: validateKeywords,
      message: "请至少输入一个关键词",
      trigger: "blur",
    },
  ],
  teamIntro: [{ required: true, message: "请输入介绍", trigger: "blur" }],
  recruitNeed: [{ required: true, message: "请输入招新需求", trigger: "blur" }],
};
const teamSave = async () => {
  $("#summernote1").summernote("fontName", "Helvetica");
  $("#summernote2").summernote("fontName", "Helvetica");
  markupStr1 = $("#summernote1").summernote("code");
  //console.log(markupStr1);
  markupStr2 = $("#summernote2").summernote("code");
  //console.log(markupStr2);
  ruleForm.value.teamIntro = extractTextFromHTML(markupStr1);
  ruleForm.value.recruitNeed = extractTextFromHTML(markupStr2);
  console.log(extractTextFromHTML(markupStr1));
  console.log(extractTextFromHTML(markupStr2));

  await ruleFormRef.value.validate();
};
</script>
<template>
  <el-form :model="ruleForm" ref="ruleFormRef" :rules="rules">
    <div class="divideBox">
      <el-form-item label="关键词" prop="keyword" class="editStyle">
        <el-text class="mx-1" type="primary"
          ><el-icon><Warning /></el-icon>单个关键词限制在10个字以内</el-text
        >
        <div>
          <el-form inline class="keyForm">
            <el-form-item label="关键词1:"
              ><el-input
                placeholder="请输入关键词1"
                v-model="ruleForm.keyword[0]"
              ></el-input
            ></el-form-item>
            <el-form-item label="关键词2:"
              ><el-input
                placeholder="请输入关键词2"
                v-model="ruleForm.keyword[1]"
              ></el-input
            ></el-form-item>
            <el-form-item label="关键词3:"
              ><el-input
                placeholder="请输入关键词3"
                v-model="ruleForm.keyword[2]"
              ></el-input
            ></el-form-item>
          </el-form>
        </div>
      </el-form-item>
    </div>
    <div class="divideBox">
      <el-form-item
        label="组别介绍"
        prop="teamIntro"
        style="display: block"
        class="editStyle"
      >
        <div id="summernote1" ref="editableElement"></div>
      </el-form-item>
    </div>
    <div class="divideBox">
      <el-form-item
        label="招新需求"
        prop="recruitNeed"
        style="display: block"
        class="editStyle"
      >
        <div id="summernote2"></div>
      </el-form-item>
    </div>
  </el-form>
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
  margin-left: -62px;
}
.el-input {
  margin-left: 30px;
}
.editStyle > .el-form-item__label {
  font-size: 16px;
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
.mx-1 {
  margin-left: 10px;
}
</style>
