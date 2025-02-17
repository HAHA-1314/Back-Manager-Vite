import request from "@/utils/request";

// 今日新增报名
export function getTodayEnroll() {
  return request({
    url: "/webuser/registration",
    method: "get",
  });
}

// 人员管理Panel
export function getPersonList(params) {
  return request({
    url: "/webuser/get/page",
    method: "get",
    params,
  });
}

// 公告设置Panel
export function getAnnounceList() {
  return request({
    url: "/meassage/showAll",
    method: "post",
  });
}

// 考核管理Panel
export function getTestList() {
  return request({
    url: "/test/get/all",
    method: "get",
  });
}

// 当前进行的流程 
export function getCurrentStep() {
  return request({
    url: "/test/get/current",
    method: "get",
  });
}

// 报名增长趋势
export function getMonthEnroll(params) {
  return request({
    url: "/webuser/get/applicantsStatics",
    method: "get",
    params,
  });
}
