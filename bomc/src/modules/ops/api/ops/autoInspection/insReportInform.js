import request from '../../index.js'

// --------------------------巡检任务-----------------------------
//表格查询
const queryData = function(params) {
    return request({
        method: 'GET',
        url: '/ops/api/v1/inspection/report',
        params
    })
}
// --------------------------巡检任务-----------------------------

export {
    queryData
}