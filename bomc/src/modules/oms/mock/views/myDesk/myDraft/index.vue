<template>
  <div class="announcement-manage-container">
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="myDraftForm"
        size="small"
      >
        <el-form-item label="工单类型">
          <el-select
            v-model="myDraftForm.name"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="(item,index) in sheetTypeList"
              :key="index"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="工单标题">
          <el-input
            v-model="myDraftForm.title"
            placeholder="请输入工单标题"
            clearable
            @keyup.enter.native="queryDraftData"
          />
        </el-form-item>

        

        <el-form-item>
          <el-button
            type="primary"
            @click="queryDraftData"
          >查询</el-button>
          <el-button class="operate-btn-color" @click="resetForm" plain>重置</el-button>
            <el-button
              @click="showMoreQueryField = !showMoreQueryField"
              type="primary"
              :icon="iconClass"
              plain
            ></el-button>
        </el-form-item>
        <el-row v-show="showMoreQueryField" class="more-query-field">
          <el-form-item label="工单编号">
          <el-input
            v-model="myDraftForm.workListId"
            placeholder="请输入工单编号"
            clearable
            @keyup.enter.native="queryDraftData"
          />
        </el-form-item>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="box-card">

      <el-table
        :data="draftData"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="draftDataLoading"
      >
        <!-- <el-table-column label="序号" type="index" align="center" width="60" /> -->
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="60"
        />

        <el-table-column
          prop="workListId"
          align="center"
          label="工单编号"
          width="200"
        />

        <el-table-column
          label="工单标题"
          prop="title"
          show-overflow-tooltip
          width="180"
        >
        </el-table-column>

        <el-table-column
          prop="category"
          label="工单类型"
          align="center"
          width="150"
        />

        <el-table-column
          prop="timeOut"
          label="开始时间"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <span>{{scope.row.createTime | time}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="timeOut"
          label="期望解决时间"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{scope.row.dueTime | time}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="timeOut"
          label="是否超时"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.timeOut | isOver}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="处理工单"
              placement="top-start"
            >
              <i
                class="el-icon-tickets"
                @click="seeDetails(scope.row)"
              />
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="查看流程图"
              placement="top-start"
            >
              <i
                class="el-icon-sort"
                @click="seeFlowChart(scope.row)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- <el-dialog
        title="公告详情"
        :visible.sync="dialogVisible"
        width="35%"
      >
        <el-form
          label-position="right"
          label-width="120px"
        >
          <el-form-item label="公告标题：">
            <span class="info-detail">{{selectData.title}}</span>
          </el-form-item>
          <el-form-item label="公告发布人：">
            <span class="info-detail">{{selectData.publisher}}</span>
          </el-form-item>
          <el-form-item label="公告发布时间：">
            <span class="info-detail">{{selectData.publishTime}}</span>
          </el-form-item>
          <el-form-item label="公告有效期限：">
            <span class="info-detail">{{selectData.valid}}</span>
          </el-form-item>
          <el-form-item label="公告生效时间：">
            <span class="info-detail">{{selectData.startTime}}</span>
          </el-form-item>
          <el-form-item label="公告内容：">
            <span class="info-detail">{{selectData.context}}</span>
          </el-form-item>
        </el-form>

        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >确定</el-button>
        </div>

      </el-dialog> -->

      <el-pagination
        class="pagination"
        v-if="draftDataTotal > 10"
        :current-page.sync="draftDataDataPagination.start"
        :page-size.sync="draftDataDataPagination.limit"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="queryDraftData"
        @size-change="queryDraftData"
        :total="draftDataTotal"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import * as publicService from "@/modules/oms/api/oms/oms.js";
import * as service from "@/modules/oms/api/oms/myDesk/myDraft";
import * as myNeedDealService from "@/modules/oms/api/oms/myDesk/myNeedDeal";

export default {
  name: "myDraft", // 公告管理
  data() {
    return {
      showMoreQueryField: false,
      myDraftForm: {}, // 草稿表单

      draftData: [], // 草稿数据
      draftDataTotal: 0,
      draftDataDataPagination: {
        // table 分页参数
        start: 1,
        limit: 10
      },
      draftDataLoading: true, // table loading

      selectData: {}, // 查看详情数据源

      sheetTypeList: [], // 工单类型

      dialogVisible: false // 模态框是否显示
    };
  },
  computed: {
    iconClass() {
      return this.showMoreQueryField
        ? "iconfont icon-xiangshang"
        : "iconfont icon-zhankai";
    }
  },
  async mounted() {
    this.queryDraftData();
    this.sheetTypeList = await publicService.queryType()
  },
  methods: {
    queryDraftData() {
      // 查询代理人数据
      const draftDataDataPagination = this.draftDataDataPagination;

      const myDraftForm = this.myDraftForm;

      let params = Object.assign({}, myDraftForm, {
        ...draftDataDataPagination,
        assignee: this.$store.getters.userId,
        start:
          (draftDataDataPagination.start - 1) * draftDataDataPagination.limit
      });

      this.draftDataLoading = true;

      service
        .queryMyDraft(params)
        .then(res => {
          const { count, result } = res;

          this.draftData = result;

          this.draftDataTotal = count;

          this.draftDataLoading = false;
        })
        .catch(e => {
          this.draftData = [];
          this.draftDataTotal = 0;
          this.draftDataLoading = false;
        });
    },
    resetForm(){
      this.procDefId = ""
      this.title = ""
      this.workListId = ""
      this.currentPage = this.currentPageOver = 1;
      this.pageSize = this.pageSizeOver = 10
      this.queryDraftData()
    },
    seeDetails(row) {
      // 查看详情按钮
      const taskKey = {
        taskKey: row.taskKey,
        procDefId: row.procDefId
        // taskId: row.taskId
      };
    
      const procInstId = row.procInstId;
      const taskId = row.taskId;
      const procDefId = row.procDefId;
      
      myNeedDealService.getPath(taskKey).then(res => {
        const result = res.result[0];
        // procInstId: 流程实例id
        // taskId: 环节id
        
        sessionStorage.setItem("previousPath", "/myDesk/myDraft");
        this.removeTag();
        this.$router.push({
          path: `${result.url}/0/${procInstId}/${taskId}`,
          query: { tabActive: "form", isDraft: 1, previousPathTwo: true }
        });
      });
    },
    seeFlowChart(row) {
      const taskKey = {
        taskKey: row.taskKey,
        procDefId: row.procDefId
      };
      
      const procInstId = row.procInstId;
      const taskId = row.taskId;
      myNeedDealService.getPath(taskKey).then(res => {
        const result = res.result[0];
        this.removeTag();
        this.$router.push({
          path: `${result.url}/0/${procInstId}/${taskId}`,
          query: { tabActive: "chart", isDraft: 1 }
        });
      });
    },
    checkDetail(row) {
      this.selectData = row;
      this.dialogVisible = true;
    },
    changeStatus(row) {
      this.$confirm("此操作将撤回此条公告, 是否继续?", "撤回公告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          service.changeStatus(row.id).then(res => {
            this.$message.success("撤回成功");
            this.queryDraftData();
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss">
.announcement-manage-container {
  padding: 16px;

  .more-query-field {
    margin-top: 10px;
  }
  .el-tabs__header{
    margin-bottom: 20px;
  }

  .el-table__header-wrapper, .el-table__fixed-header-wrapper {
    th {
      background: #f4f8f9 !important;
    }
  }  

  .info-detail {
    word-break: break-word;
    white-space: pre-wrap;
  }

  .notice-content {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pagination {
    text-align: center;
    margin-top: 24px;
  }

  .el-form--inline .el-form-item {
    margin-right: 16px;
  }

  .box-card {
    margin: 8px 0 16px 0;
  }

  .el-card__body {
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .el-form /deep/ {
    .el-input {
      width: 260px;
    }
  }
  i[class^="el-icon"] {
    margin-right: 5px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>

