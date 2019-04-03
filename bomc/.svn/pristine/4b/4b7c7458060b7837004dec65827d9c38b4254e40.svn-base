<template>
  <div class="myWaitReceipt app-container">
    <div class="condition">
      <el-card class="box-card">
        <el-form :inline="true" size="small">
          <el-form-item label="工单类型">
            <el-select v-model="name" placeholder="请选择" clearable size="small">
              <el-option
                v-for="(item,index) in sheetTypeList"
                :key="index"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="工单标题">
            <el-input v-model="title" placeholder="请输入工单标题" clearable size="small"/>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="queryData()">查询</el-button>
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
              <el-input v-model="workListId" placeholder="请输入工单编号" clearable size="small"/>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>

      <el-card class="box-card">
        <el-table
          v-loading="loading"
          :data="dealListData"
          class="tableArea"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="30"/>
          <el-table-column label="序号" prop="index" align="center"/>
          <el-table-column prop="workListId" label="工单编号"/>
          <el-table-column prop="title" label="工单标题" show-overflow-tooltip/>
          <el-table-column prop="name" label="当前任务节点"/>
          <el-table-column prop="createTime" label="到达时间"/>
          <!-- <el-table-column
          prop="dueTime"
          label="截止时间"
          width="200"
        />
        <el-table-column
          prop="timeOut"
          label="是否超时"
          />-->
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看详情" placement="top-start">
                <i class="el-icon-tickets" @click="seeDetails(scope.row)"/>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看流程图" placement="top-start">
                <i class="el-icon-sort" @click="seeFlowChart(scope.row)"/>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="签收" placement="top-start">
                <i class="el-icon-edit" @click="received(scope.row) "/>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            v-if="totalCount>0"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="pageSize"
            :total="totalCount"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import * as publicService from "@/modules/oms/api/oms/oms.js";
import * as service from "@/modules/oms/api/oms/myDesk/myWaitReceipt";

export default {
  name: "MyLaunch",
  data() {
    return {
      showMoreQueryField: false, // 更多查询条件
      loading: true,

      userId: "",
      workListId: "",
      title: "",
      checked: true,
      totalCount: "", // 总条数
      currentPage: 1, // 当前页
      pageSize: 10, // 每页条数
      procDefId: "", // 工单类型id
      name: "", // 工单类型名称
      sheetTypeList: [],
      sheetTitle: "",
      sheetNumber: "",
      dealListData: [],
      multipleSelection: []
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
    this.userId = this.$store.getters.userId; //获取用户id
    this.queryData();
    this.sheetTypeList = await publicService.queryType(); // 查询工单类型
  },
  methods: {
    queryData() {
      const params = {
        assignee: this.userId, // 用户Id
        workListId: this.workListId,
        title: this.title,
        name: this.name,
        status: 0,
        start: (this.currentPage - 1) * this.pageSize, // （当前页数-1）*每页显示的条数
        limit: this.pageSize
      };
      service.queryData(params).then(res => {
        this.loading = false
        this.dealListData = res.result;
        this.totalCount = res.count;
        this.$store.dispatch("changeWaitReceipt");
        this.dealListData.forEach((item, index) => {
          item.index = params.start++ + 1;
        });
      });
    },
    resetForm() {
      this.procDefId = "";
      this.title = "";
      this.workListId = "";
      this.currentPage = 1;
      this.pageSize = 10;
      this.queryData();
    },
    seeDetails(row) {
      //查看详情
      this.$router.push({
        path: `/eventForm/allInfo/${row.procDefId}/${row.procInstId}/${
          row.taskId
        }`,
        query: {
          tabActive: "form",
          isOver: row.ruAssignee === null ? true : false
        }
      });
    },
    seeFlowChart(row) {},
    handleSizeChange(val) {
      // 设置每页多少条
      this.pageSize = val;
      this.queryData();
    },
    handleCurrentChange(val) {
      // 当前页
      this.currentPage = val;
      this.queryData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    seeDetails(row) {
      // 查看详情
    },
    received(row) {
      // 签收按钮
      this.$confirm("点击确认签收?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            taskId: row.taskId,
            procInstId: row.procInstId,
            assignee: row.assignee
          };
          service
            .receive(params)
            .then(res => {
              this.$message({
                type: "success",
                message: "签收成功!"
              });
              this.queryData()
              this.$store.dispatch("changeNeedDealCount");
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "签收失败!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="scss" >
.myWaitReceipt {
  .box-card {
    margin: 8px 0 16px 0;
  }
  .el-tabs__header{
    margin-bottom: 20px;
  }
  .el-card__body {
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .el-table__header-wrapper, .el-table__fixed-header-wrapper {
    th {
      background: #f4f8f9 !important;
    }
  }
  .more-query-field {
    margin-top: 10px;
  }
  .iconfont {
    font-size: 12px;
  }


  i[class^="el-icon"] {
    margin-right: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  .el-form /deep/ {
    .el-input {
      width: 260px;
    }
  }
}
</style>

