<template>
  <div class="myNeedDeal app-container">
    <div class="condition">
      <el-card class="box-card">
        <el-form :inline="true" size="small" label-width="70px">
          <el-form-item label="工单类型">
            <el-select v-model="name" placeholder="请选择工单类型" clearable size="small">
              <el-option v-for="(item,index) in sheetTypeList" :key="index" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>
          <el-form-item label="版本号">
            <el-select v-model="version" placeholder="请选择版本号" clearable size="small">
              <el-option v-for="item in versions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData(true)">查询</el-button>
            <!-- <el-button type="primary" @click="addData">添加</el-button> -->
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="box-card">
        <el-table :data="listData" class="tableArea" style="width: 100%" tooltip-effect="dark">
          <el-table-column type="index" label="序号" align="center" width="80" />
          <el-table-column prop="procDefCategory" align="center" label="工单类型" width="150" />
          <el-table-column prop="version" align="center" label="版本号" width="80" />
          <el-table-column prop="taskKey" align="center" label="任务标识" width="200" show-overflow-tooltip/>
          <el-table-column prop="taskDefName" align="center" label="环节名称" width="200" show-overflow-tooltip/>
          <el-table-column prop="url" align="center" label="路径" show-overflow-tooltip/>
          <el-table-column label="操作" width="130" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
                <i class="el-icon-edit-outline" @click="modify(scope)" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                <i class="el-icon-delete" @click="deleteData(scope)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        
        <el-pagination class="pagination" v-if="listDataTotal > 10" :current-page.sync="listDataPagination.start" :page-size.sync="listDataPagination.limit" layout="total, sizes, prev, pager, next, jumper" @current-change="queryData" @size-change="queryData" :total="listDataTotal" background></el-pagination>

      </el-card>

      <!-- 修改模态框 -->
      <el-dialog :visible.sync="modifyDialogVisible" title="修改taskKey" width="30%">
        <el-form :model="modifyRuleForm" :rules="modifyRules" ref="modifyRuleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="taskKey：">
            <el-input v-model="modifyRuleForm.modifyTaskKey" placeholder="请输入taskKey" disabled></el-input>
          </el-form-item>
          <el-form-item label="templateUrl：" prop="modifyTemplateUrl">
            <el-input v-model="modifyRuleForm.modifyTemplateUrl" placeholder="请输入templateUrl"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="modifyCancel()">取 消</el-button>
          <el-button type="primary" @click="modifyCommit('modifyRuleForm')">确 定</el-button>
        </span>
      </el-dialog>

      <!--添加taskKey模态框-->
      <el-dialog :visible.sync="addDialogVisible" title="添加taskKey" width="33%">
        <el-form :model="addRuleForm" :rules="addRules" ref="addRuleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="工单类型：" prop="addTaskKey">
            <el-select v-model="addRuleForm.addProcDefId" placeholder="请选择" clearable>
              <el-option v-for="(item,index) in sheetTypeList" :key="index" :label="item.name" :value="item.procDefId" />
            </el-select>
          </el-form-item>
          <el-form-item label="taskKey：" prop="addTaskKey">
            <el-input v-model="addRuleForm.addTaskKey" placeholder="请输入taskKey"></el-input>
          </el-form-item>
          <el-form-item label="templateUrl：" prop="addTemplateUrl">
            <el-input v-model="addRuleForm.addTemplateUrl" placeholder="请输入templateUrl"></el-input>
          </el-form-item>
          <el-form-item label="是否创建页：" prop>
            <el-select v-model="addRuleForm.isStart" placeholder="请选择" clearable>
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCancel()">取 消</el-button>
          <el-button type="primary" @click="addCommit('addRuleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as publicService from "@/modules/oms/api/oms/oms.js";
import * as service from "@/modules/oms/api/oms/sysManage/pageManage";

export default {
  name: "MyNeedDeal",
  data() {
    return {
      name: "", // 工单类型
      version: "", // 版本号
      versions: [], // 版本号数组

      modifyRuleForm: {
        modifyProcDefId: "",
        modifyTaskKey: "",
        modifyTemplateUrl: ""
      },
      modifyRules: {
        modifyTaskKey: [
          {
            required: true,
            message: "taskKey不能为空",
            trigger: "blur"
          },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ],
        modifyTemplateUrl: [
          {
            required: true,
            message: "templateUrl不能为空",
            trigger: "blur"
          },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ]
      },
      addRuleForm: {
        addProcDefId: "",
        addTaskKey: "",
        addTemplateUrl: "",
        isStart: ""
      },
      addRules: {
        addTaskKey: [
          {
            required: true,
            message: "taskKey不能为空",
            trigger: "blur"
          },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ],
        addTemplateUrl: [
          {
            required: true,
            message: "templateUrl不能为空",
            trigger: "blur"
          },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ]
      },

      modifyDialogVisible: false, // 模态框的显示状态
      addDialogVisible: false, // 添加模态框的显示状态
      category: "",
      rowList: [],
      spanArr: [],
      position: 0,
      allList: [],
      sheetTypeList: [],
      sheetTypeListObject: {},
      listDataPagination: {
        start: 1,
        limit: 10
      },
      listDataTotal: 0,
      listData: [],
      sheetTitle: "",
      sheetNumber: "",
      totalCount: "", // 总条数
      currentPage: 1, // 当前页
      pageSize: 10 // 每页条数
    };
  },
  watch: {
    name: function(val) {
      this.queryVersion(val)
    }
  },
  mounted() {
    // 查询工单类型
    if (this.sheetTypeList.length === 0) {
      service.queryTypes({
        isIncomplete: false
      }).then(res => {

        const { result } = res;

        const allSheetTypeList = [];

        const listArray = [];

        const listObj = {};

        result.forEach(item => {
          if (!allSheetTypeList.includes(item.name)) {
            const listObject = {};
            listObject.name = item.name;
            listObject.procDefId = item.procDefId;
            listArray.push(listObject);
            allSheetTypeList.push(item.name);
            listObj[item.name] = [item.version];
          } else {
            listObj[item.name].push(item.version);
          }
        });

        this.sheetTypeList = listArray;
        this.sheetTypeListObject = listObj;

        this.allList = result;
      });
    }
  },
  methods: {
    queryData(isClick) {
      // 查询对应流程定义 ID的信息
      if (isClick === true) {
        this.listDataPagination = {
          start: 1,
          limit: 10
        }
      }

      const { start, limit } = this.listDataPagination;

      const currentSelect = this.allList.find(item => {
        return item.version === this.version && item.name === this.name
      });

      if (!currentSelect) {
        return this.$message.error("请选择工单类型以及版本号！")
      }

      const params = Object.assign({}, {
        procDefId: currentSelect.procDefId,
        limit: limit,
        start: (start - 1) * limit
      });

      service
        .queryData(params)
        .then(res => {
          this.listData = res.result;
          this.listDataTotal = res.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    queryVersion(val) { // 查询版本号
      if (val === '') {
        this.versions = []
      } else {
        this.versions = this.sheetTypeListObject[val];
      }

      this.version = '';

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
    rowspan() {
      this.listData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1);
          this.position = 0;
        } else {
          if (this.listData[index].type === this.listData[index - 1].type) {
            this.spanArr[this.position] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.position = index;
          }
        }
      });
    },
    addData() {
      // 页面添加按钮
      this.addDialogVisible = true;
    },
    addCommit(formName) {
      // 添加 确定
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            procDefCategory: "",
            procDefId: this.addRuleForm.addProcDefId,
            taskKey: this.addRuleForm.addTaskKey,
            url: this.addRuleForm.addTemplateUrl,
            isStart: this.addRuleForm.isStart
          };

          service.addData(params).then(res => {
            // 添加操作完成，清空输入框的数据
            this.addRuleForm.addProcDefId = "";
            this.addRuleForm.addTaskKey = "";
            this.addRuleForm.addTemplateUrl = "";
            this.addDialogVisible = false;
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.queryData();
          });
        } else {
          return false;
        }
      });
    },
    addCancel() {
      // 添加 取消
      this.add_taskKey = "";
      this.add_templateUrl = "";
      this.addDialogVisible = false;
      this.$message({
        type: "info",
        message: "取消添加!"
      });
    },
    modify(scope) {
      // 修改按钮
      this.modifyDialogVisible = true;
      this.modifyRuleForm.modifyTaskKey = scope.row.taskKey;
      this.modifyRuleForm.modifyTemplateUrl = scope.row.url;
      this.modifyRuleForm.modifyProcDefId = scope.row.procDefId;
      this.modifyRuleForm.row = scope.row;
    },
    modifyCommit(formName) {
      // 修改确认按钮
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            // id: this.modifyRuleForm.row.id,
            ...this.modifyRuleForm.row,
            // taskKey: this.modifyRuleForm.modifyTaskKey,
            url: this.modifyRuleForm.modifyTemplateUrl
          };
          service.modifyData(params).then(res => {
            this.queryData();
            this.modifyDialogVisible = false;
            this.$message({
              type: "success",
              message: "修改成功!"
            });
          });
        } else {
          return false;
        }
      });
    },
    modifyCancel() {
      // 取消修改
      this.modifyDialogVisible = false;
      this.modifyRuleForm.modifyProcDefId = "";
      this.$message({
        type: "info",
        message: "取消修改!"
      });
    },
    modifyDialogClose() {
      // 修改模态框关闭按钮
      this.$confirm("确认关闭？")
        .then(_ => {
          this.modifyDialogVisible = false;
          this.$message({
            type: "info",
            message: "取消修改!"
          });
        })
        .catch(_ => { });
    },
    deleteData(scope) {
      var rowId = scope.row.id;
      this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const params = {
            taskKey: scope.row.taskKey
          };
          service.deleteData(params).then(res => {
            console.log(res);
            this.queryData();
            this.$message({
              type: "success",
              message: "删除成功！"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 表格合并行
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }

      if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    }
  }
};
</script>
<style lang="scss">
.myNeedDeal {
  .el-select {
    width: 100%;
  }
  .el-form {
    .el-input {
      width: 260px;
    }
  }
  .box-card {
    margin: 8px 0 16px 0;
  }
  .el-card__body {
    .el-form-item {
      margin-bottom: 0;
    }
  }
  i[class^="el-icon"] {
    margin-right: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  .item_title {
    text-align: right;
  }
  .el-form-item__label {
    text-align: right;
  }
}
</style>

