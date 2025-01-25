import request from '../../utils/request.js'

export function getAllEva() {
  return request({
    url: '/test/get/all',
    method: 'GET',
  })
}
