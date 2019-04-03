import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
// import '../../../node_modules/jquery/dist/jquery'

import App from './App'
import router from './router'
import store from '@/store'
import i18n from '@/lang'

import '@/icons' // icon
import './permission' // permission control
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

//元素的补零计算
function addZero(val){
  if(val < 10){
   return "0" +val;
  }else{
   return val;
  }
};
//定义全局时间格式过滤器
Vue.filter("formatTime",function(value,type){
  var dataTime="";
  var data = new Date();  
  data.setTime(value); 
  var year = data.getFullYear();  
  var month  =  addZero(data.getMonth() + 1);  
  var day    =  addZero(data.getDate()); 
  var hour   =  addZero(data.getHours());
  var minute =  addZero(data.getMinutes());
  var second =  addZero(data.getSeconds());
  if(type == "YMD"){
    dataTime =  year + "-"+ month + "-" + day;
  }else if(type == "YMDHMS"){
    dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
  }else if(type == "HMS"){
    dataTime = hour+":" + minute+":" + second;
  }else if(type == "YM"){
    dataTime = year + "-" + month;
  }
  return dataTime;//将格式化后的字符串输出到前端显示
});
// remove tag   关闭路由
// Vue.prototype.removeTag = function() {

//   const currentRouteName = this.$route.name;
//   const visitedViews = this.$store.state.tagsView.visitedViews;

//   for(let i = 0, l = visitedViews.length; i < l; i++) {
//     if(visitedViews[i].name === currentRouteName) {
//       debugger
//        visitedViews.splice(i, 1);
//        break;
//     }
//   }
// }
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
