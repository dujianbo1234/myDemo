<template>
  <div class="oms-diy-elementui eventContainer problemContainer changeForm urgGroupApproval">
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

            <el-form-item label="受影响部门" prop>
              <el-popover placement="left-start" width="250" trigger="hover">
                <ul>
                  <li
                    v-for="(item,index) in affectedDepartmentLabels"
                    :key="index"
                    class="popoverTip"
                  >
                    <span>{{item}}</span>
                  </li>
                </ul>
                <el-multi-cascader
                  ref="affectedDepartment"
                  slot="reference"
                  class="multi-cascader oms-select"
                  v-model="ruleForm.affectedDepartment"
                  :options="department"
                  multiple
                  filterable
                  :select-children="true"
                  clearable
                  collapse-tags
                  :only-out-put-leaf-node="true"
                  change-on-select
                  separator="/"
                ></el-multi-cascader>
              </el-popover>
            </el-form-item>
            <el-form-item label="需通知部门" prop class="noticeDepartment">
              <el-popover placement="left-start" width="250" trigger="hover">
                <ul>
                  <li
                    v-for="(item,index) in noticeDepartmentLabels"
                    :key="index"
                    class="popoverTip"
                  >
                    <span>{{item}}</span>
                  </li>
                </ul>
                <el-multi-cascader
                  ref="noticeDepartment"
                  slot="reference"
                  class="multi-cascader oms-select"
                  v-model="ruleForm.noticeDepartment"
                  :options="department"
                  multiple
                  filterable
                  :select-children="true"
                  clearable
                  collapse-tags
                  :only-out-put-leaf-node="true"
                  change-on-select
                ></el-multi-cascader>
              </el-popover>
            </el-form-item>
            <el-form-item label="受影响应用系统" prop>
              <el-popover placement="left-start" width="250" trigger="hover">
                <ul>
                  <li
                    v-for="(item,index) in affectedApplicationSystemLabels"
                    :key="index"
                    class="popoverTip"
                  >
                    <span>{{item}}</span>
                  </li>
                </ul>
                <el-multi-cascader
                  ref="affectedApplicationSystem"
                  slot="reference"
                  class="multi-cascader oms-select"
                  v-model="ruleForm.affectedApplicationSystem"
                  :options="systemInfoList"
                  multiple
                  filterable
                  :select-children="true"
                  clearable
                  collapse-tags
                  :only-out-put-leaf-node="true"
                  change-on-select
                ></el-multi-cascader>
              </el-popover>
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
                :disabled="true"
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
                :disabled="true"
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
              <el-cascader v-model="ruleForm.systemInfo" :options="systemInfoList" :disabled="true"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="变更涉及组">
              <el-cascader v-model="ruleForm.alterGroup" :options="alterGroupList" :disabled="true"></el-cascader>
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
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
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
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <el-row class="clearfix titleBar">
        <div class="basicInfo left">处理步骤</div>
      </el-row>

      <div class="dealStepsArea">
        <process-steps :procInstId.sync="procInstId"></process-steps>
      </div>

      <el-row class="clearfix titleBar">
        <div class="basicInfo left">处理记录</div>
      </el-row>
      <div class="dealStepsArea">
        <el-row></el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item
              label="下一环节期望完成时间"
              label-width="170px"
              prop="nextLinkExpectedCompleteTime"
            >
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
            <el-form-item label="审核结果" prop="checkResult">
              <el-select
                class="oms-select"
                v-model="ruleForm.checkResult"
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
            <el-form-item label="处理意见" prop="message" class="dealSuggestion textarea">
              <el-input
                class="oms-input"
                type="textarea"
                v-model.trim="ruleForm.message"
                :disabled="false"
              ></el-input>
              <span class="inputTips">最多输入500个字符</span>
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
              <el-form-item label="变更影响评估" class="dealSuggestion textarea">
                <el-input
                  class="oms-input"
                  type="textarea"
                  v-model="ruleForm.alterAffectEvaluation"
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
                  <el-option label="是" :value="1"></el-option>
                  <el-option label="否" :value="0"></el-option>
                </el-select>
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
import workTimeFill from "@/modules/oms/views/components/workTimeFill";

import attachmentInfo from "@/modules/oms/views/components/attachmentInfo";

export default {
  name: "start",
  data() {
    return {
      userId: "", //用户id
      procInstId: "", // 流程实例id
      procDefId: "", //流程定义id
      taskId: "", // 环节id

      tabActive: "form", //流程图和处理表单tab切换
      flowChartData: null, // 默认的流程图片地址
      alterGroupList: [], // 变更涉及组列表
      nextNodeDealManList: [], // 下一环节处理人列表
      department: [], // 部门列表,
      affectedDepartmentLabels: [], // 受影响部门的labels
      noticeDepartmentLabels: [], // 需通知部门的labels
      affectedApplicationSystemLabels: [], // 受影响业务系统labels

      previousPath: "",
      enumOptions: {}, //查询各个select框参数
      attachment: [], //附件
      fileList: [], //文件列表数组

      systemInfoList: [], //所属系统信息

      commentId: "", // 处理意见id

      ruleForm: {
        workListId: "",
        createTime: "",
        title: "",
        alterResource: "",
        relatedEventId: "",
        relatedQuestionId: "",
        alterType: "",
        riskLevel: "",
        systemInfo: [],
        system: "",
        systemSubclass: "",
        systemItem: "",
        alterCategory: "",
        description: "",
        affectedApplicationSystem: [],
        affectedDepartment: [],
        isInterruptBusiness: "",
        noticeDepartment: [],
        status: "",
        alterGroup: [],
        dueTime: "",
        convergentBillingInterruption: "",
        interruption: "",
        customerServiceInterruption: "",
        reviewCode: "",
        alterEndCode: "",
        relatedReleaseId: "",
        isUpdateConfiguration: "",
        closeTime: "",
        closeUserId: "",
        message: "",
        checkResult: "",
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
        nextLinkExpectedCompleteTime: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "下一环节期望完成时间不能为空",
            trigger: "blur"
          }
        ],
        checkResult: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "审核结果不能为空",
            trigger: "change"
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
  mounted() {
    this.init();
  },
  destroyed() {
    window.onbeforeunload = null;
  },
  computed: {
    showOptionsEnum() {
      return Object.keys(this.enumOptions).length > 0;
    }
  },
  components: {
    flowChart,
    upload,
    processSteps,
    traceabilityMatrix,
    configurationAssociation,
    workTimeFill,
    attachmentInfo
  },
  watch: {
    "ruleForm.affectedDepartment": function() {
      this.getLabels("affectedDepartment");
    },
    "ruleForm.noticeDepartment": function() {
      this.getLabels("noticeDepartment");
    },
    "ruleForm.affectedApplicationSystem": function() {
      this.getLabels("affectedApplicationSystem");
    }
  },
  methods: {
    init() {
      this.userId = this.$store.getters.userId; //获取用户id
      this.taskId = this.$route.params.taskId;
      this.procDefId = this.$route.params.procDefId; // 获取流程定义id
      this.procInstId = this.$route.params.procInstId;
      this.tabActive = this.$route.query.tabActive || "form";
      this.isDraft = this.$route.query.isDraft;

      this.ruleForm.workListId = this.$route.query.id;
      this.ruleForm.createTime = this.$route.query.createTime;

      this.previousPath = sessionStorage.getItem("previousPath");

      this.queryParams();
      this.queryData();

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

      if (this.isDraft) {
        params.isDraft = 1;
        this.queryComments();
      }

      service.queryData(params).then(res => {
        this.ruleForm = {
          ...this.ruleForm,
          ...res.result[0].form,
          ...{
            affectedDepartment:
              res.result[0].form.affectedDepartment === null
                ? []
                : JSON.parse(res.result[0].form.affectedDepartment),
            noticeDepartment:
              res.result[0].form.noticeDepartment === null
                ? []
                : JSON.parse(res.result[0].form.noticeDepartment),
            affectedApplicationSystem:
              res.result[0].form.affectedApplicationSystem === null
                ? []
                : JSON.parse(res.result[0].form.affectedApplicationSystem)
          }
        };
        this.ruleForm.title = res.result[0].title;
        this.ruleForm.description = res.result[0].description;
        this.ruleForm.location = res.result[0].location;
        this.ruleForm.status = "集团审批";

        // 所属系统信息与所属事件类别信息转化为数组，在页面框中显示 ['100','200','300']
        let systemArr = [
          this.ruleForm.system,
          this.ruleForm.systemSubclass,
          this.ruleForm.systemItem
        ];
        this.ruleForm.systemInfo = systemArr;
        this.ruleForm.alterGroup = this.ruleForm.alterGroup.split("&");

        if (!this.isDraft) {
          this.ruleForm.nextLinkExpectedCompleteTime = "";
          this.ruleForm.checkResult = "";
        }
      });
    },
    queryComments() {
      const params = {
        taskId: this.taskId,
        isDraft: 1
      };
      service.queryComments(params).then(res => {
        this.ruleForm.message = res.result[0].message;
        this.commentId = res.result[0].id;
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
        this.systemInfoList = res;
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
        this.department = res;
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
      this.ruleForm.alterGroup = value;
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
      if ((!value || value.length < 1) && rule.fullField !== "message") {
        callback(new Error(" "));
        const h = this.$createElement;
        this.$notify({
          title: "提示",
          message: rule.myMessage,
          duration: 2000
        });
      } else {
        if (rule.fullField === "message") {
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
        } else if (rule.fullField === "nextLinkExpectedCompleteTime") {
          let nextLinkTime = value;
          let createTime = this.ruleForm.createTime;
          let dueTime = this.ruleForm.dueTime;
          if (nextLinkTime > createTime && nextLinkTime < dueTime) {
            callback();
          } else {
            callback(new Error(" "));
            this.$notify({
              title: "提示",
              message:
                "下一环节期望完成时间必须大于登记时间并且小于期望解决时间",
              duration: 2000
            });
          }
        } else {
          callback();
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
      ruleForm.alterGroup = ruleForm.alterGroup.join("&"); //涉及组值类型： '100&200&300'

      let systemBox = ruleForm.systemInfo.slice(0);
      ruleForm.system = systemBox[0]; //系统类型
      ruleForm.systemSubclass = systemBox[1]; //系统子类
      ruleForm.systemItem = systemBox[2]; //系统条目

      ruleForm.affectedDepartment = JSON.stringify(ruleForm.affectedDepartment);
      ruleForm.noticeDepartment = JSON.stringify(ruleForm.noticeDepartment);
      ruleForm.affectedApplicationSystem = JSON.stringify(
        ruleForm.affectedApplicationSystem
      );

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

      delete data.form.description;
      delete data.form.title;

      const dataComments = {
        procInstId: this.procInstId,
        taskId: this.taskId,
        userId: this.userId,
        id: this.commentId,
        message: this.ruleForm.message,
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
          ruleForm.alterGroup = ruleForm.alterGroup.join("&"); //涉及组值类型： '100&200&300'

          let systemBox = ruleForm.systemInfo.slice(0);

          ruleForm.system = systemBox[0]; //系统类型
          ruleForm.systemSubclass = systemBox[1]; //系统子类
          ruleForm.systemItem = systemBox[2]; //系统条目

          ruleForm.affectedDepartment = JSON.stringify(
            ruleForm.affectedDepartment
          );
          ruleForm.noticeDepartment = JSON.stringify(ruleForm.noticeDepartment);
          ruleForm.affectedApplicationSystem = JSON.stringify(
            ruleForm.affectedApplicationSystem
          );

          let dataString = {
            title: ruleForm.title,
            description: ruleForm.description,
            form: {
              ...ruleForm
            }
          };
          delete dataString.form.title;
          delete dataString.form.description;
          delete dataString.form.systemInfo;

          if (ruleForm.dueTime === "") {
            delete ruleForm.dueTime;
          }

          let data = {
            assignee: this.userId,
            status: 1,
            procInstId: this.procInstId, // 流程实例id
            taskId: this.taskId, // 环节id
            data: JSON.stringify(dataString),
            variables: []
          };
          switch (ruleForm.checkResult) {
            case "通过":
              data.variables.push({
                key: "pass",
                value: "true"
              });
              break;
            case "不通过":
              data.variables.push({
                key: "pass",
                value: "false"
              });
              break;
            default:
              break;
          }

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
                  this.$store.dispatch("changeNeedDealCount");
                  this.removeTag();
                  this.$router.push({
                    path: "/myDesk/myNeedDeal"
                  });
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
    getLabels(name) {
      // 获取级联多选的currentLabels，展示在popover
      setTimeout(() => {
        this[name + "Labels"] = this.$refs[name].currentLabels.map(item =>
          item.join("/")
        );
      }, 100);
    }
  }
};
</script>
<style lang="scss">
.urgGroupApproval {
  .changeFromDescr {
    .el-textarea__inner {
      height: 235px;
    }
  }
}
</style>