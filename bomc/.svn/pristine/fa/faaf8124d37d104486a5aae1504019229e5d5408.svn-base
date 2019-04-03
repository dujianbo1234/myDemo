import * as serviceNeedDeal from "@/modules/oms/api/oms/myDesk/myNeedDeal"
import * as serviceWaitReceipt from "@/modules/oms/api/oms/myDesk/myWaitReceipt"
import router from '@/modules/oms/router'
import storeModule from "@/store/index.js"

const oms = {
  state: {
    needDealCount: '', // 待办数量
    waitReceipt: '' // 待签收
  },
  mutations: {
    changeNeedDealCount(state) { // 我的待办数量修改
      let userId = storeModule.getters.userId;
      let myNeedDealParams = {
        assignee: userId, // 用户Id
        status: 1,
        start: 0, // （当前页数-1）*每页显示的条数
        limit: 1
      };
      serviceNeedDeal.queryData(myNeedDealParams).then(res => {
        router.options.routes.forEach(route => {
          if (route.children) {
            route.children.forEach(router => {
              if (router.name === "myNeedDeal") {
                router.meta = {...router.meta, count: res.count };
              }
            });
          }
        });
      });
    },
    changeWaitReceipt(state) {
      let userId = storeModule.getters.userId;
      let myNeedDealParams = {
        assignee: userId, // 用户Id
        status: 0,
        start: 0, // （当前页数-1）*每页显示的条数
        limit: 1
      };
      serviceWaitReceipt.queryData(myNeedDealParams).then(res => {
        router.options.routes.forEach(route => {
          if (route.children) {
            route.children.forEach(router => {
              if (router.name === "myWaitReceipt") {
                router.meta = {...router.meta, count: res.count };
              }
            });
          }
        });
      });
    }
  },
  actions: {
    changeNeedDealCount(context) {
      context.commit('changeNeedDealCount')
    },
    changeWaitReceipt(context) {
      context.commit('changeWaitReceipt')
    }
  }
}

export default oms