import request from '../../index'

// 根据组件机构 ID 查询对应的值班人员
export const queryDutyOfficer = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/dutyOfficer',
  params
})

// 根据组织机构 ID 查询用户
export const queryUserByOrgId = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/users/getByOrgId',
  params
})

// 根据状态
export const queryDutyOfficerByType = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/dutyOfficer/type',
  params
})

// 单个修改值班人员状态
export const updateDutyStatus = (id, data) => request({
  method: 'PUT',
  url: `/oms/api/v1/dutyOfficer/${id}`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data
})

// 批量修改值班人员状态
export const batchUpdateDutyStatus = (id, data) => request({
  method: 'PUT',
  url: `/oms/api/v1/dutyOfficer?ids=${id}`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data
})

// 单个删除值班人员
export const signleDutyDelete = (id) => request({
  method: 'DELETE',
  url: `/oms/api/v1/dutyOfficer/${id}`
})

// 批量删除值班人员
export const batchDutyDelete = (id) => request({
  method: 'DELETE',
  url: `/oms/api/v1/dutyOfficers?ids=${id}`
})

// 新增值班人员
export const createDuty = (data) => request({
  method: 'POST',
  url: '/oms/api/v1/dutyOfficer',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data
})


// 获取班次集合列表
export const queryDutyArr = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/dutyShiftCollection',
  params
})

// 单个修改班次状态
export const updateDutyShift = (id, data) => request({
  method: 'PUT',
  url: `/oms/api/v1/dutyShiftCollection/${id}`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data
})

// 批量修改班次状态
export const batchUpdateDutyShiftStatus = (id, data) => request({
  method: 'PUT',
  url: `/oms/api/v1/dutyShifts?ids=${id}`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data
})

// 单个删除班次
export const signleDeleteShift = (id) => request({
  method: 'DELETE',
  url: `/oms/api/v1/dutyShiftCollection/${id}`
})

// 批量删除班次
export const batchDeleteShift = (id) => request({
  method: 'DELETE',
  url: `/oms/api/v1/dutyShifts?ids=${id}`
})

// 新增班次集合
export const createShift = (data) => request({
  method: 'POST',
  url: '/oms/api/v1/dutyShiftCollection',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data
})




// 值班内容
// 查询值班内容
export const queryDutyContent = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/dutyContent',
  params
});

// 新增值班内容
export const createDutyContent = (data) => request({
  method: 'POST',
  url: '/oms/api/v1/dutyContent',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data
});

// 修改值班内容
export const updateDutyContent = (name, data) => request({
  method: 'PUT',
  url: `/oms/api/v1/dutyContent/${name}`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data
});

// 单个删除值班内容
export const signleDeleteDutyContent = (id) => request({
  method: 'DELETE',
  url: `/oms/api/v1/dutyContent/${id}`,
});

// 批量删除值班内容
export const bactchDeleteDutyContent = (id) => request({
  method: 'DELETE',
  url: `/oms/api/v1/dutyContents?ids=${id}`,
});



// 值班计划管理
// 查询值班计划
export const queryDutyPlan = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/duty/schedules',
  params
})

// 值班计划，新增值班人员
export const addDutyOfficersPlan = (data) => request({
  method: 'POST',
  url: '/oms/api/v1/duty/schedule',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data
})

// 根据条件查询单个值班计划
export const querySignleDutyPlan = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/duty/schedule',
  params
})

// 删除原值班人员
export const deleteSignleDutyPlan = (id) => request({
  method: 'DELETE',
  url: `/oms/api/v1/duty/schedule/${id}`,
})

// 修改原值班人员--换人
export const moveShiftDutyPlan = (id, data) => request({
  method: 'PUT',
  url: `/oms/api/v1/duty/schedule/${id}`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data
})

// 修改原值班人员--对调
export const alignmentShiftDutyPlan = (params) => request({
  method: 'PUT',
  url: '/oms/api/v1/duty/schedules',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  params
})

// 获取有效的可以对调的日期
export const validShiftDutyPlan = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/duty/schedules/dutyDate',
  params
})

// 导入Excel 数据
export const importDutyData = (orgId, data) => request({
  method: 'POST',
  url: `/oms/api/v1/duty/importExcel?orgId=${orgId}`,
  data
})

// 导出Excel 数据
export const exportDutyData = (params) => request({
  method: 'GET',
  url: `/oms/api/v1/duty/exportByDate`,
  params
})

export const queryProcessPlan = (params) => request({
  method: 'GET',
  url: `/oms/api/v1/dutyProcPlanManagement`,
  params
})

export const queryTaskName = () => request({
  method: 'GET',
  url: `/oms/api/v1/dutyProcPlanManagement/taskName`
})

export const statusChange = (data, id) => request({
  method: 'PUT',
  url: `/oms/api/v1/dutyProcPlanManagement/${id}`,
  data
})

export const processPlanDelete = (id) => request({
  method: 'DELETE',
  url: `/oms/api/v1/dutyProcPlanManagement/${id}`
})

export const deleteMore = (params) => request({
  method: 'DELETE',
  url: `/oms/api/v1/dutyProcPlanManagements`,
  params
})

export const addCommit = (data) => request({
  method: 'POST',
  url: `/oms/api/v1/dutyProcPlanManagement`,
  data
})

export const modifyCommit = (data, id) => request({
  method: 'PUT',
  url: `/oms/api/v1/dutyProcPlanManagement/${id}`,
  data
})


