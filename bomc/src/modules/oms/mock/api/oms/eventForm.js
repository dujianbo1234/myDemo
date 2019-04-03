import request from '../index'
import axios from 'axios'
import baseURL from '../baseurl.js'
import {
  getToken
} from '@/utils/auth'

const queryParams = function (params) { // 查询各下拉框的options
  return request({
    method: 'GET',
    url: '/oms/api/v1/codes',
    params
  })
}

const queryEventInGroup = function (params) { // 查询事件涉及组
  return request({
    method: 'GET',
    url: '/oms/api/v1/orgs/orgTree',
    params
  })
}

const queryEventManager = function (params) { // 查询事件经理
  return request({
    method: 'GET',
    url: '/oms/api/v1/orgs/interface',
    params
  })
}

const createProcessInstance = function (data) { // 提交按钮
  return request({
    method: 'POST',
    url: '/oms/api/v1/processInstances',
    data
  })
}

const submitForm = function (data) { // 工单提交给流程平台
  return request({
    method: 'POST',
    url: '/oms/api/v1/tasks/ru',
    data
  })
}

// update form data
const updateFormData = function (processInstancesId, data) {
  return request({
    method: 'POST',
    url: `/oms/api/v1/processInstances/variable/${processInstancesId}`,
    data
  })
}

const queryData = function (params) { // 第二节点查询数据
  return request({
    method: 'GET',
    url: '/oms/api/v1/processInstances/variable',
    params
  })
}

const queryComments = function (params) { // 查询处理意见
  return request({
    method: 'GET',
    url: '/oms/api/v1/tasks/comments',
    params
  })
}

const addComments = function (data) { // 查询处理意见
  return request({
    method: 'POST',
    url: '/oms/api/v1/tasks/comments',
    data
  })
}

const modifyProcess = function (procInstId, params) {
  return request({
    method: 'PUT',
    url: `/oms/api/v1/processInstances/${procInstId}`,
    params
  })
}

// upload attachments
const uploadAttachment = (data) => {
  // return request({
  //   method: 'POST',
  //   url: '/oms/api/v1/tasks/attachments',
  //   data: data
  // })
  return axios({
    baseURL: baseURL,
    headers: {
      'X-Token': getToken()
    },
    timeout: 0,
    method: 'POST',
    url: '/oms/api/v1/tasks/attachments',
    data: data
  })
}

// query attachments with task id
const queryAttachmentsWithTaskId = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/tasks/attachments',
  params
})


// query attachments
const queryAttachments = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/processInstances/attachments',
  params
})

// delete attachment
const deleteAttachment = (id, userId) => request({
  method: 'DELETE',
  url: `/oms/api/v1/tasks/attachments/${id}/${userId}`
})

// get flow chart
const getFlowChart = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/processInstances/flowchart',
  params
})

const nextNodeDealMan = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/users/getByOrgId',
  params
})

const regressesQuery = (procInstId) => request({ //点击回退先查询
  method: 'GET',
  url: `/oms/api/v1/tasks/hi/${procInstId}`,
})

const nodeBack = (data) => request({ //节点回退
  method: 'POST',
  url: '/oms/api/v1/task/jump',
  data
})

const querySystemType = () => request({ //查询“所属系统类型信息”
  method: 'GET',
  url: '/oms/api/v1/resource/ResModel/system',
  params: {
    level: 3
  }
})

const queryEventType = () => request({ //查询“所属事件分类信息”
  method: 'GET',
  url: '/oms/api/v1/resource/ResModel/type',
  params: {
    level: 3
  }
})

const queryNextNodeDealMan = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/users/getByOrgId',
  params
})

// query process step data
const queryProcessStep = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/processInstances/steps',
  params
});

const queryProcessComment = (procInstId) => request({
  method: 'GET',
  url: `/oms/api/v1/processInstances/comment/steps/${procInstId}`,
});

// query user
const queryUser = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/users/getByUserIds',
  params
});

// query warn list
const queryWarnList = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/processInstances/warnAuto',
  params
});

// query traceability matrix
const queryTraceabilityMatrix = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/processInstances/tree',
  params
});

// 查询配置关联项
const queryConfigurationAssociation = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/CIAssociation',
  params
});

// 查询配置项类型
const queryResModelType = () => request({
  method: 'GET',
  url: '/oms/api/v1/resource/ResModel/type?level=4',
});

// 查询资源类型模型
const queryResModal = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/resource/ResModel',
  params
});

// 查询CI选项
const queryResCI = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/resource/CI',
  params
});

// 关联 CI 选项
const updateCI = (data) => request({
  method: 'POST',
  url: '/oms/api/v1/CIAssociation',
  data: data,
  headers: {
    'Content-Type': 'application/json'
  },
});

// 删除关联表单
const deleteCI = (id) => request({
  method: 'DELETE',
  url: `/oms/api/v1/CIAssociation/${id}`,
});

// 筛选查询关联表单
const queryWithFilterAssociationData = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/CIAssociation/getByFilter',
  params
});

const serarchNextNodeDealMan = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/users/tree',
  params
});

const querySolver = (params) => request({
  method: "GET",
  url: "/oms/api/v1/users/closeNodePersonnel",
  params
})


const queryWorkingHours = (params) => request({
  method: "GET",
  url: "/oms/api/v1/workingHours",
  params
})


const workTimeSubmit = (data) => request({
  method: "POST",
  url: "/oms/api/v1/workingHour",
  data
})

const queryDutyContent = (params) => request({
  method: "GET",
  url: "/oms/api/v1/dutyContent",
  params
})

const queryDutyContentManagements = (params) => request({
  method: "GET",
  url: "/oms/api/v1/duty/dutyContentProcManagements",
  params
})

const saveDutyContent = (data) => request({
  method: "POST",
  url: "/oms/api/v1/duty/dutyContentProcManagements",
  data
})

const seeHistory = (params) => request({
  method: "GET",
  url: "/oms/api/v1/quartz",
  params
})

const modifyQuartz = (data) => request({
  method: "PUT",
  url: "/oms/api/v1/quartz",
  data
})



export {
  queryParams,
  queryEventInGroup,
  queryEventManager,
  createProcessInstance,
  updateFormData,
  queryData,
  queryComments,
  addComments,
  submitForm,
  modifyProcess,
  uploadAttachment,
  queryAttachments,
  deleteAttachment,
  getFlowChart,
  request,
  nextNodeDealMan,
  regressesQuery,
  nodeBack,
  querySystemType,
  queryEventType,
  queryNextNodeDealMan,
  queryProcessStep,
  queryAttachmentsWithTaskId,
  queryProcessComment,
  queryUser,
  queryWarnList,
  queryTraceabilityMatrix,
  queryConfigurationAssociation,
  queryResModelType,
  queryResModal,
  queryResCI,
  updateCI,
  queryWithFilterAssociationData,
  deleteCI,
  serarchNextNodeDealMan,
  querySolver,
  queryWorkingHours,
  workTimeSubmit,
  queryDutyContent,
  queryDutyContentManagements,
  saveDutyContent,
  seeHistory,
  modifyQuartz
}
