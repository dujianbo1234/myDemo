<template>
	<div class="monitor-container">
		<div class="RightRow">
			<el-card>
        <el-form :inline="true" style="text-align:left;" label-position="right" size="small">
          <el-form-item label="规则类型">
            <el-select v-model="params.identify">
              <el-option v-for="item in identifys" :key="item.value" :label="item.name" :value="item.value" @keyup.enter.native="queryResult()"></el-option>
            </el-select>
          </el-form-item>     
          <el-form-item >
            <el-button size="small" class="search_btn" @click="queryResult()"     style="margin-left: 10px;">查询</el-button>
            <el-button size="small" class="opt_btn" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="RightRow">
      <el-card>
        <el-row class="btnInfo">
        </el-row>
        <el-table ref="multipleTable" :data="dataList" tooltip-effect="dark" :header-cell-style="headStyle" @row-click="rowClick">
          <el-table-column prop="ruleId" label="规则ID" >
          </el-table-column>
          <el-table-column prop="ruleName" label="规则名称">
          </el-table-column>
          <el-table-column label="发现规则" prop="rules" width="100">
          </el-table-column> 
          <el-table-column label="规则类型" width="100">
            <template slot-scope="scope">
              {{scope.row.identify === '0' ? '主机' : '进程'}}
            </template>
          </el-table-column>
          <el-table-column label="资源类型" prop="resourceType">
          </el-table-column>
          <el-table-column label="发现时间" width="155">
            <template slot-scope="scope">
              {{scope.row.createDate | dateFilter}}
            </template>
          </el-table-column>
          <el-table-column label="代理名称" prop="proxyName">
          </el-table-column>
          <el-table-column label="发现结果" width="155">
            <template slot-scope="scope">
              <div v-html="$options.filters.resultFilter(scope.row)"></div>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" align="right">
          <el-pagination align="right" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="[10,20,50]" layout="total,sizes,prev, pager, next, jumper" :total="totalItems" :pager-count="5">
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import server from '@/modules/collector/api/discoveryResult';
  export default {
    data(){
      return {
        params:{
          identify:'',
        },
        identifys: [
        { value: 0, name: '主机' },
        { value: 1, name: '进程' }
        ],
        pageSize:10,
        currentPage:1,
        totalItems:0,
        dataList:[],
        headStyle: {
          'background-color': '#F4F8F9',
          'color': 'rgba(0,0,0,0.60)',
        },
      }
    },
    filters:{
      resultFilter: function(value) {
        let str = '';
        let d = '';
        if (value.identify === '1') {
         d = value.result.replace(/\[{|}]/g, '').split(',')
         d.map(function(v, i) {
          str += v + ',<br/>';
        })
         str = str.slice(0, str.length - 6);
       } else {
         d = JSON.parse(value.result);
         d.map(function(v, i) {
           str += 'hostName:' + v.hostName + ',<br/>'+
           'hostIp:' + v.hostIp + ',<br/>'+
           'hostId:' + v.hostId;
         })
       }
       return str;     
     }

   },
   created(){
    this.queryResult();
  },
  methods:{
    rowClick(){

    },
    reset() {
      this.params = {
        identify: ''
      };
    },
    queryResult(pageSize, currentPage){
      if (!pageSize) {
        this.currentPage = 1;
        this.pageSize = 10;
      }
      if(this.$route.params.ruleId){
        this.params.ruleId = this.$route.params.ruleId;
      }
      let start = (this.currentPage - 1) * this.pageSize;
      let limit = this.pageSize;
      server.queryRuleResult(start,limit,this.params).then((res)=>{
        this.dataList = res.data;
        this.totalItems = res.count;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.queryResult(this.pageSize, this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryResult(this.pageSize, this.currentPage);
    },
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
    margin: 10px 0px;
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

