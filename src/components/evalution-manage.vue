<template>
  <link
    rel="stylesheet"
    href="//at.alicdn.com/t/c/font_4635501_lj77pzln4y.css"
  />
  <div>
    <el-button
      style="float: right; margin-top: 15px; margin-bottom: 15px"
      @click="dialogVisible = true"
      >+添加</el-button
    >
    <el-table :data="processList">
      <el-table-column
        label="考核名称"
        prop="name"
        width="131 "
      ></el-table-column>
      <el-table-column
        label="开始时间"
        prop="begin"
        width="170"
      ></el-table-column>
      <el-table-column
        label="结束时间"
        prop="end"
        width="170"
      ></el-table-column>
      <el-table-column
        label="创建人"
        prop="createName"
        width="150"
      ></el-table-column>
      <el-table-column
        label="当前状态"
        prop="status"
        width="300"
      ></el-table-column>
      <el-table-column label="操作" width="350" prop="id">
        <template #default="{ row }">
          <el-button @click="dialogVisible = true">编辑</el-button>
          <el-button @click="deleteTest(row.id)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column></el-table-column>
    </el-table>
  </div>
  <el-dialog
    class="addBox"
    v-model="dialogVisible"
    :show-close="false"
    style="width: 800px; height: 500px; position: relative"
  >
    <div
      style="
        background-color: #f8f8f8;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
    >
      <p style="display: inline-block; margin-left: 20px">添加考核</p>
      <el-icon
        @click="dialogVisible = false"
        style="display: inline-block; margin-right: 20px"
        ><CloseBold
      /></el-icon>
    </div>
    <div style="margin-top: 30px; margin-left: 30px">
      <el-form>
        <div style="display: flex; align-content: center; margin-left: -11px">
          <i
            class="iconfont icon-bitian"
            style="color: red; margin-right: -3px; margin-top: 5px"
          ></i>
          <el-form-item label="考核名称">
            <el-input placeholder="请输入" style="width: 200px" v-model="name">
            </el-input>
          </el-form-item>
        </div>
        <div style="display: flex; align-content: center; margin-left: -11px">
          <i
            class="iconfont icon-bitian"
            style="color: red; margin-right: -3px; margin-top: 5px"
          ></i>
          <el-form-item style="width: 500px" label="考核时间">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="To"
              start-placeholder="2024-06-20"
              end-placeholder="2024-08-20"
            />
          </el-form-item>
        </div>

        <el-form-item label="考核要求">
          <el-input
            placeholder="请输入"
            style="width: 400px; height: 200px"
            v-model="content"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="文件上传">
          <el-button
            ><i class="iconfont icon-shangchuan" style="margin-right: 8px"></i
            >上传文件</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div
      style="
        background-color: #f8f8f8;
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
      "
    >
      <el-button
        type="primary"
        style="width: 120px; margin-right: 10px"
        @click="addTest"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup>
// const showPage = ref('page1')
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAllTestReq } from '@/api/allTest.js'
import { onMounted } from 'vue'
import { addTestReq } from '../api/addTest'
import { delTestReq } from '../api/delTest'

const processList = ref([])

const name = ref('')
const content = ref('')
const date = ref('')
const begin = ref('')
const end = ref('')
const id = ref('')
const dialogVisible = ref(false)

function formatData(dateString) {
  return dateString.split('T')[0]
}
//格式化日期

const getTestData = async () => {
  const res = await getAllTestReq()
  res.data.forEach((item) => {
    ;(item.begin = formatData(item.begin)), (item.end = formatData(item.end))
  })
  processList.value = res.data || []
}
//请求获取考核信息

onMounted(() => {
  getTestData()
})

const addTestData = async () => {
  const res = await addTestReq({
    name: name.value,
    content: content.value,
    begin: date.value[0],
    end: date.value[1],
  })
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
    dialogVisible.value = false
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败',
    })
  }
}
//请求添加考核信息

const addTest = () => {
  if (name.value == '' || content.value == '' || date.value == '') {
    ElMessage({
      type: 'warning',
      message: '请完善信息',
    })
    return
  }
  ElMessageBox.confirm('您确定要添加吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    addTestData()
    dialogVisible.value = false
  })
}

const deleteTest = (e) => {
  ElMessageBox.confirm('您确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    id.value = e
    // delTestReq(id.value)
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    // getTestData()
  })
}
//删除考核信息
</script>

<style scoped>
::v-deep .cell {
  font-weight: 400;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid white;
}

.el-table {
  --el-table-header-bg-color: #4095e5;
  --el-table-header-text-color: #ffffff;
}

.addBox {
  border: 1px solid #e2e2e2;
  width: 800px;
  height: 470px;
  display: flex;
  margin: 70px auto;
  flex-wrap: wrap;
}

.el-icon {
  cursor: pointer;
}
</style>
