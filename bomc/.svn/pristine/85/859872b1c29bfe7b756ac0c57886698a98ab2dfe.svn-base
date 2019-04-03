<template>
  <div class="oms-diy-elementui eventContainer">
    <div class="right changeIcon">
      <span @click="changeTab('form')">
        <svg-icon class="oms-icon" icon-class="form"/>
      </span>
      <span @click="changeTab('attachmentInfo')">
        <svg-icon class="oms-icon" icon-class="clipboard"/>
      </span>
      <span @click="changeTab('chart')">
        <svg-icon class="oms-icon" icon-class="tree"/>
      </span>
    </div>
    <el-form
      v-show="tabActive === 'form'"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-row class="clearfix titleBar">
        <div class="basicInfo left">基本信息</div>
      </el-row>
      <div class="basicInfoArea">
        <el-row>
          <el-col :span="16">
            <el-form-item label="事件标题：" prop>
              <el-input class="oms-input" v-model="ruleForm.title" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件ID：" prop>
              <el-input class="oms-input" v-model="ruleForm.workListId" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item class="eventDicr firstSecondLine" label="事件描述：" prop>
              <el-input type="textarea" v-model="ruleForm.description" :disabled="true"></el-input>

              <!-- <el-popover
                popper-class="warn-table-container"
                placement="right"
                width="300"
                trigger="click"
              >
                <el-table :data="warnTableData" @row-click="showWarnDetail" width="100%">
                  <el-table-column align="center" width="60" type="index" label="序号"></el-table-column>
                  <el-table-column align="center" property="id" label="告警ID"></el-table-column>
                  <el-table-column align="center" label="告警名称" prop="name"></el-table-column>
                </el-table>

                <el-pagination
                  v-if="warnTableDataTotal > 5"
                  :current-page.sync="warnTableDataPagination.start"
                  layout="prev, pager, next"
                  :total="warnTableDataTotal"
                ></el-pagination>

                <span slot="reference" class="seeWarn">
                  <i class="el-icon-warning"></i>
                </span>
              </el-popover> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记时间：" prop>
              <el-date-picker
                class="oms-input"
                v-model="ruleForm.createTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item label="事件发生时间：" prop>
              <el-date-picker
                class="oms-input"
                v-model="ruleForm.eventTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="事件性质：" prop>
              <el-select v-model="ruleForm.eventNature" class="oms-select" :disabled="true">
                <el-option
                  v-for="item in enumOptions.eventNature"
                  v-if="showOptionsEnum"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件来源：" prop>
              <el-select v-model="ruleForm.eventSource" class="oms-select" :disabled="true">
                <el-option
                  v-for="item in enumOptions.eventSource"
                  v-if="showOptionsEnum"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件完成期限：" prop>
              <el-date-picker
                class="oms-input"
                v-model="ruleForm.dueTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="事件影响度：" prop>
              <el-select
                v-model="ruleForm.eventInfluenceDegree"
                class="oms-select"
                :disabled="true"
              >
                <el-option
                  v-for="item in enumOptions.eventInfluenceDegree"
                  v-if="showOptionsEnum"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件优先级：" prop>
              <el-select
                v-model="ruleForm.eventPriority"
                placeholder
                class="oms-select"
                :disabled="true"
              >
                <el-option
                  v-for="item in enumOptions.eventPriority"
                  v-if="showOptionsEnum"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件状态：" prop>
              <el-input class="oms-input" v-model="ruleForm.eventStatus" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="事件涉及组：" prop>
              <el-cascader
                :options="eventInGroupList"
                v-model="ruleForm.relatedOrg"
                :disabled="true"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="协查原因类别：" prop>
              <el-select
                v-model="ruleForm.consultationReasonCategory"
                class="oms-select"
                :disabled="true"
              >
                <el-option
                  v-for="(item,index) in enumOptions.consultationReasonCategory"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地点：" prop>
              <el-input class="oms-input" v-model="ruleForm.location" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item class="pointer" label="所属系统信息：" prop>
              <el-cascader
                v-model="ruleForm.system"
                @change="systemInfoChange"
                :options="systemInfo"
                :disabled="true"
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
                v-model="ruleForm.eventCategory"
                @change="eventCategoryInfoChange"
                :options="eventInfo"
                :disabled="true"
              ></el-cascader>
            </el-form-item>
          </el-col>-->
        </el-row>
      </div>

      <el-row class="clearfix titleBar">
        <div class="basicInfo left">处理步骤</div>
      </el-row>
      <div class="dealStepsArea">
        <process-steps :procInstId.sync="procInstId" :ruleForm.sync="ruleForm"></process-steps>
      </div>

      <el-row class="clearfix titleBar">
        <div class="basicInfo left">处理记录</div>
      </el-row>
      <div class="dealStepsArea">
        <el-row>
          <el-col :span="8">
            <el-form-item label="下一环节解决人" prop="nextNodeDealMan">
              <el-select v-model="ruleForm.nextNodeDealMan" class="oms-select">
                <el-option
                  v-for="(item,index) in nextNodeDealManList"
                  :key="index"
                  :label="item.realName"
                  :value="item.userId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item class="dealSuggestion textarea" label="处理意见：" prop="message">
              <span class="inputTips">最多输入500个字符</span>
              <el-input type="textarea" v-model.trim="ruleForm.message" class="oms-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="clearfix uploadArea">
          <span class="uploadName uploadNameEvent left">上传附件：</span>
          <span class="upload-tips">提示：最多上传10个文件，每个文件最大10M</span>
          <div class="oms-upload">
            <el-upload
              class="upload-demo"
              action
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="10"
              :on-change="onChange"
              :file-list="fileList"
              :auto-upload="false"
            >
              <i class="el-icon-upload oms-icon upload-icon"></i>
            </el-upload>
          </div>
        </el-row>
      </div>

      <el-tabs type="border-card" class="tabsArea">
        <!-- <el-tab-pane label="解决方案">
          <el-row>
            <el-col :span="24">
              <el-form-item class="fullMsg" label="解决方案：">
                <el-input type="textarea" v-model="ruleForm.fullMsg" class="oms-input" disabled>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>-->
        <el-tab-pane label="配置关联项">
          <configuration-association :procInstId="procInstId" :taskId="taskId"></configuration-association>
        </el-tab-pane>

        <el-tab-pane label="跟踪矩阵">
          <traceability-matrix :procInstId="procInstId" :ruleForm="ruleForm"></traceability-matrix>
        </el-tab-pane>
      </el-tabs>

      <el-dialog :visible.sync="currentAlertDialog" width="70%">
        <el-tabs v-model="currentAlertactiveNameInfo">
          <el-tab-pane label="告警信息" name="first">
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
          <el-tab-pane label="对象信息" name="second">
            <mailTable :tableData="alertTableData" :tableStyle="{ width:'600px' }"></mailTable>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="currentAlertDialog = false">返回</el-button>
        </div>
      </el-dialog>

      <el-row class="operation">
        <el-button type="info" @click="saveAsDraft('ruleForm')">保存草稿</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-row>
    </el-form>

    <div v-show="tabActive === 'attachmentInfo'">
      <attachment-info :procInstId="procInstId"></attachment-info>
    </div>

    <div v-show="tabActive === 'chart'" class="flow-chart">
      <img v-if="flowChartData" :src="flowChartData" class="chart" alt="流程图" @click="enlarge">
    </div>
  </div>
</template>
<script>
import * as service from "@/modules/oms/api/oms/eventForm";
import { parseTime } from "@/utils/index";
import { findParentNode, deep } from "@/modules/oms/utils/omstree.js";

import DeepTable from "@/modules/oms/views/layout/components/DeepTable";

import resource from "@/modules/oms/resource.js";

import mailTable from "@/components/columnTable/cloumnTable.vue";

import requests from "@/modules/oms/api/index";

import processSteps from "@/modules/oms/views/components/processSteps";

import traceabilityMatrix from "@/modules/oms/views/components/traceabilityMatrix";

import configurationAssociation from "@/modules/oms/views/components/configurationAssociation";

import attachmentInfo from "@/modules/oms/views/components/attachmentInfo";

export default {
  name: "schemeDesign", // 方案制定
  data() {
    return {
      userId: "", //用户id
      procInstId: "", // 流程实例id
      procDefId: "", //流程定义id
      taskId: "", // 环节id

      isSaved: false,
      tabActive: "", //流程图和处理表单tab切换
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

      commentId: "", // 处理意见id

      ruleForm: {
        title: "", // 事件标题
        workListIds: "", // 事件ID
        description: "", // 事件描述
        createTime: "", // 登记时间
        eventTime: "", // 事件发生时间
        relatedQuestionId: "", //关联问题单号
        relatedChangeId: "", //关联变更单号
        eventNature: "", // 事件性质
        eventSource: "", // 事件来源
        dueTime: "", //事件完成期限
        eventInfluenceDegree: "", // 事件影响度select
        eventPriority: "", // 事件优先级
        eventStatus: "方案制定", // 事件状态
        relatedOrg: [], // 事件涉及组
        consultationReasonCategory: "", // 协查原因类别
        location: "", // 地点

        system: [], // 所属系统类型select
        systemSubclass: "", // 所属系统类型子类select
        systemItem: "", // 所属业务系统条目select

        eventCategory: [], // 事件类别select
        eventCategory1: "", // 事件子类select
        eventCategory2: "", // 事件条目
        message: "", //处理意见
        fullMsg: "" //解决方案
      },
      rules: {
        nextNodeDealMan: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "下一环节处理人不能为空",
            trigger: "blur"
          }
        ],
        message: [
          {
            validator: this.validatePass,
            required: false,
            myMessage: "处理意见不能超过500个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    DeepTable,
    mailTable,
    processSteps,
    traceabilityMatrix,
    configurationAssociation,
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
  beforeRouteLeave(to, from, next) {
    if (!this.isSaved) {
      this.$confirm(
        "是否确定离开当前页面，若离开该页面已填内容将不会被保存?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.removeTag();
          next();
        })
        .catch(() => {});
    } else {
      next();
    }
  },
  mounted() {
    this.init();
    window.onbeforeunload = function() {
      return true;
    };
  },
  destroyed() {
    window.onbeforeunload = null;
  },
  methods: {
    init() {
      // 进入index页面就调用，创建流程实例id
      this.userId = this.$store.getters.userId; //获取用户id
      this.procInstId = this.$route.params.procInstId; // 获取流程定义id
      this.taskId = this.$route.params.taskId; // 环节id
      this.tabActive = this.$route.query.tabActive || "form";
      this.isDraft = this.$route.query.isDraft;

      this.queryParams();
      this.queryData();
      this.queryEventInGroup();
      // this.queryAttachments();

      this.querySystemType();
      this.queryEventType();
      // this.queryWarnList();
    },
    showWarnDetail(row) {
      requests({
        method: "GET",
        url: row.url
      }).then(res => {
        if (!res.data) {
          return;
        }

        this.alertYuLanData = res.data;

        this.currentAlertDialog = true;

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

      if (this.isDraft) {
        params.isDraft = 1;
        this.queryComments();
      }

      service.queryData(params).then(res => {
        this.ruleForm = { ...this.ruleForm, ...res.result[0].form };
        this.ruleForm.title = res.result[0].title;
        this.ruleForm.description = res.result[0].description;
        this.ruleForm.location = res.result[0].location;
        this.ruleForm.eventStatus = "方案制定";

        // 所属系统信息与所属事件类别信息转化为数组，在页面框中显示 ['100','200','300']
        let systemArr = [
          this.ruleForm.system,
          this.ruleForm.systemSubclass,
          this.ruleForm.systemItem
        ];
        this.ruleForm.system = systemArr;

        if (this.ruleForm.eventCategory !== null) {
          // 事件类别信息 有内容
          let eventCategoryArr = [
            this.ruleForm.eventCategory,
            this.ruleForm.eventCategory1,
            this.ruleForm.eventCategory2
          ];
          this.ruleForm.eventCategory = eventCategoryArr;
        } else {
          // 事件类别信息 没有内容
          this.ruleForm.eventCategory = "";
          this.ruleForm.eventCategory1 = "";
          this.ruleForm.eventCategory2 = "";
          this.ruleForm.eventCategory = [];
        }

        this.ruleForm.relatedOrg = this.ruleForm.relatedOrg.split("&");
        // this.ruleForm.relatedOrg.forEach((item, index) => {
        //   this.ruleForm.relatedOrg[index] = parseFloat(
        //     this.ruleForm.relatedOrg[index]
        //   );
        // });
        this.nextNodeDealMan(); //拿到机构id查询下一环节解决人
      });
    },
    queryComments() {
      const params = {
        taskId: this.taskId,
        isDraft: 1
      };
      service.queryComments(params).then(res => {
        this.ruleForm.message = res.result[0].message;
        this.ruleForm.nextNodeDealMan = res.result[0].assignee;
        this.commentId = res.result[0].id;
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
      let ruleForm = Object.assign({}, this.ruleForm);
      ruleForm.relatedOrg = ruleForm.relatedOrg.join("&"); //事件涉及组值类型： '100&200&300'

      let systemBox = ruleForm.system.slice(0);
      ruleForm.system = systemBox[0]; //系统类型
      ruleForm.systemSubclass = systemBox[1]; //系统子类
      ruleForm.systemItem = systemBox[2]; //系统条目

      let eventCategoryBox;
      if (ruleForm.eventCategory !== []) {
        // 事件类别信息 有内容
        eventCategoryBox = ruleForm.eventCategory.slice(0);
        ruleForm.eventCategory = eventCategoryBox[0] || ""; //事件类别
        ruleForm.eventCategory1 = eventCategoryBox[1] || ""; //事件子类
        ruleForm.eventCategory2 = eventCategoryBox[2] || ""; //事件条目
      } else {
        // 事件类别信息 没有内容
        ruleForm.eventCategory = "";
        ruleForm.eventCategory1 = "";
        ruleForm.eventCategory2 = "";
      }

      let data = {
        procInstId: this.procInstId,
        taskId: this.taskId,
        description: ruleForm.description,
        location: ruleForm.location,
        isDraft: 1,
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

      const dataComments = {
        procInstId: this.procInstId,
        taskId: this.taskId,
        userId: this.userId,
        id: this.commentId,
        message: this.ruleForm.message,
        assignee: this.ruleForm.nextNodeDealMan,
        isDraft: 1
      };

      const loading = this.$loading({
        fullscreen: true,
        lock: true,
        text: "正在保存，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      let addComments = service.addComments(dataComments);
      let updateFormData = service.updateFormData(this.procInstId, data);
      const postArr = [];
      postArr.concat([addComments, updateFormData]);
      Promise.all(postArr)
        .then(res => {
          loading.close();
          this.isSaved = true;
          this.$message({
            message: "保存成功！",
            type: "success"
          });
        })
        .catch(e => {
          loading.close();
        });
    },
    submitForm(formName) {
      // 提交按钮
      this.$refs[formName].validate(valid => {
        if (valid) {
          let ruleForm = Object.assign({}, this.ruleForm);
          ruleForm.relatedOrg = ruleForm.relatedOrg.join("&"); //事件涉及组值类型： '100&200&300'

          let systemBox = ruleForm.system.slice(0);
          ruleForm.system = systemBox[0]; //系统类型
          ruleForm.systemSubclass = systemBox[1]; //系统子类
          ruleForm.systemItem = systemBox[2]; //系统条目

          let eventCategoryBox;
          if (ruleForm.eventCategory !== []) {
            // 事件类别信息 有内容
            eventCategoryBox = ruleForm.eventCategory.slice(0);
            ruleForm.eventCategory = eventCategoryBox[0] || ""; //事件类别
            ruleForm.eventCategory1 = eventCategoryBox[1] || ""; //事件子类
            ruleForm.eventCategory2 = eventCategoryBox[2] || ""; //事件条目
          } else {
            // 事件类别信息 没有内容
            ruleForm.eventCategory = "";
            ruleForm.eventCategory1 = "";
            ruleForm.eventCategory2 = "";
          }

          let dataString = {
            procInstId: this.procInstId,
            description: ruleForm.description,
            location: ruleForm.location,
            title: ruleForm.title,
            form: {
              ...ruleForm
            }
          };
          delete dataString.form.description;
          delete dataString.form.location;
          delete dataString.form.title;

          let data = {
            data: JSON.stringify(dataString),
            procInstId: this.procInstId, // 流程实例id
            taskId: this.taskId, // 环节id
            status: 1,
            title: this.ruleForm.title,
            assignee: this.userId,
            variables: [
              { key: "userIdSixth", value: this.ruleForm.nextNodeDealMan }
            ]
          };
          this.$confirm("是否确认提交?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(async () => {
              const loading = this.$loading({
                fullscreen: true,
                lock: true,
                text: "正在提交，请稍后...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });
              let postArr = [];
              let submitForm = service.submitForm(data);
              postArr.push(submitForm);
              if (this.fileList.length > 0) {
                postArr.push(this.uploadAttachment());
              }
              Promise.all(postArr)
                .then(res => {
                  loading.close();
                  this.$message({
                    message: "提交成功！",
                    type: "success"
                  });
                  this.isSaved = true;
                  this.$store.dispatch("changeNeedDealCount");
                  this.removeTag();
                  this.$router.push({ path: "/myDesk/myNeedDeal" });
                })
                .catch(e => {
                  loading.close();
                });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消提交！"
              });
            });
        } else {
          return false;
        }
      });
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
        orgId: this.ruleForm.relatedOrg[this.ruleForm.relatedOrg.length - 1] // 机构id--事件涉及组
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
      if (size) {
        this.$message({
          message: "上传文件大小不能超过 10MB!,将自动滤过10M大文件",
          type: "error"
        });
        fileList.pop();
      }
      this.fileList = fileList;
      if (this.fileList.length > 0) {
        this.inputFile = this.fileList[0].name;
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

      return service.uploadAttachment(formdatas);
    },
    validatePass(rule, value, callback) {
      //字段必填验证提示
      if (!value && rule.fullField != "message") {
        callback(new Error(" "));
        const h = this.$createElement;
        this.$notify({
          title: "提示",
          message: rule.myMessage,
          duration: 2000
        });
      } else if (rule.fullField === "message") {
        if (value && !this.getStrLenght(value, 500)) {
          callback(new Error(" "));
          this.$notify({
            title: "提示",
            message: rule.myMessage,
            duration: 2000
          });
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
    changeTab(val) {
      //流程图和处理表单tab切换
      this.tabActive = val;
      if (this.tabActive === "chart") {
        const baseURL = service.request.defaults.baseURL;
        this.flowChartData = `${baseURL}/oms/api/v1/processInstances/flowchart?procInstId=${
          this.procInstId
        }&time=${Date.now()}`;
      }
    },
    enlarge() {
      //点击新窗口打开大图
      const baseURL = service.request.defaults.baseURL;
      window.open(
        `${baseURL}/oms/api/v1/processInstances/flowchart?procInstId=${
          this.procInstId
        }&time=${Date.now()}`
      );
    },
    getStrLenght(message, MaxLenght) {
      var strlenght = 0; //初始定义长度为0
      var txtval = message;
      var isCN = function(str) {
        //判断是不是中文
        var regexCh = /[u00-uff]/;
        return !regexCh.test(str);
      };
      for (var i = 0; i < txtval.length; i++) {
        if (isCN(txtval.charAt(i)) == true) {
          strlenght = strlenght + 2; //中文为2个字符
        } else {
          strlenght = strlenght + 1; //英文一个字符
        }
      }
      return strlenght > MaxLenght ? false : true;
    }
  }
};
</script>
<style lang="scss">
</style>

