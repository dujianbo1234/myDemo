import Vue from 'vue'

import './permission.js'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from '@/store'
import i18n from '@/lang'
/* vue-from-making*/
import 'normalize.css/normalize.css'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/regular/keyboard'
import 'vue-awesome/icons/regular/trash-alt'
import 'vue-awesome/icons/regular/clone'
import 'vue-awesome/icons/regular/dot-circle'
import 'vue-awesome/icons/regular/check-square'
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/regular/calendar-alt'
import 'vue-awesome/icons/regular/clock'
import 'vue-awesome/icons/th'
import 'vue-awesome/icons/sort-numeric-up'
import 'vue-awesome/icons/regular/star'
import 'vue-awesome/icons/palette'
import 'vue-awesome/icons/regular/caret-square-down'
import 'vue-awesome/icons/toggle-off'
import 'vue-awesome/icons/sliders-h'
import 'vue-awesome/icons/regular/image'
import 'vue-awesome/icons/chalkboard'
import 'vue-awesome/icons/power-off'
import 'vue-awesome/icons/table'
import 'vue-awesome/icons/chart-bar'
import 'vue-awesome/icons/chart-line'
import 'vue-awesome/icons/chart-pie'

Vue.component('icon', Icon)
/* end*/
window.eventBus = new Vue()
import '@/icons' // icon
// import './permission' // permission control

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
