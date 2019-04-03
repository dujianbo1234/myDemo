<template>
  <div class="pushManage-container">
    <el-card>
      <div class="pushLogContent">
        <el-form
          :inline="true"
          :model="pushLogData"
          label-position="right"
          label-width="100px"
          size="small"
          id="pushLogSearchStyle"
          >
          <el-row>
            <el-col :span="6">
              <el-input v-model="pushLogData.name" @keyup.native="nameSearch" placeholder="请输入策略名称"></el-input>
            </el-col>
            <el-col :span="6">
              <el-select v-model="channelLog" multiple placeholder="请选择推送渠道">
                <el-option
                  v-for="item in pushchannelData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="12">
              <el-button class='greenStyleBtn' @click="getPushLogSingleData(1,true)">查询</el-button>
              <el-button class='defaultBtn' @click="resetLog">重置</el-button>
              <el-button class='defaultBtn' @click="pushLogExportAll">导出</el-button>
              <span class="btn_set" @click="searchItemDown" v-show="!searchItemShow">
                <i class="el-icon-d-arrow-right btn_rote" style="color: #42B983;"></i>
             </span>
              <span class="btn_set" @click="searchItemDown" v-show="searchItemShow">
                <i class="el-icon-d-arrow-right btn_rote1" style="color: #42B983;"></i>
             </span>
            </el-col>
          </el-row>
          <el-row v-show="searchItemShow" class="searchTop">
            <el-col :span="6">
              <el-select v-model="pushLogData.pushResult" clearable  placeholder="请选择推送结果">
                <el-option
                  v-for="item in pushResult"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-date-picker
                v-model="pushTimeLog"
                type="datetimerange"
                unlink-panels
                value-format="yyyyMMddHHmmss"
                :default-time="['00:00:00', '23:59:59']"
                start-placeholder="推送开始日期"
                end-placeholder="推送结束日期"
              ></el-date-picker>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card  class="tabM">
      <div v-loading="tableLoading" >
        <el-table resizable border :data="pushLogTableData" style="width: 100%" :header-cell-style="headStyle">
          <el-table-column align="center" prop="strategyName" label="策略名称" width="140"></el-table-column>
          <el-table-column align="center" label="推送结果" width="100">
            <template slot-scope="scope">
               <div  v-if="scope.row.pushResult==1">
                <img :src="runImg" title="成功">
              </div>
              <div  v-if="scope.row.pushResult==0">
                 <img :src="stopImg" title="失败">
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="receiverId" label="接收人" width="100"></el-table-column>
          <el-table-column align="center" label="推送时间" width="180">
            <template slot-scope="scope">{{scope.row.pushTime | strToDataFromat}}</template>
          </el-table-column>
          <el-table-column align="center" label="创建时间" width="180">
            <template slot-scope="scope">{{scope.row.createTime | strToDataFromat}}</template>
          </el-table-column>
          <el-table-column align="center" prop="pushChannel" label="推送渠道" width="100"></el-table-column>
          <el-table-column align="center" prop="workerId" label="实例ID" width="180"></el-table-column>
          <el-table-column align="center" prop="contentTemplate" show-overflow-tooltip label="推送内容" width="200"></el-table-column>
        </el-table>
        <el-pagination
          align="right"
          @current-change="clickPageLog"
          @size-change="pageSizeChangeLog"
          :current-page.sync="currentPageLog"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="limitNumLog"
          :page-sizes="[10, 20, 30,40]"
          :total="totalPageLog"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
   
<script>
import * as service from "@/modules/mms/api/pushManageModule.js";
import EleMultiCascader  from '@/modules/mms/components/index.js'
import runImg from '@/assets/images/run.png'
import stopImg from '@/assets/images/stop.png'
export default {
  data() {
    return {
      runImg: runImg,
      stopImg: stopImg,
      searchItemShow:false,
      headStyle: {
        'background-color': '#F4F8F9',
        'color': 'rgba(0,0,0,0.60)',
      },
      tableLoading:true,
      outputs: {
        values: [],
        items: []
      },
      pushchannelData: [
        {
          label: "APP",
          value: "app"
        },
        {
          label: "电话",
          value: "telephone"
        },
        {
          label: "邮件",
          value: "mail"
        },
        {
          label: "短信",
          value: "sms"
        }
      ],
      pushStates: [
        {
          label: "待推送",
          value: "0"
        },
        {
          label: "已推送",
          value: "1"
        },
        {
          label: "推送中",
          value: "3"
        }
      ],
      pushResult: [
        {
          label: "推送成功",
          value: 1
        },
        {
          label: "推送失败",
          value: 0
        }
      ],
      receiverAllData:[],//所有接收人数据
      //推送任务数据 start----------------------------------
      tabName: "one",
      tabOneShow: true,
      tabTwoShow: false,
      pushTaskData: {
        name: "",
        channel: "",
        status: ""
      },
      receiverSearch:[],
      pushTimeTask: "",
      createdTimeTask: "",
      pushTaskTableData: [],
      channelTask: [], //任务推送渠道
      //推送任务分页
      //分页
      pushTaskFlag: true, //如果是所有数据分页,则为true fenye
      pushTaskParams: {}, //查询 深拷贝数据
      limitNumTask: 10, //所有分页每一页的条数
      totalPageTask: 0, //总页数
      currentPageTask: 1, //当前页
      //推送任务数据 end----------------------------------
      //推送日志数据 start----------------------------------
      pushLogData: {
        name: "",
        pushResult: ""
      },
      channelLog: [],
      pushTimeLog: [],
      pushLogTableData: [],
      //分页
      pushLogFlag: true, //如果是所有数据分页,则为true fenye
      pushLogParams: {}, //查询 深拷贝数据
      limitNumLog: 10, //所有分页每一页的条数
      totalPageLog: 0, //总页数
      currentPageLog: 1, //当前页
      //推送日志数据 end----------------------------------
      personProp:{
        children:'member'
      },
    };
  },
  created() {},
  methods: {
    searchItemDown(){
      this.searchItemShow = !this.searchItemShow
    },
    nameSearch() {
      this.pushLogData.name = this.pushLogData.name.replace(
        /[^\w\u4E00-\u9FA5]/g,
        ""
      );
    },
    ispChange(values, items) {
      this.outputs.values = values;
      // this.outputs.items = items;
    },
    activeTab(tab) {
      console.log(tab);
      if (tab.name == "one") {
        this.tabOneShow = true;
        this.tabTwoShow = false;
      } else if (tab.name == "two") {
        this.tabOneShow = false;
        this.tabTwoShow = true;
      } 
    },
    // 推送任务 start--------------------
    //查询所有
    getPushTaskAllData(pageNumber) {
      let params = {
        start: (pageNumber - 1) * this.limitNumTask,
        limit: this.limitNumTask
      };
      service.pushTaskSearchAll(params).then(res => {
        this.pushTaskTableData = res.data;
        this.totalPageTask = res.count;
      });
    },
    //查询单个
    getPushTaskSingleData(startPage, flag) {
      this.pushTaskFlag = false;
      if (flag) {
        this.currentPageTask = 1;
        console.log(this.receiverSearch);
        if(this.receiverSearch.length){
           this.pushTaskData.receiver=this.receiverSearch.join(',')
        }else{
          this.pushTaskData.receiver='';
        }
        if (this.channelTask.length) {
          this.pushTaskData.channel = this.channelTask.join(",");
        }else{
          this.pushTaskData.channel=''
        }
        if (this.pushTimeTask.length) {
          this.pushTaskData.pushStartTime = this.pushTimeTask[0];
          this.pushTaskData.pushEndTime = this.pushTimeTask[1];
        }else{
          this.pushTaskData.pushStartTime = '';
          this.pushTaskData.pushEndTime = '';
        }
        if (this.createdTimeTask.length) {
          this.pushTaskData.createStartTime = this.createdTimeTask[0];
          this.pushTaskData.createEndTime = this.createdTimeTask[1];
        }else{
          this.pushTaskData.createStartTime=''
          this.pushTaskData.createEndTime ='';
        }
        this.pushTaskParams = JSON.parse(JSON.stringify(this.pushTaskData));
      }
      this.pushTaskParams.start = (startPage - 1) * this.limitNumTask;
      this.pushTaskParams.limit = this.limitNumTask;
      console.log( this.pushTaskParams);
      service.pushTaskSearchAll(this.pushTaskParams).then(res => {
        this.pushTaskTableData = res.data;
        this.totalPageTask = res.count;
      });
    },
    //分页
    clickPageTask(val) {
      this.currentPageTask = val;
      if (this.pushTaskFlag) {
        //如果查询所有的数据
        this.getPushTaskAllData(val);
      } else {
        //如果是查询参数的数据
        this.getPushTaskSingleData(val, false);
      }
    },
    pageSizeChangeTask(val) {
      this.limitNumTask = val;
      this.currentPageTask = 1;
      if (this.pushTaskFlag) {
        //如果查询所有的数据
        this.getPushTaskAllData(1);
      } else {
        //如果是查询参数的数据
        this.getPushTaskSingleData(1, false);
      }
    },
    //任务重置
    resetTask() {
      this.$refs.c1.clearData();
      this.pushTaskData = {
        name: "",
        channel: "",
        status: ""
      };
      this.receiverSearch=[];
      this.pushTaskFlag = true;
      this.pushTimeTask = [];
      this.createdTimeTask = [];
      this.channelTask = [];
      this.currentPageTask = 1;
      this.getPushTaskAllData(1);
      //清空深拷贝的数据 重要
      this.pushTaskParams = {};

    },
    //所有接收人
    getreceiverData(){
      service.personAllData().then(res=>{
        let arr = res.data;
        if (arr) {
          arr.forEach((val, index) => {
            val.label = val.deptName;
            val.disabled = true;
            val.member.forEach((value, idx) => {
              value.label = value.realName;
              value.value = value.userId;
            });
            val.children=val.member
          });
        }
        this.receiverAllData = arr;
      })
    },
    // 推送任务 end--------------------

    // 推送日志 start--------------------
    //查询所有
    getPushLogAllData(pageNumber) {
      let params = {
        start: (pageNumber - 1) * this.limitNumLog,
        limit: this.limitNumLog
      };
      service.pushLogSearchAll(params).then(res => {
        this.pushLogTableData = res.data;
        this.totalPageLog = res.count;
        this.tableLoading=false;
      });
    },
    //查询单个
    getPushLogSingleData(startPage, flag) {
      this.tableLoading=true;
       this.pushLogFlag = false;
       if(flag){
        this.currentPageLog=1;
        if (this.channelLog.length) {
          this.pushLogData.channel = this.channelLog.join(",");
        }else{
           this.pushLogData.channel=''
        }
        if (this.pushTimeLog) {
          this.pushLogData.pushStartTime = this.pushTimeLog[0];
          this.pushLogData.pushEndTime = this.pushTimeLog[1];
        }else{
          this.pushLogData.pushStartTime ='';
          this.pushLogData.pushEndTime = '';
        }
         this.pushLogParams = JSON.parse(JSON.stringify(this.pushLogData));
       }
      this.pushLogParams.start = (startPage - 1) * this.limitNumLog;
      this.pushLogParams.limit = this.limitNumLog;
      service.pushLogSearchAll(this.pushLogParams).then(res => {
        this.pushLogTableData = res.data;
        this.totalPageLog = res.count;
         this.tableLoading=false;
      });
    },
    //分页
    clickPageLog(val) {
       this.tableLoading=true;
      this.currentPageLog = val;
      if (this.pushLogFlag) {
        //如果查询所有的数据
        this.getPushLogAllData(val);
      } else {
        //如果是查询参数的数据
        this.getPushLogSingleData(val, false);
      }
    },
    pageSizeChangeLog(val) {
       this.tableLoading=true;
      this.limitNumLog = val;
      this.currentPageLog = 1;
      if (this.pushLogFlag) {
        //如果查询所有的数据
        this.getPushLogAllData(1);
      } else {
        //如果是查询参数的数据
        this.getPushLogSingleData(1, false);
      }
    },
    resetLog() {
      
      this.pushLogData = {
        name: "",
        pushResult: ""
      };
      this.pushLogFlag = true;
      this.pushTimeLog = [];
      this.channelLog = [];
      //  this.tableLoading=true;
      // this.currentPageLog = 1;
      // this.getPushLogAllData(1);
      //清空深拷贝的数据 重要
      this.pushLogParams = {};
    },
    pushLogExportAll() {
      import('@/modules/mms/vendor/Export2Excel').then(excel => {
        const tHeader = [
          '策略名称',
          '推送结果',
          '推送时间',
          '创建时间',
          '推送渠道',
          '实例ID',
          '日志ID',
          '任务ID',
          '策略ID',
          '推送策略时间',
          '推送策略次数',
          '接收人',
          '任务分配时间',
          '实际任务推送次数',
          '推送内容',
        ]
        const filterVal = [
          'strategyName',
          'pushResult',
          'pushTime',
          'createTime',
          'pushChannel',
          'workerId',
          'logId',
          'taskId',
          'strategyId',
          'pushStrategyTime',
          'strategyCount',
          'receiverId',
          'taskAllocateTime',
          'actualCount',
          'contentTemplate',
        ]
        const list = this.pushLogTableData
        const data = this.formatJsonAll(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '推送日志',
          autoWidth: true
        });
      })
    },
    formatJsonAll(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            // return parseTime(v[j]);
          } else {
            return v[j]
          }
        })
      )
    },
    // 推送日志 end--------------------
  },
  components:{
    EleMultiCascader
  },
  mounted() {
    // this.getPushTaskAllData(1);
    this.getPushLogAllData(1);
    this.getreceiverData();
  }
};
</script>

   
<style rel="stylesheet/scss" lang="scss" scope>
.pushManage-container {
  padding: 10px;
    .iconStyle{
      margin-left: 16px;
    }
  //推送日志
  .pushLogContent {
    #pushLogSearchStyle {
      .el-input,
      .el-select,
      .el-date-editor {
        width: 270px;
      }
    }
    .btn_set {
      width:40px;
      height:34px;
      background:rgba(66,185,131,0.4);
      border:1px solid rgba(66,185,131,1);
      border-radius:4px;
      display: inline-block;
      padding: 8px 8px 8px 11px;
      cursor: pointer;
      margin-left:10px;
    }
    .btn_rote {
      transform: rotate(90deg);
    }
    .btn_rote1 {
      transform: rotate(-90deg);
    }
    .searchTop{
          margin-top: 10px;
        }
  }
  .tabM {
    margin-top: 5px;
  }
}
.greenStyleBtn {
  background-color: #42B983;
  color:white;
  border: 1px solid #42B983;
}
.greenStyleBtn:hover {
  background-color: #42B983;
  color:white;
  border: 1px solid #42B983;
}
.blueStyleBtn {
  background-color: #4690FE;
  color: white;
  border: 1px solid #4690FE;
}
.redStyleBtn {
  background-color: #F4F8F9;
  color: rgba(0,0,0,0.70);
  border: 1px solid #F4F8F9;
}
.redStyleBtn:hover{
  background-color:  #FA5555;
  color:white;
  border: 1px solid #FA5555;
}
.defaultBtn {
  background-color: #F4F8F9;
  color: rgba(0,0,0,0.70);
  border: 1px solid #F4F8F9;
}
.defaultBtn:hover {
  background-color: #42B983;
  color: white;
  border: 1px solid #42B983;
}
.fontColorStyle{
  color:rgb(213, 230, 222);
}
.el-pagination {
  margin-top: 10px;
  /deep/.el-pager li.active{
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
}
// .el-tooltip__popper {
//   display: none ;
// }
</style>