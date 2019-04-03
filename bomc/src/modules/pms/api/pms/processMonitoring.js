import request from '../index';
import { api } from '../api';


// query process defines
export function queryProcessDefine(params) {
  return request({
    method: 'GET',
    url: `${api}/processDefinitions`,
    params
  })
}

// query deploy
export function queryDeploy(params) {
  return request({
    method: 'GET',
    url: `${api}/deployments`,
    params
  })
}

// delete deploy
export function deleteDeploy(deploymentId, params) {
  return request({
    method: 'DELETE',
    url: `${api}/deployments/${deploymentId}`,
    params
  })
}

// query process intances
export function queryProcessIntance(params) {
  return request({
    method: 'GET',
    url: `${api}/history/historicProcessInstances`,
    params
  })
}

// query historic task instance
export function queryHistoricTaskInstance(params) {
  return request({
    method: 'GET',
    url: `${api}/history/historicTaskInstances`,
    params
  })
}

// query jobs
export function queryJobs(params) {
  return request({
    method: 'GET',
    url: `${api}/management/jobs`,
    params
  })
}

// query jobs with jobsId
export function queryJobsWithId(jobId) {
  return request({
    method: 'GET',
    url: `${api}/management/jobs/${jobId}`,
  })
}

// delete job
export function deleteJob(jobId) {
  return request({
    method: 'DELETE',
    url: `${api}/management/jobs/${jobId}`,
  })
}

// action job
export function actionJob(jobId) {
  return request({
    method: 'POST',
    url: `${api}/management/jobs/${jobId}`,
  })
}

// query decision tables
export function queryDecisionTables(params) {
  return request({
    method: 'GET',
    url: `${api}/dmnDecisionTables`,
    params
  })
}

// query historic variable instances
export function queryHistoricVariableInstances(params) {
  return request({
    method: 'GET',
    url: `${api}/history/historicVariableInstances`,
    params
  })
}

// query subprocess with process instance id params
export function querySubprocess(path, params) {
  return request({
    method: 'GET',
    url: `${api}/history/historicProcessInstances/${path}/subprocesses`,
    params
  })
}

// delete historic task instance
export function deleteHistoricTaskInstance(taskId) {
  return request({
    method: 'DELETE',
    url: `${api}/history/historicTaskInstances/${taskId}`
  })
}

// query identity links
export function queryIdentityLinks(taskId, params) {
  return request({
    method: 'GET',
    url: `${api}/history/historicTaskInstances/${taskId}/identityLinks`,
    params
  })
}

// query subTask
export function querySubTask(taskId, params) {
  return request({
    method: 'GET',
    url: `${api}/history/historicTaskInstances/${taskId}/subTasks`,
    params
  })
}

// stop process instance
export function stopProcessInstance(processInstanceId, params) {
  return request({
    method: 'DELETE',
    url: `${api}/runtime/processInstances/${processInstanceId}`,
    params
  })
}