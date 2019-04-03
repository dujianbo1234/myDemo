import request from '../../index'

export const queryMyDraft = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/tasks/draft',
  params
})