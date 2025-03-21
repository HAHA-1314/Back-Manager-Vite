import axios from 'axios'
import {
  ElNotification,
  ElMessageBox,
  ElMessage,
  ElLoading,
  messageConfig,
} from 'element-plus'
import { tansParams } from '@/utils/tansParams'
import store from '@/store'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

var isRelogin = {
  show: false,
}

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_URL, //请求URL = baseURL + apiURL
  timeout: 6000, //最大6秒，6秒后提示超时
})

//添加请求拦截器
// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    // const isToken = (config.headers || {}).isToken === false;
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    // if (getToken() && !isToken) {
    // config.headers["Cookie"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    if (
      !isRepeatSubmit &&
      (config.method === 'post' || config.method === 'put')
    ) {
      if (config.params) {
        let url = config.url + '?' + tansParams(config.params)
        url = url.slice(0, -1)
        config.params = {}
        config.url = url
      }
      const requestObj = {
        url: config.url,
        data:
          typeof config.data === 'object'
            ? JSON.stringify(config.data)
            : config.data,
        time: new Date().getTime(),
      }
      const sessionObj = JSON.parse(sessionStorage.getItem('sessionObj'))
      // console.log("sessionObj", sessionObj);
      if (!sessionObj) {
        sessionStorage.setItem('sessionObj', JSON.stringify(requestObj))
      } else {
        console.log('sessionObj', sessionObj, requestObj)
        const s_url = sessionObj.url // 请求地址
        const s_data = sessionObj.data // 请求数据
        const s_time = sessionObj.time // 请求时间
        const interval = 800 // 间隔时间(ms)，小于此时间视为重复提交
        sessionStorage.setItem('sessionObj', JSON.stringify(requestObj))
        if (
          (!(s_data && requestObj.data) || s_data === requestObj.data) &&
          s_url === requestObj.url &&
          new Date().getTime() - s_time < interval
        ) {
          return Promise.reject(new Error('请勿频繁提交！'))
        }
      }
      // 文件上传限制
      // const requestSize = Object.keys(JSON.stringify(requestObj)).length; // 请求数据大小
      // const limitSize = 5 * 1024 * 1024; // 限制存放数据5M
      // if (requestSize >= limitSize) {
      //   console.warn(
      //     `[${config.url}]: ` +
      //       "请求数据大小超出允许的5M限制。"
      //   );
      //   return config;
      // }
    }
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

//添加响应拦截器
service.interceptors.response.use(
  (res) => {
    //如果响应成功(2xx内响应码)
    const code = res.data.code || 200
    // 获取错误信息
    const msg = res.data.msg
    // 二进制数据则直接返回
    if (
      res.request.responseType === 'blob' ||
      res.request.responseType === 'arraybuffer'
    ) {
      return res.data
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true
        ElMessageBox.confirm(
          '登录状态已过期，您可以继续留在该页面，或者重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
          .then(() => {
            // console.log("router", router, store);
            isRelogin.show = false
            store.commit('logout')
          })
          .catch(() => {
            isRelogin.show = false
          })
      }
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
      ElMessage({ message: msg, type: 'error' })
      return Promise.reject(new Error(msg))
    } else if (code === 601) {
      ElMessage({ message: msg, type: 'warning' })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      ElNotification.error({ title: msg })
      return Promise.reject('error')
    } else {
      return Promise.resolve(res.data)
    }
  },
  (error) => {
    console.log('err' + error)
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  }
)

export default service
