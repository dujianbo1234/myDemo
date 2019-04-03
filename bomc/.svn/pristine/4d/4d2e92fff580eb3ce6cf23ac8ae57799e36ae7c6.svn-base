// import request from '../request';
import request from '@/utils/request'

// ---资源数据管理
// 初始所有资源数据
const resourcesData = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/CI?model=${params.model}&limit=${params.pageSize}&start=${params.pageNum * params.pageSize + 1}`
  })
}
// 树状点击父类查询 http://192.168.127.248:8899/rms/api/v1/CI?model=ResObject&keys=level&value=IaaS.Physical.&searchByAny=true
const queryResourcesParent  = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `rms/api/v1/CI?model=ResObject&keys=level&value=${params.value}&limit=${params.pageSize}&start=${params.pageNum * params.pageSize + 1}&searchByAny=true`
  })
}
// 接条件查询
const conditionQuery = function(page) {
  debugger
  var queryUrl = ''
  if (page.is_checked) {
    queryUrl = `/rms/api/v1/CI?model=${page.model}&keys=ciname,ciid,state,isimportant&value=${page.ciname},${page.ciid},${page.state},${page.is_checked}&search=true&limit=${page.pageSize}&start=${page.pageNum * page.pageSize + 1}`
  }else {
    queryUrl = `/rms/api/v1/CI?model=${page.model}&keys=ciname,ciid,state&value=${page.ciname},${page.ciid},${page.state},&search=true&limit=${page.pageSize}&start=${page.pageNum * page.pageSize + 1}`
  }
  return request({
    method: 'GET',
    url: queryUrl
  })
}
// 单个删除
const deleteInfo = function(params) {
  debugger
  return request({
    method: 'DELETE',
    url: `/rms/api/v1/CI?model=${params.modelName}&condition=ciid&id=${params.ciid}`
  })
}

// 多条删除
const deleteInfoMultiple = function(modelName, delarr) {
  debugger
  return request({
    method: 'DELETE',
    url: '/rms/api/v1/CI',
    params: {
      model: modelName,
      condition: 'ciid',
      id: delarr.join(',')
    }
  })
}

// 新增资源模型
const abbResourcesData = function(params) {
  console.log(params)
  debugger
  return request({
    method: 'post',
    url: `/rms/api/v1/CI?model=${params.model}`,
    data: params
  })
}

// 修改资源模型
const modifiedModel = function(params) {
  debugger
  return request({
    method: 'put',
    url: `/rms/api/v1/CI?model=${params.modelName}&condition=ciid&id=${params.ciid}&type=1`,
    data: params
  })
}

// 左侧树状导航分类
const dataList = function(params) {
  return request({
    method: 'GET',
    url: '/rms/api/v1/ResModel/type',
    params
  })
}

// 查询多个模型接口
const allQueryModel = function(params) {
  debugger
  var url = 'key='
  for (var i = 0; i < params.length; i++) {
    if (i == params.length - 1) {
      url += 'name'
    } else{
      url += 'name,'
    }
  }
  return request({
    method: 'GET',
    url: `/rms/api/v1/ResModel?${url}&value=${params}&searchByAny=true`
  })
}

// 新增页面专有属性
const attProprietary = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/ResModel?key=name&value=${params}`
  })
}
// 新增页面获取搜索代码  192.168.127.248:8899/rms/api/v1/CI/Ciid?type=“”&model=“”&system=“”
const querySearchcode = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `rms/api/v1/CI/Ciid`,
    params
  })
}

// 上传资源数据
const importData = function(params, models) {
  console.log(params)
  debugger
  return request({
    method: 'post',
    url: `/rms/api/v1/CI/import?model=${models}`,
    data: params
  })
}

// 获取模型节点关系数据
const queryRelationship = function(params) {
  debugger
  return request({
    method: 'GET', 
    url: `/rms/api/v1/ResRelationModel?key=source&value=${params}`,
  })
}
// 获取模型接收端数据
const queryReceive = function(params) {
  debugger
  return request({
    method: 'GET', 
    url: `/rms/api/v1/CI?model=${params}`,
  })
}
// 获取关系节点修改时的默认值
const queryRelationalNode = function(params) {
  debugger
  return request({
    method: 'GET', 
    url: `/rms/api/v1/CI/searchByRelation?ciid=${params}&direction=false`,
  })
}
//默认关系地址ciid：http://192.168.127.248:8899/rms/api/v1/CI/searchByRelation?ciid=HW-EPS-ZZZ-B7XT49&direction=false

// 获取对应资源数据总条数
// const totalRecordsData = function(params) {
//   debugger
//   return request({
//     method: 'GET',
//     url: `rms/api/v1/CI?model=${params}&countOutput=true`,
//   })
// }
//获取按条件查询资源数据总条数
// const totalRecordsData_query = function(params,data) {
//   debugger
//   var queryUrl = '';
//   if(params.checked){
//     queryUrl = `/rms/api/v1/CI?model=${params.model}&keys=ciname,ciid,state,ciname&value=${params.name},${params.code},${params.select},*&search=true&countOutput=true`
//   }else{
//     queryUrl = `/rms/api/v1/CI?model=${params.model}&keys=ciname,ciid,state&value=${params.name},${params.code},${params.select},&search=true&countOutput=true`
//   }
//   return request({
//     method: 'GET',
//     url: queryUrl,
//   })
// }
// 新增资源数据模型
// const abbResource = function(params) {
//   console.log(params)
//   debugger
//   return request({
//     method: 'post',
//     url: '/rms/api/v1/ResModel',
//     data: params
//   })
// }
export {
  resourcesData,
  queryResourcesData,
  conditionQuery,
  abbResource,
  attProprietary,
  resourceType,
  dataList,
  deleteInfo,
  deleteInfoMultiple,
  abbResourcesData,
  modifiedModel,
  allQueryModel,
  importData,
  queryRelationship,
  queryReceive,
  queryRelationalNode,
  querySearchcode,
  queryResourcesParent
  // totalRecordsData,
  // totalRecordsData_query
}
