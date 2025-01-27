import request from "@/utils/request";
export function getGroupList(params) {
  return request({
    url: "/clazz/get/all",
    method: "get",
    params,
  });
}
export function getGroupDetail(id) {
  return request({
    url: `/clazz/get/${id}`,
    method: "get",
  });
}
//修改组别信息
export function updateGroup(data) {
  return request({
    url: "/clazz",
    method: "put",
    data,
  });
}
