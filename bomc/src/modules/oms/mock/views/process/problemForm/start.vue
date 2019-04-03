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
              <el-input class="oms-input" v-model.trim="ruleForm.title"></el-input>
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
            <el-form-item label="问题描述：" prop="description" class="problemDir textarea">
              <span class="inputTips">最多输入500个字符</span>
              <el-input type="textarea" v-model.trim="ruleForm.description"></el-input>
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
            <el-form-item label="问题期望解决时间" prop="dueTime">
              <el-date-picker
                class="oms-input"
                v-model="ruleForm.dueTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label="关联事件单号：" prop="relatedEventId">
              <el-input class="oms-input" v-model="ruleForm.relatedEventId"></el-input>
            </el-form-item>
            <el-form-item label="地点：" prop="location">
              <el-input class="oms-input" v-model="ruleForm.location"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="问题状态：" prop="status">
              <el-input class="oms-input" v-model="ruleForm.status" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="问题来源：" prop="questionSource">
              <el-select v-model="ruleForm.questionSource" class="oms-select">
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
              <el-select v-model="ruleForm.questionPriority" class="oms-select">
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
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item class="pointer" label="所属系统信息：" prop="system">
              <el-cascader
                v-model="ruleForm.system"
                @change="systemInfoChange"
                :options="systemInfo"
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
              ></el-cascader>
            </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="问题涉及组：" prop="relatedGroup">
              <el-cascader
                :options="inGroupList"
                v-model="ruleForm.relatedGroup"
                @change="inGroupChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <el-row
        class="clearfix titleBar"
        v-if="this.previousPath === '/myDesk/myNeedDeal' && !previousPathTwo"
      >
        <div class="basicInfo left">处理步骤</div>
      </el-row>
      <div
        class="dealStepsArea"
        v-if="this.previousPath === '/myDesk/myNeedDeal' && !previousPathTwo"
      >
        <process-steps :procInstId.sync="procInstId" :ruleForm.sync="ruleForm"></process-steps>
      </div>

      <!-- 上传附件 -->
      <div class="filesArea">
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
        <!-- <el-button
          type="info"
          @click="saveAsDraft('ruleForm')"
        >保存草稿</el-button>-->
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-row>
    </el-form>

    <div v-show="tabActive === 'attachmentInfo'">
      <attachment-info :procInstId="procInstId"></attachment-info>
    </div>

    <div v-if="tabActive === 'chart'" class="flow-chart">
      <flow-chart
        :procInstId="procInstId"
        :procDefId="procDefId"
        :tabActive="tabActive"
        :isOver="isOver"
      ></flow-chart>
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

      previousPathTwo: false,
      isDraft: "",
      isSaved: false,

      isOver: "",
      tabActive: "form",
      flowChartData: null, // 默认的流程图片地址
      previousPath: "", //获取上一个页面的路由

      inputFile: "", //input框显示第一个文件的名字
      enumOptions: {}, //查询各个select框参数
      systemInfo: [], //所属系统信息
      problemInfo: [], //事件类别信息
      inGroupList: [], //涉及组
      fileList: [], //文件数组
      processStepData: [], //处理步骤的数据

      commentId: "",

      ruleForm: {
        title: "", //问题标题
        workListId: "", //问题id
        description: "", //问题描述
        createTime: "", //创建时间
        dueTime: "", //创建时间
        relatedEventId: "", //关联事件id
        location: "", //地点
        questionSource: "", //问题来源
        questionPriority: "", //问题优先级
        status: "启动问题", //问题状态
        system: [], //所属系统类型
        systemSubclass: "", //所属业务系统子类
        systemItem: "", //所属业务系统条目
        questionCategory: [], //问题分类
        questionCategorySubclass: "", //问题分类子类
        questionItem: "", //问题条目
        relatedDepartment: "", //问题涉及部门
        relatedGroup: [] //问题涉及组
      },
      rules: {
        title: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "问题标题不能为空",
            trigger: "blur"
          }
        ],
        description: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "问题描述不能为空",
            overMessage: "问题描述不能超过500个字符",
            trigger: "blur"
          }
        ],
        dueTime: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "问题期望解决时间不能为空",
            trigger: "blur"
          }
        ],
        relatedEventId: [
          {
            validator: this.validatePass,
            required: false,
            overMessage: "关联事件单号不能超过80个字符",
            trigger: "blur"
          }
        ],
        location: [
          {
            validator: this.validatePass,
            required: false,
            overMessage: "地点不能超过80个字符",
            trigger: "blur"
          }
        ],
        questionSource: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "问题来源不能为空",
            trigger: "change"
          }
        ],
        questionPriority: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "问题优先级不能为空",
            trigger: "change"
          }
        ],
        system: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "所属系统类型不能为空",
            trigger: "change"
          }
        ],
        questionCategory: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "问题分类不能为空",
            trigger: "change"
          }
        ],
        relatedGroup: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "问题涉及组不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isSaved) {
      this.$confirm(
        "是否确定离开当前页面，离开该页面该条工单将被删除?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功！"
          });
          this.removeTag();
          next();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
    }
  },
  watch: {
    "ruleForm.relatedGroup": function(oldValue, newVaule) {
      this.queryEventManager();
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

      /** 获取路由带参 **/
      this.taskId = this.$route.params.taskId;
      this.procDefId = this.$route.params.procDefId; // 获取流程定义id
      this.procInstId = this.$route.params.procInstId;
      this.isDraft = this.$route.query.isDraft;
      this.ruleForm.workListId = this.$route.query.id;
      this.ruleForm.createTime = this.$route.query.createTime;
      this.previousPath = this.$route.query.previousPath;
      this.tabActive = this.$route.query.tabActive || "form";
      this.previousPathTwo = this.$route.query.previousPathTwo;
      this.isOver = this.$route.query.isOver || "";

      if (
        this.previousPath === "/myDesk/myNeedDeal" ||
        this.previousPath === "/myDesk/myDraft"
      ) {
        this.queryData();
      }

      this.queryParams();
      this.querySystemType();
      this.queryEventType();
      this.queryEventInGroup();
    },
    changeTab(val) {
      //流程图和处理表单tab切换
      this.tabActive = val;
      if (
        this.tabActive === "form" &&
        this.previousPath === "/myDesk/myDraft"
      ) {
        this.queryData();
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
        this.ruleForm = res.result[0].form;
        this.ruleForm.title = res.result[0].title;
        this.ruleForm.description = res.result[0].description;
        this.ruleForm.location = res.result[0].location;

        this.ruleForm.eventStatus = "问题分派";

        // 所属系统信息与所属事件类别信息转化为数组，在页面框中显示 ['100','200','300']
        let systemArr = [
          this.ruleForm.system,
          this.ruleForm.systemSubclass,
          this.ruleForm.systemItem
        ];
        // const isInValidSystemData = systemArr.some(item => item === null);
        // this.ruleForm.system = isInValidSystemData ? [] : systemArr;
        this.ruleForm.system = systemArr;

        // let questionCategoryArr = [
        //   this.ruleForm.questionCategory,
        //   this.ruleForm.questionCategorySubclass,
        //   this.ruleForm.questionItem
        // ];
        // this.ruleForm.questionCategory = questionCategoryArr;
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
      });
    },
    queryEventManager() {
      // 查询问题经理
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
        rule.fullField !== "location"
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
              message: rule.overMessage
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
            this.$notify({
              title: "提示",
              message: "问题期望解决时间不能小于登记时间"
            });
          } else {
            callback();
          }
        } else if (
          rule.fullField === "relatedEventId" ||
          rule.fullField === "location"
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
    // saveAsDraft(formName) {
    //   //保存草稿
    //   let ruleForm = Object.assign({}, this.ruleForm);
    //   ruleForm.relatedGroup = ruleForm.relatedGroup.join("&"); //问题涉及组值类型： '100&200&300'

    //   let systemBox = ruleForm.system.slice(0);

    //   ruleForm.system = systemBox[0]; //系统类型
    //   ruleForm.systemSubclass = systemBox[1]; //系统子类
    //   ruleForm.systemItem = systemBox[2]; //系统条目

    //   let questionCategoryBox;
    //   if (ruleForm.questionCategory !== []) {
    //     // 问题分类信息 有内容
    //     questionCategoryBox = ruleForm.questionCategory.slice(0);
    //     ruleForm.questionCategory = questionCategoryBox[0] || ""; //问题类别
    //     ruleForm.questionCategorySubclass = questionCategoryBox[1] || ""; //问题子类
    //     ruleForm.questionItem = questionCategoryBox[2] || ""; //问题条目
    //   } else {
    //     // 问题分类信息 没有内容
    //     ruleForm.questionCategory = "";
    //     ruleForm.questionCategorySubclass = "";
    //     ruleForm.questionItem = "";
    //   }

    //   let data = {
    //     procInstId: this.procInstId,
    //     taskId: this.taskId,
    //     description: ruleForm.description,
    //     location: ruleForm.location,
    //     isDraft: 1,
    //     title: ruleForm.title,
    //     form: {
    //       ...ruleForm
    //     }
    //   };
    //   if (data.form.dueTime === "") {
    //     delete data.form.dueTime;
    //   }

    //   delete data.form.description;
    //   delete data.form.location;
    //   delete data.form.title;
    //   delete data.attachment;



    //   service.updateFormData(this.procInstId, data).then(res => {
    //     service
    //       .modifyProcess(this.procInstId, { dueTime: this.ruleForm.dueTime })
    //       .then(res => {
    //         this.$message({
    //           message: "保存成功！",
    //           type: "success"
    //         });
    //       });
    //   });
    // },
    submitForm(formName) {
      // 提交按钮
      this.$refs[formName].validate(valid => {
        if (valid) {
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
            status: 3,
            variables: [
              {
                key: "managerUserId",
                type: "string",
                value: this.eventManager
              }
            ]
          };
          if (this.previousPath === "/myDesk/createPage") {
            data.status = 3;
          } else if (
            this.previousPath === "/myDesk/myNeedDeal" &&
            !this.previousPathTwo
          ) {
            data.status = 1;
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

              let params = {
                procInstId: this.procInstId,
                dueTime: this.ruleForm.dueTime
              };
              if (this.fileList.length > 0) {
                await this.uploadAttachment();
              }
              try {
                await service.submitForm(data);
                await service.modifyProcess(params.procInstId, {
                  dueTime: params.dueTime
                });
                this.isSaved = true;

                loading.close();

                this.$message({
                  message: "提交成功！",
                  type: "success"
                });

                this.removeTag();
                this.$router.push({ path: "/myDesk/myNeedDeal" });
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
    }
  }
};
</script>
<style lang="scss">
</style>