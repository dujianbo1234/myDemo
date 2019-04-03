import request from '../index';
import { api } from '../api';

export const queryDraft = (params) => request({
  method: 'GET',
  url: `${api}/drafts`,
  params
})

export const createDraft = (data) => request({
  method: 'POST',
  url: `${api}/drafts`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data
})

export const updateDraft = (id, data) => request({
  method: 'PUT',
  url: `${api}/drafts/${id}`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data
})

export const deleteDraft = (id) => request({
  method: 'DELETE',
  url: `${api}/drafts/${id}`,
})
