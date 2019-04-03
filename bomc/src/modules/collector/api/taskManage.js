import request from './request';

export default {
	//查询模板数据（）
	queryTmp(start,limit,obj) {
		let str = '&';
		if(JSON.stringify(obj) !== '{}'){
			str+='search=true&'
			for (let key in obj) {
			 	str+=key+'='+obj[key]+'&';
			}
		}
		str = str.slice(0,str.length-1);
	  return request({
	    url: '/collector/api/v1/template'+'?start='+start+'&limit='+limit+str,
	    method: 'get'
	  })
	},
	//查询采集任务
	queryTask(start,limit,name){
		let str = '';
		if(name !==undefined){
			str = '&search=true&task_name='+name;
		}
		return request({
			 url: '/collector/api/v1/task'+'?start='+start+'&limit='+limit+str+'&sortfield=create_time'+'&sortorder=DESC',
    	 method: 'get'
		});
	},
	//删除采集任务
	deleteTask(value){
		let url='';
		if(typeof value === 'string'){
			url = '/collector/api/v1/task/'+value;
		}else {
			url= '/collector/api/v1/task?task_ids='+value;
		}
		return request({
			url: url,
    	method: 'delete'
		});
	},
	//新增、更新采集任务
	aeTask(params,type){
		console.log(params,type)
		let url = '';
		let method = '';
		if(type === 'add'){
			url = '/collector/api/v1/task';
			method = 'post';
		}else {
			url = '/collector/api/v1/task/'+params.task_id;
    	method = 'put';
		}
		return request({
			url: url,
    	method: method,
    	data:params
		});
	},
	//采集任务启停操作
	optTask(params,opt){
		return request({
			url: '/collector/api/v1/task/'+opt,
    	method: 'post',
    	data:params
		});
	},
	//查询采集对象
	queryCollector(value,ciid){
		var url = "";
		if(ciid)
		{
                                url = "/rms/api/v1/CI/?model=ResObject&keys=ciid&value="+ciid;
		}else{
		        url = "/rms/api/v1/CI/?model="+value;
		}
		 return request({
		 	url: url,
		 	method: "get"
		 });
	}
}