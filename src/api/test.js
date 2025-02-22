import request from '../utils/request'

export function getCurrentReq() {
  return request({
    url: '/test/get/current',
    method: 'get',
  })
}

export function getAllTestReq() {
  return request({
    url: '/test/get/all',
    method: 'get',
  })
}
//获取组内所有考核

export function getTestReq(id) {
  return request({
    url: `/test/get/${id}`,
    method: 'get',
  })
}
//获取单个考核

export function changeTestReq(params) {
  return request({
    url: '/test',
    method: 'put',
    params: params,
  })
}
//修改考核

export function delTestReq(id) {
  return request({
    url: `/test/delete/${id}`,
    method: 'delete',
  })
}
//删除考核
export function addTestReq(params) {
  return request({
    url: '/test',
    method: 'post',
    data: params,
  })
}

export function uploadFileReq(params) {
  // console.log(formData)
  return request({
    url: '/file/upload',
    method: 'post',
    params,
  })
}
//添加考核
