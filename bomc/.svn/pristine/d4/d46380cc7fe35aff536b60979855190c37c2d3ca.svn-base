import request from './request'
const URL = '/collector/api/v1/'

export default {
  //查询规则结果
  queryRuleResult(start, limit, obj) {
    let str = '';
    if (obj.identify !== '') {
      str += '&identify=' + obj.identify;
    }
    if (obj.ruleId) {
      str += '&ruleId=' + obj.ruleId;
    }
    return request({
      url: URL + 'getDiscoverResult?search=true&sortfield=createDate&sortorder=DESC&start=' + start + '&limit=' + limit + str,
      method: 'post'
    });
  },
  //查询资源类型
  query_resource() {
    return request({
      url: '/rms/api/v1/ResModel/type',
      method: 'get'
    });
  },
  //获取机房
  getProxy() {
    return request({
      url: URL + 'getProxy',
      method: "get"
    });
  },
}