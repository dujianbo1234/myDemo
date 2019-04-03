import request from './request';
const URL = '/collector/api/v1/deployment';

export default {
  //查询部署配置
  queryDeploy(start, limit, obj) {
    let str = '&';
    for (let key in obj) {
      str += key + '=' + obj[key] + '&';
    }
    str = str.slice(0, str.length - 1);
    return request({
      url: URL + '?search=true&start=' + start + '&limit=' + limit + str,
      method: 'get'
    });
  },
  //删除部署配置
  deleteDeploy(value) {
    let url = '';
    if (typeof value === 'string') {
      url = URL + '/' + value + '?deployId=' + value;
    } else {
      url = URL + '?deployIds=' + value;
    }
    return request({
      url: url,
      method: 'delete'
    });
  },
  //代理安装、卸载
  optDeploy(value, type) {
    return request({
      url: URL + '/' + type,
      method: 'post',
      data: value
    });
  }
}
