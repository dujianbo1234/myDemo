import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  /*baseURL: 'http://192.168.127.246:7300',*/ // api的base_url  mock地址
  /*baseURL:'http://192.168.127.246:8888' ,*/ //测试环境地址
  baseURL: '',
  timeout: 50000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      // console.log(config)
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

     const res = response.data;
     const resMsg = '<strong>错误编码: <i>' + res.code + '</i></strong></br>' +
     '<strong>错误类型: <i>' + res.name + '</i></strong></br>' +
     '<strong>详细信息: <i>' + res.msg + '</i></strong>';
     if (response.status >= 200 && response.status < 400) {
      // debugger
      if (response.status !== 200) {
        /*var error = "告警编码:"+response.data.code+"告警大类名称:"+response.data.name+"详细信息:"+response.data.msg*/
        Message({
          dangerouslyUseHTMLString: true,
          message: resMsg,
          type: 'error',
          duration: 4 * 1000
        })
        return Promise.reject('error')
      }
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
            dangerouslyUseHTMLString: true,
            message: resMsg,
            type: 'error',
            duration: 4 * 1000
          })
        }
        return Promise.reject('error')
      }
    },
    error => {
      const err = error.response.data;
      const errMsg = '<strong>错误编码: <i>' + err.code + '</i></strong></br>' +
      '<strong>错误类型: <i>' + err.name + '</i></strong></br>' +
      '<strong>详细信息: <i>' + err.msg + '</i></strong>';
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
        console.log(error.response)
        /*var error = "告警编码:"+error.response.data.code+"告警大类名称:"+error.response.data.name+"详细信息:"+error.response.data.msg*/
        Message({
          dangerouslyUseHTMLString: true,
          message: errMsg,
          type: 'error',
          duration: 4 * 1000
        })
        return Promise.reject(err)
      }
      return Promise.reject(error)
    }
    )

export default service