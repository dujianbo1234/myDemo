import request from '@/utils/request'

export  function indicator_dataManagequery(){
	return request({
		url: '/bomc/dms/dataManagequery',
		method: 'get'
	})
}

export function indicator_dataManageList(params){
	return request({
		url:'/bomc/dms/dataManageList',
		method:'get',
		params
	})
}