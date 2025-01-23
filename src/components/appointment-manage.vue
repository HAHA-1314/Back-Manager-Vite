<template>
  <link
    rel="stylesheet"
    href="//at.alicdn.com/t/c/font_4635501_lj77pzln4y.css"
  />

  <div>
    <el-card class="top-box" style="position: relative">
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        "
      >
        <el-select
          v-model="process"
          style="width: 120px"
          placeholder="第一次考核"
        >
          <el-option label="第一次考核" value="第一次考核"></el-option>
          <el-option label="第二次考核" value="第二次考核"></el-option>
          <el-option label="第三次考核" value="第三次考核"></el-option>
        </el-select>
        <el-button @click="dialogVisible = true">添加预约</el-button>
      </div>
      <el-table :data="appointList">
        <el-table-column
          label="序号"
          prop="number"
          width="120"
        ></el-table-column>
        <el-table-column label="预约开启时间" prop="start"></el-table-column>
        <el-table-column label="预约结束时间" prop="end"></el-table-column>
        <el-table-column label="面试间隔时间" prop="gap"></el-table-column>
        <el-table-column
          label="每个时间段可预约的人数"
          prop="sum"
        ></el-table-column>
        <el-table-column label="面试间隔时间">
          <template #default>
            <el-button @click="changeAppoint">编辑</el-button>
            <el-button @click="deleteFn">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="50"
        style="position: absolute; bottom: 15px; right: 20px"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisible"
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
          @click="dialogVisible = false"
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
                <el-option label="第一次考核" value="第一次考核"></el-option>
                <el-option label="第二次考核" value="第二次考核"></el-option>
                <el-option label="第三次考核" value="第三次考核"></el-option>
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
                v-model="dateTime"
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
                v-model="gap"
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
              <el-input v-model="sum" style="margin-left: 30px"></el-input>
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
    <el-card class="bottom-box" style="position: relative">
      <div>
        <el-form inline style="display: flex; justify-content: space-around">
          <el-form-item label="姓名">
            <el-input
              placeholder="请输入名字"
              v-model="name"
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
            <el-select v-model="grade" style="width: 120px" placeholder="大一">
              <el-option label="大一" value="大一"></el-option>
              <el-option label="大二" value="大二"></el-option>
              <el-option label="大三" value="大三"></el-option>
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
            prop="name"
            width="120"
          ></el-table-column>
          <el-table-column label="学号" prop="id" width="130"></el-table-column>
          <el-table-column label="年级" prop="grade"></el-table-column>
          <el-table-column label="联系方式" prop="telephone"></el-table-column>
          <el-table-column label="预约时间" prop="time"></el-table-column>
          <el-table-column label="操作">
            <template #default>
              <el-button @click="goToPerson">查看</el-button>
            </template>
          </el-table-column> </el-table
        ><el-pagination
          background
          layout="prev, pager, next"
          :total="50"
          style="position: absolute; bottom: 15px; right: 20px"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import router from '../routes'
import { ElMessage, ElMessageBox } from 'element-plus'

const store = useStore()
const newPage = ref('page2')
const process = ref('')
const dialogVisible = ref(false)
const id = ref('')
const name = ref('')
const grade = ref('')
const appointId = ref('')
const dateTime = ref('')

const gap = ref('')
const sum = ref('')

const goToPerson = () => {
  router.push({ name: 'person-management' })
  store.dispatch('updatePage', String(newPage.value))
}

const appointList = [
  {
    number: '1',
    start: '2024-07-19 15:00',
    end: '2024-07-22 15:00',
    gap: '1小时',
    sum: '3',
  },
]

const studentList = [
  {
    appointId: '1',
    name: '嘻嘻',
    id: '123345',
    grade: '大二',
    telephone: '1235490896',
    time: '2024-09-18 14:00-15:00',
  },
]

const disabledDate = (time) => {
  const currentTime = Date.now() // 获取当前时间戳
  return time.getTime() < currentTime - 8.64e7
}

const confirmDate = () => {
  let startTime = new Date(dateTime.value[0]).getTime()
  let endTime = new Date(dateTime.value[1]).getTime()
  let startMinute = new Date(dateTime.value[0]).getMinutes()
  let endMinute = new Date(dateTime.value[1]).getMinutes()
  if (endTime - startTime > 14400000) {
    alert('单次预约时间不能超过4小时！')
    dateTime.value = []
  } else if (
    (startMinute !== 0 && startMinute !== 30) ||
    (endMinute !== 0 && endMinute !== 30)
  ) {
    alert('预约时间必须为整点或者半整点！')
    dateTime.value = []
  }
}

const addAppoint = () => {
  if (process.value == '' || gap.value == '' || sum.value == '') {
    ElMessage({
      type: 'warning',
      message: '请完善信息',
    })
    return
  }
  ElMessageBox.confirm('您确定要添加/修改吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    ElMessage({
      type: 'success',
      message: '添加/修改成功',
    })
    dialogVisible.value = false
  })
}

const changeAppoint = () => {
  dialogVisible.value = true
}

const clear = () => {
  id.value = ''
  name.value = ''
  grade.value = ''
  appointId.value = ''
  process.value = ''
}

const deleteFn = () => {
  ElMessageBox.confirm('您确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  })
}
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
  height: 30px;
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
