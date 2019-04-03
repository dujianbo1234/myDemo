<template>
  <div class="myNeedDeal app-container clearfix">
    <div class="condition">
      <el-card class="box-card">
        <el-form
          :inline="true"
          label-position="right"
          label-width="70px"
          size="small"
        >
          <el-form-item label="工单类型">
            <el-select
              v-model="name"
              placeholder="请选择"
              clearable
              size="small"
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
              v-model="title"
              placeholder="请输入工单标题"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              type="primary"
              @click="querySheet()"
            >查询</el-button>
            <el-button
              class="operate-btn-color"
              @click="resetForm"
              plain
            >重置</el-button>
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
                v-model="workListId"
                placeholder="请输入工单编号"
                clearable
                size="small"
              />
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>

      <el-card class="box-card">
        <el-tabs
          type="card"
          v-model="activeName"
        >
          <el-tab-pane name="overtime">
            <el-badge
              slot="label"
              :value="totalCountOver!=0?totalCountOver:''"
              :max="99"
              class="item"
            >
              已超时
            </el-badge>
            <el-table
              v-loading="overDataLoading"
              :data="overtimeData"
              class="tableArea"
              style="width: 100%"
            >
              <!-- <el-table-column label="序号" type="index" align="center" width="60" /> -->
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="55"
              ></el-table-column>
              <el-table-column
                prop="workListId"
                label="工单编号"
                width="200"
              />
              <el-table-column
                label="工单标题"
                width="180"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-popover
                    placement="top-start"
                    title="工单标题"
                    trigger="click"
                    :content="scope.row.title"
                  >
                    <span
                      class="notice-content"
                      slot="reference"
                    >{{ scope.row.title }}</span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop="category"
                label="工单类型"
                show-overflow-tooltip
              />
              <el-table-column
                prop="createTime"
                label="开始时间"
                width="155"
              />
              <el-table-column
                prop="dueTime"
                label="期望解决时间"
                width="155"
              />
              <!-- <el-table-column prop="timeOut" label="是否超时"/> -->
              <el-table-column
                label="操作"
                width="150"
              >
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
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="关注此条工单"
                    placement="top-start"
                  >
                    <i
                      class="iconfont icon-plus-preview"
                      @click="addTofollow(scope.row)"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>

            <div
              v-if="totalCount>0"
              class="pagination"
            >
              <el-pagination
                :current-page="currentPageOver"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="pageSizeOver"
                :total="totalCountOver"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChangeOver"
                @current-change="handleCurrentChangeOver"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane name="notOverTime">
            <el-badge
              slot="label"
              :value="totalCount!=0?totalCount:''"
              :max="99"
              class="item"
            >
              未超时
            </el-badge>
            <el-table
              v-loading="dataLoading"
              :data="notOvertimeData"
              class="tableArea"
              style="width: 100%"
            >
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="55"
              ></el-table-column>
              <el-table-column
                prop="workListId"
                label="工单编号"
                width="200"
              />
              <el-table-column
                label="工单标题"
                width="180"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-popover
                    placement="top-start"
                    title="工单标题"
                    trigger="click"
                    :content="scope.row.title"
                  >
                    <span
                      class="notice-content"
                      slot="reference"
                    >{{ scope.row.title }}</span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop="category"
                label="工单类型"
                show-overflow-tooltip
              />
              <el-table-column
                prop="createTime"
                label="开始时间"
                width="155"
              />
              <el-table-column
                prop="dueTime"
                label="期望解决时间"
                width="155"
              />
              <!-- <el-table-column prop="timeOut" label="是否超时"/> -->
              <el-table-column
                label="操作"
                width="150"
              >
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
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="关注此条工单"
                    placement="top-start"
                  >
                    <i
                      class="iconfont icon-plus-preview"
                      @click="addTofollow(scope.row)"
                    />
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>

            <div
              v-if="totalCount>0"
              class="pagination"
            >
              <el-pagination
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="pageSize"
                :total="totalCount"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import * as publicService from "@/modules/oms/api/oms/oms.js";
import * as service from "@/modules/oms/api/oms/myDesk/myNeedDeal";
import { createMyFollow } from "@/modules/oms/api/oms/myDesk/myFollow.js";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "MyNeedDeal",
  data() {
    return {
      showMoreQueryField: false, // 更多查询条件
      activeName: "",

      dataLoading: true,
      overDataLoading: true,

      userId: "",
      title: "", // 工单标题
      workListId: "", //
      procDefId: "", // 工单类型id
      name: "", // 工单类型名称
      sheetTypeList: [],

      notOvertimeData: [], // 未超时
      totalCount: 0, // 总条数
      currentPage: 1, // 当前页
      pageSize: 10, // 每页条数

      overtimeData: [], // 超时
      totalCountOver: 0, // 总条数
      currentPageOver: 1, // 当前页
      pageSizeOver: 10, // 每页条数

      tableData: []
    };
  },
  computed: {
    iconClass() {
      return this.showMoreQueryField
        ? "iconfont icon-xiangshang"
        : "iconfont icon-zhankai";
    }
  },
  watch: {
    // 监听已超时单总条数
    totalCountOver(val){
      if(val>0){
        this.activeName = "overtime"
      }else{
        this.activeName = "notOverTime"
      }
    }
  },
  async mounted() {
    this.userId = this.$store.getters.userId; //获取用户id

    // 查询工单类型
    // publicService.queryType().then(res=>{
    //   this.sheetTypeList = res
    // })
    this.querySheet();
    this.sheetTypeList = await publicService.queryType()
  },
  methods: {
    queryDataOver() {
      // 查看超时单
      const params = {
        assignee: this.userId, // 用户Id
        workListId: this.workListId,
        title: this.title,
        name: this.name,
        status: 1,
        timeOut: "0", // 超时
        isDraft: 0,
        start: (this.currentPageOver - 1) * this.pageSizeOver, // （当前页数-1）*每页显示的条数
        limit: this.pageSizeOver
      };
      service.queryData(params).then(res => {
        this.overDataLoading = false;
        this.overtimeData = res.result;
        this.overtimeData.forEach((item, index) => {
          item.index = params.start++ + 1;
          item.createTime = item.createTime.slice(
            0,
            item.createTime.length - 2
          );
          item.dueTime =
            item.dueTime && item.dueTime.slice(0, item.dueTime.length - 2);
        });
        this.totalCountOver = res.count;
      });
    },
    queryData() {
      // 查看未超时单
      const params = {
        assignee: this.userId, // 用户Id
        workListId: this.workListId,
        title: this.title,
        name: this.name, // 工单类型名称
        status: 1,
        timeOut: "1",
        isDraft: 0,
        start: (this.currentPage - 1) * this.pageSize, // （当前页数-1）*每页显示的条数
        limit: this.pageSize
      };
      service.queryData(params).then(res => {
        this.dataLoading = false;
        this.notOvertimeData = res.result;
        this.notOvertimeData.forEach((item, index) => {
          item.index = params.start++ + 1;
          item.createTime = item.createTime.slice(
            0,
            item.createTime.length - 2
          );
          item.dueTime =
            item.dueTime && item.dueTime.slice(0, item.dueTime.length - 2);
        });
        this.totalCount = res.count;
      });
    },
    querySheet() {
      this.currentPage = this.currentPageOver = 1;
      this.pageSize = this.pageSizeOver = 10;
      this.queryDataOver();
      this.queryData();
      this.$store.dispatch("changeNeedDealCount");
    },
    resetForm() {
      this.procDefId = "";
      this.title = "";
      this.workListId = "";
      this.currentPage = this.currentPageOver = 1;
      this.pageSize = this.pageSizeOver = 10;
      this.queryDataOver();
      this.queryData();
    },
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
    handleSizeChangeOver(val) {
      // 设置每页多少条
      this.pageSizeOver = val;
      this.queryDataOver();
    },
    handleCurrentChangeOver(val) {
      // 当前页
      this.currentPageOver = val;
      this.queryDataOver();
    },
    seeDetails(row) {
      // 查看详情按钮
      const taskKey = {
        taskKey: row.taskKey,
        procDefId: row.procDefId
      };

      const procInstId = row.procInstId;
      const taskId = row.taskId;
      const procDefId = row.procDefId;

      service.getPath(taskKey).then(res => {
        const result = res.result[0];
        // procInstId: 流程实例id
        // taskId: 环节id
        this.removeTag();
        this.$router.push({
          path: `${result.url}/0/${procInstId}/${taskId}`,
          query: { tabActive: "form", previousPath: "/myDesk/myNeedDeal" }
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
      service.getPath(taskKey).then(res => {
        const result = res.result[0];
        this.removeTag();

        this.$router.push({
          path: `${result.url}/0/${procInstId}/${taskId}`,
          query: { tabActive: "chart" }
        });
      });
    },
    dealWork() {
      // 任务处理按钮
    },
    flowsheet() {
      // 查看流程图
    },
    addTofollow(row) {
      // 添加到我的关注
      createMyFollow({
        procInstId: row.procInstId,
        userId: this.$store.getters.userId
      })
        .then(res => {
          this.$message.success("添加关注成功！");
        })
        .catch(error => this.$message.error(error.response.data.message));
    }
  }
};
</script>
<style lang="scss" scoped>
.myNeedDeal /deep/ {
  .box-card {
    margin: 8px 0 16px 0;
  }
  .el-card__body {
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .el-tabs__header {
    margin-bottom: 20px;
  }
  .el-table__header-wrapper,
  .el-table__fixed-header-wrapper {
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
  .el-badge__content.is-fixed {
    top: 7px;
  }
}
</style>

