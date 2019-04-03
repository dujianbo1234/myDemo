import request from '../../index.js'

//----------------------模板管理----------------------
//新增命令

// 脚本上传
const uploadScript = function(data) {
  return request({
    method: 'POST',
    url: '/ops/api/v1/mainTask/upload',
    data
  })
}
//表单查询
const queryData = function(params) {
  return request({
    method: 'GET',
    url: '/ops/api/v1/model',
    params
  })
}

//新增命令
const AddTask = function(data) {
  return request({
    method: 'POST',
    url: '/ops/api/v1/model',
    data: data
  })
}

//编辑命令
const editTaskPUT = function(data) {
  return request({
    method: 'PUT',
    url: '/ops/api/v1/model',
    data: data
  })
}

const editTask = function(params) {
  return request({
    method: 'GET',
		url: '/ops/api/v1/model',
		params
  })
}

//任务类型查询查询-执行管理类型查询
const taskType = function() {
  return request({
    method: 'GET',
    url: '/ops/api/v1/model/type ',
  })
}

//任务模板删除
const deleteModel = function(params) {
  return request({
    method: 'DELETE',
    url: '/ops/api/v1/model/'+params.ids,
    
  })
}
//多条删除
const deleteRow = (params) => {
	var ids = params.join(',')
	  return request({
	    method: 'DELETE',
	    url: '/ops/api/v1/model/'+ ids

  })
}
//----------------------模板管理----------------------

//-------------------任务定制管理------------------------
//表单查询
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
    url: '/ops/api/v1/mainTask/'+params.ids,
    
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
const executeTask = (params) => {
	  return request({
	    method: 'POST',
	    url: '/ops/api/v1/mainTask/execute/',
			params
  })
}

// 任务定制管理 复制操作
const taskCusCopy = (params) => {
  return request({
    method: 'POST',
    url: '/ops/api/v1/mainTask/copy',
    params
  })
}

// 获取任务模板数据
const taskTemplateAxios = function(params) {
  return request({
    method: 'GET',
    url: '/ops/api/v1/model/map',
    params
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
//树形栏查询
const queryIP = function() {
  return request({
    method: 'GET',
    url: '/ops/api/v1/mainTask/resource',
  })
}
//-------------------任务定制管理------------------------

//------------------------------任务执行管理------------------------------
//表单查询
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
//------------------------------任务执行管理------------------------------



//------------------------------任务日志管理//------------------------------
//任务日志查询
const taskLogoQuery = function(params) {
return request({
    method: 'GET',
    url: '/ops/api/v1/userlog',
    params
})
}
////任务日志导出
const taskexportLogo = function(params) {
return request({
    method: 'GET',
    url: '/ops/api/v1/userlog/excel',
    params
//  responseType: 'blob'
})
}
//------------------------------任务日志管理//------------------------------

//------------------------------任务预览//------------------------------

//预览数据统计
const cuntSum = function() {
	return request({
	    method: 'GET',
	    url: '/ops/api/v1/taskInst/countByState',
	})
}

//折线图-任务总数
const lastWeekFracture = function() {
	return request({
	    method: 'GET',
	    url: '/ops/api/v1/taskInst/countLastWeek',
	})
}

//饼图-完成比重
const lastWeekPie = function() {
	return request({
	    method: 'GET',
	    url: '/ops/api/v1/taskInst/countLastWeekByState',
	})
}

//雷达图--任务类型比重
const lastWeekRadar = function() {
	return request({
	    method: 'GET',
	    url: '/ops/api/v1/taskInst/countLastWeekByModelType',
	})
}

//柱状图--TOP5
const lastWeekTOP5 = function() {
	return request({
	    method: 'GET',
	    url: '/ops/api/v1/taskInst/countLastWeekUseCount',
	})
}
//------------------------------任务预览//------------------------------
//bpmn
const bpmnSave = function(data) {
  return request({
    method: 'POST',
    url: '/ops/api/v1/mainTask/bpmn',
    data: data
})
}
// 判断是否重名
const addTaskRepeatName = (params) => {
  return request({
    method: 'GET',
    url: '/ops/api/v1/task/check-name',
    params
  })
}
// 判断是否重名
const addTemplateRepeatName = (params) => {
  return request({
    method: 'GET',
    url: '/ops/api/v1/model/check-name',
    params
  })
}
export {
	queryData,AddTask,editTask,taskType,deleteModel,deleteRow,queryModel,queryModelType,
	queryTask,deleteTask,deleteRowTask,executeTask,
	queryTaskInst,deleteTaskInst,stopTask,
	killTask,deleteTaskKill,killTaskContinue,multipleStopTask,multipleKillTask,restartTask,
	taskLogoQuery,taskexportLogo,request,
  lastWeekPie,lastWeekFracture,lastWeekRadar,lastWeekTOP5,cuntSum,editTaskPUT,AddTaskCus,editTaskCus,queryTaskCus,
  editTaskCusOpen,taskCusCopy,resultDetail,continueOne,taskTemplateAxios,taskTemplateClick,
  // 脚本上传
  uploadScript,
  // bpmn
  bpmnSave,
  queryIP,
  // 判断重名
  addTaskRepeatName,
  addTemplateRepeatName,
}