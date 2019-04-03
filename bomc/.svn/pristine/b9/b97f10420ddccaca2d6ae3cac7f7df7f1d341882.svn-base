import request from '@/utils/request'
import Cookies from 'js-cookie'

const verInfo = '/page/api/v1'
export default {
  AlertMonitorData(url) { // 预警概览
    return request({
      url: verInfo + url+'?curTime=20190318160617',
      method: 'get'
    })
  },
  AlertLevel(url) { // 饼图
    return request({
      url: verInfo + url+'?statDate=20190319141359',
      method: 'get'
    })
  },
  AreaAlertStatus(url) { // Y轴柱状图
    return request({
      url: verInfo + url+'?statDate=20190319143218',
      method: 'get'
    })
  },
  AlertDistribute(url) { // 圆柱状图
    return request({
      url: verInfo + url+'?statDate=20190319144029'+'&app="UPAY-MobileMall"',
      method: 'get'
    })
  },
  AlertDirection(url) { // 圆柱状图
    return request({
      url: verInfo + url,
      method: 'get'
    })
  },
}
