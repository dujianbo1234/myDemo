import { validate, login, logout, getInfo, getPermissionList } from '@/api/login'
import { getToken, setToken, getUserId, setUserId, getUserName, setUserName, removeToken, removeUserId } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userId: getUserId(),
    name: getUserName(),
    avatar: '',
    roles: [],
    permissionList: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    //  SET_AVATAR: (state, avatar) => {
    //    state.avatar = avatar
    //  },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_PERMISSIONLIST: (state, permissionList) => {
      state.permissionList = permissionList
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const code = userInfo.getcode.trim()
      // debugger
      const random = userInfo.random.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, code, random).then(response => {
          const userId = response.data.userId
          const token = response.data.token
          setToken(token)
          setUserId(userId)
          setUserName(username)

          commit('SET_TOKEN', token)
          commit('SET_USERID', userId)
          commit('SET_NAME', username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户权限列表
    GetPermissionList({ commit, state }) {
      return new Promise((resolve, reject) => {
        getPermissionList(state.token).then(response => {
          const data = response
          // debugger
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          commit('SET_PERMISSIONLIST', data)
          // debugger
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeUserId()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
