<template>
  <div class="oms-diy-elementui eventContainer problemContainer changeForm urgApproval">
    <div class="right changeIcon">
      <span @click="changeTab('form')">
        <svg-icon class="oms-icon" icon-class="form"/>
      </span>
       <span @click="changeTab('attachmentInfo')">
        <svg-icon
          class="oms-icon"
          icon-class="clipboard"
        />
      </span>
      <span @click="changeTab('chart')">
        <svg-icon class="oms-icon" icon-class="tree"/>
      </span>
    </div>
    <el-form
      v-show=" tabActive === 'form' "
      :model="ruleForm"
      :rules="rules"
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
            <el-form-item label="变更标题">
              <el-input class="oms-input" v-model="ruleForm.title" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="变更ID">
              <el-input class="oms-input" v-model="ruleForm.workListId" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="变更描述" class="changeFromDescr textarea" prop="description">
              <el-input
                class="oms-input"
                type="textarea"
                v-model="ruleForm.description"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记时间">
              <el-date-picker
                class="oms-input"
                type="datetime"
                placeholder="选择日期"
                v-model="ruleForm.createTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%;"
                :disabled="true"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="关联的事件单号">
              <el-input class="oms-input" v-model="ruleForm.relatedEventId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="关联的问题单号">
              <el-input class="oms-input" v-model="ruleForm.relatedQuestionId" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="受影响部门">
              <el-input class="oms-input" v-model="ruleForm.affectedDepartment" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="需通知部门">
              <el-cascader v-model="ruleForm.noticeDepartment" :options="[]"></el-cascader>
            </el-form-item>
            <el-form-item label="受影响应用系统">
              <el-input
                class="oms-input"
                v-model="ruleForm.affectedApplicationSystem"
                :disabled="false"
              ></el-input>
            </el-form-item>
            <el-form-item label="期望解决时间">
              <el-input class="oms-input" v-model="ruleForm.dueTime" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="变更来源" prop="alterResource">
              <el-select
                class="oms-select"
                v-model="ruleForm.alterResource"
                placeholder
                :disabled="false"
              >
                <el-option
                  v-for="item in enumOptions.alterResource"
                  v-if="showOptionsEnum"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="变更类型" prop="alterType">
              <el-select
                class="oms-select"
                v-model="ruleForm.alterType"
                placeholder
                :disabled="false"
              >
                <el-option
                  v-for="item in enumOptions.alterType"
                  v-if="showOptionsEnum"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="风险等级" prop="riskLevel">
              <el-select
                class="oms-select"
                v-model="ruleForm.riskLevel"
                placeholder
                :disabled="false"
              >
                <el-option
                  v-for="item in enumOptions.riskLevel"
                  v-if="showOptionsEnum"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="所属系统信息">
              <el-select
                class="oms-select"
                v-model="ruleForm.systemInfo"
                placeholder
                :disabled="true"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="变更涉及组">
              <el-cascader v-model="ruleForm.alterGroup" :options="[]"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="变更分类">
              <el-select
                class="oms-select"
                v-model="ruleForm.alterCategory"
                placeholder
                :disabled="true"
              ></el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="变更状态">
              <el-select class="oms-select" v-model="ruleForm.status" placeholder :disabled="true">
                <el-option label="已登记" value="已登记"></el-option>
                <el-option label="计划中" value="计划中"></el-option>
                <el-option label="审批中" value="审批中"></el-option>
                <el-option label="待分派" value="待分派"></el-option>
                <el-option label="处理中" value="处理中"></el-option>
                <el-option label="回顾中" value="回顾中"></el-option>
                <el-option label="关闭" value="关闭"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否仅更新配置">
              <el-select
                class="oms-select"
                v-model="ruleForm.isUpdateConfiguration"
                placeholder
                :disabled="false"
              >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否中断业务">
              <el-select
                class="oms-select"
                v-model="ruleForm.isInterruptBusiness"
                placeholder
                :disabled="false"
              >
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <el-row class="clearfix titleBar">
        <div class="basicInfo left">处理步骤</div>
      </el-row>

      <div class="dealStepsArea">
        <process-steps :procInstId.sync="procInstId" ></process-steps>
      </div>

      <el-row class="clearfix titleBar">
        <div class="basicInfo left">处理记录</div>
      </el-row>
      <div class="dealStepsArea">
        <el-row></el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="下一环节处理人">
              <el-cascader v-model="ruleForm.nextLinkDealUserId" :options="[]"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下一环节期望完成时间" label-width="170px">
              <el-date-picker
                class="oms-input"
                type="datetime"
                placeholder="选择日期"
                v-model="ruleForm.nextLinkExpectedCompleteTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%;"
                :disabled="false"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核结果" prop="checkResults">
              <el-select
                class="oms-select"
                v-model="ruleForm.checkResults"
                placeholder
                :disabled="false"
              >
                <el-option label="通过" value="通过"></el-option>
                <el-option label="不通过" value="不通过"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="处理意见" class="dealSuggestion textarea">
              <el-input
                class="oms-input"
                type="textarea"
                v-model.trim="ruleForm.message"
                :disabled="false"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <upload @fileListChange="fileListChange"></upload>
      </div>

      <el-tabs type="border-card" class="tabsArea">
        <el-tab-pane label="计划与方案">
          <el-row>
            <el-col :span="12">
              <el-form-item label="变更计划" class="dealSuggestion textarea">
                <el-input
                  class="oms-input"
                  type="textarea"
                  v-model="ruleForm.alterPlan"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="回退方案" class="dealSuggestion textarea">
                <el-input
                  class="oms-input"
                  type="textarea"
                  v-model="ruleForm.fallbackProposal"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="实施计划开始时间">
                <el-date-picker
                  class="oms-input"
                  type="datetime"
                  placeholder="选择日期"
                  v-model="ruleForm.implementationPlanStartTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="实施计划结束时间">
                <el-date-picker
                  class="oms-input"
                  type="datetime"
                  placeholder="选择日期"
                  v-model="ruleForm.implementationPlanEndTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="是否影响考核">
                <el-select
                  class="oms-select"
                  v-model="ruleForm.isAffectCheck"
                  placeholder
                  :disabled="true"
                >
                  <el-option label="是" value="是"></el-option>
                  <el-option label="否" value="否"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="变更影响评估" class="dealSuggestion textarea">
                <el-input
                  class="oms-input"
                  type="textarea"
                  v-model="ruleForm.alterAffectEvaluation"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="制定计划开始时间">
                <el-date-picker
                  class="oms-input"
                  type="datetime"
                  placeholder="选择日期"
                  v-model="ruleForm.formulatePlanStartTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="制定计划结束时间">
                <el-date-picker
                  class="oms-input"
                  type="datetime"
                  placeholder="选择日期"
                  v-model="ruleForm.formulatePlanEndTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="配置关联项">
          <configuration-association :procInstId="procInstId" :taskId="taskId"></configuration-association>
        </el-tab-pane>

        <el-tab-pane label="跟踪矩阵">
          <traceability-matrix :procInstId="procInstId" :ruleForm="ruleForm"></traceability-matrix>
        </el-tab-pane>
      </el-tabs>

      <el-row class="operation">
        <el-button type="info">转变更管理流程</el-button>
        <el-button type="info" @click="saveAsDraft('ruleForm')">保存草稿</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-row>
    </el-form>

     <div v-show="tabActive === 'attachmentInfo'">
      <attachment-info :procInstId="procInstId"></attachment-info>
    </div>

    <div v-if="tabActive === 'chart'" class="flow-chart">
      <flow-chart :procInstId="procInstId" :tabActive="tabActive"></flow-chart>
    </div>
  </div>
</template>
<script>
import * as service from "@/modules/oms/api/oms/eventForm";
import * as problemService from "@/modules/oms/api/oms/problemService";
import { findParentNode, deep } from "@/modules/oms/utils/omstree.js";
import flowChart from "@/modules/oms/views/components/flowCharts";
import upload from "@/modules/oms/views/components/upload";
import processSteps from "@/modules/oms/views/components/processSteps";
import traceabilityMatrix from "@/modules/oms/views/components/traceabilityMatrix";
import configurationAssociation from "@/modules/oms/views/components/configurationAssociation";

import attachmentInfo from '@/modules/oms/views/components/attachmentInfo';

export default {
  name: "urgApproval",
  data() {
    return {
      userId: "",
      procInstId: "",
      procDefId: "",
      taskId: "",
      tabActive: "form",
      flowChartData: null,
      changeInvolvedGroupList: [],
      nextNodeDealManList: [],
      ruleForm: {
        workListId: "",
        createTime: "",
        title: "",
        alterResource: "",
        relatedEventId: "",
        relatedQuestionId: "",
        alterType: "",
        riskLevel: "",
        systemInfo: "",
        alterCategory: "",
        description: "",
        affectedApplicationSystem: [],
        affectedDepartment: [],
        isInterruptBusiness: "",
        noticeDepartment: [],
        status: "",
        alterGroup: "",
        dueTime: "",
        convergentBillingInterruption: "",
        interruption: "",
        customerServiceInterruption: "",
        reviewCode: "",
        alterEndCode: "",
        relatedReleaseId: "",
        isUpdateConfiguration: "",
        closeUserId: "",
        closeTime: "",
        message: "",
        checkResults: "",
        nextLinkExpectedCompleteTime: "",
        nextLinkDealUserId: "",
        alterPlan: "",
        fallbackProposal: "",
        implementationPlanStartTime: "",
        implementationPlanEndTime: "",
        isAffectCheck: "",
        alterAffectEvaluation: "",
        formulatePlanStartTime: "",
        formulatePlanEndTime: "",
        planStartTime: "",
        planEndTime: ""
      },
      rules: {
        checkResults: [
          { required: true, myMessage: "审核结果不能为空", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  components: {
    flowChart,
    upload,
    processSteps,
    traceabilityMatrix,
    configurationAssociation,
    attachmentInfo
  },
  computed: {
    showOptionsEnum() {
      return Object.keys(this.enumOptions).length > 0;
    }
  },
  watch: {
    "ruleForm.alterGroup": function(oldValue, newVaule) {
      this.queryEventManager();
      this.nextNodeDealMan();
    }
  },
  methods: {
    init() {
      this.userId = this.$store.getters.userId; //获取用户id
      this.taskId = this.$route.params.taskId;
      this.procDefId = this.$route.params.procDefId; // 获取流程定义id
      this.procInstId = this.$route.params.procInstId;
      this.tabActive = this.$route.query.tabActive || "form";

      this.ruleForm.workListId = this.$route.query.id;
      this.ruleForm.createTime = this.$route.query.createTime;

      this.previousPath = sessionStorage.getItem("previousPath");

      this.queryParams();
      // this.queryData();

      this.querySystemType();
      this.queryEventType();
      this.queryEventInGroup();
    },
    changeTab(val) {
      //流程图和处理表单tab切换
      this.tabActive = val;
      if (this.tabActive === "chart") {
        const baseURL = service.request.defaults.baseURL;
        this.flowChartData = `${baseURL}/oms/api/v1/processInstances/flowchart?procInstId=&time=1546846053890`;
      }
    },
    queryParams() {
      // 查询页面所有下拉框的options内容
      const params = {
        name: "alter_resource,alter_type,risk_level,alter_category"
      };
      service.queryParams(params).then(res => {
        const data = res.result;
        if (data && data.length) {
          name: "alter_resource,alter_type,risk_level,alter_category";
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
    queryData() {
      //查询表单数据
      var params = {
        procInstId: this.procInstId
      };

       const isDraft = this.$route.query.isDraft;
      
      if(isDraft) {
        params.isDraft = 1;
      }

      service.queryData(params).then(res => {
        this.ruleForm = { ...this.ruleForm, ...res.result[0].form };
        this.ruleForm.title = res.result[0].title;
        this.ruleForm.description = res.result[0].description;
        this.ruleForm.location = res.result[0].location;

        if (this.ruleForm.isEffective === null) {
          this.ruleForm.isEffective = "";
        }
        if (this.ruleForm.isRepeating === null) {
          this.ruleForm.isRepeating = "";
        }

        // 所属系统信息与所属事件类别信息转化为数组，在页面框中显示 ['100','200','300']
        let systemArr = [
          this.ruleForm.system,
          this.ruleForm.systemSubclass,
          this.ruleForm.systemItem
        ];
        this.ruleForm.system = systemArr;

        if (this.ruleForm.questionCategory !== null) {
          let questionCategoryArr = [
            this.ruleForm.questionCategory,
            this.ruleForm.questionCategorySubclass,
            this.ruleForm.questionItem
          ];
          this.ruleForm.questionCategory = questionCategoryArr;
        } else {
          this.ruleForm.questionCategorySubclass = "";
          this.ruleForm.questionItem = "";
          this.ruleForm.questionCategory = [];
        }

        this.ruleForm.relatedGroup = this.ruleForm.relatedGroup.split("&");
        this.nextNodeDealMan();
      });
    },
    nextNodeDealMan() {
      // 查询下一环节处理人
      const params = {
        orgId: this.ruleForm.alterGroup[this.ruleForm.alterGroup.length - 1] // 机构id--事件涉及组
      };
      service.queryNextNodeDealMan(params).then(res => {
        this.nextNodeDealManList = res.result;
      });
    },
    queryEventManager() {
      // 查询事件经理
      const params = {
        orgId: this.ruleForm.alterGroup[this.ruleForm.alterGroup.length - 1], // 机构id
        roleType: 12 // 角色
      };
      service.queryEventManager(params).then(res => {
        this.ruleForm.manager = res.result[0].userId;
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
      });
    },
    queryEventType() {
      //问题类别信息
      service.queryEventType().then(res => {
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
        this.problemInfo = res;
      });
    },
    queryEventInGroup() {
      // 查询涉及组
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
        this.alterGroupList = res;
      });
    },
    systemInfoChange(value) {
      //所属系统信息改变
      this.ruleForm.system = value;
    },
    categoryChange(value) {
      //问题类别信息改变
      this.ruleForm.questionCategory = value;
    },
    inGroupChange(value) {
      //涉及组改变
      this.ruleForm.relatedGroup = value;
    },
    fileListChange(data) {
      this.fileList = data;
    },
    uploadAttachment() {
      // 上传附件
      const formdatas = new FormData();
      this.fileList.forEach((item, index) => {
        formdatas.append("files", item.raw);
      });
      formdatas.append("taskId", this.taskId);
      formdatas.append("procInstId", this.procInstId);
      formdatas.append("userId", this.userId);

      service.uploadAttachment(formdatas).then(res => {});
    },
    validatePass(rule, value, callback) {
      if (!value || value.length < 1) {
        callback(new Error(" "));
        const h = this.$createElement;
        this.$notify({
          title: "提示",
          message: rule.myMessage,
          duration: 2000
        });
      } else {
        if (rule.fullField === "title") {
          if (!this.getStrLenght(value, 80)) {
            callback(new Error(" "));
            this.$notify({
              title: "提示",
              message: "变更标题不能超过80个字符"
            });
          } else {
            callback();
          }
        } else if (rule.fullField === "description") {
          if (!this.getStrLenght(value, 500)) {
            callback(new Error(" "));
            this.$notify({
              title: "提示",
              message: "变更描述不能超过500个字符"
            });
          } else {
            callback();
          }
        } else if (rule.fullField === "dueTime") {
          if (
            new Date(value).getTime() <
            new Date(this.ruleForm.createTime).getTime()
          ) {
            callback(new Error(" "));
            const h = this.$createElement;
            this.$notify({
              title: "提示",
              message: "期望解决时间不能小于登记时间"
            });
          } else {
            callback();
          }
        }
      }
    },
    getStrLenght(message, MaxLenght) {
      var strlenght = 0; //初始定义长度为0
      var txtval;
      if (message === null || message === "" || message === undefined) {
        txtval = "";
      } else {
        txtval = message.trim();
      }
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
    },
    saveAsDraft(formName) {
      //保存草稿
      let ruleForm = Object.assign({}, this.ruleForm);
      ruleForm.relatedGroup = ruleForm.relatedGroup.join("&"); //问题涉及组值类型： '100&200&300'

      let systemBox = ruleForm.system.slice(0);

      ruleForm.system = systemBox[0]; //系统类型
      ruleForm.systemSubclass = systemBox[1]; //系统子类
      ruleForm.systemItem = systemBox[2]; //系统条目

      let questionCategoryBox;
      if (ruleForm.questionCategory !== []) {
        // 问题分类信息 有内容
        questionCategoryBox = ruleForm.questionCategory.slice(0);
        ruleForm.questionCategory = questionCategoryBox[0] || ""; //问题类别
        ruleForm.questionCategorySubclass = questionCategoryBox[1] || ""; //问题子类
        ruleForm.questionItem = questionCategoryBox[2] || ""; //问题条目
      } else {
        // 问题分类信息 没有内容
        ruleForm.questionCategory = "";
        ruleForm.questionCategorySubclass = "";
        ruleForm.questionItem = "";
      }

      let data = {
        procInstId: this.procInstId,
        taskId: this.taskId,
        description: ruleForm.description,
        isDraft: 1,
        title: ruleForm.title,
        form: {
          ...ruleForm
        }
      };
      if (data.form.dueTime === "") {
        delete data.form.dueTime;
      }

      delete data.form.description;
      delete data.form.location;
      delete data.form.title;
      delete data.attachment;

      service.updateFormData(this.procInstId, data).then(res => {
        this.$message({
          message: "保存成功！",
          type: "success"
        });
      });
    },
    submitForm(formName) {
      // 提交按钮
      this.$refs[formName].validate(valid => {
        if (valid) {
          let ruleForm = Object.assign({}, this.ruleForm);
          ruleForm.alterGroup = ruleForm.alterGroup.join("&"); //事件涉及组值类型： '100&200&300'

          let systemBox = ruleForm.systemInformation.slice(0);

          ruleForm.system = systemBox[0]; //系统类型
          ruleForm.systemSubclass = systemBox[1]; //系统子类
          ruleForm.systemItem = systemBox[2]; //系统条目

          let dataString = {
            title: ruleForm.title,
            description: ruleForm.description,
            location: ruleForm.location,
            form: {
              ...ruleForm
            }
          };
          delete dataString.form.description;
          delete dataString.form.location;
          delete dataString.form.title;

          let data = {
            assignee: this.userId,
            status: 3,
            procInstId: this.procInstId, // 流程实例id
            taskId: this.taskId, // 环节id
            data: JSON.stringify(dataString),
            variables: [
              {
                key: "directorUserId",
                value: this.ruleForm.manager
              }
            ]
          };
          if (this.previousPath === "/myDesk/createPage") {
            data.status = 3;
          } else if (this.previousPath === "/myDesk/myNeedDeal") {
            data.status = 1;
          }

          this.$confirm("是否确认提交?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(async () => {
              let postArr = [];
              let submitForm = service.submitForm(data);
              postArr.push(submitForm);
              if (this.fileList.length > 0) {
                postArr.push(this.uploadAttachment());
              }
              Promise.all(postArr).then(res => {
                service
                  .modifyProcess(this.procInstId, {
                    dueTime: this.ruleForm.dueTime
                  })
                  .then(res => {
                    this.$message({
                      message: "提交成功！",
                      type: "success"
                    });
                    this.$store.dispatch("changeNeedDealCount");
                    this.removeTag();
                    this.$router.push({
                      path: "/myDesk/myNeedDeal"
                    });
                  });
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
    }
  }
};
</script>
<style lang="scss">
.urgApproval {
  .changeFromDescr {
    .el-textarea__inner {
      height: 235px;
    }
  }
}
</style>