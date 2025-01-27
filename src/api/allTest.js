import request from '../utils/request'

export function getAllTestReq() {
  return request({
    url: '/test/get/all',
    method: 'get',
  })
}
