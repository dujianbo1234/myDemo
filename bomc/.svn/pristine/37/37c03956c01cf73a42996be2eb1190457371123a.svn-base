import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
// import Layout from '../views/layout/Layout'
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
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/publicPage/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/publicPage/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/overview',
    // name: 'Dashboard',
    // hidden: true,
    children: [{
      path: 'overview',
      component: () => import('../views/overview/index'),
      name: 'overview',
      meta: {
        title: '概览',
        icon: 'MonitorOverView',
        noCache: true
      }
    }]
  },
  {
    path: '/strategyManage',
    component: Layout,
    name: 'strategyManage',
    alwaysShow: true,
    meta: {
      title: '策略管理',
      icon: 'MonitorCe',
      noCache: true
    },
    children: [{
        path: 'analysisStrategy',
        component: () => import('../views/strategyManage/analysisStrategy'),
        name: 'analysisStrategy',
        meta: {
          title: '分析策略',
          noCache: true
        }
      },
      {
        path: 'eventInfluence',
        component: () => import('../views/strategyManage/eventInfluence'),
        name: 'eventInfluence',
        meta: {
          title: '影响度分析策略',
          noCache: true
        }
      },
      {
        path: 'autoBill',
        component: () => import('../views/strategyManage/autoBill'),
        name: 'autoBill',
        meta: {
          title: '自动提单策略',
          noCache: true
        }
      },
      {
        path: 'pushStrategy',
        component: () => import('../views/strategyManage/pushStrategy'),
        name: 'pushStrategy',
        meta: {
          title: '推送策略',
          noCache: true
        }
      },
    ]
  },
  {
    path: '/qualityManage',
    component: Layout,
    meta: {
      title: '质量管理',
      icon: 'MonitorQuality',
      noCache: true
    },
    children: [{
      path: 'qualityManage',
      component: () => import('../views/qualityManage/index'),
      name: 'qualityManage',
      meta: {
        title: '质量管理',
        noCache: true
      }
    },{
      path: 'malfunctionWarning',
      component: () => import('../views/malfunctionWarning'),
      name: 'malfunctionWarning',
      meta: {
        title: '报障通讯录',
        noCache: true
      }
    }]
  },
  {
    path: '/monitorShow',
    component: Layout,
    alwaysShow: true,
    name: 'monitorShow',
    meta: {
      title: '监控展示',
      icon: 'MonitorShow',
      noCache: true
    },
    children: [{
        path: 'currentAlert',
        component: () => import('../views/monitorShow/currentAlert'),
        name: 'currentAlert',
        meta: {
          title: '当前告警',
          noCache: true
        }
      },
      {
        path: 'preAlert',
        component: () => import('../views/monitorShow/preAlert'),
        name: 'preAlert',
        meta: {
          title: '当前预警',
          noCache: true
        }
      },
      {
        path: 'currentAlertHistory',
        component: () => import('../views/monitorShow/currentAlertHistory'),
        name: 'currentAlertHistory',
        meta: {
          title: '告警历史查询',
          noCache: true
        }
      },
      {
        path: 'preAlertHistory',
        component: () => import('../views/monitorShow/preAlertHistory'),
        name: 'preAlertHistory',
        meta: {
          title: '预警历史查询',
          noCache: true
        }
      },
    ]
  },
  {
    path: '/pushManagement',
    component: Layout,
    name:"pushManagement",
    meta: {
        title: '推送管理',
        icon: 'MonitorPush',
        noCache: true
    },
    children: [
      {
      path: 'pushTask',
      component: () => import('../views/pushManagement/pushTask'),
      name: 'pushTask',
      meta: {
        title: '推送任务',
        noCache: true
      }
    },
      {
      path: 'pushLog',
      component: () => import('../views/pushManagement/pushLog'),
      name: 'pushLog',
      meta: {
        title: '推送日志',
        noCache: true
      }
    },
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/selfMonitor',
    children: [{
      path: 'selfMonitor',
      component: () => import('../views/selfMonitor/index'),
      name: 'selfMonitor',
      meta: {
        title: '自监控',
        icon: 'MonitorSelf',
        noCache: true
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
