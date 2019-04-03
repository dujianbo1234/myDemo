import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'


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
  {
    path: '/', // default router 流程管理
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      component: () => import('../views/front/index'),
      name: 'processManage',
      meta: { title: '流程管理', icon: 'dashboard', noCache: true }
    }]
  },
  // {
  //   path: '/ruleManage',
  //   component: Layout,
  //   redirect: '/ruleManage/index',
  //   children: [{
  //     path: 'index',
  //     component: () => import('../views/front/ruleManage'),
  //     name: 'ruleManage',
  //     meta: { title: '规则管理', icon: 'dashboard', noCache: true }
  //   }]
  // },
  {
    path: '/custom',
    component: Layout,
    redirect: '/custom/index',
    children: [{
      path: 'index',
      component: () => import('../views/front/custom'),
      name: 'custom',
      meta: { title: '表单设计', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/preview',
    component: Layout,
    redirect: '/preview/index',
    children: [{
      path: 'index',
      component: () => import('../views/front/preview'),
      name: 'preview',
      meta: { title: '预览', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/drawProcess',
    component: Layout,
    redirect: '/drawProcess/index',
    children: [{
      path: 'index',
      component: () => import('../views/front/drawProcess'),
      name: 'drawProcess',
      // beforeRouteLeave: function (to, from, next) {
      //   debugger
      //   const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      //   if (answer) {
      //     next()
      //   } else {
      //     next(false)
      //   }
      // },
      meta: { title: '绘制流程图', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/draftBox',
    component: Layout,
    redirect: '/draftBox/index',
    children: [{
      path: 'index',
      component: () => import('../views/front/draftBox'),
      name: 'draftBox',
      // beforeRouteLeave: function (to, from, next) {
      //   debugger
      //   const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      //   if (answer) {
      //     next()
      //   } else {
      //     next(false)
      //   }
      // },
      meta: { title: '草稿箱', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/processMonitoring',
    component: Layout,
    redirect: '/processMonitoring/index',
    children: [
      {
        path: 'index',
        component: () => import('../views/front/processMonitoring.vue'),
        name: 'processMonitoring',
        meta: { title: '流程监控', icon: 'dashboard', noCache: true }
      }, {
        path: '/deploy/:id',
        name: 'deployDetail',
        meta: { title: '流程部署详情', icon: 'dashboard', noCache: true },
        component: () => import('../views/detail/processMonitoring/deploy.vue'),
        hidden: true
      }, {
        path: '/historicTaskInstance/:id',
        name: 'historicTaskInstanceDetail',
        meta: { title: '任务详情', icon: 'dashboard', noCache: true },
        component: () => import('../views/detail/processMonitoring/historicTaskInstance.vue'),
        hidden: true
      }, {
        path: '/jobs/:id',
        name: 'jobsDetail',
        meta: { title: '作业详情', icon: 'dashboard', noCache: true },
        component: () => import('../views/detail/processMonitoring/jobs.vue'),
        hidden: true
      }, {
        path: '/processDefine/:id',
        name: 'processDefineDetail',
        meta: { title: '流程定义详情', icon: 'dashboard', noCache: true },
        component: () => import('../views/detail/processMonitoring/processDefine.vue'),
        hidden: true
      }, {
        path: '/processIntance/:id',
        name: 'processIntanceDetail',
        meta: { title: '流程实例详情', icon: 'dashboard', noCache: true },
        component: () => import('../views/detail/processMonitoring/processIntance.vue'),
        hidden: true
      }
    ]
  }, {
    path: '/logManage',
    component: Layout,
    redirect: '/logManage/index',
    children: [
      {
        path: 'index',
        component: () => import('../views/front/logManage.vue'),
        name: 'logManage',
        meta: { title: '日志管理', icon: 'dashboard', noCache: true }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
