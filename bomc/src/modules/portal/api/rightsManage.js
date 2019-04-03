import request from '@/utils/request'

// 01查询按钮
export function roleSch(formSch) {
  return request({
    url: '/pps/api/v1/permission/list',
    method: 'post',
    data: formSch
  })
}

// 暂时获取李超的数据权限的数据
export function dataSch() {
  return request({
    url: 'rms/api/v1/ResModel/type',
    method: 'get'
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
export function rightList() {
  return request({
    url: '/pps/api/v1/permission/list',
    method: 'post',
    data: {}
  })
}

// 03新增按钮 中  获取权限域列表
export function rightAreaList() {
  return request({
    url: '/pps/api/v1/group/list',
    method: 'get'
  })
}
// 01新增按钮 中，获取数据列表
export function roleSchData0(pId) {
  return request({
    url: '/pps/api/v1/menu/list?groupId='+pId,    
    method: 'get',

  })
}
export function roleSchData(pId) {
  return request({
    url: '/pps/api/v1/data/list',
    method: 'post',
    data: {parentId:pId}
  })
}
export function roleSchData2(pId) {
  return request({
    url: '/pps/api/v1/html/list',
    method: 'post',
    data: {parentId:pId}
  })
}
export function roleSchData3(pId) {
return request({
    url: '/pps/api/v1/area/list',
    method: 'post',
     data: {parentId:pId}
})
}

// 05新增按钮中的提交数据 Data按钮
export function adCmitData(formAdd) {
  return request({
    url: '/pps/api/v1/permission',
    method: 'post',
    data: formAdd
  })
}
// 04获取 已经拥有 权限列表
export function rightListHv(list1) {
  return request({
    url: '/pps/api/v1/role/selectRolePermssionTree?roleId=' + list1,
    method: 'get'
  })
}
// 05删除按钮
export function rightDele(list,statu) {
  return request({
    url: '/pps/api/v1/permission?ids=' + list+'&status='+statu,
    method: 'delete'
  })
}
// 08 编辑提交按钮
export function editCmit(list) {
  return request({
    url: '/pps/api/v1/permission',
    method: 'put',
    data: list
  })
}

//08恢复按钮 中  
export function recover(uuid) {
	return request({
		url: '/pps/api/v1/permission/recover?permissionId=' + uuid,
		method: 'put'
	})
}