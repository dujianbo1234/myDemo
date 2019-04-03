import request from '@/utils/request'

// 01查询按钮
export function roleSch(formSch) {
  return request({
    url: '/pps/api/v1/role/list',
    method: 'post',
    data: formSch
  })
}
// 02新增按钮 中  输入角色名称 去后台校验是否唯一
export function checkUname(uName) {
  return request({
    url: '/pps/api/v1/role/checkRoleNameUnique?roleName=' + uName,
    method: 'get'
  })
}
// 03新增按钮 中  获取权限列表
export function needRight() {
  return request({
    url: '/pps/api/v1/role',
    method: 'get',
    data: {}
  })
}
// 04新增按钮 中  提交
export function adCmit(formAdd) {
  return request({
    url: '/pps/api/v1/role',
    method: 'post',
    data: formAdd
  })
}


// 05编辑按钮 中  提交
export function editCmit(formAdd) {
  return request({
    url: '/pps/api/v1/role',
    method: 'put',
    data: formAdd
  })
}
// 06获取 已经拥有 权限列表
export function needRightHave(list1) {
  return request({
    url: '/pps/api/v1/role/selectRolePermssionTree?roleId=' + list1,
    method: 'get'
  })
}
// 07删除按钮
export function rightDele(list,statu) {
  return request({
    url: '/pps/api/v1/role?ids=' + list+'&status='+statu,
    method: 'delete'
  })
}

//08恢复按钮 中  
export function recover(uuid) {
	return request({
		url: '/pps/api/v1/role/recover?roleId=' + uuid,
		method: 'put'
	})
}