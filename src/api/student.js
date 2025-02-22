import request from '@/utils/request'

export function getAllUserReq(params) {
  return request({
    url: '/webuser/get/page',
    method: 'get',
    params,
  })
}
//获取所有用户

export function getUserReq(id) {
  return request({
    url: `/webuser/get/user/${id}`,
    method: 'get',
  })
}
//获取用户

export function changeUserReq(params) {
  return request({
    url: '/webuser/update/user',
    method: 'put',
    params,
  })
}
//修改用户

export function getUserProcessReq(id) {
  return request({
    url: '/test/user/process',
    method: 'get',
    params: {
      id,
    },
  })
}
//获取用户进度

export function passUserReq(params) {
  return request({
    url: '/test/status',
    method: 'put',
    params,
  })
}
//通过考核

export function failUserReq(params) {
  return request({
    url: '/test/status',
    method: 'put',
    params,
  })
}
//不通过考核

export function returnUserReq(params) {
  return request({
    url: '/test/rollback',
    method: 'put',
    params,
  })
}
//回退考核

export function getAllTestReq() {
  return request({
    url: '/appointment/get/tests',
    method: 'get',
  })
}
//获取所有考核

export function putCommentReq(params) {
  return request({
    url: '/test/comment',
    method: 'put',
    params,
  })
}
//提交评论

export function getCollegeReq() {
  return request({
    url: '/webuser/college',
    method: 'get',
  })
}
//获取学院
