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
  export const constantRouterMap = [{
    path: '/login',
    component: () =>
    import ('@/publicPage/login/index'),
    hidden: true
  }, {
    path: '/404',
    component: () =>
    import ('@/publicPage/404'),
    hidden: true
  }, {
    path: '/',
    redirect: '/tmpManage',
  }, {
    path: '/',
    component: Layout,
    redirect:'/AcquisitionOverview',
    meta: { title: '采集概览',permission: 'defualt',noCache: true },
    children: [{
      path: 'AcquisitionOverview',
      component: () => import('../views/AcquisitionOverview/index'),
      name: 'AcquisitionOverview',
      // meta: { title: 'dashboard', icon: 'dashboard', permission: 'dashboard', noCache: true }
      meta: { title: '采集概览',icon: 'dashboard', permission: 'defualt', noCache: true }
    }]
  },
  {
    path: '/tmpManage',
    component: Layout,
    redirect: '/tmpManage/platform',
    name: 'tmpManage',
    alwaysShow: false,
    meta: {
      title: '模板管理',
      icon: 'example',
      noCache: true
    },
    children: [{
      path: 'platform',
      component: () =>
      import ('../views/tmpManage/platform'),
      name: 'platform',
      meta: {
        title: '平台资源模板'
      }
    }, {
      path: 'log',
      component: () =>
      import ('../views/tmpManage/log'),
      name: 'log',
      meta: {
        title: '日志模板'
      }
    }, {
      path: 'database',
      component: () =>
      import ('../views/tmpManage/database'),
      name: 'database',
      meta: {
        title: '数据库模板'
      }
    }, {
      path: 'middleware',
      component: () =>
      import ('../views/tmpManage/middleware'),
      name: 'middleware',
      meta: {
        title: '中间件模板'
      }
    }, {
      path: 'customize',
      component: () =>
      import ('../views/tmpManage/customize'),
      name: 'customize',
      meta: {
        title: '自定义模板'
      }
    }]
  }, {
    path: '/taskManage',
    component: Layout,
    redirect: '/taskManage/collectionTask',
    name: 'taskManage',
    alwaysShow: true,
    meta: {
      title: '采集管理',
      icon: 'table',
      noCache: true
    },
    children: [{
      path: 'collectionTask',
      component: () =>
      import ('../views/taskManage/collectionTask/index'),
      name: 'collectionTask',
      meta: {
        title: '采集任务',
        always: true
      }
    }, {
      path: 'trackTask',
      component: () =>
      import ('../views/taskManage/trackingTask/trackTask'),
      name: 'trackTask',
      meta: {
        title: '任务跟踪',
        always: true
      }
    }]
  }, {
    path: '/AgentManage',
    component: Layout,
    redirect: '/AgentManage/Agent',
    name: 'AgentManage',
    alwaysShow: true,
    meta: {
      title: 'Agent管理',
      icon: 'form',
      noCache: true
    },
    children: [{
      path: 'Agent',
      component: () =>
      import ('../views/AgentManage/Agent/index'),
      name: 'Agent',
      meta: {
        title: 'Agent管理',
        always: true
      }
    }, {
      path: 'deploy',
      component: () =>
      import ('../views/AgentManage/deploy/deploy'),
      name: 'deploy',
      meta: {
        title: '代理部署',
        always: true
      }
    }]
  }, {
    path: '/autoDiscovery',
    component: Layout,
    redirect: '/autoDiscovery/discoveryRule',
    name: 'autoDiscovery',
    alwaysShow: true,
    meta: {
      title: '自动发现',
      icon: 'ling',
      noCache: true
    },
    children: [{
      path: 'discoveryRule',
      component: () =>
      import ('../views/autoDiscovery/discoveryRule'),
      name: 'discoveryRule',
      meta: {
        title: '自动发现规则',
        always: true
      }
    }, {
      path: 'discoveryResult',
      component: () =>
      import ('../views/autoDiscovery/discoveryResult'),
      name: 'discoveryResult',
      meta: {
        title: '自动发现结果',
        always: true
      }
    }]
  }, {
    path: '*',
    redirect: '/404',
    hidden: true
  }]

  export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})