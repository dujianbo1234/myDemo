import request from '../../index'

const queryData = function (params) { // 查询表格
  return request({
    method: 'GET',
    url: '/oms/api/v1/tasks/pages',
    params
  })
}

const modifyData = function (data) { // 修改数据
  return request({
    method: 'PUT',
    url: `/oms/api/v1/tasks/pages/${data.id}`,
    data
  })
}
const deleteData = function (params) { // 删除数据
  return request({
    method: 'DELETE',
    url: '/oms/api/v1/tasks/pages',
    params
  })
}

const addData = function (data) { // 添加数据
  return request({
    method: 'POST',
    url: '/oms/api/v1/tasks/pages',
    data
  })
}

const queryTypes = function (params) { // 查询类型
  return request({
    method: 'GET',
    url: '/oms/api/v1/processDefinitions/filter',
    params
  })
}

const queryVersion = function (params) { // 查询版本
  return request({
    method: 'GET',
    url: '/oms/api/v1/processDefinitions/version',
    params
  })
}

export {
  queryData,
  modifyData,
  deleteData,
  addData,
  queryTypes,
  queryVersion
}