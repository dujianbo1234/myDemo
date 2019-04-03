<template>
    <div class="">
          <div class="RightRow1">
          	 <el-card>
                <!-- 列表显示详情 -->
                  <div class="colls" v-if="show.task === false || show.template === false || show.agent === false">
                      <span 
                       v-if="collapses === false"
                       class="iconfont"  
                       @click="showColl" 
                       style="color: rgba(95,195,150,1);"
                       >&#xe67e;
                      </span>
                      <span 
                       v-if="collapses === true"
                       class="iconfont"  
                       @click="showColl" 
                       style="color: rgba(95,195,150,1);"
                       >&#xe679;
                      </span>
                      <strong>模板跟踪详情</strong>
                  </div>
                    <div v-if="collapses">        
                      <div  v-if="show.task === false">
                          <el-tabs v-model="activeName_detail" @tab-click="handleClick_detail">
                            <el-tab-pane  name="three">
                         <span slot="label"  :class="{ label_pane:activeName_detail==='three' }">查看模板</span>
                            <div class="monitor-obj" style="padding:10px 20px">
                              <el-form :inline="true" style="text-align:left;" :model="taskData" class="demo-form-inline" label-position="right" label-width="100px" size="medium" ref="detailForm">
                                <span class="sp"><span>任务详情</span></span>
                                  <div class="logAdd-obj">
                                    <div class="log_div">
                                      <span style="margin-left: 1rem;">
                                        <label>任务名称:</label>
                                           <input :disabled="true" v-model="taskData.task_name">
                                      </span>
                                    </div>
                                  </div>
                                 <span class="sp"><span>模板信息</span></span>
                                 <Clog  :type.sync="tasktmpData.template_type" :quotaData="tasktmpData" :selectData="tasktmpData" ref="clog1" :statu="1" ></Clog>
                              </el-form>
                            </div>
                          </el-tab-pane>
                            <el-tab-pane  name="four">
                            <span slot="label"  :class="{ label_pane:activeName_detail==='four' }">采集对象</span>
                                 <el-form :inline="true" style="text-align:left;" class="demo-form-inline" label-position="left" label-width="80px" size="medium">
                                <div class="search_input" style="padding: 14px 0;">
                                 <span>
                                   <label>对象名称:</label>
                                     <input style="width:260px;height:34px;border-radius:4px;border:1px solid rgba(220,223,230,1);outline: none;padding: 0 6px;" placeholder="请输入指标名称" v-model="search">
                                   </span>
                                </div>
                              <!--   <el-form-item label="对象名称">
                                <el-input v-model="search" placeholder="请输入对象名称"></el-input>
                              </el-form-item> -->
                              <!--   <el-button type="primary" class="mrl"  @click="getTmps()">搜索</el-button> -->
                              <el-table ref="multipleTable2" :data="collectorObj" tooltip-effect="dark" border :header-cell-style="rowClass" @selection-change="quotaSelection" style="margin-bottom: 10px;" :row-key="getRowKeys" :cell-style="cellsClass">
                                <el-table-column type="selection" width="55" :reserve-selection="true">
                                </el-table-column>
                                <el-table-column prop="ciid" label="资源对象ID">
                                </el-table-column>
                                <el-table-column prop="ciname" label="资源对象名称">
                                </el-table-column>
                                <el-table-column prop="location" label="所在机房">
                                </el-table-column>
                                <el-table-column prop="ip" label="IP地址">
                                </el-table-column>
                              </el-table>
                                </el-form>
                              <el-pagination align="right" @size-change="localSizeChange" @current-change="localCurrentChange" :current-page="localPage.currentPage" :page-sizes="[ 2,5]" :page-size="localPage.pageSize" layout=" prev, pager,next,total, sizes, jumper" :total="collectorObj.length" :pager-count="5">
                              </el-pagination>
                          </el-tab-pane>
                          </el-tabs>
                        </div>
                     <div v-if="show.template === false">
                      <span class="sp"><span>查看模板</span></span>
                      <Clog  
                        :type="templateData.types" 
                        :quotaData="templateData" 
                        :selectData="templateData"
                        :statu="1"
                        >
                      </Clog>
                    </div>
                    <div v-if="show.agent === false">
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
                      </div>
                    </div>
                 <el-table 
                   ref="multipleTable" 
                   :data="dataList" 
                   empty-text="暂无任务执行"
                   tooltip-effect="dark" 
                   border 
                   :header-cell-style="thClass"
                   :cell-style="rowClass" 
                   @selection-change="handleSelectionChange" 
                   >
	      <el-table-column 
              label="父任务ID" 
              v-if="show.task"
	            width="155" >
                   <template slot-scope="scope">
                      <el-button class=" btStyle"type="text" size="small" @click.stop="showDetail(scope.row,'task')">{{scope.row.task_id}}</el-button>
                   </template>
	          </el-table-column>
	          <el-table-column  
	            label="子任务ID" 
	            width="155">
	             <template slot-scope="scope">{{scope.row.agent_task_id}}</template>
	          </el-table-column>
	          <el-table-column 
	            label="模板ID"
              v-if="show.template"
	            width="155">
                   <template slot-scope="scope">
                      <el-button class=" btStyle"type="text" size="small" @click.stop="showDetail(scope.row,'tmp')">{{scope.row.template_id}}</el-button>
                   </template>
	          </el-table-column>
	          <el-table-column 
	           label="代理ID" 
             v-if="show.agent"
	           width="215">
                   <template slot-scope="scope">
                          <el-button class=" btStyle"type="text" size="small" @click.stop="showDetail(scope.row,'agent')">{{scope.row.agent_id}}</el-button>
                   </template>
	          </el-table-column>
	          <el-table-column 
	            label="采集对象" 
	            width="160">
                    <template slot-scope="scope">
                          <el-button class=" btStyle"type="text" size="small" @click.stop="showDetail(scope.row,'obj')">{{scope.row.collect_obj_id}}</el-button>
                   </template>
	          </el-table-column>
	          <el-table-column  label="任务状态" width="100">
	          	<!--  <template  slot-scope="scope">
                 <div  :class="{ execgreen: scope.row.exec_result,execred:!scope.row.exec_result,execblack: scope.row.exec_result==null}"> {{scope.row.exec_result | statusFilter}} </div>
                            </template> -->
              <template slot-scope="scope">
              <div v-if="scope.row.exec_result==true" style="padding-top: 8px;">
                <img :src="runImg" alt="启动">
              </div>
              <div v-if="scope.row.exec_result==false" style="padding-top: 8px;">
                 <img :src="stopImg" alt="停止">
              </div>
            </template>
	          </el-table-column>
	            <el-table-column  label="详细信息" >
                     <template slot-scope="scope">
                           <span 
                              :title="scope.row.exec_msg" 
                              class=" btStyle"
                              @click.stop="showDetail(scope.row,'msgs')">
                             查看
                          </span>
                   </template>
	          </el-table-column>
	        </el-table>
	    <el-pagination 
    	            :style="pageStyle"
                  class="pageLi"
          	       align="right" 
          	       @size-change="taskSizeChange" 
          	       @current-change="taskCurrentChange" 
          	       :page-sizes="[10,20,40,100]"   
          	       :page-size="pageSize" 
          	       layout="total, sizes, prev, pager, next, jumper" 
          	       :total="totalItems" 
          	       :pager-count="5"
          	       >
                </el-pagination>
          	 </el-card>
          </div>
           <!-- 详情组件 -->
           <div v-if="show.task && taskShow">
            <el-dialog 
               :visible.sync="show.task"
                width='52%' id="dialog" 
                :close-on-click-modal="false"
                @close="closea()">
                <el-tabs v-model="activeName_detail" @tab-click="handleClick_detail">
                <el-tab-pane  name="three">
             <span slot="label"  :class="{ label_pane:activeName_detail==='three' }">查看模板</span>
                <div class="monitor-obj" style="padding:10px 20px">
                  <el-form :inline="true" style="text-align:left;" :model="taskData" class="demo-form-inline" label-position="right" label-width="100px" size="medium" ref="detailForm">
                    <span class="sp"><span>任务详情</span></span>
                      <div class="logAdd-obj">
                        <div class="log_div">
                          <span style="margin-left: 1rem;">
                            <label>任务名称:</label>
                               <input :disabled="true" v-model="taskData.task_name">
                          </span>
                        </div>
                      </div>
                     <span class="sp"><span>模板信息</span></span>
                     <Clog  :type.sync="tasktmpData.template_type" :quotaData="tasktmpData" :selectData="tasktmpData" ref="clog1" :statu="1" ></Clog>
                  </el-form>
                </div>
              </el-tab-pane>
                <el-tab-pane  name="four">
                <span slot="label"  :class="{ label_pane:activeName_detail==='four' }">采集对象</span>
                     <el-form :inline="true" style="text-align:left;" class="demo-form-inline" label-position="left" label-width="80px" size="medium">
                    <div class="search_input" style="padding: 14px 0;">
                     <span>
                       <label>对象名称:</label>
                         <input style="width:260px;height:34px;border-radius:4px;border:1px solid rgba(220,223,230,1);outline: none;padding: 0 6px;" placeholder="请输入指标名称" v-model="search">
                       </span>
                    </div>
                  <!--   <el-form-item label="对象名称">
                    <el-input v-model="search" placeholder="请输入对象名称"></el-input>
                  </el-form-item> -->
                  <!--   <el-button type="primary" class="mrl"  @click="getTmps()">搜索</el-button> -->
                  <el-table ref="multipleTable2" :data="collectorObj" tooltip-effect="dark" border :header-cell-style="rowClass" @selection-change="quotaSelection" style="margin-bottom: 10px;" :row-key="getRowKeys" :cell-style="cellsClass">
                    <el-table-column type="selection" width="55" :reserve-selection="true">
                    </el-table-column>
                    <el-table-column prop="ciid" label="资源对象ID">
                    </el-table-column>
                    <el-table-column prop="ciname" label="资源对象名称">
                    </el-table-column>
                    <el-table-column prop="location" label="所在机房">
                    </el-table-column>
                    <el-table-column prop="ip" label="IP地址">
                    </el-table-column>
                  </el-table>
                    </el-form>
                  <el-pagination align="right" @size-change="localSizeChange" @current-change="localCurrentChange" :current-page="localPage.currentPage" :page-sizes="[ 2,5]" :page-size="localPage.pageSize" layout=" prev, pager,next,total, sizes, jumper" :total="collectorObj.length" :pager-count="5">
                  </el-pagination>
              </el-tab-pane>
              </el-tabs>
                <div slot="footer" class="dialog-footer" align='center'>
                  <el-button @click="closeDialog('detailForm');activeName_detail='three';">关闭 </el-button>
                </div>
              </el-dialog>
              <!-- <Clog v-if="tmpDialog" :type="tmpType" :quotaData="list" :selectData="tmpDetails" ref="clog" @closeClog="closeClog('1')"></Clog> -->
           </div>
           <!-- 详细信息弹框 -->
          <div v-if="msgShow">
                <el-dialog 
               :visible.sync="msgShow"
                width='50%' 
                :close-on-click-modal="false"
                @close="msgShow = false"
                >
                <span class="sp"><span>详细信息</span></span>
                <div class="logAdd-obj">
                  <div class="log_div">
                     <span style="margin-left: 1rem;">{{msg}}</span>
                  </div>
                </div>
                <!-- <div class="monitor-obj" style="padding:10px 20px">
                          <el-input
                           type="textarea"
                           :disabled="true"
                           autosize
                           v-model="msg">
                          </el-input>
                </div> -->
                <div slot="footer" class="dialog-footer" align='center'>
                <!--   <el-button @click.stop="msgShow = false">关闭 </el-button> -->
                </div>
              </el-dialog>
          </div>
    </div>
</template>

<script>
import * as tmpServer from '@/modules/collector/api/tmpManage';
import runImg from '@/assets/images/run.png'
import stopImg from '@/assets/images/stop.png'
import Clog from '../../Clog'
   export default {
   	name: "TracktaskTable",
   	props: {
   	     dataList: Array,
   	     totalItems: Number,
           //各个详细数据
           taskData: Object,
           tasktmpData: Object,
           collectorObj: Array,
           agentData: Object,
           show: Object,
           templateData: Object
   	},
   	components: {
   	     Clog
   	},
    computed: {
        filterTabledataend: function() {
        var that = this;
        return this.tableDataEnd.filter((item) => {
          if (item.resource_name) {
            return item.resource_name.match(that.search)
          }
        });
      }
    },
    watch: {
      tasktmpData: function(n,o){
        this.tasktmpData = n
        this.seeTmp(this.tasktmpData)
        if(this.tasktmpData) {
             this.taskShow = this.tasktmpData.taskShow
        }
      }
    },
    mounted (){
      console.log(this.templateData)
    },
   	data () {
   	     return {
          activeName: 1,
          search: "",
          activeName_detail: "three",
   	     	currentPage: 1,
   	     	pageSize: 10,
          runImg:runImg,
          stopImg:stopImg,
   	     	pageStyle: {
                              marginTop: '1.1rem'
   	     	},
   	     	tdStyle: {
   	     	      cursor: "pointer"
   	     	},
           tempData: {},
           tmpDetails: {},
           tmpType: '',
           list: {},
           tmpDialog: false,
            radio: '',
            curRadio: '',
            currentData: [],
   	     	taskShow: false,
             msgShow: false,
             msg: "",
             localPage: {
                pageSize: 5,
                currentPage: 1,
                totalItems: 0
              },
              collapses: false
   	     }
   	},
   	methods: {
      showColl () {
         this.collapses = !this.collapses
      },
      closea () {
        this.show.task = true;
        this.taskShow = false;
        console.log(this.show.task)
      },
      getRowKeys(row) {
      return row.resource_id;
      },
      rowClass({ row, rowIndex }) {
      return "textAlign:center;background:rgba(244,248,249,1);";
      },
       cellsClass({ row, rowIndex }) {
      return "textAlign:center;";
      },
      quotaSelection(val) {
      this.objSelection = val;
      },
      localCurrentChange(val) {
      this.tableDataEnd = [];
      this.localPage.currentPage = val;
      let totalPage = Math.ceil(this.localPage.totalItems / this.localPage.pageSize);
      if (this.localPage.currentPage === totalPage) {
        for (let index = (this.localPage.currentPage - 1) * this.localPage.pageSize; index < this.localPage.totalItems; index++) {
          this.tableDataEnd.push(this.obj_list[index]);
        }
      } else {
        for (let index = (this.localPage.currentPage - 1) * this.localPage.pageSize; index < this.localPage.currentPage * this.localPage.pageSize; index++) {
          this.tableDataEnd.push(this.obj_list[index]);
        }
      }
      this.toggleSelection();
    },
      localSizeChange(val) {
      this.tableDataEnd = [];
      this.localPage.pageSize = val;
      if (this.localPage.totalItems > this.localPage.pageSize) {
        for (let index = 0; index < this.localPage.pageSize; index++) {
          this.tableDataEnd.push(this.obj_list[index]);
        }
      } else {
        this.tableDataEnd = this.obj_list;
      }
      this.toggleSelection();
    },
      handleClick_detail(tab, event){
        console.log(tab, event);  
       },
   	     rowClass( { row, column, rowIndex, columnIndex } ) {
                         return "textAlign: center;" 
	    },
          thClass ({ row, rowIndex }) {
               return "textAlign:center;background:rgba(244,248,249,1);color:rgba(102,102,102,1);font-weight:800;font-size:14px;"; 
          },
	    handleSelectionChange(val) {
	      this.multipleSelection = val;
	    },
	    //分页
	    taskSizeChange(val) {
	      this.pageSize = val;
	      this.currentPage = 1;
	      this.$emit('query', {pageSize: this.pageSize, currentPage: this.currentPage})
	    },
	    taskCurrentChange(val) {
	      this.currentPage = val;
	      this.$emit('query', {pageSize: this.pageSize, currentPage: this.currentPage})
	    },
	    //查看各种详情
	    showDetail ( row, type ) {
                if( type == "task") {
                      this.$emit('queryDetail',{id: row.task_id,type: type})
                }else if( type == "tmp" ) {
                      this.$emit('queryDetail',{id: row.template_id,type: type})
                }else if( type == "agent" ) {
                      this.$emit('queryDetail',{id: row.agent_id,type: type})
                }else if( type == "obj" ) {
                      this.$emit('queryDetail',{id: row.collect_obj_id, type: type})
                }else if( type == "msgs" ) {
                      var msg = row.exec_msg
                      if(msg) {
                           this.msg = msg.join("\n")
                           this.msgShow = true
                      }else {
                            this.$message({ type: "info",message: "没有信息" })
                      }
                      
                }
	    },
         closeDialog(f) {
            /*this.radio = '';
            this.curRadio = '';
            this.currentData = [];
            this.$refs.multipleTable2.clearSelection();*/
            this.$refs[f].resetFields();
            /*this.$emit('query');*/
            this.taskShow = false;
          },
          selectable(row, index) {
            if (row) {
              return false;
            }
          },
           seeTmp(row) {
                let resource_type = row.resource_type;
                  if(row.resource_type)
                  {
                      tmpServer.query_resource().then( res => {
                              for( let i=0;i<res.length;i++ ) {
                                    if( row.resource_type === res[i].uri ) {
                                          row.resource_type = res[i].uri_alias
                                    }
                              }
                      } )
                  }
                let types = ['platform', '', 'middleware', 'log', 'database', 'customize'];
                row.template_type = types[row.template_type];
                if (row.template_type === 1) {
                  row.template_type = 'platform';
                }
              },
           closeClog(type) {
              if(type == 1) {
                  this.tmpDialog = false;
              }
            },
   	}
   }
</script>

<style lang="scss" scoped>
  .btStyle {
       color: #42B983;
       overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      cursor: pointer;
  }
  .execred {
      color: red
  }
  .execgreen {
      color: green
  }
  .execblack {
      color: black
  }
  /deep/.el-pagination .el-pager li.active{
    min-width: 28px;
    height: 28px;
    background: rgba(66,185,131,1);
    font-size: 14px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 28px;
    border-radius:3px;
}

/deep/ .el-dialog__body {
   padding: 0px 20px;
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
  .label_pane {
  width:64px;
  height:20px;
  font-size:15px;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(66,185,131,1);
  line-height:20px;
}
.search_input {
    input::-webkit-input-placeholder{
        color: rgba(0,0,0,1);
        width:98px;
        height:14px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:14px;
        opacity:0.3; 
       };
  }
  .colls {
      background: rgba(66,185,131,0.10);
      border: 1px solid #42B983;
      border-radius: 4px 4px 0px 0px;
      padding: 14px;
      span{
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #42B983;
        letter-spacing: 0;
        line-height: 20px;
        cursor: pointer;
      }
      strong{
        margin-left: 0.4rem;
        color: #42B983;
      }
  }
</style>