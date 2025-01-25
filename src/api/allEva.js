import request from '../utils/request'

export function getAllEva() {
  return request({
    url: '/test/get/all',
    method: 'get',
  })
}
