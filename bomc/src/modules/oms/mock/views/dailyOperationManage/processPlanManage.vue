<template>
  <div class="processPlanManage">
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="queryForm"
        size="small"
        label-width="100px"
      >
        <el-form-item label="所属组织机构">
          <el-cascader
            @focus="this.queryOrgTree"
            :options="organization"
            placeholder="选择所属组织机构"
            v-model="queryForm.orgId"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="任务名称">
          <el-select
            v-model="queryForm.taskName"
            placeholder="请选择任务名称"
            @focus="queryTaskName"
          >
            <el-option
              v-for="(item,index) in taskNameOptions"
              :key="index"
              :label="item.taskName"
              :value="item.taskName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="queryProcessPlan"
          >查询</el-button>
          <el-button
            @click="resetProcessPlan"
            class="operate-btn-color"
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
          <el-form-item label="任务类型">
            <el-select
              v-model="queryForm.taskType"
              placeholder="请选择任务类型"
            >
              <el-option
                label="值班报告"
                value="值班报告"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-row class="btnGroup">
        <el-button
          size="small"
          type="primary"
          @click="addProcessPlan"
        >新增流程计划管理</el-button>
        <el-button
          size="small"
          type="danger"
          @click="deleteMore"
        >批量删除</el-button>
      </el-row>
      <el-table
        :data="ProcessPlanData"
        @selection-change="selectChange"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="taskName"
          label="任务名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="taskType"
          label="任务类型"
        ></el-table-column>
        <el-table-column label="所属组织">
          <template slot-scope="scope">
            <div>
              <el-cascader
                v-show="false"
                :ref="scope.row.refOrgIndex"
                class="oms-select"
                :options="organization"
                placeholder="选择所属组织机构"
                v-model="scope.row.orgId"
              ></el-cascader>
              <span>{{ scope.row.processPlanOrgIdName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="reviewerId"
          label="审核人"
        >
          <template slot-scope="scope">
            <div>
              <el-cascader
                v-show="false"
                :ref="scope.row.refNameIndex"
                class="oms-select"
                :options="reviewerList"
                v-model="scope.row.reviewerId"
              ></el-cascader>
              <span>{{ scope.row.reviewerName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="firstTriggerTime"
          label="触发时间"
          width="180px"
        ></el-table-column>
        <el-table-column
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              <svg-icon
                class="iconStatus"
                icon-class="statusStart"
                v-show="scope.row.status===1"
              />
              <svg-icon
                class="iconStatus"
                icon-class="statusEnd"
                v-show="scope.row.status===0"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="任务操作"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="点击启用"
                placement="top-start"
              >
                <span
                  class="iconfont iconColor"
                  v-show="scope.row.status===0"
                  @click="statusChange(scope.row)"
                >&#xe603;</span>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="点击停用"
                placement="top-start"
              >
                <span
                  class="iconfont iconColor"
                  v-show="scope.row.status===1"
                  @click="statusChange(scope.row)"
                >&#xe60a;</span>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作"
          width="180px"
        >
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                size="small"
                @click="seeHistory(scope.row)"
              >查看历史</el-button>
              <el-button
                type="text"
                size="small"
                @click="planEdit(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="planDelete(scope.row)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        v-if="totalCount!==0"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,25,50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>

      <div v-show="false">
        <!-- 用户表格中所属组织机构的显示， -->
        <el-cascader
          class="oms-select"
          :options="organization"
          @focus="queryOrgTree"
          placeholder="选择所属组织机构"
          v-model="addForm.orgIdArr"
        ></el-cascader>

        <!-- 用户表格中审核人的显示， -->
        <el-cascader
          class="oms-select"
          @focus="queryReviewer"
          :options="reviewerList"
          :label="reviewerName"
          v-model="addForm.reviewerIdArr"
        ></el-cascader>
      </div>
    </el-card>

    <!-- Dialog 新增流程计划管理 -->
    <el-dialog
      :title="title"
      :visible.sync="addDialogActive"
      width="60%"
    >
      <el-form
        class="addForm"
        :model="addForm"
        size="small"
        :rules="rules"
        ref="addForm"
        label-width="120px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="任务名称"
              prop="taskName"
            >
              <el-input
                v-model="addForm.taskName"
                placeholder="请填写"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="任务类型"
              prop="taskType"
            >
              <el-select
                class="oms-select"
                v-model="addForm.taskType"
              >
                <el-option
                  label="值班报告"
                  value="值班报告"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="所属组织"
              prop="orgIdArr"
            >
              <el-cascader
                ref="addOrgId"
                class="oms-select"
                :options="organization"
                :show-all-levels="false"
                @focus="queryOrgTree"
                @change="orgTreeChange"
                placeholder="选择所属组织机构"
                v-model="addForm.orgIdArr"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="任务状态"
              prop="status"
            >
              <el-select
                class="oms-select"
                v-model="addForm.status"
              >
                <el-option
                  label="启用"
                  :value="1"
                ></el-option>
                <el-option
                  label="禁用"
                  :value="0"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="第一次触发时间"
              prop="firstTriggerTime"
            >
              <el-date-picker
                class="oms-select"
                v-model="addForm.firstTriggerTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="值班内容设定"
              prop="dutyContentName"
            >
              <el-select
                class="oms-select"
                @focus="dutyContentFocus"
                v-model="addForm.dutyContentName"
              >
                <el-option
                  v-for="(item,index) in dutyContentList"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="交班时间"
              prop="handoverTime"
            >
              <el-time-picker
                value-format="HH:mm:ss"
                v-model="addForm.handoverTime"
                :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
                placeholder="任意时间点"
              >
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="接班时长"
              prop="successionTime"
            >
              <el-input
                v-model.number="addForm.successionTime"
                style="width: 88%;"
              ></el-input>分钟
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="是否跨天"
              prop="isCrossDays"
            >
              <el-select
                class="oms-select"
                v-model="addForm.isCrossDays"
              >
                <el-option
                  label="是"
                  :value="0"
                ></el-option>
                <el-option
                  label="否"
                  :value="1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="审核人"
              prop="reviewerIdArr"
            >
              <el-cascader
                class="oms-select"
                @focus="queryReviewer"
                :options="reviewerList"
                :show-all-levels="false"
                v-model="addForm.reviewerIdArr"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="班次集合"
              prop="shiftCollectionId"
            >
              <el-select
                class="oms-select"
                v-model="addForm.shiftCollectionId"
              >
                <el-option
                  v-for="(item,index) in dutyArr"
                  :key="index"
                  :label="item.shiftCollectionName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="值班班次"
              prop="onDutyShift"
            >
              <el-select
                class="oms-select"
                v-model="addForm.onDutyShift"
              >
                <el-option
                  v-for="(item,index) in dutyTimeList"
                  :key="index"
                  :label="item.dutyName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="接班班次"
              prop="successionDutyShift"
            >
              <el-select
                class="oms-select"
                v-model="addForm.successionDutyShift"
                :disabled="true"
              >
                <el-option
                  v-for="(item,index) in dutyTimeList"
                  :key="index"
                  :label="item.dutyName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item
            label="任务详情描述"
            prop="description"
          >
            <el-input
              type="textarea"
              v-model="addForm.description"
            ></el-input>
          </el-form-item>
        </el-row>

        <el-row style="text-align: center;">
          <el-button
            type="info"
            size="small"
            @click="cancelCommit"
          >取消</el-button>
          <el-button
            v-if="title==='新增流程计划'"
            type="primary"
            size="small"
            @click="addCommit('addForm')"
          >提交</el-button>
          <el-button
            v-if="title==='修改流程计划'"
            type="primary"
            size="small"
            @click="modifyCommit('addForm')"
          >修改</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog
      title="查看历史触发记录"
      :visible.sync="historyDialog"
    >
      <el-table :data="historyData">
        <el-table-column
          property="workListId"
          label="工单编号"
          width="200"
        ></el-table-column>
        <el-table-column
          property="createTime"
          label="创建时间"
          width="200"
        ></el-table-column>
        <el-table-column label="结果">
          <template slot-scope="scope">
            <div>
              {{scope.row.result?"成功":"失败"}}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          v-if="hisTotalCount>0"
          small
          @size-change="hisSizeChange"
          @current-change="hisCurrentChange"
          :current-page="hisCurrentPage"
          :page-sizes="[5,10,20,50,100]"
          :page-size="hisPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="hisTotalCount"
        >
        </el-pagination>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import * as service from "@/modules/oms/api/oms/dailyOperationManage/dutyManage";
import * as eventFormService from "@/modules/oms/api/oms/eventForm";
import _ from "lodash";
import { Promise } from "q";

export default {
  name: "processPlanManage",
  data() {
    return {
      userId: "", //用户id
      procInstId: "", // 流程实例id
      procDefId: "", //流程定义id
      taskId: "", // 环节id

      showMoreQueryField: false, // 更多查询条件
      addDialogActive: false,
      organization: [], // 所属组织机构[]
      taskNameOptions: [], //任务名称 []
      getDutyArr: [], // 接班班次

      queryForm: {
        orgId: [], // 所属组织机构
        taskName: "", // 任务名称
        taskType: "" // 任务类型
      },
      reviewerList: [], // 审核人列表
      reviewerName: "", //
      ProcessPlanData: [], // 流程计划表格数据
      dutyContentList: [], // 值班内容名称列表
      dutyArr: [], // 班次集合
      dutyTimeList: [], // 值班班次
      historyId: "", // 点击查看历史这一行对应的id

      currentPage: 1,
      pageSize: 10,
      totalCount: 0,

      historyDialog: false,
      historyData: [], // 历史触发记录
      hisCurrentPage: 1,
      hisPageSize: 10,
      hisTotalCount: 0,

      processPlanOrgIdName: "",
      delIds: "", //

      title: "",

      addForm: {
        // 添加表单数据
        taskName: "",
        taskType: "",
        orgId: "",
        orgName: "",
        orgIdArr: [],
        status: "",
        firstTriggerTime: "",
        dutyContentName: "",
        handoverTime: "",
        successionTime: "",
        isCrossDays: "",
        reviewerIdArr: [],
        reviewerId: "",
        shiftCollectionId: "",
        onDutyShift: "",
        successionDutyShift: "",
        description: "",
        nextDutyObj: ""
      },

      rules: {
        // 添加表单验证规则
        taskName: [
          { required: true, min: 1, max: 80, message: "请填写任务名称,1-80个字符", trigger: "blur" }
        ],
        taskType: [
          { required: true, message: "请选择任务类型", trigger: "change" }
        ],
        orgIdArr: [
          { required: true, message: "请选择所属组织", trigger: "change" }
        ],
        status: [
          { required: true, message: "请选择任务状态", trigger: "change" }
        ],
        firstTriggerTime: [
          { required: true, message: "请选择第一次触发时间", trigger: "change" }
        ],
        dutyContentName: [
          { required: true, message: "请选择值班内容设定", trigger: "change" }
        ],
        handoverTime: [
          { required: true, message: "请选择交班时间", trigger: "change" }
        ],
        successionTime: [
          { required: true,type: 'number',min: 1, max: 6, message: "请填写接班时长,最大六位数字", trigger: "blur" }
        ],
        isCrossDay: [
          { required: true,  message: "请选择是否跨天", trigger: "change" }
        ],
        reviewerIdArr: [
          { required: true, message: "请选择审核人", trigger: "change" }
        ],
        shiftCollectionId: [
          { required: true, message: "请选择班次集合", trigger: "change" }
        ],
        onDutyShift: [
          { required: true, message: "请选择值班班次", trigger: "change" }
        ],
        // successionDutyShift: [
        //   { required: true, message: "请选择接班班次", trigger: "change" }
        // ],
        description: [
          {
            required: true,
            validator: this.validateDescription,
            trigger: "blur"
          }
        ]
      }
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
    "addForm.orgIdArr": function() {
      // 监听所属组织变化查询班次集合
      this.queryDutyArr();
    },

    "addForm.shiftCollectionId": function(val) {
      // 监听班次集合变化修改值班班次
      this.dutyArrToList();
    },
    "addForm.onDutyShift": async function(newVal, oldVal) {
      // 监听 值班班次 变化,根据id查找 接班班次
      if (newVal) {
        if (this.dutyArr.length === 0) {
          await this.queryDutyArr();
        }
        const dutyShiftDefinitions = this.dutyArr.find(
          item => item.id === this.addForm.shiftCollectionId
        ).dutyShiftDefinitions;

        //通过当前得值班班次查询接班班次得backward
        const nextDuty = dutyShiftDefinitions.find(item => item.id === newVal)
          .backward;

        //在值班班次中获取接班班次集合
        this.getDutyArr = dutyShiftDefinitions.filter(
          item => item.id === nextDuty
        );
        this.addForm.successionDutyShift = this.getDutyArr[0].id;
      }
    },
    addDialogActive: function(val) {
      if (val === false) {
        this.$refs["addForm"].resetFields();
        this.title = "";
        this.clearForm();
      }
    }
  },
  mounted() {
    this.queryProcessPlan();
  },
  methods: {
    queryOrgTree() {
      // 查询组织机构
      if (!this.organization.length) {
        eventFormService.queryEventInGroup({}).then(res => {
          console.log(res);
          console.log("我进来了");
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
          this.organization = res;
        });
      }
    },
    queryTaskName() {
      // 查询任务名称
      if (!this.taskNameOptions.length) {
        service.queryTaskName().then(res => {
          this.taskNameOptions = res.result;
        });
      }
    },
    // 查看历史
    seeHistory(row) {
      this.historyDialog = true;
      this.historyId = row.id;
      this.queryHistory();
    },
    queryHistory() {
      let params = {
        planId: this.historyId,
        limit: this.hisPageSize,
        start: (this.hisCurrentPage - 1) * this.hisPageSize
      };
      eventFormService.seeHistory(params).then(res => {
        this.hisTotalCount = res.count;
        this.historyData = res.result;
      });
    },
    async queryProcessPlan() {
      // 查询流程计划管理表格
      this.queryOrgTree();
      this.queryReviewer();
      let params = {
        orgId: this.queryForm.orgId.slice(2).join(","),
        taskType: this.queryForm.taskType,
        taskName: this.queryForm.taskName,
        limit: this.pageSize,
        start: (this.currentPage - 1) * this.pageSize
      };

      await service.queryProcessPlan(params).then(res => {
        res.result.forEach((item, index) => {
          item.orgId = item.orgId.split(",");
          item.reviewerId = item.reviewerId.split(",");
          item.processPlanOrgIdName = item.orgName.split(",").slice(-1)[0];
          // item.reviewerName = item.reviewer.split(",").slice(-1)[0]
        });

        // res.result.forEach((item, index) => {
        //   item.refOrgIndex = "processPlanOrgIdName" + index;
        //   item.refNameIndex = "reviewerName" + index;
        // });

        this.ProcessPlanData = res.result;
        this.totalCount = res.count;
      });
      // if (this.totalCount > 0) {
      //   setTimeout(() => {
      //     // 从级联选择器获取 表格列 所属组织和审核人
      //     this.ProcessPlanData.forEach((item, index) => {
      //       let elOrgId = this.$refs[item.refOrgIndex].currentLabels;
      //       item.processPlanOrgIdName = elOrgId[elOrgId.length - 1];

      //       let elReviewerName = this.$refs[item.refNameIndex].currentLabels;
      //       item.reviewerName = elReviewerName[elReviewerName.length - 1];
      //     });
      //   }, 10);
      // }
    },
    resetProcessPlan() {
      // 重置按钮
      this.queryForm.orgId = [];
      this.queryForm.taskName = "";
      this.queryForm.taskType = "";
    },
    addProcessPlan() {
      //新增流程计划管理
      this.addDialogActive = true;
      this.title = "新增流程计划";
    },
    cancelCommit() {
      this.addDialogActive = false;
    },
    deleteMore() {
      // 批量删除
      this.$confirm(`你确定要批量删除吗？`, "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let params = {
            ids: this.delIds
          };
          await service.deleteMore(params);
          await this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.queryProcessPlan();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    selectChange(val) {
      // 复选框选择
      let ids = [];
      val.forEach(item => {
        ids.push(item.id);
      });
      this.delIds = ids.join(",");
    },
    queryReviewer() {
      eventFormService.serarchNextNodeDealMan().then(res => {
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
        this.reviewerList = res;
      });
    },
    sizeChange(val) {
      this.pageSize = val;
      this.queryProcessPlan();
    },
    currentChange(val) {
      this.currentPage = val;
      this.queryProcessPlan();
    },
    // 获取班次集合
    queryDutyArr() {
      let params = {
        orgId: this.addForm.orgIdArr.slice(-1).join()
      };
      service.queryDutyArr(params).then(res => {
        this.dutyArr = res.result;
        if (this.title === "修改流程计划") {
          this.dutyArrToList();
        }
        console.log(this.dutyArr);
      });
    },

    dutyContentFocus(isProcative) {
      // 值班内容名称下拉获取数据
      if (!this.dutyContentList.length) {
        service.queryDutyContent({}).then(res => {
          this.dutyContentList = res.result;
        });
      }
    },

    async statusChange(row) {
      // 流程计划管理表格状态改变
      let data = {
        status: row.status === 1 ? 0 : 1
      };
      await service.statusChange(data, row.id);
      this.queryProcessPlan();
      this.$message({
        message: "修改成功！",
        type: "success"
      });
    },
    // 编辑按钮
    async planEdit(row) {
      this.queryOrgTree();
      this.queryReviewer();

      row.reviewerIdArr = row.reviewerId;
      row.orgIdArr = row.orgId;
      this.addForm.orgIdArr = row.orgIdArr;
      await this.queryDutyArr();

      this.addForm.shiftCollectionId = row.shiftCollectionId;

      this.dutyArrToList(); // 根据 班次集合 查 值班班次
      debugger;
      this.addForm = { ...this.addForm, ...row };

      // 接班班次
      this.dutyArr.forEach((item, index) => {
        if (row.successionDutyShift === item.id) {
          this.nextDutyObj.dutyName = item.dutyName;
          this.nextDutyObj.id = item.id;
        }
      });
      this.title = "修改流程计划";
      this.addDialogActive = true;
    },
    planDelete(row) {
      this.$confirm(`你确定要【${row.taskName}】吗？`, "删除列表", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await service.processPlanDelete(row.id);
          await this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.queryProcessPlan();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addCommit(formName) {
      // 新增流程计划管理提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = _.cloneDeep(this.addForm);
          params.orgId = params.orgIdArr.join(",");
          params.reviewerId = params.reviewerIdArr.join(",");
          delete params.orgIdArr;
          delete params.reviewerIdArr;

          service
            .addCommit(params)
            .then(res => {
              if (res.code === 17) {
                // 值班班次与接班班次重复
                this.$message({
                  type: "error",
                  message: `新增失败! ${res.message}`
                });
              } else {
                this.addDialogActive = false;
                this.$message({
                  type: "success",
                  message: "新增成功!"
                });
                this.queryProcessPlan();
                // this.procInstId = res.procInstId;
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "新增失败!"
              });
            });
        } else {
          return false;
        }
      });
    },
    modifyCommit() {
      // 修改流程计划管理提交
      debugger;
      let data = JSON.parse(JSON.stringify(this.addForm));
      data.orgId = data.orgIdArr.join(",");
      data.reviewerId = data.reviewerIdArr.join(",");
      delete data.orgIdArr;
      delete data.reviewerIdArr;

      let quartzData = {
        jobName: data.id,
        triggerName: data.id,
        triggerGroupName: data.id,
        cronTime: data.firstTriggerTime
      };
      let arr = [];
      let modifyQuartz = eventFormService.modifyQuartz(quartzData);
      let modifyCommit = service.modifyCommit(data, data.id);

      arr.push(modifyQuartz, modifyCommit);
      Promise.all(arr)
        .then(res => {
          if (res.length === 2) {
            this.modifyDialogActive = false;
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.queryProcessPlan();
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "修改失败!"
          });
        });
    },
    orgTreeChange(val) {
      // 新增模态框所属组织机构变化时
      this.addForm.orgName = this.$refs.addOrgId.currentLabels;
      this.addForm.orgName = this.addForm.orgName.join(",");
    },
    // 监听班次集合变化修改值班班次
    dutyArrToList() {
      this.dutyArr.forEach((item, index) => {
        if (this.addForm.shiftCollectionId === item.id) {
          this.dutyTimeList = item.dutyShiftDefinitions;
        }
      });
    },
    hisSizeChange(val) {
      this.hisPageSize = val;
      this.queryHistory();
    },
    hisCurrentChange(val) {
      this.hisCurrentPage = val;
      this.queryHistory();
    },
    // 清空ruleForm数据
    clearForm() {
      this.addForm = {
        taskName: "",
        taskType: "",
        orgId: "",
        orgName: "",
        orgIdArr: [],
        status: "",
        firstTriggerTime: "",
        dutyContentName: "",
        handoverTime: "",
        successionTime: "",
        isCrossDays: "",
        reviewerIdArr: [],
        reviewerId: "",
        shiftCollectionId: "",
        onDutyShift: "",
        successionDutyShift: "",
        description: "",
        nextDutyObj: ""
      };
    },
    validateDescription(rule, value, callback) {
      if(value===''){
        callback(new Error("请填写任务详情描述"));
      }else if (!this.getStrLenght(value, 500)) {
        callback(new Error("任务详情描述不能超过500个字符"));
      } else {
        callback();
      }
    },
    getStrLenght(message, MaxLenght) {
      var strlenght = 0; //初始定义长度为0
      var txtval;
      if (message === null || message === "" || message === undefined) {
        txtval = "";
      } else {
        txtval = message.trim();
      }
      var isCN = function(str) {
        //判断是不是中文
        var regexCh = /[u00-uff]/;
        return !regexCh.test(str);
      };
      for (var i = 0; i < txtval.length; i++) {
        if (isCN(txtval.charAt(i)) == true) {
          strlenght = strlenght + 2; //中文为2个字符
        } else {
          strlenght = strlenght + 1; //英文一个字符
        }
      }
      return strlenght > MaxLenght ? false : true;
    }
  }
};
</script>

<style lang="scss" scoped>
.more-query-field {
  margin-top: 10px;
}
.iconStatus {
  font-size: 18px;
}
.iconColor {
  font-size: 19px;
  color: rgb(59, 167, 118);
}
.btnGroup {
  margin-bottom: 10px;
}
.pagination {
  margin-top: 10px;
}
</style>