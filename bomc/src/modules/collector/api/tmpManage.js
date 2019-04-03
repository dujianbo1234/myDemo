import request from './request'

//查询模板请求
export function query(start, limit, type, name, group) {
  let str = '';
  if (name) {
    str += '&template_name=' + name;
  }
  if (group) {
    str += '&group=' + group;
  }
  return request({
    url: '/collector/api/v1/template' + '?search=true&sortfield=create_time&sortorder=DESC&start=' + start + '&limit=' + limit + '&template_type=' + type + str,
    method: 'get'
  })
}

//新增模板请求
export function add_module(parmas) {
  return request({
    url: "/collector/api/v1/template",
    method: 'post',
    data: parmas
  })
}

//修改模板请求
export function update_module(parmas, id) {
  return request({
    url: "/collector/api/v1/template/" + id,
    method: 'put',
    data: parmas
  })
}
//删除采集数据模板
export function detele_module(value) {
  let url = '';
  if (typeof value === 'string') {
    url = '/collector/api/v1/template/' + value;
  } else {
    url = '/collector/api/v1/template?template_ids=' + value;
  }
  return request({
    url: url,
    method: 'delete'
  });
}
//模板导出
export function export_module(ids) {
  return request({
    url: "/collector/api/v1/template/export?template_ids=" + ids,
    method: 'get',
    headers: {
      "Accept": "multipart/form-data"
    }
  })
}
//查询单个模板
export function queryById(id) {
  return request({
    url: "/collector/api/v1/template/" + id,
    method: 'get'
  })
}

//查询资源类型
export function query_resource() {
  return request({
    url: "/rms/api/v1/ResModel/type",
    method: "get"
  })
}

//查询采集指标
export function queryMetrics(type) {
  return request({
    url: '/kms/api/v1/metricsDef?keys=calcType,resourceType&search=true&' + 'value=0,' + type + '&start=1&limit=10000',
    method: 'get'
  });
}

export function checkRules(params) {
  return request({
    url: '/collector/api/v1/template/checkRules',
    method: 'post',
    data: params
  });
}
//export function logout() {
//return request({
//  url: '/user/logout',
//  method: 'post'
//})
//}