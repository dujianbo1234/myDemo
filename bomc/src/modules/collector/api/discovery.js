import request from './request';
const URL = '/collector/api/v1/';

export default {
  //查询规则
  queryRule(start, limit, obj) {
    let str = '&';
    for (let key in obj) {
      str += key + '=' + obj[key] + '&';
    }
    str = str.slice(0, str.length - 1);
    return request({
      url: URL + 'getRule?search=true&sortfield=createDate&sortorder=DESC&start=' + start + '&limit=' + limit + str,
      method: 'post'
    });
  },
  //创建规则
  addRule(params){
    return request({
      url: URL + 'createRule',
      method: 'post',
      data: params
    });
  },
  editRule(ruleId,params){
    return request({
      url: URL + 'rule/'+ruleId,
      method: 'put',
      data: params
    });
  },
  //删除规则
  deleteRule(value) {
    let url = '';
    if (typeof value === 'string') {
      url = URL + 'deleteRule/' + value;
    } else {
      url = URL + 'deleteRule?rule_ids=' + value;
    }
    return request({
      url: url,
      method: 'delete'
    });
  },
  //获取机房
  getProxy(){
    return request({
      url: URL +'getProxy',
      method: "get"
    });
  },
  //查询资源类型
  query_resource() {
    return request({
      url: '/rms/api/v1/ResModel/type',
      method: 'get'
    });
  }
}
