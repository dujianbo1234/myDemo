<template>
  <div class="oms-diy-elementui eventContainer">
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
      v-show=" tabActive === 'form' "
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
            <el-form-item
              label="事件标题："
              prop="title"
            >
              <el-input
                class="oms-input"
                v-model.trim="ruleForm.title"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事件ID："
              prop
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.workListId"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item
              class="eventDicr textarea"
              label="事件描述："
              prop="description"
            >
              <el-input
                type="textarea"
                v-model.trim="ruleForm.description"
              ></el-input>
              <span class="inputTips">最多输入500个字符</span>

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
            <el-form-item
              label="登记时间："
              prop
            >
              <el-date-picker
                class="oms-input"
                v-model="ruleForm.createTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item
              label="事件完成期限："
              prop
            >
              <el-date-picker
                class="oms-input"
                v-model="ruleForm.dueTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="true"
              />
            </el-form-item>
            <el-form-item
              label="事件状态："
              prop="eventStatus"
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.eventStatus"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="事件性质："
              prop="eventNature"
            >
              <el-select
                v-model="ruleForm.eventNature"
                class="oms-select"
              >
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
            <el-form-item
              label="事件来源："
              prop="eventSource"
            >
              <el-select
                v-model="ruleForm.eventSource"
                class="oms-select"
              >
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
            <el-form-item
              label="事件优先级："
              prop
            >
              <el-select
                v-model="ruleForm.eventPriority"
                placeholder
                class="oms-select"
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
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="事件影响度："
              prop="eventInfluenceDegree"
            >
              <el-select
                v-model="ruleForm.eventInfluenceDegree"
                class="oms-select"
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
            <el-form-item
              label="事件发生时间："
              prop="eventTime"
            >
              <el-date-picker
                class="oms-input"
                v-model="ruleForm.eventTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="地点："
              prop="location"
            >
              <el-input
                class="oms-input"
                v-model="ruleForm.location"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="事件涉及组："
              prop="relatedOrg"
            >
              <el-cascader
                :options="eventInGroupList"
                v-model="ruleForm.relatedOrg"
                @change="EventInGroupChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="协查原因类别："
              prop="consultationReasonCategory"
            >
              <el-select
                v-model="ruleForm.consultationReasonCategory"
                class="oms-select"
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
            <el-form-item
              class="pointer"
              label="所属系统信息："
              prop="system"
            >
              <el-cascader
                v-model="ruleForm.system"
                @change="systemInfoChange"
                :options="systemInfo"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="8">
            <el-form-item
              class="pointer"
              label="事件类别信息："
              prop="eventCategory"
            >
              <el-cascader
                v-model="ruleForm.eventCategory"
                @change="eventCategoryInfoChange"
                :options="eventInfo"
              ></el-cascader>
            </el-form-item>
          </el-col>-->
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
        <process-steps :procInstId.sync="procInstId"></process-steps>
      </div>

      <!-- 上传附件 -->
      <div class="filesArea">
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

      <el-tabs
        type="border-card"
        class="tabsArea"
      >
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
          <configuration-association
            :procInstId="procInstId"
            :taskId="taskId"
          ></configuration-association>
        </el-tab-pane>
      </el-tabs>

      <el-dialog
        :visible.sync="currentAlertDialog"
        width="70%"
      >
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
        <!-- <el-button
          type="info"
          @click="saveAsDraft('ruleForm')"
        >保存草稿</el-button>-->
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >提交</el-button>
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

import resource from "@/modules/oms/resource.js";

import mailTable from "@/components/columnTable/cloumnTable.vue";

import requests from "@/modules/oms/api/index";

import processSteps from "@/modules/oms/views/components/processSteps";

import configurationAssociation from "@/modules/oms/views/components/configurationAssociation";

import attachmentInfo from "@/modules/oms/views/components/attachmentInfo";

export default {
  name: "Event",
  data() {
    return {
      userId: "", //用户id
      procInstId: "", // 流程实例id
      procDefId: "", //流程定义id
      taskId: "", // 环节id

      previousPathTwo: false,
      isSaved: false,

      tabActive: "form", //流程图和处理表单tab切换
      flowChartData: null, // 默认的流程图片地址
      eventInGroupList: [], // 事件涉及组列表

      previousPath: "",
      seeWarnDialog: false, //查看告警弹出框状态
      warnTableData: [], // 告警消息列表
      warnTableDataPagination: {
        start: 1
      },
      warnTableDataTotal: 0,

      enumOptions: {}, //查询各个select框参数
      createTime: "", // 工单创建时间
      attachment: [], //附件
      inputFile: "", //input框显示第一个文件的名字
      fileList: [], //文件列表数组

      systemInfo: [], //所属系统信息
      eventInfo: [], //事件类别信息

      currentAlertactiveNameInfo: "first",

      alertYuLanData: {},

      alertTableData: [],

      currentAlertDialog: false,

      ruleForm: {
        title: "", // 事件标题
        workListId: "", // 事件ID
        description: "", // 事件描述
        createTime: "", // 登记时间
        dueTime: "", //事件完成期限
        eventStatus: "事件登记", // 事件状态
        eventNature: "", // 事件性质
        eventSource: "", // 事件来源
        eventPriority: "中", // 事件优先级
        eventInfluenceDegree: "", // 事件影响度select
        eventTime: "", // 事件发生时间
        location: "", // 地点
        relatedOrg: [], // 事件涉及组
        consultationReasonCategory: "", // 协查原因类别

        system: [], // 所属系统类型select
        systemSubclass: "", // 所属系统类型子类select
        systemItem: "", // 所属业务系统条目select

        eventCategory: [], // 事件类别select
        eventCategory1: "", // 事件子类select
        eventCategory2: "", // 事件条目

        eventManager: "" //事件经理
      },
      rules: {
        title: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "事件标题不能为空",
            trigger: "blur"
          }
        ],
        description: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "事件描述不能为空",
            trigger: "blur"
          }
        ],
        eventSource: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "事件来源不能为空",
            trigger: "change"
          }
        ],
        eventInfluenceDegree: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "事件影响度不能为空",
            trigger: "change"
          }
        ],
        relatedOrg: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "事件涉及组不能为空",
            trigger: "change"
          }
        ],
        eventNature: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "事件性质不能为空",
            trigger: "change"
          }
        ],
        system: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "所属系统信息不能为空",
            trigger: "change"
          }
        ],
        eventCategory: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "事件类别信息不能为空",
            trigger: "change"
          }
        ],
        eventTime: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "事件发生时间不能为空",
            trigger: "blur"
          }
        ],
        location: [
          {
            validator: this.validatePass,
            required: false,
            myMessage: "长度在 0 到 20 个字符",
            trigger: "blur"
          }
        ],
        consultationReasonCategory: [
          {
            validator: this.validatePass,
            required: true,
            myMessage: "协查原因类别不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    mailTable,
    processSteps,
    configurationAssociation,
    attachmentInfo
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
    "ruleForm.relatedOrg": function(oldValue, newVaule) {
      this.queryEventManager();
    },
    "ruleForm.eventPriority": function(val, oldVal) {
      // 根据事件优先级判断事件完成期限
      this.calculateDeadTime();
    },
    tabActive(val, oldVal) {
      this.changeTab(val);
    }
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
  created() {},
  mounted() {
    window.onbeforeunload = function() {
      return true;
    };
    this.init();
  },
  destroyed() {
    // 跳转其他路由 取消 onbeforeunload 事件
    window.onbeforeunload = null;
  },
  methods: {
    async init() {
      // 进入index页面就调用，创建流程实例id
      this.userId = this.$store.getters.userId; //获取用户id
      this.taskId = this.$route.params.taskId;
      this.procDefId = this.$route.params.procDefId; // 获取流程定义id
      this.procInstId = this.$route.params.procInstId;
      this.tabActive = this.$route.query.tabActive || "form";

      this.ruleForm.workListId = this.$route.query.id;
      this.ruleForm.createTime = this.$route.query.createTime;

      this.previousPath = this.$route.query.previousPath;

      this.previousPathTwo = this.$route.query.previousPathTwo;

      if (this.previousPath === "/myDesk/createPage") {
        // this.createProcessInstance();
        this.calculateDeadTime();
      } else if (this.previousPath === "/myDesk/myNeedDeal") {
        this.queryData();
      } else if (this.previousPath === "/myDesk/myDraft") {
        // 从草稿箱进来的，修改事件完成期限的时间
        await this.queryData();
      } else {
      }

      this.queryParams();
      this.queryEventInGroup();
      this.querySystemType();
      this.queryEventType();
      // this.queryWarnList();
    },
    calculateDeadTime() {
      // 计算事件完成期限
      let level = this.ruleForm.eventPriority;
      let time = "";
      if (level === "低") {
        time = 12;
      } else if (level === "中") {
        time = 8;
      } else if (level === "高") {
        time = 4;
      } else if (level === "紧急") {
        time = 2;
      }
      var timeStamps =
        Date.now() + parseFloat(new Date(time * 60 * 60 * 1000).getTime());
      this.ruleForm.dueTime = parseTime(timeStamps, "{y}-{m}-{d} {h}:{i}:{s}");
    },
    showWarnDetail(row, e, col) {
      this.currentAlertDialog = true;
      this.alertYuLanData = {
        resObj: [
          // 资源对象详情
          {
            val: "BOMC03", // 数据值
            label: "CI名称", // 数据key名称(界面显示,当label不存在时,该项不显示)
            key: "ciname" // 数据key(界面不显示)
          },
          {
            val: "",
            key: "last_check_time"
          },
          {
            val: "",
            key: "delete_time"
          },
          {
            val: "",
            key: "description"
          },
          {
            val: "系统自动填写",
            key: "integrator"
          },
          {
            val: "",
            key: "type"
          },
          {
            val: "LinuxVM",
            key: "model"
          },
          {
            val: "使用中",
            key: "state"
          },
          {
            val: "shanghai",
            key: "department"
          },
          {
            val: "1544770671132",
            key: "create_time"
          },
          {
            val: "根类属性登录用户",
            key: "manager"
          },
          {
            val: "IaaS",
            key: "level"
          },
          {
            val: "系统自动填写",
            key: "module"
          },
          {
            val: "shanghai",
            label: "服务级别",
            key: "service_level"
          },
          {
            val: "192.168.127.244",
            label: "小型主机的ip",
            key: "ip"
          },
          {
            val: "系统自动填写",
            key: "service_provider"
          },
          {
            val: "已审核",
            key: "check"
          },
          {
            val: "BOSS系统",
            label: "影响系统",
            key: "influence_system"
          },
          {
            val: "SW-LIN-ZXJ-BOMC03",
            label: "CIID",
            key: "ciid"
          },
          {
            val: "1544770670292",
            key: "last_update_time"
          },
          {
            val: "全省",
            label: "影响区域",
            key: "influence_area"
          },
          {
            val: "爷爷",
            key: "last_update_staff"
          },
          {
            val: "在线计费",
            key: "name"
          },
          {
            val: "系统自动填写",
            key: "sub_module"
          },
          {
            val: "国通机房",
            label: "主机的位置",
            key: "location"
          },
          {
            val: "正常",
            key: "isdelete"
          },
          {
            val: "所有客户",
            label: "影响客户",
            key: "influence_customer"
          }
        ],
        id: "5c1a30e6cbc58d44a3f54199", // 告警id
        code: "PM-88-25-001-01", // 告警编码
        type: 1, // 告警类型(不显示)
        status: 0, // 不显示
        level: 1, // 告警级别 0:一般告警 1:主要告警 2:严重告警
        ciid: "SW-LIN-ZXJ-BOMC03", // 资源对象id
        tags: [], // 不显示
        content:
          "资源：SW-LIN-ZXJ-BOMC03 上的指标：PM-88-25-001-01 当前值达到 20.600025，触发阈值区间[20.0, 80.0)的主要告警！", // 告警内容
        count: 130, // 告警次数
        firstAlertTime: "20181219171106", // 首次告警时间
        lastAlertTime: "20181219195206", // 最后告警时间
        duration: 9660, // 告警时长(秒)
        pushStatus: 0
      };

      this.alertTableData = this.alertYuLanData.resObj.filter(val => {
        return val.label;
      });
    },
    getEventPriority() {
      // 根据事件优先级判断事件完成期限
      var level = this.ruleForm.eventPriority;
      var time = "";
      if (level === "低") {
        time = 12;
      } else if (level === "中") {
        time = 8;
      } else if (level === "高") {
        time = 4;
      } else if (level === "紧急") {
        time = 2;
      }
      var timeStamps =
        parseFloat(new Date(this.ruleForm.createTime).getTime()) +
        parseFloat(new Date(time * 60 * 60 * 1000).getTime());
      this.ruleForm.dueTime = parseTime(timeStamps, "{y}-{m}-{d} {h}:{i}:{s}");
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

      const isDraft = this.$route.query.isDraft;

      if (isDraft) {
        params.isDraft = 1;
      }

      service.queryData(params).then(res => {
        this.ruleForm = { ...this.ruleForm, ...res.result[0].form };
        this.ruleForm.title = res.result[0].title;
        this.ruleForm.description = res.result[0].description;
        this.ruleForm.location = res.result[0].location;

        this.ruleForm.eventStatus = "事件登记";

        // 所属系统信息与所属事件类别信息转化为数组，在页面框中显示 ['100','200','300']
        let systemArr = [
          this.ruleForm.system,
          this.ruleForm.systemSubclass,
          this.ruleForm.systemItem
        ];
        let eventCategoryArr = [
          this.ruleForm.eventCategory,
          this.ruleForm.eventCategory1,
          this.ruleForm.eventCategory2
        ];
        const isInValidSystemData = systemArr.every(item => item === null);
        this.ruleForm.system = isInValidSystemData ? [] : systemArr;
        this.ruleForm.eventCategory = eventCategoryArr;

        if (!this.ruleForm.relatedOrg) {
          this.ruleForm.relatedOrg = [];
        } else {
          this.ruleForm.relatedOrg = this.ruleForm.relatedOrg.split("&");
        }
        this.calculateDeadTime();

        // this.ruleForm.relatedOrg.forEach((item, index) => {
        //   this.ruleForm.relatedOrg[index] = parseFloat(
        //     this.ruleForm.relatedOrg[index]
        //   );
        // });
      });
    },
    createProcessInstance() {
      //创建流程实例
      const params = {
        procDefId: this.procDefId,
        startUserId: this.userId,
        status: 1,
        variable: [
          {
            key: "startUserId",
            value: this.userId
          },
          {
            key: "type",
            value: "1"
          }
        ]
      };
      return service
        .createProcessInstance(params)
        .then(res => {
          this.procInstId = res.procInstId;
          this.taskId = res.taskId;
          this.ruleForm.workListId = res.workListId;
          this.ruleForm.createTime = res.createTime;
        })
        .catch(err => {
          this.$message({
            message: "创建流程失败！3s后跳转至工单创建页面",
            type: "error"
          });
          setTimeout(() => {
            this.$router.push({
              path: "/myDesk/createPage"
            });
          }, 3000);
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
            status: 3,
            variables: [
              {
                key: "userIdSecond",
                value: this.ruleForm.eventManager
              }
            ],
            firstTask: "1",
            procInstId: this.procInstId, // 流程实例id
            taskId: this.taskId, // 环节id
            title: this.ruleForm.title,
            assignee: this.userId
            // dueTime: this.ruleForm.nextNodeTime
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
              let postArr = [];
              let submitForm = service.submitForm(data);
              postArr.push(submitForm);
              if (this.fileList.length > 0) {
                postArr.push(this.uploadAttachment());
              }
              Promise.all(postArr)
                .then(res => {
                  service
                    .modifyProcess(this.procInstId, {
                      dueTime: this.ruleForm.dueTime
                    })
                    .then(res => {
                      loading.close();
                      this.$message({
                        message: "提交成功！",
                        type: "success"
                      });
                      this.isSaved = true;
                      this.$store.dispatch("changeNeedDealCount");
                      this.removeTag();
                      this.$router.push({
                        path: "/myDesk/myNeedDeal"
                      });
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
    EventInGroupChange(val) {
      //事件涉及组下拉框改变
    },
    queryEventManager() {
      // 查询事件经理
      if (!this.ruleForm.relatedOrg || !this.ruleForm.relatedOrg.length) {
        return;
      }
      const params = {
        orgId: this.ruleForm.relatedOrg[this.ruleForm.relatedOrg.length - 1], // 机构id
        roleType: 10 // 角色
      };
      service.queryEventManager(params).then(res => {
        this.ruleForm.eventManager = res.result[0].userId;
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
      //字段必填验证提示
      if ((!value || value.length < 1) && rule.fullField !== "location") {
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
              message: "事件标题不能超过80个字符"
            });
          } else {
            callback();
          }
        } else if (rule.fullField === "description") {
          if (!this.getStrLenght(value, 500)) {
            callback(new Error(" "));
            this.$notify({
              title: "提示",
              message: "事件描述不能超过500个字符"
            });
          } else {
            callback();
          }
        } else if (rule.fullField === "eventTime") {
          //验证事件发生时间
          if (new Date(value).getTime() > Date.now()) {
            callback(new Error(" "));
            this.$notify({
              title: "提示",
              message: "时间事件发生时间不能大于当前时间"
            });
          } else {
            callback();
          }
        } else if (rule.fullField === "location") {
          if (!this.getStrLenght(value, 20)) {
            callback(new Error(" "));
            this.$notify({
              title: "提示",
              message: "长度在 0 到 20 个字符"
            });
          } else {
            callback();
          }
        } else {
          callback();
        }
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
