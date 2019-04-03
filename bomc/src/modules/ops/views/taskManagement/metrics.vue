<template>
  <div style="margin-right: 10px;">
    <div class="quota_search">
      <el-form :inline="true" class="demo-form-inline" ref="metForm" size="small" label-width="90px">
        <el-form-item label="指标名称:">
          <el-input v-model="metName" placeholder="请输入指标名称"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-table ref="multipleTable" :data="quotaData" tooltip-effect="dark" @selection-change="quotaSelection" @select="select" @select-all="selectAll" style="width:100%;" header-align="center" :header-cell-style="headStyle">
      <el-table-column type="selection" width="55" :selectable="selectable" key="1" v-if="optType!=='details'">
      </el-table-column>
      <el-table-column prop="kpi" label="CODE" v-if="optType==='details'" key="2">
      </el-table-column>
      <el-table-column prop="code" label="CODE" v-else key="3">
      </el-table-column>
      <el-table-column prop="alias" label="采集指标名称" key="4">
      </el-table-column>
      <el-table-column prop="frequency" label="采集频率" key="5" width="100">
      </el-table-column>
      <el-table-column prop="relations" label="关联的指标" key="6">
      </el-table-column>
      <el-table-column prop="cmd" label="执行的命令" v-if="collectType === 5" key="7">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.cmd" placeholder="请输入命令" @change="changeMet(scope.row,scope)" :disabled="optType==='details'"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align="right" background @size-change="metSizeChange" @current-change="metCurrentChange" :current-page="metPage.currentPage" :page-sizes="[2,5]" :page-size="metPage.pageSize"  layout="total, sizes, prev, pager, next, jumper" :total="metPage.totalItems" :pager-count="5">
    </el-pagination>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import * as server from "@/modules/collector/api/tmpManage.js";
export default {
  props: {
    collectType: Number,
    optType: String,
    selectData: Object,
    resource_type: [Array, String]
  },
  data() {
    return {
      headStyle: {
        'background-color': '#F4F8F9',
        'color': 'rgba(0,0,0,0.60)',
      },
      metName: '',
      metPage: {
        pageSize: 5,
        currentPage: 1,
        totalItems: 0
      },
      quotaData: [],
      selectMet: [],
      obj_list: [],
      multipleSelectionAll: [], // 所有选中的数据包含跨页数据
      multipleSelection: [], // 当前页选中的数据
      idKey: 'code',
      metList: []
    }
  },
  computed: {
    ...mapState({
      selectMetData: state => state.collect.selectMetData
    })
  },
  methods: {
    ...mapMutations([
      'SELECT_MET'
    ]),
    changeMet(row, index) {
      let cmd = row.cmd.trim();
      if(cmd === ''){
        this.$refs.multipleTable.toggleRowSelection(row);
      }
      this.multipleSelectionAll.map((item, index) => {
        if (item.code === row.code) {
          this.multipleSelectionAll[index].cmd = row.cmd;
        }
      });
    },
    metSizeChange(val) {

      this.changePageCoreRecordData();
      this.quotaData = [];
      this.metPage.currentPage = 1;
      this.metPage.pageSize = val;
      if (this.metPage.totalItems > this.metPage.pageSize) {
        for (let index = 0; index < this.metPage.pageSize; index++) {
          this.quotaData.push(this.obj_list[index]);
        }
      } else {
        this.quotaData = this.obj_list;
      }
      setTimeout(() => {
        this.setSelectRow();
      }, 200);
      // this.metPage.pageSize = val;
      // this.metPage.currentPage = 1;
      // this.queryMetrics(this.metPage.pageSize, this.metPage.currentPage);
    },
    metCurrentChange(val) {
      this.changePageCoreRecordData();
      // console.log(this.multipleSelection)
      this.quotaData = [];
      this.metPage.currentPage = val;
      let totalPage = Math.ceil(this.metPage.totalItems / this.metPage.pageSize);
      if (this.metPage.currentPage === totalPage) {
        for (let index = (this.metPage.currentPage - 1) * this.metPage.pageSize; index < this.metPage.totalItems; index++) {
          this.quotaData.push(this.obj_list[index]);
        }
      } else {
        for (let index = (this.metPage.currentPage - 1) * this.metPage.pageSize; index < this.metPage.currentPage * this.metPage.pageSize; index++) {
          this.quotaData.push(this.obj_list[index]);
        }
      }
      setTimeout(() => {
        this.setSelectRow();
      }, 200);
      // this.metPage.currentPage = val;
      // this.queryMetrics(this.metPage.pageSize, this.metPage.currentPage);
    },
    queryMetrics(pageSize, currentPage) {
      let resource_type = this.resource_type.join('.');
      this.metName = '';
      this.quotaData = [];
      this.obj_list = [];
      this.metList = [];
      if (resource_type === '') {
        return;
      }
      if (this.optType === 'details') {
        this.metName = '';
        this.metList.push(...this.selectData.template_content);
        this.obj_list.push(...this.selectData.template_content);
        this.metPage.currentPage = 1;
        this.metPage.pageSize = 5;
        this.metPage.totalItems = this.obj_list.length;
        if (this.metPage.totalItems > this.metPage.pageSize) {
          for (let index = 0; index < this.metPage.pageSize; index++) {
            this.quotaData.push(this.obj_list[index]);
          }
        } else {
          this.quotaData = this.obj_list;
        }
        return false;
      }
      if (!pageSize) {
        this.metPage.currentPage = 1;
        this.metPage.pageSize = 5;
      }
      // let start = (this.metPage.currentPage - 1) * this.metPage.pageSize;
      // let limit = this.metPage.pageSize;
      server.queryMetrics(resource_type).then(res => {
        if (res.metricsData) {
          this.metPage.totalItems = res.count;
          this.obj_list = res.metricsData;
          this.metList = res.metricsData;
          this.obj_list.map(function(item) {
            item.cmd = '';
          });
          this.metPage.currentPage = 1;
          this.metPage.pageSize = 5;
          this.metPage.totalItems = this.obj_list.length;
          if (this.metPage.totalItems > this.metPage.pageSize) {
            for (let index = 0; index < this.metPage.pageSize; index++) {
              this.quotaData.push(this.obj_list[index]);
            }
          } else {
            this.quotaData = this.obj_list;
          }
          if (this.optType === 'edit' || this.optType === 'clone') {
            this.multipleSelectionAll = [];
            this.obj_list.map((o, index) => {
              this.selectData.template_content.map((c, idx) => {
                if (o.code === c.kpi) {
                  let obj = Object.assign({},o);
                  if (this.collectType === 5) {       
                    obj.cmd = c.cmd;
                  }     
                  this.multipleSelectionAll.push(obj);
                }
              });
            });
            this.setSelectRow();
          }
        }
      });
    },
    quotaSelection(val) {
      this.multipleSelection = val;
    },
    select(val, row) {
      if (this.collectType === 5) {
        if (row.cmd.length > 0) {
          if (row) {
            this.$refs.multipleTable.toggleRowSelection(row);
          } else {
            this.$refs.multipleTable.clearSelection();
          }
          this.$refs.multipleTable.toggleRowSelection(row);
        } else {
          this.$message({
            type: "error",
            message: "请输入命令"
          });
          this.$refs.multipleTable.toggleRowSelection(row, false);
        }
      }
    },
    selectAll(val, row) {
      // let selected = val.length && val.indexOf(row) !== -1
      if (this.collectType === 5) {
        val.some((item) => {
          if (!item.cmd.length > 0) {
            this.$message({
              type: "error",
              message: "请输入命令"
            });
            this.$refs.multipleTable.toggleAllSelection()
            return true;
          }
        });
      }
    },
    selectable(row, index) {
      if (row && this.optType === 'details') {
        return false;
      } else {
        return true;
      }
    },
    getSelectData() {
      this.selectMet = [];
      if (this.collectType === 5) {
        this.multipleSelectionAll.map((item, index) => {
          this.selectMet.push({
            kpi: item.code,
            alias: item.alias,
            cmd: item.cmd,
            frequency: item.frequency
          });
        })
      } else {
        this.multipleSelectionAll.map((item, index) => {
          this.selectMet.push({
            kpi: item.code,
            alias: item.alias,
            frequency: item.frequency
          });
        })
      }
      this.SELECT_MET(this.selectMet);
    },
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return;
      }
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      let selectAllIds = [];
      let that = this;
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey]);
      });
      this.$refs.multipleTable.clearSelection();
      this.$nextTick(_ => {
        for (var i = 0; i < this.quotaData.length; i++) {
          if (selectAllIds.indexOf(this.quotaData[i][idKey]) >= 0) {
            let idx = selectAllIds.indexOf(this.quotaData[i][idKey]);
            this.quotaData[i].cmd = this.multipleSelectionAll[idx].cmd;
            this.$refs.multipleTable.toggleRowSelection(this.quotaData[i], true);
          }
        }
      });
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // console.log(this.multipleSelectionAll)
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      let that = this;
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection;
        this.getSelectData();
        return;
      }

      // 总选择里面的key集合
      let selectAllIds = [];
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey]);
      })
      let selectIds = []
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey]);
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row);
        }
      });
      let noSelectIds = [];
      // 得到当前页没有选中的id
      this.quotaData.forEach(row => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      });
      noSelectIds.forEach(id => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] == id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1);
              break;
            }
          }
        }
      });
      this.getSelectData();
    }
  },
  watch: {
    metName: function(nv, ov) {
      let search = this.metName.replace(/ /g, '');
      let dn = [];
      if (nv.length > 0 && search.length === 0) {
        return;
      }
      if (search) {
        dn = this.metList.filter(dataNews => {
          if (dataNews.alias) {
            return (dataNews.alias.toLowerCase().indexOf(search.toLowerCase()) > -1);
          }
        });
        this.obj_list = dn;
        this.quotaData = [];
        this.metPage.currentPage = 1;
        this.metPage.pageSize = 5;
        this.metPage.totalItems = dn.length;
        if (this.metPage.totalItems > this.metPage.pageSize) {
          for (let index = 0; index < this.metPage.pageSize; index++) {
            this.quotaData.push(dn[index]);
          }
          this.setSelectRow();
        } else {
          setTimeout(() => {
            this.quotaData = [...dn];
            this.setSelectRow();
          }, 10);

        }
      } else {
        this.queryMetrics();
      }
    },
    optType: function(nv, ov) {
      this.$refs['metForm'].resetFields();
      this.metName = '';
    }
  },
  created() {
    if (this.optType === 'details') {
      this.obj_list = this.selectData.template_content;
    }
  }
}

</script>
<style lang="scss" scoped>
.quota_search {
  display: inline-block;
  float: none;
  margin: 5px 0 10px;
  position: relative;
  top: 2.5px;
  width:100%;
  input {
    width: 185px;
  }
}

/deep/.el-pagination {
  margin-top: 10px;
}

.el-form-item {
  margin-bottom: 0;
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

</style>
