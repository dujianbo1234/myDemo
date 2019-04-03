import request from '@/utils/request'

// 01查询按钮
export function roleSch(formSch) {
  return request({
    url: '/pps/api/v1/menu/list',
    method: 'post',
    data: formSch
  })
}
//获得权限域列表
export function groupLst() {
  return request({
    url: '/pps/api/v1/group/list',
    method: 'get'
  })
}
//获取id发给后端,得到treeTable 的children,填充进去
///menu/list
//post


export function getRusLst(ckId) {
	return request({
		url: '/pps/api/v1/menu/selectMenuByUserId?userId=' + ckId,
		method: 'get'
	})
}



// 05删除按钮
export function rightDele(list,statu) {
  return request({
    url: '/pps/api/v1/menu?ids=' + list+'&status='+statu,
    method: 'delete'
  })
}
//04新增按钮 中  输入用户名称 去后台校验是否唯一
export function checkUname(uName) {
	return request({
		url: '/pps/api/v1/menu/checkMenuNameUnique?menuName=' + uName,
		method: 'get'
	})
}
//02新增按钮中的获取下拉信息
export function needDept() {
	return request({
		url: '/pps/api/v1/group/list',
		method: 'get',
		data: {}
	})
}
// 06新增按钮中的提交按钮
export function adCmit(formAdd) {
  return request({
    url: '/pps/api/v1/menu',
    method: 'post',
    data: formAdd
  })
}

// 08 编辑提交按钮
export function editCmit(list) {
  return request({
    url: '/pps/api/v1/menu',
    method: 'put',
    data: list
  })
}

//08恢复按钮 中  
export function recover(uuid) {
	return request({
		url: '/pps/api/v1/menu/recover?menuId=' + uuid,
		method: 'put'
	})
}