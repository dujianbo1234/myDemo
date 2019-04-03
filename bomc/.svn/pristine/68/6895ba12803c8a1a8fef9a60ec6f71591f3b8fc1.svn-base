import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/components/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/publicPage/login/index'), hidden: true },
  { path: '/404', component: () => import('@/publicPage/404'), hidden: true },
  { path: '/',
    redirect: '/viewManagement'
  },
  {
    path: '/',
    component: Layout,
    redirect: '/viewManagement',
    children: [{
      path: 'viewManagement',
      component: () => import('../views/front/indicator-viewManagement'),
      name: 'viewManagement',
      meta: { title: '指标概览', icon: 'overview', noCache: true }
    }]
  },
  {
    path: '/IndModman',
    component: Layout,
    redirect: '/IndModman',
    alwaysShow: false,
    meta: { title: '指标模型管理', icon: 'mould', noCache: true },
    name: 'Dashboard',
    // hidden: true,
    children: [
      /* {
        path: 'moduleManagement',
        component: () => import('../views/front/indicator-moduleManagement'),
        name: 'moduleManagement',
        meta: { title: '指标模型管理' }
      }*/
      {
        path: 'inLeft',
        component: () => import('../views/front/indModMan/moComponents/inLeft'),
        name: 'inleft',
        meta: { title: '指标类型' }
      },
      {
        path: 'inRight',
        component: () => import('../views/front/indModMan/moComponents/inRight'),
        name: 'inright',
        meta: { title: '指标维度' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: 'IndDefMan',
    redirect: '/IndDefMan',
    meta: { title: '指标定义管理', icon: 'definition' },
    children: [
      /* {
        path: 'IndDefMan',
        component: () => import('../views/front/indDefMan/index'),
        name: 'IndDefMan',
        meta: { title: '指标定义管理' }
      }*/
      {
        path: 'indRule',
        component: () => import('../views/front/indDefMan/components/indRule'),
        name: 'indRule',
        meta: { title: '指标计算规则' }
      },
      // {
      //   path: 'indInfo',
      //   component: () => import('../views/front/indDefMan/components/indInfo'),
      //   name: 'indInfo',
      //   meta: { title: '指标基本信息(旧)' }
      // },
      {
        path: 'indInfoMan',
        component: () => import('../views/front/indDefMan/indInfoMan/index'),
        name: 'indInfoMan',
        meta: { title: '指标基本信息', keepAlive: false }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dataManagement',
    children: [{
      path: 'dataManagement',
      component: () => import('../views/front/indicator-dataManagement'),
      name: 'dataManagement',
      meta: { title: '指标数据管理', icon: 'information' }
    }]
  },
  // {
  //   path: 'userManagement',
  //   component: () => import('../views/front/indicator-userManagement'),
  //   name: 'userManagement',
  //   meta: { title: '空白页' }
  // }
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
