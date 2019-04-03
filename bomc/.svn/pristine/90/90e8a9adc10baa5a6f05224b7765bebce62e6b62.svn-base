import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './theme/index.css'

import multiCascader from 'multi-cascader-base-ele'

import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import './styles/common.scss'
import './styles/oms.scss'
import '@/styles/iconfont.css';

import App from './App'
import store from '@/store'
import router from './router'
import i18n from '@/lang'
import axios from 'axios'

import '@/icons' // icon
import './permission'


import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

import moment from 'moment';

if (module.hot) {
  module.hot.accept();
}

Vue.use(VCalendar)
Vue.use(multiCascader)


Vue.prototype.axios = axios
Vue.prototype.removeTag = function() {

  const currentRouteName = this.$route.name;
  const visitedViews = this.$store.state.tagsView.visitedViews;
  
  for (let i = 0, l = visitedViews.length; i < l; i++) {
    if (visitedViews[i].name === currentRouteName) {
      visitedViews.splice(i, 1);
      break;
    }
  }
}

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

const filters = {
  time: function(value) {
    const date = moment(value);
    
    if(!value || !date.isValid()) {
      return '--'
    }
    return date.format('YYYY-MM-DD HH:mm:ss')
  },
  size: function(val) { // format size to kb
    if (!val) {
      return '--'
    }
    return Math.ceil(val / 1024) + 'KB';
  },
  minutesToHour(val) { // format minutes to hours
    if (!val) {
      return '--'
    }
    return val
  },
  attachmentList(val) {
    return val.length === 1 ? val[0].name : val[0].name + "...";
  },
  leavelState (val){
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
      default:
        break;
    }
  },
  alertLeavel (val){
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
  },
  strToDataFromat (value){
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
  },
  filterAction(val) {
    if (!val) {
      return "--";
    }
    return val == 0 ? "未解决" : "已解决";
  },
  fullMsg(val) {
    if (!val) {
      return "--";
    }
    return val;
  },
  formatStepName(val) {
    if (!val) {
      return "--"
    }
    if (val.indexOf("-") > -1) {
      return val.split("-")[0];
    }
    return val;
  },
  isOver(val) {
    return val == "0" ? "是" : "否";
  },
  isCrossDay(val) {
    return val == 1 ? "是" : "否"
  }
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})