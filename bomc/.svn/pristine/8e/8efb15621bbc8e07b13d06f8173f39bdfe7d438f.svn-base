<template>
  <div class="history-task-container">
    <!-- 详细信息 -->
    <div class="detail-info">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span class="title">{{taskData.name}} - {{taskData.id}}</span>
          <el-button
            @click="backTaskList"
            type="text"
          >返回任务列表</el-button>
          <el-button
            @click="deleteTask"
            type="text"
            class="danger"
          >删除任务</el-button>
        </div>

        <!-- <el-dialog title="流程图" :visible.sync="flowProcessDialogVisible" width="60%">
          <a :href="imgSrc" target="_blank">
            <img class="flow-process-img" :src="imgSrc" alt="流程图" title="流程图">
          </a>
        </el-dialog> -->

        <el-row :gutter="24">
          <el-col :span="3">
            <span>任务ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{taskData.id}}</span>
          </el-col>
          <el-col :span="3">
            <span>任务名称：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{taskData.name}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>代理人：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{taskData.assignee | filterNull}}</span>
          </el-col>
          <el-col :span="3">
            <span>任务描述：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{taskData.description | filterNull}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>优先级：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{taskData.priority}}</span>
          </el-col>

          <el-col :span="3">
            <span>任务所有者：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{taskData.owner |filterNull}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>开始时间：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{taskData.startTime | time}}</span>
          </el-col>
          <el-col :span="3">
            <span>结束时间：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{taskData.endTime | time}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>截至日期：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{taskData.dueDate | time}}</span>
          </el-col>
          <el-col :span="3">
            <span>删除原因：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{taskData.deleteReason | filterNull}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>父任务ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{taskData.parentTaskId | filterNull}}</span>
          </el-col>
          <el-col :span="3">
            <span>承租人：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{taskData.tenantId}}</span>
          </el-col>
        </el-row>

      </el-card>
    </div>

    <!-- 关联的流程定义 -->
    <div class="detail-corrlation">
      <el-card class="box-card">
        <div class="detail-tabs">

          <el-tabs
            type="card"
            v-model="defaultActive"
            @tab-click="tabHandleClick"
          >
            <el-tab-pane
              label="子任务"
              name="subTask"
            >

              <el-table
                :data="subTaskData"
                style="width: 100%"
              >
                <el-table-column
                  prop="id"
                  align="center"
                  label="子任务ID"
                >
                </el-table-column>

                <el-table-column
                  prop="name"
                  align="center"
                  label="子任务名称"
                >
                </el-table-column>

                <el-table-column
                  align="center"
                  label="子任务所有者"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.owner | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  label="子任务开始时间"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.startTime | time}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  label="子任务结束时间"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.endTime | time}}</span>
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination
                class="pagination"
                v-if="subTaskTotal > 10"
                :current-page.sync="subTaskPagination.start"
                :page-size.sync="subTaskPagination.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="subTaskTotal"
                background
              >
              </el-pagination>

            </el-tab-pane>

            <el-tab-pane
              label="变量"
              name="vars"
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
              label="身份链接"
              name="IdentityLinks"
            >
              <el-table
                :data="IdentityLinksData"
                style="width: 100%"
              >
                <el-table-column
                  align="center"
                  label="身份链接ID"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.id | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  label="流程实例ID"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.processInstanceId | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="taskId"
                  align="center"
                  label="任务ID"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.name | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  label="组ID"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.groupId | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="userId"
                  align="center"
                  label="用户ID"
                >
                </el-table-column>

                <el-table-column
                  align="center"
                  label="类型"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.type | filterNull}}</span>
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination
                class="pagination"
                v-if="IdentityLinksTotal > 10"
                :current-page.sync="IdentityLinksPagination.start"
                :page-size.sync="IdentityLinksPagination.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="IdentityLinksTotal"
                background
              >
              </el-pagination>
            </el-tab-pane>
          </el-tabs>

          <!-- <el-button @click="showAllProcessInstance" class="detail-tabs-btn" style="float: right; padding: 3px 0" type="text">{{btnTextObj.label}}</el-button> -->
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as request from "@/modules/pms/api/pms/processMonitoring.js";

export default {
  name: "historicTaskInstanceDetail",
  data() {
    return {
      taskData: {},
      defaultActive: "subTask",

      // sub task data
      subTaskData: [],
      subTaskPagination: {
        start: 1,
        limit: 10
      },
      subTaskTotal: 0,

      IdentityLinksData: [],
      IdentityLinksPagination: {
        start: 1,
        limit: 10
      },
      IdentityLinksTotal: 0,

      // var data
      varData: [],
      varPagination: {
        start: 1,
        limit: 10
      },
      varTotal: 0
    };
  },
  mounted() {
    request
      .queryHistoricTaskInstance({ id: this.taskId })
      .then(res => {
        if (!res.result.length) {
          return this.$router.push({ path: "/404" });
        }
        this.taskData = res.result[0];
      })
      .catch(err => {
        this.removeTag.call(this);
        this.backTaskList();
      });

    this.querySubTask();
    this.queryHistoricVariableInstances();
    this.queryIdentityLinks();
  },
  computed: {
    taskId() {
      return this.$route.params.id;
    }
  },
  methods: {
    tabHandleClick() {},
    backTaskList() {
      this.$router.push({
        name: "processMonitoring",
        query: {
          processTabActive: "queryHistoricTaskInstance",
          historicTaskInstanceDataPagination: this.$route.query
            .historicTaskInstanceDataPagination,
            'historicTaskInstanceForm.finished': this.$route.query
            ['historicTaskInstanceForm.finished']
        }
      });
    },
    deleteTask() {
      // delete task
      this.$confirm("此操作将删除当前任务, 是否继续?", "删除任务", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          request.deleteHistoricTaskInstance(this.taskId).then(res => {
            this.removeTag.call(this);

            this.$message.success("删除成功");
            this.backTaskList();
          });
        })
        .catch(() => {});
    },
    querySubTask() {
      request.querySubTask(this.taskId, this.subTaskPagination).then(res => {
        this.subTaskData = res.result;
        this.subTaskTotal = res.result;
      });
    },
    queryHistoricVariableInstances() {
      const params = this.assign({ taskId: this.taskId }, this.varPagination);

      request.queryHistoricVariableInstances(params).then(res => {
        this.varData = res.result;
        this.varTotal = res.total;
      });
    },
    queryIdentityLinks() {
      request
        .queryIdentityLinks(this.taskId, this.IdentityLinksPagination)
        .then(res => {
          this.IdentityLinksData = res.result;
          this.IdentityLinksTotal = res.total;
        });
    },
    assign(...params) {
      return Object.assign({}, ...params);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.history-task-container {
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
</style>