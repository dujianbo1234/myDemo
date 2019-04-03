import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import oms from './modules/oms' // 运维管理中心模块
import layout from './modules/layout' // 流程平台模块
import collect from './modules/collect/index' // 采集平台
import getters from './getters'

// 资源管理中心模块
import resourceManagement from './modules/rms/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    resourceManagement,
    oms,
    layout,
    permission,
    collect
  },
  getters
})

export default store
