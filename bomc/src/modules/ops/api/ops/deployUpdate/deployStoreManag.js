import request from '../../index.js'

// 应用分类
const queryDataTypeUse = function() {
    return request({
        method: 'GET',
        url: '/ops/api/v1/appInfo/type_class',
    })
}
// 应用分类
const queryDataType = function(params) {
    return request({
        method: 'GET',
        url: '/ops/api/v1/appInfo/type',
        params
    })
}
// 应用分类表格
const queryData = function(params) {
    return request({
        method: 'GET',
        url: '/ops/api/v1/appInfo/select',
        params
    })
}
// upload attachments
const uploadAttachment = (data) => {
    return request({
        method: 'POST',
        url: '/ops/api/v1/appRepetory',
        data: data
    })
}
// 版本号表格
const queryDataVersion = function(params) {
    return request({
        method: 'GET',
        url: '/ops/api/v1/appRepetory/select',
        params
    })
}
// 判断版本号是否覆盖
const detectionVersion = function(params) {
    return request({
        method: 'GET',
        url: '/ops/api/v1/appRepetory/checkVersion',
        params
    })
}

// 新增应用
const addUseSave = function(params) {
    return request({
        method: 'POST',
        url: '/ops/api/v1/appInfo',
        params
    })
}




// 获取树形导航
const queryDataTree = function() {
    return request({
        method: 'GET',
        url: '/ops/api/v1/appRepetory/getTypeTree',
        
    })
}
// 仓库管理删除
const deleteTask = function(params) {
    return request({
      method: 'DELETE',
      url: '/ops/api/v1/appInfo/delete/'+params.ids,
      
    })
  }
  
// 仓库管理多条删除
const deleteRowTask = (params) => {
    var id = params.join(',')
    return request({
        method: 'DELETE',
        url: '/ops/api/v1/appInfo/delete/'+ id
    })
}
// 仓库管理上传删除
const uploadDeleteTask = function(params) {
    return request({
      method: 'DELETE',
      url: '/ops/api/v1/appRepetory/delete/'+params.ids,
      params
    })
  }
  
// 仓库管理上传多条删除
const uploadDeleteRowTask = (params) => {
    var id = params.join(',')
    return request({
        method: 'DELETE',
        url: '/ops/api/v1/appRepetory/delete/'+ id,
    })
}
export {
    queryDataTypeUse,
    queryDataType,
    queryData,
    uploadAttachment,
    queryDataVersion,
    addUseSave,
    queryDataTree,
    deleteTask,
    deleteRowTask,
    uploadDeleteTask,
    uploadDeleteRowTask,
    detectionVersion 

}