<template>
  <div class="taskPlanManage">
    <el-card class="box-card">
      <el-form :inline="true" :model="taskPlanManageForm" size="mini">
        <el-form-item>
          <el-select
            placeholder="作业计划ID"
            @focus="queryParams"
            v-model="taskPlanManageForm.workListId"
          >
            <el-option
              v-for="(item,index) in taskPlanData"
              :key="index"
              :label="item.workListId"
              :value="item.workListId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="taskPlanManageForm.createTime"
            type="datetime"
            placeholder="请选择创建时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            placeholder="作业计划分类"
            @focus="queryParams"
            v-model="taskPlanManageForm.jobPlanCategory"
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
        <el-button type="primary" size="mini" @click="queryTaskPlanData">查询</el-button>
        <el-button type size="mini">重置</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-row>
        <el-button type="primary" size="mini" @click="addTaskPlan">新增作业计划</el-button>
        <el-button type size="mini" @click="deleteTaskPlan('more')">批量删除</el-button>
      </el-row>
      <el-table :data="taskPlanData" tooltip-effect="light" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="workListId" label="作业计划ID" width="200"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="jobPlanCategory" label="作业计划分类" width="120"></el-table-column>
        <el-table-column prop="planStartTime" label="计划开始时间" width="180"></el-table-column>
        <el-table-column prop="planEndTime" label="计划结束时间" width="180"></el-table-column>
        <el-table-column prop="planExeautionCycle" label="计划执行周期" width="120"></el-table-column>
        <el-table-column prop="planExecutionUserId" label="计划执行人" width="100"></el-table-column>
        <el-table-column prop="description" label="执行内容" width="120" show-overflow-tooltip ></el-table-column>
        <el-table-column prop="userId" label="创建人" width="100"></el-table-column>
        <el-table-column prop="planReviewerUserId" label="审核人" width="100"></el-table-column>
        <el-table-column label="审核时间" width="180"></el-table-column>
        <el-table-column label="操作" width="60" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="mini" @click="editTaskPlan(scope.row)">编辑</el-button> -->
            <el-button type="text" size="mini" @click="deleteTaskPlan('single', scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增模态框 -->
    <el-dialog class="taskPlan" title :visible.sync="addDialogActive" width="80%">
      <div class="dialogName">新增作业计划</div>
      <el-form
        :model="addTaskPlanForm"
        :rules="addRules"
        ref="addTaskPlan"
        size="mini"
        label-width="140px"
      >
        <el-row>
          <el-col :span="16">
            <el-form-item label="作业计划标题" prop="title">
              <el-input v-model="addTaskPlanForm.title" placeholder="请填写作业计划标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="作业计划分类" prop="jobPlanCategory">
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
          <!-- <el-col :span="8">
            <el-form-item label="作业计划ID" prop="workListId">
              <el-input v-model="addTaskPlanForm.workListId" :disabled="true"></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="作业计划描述" prop="description" class="deacription">
              <el-input
                type="textarea"
                v-model="addTaskPlanForm.description"
                placeholder="请选择作业计划描述"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- <el-form-item label="创建时间" prop="createTime">
              <el-input v-model="addTaskPlanForm.createTime" :disabled="true"></el-input>
            </el-form-item>-->
            <!-- <el-form-item label="创建人" prop="userId">
              <el-input v-show="false" v-model="addTaskPlanForm.userId" :disabled="true"></el-input>
              <el-input v-show="true" v-model="userName" :disabled="true"></el-input>
            </el-form-item>-->
            <el-form-item label="计划开始时间" prop="planStartTime">
              <el-date-picker
                placeholder="请选择计划开始时间"
                class="oms-select"
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="addTaskPlanForm.planStartTime"
                type="datetime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="计划结束时间" prop="planEndTime">
              <el-date-picker
                placeholder="请选择计划结束时间"
                class="oms-select"
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="addTaskPlanForm.planEndTime"
                type="datetime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="计划执行周期" prop="planExeautionCycle">
              <el-input v-model="addTaskPlanForm.planExeautionCycle" placeholder="请选择计划执行周期"></el-input>
            </el-form-item>
            <el-form-item label="期望完成时限" prop="expectDeadline">
              <el-input v-model="addTaskPlanForm.expectDeadline" placeholder="请填写期望完成时限"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <el-form-item label="工单类型" prop="workOrderType">
              <el-select
                class="oms-select"
                v-model="addTaskPlanForm.workOrderType"
                placeholder="请选择工单类型"
              >
                <el-option label="开发类" value="开发类"></el-option>
                <el-option label="维护类" value="维护类"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属系统信息" prop="system">
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
            <el-form-item label="计划工时(天)" prop="planWorkHours">
              <el-input v-model="addTaskPlanForm.planWorkHours" placeholder="请填写计划工时"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="计划执行人" prop="planExecutionUserId">
              <el-cascader
                placeholder="请选择计划执行人"
                class="oms-select"
                :options="dealManList"
                :show-all-levels="false"
                v-model="addTaskPlanForm.planExecutionUserId"
                @focus="querySystemType"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工时审核人" prop="workTimeReviewerUserId">
              <!-- <el-input v-show="false" v-model="addTaskPlanForm.workTimeReviewerUserId"></el-input>
              <el-input v-model="userName"></el-input>-->
              <el-cascader
                placeholder="请选择工时审核人"
                class="oms-select"
                :options="dealManList"
                :show-all-levels="false"
                v-model="addTaskPlanForm.workTimeReviewerUserId"
                @focus="querySystemType"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划审核人" prop="planReviewerUserId">
              <el-cascader
                placeholder="请选择计划审核人"
                class="oms-select"
                :options="dealManList"
                :show-all-levels="false"
                v-model="addTaskPlanForm.planReviewerUserId"
                @focus="querySystemType"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="下一环节期望解决时间" prop="dueTime">
              <el-date-picker
                placeholder="请选择下一环节期望解决时间"
                class="oms-select"
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="addTaskPlanForm.dueTime"
                type="datetime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelCommit" size="mini">取 消</el-button>
        <el-button type="primary" @click="taskPlanCommit('addTaskPlan')" size="mini">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 编辑模态框 -->
    <!-- <el-dialog class="taskPlan" title="编辑作业计划" :visible.sync="modifyDialogActive" width="60%">
      <el-form
        :model="modifyTaskPlanForm"
        :rules="addRules"
        ref="modifyTaskPlan"
        size="mini"
        label-width="120px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="作业计划ID" prop="workListId">
              <el-input v-model="modifyTaskPlanForm.workListId" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间" prop="createTime">
              <el-date-picker
                class="oms-select"
                value-format="yyyy-MM-dd"
                v-model="modifyTaskPlanForm.createTime"
                type="date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划开始时间" prop="planStartTime">
              <el-date-picker
                class="oms-select"
                value-format="yyyy-MM-dd"
                v-model="modifyTaskPlanForm.planStartTime"
                type="date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划结束时间" prop="planEndTime">
              <el-date-picker
                class="oms-select"
                value-format="yyyy-MM-dd"
                v-model="modifyTaskPlanForm.planEndTime"
                type="date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划执行周期" prop="planExeautionCycle">
              <el-input v-model="modifyTaskPlanForm.planExeautionCycle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作业计划分类" prop="jobPlanCategory">
              <el-select
              class="oms-select"
                placeholder="作业计划分类"
                @focus="queryParams"
                v-model="modifyTaskPlanForm.jobPlanCategory"
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
          <el-col :span="12">
            <el-form-item label="计划执行人" prop="planExecutionUserId">
              <el-input v-model="modifyTaskPlanForm.planExecutionUserId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建人" prop="userId">
              <el-select class="oms-select" v-model="modifyTaskPlanForm.userId">
                <el-option v-for="item in []" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核人" prop="planReviewerUserId">
              <el-select class="oms-select" v-model="modifyTaskPlanForm.planReviewerUserId">
                <el-option v-for="item in []" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核时间" prop="createTime">
              <el-date-picker
                class="oms-select"
                v-model="modifyTaskPlanForm.createTime"
                type="date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="执行流程" prop="name">
              <el-input v-model="modifyTaskPlanForm.createTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogActive = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="taskPlanCommit" size="mini">提 交</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>
<script>
import * as eventFormService from "@/modules/oms/api/oms/eventForm";
import * as service from "@/modules/oms/api/oms/dailyOperationManage/taskPlanManage";
var _ = require("lodash");
export default {
  data() {
    return {
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
      // modifyTaskPlanForm: {
      //   workListId: "",
      //   createTime: "",
      //   planStartTime: "",
      //   planEndTime: "",
      //   planExeautionCycle: "",
      //   jobPlanCategory: "",
      //   planExecutionUserId: "",
      //   userId: "",
      //   planReviewerUserId: ""
      // },
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
    "addDialogActive": function(val){
      if(val===false){
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
    // editTaskPlan(row) {
    //   // 编辑
    //   this.modifyDialogActive = true;
    //   let params = {
    //     workListId: row.workListId
    //   };
    //   service.queryTaskPlanData(params).then(res => {
    //     this.modifyTaskPlanForm = res.result[0]
    //   });
    // },
    // queryUser(){
    //   let params = {
    //     userIds: '04'
    //   };
    //   debugger
    //   eventFormService.queryUser(params).then(res=>{

    //   })
    // }
  }
};
</script>
<style lang="scss" scoped>
.taskPlanManage /deep/ {
  padding: 16px;

  .deacription {
    .el-textarea__inner {
      height: 170px;
    }
  }
  .taskPlan {
    .el-dialog__body {
      padding: 10px 20px;
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .oms-select {
    width: 100%;
    .el-input__inner {
      width: 100%;
    }
  }
}
.box-card {
  margin: 8px 0 16px 0;
}
.title {
  margin-bottom: 10px;
  height: 16px;
  line-height: 16px;
}

.dialogName {
  margin: 0 15px 15px 15px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  font-weight: bold;
  color: rgb(59, 167, 118);
  line-height: 16px;
}
.dialogName::before {
  position: absolute;
  top: -1px;
  left: -15px;
  content: "";
  width: 4px;
  height: 16px;
  line-height: 16px;
  background: linear-gradient(
    0deg,
    rgba(43, 147, 201, 1),
    rgba(107, 179, 87, 1)
  );
}
</style>
