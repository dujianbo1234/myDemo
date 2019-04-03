import request from '@/utils/request'

//01查询按钮
export function roleSch(formSch) {
	return request({
		url: '/pps/api/v1/user/list',
		method: 'post',
		data: formSch
	})
}


//02新增按钮中的获取部门信息
export function needDept() {
	return request({
		url: '/pps/api/v1/dept/list',
		method: 'post',
		data: {}
	})
}

//02-2新增按钮中的获取岗位信息
export function needPost() {
	return request({
		url: '/pps/api/v1/post/list',
		method: 'post',
		data: {}
	})
}

//03新增按钮中的获取角色信息
export function needRole() {
	return request({
		url: '/pps/api/v1/role/list',
		method: 'post',
		data: {}
	})
}

//04新增按钮 中  输入用户名称 去后台校验是否唯一
export function checkUname(uName) {
	return request({
		url: '/pps/api/v1/user/checkLoginNameUnique?userName=' + uName,
		method: 'get'
	})
}

//05根据用户名查询密码，公共页的，更改密码使用
export function checkPwd(uName) {
	return request({
		url: '/pps/api/v1/user/selectUserByUserName?userName=' + uName,
		method: 'get'
	})
}

export function queryEventInGroup() {
	return request({
		url: '/pps/api/v1/dept/tree',
		method: 'get'
	})
}


//05新增按钮中的提交按钮
export function adCmit(formAdd) {
	return request({
		url: '/pps/api/v1/user',
		method: 'post',
		data: formAdd
	})
}

//06重置密码的提交按钮
export function resetPwd(formRs) {
	return request({
		url: '/pps/api/v1/user/resetPwd',
		method: 'put',
		data: formRs
	})
}

//07删除按钮    禁用 1 删除 2
export function userDele(list,statu) {
	return request({
		url: '/pps/api/v1/user?ids=' + list+'&status='+statu,
		method: 'delete'
	})
}

//08恢复按钮 中  
export function recover(uuid) {
	return request({
		url: '/pps/api/v1/user/recover?userId=' + uuid,
		method: 'put'
	})
}
//0编辑提交按钮的准备工作，获根据userId 获取自己具有的role
export function needPostHave(list) {
	return request({
		url: '/pps/api/v1/user/selectUserRoleTree?userId=' + list,
		method: 'get'
	})
}

//0编辑提交按钮的准备工作，获根据userId 自己具有的post
export function needPstSelect(list) {
	return request({
		url: '/pps/api/v1/user/selectUserPostTree?userId=' + list,
		method: 'get'
	})
}

//0编辑提交按钮的准备工作，获根据userId 获取所有post
export function needPstSelectAll(list) {
	return request({
		url: '/pps/api/v1/post/list',
		method: 'post',
		data: {}
	})
}

//0编辑提交按钮的准备工作，获根据userId 获取所有dept
export function needDeptSelectAll(list) {
	return request({
		url: '/pps/api/v1/dept/list',
		method: 'post',
		data: {}
	})
}

//08 编辑提交按钮

export function editCmit(list) {
return request({
    url: '/pps/api/v1/user',
    method: 'put',
     data: list
})
}
//09获取左边树状结构
export function leftData() {
	return request({
		url: '/pps/api/v1/dept/list',
		method: 'post',
		data: {}
	})
}
//这里是部门管理，编辑里面的选择上级名称掉用的
export function leftData2(depId2) {
	return request({
		url: '/pps/api/v1/dept/onList?deptId='+depId2,
		method: 'get',
		data: {}
	})
}

//tree中，根据deptId显示数据
//<!--http://localhost:8092/pps/api/v1/user/findUserByDeptId?deptId=111-->
export function treeShow(dptId) {
	return request({
		url: '/pps/api/v1/user/findUserByDeptId?deptId=' + dptId,
		method: 'get'
	})
}
