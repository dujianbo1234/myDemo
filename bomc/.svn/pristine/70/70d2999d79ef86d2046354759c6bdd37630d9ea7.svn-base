import request from '@/utils/request'

// 01查询按钮
export function roleSch(formSch) {
  return request({
    url: '/pps/api/v1/dept/list',
    method: 'post',
    data: formSch
  })
}
export function queryEventInGroup() {
	return request({
		url: '/pps/api/v1/dept/tree',
		method: 'get'
	})
}
// 05删除按钮
export function rightDele(list,statu) {
  return request({
    url: '/pps/api/v1/dept?ids=' + list+'&status='+statu,
    method: 'delete'
  })
}
// 02-2新增按钮中的获取岗位信息
export function needPost() {
  return request({
    url: '/pps/api/v1/post/list',
    method: 'post',
    data: {}
  })
}
// 06新增按钮中的提交按钮
export function adCmit(formAdd) {
  return request({
    url: '/pps/api/v1/dept',
    method: 'post',
    data: formAdd
  })
}

// 0编辑提交按钮的准备工作，获根据deptId 获取自己具有的岗位
export function needPostHave(list) {
  return request({
    url: '/pps/api/v1/dept/selectDeptPostTree?deptId=' + list,
    method: 'get'
  })
}
// 08 编辑提交按钮
export function editCmit(list) {
  return request({
    url: '/pps/api/v1/dept',
    method: 'put',
    data: list
  })
}
//08恢复按钮 中  
export function recover(uuid) {
	return request({
		url: '/pps/api/v1/dept/recover?deptId=' + uuid,
		method: 'put'
	})
}