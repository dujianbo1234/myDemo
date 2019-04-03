import router from './router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

NProgress.configure({ showSpinner: false })// NProgress Configuration

function hasPermission(permissionList, route) {
  // if (route.path === '/404' || route.path === '/401') {
  //   return true
  // }
  if (route.meta && route.meta.permission) {
    // debugger
    // return true
    if (route.meta.permission === 'defualt') {
      // debugger
      return true
    }
    return permissionList.indexOf(route.meta.permission) >= 0
    // return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return false
  }
}

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  // console.info(JSON.stringify(to))
  // debugger
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // note: roles must be a array! such as: ['editor','develop']
      // debugger
      // console.info(JSON.stringify(store.getters.permissionList))
      if (JSON.stringify(store.getters.permissionList) === '{}') {
        // console.info(store.getters.permissionList.length)
        // debugger
        store.dispatch('GetPermissionList').then(res => {
          const permissionList = res.portal
          // debugger
          if (permissionList === undefined || permissionList.length === 0) {
            next({ path: '/401', replace: true, query: { noGoBack: true }})
          }
          // debugger
          permissionList.push('portal')
          // debugger
          store.dispatch('GenerateRoutes', { permissionList }).then(() => { // 根据roles权限生成可访问的路由表
            // console.info('store.getters.addRouters')
            console.info(JSON.stringify(store.getters.addRouters))
            // debugger
            // debugger
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            console.info(router)
            // debugger
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          }).catch((err) => {
            // debugger
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })
        }
        )
      } else {
        // next()
        // debugger
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.permissionList.portal, to)) {
          // console.info(to)

          next()//
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
      // next()

      // if (store.getters.roles.length === 0) {
      //   store.dispatch('GetInfo').then(res => { // 拉取用户信息
      //     next()
      //   }).catch((err) => {
      //     store.dispatch('FedLogOut').then(() => {
      //       Message.error(err || 'Verification failed, please login again')
      //       next({ path: '/' })
      //     })
      //   })
      // } else {

      // }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
