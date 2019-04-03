<template>
  <div class="work-day-manage-container">
    <el-card class="box-card">
      <el-form
        :inline="true"
        :model="workDayManageForm"
        size="mini"
      >
        <el-form-item>
          <el-select
            v-model="workDayManageForm.name"
            clearable
            filterable
            @focus="selectFocus"
            placeholder="请选择或输入日历名称"
            @change="selectHandleChange"
          >
            <el-option
              v-for="(item,index) in workDayList"
              :key="index"
              :label="item.calendarName"
              :value="item.calendarName"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="queryCalendar"
          >查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="addCalendar"
          >新增日历</el-button>
          <el-button
            type="danger"
            @click="deleteCalendar"
          >删除日历</el-button>
          <el-button
            class="operate-btn-color"
            @click="backToday"
          >回到今天</el-button>
        </el-form-item>

      </el-form>
    </el-card>

    <el-card class="box-card">

      <el-row :gutter="24">
        <el-col :span="16">
          <v-date-picker
            mode="single"
            v-model="dates"
            :available-dates='availableDate'
            :from-page.sync="fromPage"
            :formats='formats'
            :theme-styles='themeStyles'
            is-expanded
            is-inline
            is-linked
          >
          </v-date-picker>
        </el-col>

        <el-col :span="8">
          <el-card class="box-card date-picker-info">
            <div
              slot="header"
              class="clearfix"
            >
              <span>日历信息</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>

            <el-form
              label-position="right"
              label-width="150px"
              v-if="showDatePicker"
            >
              <el-form-item label="日历名称：">
                <span class="info-detail">{{currentDatePicker.calendarName}}</span>
              </el-form-item>
              <el-form-item label="默认日历：">
                <span class="info-detail">{{currentDatePicker.status | status}}</span>
              </el-form-item>
              <!-- <el-form-item label="工作日：">
                <span class="info-detail">{{currentDatePicker.workDays}}</span>
              </el-form-item> -->
              <el-form-item label="开始日期：">
                <span class="info-detail">{{currentDatePicker.startDate}}</span>
              </el-form-item>
              <el-form-item label="结束日期：">
                <span class="info-detail">{{currentDatePicker.endDate}}</span>
              </el-form-item>
              <el-form-item label="工作时间（上午）：">
                <span class="info-detail">{{currentDatePicker.morningStartTime}}-{{currentDatePicker.morningEndTime}}</span>
              </el-form-item>
              <el-form-item label="工作时间（下午）：">
                <span class="info-detail">{{currentDatePicker.afternoonStartTime}}-{{currentDatePicker.afternoonEndTime}}</span>
              </el-form-item>
              <el-form-item label="备注：">
                <span class="info-detail">{{currentDatePicker.calendarRemark | fullMsg}}</span>
              </el-form-item>
            </el-form>
            <p
              class="no-data"
              v-else
            >暂无数据</p>

          </el-card>

        </el-col>
      </el-row>

      <el-dialog
        title="日期详情"
        width="35%"
        top="10vh"
        :visible.sync="currentDayVisible"
        custom-class="create-calendar-container"
      >
        <el-form
          label-position="right"
          label-width="150px"
          :model="updateForm"
        >
          <el-form-item label="选中日期：">
            <span class="info-detail">{{currentDayObj.currentDay}}</span>
          </el-form-item>

          <el-form-item label="名称：">
            <el-select
              v-model="updateForm.name"
              placeholder="请选择日期名称"
            >
              <el-option
                label="工作日"
                value="工作日"
              ></el-option>

              <el-option
                label="非工作日"
                value="非工作日"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="类型：">
            <el-select
              v-model="updateForm.type"
              placeholder="请选择日期类型"
            >
              <el-option
                label="工作日"
                value="工作日"
              ></el-option>

              <el-option
                label="休息日"
                value="休息日"
              ></el-option>

              <el-option
                label="调休"
                value="调休"
              ></el-option>

              <el-option
                label="休假"
                value="休假"
              ></el-option>
            </el-select>

          </el-form-item>

          <!-- <el-form-item label="工作时间（上午）：">
            <span class="info-detail">{{currentDatePicker.morningStartTime}}-{{currentDatePicker.morningEndTime}}</span>
          </el-form-item>
          <el-form-item label="工作时间（下午）：">
            <span class="info-detail">{{currentDatePicker.afternoonStartTime}}-{{currentDatePicker.afternoonEndTime}}</span>
          </el-form-item> -->

          <el-form-item label="工作时间段（上午）">
            <el-col :span="11">
              <el-form-item>
                <el-time-picker
                  :clearable="false"
                  type="fixed-time"
                  format="HH:mm"
                  value-format="HH:mm"
                  placeholder="选择时间"
                  v-model="updateForm.morningStartTime"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>

            <el-col
              class="line"
              :span="2"
            >-</el-col>

            <el-col :span="11">
              <el-form-item>
                <el-time-picker
                  type="fixed-time"
                  :clearable="false"
                  placeholder="选择时间"
                  format="HH:mm"
                  value-format="HH:mm"
                  v-model="updateForm.morningEndTime"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="工作时间段（下午）">
            <el-col :span="11">
              <el-form-item>
                <el-time-picker
                  type="fixed-time"
                  :clearable="false"
                  placeholder="选择时间"
                  format="HH:mm"
                  value-format="HH:mm"
                  v-model="updateForm.afternoonStartTime"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>

            <el-col
              class="line"
              :span="2"
            >-</el-col>

            <el-col :span="11">
              <el-form-item>
                <el-time-picker
                  type="fixed-time"
                  :clearable="false"
                  placeholder="选择时间"
                  format="HH:mm"
                  value-format="HH:mm"
                  v-model="updateForm.afternoonEndTime"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input
              type="textarea"
              v-model="updateForm.remark"
              placeholder="请输入备注（限制120个字符）"
              maxlength="120"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="updateWorkDays"
            >保存</el-button>
            <el-button @click="currentDayVisible = false">取消</el-button>
          </el-form-item>

        </el-form>
      </el-dialog>

      <el-dialog
        title="新增日历"
        :visible.sync="dialogVisible"
        width="50%"
        top="10vh"
        :close-on-click-modal="false"
        @close="close"
        custom-class="create-calendar-container"
      >
        <el-form
          size="mini"
          :model="createCalendarForm"
          :rules="rules"
          ref="createCalendarForm"
          label-position="right"
          label-width="150px"
        >
          <el-form-item
            label="日历名称"
            prop="calendarName"
          >
            <el-input v-model="createCalendarForm.calendarName"></el-input>
          </el-form-item>

          <el-form-item
            label="默认日历"
            prop="delivery"
          >
            <el-switch v-model="createCalendarForm.status"></el-switch>
          </el-form-item>

          <el-form-item
            label="工作日"
            prop="workDays"
          >
            <el-checkbox-group v-model="createCalendarForm.workDays">
              <el-checkbox
                v-for="(day, index) in days"
                :label="day"
                :key="index"
              >{{day}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item
            label="初始化日期"
            required
          >
            <el-col :span="11">
              <el-form-item prop="startDate">
                <el-date-picker
                  type="date"
                  placeholder="开始时间"
                  v-model="createCalendarForm.startDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col
              class="line"
              :span="2"
            >-</el-col>
            <el-col :span="11">
              <el-form-item prop="endDate">
                <el-date-picker
                  type="date"
                  placeholder="结束时间"
                  v-model="createCalendarForm.endDate"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                  format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item
            label="工作时间段（上午）"
            required
          >
            <el-col :span="11">
              <el-form-item prop="morningStartTime">
                <el-time-picker
                  type="fixed-time"
                  format="HH:mm"
                  value-format="HH:mm"
                  placeholder="选择时间"
                  v-model="createCalendarForm.morningStartTime"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>

            <el-col
              class="line"
              :span="2"
            >-</el-col>

            <el-col :span="11">
              <el-form-item prop="morningEndTime">
                <el-time-picker
                  type="fixed-time"
                  placeholder="选择时间"
                  format="HH:mm"
                  value-format="HH:mm"
                  v-model="createCalendarForm.morningEndTime"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item
            label="工作时间段（下午）"
            required
          >
            <el-col :span="11">
              <el-form-item prop="afternoonStartTime">
                <el-time-picker
                  type="fixed-time"
                  placeholder="选择时间"
                  format="HH:mm"
                  value-format="HH:mm"
                  v-model="createCalendarForm.afternoonStartTime"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>

            <el-col
              class="line"
              :span="2"
            >-</el-col>

            <el-col :span="11">
              <el-form-item prop="afternoonEndTime">
                <el-time-picker
                  type="fixed-time"
                  placeholder="选择时间"
                  format="HH:mm"
                  value-format="HH:mm"
                  v-model="createCalendarForm.afternoonEndTime"
                  style="width: 100%;"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="备注信息">
            <el-input
              type="textarea"
              placeholder="请输入备注信息（限制150个字符）"
              maxlength="150"
              v-model="createCalendarForm.calendarRemark"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="confirmCreateCalendar('createCalendarForm')"
            >创建</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import * as service from "@/modules/oms/api/oms/dailyOperationManage/workDayManage";
import moment from "moment";

export default {
  name: "workDayManage",
  data() {
    return {
      workDayManageForm: {
        // form params
        name: ""
      },

      fromPage: {},

      formats: {
        title: "MMMM YYYY",
        weekdays: "W",
        navMonths: "MMM",
        input: ["L", "YYYY-MM-DD", "YYYY/MM/DD"], // Only for `v-date-picker`
        dayPopover: "L", // Only for `v-date-picker`
        data: ["L", "YYYY-MM-DD", "YYYY/MM/DD"] // For attribute dates
      },

      updateForm: {}, // 更新 form 的参数

      workDayList: [], // 日历列表

      dates: new Date(),

      themeStyles: {
        wrapper: {
          color: "#000",
          border: "0",
          borderRadius: "5px",
          boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.14)"
        }
      },

      availableDate: {},

      days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],

      currentDatePicker: {},

      // attributes: [
      //   {
      //     highlight: {
      //       backgroundColor: '#9f80ff',     // Purple background
      //       borderColor: '#8c66ff',
      //       borderWidth: '2px'
      //     },
      //     contentStyle: {
      //       color: 'white',                 // White text
      //     },
      //     dates: [
      //       new Date(2018, 11, 1),           // Jan 1st
      //       new Date(2018, 11, 10),          // Jan 10th
      //       new Date(2018, 11, 12),          // Jan 12th
      //     ],
      //   }, {
      //     highlight: {
      //       backgroundColor: '#ddd',     // Purple background
      //       borderColor: '#ccc',
      //       borderWidth: '1px'
      //     },
      //     contentStyle: {
      //       color: '#999',                 // White text
      //     },
      //     dates: [
      //       new Date(2018, 11, 6),           // Jan 1st
      //       new Date(2018, 11, 13),          // Jan 10th
      //       new Date(2018, 11, 15),          // Jan 12th
      //     ],
      //   }
      // ],

      createCalendarForm: {
        status: false,
        calendarName: "",
        workDays: [],
        startDate: "",
        endDate: "",
        morningStartTime: "",
        morningEndTime: "",
        afternoonStartTime: "",
        afternoonEndTime: ""
      },

      rules: {
        calendarName: [
          { required: true, message: "日历名称不能为空", trigger: "blur" },
          {
            pattern: /^\s*[\S].{0,29}\s*$/,
            message: "日历名称长度为 1 到 30 个字符",
            trigger: "blur"
          }
        ],
        workDays: [
          { required: true, message: "工作日不能为空", trigger: "change" }
        ],
        startDate: [
          { required: true, message: "开始日期不能为空", trigger: "change" }
        ],
        endDate: [
          { required: true, message: "结束日期不能为空", trigger: "change" }
        ],
        morningStartTime: [
          { required: true, message: "上午上班时间不能为空", trigger: "change" }
        ],
        morningEndTime: [
          { required: true, message: "上午下班时间不能为空", trigger: "change" }
        ],
        afternoonStartTime: [
          { required: true, message: "下午上班时间不能为空", trigger: "change" }
        ],
        afternoonEndTime: [
          { required: true, message: "下午下班时间不能为空", trigger: "change" }
        ]
      },

      currentDayVisible: false, // 当前日期 dialog

      currentDayObj: {}, // 选中日期的数据

      customBackToday: false,

      dialogVisible: false // dialog visible
    };
  },
  computed: {
    showDatePicker() {
      return !!Object.keys(this.currentDatePicker).length;
    }
  },
  watch: {
    fromPage(val) {
      this.getValidDays(val.key || val.year + "-" + val.month, true);
    },
    dates(val) {
      const { name } = this.workDayManageForm;

      if (name) {
        if (this.customBackToday) {
          return (this.customBackToday = false);
        }
        
        const currentDay = moment(val).format("YYYY-MM-DD");

        const selectList = this.currentDatePicker;

        const { calendarName, startDate, endDate } = selectList;

        if (
          new Date(currentDay).getTime() >= new Date(startDate).getTime() &&
          new Date(currentDay).getTime() <= new Date(endDate).getTime()
        ) {
          service
            .queryCalendar({
              date: currentDay,
              calendarName: selectList.calendarName
            })
            .then(res => {
              const { result } = res;

              if (result.length) {
                this.currentDayObj = { ...result[0], currentDay: currentDay };

                this.updateForm = { ...this.currentDayObj };

                this.currentDayVisible = true;
              }
            });
        }
      }
    }
  },
  methods: {
    backToday() {
      this.dates = new Date();
      this.customBackToday = true;
    },
    getValidDays(dates, isWatch) {
      const { name } = this.workDayManageForm;

      const { year, month } = this.fromPage;
      
      if (name) {
        let currentMonth = moment(`${year}-${month}`).format("YYYY-MM");

        if(isWatch) {
          currentMonth = moment(dates).format("YYYY-MM");
        }

        const selectList = this.currentDatePicker;

        const { calendarName, startDate, endDate } = selectList;

        // if (
        //   new Date(currentMonth).getTime() >=
        //     new Date(moment(startDate).format("YYYY-MM")).getTime() &&
        //   new Date(currentMonth).getTime() <=
        //     new Date(moment(endDate).format("YYYY-MM")).getTime()
        // ) {
          service
            .queryAvailableDays({
              calendarName: calendarName,
              yearMonth: currentMonth
            })
            .then(res => {
              if (!res.result.length) {
                return (this.availableDate = [null]);
              }
              this.availableDate = res.result.map(item => {
                return item.date;
              });
            });
        // } else {
        // }
      }
    },
    selectFocus() {
      // 日历下拉事件监听，获取日历下拉列表
      if (!this.workDayList.length) {
        this.queryCalendarList();
      }
    },
    selectHandleChange(val) {
      // 日历下拉后的点击事件监听
      if (val) {
        service.queryCalendarInfo({ calendarName: val }).then(res => {
          const { result } = res;
          if (result.length) {
            this.currentDatePicker = result[0];

            // this.availableDate = {
            //   start: this.currentDatePicker.startDate,
            //   end: this.currentDatePicker.endDate
            // };

            this.getValidDays(new Date());
          } else {
            this.currentDatePicker = {};
          }
        });
      } else {
        this.currentDatePicker = {};
      }
    },
    close() {
      // dialog 关闭事件监听
      this.createCalendarForm = {
        status: false,
        calendarName: "",
        workDays: [],
        startDate: "",
        endDate: "",
        morningStartTime: "",
        morningEndTime: "",
        afternoonStartTime: "",
        afternoonEndTime: ""
      };
      // 清空校验
      this.$refs.createCalendarForm.resetFields();
    },
    queryCalendar() {
      // 查询日历
      this.selectHandleChange(this.currentDatePicker.calendarName);
    },
    addCalendar() {
      // 增加日历
      this.dialogVisible = true;
    },
    confirmCreateCalendar(formName) {
      // 新建日历
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { ...data } = this.createCalendarForm;

          const {
            startDate,
            endDate,
            morningEndTime,
            morningStartTime,
            afternoonEndTime,
            afternoonStartTime,
            status,
            workDays
          } = data;

          // 工作时间段格式化，转换成数字进行比较
          // 上午结束时间
          const morningEndTimeFormat = parseInt(
            morningEndTime.replace(":", ""),
            10
          );
          // 上午开始时间
          const morningStartTimeFormat = parseInt(
            morningStartTime.replace(":", ""),
            10
          );
          // 下午结束时间
          const afternoonEndTimeFormat = parseInt(
            afternoonEndTime.replace(":", ""),
            10
          );
          // 下午开始时间
          const afternoonStartTimeFormat = parseInt(
            afternoonStartTime.replace(":", ""),
            10
          );

          if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
            return this.$message.error("开始时间应小于结束时间！");
          }

          if (
            morningEndTimeFormat <= morningStartTimeFormat ||
            afternoonEndTimeFormat <= afternoonStartTimeFormat ||
            afternoonStartTimeFormat <= morningEndTimeFormat ||
            afternoonStartTimeFormat <= morningStartTimeFormat
          ) {
            return this.$message.error("上下午时间段输入错误！");
          }

          data.status = status ? 1 : 0;

          data.workDays = workDays.join(",");

          service.createCalendar(JSON.stringify(data)).then(res => {
            if (res && res.message) {
              return this.$message.error(res.message);
            }

            this.$message.success("新增日历成功！");
            this.dialogVisible = false;

            this.queryCalendarList();

            this.getValidDays(new Date());
          });
        } else {
          return false;
        }
      });
    },
    queryCalendarList() {
      // 查询日历列表
      service.queryCalendarList().then(res => {
        this.workDayList = res.result;
      });
    },
    deleteCalendar() {
      // 删除日历
      const { name } = this.workDayManageForm;

      if (name) {
        this.$confirm("此操作将删除日历, 是否继续?", "删除日历", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(() => {
            const selectList = this.workDayList.filter(
              item => item.calendarName === name
            );
            service.deleteCalendar(selectList[0].id).then(res => {
              this.queryCalendarList();

              this.$message.success("删除日历成功！");

              this.workDayManageForm.name = "";
              this.currentDatePicker = {};
            });
          })
          .catch(() => {});
      } else {
        this.$message.error("请先选中日历！");
      }
    },
    updateWorkDays() {
      // 修改某个日期的状态以及名称，如工作日、休息日
      const {
        morningEndTime,
        morningStartTime,
        afternoonEndTime,
        afternoonStartTime
      } = this.updateForm;

      // 工作时间段格式化，转换成数字进行比较
      // 上午结束时间
      const morningEndTimeFormat = parseInt(
        morningEndTime.replace(":", ""),
        10
      );
      // 上午开始时间
      const morningStartTimeFormat = parseInt(
        morningStartTime.replace(":", ""),
        10
      );
      // 下午结束时间
      const afternoonEndTimeFormat = parseInt(
        afternoonEndTime.replace(":", ""),
        10
      );
      // 下午开始时间
      const afternoonStartTimeFormat = parseInt(
        afternoonStartTime.replace(":", ""),
        10
      );

      if (
        morningEndTimeFormat <= morningStartTimeFormat ||
        afternoonEndTimeFormat <= afternoonStartTimeFormat ||
        afternoonStartTimeFormat <= morningEndTimeFormat ||
        afternoonStartTimeFormat <= morningStartTimeFormat
      ) {
        return this.$message.error("上下午时间段输入错误！");
      }

      service
        .updateCalendar({
          ...this.updateForm,
          calendarName: this.currentDatePicker.calendarName,
          date: this.currentDayObj.currentDay
        })
        .then(res => {
          this.$message.success("修改成功！");
          this.queryCalendar();
          this.currentDayVisible = false;
        });
    }
  },
  filters: {
    status(val) {
      return val == 0 ? "否" : "是";
    }
  }
};
</script>

<style lang="scss">
.work-day-manage-container {
  padding: 16px;

  .create-calendar-container {
    .el-dialog__body {
      .el-form-item {
        margin-bottom: 16px;
      }
      .el-checkbox + .el-checkbox {
        margin-left: 20px;
      }
      .line {
        text-align: center;
      }
    }
  }

  .no-data {
    color: #999;
    font-size: 14px;
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
    margin-right: 16px;
  }

  .box-card {
    margin: 8px 0 16px 0;
  }

  .date-picker-info {
    margin-top: 0;
  }

  .el-card__body {
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>