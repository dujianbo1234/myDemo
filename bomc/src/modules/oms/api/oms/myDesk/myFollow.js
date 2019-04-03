import request from '../../index'

// 查询我的关注
export const queryMyFollow = (params) => request({
  method: "GET",
  url: '/oms/api/v1/myconcern',
  params
})

// 添加我的关注
export const createMyFollow = (data) => request({
  method: "POST",
  url: '/oms/api/v1/myconcern',
  headers: {
    "content-type": "application/json"
  },
  data
})

// 根据id删除我的关注
export const deleteCurrentFollow = (id) => request({
  method: "DELETE",
  url: `/oms/api/v1/myconcern/${id}`,
})