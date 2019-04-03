import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/assets/font_944386_zdtv1frca3p/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from '@/store'
import i18n from '@/lang'


import '@/icons' // icon
import './permission' // permission control

import  filters from '@/modules/mms/untils/filter'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
  })
import qs from 'qs'
Vue.prototype.$qs = qs 

import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
