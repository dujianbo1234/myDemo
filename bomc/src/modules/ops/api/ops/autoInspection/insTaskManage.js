import request from '../../index.js'

// --------------------------巡检任务-----------------------------
//表格查询
const queryData = function(params) {
    return request({
        method: 'GET',
        url: '/ops/api/v1/inspection/task',
        params
    })
}
// 打开表格的编辑
const pollingIndexEdit = function(params) {
  return request({
    method: 'GET',
		url: '/ops/api/v1/inspection/task/info',
		params
  })
}
// 巡检指标查询
const treeQuery = function(params) {
    return request({
      method: 'GET',
      url: '/ops/api/v1/inspection/item',
      params
    })
  }
// 巡检编辑单条查询
const treeQueryEdit = function(params) {
  return request({
    method: 'GET',
    url: '/ops/api/v1/inspection/item',
    params
  })
}
//巡检指标新增
const treeAdd = function(data) {
    return request({
      method: 'POST',
      url: '/ops/api/v1/inspection/item',
      data: data
    })
}
//巡检指标编辑
const treeEdit = function(data) {
  return request({
    method: 'PUT',
    url: '/ops/api/v1/inspection/item',
    data: data
  })
}
// 对象ip查询
const queryIP = function() {
  return request({
    method: 'GET',
    url: '/ops/api/v1/mainTask/resource',
  })
}
// 新增任务保存接口
const pollingAdd = function(data) {
  return request({
    method: 'POST',
    url: 'ops/api/v1/inspection/task',
    data: data
  })
}
//编辑保存
const pollingEdit = function(data) {
  return request({
    method: 'PUT',
    url: 'ops/api/v1/inspection/task',
    data: data
  })
}
// 巡检指标删除
const pollingDeleteInfo = function(params) {
  return request({
    method: 'DELETE',
    url: '/ops/api/v1/inspection/item/'+params.id,
    
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
//删除
const deleteTask = function(params) {
  return request({
    method: 'DELETE',
    url: '/ops/api/v1/inspection/task/'+params.id,
    
  })
}

//多条删除
const deleteRowTask = (params) => {
	var id = params.join(',')
	  return request({
	    method: 'DELETE',
	    url: '/ops/api/v1/inspection/task/'+ id

  })
}
// 巡检任务复制
const taskCusCopy = (params) => {
  return request({
    method: 'PUT',
    url: '/ops/api/v1/inspection/task/copy',
    params
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
// --------------------------巡检任务-----------------------------

export {
    queryData,treeQuery,treeAdd,treeEdit,queryIP,pollingAdd,pollingEdit,pollingIndexEdit,pollingDeleteInfo,treeQueryEdit,executeTask,deleteTask,deleteRowTask,taskCusCopy,
    addTaskRepeatName
}