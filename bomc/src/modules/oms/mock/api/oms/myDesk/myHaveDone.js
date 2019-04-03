import request from '../../index'

// 我的待办页面
const queryData = function(params) {
  return request({
    method: 'GET',
    url: '/oms/api/v1/tasks/hi',
    params
  })
}

const getPath = function(params) {
  return request({
    method: 'GET',
    url: '/oms/api/v1/tasks/pages',
    params
  })
}

export {
  queryData,
  getPath
}