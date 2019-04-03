<template>
  <div class="jobs-detail-container">
    <!-- 详细信息 -->
    <div class="detail-info">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span class="title">Job - {{jobsData.id}}</span>
          <el-button
            @click="backJobsList"
            type="text"
          >返回列表</el-button>
          <el-button
            @click="actionJob"
            type="text"
          >执行作业</el-button>
          <el-button
            @click="deleteJob"
            type="text"
            class="danger"
          >删除作业</el-button>
        </div>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>作业ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{jobsData.id}}</span>
          </el-col>
          <el-col :span="3">
            <span>到期时间：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{jobsData.dueDate | filterNull}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>流程实例ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">
              <el-button
                v-if="jobsData.processInstanceId"
                type="text"
                @click="jumpToProcessInstanceDetail(jobsData.processInstanceId)"
              >
                {{jobsData.processInstanceId}}
              </el-button>
              <span v-else>--</span>
            </span>
          </el-col>
          <el-col :span="3">
            <span>流程定义ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">
              <el-button
                v-if="jobsData.processDefinitionId"
                type="text"
                @click="jumpToProcessDefineDetail(jobsData.processDefinitionId)"
              >
                {{jobsData.processDefinitionId}}
              </el-button>
              <span v-else>--</span>
            </span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>执行ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{jobsData.executionId}}</span>
          </el-col>
          <el-col :span="3">
            <span>重试次数：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{jobsData.retries}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>租户ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{jobsData.teantId}}</span>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as request from "@/modules/pms/api/pms/processMonitoring.js";

export default {
  name: "jobsDetail",
  data() {
    return {
      jobsData: {}
    };
  },
  computed: {
    jobsId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    request
      .queryJobsWithId(this.jobsId)
      .then(res => {
        if (!res.result.length) {
          return this.$router.push({ path: "/404" });
        }
        this.jobsData = res.result[0];
      })
      .catch(err => {
        this.backJobsList();
      });
  },
  methods: {
    backJobsList() {
      // back jobs list
      this.$router.push({
        name: "processMonitoring",
        query: {
          processTabActive: "queryJobs",
          jobsDataPagination: this.$route.query.jobsDataPagination
        }
      });
    },
    jumpToProcessInstanceDetail(processInstanceId) {
      // jump to process instance detail
      this.$router.push({
        name: "processIntanceDetail",
        params: { id: processInstanceId }
      });
    },
    jumpToProcessDefineDetail(processDefineId) {
      // jump to process define detail
      this.$router.push({
        name: "processDefineDetail",
        params: { id: processDefineId }
      });
    },
    actionJob() {
      request.actionJob(this.jobsId).then(res => {
        // remove current tags
        this.removeTag.call(this);

        this.$message.success("执行成功");
        this.backJobsList();
      });
    },
    deleteJob() {
      // delete job
      request.deleteJob(this.jobsData.id).then(res => {
        // remove current tags
        this.removeTag.call(this);

        this.$message.success("删除成功");
        this.backJobsList();
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.jobs-detail-container {
  padding: 16px;

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

  .box-card {
    margin: 8px 0 16px 0;
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
      .el-button {
        padding: 0;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>