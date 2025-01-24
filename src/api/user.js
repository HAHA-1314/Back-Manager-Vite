import request from "../utils/request";

export function login(params) {
  return request({
    url: "/webuser/login",
    method: "get",
    params,
  });
}

export function signOut() {
  return request({
    url: "/webuser/logout",
    method: "get",
  });
}

// get例子
// export function apifox(params) {
//   return request({
//     url: "/apifox",
//     method: "get",
//     params,  //必须为一个对象
//   });
// }
// post例子
// export function getPage(params, data) {
//   return request({
//     url: "getPage",
//     method: "post",
//     data, //必须为一个对象
//     params, //必须为一个对象
//   });
// }
