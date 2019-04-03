<template>
  <div class="oms-diy-elementui eventContainer problemContainer">
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
            <el-form-item label="问题标题：" prop="title">
              <el-input class="oms-input" v-model.trim="ruleForm.title" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="问题ID：" prop>
              <el-input class="oms-input" v-model="ruleForm.workListId" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item
              label="问题描述："
              prop="description"
              class="problemDir textarea investigation"
            >
              <span class="inputTips">最多输入500个字符</span>
              <el-input type="textarea" v-model="ruleForm.description" :disabled="true"></el-input>
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
            <el-form-item label="问题期望解决时间：" prop="dueTime">
              <el-date-picker
                class="oms-input"
                v-model="ruleForm.dueTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item label="实际诊断开始时间" prop="diagnosisStartTime">
              <el-date-picker
                class="oms-input"
                v-model="ruleForm.diagnosisStartTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item label="实际诊断结束时间" prop="diagnosisEndTime">
              <el-date-picker
                class="oms-input"
                v-model="ruleForm.diagnosisEndTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item label="地点：" prop="location">
              <el-input class="oms-input" v-model="ruleForm.location" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="关联变更单号：" prop="relatedAlterId">
              <el-input class="oms-input" v-model="ruleForm.relatedAlterId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="问题来源：" prop="questionSource">
              <el-select v-model="ruleForm.questionSource" class="oms-select" :disabled="true">
                <el-option
                  v-for="(item,index) in enumOptions.questionSource"
                  v-if="showOptionsEnum"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="问题优先级：" prop="questionPriority">
              <el-select v-model="ruleForm.questionPriority" class="oms-select" :disabled="true">
                <el-option
                  v-for="(item,index) in enumOptions.questionPriority"
                  v-if="showOptionsEnum"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="问题状态：" prop="status">
              <el-input class="oms-input" v-model="ruleForm.status" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item class="pointer" label="所属系统信息：" prop="system">
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
              label="问题类别信息："
              prop="questionCategory"
            >
              <el-cascader
                v-model="ruleForm.questionCategory"
                @change="categoryChange"
                :options="problemInfo"
                :disabled="true"
              ></el-cascader>
            </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="问题涉及组：" prop="relatedGroup">
              <el-cascader
                :options="inGroupList"
                v-model="ruleForm.relatedGroup"
                @change="inGroupChange"
                :disabled="true"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否有效问题：" prop="isEffective">
              <el-select v-model="ruleForm.isEffective" class="oms-select" :disabled="true">
                <el-option label="是" :value="1"/>
                <el-option label="否" :value="0"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="重复问题标记：" prop="isRepeating">
              <el-select class="oms-select" v-model="ruleForm.isRepeating" :disabled="true">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联事件单号：" prop="relatedEventId">
              <el-input class="oms-input" v-model="ruleForm.relatedEventId" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
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
          <el-col :span="24">
            <el-form-item class="dealSuggestion textarea" label="处理意见：" prop="message">
              <span class="inputTips">最多输入500个字符</span>
              <el-input type="textarea" v-model.trim="ruleForm.message" class="oms-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <upload @fileListChange="fileListChange"></upload>
      </div>

      <el-tabs type="border-card" class="tabsArea">
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

import attachmentInfo from "@/modules/oms/views/components/attachmentInfo";

export default {
  name: "",
  data() {
    return {
      userId: "", //用户id
      procInstId: "", // 流程实例id
      procDefId: "", //流程定义id
      taskId: "", // 环节id
      eventManager: "", //问题经理

      tabActive: "form",
      previousPath: "", //获取上一个页面的路由
      isDraft: "",
      isSaved: false,

      inputFile: "", //input框显示第一个文件的名字
      enumOptions: {}, //查询各个select框参数
      systemInfo: [], //所属系统信息
      problemInfo: [], //事件类别信息
      inGroupList: [], //涉及组
      fileList: [], //文件数组
      processStepData: [], //处理步骤的数据
      nextNodeDealManList: [], //下一环节处理人

      commentId: "",

      ruleForm: {
        title: "", //问题标题
        workListId: "", //问题id
        description: "", //问题描述
        createTime: "", //创建时间
        dueTime: "", //创建时间
        relatedEventId: "", //关联事件id
        relatedAlterId: "", // 关联变更单号
        location: "", //地点
        diagnosisStartTime: "", // 实际诊断开始时间
        diagnosisEndTime: "", // 实际诊断结束时间
        questionSource: "", //问题来源
        questionPriority: "", //问题优先级
        status: "问题解决", //问题状态
        system: [], //所属系统类型
        systemSubclass: "", //所属业务系统子类
        systemItem: "", //所属业务系统条目
        questionCategory: [], //问题分类
        questionCategorySubclass: "", //问题分类子类
        questionItem: "", //问题条目
        relatedDepartment: "", //问题涉及部门
        relatedGroup: [], //问题涉及组
        isRepeating: "", // 重复问题标记
        nextNodeDealMan: "", //下一环节处理人
        isEffective: "" //是否有效问题
      },
      rules: {
        relatedAlterId: [
          {
            validator: this.validatePass,
            required: false,
            overMessage: "关联变更单号不能超过80个字符",
            trigger: "blur"
          }
        ],

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
            overMessage: "处理意见不能超过500个字符",
            trigger: "blur"
          }
        ]
      }
    };
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
  computed: {
    showOptionsEnum() {
      // if the optionsEnum has data
      // console.log(Object.keys(this.enumOptions).length > 0)
      return Object.keys(this.enumOptions).length > 0;
    },
    pickerOptions(time) {
      let obj = {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      };
      return obj;
    }
  },
  watch: {
    "ruleForm.relatedGroup": function(oldValue, newVaule) {
      this.queryEventManager();
      // this.nextNodeDealMan()
    },
    tabActive(val, oldVal) {
      this.changeTab(val);
    }
  },
  components: {
    flowChart,
    upload,
    processSteps,
    traceabilityMatrix,
    configurationAssociation,
    attachmentInfo
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
        this.flowChartData = `${baseURL}/oms/api/v1/processInstances/flowchart?procInstId=${
          this.procInstId
        }&time=${Date.now()}`;
      }
      if (this.tabActive === "form") {
        this.queryData();
      }
    },
    queryParams() {
      // 查询页面所有下拉框的options内容
      const params = {
        name: "question_source,question_priority"
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
    queryData() {
      //查询表单数据
      var params = {
        procInstId: this.procInstId
      };

      if (this.isDraft) {
        params.isDraft = 1;
        this.queryComments();
      } else {
        params.isDraft = 0;
      }

      service.queryData(params).then(res => {
        this.ruleForm = { ...this.ruleForm, ...res.result[0].form };
        this.ruleForm.title = res.result[0].title;
        this.ruleForm.description = res.result[0].description;
        this.ruleForm.location = res.result[0].location;

        this.ruleForm.status = "问题解决";
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
        // this.nextNodeDealMan()
      });
    },
    queryComments() {
      const params = {
        taskId: this.taskId
      };

      if (this.isDraft) {
        params.isDraft = 1;
      }
      service.queryComments(params).then(res => {
        this.ruleForm.message = res.result[0].message;
        this.commentId = res.result[0].id;
      });
    },
    nextNodeDealMan() {
      // 查询下一环节处理人
      const params = {
        orgId: this.ruleForm.relatedGroup[this.ruleForm.relatedGroup.length - 1] // 机构id--事件涉及组
      };
      service.queryNextNodeDealMan(params).then(res => {
        this.nextNodeDealManList = res.result;
      });
    },
    queryEventManager() {
      // 查询事件经理
      const params = {
        orgId: this.ruleForm.relatedGroup[
          this.ruleForm.relatedGroup.length - 1
        ], // 机构id
        roleType: 11 // 角色
      };
      service.queryEventManager(params).then(res => {
        this.eventManager = res.result[0].userId;
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
        this.inGroupList = res;
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
    downLoadAttachmentListByProcessInstanceID() {
      // download attachment by process instance
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = `${
        service.request.defaults.baseURL
      }/oms/api/v1/processInstances/batchDownload/${this.procInstId}`;

      document.body.appendChild(iframe);

      const timer = setTimeout(() => {
        document.body.removeChild(iframe);
        clearTimeout(timer);
      }, 700);
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

      return service.uploadAttachment(formdatas);
    },
    validatePass(rule, value, callback) {
      if (
        (!value || value.length < 1) &&
        rule.fullField !== "relatedEventId" &&
        rule.fullField !== "relatedAlterId" &&
        rule.fullField !== "location" &&
        rule.fullField !== "message"
      ) {
        callback(new Error(" "));
        const h = this.$createElement;
        this.$notify({
          title: "提示",
          message: rule.myMessage
        });
      } else {
        if (rule.fullField === "title") {
          if (!this.getStrLenght(value, 80)) {
            callback(new Error(" "));
            this.$notify({
              title: "提示",
              message: "问题标题不能超过80个字符"
            });
          } else {
            callback();
          }
        } else if (rule.fullField === "description") {
          if (!this.getStrLenght(value, 500)) {
            callback(new Error(" "));
            this.$notify({
              title: "提示",
              message: "问题描述不能超过500个字符"
            });
          } else {
            callback();
          }
        } else if (rule.fullField === "dueTime") {
          if (new Date(value).getTime() > Date.now()) {
            callback(new Error(" "));
            this.$notify({
              title: "提示",
              message: "问题期望解决时间不能大于当前时间"
            });
          } else if (
            new Date(value).getTime() <
            new Date(this.ruleForm.createTime).getTime()
          ) {
            callback(new Error(" "));
            this.$notify({
              title: "提示",
              message: "业务恢复时间不能小于事件发生时间"
            });
          } else {
            callback();
          }
        } else if (
          rule.fullField === "relatedEventId" ||
          rule.fullField === "location" ||
          rule.fullField === "relatedAlterId"
        ) {
          if (!this.getStrLenght(value, 80)) {
            callback(new Error(" "));
            this.$notify({
              title: "提示",
              message: rule.overMessage
            });
          } else {
            callback();
          }
        } else if (rule.fullField === "message") {
          if (!this.getStrLenght(value, 500)) {
            callback(new Error(" "));
            this.$notify({
              title: "提示",
              message: rule.overMessage
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
    saveAsDraft(formName) {
      //保存草稿
      let ruleForm = Object.assign({}, this.ruleForm);
      ruleForm.relatedGroup = ruleForm.relatedGroup.join("&"); //问题涉及组值类型： '100&200&300'
      ruleForm.nextNodeDealMan = this.eventManager;
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
        location: ruleForm.location,
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

      const dataComments = {
        procInstId: this.procInstId,
        taskId: this.taskId,
        userId: this.userId,
        id: this.commentId,
        message: this.ruleForm.message,
        isDraft: 1
      };

      let addComments = service.addComments(dataComments);
      let updateFormData = service.updateFormData(this.procInstId, data);
      const loading = this.$loading({
        fullscreen: true,
        lock: true,
        text: "正在保存，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      
      const postArr = [];
      postArr.concat([addComments, updateFormData]);
      Promise.all(postArr).then(res => {
        this.isSaved = true;
        loading.close();
        this.$message({
          message: "保存成功！",
          type: "success"
        });
      }).catch(e => {
          loading.close();
          console.log(e);
        });
    },
    submitForm(formName) {
      // 提交按钮
      this.$refs[formName].validate(valid => {
        if (valid) {
          let ruleForm = Object.assign({}, this.ruleForm);
          ruleForm.relatedGroup = ruleForm.relatedGroup.join("&"); //问题涉及组值类型： '100&200&300'
          ruleForm.nextNodeDealMan = this.eventManager;
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

          let datastring = {
            title: this.ruleForm.title,
            description: this.ruleForm.description,
            location: this.ruleForm.location,
            form: {
              ...ruleForm
            }
          };
          delete datastring.form.title;
          delete datastring.form.description;
          delete datastring.form.location;

          let data = {
            data: JSON.stringify(datastring),
            assignee: this.userId,
            procInstId: this.procInstId, // 流程实例id
            taskId: this.taskId, // 环节id
            status: 1,
            variables: [
              {
                key: "managerUserId",
                type: "string",
                value: this.eventManager
              }
            ]
          };

          this.$confirm("是否确认提交?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              const loading = this.$loading({
                fullscreen: true,
                lock: true,
                text: "正在提交，请稍后...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
              });

              let postArr = [];
              if (this.fileList.length > 0) {
                postArr.push(this.uploadAttachment());
              }
              postArr.push(service.submitForm(data));

              Promise.all(postArr)
                .then(res => {
                  loading.close();
                  this.$message({
                    message: "提交成功！",
                    type: "success"
                  });
                  this.isSaved = true;
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
    }
  }
};
</script>
<style lang="scss">
.problemContainer .problemDir.investigation .el-textarea__inner {
  height: 200px;
}
</style>