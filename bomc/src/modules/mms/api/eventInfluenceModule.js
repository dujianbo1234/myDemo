// import request from './request'
import request from '@/utils/request'
const eventData = (params)=> {
  return request({
    url: '/bomc/mms/influenceAnalysis',
    params
  })
}
//请求单个
const forIdToeventData = (id)=> {
  return request({
    url: `/bomc/mms/influenceAnalysis/${id}`,
  })
}

const ruleSearchService = (params)=> {
  return request({
    url: '/bomc/mms/bizLineAlertTag',
    params
  })
}
//新增
const eventAddService = (data)=> {
  return request({
    method:'post',
    url: '/bomc/mms/influenceAnalysis',
    data
  })
}
//编辑
const eventEditService = (data)=> {
  return request({
    method:'put',
    url: '/bomc/mms/influenceAnalysis',
    data
  })
}
//删除单个
const delSingle = (id)=> {
  return request({
    method:'delete',
    url: `/bomc/mms/influenceAnalysis/${id}`,
  })
}
//批量删除
const delSome = (params)=> {
  return request({
    method:'delete',
    url: '/bomc/mms/influenceAnalysis',
    params
  })
}

export {
  eventData,
  ruleSearchService,
  eventAddService,
  delSingle,
  delSome,
  forIdToeventData,
  eventEditService
}

