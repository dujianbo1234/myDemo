import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from '@/store'
import i18n from '@/lang'
import moment from 'moment';


import '@/icons' // icon
import './permission' // permission control
// import { debug } from 'util';

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})


Vue.filter('time', function(value) {

  const date = moment(value);
  
  if(!value || !date.isValid()) {
    return '--'
  }
  return date.format('YYYY-MM-DD HH:mm:ss')
})

Vue.filter('filterNull', function(value) {
  if(!value) {
    return '--'
  }
  return value
})

// remove tag
Vue.prototype.removeTag = function() {
    
  const currentRouteName = this.$route.name;
  const visitedViews = this.$store.state.tagsView.visitedViews;
  
  for(let i = 0, l = visitedViews.length; i < l; i++) {
    if(visitedViews[i].name === currentRouteName) {
       visitedViews.splice(i, 1);
       break;
    }
  }
}


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
