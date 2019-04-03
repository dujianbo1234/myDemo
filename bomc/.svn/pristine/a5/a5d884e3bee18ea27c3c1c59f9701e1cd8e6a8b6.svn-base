<template>
  <div class="oms-diy-elementui eventContainer problemContainer changeForm changeFormStart">
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
            <el-form-item label="变更标题" prop="title">
              <el-input class="oms-input" v-model="ruleForm.title" :disabled="false"></el-input>
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
              <el-input type="textarea" v-model.trim="ruleForm.description" :disabled="false"></el-input>
              <span class="inputTips">最多输入500个字符</span>
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

            <el-form-item label="期望解决时间" prop="dueTime">
              <el-date-picker
                class="oms-input"
                type="datetime"
                placeholder="选择日期"
                v-model="ruleForm.dueTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%;"
                :disabled="false"
              ></el-date-picker>
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
            <el-form-item label="所属系统信息" prop="systemInfo">
              <el-cascader
                ref="systemInfo"
                v-model="ruleForm.systemInfo"
                :options="systemInfoList"
                :disabled="false"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="变更涉及组" prop="alterGroup">
              <el-cascader v-model="ruleForm.alterGroup" :options="alterGroupList"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="变更分类" prop="alterCategory">
              <el-select
                class="oms-select"
                v-model="ruleForm.alterCategory"
                placeholder
                :disabled="false"
              >
                <el-option
                  v-for="item in enumOptions.alterCategory"
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
            <el-form-item label="变更状态">
              <el-input class="oms-input" v-model="ruleForm.status" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- <el-row class="clearfix titleBar">
        <div class="basicInfo left">处理步骤</div>
      </el-row>

      <div class="dealStepsArea">
        <process-steps :procInstId.sync="procInstId" ></process-steps>
      </div>-->
      <el-row class="clearfix titleBar">
        <div class="basicInfo left">处理记录</div>
      </el-row>
      <div class="dealStepsArea">
        <el-row></el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="下一环节处理人" prop="nextLinkDealUserId">
              <el-select v-model="ruleForm.nextLinkDealUserId" class="oms-select">
                <el-option
                  v-for="(item,index) in nextNodeDealManList"
                  :key="index"
                  :label="item.realName"
                  :value="item.userId"
                />
              </el-select>
            </el-form-item>
          </el-col>
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
        </el-row>
        <el-row>
          <el-col :span="24"></el-col>
        </el-row>

        <upload @fileListChange="fileListChange"></upload>
      </div>

      <el-tabs type="border-card" class="tabsArea">
        <el-tab-pane label="工时信息">
          <work-time-fill
            :procInstId="procInstId"
            :taskId="taskId"
            :system-info-prop="systemInfoProp"
            :rule-form.sync="ruleForm"
            :userInfo="userInfo"
            :done.sync="done"
            whereNode="changeFormStart"
          ></work-time-fill>
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
        <!-- <el-button type="info" @click="saveAsDraft('ruleForm')">保存草稿</el-button> -->
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
import { setTimeout } from "timers";

export default {
  name: "start",
  data() {
    return {
      userInfo: {},
      userId: "", //用户id
      procInstId: "", // 流程实例id
      procDefId: "", //流程定义id
      taskId: "", // 环节id

      previousPathTwo: "",

      tabActive: "form", //流程图和处理表单tab切换
      flowChartData: null, // 默认的流程图片地址
      alterGroupList: [], // 变更涉及组列表
      nextNodeDealManList: [], // 下一环节处理人列表
      department: [], // 部门列表

      previousPath: "",
      enumOptions: {}, //查询各个select框参数
      attachment: [], //附件
      fileList: [], //文件列表数组

      systemInfoList: [], //所属系统信息
      manager: "", //经理

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
        system: "",
        systemSubclass: "",
        systemItem: "",
        alterCategory: "",
        description: "",
        affectedApplicationSystem: [],
        affectedDepartment: [],
        isInterruptBusiness: "",
        noticeDepartment: [],
        status: "变更发起",
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
        title: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "变更标题不能为空",
            trigger: "blur"
          }
        ],
        alterResource: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "变更来源不能为空",
            trigger: "change"
          }
        ],
        alterType: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "变更类型不能为空",
            trigger: "change"
          }
        ],
        riskLevel: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "风险等级不能为空",
            trigger: "change"
          }
        ],
        systemInfo: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "所属系统信息不能为空",
            trigger: "change"
          }
        ],
        alterCategory: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "变更分类不能为空",
            trigger: "change"
          }
        ],
        description: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "变更描述不能为空",
            trigger: "blur"
          }
        ],
        alterGroup: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "变更涉及组不能为空",
            trigger: "blur"
          }
        ],
        dueTime: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "期望解决时间不能为空",
            trigger: "blur"
          }
        ],
        nextLinkDealUserId: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "下一环节处理人不能为空",
            trigger: "change"
          }
        ],
        nextLinkExpectedCompleteTime: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "下一环节期望完成时间不能为空",
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
    "ruleForm.alterGroup": function(oldValue, newVaule) {
      this.queryEventManager();
      this.nextNodeDealMan();
    },
    "ruleForm.systemInfo": function() {
      setTimeout(() => {
        let info = this.$refs.systemInfo.currentLabels;
        this.systemInfoProp = {
          system: info[0], // 所属系统信息
          systemSubclass: info[1]
        };
      }, 100);
    }
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
  destroyed() {
    window.onbeforeunload = null;
  },
  methods: {
    init() {
      this.userId = this.$store.getters.userId; //获取用户id
      this.taskId = this.$route.params.taskId;
      this.procDefId = this.$route.params.procDefId; // 获取流程定义id

      this.tabActive = this.$route.query.tabActive || "form";
      this.isDraft = this.$route.query.isDraft;

      this.ruleForm.workListId = this.$route.query.id;
      this.ruleForm.createTime = this.$route.query.createTime;

      this.previousPath = sessionStorage.getItem("previousPath");

      this.previousPathTwo = sessionStorage.getItem("previousPathTwo");

      this.queryParams();
      if (this.isDraft) {
        this.queryData();
      }
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

      if (isDraft) {
        params.isDraft = 1;
      }

      service.queryData(params).then(res => {
        this.ruleForm = { ...this.ruleForm, ...res.result[0].form };
        this.ruleForm.title = res.result[0].title;
        this.ruleForm.description = res.result[0].description;
        this.ruleForm.location = res.result[0].location;

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
      // 查询变更经理
      const params = {
        orgId: this.ruleForm.alterGroup[this.ruleForm.alterGroup.length - 1], // 机构id
        roleType: 12 // 角色
      };
      service.queryEventManager(params).then(res => {
        this.manager = res.result[0].userId;
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
        this.department = res;
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
    submitForm(formName) {
      // 提交按钮
      if (this.done) {
        // 工时信息未填写
        this.$refs[formName].validate(valid => {
          if (valid) {
            let ruleForm = Object.assign({}, this.ruleForm);
            ruleForm.alterGroup = ruleForm.alterGroup.join("&"); //涉及组值类型： '100&200&300'

            let systemBox = ruleForm.systemInfo.slice(0);

            ruleForm.system = systemBox[0]; //系统类型
            ruleForm.systemSubclass = systemBox[1]; //系统子类
            ruleForm.systemItem = systemBox[2]; //系统条目

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

            debugger;
            let data = {
              assignee: this.userId,
              status: 3,
              procInstId: this.procInstId, // 流程实例id
              taskId: this.taskId, // 环节id
              data: JSON.stringify(dataString),
              variables: [
                {
                  key: "directorUserId",
                  value: this.ruleForm.nextLinkDealUserId
                }
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

                try {
                  await Promise.all(postArr);
                  await service.modifyProcess(this.procInstId, {
                    dueTime: this.ruleForm.dueTime
                  });
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
                } catch (e) {
                  loading.close();
                }
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
      } else {
        this.$message({
          message: "请先填写完工时信息再执行提交！",
          type: "error"
        });
      }
    }
  }
};
</script>
<style lang="scss">
.changeFormStart {
  .changeFromDescr {
    .el-textarea__inner {
      height: 130px;
    }
  }
  .tabsArea {
    #tab-0{
      position: relative;
    }
    #tab-0:before{
      content: "*";
      position: absolute;
      top:3px;
      left: 10px;
      color: red;
      z-index: 9999;
    }
  }
}
</style>