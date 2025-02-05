<template>
  <link
    rel="stylesheet"
    href="//at.alicdn.com/t/c/font_4635501_lj77pzln4y.css"
  />
  <div>
    <el-button
      style="float: right; margin-top: 15px; margin-bottom: 15px"
      @click="openAddBox"
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
          <el-button @click="getTestData(row.id)">编辑</el-button>
          <el-button @click="deleteTest(row.id)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column></el-table-column>
    </el-table>
  </div>
  <el-dialog
    class="addBox"
    v-model="addBoxVisible"
    :show-close="false"
    style="width: 800px; position: relative"
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
        @click="addBoxVisible = false"
        style="display: inline-block; margin-right: 20px"
        ><CloseBold
      /></el-icon>
    </div>
    <div style="margin-top: 30px; margin-left: 30px; height: 470px">
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
          <!-- <el-button
            ><i class="iconfont icon-shangchuan" style="margin-right: 8px"></i
            >上传文件</el-button
          > -->
          <el-upload
            ref="upload"
            class="upload-demo"
            action="https://smalla.cosh.fun/file/upload"
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleFileChange"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button type="primary">上传文件</el-button>
            </template>
          </el-upload>
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
  <el-dialog
    class="changeBox"
    v-model="changeBoxVisible"
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
        @click="changeBoxVisible = false"
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
        v-model="id"
        @click="changeTestData(id)"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { genFileId } from 'element-plus'
import { onMounted } from 'vue'
import FormData from 'form-data'

import {
  getAllTestReq,
  addTestReq,
  delTestReq,
  getTestReq,
  changeTestReq,
  uploadFileReq,
} from '@/api/test.js'

import dayjs from 'dayjs'
dayjs().format()
const processList = ref([])

const name = ref('')
const content = ref('')
const date = ref('')
const begin = ref('')
const end = ref('')
const id = ref('')
const addBoxVisible = ref(false)
const changeBoxVisible = ref(false)
const upload = ref()

const getAllTestData = async () => {
  const res = await getAllTestReq()
  res.data.forEach((item) => {
    ;(item.begin = dayjs(item.begin).format('YYYY-MM-DD')),
      (item.end = dayjs(item.end).format('YYYY-MM-DD'))
  })
  processList.value = res.data || []
}
//请求获取考核信息

onMounted(() => {
  getAllTestData()
})
//获取考核信息

const openAddBox = () => {
  addBoxVisible.value = true
  name.value = ''
  content.value = ''
  date.value = ''
}
//从添加入口打开添加框

const addTestData = async () => {
  const res = await addTestReq({
    name: name.value,
    content: content.value,
    begin: begin.value,
    end: end.value,
  })
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
    addBoxVisible.value = false
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
  console.log(date.value[0])
  begin.value = dayjs(date.value[0]).format('YYYY-MM-DD ')
  end.value = dayjs(date.value[1]).format('YYYY-MM-DD ')

  ElMessageBox.confirm('您确定要添加吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    addTestData()
    addBoxVisible.value = false
  })
}
//添加考核信息

function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00+08:00')

  // 获取星期、月份、日期、年份、时间
  const weekday = date.toLocaleString('en-US', { weekday: 'short' })
  const month = date.toLocaleString('en-US', { month: 'short' })
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // 根据需要格式化时区
  const timezoneOffset = '+0800'
  const timeZoneName = '(中国标准时间)'

  // 组合成最终格式
  const finalDate = `${weekday} ${month} ${day} ${year} ${hours}:${minutes}:${seconds} GMT${timezoneOffset} ${timeZoneName}`

  return finalDate
}
//回显日期

const deleteFn = async (e) => {
  const res = await delTestReq(e)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAllTestData()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
//请求删除考核信息

const deleteTest = (e) => {
  ElMessageBox.confirm('您确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteFn(e)
  })
}
//删除考核信息

const getTestData = async (e) => {
  changeBoxVisible.value = true
  const res = await getTestReq(e)
  if (res.code == 200) {
    name.value = res.data.name
    content.value = res.data.content
    id.value = res.data.id
    let startDate = formatDate(dayjs(res.data.begin).format('YYYY-MM-DD'))
    let endDate = formatDate(dayjs(res.data.end).format('YYYY-MM-DD'))
    date.value = [startDate, endDate]
    // console.log(id.value)
  }
}
//请求得到单独考核信息

const changeTestData = async (id) => {
  console.log(id)
  begin.value = dayjs(date.value[0]).format('YYYY-MM-DD ')
  end.value = dayjs(date.value[1]).format('YYYY-MM-DD ')
  const res = await changeTestReq({
    name: name.value,
    content: content.value,
    begin: begin.value,
    end: end.value,
    id: id,
  })
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '修改成功',
    })
    changeBoxVisible.value = false
    getAllTestData()
  } else {
    ElMessage({
      type: 'error',
      message: '修改失败',
    })
  }
}

const uploadFile = async (file) => {
  console.log(file)
  const formData = new FormData() // 创建 FormData 对象
  formData.append('file', file) // 添加文件到 FormData

  formData.forEach((value, key) => {
    console.log(key, value)
  })
  const res = await uploadFileReq(formData)
  console.log(res)
  if (res.code == 200) {
    d
    ElMessage({
      type: 'success',
      message: '上传成功',
    })
  }
}

const handleExceed = (files) => {
  upload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value.handleStart(file)
  // console.log(file)
}

const handleFileChange = async (file) => {
  if (!file) {
    return
  }
  const formData = new FormData() // 创建 FormData 对象
  formData.append('file', file) // 添加文件到 FormData
  const res = await uploadFileReq(formData)
  console.log(res)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '上传成功',
    })
  }
}
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

  display: flex;
  margin: 70px auto;
  flex-wrap: wrap;
}

.changeBox {
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
