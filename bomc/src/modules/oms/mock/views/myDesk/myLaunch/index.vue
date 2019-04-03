<template>
  <div class="myLaunch app-container">
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
            <el-button size="small" type="primary" @click="querySheet()">查询</el-button>
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
        <el-tabs type="card" v-model="activeName">
          <el-tab-pane name="overtime">
            <el-badge
              slot="label"
              :value="totalCountOver!=0?totalCountOver:''"
              :max="99"
              class="item"
            >
              已超时
            </el-badge>
            <el-table v-loading="overDataLoading" :data="overtimeData" class="tableArea" style="width: 100%;overflow-x: auto;">
              <el-table-column prop="index" label="序号" align="center" width="60"/>
              <el-table-column prop="workListId" label="工单编号" width="180"/>
              <el-table-column style="min-width: 150px;" label="工单标题" prop="title" width="180" show-overflow-tooltip />
              <el-table-column label="工单创建时间" width="155">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime | formateTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="期望解决时间" width="155">
                <template slot-scope="scope">
                  <span>{{ scope.row.dueTime | formateTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="工单完成时间" width="155">
                <template slot-scope="scope">
                  <span>{{ scope.row.endTime | formateTime }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="工单状态"/>
              <el-table-column prop="ruTaskName" label="当前任务节点" width="200" />
              <el-table-column prop="assignee" label="当前处理人" width="120"/>
              <el-table-column label="环节开始时间" width="155">
                <template slot-scope="scope">
                  <span>{{ scope.row.startTime | formateTime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="查看详情" placement="top-start">
                    <i class="el-icon-tickets" @click="seeDetails(scope.row)"/>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="查看流程图" placement="top-start">
                    <i class="el-icon-sort" @click="seeFlowChart(scope.row)"/>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="关注此条工单" placement="top-start">
                    <i class="iconfont icon-plus-preview" @click="addTofollow(scope.row)"/>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <div v-if="totalCountOver>0" class="pagination">
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
            <el-table v-loading="dataLoading" :data="notOvertimeData" class="tableArea" style="width: 100%;overflow-x: auto;">
              <el-table-column prop="index" label="序号" align="center" width="60"/>
              <el-table-column prop="workListId" label="工单编号" width="180"/>
              <el-table-column label="工单标题" prop="title" width="180" show-overflow-tooltip />
              <el-table-column label="工单创建时间" width="155">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime | formateTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="期望解决时间" width="155">
                <template slot-scope="scope">
                  <span>{{ scope.row.dueTime | formateTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="工单完成时间" width="155">
                <template slot-scope="scope">
                  <span>{{ scope.row.endTime | formateTime }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="工单状态"/>
              <el-table-column prop="ruTaskName" label="当前任务节点" width="200" />
              <el-table-column prop="assignee" label="当前处理人" width="120"/>
              <el-table-column label="环节开始时间" width="155">
                <template slot-scope="scope">
                  <span>{{ scope.row.startTime | formateTime }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="查看详情" placement="top-start">
                    <i class="el-icon-tickets" @click="seeDetails(scope.row)"/>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="查看流程图" placement="top-start">
                    <i class="el-icon-sort" @click="seeFlowChart(scope.row)"/>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="关注此条工单" placement="top-start">
                    <i class="iconfont icon-plus-preview" @click="addTofollow(scope.row)"/>
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

            
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import * as publicService from "@/modules/oms/api/oms/oms.js";
import * as service from "@/modules/oms/api/oms/myDesk/myLaunch";
import { createMyFollow } from "@/modules/oms/api/oms/myDesk/myFollow.js";
import { debug } from "util";

export default {
  name: "MyLaunch",
  data() {
    return {
      showMoreQueryField: false, // 更多查询条件
      activeName: "overtime",

      userId: "",

      sheetTypeList: [],
      procDefId: "",
      name: "", // 工单类型名称
      workListId: "",
      title: "",
      taskStatus: "",

      notOvertimeData: [], // 未超时
      totalCount: 0, // 总条数
      currentPage: 1, // 当前页
      pageSize: 10, // 每页条数

      overtimeData: [], // 超时
      totalCountOver: 0, // 总条数
      currentPageOver: 1, // 当前页
      pageSizeOver: 10, // 每页条数

      dataLoading: true,
      overDataLoading: true,

      categoryList: [
        { index: 0, name: "事件管理流程", url: "/eventForm/allInfo" },
        { index: 1, name: "问题管理流程", url: "/problemForm/allInfo" },
        { index: 2, name: "变更管理流程", url: "/changeForm/allInfo" },
        { index: 3, name: "值班管理流程", url: "/dutyManagement/allInfo" }
      ]
    };
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
  computed: {
    iconClass() {
      return this.showMoreQueryField
        ? "iconfont icon-xiangshang"
        : "iconfont icon-zhankai";
    }
  },
  async mounted() {
    this.userId = this.$store.getters.userId; //获取用户id
    this.querySheet();
    this.sheetTypeList = await publicService.queryType(); // 查询工单类型
  },
  filters: {
    formateTime: value => {
      if (!value || value === null) return "";
      value = value.slice(0, value.length - 2);
      return value;
    }
  },
  methods: {
    queryDataOver() {
      // 查看超时单
      const params = {
        startUserId: this.userId, // 用户Id
        workListId: this.workListId,
        title: this.title,
        name: this.name, // 工单类型名称
        taskStatus: "0", // 超时
        start: (this.currentPageOver - 1) * this.pageSizeOver, // （当前页数-1）*每页显示的条数
        limit: this.pageSizeOver
      };
      service.queryData(params).then(res => {
        this.overDataLoading = false
        res.result.forEach((item, index) => {
          if (item.status === "1") {
            item.status = "运行中";
          } else if (item.status === "0") {
            item.status = "已完成";
          }
          if (item.ruTaskName) {
            item.ruTaskName = item.ruTaskName.slice(
              0,
              item.ruTaskName.indexOf("-")
            );
          }
          item.index = params.start++ + 1;
        });
        this.overtimeData = res.result;
        this.totalCountOver = res.count;
        this.$store.dispatch("changeNeedDealCount");
      });
    },
    queryData() {
      const params = {
        startUserId: this.userId, // 当前用户的名字
        name: this.name, // 工单类型名称
        title: this.title,
        workListId: this.workListId,
        taskStatus: "1",
        start: (this.currentPage - 1) * this.pageSize, // （当前页数-1）*每页显示的条数
        limit: this.pageSize
      };
      service.queryData(params).then(res => {
        this.dataLoading = false
        res.result.forEach((item, index) => {
          if (item.status === "1") {
            item.status = "运行中";
          } else if (item.status === "0") {
            item.status = "已完成";
          }
          if (item.ruTaskName) {
            item.ruTaskName = item.ruTaskName.slice(
              0,
              item.ruTaskName.indexOf("-")
            );
          }
          item.index = params.start++ + 1;
        });
        this.notOvertimeData = res.result;
        this.totalCount = res.count;
      });
    },
    querySheet() {
      this.currentPage = this.currentPageOver = 1;
      this.pageSize = this.pageSizeOver = 10
      this.queryDataOver()
      this.queryData();
    },
    resetForm(){
      this.procDefId = ""
      this.title = ""
      this.workListId = ""
      this.currentPage = this.currentPageOver = 1;
      this.pageSize = this.pageSizeOver = 10
      this.queryDataOver()
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
      //查看详情
      this.removeTag();
      let url = "";
      this.categoryList.forEach((item, index) => {
        if (row.category === item.name) {
          url = item.url;
        }
      });

      this.$router.push({
        path: `${url}/${row.procDefId}/${row.procInstId}/${row.taskId}`,
        query: {
          tabActive: "form",
          isOver: row.status === "已完成" ? true : false,
          eventStatus: row.ruTaskName
        }
      });
    },
    seeFlowChart(row) {
      const taskKey = {
        taskKey: row.taskKey
      };
      const procInstId = row.procInstId;
      const taskId = row.taskId;
      const procDefId = row.procDefId;
      this.removeTag();
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
          isOver: row.status === "已完成" ? true : false,
          eventStatus: row.ruTaskName
        }
      });
    },
    addTofollow(row) {
      // 添加到我的关注
      createMyFollow({
        procInstId: row.procInstId,
        userId: this.$store.getters.userId,
        linkName: row.name
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
.myLaunch /deep/ {
  .box-card {
    margin: 8px 0 16px 0;
  }
  .el-card__body {
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .el-tabs__header{
    margin-bottom: 20px;
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

  .pagination {
    margin-top: 20px;
    float: right;
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

