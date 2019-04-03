/**
 * 问题处理流程API
 * **/
import request from '../index'

const saveInfo = function(params) { // 保存
  return request({
    method: 'POST',
    url: '/oms/api/v1/processInstances/formQuestion',
    params
  })
}

export {
  saveInfo
}