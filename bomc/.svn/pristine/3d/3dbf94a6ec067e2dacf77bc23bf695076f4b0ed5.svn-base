<template>
  <div class="deploy-detail-container">
    <!-- 详细信息 -->
    <div class="detail-info">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span class="title">{{deployDetailData.id}} - {{deployDetailData.name}}</span>
          <el-button
            @click="backDeployList"
            style="float: right; padding: 3px 0"
            type="text"
          >返回列表</el-button>
        </div>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>部署ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{deployDetailData.id}}</span>
          </el-col>
          <el-col :span="3">
            <span>名称：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{deployDetailData.name}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>部署时间：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{deployDetailData.deployTime | time}}</span>
          </el-col>
          <el-col :span="3">
            <span>类型：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{deployDetailData.category | filterNull}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="3">
            <span>租户ID：</span>
          </el-col>
          <el-col :span="9">
            <span class="info">{{deployDetailData.tenantId}}</span>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- 详情关联数据 -->
    <div class="detail-corrlation">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span class="title">流程定义</span>
          <el-button
            @click="showAllProcessDefine"
            style="float: right; padding: 3px 0"
            type="text"
          >查看所有流程定义</el-button>
        </div>

        <el-table
          :data="processDefineTableData"
          style="width: 100%"
          @row-click="tabRowhandleClick"
        >
          <el-table-column
            prop="id"
            align="center"
            label="流程定义ID"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="流程定义名称"
          >
          </el-table-column>
          <el-table-column
            prop="version"
            align="center"
            label="流程版本"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="key"
            align="center"
            label="流程Key"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as request from "@/modules/pms/api/pms/processMonitoring.js";

export default {
  name: "deployDetail",
  data() {
    return {
      deployDetailData: {},
      processDefineTableData: []
    };
  },
  mounted() {
    const deployId = this.deployId;
    // query deploy detail
    request
      .queryDeploy({ id: deployId })
      .then(res => {
        // current id's info
        // if invalid deployId redirect to 404
        if (!res.result.length) {
          return this.$router.push({ path: "/404" });
        }
        this.deployDetailData = res.result[0];
      })
      .catch(err => {
        this.removeTag.call(this);
        this.backDeployList();
      });

    //query process defines with deploymentId
    request.queryProcessDefine({ deploymentId: deployId }).then(res => {
      this.processDefineTableData = res.result;
    });

    // processDefinitionId
    request.queryProcessDefine({ deploymentId: deployId }).then(res => {
      this.processDefineTableData = res.result;
    });
  },
  computed: {
    deployId() {
      // deploy id
      return this.$route.params.id;
    }
  },
  methods: {
    backDeployList() {
      // back deploy list
      this.$router.push({
        name: "processMonitoring",
        query: { deployDataPagination: this.$route.query.deployDataPagination }
      });
    },
    showAllProcessDefine() {
      this.$router.push({
        name: "processMonitoring",
        query: { processTabActive: "queryProcessDefine" }
      });
    },
    tabRowhandleClick(row) {
      this.$router.push({
        name: "processDefineDetail",
        params: { id: row.id }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.deploy-detail-container {
  padding: 16px;

  .el-table--enable-row-transition .el-table__body td {
    cursor: pointer;
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
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>