import request from "../utils/request";

export function getProjectList(params) {
  return request({
    url: "/project/all",
    method: "get",
    params,
  });
}

export function deleteProject(id) {
  return request({
    url: `/project`,
    method: "delete",
    params: {
      id,
    },
  });
}
