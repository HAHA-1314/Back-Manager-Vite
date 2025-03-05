<template>
  <div class="personBox" style="margin-top: 20px" v-if="showPage === 'page1'">
    <el-card style="min-width: 95%" class="personTop">
      <el-form inline>
        <div style="display: flex; justify-content: space-between">
          <el-form-item label="姓名：">
            <el-input placeholder="请输入姓名" v-model="nickname"> </el-input>
          </el-form-item>
          <el-form-item label="学号：">
            <el-input placeholder="请输入学号" v-model="stuId"> </el-input>
          </el-form-item>
          <el-form-item label="年级：">
            <el-select v-model="year" placeholder="请选择年级">
              <el-option label="2021" value="2021"></el-option>
              <el-option label="2022" value="2022"></el-option>
              <el-option label="2023" value="2023"></el-option>
              <el-option label="2024" value="2024"></el-option>
              <el-option label="2025" value="2025"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学院：">
            <el-select v-model="collegeId" placeholder="请选择学院">
              <el-option
                v-for="item in collegeList"
                :key="item.id"
                :label="item.college"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div style="display: flex; justify-content: space-between">
          <el-form-item label="当前考核流程">
            <el-select v-model="process" placeholder="请选择考核流程">
              <el-option
                v-for="test in testList"
                :key="test.id"
                :label="test.name"
                :value="test.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item class="buttonBox">
            <el-button
              style="width: 80px; color: #959595"
              @click="searchUser(stuId)"
              >搜索</el-button
            >
            <el-button
              style="width: 80px; color: #959595; margin-left: 30px"
              @click="clear"
              >重置</el-button
            ></el-form-item
          >
        </div>
      </el-form>
    </el-card>
    <el-card style="min-width: 95%; height: 470px" class="personBottom">
      <div style="display: flex; justify-content: space-between">
        <el-button
          style="width: 80px; color: #959595; margin-bottom: 8px"
          @click="exportExcel"
          >导出</el-button
        >
        <el-button
          type="success"
          style="width: 120px; color: white; margin-bottom: 8px"
          @click="registerAll"
          >一键通过报名</el-button
        >
      </div>

      <el-table :data="studentList">
        <!-- <el-table-column label=""></el-table-column> -->
        <el-table-column
          label="序号"
          prop="number"
          width="70"
        ></el-table-column>
        <el-table-column
          label="姓名"
          prop="nickname"
          width="100"
        ></el-table-column>
        <el-table-column
          label="学号"
          prop="stuId"
          width="140"
        ></el-table-column>
        <el-table-column
          label="当前考核流程"
          prop="test"
          width="160"
        ></el-table-column>
        <el-table-column
          label="联系方式"
          prop="telephone"
          width="180"
        ></el-table-column>
        <el-table-column label="年级" prop="year" width="100"></el-table-column>
        <el-table-column
          label="学院"
          prop="collegeId"
          width="250"
        ></el-table-column>
        <el-table-column
          label="专业班级"
          prop="majorClass"
          width="150"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="goToPage2(row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        layout="prev, pager, next"
        :total="studentTotal"
        :page-sizes="6"
        style="float: right"
        :background="true"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>
  </div>

  <div class="detailBox" v-if="showPage === 'page2'">
    <el-button style="margin-top: 10px" @click="goToPage1">返回</el-button>
    <div class="detailMain">
      <el-card>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: -20px;
            margin-left: 20px;
          "
        >
          <p>详细资料：</p>
          <el-button style="width: 80px" @click="change()" class="changeBtn"
            >修改</el-button
          >
          <div class="chooseBtn" style="display: none">
            <el-button
              class="saveBtn"
              type="primary"
              style="margin-right: 10px"
              v-model="changeId"
              @click="save(changeId)"
            >
              保存
            </el-button>
            <el-button class="cancelBtn" type="danger" @click="cancel"
              >取消</el-button
            >
          </div>
        </div>
        <el-form style="margin-left: 20px">
          <el-form-item label="姓名：">
            <el-input
              placeholder="请输入"
              v-model="nickname"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="学号：">
            <el-input
              placeholder="请输入"
              v-model="stuId"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="方向：">
            <el-select v-model="groupOp" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in groupList"
                :key="item.value"
                :label="item.label"
                :value="item.groupId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input
              placeholder="请输入"
              v-model="telephone"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="年级：">
            <el-input
              placeholder="请输入"
              v-model="year"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="学院：">
            <el-select
              v-model="collegeId"
              placeholder="请选择"
              :disabled="isDisabled"
            >
              <el-option
                v-for="item in collegeList"
                :key="item.id"
                :label="item.college"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业班级：">
            <el-input
              placeholder="请输入"
              v-model="majorClass"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="个人简介：">
            <el-input
              :disabled="isDisabled"
              v-model="selfIntroduction"
              placeholder="请输入"
              style="width: 250px; height: 130px"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card style="overflow: auto">
        <div class="card2">
          <div class="left" style="height: 400px">
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) in processList"
                :key="index"
                :size="large"
                :class="{ 'green-timestamp': item.status === 1 }"
                :icon="icon"
                :type="
                  item.status === 1
                    ? 'success'
                    : item.status === 0
                    ? ''
                    : item.status === 2
                    ? 'primary'
                    : ''
                "
                :hollow="item.status === 2 || item.status === 0"
                :timestamp="
                  item.status === 1
                    ? '正在进行\n' + (item.comment || '')
                    : item.status === 0
                    ? '未通过\n' + (item.comment || '')
                    : item.status === 2
                    ? '已通过\n' + (item.comment || '')
                    : ''
                "
              >
                {{ item.name || '未进行的考核' }}
              </el-timeline-item>
            </el-timeline>
          </div>

          <div class="right">
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: flex-end;
              "
            >
              <el-popover
                placement="bottom"
                title="输入评价"
                :width="300"
                trigger="click"
              >
                <el-button
                  type="primary"
                  style="float: right; margin-top: -34px; margin-bottom: 10px"
                  @click="passUser"
                  >确定</el-button
                ><el-input
                  style="width: 270px; height: 150px"
                  v-model="comment"
                ></el-input>
                <template #reference>
                  <el-button type="success">通过</el-button>
                </template>
              </el-popover>
              <el-button type="danger" @click="failUser">未通过</el-button>
              <el-button type="plain" @click="returnUser">回退</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// import { useStore } from 'vuex'
import { computed } from 'vue'

import { useRoute } from 'vue-router'
import store from '../store'
import { onMounted, onUpdated } from 'vue'

import {
  getAllUserReq,
  getUserReq,
  changeUserReq,
  getUserProcessReq,
  passUserReq,
  failUserReq,
  returnUserReq,
  getAllTestReq,
  putCommentReq,
  getCollegeReq,
  getExcelReq,
  getCommentReq,
  registerAllReq,
} from '../api/student'
import { color } from 'echarts'

// const store = useStore()
const route = useRoute()
const year = ref('')
const nickname = ref('')
const telephone = ref('')
const collegeId = ref('')
const majorClass = ref('')
const selfIntroduction = ref('')
const id = ref('')
const stuId = ref('')
const process = ref('')
const groupName = ref('')
const groupOp = ref('')
const changeId = ref('')
const comment = ref('')
const page = ref(1)
const pageSize = ref(5)
const page1 = ref('page1')
const page2 = ref('page2')
const showPage = computed(() => store.state.showPage)
const studentList = ref([])
const processList = ref([])
const currentTestId = ref('')
const lastId = ref('')
const nextId = ref('')
const currentUserId = ref('')
const isDisabled = ref(true)
const testList = ref([])
const newArray = ref([])
const collegeList = ref([])
const excelList = ref([])
const commentList = ref([])
const studentTotal = ref(1)
const exportStudentList = ref([])
const groupList = [
  {
    label: '前端组',
    groupId: '1',
  },
  {
    label: '后端组',
    groupId: '2',
  },
  {
    label: 'AI组',
    groupId: '3',
  },
  {
    label: '电控组',
    groupId: '4',
  },
  {
    label: '机械组',
    groupId: '5',
  },
  {
    label: '运营组',
    groupId: '6',
  },
  {
    label: '项目组',
    groupId: '7',
  },
]
const collegeMap = {
  1: '建筑与城市规划学院',
  2: '环境科学与工程学院',
  3: '外国语学院',
  4: '轻工化工学院',
  5: '物理与光电工程学院',
  6: '信息工程学院',
  7: '管理学院',
  8: '机电工程学院',
  9: '土木与交通工程学院',
  10: '体育学院',
  11: '法学院',
  12: '自动化学院',
  13: '商学院',
  14: '生物医药学院',
  15: '材料与能源学院',
  16: '计算机学院',
  17: '艺术与设计学院',
  18: '数学与统计学院',
  19: '集成电路学院',
}

const goToPage1 = () => {
  store.dispatch('updatePage', String(page1.value))
  isDisabled.value = true
  clear()
}
const goToPage2 = async (id) => {
  store.dispatch('updatePage', String(page2.value))
  await getUser(id)
}

const getAllUser = async () => {
  const res = await getAllUserReq({
    page: page.value,
    pageSize: pageSize.value,
  })
  // console.log(res)
  studentList.value = res.data.records || []
  studentTotal.value = res.data.total
  // console.log(studentList.value)
  studentList.value.forEach((item, index) => {
    item.collegeId = collegeMap[item.collegeId] || '未知学院'
    item.number = index + 1
  })
}
//请求获取所有用户
//分页请求
const handleCurrentChange = (val) => {
  page.value = val
  getAllUser()
}

const getCollegeList = async () => {
  const res = await getCollegeReq()
  collegeList.value = res.data
  // console.log(collegeList.value)
}

onMounted(() => {
  const currentPage = computed(() => store.state.showPage)

  getAllUser()
  getAllTest()
  getCollegeList()

  //  const currentPage = computed(() => store.state.showPage)
  if (currentPage.value == 'page2') {
    let appointToPerson = route.query.stuId
    console.log(appointToPerson)
    if (appointToPerson) {
      getUser(appointToPerson)
    } else {
      currentUserId.value = localStorage.getItem('currentUserId')
      console.log(currentUserId.value)
      if (currentUserId.value) {
        getUser(currentUserId.value)
      }
    }
  }

  // console.log(store.state.showPage)
})
//页面最初渲染数据

const getAllTest = async () => {
  const res = await getAllTestReq()
  // console.log(res)
  testList.value = res.data
  // console.log(testList.value)
}
//获取所有考核

const exportExcel = async () => {
  const response = await getAllUserReq({
    page: 1,
    pageSize: 1000,
  })
  exportStudentList.value = response.data.records

  excelList.value = exportStudentList.value.map((item, index) => {
    // 修改属性名
    const {
      id,
      test,
      collegeId,
      telephone,
      nickname,
      groupOp,
      testId,
      ...rest
    } = item
    return {
      ...rest,
      stuId: id,
      testName: test,
      phone: telephone,
      name: nickname,
      college: collegeId,
      ordinal: index + 1,
    }
  })

  // console.log(excelList.value)
  const res = await getExcelReq(excelList.value)
  // console.log(res)

  const url = URL.createObjectURL(res)

  // 创建下载链接
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', '考核名单.xlsx') // 设置下载的文件名

  // 触发点击
  document.body.appendChild(link)
  link.click()

  // 清理
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  // console.log(res)
}
//导出excel

const registerAll = async () => {
  const res = await registerAllReq()
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '一键通过成功',
    })
  }
  getAllUser()
}
//一键通过报名

const getUserProcess = async (id) => {
  processList.value = []
  currentUserId.value = id
  // console.log(currentUserId.value)
  const res = await getUserProcessReq(id)
  newArray.value = res.data
  // console.log(newArray.value)

  const maxLength = Math.max(newArray.value.length, testList.value.length)
  for (let i = 0; i < maxLength; i++) {
    const newArrayItem = newArray.value[i] || {}
    const testListItem = testList.value[i] || {}
    processList.value.push({ ...newArrayItem, ...testListItem })
  } //合并考核数组和学生进度
  const targetObject = processList.value.find(
    (item) => item.status === 1 || item.status === 0
  )
  if (targetObject) {
    currentTestId.value = targetObject.id
    // console.log(currentTestId.value)
    const currentIndex = processList.value.findIndex(
      (item) => item.testId === currentTestId.value
    )
    // console.log(currentIndex)
    // 获取上一个元素的 testId
    if (currentIndex > 0) {
      lastId.value = processList.value[currentIndex - 1].id
    } else {
      lastId.value = null // 如果没有上一个元素，将 lastId 设为 null
    }

    // 获取下一个元素的 testId
    if (currentIndex < processList.value.length - 1) {
      nextId.value = processList.value[currentIndex + 1].id
    } else {
      nextId.value = null // 如果没有下一个元素，将 nextId 设为 null
    }
    // console.log(lastId.value, nextId.value)
  }
  await getComment()

  processList.value = commentList.value.map((comment, index) => {
    const processItem = processList.value[index] || {}
    return {
      ...processItem,
      comment: comment, // 假设 comment 对象中有 comment 属性
    }
  })

  console.log(processList.value)
  if (processList.value.length == 0) {
    processList.value.push({
      name: '暂无考核数据',

      comment: '',
    })
  }
}
//获取用户的考核进度

const getComment = async () => {
  // 用于存储每个请求的结果
  commentList.value = []
  for (const test of testList.value) {
    const testId = test.id // 假设 testList 中的每个对象有一个 id 属性作为 testId
    const res = await getCommentReq({ userId: currentUserId.value, testId })
    commentList.value.push(res.data) // 将每个请求的结果存储到数组中
  }
  // 可以在这里处理所有请求的结果
  console.log(commentList.value)
}
//获取用户的评价

const getUser = async (id) => {
  currentUserId.value = id
  localStorage.setItem('currentUserId', currentUserId.value)

  const res = await getUserReq(currentUserId.value)
  getUserProcess(id)
  // console.log(res)
  const data = res.data
  changeId.value = id
  nickname.value = data.nickname
  stuId.value = data.stuId
  // groupOp.value = data.groupId
  telephone.value = data.telephone
  year.value = data.year
  collegeId.value = data.collegeId
  majorClass.value = data.majorClass
  selfIntroduction.value = data.selfIntroduction

  if (data.groupId == 1) {
    groupOp.value = '前端组'
  } else if (data.groupId == 2) {
    groupOp.value = '后端组'
  } else if (data.groupId == 3) {
    groupOp.value = 'AI组'
  } else if (data.groupId == 4) {
    groupOp.value = '电控组 '
  } else if (data.groupId == 5) {
    groupOp.value = '机械组'
  } else if (data.groupId == 6) {
    groupOp.value = '运营组'
  } else if (data.groupId == 7) {
    groupOp.value = '项目组'
  }

  // const id = id
}
//获取单个用户

const searchUser = async (stuId) => {
  console.log(nickname.value, stuId, collegeId.value, process.value, year.value)
  const res = await getAllUserReq({
    page: 1,
    pageSize: 4,
    nickname: nickname.value,
    stuId: stuId,
  })
  if (res.code == 200) {
    // console.log(res.data)
    studentList.value = res.data.records || []
    studentList.value.forEach((item, index) => {
      item.collegeId = collegeMap[item.collegeId] || '未知学院'
      item.number = index + 1
    })
    // console.log(studentList.value)
  } else {
    ElMessage({
      type: 'error',
      message: '不存在该用户',
    })
  }
}
//搜索用户

const clear = () => {
  ;(year.value = ''),
    (nickname.value = ''),
    (stuId.value = ''),
    (collegeId.value = ''),
    (process.value = '')
  getAllUser()
}
//重置

const change = () => {
  const changeBtn = document.querySelector('.changeBtn')
  const chooseBtn = document.querySelector('.chooseBtn')
  changeBtn.style.display = 'none'
  chooseBtn.style.display = 'flex'
  isDisabled.value = false
}
//修改前提

const changeUser = async (changeId) => {
  // console.log(changeId)
  console.log(groupOp.value)
  if (groupOp.value == '前端组') {
    groupOp.value = 1
  } else if (groupOp.value == '后端组') {
    groupOp.value = 2
  } else if (groupOp.value == 'AI组') {
    groupOp.value = 3
  } else if (groupOp.value == '电控组') {
    groupOp.value = 4
  } else if (groupOp.value == '机械组') {
    groupOp.value = 5
  } else if (groupOp.value == '运营组') {
    groupOp.value = 6
  } else if (groupOp.value == '项目组') {
    groupOp.value = 7
  }
  console.log(groupOp.value)
  const res = await changeUserReq({
    id: changeId,
    nickname: nickname.value,
    stuId: stuId.value,
    groupOp: groupOp.value,
    telephone: telephone.value,
    year: year.value,
    collegeId: collegeId.value,
    majorClass: majorClass.value,
    selfIntroduction: selfIntroduction.value,
  })

  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '修改成功',
    })
  }
  getAllUser()
  console.log(res)
}
//请求修改用户信息

const save = (changeId) => {
  const changeBtn = document.querySelector('.changeBtn')
  const chooseBtn = document.querySelector('.chooseBtn')
  ElMessageBox.confirm('您确定修改信息吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    changeUser(changeId)
    isDisabled.value = true
    changeBtn.style.display = 'flex'
    chooseBtn.style.display = 'none'
  })
}
//保存修改

const cancel = () => {
  const changeBtn = document.querySelector('.changeBtn')
  const chooseBtn = document.querySelector('.chooseBtn')
  changeBtn.style.display = 'flex'
  chooseBtn.style.display = 'none'
  isDisabled.value = true
}
//取消修改用户信息

const putComment = async () => {
  const res = await putCommentReq({
    testId: currentTestId.value,
    userId: currentUserId.value,
    comment: comment.value,
  })
  // console.log(res)
}
//请求提交评价

//提交评价前提

const passUser = async () => {
  putComment()
  console.log(
    comment.value,
    currentTestId.value,
    currentUserId.value,
    nextId.value
  )
  const res = await passUserReq({
    testId: currentTestId.value,
    userId: currentUserId.value,
    status: 2,
    nextId: nextId.value,
  })
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '通过',
    })
    comment.value = ''
    getUserProcess(currentUserId.value)
    // console.log(currentUserId.value)
  }
  console.log(res)
}
//请求通过用户

const failFn = async () => {
  const res = await failUserReq({
    testId: currentTestId.value,
    userId: currentUserId.value,
    status: 0,
  })
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '未通过',
    })
    getUserProcess(currentUserId.value)
  } else {
    ElMessage({
      type: 'error',
      message: '未通过失败',
    })
  }
}
//请求未通过用户

const failUser = () => {
  ElMessageBox.confirm('您确定要未通过吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    failFn()
  })
}
//未通过用户前提

const returnFn = async () => {
  // console.log(currentTestId.value)
  const res = await returnUserReq({
    testId: currentTestId.value,
    userId: currentUserId.value,
    lastId: lastId.value,
  })
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '已回退',
    })
    getUserProcess(currentUserId.value)
  } else {
    ElMessage({
      type: 'error',
      message: '回退失败',
    })
  }
  // console.log(res)
}
//请求回退用户

const returnUser = () => {
  ElMessageBox.confirm('您确定要回退吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    returnFn()
  })
}
//回退用户
</script>

<style scoped>
.personBox {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.el-input {
  width: 200px;
}

.el-select {
  width: 200px;
}

.buttonBox {
  margin-left: 300px;
}

.personBottom {
  margin-top: 30px;
}

:deep(.cell) {
  font-weight: 400;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid white;
}

.el-table {
  --el-table-header-bg-color: #4095e5;
  --el-table-header-text-color: #ffffff;
}

.detailMain {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.detailMain .el-card {
  width: 600px;
  height: 600px;
}

.detailMain.el-form-item {
  width: 200px;
  margin-top: 15px;
}

.el-timeline-item {
  width: 200px;
  height: 130px;
  font-size: 20px;
}

.left {
  margin-top: 30px;
  margin-left: -18px;
}

.right {
  width: 200px;
  display: flex;
  flex-wrap: wrap;
}

.right .el-button {
  width: 100px;
  margin-top: 30px;
}

.card2 {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.el-timeline-item {
  height: 75px;
}

:deep(.el-timeline-item__timestamp) {
  white-space: pre-wrap;
  line-height: 1.5;
}

.green-timestamp {
  --el-text-color-secondary: green;
  --el-text-color-primary: green;
}
</style>
