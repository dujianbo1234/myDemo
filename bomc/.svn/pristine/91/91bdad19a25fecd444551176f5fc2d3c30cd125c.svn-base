const typeChange = function (val) {
  switch (val) {
    case 0:
      return '过滤';
      break;
    case 1:
      return '合并';
      break;
    case 2:
      return '关联';
      break;
    case 3:
      return '升降级';
      break;
    case 4:
      return '恢复';
      break;
    default:
      break;
  }

}

const stateCH = (val)=>{
  return val==false?'不启用':'启用'
}

//告警状态
const leavelState = (val)=>{
  switch (val) {
    case 0:
      return '待处理';
      break;
    case 1:
      return '处理中';
      break;
    case 2:
      return '已处理';
      break;
    case 3:
      return '已过滤';
      break;
    case 4:
      return '已恢复';
      break;
    default:
      break;
  }
}
//告警类型
const alertType = (val)=>{
  return  val=='0' ? '告警': '预警'
}
//告警级别
const alertLeavel = (val)=>{
  switch (val) {
    case 0:
      return '一般告警';
      break;
    case 1:
      return '主要告警';
      break;
    case 2:
      return '严重告警';
      break;
    default:
      break;
  }
}

//字符串转换成标准格式 201811250121
const strToDataFromat = (value)=>{
  if(!value){return ''}
  let arr = []
  arr=value.split('')
  arr.splice(4,0,"-");
  arr.splice(7,0,"-");
  arr.splice(10,0," ");
  arr.splice(13,0,":");
  arr.splice(16,0,":");
  let a='';
  arr.forEach(val=>{
    a=a+val
  })
  return a
}

//责任人是否是组要还是次要
const personStatus = (val)=>{
  if(!val) return '';
  return val=='0'?'主要':'次要'
}

//推送日志推送结果
const logResult = (val)=>{
  return val=='0'?'失败':'成功'
}

const sendState = (val)=>{
  switch (val) {
    case 0:
      return '待推送';
      break;
    case 1:
      return '已推送';
      break;
    case 2:
      return '推送中';
      break;
    case 3:
      return '已失效';
      break;
    case 4:
      return '暂停';
      break;
    case 5:
      return '开始';
      break;
    default:
      break;
  }
}
//事件影响程度
const eventLeavel = (val)=>{
  switch (val) {
    case 3:
      return '重大';
      break;
    case 2:
      return '严重';
      break;
    case 1:
      return '一般';
      break;
    case 0:
      return '无';
      break;
    default:
      break;
  }
}
const eventLeavelJI = (val)=>{
  switch (val) {
    case 3:
      return '低';
      break;
    case 2:
      return '中';
      break;
    case 1:
      return '高';
      break;
    case 0:
      return '紧急';
      break;
    default:
      break;
  }
}
//告警推送状态
const sendStateFilter = (val)=>{
  switch (val) {
    case 2:
      return '已推送';
      break;
    case 1:
      return '待推送';
      break;
    case 0:
      return '未生成工单';
      break;
    default:
      break;
  }
}
//事件性质
const eventNatureF = (val)=>{
  switch (val) {
    case 1:
      return '平台告警';
      break;
    case 0:
      return '系统故障';
      break;
    default:
      break;
  }
}


export default {
  eventLeavelJI,
  eventNatureF,
  sendState,
  typeChange,
  stateCH,
  leavelState,
  alertType,
  alertLeavel,
  strToDataFromat,
  personStatus,
  logResult,
  eventLeavel,
  sendStateFilter
}
