<template>
  <div class="process-monitoring">
    <el-tabs
      v-model="processTabActive"
      type="card"
      @tab-click="handleTabClick"
    >
      <!-- 流程部署 -->
      <el-tab-pane
        label="流程部署"
        name="queryDeploy"
      >
        <el-card class="box-card">
          <el-form
            :inline="true"
            :model="deployForm"
          >

            <el-form-item>
              <el-input
                v-model="deployForm.id"
                clearable
                placeholder="请输入部署ID"
                @keyup.enter.native="queryDeploy(true)"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="deployForm.nameLike"
                clearable
                placeholder="请输入部署名字"
                @keyup.enter.native="queryDeploy(true)"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="queryDeploy(true)"
              >搜索</el-button>
            </el-form-item>

          </el-form>
        </el-card>

        <el-card class="box-card">
          <el-table
            :data="deployData"
            v-loading="deployDataLoading"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >

            <!-- <el-table-column
              align="center"
              type="selection"
              width="55"
            >
            </el-table-column> -->

            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="50"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="id"
              label="流程部署ID"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="name"
              label="部署名称"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="deployTime"
              width="280"
              label="部署时间"
            >
              <template slot-scope="scope">
                <span>{{scope.row.deployTime | time}}</span>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              prop="key"
              label="KEY"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="version"
              label="版本"
            >
            </el-table-column>

            <el-table-column
              label="操作"
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="deployDetail(scope.row)"
                >查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deployHandleDelete(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>

          </el-table>

          <el-pagination
            class="pagination"
            v-if="deployDataTotal > 10"
            :current-page.sync="deployDataPagination.start"
            :page-size.sync="deployDataPagination.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="deployDataTotal"
            background
          >
          </el-pagination>
        </el-card>

        <el-dialog
          title="删除流程部署"
          :visible.sync="deployDeleteDialogVisible"
          width="30%"
        >
          <p class="warning-text">
            确定删除该部署流程定义以及其所关联的流程实例、历史流程实例和作业?
          </p>

          <!-- <el-select v-model="cascade" placeholder="请选择" style="width: 100%">
            <el-option label="是" :value="true">
            </el-option>
            <el-option label="否" :value="false">
            </el-option>
          </el-select> -->

          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="deployDeleteDialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="deployDeleteConfirm"
            >确定</el-button>
          </div>

        </el-dialog>

      </el-tab-pane>

      <!-- 流程定义 -->
      <el-tab-pane
        label="流程定义"
        name="queryProcessDefine"
      >

        <el-card class="box-card">
          <el-form
            :inline="true"
            :model="processDefineForm"
          >

            <el-form-item>
              <el-input
                v-model="processDefineForm.id"
                clearable
                placeholder="请输入流程定义ID"
                @keyup.enter.native="queryProcessDefine(true)"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="processDefineForm.nameLike"
                clearable
                placeholder="请输入流程定义名称"
                @keyup.enter.native="queryProcessDefine(true)"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="processDefineForm.keyLike"
                clearable
                placeholder="请输入流程定义Key"
                @keyup.enter.native="queryProcessDefine(true)"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="processDefineForm.version"
                clearable
                placeholder="请输入流程定义版本"
                @keyup.enter.native="queryProcessDefine(true)"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="queryProcessDefine(true)"
              >搜索</el-button>
            </el-form-item>

          </el-form>
        </el-card>

        <el-card class="box-card">
          <el-table
            v-loading="processDefineDataLoading"
            :data="processDefineData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <!--             
            <el-table-column
              align="center"
              type="selection"
              width="55"
            >
            </el-table-column> -->

            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="50"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="id"
              label="流程定义ID"
              width="260"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="name"
              label="流程定义名称"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="key"
              label="KEY"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="deploymentId"
              label="部署ID"
              width="130"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="version"
              label="版本"
              width="80"
            >
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              width="120"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="processDefineDetail(scope.row)"
                >查看</el-button>
                <!-- <el-button size="mini" type="danger" @click="processDefineHandleDelete(scope.row)">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            class="pagination"
            v-if="processDefineDataTotal > 10"
            :current-page.sync="pcocessDefinePagination.start"
            :page-size.sync="pcocessDefinePagination.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="processDefineDataTotal"
            background
          >
          </el-pagination>
        </el-card>

      </el-tab-pane>

      <!-- 流程实例 -->
      <el-tab-pane
        label="流程实例"
        name="queryProcessIntance"
      >

        <el-card class="box-card">
          <el-form
            :inline="true"
            :model="processIntanceForm"
          >

            <el-form-item>
              <el-select
                v-model="processIntanceForm.finished"
                @change="queryProcessIntance(true)"
                placeholder="请选择流程实例状态"
              >
                <el-option
                  label="所有"
                  value=""
                ></el-option>
                <el-option
                  label="运行中"
                  :value="false"
                ></el-option>
                <el-option
                  label="已结束"
                  :value="true"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="processIntanceForm.id"
                clearable
                placeholder="请输入流程实例ID"
                @keyup.enter.native="queryProcessIntance(true)"
              ></el-input>
            </el-form-item>
            
            <el-form-item >
              <!-- <el-date-picker
                type="date"
                placeholder="请选择流程实例截至时间"
                v-model="processIntanceForm.startedBefore"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
                format="yyyy-MM-dd"
              ></el-date-picker> -->
              <el-date-picker
                style="width: 247px"
                v-model="processIntanceForm.startedBefore"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择流程实例开始截止时间"
                default-time="23:59:59"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="queryProcessIntance(true)"
              >搜索</el-button>
            </el-form-item>

          </el-form>
        </el-card>

        <el-card class="box-card">
          <el-table
            v-loading="processIntanceDataLoading"
            :data="processIntanceData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >

            <!-- <el-table-column
              align="center"
              type="selection"
              width="55"
            >
            </el-table-column> -->

            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="50"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="id"
              label="流程实例ID"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="startTime"
              label="开始时间"
            >
              <template slot-scope="scope">
                <span>{{scope.row.startTime | time}}</span>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              prop="endTime"
              label="结束时间"
            >
              <template slot-scope="scope">
                <span>{{scope.row.endTime | time}}</span>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              prop="deploymentName"
              label="流程名称"
            >
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="processIntanceDetail(scope.row)"
                >查看</el-button>
                <!-- <el-button size="mini" type="danger" @click="processIntanceHandleDelete(scope.row)">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            class="pagination"
            v-if="processIntanceDataTotal > 10"
            :current-page.sync="processIntanceDataPagination.start"
            :page-size.sync="processIntanceDataPagination.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="processIntanceDataTotal"
            background
          >
          </el-pagination>
        </el-card>

      </el-tab-pane>

      <!-- 任务 -->
      <el-tab-pane
        label="任务"
        name="queryHistoricTaskInstance"
      >
        <el-card class="box-card">
          <el-form
            :inline="true"
            :model="historicTaskInstanceForm"
          >

            <el-form-item>
              <el-select
                v-model="historicTaskInstanceForm.finished"
                @change="queryHistoricTaskInstance(true)"
                placeholder="请选择历史任务实例状态"
              >
                <el-option
                  label="所有"
                  value=""
                ></el-option>
                <el-option
                  label="运行中"
                  :value="false"
                ></el-option>
                <el-option
                  label="已结束"
                  :value="true"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="historicTaskInstanceForm.id"
                placeholder="请输入任务ID"
                clearable
                @keyup.enter.native="queryHistoricTaskInstance(true)"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="historicTaskInstanceForm.taskNameLike"
                clearable
                placeholder="请输入任务名称"
                @keyup.enter.native="queryHistoricTaskInstance(true)"
              ></el-input>
            </el-form-item>

            <!-- <el-form-item>
              <el-input
                v-model="historicTaskInstanceForm.taskOwnerLike"
                placeholder="请输入任务所有人"
                clearable
                @keyup.enter.native="queryHistoricTaskInstance(true)"
              ></el-input>
            </el-form-item> -->

            <el-form-item>
              <el-input
                v-model="historicTaskInstanceForm.taskAssigneeLike"
                placeholder="请输入任务代理人"
                clearable
                @keyup.enter.native="queryHistoricTaskInstance(true)"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="queryHistoricTaskInstance(true)"
              >搜索</el-button>
            </el-form-item>

          </el-form>
        </el-card>

        <el-card class="box-card">
          <el-table
            :data="historicTaskInstanceData"
            v-loading="historicTaskInstanceDataLoading"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >

            <!-- <el-table-column
              align="center"
              type="selection"
              width="55"
            >
            </el-table-column> -->

            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="50"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="id"
              label="任务ID"
              width="120"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="name"
              label="任务名称"
              width="220"
            >
            </el-table-column>

            <el-table-column
              align="center"
              prop="assignee"
              label="代理人"
              width="100"
            >
              <template slot-scope="scope">
                <span>{{scope.row.assignee | filterNull}}</span>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              prop="owner"
              label="所有人"
              width="100"
            >
              <template slot-scope="scope">
                <span>{{scope.row.owner | filterNull}}</span>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              prop="startTime"
              label="开始时间"
              width="150"
            >
              <template slot-scope="scope">
                <span>{{scope.row.startTime | time}}</span>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              prop="endTime"
              label="结束时间"
              width="150"
            >
              <template slot-scope="scope">
                <span>{{scope.row.endTime | time}}</span>
              </template>
            </el-table-column>

            <el-table-column
              align="center"
              prop="priority"
              label="优先级"
              width="80"
            >
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              width="120"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="historicTaskInstanceDetail(scope.row)"
                >查看</el-button>
                <!-- <el-button size="mini" type="danger" @click="historicTaskInstanceHandleDelete(scope.row)">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            class="pagination"
            v-if="historicTaskInstanceDataTotal > 10"
            :current-page.sync="historicTaskInstanceDataPagination.start"
            :page-size.sync="historicTaskInstanceDataPagination.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="historicTaskInstanceDataTotal"
            background
          >
          </el-pagination>
        </el-card>
      </el-tab-pane>

      <!-- 作业 -->
      <el-tab-pane
        label="作业"
        name="queryJobs"
      >
        <el-card class="box-card">
          <el-form
            :inline="true"
            :model="jobsForm"
          >
            <el-card>
              <el-form>
                <el-form-item>
                  <el-date-picker
                    type="datetime"
                    placeholder="请选择开始时间"
                    v-model="jobsForm.dueBefore"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%;"
                    format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item>
                  <el-date-picker
                    type="datetime"
                    placeholder="请选择结束时间"
                    v-model="jobsForm.dueAfter"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%;"
                    format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item>
                  <el-button
                    type="primary"
                    @click="queryJobs(true)"
                  >搜索</el-button>
                </el-form-item>

              </el-form>
            </el-card>

            <el-card class="box-card">
              <el-table
                :data="jobsData"
                v-loading="jobsDataLoading"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >

                <!-- <el-table-column
                  align="center"
                  type="selection"
                  width="55"
                >
                </el-table-column> -->

                <el-table-column
                  align="center"
                  type="index"
                  label="序号"
                  width="50"
                >
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="id"
                  label="作业ID"
                >
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="dueDate"
                  label="到期时间"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.dueDate | time}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="processDefinitionId"
                  label="流程定义ID"
                >
                </el-table-column>

                <el-table-column
                  align="center"
                  prop="retries"
                  label="重试次数"
                >
                </el-table-column>

                <el-table-column
                  align="center"
                  label="异常"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row.exceptionMsg | filterNull}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="操作"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="jobsDetail(scope.row)"
                    >查看</el-button>
                    <!-- <el-button size="mini" type="danger" @click="jobsHandleDelete(scope.row)">删除</el-button> -->
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination
                class="pagination"
                v-if="jobsDataTotal > 10"
                :current-page.sync="jobsDataPagination.start"
                :page-size.sync="jobsDataPagination.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="jobsDataTotal"
                background
              >
              </el-pagination>
            </el-card>
          </el-form>
        </el-card>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import * as request from "@/modules/pms/api/pms/processMonitoring.js";

export default {
  name: "processMonitoring",
  data() {
    return {
      processTabActive: "queryDeploy", // default active

      clickTabs: [
        "queryHistoricTaskInstance",
        "queryDeploy",
        "queryProcessDefine",
        "queryProcessIntance",
        "queryJobs"
      ],

      // process define tab
      processDefineForm: {
        // process define form
        nameLike: "",
        id: "",
        keyLike: "",
        version: ""
      },
      pcocessDefinePagination: {
        // pcocess define pagination params
        limit: 10,
        start: 1
      },
      processDefineData: [], // process define data
      processDefineDataLoading: true,
      processDefineDataTotal: 0, // process define data's total

      // deploy tab
      deployForm: {
        // deploy form
        nameLike: "",
        id: ""
      },
      deployData: [],
      deployDataLoading: true,
      deployDataPagination: {
        // deploy data pagination
        start: 1,
        limit: 10
      },
      deployDataTotal: 0,
      deployDeleteDialogVisible: false,
      // cascade: false,
      deployDeleteData: {},

      // process intance tab
      processIntanceForm: {
        finished: ""
      },
      processIntanceData: [], // process intance data
      processIntanceDataLoading: true,
      processIntanceDataPagination: {
        // process intance data pagination
        start: 1,
        limit: 10
      },
      processIntanceDataTotal: 0,

      // historic task instance tab
      historicTaskInstanceForm: {
        // historic task instance form
        finished: "",
        taskNameLike: "",
        taskAssigneeLike: "",
        id: "",
        taskOwnerLike: "" // task owner
      },
      historicTaskInstanceData: [], // historic task instance data
      historicTaskInstanceDataLoading: true,
      historicTaskInstanceDataPagination: {
        // historic task instance data agination
        start: 1,
        limit: 10
      },
      historicTaskInstanceDataTotal: 0, // historic task instance data total

      // jobs tab
      jobsForm: {
        // historic task instance form
        dueBefore: "",
        dueAfter: ""
      },
      jobsData: [], // historic task instance data
      jobsDataLoading: true,
      jobsDataPagination: {
        // historic task instance data agination
        start: 1,
        limit: 10
      },
      jobsDataTotal: 0 // historic task instance data total
    };
  },
  created() {
    // hook
    // from other page to this page
    // change default tab active
    const query = this.$route.query;

    if (query && query.processTabActive) {
      this.processTabActive = query.processTabActive;
    }

    const queryArray = Object.keys(query);

    // 跳转到相应的分页
    if (queryArray.length > 1 || !query.processTabActive) {
      queryArray.forEach(item => {
        if (item !== "processTabActive") {
          const list = item.split(".");
          let result = query[item];
          if (list.length > 1) {
            let current = {};
            list.forEach((property, index) => {
              if (index === 0) {
                current = this[property];
              } else {
                if (index === list.length - 1) {
                  result = result.toString();
                  if (result) {
                    current[property] = result === "true" ? true : false;
                  }
                } else {
                  current = this[property];
                }
              }
            });
          } else {
            this[item].start = parseInt(result, 10) || 1;
          }
        }
      });
    }
  },
  mounted() {
    // fetch default activi tab data
    const { clickTabs, processTabActive } = this;

    this[processTabActive]();

    const index = clickTabs.indexOf(processTabActive);

    clickTabs.splice(index, 1);
  },
  watch: {
    pcocessDefinePagination: {
      // watch pcocess define pagination params
      handler() {
        this.queryProcessDefine();
      },
      deep: true
    },
    deployDataPagination: {
      handler() {
        // watch deploy pagination params
        this.queryDeploy();
      },
      deep: true
    },
    jobsDataPagination: {
      handler() {
        this.queryJobs();
      },
      deep: true
    },
    historicTaskInstanceDataPagination: {
      handler() {
        this.queryHistoricTaskInstance();
      },
      deep: true
    },
    processIntanceDataPagination: {
      handler() {
        this.queryProcessIntance();
      },
      deep: true
    }
  },
  methods: {
    handleTabClick(tab, event) {
      // tab handle click
      const tabName = tab.name;

      const clickTabs = this.clickTabs;

      if (clickTabs.indexOf(tabName) === -1) {
        return;
      }

      for (let i = 0, l = clickTabs.length; i < l; i++) {
        if (clickTabs[i] === tabName) {
          // fetch data
          this[tabName]();
          // remove match tabName don't fetch data
          clickTabs.splice(i, 1);

          break;
        }
      }
    },
    queryHistoricTaskInstance(bool) {
      if (bool === true) {
        this.historicTaskInstanceDataPagination.start = 1;
        // {
        //   // limit: 10,
        //   start: 1
        // }
      }

      // query historic task instance
      let params = this.historicTaskInstanceDataPagination;

      const {
        finished,
        taskNameLike,
        taskAssigneeLike,
        taskOwnerLike,
        id
      } = this.historicTaskInstanceForm;

      if (typeof finished === "boolean") {
        params = this.assign(params, { finished: finished });
      }

      if (taskNameLike.replace(/(^\s*)|(\s*$)/g, "") !== "") {
        params = this.assign(params, { taskNameLike: taskNameLike });
      }

      if (taskAssigneeLike.replace(/(^\s*)|(\s*$)/g, "") !== "") {
        params = this.assign(params, { taskAssigneeLike: taskAssigneeLike });
      }

      if (taskOwnerLike.replace(/(^\s*)|(\s*$)/g, "") !== "") {
        params = this.assign(params, { taskOwnerLike: taskOwnerLike });
      }

      if (id.replace(/(^\s*)|(\s*$)/g, "") !== "") {
        if(isNaN(parseInt(id))) {
          return this.$message.warning("任务ID只能是整数数字！")
        }

        params = this.assign(params, { id: id });
      }

      this.historicTaskInstanceDataLoading = true;

      request.queryHistoricTaskInstance(params).then(res => {
        if (res) {
          this.historicTaskInstanceData = res.result;
          this.historicTaskInstanceDataTotal = res.total;
          this.historicTaskInstanceDataLoading = false;
        }
      });
    },
    queryJobs(bool) {
      // query jobs

      if (bool === true) {
        this.jobsDataPagination.start = 1;
        // {
        //   // limit: 10,
        //   start: 1
        // }
      }

      let params = this.jobsDataPagination;

      const { dueBefore, dueAfter } = this.jobsForm;

      if (dueBefore && dueBefore.replace(/(^\s*)|(\s*$)/g, "") !== "") {
        params = this.assign(params, { dueBefore: dueBefore });
      }

      if (dueAfter && dueAfter.replace(/(^\s*)|(\s*$)/g, "") !== "") {
        params = this.assign(params, { dueAfter: dueAfter });
      }

      this.jobsDataLoading = true;

      request.queryJobs(params).then(res => {
        if (res) {
          this.jobsData = res.result;
          this.jobsDataTotal = res.total;
          this.jobsDataLoading = false;
        }
      });
    },
    queryDeploy(bool) {
      // query deploy
      if (bool === true) {
        this.deployDataPagination.start = 1;
        // {
        //   // limit: 10,
        //   start: 1
        // }
      }

      let params = { ...this.deployDataPagination };

      const deployForm = this.deployForm;

      let formatHasError = false;

      Object.keys(deployForm).forEach(item => {
        const value = deployForm[item];
        if (value.replace(/(^\s*)|(\s*$)/g, "") !== "") {
          if (item === "id" && (isNaN(value) || value.indexOf(".") > -1)) {
            formatHasError = true;
            return this.$message.warning("部署ID只能是整数数字！");
          }
          params[item] = value;
        }
      });

      if (formatHasError) {
        return;
      }

      this.deployDataLoading = true;

      request.queryDeploy(params).then(res => {
        if (res) {
          this.deployData = res.result;
          this.deployDataTotal = res.total;
          this.deployDataLoading = false;
        }
      });
    },
    queryProcessDefine(bool) {
      if (bool === true) {
        this.pcocessDefinePagination.start = 1;
        // {
        //   // limit: 10,
        //   start: 1
        // }
      }

      let { ...params } = this.pcocessDefinePagination;

      let formatHasError = false;

      const processDefineForm = this.processDefineForm;

      Object.keys(processDefineForm).forEach(item => {
        const value = processDefineForm[item];
        if (value.replace(/(^\s*)|(\s*$)/g, "") !== "") {
          if (item === "version" && (isNaN(value) || value.indexOf(".") > -1)) {
            formatHasError = true;
            return this.$message.warning("版本号只能是整数数字！");
          }
          params[item] = value;
        }
      });

      if (formatHasError) {
        return;
      }

      this.processDefineDataLoading = true;

      request
        .queryProcessDefine(params)
        .then(res => {
          if (res) {
            if (res.message) {
              this.processDefineDataLoading = false;
              return this.$message.warning(res.message);
            }
            this.processDefineData = res.result;
            this.processDefineDataTotal = res.total;
            this.processDefineDataLoading = false;
          }
        })
        .catch(err => {
          this.processDefineDataLoading = false;
        });
    },
    queryProcessIntance(bool) {
      if (bool === true) {
        this.processIntanceDataPagination.start = 1;
        //  {
        //   // limit: 10,
        //   start: 1
        // }
      }

      // query process intance

      let params = { ...this.processIntanceDataPagination };

      const { finished, id, startedBefore } = this.processIntanceForm;

      if (typeof finished === "boolean") {
        params = this.assign(params, { finished: finished });
      }
      
      if (id && id.replace(/(^\s*)|(\s*$)/g, "") !== "") {
        if(isNaN(parseInt(id))) {
          return this.$message.warning("流程实例ID只能是整数数字！")
        }
        params = this.assign(params, { id: id });
      }

      if (startedBefore && startedBefore.replace(/(^\s*)|(\s*$)/g, "") !== "") {
        params = this.assign(params, {
          startedBefore: startedBefore
        });
      }

      this.processIntanceDataLoading = true;

      request.queryProcessIntance(params).then(res => {
        if (res) {
          this.processIntanceData = res.result;
          this.processIntanceDataTotal = res.total;
          this.processIntanceDataLoading = false;
        }
      });
    },

    // detail
    deployDetail(row) {
      // deploy detail
      this.$router.push({
        name: "deployDetail",
        params: { id: row.id },
        query: { deployDataPagination: this.deployDataPagination.start }
      });
    },
    processDefineDetail(row) {
      // process define Detail
      this.$router.push({
        name: "processDefineDetail",
        params: { id: row.id },
        query: { pcocessDefinePagination: this.pcocessDefinePagination.start }
      });
    },
    processIntanceDetail(row) {
      // process intance detail
      this.$router.push({
        name: "processIntanceDetail",
        params: { id: row.id },
        query: {
          processIntanceDataPagination: this.processIntanceDataPagination.start,
          "processIntanceForm.finished": this.processIntanceForm.finished
        }
      });
    },
    jobsDetail(row) {
      // jobs Detail
      this.$router.push({
        name: "jobsDetail",
        params: { id: row.id },
        query: { jobsDataPagination: this.jobsDataPagination.start }
      });
    },
    historicTaskInstanceDetail(row) {
      // historic task instance Detail
      this.$router.push({
        name: "historicTaskInstanceDetail",
        params: { id: row.id },
        query: {
          historicTaskInstanceDataPagination: this
            .historicTaskInstanceDataPagination.start,
          "historicTaskInstanceForm.finished": this.historicTaskInstanceForm
            .finished
        }
      });
    },

    // delete handle
    deployHandleDelete(row) {
      // deploy handle delete
      this.deployDeleteDialogVisible = true;
      this.deployDeleteData = row;
    },
    deployDeleteConfirm() {
      // deploy delete confirm
      request
        .deleteDeploy(this.deployDeleteData.id, {
          cascade: true
        })
        .then(res => {
          this.$message.success("删除成功");
          this.queryDeploy();
          this.deployDeleteDialogVisible = false;
          // this.cascade = false;
        });
    },
    // processDefineHandleDelete(row) {
    //   // process define handle delete
    // },
    // processIntanceHandleDelete(row) {
    //   // process instance handle delete
    // },
    // historicTaskInstanceHandleDelete(row) {
    //   // historic tasj instance handle delete
    // },
    jobsHandleDelete(row) {
      // jobs handle delete
    },

    handleSelectionChange() {},
    assign(...params) {
      return Object.assign({}, ...params);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.process-monitoring {
  padding: 16px;

  .warning-text {
    line-height: 1.5;
    margin-bottom: 16px;
    color: #999;
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
