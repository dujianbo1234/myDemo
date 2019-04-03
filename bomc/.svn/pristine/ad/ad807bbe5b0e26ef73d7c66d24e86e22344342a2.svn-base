// import request from '@/modules/rms/api/request'
import request from '@/utils/request'
import { getTree, arrFormatter} from '@/modules/rms/utils/omstree.js';

const resourceManagement = {
  // 定义仓库属性，可以多个属性
	state:{
		// resourcesData:[],
    // modelList:[],
		level:'', // 判断资源层级
		type: '',				// 判断资源分类
		name:'',						// 判断资源父类
		on_treeData:false, // 判断是否请求过通用树状栏数据
		// 通用导航树状栏数据
    nav_treeData: [{
			id: 0,
			label: '全部资源',
			children: []
		}], 
		treeData:[], // 通用级联数据
		resourceDetails: '', // 资源数据每一条的详情
		quickAccess:'', // 首页查询快速入口数据
	},
  // getters 可以用来计算仓库属性，仓库属性可以来用传参，但不可以改变仓库属性的值 
	getters:{
		
	},
	// mutations 可以定义方法用来改变仓库属性值。可以多个
	mutations:{
		// 模型树状层级
    treeData:(state,res) => {
			var root = [
				{"value":"SaaS","label":"SaaS","pid":0,"id":1},
				{"value":"PaaS","label":"PaaS","pid":0,"id":2},
				{"value":"IaaS","label":"IaaS","pid":0,"id":3},
				{"value":"Others","label":"Others","pid":0,"id":4},

				{"value":"Application","label":"应用类","pid":1,"id":5},
				{"value":"Business","label":"业务类","pid":1,"id":6},

				{"value":"Logic","label":"逻辑类","pid":2,"id":7},

				{"value":"Logic","label":"逻辑类","pid":3,"id":8},
				{"value":"Physical","label":"物理类","pid":3,"id":9},

				{"value":"Other","label":"其他类","pid":4,"id":10},
		]
			debugger
			var result = arrFormatter(res);
			var temp = root.concat(result);
			var tree = getTree(temp);
			state.treeData = tree;
			state.nav_treeData[0].children = tree;
			state.on_treeData = true;
			// console.log(JSON.stringify(tree));
		},
		// 初始模型状态
    stateType:(state,data) => {
			debugger
			state.type = '';
      state.level = '';
      state.name = '';
		},
		// 新增模型状态
    addstateType:(state,data) => {
			debugger
			// state.type = data;
			state.level = data[0];
			state.name = data[data.length - 1];
			state.type = data[1];
			if(data[1] =='Logic'){
				state.type = '逻辑类'
			}
			if(data[1] =='Application'){
				state.type = '应用类'
			}
			if(data[1] =='Business'){
				state.type = '业务类'
			}
			if(data[1] =='Physical'){
				state.type = '物理类'
			}
			if(data[1] =='Other'){
				state.type = '其他类'
      }
		},
		resourceDetails:(state,data) => {
			state.resourceDetails = data
		},
		// 首页查询快速入口
		quickAccess:(state,data) => {
			debugger
			state.quickAccess = data
		}
	},
	// actions 用来调用mutations里面的方法，采用context固定写法，在组件使用$store.dispatch('方法名')来触发。
	actions:{
    treeData:(context) => {
      //debugger
			return request({
        method: 'GET',
        url: '/rms/api/v1/ResModel/type',
      })
			.then(res => {
				context.commit('treeData',res)
			})
    },
    stateType:(context) => {
     // debugger
				context.commit('stateType')
    },
    addstateType:(context,data) => {
   //   debugger
				context.commit('addstateType',data)
		},
		resourceDetails:(context,data) => {
				context.commit('resourceDetails',data)
		},
		quickAccess:(context,data) => {
			context.commit('quickAccess',data)
		}
	}
}

export default resourceManagement






