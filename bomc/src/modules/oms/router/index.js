import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex'
import * as myNeedDealService from '@/modules/oms/api/oms/myDesk/myNeedDeal'
import * as myWaitReceiptService from '@/modules/oms/api/oms/myDesk/myWaitReceipt'

/**
 * 
 */


// let userId = store.getters.userId
// let myNeedDealParams = {
//   assignee: userId, // 用户Id
//   status: 1,
//   start: 0, // （当前页数-1）*每页显示的条数
//   limit: 1
// }
// myNeedDealService.queryData(myNeedDealParams)
//   .then(res => {
//     let myNeedDealCount = res.count
//     store.dispatch('changeNeedDealCount', myNeedDealCount)
//   })
// let myNeedDealCallback = (resolve, reject) => {
//   let myNeedDealParams = {
//     assignee: userId, // 用户Id
//     status: 1,
//     start: 0, // （当前页数-1）*每页显示的条数
//     limit: 1
//   }
//   myNeedDealService.queryData(myNeedDealParams).then(res => {
//     let myNeedDealCount = res.count
//     resolve(store.dispatch('changeNeedDealCount', myNeedDealCount))
//   })
// }

// let getterMyNeedDealCount = ''
// let myNeedDealPromise = new Promise(myNeedDealCallback)
// myNeedDealPromise.then((res) => {
//   console.log("store.getters.needDealCount")
//   console.log(store.getters.needDealCount)
//   getterMyNeedDealCount = store.getters.needDealCount
// })


// const params = {
//   assignee: this.userId, // 用户Id
//   workListId: this.workListId,
//   title: this.title,
//   procDefId: this.procDefId,
//   status: 0,
//   start: (this.currentPage - 1) * this.pageSize, // （当前页数-1）*每页显示的条数
//   limit: this.pageSize

// }
// service.queryData(params).then(res => {
//   this.dealListData = res.result
//   this.totalCount = res.count
//   this.dealListData.forEach((item, index) => {
//     item.index = params.start++ + 1
//   })
// })


// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
// import Layout from '@/components/layout/Layout'

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
const constantRouterMap = [{
  path: '/login',
  component: () =>
    import('@/publicPage/login/index'),
  hidden: true
}, {
  path: '/',
  component: Layout,
  redirect: '/myDesk/createPage'
}, {
  path: '/myDesk', // 我的工作台
  component: Layout,
  redirect: 'createPage',
  name: 'myDesk',
  alwaysShow: true,
  meta: {
    title: '我的工作台',
    icon: 'table'
  },
  children: [{
    path: 'myFollow', // 我的关注
    name: 'myFollow',
    meta: {
      title: '我的关注',
      icon: 'tree'
    },
    component: () =>
      import('../views/myDesk/myFollow/index')
  }, {
    path: 'createPage', // 工单创建
    name: 'createPage',
    meta: {
      title: '工单创建',
      icon: 'table'
    },
    component: () =>
      import('../views/myDesk/createPage/index')
  }, {
    path: 'myNeedDeal', // 我的待办
    name: 'myNeedDeal',
    meta: {
      title: '我的待办',
      icon: 'tree'
    },
    component: () =>
      import('../views/myDesk/myNeedDeal/index')
  }, {
    path: 'myHaveDone', // 我的已办
    name: 'myHaveDone',
    meta: {
      title: '我的已办',
      icon: 'tree'
    },
    component: () =>
      import('../views/myDesk/myHaveDone/index')
  }, {
    path: 'myDraft', // 我的已办
    name: 'myDraft',
    meta: {
      title: '我的草稿',
      icon: 'tree'
    },
    component: () =>
      import('../views/myDesk/myDraft/index')
  }, {
    path: 'myLaunch', // 我的发起
    name: 'myLaunch',
    meta: {
      title: '我的发起',
      icon: 'tree'
    },
    component: () =>
      import('../views/myDesk/myLaunch/index')
  }, {
    path: 'myWaitReceipt', // 我的待签收
    name: 'myWaitReceipt',
    meta: {
      title: '我的待签收',
      icon: 'tree'
    },
    component: () =>
      import('../views/myDesk/myWaitReceipt/index')
  }]
}, {
  path: '/sysManage', // 系统管理
  component: Layout,
  alwaysShow: true,
  name: 'sysManage',
  meta: {
    title: '系统管理',
    icon: 'table'
  },
  children: [{
    path: 'pageManage', // 页面管理
    name: 'pageManage',
    component: () =>
      import('../views/sysManage/pageManage/index'),
    meta: {
      title: '页面管理',
      icon: 'tree'
    }
  }]
}, {
  path: '/dailyOperationManage',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: "日常运维管理",
    icon: 'table'
  },
  children: [{
    path: "announcementManage",
    name: "announcementManage",
    component: () =>
      import('../views/dailyOperationManage/announcementManage'),
    meta: {
      title: '公告管理',
      icon: 'tree'
    }
  }, {
    path: "agentSetting",
    name: "agentSetting",
    component: () =>
      import('../views/dailyOperationManage/agentSetting'),
    meta: {
      title: '代理人设置',
      icon: 'tree'
    }
  }, {
    path: "workDayManage",
    name: "workDayManage",
    component: () =>
      import('../views/dailyOperationManage/workDayManage'),
    meta: {
      title: '工作日管理',
      icon: 'tree'
    }
  }, {
    path: "dutyManage",
    name: "dutyManage",
    component: () =>
      import('../views/dailyOperationManage/dutyManage'),
    meta: {
      title: '值班管理',
      icon: 'tree'
    }
  }, {
    path: "taskPlanManage",
    name: "taskPlanManage",
    component: () =>
      import('../views/dailyOperationManage/taskPlanManage'),
    meta: {
      title: '作业计划管理',
      icon: 'tree'
    }
  }]
}, {
  path: '/eventForm', // 事件单
  component: Layout,
  alwaysShow: true,
  // hidden: true,
  name: 'eventForm',
  meta: {
    title: '事件单',
    icon: 'table'
  },
  children: [{
      path: 'index/:procDefId/:procInstId/:taskId', // 事件登记
      name: 'index',
      component: () =>
        import('../views/process/eventForm/index'),
      meta: {
        title: '事件登记',
        icon: 'tree'
      }
    },
    {
      path: 'classifyAndDeel/:procDefId/:procInstId/:taskId', // 事件分类与处理
      name: 'classifyAndDeel',
      component: () =>
        import('../views/process/eventForm/classifyAndDeel'),
      meta: {
        title: '事件分类与处理',
        icon: 'tree'
      }
    },
    {
      path: 'confirmAndAssignment/:id/:procInstId/:taskId', // 紧急事件确认/转派
      name: 'confirmAndAssignment',
      component: () =>
        import('../views/process/eventForm/confirmAndAssignment'),
      meta: {
        title: '紧急事件确认/转派',
        icon: 'tree'
      }
    },
    {
      path: 'firstSecondLine/:id/:procInstId/:taskId', // 一/二线处理
      name: 'firstSecondLine',
      component: () =>
        import('../views/process/eventForm/firstSecondLine'),
      meta: {
        title: '一/二线处理',
        icon: 'tree'
      }
    },
    {
      path: 'thirdLine/:id/:procInstId/:taskId', // 三线处理
      name: 'thirdLine',
      component: () =>
        import('../views/process/eventForm/thirdLine'),
      meta: {
        title: '三线处理',
        icon: 'tree'
      }
    },
    {
      path: 'closeEvent/:id/:procInstId/:taskId', // 关闭
      name: 'closeEvent',
      component: () =>
        import('../views/process/eventForm/closeEvent'),
      meta: {
        title: '关闭',
        icon: 'tree'
      }
    },
    {
      path: 'schemeDesign/:id/:procInstId/:taskId', // 方案制定
      name: 'schemeDesign',
      component: () =>
        import('../views/process/eventForm/schemeDesign'),
      hidden: false,
      meta: {
        title: '方案制定',
        icon: 'tree'
      }
    },
    {
      path: 'emergencyControl/:id/:procInstId/:taskId', // 紧急事件处理
      name: 'emergencyControl',
      component: () =>
        import('../views/process/eventForm/emergencyControl'),
      meta: {
        title: '紧急事件处理',
        icon: 'tree'
      }
    },
    {
      path: 'ConfirmProcessingResults/:id/:procInstId/:taskId', // 确认处理结果
      name: 'ConfirmProcessingResults',
      component: () =>
        import('../views/process/eventForm/ConfirmProcessingResults'),
      meta: {
        title: '确认处理结果',
        icon: 'tree'
      }
    },
    {
      path: 'summaryOfProcessing/:id/:procInstId/:taskId', // 处理总结
      name: 'summaryOfProcessing',
      component: () =>
        import('../views/process/eventForm/summaryOfProcessing'),
      meta: {
        title: '处理总结',
        icon: 'tree'
      }
    },
    {
      path: 'allInfo/:procDefId/:procInstId/:taskId', // 所有信息的静态页面
      name: 'allInfo',
      component: () =>
        import('../views/process/eventForm/allInfo'),
      meta: {
        title: '所有信息',
        icon: 'tree'
      }
    },
    {
      path: 'associationForm/:procInstId/:taskId/:ciId/:ciName', // 关联表单
      name: 'associationForm',
      component: () =>
        import('../views/process/eventForm/associationForm'),
      meta: {
        title: '关联工单',
        icon: 'tree'
      }
    },
    // {
    //   path: 'typeMatch/:procInstId/:taskId', // 关联配置项
    //   name: 'typeMatch',
    //   component: () =>
    //     import ('../views/process/eventForm/typeMatch'),
    //   meta: {
    //     title: 'CI类型匹配',
    //     icon: 'tree'
    //   }
    // }
  ]
}, {
  path: '/problemForm', // 问题单
  component: Layout,
  alwaysShow: true,
  // hidden: true,
  name: 'problemForm',
  meta: {
    title: '问题单',
    icon: 'table'
  },
  children: [{
    path: 'start/:procDefId/:procInstId/:taskId',
    name: 'start',
    component: () =>
      import('../views/process/problemForm/start'),
    meta: {
      title: '启动问题',
      icon: 'tree'
    }
  }, {
    path: 'assignment/:procDefId/:procInstId/:taskId',
    name: 'assignment',
    component: () =>
      import('../views/process/problemForm/assignment'),
    meta: {
      title: '问题分派',
      icon: 'tree'
    }
  }, {
    path: 'investigation/:procDefId/:procInstId/:taskId',
    name: 'investigation',
    component: () =>
      import('../views/process/problemForm/investigation'),
    meta: {
      title: '问题调查',
      icon: 'tree'
    }
  }, {
    path: 'resolve/:procDefId/:procInstId/:taskId',
    name: 'resolve',
    component: () =>
      import('../views/process/problemForm/resolve'),
    meta: {
      title: '问题解决',
      icon: 'tree'
    }
  }, {
    path: 'review/:procDefId/:procInstId/:taskId',
    name: 'review',
    component: () =>
      import('../views/process/problemForm/review'),
    meta: {
      title: '问题回顾',
      icon: 'tree'
    }
  }, {
    path: 'close/:procDefId/:procInstId/:taskId',
    name: 'close',
    component: () =>
      import('../views/process/problemForm/close'),
    meta: {
      title: '问题关闭',
      icon: 'tree'
    }
  }, {
    path: 'allInfo/:procDefId/:procInstId/:taskId',
    name: 'allInfo',
    component: () =>
      import('../views/process/problemForm/allInfo'),
    meta: {
      title: '静态页面',
      icon: 'tree'
    }
  }]
}, {
  path: '/changeForm', // 变更管理流程
  component: Layout,
  name: 'changeForm',
  alwaysShow: true,
  // hidden: true,
  meta: {
    title: '变更管理流程',
    icon: 'table'
  },
  children: [{
    path: 'changeFormStart/:procDefId/:procInstId/:taskId',
    name: 'changeFormStart',
    component: () =>
      import('../views/process/changeForm/changeFormStart'),
    meta: {
      title: '变更发起',
      icon: 'tree'
    }
  }, {
    path: 'makePlan/:procDefId/:procInstId/:taskId',
    name: 'makePlan',
    component: () =>
      import('../views/process/changeForm/makePlan'),
    meta: {
      title: '计划制定',
      icon: 'tree'
    }
  }, {
    path: 'approve/:procDefId/:procInstId/:taskId',
    name: 'approve',
    component: () =>
      import('../views/process/changeForm/approve'),
    meta: {
      title: '评估审批',
      icon: 'tree'
    }
  }, {
    path: 'CABapprove/:procDefId/:procInstId/:taskId',
    name: 'CABapprove',
    component: () =>
      import('../views/process/changeForm/CABapprove'),
    meta: {
      title: 'CAB评估审批',
      icon: 'tree'
    }
  }, {
    path: 'ideaSummary/:procDefId/:procInstId/:taskId',
    name: 'ideaSummary',
    component: () =>
      import('../views/process/changeForm/ideaSummary'),
    meta: {
      title: '评估意见汇总',
      icon: 'tree'
    }
  }, {
    path: 'dispatchTask/:procDefId/:procInstId/:taskId',
    name: 'dispatchTask',
    component: () =>
      import('../views/process/changeForm/dispatchTask'),
    meta: {
      title: '分派任务',
      icon: 'tree'
    }
  }, {
    path: 'taskImplement/:procDefId/:procInstId/:taskId',
    name: 'taskImplement',
    component: () =>
      import('../views/process/changeForm/taskImplement'),
    meta: {
      title: '任务实施',
      icon: 'tree'
    }
  }, {
    path: 'review/:procDefId/:procInstId/:taskId',
    name: 'review',
    component: () =>
      import('../views/process/changeForm/review'),
    meta: {
      title: '变更回顾',
      icon: 'tree'
    }
  }, {
    path: 'changeFormClose/:procDefId/:procInstId/:taskId',
    name: 'changeFormClose',
    component: () =>
      import('../views/process/changeForm/changeFormClose'),
    meta: {
      title: '变更关闭',
      icon: 'tree'
    }
  }, {
    path: 'urgConfirm/:procDefId/:procInstId/:taskId',
    name: 'urgConfirm',
    component: () =>
      import('../views/process/changeForm/urgConfirm'),
    meta: {
      title: '紧急变更确认',
      icon: 'tree'
    }
  }, {
    path: 'urgFastApproval/:procDefId/:procInstId/:taskId',
    name: 'urgFastApproval',
    component: () =>
      import('../views/process/changeForm/urgFastApproval'),
    meta: {
      title: '快速审批',
      icon: 'tree'
    }
  }, {
    path: 'urgMakePlan/:procDefId/:procInstId/:taskId',
    name: 'urgMakePlan',
    component: () =>
      import('../views/process/changeForm/urgMakePlan'),
    meta: {
      title: '制定变更计划',
      icon: 'tree'
    }
  }, {
    path: 'urgGroupApproval/:procDefId/:procInstId/:taskId',
    name: 'urgGroupApproval',
    component: () =>
      import('../views/process/changeForm/urgGroupApproval'),
    meta: {
      title: '集团审批',
      icon: 'tree'
    }
  }, {
    path: 'urgAssignmentTask/:procDefId/:procInstId/:taskId',
    name: 'urgAssignmentTask',
    component: () =>
      import('../views/process/changeForm/urgAssignmentTask'),
    meta: {
      title: '分派变更任务',
      icon: 'tree'
    }
  }, {
    path: 'urgTaskImplement/:procDefId/:procInstId/:taskId',
    name: 'urgTaskImplement',
    component: () =>
      import('../views/process/changeForm/urgTaskImplement'),
    meta: {
      title: '实施变更任务',
      icon: 'tree'
    }
  }, {
    path: 'urgToExamine/:procDefId/:procInstId/:taskId',
    name: 'urgToExamine',
    component: () =>
      import('../views/process/changeForm/urgToExamine'),
    meta: {
      title: '变更审核',
      icon: 'tree'
    }
  }, {
    path: 'urgClose/:procDefId/:procInstId/:taskId',
    name: 'urgClose',
    component: () =>
      import('../views/process/changeForm/urgClose'),
    meta: {
      title: '紧急变更关闭',
      icon: 'tree'
    }
  }, {
    path: 'urgBackPlan/:procDefId/:procInstId/:taskId',
    name: 'urgBackPlan',
    component: () =>
      import('../views/process/changeForm/urgBackPlan'),
    meta: {
      title: '执行回退计划',
      icon: 'tree'
    }
  }, {
    path: 'allInfo/:procDefId/:procInstId/:taskId',
    name: 'allInfo',
    component: () =>
      import('../views/process/changeForm/allInfo'),
    meta: {
      title: '静态页面',
      icon: 'tree'
    }
  }]
},/* {
  path: '/taskManage',
  name: 'taskManage',
  component: Layout,
  alwaysShow: true,
  meta: {
    title: '任务管理流程',
    icon: 'tree'
  },
  children: [
    {
      path: 'developTaskContent/:procDefId/:procInstId/:taskId',
      name: 'developTaskContent',
      component: () =>
        import('../views/process/taskManage/developTaskContent'),
      meta: {
        title: '制定任务内容',
        icon: 'tree'
      }
    }, {
      path: 'assignTask/:procDefId/:procInstId/:taskId',
      name: 'assignTask',
      component: () =>
        import('../views/process/taskManage/assignTask'),
      meta: {
        title: '分派任务',
        icon: 'tree'
      }
    }, {
      path: 'taskProcessing/:procDefId/:procInstId/:taskId',
      name: 'taskProcessing',
      component: () =>
        import('../views/process/taskManage/taskProcessing'),
      meta: {
        title: '任务处理',
        icon: 'tree'
      }
    }, {
      path: 'taskReview/:procDefId/:procInstId/:taskId',
      name: 'taskReview',
      component: () =>
        import('../views/process/taskManage/taskReview'),
      meta: {
        title: '任务审核',
        icon: 'tree'
      }
    }, {
      path: 'taskClose/:procDefId/:procInstId/:taskId',
      name: 'taskClose',
      component: () =>
        import('../views/process/taskManage/taskClose'),
      meta: {
        title: '任务关闭',
        icon: 'tree'
      }
    }

  ]
}, */{
  path: '/dutyManagement',
  name: 'dutyManagement',
  component: Layout,
  // hidden: true,
  alwaysShow: true,
  meta: {
    title: '值班管理',
    icon: 'tree'
  },
  children: [{
    path: 'dutyRecord/:procDefId/:procInstId/:taskId',
    name: 'dutyRecord',
    component: () =>
      import('../views/process/dutyManagement/dutyRecord'),
    meta: {
      title: '值班记录',
      icon: 'tree'
    }
  }, {
    path: 'receivedDuty/:procDefId/:procInstId/:taskId',
    name: 'receivedDuty',
    component: () =>
      import('../views/process/dutyManagement/receivedDuty'),
    meta: {
      title: '接班处理',
      icon: 'tree'
    }
  }, {
    path: 'examineDuty/:procDefId/:procInstId/:taskId',
    name: 'examineDuty',
    component: () =>
      import('../views/process/dutyManagement/examineDuty'),
    meta: {
      title: '值班审核',
      icon: 'tree'
    }
  }, {
    path: 'allInfo/:procDefId/:procInstId/:taskId',
    name: 'allInfo',
    component: () =>
      import('../views/process/dutyManagement/allInfo'),
    meta: {
      title: '静态页面',
      icon: 'tree'
    }
  }]
}, {
  path: '/taskPlanManage',
  name: 'taskPlanManage',
  component: Layout,
  // hidden: true,
  alwaysShow: true,
  meta: {
    title: '作业计划管理',
    icon: 'tree'
  },
  children: [{
      path: 'confirmTaskPlan/:procDefId/:procInstId/:taskId',
      name: 'confirmTaskPlan',
      component: () =>
        import('../views/process/taskPlanManage/confirmTaskPlan'),
      meta: {
        title: '确定作业计划',
        icon: 'tree'
      }
    },
    {
      path: 'examineTaskPlan/:procDefId/:procInstId/:taskId',
      name: 'examineTaskPlan',
      component: () =>
        import('../views/process/taskPlanManage/examineTaskPlan'),
      meta: {
        title: '审核作业计划',
        icon: 'tree'
      }
    }
  ]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
