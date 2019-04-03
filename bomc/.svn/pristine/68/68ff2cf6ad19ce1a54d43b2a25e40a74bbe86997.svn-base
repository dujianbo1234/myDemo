<template>
  <div class="agent-setting-container">
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="agentSettingForm"
        size="mini"
      >
        <el-form-item>
          <el-select
            v-model="agentSettingForm.procDefId"
            clearable
            @focus="selectFocus"
            placeholder="工单类型"
          >
            <el-option
              v-for="(item,index) in sheetTypeList"
              :key="index"
              :label="item.name"
              :value="item.procDefId"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select
            v-model="agentSettingForm.sortField"
            clearable
            placeholder="选择时间筛选条件"
          >
            <el-option
              label="代理开始时间"
              value="start_time"
            ></el-option>
            <el-option
              label="代理结束时间"
              value="end_time"
            ></el-option>
            <el-option
              label="代理创建时间"
              value="create_time"
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
            @click="queryAgentSettingData(true)"
          >查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="addAgent"
          >新增代理人</el-button>
          <el-button
            type="danger"
            @click="batchDelete"
          >批量删除</el-button>
        </el-form-item>

      </el-form>
    </el-card>

    <el-card class="box-card">

      <el-table
        :data="agentSettingData"
        v-loading="agentSettingDataLoading"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>

        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="procDefName"
          label="工单类型"
          width="130"
        >
        </el-table-column>

        <el-table-column
          align="center"
          label="被代理人"
          prop="userId"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{scope.row.userInfo.realName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="代理人"
          prop="agentId"
          width="120"
        >
          <template slot-scope="scope">
            <span>{{scope.row.agentInfo.realName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="startTime"
          label="代理开始时间"
        >
          <template slot-scope="scope">
            <span>{{scope.row.startTime | time}}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="endTime"
          label="代理结束时间"
        >
          <template slot-scope="scope">
            <span>{{scope.row.endTime | time}}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="createTime"
          label="代理创建时间"
        >
          <template slot-scope="scope">
            <span>{{scope.row.createTime | time}}</span>
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
              @click="editAgentSetting(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAgentSetting(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-dialog
        :title="isEdit ? '修改代理人设置' : '新增工单代理人设置'"
        :visible.sync="dialogVisible"
        width="35%"
        custom-class="create-agentSetting-form"
        :close-on-click-modal="false"
        @close="close"
      > 
        <el-form
          size="mini"
          :model="createAgentSettingForm"
          :rules="rules"
          ref="createAgentSettingForm"
          label-position="right"
          label-width="120px"
        >
          <el-form-item
            label="流程类别："
            prop="procDefId"
          >
            <el-select
              v-model="createAgentSettingForm.procDefId"
              clearable
              @focus="selectFocus"
              placeholder="工单类型"
            >
              <el-option
                v-for="(item,index) in sheetTypeList"
                :key="index"
                :label="item.name"
                :value="item.procDefId"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            label="被代理人："
            prop="userId"
          >
            <el-cascader
              :options="nextNodeDealManList"
              placeholder="选择被代理人"
              v-model="createAgentSettingForm.userId"
              :show-all-levels="false"
              filterable
            >
            </el-cascader>
          </el-form-item>

          <el-form-item
            label="代理人："
            prop="agentId"
          >
            <el-cascader
              :options="nextNodeDealManList"
              placeholder="选择代理人"
              v-model="createAgentSettingForm.agentId"
              :show-all-levels="false"
              filterable
            >
            </el-cascader>
          </el-form-item>

          <el-form-item
            label="代理开始时间："
            prop="startTime"
          >
            <el-date-picker
              type="date"
              placeholder="开始时间"
              :clearable="false"
              v-model="createAgentSettingForm.startTime"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              style="width: 100%;"
              format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>

          <el-form-item
            label="代理结束时间："
            prop="endTime"
          >
            <el-date-picker
              type="date"
              placeholder="结束时间"
              :clearable="false"
              v-model="createAgentSettingForm.endTime"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="confirmCreateAgent('createAgentSettingForm')"
            >{{isEdit ? "确认修改" : "创建"}} </el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>

      <el-pagination
        class="pagination"
        v-if="agentSettingDataTotal > 10"
        :current-page.sync="agentSettingDataPagination.start"
        :page-size.sync="agentSettingDataPagination.limit"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="queryAgentSettingData"
        @size-change="queryAgentSettingData"
        :total="agentSettingDataTotal"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import * as service from "@/modules/oms/api/oms/dailyOperationManage/agentSetting";

import * as publicService from "@/modules/oms/api/oms/oms.js";

import * as eventFormService from "@/modules/oms/api/oms/eventForm";

import moment from "moment";

const pagination = {
  start: 1,
  limit: 10
};

export default {
  name: "agentSetting",
  data() {
    return {
      agentSettingForm: {
        // 查询字段
        procDefId: "",
        sortField: ""
      },

      longTime: {
        startTime: "",
        endTime: ""
      },

      sheetTypeList: [], // 工单类型

      agentSettingData: [], // 代理人数据
      agentSettingDataPagination: {
        // table 分页参数
        ...pagination
      },
      agentSettingDataLoading: false, // table loading
      agentSettingDataTotal: 0, // table 分页总数

      selectData: {}, // 查看详情数据源

      dialogVisible: false, // 模态框是否显示

      createAgentSettingForm: {
        // 新增代理人 form
        procDefId: "",
        userId: [],
        agentId: [],
        startTime: "",
        endTime: ""
      },

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },

      nextNodeDealManList: [], // 获取用户

      multipleSelection: [], // table 多选框选中的数据

      isEdit: false, // 是否处理编辑状态

      rules: {
        procDefId: [
          { required: true, message: "请选择流程类别", trigger: "change" }
        ],
        userId: [
          { required: true, message: "请选择被代理人", trigger: "change" }
        ],
        agentId: [
          { required: true, message: "请选择代理人", trigger: "change" }
        ],
        startTime: [
          { required: true, message: "请选择代理开始时间", trigger: "change" }
        ],
        endTime: [
          { required: true, message: "请选择代理结束时间", trigger: "change" }
        ]
      }
    };
  },

  mounted() {
    this.queryAgentSettingData();
  },
  methods: {
    queryAgentSettingData(isClick) {
      if (isClick === true) {
        this.agentSettingDataPagination = { ...pagination };
      }

      // 查询代理人数据
      const agentSettingDataPagination = this.agentSettingDataPagination;

      const params = Object.assign({}, this.agentSettingForm, {
        ...agentSettingDataPagination,
        start:
          (agentSettingDataPagination.start - 1) *
          agentSettingDataPagination.limit
      });

      const { startTime, endTime } = this.longTime;

      const interval = ["-"];

      if (startTime) {
        interval.splice(
          0,
          0,
          new Date(startTime + " 00:00:00").getTime() / 1000
        );
      }

      if (endTime) {
        interval.push(new Date(endTime + " 23:59:59").getTime() / 1000);
      }

      if (interval.length > 1) {
        params.interval = interval.join("");
      }

      if (interval != "-" && params.sortField == "") {
        this.agentSettingData = [];
        this.agentSettingDataTotal = 0;
        return this.$message.error("请先选择时间筛选条件！");
      }

      this.agentSettingDataLoading = true;

      // 查询代理人数据
      service.queryAgentSettingData(params).then(res => {
        const { count, result } = res;

        const userArray = result
          .map(item => item.userId)
          .concat(result.map(item => item.agentId));
        
        // 获取用户详细信息并关联
        if (!userArray.length) {
          this.agentSettingData = [];
          this.agentSettingDataTotal = 0;
          return (this.agentSettingDataLoading = false);
        }

        eventFormService
          .queryUser({
            userIds: userArray.toString()
          })
          .then(response => {
            response.result.forEach(userItem => {
              result.forEach((resultItem, i) => {
                if (resultItem.agentId == userItem.userId) {
                  resultItem.agentInfo = userItem;
                }

                if (resultItem.userId == userItem.userId) {
                  resultItem.userInfo = userItem;
                }
              });
            });

            this.agentSettingData = result;

            this.agentSettingDataTotal = count;

            this.agentSettingDataLoading = false;
          });
      });
    },
    selectFocus() {
      // 工单类型下拉框获取焦点，拉取数据
      // 查询工单类型
      if (!this.sheetTypeList.length) {
        publicService.queryType().then(res => {
          this.sheetTypeList = res;
        });
      }
    },
    close() {
      // 监听 dialog 关闭事件
      // 清空数据
      this.isEdit = false;
      this.createAgentSettingForm = {};
      this.$refs.createAgentSettingForm.resetFields();
    },
    editAgentSetting(row) {
      // 显示dialog
      if (!this.nextNodeDealManList.length) {
        this.queryNextNodeDealMan();
      }

      this.selectFocus();

      this.dialogVisible = true;

      this.selectData = row;

      this.isEdit = true;

      this.createAgentSettingForm = { ...row };

      const getReal = num => -num / 10000;

      this.createAgentSettingForm.agentId = this.createAgentSettingForm.agentDepartment.split(
        ","
      );

      this.createAgentSettingForm.userId = this.createAgentSettingForm.userDepartment.split(
        ","
      );
    },
    deleteAgentSetting(id) {
      const isBatchDelete = Array.isArray(id);
      this.$confirm(
        `此操作将${isBatchDelete ? "批量" : ""}删除${
          isBatchDelete ? "" : "此条"
        }代理人设置, 是否继续?`,
        "删除代理人设置",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        }
      )
        .then(() => {
          this.deleteData(id);
        })
        .catch(() => {});
    },
    deleteData(id) {
      service.deleteAgentSettingData({ id: id.toString() }).then(res => {
        this.$message.success("删除成功");
        this.queryAgentSettingData();
      });
    },
    formatTimes() {},
    confirmCreateAgent(formName) {
      // 确认 新增代理人
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { ...data } = this.createAgentSettingForm;

          let { procDefId, startTime, endTime } = data;

          const getTime = date =>
            new Date(moment(date).format("YYYY-MM-DD")).getTime();
          
          if (getTime(startTime) >= getTime(endTime)) {
            return this.$message.error("代理开始时间必须小于代理结束时间！");
          }

          if (startTime.endsWith(".0")) {
            data.startTime = moment(startTime).format("YYYY-MM-DD HH:mm:ss");
          } else if (!startTime.endsWith("00:00")) {
            data.startTime = startTime + " 00:00:00";
          }

          if (endTime.endsWith(".0")) {
            data.endTime = moment(endTime).format("YYYY-MM-DD HH:mm:ss");
          } else if (!endTime.endsWith("59:59")) {
            data.endTime = endTime + " 23:59:59";
          }

          data.userDepartment = data.userId.join(",");

          data.agentDepartment = data.agentId.join(",");

          data.agentId = data.agentId.slice(-1)[0] / -10000;

          data.userId = data.userId.slice(-1)[0] / -10000;
          
          if (data.agentId === data.userId) {
            return this.$message.error("被代理人与代理人不能是同一人！");
          }
  
          const id = data.id;

          data = JSON.stringify(data);

          if (this.isEdit) {
            service
              .updateAgentSetting(id, data)
              .then(res => {
                this.$message.success("修改成功");

                this.dialogVisible = false;

                this.queryAgentSettingData();

                this.$refs.createAgentSettingForm.resetFields();
              })
              .catch(e => {
                return this.$message.error(e.response.data.message);
              });
          } else {
            service
              .addAgentSetting(data)
              .then(res => {
                this.$message.success("添加成功");

                this.dialogVisible = false;

                this.queryAgentSettingData();

                this.$refs.createAgentSettingForm.resetFields();
              })
              .catch(e => {
                return this.$message.error(e.response.data.message);
              });
          }
        } else {
          return false;
        }
      });
    },
    queryNextNodeDealMan() {
      eventFormService.serarchNextNodeDealMan({}).then(res => {
        let deep = function(arr) {
          arr.forEach(item => {
            item.value = item.object.deptId;
            item.label = item.object.deptName;
            if (item.children) {
              deep(item.children);
            }
          });
        };
        deep(res);
        this.nextNodeDealManList = res;
      });
    },
    addAgent() {
      // 新增代理人
      this.queryNextNodeDealMan();
      this.dialogVisible = true;
    },
    batchDelete() {
      // 批量删除
      const multipleSelection = this.multipleSelection;

      if (!multipleSelection.length) {
        return this.$message.error("请先选中要删除的代理人设置");
      }

      const idArray = multipleSelection.map(item => item.id);

      this.deleteAgentSetting(idArray);

      // this.deleteData(idArray.toString());
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="scss">
.agent-setting-container {
  padding: 16px;

  .create-agentSetting-form {
    .el-dialog__body {
      .el-form-item {
        margin-bottom: 16px;
      }

      .el-select {
        width: 100%;
      }

      .el-cascader--mini {
        width: 100%;
      }
    }
  }

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
    margin-right: 12px;
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