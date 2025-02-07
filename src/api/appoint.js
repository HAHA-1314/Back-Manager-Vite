import request from '@/utils/request'

export function allAppointReq() {
  return request({
    url: '/appointment/get/tests',
    method: 'get',
  })
}

export function addAppointReq(params) {
  return request({
    url: '/appointment',
    method: 'post',
    params: params,
  })
}

export function deleteAppointReq(params) {
  return request({
    url: '/appointment',
    method: 'delete',
    params: params,
  })
}

export function changeAppointReq(params) {
  return request({
    url: '/appointment',
    method: 'put',
    params: params,
  })
}

export function getAppointReq(appointId) {
  return request({
    url: `/appointment/get/${appointId}`,
    method: 'get',
  })
}
