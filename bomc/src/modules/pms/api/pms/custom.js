import request from '../index';
import { api } from '../api';

export const publishForm = (data) => request({
  method: 'POST',
  url: `${api}/forms/dataModel`,
  headers: {
      "content-type": "application/json;utf-8"
  },
  data
})

export const queryFormByProcessDefine = (params) => request({
  method: 'GET',
  url: `${api}/forms/content`,
  params
})