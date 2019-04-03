import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

import baseURL from './baseurl.js'

// 创建axios实例
const service = axios.create({
  //   baseURL: process.env.BASE_API, // api的base_url
  // baseURL: 'http://192.168.127.245:8080/oms/api/v1/', // api的base_url
  // baseURL: 'http://192.168.137.1:8080/oms/api/v1', // api的base_url 国通-王超
  // baseURL: 'http://192.168.0.126:8080/oms/api/v1', // api的base_url 澳知浩-廖明
  // baseURL: 'http://192.168.0.207:8080/oms/api/v1', // api的base_url 澳知浩-唐志良
  // baseURL: 'http://192.168.0.148:8080/oms/api/v1', // api的base_url 澳知浩-焦林
  // baseURL: 'http://192.168.137.218:8080', // api的base_url 国通-焦林
  // baseURL: 'http://192.168.137.66:8080', // api的base_url 国通-焦林
  // baseURL: 'http://192.168.137.208:8080/oms/api/v1', // api的base_url 国通-唐志良
  baseURL: baseURL, // api的base_url 开发
  timeout: 50000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      // console.log(config)
    }
    // console.log(config)
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */

    const res = response.data
    if (response.status >= 200 && response.status < 400) {
      // debugger
      return response.data
    } else {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        Message({
          message: res.msg,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject('error')
    }
  },
  error => {
    // console.log('err' + error) // for debug
    // debugger
    // const res = response.data
    // debugger
    if (error.response.request.status === 401) {
      MessageBox.confirm(
        '您已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service