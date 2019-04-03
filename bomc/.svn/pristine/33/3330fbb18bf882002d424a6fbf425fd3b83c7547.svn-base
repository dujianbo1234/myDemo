import request from '@/utils/request'
import axios from 'axios'
import store from '@/store'
// const isDev = process.env.NODE_ENV === 'production'

export function login(username, password, getcode, random) {
  return request({
    url: '/uua/api/v1/auth/login',
    method: 'post',
    data: {
      userName: username,
      password: password,
      imageCode: getcode,
      random: random
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/uua/api/v1/user/list',
    method: 'post',
    //  headers: {'bomc_token_key': token}
    data: { }

  })
}

export function logout() {
  return request({
    url: '/uua/api/v1/auth/logout',
    method: 'post'
  })
}

// export function getCode() {
//   const sscode = process.env.BASE_API + '/pps/api/v1/code/getCode'
//   return sscode
// }
// process.env.BASE_API +
export function getCode() {
  // 这里是不进过拦截器直接获取验证码，和请求头里面的随机数，他是用于分辨用户的
  return axios.get(process.env.BASE_API + '/pps/api/v1/code/getCode', { // 连接服务器
    responseType: 'arraybuffer'
  })
}

export function getPermissionList() {
  // return axios.get('https://easy-mock.com/mock/5ba0c8c7b32a8054d990c5a8/bomc/getPermissionList')
  return request({
    url: '/pps/api/v1/menu/selectMenuByUserId',
    method: 'get',
    params: {
      userId: store.getters.userId
    }
  })
}
