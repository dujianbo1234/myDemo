import request from '@/utils/request'

let queryData = function(queryParams){
	return request({
		method: 'GET',
		url: '',
		params: queryParams
	})
}

let queryName = function(){
	
}

export { queryData,queryName }
