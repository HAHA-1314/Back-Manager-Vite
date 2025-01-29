import request from '@/utils/request'

export function getAllUserReq(params) {
  return request({
    url: '/webuser/get/page',
    method: 'get',
    params,
  })
}

export function getUserReq(id) {
  return request({
    url: `/webuser/get/user/${id}`,
    method: 'get',
  })
}

export function UserReq(params) {
  return request({
    url: '/webuser/add',
    method: 'post',
    params,
  })
}

export function changeUserReq(params) {
  return request({
    url: '/webuser/update/user',
    method: 'post',
    params,
  })
}
