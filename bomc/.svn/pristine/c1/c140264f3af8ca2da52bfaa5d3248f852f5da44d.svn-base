import request from '@/utils/request'

// 查询指标数据列表
export function query(params) {
  return request({
    url: 'kms/api/v1/metrics',
    method: 'get',
    params
  })
}

export function getMetricsType(params) {
  return request({
    url: 'kms/api/v1/metricsType',
    method: 'get',
    params
  }) // 查询资源信息，即查询指标类型信息
}

export function getMetricsDimension(params) {
  return request({
    url: 'kms/api/v1/metricsDimension',
    method: 'get',
    params
  }) // 即查询指标维度信息
}

export function postMetricsType(form) {
  return request({
    url: 'kms/api/v1/metricsType',
    method: 'post',
    data: form
  }) // 查询资源信息，即查询指标类型信息
}

export function postMetricsDimension(form) {
  return request({
    url: 'kms/api/v1/metricsDimension',
    method: 'post',
    data: form
    // 新增指标维度信息，指标维度名name，维度别名alias
  }) // 查询资源信息，即查询指标类型信息
}

export function putMetricsType(form) {
  return request({
    url: 'kms/api/v1/metricsType',
    method: 'put',
    data: form// 修改指标类型信息，指标类型名name，类型别名alias，序列号typeId，根据这几个参数修改
  })
}

export function putMetricsDimension(form) {
  return request({
    url: 'kms/api/v1/metricsDimension',
    method: 'put',
    data: form// 修改指标维度信息，指标维度名name，维度别名alias，序列号typeId，根据这几个参数修改
  })
}

export function deleteMetricsType(ids) {
  return request({
    url: 'kms/api/v1/metricsType?typeAlias=' + ids,
    method: 'delete'
  }) // 删除指标类型信息
}

export function deleteMetricsDimension(ids) {
  return request({
    url: 'kms/api/v1/metricsDimension?dimensionAlias=' + ids,
    method: 'delete'
  }) // 删除指标维度信息
}

// http:// 192.168.137.249:8080/kms/api/v1/metricsRule （指标规则查询）GET
//  http:// 192.168.137.249:8080/kms/api/v1/metricsRule  （指标规则新增） POST
//  http:// 192.168.137.249:8080/kms/api/v1/metricsRule?ruleIds=xx,xx（指标规则批量删除）DELETE
//  http:// 192.168.137.249:8080/kms/api/v1/metricsRule （指标规则修改）PUT

export function getMetricsRule(params) {
  return request({
    url: 'kms/api/v1/metricsRule',
    method: 'get',
    params
  })// 查询资源信息，即查询指标规则信息
}

export function postMetricsRule(form) {
  return request({
    url: 'kms/api/v1/metricsRule',
    method: 'post',
    data: form
    // 新增form指标规则，
  })
}

export function putMetricsRule(form) {
  return request({
    url: 'kms/api/v1/metricsRule',
    method: 'put',
    data: form
    // 修改规则信息
  })
}
export function deleteMetricsRule(ids) {
  return request({
    url: 'kms/api/v1/metricsRule?ruleNames=' + ids,
    method: 'delete'
  }) // 删除指标规则信息
}

// 指标基本信息
export function getMetricsDef(page, size) {
  return request({
    url: `kms/api/v1/metricsDef?limit=${size}&start=${page}`,
    method: 'get'
  })
}
// 指标基本信息查询
export function queryMetricsDef(params) {
  return request({
    url: 'kms/api/v1/metricsDef',
    method: 'get',
    params
  })
}
// 批量启动
export function startMetricsDefData(params) {
  return request({
    url: 'kms/api/v1/metricsTask/'+1,
    method: 'post',
    data:params
  })
}
// 批量停止
export function stopMetricsDefData(params) {
  return request({
    url: 'kms/api/v1/metricsTask/'+0,
    method: 'post',
    data:params
  })
}
// 指标基本信息导出
export function exportExcel(params) {
  return request({
    url: 'kms/api/v1/metricsDef/exportExcel',
    method: 'get',
    params,
    responseType: 'arraybuffer'
  })
}
// 指标基本信息导入
export function importExcel() {
  return request({
    url: 'kms/api/v1/metricsDef/importExcel',
    method: 'post'
  })
}

// 指标类型搜索
export function queryMetricsType(params) {
  return request({
    url: 'kms/api/v1/metricsType',
    method: 'get',
    params
  })
}

// 指标维度搜索
export function queryMetricsDimension(params) {
  return request({
    url: 'kms/api/v1/metricsDimension',
    method: 'get',
    params
  })
}

// 指标规则搜索
export function queryMetricsRul(params) {
  return request({
    url: 'kms/api/v1/metricsRule',
    method: 'get',
    params
  })
}

// 新增
export function postMetricsDef(params) {
  return request({
    url: 'kms/api/v1/metricsDef',
    method: 'post',
    data: params
  })
}
export function putMetricsDef(params) {
  return request({
    url: 'kms/api/v1/metricsDef',
    method: 'put',
    data: params
  })
}
//是否启用（关闭）
export function putMetricsDefUpdate(params) {
  return request({
    url: 'kms/api/v1/metricsTask/'+0,
    method: 'post',
    data: params
  })
}
//是否启用(开启)
export function putMetricsDefs(params) {
  return request({
    url: 'kms/api/v1/metricsTask/'+1,
    method: 'post',
    data: params
  })
}
export function balance(taskId) {
  return request({
    url: `kms/api/v1/metricsDef/rebalance/${taskId}`,
    method: 'get'
  })
}
export function deleteMetricsDefData(params) {
  return request({
    url: 'kms/api/v1/metricsDef',
    method: 'delete',
    params
  }) // 删除指标维度信息
}

export function getComparatorInfo() {
  return request({
    url: '/kms/api/v1/comparatorInfo',
    methods: 'get'
  })
}

// export function getImage() {
//   return request({
//     url: '/pms/api/v1/processDefinitions/ruleTest:4:32518/image',
//     methods: 'get'
//   })
// }
export function getCIIDS(params) {
  return request({
    method: 'GET',
    url: `/rms/api/v1/CI`,
    params
  })
}

export function getCodes(params) {
  return request({
    method: 'GET',
    url: '/rms/api/v1/CI',
    params
  })
}
export function getResType(params) {
  return request({
    method: 'GET',
    url: '/rms/api/v1/ResModel/type',
    params
  })
}
// 标签
export function metricsTag(params) {
  return request({
    method: 'GET',
    url: '/kms/api/v1/metricsTag/tagsOverview',
    params
  })
}
//获取指标标签列表
export function tagList() {
  return request({
    method: 'GET',
    url: '/kms/api/v1/metricsTag/tagList',
  })
}

//根据标签名获取指标定义name列表
export function metricsDefName(params) {
  return request({
    method: 'GET',
    url: '/kms/api/v1/metricsTag/metricsDefName',
    params
  })
}
// 概览页一图接口
export function overview(params) {
  return request({
    method: 'GET',
    url: '/kms/api/v1/metricsDef/overview',
    params
  })
}
// 概览页三图接口
export function metricsCapacity(params) {
  return request({
    method: 'GET',
    url: '/kms/api/v1/metricsCapacity',
    params
  })
}
// 概览页四图接口
export function metricsGrowth(code) {
  return request({
    method: 'GET',
    url: '/kms/api/v1/metricsGrowth?code=' + code,
  })
}
// export function metricsTag() {
//   return request({
//     method: 'GET',
//     url: '/kms/api/v1/metricsTag/metricsDefName',
//   })
// }
// export function operate(params) {
//   return request({
//     method: 'PUT',
//     url: '/kmms/kms-engine/api/v1/task?operType=' + params.status + '&topologyId=' + params.taskId + '&waitTime=' + params.waitTime
//   })
// }

// export function exportFile(params) {
//   return request({
//     method: 'PUT',
//     url: '/kmms/kms-engine/api/v1/task?operType=' + params.status + '&topologyId=' + params.taskId + '&waitTime=' + params.waitTime
//   })
// }
