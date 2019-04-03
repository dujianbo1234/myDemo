<template>
	<div class="container">
	  <el-row :gutter="20">
		  <el-col :span="6">
		  	<div class="acRow" :style="backgroundDiv1">
		  	  <span class="title">模板总数</span>
		  	  <div class="info">{{viewDatas.template.total}}</div>
		  	</div>
		  </el-col>
		  <el-col :span="6">
		  	<div class="acRow" :style="backgroundDiv2">
		  	  <span class="title">任务总数</span>
		  	  <div class="info">{{taskTotal}}</div>
		  	</div>
		  </el-col>
		  <el-col :span="6">
		  	<div class="acRow" :style="backgroundDiv3">
		  	  <span class="title">对象总数</span>
		  	  <div class="info">{{collectionTotal}}</div>
		  	</div>
		  </el-col>
		  <el-col :span="6">
		  	<div class="acRow" :style="backgroundDiv4">
		  	  <span class="title">规则总数</span>
		  	  <div class="info">{{ruleCountTotal}}</div>
		  	</div>
		  </el-col>
	  </el-row>
			<div>
			  <overview-echars 
         :obj='echart_obj[0]'
         class="acview"
         v-if="flag1"
         :tmpDatas='viewDatas.template'
         > 
         </overview-echars>
         <overview-echars 
         class="acview"
         v-if="flag2"
         :obj='echart_obj[1]'
         :taskDatas='viewDatas.task'
         > 
         </overview-echars>
      </div>
      <div>
         <overview-echars 
         class="acview"
         :obj='echart_obj[2]'
         v-if="flag3"
         :agentDatas='viewDatas.agent'
         > 
         </overview-echars>
         <overview-echars 
         class="acview" 
         :obj='echart_obj[3]'
         v-if="flag4"
         :discoverDatas="viewDatas.discover"
         > 
         </overview-echars>
			</div>
	</div>
</template>

<script>
  import overviewEchars from './echars/index.vue'
  import servers from '@/modules/collector/api/overView'
  export default {
  	 name: "AcquisitionOverview",
  	 data () {
  	 	return {
  	 	  backgroundDiv1: {
            backgroundImage: 'url(' + require('@/assets/images/tmpCount.png') + ')'
          },
          backgroundDiv2: {
            backgroundImage: 'url(' + require('@/assets/images/taskCount.png') + ')'
          },
          backgroundDiv3: {
            backgroundImage: 'url(' + require('@/assets/images/objCount.png') + ')'
          },
          backgroundDiv4: {
            backgroundImage: 'url(' + require('@/assets/images/ruleCount.png') + ')'
          },
          echart_obj: [
            {
              id: 0,
              type: "myChart0",
              info: "模板所占比例及指标数量"
            },
            {
              id: 1,
              type: "myChart1",
              info: "任务数量"
            },
            {
              id: 2,
              type: "myChart2",
              info: "代理数量"
            },
            {
              id: 3,
              type: "myChart3",
              info: "已发现资源"
            }
          ],
          query_data:['agent','discover','task','template'],
          viewDatas: {
          	template: {
          	   tmp:[],
          	   kpi:[],
          	   total: ""
          	},
          	task: [],
          	agent: [],
          	discover: []
          },
          flag1: false,
          flag2: false,
          flag3: false,
          flag4: false,
          taskTotal: "",
          collectionTotal: "",
          ruleCountTotal: ""
          /*datas: {
          	 agent: {},
          	 discover: {},
          	 task: {},
          	 template: {}
          }*/
  	 	}
  	 },
  	 mounted(){
  	 	for( let i=0;i<this.query_data.length;i++ ) {
  	 		servers.query(this.query_data[i]).then( (res) => {
               if( i==0 ) {
                   this.viewDatas.agent.push(res.installedDeploymentNum,res.notInstalledDeploymentNum,res.runSuccNum,res.runFailNum)
                   this.flag3 = true
               }else if( i==1 ){
                   this.viewDatas.discover = res.discoverResultTotal
                   this.ruleCountTotal = res.ruleCountTotal
                   this.flag4 = true
               }else if( i==2 ){
                   this.taskTotal = res.taskTotal
                   this.collectionTotal = res.collectionTotal
                   this.viewDatas.task.push(res.taskAbnormalNumber,res.waitStartTaskTotal,res.startTaskTotal,res.taskStopNumber,res.taskNormalNumber)
                   this.flag2 = true
                   return
               }else if( i==3 ){
               	   this.viewDatas.template.total = res.total
                   this.viewDatas.template.tmp.push(res.platformRes,res.log,res.db,res.middleware,res.custom)
                   this.viewDatas.template.kpi.push(res.platformResKpiCount,res.logKpiCount,res.dbKpiCount,res.middlewareKpiCount,res.customKpiCount)
                   this.flag1 = true
                   console.log(this.viewDatas.template)
                   return
               }
  	 	   } )
  	 	}
  	 },
  	 components: {
  	 	overviewEchars
  	 }
  }
</script>

<style lang="scss" scoped>
  .container {
	  padding: 10px 20px;
	  background-color: #F5F5F5;
	}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }	
  .acRow {
  	background-image:  linear-gradient(-180deg, rgba(160,174,255,0.98) 0%, #6379FF 100%);
  	width: 264px;
  	height: 78px;
    border-radius: 4px;
    position: relative;
  }
  .acview {
  	background-image:  linear-gradient(-180deg, #FFFFFF 0%, #FFFFFF 100%);
  	width: 33rem;
  	height: 414px;
    border-radius: 4px;
    position: relative;
    display: inline-block;
    margin-right: 1rem;
    margin-bottom: 1rem;
    vertical-align: top;
  }
  .acRow .title {
  	position: absolute;
  	right: 7px;
  	top: 4px;
  	font-family: PingFangSC-Regular;
	font-size: 16px;
	color: #FFFFFF;
	text-align: right;
  }
  .acRow .info {
  	font-family: PingFangSC-Regular;
	font-size: 40px;
	padding-top: 1rem;
	color: #FFFFFF;
	text-align: center;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>