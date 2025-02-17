<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import extractTextFromHTML from "../utils/extractText";
import { getGroupDetail, updateGroup } from "@/api/group";
let markupStr1 = $("#summernote1").summernote("code");
let markupStr2 = $("#summernote2").summernote("code");
const id = ref(0);
const setFont = () => {
  $("#summernote1").summernote("fontName", "Helvetica");
  $("#summernote2").summernote("fontName", "Helvetica");
};
const initSummernote = () => {
  // 初始化第一个编辑器
  $(document).ready(function () {
    setFont();
    $("#summernote1").summernote("destroy"); // 确保之前的实例被销毁
    $("#summernote1").summernote({
      height: 200,
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
      height: 200,
      width: 1200,
      minHeight: null,
      maxHeight: null,
      focus: true,
      fontNamesIgnoreCheck: ["Helvetica"],
      fontNames: ["Helvetica"],
    });
    setFont();
    // 设置字体样式
  });
};

onMounted(() => {
  initSummernote();
});
onBeforeUnmount(() => {
  // 组件即将销毁时销毁编辑器
  $("#summernote1").summernote("destroy");
  $("#summernote2").summernote("destroy");
});

const ruleFormRef = ref();
const ruleForm = ref({
  introduction: "",
  requirement: "",
  keywords: ["", "", ""],
});
const defaultForm = {
  introduction: "",
  requirement: "",
  keywords: ["", "", ""],
};
const initForm = () => {
  ruleForm.value = defaultForm
}
const validateKeywords = (rule, value, callback) => {
  // 检查是否所有关键词均为空
  const allEmpty = ruleForm.value.keywords.every((item) => !item.trim());
  if (allEmpty) {
    callback(new Error("至少填写一个关键词"));
  } else {
     // 检查每个关键词是否超过10个字符
    const tooLongKeyword = ruleForm.value.keywords.find((item) => item.trim().length > 10);
    if (tooLongKeyword) {
      callback(new Error("每个关键词不能多于10个字"));
    } else {
      callback();
    }
  }
};
const rules = {
  keywords: [
    { required: true, message: "请至少输入一个关键词", trigger: "blur" },
    {
      validator: validateKeywords,
      message: "请至少输入一个关键词",
      trigger: "blur",
    },
  ],
  introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
  requirement: [{ required: true, message: "请输入招新需求", trigger: "blur" }],
};
const emit = defineEmits(['handleTeam'])
const teamSave = async () => {
  markupStr1 = $("#summernote1").summernote("code");
  markupStr2 = $("#summernote2").summernote("code");
  ruleForm.value.introduction = extractTextFromHTML(markupStr1);
  ruleForm.value.requirement = extractTextFromHTML(markupStr2);
  console.log(extractTextFromHTML(markupStr1));
  console.log(extractTextFromHTML(markupStr2));
  await ruleFormRef.value.validate();

  const dataToSend = {
    id: id.value,
    ...ruleForm.value,
  };
  const res = await updateGroup(dataToSend);
  emit('handleTeam',res.code)
};
const openEditGroup = async (groupId) => {
  id.value = groupId;
  const res = await getGroupDetail(groupId);
  ruleForm.value = res.data;
  $("#summernote1").summernote("code", ruleForm.value.introduction);
  $("#summernote2").summernote("code", ruleForm.value.requirement);
  setFont();
};
const clearValidate = () => {
  ruleFormRef.value.clearValidate();
};
defineExpose({
  openEditGroup,
  initForm,
  clearValidate
});
</script>
<template>
  <el-form :model="ruleForm" ref="ruleFormRef" :rules="rules">
    <div class="divideBox">
      <el-form-item label="关键词" prop="keywords" class="editStyle">
        <el-text class="mx-1" type="primary"
          ><el-icon><Warning /></el-icon>单个关键词限制在10个字以内</el-text
        >
        <div>
          <el-form inline class="keyForm">
            <el-form-item label="关键词1:"
              ><el-input
                placeholder="请输入关键词1"
                v-model="ruleForm.keywords[0]"
              ></el-input
            ></el-form-item>
            <el-form-item label="关键词2:"
              ><el-input
                placeholder="请输入关键词2"
                v-model="ruleForm.keywords[1]"
              ></el-input
            ></el-form-item>
            <el-form-item label="关键词3:"
              ><el-input
                placeholder="请输入关键词3"
                v-model="ruleForm.keywords[2]"
              ></el-input
            ></el-form-item>
          </el-form>
        </div>
      </el-form-item>
    </div>
    <div class="divideBox">
      <el-form-item
        label="组别介绍"
        prop="introduction"
        style="display: block"
        class="editStyle"
      >
        <div id="summernote1" ref="editableElement"></div>
      </el-form-item>
    </div>
    <div class="divideBox">
      <el-form-item
        label="招新需求"
        prop="requirement"
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
  padding-bottom: 5px;
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
