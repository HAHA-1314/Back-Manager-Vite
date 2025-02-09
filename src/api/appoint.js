import request from '@/utils/request'

export function allAppointReq() {
  return request({
    url: '/appointment/get/tests',
    method: 'get',
  })
}
//获取所有预约
export function addAppointReq(params) {
  return request({
    url: '/appointment',
    method: 'post',
    params: params,
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
    params: params,
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
