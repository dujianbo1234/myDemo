<template>
  <div class="monitor-container">
    <div class="RightRow">
      <el-card>
        <el-form :inline="true" style="text-align:left;" label-position="right" label-width="100px" size="small">
          <el-form-item label="资源对象编号" class="ciName">
            <el-input placeholder="请输入资源对象编号" v-model="params.ciCode" @keyup.enter.native="queryDeploy()"></el-input>
          </el-form-item>
          <el-form-item label="资源对象名称" class="ciName">
            <el-input placeholder="请输入资源对象名称" v-model="params.ciName" @keyup.enter.native="queryDeploy()"></el-input>
          </el-form-item>
          <el-form-item label="IP地址">
            <el-input placeholder="请输入IP地址" v-model="params.ip" @keyup.enter.native="queryDeploy()"></el-input>
          </el-form-item>
          <el-form-item label="部署状态">
            <el-select v-model="params.status" @keyup.enter.native="queryDeploy()">
              <el-option v-for="item in deployStatus" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" class="search_btn" @click="queryDeploy()">查询</el-button>
            <el-button size="small" class="opt_btn" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="RightRow">
      <el-card>
        <el-row class="btnInfo">
          <el-col :span="18">
            <el-button size="small" class="search_btn" @click="optDeploy(tableSelection,'install')">批量部署</el-button>
            <el-button size="small" class="opt_btn del_btn" @click="optDeploy(tableSelection,'uninstall')">批量卸载</el-button>
          </el-col>
        </el-row>
        <el-table ref="multhostIpleTable" :data="dataList" tooltip-effect="dark" @selection-change="handleSelectionChange" :header-cell-style="headStyle">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="ciCode" label="资源对象编号">
          </el-table-column>
          <el-table-column prop="ciName" label="资源对象名称">
          </el-table-column>
          <el-table-column prop="ip" label="IP地址">
          </el-table-column>
          <el-table-column label="部署状态">
            <template slot-scope="scope">{{scope.row.status | filStatus}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="部署" placement="top">
                <el-button type="text" class="table_btn" size="small" @click="optDeploy(scope.row,'install')" :disabled="[1,3,4,5].indexOf(scope.row.status)>-1">
                  <i class="iconfont">&#xe63c;</i>
                </el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="卸载" placement="top">
                <el-button type="text" class="table_btn" size="small" @click="optDeploy(scope.row,'uninstall')" :disabled="[0,1,2,4].indexOf(scope.row.status)>-1">
                  <i class="iconfont">&#xe63b;</i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination align="right" background @size-change="deploySizeChange" @current-change="deployCurrentChange" :page-sizes="[10,20,40,100]"  :current-page="deployPage.currentPage" :page-size="deployPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="deployPage.totalItems" :pager-count="5">
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>
<script>
  import server from '@/modules/collector/api/deploy';
  export default {
    name: 'deploy',
    data() {
      return {
        headStyle: {
          'background-color': '#F4F8F9',
          'color': 'rgba(0,0,0,0.60)',
        },
        deployStatus: [
        { value: 0, name: '未部署' },
        { value: 1, name: '部署中' },
        { value: 2, name: '部署失败' },
        { value: 3, name: '已部署' },
        { value: 4, name: '卸载中' },
        { value: 5, name: '卸载失败' }
        ],
      // 查询条件对象
      params: {
        ciCode:'',
        ciName: '',
        ip: '',
        status: ''
      },
      dataList: [],
      tableSelection: [],
      deployPage: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0
      }
    }
  },
  filters: {
    filStatus: function(value) {
      return ['未部署', '部署中', '部署失败', '已部署', '卸载中', '卸载失败'][value];
    },
  },
  created() {
    this.queryDeploy();
  },
  methods: {
    deploySizeChange(val) {
      this.deployPage.pageSize = val;
      this.deployPage.currentPage = 1;
      this.queryDeploy(this.deployPage.pageSize, this.deployPage.currentPage);
    },
    deployCurrentChange(val) {
      this.deployPage.currentPage = val;
      this.queryDeploy(this.deployPage.pageSize, this.deployPage.currentPage);
    },
    reset() {
      this.params = {
        ciCode:'',
        ciName: '',
        ip: '',
        status: ''
      }
    },
    queryDeploy(pageSize, currentPage) {
      if (!pageSize) {
        this.deployPage.currentPage = 1;
        this.deployPage.pageSize = 10;
      }
      this.params.ip = this.params.ip.split('.').map(item => {
        return item.replace(/^0+/, '');
      }).join('.');
      let reg = /^(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})){0,3}$/;
      let reg1 = /[`~!@#$^&*()=|{}:,\\[\ \].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“。，、？ ]/g;
      if (this.params.ip.length > 0 && !reg.test(this.params.ip)) {
        this.$message.warning("请输入合法的IP地址！");
        return;
      }
      let ciName = this.params.ciName.replace(reg1, '');
      let start = (this.deployPage.currentPage - 1) * this.deployPage.pageSize;
      let limit = this.deployPage.pageSize;
      let obj = {
        ciCode:this.params.ciCode,
        status: this.params.status,
        ip: this.params.ip,
        ciName: ciName
      };
      server.queryDeploy(start, limit, obj).then(res => {
        this.dataList = res.data;
        this.deployPage.totalItems = res.count;
      });
    },
    optDeploy(value, type) {
      let optName = type === 'install' ? '部署' : '卸载';
      let ids = [];
      if (value.length === 0) {
        this.$message.warning("请勾选需要操作的资源！");
        return;
      }
      if (!Array.isArray(value)) {
        ids.push(value);
      } else {
        ids = value;
      }
      this.$confirm('是否' + optName + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        server.optDeploy(ids, type).then(res => {
          this.queryDeploy();
          this.$message.success("操作成功！");
        });
      })
      .catch(() => {
        this.$message.info('已取消' + optName);
      });

    },
    handleSelectionChange(val) {
      this.tableSelection = val;
    }
  }
}

</script>
<style lang="scss" scoped>
.monitor-container {
  padding: 10px 20px;
  background-color: #f5f5f5;

  .btnInfo {
    margin-bottom: 12px;
  }

  .set-item-show {
    color: skyblue;
    font-size: 12px;
    vertical-align: bottom;
    cursor: pointer;
  }

  #preForm {
    .el-select {
      width: 185px;
    }

    .el-date-editor {
      width: 185px;
    }
  }

  #current-alertbtn {
    padding-left: 200px;
  }

  #myChart {
    z-index: 998;
  }
}

.search_btn {
  background: #42B983;
  border: 1px solid #42B983;
  color: #FFFFFF;
  font-size:14px;
  &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
}

.opt_btn {
  background: #F4F8F9;
  color: rgba(0, 0, 0, 0.70);
  margin-left: 8px;
  font-size:14px;
  border: none;
  height: 34px;
  &:hover {
    background: #42B983;
    border-color: #42B983;
    color: #fff;
  }
}

.del_btn {
  &:hover {
    background: #FA5555;
    border-color: #FA5555;
    color: #fff;
  }
}

.RightRow {
  height: auto;
  margin: 10px 0 20px;
  border-radius: 5px;
}
.el-form /deep/{
  text-align: left;

  .el-input {
    width: 260px;
  }
  .el-form-item--small .el-form-item__label {
    line-height: 34px;
  }
  .el-input--small .el-input__inner {
    height: 34px;
    line-height: 34px;
  }
  .el-form-item {
    margin: 10px 8px 10px 0px;
  }
  .ciName .el-form-item__label{
    width:100px !important;
  }
  .ad .el-form-item__label{
    width:55px !important;
  }
}
.table_btn {
  color: rgba(66, 185, 131, 1);
  font-size:14px;
}
.is-disabled {
  color: #E2E2E2;
}
.el-table /deep/ {
  .el-checkbox.is-checked .el-checkbox__inner {
    background-color: #42B983;
    border-color: #42B983;
  }

  .el-checkbox__inner {
    &:hover {
      border-color: #42B983;
    }
  }

  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #42B983;
  }

  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #42B983;
    border-color: #42B983;
  }
}

.conRight /deep/ {
  .is-active {
    background-color: #fff !important;
  }

  .el-tabs__header {
    margin: 0;
  }
}

/deep/ .el-pagination {
  margin-top: 10px;
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: rgba(66, 185, 131, 1);
}

/deep/.el-pagination.is-background .btn-next {
  background: #fff;
}

/deep/.el-pagination.is-background .btn-prev {
  background: #fff;
}

/deep/.el-pagination.is-background .el-pager li {
  border-radius: 3px;
  min-width: 28px;
}


.el-form {
  text-align: center;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.rbtn {
  float: right;
  position: relative;
  top: -20px;
  text-align: center;
}

</style>
