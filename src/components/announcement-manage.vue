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
      <el-button style="width: 80px" @click="page = 'page4'">+添加</el-button>
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
            style="width: 500px; height: 200px; margin-left: 30px"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加对象：">
          <el-select
            v-model="value"
            multiple
            placeholder="+ 选择人员"
            style="width: 200px"
            @change="handleChange"
          >
            <el-option
              v-for="item in userArray"
              :key="item.id"
              :lable="item.nickname"
              :value="item.nickname"
            >
            </el-option>
          </el-select>
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
            style="width: 500px; height: 200px; margin-left: 30px"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加对象：">
          <el-select
            v-model="changeSelected"
            multiple
            placeholder="+ 选择人员"
            style="width: 200px"
            @change="changeSelectedFn"
          >
            <el-option
              v-for="item in userArray"
              :key="item.userId"
              :lable="item.nickname"
              :value="item.nickname"
            >
            </el-option>
          </el-select>
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
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getMsgReq,
  addMsgReq,
  changeMsgReq,
  getMsgByIdReq,
  deleteMsgReq,
  getUserReq,
  getMsgUserReq,
} from '../api/message'
import { onMounted } from 'vue'
import dayjs from 'dayjs'
dayjs().format()

const page = ref('page3')
const title = ref('')
const content = ref('')
const value = ref('@')
const addSelectedIds = ref([])
const changeSelected = ref([])
const changeSelectedIds = ref([])
const publishTime = ref('')
const currentId = ref('')
const userArray = ref([])
const selectedArray = ref([])

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
  console.log(res)
  res.data.forEach((item) => {
    item.publishTime = dayjs(item.publishTime).format('YYYY-MM-DD HH:mm:ss')
  })
  msgList.value = res.data
  msgList.value.forEach((item) => {
    item.groupOp = groupMap[item.groupOp]
  })
}

onMounted(() => {
  getAllMsg()
  getAllUser()
})

const getAllUser = async () => {
  const res = await getUserReq({
    page: 1,
    pageSize: 100,
  })
  // console.log(res)
  userArray.value = res.data.records
  // console.log(userArray.value)
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

const handleChange = (selectedValues) => {
  addSelectedIds.value = []
  selectedValues.forEach((value) => {
    const selectedItem = userArray.value.find((item) => item.nickname === value)
    if (selectedItem) {
      addSelectedIds.value.push(selectedItem.id)
    }
  })
  // addSelected.value = selectedIds
  console.log('选中的 id 列表:', addSelectedIds.value)
}
//获取选中的userId

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

const getMsgUser = async (id) => {
  selectedArray.value = []

  const res = await getMsgUserReq({
    notificationId: id,
  })
  const arr = ref([])
  arr.value = res.data
  // console.log(arr.value)
  arr.value.forEach((item) => {
    if (!item.status) {
      selectedArray.value.push(item)
    }
  })
  // selected.value = selectedArray.value.map((item) => item.nickname)

  changeSelected.value = selectedArray.value.map((item) => item.nickname)
  console.log(selectedArray.value)
}
//获取单个公告的用户

const getMsg = async (id) => {
  page.value = 'page5'
  console.log(id)
  getMsgUser(id)
  const res = await getMsgByIdReq({ id: id })
  title.value = res.data.title
  content.value = res.data.content
  currentId.value = id
  console.log(currentId.value)
}
//获取单个公告

const changeSelectedFn = (selectedValues) => {
  changeSelectedIds.value = []
  selectedValues.forEach((value) => {
    const selectedItem = userArray.value.find((item) => item.nickname === value)
    if (selectedItem) {
      changeSelectedIds.value.push(selectedItem.id)
    }
  })
  // addSelected.value = selectedIds
  console.log('选中修改的 id 列表:', changeSelectedIds.value)
}

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

const changeMsg = async () => {
  console.log(currentId.value)
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
  console.log(res)
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
  console.log(id)
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
