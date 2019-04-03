<template>
  <div class="dashboard-container">
    <div class="ai">
      <div @click="showToggle"><svg-icon icon-class="treeButton" class="pic" /></div>
    </div>
    <!-- <el-row :gutter="20">   -->
      <div style="width:230px" class="fu" v-show="isShow">
         <div class="grid-content bg-purple-light" >
            <el-container>
              <el-aside width="100%" style="height:600px;">
                <div class="head">资源模型树</div>
                <el-input placeholder="请输入资源类型名称" v-model="filterText" style="width: 90%;" size="mini"></el-input>
                <el-tree
                  ref="tree2"
                  :data="data2"
                  :default-expanded-keys="[0,1,2,3,4]"
                  :props="defaultProps"
                  node-key="id"
                  :filter-node-method="filterNode"
                  class="filter-tree"
                  @node-click="handleNodeClick"
                />
              </el-aside>
            </el-container>
         </div>
      </div>  
      <div  class="ding" :style="{width: widthData+'%'}" ref="menuHome" > 
        <!-- <span>指标数据</span> -->
          <div  class="RightRow"> 
            <el-card>
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="指标名称">
                  <el-input v-model="formInline.name" style="width:180px" placeholder="指标名称" />
                </el-form-item>
                <el-form-item label="指标编码">
                  <el-select v-model="formInline.code" style="width:180px" placeholder="指标编码">
                    <!-- <el-option label="全部" value="" selected>全部</el-option> -->
                    <el-option
                      v-for="item in codeOptions"
                      :label="item.label"
                      :value="item.value"
                      :key="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item > 
                  <el-button  class="search_btn" @click.stop="query_list">查询</el-button>
                  <el-button class="opt_btn" @click="reset">重置</el-button>
                  <i class="iconfont step_btn turn" @click="showTime">&#xe619;</i>            
                  <el-popover
                    placement="bottom"
                    width="400"
                    trigger="click">
                      <template>
                        <div></div>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                          <el-checkbox label="指标名"></el-checkbox>
                          <el-checkbox label="指标编码" disabled></el-checkbox>
                          <el-checkbox label="资源ID"></el-checkbox>
                          <el-checkbox label="指标类型" style="margin-left:0px"></el-checkbox>
                          <el-checkbox label="指标维度" style="margin-left: 59px;"></el-checkbox>
                          <el-checkbox label="指标值" disabled></el-checkbox>
                          <el-checkbox label="指标产生时间" style="margin-left:0px" disabled></el-checkbox>
                        </el-checkbox-group>
                      </template>
                    <i class="iconfont step_btn"  slot="reference">&#xe615;</i> 
                </el-popover> 
                </el-form-item>
                <!-- <el-form-item>
                  <el-select v-model="formInline.metric_type" placeholder="指标类型">
                    <el-option label="全部" value="" selected>全部</el-option>
                    <el-option
                      v-for="item in metricTypeOpt"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item> -->
              </el-form >
               <el-form :inline="true" style="margin-top:10px;margin-bottom: -24px;">
                 <el-form-item label="资源实例" v-show="oneShow">
                  <el-select  v-model="value" @change="mubiao" style="width:180px">
                    <el-option
                      v-for="item in nameOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      />
                  </el-select>
                 </el-form-item>
                 <el-form-item label="指标产生时间"  v-show="oneShow">
                  <el-date-picker
                    v-model="formInline.Time"
                    :default-time="['12:00:00']"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                  </el-form-item>
                </el-form>
            </el-card>
          </div>
          <div  class="buttonItem">
            <el-card>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item v-for="item of nav" :key="item.id">{{ item.text }}</el-breadcrumb-item>
                </el-breadcrumb>
            </el-card>
            <div >
            <el-card>
              <el-table
                :data="tableData1.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%"
                :header-cell-style="headStyle"
              >
                <el-table-column label="指标名" prop="name" v-if="oneshow"/>
                <el-table-column label="指标编码" prop="code" v-if="twoshow"/>
                <el-table-column label="资源ID" prop="ciid" v-if="thirdshow"/>
                <el-table-column label="指标类型" prop="metricType" v-if="fourshow"/>
                <el-table-column label="指标维度" prop="metricDimension" v-if="fiveshow"/>
                <el-table-column label="指标值" prop="metricValue" v-if="sixshow"/>
                <el-table-column label="指标产生时间" v-if="sevenshow">
                  <template slot-scope="scope">{{ scope.row.createTime | dateFilter }}</template>
                </el-table-column>
              </el-table>
              <el-pagination
                :current-page.sync="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pagesize"
                :total="tableData1.length"
                align="right"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-card>
            </div>
          </div>
      </div> 
    <!-- </el-row>  -->
     
  </div>
</template>

<script>
import { getList } from "@/api/table";
import * as server from "../../api/kms.js";
import * as utils from "../../utils/utils.js";
import request from '@/utils/request'
import { getTree, arrFormatter } from '@/modules/rms/utils/omstree.js'
import { resolve } from "url";

var _ = require("lodash");
const datas = [
  {
    id: 1,
    label: "Iaas层资源",
    children: [
      {
        id: 4,
        label: "物理类",
        children: [
          {
            id: 20,
            label: "主机",
            children: [
              {
                id: 40,
                label: "主机A"
              },
              {
                id: 41,
                label: "主机B"
              }
            ]
          },
          {
            id: 21,
            label: "宿主机",
            children: [
              {
                id: 42,
                label: "宿主机A"
              },
              {
                id: 43,
                label: "宿主机B"
              }
            ]
          },
          {
            id: 22,
            label: "宿主机集群",
            children: [
              {
                id: 44,
                label: "宿主机集群A"
              },
              {
                id: 45,
                label: "宿主机集群B"
              }
            ]
          },
          {
            id: 23,
            label: "网络",
            children: [
              {
                id: 46,
                label: "网络A"
              },
              {
                id: 47,
                label: "网络B"
              }
            ]
          },
          {
            id: 24,
            label: "中间件",
            children: [
              {
                id: 48,
                label: "中间件A"
              },
              {
                id: 49,
                label: "中间件B"
              }
            ]
          },
          {
            id: 25,
            label: "存储",
            children: [
              {
                id: 50,
                label: "存储A"
              },
              {
                id: 51,
                label: "存储B"
              }
            ]
          },
          {
            id: 26,
            label: "备份",
            children: [
              {
                id: 52,
                label: "备份A"
              },
              {
                id: 53,
                label: "备份B"
              }
            ]
          },
          {
            id: 27,
            label: "排队机模块",
            children: [
              {
                id: 54,
                label: "排队机模块A"
              },
              {
                id: 55,
                label: "排队机模块B"
              }
            ]
          },
          {
            id: 28,
            label: "客服平台应用服务器模块",
            children: [
              {
                id: 56,
                label: "客服平台应用服务器模块A"
              },
              {
                id: 57,
                label: "客服平台应用服务器模块B"
              }
            ]
          },
          {
            id: 29,
            label: "PC服务器",
            children: [
              {
                id: 58,
                label: "PC服务器A"
              },
              {
                id: 59,
                label: "PC服务器B"
              }
            ]
          },
          {
            id: 30,
            label: "负载均衡器",
            children: [
              {
                id: 60,
                label: "负载均衡器A"
              },
              {
                id: 61,
                label: "负载均衡器B"
              }
            ]
          }
        ]
      },
      {
        id: 5,
        label: "逻辑类",
        children: [
          {
            id: 31,
            label: "资源池平台",
            children: [
              {
                id: 62,
                label: "资源池平台A"
              },
              {
                id: 63,
                label: "资源池平台B"
              }
            ]
          },
          {
            id: 32,
            label: "资源池",
            children: [
              {
                id: 64,
                label: "资源池A"
              },
              {
                id: 65,
                label: "资源池B"
              }
            ]
          },
          {
            id: 33,
            label: "虚拟机",
            children: [
              {
                id: 66,
                label: "虚拟机A"
              },
              {
                id: 67,
                label: "虚拟机B"
              }
            ]
          },
          {
            id: 34,
            label: "虚拟存储",
            children: [
              {
                id: 68,
                label: "虚拟存储A"
              },
              {
                id: 69,
                label: "虚拟存储B"
              }
            ]
          },
          {
            id: 35,
            label: "虚拟磁盘",
            children: [
              {
                id: 70,
                label: "虚拟磁盘A"
              },
              {
                id: 71,
                label: "虚拟磁盘B"
              }
            ]
          },
          {
            id: 36,
            label: "虚拟交换机",
            children: [
              {
                id: 72,
                label: "虚拟交换机A"
              },
              {
                id: 73,
                label: "虚拟交换机B"
              }
            ]
          },
          {
            id: 37,
            label: "虚拟网卡",
            children: [
              {
                id: 74,
                label: "虚拟网卡A"
              },
              {
                id: 75,
                label: "虚拟网卡B"
              }
            ]
          },
          {
            id: 38,
            label: "VLAN",
            children: [
              {
                id: 76,
                label: "VLANA"
              },
              {
                id: 77,
                label: "VLANB"
              }
            ]
          },
          {
            id: 39,
            label: "虚拟防火墙",
            children: [
              {
                id: 78,
                label: "虚拟防火墙A"
              },
              {
                id: 79,
                label: "虚拟防火墙B"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "Saas层资源",
    children: [
      {
        id: 6,
        label: "业务类"
      },
      {
        id: 7,
        label: "应用类"
      }
    ]
  },
  {
    id: 3,
    label: "Paas层资源",
    children: [
      {
        id: 8,
        label: "进程"
      },
      {
        id: 9,
        label: "分布式文件系统"
      },
      {
        id: 10,
        label: "分布式服务框架"
      },
      {
        id: 11,
        label: "分布式计算框架"
      },
      {
        id: 12,
        label: "关系型数据库"
      },
      {
        id: 13,
        label: "非关系型数据库"
      },
      {
        id: 14,
        label: "数据缓存"
      },
      {
        id: 15,
        label: "日志分析实例【可选】"
      },
      {
        id: 16,
        label: "消息队列实例"
      },
      {
        id: 17,
        label: "容器实例【可选】"
      },
      {
        id: 18,
        label: "容器镜像仓库【可选】"
      },
      {
        id: 19,
        label: "软件集群"
      }
    ]
  }
];
const tableData = [
  {
    metric_id: "001",
    name: "ss_q",
    code: "PM-00-01-001-01",
    description: "asdqwdas",
    resource_type: "mySQL",
    status: 0,
    collect_type: "zabbix",
    frequency: "1h",
    data_type: "1",
    rule_script: {
      parma1: "one",
      parma2: "two",
      parma3: "three",
      parma4: "four",
      parma5: "five",
      parma6: "sex"
    }
  },
  {
    metric_id: "002",
    name: "ss_d",
    code: "PM-00-01-001-02",
    description: "asdqwdas",
    resource_type: "oracle",
    status: 0,
    collect_type: "zabbix",
    frequency: "1h",
    data_type: "1",
    rule_script: {
      parma1: "one",
      parma2: "two",
      parma3: "three",
      parma4: "four"
    }
  },
  {
    metric_id: "003",
    name: "ss_v",
    code: "PM-00-01-001-03",
    description: "rascasdas",
    resource_type: "mySQL",
    status: 0,
    collect_type: "jmx",
    frequency: "1h",
    data_type: "1",
    rule_script: {
      parma1: "one",
      parma2: "two",
      parma3: "three"
    }
  },
  {
    metric_id: "004",
    name: "ss_b",
    code: "PM-00-01-001-04",
    description: "qxzcac",
    resource_type: "oracle",
    status: 0,
    collect_type: "snmp",
    frequency: "1h",
    data_type: "1",
    rule_script: {
      parma1: "one",
      parma2: "two",
      parma3: "three"
    }
  },
  {
    metric_id: "005",
    name: "ss_g",
    code: "PM-00-01-001-05",
    description: "sdssadasd",
    resource_type: "oracle",
    status: 0,
    collect_type: "agent",
    frequency: "1h",
    data_type: "1",
    rule_script: {
      parma1: "one",
      parma2: "two",
      parma3: "three"
    }
  }
];
export default {
  name: "DataManagement",
  filters: {
    dateFilter(value) {
      return utils.dateFilter2(value);
    }
  },
  data() {
    return {
      value:"",
      widthData:100,
      oneShow:false,
      isShow:false,
      pagesize: 5,
      resourceObject: "",
      currentPage: 1,
      filterText: "",
      // data2: datas,
      defaultProps: {
        children: "children",
        label: "label"
      },
      oneshow:true,
      twoshow:true,
      thirdshow:true,
      fourshow:true,
      fiveshow:true,
      sixshow:true,
      sevenshow:true,
      headStyle: {
        'background-color': '#F4F8F9',
        'color': 'rgba(0,0,0,0.60)',
      }, 
      checkedCities:  ['指标名', '指标编码', '资源ID','指标类型','指标维度','指标值','指标产生时间'],            
      codeOptions: [],
      nameOptions:[],
      metricTypeOpt: [],
      uriMap: new Map(),
      // 列表数据加载
      tableData: tableData,
      tableData1: [],
      addUserDialog: false,
      rule: {},
      dialog: {
        show: false,
        title: "参数详情"
      },
      formLabelWidth: "120px",
      viewShow1: false,
      viewShow2: true,
      TreeShow:false,
      // 传给后端节点名称取对应数据列表
      nodeName: "",
      // 初始资源实例查询条件
      formInline: {
        name: "",
        code: "",
        metric_type: "",
        Time: []
      },
      // 面包屑导航对象数组
      nav: [],
      root : [
        { 'value': 'SaaS', 'label': 'SaaS', 'pid': 0, 'id': 1 },
        { 'value': 'PaaS', 'label': 'PaaS', 'pid': 0, 'id': 2 },
        { 'value': 'IaaS', 'label': 'IaaS', 'pid': 0, 'id': 3 },
        { 'value': 'Others', 'label': 'Others', 'pid': 0, 'id': 4 },

        { 'value': 'Application', 'label': '应用类', 'pid': 1, 'id': 5 },
        { 'value': 'Business', 'label': '业务类', 'pid': 1, 'id': 6 },

        { 'value': 'Logic', 'label': '逻辑类', 'pid': 2, 'id': 7 },

        { 'value': 'Logic', 'label': '逻辑类', 'pid': 3, 'id': 8 },
        { 'value': 'Physical', 'label': '物理类', 'pid': 3, 'id': 9 },

        { 'value': 'Other', 'label': '其他类', 'pid': 4, 'id': 10 }
      ]
    };
  },
  computed: {
    data2() {
      return this.$store.state.resourceManagement.treeData;
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
    },
    created() {
    // debugger
    if (!this.$store.state.resourceManagement.on_treeData) {
      this.$store.dispatch("treeData");
    }
    this.getMetricTypeOpt();
    this.getResType();
    },
  methods: {
    handleCheckedCitiesChange(value) {
      var a=[]
        //  debugger
        for(var i=0;i<value.length;i++){
           a.push(value[i])
        }
        if(a.indexOf("指标名")==-1){
            this.oneshow=false
        }else{
          this.oneshow=true
        }
        if(a.indexOf("指标编码")==-1){
           this.twoshow=false
        }else {
           this.twoshow=true
        }
        if(a.indexOf("资源ID")==-1){
           this.thirdshow=false
        }else{
           this.thirdshow=true
        }
        if(a.indexOf("指标类型")==-1){
          this.fourshow=false
        }else{
          this.fourshow=true
        }
        if(a.indexOf("指标维度")==-1){
          this.fiveshow=false
        }else{
          this.fiveshow=true
        }
        if(a.indexOf("指标值")==-1){
          this.sixshow=false
        }else{
          this.sixshow=true
        }
        if(a.indexOf("指标产生时间")==-1){
          this.sevenshow=false
        }else{
          this.sevenshow=true
        }
      },
    showTime(){
      // debugger
      this.oneShow = !this.oneShow
    },
    showToggle:function(){  
       this.isShow = !this.isShow  
       if(this.isShow){  
         this.widthData=79
         console.log(this.width)
       }else{  
         this.widthData=100;
          }  
        } ,
    // 查询
    query(param) {
      let totalTime = "";
      if (
        this.formInline.Time &&
        this.formInline.Time.length &&
        this.formInline.Time.length > 1
      ) {
        const [startTime, endTime] = this.formInline.Time;
        totalTime =
          this.dataFormatter(startTime) + "," + this.dataFormatter(endTime);
      } else {
        totalTime = "";
      }
      const params = {
        ...param
      };
      // debugger
      if (this.formInline.code !== "") {
        params["code"] = this.formInline.code;
      }
      if (this.totalTime !== "") {
        params["interval"] = totalTime;
      }
      if (this.resourceObject !== "") {
        params["ciid"] = this.resourceObject;
      }
      // debugger
      return server.query(params).then(res => {
        // debugger
        for(var i=0;i<res.length;i++){
          var b=res[i].metricValue
          res[i].metricValue=b.substring(0,b.indexOf(".") + 3);
          // res[i].metricValue=Math.round(b*100)/100
          // console.log(res[i].metricValue)
        }
        // console.log(res)
        this.tableData1 = res;
        this.totalDataNumber = res.length;
        this.currentPage = 1;
      });
    },
    dataFormatter(value) {
      if (value) {
        var oDate = value;
        if (!(value instanceof Date)) {
          oDate = new Date(value);
        }
        // debugger
        var oYear = oDate.getFullYear();
        var oMonth = oDate.getMonth() + 1;
        var oDay = oDate.getDate();
        var oHour = oDate.getHours();
        var oMin = oDate.getMinutes();
        var oSen = oDate.getSeconds();
        return (
          oYear +
          "-" +
          addTime(oMonth) +
          "-" +
          addTime(oDay) +
          " " +
          addTime(oHour) +
          ":" +
          addTime(oMin) +
          ":" +
          addTime(oSen)
        );
        function addTime(num) {
          if (parseInt(num) < 10) {
            num = "0" + num;
          }
          return num;
        }
      }
    },
    getCodes(params) {
      // debugger
      return server.getCodes(params).then(res => {
        if (Number(res.count) > 0) {
          this.codeOptions = _.uniqWith(
            res.datas.MetricsDef.map(item => {
              return {
                value: item.code,
                label: item.code
              };
            }),
            _.isEqual
          );
          this.formInline.code = this.codeOptions[0].value;
        } else {
          this.codeOptions = [];
          this.formInline.code = "";
        }
      });
    },
    getResType() {
      // debugger
      this.getCodes({
          model: "MetricsDef",
          params: "code",
          keys: "resourceType",
        }).then(res => {
          this.query_list({ code: this.formInline.code });
        });
      server.getResType().then(res => {
        var data = res;
         var result = arrFormatter(res)
        // this.num =this.root.concat(result)  
        this.num=[...this.root.concat(result)]
        console.log(this.num)
        data.map(item => {
          this.uriMap[item.ciprefix] = item.uri;
          // console.log(item.ciprefix)
          // console.log(item.uri)       
           });
      });
    },
    getUri(ciprefix) {
      return this.uriMap[ciprefix];
    },
    query_list(params) {
      // debugger
      return this.query(params);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    mubiao(data){
      this.resourceObject =data  
    },
    /**
     * 编码的显示和信息的显示
     */
    handleNodeClick(data, node, vuecomponent) {     
      //  * 不同层的请求编码
        var aaa="";
        if(data.id !==0 && data.id<=4){
         aaa=aaa+data.value
         console.log(aaa)
         this.resourceObject='';
         this.getCodes({
          model: "MetricsDef",
          params: "code",
          keys: "resourceType",
          value:aaa,
          search:true
        })
        }else if(data.id !==0 && data.id<=10){
         aaa+=this.num[data.pid-1].value
         aaa=aaa+"."+data.value
         console.log(aaa)
         this.resourceObject='';
         this.getCodes({
          model: "MetricsDef",
          params: "code",
          keys: "resourceType",
          value:aaa,
          search:true
        })
       }else{
        if(data.uri !== undefined){
          this.getCodes({
          model: "MetricsDef",
          params: "code",
          keys: "resourceType",
          value:data.uri,
          search:true
         })
          }
       }
      // * 动态获取导航
      var qqq=[];
      debugger
      if(data.id !==0 && data.id<=10){
         qqq.push(data.value)
         console.log(qqq)
         qqq.unshift(this.num[data.pid-1].value)
         this.nav=[];
         if(!qqq){return}
         qqq.forEach(item => {
         this.nav.push({id: item,text: item});});
       }else{
         if(data.uri !== undefined){
        var a=data.uri.split('.')
        this.nav=[];
         if(!a){return}
         a.forEach(item => {
         this.nav.push({id: item,text: item});});
         }
       }
        // * 请求实例
        // debugger
      if (node.isLeaf && !data.isLeaf) {
        var theChildren = node.childNodes;
        theChildren.splice(0, theChildren.length);
        this.getCiids(data.value)
      }else{
        //  var temp = data.value.split("-");
        // var ciprefix = temp[0] + "-" + temp[1];
        // var uri = this.getUri(ciprefix);
        // var uris = uri.split(".");
        // this.resourceObject = data.value;
        // this.getCodes({
        //   model: "MetricsDef",
        //   params: "code",
        //   keys: "resourceType",
        //   value:uri
        // }).then(res => {
        //   this.query_list({ code: this.formInline.code });
        // })
        this.nameOptions=[]
        this.value=""
      }
    },
    getCiids(cidParam) {
      const params = { model: cidParam };
      const res = server.getCIIDS(params).then(res => {
        console.log("123"+res)
        var ciids = [];
        debugger
        if (res.datas[cidParam]) {
          const data = res.datas[cidParam];
          // debugger;
          
          ciids = data.map(item => {
            return {
              value: item.ciid,
              label: item.ciname,
              isLeaf: true
            };
          });
          debugger
          if (Number(res.count) > 0) {
           this.nameOptions=ciids.map(item=>{
             return {
               value:item.value,
               label:item.label,
             }
           })
           this.value = this.nameOptions[0].label
           this.resourceObject=this.nameOptions[0].value
           }else{
             this.nameOptions=[]
             this.value=""
           }
        }
        return ciids;
      });
      return res;
    },
    handleEdit(row, obj) {
      this.rule = obj.rule_script;
      this.addUserDialog = true;
    },
    // 重置查询条件
    reset() {
      this.value="";
      this.resourceObject="";
      for (var i in this.formInline) {
        this.formInline[i] = "";
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getMetricTypeOpt() {
      // debugger
      server.getMetricsType().then(
        res => {
          const data = res.metricsData;
          // debugger
          this.metricTypeOpt = _.uniqBy(
            data.map(item => {
              return {
                value: item.alias,
                label: item.alias
              };
            }),
            "value"
          );
        },
        error => {
          console.error("请求异常！" + error);
        }
      );
    }
  }
};
</script>

<style scoped>
.el-checkbox+.el-checkbox{
  margin-left: 74px ; 
}
.demo-form-inline {
    margin-bottom: -20px;
} 
.dashboard-container {
  /* overflow: hidden; */
  margin: 20px 10px 20px 20px;
}
.ding{
    /* position: absolute;
    margin-top: -43.7%;
    margin-left: 20%; */
    float: left;
}
.fu{
   float: left;
   padding-right:20px;
   height:634px;
}
.ai{
  position: absolute;
    margin-top: -20px;
    margin-left: -22px;
    z-index:2;
}
.pic{
    height: 54px;
    width: 56px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #d3dce6;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: white;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;

  /* background:white; */
}
.app-container {
  padding: 10px;
}
.head {
  height: 50px;
  line-height: 50px;
  text-align: left;
  text-indent: 18px;
  font-size: 14px;
  font-weight: 700;
}
.el-aside {
  background-color: #fff;
  border-radius: 4px;
  margin-right: 10px;
  text-align: center;
}
 .block {
    margin: 20px 0 12px 0;
  }
  .RightRow {
    margin: 0px 10px 12px 0px;
    border-radius: 5px;
    height:auto;

  }
  .buttonItem {
    margin: 20px 10px 20px 0px;
    border-radius: 5px;
  }
  .search_btn{
  background: #42B983;
  border: 1px solid #42B983;
  color: #FFFFFF;
  }
  .search_btn:hover {
    background: rgba(66, 185, 131, 0.8);
  }
.step_btn {
  background: rgba(66, 185, 131, 0.4);
  border: 1px solid #42B983;
  color: rgba(66, 185, 131, 1);
  cursor:pointer;
  margin-left:8px;
  border-radius: 3px;
  padding: 8px 11px;
}
.step_btn:hover{
  background: rgba(66, 185, 131, 0.2);
}
.opt_btn {
  background: #F4F8F9;
  color: rgba(0, 0, 0, 0.70);
  margin-left: 8px;
  font-size:14px;
  border: none;
  height: 34px;
}
.opt_btn:hover{
    background: #42B983;
    border-color: #42B983;
    color: #fff;
}
.table_btn {
  color: rgba(66, 185, 131, 1);
  font-size:14px;
}
.turn:active{
  transform:rotate(180deg);
  -webkit-transform: rotate(180deg);
}
.el-checkbox+.el-checkbox{
  margin-left: 74px ; 
}
form.el-form.demo-form-inline.el-form--inline{
    margin-bottom: -20px;
}
.A{
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
    font-weight: 700;
}
</style>