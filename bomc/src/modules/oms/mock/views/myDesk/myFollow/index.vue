<template>
  <div class="my-follow-container">
    <el-card class="box-card">
      <el-form
        :inline="true"
        size="small"
        ref="myFollowForm"
        :model="myFollowForm"
      >

        <el-form-item label="工单类型">
          <el-select
            v-model="myFollowForm.name"
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
            v-model="myFollowForm.title"
            clearable
            placeholder="请输入工单标题"
            @keyup.enter.native="queryMyFollow"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="queryMyFollow"
          >查询</el-button>
          <el-button class="operate-btn-color" @click="resetForm" plain>重置</el-button>
          <el-button
            @click="showMoreQueryField = !showMoreQueryField"
            type="primary"
            :icon="iconClass"
            plain
          ></el-button>
        </el-form-item>

        <el-row
          v-show="showMoreQueryField"
          class="more-query-field"
        >
          <el-form-item label="工单编号">
            <el-input
              v-model="myFollowForm.workListId"
              clearable
              placeholder="请输入工单编号"
              @keyup.enter.native="queryMyFollow"
            ></el-input>
          </el-form-item>
        </el-row>

      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table
        :data="myFollwData"
        v-loading="myFollwDataLoading"
        tooltip-effect="dark"
        style="width: 100%"
      >

        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60"
        >
        </el-table-column>

        <!-- <el-table-column align="center" prop="id" label="日志ID">
        </el-table-column> -->
        <el-table-column
          prop="workListId"
          align="center"
          label="工单编号"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="seeDetails(scope.row)"
            >{{scope.row.workListId}}</el-button>
          </template>
        </el-table-column>

        <el-table-column
          label="工单标题"
          width="180"
          show-overflow-tooltip
          prop="title"
        >
        </el-table-column>
        <!-- 
        <el-table-column
          show-overflow-tooltip
          prop="category"
          label="工单类型"
          align="center"
          width="120"
        >
        </el-table-column> -->

        <el-table-column
          label="工单创建时间"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.startTime | time }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column
          label="期望解决时间"
          width="155"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.dueTime | time }}</span>
          </template>
        </el-table-column> -->

        <el-table-column
          label="工单完成时间"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.endTime | time }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column
          prop="status"
          align="center"
          label="工单状态"
        /> -->

        <el-table-column
          align="center"
          label="是否超时"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.timeOut | isOver }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column
          prop="name"
          label="当前任务节点"
          align="center"
          width="160"
          show-overflow-tooltip
        />

        <el-table-column
          prop="ruAssignee"
          label="当前处理人"
          align="center"
          width="100"
        /> -->

        <!-- <el-table-column
          label="环节开始时间"
          align="center"
          width="155"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.startTime | time }}</span>
          </template>
        </el-table-column> -->

        <el-table-column
          label="操作"
          width="110"
          align="center"
          :style="{background: '#f4f8f9'}"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="查看详情"
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

            <el-tooltip
              class="item"
              effect="dark"
              content="删除此条关注"
              placement="top-start"
            >
              <i
                class="el-icon-delete"
                @click="deleteCurrentFollow(scope.row.id)"
              ></i>
            </el-tooltip>

          </template>
        </el-table-column>

      </el-table>

      <el-pagination
        class="pagination"
        v-if="myFollwDataTotal > 10"
        :current-page.sync="myFollwDataPagination.start"
        :page-size.sync="myFollwDataPagination.limit"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="queryMyFollow"
        @size-change="queryMyFollow"
        :total="myFollwDataTotal"
        background
      ></el-pagination>

    </el-card>
  </div>
</template>

<script>
// 我的关注
import * as publicService from "@/modules/oms/api/oms/oms.js";
import * as request from "@/modules/oms/api/oms/myDesk/myFollow.js";

const deafultForm = {
  procDefId: "",
  name: "",
  title: "",
  workListId: ""
};

export default {
  name: "myFollow",
  data() {
    return {
      myFollowForm: { ...deafultForm },

      sheetTypeList: [], // 工单类型

      showMoreQueryField: false, // 更多查询条件

      myFollwData: [], // table 数据以及分页参数
      myFollwDataPagination: {
        start: 1,
        limit: 10
      },
      myFollwDataTotal: 0,
      myFollwDataLoading: true,

      categoryList: [
        { index: 0, name: "事件管理流程", url: "/eventForm/allInfo" },
        { index: 1, name: "问题管理流程", url: "/problemForm/allInfo" },
        { index: 2, name: "变更管理流程", url: "/changeForm/allInfo" }
      ]
    };
  },
  computed: {
    iconClass() {
      return this.showMoreQueryField
        ? "iconfont icon-shouqi"
        : "iconfont icon-zhankai";
    }
  },
  async mounted() {
    this.queryMyFollow();
    this.sheetTypeList = await publicService.queryType(); // 查询工单类型
  },
  methods: {
    resetForm() {
      this.myFollowForm = { ...deafultForm };
      this.queryMyFollow();
    },
    queryMyFollow() {
      const { start, limit } = this.myFollwDataPagination;
      
      const params = Object.assign({}, this.myFollowForm, {
        userId: this.$store.getters.userId,
        limit: limit,
        start: (start - 1) * limit
      });

      this.myFollwDataLoading = true;

      request
        .queryMyFollow(params)
        .then(res => {
          this.myFollwDataTotal = res.count;
          this.myFollwData = res.result;
          this.myFollwDataLoading = false;
        })
        .catch(err => {
          this.myFollwDataLoading = false;
        });
    },
    seeDetails(row) {
      //查看详情
      this.removeTag();
      let url = "";
      this.categoryList.forEach((item, index) => {
        if (row.category === item.name) {
          url = item.url;
        }
      });
      this.$router.push({
        path: `${url}/${row.procDefId}/${row.procInstId}/${
          row.taskId
        }`,
        query: {
          tabActive: "form",
          isOver: row.status == '0' ? true : false,
          eventStatus: row.ruTaskName
        }
      });
    },
    seeFlowChart(row) {
      this.removeTag();
      const taskKey = {
        taskKey: row.taskKey
      };
      const procInstId = row.procInstId;
      const taskId = row.taskId;
      const procDefId = row.procDefId;
      
      let url = "";
      this.categoryList.forEach((item, index) => {
        if (row.category === item.name) {
          url = item.url;
        }
      });
      this.$router.push({
        path: `${url}/${procDefId}/${procInstId}/${taskId}`,
        query: {
          tabActive: "chart",
          isOver: row.status == '0' ? true : false,
          eventStatus: row.ruTaskName
        }
      });
    },
    deleteCurrentFollow(id) {
      this.$confirm("此操作将删除此条关注, 是否继续？", "删除关注", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          request.deleteCurrentFollow(id).then(res => {
            this.$message.success("删除成功！");
            this.queryMyFollow();
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss">
.my-follow-container {
  padding: 10px 20px;
  
  .el-table__header-wrapper, .el-table__fixed-header-wrapper {
    th {
      background: #f4f8f9 !important;
    }
  }

  .el-tabs__header{
    margin-bottom: 20px;
  }

  .iconfont {
    font-size: 12px;
  }

  .el-tooltip {
    cursor: pointer;
  }

  .more-query-field {
    margin-top: 10px;
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
}
</style>