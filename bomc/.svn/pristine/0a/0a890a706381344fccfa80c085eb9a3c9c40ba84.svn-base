import request from '../../index.js'

//-----服务启停管理
//表单查询
const queryData = function(params) {
  return request({
    method: 'GET',
    url: '/ops/api/v1/program',
    params
  })
}
//修改信息查询
const queryDataModify = function(params) {
  return request({
    method: 'GET',
    url: '/ops/api/v1/program',
    params
  })
}
//查询主机列表
const queryIP = function() {
  return request({
    method: 'GET',
    url: '/ops/api/v1/mainTask/resource',
  })
}
// 命令管理获取级联数据
const queryGetService = function(params) {
  return request({
    method: 'GET',
    url: '/ops/api/v1/getService',
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

//单条删除
const deleteInfo = function(params) {
  return request({
    method: 'DELETE',
    url: '/ops/api/v1/program/'+params.id,
    
  })
}

//修改信息
const modifyInfo = function(data) {
  return request({
    method: 'PUT',
    url: '/ops/api/v1/program',
    data: data
  })
}

//新增命令
const AddInfo = function(data) {
  return request({
    method: 'POST',
    url: '/ops/api/v1/program',
    data: data
  })
}

//多条删除
const deleteRow = (params) => {
	var ids = params.join(',')
	  return request({
	    method: 'DELETE',
	    url: '/ops/api/v1/program/' + ids

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

//----------启停任务管理
const queryTask = function(params) {
  return request({
    method: 'GET',
    url: '/ops/api/v1/mainTask',
    params
  })
}
// 新增的保存
const AddTaskCus = function(data) {
  return request({
    method: 'POST',
    url: '/ops/api/v1/mainTask',
    data: data
  })
}
//编辑保存
const editTaskCus = function(data) {
  return request({
    method: 'PUT',
    url: '/ops/api/v1/mainTask',
    data: data
  })
}
// 编辑打开的命令
const editTaskCusOpen = function(params) {
  return request({
    method: 'GET',
		url: '/ops/api/v1/mainTask/info',
		params
  })
}
const queryTaskCus = function(params) {
  return request({
    method: 'GET',
		url: '/ops/api/v1/model',
		params
  })
}

//任务定制删除
const deleteTask = function(params) {
  return request({
    method: 'DELETE',
    url: '/ops/api/v1/mainTask/'+params.id,
    
  })
}

//多条删除
const deleteRowTask = (params) => {
	var id = params.join(',')
	  return request({
	    method: 'DELETE',
	    url: '/ops/api/v1/mainTask/'+ id

  })
}

//执行
const executeTask = (data) => {
	  return request({
	    method: 'POST',
	    url: '/ops/api/v1/mainTask/execute/',
			data: data
  })
}

// 任务定制管理 复制操作
const taskCusCopy = (data) => {
  return request({
    method: 'POST',
    url: '/ops/api/v1/mainTask/copy',
    data: data
  })
}

// 获取任务模板数据
const taskTemplateAxios = function() {
  return request({
    method: 'GET',
    url: '/ops/api/v1/model'
  })
}

// 任务模板点击回调的接口
const taskTemplateClick = function(params) {
  return request({
    method: 'GET',
    url: '/ops/api/v1/model',
    params
  })
}



//-------启停执行管理

const queryTaskInst = function(params) {
  return request({
    method: 'GET',
    url: '/ops/api/v1/taskInst',
    params
  })
}

//删除任务
const deleteTaskInst = function(params) {
  return request({
    method: 'DELETE',
    url: '/ops/api/v1/taskInst/'+params.id,
   
  })
}

//多条删除
const deleteTaskKill = (params) => {
	var ids = params.join(',')
	  return request({
	    method: 'DELETE',
	    url: '/ops/api/v1/taskInst/'+ ids

  })
}

//暂停任务
const stopTask = (data) => {
	  return request({
	    method: 'POST',
	    url: '/ops/api/v1/taskInst/stop/',
			data: data
  })
}

//多条暂停任务
const multipleStopTask = (data) => {
	  return request({
	    method: 'POST',
	    url: '/ops/api/v1/taskInst/stop/',
			data: data
  })
}

//停止任务
const killTask = (data) => {
	  return request({
	    method: 'POST',
	    url: '/ops/api/v1/taskInst/kill/',
			data: data
  })
}

//多条停止任务
const multipleKillTask = (data) => {
	  return request({
	    method: 'POST',
	    url: '/ops/api/v1/taskInst/kill/',
			data: data
  })
}

//重新执行
const restartTask = (data) => {
	  return request({
	    method: 'POST',
	    url: '/ops/api/v1/taskInst/restart/',
			data: data
  })
}

//单条继续
const continueOne = function(data) {
  return request({
    method: 'POST',
    url: '/ops/api/v1/taskInst/continuing/',
    data: data
  })
}
//多条继续
const killTaskContinue = (data) => {
	  return request({
	    method: 'POST',
	    url: '/ops/api/v1/taskInst/continuing/',
	    data: data
  })
}

//任务模板查询
const queryModel = function() {
  return request({
    method: 'GET',
    url: '/ops/api/v1/model',
  })
}


//任务类型根据所选模板查询
const queryModelType = function(params) {
  return request({
    method: 'GET',
    url: '/ops/api/v1/model/type',
    params
  })
}
// 列表详情二级接口
const resultDetail = function(params) {
  return request({
    method: 'GET',
    url: '/ops/api/v1/taskInst/info',
    params
  })
}

//--------------启停日志管理
const logQuery = function(params) {
return request({
    method: 'GET',
    url: '/ops/api/v1/userlog',
    params
})
}
export {
	//启停服务管理
  queryData,queryGetService,
  queryCommand,deleteInfo,AddInfo,queryDailytask,
  modifyInfo,queryDataModify,deleteRow,queryIP,
  // 命令管理获取级联数据
  
  // 命令管理首页资源类型转换格式
  queryIndexResourceClassId,
  //启停任务管理
  queryTask,AddTaskCus,editTaskCus,
  editTaskCusOpen,queryTaskCus,deleteTask,
  deleteRowTask,executeTask,taskCusCopy,
  taskTemplateAxios,taskTemplateClick,
  //启停执行管理
  queryTaskInst,deleteTaskInst,deleteTaskKill,
  stopTask,multipleStopTask,killTask,
  multipleKillTask,restartTask,continueOne,
  killTaskContinue,queryModel,queryModelType,
  resultDetail,cuntSum,lastWeekFracture,lastWeekPie,
  lastWeekRadar,lastWeekTOP5,bpmnSava,
  //启停日志管理
  logQuery
  
}
