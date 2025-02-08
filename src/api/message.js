import request from '@/utils/request'

export function getAdminMsgReq(params) {
  return request({
    url: '/meassage/showAll',
    method: 'post',
    params,
  })
}
//管理员查看发布的公告

export function getUserMsgReq(params) {
  return request({
    url: '/meassage/show',
    method: 'post',
    params,
  })
}
//用户查看自己的公告

export function addMsgReq(params) {
  return request({
    url: '/meassage/create',
    method: 'post',
    params,
  })
}
//添加公告

export function addAdminToUserReq(params) {
  return request({
    url: '/meassage/add',
    method: 'post',
    params,
  })
}
//管理员给多个用户发公告

export function changeMsgReq(params) {
  return request({
    url: '/meassage/update',
    method: 'post',
    params,
  })
}
//修改公告

export function deleteMsgReq(params) {
  return request({
    url: '/meassage/delete',
    method: 'post',
    params,
  })
}
//删除公告
