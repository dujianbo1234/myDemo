<template>
  <div class="announcement-manage-container">
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="announcementManageForm"
        size="mini"
      >
        <el-form-item>
          <el-input
            clearable
            v-model="announcementManageForm.title"
            placeholder="公告标题"
            @keyup.enter.native="queryAnnouncementManageData(true)"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            clearable
            v-model="announcementManageForm.context"
            placeholder="公告内容"
            @keyup.enter.native="queryAnnouncementManageData(true)"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-select
            v-model="announcementManageForm.sortField"
            clearable
            placeholder="选择时间筛选条件"
          >
           <el-option
              label="公告发布时间"
              value="publish_time"
            ></el-option>
           <el-option
              label="公告生效时间"
              value="start_time"
            ></el-option>
            <el-option
              label="公告有效期限"
              value="valid"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            type="date"
            placeholder="开始时间"
            v-model="longTime.startTime"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            type="date"
            placeholder="结束时间"
            v-model="longTime.endTime"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="queryAnnouncementManageData(true)"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">

      <el-table
        :data="announcementManageData"
        v-loading="announcementManageDataLoading"
        tooltip-effect="dark"
        style="width: 100%"
      >

        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="publisher"
          label="公告发布人"
          width="100"
        >
        </el-table-column>

        <el-table-column
          align="center"
          label="公告标题"
          width="120"
        >
          <template slot-scope="scope">
            <span class="notice-content">{{scope.row.title}}</span>
          </template>
        </el-table-column>
        
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="context"
          label="公告内容"
        >
        </el-table-column>

         <el-table-column
          align="center"
          prop="publishTime"
          label="公告发布时间"
        >
          <template slot-scope="scope">
            <span class="notice-content">{{scope.row.publishTime | time}}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="startTime"
          label="公告生效时间"
        >
          <template slot-scope="scope">
            <span class="notice-content">{{scope.row.startTime | time}}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="valid"
          label="公告有效期限"
        >
         <template slot-scope="scope">
            <span class="notice-content">{{scope.row.valid | time}}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="level"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="checkDetail(scope.row)"
            >查看</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="changeStatus(scope.row)"
            >撤回</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-dialog
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
            <span class="info-detail">{{selectData.publishTime | time}}</span>
          </el-form-item>
          <el-form-item label="公告有效期限：">
            <span class="info-detail">{{selectData.valid | time}}</span>
          </el-form-item>
          <el-form-item label="公告生效时间：">
            <span class="info-detail">{{selectData.startTime | time}}</span>
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

      </el-dialog>

      <el-pagination
        class="pagination"
        v-if="announcementManageDataTotal > 10"
        :current-page.sync="announcementManageDataPagination.start"
        :page-size.sync="announcementManageDataPagination.limit"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="queryAnnouncementManageData"
        @size-change="queryAnnouncementManageData"
        :total="announcementManageDataTotal"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import * as service from "@/modules/oms/api/oms/dailyOperationManage/announcementManage";

const pagination = {
  start: 1,
  limit: 10
};

export default {
  name: "announcementManage", // 公告管理
  data() {
    return {
      announcementManageForm: {
        sortField: ""
      }, // 公告表单

      longTime: {
        startTime: "",
        endTime: ""
      },

      announcementManageData: [], // 公告数据
      announcementManageDataTotal: 0,
      announcementManageDataPagination: {
        // table 分页参数
        ...pagination
      },
      announcementManageDataLoading: true, // table loading

      selectData: {}, // 查看详情数据源
      
      dialogVisible: false // 模态框是否显示
    };
  },
  mounted() {
    this.queryAnnouncementManageData();
  },
  methods: {
    queryAnnouncementManageData(isClick) {

      if(isClick === true) {
        this.announcementManageDataPagination = {...pagination}
      }
      
      // 查询代理人数据
      const announcementManageDataPagination = this
        .announcementManageDataPagination;

      const { startTime, endTime } = this.longTime;

      const announcementManageForm = this.announcementManageForm;
      
      let params = Object.assign({}, announcementManageForm, {
        ...announcementManageDataPagination,
        start:
          (announcementManageDataPagination.start - 1) *
          announcementManageDataPagination.limit
      });
      
      const interval = ['-']; // 动态组成后台需要的 long 类型字段
      if(startTime) {
        interval.splice(0, 0, new Date(startTime + ' 00:00:00').getTime() / 1000);
      }
      
      if(endTime) {
        interval.push(new Date(endTime + ' 23:59:59').getTime() / 1000);
      }
      
      if(interval.length > 1) {
        params.interval = interval.join('');
      }

      if(interval != '-' && params.sortField == '') {
        this.announcementManageData = [];
        this.announcementManageDataTotal = 0;
        return this.$message.error("请先选择时间筛选条件！");
      }
      
      if(Object.values(announcementManageForm).some(item => item !== '')) {
        params.search = true;
      }

      this.announcementManageDataLoading = true;

      service.queryNoticeData(params).then(res => {

        const { count, result } = res;

        this.announcementManageData = result;

        this.announcementManageDataTotal = count;

        this.announcementManageDataLoading = false;
      }).catch(e => {
        this.announcementManageData = [];
        this.announcementManageDataTotal = 0;
        this.announcementManageDataLoading = false;
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
            this.queryAnnouncementManageData();
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
}
</style>