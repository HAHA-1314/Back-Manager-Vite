import request from '../utils/request'

export function getAllTestReq() {
  return request({
    url: '/test/get/all',
    method: 'get',
  })
}

export function getTestReq(id) {
  return request({
    url: `/test/get/${id}`,
    method: 'get',
  })
}

export function changeTestReq(params) {
  return request({
    url: '/test',
    method: 'put',
    params: params,
  })
}

export function delTestReq(id) {
  return request({
    url: `/test/delete/${id}`,
    method: 'delete',
  })
}

export function addTestReq(params) {
  return request({
    url: '/test',
    method: 'post',
    params,
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
