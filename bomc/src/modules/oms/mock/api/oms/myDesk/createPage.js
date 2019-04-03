import request from '../../index'

// 工单创建
const queryData = function(params) {
  return request({
    method: 'GET',
    url: '/oms/api/v1/processDefinitions',
    params
  })
}

// 工单创建页面跳转
const jumpPage = function(params) {
  return request({
    method: 'GET',
    url: '/oms/api/v1/tasks/pages',
    params
  })
}

export {
  queryData,
  jumpPage
}