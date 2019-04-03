// import request from './request'
import request from '@/utils/request'

// 质量管理请求
//选择器
const ruleSearchService = (params)=> {
  return request({
    url: '/bomc/mms/bizLineAlertTag',
    params
  })
}
// 条件查询
const qualityAllDataServiceSingle = (params) => {
  return request({
    url: `/bomc/mms/HandlerList?`+params,
  })
}
//查询所有
const qualityAllDataService = (params) => {
  return request({
    url: '/bomc/mms/HandlerList',
    params
  })
}

// 查询责任人
const allPersonDataService = function(params) {
  return request({
    url: '/bomc/mms/findUserInfo',
    params
  })
}
// 单个责任人查询
const singlePersonDataService = (id) => {
  return request({
    url: `/bomc/mms/HandlerList/${id}`,
  })
}

// 新增责任人
const addPersonDataService = function(data) {
  return request({
    method: 'POST',
    url: '/bomc/mms/HandlerList',
    data
  })
}

// 删除单个
const delSinglePersonService = (id) => {
  return request({
    method: 'DELETE',
    url: `/bomc/mms/HandlerList/${id}`
  })
}
// 批量删除
const delSomePersonService = (params) => {
  return request({
    method: 'DELETE',
    url: '/bomc/mms/HandlerList',
    params
  })
}
// 编辑
const editPersonService = (data) => {
  return request({
    method: 'PUT',
    url: '/bomc/mms/HandlerList',
    data
  })
}

// 推送策略请求---end-----------

export {
  qualityAllDataServiceSingle,
  qualityAllDataService,
  allPersonDataService,
  addPersonDataService,
  singlePersonDataService,
  delSinglePersonService,
  delSomePersonService,
  editPersonService,
  ruleSearchService
}

