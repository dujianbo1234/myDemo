import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
// baseURL: process.env.BASE_API, // api的base_url
baseURL: 'http://192.168.191.1:8085', 
// baseURL: 'http://192.168.191.4:8085', //何内
// baseURL: 'http://192.168.0.145:8081', 
// baseURL: 'http://192.168.157.143:8085',  //测试环境
// baseURL: 'http://192.168.127.247:8085',  //开发 
  timeout: 50000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
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
    if (response.status >= 200 && response.status < 300) {
      // debugger
      // -1:非法的token; -2:其他客户端登录了;  -3:Token 过期了;
      // if (res.code === -1 || res.code === -2 || res.code === -3) {
      //   MessageBox.confirm(
      //     '你已被登出，可以取消继续留在该页面，或者重新登录',
      //     '确定登出',
      //     {
      //       confirmButtonText: '重新登录',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }
      //   ).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload() // 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      //   return Promise.reject('error')
      // }
      // } else {
      //   Message({
      //     message: res.msg,
      //     type: 'error',
      //     duration: 3 * 1000
      //   })
      return response.data
    } else {
      Message({
        message: res.msg,
        type: 'error',
        duration: 1000
      })
      // }
      return Promise.reject('error')
    }
  },
  error => {
    // console.log('err' + error) // for debug
    // debugger
    // const res = response.data
    // debugger
    // if (error.response.request.status === 401) {
    //   MessageBox.confirm(
    //     '您已被登出，可以取消继续留在该页面，或者重新登录',
    //     '确定登出',
    //     {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }
    //   ).then(() => {
    //     store.dispatch('FedLogOut').then(() => {
    //       location.reload() // 为了重新实例化vue-router对象 避免bug
    //     })}
    //   // store.dispatch('FedLogOut').then(() => {
    //   //   location.reload() // 为了重新实例化vue-router对象 避免bug
    //   // })
    //   // Message({
    //   //   message: '您已被登出，请重新登录',
    //   //   type: 'error',
    //   //   duration: 1000
    //   // })
    // } else {
    Message({
      message: error.response.data.msg,
      type: 'error',
      duration: 1000
    })
    // }
    return Promise.reject(error)
  }
  // }
)

export default service
