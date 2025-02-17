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

// 新增项目
export function addProject(params) {
  return request({
    url: "/project",
    method: "post",
    params,
  });
}

// 编辑项目
export function editProject(params) {
  return request({
    url: "/project",
    method: "put",
    params,
  });
}

//根据id查询项目/project/{id}
export function getProjectById(id) {
  return request({
    url: `/project/${id}`,
    method: "get",
  });
}