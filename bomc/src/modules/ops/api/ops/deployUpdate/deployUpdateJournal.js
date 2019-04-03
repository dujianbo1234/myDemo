import request from '../../index.js'

//任务日志查询
const queryData = function(params) {
    return request({
        method: 'GET',
        url: '/ops/api/v1/userlog',
        params
    })
}
export {
    queryData
}