import request from '../../index'

// 新建日历
export const createCalendar = (data) => request({
  method: 'POST',
  url: '/oms/api/v1/workDays',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  data
});

// 获取日历列表
export const queryCalendarList = () => request({
  method: 'GET',
  url: '/oms/api/v1/workDays/workingCalendarList',
});

// 获取日历详细信息
export const queryCalendarInfo = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/workDays/workingCalendarAndTimePeriod',
  params
});

// 查询日期状态
export const queryCalendar = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/workDays',
  params
});

// 查询日历有效日期
export const queryAvailableDays = (params) => request({
  method: 'GET',
  url: '/oms/api/v1/workDays/dataList',
  params
});

// 修改日历
export const updateCalendar = (params) => request({
  method: 'PUT',
  url: '/oms/api/v1/workDays',
  params
});

// 删除日历
export const deleteCalendar = (id) => request({
  method: 'DELETE',
  url: `/oms/api/v1/workDays/${id}`,
});

