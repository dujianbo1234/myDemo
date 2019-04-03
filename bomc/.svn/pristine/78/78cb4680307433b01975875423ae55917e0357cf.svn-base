<template>
    <div class="monitor-container">
          <tracktask-header @query="trackQuery"></tracktask-header>
          <tracktask-table 
           @query="trackQuery"
           :dataList="dataList"
           :taskData="taskData"
           :tasktmpData="tasktmpData"
           :collectorObj="collector_obj"
           :totalItems="count"
           :show="show"
           :templateData="templateData"
           :agentData="agentData"
           @queryDetail="query_detail"
           ></tracktask-table>
            <!-- 模板详情 -->
          <el-dialog 
               :visible.sync="show.template && templateShow"
                width='45%' 
                :close-on-click-modal="false"
                @close="closeClog('tmp')"
                >
          <span class="sp"><span>查看模板</span></span>
          <Clog  :type="tmpType" :quotaData="tmpData" :selectData="tmpData" :statu="1" ref="clog_tmp"></Clog>
        </el-dialog>
          <!--采集对象详情-->
            <el-dialog 
               :visible.sync="objShow"
                width='50%' 
                :close-on-click-modal="false"
                class="diyStyle"
                @close="closeClog('obj')"
                >
                <span class="sp" style="margin-left: 20px;"><span>采集对象详情</span></span>
                <div class="monitor-obj" style="padding:10px 20px">
                  <el-form :inline="true" style="text-align:left;" :model="objData" class="demo-form-inline" label-position="right" label-width="100px" size="medium" ref="detailForm">
                       <div class="logAdd-obj">
                         <div class="log_div">
                            <span style="margin-left: 1rem;">
                              <label>采集对象编号:</label>
                                 <input :disabled="true" v-model="objData.ciid">
                            </span>
                            <span style="margin-left: 3rem;">
                              <label>资源对象名称:</label>
                                <input :disabled="true" v-model="objData.ciname">
                            </span>
                          </div>
                          <div class="log_div">
                            <span style="margin-left: 3.7rem;">
                              <label>IP地址:</label>
                                 <input :disabled="true" v-model="objData.ip">
                            </span>
                          </div>
                       </div>
                  </el-form>
                </div>
              </el-dialog>
               <!--agent详情-->
            <el-dialog 
               :visible.sync="show.agent && agentShow"
                width='53%' 
                class="diyStyle"
                :close-on-click-modal="false"
                @close="closeClog('agent')"
                >
                <span class="sp" style="margin-left: 20px;"><span>agent详情</span></span>
                <div class="monitor-obj" style="padding:10px 20px">
                  <el-form :inline="true" style="text-align:left;" :model="agentData" class="demo-form-inline agent_style" label-position="right" label-width="100px" size="medium" ref="detailForm">
                    <div class="logAdd-obj">
                         <div class="log_div">
                            <span style="margin-left: 1rem;">
                              <label>代理ID:</label>
                                 <input :disabled="true" v-model="agentData.agent_id">
                            </span>
                            <span style="margin-left: 3rem;">
                              <label>部署对象ID:</label>
                                <input :disabled="true" v-model="agentData.deploy_obj_id">
                            </span>
                          </div>
                          <div class="log_div">
                            <span style="margin-left: 1rem;">
                              <label>代理状态:</label>
                              <span class="agent_tmp">{{agentData.agentRunningStatus | filStatus}}</span>
                            </span>
                            <span style="margin-left: 12.6rem;">
                              <label>最后上报时间:</label>
                              <span class="agent_tmp">{{agentData.agentLastVisit | dateFilter}}</span>
                            </span>
                          </div>
                          <div class="log_div">
                            <span style="margin-left: 1rem;">
                              <label>代理类型:</label>
                               <span  class="agent_div">
                                 <span v-for="(item,index) in agentData.agent_ability" :key="index">
                                               {{item.ability | filAb}}&nbsp;&nbsp;&nbsp;{{item.status | filAbstatus}}&nbsp;&nbsp;&nbsp;&nbsp;
                                 </span> 
                               </span>
                            </span>
                          </div>
                       </div>
                  </el-form>
                </div>
                <!-- <div slot="footer" class="dialog-footer" align='center'>
                  <el-button @click.stop="closeClog('agent')">关闭 </el-button>
                </div> -->
              </el-dialog>
    </div>
</template>

<script>
  import * as tmpServer from '@/modules/collector/api/tmpManage'
  import server from '@/modules/collector/api/trackTask'
  import TracktaskHeader from './components/Header'
  import TracktaskTable from './components/Table'
  import Clog from '../Clog'
  export default {
  	name: "trackTask",
  	components: {
                  TracktaskHeader,
                  TracktaskTable,
                  Clog
  	},
  	data () {
  	     return {
              type: "",
              currentPage: 1,
              pageSize: 10,
              dataList: [],
              count:0,
	           //任务详情集合
	            taskData: {},
	            tasktmpData: {},
	            collector_obj: [],
	            resource: '',
	           //模板详情数据
	            tmpData: {},
              templateData: {},
	            agentData: {},
	            objData: {},
	            templateShow: false,
	            objShow: false,
	            agentShow: false,
	            tmpType: "",
              value: 'SaaS',
              label: 'SaaS',
              show: {
                task: true,
                template: true,
                agent: true
              }
  	     }
  	},
    created() {
    this.trackQuery();
  },
  	methods: {
  	      trackQuery (val) {
                   if ( val ) {
                      if ( val.task_id ) {
                          let type = { id:val.task_id,type:"task"}
                          this.query_detail(type)
                          this.show.task = false
                          this.show.template = true
                          this.show.agent = true
                         } else if ( val.template_id ) {
                           let type = { id:val.template_id,type:"tmp"}
                           this.query_detail(type)
                              this.show.template = false
                              this.show.task = true
                              this.show.agent = true
                         } else if( val.agent_id ) {
                           let type = { id:val.agent_id,type:"agent"}
                           this.query_detail(type)
                              this.show.agent = false
                              this.show.task = true
                              this.show.template = true
                         }else {
                              this.show.task = true
                              this.show.template = true
                              this.show.agent = true 
                              this.templateShow = false
                              this.agentShow = false
                         }
                   }
                   /*this.tasktmpData = {};*/
                   this.collector_obj = [];
                    let params = {};
                   if(val)
                   {
                       if( val.currentPage )
                       {
                             this.currentPage = val.currentPage
                             this.pageSize = val.pageSize
                       }else {
                             params = val
                             this.currentPage = 1;
                             this.pageSize = 10;
                       }
                   }
	         let start = (this.currentPage - 1) * this.pageSize;
                      let limit = this.pageSize;
                      server.query(start, limit, params).then(this.handleGetDataSucc);
  	      },
  	      handleGetDataSucc (res){
  	      	let data = res.data;
  	      	if(res.data){
                               this.dataList = data
                               this.count = data.length
  	        	}
  	      },
          //查询各详细信息
          query_detail (params) {
               let id = params.id
               let type = params.type
               this.type = params.type
              //任务详情请求
              if(type == "task") {
                    server.query_task(id).then(this.handleGetDetailDataSucc).catch(this.handelError)
                  /*  if( params.flag == 0 ){
                        this.tasktmpData.taskShow = false
                    }
              console.log(this.tasktmpData)*/
              }else if( type == "tmp" ) {
                    server.query_tmp(id).then(this.handleGetDetailDataSucc)
              }else if( type == "agent" ) {
                    server.query_agent(id).then(this.handleGetDetailDataSucc)
              }else if( type == "obj" ) {
                    server.queryCollector(null,id).then(this.handleGetDetailDataSucc)
              }
          },
          handelError (error) {
               return 
          },
          handleGetDetailDataSucc (res){
                if(this.type == "task") {
                     this.taskData = res
                     var that = this;
                       tmpServer.queryById(this.taskData.template_id).then(function(res){
                        that.tasktmpData = res;
                        that.tasktmpData.taskShow = that.show.task
                        that.radio = 0;
                        });
                     //获取采集对象
                     var coll_arr = [];
                     res.collect_obj_ids.forEach( function(item){
                            server.queryCollector(null,item).then( res => {
                                   if(res.datas)
                                   {
                                         Object.getOwnPropertyNames(res.datas).forEach(function(key,index){
                                              coll_arr.push(res.datas[key][index]) 
                                          });
                                   }
                            } )
                     } )
                     this.collector_obj = coll_arr;
                }else if( this.type == "tmp" ) {
                      this.tmpData = res
                      let resource_type = res.resource_type;
                      //检测两个点分别出现的位置
                       if(resource_type)
                      {
                          tmpServer.query_resource().then( res => {
                                  for( let i=0;i<res.length;i++ ) {
                                        if( resource_type === res[i].uri ) {
                                              this.tmpData.resource_type = res[i].uri_alias
                                        }
                                  }
                          } )
                      }
                      let types = ['platform', '', 'middleware', 'log', 'database', 'customize'];
                       this.tmpType = types[this.tmpData.template_type]
                       this.tmpData.types = this.tmpType
                       this.templateData = this.tmpData
                       this.templateShow = true;
                }else if( this.type == "agent" ) {
                       this.agentData = res
                       this.agentShow = true
                }else if( this.type == "obj" ) {
                      if( res.count != 0 ) {
                            var that = this
                            Object.getOwnPropertyNames(res.datas).forEach(function(key){
                                that.objData = res.datas[key][0]
                            });
                             this.objShow = true
                      } else {
                            this.$message( {
                                 type: "info",
                                 message: "没有对应数据"
                            } )
                            return
                      }
                }
          },
          closeClog (typ) {
                 if( typ == 'tmp' ) {
                      /*this.$refs.clog_tmp.close()*/
                      this.templateShow = false
                 }else if( typ == 'obj' ) {
                      this.objShow = false
                 }else if( typ == 'agent' ) {
                      this.agentShow = false
                 }
          }
  	}
  }
</script>

<style lang="scss" scoped>
 .monitor-container {
  padding: 10px 20px;
  background-color: #f9f9f9;
   }
  .RightRow1 {
  height: auto;
  margin: 20px 0;
  border-radius: 5px;
  }
.conRight /deep/ .is-active {
    background-color: #fff !important;
  }
 .rbtn {
  float: right;
  position: relative;
  top: -20px;
  text-align: center;
}
 .diyStyle /deep/ .el-dialog__header{
      padding: 0;
 }
.agent_style /deep/ .logAdd-obj{
  input{
     width: 207px;
  }
}
.agent_div {
    height: 74px;
    background: #f5f7fa;
    width: 185px;
    text-align: center;
}
.agent_tmp {
    background: #f5f7fa;
    border-radius: 5px;
    width: 185px;
}
.sp {
    display: inline-block;
    height: 20px;
    color: #42B983;
    font-weight: bold;
    margin-top: 10px;

    span {
      padding-left: 10px;
      border-left: 3px solid #42B983;
    }

    i {
      padding-left: 10px;
    }
  }
  .logAdd-obj {
    width:auto;
  height:auto;
  background:rgba(244,248,249,1);
  border-radius:4px;
  label {
    width:70px;
    height:20px;
    font-size:14px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(0,0,0,0.4);
    line-height:20px;
  };
  input {
    width:auto;
    height:20px;
    font-size:14px;
    background: none;
    border: none;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(0,0,0,0.7);
    line-height:20px;
  };
  .log_div {
    padding: 14px 0;
  };
  }
</style>