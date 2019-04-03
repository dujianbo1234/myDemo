import request from '../../index'

export const queryAgentSettingData = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/agentProcesses',
  params
});

export const addAgentSetting = (data) => request({
  method: 'POST',
  url: '/oms/api/v1/agentProcesses',
  data: data,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

export const updateAgentSetting = (id, data) => request({
  method: 'PUT',
  url: `/oms/api/v1/agentProcesses/${id}`,
  data: data,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

export const deleteAgentSettingData = (params) => request({
  method: 'DELETE',
  url: `/oms/api/v1/agentProcesses`,
  params
});
