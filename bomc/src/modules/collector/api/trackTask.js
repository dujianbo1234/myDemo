import request from './request'

//查询请求
export default {
	query(start,limit,obj){
	       let str = '&';
		if(JSON.stringify(obj) !== '{}'){
			str+='search=true&'
			for (let key in obj) {
			 	str+=key+'='+obj[key]+'&';
			}
			}
			str = str.slice(0,str.length-1);
		  return request({
		    url: '/collector/api/v1/agentTask'+'?start='+start+'&limit='+limit+str,
		    method: 'get'
		  })
	},
	//查询任务单条详细
	query_task(id){
              return request({
	      url: '/collector/api/v1/task/'+id,
    	      method: 'get'
	   });
            },
            //查询模板单条数据
            query_tmp(id){
              return request({
	      url: '/collector/api/v1/template/'+id,
    	      method: 'get'
	   });
            },
            //查询代理单条数据
            query_agent(id){
              return request({
	      url: '/collector/api/v1/agent/'+id,
    	      method: 'get'
	   });
            },
            //查询采集对象数据
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