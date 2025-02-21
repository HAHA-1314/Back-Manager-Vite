<template>
  <link
    rel="stylesheet"
    href="//at.alicdn.com/t/c/font_4635501_lj77pzln4y.css"
  />

  <div>
    <el-card class="top-box" style="position: relative; height: 300px">
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        "
      >
        <el-select
          v-model="name"
          style="width: 120px"
          placeholder="第一次考核"
          @change="handleChange"
        >
          <el-option
            v-for="test in testList"
            :key="test.id"
            :label="test.name"
            :value="test.id"
          ></el-option>
        </el-select>
        <el-button @click="addBox = true">添加预约</el-button>
      </div>
      <el-table :data="appointList">
        <el-table-column label="序号" prop="id" width="120"></el-table-column>
        <el-table-column label="预约开启时间" prop="begin"></el-table-column>
        <el-table-column label="预约结束时间" prop="end"></el-table-column>
        <el-table-column
          label="面试间隔时间"
          prop="intervals"
        ></el-table-column>
        <el-table-column
          label="每个时间段可预约的人数"
          prop="num"
        ></el-table-column>
        <el-table-column label="操作" prop="id">
          <template #default="{ row }">
            <el-button @click="getAppointData(row.id)">编辑</el-button>
            <el-button @click="deleteAppoint(row.id, row.father)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="appointPage"
        page-size="2"
        background
        layout="prev, pager, next"
        :total="appointList.length"
        style="position: absolute; bottom: 15px; right: 20px"
        @current-change="handleAppointChange"
      />
    </el-card>
    <el-dialog
      v-model="addBox"
      :show-close="false"
      style="width: 800px; height: 400px; color: black"
    >
      <div
        style="
          height: 55px;
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
        <p style="display: inline-block; margin-left: 20px">预约开启</p>
        <el-icon
          @click="addBox = false"
          style="display: inline-block; margin-right: 20px; font-size: 16px"
          ><CloseBold
        /></el-icon>
      </div>
      <div style="margin-top: 40px">
        <el-form style="margin-left: 30px">
          <div style="display: flex; align-content: center; margin-left: -11px">
            <i
              class="iconfont icon-bitian"
              style="color: red; margin-right: -3px; margin-top: 5px"
            ></i>
            <el-form-item label="考核轮次" style="width: 240px">
              <el-select
                v-model="process"
                style="margin-left: 30px"
                placeholder="第一次考核"
              >
                <el-option
                  v-for="test in testList"
                  :key="test.id"
                  :label="test.name"
                  :value="test.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex; align-content: center; margin-left: -11px">
            <i
              class="iconfont icon-bitian"
              style="color: red; margin-right: -3px; margin-top: 12px"
            ></i>
            <el-form-item
              label="预约开启时间"
              style="width: 800px; display: flex; align-items: center"
            >
              <el-date-picker
                v-model="date"
                format="YYYY-MM-DD HH:mm"
                type="datetimerange"
                start-placeholder="Start Date"
                end-placeholder="End Date"
                :disabled-date="disabledDate"
                @change="confirmDate"
              >
              </el-date-picker>
              <el-icon
                style="color: #45a5ff; font-size: 20px; margin: 0 4px 0 8px"
                ><Warning
              /></el-icon>
              <p style="color: #45a5ff; font-size: 10px">单次最多预约4小时</p>
            </el-form-item>
          </div>
          <div style="display: flex; align-content: center; margin-left: -11px">
            <i
              class="iconfont icon-bitian"
              style="color: red; margin-right: -3px; margin-top: 5px"
            ></i>
            <el-form-item label="面试间隔时间" style="width: 300px">
              <el-select
                v-model="intervals"
                style="margin-left: 30px"
                placeholder="30分钟"
              >
                <el-option label="30分钟" value="30分钟"></el-option>
                <el-option label="1小时" value="1小时"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex; align-content: center; margin-left: -11px">
            <i
              class="iconfont icon-bitian"
              style="color: red; margin-right: -3px; margin-top: 5px"
            ></i>
            <el-form-item
              label="每个时间段可预约人数"
              style="width: 300px"
              placeholder="请输入"
            >
              <el-input v-model="num" style="margin-left: 30px"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div
        style="
          height: 55px;
          background-color: #f8f8f8;
          width: 100%;
          position: absolute;
          bottom: 0;
          right: 0;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
        "
      >
        <el-button
          @click="addAppoint"
          style="
            width: 120px;
            background-color: blue;
            color: white;
            margin-right: 20px;
            font-size: 16px;
          "
          >确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-model="changeBox"
      :show-close="false"
      style="width: 800px; height: 400px; color: black"
    >
      <div
        style="
          height: 55px;
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
        <p style="display: inline-block; margin-left: 20px">预约修改</p>
        <el-icon
          @click="changeBox = false"
          style="display: inline-block; margin-right: 20px; font-size: 16px"
          ><CloseBold
        /></el-icon>
      </div>
      <div style="margin-top: 40px">
        <el-form style="margin-left: 30px">
          <div style="display: flex; align-content: center; margin-left: -11px">
            <i
              class="iconfont icon-bitian"
              style="color: red; margin-right: -3px; margin-top: 5px"
            ></i>
            <el-form-item label="考核轮次" style="width: 240px">
              <el-select
                v-model="process"
                style="margin-left: 30px"
                placeholder="第一次考核"
              >
                <el-option
                  v-for="test in testList"
                  :key="test.id"
                  :label="test.name"
                  :value="test.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex; align-content: center; margin-left: -11px">
            <i
              class="iconfont icon-bitian"
              style="color: red; margin-right: -3px; margin-top: 12px"
            ></i>
            <el-form-item
              label="预约开启时间"
              style="width: 800px; display: flex; align-items: center"
            >
              <el-date-picker
                v-model="date"
                format="YYYY-MM-DD HH:mm"
                type="datetimerange"
                start-placeholder="Start Date"
                end-placeholder="End Date"
                :disabled-date="disabledDate"
                @change="confirmDate"
              >
              </el-date-picker>
              <el-icon
                style="color: #45a5ff; font-size: 20px; margin: 0 4px 0 8px"
                ><Warning
              /></el-icon>
              <p style="color: #45a5ff; font-size: 10px">单次最多预约4小时</p>
            </el-form-item>
          </div>
          <div style="display: flex; align-content: center; margin-left: -11px">
            <i
              class="iconfont icon-bitian"
              style="color: red; margin-right: -3px; margin-top: 5px"
            ></i>
            <el-form-item label="面试间隔时间" style="width: 300px">
              <el-select
                v-model="intervals"
                style="margin-left: 30px"
                placeholder="30分钟"
              >
                <el-option label="30分钟" value="30分钟"></el-option>
                <el-option label="1小时" value="1小时"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div style="display: flex; align-content: center; margin-left: -11px">
            <i
              class="iconfont icon-bitian"
              style="color: red; margin-right: -3px; margin-top: 5px"
            ></i>
            <el-form-item
              label="每个时间段可预约人数"
              style="width: 300px"
              placeholder="请输入"
            >
              <el-input v-model="num" style="margin-left: 30px"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div
        style="
          height: 55px;
          background-color: #f8f8f8;
          width: 100%;
          position: absolute;
          bottom: 0;
          right: 0;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
        "
      >
        <el-button
          v-model="currentAppointId"
          @click="changeAppoint(currentAppointId)"
          style="
            width: 120px;
            background-color: blue;
            color: white;
            margin-right: 20px;
            font-size: 16px;
          "
          >确定
        </el-button>
      </div>
    </el-dialog>
    <el-card class="bottom-box" style="position: relative">
      <div>
        <el-form inline style="display: flex; justify-content: space-around">
          <el-form-item label="姓名">
            <el-input
              placeholder="请输入名字"
              v-model="nickname"
              style="width: 120px"
            ></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input
              placeholder="请输入学号"
              v-model="id"
              style="width: 120px"
            ></el-input>
          </el-form-item>
          <el-form-item label="年级">
            <el-select v-model="grade" style="width: 120px" placeholder="2024">
              <el-option label="2024" value="2024"></el-option>
              <el-option label="2023" value="2023"></el-option>
              <el-option label="2022" value="2022"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考核轮次">
            <el-select
              v-model="process"
              style="width: 120px"
              placeholder="第一轮考核"
            >
              <el-option label="第一次考核" value="第一次考核"></el-option>
              <el-option label="第二次考核" value="第二次考核"></el-option>
              <el-option label="第三次考核" value="第三次考核"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预约序号">
            <el-select v-model="appointId" style="width: 80px" placeholder="1">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button>搜索</el-button>
            <el-button @click="clear">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="studentList">
          <el-table-column
            label="序号"
            prop="appointId"
            width="80"
          ></el-table-column>
          <el-table-column
            label="姓名"
            prop="nickname"
            width="120"
          ></el-table-column>
          <el-table-column
            label="学号"
            prop="stuId"
            width="130"
          ></el-table-column>
          <el-table-column label="年级" prop="year"></el-table-column>
          <el-table-column label="联系方式" prop="telephone"></el-table-column>
          <el-table-column label="预约时间" prop="time" width="350">
            <template #default="scope">
              {{ scope.row.begin }} - {{ scope.row.end }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button @click="goToPerson(row.stuId)">查看</el-button>
            </template>
          </el-table-column> </el-table
        ><el-pagination
          v-model:current-page="studentPage"
          page-size="4"
          background
          layout="prev, pager, next"
          :total="studentList.length"
          style="position: absolute; bottom: 15px; right: 20px"
          @current-change="handleStudentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../routes'
import store from '../store'
import { ElMessage, ElMessageBox } from 'element-plus'

import {
  allAppointReq,
  addAppointReq,
  deleteAppointReq,
  changeAppointReq,
  getAppointReq,
  getAllTestReq,
  getAllUserReq,
} from '../api/appoint'

import { onMounted } from 'vue'
import dayjs from 'dayjs'
dayjs().format()

// const store = useStore()
const newPage = ref('page2')
const process = ref('')
const addBox = ref(false)
const changeBox = ref(false)
const id = ref('')
const name = ref('')
const grade = ref('')
const begin = ref('')
const end = ref('')
const date = ref('')
const appointId = ref('')
const intervals = ref('')
const num = ref('')
const testId = ref('')
const lastFather = ref('')
const father = ref('')
const currentAppointId = ref('')
const currentTestId = ref('')
const testList = ref([])
const appointPage = ref(1)
const studentPage = ref(1)

const goToPerson = (stuId) => {
  router.push({
    path: 'person-management',
    query: {
      stuId: stuId,
    },
  })
  store.dispatch('updatePage', String(newPage.value))
  // console.log(stuId)
}

const appointList = ref([])

const studentList = ref([])

const handleChange = async (selected) => {
  currentTestId.value = selected
  console.log(currentTestId.value)
  getTestAppoint()
}
//改变当前考核轮次

const getTestAppoint = async () => {
  await allAppointReq({
    page: appointPage.value,
    pageSize: 2,
    testId: currentTestId.value,
  }).then((res) => {
    appointList.value = res.data.records || []
    currentAppointId.value = appointList.value[appointList.value.length - 1].id
    // console.log(currentAppointId.value)
    appointList.value.forEach((item) => {
      item.begin = dayjs(item.begin).format('YYYY-MM-DD HH:mm')
      item.end = dayjs(item.end).format('YYYY-MM-DD HH:mm')
      item.intervals = item.intervals === '00:30:00' ? '30分钟' : '1小时'
    })
  })
}
//筛选预约信息

const getAppointList = async () => {
  await allAppointReq({
    page: appointPage.value,
    pageSize: 2,
  }).then((res) => {
    appointList.value = res.data.records || []
    currentAppointId.value = appointList.value[appointList.value.length - 1].id
    console.log(currentAppointId.value)
    appointList.value.forEach((item) => {
      item.begin = dayjs(item.begin).format('YYYY-MM-DD HH:mm')
      item.end = dayjs(item.end).format('YYYY-MM-DD HH:mm')
      item.intervals = item.intervals === '00:30:00' ? '30分钟' : '1小时'
    })
  })
}
//请求获取全部预约信息

const handleAppointChange = (val) => {
  appointPage.value = val
  getAppointList()
}
//预约分页
const getTestList = async () => {
  await getAllTestReq().then((res) => {
    testList.value = res.data || []
  })
}
//请求获取考核信息

onMounted(() => {
  getAppointList()
  getTestList()
  getAllUser()
})
//获取预约信息

const getAllUser = async () => {
  await getAllUserReq({
    page: studentPage.value,
    pageSize: 4,
  }).then((res) => {
    studentList.value = res.data.records || []
    studentList.value.forEach((item) => {
      item.begin = dayjs(item.begin).format('YYYY-MM-DD HH:mm')
      item.end = dayjs(item.end).format('YYYY-MM-DD HH:mm')
    })
  })
  console.log(studentList.value)
}
//获取所有用户信息

const handleStudentChange = (val) => {
  studentPage.value = val
  getAllUser() 
}
//用户分页

const disabledDate = (time) => {
  const currentTime = Date.now() // 获取当前时间戳
  return time.getTime() < currentTime - 8.64e7
}

const confirmDate = () => {
  let startTime = new Date(date.value[0]).getTime()
  let endTime = new Date(date.value[1]).getTime()
  let startMinute = new Date(date.value[0]).getMinutes()
  let endMinute = new Date(date.value[1]).getMinutes()
  // console.log(startMinute, endMinute)
  let timeDifference = endTime - startTime
  // console.log(timeDifference)
  if (timeDifference > 14500000) {
    alert('单次预约时间不能超过4小时！')
    date.value = []
  } else if (
    (startMinute !== 0 && startMinute !== 30) ||
    (endMinute !== 0 && endMinute !== 30)
  ) {
    alert('预约时间必须为整点或者半整点！')
    date.value = []
  }
}
//限制预约时间

const addAppointData = async () => {
  const res = await addAppointReq({
    // process: process.value,
    testId: process.value,
    begin: begin.value + ':00',
    end: end.value + ':00',
    intervals: intervals.value === '30分钟' ? '00:30:00' : '01:00:00',
    num: num.value,
    lastFather: currentAppointId.value,
  })
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
    addBox.value = false
    getTestAppoint()
  } else {
    ElMessage({
      type: 'error',
      message: res.msg,
    })
  }
}
//请求添加预约信息

const addAppoint = () => {
  // console.log(process.value, intervals.value, num.value)
  if (process.value == '' || intervals.value == '' || num.value == '') {
    ElMessage({
      type: 'warning',
      message: '请完善信息',
    })
    return
  }
  begin.value = dayjs(date.value[0]).format('YYYY-MM-DD HH:mm')
  end.value = dayjs(date.value[1]).format('YYYY-MM-DD HH:mm')
  console.log(begin.value, end.value)
  ElMessageBox.confirm('您确定要添加/修改吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    addAppointData()
  })
}
//添加预约

const clear = () => {
  id.value = ''
  name.value = ''
  grade.value = ''
  appointId.value = ''
  process.value = ''
}

const deleteAppointData = async (id, father) => {
  console.log(id, father)
  const res = await deleteAppointReq({
    id: id,
    father: father,
  })
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getTestAppoint()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
//请求删除预约信息

const deleteAppoint = (id, father) => {
  console.log(id, father)
  ElMessageBox.confirm('您确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteAppointData(id, father)
  })
}
//删除预约

const getAppointData = async (appointId) => {
  console.log(appointId)
  changeBox.value = true
  const res = await getAppointReq(appointId)
  if (res.code == 200) {
    intervals.value = res.data.intervals === '00:30:00' ? '30分钟' : '1小时'
    num.value = res.data.num
    date.value = [res.data.begin, res.data.end]
    name.value = res.data.name
  }
  currentAppointId.value = appointId
}
//获取单个预约信息

const changeAppointData = async () => {
  const res = await changeAppointReq({
    id: currentAppointId.value,
    begin: begin.value,
    end: end.value,
    intervals: intervals.value,
    num: num.value,
    testId: 14,
  })
}
//请求修改预约信息

const changeAppoint = (currentAppiontId) => {
  console.log(currentAppiontId)
  ElMessageBox.confirm('您确定要修改吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    changeAppointData()
  })
}
//修改预约
</script>

<style scoped>
.el-icon {
  cursor: pointer;
}

.top-box {
  height: 250px;
  margin: 10px 0 20px 0;
}

.bottom-box {
  height: 400px;
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

::v-deep .el-time-spinner__list .el-time-spinner__item {
  display: none; /* 隐藏所有元素 */
}
</style>
