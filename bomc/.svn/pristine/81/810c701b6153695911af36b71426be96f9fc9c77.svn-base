import request from '../api/index.js'

// 所属系统信息
export const querySystemType = (params, cb, bindField) => request({ //查询“所属系统类型信息”
  method: 'GET',
  url: '/oms/api/v1/resource/ResModel/system',
  params: {
    level: 3
  }
}).then(res => {
  let deep = function(arr) {
    arr.forEach(item => {
      item.value = item.object.id;
      item.label = item.object.name;
      if (item.children) {
        deep(item.children);
      }
    });
  };
  deep(res);
  cb(res);
})

// 查询涉及组
export const queryEventInGroup = (params, cb, bindField) => request({
    method: 'GET',
    url: '/oms/api/v1/orgs/orgTree',
  }).then(res => {
    let deep = function(arr) {
      arr.forEach(item => {
        item.value = item.object.deptId;
        item.label = item.object.deptName;
        if (item.children) {
          deep(item.children);
        }
      });
    };
    deep(res);
    cb(res);
});

// 查询下拉 codes
const querySelectCodes = (params, cb,  bindField) => request({
    method: "GET",
    url: "/oms/api/v1/codes",
    params: {name: params.remoteFunction}
}).then(res => {
    const data = res.result[0].value.split(',').map(item => {
      const itemObject = {};
      itemObject.label = itemObject.value = item;
      return itemObject;
    });
    cb(data);
});

// 模拟代码
export const codes = [
  {label: "问题来源", value: "question_source"},
  {label: "问题优先级", value: "question_priority"},
  {label: "所属系统信息", value: "querySystemType"},
  {label: "问题设计组", value: "queryEventInGroup"}
];

const querySelectCodesList = {};

codes.forEach(item => {
  const value = item.value;
  if(value.includes('_')) {
    querySelectCodesList[value] = querySelectCodes;   
  }
});

export { querySelectCodesList }
