import request from '../utils/request'

export function delTestReq(id) {
  return request({
    url: `/test/del${id}`,
    method: 'delete',
  })
}
