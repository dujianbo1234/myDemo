import request from './request'

//查询模板请求
export function query(start,limit,name,type) {
let str = '';
console.log(name);
   if(name)
   {
   	str +='&search=true&template_name='+name;
   }
  return request({
    url: '/collector/api/v1/template'+'?start='+start+'&limit='+limit+'&template_type='+type+str,
    method: 'get'
  })
}

//新增模板请求
export function add_module(parmas){
	return request({	
		url:"/collector/api/v1/template",
		method:'post',
		data:parmas
	})
}

//修改模板请求
export function update_module(parmas,id){
	return request({
		url:"/collector/api/v1/template/"+id,
		method:'put',
		data:parmas
	})
}
//删除数据模板请求
export function detele_module(value){
		let url='';
		if(typeof value === 'string'){
			url = '/collector/api/v1/template/'+value;
		}else {
			url= '/collector/api/v1/template?template_ids='+value;
		}
		return request({
			url: url,
    	method: 'delete'
		});
	}

//模板导出
export function export_module(ids){
	return request({
		url:"/collector/api/v1/template/export?template_ids="+ids,
		method:'get',
		headers:{
			       "Accept":"multipart/form-data"
			    }
	})
}
//查询资源类型
export function query_resource(){
	return request({
		url:"/rms/api/v1/ResModel/type",
		method:"get"
	})
}
//导入
/*export function import(file){
	return request({
		url:"/collector/api/v1/template/import",
		method:"post",
		data:file
	})
}*/