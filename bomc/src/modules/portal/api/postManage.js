import request from '@/utils/request'

// 01查询按钮
export function roleSch(formSch) {
  return request({
    url: '/pps/api/v1/post/list',
    method: 'post',
    data: formSch
  })
}
// 05删除按钮
export function rightDele(list,statu) {
  return request({
    url: '/pps/api/v1/post?ids=' + list+'&status='+statu,
    method: 'delete'
  })
}

// 06新增按钮中的提交按钮
export function adCmit(formAdd) {
  return request({
    url: '/pps/api/v1/post',
    method: 'post',
    data: formAdd
  })
}

// 08 编辑提交按钮
export function editCmit(list) {
  return request({
    url: '/pps/api/v1/post',
    method: 'put',
    data: list
  })
}

//08恢复按钮 中  
export function recover(uuid) {
	return request({
		url: '/pps/api/v1/post/recover?postId=' + uuid,
		method: 'put'
	})
}