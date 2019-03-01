import Vue from 'vue'
import Router from 'vue-router'
// @就是src目录
// import HelloWorld from '@/components/HelloWorld'
import homeComponent from '@/pages/Home'
import categoryComponent from '@/pages/Category'
import newsComponent from '@/pages/News'
import shopCarComponent from '@/pages/ShopCar'
import meComponent from '@/pages/Me'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/Home' },
    { path: '/home', component: homeComponent },
    { path: '/Category', component: categoryComponent },
    { path: '/News', component: newsComponent },
    { path: '/ShopCar', component: shopCarComponent },
    { path: '/Me', component: meComponent }
  ]
})
