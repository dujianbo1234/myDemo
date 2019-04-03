<template>
  <div class="procss-define-container">
    <!-- 详细信息 -->
    <div class="detail-info">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">{{processDefineData.name}} - {{processDefineData.id}}</span>
          <el-button @click="backProcssDefineList" type="text">返回流程定义列表</el-button>
          <el-button @click="flowProcessDialogVisible = true" type="text">查看流程图</el-button>
        </div>

        <el-dialog title="流程图" :visible.sync="flowProcessDialogVisible" width="60%">
          <a :href="imgSrc" target="_blank">
            <img class="flow-process-img" :src="imgSrc" alt="流程图" title="流程图">
          </a>
        </el-dialog>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>流程定义ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processDefineData.id}}</span>
          </el-col>
          <el-col :span="3">
            <span>流程定义名称：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processDefineData.name}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>流程定义版本：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processDefineData.version}}</span>
          </el-col>
          <el-col :span="3">
            <span>流程定义Key：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processDefineData.key | filterNull}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>流程定义类别：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processDefineData.category}}</span>
          </el-col>

          <el-col :span="3">
            <span>流程定义描述：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processDefineData.description}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>流程定义部署ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processDefineData.deploymentId}}</span>
          </el-col>
          <el-col :span="3">
            <span>暂停的：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processDefineData.suspended | yesOrNo}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>承租人：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{processDefineData.tenantId}}</span>
          </el-col>
        </el-row>

      </el-card>
    </div>

    <!-- 关联的流程定义 -->
    <div class="detail-corrlation">
      <el-card class="box-card">
        <div class="detail-tabs">

          <el-tabs type="card" v-model="defaultActive" @tab-click="tabHandleClick">

            <el-tab-pane label="流程实例" name="queryProcessDefine" data-first="false">

              <el-table :data="processInstanceData" style="width: 100%" @row-click="processInstanceRowhandleClick">
                <el-table-column prop="id" align="center" label="流程实例ID">
                </el-table-column>

                <el-table-column prop="name" align="center" label="流程实例名称">
                  <template slot-scope="scope">
                    <span>{{scope.row.name | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="completed" align="center" label="流程实例状态">
                  <template slot-scope="scope">
                    <span>{{scope.row.completed | completed}}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="startTime" align="center" label="流程实例开始时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.startTime | time}}</span>
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination class="pagination" v-if="processInstanceDataTotal > 10" :current-page.sync="procssInstancePagination.start" :page-size.sync="procssInstancePagination.limit" layout="total, sizes, prev, pager, next, jumper" :total="processInstanceDataTotal" background>
              </el-pagination>

            </el-tab-pane>

            <el-tab-pane label="作业" name="queryJobs" data-first="true">

              <el-table :data="jobsData" style="width: 100%" @row-click="JobtabRowhandleClick">

                <el-table-column align="center" prop="id" label="ID">
                </el-table-column>

                <el-table-column align="center" prop="dueDate" label="到期时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.dueDate | time}}</span>
                  </template>
                </el-table-column>

                <el-table-column align="center" prop="processDefinitionId" label="流程定义ID">
                </el-table-column>

                <el-table-column align="center" prop="retries" label="重试次数">
                </el-table-column>

                <el-table-column align="center" prop="exceptionMsg" label="异常">
                </el-table-column>
              </el-table>

              <el-pagination class="pagination" v-if="jobsDataTotal > 10" :current-page.sync="jobsPagination.start" :page-size.sync="jobsPagination.limit" layout="total, sizes, prev, pager, next, jumper" :total="jobsDataTotal" background>
              </el-pagination>

            </el-tab-pane>

            <el-tab-pane label="决策表" name="ruleManage" data-first="true">
              <el-table :data="DecisionTablesData" style="width: 100%" @row-click="tabRowhandleClick">
                <el-table-column prop="id" align="center" label="决策表ID">
                </el-table-column>

                <el-table-column prop="name" align="center" label="决策表名称">
                  <template slot-scope="scope">
                    <span>{{scope.row.name | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="category" align="center" label="决策表类别">
                  <template slot-scope="scope">
                    <span>{{scope.row.category}}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="version" align="center" label="决策表版本">
                </el-table-column>
              </el-table>

              <el-pagination class="pagination" v-if="DecisionTablesDataTotal > 10" :current-page.sync="DecisionTablesPagination.start" :page-size.sync="DecisionTablesPagination.limit" layout="total, sizes, prev, pager, next, jumper" :total="DecisionTablesDataTotal" background>
              </el-pagination>
            </el-tab-pane>

          </el-tabs>

          <el-button @click="showAllProcessInstance" class="detail-tabs-btn" style="float: right; padding: 3px 0" type="text">{{btnTextObj.label}}</el-button>
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
  name: "processDefineDetail",
  data() {
    return {
      processDefineData: {},
      defaultActive: "queryProcessDefine",

      btnTextObj: {
        label: "查看所有流程实例",
        name: "queryProcessIntance",
        index: 0
      },

      flowProcessDialogVisible: false,

      // process instance data and params
      processInstanceData: [],
      procssInstancePagination: {
        start: 1,
        limit: 10
      },
      processInstanceDataTotal: 0,

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
    DecisionTablesPagination: {
      handler() {
        this.ruleManage();
      },
      deep: true
    },
    jobsPagination: {
      handler() {
        this.queryJobs();
      },
      deep: true
    },
    procssInstancePagination: {
      handler() {
        this.queryProcessIntance();
      },
      deep: true
    }
  },
  mounted() {
    const processDefineId = this.processDefineId;

    request
      .queryProcessDefine({ id: processDefineId })
      .then(res => {
        // if invalid processDefineId redirect to 404
        if (!res.result.length) {
          return this.$router.push({ path: "/404" });
        }
        this.processDefineData = res.result[0];
      })
      .catch(err => {
        this.removeTag.call(this);
        this.backProcssDefineList();
      });

    const params = this.assign(
      { processDefinitionId: processDefineId },
      this.procssInstancePagination
    );

    this.queryProcessIntance();

    // this.queryJobs();
    // this.ruleManage();
  },
  computed: {
    processDefineId() {
      return this.$route.params.id;
    },
    imgSrc() {
      return `${axiosInstance.defaults.baseURL}${api}/processDefinitions/${
        this.processDefineId
      }/image`;
    }
  },
  methods: {
    showFlowProcess() {},
    queryProcessIntance() {
      const processDefineId = this.processDefineId;

      const params = this.assign(
        { processDefinitionId: processDefineId },
        this.procssInstancePagination
      );

      request.queryProcessIntance(params).then(res => {
        if (res) {
          this.processInstanceDataTotal = res.total;
          this.processInstanceData = res.result;
        }
      });
    },
    backProcssDefineList() {
      this.$router.push({
        name: "processMonitoring",
        query: { 
          processTabActive: "queryProcessDefine", 
          pcocessDefinePagination: this.$route.query.pcocessDefinePagination
        }
      });
    },
    queryJobs() {
      const params = this.assign(
        { processDefinitionId: this.processDefineId },
        this.jobsPagination
      );
      request.queryJobs(params).then(res => {
        if (res) {
          this.jobsDataTotal = res.total;
          this.jobsData = res.result;
        }
      });
    },
    ruleManage() {
      const params = this.assign(
        { processDefinitionId: this.processDefineId },
        this.DecisionTablesPagination
      );
      request.queryDecisionTables(params).then(res => {
        this.DecisionTablesData = res.result;
      });
    },
    showAllProcessInstance() {
      // jump to process instance
      const { label, index, name } = this.btnTextObj;

      if (index > 1) {
        this.$router.push({
          name: name
        });
      } else {
        this.$router.push({
          name: "processMonitoring",
          query: { processTabActive: name }
        });
      }
    },
    tabHandleClick(tab, event) {
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
      // change brn text object
      this.btnTextObj = { ...tab._props, ...tab };
      this.btnTextObj.label = `查看所有的${this.btnTextObj.label}`;
    },
    processInstanceRowhandleClick(row) {
      // process instance row table click
      this.$router.push({
        name: "processIntanceDetail",
        params: { id: row.id }
      });
    },
    tabRowhandleClick(row) {},
    JobtabRowhandleClick(row) {
      this.$router.push({
        name: "jobsDetail",
        params: { id: row.id }
      });
    },
    assign(...params) {
      return Object.assign({}, ...params);
    }
  },
  filters: {
    completed(val) {
      return val ? "已完成" : "未完成";
    },
    yesOrNo(val) {
      return val ? "是" : "否";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.procss-define-container {
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