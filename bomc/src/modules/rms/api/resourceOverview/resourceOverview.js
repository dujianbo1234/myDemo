// import request from '../../request';
import request from '@/utils/request'

//---首页统计

// 初始查询首页统计
const queryResourceOverview = function(params) {
  debugger
  return request({
    method: 'GET',
    url: `/rms/api/v1/CI/summary/${params.level}/${params.type}`
  })
}
// 首页资源统计 
const queryResourceStatistics = function() {
  debugger
  return request({
    method: 'GET',
    url: '/rms/api/v1/CI/Statistics?type=total',
  })
}

// 单个删除
const deleteInfo = function(params) {
  debugger
  return request({
    method: 'DELETE',
    url: '/rms/api/v1/BaseLine/' + params
  })
}

// 多条删除
const deleteInfoMultiple = function(params) {
  debugger
  return request({
    method: 'DELETE',
    url: '/rms/api/v1/BaseLine',
    params: {
      id: params.join(',')
    }
  })
}

export {
  queryResourceOverview,
  queryResourceStatistics,
  deleteInfo,
  deleteInfoMultiple,
  modifyAttribute
}
