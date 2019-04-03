// 聚合

<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible="outerVisible"
      v-if="outerVisible"
      width="1100px"
      top="5vh"
      @close="dialogClosed()"
    >
      <div slot="title">
        <span>{{ dialogTitle }}</span>
        <span style="font-size: 9px;color: red;">(聚合指标是选取原始指标进行聚合计算获得)</span>
      </div>
      <el-form
        v-show="flag"
        ref="form"
        :model="form"
        :inline="true"
        size="small"
        label-width="150px"
        :rules="rules"
      >
        <el-form-item label="指标名" prop="name">
          <el-input
            v-model="form.name"
            :disabled="updateType==='update'"
            placeholder="请输入字母"
            @keyup.native="form.name=form.name.replace(/[^\w\a]/ig,'')"
          />
        </el-form-item>
        <el-form-item label="指标编码" prop="code">
          <el-input
            v-model="form.code"
            :disabled="updateType==='update'"
            placeholder="请输入字母或者数字"
            @keyup.native="form.code=form.code.replace(/[^\w\-]/ig,'')"
          />
        </el-form-item>
        <el-form-item label="指标别名(规范)" prop="alias">
          <el-input v-model="form.alias" :disabled="updateType==='update'" placeholder="请输入指标别名"/>
        </el-form-item>
        <el-form-item label="指标别名(自定义)" prop="label">
          <el-input v-model="form.label" placeholder="请输入指标别名"/>
        </el-form-item>
        <el-form-item label="指标类型" prop="metricType">
          <el-select v-model="form.metricType" placeholder="请选择" style="width: 93%;">
            <el-option
              v-for="item in metricTypeOpt"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="指标维度" prop="metricDimension">
          <el-select
            v-model="form.metricDimension"
            multiple
            collapse-tags
            placeholder="请选择"
            style="width: 85%;"
          >
            <el-option
              v-for="item in metricDimensionOpt"
              :key="item.value"
              :value="item.value+''"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" style="display:none;">
          <!-- <el-switch v-model="form.status" /> -->
          <el-radio-group v-model="form.status" :disabled="updateType==='update'">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="指标单位" prop="unit">
          <el-input v-model="form.unit"/>
        </el-form-item>
        <el-form-item label/>
        <el-form-item label="时间对齐设置" style="margin-left: -1.3%" prop="alignUnit">
          <el-select v-model="form.alignUnit" placeholder="请选择" style="width:93%">
            <el-option key="不对齐" :value="0" label="不对齐"/>
            <el-option key="分" :value="4" label="分"/>
            <el-option key="时" :value="3" label="时"/>
            <el-option key="日" :value="2" label="日"/>
            <el-option key="月" :value="1" label="月"/>
          </el-select>
        </el-form-item>
        <el-form-item label="指标描述" style="display:block" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            rows="4"
            cols="60"
            placeholder="请输入指标描述"
          />
        </el-form-item>
        <el-form-item label="聚合频率" prop="frequency">
          <el-input v-model="frequency" style="width:100px" placeholder="请输入整数" maxlength="10"/>
          <el-select v-model="isFrequency" placeholder="请选择" style="width:94px">
            <!-- <el-option v-for="item in frequencyOpt" :key="item.value" :label="item.label" :value="item.value" /> -->
            <el-option key="second" :value="1" label="秒/次"/>
          </el-select>
        </el-form-item>
        <!-- <original :data-type.sync="form.dataType" :collect-type.sync="form.collectType" /> -->
        <el-form-item label="输入源指标" prop="sourceMetric">
          <el-select
            v-model="form.sourceMetric"
            multiple
            collapse-tags
            placeholder="请选择"
            style="width:190px"
            @change="changeSourceMetric"
          >
            <el-option
              v-for="item in codeOptions"
              :key="item.value"
              :value="item.value+''"
              :label="item.label"
            />
          </el-select>

          <!-- @blur="changeSourceMetric" -->
        </el-form-item>
        <el-form-item label="所属资源类型" prop="resourceType">
          <!--  <el-cascader :options="resourceTypeOpt" v-model="form.resourceType" placeholder="试试搜索" filterable style="width:185px" @change="show" /> -->
          <el-cascader
            :options="treeData"
            v-model="form.resourceType"
            style="width:185px"
            disabled
          />
        </el-form-item>
        <el-form-item label="计算规则" style="display:block" prop="ruleName">
          <el-select
            v-model="form.ruleName"
            placeholder="请选择"
            @change="changeRuleScript(form.ruleName)"
          >
            <el-option
              v-for="item in metricRuleOpt"
              :key="item.label"
              :label="item.label"
              :value="Number(item.value)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="规则脚本" style="display:block">
          <el-input
            v-model="form.ruleScript"
            :rows="6"
            type="textarea"
            disabled
            style="width:860px"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="规则参数" style="display:block">
          <template v-if="JSON.stringify(form.paramsMap)!=='{}'">
            <ul>
              <li style="width: 888px;">
                <!-- :prop="'paramsMap.' + key + '.paramsMap[key]'" -->
                <el-form-item
                  v-for="key of Object.keys(form.paramsMap)"
                  :key="key"
                  :prop="'paramsMap.'+key"
                  :rules="{
                      pattern:/[^\w\.\/]/ig,
                      required: true,  message: '请输入英文或者数字', trigger: 'blur'
                    }"
                  class="el-margin-bottom"
                >
                  <el-tag>{{ key }}</el-tag>
                  <el-input v-model="form.paramsMap[key]" style="width:80px"/>
                </el-form-item>
              </li>
            </ul>
          </template>
          <template v-else>该脚本未包含参数</template>
        </el-form-item>
        <el-form-item label="是否触发告警">
          <el-radio-group v-model="form.category">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form
        v-show="!flag"
        ref="triggerObj"
        :model="triggerObj"
        :inline="true"
        size="small"
        :rules="rules1"
        label-width="140px"
        style="margin-left: auto; margin-right: auto; width:730px"
      >
        <el-row>
          <el-col :span="4">
            <el-card class="box-card" style="text-align:center">
              <ol>
                <li>
                  <a
                    key="list_0"
                    :class="{text:true,item:true,active:clickIndex==='list_0'}"
                    style="display:block"
                    href="javascript:void(0);"
                    @click="selectTrategy(0)"
                  >默认策略</a>
                </li>
                <li>
                  <a
                    v-for="o in excludeStrategyCount"
                    :key="'list_'+o"
                    :class="{text:true,item:true,active:clickIndex==='list_'+o}"
                    style="display:block"
                    href="javascript:void(0);"
                    @click="selectTrategy(o)"
                  >{{ '特殊策略' + o }}</a>
                </li>
              </ol>
              <el-button icon="el-icon-plus" size="mini" circle @click="addExcludeTrategy()"/>
              <el-button
                :disabled="excludeStrategyCount==0"
                icon="el-icon-minus"
                size="mini"
                circle
                @click="reduceExcludeTrategy()"
              />
            </el-card>
          </el-col>
          <el-col :span="20">
            <!-- <template v-if="clickIndex=='list_0'"> -->
            <el-form-item label="校验时间" prop="triggerTime">
              <el-date-picker
                v-model="triggerObj.triggerTime"
                :default-time="['12:00:00']"
                type="datetimerange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </el-form-item>
            <!--
            </template>-->
            <el-form-item
              v-if="clickIndex!=='list_0'"
              label="特殊对象选择"
              style="display:block"
              prop="ciid"
            >
              <el-select
                v-model="triggerObj.ciid"
                multiple
                collapse-tags
                filterable
                default-first-option
                placeholder="请选择"
              >
                <el-option
                  v-for="item in ciids"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value+''"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="校验器类型" prop="comparatorType">
              <el-select
                v-model="triggerObj.comparatorType"
                placeholder="请选择"
                style="width:200px"
                @change="changeComparatorType"
              >
                <el-option
                  v-for="item in comparatorTypeOpt"
                  :value="item.value"
                  :label="item.label"
                  :key="item.comparatorInfoId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="告警内容" style="display:block" prop="comparatorMsg">
              <el-input
                v-model="triggerObj.comparatorMsg"
                :autosize="{ minRows: 3, maxRows: 4}"
                cols="50"
                type="textarea"
                placeholder="请输入内容"
                :disabled="disabled"
              />
            </el-form-item>
            <el-form-item label="校验器配置" prop="thresholds">
              <el-table :data="triggerObj.thresholds" border>
                <el-table-column prop="level" label="级别" width="112"/>
                <el-table-column prop="flag" label="阈值" width="235">
                  <template slot-scope="scope">
                    <el-col :span="11">
                      <el-form-item
                        :prop="'thresholds.' + scope.$index + '.from'"
                        :rules="{
                            required: true,
                          pattern:/^([0-9]\d*)$/, message: '请输入数字', trigger: 'blur'
                        }
                        "
                      >
                        <el-input v-model="scope.row.from" maxlength="10" placeholder="输入数字"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2" class="line" style="text-align:center">-</el-col>
                    <el-col :span="11">
                      <el-form-item
                        :prop="'thresholds.' + scope.$index + '.to'"
                        :rules="{
                          pattern:/^([0-9]\d*)$/, 
                          required: true, message: '请输入数字', trigger: 'blur'
                        }"
                      >
                        <el-input v-model="scope.row.to" maxlength="10" placeholder="输入数字"/>
                      </el-form-item>
                    </el-col>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClosed()">取 消</el-button>
        <el-button v-if="form.category&&flag" type="primary" @click="add(form)">下一步</el-button>
        <el-button v-if="form.category&&!flag" type="primary" @click="flag=true">上一步</el-button>
        <el-button v-if="!flag" type="primary" @click="updateMetrics(form)">确 定</el-button>

        <el-button v-if="!form.category" type="primary" @click="updateMetricsDef(form)">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as server from "../../../../api/kms";
import { getUserName } from "@/utils/auth";
var userfounder = getUserName();
var _ = require("lodash");
export default {
  name: "CreateMergeDialog",
  props: {
    outerVisible: {
      type: Boolean,
      default: false
    },
    outerData: {
      type: Object,
      default: () => {}
    },
    updateType: {
      type: String,
      default: "create"
    },
    codeOptions: {
      type: Array,
      default: () => []
    },
    codeMap: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      disabled: true,
      cidParam: "",
      ciids: [],
      flag: true,
      triggerOpt: 0, // 是否触发告警
      putFlag: 0,
      value5: [],
      value11: [],
      activeName2: "first",
      title: "",
      input: "",
      value: "",
      value1: "",
      checkType: "",
      check: false,
      choose: "1",
      copyForm: _.cloneDeep(this.form),
      form: {
        name: "", //指标名称
        alias: "", //指标别名(规范)
        calcType: 1,
        //聚合指标1
        category: 0,
        taskId: "",
        ruleParams: "",
        code: "",
        collectType: [0],
        createTime: 0,
        dataType: 0,
        description: "",
        founder: getUserName(),
        frequency: "",
        label: "",
        metricId: 0,
        ruleScript: "",
        metricDimension: [],
        metricType: "",
        resourceType: [],
        sourceMetric: [],
        status: 0,
        alignUnit: 0,
        trigger: {},
        unit: "",
        // ruleId:"",
        ruleName: "",
        paramsMap: {}
      },
      initForm: {},
      paramsMap: "",
      frequency: "",
      isFrequency: 1, // 频率
      // triggerTime: () => {
      //   [this.triggerObj.startTime, this.triggerObj.endTime];
      // },
      triggerObj: {
        triggerTime:'',
        startTime: new Date(),
        endTime: new Date(),
        ciid: [],
        comparatorType: "",
        comparatorMsg: "",
        thresholds: [
          {
            level: "严重",
            value: "critical",
            from: "",
            to: ""
          },
          {
            level: "主要",
            value: "major",
            from: "",
            to: ""
          },
          {
            level: "一般",
            value: "normal",
            from: "",
            to: ""
          },
          {
            level: "恢复",
            value: "reset",
            from: "",
            to: ""
          }
        ]
      },
      triggerObj2: {
        triggerTime: [new Date(), new Date()],
        startTime: new Date(),
        endTime: new Date(),
        ciid: [],
        // comparator: {
        //   type: '数值校验器',
        //   content: '${kpi_name}=${kpi_value},大于${threshold},触发告警'
        // },
        comparatorType: "",
        comparatorMsg: "",
        thresholds: [
          {
            level: "严重",
            value: "critical",
            from: "",
            to: ""
          },
          {
            level: "主要",
            value: "major",
            from: "",
            to: ""
          },
          {
            level: "一般",
            value: "normal",
            from: "",
            to: ""
          },
          {
            level: "恢复",
            value: "reset",
            from: "",
            to: ""
          }
        ]
      },
      normalStrategy: {},
      excludeStrategy: [],
      excludeStrategyCount: 0,
      metricTypeOpt: [],
      metricDimensionOpt: [],
      comparatorTypeOpt: [],
      metricRuleOpt: [],
      comparatorContentMap: {},
      formLabelWidth: "120px",

      metricsDefData: [],
      code: "",
      clickIndex: "list_0",
      formInline: {
        name: "",
        code: "test_metrics-kafka",
        metric_type: "",
        startTime: "",
        endTime: ""
      },
      rules1: {
        comparatorType: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        comparatorMsg: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        ciid: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        triggerTime: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        thresholds: [
          {
            required: true
          }
        ]
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输指标名",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入字母或者数字",
            trigger: "blur"
          }
        ],
        alias: [
          {
            required: true,
            message: "请输入指标别名",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ],
        frequency: [
          { required: true, message: "不能为空" },
          { pattern: /^([1-9]\d*)$/, message: "请输入大于0的整数" }
        ],
        sourceMetric: [
          {
            required: true,
            trigger: "change",
            message: "请选择输入源指标",
            type: "array"
          }
        ],
        resourceType: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
            type: "array"
          }
        ],
        ruleName: [
          {
            required: true,
            trigger: "blur",
            message: "请选择计算规则"
          }
        ],
        ruleScript: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        metricType: [
          {
            required: true,
            message: "请选择指标类型",
            trigger: "blur"
          }
        ],
        alignUnit: [
          {
            required: true,
            message: "不能为空",
            type: "number"
          }
        ],
        metricDimension: [
          {
            required: true,
            message: "请选择指标维度",
            trigger: "change",
            type: "array"
          }
        ]
      }
    };
  },
  computed: {
    treeData() {
      return this.$store.state.resourceManagement.treeData;
    },

  },
  watch: {
    "form.dataType": function(newValue, oldValue) {
      console.info(newValue);
    },
    triggerTime: {
      handler(newValue, oldValue) {
        this.triggerObj.startTime = newValue[0];
        this.triggerObj.endTime = newValue[1];
      },
      deep: true
    },
    outerData: {
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== "{}") {
          var subForm = _.cloneDeep(newValue);
          subForm.resourceType = subForm.resourceType.split(".");
          this.$set(this, "form", subForm);
          this.frequency = subForm.frequency;
          if (subForm.trigger.hasOwnProperty("excludeStrategy")) {
            this.excludeStrategy = subForm.trigger.excludeStrategy;
            this.excludeStrategyCount = this.excludeStrategy.length;
          }
          this.normalStrategy = subForm.trigger.normalStrategy;
          this.triggerObj = this.parseNormalStrategyObj(this.normalStrategy);
          this.paramsMap = {};
          if (subForm.ruleParams && subForm.ruleParams !== "null") {
            this.paramsMap = JSON.parse(subForm.ruleParams);
          }
          this.$set(this.form, "paramsMap", this.paramsMap);
        } else {
          this.form = this.copyForm;
          //不一样
          this.changeRuleScript(this.form.ruleName);
          this.frequency = "";
          this.initTrigger();
        }
      },
      deep: true
    },
    frequency: {
      handler: function handler(newValue, oldValue) {
        var flag = this.isFrequency;
        var count = 1;
        count = flag === 2 ? count * 60 : count;
        count = flag === 3 ? count * 60 * 60 : count;
        count = flag === 4 ? count * 60 * 60 * 60 : count;
        console.info(this.form.frequency);
        this.form.frequency = Number(newValue) * count;
      }

      // immediate: true
    },
    triggerObj: {
      handler(newValue, oldValue) {
        if (newValue.triggerTime) {
          let [startTime, endTime] = newValue.triggerTime;
          newValue.startTime = startTime;
          newValue.endTime = endTime;
        }
        const tempIndex = this.clickIndex;
        const index = Number(tempIndex.replace("list_", ""));
        if (index === 0) {
          this.normalStrategy = this.createNormalStrategyObj(this.triggerObj);
        } else {
          this.excludeStrategy[index - 1] = this.createExcludeStrategyObj(
            this.triggerObj
          );
        }
        const obj = {};
        obj["excludeStrategy"] = this.excludeStrategy;
        obj["normalStrategy"] = this.normalStrategy;
        // this.form.trigger = _.assign(this.form.trigger, this.normalStrategy, obj)
        this.form.trigger = _.assign(this.form.trigger, obj);
        // this.triggerObj.conf = this.tableToObj(newValue)
        // console.info(JSON.stringify(this.form.trigger))
      },
      deep: true,
      immediate: true
    }
  },

  created() {
    if (!this.$store.state.resourceManagement.on_treeData) {
      this.$store.dispatch("treeData");
    }
    this.initData();
  },


  methods: {
    add(form) {
      this.$refs.form.validate(valid => {
        if (!valid) {
          this.$message({
            showClose: true,
            message: "不允许提交空白表单!请完整填写弹框信息！！",
            type: "error"
          });
          return true;
        } else {
          this.flag = false;
          return false;
        }
      });
    },
    createNormalStrategyObj(triggerObj) {
      let normalStrategyObj = _.cloneDeep(triggerObj);
      // delete excludeStrategyObj['triggerTime']
      normalStrategyObj = _.omit(normalStrategyObj, "ciid");
      normalStrategyObj.ciid = "";
      normalStrategyObj = JSON.parse(JSON.stringify(normalStrategyObj));

      const startTime = new Date(normalStrategyObj.startTime);
      const endTime = new Date(normalStrategyObj.endTime);
      normalStrategyObj["startTime"] = parseInt(startTime.getTime() / 1000);
      normalStrategyObj["endTime"] = parseInt(endTime.getTime() / 1000);
      normalStrategyObj["thresholds"] = this.tableToObj(
        normalStrategyObj["thresholds"]
      );
      return normalStrategyObj;
    },
    parseNormalStrategyObj(normalStrategyObj) {
      normalStrategyObj = JSON.parse(JSON.stringify(normalStrategyObj));
      const startTime = new Date(Number(normalStrategyObj["startTime"]) * 1000);
      const endTime = new Date(Number(normalStrategyObj["endTime"]) * 1000);
      var array = [];
      array.push(startTime);
      array.push(endTime);
      const newNormalStrategyObj = {};
      _.assign(newNormalStrategyObj, normalStrategyObj, {
        ciid: []
      });
      newNormalStrategyObj.triggerTime = array;
      newNormalStrategyObj.thresholds = this.objToTable(
        normalStrategyObj.thresholds
      );
      return newNormalStrategyObj;
    },
    createExcludeStrategyObj(triggerObj) {
      let excludeStrategyObj = _.cloneDeep(triggerObj);
      const startTime = new Date(excludeStrategyObj.startTime);
      const endTime = new Date(excludeStrategyObj.endTime);
      excludeStrategyObj.startTime = parseInt(startTime.getTime() / 1000);
      excludeStrategyObj.endTime = parseInt(endTime.getTime() / 1000);
      excludeStrategyObj.ciid = excludeStrategyObj.ciid.join(",");
      excludeStrategyObj = JSON.parse(JSON.stringify(excludeStrategyObj));
      excludeStrategyObj["thresholds"] = this.tableToObj(
      excludeStrategyObj["thresholds"]
      );
      return excludeStrategyObj;
    },
    parseExcludeStrategyObj(excludeStrategyObj) {
      const newExcludeStrategyObj = JSON.parse(
        JSON.stringify(excludeStrategyObj)
      );
      const startTime = new Date(
        Number(newExcludeStrategyObj["startTime"]) * 1000
      );
      const endTime = new Date(Number(newExcludeStrategyObj["endTime"]) * 1000);
      var array = [];
      array.push(startTime);
      array.push(endTime);
      this.triggerObj.triggerTime = array;
      const ciid = newExcludeStrategyObj.ciid;
      newExcludeStrategyObj.ciid = _.compact(_.split(ciid, ","));
      newExcludeStrategyObj.thresholds = this.objToTable(
        newExcludeStrategyObj.thresholds
      );
      return newExcludeStrategyObj;
    },

    //首先填写默认才可以点击
    Choice(form) {
      if ((this.clickIndex = "list_0")) {
        this.$refs.triggerObj.validate(valid => {
          if (!valid) {
            this.$message({
              showClose: true,
              message: "请填写完当前弹框信息,再添加策略！！",
              type: "error"
            });
            return true;
          } else {
            const obj = this.createExcludeStrategyObj(this.triggerObj2);
            this.excludeStrategy.push(obj);
            this.excludeStrategyCount++;

            this.flag = false;
            return false;
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "不允许提交空白表单!请完整填写弹框信息！！",
          type: "error"
        });
        return true;
      }
    },

    addExcludeTrategy() {
      this.Choice();
    },
    reduceExcludeTrategy() {
      if (this.excludeStrategy.length > 0) {
        this.excludeStrategy.pop();
        if (
          "list_" + this.excludeStrategyCount === this.clickIndex &&
          this.excludeStrategyCount > 0
        ) {
          this.clickIndex = "list_" + (this.excludeStrategyCount - 1);
          this.selectTrategy(this.excludeStrategyCount - 1);
        }
        this.excludeStrategyCount--;
      }
    },

    selectTrategy(currentIndex) {
      this.$nextTick(function() {
        this.clickIndex = "list_" + currentIndex;
        let currentStrategyObj = {};
        if (currentIndex > 0) {
          currentStrategyObj = this.excludeStrategy[currentIndex - 1];
          this.triggerObj = this.parseExcludeStrategyObj(currentStrategyObj);
        } else {
          currentStrategyObj = this.normalStrategy;
          this.triggerObj = this.parseNormalStrategyObj(currentStrategyObj);
        }
      });
    },
    initData() {
      this.copyForm = _.cloneDeep(this.form);
      this.copyTrigger = _.cloneDeep(this.triggerObj);
      this.getMetricTypeOpt();
      this.getMetricDimensionOpt();
      this.getComparatorInfoOpt();
      this.getMetricRuleOpt();
    },
    initTrigger() {
      this.triggerObj = this.copyTrigger;
      this.normalStrategy = this.createNormalStrategyObj(this.copyTrigger);
      this.excludeStrategy = [];
      this.excludeStrategyCount = 0;
    },
    dialogClosed() {
      this.label = "";
      this.frequency = "";
      this.form.category = 0;
      this.form.ruleScript = "";
      this.form.resourceType = [];
      this.flag = true;
      this.triggerTime = [];
      this.triggerObj.comparatorType = "";
      this.triggerObj.comparatorMsg = "";
      this.$refs.form.resetFields();
      this.$refs.triggerObj.resetFields();

      this.$emit("closedEvent", false);
      this.triggerObj.thresholds = [
        {
          level: "严重",
          value: "critical",
          from: "",
          to: ""
        },
        {
          level: "主要",
          value: "major",
          from: "",
          to: ""
        },
        {
          level: "一般",
          value: "normal",
          from: "",
          to: ""
        },
        {
          level: "恢复",
          value: "reset",
          from: "",
          to: ""
        }
      ];
    },
    getMetricTypeOpt() {
      server.getMetricsType().then(
        res => {
          const data = res.metricsData;
          this.metricTypeOpt = _.uniqBy(
            data.map(item => {
              return {
                value: item.alias,
                label: item.alias
              };
            }),
            "value"
          );
        },
        error => {
          console.error("请求异常！" + error);
        }
      );
    },
    getMetricDimensionOpt() {
      server.getMetricsDimension().then(
        res => {
          const data = res.metricsData;
          this.metricDimensionOpt = data.map(item => {
            return {
              value: item.alias,
              label: item.alias
            };
          });
        },
        error => {
          console.error("请求异常！" + error);
        }
      );
    },
    getComparatorInfoOpt() {
      server.getComparatorInfo().then(
        res => {
          const data = res.metricsData;
          this.comparatorTypeOpt = _.uniqBy(
            data.map(item => {
              return {
                value: item.alias,
                label: item.alias
              };
            }),
            "value"
          );
          var obj = {};
          data.forEach(item => {
            obj[item.alias] = item.content;
          });
          this.comparatorContentMap = obj;
        },
        error => {
          console.error("请求异常！" + error);
        }
      );
    },
    getMetricsDef() {
      server.getMetricsDef().then(
        res => {
          this.metricsDefData = res.metricsData;
          this.codeOptions = _.uniqBy(
            this.metricsDefData.map(item => {
              return {
                value: item.code,
                label: item.code
              };
            }),
            "value"
          );
        },
        error => {
          console.error("请求异常！" + error);
        }
      );
    },

    //提交
    postMetricsDef(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
          if (reg.test(this.form.name)) {
            this.$message({
              showClose: true,
              message: "指标名中不能含有文字!",
              type: "error"
            });
          } else {
            server.postMetricsDef(form).then(res => {
              if (!res.errorMsg) {
                this.$message({
                  showClose: true,
                  message: "新增成功！",
                  type: "success"
                });
                this.$emit("closedEvent", false);
                this.$emit('send')
                this.$refs.form.resetFields();
                this.form.ruleScript = "";
                this.label = "";
                this.flag = true;
                this.triggerTime = [];
                this.triggerObj.comparatorType = "";
                this.triggerObj.thresholds = [
                  {
                    level: "严重",
                    value: "critical",
                    from: "",
                    to: ""
                  },
                  {
                    level: "主要",
                    value: "major",
                    from: "",
                    to: ""
                  },
                  {
                    level: "一般",
                    value: "normal",
                    from: "",
                    to: ""
                  },
                  {
                    level: "恢复",
                    value: "reset",
                    from: "",
                    to: ""
                  }
                ];
              } else {
                // this.$emit("closedEvent", true);
              }
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: "不允许提交空白表单!请完整填写弹框信息！！",
            type: "error"
          });
          return false;
        }
        error => {
          console.error("请求异常！" + error);
          this.$message({
            showClose: true,
            message: "新增失败！",
            type: "error"
          });
        };
      });
    },

    putMetricsDef(form) {
      if ((this.form.status = 0)) {
        this.$refs.form.resetFields();
        this.$refs.triggerObj.resetFields();
        this.triggerObj.thresholds = [
          {
            level: "严重",
            value: "critical",
            from: "",
            to: ""
          },
          {
            level: "主要",
            value: "major",
            from: "",
            to: ""
          },
          {
            level: "一般",
            value: "normal",
            from: "",
            to: ""
          },
          {
            level: "恢复",
            value: "reset",
            from: "",
            to: ""
          }
        ];
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
            if (reg.test(this.form.name)) {
              this.$message({
                showClose: true,
                message: "指标名中不能含有文字!",
                type: "error"
              });
            } else {
              server.putMetricsDef(form).then(res => {
                if (!res.errorMsg) {
                  this.$message({
                    showClose: true,
                    message: "修改成功！",
                    type: "success"
                  });
                }
                this.$emit("closedEvent", false);
                this.$refs.form.resetFields();
                this.form.ruleScript = "";
                this.label = "";
                this.flag = true;
                this.triggerTime = [];
                this.triggerObj.comparatorType = "";
                this.triggerObj.thresholds = [
                  {
                    level: "严重",
                    value: "critical",
                    from: "",
                    to: ""
                  },
                  {
                    level: "主要",
                    value: "major",
                    from: "",
                    to: ""
                  },
                  {
                    level: "一般",
                    value: "normal",
                    from: "",
                    to: ""
                  },
                  {
                    level: "恢复",
                    value: "reset",
                    from: "",
                    to: ""
                  }
                ];
              });
            }
          } else {
            this.$message({
              showClose: true,
              message: "不允许提交空白表单!请完整填写弹框信息！！",
              type: "error"
            });
            return false;
          }
          error => {
            console.error("请求异常！" + error);
            this.$message({
              showClose: true,
              message: "修改失败！",
              type: "error"
            });
          };
        });
      }
    },
    updateMetricsDef(form) {
      debugger
      var subForm = _.cloneDeep(form);
      subForm.resourceType = subForm.resourceType.join(".");
      subForm.taskId = subForm.taskId ? subForm.taskId : "";
      subForm.ruleParams = subForm.ruleParams ? subForm.ruleParams : "";
      subForm.trigger.normalStrategy.ciid = "";
      subForm.ruleParams = JSON.stringify(this.paramsMap)
      console.log("subForm.type", JSON.stringify(subForm));
      if (this.updateType === "create") {
        this.postMetricsDef(subForm);
        this.form.founder = userfounder;
      } else if (this.updateType === "update") {
        this.form.founder = userfounder;
        this.putMetricsDef(subForm);
      }
      this.$refs.form.validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
    },

    //确定
    postMetrics(triggerObj) {
      this.$refs.triggerObj.validate(valid => {
        if (valid) {
          if (this.flag) {
            return false;
          } else {
            server.postMetricsDef(triggerObj).then(res => {
              if (!res.errorMsg) {
                this.$message({
                  showClose: true,
                  message: "新增成功！",
                  type: "success"
                });
                this.selectTrategy(0);
                this.$emit("closedEvent", false);
                this.$emit('send')
                this.$refs.form.resetFields();
                this.$refs.triggerObj.resetFields();
                this.form.ruleScript = "";
                this.label = "";
                this.flag = true;
                this.form.category = 0;
                this.dialogClosed();
              }
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: "不允许提交空白表单!请完整填写弹框信息！！",
            type: "error"
          });
          return false;
        }
        error => {
          console.error("请求异常！" + error);
          this.$message({
            showClose: true,
            message: "新增失败！",
            type: "error"
          });
        };
      });
    },
    //修改
    putMetrics(triggerObj) {
      this.$refs.triggerObj.validate(valid => {
        if (valid) {
          if (this.flag) {
            return false;
          } else {
            server.putMetricsDef(triggerObj).then(res => {
              if (!res.errorMsg) {
                this.$message({
                  showClose: true,
                  message: "修改成功！",
                  type: "success"
                });
              }
              this.selectTrategy(0);
              this.$emit("closedEvent", false);
              this.$refs.form.resetFields();
              this.form.ruleScript = "";
              this.label = "";
              this.flag = true;
              this.dialogClosed();
              this.form.category = 0;
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: "不允许提交空白表单!请完整填写弹框信息！！",
            type: "error"
          });
          return false;
        }
        error => {
          console.error("请求异常！" + error);
          this.$message({
            showClose: true,
            message: "修改失败！",
            type: "error"
          });
        };
      });
    },
    updateMetrics(form) {
      var subForm = _.cloneDeep(form);
      subForm.resourceType = subForm.resourceType.join(".");
      subForm.taskId = subForm.taskId ? subForm.taskId : "";
      subForm.ruleParams = subForm.ruleParams ? subForm.ruleParams : "";
      subForm.trigger.normalStrategy.ciid = "";
      // subForm.ruleParams = JSON.stringify(this.paramsMap);
      console.log("subForm.type", JSON.stringify(subForm));
      if (this.updateType === "create") {
        this.postMetrics(subForm);
        this.form.founder = userfounder;
      } else if (this.updateType === "update") {
        this.form.founder = userfounder;
        this.putMetrics(subForm);
      }
      this.$refs.form.validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    changeSourceMetric(val) {
      const length = val.length;
      if (length > 0) {
        this.form.resourceType = this.codeMap[val[length - 1]].split(".");
        this.cidParam = this.form.resourceType[
          this.form.resourceType.length - 1
        ];
        this.getCiids();
      } else {
        this.form.resourceType = [];
      }
      this.getCiids();
    },
    getCiids() {
      const params = { model: this.cidParam };
      server.getCIIDS(params).then(res => {
        const data = res.datas[this.cidParam];
        if (!data) {
          this.ciids = [];
          return;
        }
        this.ciids = data.map(item => {
          return {
            value: item.ciid,
            label: item.ciname
          };
        });
      });
    },
    tableToObj(table) {
      const obj = {};
      table.map(v => {
        const { level, value, from, to } = v;
        this.$set(obj, value, {});
        this.$set(obj[value], "from", from);
        this.$set(obj[value], "to", to);
      });
      return obj;
    },
    objToTable(obj) {
      const table = [
        {
          level: "严重",
          value: "critical",
          from: obj.critical.from,
          to: obj.critical.to
        },
        {
          level: "主要",
          value: "major",
          from: obj.major.from,
          to: obj.major.to
        },
        {
          level: "一般",
          value: "normal",
          from: obj.normal.from,
          to: obj.normal.to
        },
        {
          level: "恢复",
          value: "reset",
          from: obj.reset.from,
          to: obj.reset.to
        }
      ];
      return table;
    },
    changeComparatorType(newValue) {
      this.triggerObj.comparatorMsg = this.comparatorContentMap[newValue];
    },
    getMetricRuleOpt() {
      server.getMetricsRule().then(res => {
        const data = res.metricsData;
        this.metricRuleOpt = data.map(item => {
          return {
            value: item.ruleId,
            label: item.name,
            script: item.scriptTemplet,
            params: item.paramsTemplet
          };
        });
      }); //
    },
    changeRuleScript(value) {
      const index = _.findIndex(this.metricRuleOpt, function(o) {
        return Number(o.value) === value;
      });
      let ruleParams = [];
      if (index > -1) {
        this.form.ruleScript = this.metricRuleOpt[index].script;
        this.form.ruleName = this.metricRuleOpt[index].label;
        ruleParams = JSON.parse(this.metricRuleOpt[index].params);
      }
      this.initParamsMap(ruleParams);
    },
    initParamsMap(ruleParams) {
      this.paramsMap = {};
      const length = ruleParams.length;
      for (let i = 0; i < length; i++) {
        this.$set(this.paramsMap, ruleParams[i].ParamsTempletName, "");
      }
      this.$set(this.form, "paramsMap", this.paramsMap);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.block {
  margin: 20px 0 12px 0;
}
.text {
  font-size: 14px;
}
.item {
  padding: 8px 0;
}
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-input.is-disabled .el-input__inner {
  color: #606266;
}
.el-radio__input.is-disabled + span.el-radio__label {
  color: #606266;
}
.el-cascader.is-disabled .el-cascader__label {
  z-index: 2;
  color: #606266;
}
</style>
