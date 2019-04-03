<template>
  <div class="monitor-container">
    <div class="RightRow1">
      <el-card>
        <el-form :inline="true" style="text-align:left;" class="demo-form-inline" label-position="left" label-width="70px" size="medium" ref="addForm">
          <!-- <el-form-item label="业务系统">
            <el-select v-model="params.bizSystem" style="margin-right: 20px;">
              <el-option v-for="item in options.bizSystem" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item> -->
          <span class="search_div">
             <label>代理状态:</label>
             <el-select v-model="params.agentRunningStatus" style="margin-right: 20px;">
              <el-option v-for="item in options.agentRunningStatus" :key="item.id" :label="item.name" :value="item.value" />
            </el-select>
           </span>
           <el-button class="btn_query" type="success"@click="queryAgent">
             <span>查询</span>
          </el-button>
          <el-button class="btn_reset"  @click="reset">
             <span>重置</span>
          </el-button>
          <!-- <el-form-item label="代理状态">
            <el-select v-model="params.agentRunningStatus" style="margin-right: 20px;">
              <el-option v-for="item in options.agentRunningStatus" :key="item.id" :label="item.name" :value="item.value" />
            </el-select>
          </el-form-item> -->
         <!--  <el-form-item label="代理类型">
           <el-select v-model="params.agent_type" style="margin-right: 20px;">
             <el-option v-for="item in options.Agent_type" :key="item.id" :label="item.name" :value="item.id" />
           </el-select>
         </el-form-item> -->
         <!--  <el-form-item label="IP地址" style="margin:0">
           <el-input style="width:200px;" v-model="params.hostIp" placeholder="请输入IP地址"></el-input>
         </el-form-item> -->
        </el-form>
      </el-card>
    </div>
    <div class="RightRow1">
      <el-card>
        <el-row class="btnInfo">
          <el-col :span="18">
            <button class="btn_add" @click="optAgent(tableSelection,'start')">
              <span>批量启动</span>
            </button>
            <button class="btn_other" @click="optAgent(tableSelection,'stop')">
                <span>批量停止</span>
            </button>
            <button class="btn_other" @click="optAgent(tableSelection,'reboot')">
                <span>批量重启</span>
            </button>
            <!-- <el-button type="primary"  @click="optAgent(tableSelection,'start')">批量启动</el-button>
            <el-button type="warning"  @click="optAgent(tableSelection,'stop')">批量停止</el-button>
            <el-button type="success"  @click="optAgent(tableSelection,'reboot')">批量重启</el-button> -->
          </el-col>
        </el-row>
        <el-table 
        ref="multhostIpleTable" 
        :data="dataList" 
        :row-style="rowClasss" 
        :cell-style="rowClasss"
        :header-cell-style="cellClass"
         tooltip-effect="dark"
         border 
         @selection-change="handleSelectionChange">
          <el-table-column 
              type="selection">
          </el-table-column>
          <el-table-column 
             prop="agent_id"
             label="代理ID">
          </el-table-column>
          <el-table-column 
             prop="deploy_obj_id"
             label="部署对象ID">
          </el-table-column>
           <el-table-column prop="agentLastVisit" label="最后上报时间">
            <template slot-scope="props">{{props.row.agentLastVisit | dateFilter}}</template>
          </el-table-column>
         <!--  <el-table-column 
            prop="deploy_obj_ip"
            label="IP" 
            width="132" >
         </el-table-column> -->
          <!-- <el-table-column 
             prop="bizSystem"
             label="业务系统" 
             width="120" >
          </el-table-column> -->
          <!-- <el-table-column 
             prop="name" 
             label="设备名称" 
             width="100">
           </el-table-column> -->
          <!-- <el-table-column 
            prop="hostIp" 
            label="IP"
             width="300">
           </el-table-column> -->
          <!-- <el-table-column 
             label="代理类型" 
             width="130">
             <template slot-scope="props">
                             <div v-for="(item,index) in props.row.agent_ability" :key="index">
                                               {{item.ability | filAb}}&nbsp;&nbsp;&nbsp;{{item.status | filAbstatus}}
                              </div> 
             </template>
           </el-table-column> -->
          <el-table-column prop="agent_running_status" label="代理状态">
            <template slot-scope="props">
              <div v-if="props.row.agentRunningStatus==1">
                <img :src="runImg" alt="启动">
              </div>
              <div v-if="props.row.agentRunningStatus==0">
                 <img :src="stopImg" alt="停止">
              </div>
            </template>
            <!-- <template slot-scope="props">
              <div v-if="props.row.agentRunningStatus==1" style="color: green">
                      {{props.row.agentRunningStatus  | filStatus}}
                </div>
                <div v-if="props.row.agentRunningStatus==0" style="color: red">
                      {{props.row.agentRunningStatus  | filStatus}}
                </div>
             </template> -->
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="props">
               <el-button v-if="props.row.agentRunningStatus==0" el-button type="text" size="small" @click.stop="optAgent(props.row,'start')" class="handle_text">
                  <!-- <img :src="runImg" alt="启动"> -->
                  <!-- <el-tooltip content="启动" placement="top" effect="light" class="item">
                    <span class="iconfont" style="color: rgba(95,195,150,1);">&#xe603;</span>
                  </el-tooltip> -->
                  启动
              </el-button>
              <el-button v-if="props.row.agentRunningStatus==1" el-button type="text" size="small" @click.stop="optAgent(props.row,'stop')"class="handle_text">
                  <!-- <img :src="stopImg" alt="停止"> -->
                  <!-- <el-tooltip class="item" effect="light" content="停止" placement="top">
                    <span class="iconfont" style="color: rgba(95,195,150,1);">&#xe60a;</span>
                  </el-tooltip> -->
                  停止
              </el-button>
              <el-button el-button type="text" size="small" @click.stop="optAgent(props.row,'reboot')"class="handle_text">
                  <!-- <img :src="stopImg" alt="停止"> -->
                  <!-- <el-tooltip class="item" effect="light" content="重启" placement="top">
                    <span class="iconfont" style="color: rgba(95,195,150,1);">&#xe63c;</span>
                  </el-tooltip> -->
                  重启
              </el-button>
              <el-button el-button type="text" size="small" @click.stop="jump(props.row.agent_id)"class="handle_text">
                  <!-- <img :src="followImg" alt="跟踪"> -->
                  <!-- <el-tooltip class="item" effect="light" content="跟踪" placement="top">
                  <span class="iconfont" style="color: rgba(95,195,150,1);">&#xe60b;</span>
                                  </el-tooltip> -->
                  跟踪
              </el-button>
              <!-- <el-button type="text" size="small"  @click="optAgent(props.row,'start')">启动</el-button>
              <el-button type="text" size="small"  @click="optAgent(props.row,'stop')">停止</el-button>
              <el-button type="text" size="small" @click="optAgent(props.row,'reboot')">重启</el-button> -->
            </template>
          </el-table-column>
          <!-- <el-table-column label="任务跟踪">
            <template slot-scope="props">
             <el-button el-button type="text" size="small" @click.stop="jump(props.row.agent_id)">跟踪</el-button>
             </template>
          </el-table-column> -->
        </el-table>
       <el-pagination class="pageLi" align="right" @size-change="taskSizeChange" @current-change="taskCurrentChange" :page-sizes="[10,20,40,100]"   :page-size="taskPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="taskPage.totalItems" :pager-count="5">
           </el-pagination>
      </el-card>
    </div>
    <!-- Agent详情-->
       <agent-detail 
         v-if="detailsDialog" 
         :details="selectData" 
         :tableDataEnd="tableDataEnd"
         :totalItems="agentList.length"
         :type="detailsDialog"
         @close="closeClog"
       ></agent-detail>
  </div>
</template>
<script>
import server from '@/modules/collector/api/agentManage';
import AgentDetail from '../components/detail'
import runImg from '@/assets/images/run.png'
import stopImg from '@/assets/images/stop.png'
export default {
   name: 'Agent',
   components: {
       AgentDetail
   },
  data() {
    return {
      runImg: runImg,
      stopImg: stopImg,
      activeName1: 'Agent',
      options: {
        bizSystem: [{
            id: 0,
            name: '全部'
          },
          {
            id: 1,
            name: '故障定位及多位展示'
          },
          {
            id: 2,
            name: '统一支付智能运营运维平台'
          },
          {
            id: 3,
            name: '能力开放平台'
          },
          {
            id: 4,
            name: '交易业务监控系统'
          }
        ],
        agentRunningStatus: [
          { value: '', name: '全部' },
          { value: 0, name: '离线' },
          { value: 1, name: '在线' }
        ],
        Agent_type: [{
            id: '0',
            name: '全部'
          },
          {
            id: '1',
            name: '日志采集代理'
          },
          {
            id: '2',
            name: '平台采集代理'
          }
        ]
      },
      // 查询条件对象
      params: {
        agentRunningStatus: ''
      },
      dataList: [],
      detailsDialog: false,
      selectData: {},
      hostIp_address: "",
      tableDataEnd: [],
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      flag: false,
      filterTableDataEnd: [],
      tableSelection: [],
      agentList: [],
      tableDataEnd: [],
      localPage: {
        pageSize: 2,
        currentPage: 1,
        totalItems: ''
      },
       taskPage: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0
      }
    }
  },
  filters: {
    filStatus: function(value) {
      return ['离线', '在线'][value];
    },
    filAb:function(value)
    {
         return ['Zabbix','Flume'][value];
    },
    filAbstatus:function(value){
         if(value)
         {
              value = "运行中";
         }else{
              value = "停止中"
         }
         return value;
    }
  },
  mounted() {
      this.queryAgent();
  },
  distroyed: function () {
　　clearInterval( setInterval(this.tim,10000))
},
  methods: {
     //分页
     taskSizeChange(val) {
      this.taskPage.pageSize = val;
       this.taskPage.currentPage = 1;
      this.queryAgent(this.taskPage.pageSize, this.taskPage.currentPage);
    },
     taskCurrentChange(val) {
      this.taskPage.currentPage = val;
      this.queryAgent(this.taskPage.pageSize, this.taskPage.currentPage);
    },
     tim(){
           this.queryAgent();
     },
    reset() {
      this.params = {
        agentRunningStatus: ''
      };
    },
    queryAgent(pageSize,currentPage) {
      if (!currentPage) {
              this.taskPage.currentPage = 1;
              this.taskPage.pageSize = 10;
            }
             let start = (this.taskPage.currentPage - 1) * this.taskPage.pageSize;
             let limit = this.taskPage.pageSize;
             console.log(this.params.agentRunningStatus);
      server.queryAgent(start,limit,this.params.agentRunningStatus).then(res => {
        this.dataList = res.data;
         this.taskPage.totalItems = res.count;
      });
    },
    optAgent(value, type) {
      if(type == "start")
      {
            this.$confirm('是否启动?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                type: 'error'
              }).then(() => {
                  handle(value,type)
                }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消启动'
                })
              })
      }
      if(type == "stop")
      {
          this.$confirm('是否停止?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                type: 'error'
              }).then(() => {
                  handle(value,type)
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消停止'
                  })
              })
      }
      if(type == "reboot")
      {
         this.$confirm('是否重启?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                type: 'error'
              }).then(() => {
                    handle(value,type)
                }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消重启'
                    })
              })
      }
      let handle = (value,type)=>{
          let params = {
                /*cis:[],*/
                Ips:[]
              }
            if (value.length === 0) {
              this.$message.warning("请勾选需要操作的代理！");
              return;
            }
            console.log(value);
            if( value instanceof Array ) {
                for( var i=0;i<value.length;i++ ) {
                   /* params.cis.push( value[i].deploy_obj_id )*/
                    params.Ips.push(value[i].deploy_obj_ip)
                }
            }else{
               /*if (typeof value.deploy_obj_id === 'string') {
                  params.cis.push(value.deploy_obj_id);
                } else {
                   params.cis = this.getAgentIds(value.deploy_obj_id);
                }*/
                if(value.deploy_obj_ip){
                   params.Ips.push(value.deploy_obj_ip)
                }
            }
            server.optAgent(params.Ips, type).then(res => {
              this.queryAgent();
              this.$message.success("操作成功！");
            setInterval(this.tim,10000);
            });
      }
    },
    getAgentIds(arr) {
      let ids = [];
      arr.map((item) => {
        ids.push(item);
      });
      return ids;
    },
    localCurrentChange(val) {
      this.tableDataEnd = [];
      this.localPage.currentPage = val;
      let totalPage = Math.ceil(this.localPage.totalItems / this.localPage.pageSize);
      console.log(totalPage)
      if (this.localPage.currentPage === totalPage) {
        for (let index = (this.localPage.currentPage - 1) * this.localPage.pageSize; index < this.localPage.totalItems; index++) {
          this.tableDataEnd.push(this.agentList[index]);
        }
      } else {
        for (let index = (this.localPage.currentPage - 1) * this.localPage.pageSize; index < this.localPage.currentPage * this.localPage.pageSize; index++) {
          this.tableDataEnd.push(this.agentList[index]);
        }
      }
    },
    rowClass({ row, rowIndex }) {
      return 'textAlign:center'
    },
    handleSelectionChange(val) {
      console.log(val)
      this.tableSelection = val
    },
    jump (id) {
    	this.$router.push({ name: 'trackTask', params: { agent_id: id }})
    },
    rowClasss({ row, rowIndex }) {
      return "cursor: pointer;textAlign:center;";
    },
    cellClass({ row, rowIndex }) {
      return "textAlign:center;background:rgba(244,248,249,1);color:rgba(102,102,102,1);font-weight:800;font-size:14px;";
    },
    /*see(row) {
      this.selectData = row;
      this.agentList = row.agent_ability;
      this.localPage.totalItems = this.agentList.length;
      if (this.localPage.totalItems > this.localPage.pageSize) {
        for (let index = 0; index < this.localPage.pageSize; index++) {
          this.tableDataEnd.push(this.agentList[index]);
        }
      } else {
        this.tableDataEnd = this.agentList;
      }
      this.detailsDialog = true
    },*/
    closeClog () {
         this.detailsDialog = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    doFilter() {
      if (this.hostIp_address == "") {
        this.$message.warning("查询条件不能为空！");
        return;
      }
      this.tableDataEnd = []
      //每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = []
      this.agentList.forEach((value, index) => {
        if (value.hostIp_address) {
          if (value.hostIp_address.indexOf(this.agentList) >= 0) {
            this.filterTableDataEnd.push(value)
          }
        }
      });
      //页面数据改变重新统计数据数量和当前页
      this.currentPage = 1
      this.totalItems = this.filterTableDataEnd.length
      //渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd)
      //页面初始化数据需要判断是否检索过
      this.flag = true
    },
    openData() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      //需要判断是否检索
      if (!this.flag) {
        this.currentChangePage(this.tableDataEnd)
      } else {
        this.currentChangePage(this.filterTableDataEnd)
      }
    }, //组件自带监控当前页码
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize;
      let to = this.currentPage * this.pageSize;
      this.tableDataEnd = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from]);
        }
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.monitor-container {
  padding: 10px 20px;
  background-color: #f5f5f5;
  .btnInfo {
    margin-bottom: 12px;
  }

  .set-item-show {
    color: skyblue;
    font-size: 12px;
    vertical-align: bottom;
    cursor: pointer;
  }

  #preForm {
    .el-select {
      width: 185px;
    }

    .el-date-editor {
      width: 185px;
    }
  }

  #current-alertbtn {
    padding-left: 200px;
  }

  #myChart {
    z-index: 998;
  }
}

.RightRow1 {
  height: auto;
  margin: 20px 0;
  border-radius: 5px;
}

.conRight /deep/ {
  .is-active {
     background-color: #fff !important;
  }
  .el-tabs__header {
    margin:0;
  }
}

/deep/ .el-pagination {
  margin-top: 10px;
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
.el-table {
  text-align: center;
}

.el-form {
  text-align: center;
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

.bg-purple-dark {
  background: #99a9bf;
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

.rbtn {
  float: right;
  position: relative;
  top: -20px;
  text-align: center;
}
.search_div {
  margin-right: 15px;
  label {
      width:56px;
      height:14px;
      font-size:14px;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(0,0,0,1);
      line-height:14px;
      opacity:0.7;
  };
  input {
    width:230px;
    height:34px;
    border:1px solid rgba(220,223,230,1);
    border-radius:4px;  
    padding: 0 10px 3px;
    outline:none;
  };
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
  input::-moz-placeholder{
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
  input::-ms-input-placeholder{
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
.btn_query {
  width:64px;
  height:34px;
  background:rgba(66,185,131,1);
  border-radius:4px;  
  padding:8px;
  span {
    width:27px;
    height:14px;
    font-size:14px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:14px;
  }
}
.btn_reset {
  width:64px;
  height:34px;
  background:rgba(244,248,249,1);
  border-radius:4px;
  padding:8px;
  span {
    width:28px;
    height:14px;
    font-size:14px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(0,0,0,1);
    line-height:14px;
    opacity:0.7;
  }
}
.btn_add {
  width:90px;
  height:33px;
  background:rgba(66,185,131,1);
  border-radius:4px;
  border: none;
  cursor: pointer;
  outline:none;
  span {
    width:56px;
    height:14px;
    font-size:14px;
    font-family:PingFang-SC-Bold;
    color:rgba(255,255,255,1);
    line-height:14px;
  }
}

.btn_other {
  width:92px;
  height:34px;
  background:rgba(244,248,249,1);
  border-radius:4px;
  border-color: #f4f8f9;
  border: none;
  cursor: pointer;
  outline:none;
  span {
      width:56px;
      height:14px;
      font-size:14px;
      font-family:PingFang-SC-Bold;
      color:rgba(0,0,0,1);
      line-height:14px;
      opacity:0.7;
  }
}
.handle_text {
  width:28px;
  height:14px;
  font-size:12px;
  font-family:PingFang-SC-Heavy;
  font-weight:800;
  color:rgba(66,185,131,1);
  line-height:20px;
}
</style>
