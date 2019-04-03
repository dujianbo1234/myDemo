import Vue from 'vue'
import Router from 'vue-router'
import '../assets/css/index.css'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/components/layout/Layout'
import nav_aside from '../views/resourceData/data/crud/resourceDetails'
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
    path: '/',
    component: Layout,
    redirect: '/resourceOverview',
    children: [
      {
        path: 'resourceOverview',
        name: 'resourceOverview',
        component: () => import('../views/resourceOverview'),
        meta: { title: '资源管理中心概览', icon: 'form' }
      }
    ]
  },
  {
    path: '/resourceData',
    component: Layout,
    redirect: '/resourceData/resourceData',
    name: 'model',
    meta: { title: '资源模型管理', icon: 'example' },
    children: [
      {
        path: 'resourceData',
        name: 'resourceData',
        component: () => import('../views/model/resourceData'),
        meta: { title: '资源数据模型维护' }
      },
      {
        path: 'app',
        name: 'appLink',
        component: () => import('../views/model/resourceData/crud/app.vue'),
        meta: { title: '新增模型' },
        hidden: true
      },
      {
        path: 'attributeManag',
        name: 'attributeManagLink',
        component: () => import('../views/model/resourceData/crud/attributeManag.vue'),
        meta: { title: '扩展属性操作' },
        hidden: true
      },
      {
        path: 'versionManag',
        name: 'versionManagLink',
        component: () => import('../views/model/resourceData/crud/versionManag.vue'),
        meta: { title: '模型变更操作' },
        hidden: true
      },
      {
        path: 'associationRelationship',
        name: 'associationRelationship',
        component: () => import('../views/model/associationRelationship'),
        meta: { title: '关联关系模型维护' }
      }
      // {
      //   path: 'baseline',
      //   name: 'baseline',
      //   component: () => import('../views/model/baseline'),
      //   meta: { title: '基线管理' }
      // }
    ]
  },
  {
    path: '/resourceData',
    component: Layout,
    redirect: '/data',
    name: 'resourceData',
    meta: { title: '资源数据管理', icon: 'form',noCache: true  },
    children: [
      {
        path: 'data',
        name: 'data',
        component: () => import('../views/resourceData/data/index.vue'),
        meta: { title: '资源数据' }
      },
      {
        path: 'examine',
        name: 'examine',
        component: () => import('../views/resourceData/examine/index.vue'),
        meta: { title: '资源数据审核' }
      },
      {
        path: 'appResource',
        name: 'appResourceLink',
        component: () => import('../views/resourceData/data/crud/app.vue'),
        meta: { title: '新增资源',
                noCache: true 
                // 不会被 <keep-alive> 缓存 
              },
        hidden: true
      },
      {
        path: 'resource',
        name: 'resourceLink',
        component: nav_aside,
        redirect: '/resource/resourceDetails',
        hidden: true,
        children: [
          {
            path: 'resourceDetails',
            name: 'resourceDetailsLink',
            component: () => import('../views/resourceData/data/crud/resourceDetails/resourceDetails.vue'),
            meta: { title: '资源详情' },
            hidden: true
          },
          {
            path: 'topology',
            name: 'topologyLink',
            component: () => import('../views/resourceData/data/crud/resourceDetails/topology.vue'),
            meta: { title: '拓扑展现' },
            hidden: true
          },
          {
            path: 'lifeCycle',
            name: 'lifeCycleLink',
            component: () => import('../views/resourceData/data/crud/resourceDetails/lifeCycle.vue'),
            meta: { title: '生命周期状态' },
            hidden: true
          },
          {
            path: 'workList',
            name: 'workListLink',
            component: () => import('../views/resourceData/data/crud/resourceDetails/workList.vue'),
            meta: { title: '工单信息' },
            hidden: true
          },
          {
            path: 'maintenanceLog',
            name: 'maintenanceLogLink',
            component: () => import('../views/resourceData/data/crud/resourceDetails/maintenanceLog.vue'),
            meta: { title: '维护日志' },
            hidden: true
          }
        ]
      }
    ]
  },
  {
    path: '/automation',
    component: Layout,
    redirect: '/automation/dataAudit',
    name: 'automation',
    meta: { title: '资源自动核查', icon: 'example', noCache: true },
    children: [
      // {
      //   path: 'discovery',
      //   name: 'discovery',
      //   component: () => import('../views/automation/discovery/index.vue'),
      //   meta: { title: '资源自动化发现' }
      // },
      {
        path: 'verification',
        name: 'verification',
        component: () => import('../views/automation/verification/index.vue'),
        meta: { title: '基线核查' }
      },
      {
        path: 'relationshipVerification',
        name: 'relationshipVerification',
        component: () => import('../views/automation/relationshipVerification/index.vue'),
        meta: { title: '差异管理' }
      },
      {
        path: 'baseline',
        name: 'baseline',
        component: () => import('../views/model/baseline'),
        meta: { title: '基线管理' }
      }
      // {
      //   path: 'relationDiscovery',
      //   name: 'relationDiscovery',
      //   component: () => import('../views/automation/relationDiscovery/index.vue'),
      //   meta: { title: '资源关系自动化发现' }
      // },
      // {
      //   path: 'relationshipVerification',
      //   name: 'relationshipVerification',
      //   component: () => import('../views/automation/relationshipVerification/index.vue'),
      //   meta: { title: '资源关系自动化核查' }
      // }
    ]
  },
  {
    path: '/discovery',
    component: Layout,
    redirect: '/discovery',
    children: [
      {
        path: 'discovery',
        name: 'discovery',
        component: () => import('../views/automation/discovery/index.vue'),
        meta: { title: '资源自动发现', icon: 'form' }
      }
    ]
  },
  {
    path: '/toShow',
    component: Layout,
    redirect: '/toShow/statistics',
    name: 'toShow',
    meta: { title: '资源展现', icon: 'example', noCache: true },
    children: [
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('../views/toShow/statistics'),
        meta: { title: '资源统计' }
      },
      {
        path: 'relationshipDisplay',
        name: 'relationshipDisplay',
        component: () => import('../views/toShow/relationshipDisplay'),
        meta: { title: '资源关系展现' }
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
