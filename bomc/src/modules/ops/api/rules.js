import * as insTaskManage from '@/modules/ops/api/ops/autoInspection/insTaskManage.js'


// ----------------------------------查询-的名称验证-----------------------------------------
const validateQueryName = (rule, value, callback) => {
  let specialKey = "[%`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"; 
  var bol = true;
  var myObj=value.replace(/\s+/g,"");
  if(myObj!=value){
  	bol = false;
  	callback(new Error('请不要输入空白字符'));
  }
  for (let i = 0; i < value.length; i++) {
    if (specialKey.indexOf(value.substr(i, 1)) != -1) {
       bol = false;
       callback(new Error('请不要输入特殊字符'))
    }
  }
  if(bol){
    callback()
  }
};
// ----------------------------------查询-的名称验证-----------------------------------------


// 驗證特殊字符、名字不重复 （巡检任务）
const validateCodeName = (rule, value, callback) => {
  const params = {
    name:value
  }
  insTaskManage.addTaskRepeatName(params).then(res => {
    if(res.code == 500) {
      callback(new Error(res.msg));
    }else {
      let specialKey = "[%`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"; 
      var bol = true;
      var myObj=value.replace(/\s+/g,"");
      if(myObj!=value){
        bol = false;
        callback(new Error('请不要输入空格'));
      }
      for (let i = 0; i < value.length; i++) {
        if (specialKey.indexOf(value.substr(i, 1)) != -1) {
        bol = false;
        callback(new Error('请不要输入特殊字符'))
        }
      }
      
      if(bol){
        callback()
      }
    }
    
  })
  
}



// 驗證特殊字符
const validateCode = (rule, value, callback) => {
  let specialKey = "[%`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"; 
  var bol = true;
  var myObj=value.replace(/\s+/g,"");
  if(myObj!=value){
  	bol = false;
  	callback(new Error('请不要输入空格'));
  }
  for (let i = 0; i < value.length; i++) {
    if (specialKey.indexOf(value.substr(i, 1)) != -1) {
       bol = false;
       callback(new Error('请不要输入特殊字符'))
    }
  }
  if(value == '') {
				callback(new Error('请输入名称'))
			}
  if(bol){
    callback()
  }
};

const admvalidateCode = (rule, value, callback) => {
  let specialKey = "[%`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"; 
  var bol = true;
  var myObj=value.replace(/\s+/g,"");
  if(myObj!=value){
  	bol = false;
  	callback(new Error('请不要输入空格'));
  }
  for (let i = 0; i < value.length; i++) {
    if (specialKey.indexOf(value.substr(i, 1)) != -1) {
       bol = false;
       callback(new Error('请不要输入特殊字符'))
    }
  }
  if(bol){
    callback()
  }
};
export {
  // 驗證特殊字符
  validateCode,admvalidateCode,
  // 驗證特殊字符、名字不重复 （巡检任务）
  validateCodeName,
  // 查询的名称验证
  validateQueryName
}