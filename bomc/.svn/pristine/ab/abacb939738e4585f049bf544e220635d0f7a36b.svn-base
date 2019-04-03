import request from '../../index.js'
// 首页表格查询
const queryData = function(params) {
    return request({
        method: 'GET',
        url: '/ops/api/v1/mainTask',
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
// 应用类型分类
const queryDataTypeUse = function() {
    return request({
        method: 'GET',
        url: '/ops/api/v1/appInfo/type_class',
    })
}
//树形栏查询
const queryIP = function() {
    return request({
      method: 'GET',
      url: '/ops/api/v1/deployTask/host',
    })
  }
// 新增任务保存接口
const queryDataAdd = function(data) {
    return request({
      method: 'POST',
      url: 'ops/api/v1/auto_deploy/task',
      data: data
    })
  }
//执行
const executeTask = (params) => {
    return request({
      method: 'POST',
      url: '/ops/api/v1/mainTask/execute',
      params
})
}
// 编辑
const editTaskCusOpen = function(params) {
    return request({
        method: 'GET',
        url: '/ops/api/v1/auto_deploy/task/info',
        params
    })
}
// 测试
const queryIPGather = function(params) {
    return request({
        method: 'GET',
        url: '/rms/api/v1/CI',
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

// 获取树状结构
const queryDataUseTree = function(params) {
    return request({
        method: 'GET',
        url: '/ops/api/v1/appRepetory/getTree',
        params
    })
  }
//  复制
const taskCusCopy = (params) => {
return request({
    method: 'PUT',
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
export {
    queryData,
    queryDataTypeUse,
    queryIP,
    addTaskRepeatName,
    queryDataAdd,
    editTaskCusOpen,
    executeTask,
    queryIPGather,
    deleteTask,
    deleteRowTask,
    taskCusCopy,
    taskTemplateAxios,
    queryDataUseTree

}