<template>
  <div class="log-manage">
    <el-card class="box-card">
      <el-form :inline="true" ref="logManageForm" :model="logManageForm" class="demo-form-inline">

        <el-form-item>
          <el-input v-model="logManageForm.noteLike" clearable placeholder="请输入note" @keyup.enter.native="queryLogManageData(true)"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="logManageForm.locationLike" clearable placeholder="请输入位置" @keyup.enter.native="queryLogManageData(true)"></el-input>
        </el-form-item>

        <el-form-item>
          <el-date-picker type="date" placeholder="请选择时间" v-model="logManageForm.time" value-format="yyyy-MM-dd" style="width: 100%;" format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-select v-model="logManageForm.level" clearable placeholder="请选择级别">
            <el-option label="INFO" value="INFO"></el-option>
            <el-option label="WARN" value="WARN"></el-option>
            <el-option label="DEBUG" value="DEBUG"></el-option>
            <el-option label="ERROR" value="ERROR"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryLogManageData(true)">搜索</el-button>
          <el-button type="danger" @click="batchDelete">批量删除</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table :data="logManageData" v-loading="logManageDataLoading" tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%">

        <el-table-column type="selection" width="55" align="center">
        </el-table-column>

        <el-table-column align="center" type="index" label="序号" width="50">
        </el-table-column>

        <!-- <el-table-column align="center" prop="id" label="日志ID">
                                </el-table-column> -->

        <el-table-column show-overflow-tooltip align="center" prop="note" label="Note">
        </el-table-column>

        <el-table-column align="center" prop="time" label="时间">
          <template slot-scope="scope">
            <span>{{scope.row.time | time}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="level" label="级别">
        </el-table-column>

        <el-table-column align="center" prop="level" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="logDetail(scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="deleteSignleLog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      
      </el-table>

      <el-dialog title="日志详情" :visible.sync="dialogVisible" width="50%">
        
        <el-form label-position="right" label-width="80px">
          <el-form-item label="ID">
            <span class="info-detail">{{selectData.id}}</span>
          </el-form-item>
          <el-form-item label="级别">
            <span class="info-detail">{{selectData.level}}</span>
          </el-form-item>
          <el-form-item label="时间">
            <span class="info-detail">{{selectData.time | time}}</span>
          </el-form-item>
          <el-form-item label="Category">
            <span class="info-detail">{{selectData.category}}</span>
          </el-form-item>
          <el-form-item label="位置">
            <span class="info-detail">{{selectData.location}}</span>
          </el-form-item>
          <el-form-item label="Note">
            <span class="info-detail">{{selectData.note}}</span>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>

      </el-dialog>

      <el-pagination class="pagination" v-if="logManageDataTotal > 10" :current-page.sync="logManageDataPagination.start" :page-size.sync="logManageDataPagination.limit" layout="total, sizes, prev, pager, next, jumper" :total="logManageDataTotal" background></el-pagination>

    </el-card>

  </div>
</template>

<script>
import * as request from "@/modules/pms/api/pms/logmanage.js";

export default {
  name: "logManage",
  data() {
    return {
      logManageForm: {
        // log manage form
        id: "",
        time: "",
        level: "",
        locationLike: "",
        noteLike: ""
      },

      logManageData: [], // log manage data
      logManageDataPagination: {
        start: 1,
        limit: 10
      },
      logManageDataTotal: 0,
      logManageDataLoading: true,

      dialogVisible: false,
      selectData: {},

      selectChangeData: [] // mutile select data
    };
  },
  watch: {
    logManageDataPagination: {
      deep: true,
      handler() {
        this.queryLogManageData();
      }
    }
  },
  mounted() {
    this.queryLogManageData();
  },
  methods: {
    assign(...params) {
      return Object.assign({}, ...params);
    },
    handleSelectionChange(val) {
      this.selectChangeData = val.map(item => {
        return item.id;
      });
    },
    deleteMethod(id) {
      request.deleteLog(id).then(res => {
        this.$message.success("删除成功！");
        this.queryLogManageData()
      })
    },
    deleteSignleLog(row) {
      this.$confirm("此操作将删除此条日志, 是否继续?", "删除日志", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.deleteMethod(row.id);
        })
        .catch(() => { });
    },
    batchDelete() {
      const selectChangeData = this.selectChangeData;
      if (!selectChangeData.length) {
        return this.$message.warning("请先多选后再删除！")
      }

      this.$confirm("此操作将批量删除选中的日志, 是否继续?", "批量删除日志", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.deleteMethod(this.selectChangeData.toString());
        })
        .catch(() => { });
    },
    queryLogManageData(bool) {

      // query log manage data

      if (bool === true) {
        this.logManageDataPagination.start = 1
        //  {
        //   start: 1, 
        //   // limit: 10
        // }
      }

      let params = {};

      // const { id, time, level, locationLike } = this.logManageForm;

      const logManageForm = this.logManageForm;

      Object.keys(logManageForm).forEach(item => {
        if (logManageForm[item]) {
          params[item] = logManageForm[item];
        }
      });

      this.logManageDataLoading = true;

      request
        .queryLogManageData(this.assign(params, this.logManageDataPagination))
        .then(res => {
          this.logManageDataLoading = false;

          this.logManageData = res.result;
          this.logManageDataTotal = res.total;
        });
    },
    logDetail(row) {
      this.dialogVisible = true;
      this.selectData = row;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.log-manage {
  padding: 16px;

  .warning-text {
    line-height: 1.5;
    margin-bottom: 16px;
    color: #999;
  }

  .info-detail {
    word-break: break-word;
    white-space: pre-wrap;
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
