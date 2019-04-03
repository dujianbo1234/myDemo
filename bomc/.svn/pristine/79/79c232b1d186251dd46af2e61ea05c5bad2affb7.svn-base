import request from '../../index'

// 我的待签收页面
const queryData = function(params) {
  return request({
    method: 'GET',
    url: '/oms/api/v1/tasks/ru',
    params
  })
}

const receive = function(params) { // 签收
  return request({
    method: 'PUT',
    url: '/oms/api/v1/tasks/ru',
    params
  })
}

export {
  queryData,
  receive
}