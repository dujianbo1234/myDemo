import request from '../../index.js'

//---命令管理
//表单查询
const queryData = function(params) {
  return request({
    method: 'GET',
    url: '/cps/api/v1/instruction',
    params
  })
}
//修改信息查询
const queryDataModify = function(params) {
  return request({
    method: 'GET',
    url: '/cps/api/v1/instruction',
    params
  })
}
// 命令管理获取级联数据
const queryIndexCascader = function(params) {
  return request({
    method: 'GET',
    url: '/cps/api/v1/ResModel/tree',
    params
  })
}
// 转换格式 资源类型
const queryIndexResourceClassId = function(params) {
  return request({
    method: 'GET',
    url: '/cps/api/v1/ResModel/type',
    params
  })
}

//删除
const deleteInfo = function(params) {
  return request({
    method: 'DELETE',
    url: '/cps/api/v1/instruction/'+params.id,
    
  })
}

//修改信息
const modifyInfo = function(data) {
  return request({
    method: 'POST',
    url: '/cps/api/v1/instruction/update',
    data: data
  })
}

//新增命令
const AddInfo = function(data) {
  return request({
    method: 'POST',
    url: '/cps/api/v1/instruction/',
    data: data
  })
}

const deleteRow = (params) => {
	var ids = params.join(',')
	  return request({
	    method: 'DELETE',
	    url: '/cps/api/v1/instruction/' + ids

  })
}


//多条删除
//const deleteInfoMultiple = function(params) {
//return request({
//  method: 'DELETE',
//  url: '/cps/instruction/'+params.id,
//  
//})
//}


//命令统计------
//显示列表
const queryCommand = function(params) {
  return request({
    method: 'GET',
    url: '/cps/api/v1/operation/log',
    params
  })
}

//前7日任务执行量Echarts折线图
const queryDailytask = function() {
  return request({
    method: 'GET',
    url: '/cps/api/v1/operation/countPast',
  })
}

//当日执行量柱状图
const queryDaytask = function() {
  return request({
    method: 'GET',
    url: '/cps/api/v1/operation/countToday',
  })
}

//命令执行次数TOP10
const queryTopTen = function(params) {
  return request({
    method: 'GET',
    url: '/cps/api/v1/instruction/getTop',
    params
  })
}

//执行成功率
const ExecutionSuccRate = function() {
  return request({
    method: 'GET',
    url: '/cps/api/v1/operation/countSuccess',
  })
}

//命令操作执行---------
//命令执行
const sendData1 = function(params) {
  return request({
    method: 'post',
    url: '/cps/api/v1/operation',
    data: params
  })
}


//树形栏查询
const scriptLink = function(params) {
  return request({
    method: 'GET',
    url: '/cps/api/v1/script/getTree',
    params
  })
}
const removeTree=function(params){
	  return request({
	    method: 'DELETE',
	    url: '/cps/api/v1/script/' + params.id
  })
}
//主机查询
const queryIP = function() {
  return request({
    method: 'GET',
    url: '/cps/api/v1/operation/resource',
    
  })
}


//刷新
const fresh = function(params) {
  return request({
    method: 'get',
    url: '/cps/api/v1/operation',
    params
  })
}

//暂停
const requestStop = function(data) {
  return request({
    method: 'PUT',
    url: '/cps/api/v1/operation/stop',
    data
  })
}

//继续
const requestContinue = function(data) {
  return request({
    method: 'PUT',
    url: '/cps/api/v1/operation/continue',
    data
  })
}

//中断
const requestKill = function(data) {
  return request({
    method: 'PUT',
    url: '/cps/api/v1/operation/kill',
    data
  })
}



//getOne请求
const getOneRequest = function(params) {
  return request({
    method: 'get',
    url: '/cps/api/v1/gateone',
    params
  })
}


//命令操作日志---------

//命令操作日志查询
const operLogoQuery = function(params) {
  return request({
    method: 'GET',
    url: '/cps/api/v1/userlog',
    params
  })
}

//命令操作日志导出
//const exportLogo = function(params) {
//return request({
//  method: 'GET',
//  url: '/cps/api/v1/userlog/excel',
//  params
////  responseType: 'blob'
//})
//}

/*脚本管理页面相关的函数*/
//一进入页面从后台获取数据并更新到搜索框下面
const getScriptData = function(params) {
  return request({
    method: 'get',
    url: '/cps/api/v1/script',
    params
  })
}

//删除编辑脚本单条数据
const deleteOneScript = function(params) {
  return request({
    method: 'DELETE',
    url: '/cps/api/v1/script/'+params.id,
    
  })
}
//查询单条脚本数据
const queryScript = function(params) {
  return request({
    method: 'GET',
    url: '/cps/api/v1/script',
    params
  })
}
//保存新增的请求
const saveNewData = function(params) {
  return request({
    method: 'post',
    url: '/cps/api/v1/script',
    data: params
  })
}
//获取脚本类型
const queryScriptType = function(params) {
  return request({
    method: 'get',
    url: '/cps/api/v1/getScript/getType',
    params
  })
}
//保存修改的请求
const saveUpdateData = function(params) {
  return request({
    method: 'put',
    url: '/cps/api/v1/script',
    data: params
  })
}
//删除单条脚本执行记录
const deleteTaskScript = function(params) {
  return request({
    method: 'DELETE',
    url: '/cps/api/v1/operation/log/'+params.taskId,
    
  })
}
//删除多条脚本执行记录
const deleteTaskALLScript = function(params) {
	var taskId = params.join(',')
 return request({
    method: 'DELETE',
    url: '/cps/api/v1/operation/log/'+taskId,
  })
}
//保存
const saveScript = function(params) {
  return request({
    method: 'post',
    url: '/cps/api/v1/script/excute',
    data: params
  })
}
//脚本重新执行
const goStart = function(params) {
  return request({
    method: 'post',
    url: '/cps/api/v1/operation/restart',
    data: params
  })
}
const queryTaskScript=function(params) {
  return request({
    method: 'get',
    url: '/cps/api/v1/script?platformId='+params.platformId+"&resourceClassId="+params.resourceClassId+"&resourceTypeId="+params.resourceTypeId,
  })
}
const getHistoryData = function(params) {
  return request({
    method: 'get',
    url: '/cps/api/v1/operation/log',
    params
  })
}

//主机管理
const taskType = function() {
  return request({
    method: 'GET',
    url: '/ops/api/v1/model/type ',
  })
}
// 调用指令
const command = function(params) {
  return request({
    method: 'GET',
    url: '/cps/api/v1/instruction/getTopByType',
    params
  })
}


export {
  queryData, sendData1, fresh, getOneRequest, operLogoQuery,
  queryCommand,deleteInfo,AddInfo,queryDailytask,
  queryDaytask,queryTopTen,ExecutionSuccRate,modifyInfo,queryDataModify,deleteRow,scriptLink,
  request,requestStop,requestContinue,requestKill,queryIP,removeTree,
  // 命令管理获取级联数据
  queryIndexCascader,
  // 命令管理首页资源类型转换格式
  queryIndexResourceClassId,
  getScriptData,
  queryScript,
  queryTaskScript,
  deleteTaskScript,
  deleteTaskALLScript,
  deleteOneScript,
  saveNewData,
  queryScriptType,
  saveScript,
  goStart,
  saveUpdateData,
  sendExeResult,
  getHistoryData,
  taskType,
  command
}
