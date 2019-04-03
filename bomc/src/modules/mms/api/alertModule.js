// import request from './request'
import request from '@/utils/request'

// ----------当前告警start-----------
//工单信息
const getOrderInfo = (params) => {
  return request({
    url: 'bomc/mms/alerts/ref',
    params
  })
}
//工单提交
const submitOrder = (data) => {
  return request({
    method:"PUT",
    url: 'bomc/mms/alerts/workOrder',
    data                                             
  })
}

// 有条件的查询
const currentAlertSearchSingle = (params) => {
  return request({
    url: `bomc/mms/alerts?`+params,
  })
}
// 查询所有
const currentAlertSearch = (params) => {
  return request({
    url: 'bomc/mms/alerts',
    params
  })
}
// 根据ID查询
const currentAlertSingleSearch = (id) => {
  return request({
    url: `bomc/mms/alerts/${id}`
  })
}

// 告警处理
const currentAlertProcesess = (params) => {
  return request({
    url: 'bomc/mms/alerts/ref',
    params
  })
}

// 处理确认
const currentAlertProcesessSave = (data) => {
  return request({
    method: 'PUT',
    url: 'bomc/mms/alerts',
    data
  })
}
//分析多少规则和选择器查询
const ruleSearchService = (params)=> {
  return request({
    url: '/bomc/mms/bizLineAlertTag',
    params
  })
}

// ----------当前告警end-----------

export {
  ruleSearchService,
  currentAlertSearch,
  currentAlertSearchSingle,
  currentAlertSingleSearch,
  currentAlertProcesess,
  currentAlertProcesessSave,
  getOrderInfo,
  submitOrder
}

