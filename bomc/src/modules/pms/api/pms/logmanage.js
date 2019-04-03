import request from '../index';
import { api } from '../api';

// query log data
export function queryLogManageData(params) {
  return request({
    method: 'GET',
    url: `${api}/logs`,
    params
  })
}

// delete log
export function deleteLog(id) {
  return request({
    method: 'DELETE',
    url: `${api}/logs/${id}`,
  })
}