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
              <el-option label="计算机学院" value="计算机学院"></el-option>
              <el-option label="信息工程学院" value="信息工程学院"></el-option>
              <el-option label="自动化学院" value="自动化学院"></el-option>
              <el-option label="外国语学院" value="外国语学院"></el-option>
              <el-option label="机电工程学院" value="机电工程学院"></el-option>
              <el-option label="集成电路学院" value="集成电路学院"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div style="display: flex; justify-content: space-between">
          <el-form-item label="当前考核流程">
            <el-select v-model="process" placeholder="请选择考核流程">
              <el-option label="第一次考核" value="第一次考核"></el-option>
              <el-option label="第二次考核" value="第二次考核"></el-option>
              <el-option label="第三次考核" value="第三次考核"></el-option>
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
    <el-card style="min-width: 95%" class="personBottom">
      <el-button style="width: 80px; color: #959595; margin-bottom: 8px"
        >导出</el-button
      >
      <el-table :data="studentList">
        <!-- <el-table-column label=""></el-table-column> -->
        <el-table-column label="序号" prop="id" width="70"></el-table-column>
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
          prop="testId"
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
          width="140"
        ></el-table-column>
        <el-table-column
          label="专业班级"
          prop="majorClass"
          width="150"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="getUser(row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="5"
        style="float: right"
        size="2"
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
            <el-input placeholder="请输入" v-model="nickname"></el-input>
          </el-form-item>
          <el-form-item label="学号：">
            <el-input placeholder="请输入" v-model="stuId"></el-input>
          </el-form-item>
          <el-form-item label="方向：">
            <el-select v-model="groupOp" placeholder="请选择">
              <el-option label="前端组" value="1"></el-option>
              <el-option label="后端组" value="2"></el-option>
              <el-option label="运营组" value="3"></el-option>
              <el-option label="AI组" value="4"></el-option>
              <el-option label="电控组" value="5"></el-option>
              <el-option label="机械组" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input placeholder="请输入" v-model="telephone"></el-input>
          </el-form-item>
          <el-form-item label="年级：">
            <el-input placeholder="请输入" v-model="year"></el-input>
          </el-form-item>
          <el-form-item label="学院：">
            <el-select v-model="collegeId" placeholder="请选择">
              <el-option label="信息工程学院" value="1"></el-option>
              <el-option label="计算机学院" value="2"></el-option>
              <el-option label="机电学院" value="3"></el-option>
              <el-option label="能源与材料学院" value="4"></el-option>
              <el-option label="外国语学院" value="5"></el-option>
              <el-option label="自动化学院" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业班级：">
            <el-input placeholder="请输入" v-model="majorClass"></el-input>
          </el-form-item>
          <el-form-item label="个人简介：">
            <el-input
              v-model="selfIntroduction"
              placeholder="请输入"
              style="width: 250px; height: 130px"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <div class="card2">
          <div class="left">
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) in processList"
                :key="index"
                :size="large"
                :icon="icon"
                :type="item.testName ? 'primary' : ''"
                :hollow="item.status === 1"
                :timestamp="
                  item.status === 1
                    ? '正在进行'
                    : item.status === 0
                    ? '未通过'
                    : item.status === 2
                    ? '已通过'
                    : ''
                "
              >
                {{ item.testName || '未进行的考核' }}
              </el-timeline-item>
            </el-timeline>
          </div>

          <div class="right">
            <div style="display: flex">
              <el-popover
                placement="bottom"
                title="输入评价"
                :width="300"
                trigger="click"
              >
                <el-button
                  type="primary"
                  style="float: right; margin-top: -34px; margin-bottom: 10px"
                  @click="pass"
                  >确定</el-button
                ><el-input
                  style="width: 270px; height: 150px"
                  v-model="assess"
                ></el-input>
                <template #reference>
                  <el-button type="success">通过</el-button>
                </template>
              </el-popover>

              <el-button type="danger">未通过</el-button>
            </div>

            <el-button type="plain" @click="returnFn">回退</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import router from '../routes'
import { computed } from 'vue'
import { useStore } from 'vuex'
import store from '../store'
import { onMounted } from 'vue'

import {
  getAllUserReq,
  getUserReq,
  changeUserReq,
  getUserProcessReq,
} from '../api/student'

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
const assess = ref('')
const page = ref(1)
const pageSize = ref(6)
const page1 = ref('page1')
const page2 = ref('page2')
const showPage = computed(() => store.state.showPage)
const studentList = ref([])
const processList = ref([])

const goToPage1 = () => {
  store.dispatch('updatePage', String(page1.value))
}
const goToPage2 = () => {
  store.dispatch('updatePage', String(page2.value))
}

const getAllUser = async () => {
  const res = await getAllUserReq({
    page: page.value,
    pageSize: pageSize.value,
  })

  studentList.value = res.data.records || []
}
//请求获取所有用户

onMounted(() => {
  getAllUser()
})
//获取所有用户

const getUserProcess = async (id) => {
  console.log(id)
  const res = await getUserProcessReq(id)
  processList.value = res.data
  console.log(processList.value)
}
//获取用户的考核进度

const getUser = async (id) => {
  goToPage2()
  const res = await getUserReq(id)
  getUserProcess(id)
  console.log(res)
  const data = res.data
  changeId.value = id
  nickname.value = data.nickname
  stuId.value = data.stuId
  groupName.value = data.groupName
  telephone.value = data.telephone
  year.value = data.year
  collegeId.value = data.collegeId
  majorClass.value = data.majorClass
  selfIntroduction.value = data.selfIntroduction
  // const id = id
}
//获取单个用户

const searchUser = async (stuId) => {
  const res = await getUserReq(stuId)
  if (res.code == 200) {
    console.log(res.data)
    studentList.value = [res.data]
  } else {
    ElMessage({
      type: 'error',
      message: '不存在该用户',
    })
  }
}
//搜索用户

const pass = () => {
  console.log(assess.value)
  ElMessageBox.confirm('您确定提交该评价吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage({
      type: 'success',
      message: '评价成功',
    })
  })
}

const clear = () => {
  ;(year.value = ''),
    (nickname.value = ''),
    (stuId.value = ''),
    (collegeId.value = ''),
    (process.value = '')
}

const change = () => {
  const changeBtn = document.querySelector('.changeBtn')
  const chooseBtn = document.querySelector('.chooseBtn')
  changeBtn.style.display = 'none'
  chooseBtn.style.display = 'flex'
}

const changeUser = async (changeId) => {
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
}

const returnFn = () => {
  ElMessageBox.confirm('您确定要回退吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage({
      type: 'success',
      message: '已回退',
    })
  })
}
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
  margin-top: 80px;
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
</style>
