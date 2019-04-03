// import request from './request'
import request from '@/utils/request'

//查询所有
const pushTaskSearchAll = (params)=> {
  return request({
    url: '/bomc/mms/pushTask',
    params
  })
}

// 推送策略请求---end-----------
// 推送查询请求---start-----------
const pushLogSearchAll = (params)=> {
  return request({
    url: '/bomc/mms/pushLog',
    params
  })
}

const personAllData = () => {
  return request({
    url: '/bomc/mms/findUserInfo'
  })
}
//推送任务启停
const taskStartData = (data) => {
  return request({
    method:'put',
    url: '/bomc/mms/pushTask/updateStatus',
    data
  })
}
// 推送查询请求---end-----------

export {
  pushTaskSearchAll,
  pushLogSearchAll,
  personAllData,
  taskStartData
}

