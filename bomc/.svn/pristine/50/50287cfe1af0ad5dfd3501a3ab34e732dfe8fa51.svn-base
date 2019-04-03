import request from '@/utils/request'

// 01查询按钮
export function roleSch(formSch) {
  return request({
    url: '/pps/api/v1/profile/list',
    method: 'get',
    data: formSch
  })
}

// 05删除按钮
export function rightDele(list) {
  return request({
    url: '/pps/api/v1/profile?ids=' + list,
    method: 'delete'
  })
}

