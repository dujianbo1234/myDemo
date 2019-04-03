 import Vue from 'vue'
 let dateFilter = (time, formatType = 'yyyy-MM-dd hh:mm:ss') => {
   if (time) {
     var t = new Date(time);
     var tf = function(i) {
       return (i < 10 ? '0' : '') + i;
     };
     return formatType.replace(/yyyy|MM|dd|hh|mm|ss/g, function(a) {
       switch (a) {
         case 'yyyy':
         return tf(t.getFullYear());
         case 'MM':
         return tf(t.getMonth() + 1);
         case 'mm':
         return tf(t.getMinutes());
         case 'dd':
         return tf(t.getDate());
         case 'hh':
         return tf(t.getHours());
         case 'ss':
         return tf(t.getSeconds());
       }
     });
   }
 };
 let moduleTypeFilter = value => {
   switch (value) {
     case 0:
     value = "平台资源模板";
     break;
     case 1:
     value = "网络设备模板";
     break;
     case 2:
     value = "中间件模板";
     break;
     case 3:
     value = "日志模板";
     break;
     case 4:
     value = "数据库模板";
     break;
     case 5:
     value = "自定义模板";
     break;
   }

   return value;
 }
 let statusFilter = b => {
   if (b == true) {
     b = "正常"
   } else if (b == false) {
     b = "异常"
   } else {
     b = "待定"
   }
   return b
 }
 let filStatus = value => {
   return ['离线', '在线'][value];
 }
 let filAb = value => {
   return ['Zabbix', 'Flume'][value];
 }
 let filAbstatus = value => {
   if (value) {
     value = "运行中";
   } else {
     value = "停止中"
   }
   return value;
 }
 let filPosition = value => {
   return ['推送到默认位置', '推送到默认位置和指定位置', '仅推送到指定位置'][value];
 }
 export {
   dateFilter,
   moduleTypeFilter,
   statusFilter,
   filStatus,
   filAb,
   filAbstatus,
   filPosition
 }