import request from '@/utils/request'

//获得团队信息
export function getDetail(params) {
  return request({
    url: "/object",
    method: "get",
    params,
  });
}

//修改信息
export function updateInfo(data) {
  return request({
    url: "/object",
    method: "put",
    data,
  });
}