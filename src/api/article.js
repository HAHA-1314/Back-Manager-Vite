import request from "../utils/request";

export function getArticleList(params) {
  return request({
    url: "/tweet/get/all",
    method: "get",
    params,
  });
}

export function getArticleDetail(id) {
  return request({
    url: `/tweet/get/${id}`,
    method: "get",
  });
}

//添加推文
export function addArticle(data) {
  return request({
    url: "/tweet",
    method: "post",
    data,
  });
}

//修改推文
export function updateArticle(params) {
  return request({
    url: "/tweet",
    method: "put",
    params,
  });
}

//删除推文
export function delArticle(id) {
  return request({
    url: "/tweet",
    method: "delete",
    params: {
      id,
    },
  });
}
