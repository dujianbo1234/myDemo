<template>
	<div class="monitor-container">
		<div class="RightRow">
			<el-card>
        <el-form :inline="true" style="text-align:left;" label-position="right" size="small">
          <el-form-item label="采集前置机名称:">
            <el-select v-model="params.proxyId" placeholder="请输入采集前置机名称" @keyup.enter.native="queryRule()">
              <el-option v-for="p in proxys" :key="p.proxyId" :label="p.proxyName" :value="p.proxyId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自动发现规则名称" class="ruleName">
            <el-input placeholder="请输入自动发现规则名称" v-model="params.ruleName" @keyup.enter.native="queryRule()"></el-input>
          </el-form-item>     
          <el-form-item >
            <el-button size="small" class="search_btn" @click="queryRule()"     style="margin-left: 10px;">查询</el-button>
            <el-button size="small" class="opt_btn" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="RightRow">
     <el-card>
      <el-row class="btnInfo">
        <el-col :span="18">
          <el-button size="small" class="search_btn" @click="addRule">新增</el-button>
          <el-button size="small" class="opt_btn del_btn" @click="deleteRule(tableSelection)">批量删除</el-button>
        </el-col>
      </el-row>
      <el-table ref="multipleTable" :data="dataList" tooltip-effect="dark" @selection-change="handleSelectionChange" :header-cell-style="headStyle" @row-click="rowClick">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="ruleName" label="规则名称" >
        </el-table-column>
        <el-table-column label="前置机名称" prop="proxyName" show-overflow-tooltip popper-class="toolTipClass">
        </el-table-column>
        <el-table-column label="IP段" prop="ipRange">
        </el-table-column>
        <el-table-column label="规则类型" prop="identify">
          <template slot-scope="scope">
            {{scope.row.identify === '0' ? '主机' : '进程'}}
          </template>
        </el-table-column>
        <el-table-column label="发现规则" prop="rules">
        </el-table-column>
        <el-table-column label="创建者" prop="createUser">
        </el-table-column>
        <el-table-column label="创建时间" width="155">
          <template slot-scope="scope">
            {{scope.row.createDate | dateFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" class="table_btn" size="small" @click.stop="goResult(scope.row.ruleId)">查看发现结果</el-button>
            <el-button type="text" class="table_btn" size="small" @click.stop="see(scope.row,'edit')">修改</el-button>
            <el-button type="text" class="table_btn" size="small" @click.stop="deleteRule(scope.row.ruleId)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <OptRule v-if="ruleDialog" :optType="optType" :selectData="selectData"  ref="ruleDialog" :treeData="treeData" @closeClog="closeClog"></OptRule>
</div>
</template>

<script>
  import server from '@/modules/collector/api/discovery';
  import { treeDataHandle } from '@/modules/collector/utils/getTree';
  import OptRule from '../OptRule';
  export default{
   name: 'hostDiscovery',
   components:{
    OptRule
  },
  data() {
    return {
      proxys:[],
      headStyle: {
        'background-color': '#F4F8F9',
        'color': 'rgba(0,0,0,0.60)',
      },
      tableSelection:[],
      ruleDialog:false,
      dataList:[],
      RulePage:{
        currentPage:1,
        pageSize:10,
        totalItems:0
      },
      // 查询条件对象
      params: {
        proxyId: '',
        ruleName: '',
      },
      addInit:{
        ruleName:'',
        resourceType:[],
        proxyId:'',
        identify:'',
        rules:'',
        ipRange:'',
        description:''
      },
      treeData:[],
      selectData:{}
    }
  }, 
  created() {
    this.queryRule();
    this.query_r();
    server.getProxy().then((res) => {
      this.proxys = res;
    });
  },
  methods: {
    closeClog(bool) {
      this.ruleDialog = false;
      if (bool) {
        this.queryRule();
      }
    },
    query_r() {
      server.query_resource().then((res) => {
        this.treeData = treeDataHandle(res,[]);
      });
    },
    addRule() {
      this.optType = 'add';
      this.ruleDialog = true;
      this.selectData = Object.assign({}, this.addInit);
    },
    //删除规则
    deleteRule(value) {
      let ruleIds = [];
      if (value.length === 0) {
        this.$message.warning("请勾选需要删除的规则！");
        return;
      }
      if (typeof value === 'string') {
        ruleIds = value;
      } else {
        value.map((item) => {
          ruleIds.push(item.ruleId);
        });;
      }
      this.$confirm('此操作将永久删除所选规则, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        server.deleteRule(ruleIds).then(res => {
          this.queryRule();
          this.$message.success("删除成功！");
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    rowClick(row, evt) {
      this.see(row, 'details');
    },
    goResult(ruleId){
      this.$router.push({name:'discoveryResult',params: { ruleId:ruleId }});
    },
    see(row, type) {
      this.ruleDialog = true;
      this.optType = type;
      this.selectData = Object.assign({}, row);
      this.selectData.identify = parseInt(row.identify);
      if (row.resourceType.indexOf('.') > -1) {
        this.selectData.resourceType = row.resourceType.split('.');
      } else {
        this.selectData.resourceType = !Array.isArray(row.resourceType) ? [row.resourceType] : row.resourceType;
      }    
    },
    RuleSizeChange(val) {
      this.RulePage.pageSize = val;
      this.RulePage.currentPage = 1;
      this.queryRule(this.RulePage.pageSize, this.RulePage.currentPage);
    },
    RuleCurrentChange(val) {
      this.RulePage.currentPage = val;
      this.queryRule(this.RulePage.pageSize, this.RulePage.currentPage);
    },
    reset() {
      this.params = {
        proxyId: '',
        ruleName: ''
      };
    },
    queryRule(pageSize, currentPage) {
      if (!pageSize) {
        this.RulePage.currentPage = 1;
        this.RulePage.pageSize = 10;
      }
      let start = (this.RulePage.currentPage - 1) * this.RulePage.pageSize;
      let limit = this.RulePage.pageSize;
      let obj = {
        proxyId:this.params.proxyId,
        ruleName :this.params.ruleName
      };
      server.queryRule(start, limit, obj).then(res => {
        this.dataList = res.data;
        this.RulePage.totalItems = res.count;
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
    margin: 10px 0;
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