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
			import('@/publicPage/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () =>
			import('@/publicPage/404'),
		hidden: true
	},
	{
		path: '/',
		component: Layout,
		redirect: '/front',
		meta: {
			title: '命令操作',
			icon: 'nested'
		},
		children: [{
				path: 'front',
				name: 'admilManage',
				component: () =>
					import('../views/commandManage/admilManage'),
				meta: {
					title: '命令管理'
				}
			},
			{
				path: 'admilScript',
				name: 'admilScript',
				component: () =>
					import('../views/commandManage/admilScript'),
				meta: {
					title: '脚本管理'
				}
			},
			{
				path: 'operManage',
				name: 'operManage',
				component: () =>
					import('../views/commandManage/operManage'),
				meta: {
					title: '命令操作执行'
				}
			},
			// {
			// 	path: 'hostManage',
			// 	name: 'hostManage',
			// 	component: () =>
			// 		import('../views/commandManage/hostManage'),
			// 	meta: {
			// 		title: '主机管理'
			// 	}
			// },
			{
				path: 'statManage',
				name: 'statManage',
				component: () =>
					import('../views/commandManage/statManage'),
				meta: {
					title: '命令统计'
				}
			},
			{
				path: 'journalManage',
				name: 'journalManage',
				component: () =>
					import('../views/commandManage/journalManage'),
				meta: {
					title: '用户操作日志'
				}
			}
		]
	},
	{

		path: '/taskManagement',

		component: Layout,
		redirect: '/taskManagement',
		meta: {
			title: '任务管理',
			icon: 'example'
		},
		children: [{
				path: 'front',
				component: () =>
					import('../views/taskManagement/taskPreview'),
				name: '任务管理',
				meta: {
					title: '任务概览'
				}
			}, {
				path: 'taskTemplate',
				name: 'taskTemplate',
				component: () =>
					import('../views/taskManagement/taskTemplate'),
				meta: {
					title: '任务模板管理'
				}
			}, {
				path: 'taskCustomization',
				name: 'taskCustomization',
				component: () =>
					import('../views/taskManagement/taskCustomization'),
				meta: {
					title: '任务定制管理'
				}
			}, {
				path: 'taskExecution',
				name: 'taskExecution',
				component: () =>
					import('../views/taskManagement/taskExecution'),
				meta: {
					title: '任务执行管理'
				}
			}, {
				path: 'taskJournal',
				name: 'taskJournal',
				component: () =>
					import('../views/taskManagement/taskJournal'),
				meta: {
					title: '任务日志'
				}
			}

		]
	},

	{
		path: '/autoInspection',
		component: Layout,
		redirect: '/autoInspection',
		meta: {
			title: '自动巡检',
			icon: 'nested'
		},
		children: [
			// {
			// 	path: 'insTaskTempManage',
			// 	name: 'insTaskTempManage',
			// 	component: () =>
			// 		import('../views/autoInspection/insTaskTempManage'),
			// 	meta: {
			// 		title: '巡检任务模板管理'
			// 	}
			// },
			{
				path: 'insTaskManage',
				name: 'insTaskManage',
				component: () =>
					import('../views/autoInspection/insTaskManage'),
				meta: {
					title: '巡检任务管理'
				}
			},
			{
				path: 'insExecuteManage',
				name: 'insExecuteManage',
				component: () =>
					import('../views/autoInspection/insExecuteManage'),
				meta: {
					title: '巡检执行管理'
				}
			},
			// {
			// 	path: 'insBaselineManage',
			// 	name: 'insBaselineManage',
			// 	component: () =>
			// 		import('../views/autoInspection/insBaselineManage'),
			// 	meta: {
			// 		title: '巡检基线管理'
			// 	}
			// },
			{
				path: 'insReportInform',
				name: 'insReportInform',
				component: () =>
					import('../views/autoInspection/insReportInform'),
				meta: {
					title: '巡检报告和巡检通知'
				}
			},
			{
				path: 'insJournalManage',
				name: 'insJournalManage',
				component: () =>
					import('../views/autoInspection/insJournalManage'),
				meta: {
					title: '巡检日志管理'
				}
			},
		]
	},
	{
		path: '/serviceDo',
		component: Layout,
		redirect: '/serviceDo',
		meta: {
			title: '服务启停',
			icon: 'nested'
		},
		children: [{
				path: 'doServiceManage',
				name: 'doServiceManage',
				component: () =>
					import('../views/serviceDo/doServiceManage'),
				meta: {
					title: '启停服务管理'
				}
			},
			{
				path: 'doTaskManage',
				name: 'doTaskManage',
				component: () =>
					import('../views/serviceDo/doTaskManage'),
				meta: {
					title: '启停任务管理'
				}
			},
			{
				path: 'doExecutiveManage',
				name: 'doExecutiveManage',
				component: () =>
					import('../views/serviceDo/doExecutiveManage'),
				meta: {
					title: '启停执行管理'
				}
			},
			{
				path: 'doLogManage',
				name: 'doLogManage',
				component: () =>
					import('../views/serviceDo/doLogManage'),
				meta: {
					title: '启停日志管理'
				}
			},
		]
	},
	{
		path: '/deployUpdate',
		component: Layout,
		redirect: '/deployUpdate',
		meta: {
			title: '部署更新',
			icon: 'nested'
		},
		children: [
			{
				path: 'deployUpdateTask',
				name: 'deployUpdateTask',
				component: () =>
					import('../views/deployUpdate/deployUpdateTask'),
				meta: {
					title: '部署任务管理'
				}
			},
			{
				path: 'deployStoreManag',
				name: 'deployStoreManag',
				component: () =>
					import('../views/deployUpdate/deployStoreManag'),
				meta: {
					title: '仓库管理'
				}
			},
			{
				path: 'deployUpdateExcute',
				name: 'deployUpdateExcute',
				component: () =>
					import('../views/deployUpdate/deployUpdateExcute'),
				meta: {
					title: '部署执行管理'
				}
			},
			{
				path: 'deployUpdateJournal',
				name: 'deployUpdateJournal',
				component: () =>
					import('../views/deployUpdate/deployUpdateJournal'),
				meta: {
					title: '部署日志管理'
				}
			},
		]
	},
	{
		path: '*',
		redirect: '/404',
		hidden: true
	},
]

export default new Router({
	// mode: 'history', //后端支持可开
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})