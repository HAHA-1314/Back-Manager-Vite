import request from '@/utils/request'

export function getMsgReq(params) {
  return request({
    url: '/meassage/showAll',
    method: 'post',
    data: params,
  })
}
//管理员查看发布的公告

export function addMsgReq(params) {
  return request({
    url: '/meassage/create',
    method: 'post',
    data: params,
  })
}
//添加公告

export function changeMsgReq(params) {
  return request({
    url: '/meassage/update',
    method: 'post',
    data: params,
  })
}
//修改公告

export function deleteMsgReq(params) {
  return request({
    url: '/meassage/delete',
    method: 'get',
    params,
  })
}
//删除公告

export function getMsgByIdReq(params) {
  return request({
    url: '/meassage/selectOne',
    method: 'get',
    params,
  })
}
//根据id查询公告

export function getUserReq(params) {
  return request({
    url: '/webuser/get/page',
    method: 'get',
    params: params,
  })
}
//获取用户信息

export function getMsgUserReq(params) {
  return request({
    url: '/meassage/getUser',
    method: 'get',
    params: params,
  })
}
//获取单个公共的用户选择

export function getAllTestReq() {
  return request({
    url: '/appointment/get/tests',
    method: 'get',
  })
}
//获取所有考核

export function getAllUserReq(params) {
  return request({
    url: '/webuser/get/page',
    method: 'get',
    params,
  })
}
//获取所有用户
