<template>
  <div class="oms-diy-elementui eventContainer problemContainer changeForm changeFormClose">
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
            <el-form-item label="变更描述" class="changeFromDescr textarea">
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
            <el-form-item label="关联的发布单号">
              <el-input class="oms-input" v-model="ruleForm.relatedReleaseId" :disabled="true"></el-input>
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
                  collapse-tags
                  :only-out-put-leaf-node="true"
                  change-on-select
                  separator="/"
                  :disabled="true"
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
                  collapse-tags
                  :only-out-put-leaf-node="true"
                  change-on-select
                  :disabled="true"
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
                  collapse-tags
                  :only-out-put-leaf-node="true"
                  change-on-select
                  :disabled="true"
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
                :disabled="true"
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
              <el-cascader ref="systemInfo" v-model="ruleForm.systemInfo" :options="systemInfoList" :readonly="true"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="变更涉及组">
              <el-cascader v-model="ruleForm.alterGroup" :options="alterGroupList" :readonly="true"></el-cascader>
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
            <el-form-item label="变更结束代码" prop="alterEndCode">
              <el-select
                class="oms-select"
                v-model="ruleForm.alterEndCode"
                placeholder
                :disabled="true"
              >
                <el-option
                  v-for="item in enumOptions.alterEndCode"
                  v-if="showOptionsEnum"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回顾代码">
              <el-select
                class="oms-select"
                v-model="ruleForm.reviewCode"
                placeholder
                :disabled="true"
              >
                <el-option
                  v-for="item in enumOptions.reviewCode"
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
            <el-form-item label="是否仅更新配置" prop="isUpdateConfiguration">
              <el-select
                class="oms-select"
                v-model="ruleForm.isUpdateConfiguration"
                placeholder
                :disabled="true"
              >
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关闭人" prop="closeUserId">
              <el-input class="oms-input" v-show="false" v-model="ruleForm.closeUserId" :disabled="true"></el-input>
              <el-input class="oms-input" v-model="closeUserName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关闭时间" prop="closeTime">
              <el-input class="oms-input" v-model="ruleForm.closeTime" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否中断业务" prop="isInterruptBusiness">
              <el-select
                class="oms-select"
                v-model="ruleForm.isInterruptBusiness"
                placeholder
                :disabled="true"
              >
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核结果" prop="checkResult">
              <el-select
                class="oms-select"
                v-model="ruleForm.checkResult"
                placeholder
                :disabled="true"
              >
                <el-option label="通过" value="通过"></el-option>
                <el-option label="不通过" value="不通过"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <interrupt-info
        v-if="ruleForm.isInterruptBusiness === 1"
        :valid="false"
        :convergent-billing-interruption.sync="ruleForm.convergentBillingInterruption"
        :interruption.sync="ruleForm.interruption"
        :customer-service-interruption.sync="ruleForm.customerServiceInterruption"
      ></interrupt-info>

      <el-row class="clearfix titleBar">
        <div class="basicInfo left">处理步骤</div>
      </el-row>

      <div class="dealStepsArea">
        <process-steps :procInstId.sync="procInstId" ></process-steps>
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
              <el-form-item label="实际实施开始时间">
                <el-date-picker
                  class="oms-input"
                  type="datetime"
                  placeholder="选择日期"
                  v-model="ruleForm.planStartTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%;"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="实际实施结束时间">
                <el-date-picker
                  class="oms-input"
                  type="datetime"
                  placeholder="选择日期"
                  v-model="ruleForm.planEndTime"
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
        <el-tab-pane label="工时信息">
          <work-time-fill
            :procInstId="procInstId"
            :taskId="taskId"
            :system-info-prop="systemInfoProp"
            :rule-form.sync="ruleForm"
            :userInfo="userInfo"
            :done.sync="done"
            whereNode="close"
            allInfo="allInfo"
          ></work-time-fill>
        </el-tab-pane>
      </el-tabs>

    </el-form>

    <div v-show="tabActive === 'attachmentInfo'">
      <attachment-info :procInstId="procInstId"></attachment-info>
    </div>

    <div v-if="tabActive === 'chart'" class="flow-chart">
      <flow-chart :procInstId="procInstId" :procDefId="procDefId" :tabActive="tabActive" :isOver="isOver"></flow-chart>
    </div>
  </div>
</template>
<script>
import * as service from "@/modules/oms/api/oms/eventForm";
import * as problemService from "@/modules/oms/api/oms/problemService";
import { parseTime } from "@/utils/index";
import { findParentNode, deep } from "@/modules/oms/utils/omstree.js";
import flowChart from "@/modules/oms/views/components/flowCharts";
import upload from "@/modules/oms/views/components/upload";
import processSteps from "@/modules/oms/views/components/processSteps";
import traceabilityMatrix from "@/modules/oms/views/components/traceabilityMatrix";
import configurationAssociation from "@/modules/oms/views/components/configurationAssociation";
import interruptInfo from "@/modules/oms/views/components/interruptInfo";

import attachmentInfo from '@/modules/oms/views/components/attachmentInfo';
import workTimeFill from "@/modules/oms/views/components/workTimeFill";

export default {
  name: "approve",
  data() {
    return {
      userInfo: {},
      userId: "", //用户id
      procInstId: "", // 流程实例id
      procDefId: "", //流程定义id
      taskId: "", // 环节id
      
      isOver: "",
      tabActive: "form", //流程图和处理表单tab切换
      flowChartData: null, // 默认的流程图片地址
      alterGroupList: [], // 变更涉及组列表
      nextNodeDealManList: [], // 下一环节处理人列表
      department: [], // 部门列表
      affectedDepartmentLabels: [], // 受影响部门的labels
      noticeDepartmentLabels: [], // 需通知部门的labels
      affectedApplicationSystemLabels: [], // 受影响业务系统labels

      previousPath: "",
      enumOptions: {}, //查询各个select框参数
      attachment: [], //附件
      fileList: [], //文件列表数组

      systemInfoList: [], //所属系统信息
      manager: "", //经理
      closeUserName: "",

      systemInfoProp: {}, // 传递给子组件
      done: "", // 衡量工时信息是否填写， boolean

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
        closeUserId: "",
        closeTime: "",
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
      rules:{

      }
      
    };
  },
  created() {
    this.procInstId = this.$route.params.procInstId;
    this.taskId = this.$route.params.taskId;
    this.userInfo = {
      userId: this.$store.getters.userId,
      userName: this.$store.getters.name
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
    attachmentInfo,
    interruptInfo,
    workTimeFill
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
    },
    "ruleForm.systemInfo": function() {
      setTimeout(() => {
        let info = this.$refs.systemInfo.currentLabels;
        this.systemInfoProp = {
          system: info[0], // 所属系统信息
          systemSubclass: info[1]
        };
      }, 100);
    },
  },
  computed: {
    showOptionsEnum() {
      return Object.keys(this.enumOptions).length > 0;
    }
  },
  methods: {
    init() {
      this.userId = this.$store.getters.userId; //获取用户id
      this.taskId = this.$route.params.taskId;
      this.procDefId = this.$route.params.procDefId; // 获取流程定义id
      this.procInstId = this.$route.params.procInstId;
      this.tabActive = this.$route.query.tabActive || "form";
      this.isOver = this.$route.query.isOver || "";

      this.ruleForm.workListId = this.$route.query.id;
      this.ruleForm.createTime = this.$route.query.createTime;

      this.previousPath = sessionStorage.getItem("previousPath");

      this.queryParams();
      this.queryData();

      this.querySystemType();
      this.queryEventType();
      this.queryEventInGroup();
      this.queryUser();
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
        name:
          "alter_resource,alter_type,risk_level,alter_category,review_code,alter_end_code"
      };
      service.queryParams(params).then(res => {
        const data = res.result;
        if (data && data.length) {
          name: "alter_resource,alter_type,risk_level,alter_category,review_code,alter_end_code";
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
      service.queryData(params).then(res => {
        ;
        this.ruleForm = { ...this.ruleForm, ...res.result[0].form,
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
          } };
        this.ruleForm.title = res.result[0].title;
        this.ruleForm.description = res.result[0].description;

        // 所属系统信息与所属事件类别信息转化为数组，在页面框中显示 ['100','200','300']
        let systemArr = [
          this.ruleForm.system,
          this.ruleForm.systemSubclass,
          this.ruleForm.systemItem
        ];
        this.ruleForm.systemInfo = systemArr;

        this.ruleForm.alterGroup = this.ruleForm.alterGroup.split("&");

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
    queryUser() {
      let params = {
        userIds: this.userId
      };
      service.queryUser(params).then(res => {
        this.closeUserName = res.result[0].realName;
        this.ruleForm.closeUserId = this.userId;
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
        this.department = res
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
    // systemInfoChange(value) {
    //   //所属系统信息改变
    //   this.ruleForm.system = value;
    // },
    // categoryChange(value) {
    //   //问题类别信息改变
    //   this.ruleForm.questionCategory = value;
    // },
    // inGroupChange(value) {
    //   //涉及组改变
    //   this.ruleForm.relatedGroup = value;
    // }
  }
};
</script>
<style lang="scss">
.changeFormClose {
  .changeFromDescr {
    .el-textarea__inner {
      height: 270px;
    }
  }
}
</style>