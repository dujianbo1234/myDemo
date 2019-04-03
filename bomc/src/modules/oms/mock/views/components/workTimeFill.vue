<template>
  <div class="oms-diy-elementui workTimeFill">
    <el-row v-if="allowDisplay">
      <el-button
        type="primary"
        size="mini"
        class="rt"
        @click="timeWrite"
      >工时填写</el-button>
    </el-row>
    <el-table
      :data="tableData"
      style="width:100%"
    >
      <el-table-column
        prop="userName"
        label="执行人姓名"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="workingTimeType"
        label="工时类型"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="taskName"
        label="工单环节"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="implement"
        label="执行动作"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="timeConsuming"
        label="执行耗时"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="belongMonth"
        label="工时归属月份"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="mount"
        label="填报工时量"
        width="120"
      ></el-table-column>
      <el-table-column
        v-if="whereNode==='close'"
        prop="examineMan"
        label="审核人"
        width="120"
      ></el-table-column>
      <el-table-column
        v-if="whereNode==='close'"
        prop="examineTime"
        label="审核时间"
        width="180"
      ></el-table-column>
      <el-table-column
        v-if="whereNode==='close'"
        prop="examineResult"
        label="审核结果"
        width="120"
      ></el-table-column>
      <el-table-column
        v-if="whereNode==='close'"
        prop="examineWorkTime"
        label="审核工时"
        width="120"
      ></el-table-column>
      <el-table-column
        v-if="whereNode==='close'"
        prop="score"
        label="满意度评分"
        width="120"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="180"
        fixed="right"
        v-if="allInfo!=='allInfo'"
      >
        <template slot-scope="scope">
          <el-button
            @click="timeView(scope.row)"
            type="text"
            size="small"
          >工时查看</el-button>
          <el-button
            v-if="scope.row.mount!==''"
            @click="timeModify(scope.row)"
            type="text"
            size="small"
          >工时修改</el-button>
          <el-button
            v-if="whereNode==='close'"
            @click="timeExamine(scope.row)"
            type="text"
            size="small"
          >审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 工时填写 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="78%"
    >
      <el-form
        ref="writeForm"
        :model="writeForm"
        :rules="writeFormRules"
        label-width="130px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="工时类型"
              :prop="dialogTitle!=='工时信息'?'workingTimeType':''"
            >
              <el-select
                class="oms-input"
                v-model="writeForm.workingTimeType"
                placeholder="请选择"
                clearable
                :disabled="dialogTitle==='工时信息'?true:false"
              >
                <el-option
                  v-for="item in enumOptions.workingTimeType"
                  v-if="showOptionsEnum"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属系统信息">
              <el-select
                v-model="writeForm.system"
                class="oms-select"
                :disabled="true"
              >
                <el-option
                  :value="writeForm.system"
                  :label="systemInfoProp.system"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属子系统">
              <el-select
                v-model="writeForm.systemSubclass"
                class="oms-select"
                :disabled="true"
              >
                <el-option
                  :value="writeForm.systemSubclass"
                  :label="systemInfoProp.systemSubclass"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="二级功能分类">
              <el-input
                class="oms-input"
                v-model="writeForm.twoLevelFunction"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工单创建时间">
              <el-date-picker
                class="oms-input"
                :disabled="true"
                v-model="writeForm.createTime"
                value-format="yyyy-MM-dd hh:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="期望完成时间">
              <el-date-picker
                class="oms-input"
                :disabled="true"
                v-model="writeForm.dueTime"
                value-format="yyyy-MM-dd hh:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="执行人姓名">
              <el-select
                v-model="writeForm.userId"
                :disabled="true"
                class="oms-select"
              >
                <el-option
                  :value="writeForm.userId"
                  :label="writeForm.userName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="执行动作">
              <el-input
                class="oms-input"
                v-model="writeForm.implement"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工单环节">
              <el-select
                v-model="writeForm.taskName"
                :disabled="true"
                class="oms-select"
              >
                <el-option
                  value="变更发起"
                  label="变更发起"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="whereNode==='close'">
          <el-col :span="8">
            <el-form-item label="工单执行提交时间">
              <el-date-picker
                class="oms-input"
                :disabled="true"
                v-model="writeForm.commitTime"
                value-format="yyyy-MM-dd hh:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到达执行人员时间">
              <el-date-picker
                class="oms-input"
                :disabled="true"
                v-model="writeForm.startTime"
                value-format="yyyy-MM-dd hh:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="执行耗时(min)">
              <el-input
                class="oms-input"
                v-model="writeForm.timeConsuming"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="工时归属月份"
              :prop="dialogTitle!=='工时信息'?'belongMonth':''"
            >
              <el-date-picker
                :disabled="dialogTitle==='工时信息'?true:false"
                class="oms-select"
                v-model="writeForm.belongMonth"
                value-format="yyyy-MM"
                type="month"
                placeholder="选择月"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="填报工时量"
              class="item"
              :prop="dialogTitle!=='工时信息'?'mount':''"
            >
              <el-input
                class="oms-input"
                v-model="writeForm.mount"
                :disabled="dialogTitle=='工时信息'?true:false"
              ></el-input>
              <span class="unit">人/天</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item
              label="工作内容描述"
              class="textarea"
              :prop="dialogTitle!=='工时信息'?'jobDescription':''"
            >
              <el-input
                type="textarea"
                v-model.trim="writeForm.jobDescription"
                :disabled="dialogTitle=='工时信息'?true:false"
              ></el-input>
              <span class="inputTips">最多输入500个字符</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="whereNode==='close'&&dialogTitle==='工时审核信息'">
          <el-col :span="8">
            <el-form-item label="审核人">
              <el-input
                v-model="writeForm.examineMan"
                class="oms-input"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核时间">
              <el-date-picker
                class="oms-input"
                :disabled="true"
                v-model="writeForm.examineTime"
                value-format="yyyy-MM-dd hh:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="审核工时"
              prop="examineWorkTime"
            >
              <el-input
                v-model="writeForm.examineWorkTime"
                class="oms-input"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="whereNode==='close'&&dialogTitle==='工时审核信息'">
          <el-col :span="8">
            <el-form-item
              label="满意度评分"
              prop="score"
            >
              <el-input
                v-model="writeForm.score"
                class="oms-input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="审核结果"
              prop="examineResult"
            >
              <!-- <el-input v-model="examineResult" class="oms-input"></el-input> -->
              <el-select
                v-model="writeForm.examineResult"
                class="oms-select"
              >
                <el-option
                  value="通过"
                  label="通过"
                ></el-option>
                <el-option
                  value="不通过"
                  label="不通过"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        v-if="dialogTitle!=='工时信息'"
      >
        <el-row>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogConfirm('dialogVisible', 'writeForm')"
          >确 定</el-button>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as publicService from "@/modules/oms/api/oms/oms.js";
import * as service from "@/modules/oms/api/oms/eventForm";
import { parseTime } from "@/utils/index";

export default {
  data() {
    return {
      allowDisplay: "", // 填写按钮是否展示
      dialogVisible: false, // 模态框是否展示
      dialogTitle: "", // 模态框标题
      done: "", // 告诉组件，工时信息数据添加完成

      enumOptions: {},
      tableData: [], // 表格数据

      writeForm: {
        // 模态框参数
        id: "",
        procInstId: this.procInstId,
        taskId: this.taskId,

        workingTimeType: "",
        system: "",
        systemSubclass: "",
        twoLevelFunction: "变更流程",
        createTime: "",
        dueTime: "",
        userId: this.userInfo.userId,
        userName: this.userInfo.userName,
        implement: "",
        taskName: "",
        commitTime: "",
        startTime: "",
        timeConsuming: "",
        belongMonth: "",
        mount: "",
        jobDescription: ""
      },
      writeFormRules: {
        workingTimeType: [
          {
            validator: this.validator,
            required: true,
            myMessage: "工时类型不能为空",
            trigger: "change"
          }
        ],
        belongMonth: [
          {
            validator: this.validator,
            required: true,
            myMessage: "工时归属月份不能为空",
            trigger: "change"
          }
        ],
        mount: [
          {
            validator: this.validator,
            required: true,
            type: "number",
            myMessage: "填报工时量不能为空",
            trigger: "blur"
          }
        ],
        jobDescription: [
          {
            validator: this.validator,
            required: true,
            myMessage: "工作内容描述不能为空",
            trigger: "blur"
          }
        ],
        examineWorkTime: [
          {
            validator: this.validator,
            required: true,
            myMessage: "审核工时不能为空",
            trigger: "blur"
          }
        ],
        score: [
          {
            validator: this.validator,
            required: true,
            myMessage: "满意度评分不能为空",
            trigger: "blur"
          }
        ],
        examineResult: [
          {
            validator: this.validator,
            required: true,
            myMessage: "审核结果不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  props: {
    procInstId: {},
    taskId: {},
    systemInfoProp: {},
    ruleForm: {},
    userInfo: {},
    whereNode: {}, // 表示当前位于哪个节点
    allInfo: {}
  },
  watch: {
    ruleForm: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.writeForm.createTime = newValue.createTime;
          this.writeForm.dueTime = newValue.dueTime;

          this.writeForm.system = newValue.systemInfo[0];
          this.writeForm.systemSubclass = newValue.systemInfo[1];
        }
      },
      deep: true
    },
    dialogVisible: function(val) {
      if (val === false) {
        this.dialogTitle = "工时信息"; // 去掉验证
        this.$refs["writeForm"].resetFields();
      }
    }
  },
  computed: {
    showOptionsEnum() {
      // if the optionsEnum has data
      return Object.keys(this.enumOptions).length > 0;
    }
  },
  mounted() {
    this.queryWorkingHours();
    this.queryParams();
  },
  methods: {
    queryWorkingHours() {
      // 查询工时信息表格
      const params = {
        procInstId: this.procInstId
      };
      service.queryWorkingHours(params).then(res => {
        // 判断工时填写按钮展示
        if (this.whereNode === "changeFormStart") {
          // 变更发起节点
          if (res.result.length === 0) {
            this.allowDisplay = true;
            this.done = false;
            this.$emit("update:done", this.done);
          } else if (res.result.length === 1) {
            this.allowDisplay = false;
            this.tableData = res.result;
            this.done = true;
            this.$emit("update:done", this.done);
          }
        }
        if (
          (this.whereNode === "taskImplement" ||
            this.whereNode === "urgTaskImplement") &&
          res.result.length === 1
        ) {
          // 任务分派节点 包括紧急
          this.allowDisplay = true;
          this.tableData = [];
          this.done = false;
          this.$emit("update:done", this.done);
        }
        if (
          (this.whereNode === "taskImplement" ||
            this.whereNode === "urgTaskImplement") &&
          res.result.length === 2
        ) {
          this.allowDisplay = false;
          this.tableData = res.result.splice(1, 1);
          this.done = true;
          this.$emit("update:done", this.done);
        }
        if (this.whereNode === "close") {
          // 变更关闭节点
          this.tableData = res.result;
          this.done = this.tableData.every(function(itm) {
            // 确定表格两条工时都被审核完成
            return itm.examineResult !== null;
          });
          this.$emit("update:done", this.done);
        }
      });
    },
    queryParams() {
      // 查询页面所有下拉框的options内容
      const params = {
        name: "working_time_type"
      };
      service.queryParams(params).then(res => {
        const data = res.result;
        if (data && data.length) {
          name: "working_time_type";
          const obj = {};
          data.forEach(item => {
            obj[item.name] = item.value.split(",");
          });

          for (var key in obj) {
            if (key.indexOf("_") > -1) {
              var arr = key.split("_");
              var keys = "";
              arr.forEach((item, index) => {
                if (index === 0) {
                  keys += item;
                } else {
                  keys +=
                    arr[index].charAt(0).toUpperCase() + arr[index].substr(1);
                }
              });
              obj[keys] = obj[key];
              delete obj[key];
            }
          }
          this.enumOptions = obj;
        }
      });
    },
    timeView(row) {
      // 工时查看
      this.dialogTitle = "工时信息";
      this.dialogVisible = true;
      this.writeForm = row;
    },
    timeWrite(row) {
      // 工时填写
      if (this.whereNode === "changeFormStart") {
        this.writeForm.implement = "转派";
        this.writeForm.taskName = "变更发起";
      }
      if (this.whereNode === "taskImplement") {
        this.writeForm.implement = "处理";
        this.writeForm.taskName = "任务实施";
      }
      if (this.whereNode === "urgTaskImplement") {
        this.writeForm.implement = "处理";
        this.writeForm.taskName = "实施变更任务";
      }
      this.dialogTitle = "填写工时信息";
      this.dialogVisible = true;
    },
    timeModify(row) {
      // 工时修改
      this.dialogTitle = "修改工时信息";
      this.dialogVisible = true;
      this.writeForm = row;
    },
    timeExamine(row) {
      this.dialogTitle = "工时审核信息";
      this.dialogVisible = true;
      this.writeForm = row;

      this.writeForm = {
        ...row,
        ...{
          examineMan: this.userInfo.userName,
          examineTime: parseTime(Date.now(), "{y}-{m}-{d} {h}:{i}:{s}"),
          examineWorkTime: row.examineWorkTime || "",
          score: row.score || "",
          examineResult: row.examineResult || ""
        }
      };
    },
    dialogConfirm(val, formName) {
      // 模态框确认按钮
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await service.workTimeSubmit(this.writeForm).then(res => {
            this.$message({
              message:
                this.dialogTitle === "填写工时信息"
                  ? "提交成功！"
                  : this.dialogTitle === "修改工时信息"
                  ? "修改成功！"
                  : this.dialogTitle === "工时审核信息"
                  ? "审核成功！"
                  : "",
              type: "success"
            });
          });
          await this.queryWorkingHours();

          // 将writeForm置为空对象之前将验证去掉，否则提示'不能为空'
          this.dialogTitle = "工时信息";
          this.writeForm = {};

          switch (val) {
            case "dialogVisible":
              this.dialogVisible = false;
              break;
            default:
              break;
          }
        } else {
          return false;
        }
      });
    },
    validator(rule, value, callback) {
      if (!value) {
        callback(new Error(" "));
        const h = this.$createElement;
        this.$notify({
          title: "提示",
          message: rule.myMessage,
          duration: 2000
        });
      } else if (rule.fullField === "mount") {
        // const reg = /^[0-9]+.?[0-9]*$/;
        const reg = /^[0-9]+([.]{1}[0-9]{1})?$/;
        if (!reg.test(value)) {
          callback(new Error(" "));
          this.$notify({
            title: "提示",
            message: "填报工时量必须为数字且最多一位小数",
            duration: 2000
          });
        } else {
          callback();
        }
      }else if(rule.fullField === 'score'){
        const reg = /^(0|[1-9]\d?|100)$/;
        if (!reg.test(value)) {
          callback(new Error(" "));
          this.$notify({
            title: "提示",
            message: "满意度评分为0-100分之间",
            duration: 2000
          });
        } else {
          callback();
        }
      }else if( rule.fullField === 'examineWorkTime'){
        const reg = /^[0-9]{0,10}$/;
        if (!reg.test(value)) {
          callback(new Error(" "));
          this.$notify({
            title: "提示",
            message: "审核工时必须为数字",
            duration: 2000
          });
        } else {
          callback();
        }

      } else if (rule.fullField === "jobDescription") {
        if (value && !this.getStrLenght(value, 500)) {
          callback(new Error(" "));
          this.$notify({
            title: "提示",
            message: "工作内容描述最多输入500个字符",
            duration: 2000
          });
        } else {
          callback();
        }
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
<style lang="scss">
.workTimeFill {
  .some-btn {
    display: flex;
    justify-content: space-around;
    width: 300px;
    margin: 0 auto;
  }
  .el-dialog__footer {
    text-align: center;
  }
  .item {
    position: relative;
  }
  .unit {
    position: absolute;
    top: 0;
    right: 5px;
    font-size: 12px;
  }
}
</style>