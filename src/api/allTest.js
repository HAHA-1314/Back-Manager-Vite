import request from '../utils/request'

export function getAllTest() {
  return request({
    url: '/test/get/all',
    method: 'get',
  })
}
