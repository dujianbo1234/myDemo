<template>
  <div class="oms-diy-elementui eventContainer allInfo">
    <div class="right changeIcon">
      <span @click="changeTab('form')">
        <svg-icon
          class="oms-icon"
          icon-class="form"
        />
      </span>
      <span @click="changeTab('attachmentInfo')">
        <svg-icon
          class="oms-icon"
          icon-class="clipboard"
        />
      </span>
      <span @click="changeTab('chart')">
        <svg-icon
          class="oms-icon"
          icon-class="tree"
        />
      </span>
    </div>
    <el-form
      v-show="tabActive === 'form'"
      :model="ruleForm"
      ref="ruleForm"
      label-width="140px"
      class="demo-ruleForm"
    >
      <el-row class="clearfix titleBar">
        <div class="basicInfo left">基本信息</div>
      </el-row>
      <div class="basicInfoArea">
        <el-row>
          <el-col :span="16">
            <el-form-item
              label="事件标题："
              prop=""
            >

              <el-input
                class="oms-input"
                v-model="ruleForm.title"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事件ID："
              prop=""
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.workListId"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item
              class="eventDicr closeEvent"
              label="事件描述："
              prop=""
            >
              <el-input
                type="textarea"
                v-model="ruleForm.description"
                :readonly="true"
              ></el-input>

              <!-- <el-popover
                popper-class="warn-table-container"
                placement="right"
                width="300"
                trigger="click"
              >
                <el-table
                  :data="warnTableData"
                  @row-click="showWarnDetail"
                  width="100%"
                >
                  <el-table-column
                    align="center"
                    width="60"
                    type="index"
                    label="序号"
                  ></el-table-column>
                  <el-table-column
                    align="center"
                    property="id"
                    label="告警ID"
                  ></el-table-column>
                  <el-table-column
                    align="center"
                    label="告警名称"
                    prop="name"
                  >
                  </el-table-column>
                </el-table>

                <el-pagination
                  v-if="warnTableDataTotal > 5"
                  :current-page.sync="warnTableDataPagination.start"
                  layout="prev, pager, next"
                  :total="warnTableDataTotal"
                >
                </el-pagination>

                <span
                  slot="reference"
                  class="seeWarn"
                >
                  <i class="el-icon-warning"></i>
                </span>
              </el-popover> -->

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="登记时间："
              prop=""
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.createTime"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="事件发生时间："
              prop=""
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.eventTime"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="业务恢复时间："
              prop=""
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.businessRecoveryTime"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="关联问题单号：">
              <el-input
                class="oms-input"
                v-model="ruleForm.relatedQuestionId"
                :readonly="true"
              ></el-input>
            </el-form-item>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="事件性质："
              prop=""
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.eventNature"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事件来源："
              prop=""
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.eventSource"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联变更单号：">
              <el-input
                class="oms-input"
                v-model="ruleForm.relatedChangeId"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="事件影响度："
              prop=""
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.eventInfluenceDegree"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事件优先级："
              prop=""
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.eventPriority"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事件完成期限："
              prop=""
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.dueTime"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="事件涉及组："
              prop=""
            >
              <el-cascader
                placeholder=""
                :options="eventInGroupList"
                v-model="ruleForm.relatedOrg"
                :readonly="true"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="协查原因类别："
              prop=""
            >
            <el-input
                class="oms-input"
                v-model="ruleForm.consultationReasonCategory"
                :readonly="true"
              ></el-input>
              
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事件状态："
              prop=""
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.eventStatus"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              class="pointer"
              label="所属系统信息："
              prop=""
            >
              <el-cascader
                placeholder=""
                v-model="ruleForm.system"
                @change="systemInfoChange"
                :options="systemInfo"
                :readonly="true"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item
              class="pointer"
              label="事件类别信息："
              prop=""
            >
              <el-cascader
                placeholder=""
                v-model="ruleForm.eventCategory"
                @change="eventCategoryInfoChange"
                :options="eventInfo"
                :readonly="true"
              ></el-cascader>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item
              label="地点："
              prop=""
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.location"
                :readonly="true"
              ></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="8">
            <el-form-item
              label="重复事件标记："
              prop=""
            >
              <el-select
                v-model="ruleForm.isRepeating"
                class="oms-select"
                :readonly="true"
                placeholder=""
              >
                <el-option
                  label="是"
                  :value="1"
                ></el-option>
                <el-option
                  label="否"
                  :value="0"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="事件结束代码："
              prop=""
            >
            <el-input
                class="oms-input"
                v-model="ruleForm.completeCode"
                :readonly="true"
              ></el-input>
              
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item
              label="事件解决人角色："
              prop=""
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.eventSolverRole"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item
              label="事件解决人："
              prop=""
            >
              <el-input
                v-model="ruleForm.eventSolver"
                class="oms-input"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="处理是否超时："
              prop=""
            >
              <el-select
                v-model="ruleForm.isTimeout"
                class="oms-select"
                placeholder=""
                :readonly="true"
              >
                <el-option
                  label="已超时"
                  :value="0"
                ></el-option>
                <el-option
                  label="未超时"
                  :value="1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="故障厂商："
              prop=""
            >
              <el-input
                v-model="ruleForm.manufacturerId"
                class="oms-input"
                :readonly="true"
              >
              </el-input>
            </el-form-item>
          </el-col>
          
        </el-row>

      </div>

      <el-row class="clearfix titleBar">
        <div class="basicInfo left">中断信息</div>
      </el-row>
      <div class="dealStepsArea">
        <el-row v-if="ruleForm.interruption!==''||ruleForm.convergentBillingInterruption!==''||ruleForm.customerServiceInterruption!==''">
          <el-col :span="8">
            <el-form-item
              label="综合账务中断时长"
              prop="interruption"
              class="duration"
            >
              <span class="unit">min</span>
              <el-input
                v-model="ruleForm.interruption"
                class="oms-input"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="融合计费中断时长"
              prop="convergentBillingInterruption"
              class="duration"
            >
              <span class="unit">min</span>
              <el-input
                v-model="ruleForm.convergentBillingInterruption"
                class="oms-input"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="客户服务中断时长"
              prop="customerServiceInterruption"
              class="duration"
            >
              <span class="unit">min</span>
              <el-input
                v-model="ruleForm.customerServiceInterruption"
                class="oms-input"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      

      <el-row class="clearfix titleBar">
        <div class="basicInfo left">处理步骤</div>
      </el-row>

      <div class="dealStepsArea">

       <process-steps :procInstId.sync="procInstId" @getFullMsg="getFullMsg"></process-steps>

      </div>

      <el-tabs
        type="border-card"
        class="tabsArea"
      >
        <el-tab-pane label="解决方案">
          <el-row>
            <el-col :span="24">
              <el-form-item
                class="dealSuggestion"
                label="解决方案："
                prop=""
              >
                <el-input
                  type="textarea"
                  v-model="ruleForm.fullMsg"
                  class="oms-input"
                  :disabled="true"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
         <el-tab-pane label="配置关联项">
          <configuration-association :procInstId="procInstId" :taskId="taskId" :isServiceable="false"></configuration-association>
        </el-tab-pane>

        <el-tab-pane label="跟踪矩阵">
           <traceability-matrix :procInstId="procInstId" :ruleForm="ruleForm"></traceability-matrix>
        </el-tab-pane>
      </el-tabs>

        <el-dialog :visible.sync="currentAlertDialog" width="70%">
        <el-tabs v-model="currentAlertactiveNameInfo">
          <el-tab-pane
            label="告警信息"
            name="first"
          >
            <el-form
              :inline="true"
              :model="alertYuLanData"
              label-position="right"
              label-width="100px"
              size="mini"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="告警名称">{{alertYuLanData.name |fullMsg}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="告警ID">{{alertYuLanData.id |fullMsg}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="告警编码">{{alertYuLanData.code |fullMsg}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="生成策略ID">{{alertYuLanData.analysisStrategyId |fullMsg}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="首次告警时间">{{alertYuLanData.firstAlertTime | strToDataFromat}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="最后告警时间">{{alertYuLanData.lastAlertTime | strToDataFromat}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="告警状态">{{alertYuLanData.status | leavelState}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="当前告警级别">{{alertYuLanData.level | alertLeavel}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="告警次数">{{alertYuLanData.count | fullMsg}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="处理人">{{alertYuLanData.handlerName|fullMsg}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="告警内容">
                    <span class="word-wrap">{{alertYuLanData.content | fullMsg}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane
            label="对象信息"
            name="second"
          >
            <mailTable
              :tableData="alertTableData"
              :tableStyle="{ width:'600px' }"
            ></mailTable>
          </el-tab-pane>

        </el-tabs>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="currentAlertDialog = false"
          >返回</el-button>
        </div>
      </el-dialog>

      <el-row class="operation">
        <el-button type="info">转问题管理</el-button>
        <el-button type="info">转知识管理</el-button>
      </el-row>
    </el-form>

    <div v-show="tabActive === 'attachmentInfo'">
      <attachment-info :procInstId="procInstId"></attachment-info>
    </div>

    <div
      v-show="tabActive === 'chart'"
      class="flow-chart"
    >
      <img
        v-if="flowChartData"
        :src="flowChartData"
        class="chart"
        alt="流程图"
        @click="enlarge"
      >
    </div>
  </div>
</template>
<script>
import * as service from "@/modules/oms/api/oms/eventForm";
import { parseTime } from "@/utils/index";
import { findParentNode, deep } from "@/modules/oms/utils/omstree.js";

import DeepTable from "@/modules/oms/views/layout/components/DeepTable";

import mailTable from "@/components/columnTable/cloumnTable.vue";

import requests from "@/modules/oms/api/index";

import processSteps from '@/modules/oms/views/components/processSteps';

import traceabilityMatrix from '@/modules/oms/views/components/traceabilityMatrix';

import configurationAssociation from '@/modules/oms/views/components/configurationAssociation';

import interruptInfo from "@/modules/oms/views/components/interruptInfo";

import attachmentInfo from '@/modules/oms/views/components/attachmentInfo';

export default {
  name: "Event",
  data() {
    return {
      userId: "", //用户id
      procInstId: "", // 流程实例id
      procDefId: "", //流程定义id
      taskId: "", // 环节id

      isOver: "", //该条单是否关闭
      tabActive: "form", //流程图和处理表单tab切换
      isInterrupt: "1", //是否中断
      flowChartData: null, // 默认的流程图片地址
      eventInGroupList: [], // 事件涉及组列表

      seeWarnDialog: false, //查看告警弹出框状态
      warnTableData: [], // 告警消息列表
      warnTableDataPagination: {
        start: 1
      },
      warnTableDataTotal: 0,

      enumOptions: {}, //查询各个select框参数
      createTime: "", // 工单创建时间
      attachment: [], //附件
      uploadData: new FormData(),
      inputFile: "", //input框显示第一个文件的名字
      fileList: [], //文件列表数组

      systemInfo: [], //所属系统信息
      eventInfo: [], //事件类别信息
      nextNodeDealManList: "", //下一环节解决人信息

      currentAlertactiveNameInfo: "first",

      alertYuLanData: {},

      alertTableData: [],

      currentAlertDialog: false,

      ruleForm: {
        title: "事件标题", // 事件标题
        workListId: "", // 事件ID
        description: "", // 事件描述
        createTime: "", // 登记时间
        eventTime: "", // 事件发生时间
        businessRecoveryTime: "", //业务恢复时间
        relatedQuestionId: "", //关联问题单号
        relatedChangeId: "", //关联变更单号
        eventNature: "", // 事件性质
        eventSource: "", // 事件来源
        procInstDueTime: "", //事件完成期限
        eventInfluenceDegree: "", // 事件影响度select
        eventPriority: "", // 事件优先级
        eventStatus: "", // 事件状态
        relatedOrg: [], // 事件涉及组
        consultationReasonCategory: "", // 协查原因类别
        location: "", // 地点

        system: [], // 所属系统类型select
        systemSubclass: "", // 所属系统类型子类select
        systemItem: "", // 所属业务系统条目select
        // eventCategory: [], // 事件类别select
        // eventCategory1: "", // 事件子类select
        // eventCategory2: "", // 事件条目

        isRepeating: "", //重复事件标记

        interruption: "", //综合账务中断时长
        convergentBillingInterruption: "", //融合计费中断时长
        customerServiceInterruption: "", //客户服务中断时长

        completeCode: "", //事件结束代码
        theSolutionRole: "", //事件解决人角色
        theSolution: "", //事件解决人
        isTimeout: "", //处理是否超时
        manufacturerId: "", //故障厂商
        message: "", //处理意见
        fullMsg: "" //解决方案
      }
    };
  },
  components: {
    DeepTable,
    mailTable,
    processSteps,
    traceabilityMatrix,
    configurationAssociation,
    interruptInfo,
    attachmentInfo
  },
  computed: {
    showOptionsEnum() {
      // if the optionsEnum has data
      return Object.keys(this.enumOptions).length > 0;
    }
  },
  watch: {
    tabActive(val, oldVal) {
      this.changeTab(val);
    }
  },
  mounted() {
    const tabActive = this.$route.query.tabActive;
    if (tabActive === "chart") {
      this.tabActive = "chart";
    }
    this.init();
  },
  filters: {
    formateTime: value => {
      if (!value) return "";
      value = value.slice(0, value.length - 2);
      return value;
    }
  },
  methods: {
    init() {
      // 进入index页面就调用，创建流程实例id
      this.userId = this.$store.getters.userId; //获取用户id
      this.procDefId = this.$route.params.procDefId; //获取流程定义id
      this.procInstId = this.$route.params.procInstId; // 获取流程实例id
      this.taskId = this.$route.params.taskId; // 环节id
      this.tabActive = this.$route.query.tabActive || "form";
      this.isOver = this.$route.query.isOver;

      this.queryParams();
      this.queryData();
      this.queryEventInGroup();
      this.querySystemType();
      this.queryEventType();
      // this.queryWarnList();
    },
    showWarnDetail(row) {
      
      requests({
        method: "GET",
        url: row.url
      }).then(res => {
          
        if(!res.data) {
          return;
        }

        this.alertYuLanData = res.data;

        this.currentAlertDialog = true

        let result = res.data.resObj;

        if (result) {
          this.alertTableData = result.filter(val => {
            return val.label;
          });
        } else {
          this.alertTableData = [];
        }
      });
    },
    // queryWarnList() {
    //   const params = {
    //     start: (this.warnTableDataPagination.start - 1) * 5,
    //     limit: 5,
    //     procInstId: this.procInstId
    //   };
    //   service.queryWarnList(params).then(res => {
    //     this.warnTableData = res.result;
    //     this.warnTableDataTotal = res.count;
    //   });
    // },
    queryData() {
      //查询表单数据
      var params = {
        procInstId: this.procInstId
      };
      service.queryData(params).then(res => {
        this.ruleForm = { ...this.ruleForm, ...res.result[0].form};
        this.ruleForm.title = res.result[0].title;
        this.ruleForm.description = res.result[0].description;
        this.ruleForm.location = res.result[0].location;

        this.ruleForm.eventStatus = this.$route.query.eventStatus || "事件结束";
        let nowTime = new Date();
        let deadTime = new Date(this.ruleForm.dueTime);
        if (deadTime > nowTime) {
          this.ruleForm.isTimeout = 1;
        } else {
          this.ruleForm.isTimeout = 0;
        }

        // 所属系统信息与所属事件类别信息转化为数组，在页面框中显示 ['100','200','300']
        let systemArr = [
          this.ruleForm.system,
          this.ruleForm.systemSubclass,
          this.ruleForm.systemItem
        ];
        // let eventCategoryArr = [
        //   this.ruleForm.eventCategory,
        //   this.ruleForm.eventCategory1,
        //   this.ruleForm.eventCategory2
        // ];
        this.ruleForm.system = systemArr;
        // this.ruleForm.eventCategory = eventCategoryArr;

        this.ruleForm.relatedOrg = this.ruleForm.relatedOrg.split("&");
        // this.ruleForm.relatedOrg.forEach((item, index) => {
        //   this.ruleForm.relatedOrg[index] = parseFloat(
        //     this.ruleForm.relatedOrg[index]
        //   );
        // });
        var formateTime = time => {
          if (!time) return "";
          time = time.slice(0, time.length - 2);
          return time;
        };
        this.ruleForm.createTime = formateTime(this.ruleForm.createTime);
        this.ruleForm.eventTime = formateTime(this.ruleForm.eventTime);
        this.ruleForm.businessRecoveryTime = formateTime(
          this.ruleForm.businessRecoveryTime
        );
        this.ruleForm.dueTime = formateTime(this.ruleForm.dueTime);
        // this.nextNodeDealMan(); //拿到机构id查询下一环节解决人

      });
    },
    queryAttachments() {
      // 查询文件
      service
        .queryAttachments({
          procInstId: this.$route.params.procInstId,
          start: (this.currentPage - 1) * this.pageSize, // （当前页数-1）*每页显示的条数,
          limit: this.pageSize
        })
        .then(res => {
          // 
          this.attachment = res.result;
          this.totalCount = res.count;
        });
    },
    regressesQuery() {
      //回退按钮
      this.$confirm("确认退回到上一个节点吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          service.regressesQuery(this.procInstId).then(res => {
            let obj = res.result[res.result.length - 1];
            let data = {
              procInstId: obj.procInstId,
              taskId: this.taskId,
              taskKey: obj.taskKey,
              assignee: this.userId,
              status: 1,
              data: JSON.stringify({ form: { message: this.ruleForm.message } })
            };
            service
              .nodeBack(data)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "回退成功！"
                });
              })
              .catch(err => {
                if (err.response.status === 409) {
                  this.$message({
                    type: "error",
                    message: "您已转单，无法回退！"
                  });
                } else {
                  this.$message({
                    type: "error",
                    message: "回退失败！"
                  });
                }
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "回退失败！"
          });
        });
    },
    saveAsDraft(formName) {
      //保存草稿
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      // if (this.fileList.length > 0) {
      //   this.uploadAttachment(); // 上传附件
      // }
      let ruleForm = Object.assign({}, this.ruleForm);
      ruleForm.relatedOrg = ruleForm.relatedOrg.join("&"); //事件涉及组值类型： '100&200&300'

      let systemBox = ruleForm.system.slice(0);
      let eventCategoryBox = ruleForm.eventCategory.slice(0);

      ruleForm.system = systemBox[0]; //系统类型
      ruleForm.systemSubclass = systemBox[1]; //系统子类
      ruleForm.systemItem = systemBox[2]; //系统条目

      ruleForm.eventCategory = eventCategoryBox[0]; //事件类别
      ruleForm.eventCategory1 = eventCategoryBox[1] || ""; //事件子类
      ruleForm.eventCategory2 = eventCategoryBox[2] || ""; //事件条目

      let data = {
        procInstId: this.procInstId,
        taskId: this.taskId,
        description: ruleForm.description,
        location: ruleForm.location,
        title: ruleForm.title,
        form: {
          ...ruleForm
        }
      };
      if (data.form.eventTime === "") {
        delete data.form.eventTime;
      }

      delete data.form.description;
      delete data.form.location;
      delete data.form.title;
      delete data.attachment;

      service.updateFormData(this.procInstId, data).then(res => {
        // if (this.fileList.length > 0) {
        //   await this.uploadAttachment();
        // }
        this.$message({
          message: "保存成功！",
          type: "success"
        });
      });
      //   } else {
      //     return false;
      //   }
      // });
    },
    
    queryParams() {
      // 查询页面所有下拉框的options内容
      const params = {
        name:
          "event_source,event_influence_degree,event_nature,event_priority,system,system_subclass,event_category,event_category_1,event_category_2,system_item,consultation_reason_category"
      };
      service.queryParams(params).then(res => {
        const data = res.result;
        if (data && data.length) {
          const obj = {};
          data.forEach(item => {
            obj[item.name] = item.value.split(",");
          });

          for (var key in obj) {
            if (key.indexOf("_") > -1) {
              var arr = key.split("_");
              var keys = "";
              arr.forEach((item, index) => {
                if (index === 0) {
                  keys += item;
                } else {
                  keys +=
                    arr[index].charAt(0).toUpperCase() + arr[index].substr(1);
                }
              });
              obj[keys] = obj[key];
              delete obj[key];
            }
          }
          this.enumOptions = obj;
        }
      });
    },
    queryEventInGroup() {
      // 查询事件涉及组
      const params = {};
      service.queryEventInGroup(params).then(res => {
        let deep = function(arr) {
          arr.forEach(item => {
            item.value = item.object.deptId;
            item.label = item.object.deptName;
            if (item.children) {
              deep(item.children);
            }
          });
        };
        deep(res);
        this.eventInGroupList = res;
      });
    },
    nextNodeDealMan() {
      // 查询下一环节解决人
      const params = {
        orgId: this.ruleForm.relatedOrg // 机构id--事件涉及组
      };
      service.nextNodeDealMan(params).then(res => {
        this.nextNodeDealManList = res.result;
      });
    },
    querySystemType() {
      //查询系统类型信息
      service.querySystemType().then(res => {
        let deep = function(arr) {
          arr.forEach(item => {
            item.value = item.object.id;
            item.label = item.object.name;
            if (item.children) {
              deep(item.children);
            }
          });
        };
        deep(res);
        this.systemInfo = res;
        // var result = res.result
        //   .map(item => {
        //     var system = item.system.split(".");
        //     return deep(system);
        //   })
        //   .reduce(function(a, b) {
        //     return a.concat(b);
        //   }, []);
        // findParentNode(result);
        // this.systemInfo = result;
      });
    },
    queryEventType() {
      //事件类别信息
      service.queryEventType().then(res => {
        // this.eventInfo
        let deep = function(arr) {
          arr.forEach(item => {
            item.value = item.object.id;
            item.label = item.object.name;
            if (item.children) {
              deep(item.children);
            }
          });
        };
        deep(res);
        this.eventInfo = res;
        // var result = res.result
        //   .map(item => {
        //     var uri = item.uri.split(".").slice(1);
        //     return deep(uri);
        //   })
        //   .reduce(function(a, b) {
        //     return a.concat(b);
        //   }, []);
        // findParentNode(result);
        // this.eventInfo = result;
      });
    },
    systemInfoChange(value) {
      this.ruleForm.system = value;
    },
    eventCategoryInfoChange(value) {
      this.ruleForm.eventCategory = value;
    },
    onChange(file, fileList) {
      //文件状态改变时的钩子
      let size = file.size / 1024 / 1024 > 10;
      if(size){
        this.$message({
          message: "上传文件大小不能超过 10MB!,将自动滤过10M大文件",
          type: "error"
        });
        fileList.pop();
      }
      this.fileList = fileList;
      if(this.fileList.length>0){
        this.inputFile = this.fileList[0].name
      }
    },
    beforeRemove(file) {
      //删除文件之前的钩子
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      //文件列表移除文件时的钩子
      this.fileList = fileList;
      if (this.fileList.length > 0) {
        this.inputFile = this.fileList[0].name;
      } else {
        this.inputFile = "";
      }
    },
    uploadAttachment() {
      // 上传附件
      const formdatas = this.uploadData;
      this.fileList.forEach((item, index) => {
        formdatas.append("files", item.raw);
      });
      formdatas.append("taskId", this.taskId);
      formdatas.append("procInstId", this.procInstId);
      formdatas.append("userId", this.userId);

      service.uploadAttachment(formdatas).then(res => {});
    },
    validatePass(rule, value, callback) {
      //字段必填验证提示
      if (value === "") {
        callback(new Error(" "));
        const h = this.$createElement;
        this.$notify({
          title: "提示",
          message: rule.myMessage,
          duration: 2000
        });
      } else {
        callback();
      }
    },
    changeTab(val) {
      //流程图和处理表单tab切换
      this.tabActive = val;
      if (this.tabActive === "chart") {
        const baseURL = service.request.defaults.baseURL;
        let flowChartURL = "";
        
        if (this.isOver) {
          flowChartURL = `${baseURL}/oms/api/v1/processInstances/flowchart?procDefId=${
            this.procDefId
          }`;
        } else {
          flowChartURL = `${baseURL}/oms/api/v1/processInstances/flowchart?procInstId=${
            this.procInstId
          }`;
        }
        this.flowChartData = flowChartURL;
      }
    },
    enlarge() {
      //点击新窗口打开大图
      const baseURL = service.request.defaults.baseURL;
      let flowChartURL = "";
      if (this.isOver) {
        flowChartURL = `${baseURL}/oms/api/v1/processInstances/flowchart?procDefId=${
          this.procDefId
        }&time=${Date.now()}`;
      } else {
        flowChartURL = `${baseURL}/oms/api/v1/processInstances/flowchart?procInstId=${
          this.procInstId
        }&time=${Date.now()}`;
      }
      window.open(flowChartURL);
    },
    getFullMsg(val){
      this.ruleForm.fullMsg = val
    }
  }
};
</script>
<style lang="scss">
.isInterrupt {
  margin-left: 80px;
}
// .allInfo {
//   .oms-input {
//     .el-input__inner {
//       border: none;
//     }
//     .el-input__inner:hover {
//       border: none;
//     }
//   }
//   .titleBar {
//     margin: 0;
//     padding: 10px;
//     border-top: 1px solid #fff;
//     border-left: 1px solid #fff;
//     border-right: 1px solid #fff;
//   }
//   .basicInfoArea {
//     border: none;
//   }
//   .dealStepsArea {
//     border: none;
//   }
//   .eventDicr {
//     .el-textarea__inner {
//       border: none;
//     }
//   }
//   .el-input__suffix {
//     display: none;
//   }
//   .el-input__inner {
//     border: none;
//   }
//   .eventDicr.closeEvent {
//     .el-textarea__inner {
//       height: 120px;
//     }
//   }
// }
</style>


