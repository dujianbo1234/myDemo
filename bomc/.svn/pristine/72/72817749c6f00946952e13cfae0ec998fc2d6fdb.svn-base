import request from '@/utils/request'
const URL = '/app/contacts';

export default {
	queryContacts(pageNum,pageSize,conName,conSystem) {
		let u = '';
		if(conName.length>0){
			u += '&conName=' + conName;
		}
		if(conSystem.length){
			u += '&conSystem=' + conSystem;
		}
		return request({
			method: 'get',
			url: URL + '?pageNum='+pageNum+'&pageSize='+pageSize + u,
		});
	},
	addContacts(params) {
		return request({
			method: 'post',
			url: URL,
			data: params
		});
	},
	deleteContacts(params) {
		return request({
			url: URL+'?conId='+params,
			method: 'delete'
		});
	},
	editContacts(params){
		return request({
			url:URL,
			method:'put',
			data:params
		});
	}
}