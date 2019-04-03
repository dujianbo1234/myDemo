import { asyncRouterMap, constantRouterMap } from '@/modules/portal/router'
// const constantRouterMap = []
// const asyncRouterMap = [{
//   path: '/dashboard:local',

//   redirect: '/dashboard2',
//   // name: 'Dashboard',
//   // hidden: true,
//   meta: { permission: 'portal' },
//   children: [{
//     path: 'dashboard2',
//     // component: () => import('../views/dashboard/index'),
//     name: 'dashboard2',
//     meta: { permission: 'system' },
//     children: [{
//       path: 'dashboard',
//       // component: () => import('../views/dashboard/index'),
//       name: 'dashboard'
//       // meta: { permission: 'system' }
//     }]
//   }]
// },
// {
//   path: '/',
//   redirect: '/dashboard',
//   // name: 'Dashboard',
//   // hidden: true,

//   children: [{
//     path: 'dashboard',
//     // component: () => import('../views/dashboard/index'),
//     name: 'dashboard'
//     // meta: { permission: 'system' }
//   }]
// }]
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(permissionList, route) {
  if (route.meta && route.meta.permission) {
    return permissionList.indexOf(route.meta.permission) >= 0
    // return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, permissionList) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(permissionList, route)) {
      // debugger
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, permissionList)
      }
      // if (JSON.stringify(route.children) === '[]') {
      //   delete route['children']
      // }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      // return new Promise(resolve => {
      const { permissionList } = data
      // debugger
      let accessedRouters
      // console.info('JSON.stringify(asyncRouterMap)')
      // console.info(JSON.stringify(constantRouterMap))
      // debugger
      if (permissionList.length !== 0) {
        //   accessedRouters = asyncRouterMap
        // } else {
        // debugger
        accessedRouters = filterAsyncRouter(asyncRouterMap, permissionList)
      }
      // debugger
      commit('SET_ROUTERS', accessedRouters)
      // resolve()
      // })
    }
  }
}

export default permission
