import request from '../index';
import { api } from '../api';

// query process defines with paging
export const getProcessDefinitionCategories = (params) => { 
  return request({
    method: 'GET',
    url: `${api}/latestVersionProcessDefinitions`,
    params
  })
};

// query process defines version with paging
export const getProcessDefinitionVersion = (params) => { 
  return request({
    method: 'GET',
    url: `${api}/processDefinitionCategories/findByKey`,
    params
  })
};

// create process define
export const createProcessDefinition = (params) => {
  return request({
    method: 'POST',
    url: `${api}/deployments`,
    data: params
  })
}

// change category
export const changeCategory = (processDefinitionId, params) => {
  return request({
    method: 'PUT',
    url: `${api}/processDefinitionCategories/${processDefinitionId}`,
    params
  })
};

// delete process define
export const deleteProcessDefine = (deploymentId, params) => {
  return request({
    method: 'DELETE',
    url: `${api}/deployments/${deploymentId}`,
    params
  })
};

// query process define by category
export const queryPorcessDefineByCategory = (params) => {
  return request({
    method: 'GET',
    url: `${api}/processDefinitionCategories/findByCategory`,
    params
  });
}

// get all process define categories
export const queryProcessDefinitionCategories = () => {
  return request({
    method: 'GET',
    url: `${api}/processDefinitionCategories`
  })
};

// process define redeploy
export const redeploy = (deploymentId) => {
  return request({
    method: 'POST',
    url: `${api}/deployments/redeploy/${deploymentId}`
  })
}

export const axiosInstance = request;