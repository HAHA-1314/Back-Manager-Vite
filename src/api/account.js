import request from "../utils/request";

// 超级管理员查询所有的管理员信息
export function getAllAccount() {
  return request({
    url: "/webuser/get/all",
    method: "get",
  });
}

//超级管理员根据管理员id查询管理员信息
export function getAccountById(id) {
  return request({
    url: `/webuser/get/${id}`,
    method: "get",
  });
}

// 更新管理员信息
export function updateAccount(params) {
  return request({
    url: "/webuser",
    method: "put",
    params,
  });
}

// 超级管理员根据id删除管理员信息
export function deleteAccountById(params) {
  return request({
    url: `/webuser`,
    method: "delete",
    params,
  });
}

// 添加管理员信息
export function addAccount(params) {
  return request({
    url: "/webuser",
    method: "post",
    params,
  }); 
}