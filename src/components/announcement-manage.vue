<template>
  <div v-if="page === 'page3'">
    <div
      style="
        display: flex;
        flex-direction: row-reverse;
        margin-top: 15px;
        margin-right: 30px;
      "
    >
      <el-button style="width: 80px" @click="addMsgBox">+添加</el-button>
    </div>
    <div style="margin-top: 25px">
      <el-table :data="msgList">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="发布时间" prop="publishTime"></el-table-column>
        <el-table-column label="发布人员" prop="groupOp"></el-table-column>
        <el-table-column label="操作" width="380">
          <template #default="{ row }">
            <el-button @click="getMsg(row.id)"> 编辑 </el-button>
            <el-button @click="deleteFn(row.id)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <el-card
    class="addBox"
    style="
      margin-top: 20px;
      margin-left: 15px;
      height: 650px;
      position: relative;
      width: 1200px;
    "
    v-if="page == 'page4'"
  >
    <div style="margin-top: 13px; margin-left: 30px">
      <el-form>
        <el-form-item label="标题：">
          <el-input
            v-model="title"
            placeholder="请输入"
            style="width: 200px; margin-left: 30px"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input
            v-model="content"
            placeholder="请输入"
            type="textarea"
            :rows="6"
            style="width: 500px; height: 200px; margin-left: 30px"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加对象：">
          <el-button @click="addUserBoxVisible = true">
            <el-icon style="margin-right: 8px"><Plus /></el-icon>
            共{{ addSelectedIds.length }}人
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="position: absolute; bottom: 70px; right: 100px">
      <el-button style="width: 80px; margin-right: 20px" @click="page = 'page3'"
        >取消</el-button
      >
      <el-button type="primary" style="width: 80px" @click="addMsg"
        >确认</el-button
      >
    </div>
  </el-card>
  <el-card
    class="changeBox"
    style="
      margin-top: 20px;
      margin-left: 15px;
      height: 650px;
      position: relative;
      width: 1200px;
    "
    v-if="page == 'page5'"
  >
    <div style="margin-top: 13px; margin-left: 30px">
      <el-form>
        <el-form-item label="标题：">
          <el-input
            v-model="title"
            placeholder="请输入"
            style="width: 200px; margin-left: 30px"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input
            v-model="content"
            placeholder="请输入"
            type="textarea"
            :rows="6"
            style="width: 500px; height: 200px; margin-left: 30px"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加对象：">
          <el-button @click="getMsgUserList()">
            <el-icon style="margin-right: 8px"><Plus /></el-icon>
            共{{ selectedArray.length + changeSelectedIds.length }}人
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="position: absolute; bottom: 70px; right: 100px">
      <el-button style="width: 80px; margin-right: 20px" @click="page = 'page3'"
        >取消</el-button
      >
      <el-button type="primary" style="width: 80px" @click="changeMsgFn"
        >确认</el-button
      >
    </div>
  </el-card>

  <el-dialog
    class="addUserBox"
    v-model="addUserBoxVisible"
    :show-close="false"
    style="width: 690px; height: 570px; position: relative"
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
      <p style="display: inline-block; margin-left: 25px">选择人员</p>
      <el-icon
        @click="clearUser"
        style="display: inline-block; margin-right: 20px; cursor: pointer"
        ><CloseBold
      /></el-icon>
    </div>
    <div
      style="margin-top: 30px; height: 470px; margin-left: 7px; overflow: auto"
    >
      <div style="display: flex; justify-content: space-between">
        <el-select
          v-model="process"
          style="width: 220px"
          placeholder="第一次考核"
          @change="userByTest"
        >
          <el-option
            v-for="item in testList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>

        <el-button style="width: 120px; margin-right: 15px" @click="clear">
          重置
        </el-button>
      </div>
      <el-table
        :data="userArray"
        style="margin-top: 20px; width: 630px"
        @selection-change="addUser($event)"
      >
        <el-table-column prop="nickname" label="姓名" />
        <el-table-column prop="test" label="当前状态" />
        <el-table-column type="selection" prop="id" width="55" />
      </el-table>
    </div>
    <div
      style="
        z-index: 3;
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
        @click="addUserBoxVisible = false"
        >确定</el-button
      >
    </div>
  </el-dialog>
  <el-dialog
    class="changeUserBox"
    v-model="changeUserBoxVisible"
    :show-close="false"
    style="width: 690px; height: 570px; position: relative"
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
      <p style="display: inline-block; margin-left: 25px">选择人员</p>
      <el-icon
        @click="clearUser"
        style="display: inline-block; margin-right: 20px; cursor: pointer"
        ><CloseBold
      /></el-icon>
    </div>
    <div
      style="margin-top: 30px; height: 470px; margin-left: 7px; overflow: auto"
    >
      <div style="display: flex; justify-content: space-between">
        <el-select
          v-model="process"
          style="width: 220px"
          placeholder="第一次考核"
          @change="userByTestChange"
        >
          <el-option
            v-for="item in testList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>

        <el-button style="width: 120px; margin-right: 15px" @click="clear">
          重置
        </el-button>
      </div>
      <el-table
        :data="msgUserList"
        style="margin-top: 20px; width: 630px"
        @selection-change="changeUser($event)"
      >
        <el-table-column prop="nickname" label="姓名" />
        <el-table-column prop="test" label="当前状态" />
        <el-table-column
          type="selection"
          prop="id"
          width="55"
          :selectable="isSelectable"
        />
      </el-table>
    </div>
    <div
      style="
        z-index: 3;
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
        @click="changeUserBoxVisible = false"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getMsgReq,
  addMsgReq,
  changeMsgReq,
  getMsgByIdReq,
  deleteMsgReq,
  getMsgUserReq,
  getAllTestReq,
  getAllUserReq,
} from '../api/message'
import { onMounted } from 'vue'
import dayjs from 'dayjs'
dayjs().format()

const page = ref('page3')
const title = ref('')
const content = ref('')
const value = ref('@')
const addSelectedIds = ref([]) //添加的用户id
const publishTime = ref('')
const currentId = ref('')
const userArray = ref([]) //所有用户
const selectedArray = ref([]) //公告已经有的用户
const msgUserList = ref([]) //公告返回的用户
const changeSelectedIds = ref([]) //修改后新加的
const addUserBoxVisible = ref(false)
const testList = ref([])
const process = ref('')
const changeUserBoxVisible = ref(false)

const groupMap = {
  1: '前端组',
  2: '后端组',
  3: 'AI组',
  4: '电控组',
  5: '机械组',
  6: '运营组',
  7: '项目组',
}

const msgList = ref([])

const getAllMsg = async () => {
  const res = await getMsgReq()
  // console.log(res)
  res.data.forEach((item) => {
    item.publishTime = dayjs(item.publishTime).format('YYYY-MM-DD HH:mm:ss')
  })
  msgList.value = res.data
  msgList.value.forEach((item) => {
    item.groupOp = groupMap[item.groupOp]
  })
}
//获取所有公告

const addMsgBox = () => {
  page.value = 'page4'
  title.value = ''
  content.value = ''
  addSelectedIds.value = []
}
//打开公告盒子

const getAllTest = async () => {
  const res = await getAllTestReq()
  // console.log(res)
  testList.value = res.data
  // console.log(testList.value)
}
//获取所有考核

onMounted(() => {
  getAllMsg()
  getAllUser()
  getAllTest()
})

const clear = () => {
  process.value = ''
  getAllUser()
}
//重置

const userByTest = async () => {
  const res = await getAllUserReq({
    page: 1,
    pageSize: 100,
    testId: process.value,
  })
  // console.log(res)
  userArray.value = res.data.records
  // console.log(userArray.value)
}
//根据考核获取用户

const userByTestChange = async () => {
  const res = await getAllUserReq({
    page: 1,
    pageSize: 100,
    testId: process.value,
  })
  // console.log(res)
  msgUserList.value = res.data.records
  // console.log(userArray.value)
}

const addUser = (selected) => {
  // console.log(selected)
  addSelectedIds.value = selected.map((item) => item.id)
}
//获取选中的userId

const changeUser = (selected) => {
  console.log(selected)
  changeSelectedIds.value = selected.map((item) => item.id)
  console.log(changeSelectedIds.value)
}
//获取要修改选中的userId

const getAllUser = async () => {
  const res = await getAllUserReq({
    page: 1,
    pageSize: 100,
  })
  // console.log(res)
  userArray.value = res.data.records
  console.log(userArray.value)
}
//获取所有用户

const addMsgFn = async () => {
  console.log(addSelectedIds.value)
  const res = await addMsgReq({
    title: title.value,
    content: content.value,
    userId: addSelectedIds.value,
  })
  console.log(res)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
    getAllMsg()
    page.value = 'page3'
  } else {
    ElMessage({
      type: 'error',
      message: res.msg,
    })
  }
}
//请求添加公告

const addMsg = () => {
  console.log(addSelectedIds.value)
  if (
    title.value == '' ||
    content.value == '' ||
    addSelectedIds.value.length == 0
  ) {
    ElMessage({
      type: 'warning',
      message: '请完善信息',
    })
  } else {
    ElMessageBox.confirm('您确定要添加吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      addMsgFn()
    })
  }
}
//添加公告

const isSelectable = (row) => {
  if (row && row.status === false) {
    // console.log(row)
    // console.log('禁用选择')
    return false // 如果找到且 status 为 false，则禁用选择
  }
  return true
}
//禁用选择

const getMsgUser = async (id) => {
  selectedArray.value = []

  const res = await getMsgUserReq({
    notificationId: id,
  })
  const arr = ref([])
  arr.value = res.data
  msgUserList.value = arr.value
  // console.log(arr.value)
  arr.value.forEach((item) => {
    if (!item.status) {
      selectedArray.value.push(item)
    }
  })
  msgUserList.value = msgUserList.value.map((item) => {
    const newItem = { ...item }
    newItem.id = newItem.userId
    delete newItem.userId
    return newItem
  })

  console.log(selectedArray.value)
}
//获取单个公告的用户

const getMsg = async (id) => {
  changeSelectedIds.value = []
  selectedArray.value = []
  page.value = 'page5'
  // console.log(id)
  getMsgUser(id)
  localStorage.setItem('msgId', id)
  const res = await getMsgByIdReq({ id: id })
  title.value = res.data.title
  content.value = res.data.content
  currentId.value = id
}
//获取单个公告

const getMsgUserList = async () => {
  changeUserBoxVisible.value = true

  const id = localStorage.getItem('msgId')
  console.log(id)
  await getMsgUser(id)

  const mergedArray = [...userArray.value] //合并userArray和msgUserList

  msgUserList.value.forEach((msgUser) => {
    const existingUserIndex = mergedArray.findIndex(
      (user) => user.id === msgUser.id
    )

    if (existingUserIndex !== -1) {
      // 如果 userArray 中存在相同的 id，则合并属性
      mergedArray[existingUserIndex] = {
        ...mergedArray[existingUserIndex],
        ...msgUser,
      }
    }
  })
  // 打印合并后的数组

  msgUserList.value = mergedArray
}
//获取公告的用户 更新table

const changeMsgFn = async () => {
  if (title.value == '' || content.value == '') {
    ElMessage({
      type: 'warning',
      message: '请完善信息',
    })
  } else {
    ElMessageBox.confirm('您确定要修改吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      changeMsg()
    })
  }
  // console.log(id)
}
//修改公告

const clearUser = () => {
  changeSelectedIds.value = []
  addSelectedIds.value = []
  changeUserBoxVisible.value = false
  addUserBoxVisible.value = false
}
//清空用户

const changeMsg = async () => {
  // console.log(currentId.value)
  const res = await changeMsgReq({
    id: currentId.value,
    title: title.value,
    content: content.value,
    userId: changeSelectedIds.value,
  })
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '修改成功',
    })
    getAllMsg()
    page.value = 'page3'
  } else {
    ElMessage({
      type: 'error',
      message: res.msg,
    })
  }
}
//请求修改公告

const deleteMsg = async (id) => {
  const res = await deleteMsgReq({ notificationId: id })
  // console.log(res)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAllMsg()
  } else {
    ElMessage({
      type: 'error',
      message: res.msg,
    })
  }
}
//删除公告

const deleteFn = (id) => {
  // console.log(id)
  ElMessageBox.confirm('您确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteMsg(id)
  })
}
//删除公告前提
</script>

<style scoped>
::v-deep .cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-right: 1px solid white;
}

.el-table {
  --el-table-header-bg-color: #4095e5;
  --el-table-header-text-color: #ffffff;
}
</style>
