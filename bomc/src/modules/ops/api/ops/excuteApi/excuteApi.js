import request from '../../index.js'
// --------------------------巡检任务-----------------------------
//表格查询
const queryData = function(params) {
    return request({
        method: 'GET',
        url: '/ops/api/v1/taskInst',
        params
    })
}
//删除
const deleteTask = function(params) {
  return request({
    method: 'DELETE',
    url: '/ops/api/v1/taskInst/'+params.id,
    
  })
}

//多条删除
const deleteRowTask = (params) => {
	var id = params.join(',')
	  return request({
	    method: 'DELETE',
	    url: '/ops/api/v1/taskInst/'+ id

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
// 结果详情接口
const resultDetail = function(params) {
  return request({
    method: 'GET',
    url: '/ops/api/v1/inspection/task-inst/info',
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
// --------------------------巡检任务-----------------------------

export {
    queryData,deleteTask,deleteRowTask,
    continueOne,killTaskContinue,stopTask,multipleStopTask,
    resultDetail,queryModel,queryModelType,taskType
    
}