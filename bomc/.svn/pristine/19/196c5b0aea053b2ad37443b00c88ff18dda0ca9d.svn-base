import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '@/components/layout/Layout'
import OtherThem from '../views/otherThem/index'

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
  { path: '/login', meta: { permission: 'defualt' }, component: () => import('@/publicPage/login/index'), hidden: true },
  { path: '/404', meta: { permission: 'defualt' }, component: () => import('@/publicPage/404'), hidden: true },
  { path: '/401', meta: { permission: 'defualt' }, component: () => import('@/publicPage/401'), hidden: true },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/carbon',
  //   // name: 'Dashboard',
  //   // hidden: true,
  //   // meta: { title: 'dashboard', permission: 'dashboard', noCache: true },
  //   meta: { title: 'carbon', permission: 'defualt', noCache: true },
  //   children: [{
  //     path: 'carbon',
  //     component: () => import('../views/carbon/index'),
  //     name: 'carbon',
  //     // meta: { title: 'dashboard', icon: 'dashboard', permission: 'dashboard', noCache: true }
  //     meta: { title: 'carbon', icon: 'dashboard', permission: 'defualt', noCache: true }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // name: 'Dashboard',
    // hidden: true,
    // meta: { title: 'dashboard', permission: 'dashboard', noCache: true },
    meta: { title: 'dashboard', permission: 'defualt', noCache: true },
    children: [{
      path: 'dashboard',
      component: () => import('../views/dashboard/index'),
      name: 'dashboard',
      // meta: { title: 'dashboard', icon: 'dashboard', permission: 'dashboard', noCache: true }
      meta: { title: 'dashboard', icon: 'dashboard', permission: 'defualt', noCache: true }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/making',
    // meta: { title: 'making', permission: 'making', noCache: true },
    meta: { title: '布局编排', icon: 'example', permission: 'defualt', noCache: true },
    // name: 'Dashboard',
    // hidden: true,
    children: [{
      path: 'making',
      component: () => import('../views/making/index'),
      name: 'making',
      // meta: { title: '组件编辑', icon: 'dashboard', permission: 'making', noCache: true }
      meta: { title: '组件编辑', permission: 'defualt', noCache: true }
    },
    {
      path: 'compList',
      component: () => import('../views/compList/index'),
      name: 'compList',
      // meta: { title: '组件列表', icon: 'dashboard', permission: 'compList', noCache: true }
      meta: { title: '组件列表', permission: 'defualt', noCache: true }
    }
    ]
  }
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/compList',
  //   // meta: { title: 'compList', permission: 'compList', noCache: true },
  //   meta: { title: 'compList', permission: 'defualt', noCache: true },
  //   // alwaysShow: true,
  //   // name: 'Dashboard',
  //   // hidden: true,
  //   //  path: '/compList',
  //   // component: () => import('../views/compList/index'),
  //   // name: 'compList',
  //   // meta: { title: '组件列表', icon: 'dashboard', noCache: true }
  //   children: [{
  //     path: 'compList',
  //     component: () => import('../views/compList/index'),
  //     name: 'compList',
  //     // meta: { title: '组件列表', icon: 'dashboard', permission: 'compList', noCache: true }
  //     meta: { title: '组件列表', icon: 'dashboard', permission: 'defualt', noCache: true }
  //   }]
  // }
]

export const asyncRouterMap = [
  // {
  //   path: '/otherThem',
  //   component: OtherThem,
  //   redirect: '/otherThem',
  //   name: 'otherThem',
  //   meta: { title: 'otherThem', icon: 'dashboard', noCache: true },
  //   // hidden: true,
  //   children: [{
  //     path: 'otherThem',
  //     component: () => import('../views/otherThem/index'),
  //     name: 'otherThem',
  //     meta: { title: 'otherThem', icon: 'dashboard', noCache: true }
  //   }]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('../views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('../views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('../views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('../views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('../views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('../views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('../views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('../views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('../views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('../views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  {
    path: '/systemManage',
    component: Layout,
    redirect: '/systemManage/userManage',
    name: 'systemManage',
    meta: { title: '系统管理', icon: 'example', permission: 'portal' },
    children: [
      {
        path: 'userManage',
        name: 'userManage',
        component: () => import('../views/systemManage/userManage'),
        meta: { title: '用户管理', permission: 'userPerm' }
      },

      {
        path: 'roleManage',
        name: 'roleManage',
        component: () => import('../views/systemManage/roleManage'),
        meta: { title: '角色管理', permission: 'rolePerm' }
      },
      {
        path: 'rightsManage',
        name: 'rightsManage',
        component: () => import('../views/systemManage/rightsManage'),
        meta: { title: '权限管理', permission: 'rightsPerm' }
      },
      {
        path: 'menuManage',
        name: 'menuManage',
        component: () => import('../views/systemManage/menuManage'),
        meta: { title: '菜单管理', permission: 'menuPerm' }
      },
      {
        path: 'areaManage',
        name: 'areaManage',
        component: () => import('../views/systemManage/areaManage'),
        meta: { title: '地域管理', permission: 'areaPerm' }
      },
      {
        path: 'deptManage',
        name: 'deptManage',
        component: () => import('../views/systemManage/deptManage'),
        meta: { title: '组织管理', permission: 'deptPerm' }
      },
      {
        path: 'postManage',
        name: 'postManage',
        // hidden: true,
        component: () => import('../views/systemManage/postManage'),
        meta: { title: '岗位管理', permission: 'postPerm' }
      },
      // {
      //   path: 'profileManage',
      //   name: 'profileManage',
      //   component: () => import('../views/systemManage/profileManage'),
      //   meta: { title: '个人信息(暂停)' }
      // },
      {
        path: 'dataManage',
        name: 'dataManage',
        hidden: true,
        component: () => import('../views/systemManage/dataManage'),
        meta: { title: '数据管理', permission: 'datPerm' }
      },
      {
        path: 'htmlManage',
        name: 'htmlManage',
        hidden: true,
        component: () => import('../views/systemManage/htmlManage'),
        meta: { title: '页面元素管理', permission: 'htmlPerm' }
      }
    ]
  }, {
    path: '*', redirect: '/404', hidden: true, meta: { permission: '404' }
  }]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
