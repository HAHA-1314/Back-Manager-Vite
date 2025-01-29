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
