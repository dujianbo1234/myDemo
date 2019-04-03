<template>
  <div class="process-instance-container">
    <!-- 详细信息 -->
    <div class="detail-info">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span class="title">{{name}}{{processIntanceData.id}}</span>
          <el-button
            @click="backProcssInstanceList"
            type="text"
          >返回流程实例列表</el-button>
          <el-button
            v-if="!showFlowChartText"
            @click="flowProcessDialogVisible = true"
            type="text"
          >查看流程图</el-button>
          <el-button
            v-if="!showFlowChartText"
            @click="stopProcessInstance"
            type="text"
            class="danger"
          >关闭流程实例</el-button>
        </div>

        <el-dialog
          title="流程图"
          :visible.sync="flowProcessDialogVisible"
          width="60%"
        >
          <a
            :href="imgSrc()"
            target="_blank"
          >
            <img
              class="flow-process-img"
              :src="imgSrc()"
              alt="流程图"
              title="流程图"
            >
          </a>
        </el-dialog>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processIntanceData.id}}</span>
          </el-col>

          <el-col :span="3">
            <span>流程定义ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processIntanceData.processDefinitionId}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <!-- <el-col :span="3">
            <span>流程实例起始ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processIntanceData.startUserId | filterNull}}</span>
          </el-col> -->

          <el-col :span="3">
            <span>流程名称：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processIntanceData.deploymentName | filterNull}}</span>
          </el-col>

          <el-col :span="3">
            <span>流程实例状态：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processIntanceData.completed | completed}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>开始时间：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processIntanceData.startTime | time}}</span>
          </el-col>
          <el-col :span="3">
            <span>结束时间：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processIntanceData.endTime | time}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>承租人：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processIntanceData.tenantId}}</span>
          </el-col>
        </el-row>

      </el-card>
    </div>

    <div class="detail-corrlation">
      <el-card class="box-card">
        <div class="detail-tabs">
          <el-tabs
            type="card"
            v-model="defaultActive"
            @tab-click="tabHandleClick"
          >

            <el-tab-pane
              label="任务"
              name="queryHistoricTaskInstance"
              data-first="false"
            >

              <el-table
                :data="HistoricTaskInstanceData"
                style="width: 100%"
                @row-click="HistoricTaskInstanceDataRowhandleClick"
              >
                <el-table-column
                  prop="id"
                  align="center"
                  label="ID"
                >
                </el-table-column>

                <el-table-column
                  prop="name"
                  align="center"
                  label="任务名称"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.name | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="owner"
                  align="center"
                  label="任务所有者"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.owner | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="startTime"
                  align="center"
                  label="任务开始时间"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.startTime | time}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="endTime"
                  align="center"
                  label="任务结束时间"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.endTime | time}}</span>
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination
                class="pagination"
                v-if="HistoricTaskInstanceTotal > 10"
                :current-page.sync="HistoricTaskInstancePagination.start"
                :page-size.sync="HistoricTaskInstancePagination.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="HistoricTaskInstanceTotal"
                background
              >
              </el-pagination>

            </el-tab-pane>

            <el-tab-pane
              label="变量"
              name="queryHistoricVariableInstances"
              data-first="true"
            >

              <el-table
                :data="varData"
                style="width: 100%"
              >

                <el-table-column
                  align="center"
                  prop="id"
                  label="变量ID"
                >
                </el-table-column>

                <el-table-column
                  align="center"
                  label="变量名称"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.variables.name | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  label="变量值"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.variables.value | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  label="变量范围"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.variables.scope | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  label="变量类型"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.variables.type | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  label="任务ID"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.taskId | filterNull}}</span>
                  </template>
                </el-table-column>

              </el-table>

              <el-pagination
                class="pagination"
                v-if="varTotal > 10"
                :current-page.sync="varPagination.start"
                :page-size.sync="varPagination.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="varTotal"
                background
              >
              </el-pagination>

            </el-tab-pane>

            <el-tab-pane
              label="子流程"
              name="querySubprocess"
              data-first="true"
            >

              <el-table
                :data="subProcessData"
                style="width: 100%"
                @row-click="subProcessDataRowhandleClick"
              >

                <el-table-column
                  align="center"
                  prop="id"
                  label="ID"
                >
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="name"
                  label="子流程名称"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.name | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="startUserId"
                  label="起始用户"
                >
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="completed"
                  label="子流程状态"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.completed | completed }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="startTime"
                  label="子流程开始时间"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.startTime | time}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="endTime"
                  label="子流程结束时间"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.endTime | time}}</span>
                  </template>
                </el-table-column>

              </el-table>

              <el-pagination
                class="pagination"
                v-if="subProcessTotal > 10"
                :current-page.sync="subProcessPagination.start"
                :page-size.sync="subProcessPagination.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="subProcessTotal"
                background
              >
              </el-pagination>

            </el-tab-pane>

            <el-tab-pane
              label="作业"
              name="queryJobs"
              data-first="true"
            >

              <el-table
                :data="jobsData"
                style="width: 100%"
                @row-click="jobsDataHandleClick"
              >

                <el-table-column
                  align="center"
                  prop="id"
                  label="ID"
                >
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="dueDate"
                  label="到期时间"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.dueDate | time}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="processDefinitionId"
                  label="流程定义ID"
                >
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="retries"
                  label="重试次数"
                >
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="exceptionMsg"
                  label="异常"
                >
                </el-table-column>
              </el-table>

              <el-pagination
                class="pagination"
                v-if="jobsDataTotal > 10"
                :current-page.sync="jobsPagination.start"
                :page-size.sync="jobsPagination.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="jobsDataTotal"
                background
              >
              </el-pagination>

            </el-tab-pane>

            <el-tab-pane
              label="决策表"
              name="queryDecisionTables"
              data-first="true"
            >
              <el-table
                :data="DecisionTablesData"
                style="width: 100%"
                @row-click="ruleManageHandleClick"
              >
                <el-table-column
                  prop="id"
                  align="center"
                  label="决策表ID"
                >
                </el-table-column>

                <el-table-column
                  prop="name"
                  align="center"
                  label="决策表名称"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.name | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="category"
                  align="center"
                  label="决策表类别"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.category}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="version"
                  align="center"
                  label="决策表版本"
                >
                </el-table-column>
              </el-table>

              <el-pagination
                class="pagination"
                v-if="DecisionTablesDataTotal > 10"
                :current-page.sync="DecisionTablesPagination.start"
                :page-size.sync="DecisionTablesPagination.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="DecisionTablesDataTotal"
                background
              >
              </el-pagination>
            </el-tab-pane>
          </el-tabs>

          <el-button
            v-if="showAllProcessInstanceBtn"
            @click="showAllProcessInstance"
            class="detail-tabs-btn"
            style="float: right; padding: 3px 0"
            type="text"
          >
            {{btnTextObj.label}}
          </el-button>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import * as request from "@/modules/pms/api/pms/processMonitoring.js";

import axiosInstance from "@/modules/pms/api/index.js";

import { api } from "@/modules/pms/api/api.js";

export default {
  name: "processIntanceDetail",
  data() {
    return {
      // default active tab
      defaultActive: "queryHistoricTaskInstance",

      processIntanceData: {},
      flowProcessDialogVisible: false,

      showAllProcessInstanceBtn: true,

      // default btn object and include label index and name
      btnTextObj: {
        label: "查看所有任务",
        name: "queryHistoricTaskInstance",
        index: 0
      },

      // var data
      varData: [],
      varPagination: {
        start: 1,
        limit: 10
      },
      varTotal: 0,

      // sub process data
      subProcessData: [],
      subProcessPagination: {
        start: 1,
        limit: 10
      },
      subProcessTotal: 0,

      // historic task instance data
      HistoricTaskInstanceData: [],
      HistoricTaskInstancePagination: {
        start: 1,
        limit: 10
      },
      HistoricTaskInstanceTotal: 0,

      // jobs data and params
      jobsData: [],
      jobsPagination: {
        start: 1,
        limit: 10
      },
      jobsDataTotal: 0,

      // decision tables data and params
      DecisionTablesData: [],
      DecisionTablesPagination: {
        start: 1,
        limit: 10
      },
      DecisionTablesDataTotal: 0
    };
  },
  watch: {
    $route(to, form) {
      // watch route param's id change
      if (to.name === "processIntanceDetail") {
        this.defaultActive = "queryHistoricTaskInstance";

        this.init();

        const tabContent = document.querySelector(".el-tabs__content");

        Array.prototype.slice.call(tabContent.children).forEach(child => {
          if (child.getAttribute("data-first")) {
            child.setAttribute("data-first", "true");
          }
        });
      }
    },
    DecisionTablesPagination: {
      handler() {
        this.queryDecisionTables();
      },
      deep: true
    },
    jobsPagination: {
      handler() {
        this.queryJobs();
      },
      deep: true
    },
    HistoricTaskInstancePagination: {
      handler() {
        this.queryHistoricTaskInstance();
      },
      deep: true
    },
    subProcessPagination: {
      handler() {
        this.querySubprocess();
      },
      deep: true
    },
    varPagination: {
      handler() {
        this.queryHistoricVariableInstances();
      },
      deep: true
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    showFlowChartText() {
      return !!this.processIntanceData.endTime;
    },
    processInstanceId() {
      // process instance id
      return this.$route.params.id;
    },

    name() {
      return (
        this.processIntanceData.name && this.processIntanceData.name + "- "
      );
    }
  },
  methods: {
    imgSrc() {
      // return `${axiosInstance.defaults.baseURL}/processDefinitions/${
      //   this.processIntanceData.processDefinitionId
      // }/image`;
      return `${
        axiosInstance.defaults.baseURL
      }${api}/runtime/processInstances/${
        this.processInstanceId
      }/diagram?t=${Date.now()}`;
    },
    init() {
      request
        .queryProcessIntance({ id: this.processInstanceId })
        .then(res => {
          if (!res.result.length) {
            return this.$router.push({ path: "/404" });
          }
          this.processIntanceData = res.result[0];
        })
        .catch(err => {
          this.removeTag.call(this);
          this.backProcssInstanceList();
        });

      this.queryHistoricTaskInstance();
    },
    HistoricTaskInstanceDataRowhandleClick(row) {
      this.$router.push({
        name: "historicTaskInstanceDetail",
        params: { id: row.id }
      });
    },
    stopProcessInstance() {
      // stop process instance
      this.$prompt("请输入原因", "关闭流程实例原因", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        inputPattern: /^\s*[\S].{0,24}\s*$/,
        inputErrorMessage: "关闭原因字符长度为1 到 25"
      })
        .then(({ value }) => {
          request
            .stopProcessInstance(this.processInstanceId, {
              deleteReason: value
            })
            .then(res => {
              this.$message.success("关闭成功！");
              this.backProcssInstanceList();
            });
        })
        .catch(() => {});
    },
    subProcessDataRowhandleClick(row) {
      // process intance detail
      this.$router.push({
        name: "processIntanceDetail",
        params: { id: row.id }
      });
    },
    jobsDataHandleClick(row) {
      this.$router.push({
        name: "jobsDetail",
        params: { id: row.id }
      });
    },
    ruleManageHandleClick(row) {},

    backProcssInstanceList() {
      this.$router.push({
        name: "processMonitoring",
        query: {
          processTabActive: "queryProcessIntance",
          processIntanceDataPagination: this.$route.query.processIntanceDataPagination,
          'processIntanceForm.finished':  this.$route.query['processIntanceForm.finished']
        }
      });
    },
    showAllProcessInstance() {
      // jump to process instance
      const { label, index, name } = this.btnTextObj;

      if (name === "queryDecisionTables") {
        this.$router.push({
          name: "ruleManage"
        });
      } else {
        this.$router.push({
          name: "processMonitoring",
          query: { processTabActive: name }
        });
      }
    },
    tabHandleClick(tab) {
      // tab handle click event
      // get current active tab-pane element
      const tabName = tab.name;
      const paneEle = document.getElementById(`pane-${tabName}`);
      const isFirst = paneEle.getAttribute("data-first");

      // judege is first click and if is true fetch data
      if (isFirst === "true") {
        this[tabName]();
        paneEle.setAttribute("data-first", "false");
      }

      if (
        tab.name === "querySubprocess" ||
        tab.name === "queryHistoricVariableInstances"
      ) {
        return (this.showAllProcessInstanceBtn = false);
      }

      this.showAllProcessInstanceBtn = true;
      this.btnTextObj = { ...tab._props, ...tab };
      this.btnTextObj.label = `查看所有的${this.btnTextObj.label}`;
    },
    queryJobs() {
      const params = this.assign(
        { processInstanceId: this.processInstanceId },
        this.jobsPagination
      );
      request.queryJobs(params).then(res => {
        if (res) {
          this.jobsDataTotal = res.total;
          this.jobsData = res.result;
        }
      });
    },
    queryDecisionTables() {
      const params = this.assign(
        { processInstanceId: this.processInstanceId },
        this.DecisionTablesPagination
      );
      request.queryDecisionTables(params).then(res => {
        this.DecisionTablesData = res.result;
      });
    },
    queryHistoricTaskInstance() {
      // query historic task instance
      const params = this.assign(
        { processInstanceId: this.processInstanceId },
        this.HistoricTaskInstancePagination
      );
      request.queryHistoricTaskInstance(params).then(res => {
        if (res) {
          this.HistoricTaskInstanceData = res.result;
          this.HistoricTaskInstanceTotal = res.total;
        }
      });
    },
    queryHistoricVariableInstances() {
      const params = this.assign(
        { processInstanceId: this.processInstanceId },
        this.varPagination
      );
      request.queryHistoricVariableInstances(params).then(res => {
        this.varData = res.result;
        this.varTotal = res.total;
      });
    },
    querySubprocess() {
      request
        .querySubprocess(this.processInstanceId, this.subProcessPagination)
        .then(res => {
          this.subProcessData = res.result;
          this.subProcessTotal = res.total;
        });
    },
    assign(...params) {
      return Object.assign({}, ...params);
    }
  },
  filters: {
    completed(val) {
      return val ? "已完成" : "未完成";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.process-instance-container {
  padding: 16px;

  .pagination {
    text-align: center;
    margin-top: 24px;
  }

  .el-table--enable-row-transition .el-table__body td {
    cursor: pointer;
  }

  .el-card__header {
    .el-button--text {
      float: right;
      padding: 3px 0;
      margin-left: 16px;
    }
    .danger {
      color: #f56c6c;
      transition: all 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .flow-process-img {
    width: 100%;
  }

  .box-card {
    margin: 8px 0 16px 0;
  }

  .detail-corrlation {
    .el-card__body {
      padding: 0;
    }

    .detail-tabs {
      position: relative;
    }
    .detail-tabs-btn {
      position: absolute;
      top: 10px;
      right: 20px;
    }
  }

  .title {
    font-weight: 700;
  }

  .el-col {
    span {
      font-size: 14px;
    }
  }

  .el-row {
    margin-bottom: 24px;
    .info {
      color: #808080;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.el-message-box__status.el-icon-error {
  top: 22px;
}
</style>