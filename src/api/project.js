import request from "../utils/request";

export function getProjectList(params) {
  return request({
    url: "/project/all",
    method: "get",
    params,
  });
}