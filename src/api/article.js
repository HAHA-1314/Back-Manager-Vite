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
export function addArticle(params) {
  return request({
    url: "/tweet",
    method: "post",
    params,
  });
}

//修改推文
export function updateArticle(data) {
  return request({
    url: "/tweet",
    method: "put",
    data,
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
//上传文件
export function uploadFile(data) {
  return request({
    url: "/file/upload",
    method: "post",
    headers: {
      "Content-Type": "form-data", 
    },
    data,
  });
} 