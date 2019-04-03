<template>
  <div class="confirmTaskPlan oms-diy-elementui">
    <el-tabs
      class="topTab"
      v-model="tabActive"
    >
      <el-tab-pane
        label="查看详情"
        name="form"
      >
        <el-form
          :model="addTaskPlanForm"
          status-icon
          :rules="rules"
          ref="addTaskPlanForm"
          label-width="150px"
          class="demo-addTaskPlanForm"
          size="mini"
        >
          <el-card class="cardContent">
            <div class="moduleTitle">基本信息</div>
            <el-row>
              <el-col :span="16">
                <el-form-item
                  label="作业计划标题"
                  prop="title"
                >
                  <el-input
                    class="oms-input"
                    v-model="addTaskPlanForm.title"
                    :disabled="false"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="作业计划分类"
                  prop="jobPlanCategory"
                >
                  <el-select
                    placeholder="请选择作业计划分类"
                    class="oms-select"
                    @focus="queryParams"
                    v-model="addTaskPlanForm.jobPlanCategory"
                  >
                    <el-option
                      v-for="item in enumOptions.jobPlanCategory"
                      v-if="showOptionsEnum"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item
                  class="textarea"
                  label="作业计划描述"
                  prop="description"
                >
                  <el-input
                    class="oms-input"
                    type="textarea"
                    v-model="addTaskPlanForm.description"
                    :disabled="false"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="计划开始时间"
                  prop="planStartTime"
                >
                  <el-date-picker
                    class="oms-input"
                    type="datetime"
                    placeholder="选择日期"
                    v-model="addTaskPlanForm.planStartTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%;"
                    :disabled="false"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item
                  label="计划结束时间"
                  prop="planEndTime"
                >
                  <el-date-picker
                    class="oms-input"
                    type="datetime"
                    placeholder="选择日期"
                    v-model="addTaskPlanForm.planEndTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%;"
                    :disabled="false"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item
                  label="计划执行周期"
                  prop="planExeautionCycle"
                >
                  <el-select
                    class="oms-select"
                    v-model="addTaskPlanForm.planExeautionCycle"
                    placeholder=""
                    :disabled="false"
                  >
                    <el-option
                      label="每日"
                      value="每日"
                    ></el-option>
                    <el-option
                      label="每周"
                      value="每周"
                    ></el-option>
                    <el-option
                      label="每季"
                      value="每季"
                    ></el-option>
                    <el-option
                      label="每月"
                      value="每月"
                    ></el-option>
                    <el-option
                      label="每年。当选择“每周”时"
                      value="每年。当选择“每周”时"
                    ></el-option>
                  </el-select>
                </el-form-item>

              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="工单类型"
                  prop="workOrderType"
                >
                  <el-select
                    class="oms-select"
                    v-model="addTaskPlanForm.workOrderType"
                    placeholder=""
                    :disabled="false"
                  >
                    <el-option
                      v-for="item in workOrderTypeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="所属系统信息"
                  prop="system"
                >
                  <el-cascader
                    placeholder="请选择所属系统信息"
                    class="oms-select"
                    v-model="addTaskPlanForm.system"
                    @change="systemInfoChange"
                    :options="systemInfo"
                    change-on-select
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="计划工时（人天）"
                  prop="planWorkHours"
                >
                  <el-input
                    class="oms-input"
                    v-model="addTaskPlanForm.planWorkHours"
                    :disabled="false"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="计划执行人"
                  prop="planExecutionUserId"
                >
                  <el-cascader
                    v-model="addTaskPlanForm.planExecutionUserId"
                    :show-all-levels="false"
                    :options="planExecutionUserIdList"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="工时审核人"
                  prop="workTimeReviewerUserId"
                >
                  <el-cascader
                    v-model="addTaskPlanForm.workTimeReviewerUserId"
                    :show-all-levels="false"
                    :options="workTimeReviewerUserIdList"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="计划审核人"
                  prop="planReviewerUserId"
                >
                  <el-cascader
                    v-model="addTaskPlanForm.planReviewerUserId"
                    :show-all-levels="false"
                    :options="planReviewerUserIdList"
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="下一环节期望解决时间"
                  prop="dueTime"
                >
                  <el-date-picker
                    class="oms-input"
                    type="datetime"
                    placeholder="选择日期"
                    v-model="addTaskPlanForm.dueTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%;"
                    :disabled="false"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>

          <el-card class="cardContent">
            <div class="moduleTitle">处理步骤</div>
            <div class="dealStepsArea">
              <process-steps :procInstId.sync="procInstId"></process-steps>
            </div>
          </el-card>

          <el-card class="cardContent">
            <div class="moduleTitle">上传附件</div>
            <upload-files :file-list.sync="fileList"></upload-files>
          </el-card>

          <el-card class="cardContent"></el-card>
        </el-form>
        <el-row class="btnGroup">
          <el-button @click="saveAsDraft">保存草稿</el-button>
          <el-button
            type="primary"
            @click="submit"
          >提交</el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        label="附件信息"
        name="fileList"
      >
        <el-card class="cardContent">
          <attachment-info :procInstId="procInstId"></attachment-info>
        </el-card>
      </el-tab-pane>
      <el-tab-pane
        label="查看流程图"
        name="flowChart"
      >
        <el-card class="cardContent">
          <flow-charts
            :procInstId="procInstId"
            :procDefId="procDefId"
            :tabActive="tabActive"
            :isOver="isOver"
          ></flow-charts>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import uploadFiles from "@/modules/oms/views/components/uploadFile";
import processSteps from "@/modules/oms/views/components/processSteps";
import attachmentInfo from "@/modules/oms/views/components/attachmentInfo";
import flowCharts from "@/modules/oms/views/components/flowCharts";

export default {
  data() {
    return {
      tabActive: "form",
      procDefId: "workPlanProcess:1:2187",
      procInstId: "",
      taskId: "",
      userId: "",

      enumOptions: {}, //查询各个select框参数
      organization: [], // 组织机构数组
      taskPlanManageForm: {},

      taskPlanData: [], // 表格查询data
      systemInfo: [],
      dealManList: [],
      addDialogActive: false, // 添加模态框状态
      // modifyDialogActive: false, // 编辑模态框状态
      userName: "", // 当前用户名

      addTaskPlanForm: {
        title: "", // 标题
        workListId: "", // 作业计划id
        description: "", // 作业计划描述
        createTime: "", // 创建时间
        userId: "", // 创建人id

        planStartTime: "", // 计划开始时间
        planEndTime: "", // 计划结束时间
        jobPlanCategory: "", // 作业计划分类
        workOrderType: "", // 工单类型
        planExeautionCycle: "", // 计划执行周期
        system: [], // 所属系统类型select
        systemSubclass: "", // 所属系统类型子类select
        systemItem: "", // 所属业务系统条目select

        planWorkHours: "", // 计划工时
        expectDeadline: "", // 期望完成时限
        planExecutionUserId: [], // 计划执行人
        workTimeReviewerUserId: [], // 工时审核人
        planReviewerUserId: [], // 计划审核人
        dueTime: "" // 下一环节期望解决时间
      },
      addRules: {
        title: [
          { required: true, message: "作业计划标题不能为空", trigger: "blur" }
        ],
        description: [
          { required: true, message: "作业计划描述不能为空", trigger: "blur" }
        ],
        planStartTime: [
          { required: true, message: "计划开始时间不能为空", trigger: "blur" }
        ],
        planEndTime: [
          { required: true, message: "计划结束时间不能为空", trigger: "blur" }
        ],
        jobPlanCategory: [
          { required: true, message: "作业计划分类不能为空", trigger: "blur" }
        ],
        workOrderType: [
          { required: true, message: "工单类型不能为空", trigger: "blur" }
        ],
        planExeautionCycle: [
          { required: true, message: "计划执行周期不能为空", trigger: "blur" }
        ],
        system: [
          { required: true, message: "所属系统类型不能为空", trigger: "blur" }
        ],

        planWorkHours: [
          { required: true, message: "计划工时不能为空", trigger: "blur" }
        ],
        expectDeadline: [
          { required: true, message: "期望完成时限不能为空", trigger: "blur" }
        ],
        planExecutionUserId: [
          { required: true, message: "计划执行人不能为空", trigger: "blur" }
        ],
        planReviewerUserId: [
          { required: true, message: "计划审核人不能为空", trigger: "blur" }
        ],
        dueTime: [
          {
            required: true,
            message: "下一环节期望解决时间不能为空",
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
  watch: {
    addDialogActive: function(val) {
      if (val === false) {
        this.$refs["addTaskPlan"].resetFields();
      }
    }
  },
  mounted() {
    this.init();

    // this.queryUser()
  },
  methods: {
    init() {
      this.userId = this.$store.getters.userId;

      this.queryTaskPlanData();
    },
    queryParams() {
      if (JSON.stringify(this.enumOptions) === "{}") {
        const params = {
          name: "job_plan_category"
        };
        eventFormService.queryParams(params).then(res => {
          const data = res.result;
          if (data && data.length) {
            name: "job_plan_Category";
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
      }
    },
    // 查询组织机构
    queryOrgTree() {
      if (!this.organization.length) {
        eventFormService.queryEventInGroup({}).then(res => {
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
          this.organization = res;
        });
      }
    },
    queryTaskPlanData() {
      let params = {
        limit: 10,
        start: 0
      };
      service.queryTaskPlanData(params).then(res => {
        this.taskPlanData = res.result;
      });
    },
    // 多选复选框
    handleSelectionChange(val) {
      this.selectIds = val.map(item => item.id).join(",");
    },
    deleteTaskPlan(type, id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (type === "more") {
            // 多个删除
            let ids = {
              ids: this.selectIds
            };
            service.deleteMoreTaskPlan(ids).then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.queryTaskPlanData();
            });
          } else {
            // 单个删除
            service.deleteSingleTaskPlan({ id: id }, id).then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.queryTaskPlanData();
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 新增作业计划按钮
    addTaskPlan() {
      this.addDialogActive = true;
      this.userName = this.$store.getters.name;
      this.addTaskPlanForm.userId = this.$store.getters.userId;
      // this.addTaskPlanForm.workTimeReviewerUserId = this.$store.getters.userId;

      this.querySystemType();
      this.serarchNextNodeDealMan();
      this.queryParams();
    },
    // 取消提交
    cancelCommit() {
      this.addDialogActive = false;
      this.$refs["addTaskPlan"].resetFields();
    },
    // 新增模态框提交按钮
    taskPlanCommit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const loading = this.$loading({
            fullscreen: true,
            lock: true,
            text: "正在提交，请稍后...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          const params = {
            procDefId: this.procDefId,
            startUserId: this.userId,
            status: 1,
            variable: [
              {
                key: "startUserId",
                value: this.userId
              }
            ]
          };

          await eventFormService.createProcessInstance(params).then(res => {
            this.procInstId = res.procInstId;
            this.taskId = res.taskId;
            this.addTaskPlanForm.workListId = res.workListId;
            this.addTaskPlanForm.createTime = res.createTime;
          });

          debugger;
          let addTaskPlanForm = _.cloneDeep(this.addTaskPlanForm);

          addTaskPlanForm.planExecutionUserId = addTaskPlanForm.planExecutionUserId.join(
            ","
          );
          addTaskPlanForm.workTimeReviewerUserId = addTaskPlanForm.workTimeReviewerUserId.join(
            ","
          );
          addTaskPlanForm.planReviewerUserId = addTaskPlanForm.planReviewerUserId.join(
            ","
          );

          let systemBox = addTaskPlanForm.system.slice(0);
          addTaskPlanForm.system = systemBox[0];
          addTaskPlanForm.systemSubclass = systemBox[1];
          addTaskPlanForm.systemItem = systemBox[2];

          let dataString = {
            title: this.addTaskPlanForm.title,
            description: this.addTaskPlanForm.description,
            form: {
              ...addTaskPlanForm
            }
          };

          let data = {
            assignee: this.userId,
            status: 3,
            procInstId: this.procInstId, // 流程实例id
            taskId: this.taskId, // 环节id
            data: JSON.stringify(dataString),
            variables: [
              {
                key: "reviewerUserId",
                value:
                  this.addTaskPlanForm.workTimeReviewerUserId[
                    this.addTaskPlanForm.workTimeReviewerUserId.length - 1
                  ] /
                    -10000 +
                  ""
              }
            ]
          };
          await eventFormService.submitForm(data);

          this.queryTaskPlanData();
          loading.close();
          this.addDialogActive = false;
          this.$message({
            message: "提交成功！",
            type: "success"
          });
        } else {
          return false;
        }
      });
    },
    querySystemType() {
      //查询系统类型信息
      if (!this.systemInfo.length) {
        eventFormService.querySystemType().then(res => {
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
      }
    },
    systemInfoChange(value) {
      this.addTaskPlanForm.system = value;
    },
    // 查询组织架构图下的人员
    serarchNextNodeDealMan() {
      if (!this.dealManList.length) {
        eventFormService.serarchNextNodeDealMan().then(res => {
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
          this.dealManList = res;
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.confirmTaskPlan /deep/ {
  .topTab .el-tabs__nav-wrap {
    padding: 0 20px;
    background-color: #fff;
  }
  .bottomTab .el-tabs__nav-wrap {
    padding: 0 20px;
    background-color: #f5f7fa;
  }
  .cardContent {
    margin: 0 20px 20px 20px;
  }
  .moduleTitle {
    margin: 15px 0;
    border-left: 4px solid #42b983;
    padding-left: 10px;
    color: #42b983;
    font-size: 15px;
    font-weight: bold;
  }
  .btnGroup {
    text-align: center;
  }
  .textarea {
    .el-textarea__inner {
      height: 100px;
    }
  }
}
</style>