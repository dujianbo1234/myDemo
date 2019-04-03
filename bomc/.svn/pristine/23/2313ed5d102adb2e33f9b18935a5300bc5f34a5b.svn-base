// import request from './request'
import request from '@/utils/request'

// 分析策略请求
//分析选择器查询
const ruleSearchService = (params)=> {
  return request({
    url: '/bomc/mms/bizLineAlertTag',
    params
  })
}


//策略启停
const strategyAnalysisStart = function(data) {
  return request({
    method: 'put',
    url: '/bomc/mms/analysisStrategy',
    data
  })
}
// 有条件的查询
const strategyAnalysisSearchSingle = function(params) {
  return request({
    url: `/bomc/mms/analysisStrategy?`+params
  })
}
const strategyAnalysisSearch = function(params) {
  return request({
    url: '/bomc/mms/analysisStrategy',
    params
  })
}
// 查询单个数据
const strategyAnalysisFormSingleSearch = function(id) {
  return request({
    url: `/bomc/mms/analysisStrategy/${id}`
  })
}
// 删除单个
const strategyAnalysisFormDelSearch = function(id) {
  return request({
    method: 'Delete',
    url: `/bomc/mms/analysisStrategy/${id}`
  })
}
// 批量删除
const strategyAnalysisFormSomeDelSearch = function(params) {
  return request({
    method: 'Delete',
    url: '/bomc/mms/analysisStrategy',
    params
  })
}

// 编辑
const strategyAnalysisFormEdit = function(data) {
  return request({
    method: 'PUT',
    url: '/bomc/mms/analysisStrategy',
    data
  })
}

// 新增
const strategyAnalysisFormAdd = function(data) {
  return request({
    method: 'POST',
    url: '/bomc/mms/analysisStrategy',
    data
  })
}

// 推送策略请求---start------
//所有
const pushAnalysisSearch = function(params) {
  return request({
    url: '/bomc/mms/PushStrategy',
    params
  })
}
//单个
const pushAnalysisSearchSingleData = function(params) {
  return request({
    url: `/bomc/mms/PushStrategy?`+params,
    
  })
}
// 请求单个
const pushAnalysisSingleSearch = function(id) {
  return request({
    url: `/bomc/mms/PushStrategy/${id}`
  })
}

const pushAnalysisFormDelSearchSingle = function(id) {
  return request({
    method: 'Delete',
    url: `/bomc/mms/PushStrategy/${id}`
  })
}
const pushAnalysisFormDelSearchSome = function(params) {
  return request({
    method: 'Delete',
    url: '/bomc/mms/PushStrategy/',
    params
  })
}
// 推送新增
const pushAddService = function(data) {
  return request({
    method: 'POST',
    url: '/bomc/mms/PushStrategy',
    data
  })
}
// 编辑
const pushEditServie = function(data) {
  return request({
    method: 'PUT',
    url: '/bomc/mms/PushStrategy',
    data
  })
}
// 告警选择器请求 责任人数据
const pushAlertSelectSearchData = function(params) {
  return request({
    url: '/bomc/mms/HandlerList',
    params
  })
} 
// 条件查询
const qualityAllDataServiceSingle = (params) => {
  return request({
    url: `/bomc/mms/HandlerList?`+params,
  })
}
// 推送新增组所有人数据
const pushGroupAllData = () => {
  return request({
    url: '/bomc/mms/findUserInfo'
  })
}

//推送新增组
const pushAddGroup = function(data) {
  return request({
    method: 'post',
    url: '/bomc/mms/addGroupUserInfo',
    data
  })
}
//查询当前组的信息
const pushQueryGroupService = function(id) {
  return request({
    url: '/bomc/mms/findGroupInfo'
  })
}

//删除组父节点
const pushDelGroupService = function(params) {
  return request({
    method:"DELETE",
    url: '/bomc/mms/deleteGroup',
    params
  })
}
//删除组成员
const pushDelGroupPersonService = function(params) {
  return request({
    method:"DELETE",
    url: '/bomc/mms/deleteMemberInGroup',
    params
  })
}


// 推送策略请求---end-----------

// 自动提单请求

//自动提单查询
const autoBillSeach = (params)=>{
  return request({
    url: '/bomc/mms/autoSubmitOrderStrategy',
    params
  })
}
//自动提单条件查询
const autoBillSeachTiaojian = (params)=>{
  return request({
    url: `/bomc/mms/autoSubmitOrderStrategy?`+params,
  })
}
const autoBillSeachSingle = (id)=>{
  return request({
    url: `/bomc/mms/autoSubmitOrderStrategy/${id}`,
  })
}
//自动提单新增
const autoBillAddService = (data)=>{
  return request({
    method:'post',
    url: '/bomc/mms/autoSubmitOrderStrategy',
    data
  })
}
//自动提单编辑
const autoBillEditService = (data)=>{
  return request({
    method:'put',
    url: '/bomc/mms/autoSubmitOrderStrategy',
    data
  })
}
//删除单个
const autoBillDelSingle = (id)=>{
  return request({
    method:'delete',
    url: `/bomc/mms/autoSubmitOrderStrategy/${id}`,
  })
}
//批量删除
const autoBillDelSome = (params)=>{
  return request({
    method:'delete',
    url: '/bomc/mms/autoSubmitOrderStrategy',
    params
  })
}
//获取事件影响度数据
const autoBillEventData = ()=>{
  return request({
    url: 'bomc/mms/autoSubmitOrderStrategy/requiredInfo',
  })
}

//获取推送模板
const pushContentModule = ()=>{
  return request({
    url: 'bomc/mms/PushStrategy/getPushContent',
  })
}


export {
  pushContentModule,
  autoBillSeachTiaojian,
  autoBillSeachSingle,
  autoBillEventData,
  autoBillDelSome,
  autoBillDelSingle,
  autoBillSeach,
  autoBillAddService,
  autoBillEditService,
  strategyAnalysisStart,
  ruleSearchService,
  strategyAnalysisSearch,
  strategyAnalysisSearchSingle,
  strategyAnalysisFormSingleSearch,
  strategyAnalysisFormDelSearch,
  strategyAnalysisFormSomeDelSearch,
  strategyAnalysisFormAdd,
  strategyAnalysisFormEdit,
  pushAnalysisSearch,
  pushAnalysisSingleSearch,
  pushAnalysisSearchSingleData,
  pushAnalysisFormDelSearchSingle,
  pushAnalysisFormDelSearchSome,
  pushAddService,
  pushEditServie,
  pushAlertSelectSearchData,
  qualityAllDataServiceSingle,
  pushGroupAllData,
  pushAddGroup,
  pushQueryGroupService,
  pushDelGroupService,
  pushDelGroupPersonService
}
