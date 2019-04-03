import request from '../../index'

export const queryNoticeData = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/notices',
  params
})

export const changeStatus = (id) => request({
  method: 'PUT',
  url: `/oms/api/v1/notices/${id}/status`,
  // headers: {
  //   'Content-Type': 'application/json;charset=UTF-8'
  // }
})