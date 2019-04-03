import request from './request';
const URL = '/collector/api/v1/agent';

export default {
	queryAgent(start,limit,name){
		let str = '';
		console.log(name);
		if( name != undefined ) {
			str += '&agentRunningStatus='+name;
		} 
		return request({
			url: '/collector/api/v1/agent'+'?search=true&start='+start+'&limit='+limit+str+'&sortfield=deploy_obj_id'+'&sortorder=ASC',
			method: 'get'
		});
	},
	optAgent(ids,type){
		return request({
			url:URL + '/'+type,
			method: 'post',
			data:ids
		});
	}
};