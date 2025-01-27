import request from '../utils/request.js'

export function addTest(params) {
  return request({
    url: '/test',
    method: 'post',
    params,
  })
}
