import request from '../../index'

export const queryTaskPlanData = (params) => request({
  method: 'GET',
  url: `/oms/api/v1/jobPlan`,
  params
})

export const deleteSingleTaskPlan = (params, id) => request({
  method: 'DELETE',
  url: `/oms/api/v1/jobPlan/${id}`,
  params
})

export const deleteMoreTaskPlan = (params) => request({
  method: 'DELETE',
  url: `/oms/api/v1/jobPlans`,
  params
})


