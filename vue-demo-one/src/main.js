import Vue from 'vue'

// import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// import '@/styles/index.scss' // global css

// import App from './App'
// import router from './router'
// import store from '@/store'
// import i18n from '@/lang'


// import '@/icons' // icon
// import './permission' // permission control

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})