import request from '../index';
import { api } from '../api';

// query bpmn data
export const queryBpmnResData = (processDefinitionId) => request({
  method: 'GET',
  url: `${api}/processDefinitions/${processDefinitionId}/resourceData`
})

// create new process define
export const createProcessDefine = (data) => request({
  method: 'POST',
  url: `${api}/deploymentsProcessDefinitionByString`,
  data
});

// test process define
export const testProcessDefinitionId = (id) => request({
  method: 'GET',
  url: `${api}/processDefinitions/${id}/imageTestResults`,
});

// test bpmn file
export const testBpmnFile = (data) => request({
  method: 'POST',
  url: `${api}/processDefinitionsImageTestResults`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data
});
