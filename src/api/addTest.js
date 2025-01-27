import request from '../utils/request.js'

export function addTestReq(params) {
  return request({
    url: '/test',
    method: 'post',
    params,
  })
}
