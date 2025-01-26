import request from "../utils/request";

export function getArticleList(params) {
  return request({
    url: "/tweet/get/all",
    method: "get",
    params,
  });
}

