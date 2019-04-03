import request from '../index'

const queryType = (params) => { // 查询工单类型
  return request({
    method: 'GET',
    url: '/oms/api/v1/processDefinitions/types',
    params
  }).then(res => {
    function unique(arr, key) {
      let hash = {}
      let arr2 = arr.reduce((item, next) => {
        hash[next[key]] ? "" : hash[next[key]] = true && item.push(next);
        return item
      }, [])
      return arr2
    }
    let virturalArr = []
    virturalArr = unique(res.result, "name")
    return virturalArr
  })
}

export {
  queryType
}
