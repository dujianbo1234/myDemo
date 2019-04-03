  <template>
  <div class="duty-manage-container">
    <el-tabs
      v-model="activeName"
      @tab-click="tabHandleClick"
    >
      <!-- 值班人员管理 -->
      <el-tab-pane
        label="值班人员管理"
        name="dutyOfficeManage"
      >
        <el-card class="box-card">
          <el-form
            :inline="true"
            :model="dutyOfficeManageForm"
            size="mini"
          >
            <el-form-item>
              <el-cascader
                :options="organization"
                @focus="queryOrgTree"
                @change="dutyOfficeManageFormChange('dutyOfficeManageForm', 'userId', 'queryOnDuty')"
                placeholder="选择所属组织机构"
                :show-all-levels="false"
                v-model="dutyOfficeManageForm.orgId"
              ></el-cascader>
            </el-form-item>

            <el-form-item>
              <el-select
                v-model="dutyOfficeManageForm.userId"
                clearable
                filterable
                @focus="onDutySelectFocus('dutyOfficeManageForm')"
                placeholder="请选择值班人员"
              >
                <el-option
                  v-for="(item,index) in onDutyList"
                  :key="index"
                  :label="item.realName"
                  :value="item.userId"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item>
              <el-select
                v-model="dutyOfficeManageForm.status"
                clearable
                placeholder="请选择状态"
              >
                <el-option
                  label="全部"
                  value
                ></el-option>
                <el-option
                  label="启用"
                  :value="1"
                ></el-option>
                <el-option
                  label="禁用"
                  :value="0"
                ></el-option>
              </el-select>
            </el-form-item> -->

            <el-form-item>
              <el-button @click="queryOnDuty(true)">查询</el-button>

              <el-button
                type="primary"
                @click="createOnDuty"
              >新增值班人员</el-button>

              <!-- <el-button
                type="primary"
                @click="batchEnableOnduty"
              >批量启用</el-button>

              <el-button
                type="info"
                @click="batchDisableOnduty"
              >批量禁用</el-button> -->

              <el-button
                type="danger"
                @click="batchDeleteOnduty"
              >批量删除</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="box-card">
          <el-table
            :data="onDutyData"
            v-loading="onDutyDataLoading"
            tooltip-effect="dark"
            @selection-change="onDutyHandleSelectionChange"
            style="width: 100%"
          >
            <el-table-column
              type="selection"
              width="55"
            ></el-table-column>

            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>

            <el-table-column
              align="center"
              prop="orgName"
              label="所属组织机构"
            ></el-table-column>

            <el-table-column
              align="center"
              label="值班人员姓名"
              prop="realName"
              width="120"
            ></el-table-column>

            <!-- <el-table-column
              align="center"
              label="状态"
              prop="status"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="0"
                  @change="(status) => onDutyStatusHandleChange(status, scope.row)"
                ></el-switch>
              </template>
            </el-table-column> -->

            <el-table-column
              align="center"
              prop="level"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteOnDuty(scope.row.id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog
            title="新增值班人员"
            :visible.sync="addOnDutyDialogVisible"
            width="35%"
            custom-class="create-dialog-container"
            :close-on-click-modal="false"
            @close="addOnDutyDialogHandleClose"
          >
            <el-form
              size="mini"
              :model="createOnDutyForm"
              :rules="createOnDutyFormRules"
              ref="createOnDutyForm"
              label-position="right"
              label-width="120px"
            >
              <el-form-item
                label="所属组织机构："
                prop="orgId"
              >
                <el-cascader
                  @focus="queryOrgTree"
                  @change="orgChange('createOnDutyForm.userId', 'onDutyListAll', 'userId')"
                  :options="organization"
                  placeholder="选择所属组织机构"
                  :show-all-levels="false"
                  v-model="createOnDutyForm.orgId"
                ></el-cascader>
              </el-form-item>

              <el-form-item
                label="值班人员姓名："
                prop="userId"
              >
                <el-select
                  v-model="createOnDutyForm.userId"
                  @focus="onDutySelectFocus('createOnDutyForm')"
                  filterable
                  placeholder="请选择值班人员姓名"
                >
                  <el-option
                    v-for="(item,index) in onDutyListAll"
                    :key="index"
                    :label="item.realName"
                    :value="item.userId"
                  ></el-option>
                </el-select>
              </el-form-item>

              <!-- <el-form-item label="状态：">
                <el-select
                  v-model="createOnDutyForm.status"
                  disabled
                  placeholder="请选择状态"
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
              </el-form-item> -->

              <el-form-item>
                <el-button
                  type="primary"
                  @click="confirmCreateOnDuty('createOnDutyForm')"
                >保存</el-button>
                <el-button @click="addOnDutyDialogVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-pagination
            class="pagination"
            v-if="onDutyDataTotal > 10"
            :current-page.sync="onDutyDataPagination.start"
            :page-size.sync="onDutyDataPagination.limit"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="queryOnDuty"
            @size-change="queryOnDuty"
            :total="onDutyDataTotal"
            background
          ></el-pagination>
        </el-card>
      </el-tab-pane>

      <!-- 班次管理  -->
      <el-tab-pane
        label="班次管理"
        name="shiftManage"
      >
        <el-card class="box-card">
          <el-form
            :inline="true"
            :model="shiftManageForm"
            size="mini"
          >
            <el-form-item>
              <el-cascader
                :options="organization"
                @focus="queryOrgTree"
                @change="dutyOfficeManageFormChange('shiftManageForm', 'dutyName', 'queryShiftManage')"
                placeholder="选择所属组织机构"
                :show-all-levels="false"
                v-model="shiftManageForm.orgId"
              ></el-cascader>
            </el-form-item>

            <el-form-item>
              <el-select
                v-model="shiftManageForm.shiftCollectionName"
                clearable
                @focus="shiftListSelectFocus"
                placeholder="请选择班次集合名称"
              >
                <el-option
                  v-for="(item,index) in shiftManageData"
                  :key="index"
                  :label="item.shiftCollectionName"
                  :value="item.shiftCollectionName"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item>
                <el-select
                  v-model="shiftManageForm.status"
                  clearable
                  placeholder="请选择状态"
                >
                  <el-option
                    label="全部"
                    value
                  ></el-option>
                  <el-option
                    label="启用"
                    :value="1"
                  ></el-option>
                  <el-option
                    label="禁用"
                    :value="0"
                  ></el-option>
                </el-select>
              </el-form-item> -->

            <el-form-item>
              <el-button @click="queryShiftManage(true)">查询</el-button>

              <el-button
                type="primary"
                @click="createShiftManage"
              >新增班次</el-button>
              <!-- 
                <el-button
                  type="primary"
                  @click="batchEnableShiftManage"
                >批量启用</el-button>

                <el-button
                  type="info"
                  @click="batchDisableShiftManage"
                >批量禁用</el-button> -->

              <!-- <el-button
                  type="danger"
                  @click="batchDeleteShift"
                >批量删除</el-button> -->
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="box-card">
          <el-table
            :data="shiftManageData"
            v-loading="shiftManageDataLoading"
            tooltip-effect="dark"
            @selection-change="shiftHandleSelectionChange"
            style="width: 100%"
          >
            <!-- <el-table-column type="expand">
              <template slot-scope="props">
                <el-table
                  :data="dutyShiftDefinitionArray"
                  tooltip-effect="dark"
                  border
                  style="width: 100%"
                  class="dutyShift-expand-tables"
                >
                  <el-table-column
                    label="班次名称"
                    align="center"
                    prop="dutyName"
                  ></el-table-column>
                  <el-table-column
                    label="班次开始时间"
                    align="center"
                    prop="startTime"
                  ></el-table-column>
                  <el-table-column
                    label="班次结束时间"
                    align="center"
                    prop="endTime"
                  ></el-table-column>
                  <el-table-column
                    label="是否跨天"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <span>{{scope.row.isCrossDay | isCrossDay}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column> -->

            <el-table-column
              align="center"
              prop="orgName"
              label="所属组织机构"
            ></el-table-column>

            <el-table-column
              align="center"
              label="班次集合名称"
              prop="shiftCollectionName"
            ></el-table-column>

            <el-table-column
              align="center"
              label="班次数量"
              prop="count"
            >
            </el-table-column>

            <el-table-column
              align="center"
              label="班次集合开始日期"
              prop="startDate"
            ></el-table-column>

            <el-table-column
              align="center"
              label="班次集合结束日期"
              prop="endDate"
            ></el-table-column>

            <el-table-column
              align="center"
              prop="level"
              label="预览"
              width="100"
            >
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="预览班次"
                  placement="top-start"
                >
                  <span
                    class="iconfont icon-yulanxiangqing default-color"
                    @click="previewDuty(scope.row)"
                  ></span>
                </el-tooltip>
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
                  type="text"
                  @click="editShit(scope.row)"
                  v-if="isDisableDelete(scope.row.curdate, scope.row.endDate)"
                >编辑</el-button>

                <el-button
                  size="mini"
                  type="text"
                  class="danger-btn-text"
                  v-if="isDisableDelete(scope.row.curdate, scope.row.startDate, true)"
                  @click="deleteShift(scope.row.id)"
                >删除</el-button>

                <span v-if="!isDisableDelete(scope.row.curdate, scope.row.endDate) && !isDisableDelete(scope.row.curdate, scope.row.startDate, true)">--</span>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog
            title="班次详情"
            :visible.sync="dutyDetailVisible"
            width="40%"
            custom-class="duty-detail-container"
          >
            <el-table
              :data="dutyShiftDefinitionArray"
              tooltip-effect="dark"
              style="width: 100%"
              class="dutyShift-expand-tables"
            >
              <el-table-column
                label="班次名称"
                align="center"
                prop="dutyName"
              ></el-table-column>
              <el-table-column
                label="班次开始时间"
                align="center"
                prop="startTime"
              ></el-table-column>
              <el-table-column
                label="班次结束时间"
                align="center"
                prop="endTime"
              ></el-table-column>
              <el-table-column
                label="是否跨天"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.isCrossDay | isCrossDay}}</span>
                </template>
              </el-table-column>
            </el-table>

          </el-dialog>

          <el-dialog
            :title="isShiftManageEdit ? '编辑班次集合' : '新增班次集合'"
            :visible.sync="addshiftListDialogVisible"
            width="55%"
            top="9vh"
            custom-class="create-dialog-container"
            :close-on-click-modal="false"
            @close="shiftManageHandleClose"
          >
            <el-form
              size="mini"
              :model="createShiftForm"
              :rules="createShiftFormRules"
              ref="createShiftForm"
              label-position="right"
              label-width="148px"
            >

              <el-form-item
                label="所属组织机构："
                prop="orgId"
              >
                <el-cascader
                  @focus="queryOrgTree"
                  :options="organization"
                  placeholder="请选择组织机构"
                  :disabled="isShiftManageEdit"
                  :show-all-levels="false"
                  v-model="createShiftForm.orgId"
                ></el-cascader>
              </el-form-item>

              <el-form-item
                label="班次集合名称："
                prop="shiftCollectionName"
              >
                <el-input
                  v-model="createShiftForm.shiftCollectionName"
                  :disabled="isShiftManageEdit && isDisableDelete(createShiftForm.startDate, createShiftForm.curdate)"
                  placeholder="请输入班次集合名称"
                ></el-input>
              </el-form-item>

              <transition name="slide-fade">
                <el-form-item
                  label="班次集合开始日期："
                  prop="startDate"
                  v-if="createShiftForm.orgId.length"
                >
                  <el-date-picker
                    type="date"
                    placeholder="请选择开始日期"
                    v-if="!isFetchShiftData"
                    :disabled="isShiftManageEdit && isDisableDelete(createShiftForm.startDate, createShiftForm.curdate)"
                    v-model="createShiftForm.startDate"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                    :picker-options="startDatePickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </transition>

              <transition name="slide-fade">
                <el-form-item
                  label="班次集合结束日期："
                  prop="endDate"
                  v-if="createShiftForm.orgId.length"
                >
                  <el-date-picker
                    type="date"
                    placeholder="请选择结束日期"
                    v-if="!isFetchShiftData"
                    v-model="createShiftForm.endDate"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                    :picker-options="endDatePickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </transition>

              <transition name="slide-fade">
                <el-form-item
                  label="班次数量："
                  prop="count"
                  v-if="createShiftForm.orgId.length"
                >
                  <el-select
                    readonly
                    :disabled="isShiftManageEdit && isDisableDelete(createShiftForm.startDate, createShiftForm.curdate)"
                    v-model="createShiftForm.count"
                    placeholder="请选择班次数量"
                  >
                    <el-option
                      v-for="item in dutyCountsArray"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </transition>

              <el-form-item
                v-for="(item, index) in createShiftForm.dutyShiftDefinitions"
                :label="'班次' + (index+1)+'：'"
                :key="item.key"
                required
              >
                <el-row>
                  <el-col :span="8">
                    <el-form-item
                      class="nest-form-item"
                      :prop="'dutyShiftDefinitions.' + index + '.dutyName'"
                      :rules="[
                        {
                          required: true, message: '班次名称不能为空', trigger: 'blur'
                        }, {
                          pattern: /^\s*[\S].{0,19}\s*$/, message: '班次名称长度为 1 到 20 个字符', trigger: 'blur'
                        }]"
                    >
                      <el-input
                        v-model="item.dutyName"
                        :disabled="isShiftManageEdit && isDisableDelete(createShiftForm.startDate, createShiftForm.curdate)"
                        placeholder="请输入班次名称"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col
                    :span="1"
                    class="line"
                  >-</el-col>

                  <el-col :span="7">
                    <el-form-item
                      class="nest-form-item"
                      :prop="'dutyShiftDefinitions.' + index + '.startTime'"
                      :rules="[
                          { required: true, message: '班次开始时间不能为空', trigger: 'change'},
                        ]"
                    >
                      <el-time-picker
                        :editable="false"
                        value-format="HH:mm:ss"
                        :disabled="(index > 0)
                        || (isShiftManageEdit && isDisableDelete(createShiftForm.startDate, createShiftForm.curdate))"
                        :picker-options="{
                            selectableRange: '00:00:00 - 23:59:59'
                          }"
                        v-model="item.startTime"
                        placeholder="选择班次开始时间"
                      ></el-time-picker>
                    </el-form-item>
                  </el-col>

                  <el-col
                    :span="1"
                    class="line"
                  >-</el-col>

                  <el-col :span="7">
                    <el-form-item
                      class="nest-form-item"
                      :prop="'dutyShiftDefinitions.' + index + '.endTime'"
                      :rules="[
                          { required: true, message: '班次结束时间不能为空', trigger: 'change'}
                        ]"
                    >
                      <el-time-picker
                        :editable="false"
                        value-format="HH:mm:ss"
                        :disabled="(index === createShiftForm.dutyShiftDefinitions.length -1) 
                        || (isShiftManageEdit && isDisableDelete(createShiftForm.startDate, createShiftForm.curdate))"
                        :picker-options="{
                            selectableRange: '00:00:00 - 23:59:59'
                          }"
                        v-model="item.endTime"
                        placeholder="选择班次结束时间"
                      ></el-time-picker>
                    </el-form-item>
                  </el-col>

                </el-row>

              </el-form-item>

              <!-- <el-form-item
                  label="班次开始时间："
                  prop="startTime"
                >
                  <el-time-picker
                    :editable="false"
                    value-format="HH:mm:ss"
                    :picker-options="{
                      selectableRange: '00:00:00 - 23:59:59'
                    }"
                    v-model="createShiftForm.startTime"
                    placeholder="选择班次开始时间"
                  ></el-time-picker>
                </el-form-item>

                <el-form-item
                  label="班次结束时间："
                  prop="endTime"
                >
                  <el-time-picker
                    :editable="false"
                    value-format="HH:mm:ss"
                    :picker-options="{
                      selectableRange: '00:00:00 - 23:59:59'
                    }"
                    v-model="createShiftForm.endTime"
                    placeholder="选择班次结束时间"
                  ></el-time-picker>
                </el-form-item> -->

              <!-- <el-form-item label="状态：">
                  <el-select
                    readonly
                    v-model="createShiftForm.status"
                    placeholder="请选择状态"
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
                </el-form-item> -->

              <el-form-item>
                <el-button
                  type="primary"
                  @click="confirmCreateShiftForm('createShiftForm')"
                >{{isShiftManageEdit ? "确认修改" : "创建"}}</el-button>
                <el-button @click="addshiftListDialogVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-pagination
            class="pagination"
            v-if="shiftManageDataTotal > 10"
            :current-page.sync="shiftManageDataPagination.start"
            :page-size.sync="shiftManageDataPagination.limit"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="queryShiftManage"
            @size-change="queryShiftManage"
            :total="shiftManageDataTotal"
            background
          ></el-pagination>

        </el-card>
      </el-tab-pane>

      <!-- 值班计划管理 -->
      <el-tab-pane
        label="值班计划管理"
        name="dutyPlanManage"
      >
        <el-card class="box-card">
          <el-form
            :inline="true"
            :model="dutyPlanManageForm"
            size="mini"
          >
            <el-form-item>
              <el-cascader
                :options="organization"
                @focus="queryOrgTree"
                @change="dutyOfficeManageFormChange('dutyPlanManageForm', 'userId', 'queryDutyPlan', false)"
                placeholder="选择所属组织机构"
                :show-all-levels="false"
                v-model="dutyPlanManageForm.orgId"
              ></el-cascader>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="queryDutyPlan"
              >查询</el-button>
              <!-- <el-button @click="exportNullTpl">导出空模板</el-button>
              <el-button @click="exportDutyData">数据导出</el-button>
              <el-button @click="importDutyData">数据导入</el-button> -->
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="backToDay"
              >回到今天</el-button>
            </el-form-item>

            <el-form-item>
              <el-date-picker
                type="date"
                placeholder="选择其他时间"
                v-model="dutyPlanManageForm.dates"
                @change="handleChangeDates"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-form>

          <el-dialog
            title="数据导入"
            :visible.sync="importDataDialogVisible"
            width="30%"
            custom-class="add-duty-container"
          >
            <el-form
              size="mini"
              label-width="140px"
              v-if="importDataDialogVisible"
            >
              <el-upload
                class="upload-demo"
                ref="upload"
                :limit="1"
                :on-change="importDataHandleChange"
                action="https://"
                :auto-upload="false"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                >选取文件</el-button>
              </el-upload>
            </el-form>

            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="importDataDialogVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="confirmImportDutyData"
              >确 定</el-button>
            </span>
          </el-dialog>

          <el-dialog
            title="数据导出"
            :visible.sync="exportDataDialogVisible"
            width="30%"
            custom-class="add-duty-container"
          >
            <el-form
              :model="exportDataForm"
              ref="exportDataForm"
              size="mini"
              label-width="140px"
            >
              <el-form-item
                label="请选择组织机构："
                prop="orgId"
                :rules="[
                    { required: true, message: '请选择组织机构',  trigger: 'change'}
                  ]"
              >
                <el-cascader
                  :options="organization"
                  @focus="queryOrgTree"
                  placeholder="选择所属组织机构"
                  :show-all-levels="false"
                  v-model="exportDataForm.orgId"
                ></el-cascader>
              </el-form-item>

              <el-form-item
                label="请选择开始时间："
                prop="startDate"
                :rules="[
                    { required: true, message: '请选择开始时间',  trigger: 'change'}
                  ]"
              >
                <el-date-picker
                  type="date"
                  placeholder="开始时间"
                  :clearable="false"
                  v-model="exportDataForm.startDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>

              <el-form-item
                label="请选择结束时间："
                prop="endDate"
                :rules="[
                  { required: true, message: '请选择结束时间', trigger: 'change'},
                ]"
              >
                <el-date-picker
                  type="date"
                  :clearable="false"
                  placeholder="结束时间"
                  v-model="exportDataForm.endDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-form>

            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="exportDataDialogVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="confirmExportDutyData"
              >确 定</el-button>
            </span>
          </el-dialog>
        </el-card>

        <el-card
          class="box-card"
          v-if="shiftCollectionArray.length"
        >
          <el-tabs
            type="card"
            class="shift-collection-tabs"
            v-model="shiftCollectionTabActiveName"
            @tab-click="shiftCollectionTabHandleClick"
          >
            <el-tab-pane
              v-for="(item, index) in shiftCollectionArray"
              :name="item.id"
              :key="index"
              :lazy="true"
            >
              <div slot="label">
                <p class="shift-collection shift-collection-name">{{item.startDate}} ~ {{item.endDate}}</p>
                <p class="shift-collection shift-collection-time">{{item.shiftCollectionName}}</p>
              </div>
              <transition name="slide-fade">
                <table
                  class="duty-plan-table"
                  v-if="item.hasFetchData"
                >
                  <thead>
                    <tr>
                      <th
                        v-for="item in week"
                        :key="item"
                        class="plan-table-head"
                      >{{item}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="week">
                      <td class="duty-week-container">班次/日期</td>
                      <td
                        v-for="(item, index) in currentTwoWeek.slice(0, 7)"
                        :key="item.formatDateTime"
                        :class="{'is-past-day': !item.validDate || !item.isFuture}"
                      >
                        <span>{{item.formatDate}}</span>
                        <i
                          v-if="item.isFuture && item.validDate && dutyPlanManageForm.orgId"
                          @click="addDutyOffficers(index, item.formatDate)"
                          class="el-icon-circle-plus-outline add-icon"
                        ></i>
                        <span
                          class="duty-start"
                          v-if="item.isStart"
                        >开始</span>
                        <span
                          class="duty-start"
                          v-if="item.isEnd"
                        >结束</span>
                        <span
                          v-if="item.isToDay"
                          class="toDay"
                        >今</span>
                      </td>
                    </tr>

                    <tr
                      v-for="(classes) in item.dutyShiftDefinitions"
                      :key="classes.dutyName"
                    >
                      <td>
                        <p>{{classes.dutyName}}</p>
                        <span class="duty-time">（{{classes.dutyTime}}）</span>
                      </td>
                      <td
                        v-for="(officer, index) in classes.currentOfficerDuty.slice(0, 7)"
                        :key="index"
                      >
                        <p
                          class="duty-users duty-user-name"
                          :class="{'duty-user-name': officer.dutyUserName.length > 1}"
                          v-for="(users, i) in officer.dutyUserName"
                          :key="users+i"
                        >
                          <el-button
                            type="text"
                            :disabled="officer.isPast"
                            v-if="officer.dutyUserName"
                            v-html="users"
                            @click="moveShift(users, officer.formatDate, classes.dutyId)"
                          ></el-button>
                        </p>
                      </td>
                    </tr>

                    <tr class="week">
                      <td class="duty-week-container">班次/日期</td>

                      <td
                        v-for="(item, index) in currentTwoWeek.slice(7)"
                        :key="item.formatDateTime"
                        :class="{'is-past-day': !item.validDate || !item.isFuture}"
                      >
                        <span>{{item.formatDate}}</span>
                        <i
                          v-if="item.isFuture && item.validDate && dutyPlanManageForm.orgId"
                          @click="addDutyOffficers(index+7, item.formatDate)"
                          class="el-icon-circle-plus-outline add-icon"
                        ></i>
                        <span
                          class="duty-start"
                          v-if="item.isStart"
                        >开始</span>
                        <span
                          class="duty-start"
                          v-if="item.isEnd"
                        >结束</span>
                      </td>
                    </tr>

                    <tr
                      v-for="(classes, index) in item.dutyShiftDefinitions"
                      :key="classes.dutyName + index"
                    >
                      <td>
                        <p>{{classes.dutyName}}</p>
                        <span class="duty-time">（{{classes.dutyTime}}）</span>
                      </td>

                      <td
                        v-for="(officer, index) in classes.currentOfficerDuty.slice(7)"
                        :key="index"
                      >
                        <p
                          class="duty-users duty-user-name"
                          :class="{'duty-user-name': officer.dutyUserName.length > 1}"
                          v-for="(users, i) in officer.dutyUserName"
                          :key="users+i"
                        >
                          <el-button
                            type="text"
                            :disabled="officer.isPast"
                            v-if="officer.dutyUserName"
                            @click="moveShift(users, officer.formatDate, classes.dutyId)"
                            v-html="users"
                          ></el-button>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </transition>
            </el-tab-pane>
          </el-tabs>

          <el-button
            class="change-week change-week-left"
            icon="el-icon-arrow-left"
            @click="prevHalfMonth"
            circle
          ></el-button>
          <el-button
            class="change-week change-week-right"
            icon="el-icon-arrow-right"
            @click="nextHalfMonth"
            circle
          ></el-button>

          <el-dialog
            title="调班安排"
            width="30%"
            :visible.sync="moveShiftDialogVisible"
            @close="moveShiftDialogHandleClose"
            custom-class="add-duty-container"
          >
            <el-form
              :model="moveShiftForm"
              :rules="moveShiftFormRules"
              ref="moveShiftForm"
              size="mini"
              label-width="100px"
            >
              <el-form-item label="班次：">
                <el-select
                  v-model="moveShiftForm.dutyId"
                  disabled
                >
                  <el-option
                    v-for="(item,index) in resultClassesArray"
                    :key="index"
                    :label="item.dutyName"
                    :value="item.dutyId"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="调班日期：">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="moveShiftForm.dutyDate"
                  disabled
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="原值班人员：">
                <el-input
                  v-model="moveShiftForm.userName"
                  disabled
                ></el-input>
              </el-form-item>

              <el-form-item label="调班方式：">
                <el-radio-group v-model="moveShiftForm.type">
                  <el-radio
                    label="substiu"
                    @change="moveShiftFormTypeChange('substiu')"
                  >换人</el-radio>
                  <el-radio
                    label="alignment"
                    @change="moveShiftFormTypeChange('alignment')"
                  >对调</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item
                label="调班人员："
                v-if="moveShiftForm.type === 'substiu'"
                prop="dutyUserName"
              >
                <el-select
                  v-model="moveShiftForm.dutyUserName"
                  clearable
                  filterable
                  @focus="onDutyOfficersSelectFocus('substiu')"
                  placeholder="请选择值班人员"
                >
                  <el-option
                    v-for="(item,index) in addDutyOffficersList"
                    :key="index"
                    :disabled="item.realName === moveShiftForm.userName"
                    :label="item.realName"
                    :value="item.realName"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="对调日期："
                v-if="moveShiftForm.type !== 'substiu'"
                prop="smallForm.dutyDate"
                :rules="[{required: true, message: '请选择调班（对调）日期', trigger: 'change'}]"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="moveShiftForm.smallForm.dutyDate"
                  style="width: 100%;"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>

              <el-form-item
                label="对调班次："
                prop="smallForm.dutyId"
                v-if="moveShiftForm.type !== 'substiu' && moveShiftForm.smallForm.dutyDate !== undefined"
                :rules="[{required: true, message: '请选择调班（对调）班次', trigger: 'change'}]"
              >
                <el-select v-model="moveShiftForm.smallForm.dutyId">
                  <el-option
                    v-for="(item,index) in resultClassesArray"
                    :key="index"
                    :label="item.dutyName"
                    :value="item.dutyId"
                    :disabled="item.dutyId == moveShiftForm.dutyId && moveShiftForm.smallForm.dutyDate == moveShiftForm.dutyDate"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                label="对调人员："
                prop="smallForm.userName"
                v-if="moveShiftForm.type !== 'substiu' && moveShiftForm.smallForm.dutyId !== undefined"
                :rules="[{required: true, message: '请选择调班（对调）人员', trigger: 'change'}]"
              >
                <el-select
                  v-model="moveShiftForm.smallForm.userName"
                  clearable
                  filterable
                  @focus="onDutyOfficersSelectFocus('alignment')"
                  placeholder="请选择值班人员"
                >
                  <el-option
                    v-for="(item,index) in addDutyOffficersList"
                    :key="index"
                    :label="item.realName"
                    :value="item.realName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>

            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="moveShiftDialogVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="confirmMoveShift"
              >确 定</el-button>
            </span>
          </el-dialog>

          <el-dialog
            :title="`${selectDaysObj.days}排班表`"
            :visible.sync="addDutyOffficersDialogVisible"
            width="30%"
            @close="addDutyDialogHandleClose"
            custom-class="add-duty-container"
          >
            <el-form
              :model="addDutyOffficersForm"
              :rules="addDutyOffficersFormRules"
              size="mini"
              ref="addDutyOffficersForm"
              label-width="100px"
            >
              <el-form-item
                label="班次："
                prop="dutyId"
              >
                <el-radio-group v-model="addDutyOffficersForm.dutyId">
                  <el-radio
                    v-for="item in resultClassesArray"
                    :key="item.dutyId"
                    :label="item.dutyId"
                    @change="(label) => dutyIdRadioChange(label, item.currentOfficerDuty)"
                  >{{item.dutyName}}</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="原值班人员：">
                <el-tag
                  v-for="(item, index) in oldDutyOfficers"
                  :key="index"
                  size="mini"
                  @close="removeOldDutyOfficers(item, index)"
                  closable
                >{{item}}</el-tag>
              </el-form-item>

              <el-form-item
                label="添加人员："
                prop="userId"
              >
                <el-select
                  v-model="addDutyOffficersForm.userId"
                  clearable
                  filterable
                  @focus="onDutyOfficersSelectFocus('dutyOfficeManageForm')"
                  placeholder="请选择值班人员"
                >
                  <el-option
                    v-for="(item,index) in addDutyOffficersList"
                    :key="index"
                    :label="item.realName"
                    :value="item.userId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>

            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="addDutyOffficersDialogVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="confirmAddDuty"
              >确 定</el-button>
            </span>
          </el-dialog>
        </el-card>
      </el-tab-pane>

      <!-- 值班内容管理  -->
      <el-tab-pane
        label="值班内容管理"
        name="dutyContentManage"
      >
        <el-card class="box-card">
          <el-form
            :inline="true"
            :model="dutyContentForm"
            size="mini"
          >
            <el-form-item>
              <el-select
                v-model="dutyContentForm.name"
                clearable
                filterable
                @focus="dutyContentFocus"
                placeholder="请选择值班内容名称"
              >
                <el-option
                  v-for="(item,index) in dutyContentList"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button @click="queryDutyContent(true)">查询</el-button>
              <el-button
                type="primary"
                @click="createDutyContent"
              >新增值班内容</el-button>
              <el-button
                type="danger"
                @click="batchDeleteDutyContent"
              >批量删除</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="box-card">
          <el-table
            :data="dutyContentData"
            v-loading="dutyContentDataLoading"
            tooltip-effect="dark"
            @selection-change="dutyContentHandleSelectionChange"
            style="width: 100%"
          >
            <el-table-column
              type="selection"
              width="55"
            ></el-table-column>

            <el-table-column
              align="center"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>

            <el-table-column
              align="center"
              prop="name"
              label="值班内容名称"
            ></el-table-column>

            <el-table-column
              align="center"
              prop="level"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="editDutyContent(scope.row)"
                >编辑 / 查看</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteDutyContent(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog
            :title="isDutyContentEdit ? '编辑值班内容' : '新增值班内容'"
            :visible.sync="addDutyContentDialogVisible"
            width="60%"
            custom-class="create-dialog-container"
            :close-on-click-modal="false"
            @close="createDutyContentHandleClose"
          >
            <el-form
              size="mini"
              :model="createDutyContentForm"
              :rules="createDutyContentFormRules"
              ref="createDutyContentForm"
              label-position="right"
              label-width="120px"
            >
              <el-form-item
                label="值班内容名称："
                prop="name"
              >
                <el-input
                  v-model="createDutyContentForm.name"
                  :disabled="isDutyContentEdit"
                  placeholder="请输入值班内容名称"
                ></el-input>
              </el-form-item>

              <el-form-item
                v-for="(item, index) in createDutyContentForm.content"
                :label="'值班详细' + (index+1)"
                :key="item.key"
                required
              >
                <el-col :span="10">
                  <el-form-item
                    class="nest-form-item"
                    :prop="'content.' + index + '.content'"
                    :rules="[
                      {
                        required: true, message: '值班内容不能为空', trigger: 'blur'
                      }, {
                        pattern: /^\s*[\S].{0,19}\s*$/, message: '值班内容长度为 1 到 20 个字符', trigger: 'blur'
                      }]"
                  >
                    <el-input
                      v-model="item.content"
                      placeholder="请输入值班内容"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col
                  class="line"
                  :span="1"
                >-</el-col>

                <el-col :span="10">
                  <el-form-item
                    class="nest-form-item"
                    :prop="'content.' + index + '.description'"
                    :rules="[
                      { required: true, message: '值班描述内容不能为空', trigger: 'blur'},
                      {
                        pattern: /^\s*[\S].{0,29}\s*$/, message: '值班描述内容长度为 1 到 30 个字符', trigger: 'blur'
                      }
                      ]"
                  >
                    <el-input
                      v-model="item.description"
                      placeholder="请输入值班描述"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                  class="line"
                  style="text-align: right;"
                  :span="3"
                >
                  <el-button
                    :disabled="index===0"
                    @click="removeDutyConetent(index)"
                    icon="el-icon-minus"
                  ></el-button>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-button
                  v-if="!isDutyContentEdit"
                  @click="addDutyDetail()"
                >新增值班详细</el-button>
                <el-button
                  type="primary"
                  @click="confirmCreateDutyContent('createDutyContentForm')"
                >{{isDutyContentEdit ? "确认修改" : "创建"}}</el-button>
                <el-button @click="addDutyContentDialogVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-pagination
            class="pagination"
            v-if="dutyContentDataTotal > 10"
            :current-page.sync="dutyContentDataPagination.start"
            :page-size.sync="dutyContentDataPagination.limit"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="queryDutyContent"
            @size-change="queryDutyContent"
            :total="dutyContentDataTotal"
            background
          ></el-pagination>
        </el-card>
      </el-tab-pane>
      <el-tab-pane
        label="流程计划管理"
        name="processPlanManage"
      >
        <process-plan-manage></process-plan-manage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

  <script>
import * as eventFormService from "@/modules/oms/api/oms/eventForm";
import * as service from "@/modules/oms/api/oms/dailyOperationManage/dutyManage";
import processPlanManage from "./processPlanManage";
import moment from "moment";
// 有效日期
let validateArray = [];

let curdate = null;

let shiftTimeQuantums = [];

// 班次数量
const dutyCountsArray = [2, 3, 4];

export default {
  name: "dutyManage", // 值班管理
  data() {
    return {
      activeName: "processPlanManage", // 默认选中值班人员管理

      // 值班人员查询 form
      dutyOfficeManageForm: {},
      organization: [], // 组织机构 （通用）
      onDutyList: [], // 值班人员列表
      onDutyListAll: [], // 新增值班人员（还没添加的人员列表）
      addOnDutyDialogVisible: false,
      onDutyData: [], // table 数据
      onDutyDataLoading: false, // table loading
      onDutyDataTotal: 0,
      createOnDutyForm: {
        // 新增值班人员 form
        // status: 1
      },
      multipleOnDuty: [], // 多选数据集合
      onDutyDataPagination: {
        start: 1,
        limit: 10
      },
      createOnDutyFormRules: {
        // 新增值班人员 form 校验规则
        orgId: [
          { required: true, message: "请选择组织机构", trigger: "change" }
        ],
        userId: [
          { required: true, message: "请选择值班人员", trigger: "change" }
        ]
      },

      // 班次管理
      shiftManageForm: {}, // 班次 form
      dutyCountsArray: dutyCountsArray,
      shiftList: [], // 班次名称列表
      addshiftListDialogVisible: false, // 新增班次 dialog
      shiftManageData: [], // table 数据
      multipleShift: [], // 多选数据
      shiftManageDataLoading: false, // 默认 table loading
      shiftManageDataTotal: 0, //  默认 table 总数
      shiftManageDataPagination: {
        // 班次分页参数
        start: 1,
        limit: 10
      },
      isShiftManageEdit: false, // 是否是编辑状态
      isFetchShiftData: false,
      dutyShiftDefinitionArray: [], // 班次集合
      dutyDetailVisible: false,
      createShiftForm: {
        shiftCollectionName: "",
        count: undefined,
        dutyShiftDefinitions: [],
        startDate: "",
        endDate: "",
        orgId: []
      }, // 新建班次 form
      createShiftFormRules: {
        // 新建班次 form 校验规则
        shiftCollectionName: [
          { required: true, message: "请输入班次名称", trigger: "blur" },
          {
            pattern: /^\s*[\S].{0,24}\s*$/, // /^\s*[\S]{1,25}\s*$/
            message: "班次名称长度为 1 到 25 个字符",
            trigger: "blur"
          }
        ],
        endDate: [
          {
            required: true,
            message: "请选择班次集合结束日期",
            trigger: "change"
          }
        ],
        startDate: [
          {
            required: true,
            message: "请选择班次集合开始日期",
            trigger: "change"
          }
        ],
        count: [
          { required: true, message: "请选择班次数量", trigger: "change" }
        ],
        orgId: [
          { required: true, message: "请选择组织机构", trigger: "change" }
        ],
        startTime: [
          { required: true, message: "请选择班次开始时间", trigger: "change" }
        ],
        endTime: [
          { required: true, message: "请输入班次结束名称", trigger: "change" }
        ]
      },
      startDatePickerOptions: {
        // 设置disable 日期，限制有排班计划的日期
        disabledDate(time) {
          if (!curdate) {
            return true;
          }

          if (moment(time).valueOf() < moment(curdate).valueOf()) {
            return true;
          }

          // return !shiftTimeQuantums.every(item => {
          //   return (
          //     moment(time).valueOf() > moment(item[1]).valueOf()
          //   );
          // });

          return !shiftTimeQuantums.every(item => {
            return (
              moment(time).valueOf() > moment(item[1]).valueOf() ||
              moment(time).valueOf() < moment(item[0]).valueOf()
            );
          });
        }
      },
      endDatePickerOptions: {
        // 设置disable 日期，限制有排班计划的日期
        disabledDate(time) {
          if (!curdate) {
            return true;
          }

          if (moment(time).valueOf() < moment(curdate).valueOf()) {
            return true;
          }

          // return !shiftTimeQuantums.every(item => {
          //   return (
          //     moment(time).valueOf() < moment(item[0]).valueOf()
          //   );
          // });

          return !shiftTimeQuantums.every(item => {
            return (
              moment(time).valueOf() > moment(item[1]).valueOf() ||
              moment(time).valueOf() < moment(item[0]).valueOf()
            );
          });
        }
      },

      // 值班内容管理
      dutyContentForm: {
        // 值班 查询 form
      },
      selectDutyContent: {},
      dutyContentList: [], // 值班内容名称列表
      addDutyContentDialogVisible: false, // 新增班次 dialog
      dutyContentData: [], // table 数据
      multipleDutyContent: [], // 多选数据
      dutyContentDataLoading: false, // 默认 table loading
      dutyContentDataTotal: 0, //  默认 table 总数
      dutyContentDataPagination: {
        // 班次分页参数
        start: 1,
        limit: 10
      },
      isDutyContentEdit: false, // 是否是编辑状态
      createDutyContentForm: {
        // 新建班次 form
        name: "",
        content: [
          {
            content: "",
            description: "",
            key: Date.now()
          }
        ]
      },
      createDutyContentFormRules: {
        //  新建班次 form 校验规则
        name: [
          { required: true, message: "请输入值班内容名称", trigger: "blur" },
          {
            pattern: /^\s*[\S].{0,31}\s*$/,
            message: "值班内容名称长度为 1 到 32 个字符",
            trigger: "blur"
          }
        ]
      },

      // 值班计划管理
      dutyPlanManageForm: {
        // 值班计划查询 form
      },
      shiftCollectionArray: [],
      currentShiftCollectionTab: {},
      shiftCollectionTabActiveName: "", // 默认选中的 tab 页
      resultClassesArray: [], // 班次集合
      addDutyOffficersDialogVisible: false, // 新增值班人员 dialog visible
      selectDaysObj: {
        index: 0,
        days: ""
      }, // 新增值班人员的选中日期
      toDay: new Date(),
      oldDutyOfficers: [], // 原值班人员
      addDutyOffficersForm: {
        // 新增值班人员 form
      },
      moveShiftDialogVisible: false, // 调班 dialog visible
      moveShiftForm: {
        // 调班 from
        smallForm: {}
      },
      exportDataDialogVisible: false, // 导出数据 dialog
      importDataDialogVisible: false, // 导入数据 dialog
      importDataFileList: [],
      exportDataForm: {
        startDate: "",
        endDate: "",
        orgId: []
      },
      pickerOptions: {
        // 设置disable 日期，限制有排班计划的日期
        disabledDate(time) {
          if (!validateArray) {
            return true;
          }
          return (
            validateArray.indexOf(moment(time).format("YYYY-MM-DD")) === -1
          );
        }
      },
      moveShiftFormRules: {
        // 调班 from rules
        dutyUserName: [
          { required: true, message: "请选择要调班的人员", trigger: "change" }
        ]
      },
      addDutyOffficersFormRules: {
        dutyId: [{ required: true, message: "请选择班次", trigger: "change" }],
        userId: [
          { required: true, message: "请选择需要添加的人员", trigger: "change" }
        ]
      },
      addDutyOffficersList: [], // 可添加的值班人员列表
      week: [
        "星期",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      ],
      currentTwoWeek: [] //日历数组
    };
  },
  watch: {
    addProcessPlanDialogActive(val, oldVal) {
      if (val === false) {
        for (let key in this.addProcessPlanForm) {
          if (key === "orgId" || key === "reviewerIdArr") {
            this.addProcessPlanForm[key] = [];
          } else {
            this.addProcessPlanForm[key] = "";
          }
        }
        this.$refs["addProcessPlanForm"].resetFields();
      }
    },
    activeName(val) {
      if (val === "processPlanManage") {
      }
    },
    "createShiftForm.count": function(val, oldVal) {
      if (
        this.isShiftManageEdit &&
        !moment(this.createShiftForm.startDate) > moment(curdate)
      ) {
        return;
      }

      let { dutyShiftDefinitions } = this.createShiftForm;

      const diffCount = dutyShiftDefinitions.length - val;

      if (diffCount > 0) {
        dutyShiftDefinitions = dutyShiftDefinitions.splice(0, val);
      } else if (diffCount < 0) {
        dutyShiftDefinitions = dutyShiftDefinitions.concat(
          Array.from({ length: -diffCount }, (v, k) => k).map(item => {
            const contents = {};
            contents.startTime = contents.endTime = contents.dutyName = "";
            return contents;
          })
        );
      }

      this.createShiftForm.dutyShiftDefinitions = dutyShiftDefinitions;
    },
    "createShiftForm.dutyShiftDefinitions": {
      handler(val) {
        // 监听班次数量并设置从第二个班次的开始时间是从上一个班次的结束时间 +1s
        const { dutyShiftDefinitions } = this.createShiftForm;
        const dutyShiftCount = dutyShiftDefinitions.length;
        dutyShiftDefinitions.forEach((item, index) => {
          if (index > 0) {
            const lastEndTime = dutyShiftDefinitions[index - 1].endTime;
            if (lastEndTime) {
              item.startTime = moment(`2019-03-21 ${lastEndTime}`)
                .add(1, "s")
                .format("HH:mm:ss");
            }

            if (index === dutyShiftCount - 1) {
              const firstTime = dutyShiftDefinitions[0].startTime;
              if (firstTime) {
                item.endTime = moment(`2019-03-21 ${firstTime}`)
                  .subtract(1, "s")
                  .format("HH:mm:ss");
              }
            }
          }
        });
      },
      deep: true
    },
    "createShiftForm.orgId": function(val) {
      this.isFetchShiftData = true;

      service.queryDutyShift({ orgId: val.slice(-1)[0] }).then(res => {
        let { result, count } = res;
        if (result.length) {
          curdate = result[0].curdate;
          if (this.isShiftManageEdit) {
            result = result.filter(item => this.createShiftForm.id !== item.id);
          }
          shiftTimeQuantums = result.map(item => [
            item.startDate,
            item.endDate
          ]);
        } else {
          curdate = curdate === null ? new Date() : curdate;
          shiftTimeQuantums = [];
        }
        this.isFetchShiftData = false;
      });
    },
    "dutyPlanManageForm.orgId": function(val) {
      this.shiftCollectionTabActiveName = "";
    }
  },
  components: {
    processPlanManage
  },
  mounted() {
    this.getTwoWeekDays();
  },
  methods: {
    tabHandleClick() {
      // tab change事件监听
    },

    queryOrgTree() {
      // 查询组织机构
      if (!this.organization.length) {
        eventFormService.queryEventInGroup({}).then(res => {
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
    orgChange(forms, data, fieldName) {
      // 改变组织机构 id 事件监听
      // 如果已选择值班人员，则清空已选择的值班人员
      let current = {};

      const formsArray = forms.split(".");

      formsArray.forEach((item, index) => {
        if (index === 0) {
          current = this[item] || {};
        } else {
          if (index === formsArray.length - 1) {
            if (current[item]) {
              current[item] = "";
            }
          } else {
            current = current[item];
          }
        }
      });

      this[data] = [];

      // 清空已选择的人员后，清除校验
      this.$nextTick(function() {
        this.$refs[formsArray[0]].clearValidate();
      });
    },

    // 值班计划管理 methods
    backToDay() {
      // 回到今天
      this.toDay = new Date();
      this.getTwoWeekDays();
      this.queryDutyPlan();
    },
    handleChangeDates(date) {
      this.toDay = new Date(date || new Date());
      this.getTwoWeekDays();
      this.queryDutyPlan();
    },
    getTwoWeekDays() {
      // 查询两周
      const monday = this.getMonday();

      const dayArrays = []; // 两星期 days

      for (let i = 0; i < 14; i++) {
        const day = moment(monday).add(i, "days");

        const dateObj = {};

        const toDay = moment(new Date()); // 今天

        const toDayUnix = moment(toDay.format("YYYY-MM-DD")).unix();

        // 格式化一些默认数据
        dateObj.formatDate = day.format("YYYY-MM-DD");
        dateObj.formatDateTime = day.format("YYYY-MM-DD HH:mm:ss");

        // 是否是今天
        dateObj.isToDay = dateObj.formatDate === toDay.format("YYYY-MM-DD");
        // 是否已经过去了（不可编辑时用）
        dateObj.isPast = moment(dateObj.formatDate).unix() <= toDayUnix;

        // 可编辑的
        dateObj.isFuture = moment(dateObj.formatDate).unix() > toDayUnix;

        dayArrays.push(dateObj);
      }

      this.currentTwoWeek = dayArrays;
    },
    getMonday() {
      // 获取星期一
      let toDay = moment(this.toDay);

      const currentDay = toDay.day() || 7;

      return toDay.subtract(currentDay - 1, "d");
    },
    findCurrentActiveIndex(shiftCollectionArray) {
      const shiftCollectionTabActiveName = this.shiftCollectionTabActiveName;
      const currentIndex = shiftCollectionArray.findIndex(function(item) {
        return item.id === shiftCollectionTabActiveName;
      });
      return currentIndex;
    },
    prevHalfMonth() {
      // 查询上两周
      const monday = this.getMonday(); // 获取星期一

      const { startDate } = this.currentShiftCollectionTab;

      // 是否切换到上一个 tab 选项卡
      const showCheckPrevTab = this.currentTwoWeek.find(function(item) {
        return item.formatDate === startDate;
      });

      if (showCheckPrevTab) {
        const shiftCollectionArray = this.shiftCollectionArray;
        const currentIndex = this.findCurrentActiveIndex(shiftCollectionArray);

        if (currentIndex > 0) {
          const nextShiftCollection = shiftCollectionArray[currentIndex - 1];
          this.shiftCollectionTabActiveName = nextShiftCollection.id;
          this.toDay = nextShiftCollection.startDate;
        } else {
          return this.$message.warning("当前已经是第一个tab选项卡！");
        }
      } else {
        this.toDay = monday.subtract(14, "d"); // 减14天
      }

      this.getTwoWeekDays(); // 更新日历

      this.queryDutyPlan();
    },
    nextHalfMonth() {
      // 查询下两周
      const monday = this.getMonday(); // 获取星期一

      this.toDay = monday.add(14, "d"); // 加 14 天

      if (moment(this.toDay) > moment(this.currentShiftCollectionTab.endDate)) {
        const shiftCollectionArray = this.shiftCollectionArray;
        const currentIndex = this.findCurrentActiveIndex(shiftCollectionArray);

        if (currentIndex < shiftCollectionArray.length - 1) {
          const nextShiftCollection = shiftCollectionArray[currentIndex + 1];
          this.shiftCollectionTabActiveName = nextShiftCollection.id;
          this.toDay = nextShiftCollection.startDate;
        } else {
          return this.$message.warning("当前已经是最后一个tab选项卡！");
        }
      }

      this.getTwoWeekDays(); // 更新日历

      this.queryDutyPlan();
    },
    shiftCollectionTabHandleClick(tab) {
      // this.queryDutyPlan
      this.toDay = this.shiftCollectionArray.find(function(item) {
        return item.id === tab.name;
      }).startDate;
      this.getTwoWeekDays(); // 更新日历
      this.queryDutyPlan();
    },
    queryDutyPlan() {
      // 查询值班计划
      const { orgId } = this.dutyPlanManageForm;

      if (orgId && orgId.length) {
        // 组织机构 ID
        const id = orgId.slice(-1)[0];

        // 获取班次
        service.queryDutyShift({ orgId: id }).then(response => {
          const dutyShift = response.result;

          if (!dutyShift.length) {
            // 如果没有班次则清空之前的数据
            return (this.shiftCollectionArray = []);
          }

          let shiftCollectionTabActiveName = this.shiftCollectionTabActiveName;

          const currentActiveNotDeleted = dutyShift.find(item => item.id === shiftCollectionTabActiveName);

          if (!shiftCollectionTabActiveName || !currentActiveNotDeleted) {
            shiftCollectionTabActiveName = this.shiftCollectionTabActiveName =
              dutyShift[0].id;

            this.toDay = dutyShift.find(function(item) {
              return item.id === shiftCollectionTabActiveName;
            }).startDate;
            this.getTwoWeekDays(); // 更新日历
          }

          // 查询一段时间内该组织机构下的值班计划
          service
            .queryDutyPlan({
              orgId: id,
              dutyCollectionId: shiftCollectionTabActiveName,
              dutyDate: this.getMonday().format("YYYY-MM-DD"),
              days: 14
            })
            .then(res => {
              const { result } = res;

              const currentShiftCollectionTab = dutyShift.find(
                item => item.id === shiftCollectionTabActiveName
              );

              currentShiftCollectionTab.hasFetchData = true;

              this.currentShiftCollectionTab = currentShiftCollectionTab;

              const { dutyShiftDefinitions } = currentShiftCollectionTab;

              const format = date => moment(date).valueOf();

              const formateStart = format(currentShiftCollectionTab.startDate);
              const formateEnd = format(currentShiftCollectionTab.endDate);

              if (Array.isArray(dutyShiftDefinitions)) {
                dutyShiftDefinitions.forEach(classes => {
                  classes.dutyId = classes.id;

                  classes.dutyTime = classes.startTime + "-" + classes.endTime;

                  classes.currentOfficerDuty = this.currentTwoWeek.map(item => {
                    const itemFormat = format(item.formatDate);
                    if (
                      itemFormat >= formateStart &&
                      itemFormat <= formateEnd
                    ) {
                      item.validDate = true;
                      item.isStart = itemFormat == formateStart;
                      item.isEnd = itemFormat == formateEnd;
                    }

                    const currentOfficerDuty = {};

                    result.forEach(officer => {
                      if (
                        classes.id === officer.dutyId &&
                        item.formatDate === officer.dutyDate
                      ) {
                        currentOfficerDuty.formatDate = item.formatDate;
                        currentOfficerDuty.isPast = item.isPast;
                        currentOfficerDuty.dutyUserName = officer.dutyUserName.map(
                          item => {
                            if (item.length === 2) {
                              return (
                                item.slice(0, 1) + "&#12288;" + item.slice(1)
                              );
                            }
                            return item;
                          }
                        );
                      }
                    });
                    return currentOfficerDuty;
                  });
                });
              }

              this.shiftCollectionArray = dutyShift;

              this.resultClassesArray = dutyShiftDefinitions;

              // this.currentTwoWeek.forEach(item => {
              //   const itemFormat = format(item.formatDate);
              //   if (itemFormat >= formateStart && itemFormat <= formateEnd) {
              //     item.validDate = true;
              //     item.isStart = itemFormat == formateStart;
              //     item.isEnd = itemFormat == formateEnd;
              //   }
              // });

              // 将日期与值班人员绑定
              // dutyShift.forEach(classes => {
              //   classes.currentOfficerDuty = this.currentTwoWeek.map(item => {
              //     const currentOfficerDuty = {};
              //     result.forEach(officer => {
              //       if (
              //         classes.dutyId === officer.dutyId &&
              //         item.formatDate === officer.dutyDate
              //       ) {
              //         currentOfficerDuty.formatDate = item.formatDate;
              //         currentOfficerDuty.isPast = item.isPast;
              //         currentOfficerDuty.dutyUserName = officer.dutyUserName.map(
              //           item => {
              //             if (item.length === 2) {
              //               return (
              //                 item.slice(0, 1) + "&#12288;" + item.slice(1)
              //               );
              //             }
              //             return item;
              //           }
              //         );
              //       }
              //     });
              //     return currentOfficerDuty;
              //   });
              // });
            });
        });
      }
    },
    removeOldDutyOfficers(username, index) {
      // 移除原有值班人员
      const { dutyId } = this.addDutyOffficersForm;

      const params = {
        dutyId: dutyId,
        userName: username,
        dutyDate: this.selectDaysObj.days,
        orgId: this.dutyPlanManageForm.orgId.slice(-1)[0]
      };

      // 先查询后删除（后台逻辑）
      service.querySignleDutyPlan(params).then(res => {
        if (res.result.length) {
          service.deleteSignleDutyPlan(res.result[0].id).then(res => {
            this.$message.success("删除成功！");
            this.oldDutyOfficers.splice(index, 1);
            this.queryDutyPlan();
          });
        }
      });
    },
    moveShiftFormTypeChange(type) {
      if (type === "alignment") {
        const id = this.dutyPlanManageForm.orgId.slice(-1)[0];
        
        service
          .querySignleDutyPlan({
            orgId: id,
            userName: this.moveShiftForm.userName
          })
          .then(res => {
            service
              .validShiftDutyPlan({
                dutyDate: this.moveShiftForm.dutyDate,
                orgId: id,
                userId: res.result[0].userId
              })
              .then(response => {
                debugger
                validateArray = response.result;
              });
          });
      }

      this.$refs.moveShiftForm.clearValidate();
    },
    moveShift(userName, formatDate, dutyId) {
      this.moveShiftForm = {
        type: "substiu", // 默认选择换人 radio
        userName: userName.split("&#12288;").join(""),
        dutyId: dutyId,
        dutyDate: formatDate,
        smallForm: {}
      };

      this.moveShiftDialogVisible = true;
    },
    confirmMoveShift() {
      // 确认修改调班
      this.$refs.moveShiftForm.validate(async valid => {
        if (valid) {
          const params = {
            ...this.moveShiftForm,
            orgId: this.dutyPlanManageForm.orgId.slice(-1)[0]
          };

          // 先查询后修改（后台逻辑）
          service.querySignleDutyPlan(params).then(res => {
            const id = res.result[0].id; // 原值班计划id

            // 判断是否换人还是对调
            if (this.moveShiftForm.type === "substiu") {
              if (res.result.length) {
                params.dutyUserName = [params.dutyUserName];
                service
                  .moveShiftDutyPlan(id, JSON.stringify(params))
                  .then(res => {
                    this.queryDutyPlan(); // 更新数据
                    this.$message.success("调班成功！");
                    this.moveShiftDialogVisible = false;
                  })
                  .catch(e => {
                    return this.$message.error(e.response.data.message);
                  });
              }
            } else {
              service
                .querySignleDutyPlan({ ...params, ...params.smallForm })
                .then(response => {
                  if (response.result.length) {
                    service
                      .alignmentShiftDutyPlan({
                        id: id,
                        shiftId: response.result[0].id
                      })
                      .then(res => {
                        if (res && res.message) {
                          return this.$message.error(res.message);
                        }

                        this.queryDutyPlan(); // 更新数据
                        this.$message.success("调班成功！");
                        this.moveShiftDialogVisible = false;
                      })
                      .catch(e => {
                        return this.$message.error(e.response.data.message);
                      });
                  } else {
                    this.$message.error(
                      "调班失败，数据错误，请重新选择对调人员、班次或日期！"
                    );
                  }
                })
                .catch(e => {
                  return this.$message.error(e.response.data.message);
                });
            }
          });
        } else {
          return false;
        }
      });
    },
    addDutyOffficers(index, days) {
      // 添加值班人员 button 事件监听
      this.addDutyOffficersDialogVisible = true;
      // 默认选中第一个班次
      this.addDutyOffficersForm.dutyId = this.resultClassesArray[0].dutyId;
      // debugger
      const oldDutyOfficers =
        this.resultClassesArray[0].currentOfficerDuty[index].dutyUserName || [];

      this.oldDutyOfficers = oldDutyOfficers.map(item =>
        item.split("&#12288;").join("")
      );

      this.selectDaysObj = {
        index: index,
        days: days
      };
    },
    onDutyOfficersSelectFocus(formType) {
      // 下拉获取可以的添加人员

      const params = {
        orgId: this.dutyPlanManageForm.orgId.slice(-1)[0]
      };

      if (formType === "alignment") {
        const { dutyDate, dutyId } = this.moveShiftForm.smallForm;
        if (!dutyDate && !dutyId) {
          return (this.addDutyOffficersList = []);
        }
        params.dutyDate = dutyDate;
        params.dutyId = dutyId;

        return service.querySignleDutyPlan(params).then(res => {
          const { result } = res;
          result.forEach(item => {
            item.realName = item.userName;
          });
          // debugger
          this.addDutyOffficersList = result;
        });
      } else {
        params.status = 1;
        service.queryDutyOfficerByType(params).then(res => {
          const { result } = res;

          // 现有值班人员
          const oldDutyOfficers = this.oldDutyOfficers;

          // 过滤现有值班人员
          for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < oldDutyOfficers.length; j++) {
              if (result[i].realName === oldDutyOfficers[j]) {
                result.splice(i, 1);
                i--;
                break;
              }
            }
          }
          // debugger

          this.addDutyOffficersList = result;
        });
      }
    },
    exportNullTpl() {
      // 导出空模板
      if (
        !this.dutyPlanManageForm.orgId ||
        !this.dutyPlanManageForm.orgId.length > 0
      ) {
        return this.$message.warning("请选择组织机构再操作！");
      }

      const iframe = document.createElement("iframe");
      iframe.style.display = "none";

      iframe.src = `${
        eventFormService.request.defaults.baseURL
      }/oms/api/v1/duty/export?orgId=${
        this.dutyPlanManageForm.orgId.slice(-1)[0]
      }`;

      document.body.appendChild(iframe);

      const timer = setTimeout(() => {
        document.body.removeChild(iframe);
        clearTimeout(timer);
      }, 700);
    },
    importDutyData() {
      // 导入数据
      if (
        !this.dutyPlanManageForm.orgId ||
        !this.dutyPlanManageForm.orgId.length > 0
      ) {
        return this.$message.warning("请选择组织机构再操作！");
      }
      this.importDataDialogVisible = true;
    },
    exportDutyData() {
      // 导出数据
      this.exportDataDialogVisible = true;
    },
    confirmExportDutyData() {
      // 确认导出数据
      this.$refs.exportDataForm.validate(valid => {
        if (valid) {
          const { startDate, endDate, orgId } = this.exportDataForm;

          const getTime = date => new Date(date).getTime();

          if (getTime(startDate) >= getTime(endDate)) {
            return this.$message.error("开始时间应该小于结束时间！");
          }

          service
            .exportDutyData({
              startDate: startDate,
              endDate: endDate,
              orgId: orgId.slice(-1)[0]
            })
            .then(res => {
              try {
                const iframe = document.createElement("iframe");
                iframe.style.display = "none";

                iframe.src = `${
                  eventFormService.request.defaults.baseURL
                }/oms/api/v1/duty/exportByDate?orgId=${
                  orgId.slice(-1)[0]
                }&startDate=${startDate}&endDate=${endDate}`;

                document.body.appendChild(iframe);

                const timer = setTimeout(() => {
                  document.body.removeChild(iframe);
                  clearTimeout(timer);
                  this.exportDataDialogVisible = false;
                }, 700);
              } catch (e) {
                console.log(e);
              }
            })
            .catch(e => this.$message.error(e.response.data.message));
        } else {
          return false;
        }
      });
    },
    importDataHandleChange(file, fileList) {
      // 文件上传事件监听
      this.importDataFileList = file.raw;
    },
    confirmImportDutyData() {
      // 确认导出 excel 数据
      const formData = new FormData();

      // formData.append("orgId", this.dutyPlanManageForm.orgId.slice(-1)[0]);
      formData.append("file", this.importDataFileList);

      service
        .importDutyData(this.dutyPlanManageForm.orgId.slice(-1)[0], formData)
        .then(res => {
          this.$message.success("导入成功");
          this.importDataDialogVisible = false;
          this.queryDutyPlan();
        })
        .catch(e => this.$message.error(e.response.data.message));
    },
    confirmAddDuty() {
      // 确认新增值班人员
      this.$refs.addDutyOffficersForm.validate(valid => {
        // 格式校验
        if (valid) {
          // debugger
          const { userId, dutyId } = this.addDutyOffficersForm;

          const params = {
            dutyId: dutyId,
            dutyCollectionId: this.currentShiftCollectionTab.id,
            dutyDate: this.selectDaysObj.days,
            orgId: this.dutyPlanManageForm.orgId.slice(-1)[0],
            userId: userId,
            userName: this.addDutyOffficersList.find(function(item) {
              return item.userId == userId;
            }).realName
          };

          // 新增值班计划人员
          service
            .addDutyOfficersPlan(JSON.stringify(params))
            .then(res => {
              this.$message.success("新增值班人员成功！");
              this.addDutyOffficersDialogVisible = false;
              this.queryDutyPlan();
            })
            .catch(e => {
              // 该值班人员当天已有排班
              return this.$message.error(e.response.data.message);
            });
        } else {
          return false;
        }
      });
    },
    dutyIdRadioChange(label, currentOfficerDuty) {
      // 班次切换事件监听
      // 并改变原值班人员
      // debugger
      const oldDutyOfficers =
        currentOfficerDuty[this.selectDaysObj.index].dutyUserName || [];
      this.oldDutyOfficers = oldDutyOfficers.map(item =>
        item.split("&#12288;").join("")
      );
    },
    addDutyDialogHandleClose() {
      // 新增值班人员 dialog 事件监听
      // 重置表单
      this.addDutyOffficersForm = {};
      this.oldDutyOfficers = [];
      this.$refs.addDutyOffficersForm.resetFields();
    },
    moveShiftDialogHandleClose() {
      this.$refs.moveShiftForm.resetFields();
    },

    // 班次内容 methods
    queryDutyContent(isProcative) {
      // 查询班次内容
      if (isProcative === true) {
        this.dutyContentDataPagination = {
          start: 1,
          limit: 10
        };
      }

      // 分页字段
      const dutyContentDataPagination = this.dutyContentDataPagination;

      // 合并查询字段
      const params = Object.assign(
        {},
        this.dutyContentForm,
        // { orgId: this.dutyContentForm.orgId.slice(-1)[0] },
        {
          ...dutyContentDataPagination,
          start:
            (dutyContentDataPagination.start - 1) *
            dutyContentDataPagination.limit
        }
      );

      this.dutyContentDataLoading = true;

      // 查询值班内容
      service.queryDutyContent(params).then(res => {
        const { result, count } = res;

        this.dutyContentData = result;

        this.dutyContentDataTotal = count;

        this.dutyContentDataLoading = false;
      });
    },
    dutyContentFocus(isProcative) {
      // 值班内容名称下拉获取数据
      if (isProcative === true || !this.dutyContentList.length) {
        service.queryDutyContent({}).then(res => {
          this.dutyContentList = res.result;
        });
      }
    },
    addDutyDetail() {
      // 新增值班详细
      this.createDutyContentForm.content.push({
        content: "",
        description: "",
        key: Date.now()
      });
    },
    editDutyContent(row) {
      // 编辑值班内容
      this.addDutyContentDialogVisible = true;
      this.isDutyContentEdit = true;
      this.selectDutyContent = Object.assign({}, row);
      this.createDutyContentForm = Object.assign({}, row);
    },
    createDutyContent() {
      // 新增值班内容
      this.addDutyContentDialogVisible = true;
    },
    removeDutyConetent(index) {
      // 移除值班详细
      this.createDutyContentForm.content.splice(index, 1);
    },
    confirmCreateDutyContent(formName) {
      // 确认新增值班内容
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = this.createDutyContentForm;

          if (this.isDutyContentEdit) {
            service
              .updateDutyContent(
                this.selectDutyContent.name,
                JSON.stringify(params)
              )
              .then(res => {
                this.$message.success("修改成功！");
                this.addDutyContentDialogVisible = false;
                this.queryDutyContent();
              });
          } else {
            service.createDutyContent(JSON.stringify(params)).then(res => {
              if (res && res.message) {
                return this.$message.error(res.message);
              }
              this.$message.success("创建成功！");
              this.addDutyContentDialogVisible = false;
              this.queryDutyContent();
              this.dutyContentFocus(true);
            });
          }
        } else {
          return false;
        }
      });
    },
    dutyContentHandleSelectionChange(select) {
      // table checkbox 多选事件监听
      this.multipleDutyContent = select
        .map(item => item.content)
        .reduce((a, b) => a.concat(b), []);
    },
    createDutyContentHandleClose() {
      // 新增值班内容关闭 dialog 事件关闭监听
      this.createDutyContentForm = {
        content: [
          {
            content: "",
            description: "",
            key: Date.now()
          }
        ]
      };
      this.$refs.createDutyContentForm.resetFields();
      this.isDutyContentEdit = false;
    },
    batchDeleteDutyContent() {
      // 值班内容批量删除
      const multipleDutyContent = this.multipleDutyContent;
      if (!multipleDutyContent.length) {
        return this.$message.warning("请先将多选框勾选再进行批量操作！");
      }
      this.deleteDutyContent(multipleDutyContent);
    },
    deleteDutyContent(dataRow) {
      // 值班内容删除
      const isArrays = Array.isArray(dataRow);

      const describe = isArrays
        ? "此操作将批量删除选中记录, 是否继续?"
        : "此操作将删除此条记录, 是否继续?";

      const title = isArrays ? "批量删除值班内容" : "删除值班内容";

      this.$confirm(describe, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          // 删除操作
          if (isArrays) {
            // 批量操作
            const ids = dataRow.map(item => item.id);

            service.bactchDeleteDutyContent(ids.toString()).then(res => {
              this.$message.success("批量删除成功！");
              this.queryDutyContent();
            });
          } else {
            // 单个删除
            const id = dataRow.content.map(item => item.id);

            service.signleDeleteDutyContent(id.toString()).then(res => {
              this.$message.success("删除成功！");
              this.queryDutyContent();
            });
          }
        })
        .catch(() => {});
    },

    // 班次管理 methods
    isDisableDelete(curdate, endDate, hasEqual) {
      const getTime = this.getTime;
      if (!hasEqual) {
        return getTime(curdate) <= getTime(endDate);
      }
      return getTime(curdate) < getTime(endDate);
    },
    shiftListSelectFocus() {
      // 下拉班次名称获取数据
      // const { orgId } = this.shiftManageForm;
      // if (orgId && orgId.length) {
      //   service
      //     .queryDutyShift({
      //       orgId: orgId.slice(-1)[0]
      //     })
      //     .then(res => {
      //       this.shiftList = res.result;
      //     });
      // }
    },
    queryShiftManage(isProcative) {
      // 查询班次管理
      // 判断是否是主动查询还是分页查询
      if (isProcative === true) {
        this.shiftManageDataPagination = {
          start: 1,
          limit: 10
        };
      }
      // 分页字段
      const shiftManageDataPagination = this.shiftManageDataPagination;

      const { orgId } = this.shiftManageForm;

      if (orgId && orgId.length) {
        // 合并查询字段
        const params = Object.assign(
          {},
          this.shiftManageForm,
          { orgId: orgId.slice(-1)[0] },
          {
            ...shiftManageDataPagination,
            start:
              (shiftManageDataPagination.start - 1) *
              shiftManageDataPagination.limit
          }
        );

        if (params.status === "") {
          delete params.status;
        }

        this.shiftManageDataLoading = true;

        service.queryDutyShift(params).then(res => {
          const { result, count } = res;

          this.shiftManageData = result;

          if (result.length) {
            curdate = result[0].curdate;
            shiftTimeQuantums = result.map(item => [
              item.startDate,
              item.endDate
            ]);
          }

          this.shiftManageDataTotal = count;
          this.shiftManageDataLoading = false;
        });
      }
    },
    getTime(date) {
      return new Date(date).getTime();
    },
    confirmCreateShiftForm(formName) {
      // 确认新增班次
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { createShiftForm, getTime } = this;

          const params = {
            ...createShiftForm,
            orgIdAll: createShiftForm.orgId,
            orgId: createShiftForm.orgId.slice(-1)[0]
          };

          // 遍历班次，判断是否跨天
          const shiftNames = params.dutyShiftDefinitions.map(item => {
            if (parseInt(item.startTime) > parseInt(item.endTime)) {
              item.isCrossDay = 1;
            } else {
              item.isCrossDay = 0;
            }
            return item.dutyName;
          });

          // debugger

          if ([...new Set(shiftNames)].length !== shiftNames.length) {
            return this.$message.error("班次名称不能重复！");
          }

          const { startDate, endDate } = params;

          if (getTime(startDate) > getTime(endDate)) {
            return this.$message.error(
              "班次集合开始日期必须小于班次集合结束日期！"
            );
          }

          // 判断是编辑还是创建
          if (this.isShiftManageEdit) {
            service
              .updateDutyShift(createShiftForm.id, JSON.stringify(params))
              .then(res => {
                if (res && res.message) {
                  return this.$message.error(res.message);
                }
                this.$message.success("修改值班成功！");
                this.addshiftListDialogVisible = false;
                this.queryShiftManage();
              });
          } else {
            // 新增
            service.createShift(params).then(res => {
              if (res && res.message) {
                return this.$message.error(res.message);
              }
              this.$message.success("新增班次成功！");
              this.addshiftListDialogVisible = false;
              this.queryShiftManage();
            });
          }
        } else {
          return false;
        }
      });
    },
    shiftStatusHandleChange(status, row) {
      // switch 开关事件监听
      row.status = Number(status);
      service
        .updateDutyShiftStatus(row.id, { status: Number(status) })
        .then(res => {
          this.$message.success("修改成功！");
        });
    },
    previewDuty(row) {
      // 预览班次
      this.dutyDetailVisible = true;
      this.dutyShiftDefinitionArray = row.dutyShiftDefinitions;
    },
    createShiftManage() {
      // 新增班次
      this.addshiftListDialogVisible = true;
    },
    batchEnableShiftManage() {
      // 批量启用班次
      const multipleShift = this.multipleShift;
      if (!multipleShift.length) {
        return this.$message.warning("请先将多选框勾选再进行批量操作！");
      }

      service
        .batchUpdateDutyShiftStatus(multipleShift.toString(), {
          status: 1
        })
        .then(res => {
          this.$message.success("批量启用班次成功！");
          this.queryShiftManage();
        });
    },
    batchDisableShiftManage() {
      // 批量禁用班次
      const multipleShift = this.multipleShift;
      if (!multipleShift.length) {
        return this.$message.warning("请先将多选框勾选再进行批量操作！");
      }

      service
        .batchUpdateDutyShiftStatus(multipleShift.toString(), {
          status: 0
        })
        .then(res => {
          this.$message.success("批量禁用班次成功！");
          this.queryShiftManage();
        });
    },
    batchDeleteShift() {
      // 班次批量删除
      const multipleShift = this.multipleShift;
      if (!multipleShift.length) {
        return this.$message.warning("请先将多选框勾选再进行批量操作！");
      }
      this.deleteShift(multipleShift);
    },
    deleteShift(id) {
      // 班次删除
      const isArrays = Array.isArray(id);

      const describe = isArrays
        ? "此操作将批量删除选中记录, 是否继续?"
        : "此操作将删除此条记录, 是否继续?";
      
      const title = isArrays ? "批量删除班次" : "删除班次集合";

      this.$confirm(describe, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          // 删除操作
          if (isArrays) {
            // 批量操作
            service.batchDeleteShift(id.toString()).then(res => {
              this.$message.success("批量删除成功！");
              this.queryShiftManage();
            });
          } else {
            // 单个删除
            service.signleDeleteShift(id).then(res => {
              this.$message.success("删除成功！");
              this.queryShiftManage();
              this.queryDutyPlan();
            });
          }
        })
        .catch(() => {});
    },
    statusHandleChange(status, row) {
      // table switch 开关事件监听
    },
    shiftHandleSelectionChange(select) {
      // table checkbox 多选事件监听
      this.multipleShift = select.map(item => item.id);
    },
    editShit(row) {
      // 编辑班次管理
      this.isShiftManageEdit = true;
      this.addshiftListDialogVisible = true;
      this.createShiftForm = {
        ...row,
        orgId: this.shiftManageForm.orgId
      };
    },
    shiftManageHandleClose() {
      // 新增班次 dialog 关闭事件监听
      this.isShiftManageEdit = false;
      this.$refs.createShiftForm.resetFields();
      this.createShiftForm = {
        shiftCollectionName: "",
        count: undefined,
        dutyShiftDefinitions: [],
        startDate: "",
        endDate: "",
        orgId: []
      };
    },

    // 值班人员 methods
    onDutySelectFocus(formName) {
      // 下拉获取值班人员列表
      const { orgId } = this[formName];
      
      if (orgId && orgId.length && orgId != '') {
        if (formName === "createOnDutyForm") {
          // 新增值班人员
          service.queryUserByOrgId({ orgId: orgId.slice(-1)[0] }).then(res => {
            const { result } = res;

            // 获取 orgId 对应的所有的人员，并在结果中过滤
            service
              .queryDutyOfficerByType({ orgId: orgId.slice(-1)[0] })
              .then(response => {
                const onDutyUserList = response.result;
                // 过滤已经添加到值班人员表的人员
                for (let i = 0; i < result.length; i++) {
                  for (let j = 0; j < onDutyUserList.length; j++) {
                    if (result[i].userId == onDutyUserList[j].userId) {
                      result.splice(i, 1);
                      i--;
                      break;
                    }
                  }
                }
                this.onDutyListAll = result;
              });
          });
        } else {
          service
            .queryDutyOfficerByType({ orgId: orgId.slice(-1)[0] })
            .then(res => {
              this.onDutyList = res.result;
            });
        }
      } else {
        this.onDutyList = [];
      }
    },
    dutyOfficeManageFormChange(formName, resetFields, queryMethod, isReset) {
      const form = this[formName];
      if (form.orgId && form.orgId.length) {
        // 监听组织机构值改变，清空已选择的值班人员
        const resetFieldsObj = {};
        resetFieldsObj[resetFields] = "";
        this[formName] = { ...form, ...resetFieldsObj };
        // 更新数据
        if (isReset === false) {
          this[queryMethod]();
        } else {
          this[queryMethod](true);
        }
      }
    },
    queryOnDuty(isProcative) {
      // 查询值班人员
      // 判断是否是主动查询还是分页查询
      if (isProcative === true) {
        this.shiftManageDataPagination = {
          start: 1,
          limit: 10
        };
      }

      const { orgId } = this.dutyOfficeManageForm;

      if (orgId && orgId.length) {
        // 分页字段
        const onDutyDataPagination = this.onDutyDataPagination;

        // 合并查询字段
        const params = Object.assign(
          {},
          this.dutyOfficeManageForm,
          { orgId: orgId.slice(-1)[0] },
          {
            ...onDutyDataPagination,
            start: (onDutyDataPagination.start - 1) * onDutyDataPagination.limit
          }
        );

        this.onDutyDataLoading = true;

        service.queryDutyOfficerByType(params).then(res => {
          const { result, count } = res;

          this.onDutyData = result;
          this.onDutyDataTotal = count;

          this.onDutyDataLoading = false;
        });
      }
    },
    onDutyStatusHandleChange(status, row) {
      // switch 开关事件监听
      row.status = Number(status);
      service.updateDutyStatus(row.id, { status: Number(status) }).then(res => {
        this.$message.success("修改成功！");
      });
    },
    createOnDuty() {
      // 新增值班人员
      this.addOnDutyDialogVisible = true;
    },
    batchEnableOnduty() {
      // 值班人员批量启用
      const multipleOnDuty = this.multipleOnDuty;
      if (!multipleOnDuty.length) {
        return this.$message.warning("请先将多选框勾选再进行批量操作！");
      }

      service
        .batchUpdateDutyStatus(multipleOnDuty.toString(), {
          status: 1
        })
        .then(res => {
          this.$message.success("批量启用成功！");
          this.queryOnDuty();
        });
    },
    batchDisableOnduty() {
      // 值班人员批量禁用
      const multipleOnDuty = this.multipleOnDuty;
      if (!multipleOnDuty.length) {
        return this.$message.warning("请先将多选框勾选再进行批量操作！");
      }

      service
        .batchUpdateDutyStatus(multipleOnDuty.toString(), {
          status: 0
        })
        .then(res => {
          this.$message.success("批量禁用成功！");
          this.queryOnDuty();
        });
    },
    batchDeleteOnduty() {
      // 值班人员批量删除
      const multipleOnDuty = this.multipleOnDuty;
      if (!multipleOnDuty.length) {
        return this.$message.warning("请先将多选框勾选再进行批量操作！");
      }
      this.deleteOnDuty(multipleOnDuty);
    },
    addOnDutyDialogHandleClose() {
      // 新增值班人员 dialog 关闭事件监听
      // 将 form 重置
      // this.createOnDutyForm = { status: 1 };
      this.$refs.createOnDutyForm.resetFields();
    },
    confirmCreateOnDuty(formName) {
      // 确定新增值班人员
      this.$refs[formName].validate(valid => {
        if (valid) {
          const createOnDutyForm = this.createOnDutyForm;
          const realName = this.onDutyListAll.filter(
            item => item.userId === createOnDutyForm.userId
          )[0].realName;

          service
            .createDuty({
              userId: createOnDutyForm.userId,
              realName: realName,
              orgId: createOnDutyForm.orgId.slice(-1)[0]
            })
            .then(res => {
              this.$message.success("新增值班人员成功！");
              this.onDutyListAll = [];
              this.addOnDutyDialogVisible = false;
              this.queryOnDuty();
            });
        } else {
          return false;
        }
      });
    },
    deleteOnDuty(id) {
      // 删除值班人员
      const isArrays = Array.isArray(id);

      const describe = isArrays
        ? "此操作将批量删除选中记录, 是否继续?"
        : "此操作将删除此条记录, 是否继续?";

      const title = isArrays ? "批量删除值班人员" : "删除值班人员";

      this.$confirm(describe, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          // 删除操作
          if (isArrays) {
            // 批量操作
            service.batchDutyDelete(id.toString()).then(res => {
              this.$message.success("批量删除成功！");
              this.queryOnDuty();
            });
          } else {
            // 单个删除
            service.signleDutyDelete(id).then(res => {
              this.$message.success("删除成功！");
              this.queryOnDuty();
            });
          }
        })
        .catch(() => {});
    },
    onDutyHandleSelectionChange(select) {
      // 值班人员管理 table CheckBox 多选事件监听
      this.multipleOnDuty = select.map(item => item.id);
    }
  }
};
</script>

  <style lang="scss">
.duty-manage-container {
  padding: 16px;

  // .dutyShift-expand-tables {
  //   .el-table__header-wrapper {
  //     th {
  //       background-color: #f4f8f9 !important;
  //       .cell {
  //         font-weight: normal;
  //         color: #42B983;
  //       }
  //     }
  //   }
  //   .el-table__body-wrapper {
  //     tr {
  //       background-color: #f4f8f9 !important;
  //     }
  //   }
  // }

  .el-table__header-wrapper {
    th {
      background: #f4f8f9 !important;
    }
  }

  .duty-detail-container {
    .el-dialog__body {
      padding: 10px 20px 20px 20px;
    }
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

  .date-picker-info {
    margin-top: 0;
  }

  .el-card__body {
    position: relative;
    .el-form-item {
      margin-bottom: 0;
    }
  }

  .change-week {
    position: absolute;
    top: 50%;
    margin-top: -18px;
    background: rgba(31, 45, 61, 0.14);
    color: #fff;
    border: none;
    z-index: 99;
  }

  .el-tag {
    margin-right: 8px;
  }

  .change-week-right {
    right: 20px;
  }

  .change-week:hover {
    background: rgba(0, 0, 0, 0.25);
    border: none;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

  .shift-collection {
    line-height: 1;
    position: relative;
    text-align: center;
  }

  .shift-collection-name {
    top: 6px;
  }

  .el-tabs__item.is-active {
    .shift-collection-time {
      color: #42b983;
    }
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #eee;
  }

  .el-tabs__item:hover {
    .shift-collection-time {
      color: #42b983;
      transition: all 0.3s;
    }
  }

  .shift-collection-time {
    font-size: 12px;
    top: 12px;
    color: #999;
  }

  .add-duty-container {
    .el-form-item {
      margin-bottom: 18px;
    }
    .el-select {
      width: 100%;
    }
    .el-cascader {
      width: 100%;
    }
  }

  .shift-collection-tabs {
    .el-tabs__item {
      height: 44px;
      line-height: 44px;
    }
  }

  .duty-plan-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0px;
    table-layout: fixed;

    th,
    td {
      border: 1px solid #ebeef5;
      text-align: center;
      // white-space: nowrap;
      padding: 12px 0;
      vertical-align: middle;
      position: relative;
      font-size: 14px;
      overflow: hidden;
    }

    .plan-table-head {
      color: #909399;
      font-weight: 700;
    }

    // .is-today {
    //   // background-color: #93a3ff;
    //   // color: #fff;
    // }

    .duty-time {
      font-size: 12px;
      color: #626ca9;
      display: block;
      margin-top: 8px;
    }

    .is-past-day {
      color: rgb(177, 177, 177);
    }

    .add-icon {
      color: #333;
      transition: all 0.3s;
      cursor: pointer;
    }

    .duty-user-name {
      width: 50%;
      display: inline-block;
    }

    .duty-users {
      float: left;
    }

    .add-icon:hover {
      color: #111;
      font-weight: 700;
    }

    .duty-start {
      position: absolute;
      left: 0;
      top: 0;
      font-size: 12px;
      background-color: rgb(38, 122, 231);
      color: #fff;
    }

    .toDay {
      position: absolute;
      right: 3px;
      top: 3px;
      width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      border-radius: 100%;
      background-color: rgb(38, 122, 231);
      font-size: 12px;
      color: #fff;
    }
  }

  .create-dialog-container {
    .el-dialog__body {
      .el-form-item {
        margin-bottom: 16px;
      }
      .nest-form-item {
        margin-bottom: 0;
      }
      .el-select {
        width: 100%;
      }
      .el-cascader--mini {
        width: 100%;
      }
      .line {
        text-align: center;
      }
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 100%;
      }
    }
  }
}
.addForm {
  padding: 0 30px;
}
.duty-manage-container {
  .oms-select {
    //自定义elementui下拉框的样式
    width: 100%;
    .el-input__inner {
      width: 100%;
    }
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>