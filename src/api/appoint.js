import request from '@/utils/request'

export function allAppointReq(params) {
  return request({
    url: '/appointment/get/availability',
    method: 'get',
    params: params,
  })
}
//获取所有预约
export function addAppointReq(params) {
  return request({
    url: '/appointment',
    method: 'post',
    data: params,
  })
}
//添加预约

export function deleteAppointReq(params) {
  return request({
    url: '/appointment',
    method: 'delete',
    params: params,
  })
}
//删除预约
export function changeAppointReq(params) {
  return request({
    url: '/appointment',
    method: 'put',
    data: params,
  })
}
//修改预约
export function getAppointReq(appointId) {
  return request({
    url: `/appointment/get/${appointId}`,
    method: 'get',
  })
}
//获取单个预约

export function getAllTestReq() {
  return request({
    url: '/appointment/get/tests',
    method: 'get',
  })
}
//获取所有考核

export function getAllUserReq(params) {
  return request({
    url: '/appointment/get/users',
    method: 'get',
    params: params,
  })
}
//获取所有用户

export function getUserReq(params) {
  return request({
    url: '/appointment/get/users',
    method: 'get',
    params: params,
  })
}
//获取用户

export function getFatherReq(params) {
  return request({
    url: '/appointment/get/father',
    method: 'get',
    params: params,
  })
}
//获取预约序号
