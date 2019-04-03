<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible="detailsVisible"
      width="900px"
      top="5vh"
      @close="dialogClosed()"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <div class="details-title">
            <el-form
              ref="form"
              :model="form"
              :inline="true"
              size="small"
              label-width="140px"
              style="margin-left: auto; margin-right: auto; width:730px"
            >
              <span class="sp">
                <span>基本信息</span>
              </span>
              <div class="logAdd-obj">
                <el-form-item label="指标名" prop="name">
                  <el-input v-model="form.name" :disabled="updateType==='update'"/>
                </el-form-item>
                <el-form-item label="指标编码" prop="code">
                  <el-input v-model="form.code" :disabled="updateType==='update'"/>
                </el-form-item>
                <el-form-item label="指标别名" prop="alias">
                  <el-input v-model="form.alias" :disabled="updateType==='update'"/>
                </el-form-item>
                <!-- <el-form-item label="指标别名(自定义)" prop="label" >
              <el-input v-model="form.label" style="margin-left: 5px;" :disabled="updateType==='update'"/>
                </el-form-item>-->
                <el-form-item label="指标类型" prop="sytpe">
                  <el-select
                    v-model="form.metricType"
                    placeholder="请选择"
                    :disabled="updateType==='update'"
                    style="width: 180px;"
                  >
                    <el-option
                      v-for="item in metricTypeOpt"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="指标维度" prop="dimension">
                  <el-select
                    v-model="form.metricDimension"
                    multiple
                    collapse-tags
                    placeholder="请选择"
                    :disabled="updateType==='update'"
                    style="width: 180px;"
                  >
                    <el-option
                      v-for="item in metricDimensionOpt"
                      :key="item.value"
                      :value="item.value+''"
                      :label="item.label"
                    />
                  </el-select>
                </el-form-item>
                <!-- <el-form-item> -->
                <!-- <el-switch v-model="form.status" /> -->
                <!-- <el-radio-group v-model="form.calcType" style="margin-left: 88px;display: block;margin-top: 10px;" :disabled="updateType==='update'">
                  <el-radio :label="0">原始指标</el-radio>
                  <el-radio :label="1">聚合指标</el-radio>
                </el-radio-group>
                </el-form-item>-->
                <!-- <el-form-item label="时间对齐设置">
                  <el-select
                    v-model="form.alignUnit"
                    placeholder="请选择"
                    style="width:185px"
                    :disabled="updateType==='update'"
                  >
                    <el-option key="不对齐" :value="0" label="不对齐"/>
                    <el-option key="分" :value="4" label="分"/>
                    <el-option key="时" :value="3" label="时"/>
                    <el-option key="日" :value="2" label="日"/>
                    <el-option key="月" :value="1" label="月"/>
                  </el-select>
                </el-form-item> -->
                <el-form-item label="指标描述" style="display:block" prop="description">
                  <el-input
                    v-model="form.description"
                    type="textarea"
                    rows="4"
                    cols="60"
                    :disabled="updateType==='update'"
                  />
                </el-form-item>
                <el-form-item label="指标标签" style="display:block;">
                  <el-tag v-for="item in tagsArray" :key="item" closable :type="item.type">{{item}}</el-tag>
                </el-form-item>
                <el-form-item label="创建人" prop="founder">
                  <el-input v-model="form.founder" :disabled="updateType==='update'"/>
                </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                  <span id="times">{{ form.createTime | dateFilter}}</span>
                </el-form-item>
                <span class="sp" style="display:block">
                  <span>来源配置</span>
                </span>
                <el-form-item label="指标所属资源类型">
                  <!--  <el-cascader :options="resourceTypeOpt" v-model="form.resourceType" placeholder="试试搜索" filterable style="width:185px" @change="show" /> -->
                  <el-cascader
                    :options="treeData"
                    v-model="form.resourceType"
                    style="width:185px"
                    @blur="getCiids"
                    :disabled="updateType==='update'"
                  />
                </el-form-item>
                <el-form-item label="采集频率" prop="collection">
                  <el-input
                    v-model="frequency"
                    style="width:94px"
                    :disabled="updateType==='update'"
                  />
                  <el-select
                    v-model="isFrequency"
                    placeholder="请选择"
                    style="width:94px"
                    :disabled="updateType==='update'"
                  >
                    <!-- <el-option v-for="item in frequencyOpt" :key="item.value" :label="item.label" :value="item.value" /> -->
                    <el-option key="second" :value="1" label="秒/次"/>
                    <!-- <el-option key="minutes" :value="2" label="分/次" /> -->
                    <!-- <el-option key="hours" :value="3" label="时/次" /> -->
                    <!-- <el-option key="day" :value="4" label="日/次" /> -->
                  </el-select>
                </el-form-item>
                <el-form-item label="指标单位" prop="unit">
                  <el-input v-model="form.unit" :disabled="updateType==='update'" style="width:188px"/>
                </el-form-item>
                <!-- <original :data-type.sync="form.dataType" :collect-type.sync="form.collectType" /> -->
                <el-form-item label="数据类型" style="display:block">
                  <el-select
                    v-model="form.dataType"
                    :disabled="updateType==='update'"
                    placeholder="请选择"
                    style="width:190px"
                  >
                    <el-option key="text" :value="0" label="文本"/>
                    <el-option key="float" :value="1" label="浮点数"/>
                    <el-option key="int" :value="2" label="正整数"/>
                    <el-option key="char" :value="3" label="字符"/>
                    <el-option key="log" :value="4" label="日志"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="采集方式" style="display:block">
                  <el-checkbox-group v-model="form.collectType" :disabled="updateType==='update'">
                    <el-row>
                      <el-checkbox label="0">主机资源模板</el-checkbox>
                      <el-checkbox label="1">网络设备模板</el-checkbox>
                      <el-checkbox label="2">中间件模板</el-checkbox>
                    </el-row>
                    <el-row>
                      <el-checkbox label="3">日志模板</el-checkbox>
                      <el-checkbox label="4">数据库模板</el-checkbox>
                      <el-checkbox label="5">自定义脚本模板</el-checkbox>
                    </el-row>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="是否触发告警">
                  <!-- <el-switch v-model="form.status" /> -->
                  <el-radio-group :disabled="updateType==='update'" v-model="form.category">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-tab-pane>

        <template v-if="form.category">
          <el-tab-pane label="告警配置" name="second">
            <el-form
              ref="form"
              :model="form"
              :inline="true"
              size="small"
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
                  </el-card>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="校验时间">
                    <el-date-picker
                      v-model="triggerTime"
                      :disabled="updateType==='update'"
                      type="datetimerange"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                    />
                  </el-form-item>
                  <el-form-item v-if="clickIndex!=='list_0'" label="特殊对象选择" style="display:block">
                    <el-select
                      v-model="triggerObj.ciid"
                      multiple
                      collapse-tags
                      filterable
                      default-first-option
                      placeholder="请选择"
                      :disabled="updateType==='update'"
                    >
                      <el-option
                        v-for="item in ciids"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value+''"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="校验器类型">
                    <el-select
                      v-model="triggerObj.comparatorType"
                      placeholder="请选择"
                      style="width:200px"
                      @change="changeComparatorType"
                      :disabled="updateType==='update'"
                    >
                      <el-option
                        v-for="item in comparatorTypeOpt"
                        :value="item.value"
                        :label="item.label"
                        :key="item.comparatorInfoId"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="告警内容" style="display:block">
                    <el-input
                      v-model="triggerObj.comparatorMsg"
                      :autosize="{ minRows: 3, maxRows: 4}"
                      cols="50"
                      type="textarea"
                      placeholder="请输入内容"
                      :disabled="updateType==='update'"
                    />
                  </el-form-item>
                  <el-form-item label="校验器配置">
                    <el-table :data="triggerObj.thresholds" border>
                      <el-table-column prop="level" label="级别" width="112"/>
                      <el-table-column prop="flag" label="阈值" width="150">
                        <template slot-scope="scope">
                          <el-col :span="11">
                            <el-input v-model="scope.row.from" :disabled="updateType==='update'"/>
                          </el-col>
                          <el-col :span="2" class="line" style="text-align:center">-</el-col>
                          <el-col :span="11">
                            <el-input v-model="scope.row.to" :disabled="updateType==='update'"/>
                          </el-col>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import * as server from "../../../../api/kms";
import * as utils from "../../../../utils/utils.js";
import { getUserName } from "@/utils/auth";
var _ = require("lodash");
export default {
  filters: {
    dateFilter(value) {
      return utils.dateFilter(value);
    }
  },
  props: {
    detailsVisible: {
      type: Boolean,
      default: false
    },
    outerData: {
      type: Object,
      default: () => {}
    },
    updateType: {
      type: String,
      default: "update"
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
      tagsArray: [],
      ciids: [],
      flag: true,
      triggerOpt: 0, // 是否触发告警
      putFlag: 0,
      value5: [],
      value11: [],
      activeName: "first",
      title: "",
      input: "",
      value: "",
      value1: "",
      checkType: "",
      // innerVisible: false,
      check: false,
      choose: "1",
      copyForm: _.cloneDeep(this.form),
      form: {
        tags: "",
        calcType: "",
        name: "",
        alias: "",
        calcType: 1,
        category: 0,
        taskId: "",
        code: "",
        collectType: [],
        createTime: 0,
        dataType: 0,
        description: "",
        founder: "",
        frequency: 0,
        label: "",
        metricDimension: [],
        metricId: 0,
        metricType: "",
        resourceType: [],
        ruleId: "",
        ruleParams: "",
        ruleScript: "",
        sourceMetric: [],
        status: 0,
        alignUnit: 0,
        trigger: {},
        unit: ""
      },
      initForm: {},
      paramsMap: {},
      frequency: "",
      isFrequency: 1, // 频率
      triggerTime: () => {
        [this.triggerObj.startTime, this.triggerObj.endTime];
      },
      triggerObj: {
        triggerTime: [],
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
      }
    };
  },
  computed: {
    treeData() {
      return this.$store.state.resourceManagement.treeData;
    }
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
          // this.form = subForm
          this.frequency = subForm.frequency;
          this.tagsArray = subForm.tags.split(",");
          if (subForm.category == 1) {
            if (subForm.trigger.hasOwnProperty("excludeStrategy")) {
              this.excludeStrategy = subForm.trigger.excludeStrategy;
              this.excludeStrategyCount = this.excludeStrategy.length;
              // var a=[]
              // this.excludeStrategy.forEach(e=>{
              //  -------------------------------------------------问题
              // }
              // )
            }
            this.normalStrategy = subForm.trigger.normalStrategy;
            this.triggerObj = this.parseNormalStrategyObj(this.normalStrategy);

            this.paramsMap = {};
            if (subForm.ruleParams && subForm.ruleParams !== "null") {
              this.paramsMap = JSON.parse(subForm.ruleParams);
            } else {
              // this.form = this.copyForm
              // this.changeRuleScript(this.form.ruleId)
              // this.frequency = ''
              // this.initTrigger()
              this.triggerTime = [new Date(), new Date()];
            }
          }
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
        // console.info(this.form.frequency)
        this.form.frequency = Number(newValue) * count;
      }
    },
    triggerObj: {
      handler(newValue, oldValue) {
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
        this.form.trigger = _.assign(this.form.trigger, obj);
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
    createNormalStrategyObj(triggerObj) {
      let normalStrategyObj = _.cloneDeep(triggerObj);
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
      this.triggerTime = array;
      const newNormalStrategyObj = {};
      _.assign(newNormalStrategyObj, normalStrategyObj, {
        ciid: []
      });
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
      this.triggerTime = array;
      const ciid = newExcludeStrategyObj.ciid;
      newExcludeStrategyObj.ciid = _.compact(_.split(ciid, ","));
      newExcludeStrategyObj.thresholds = this.objToTable(
        newExcludeStrategyObj.thresholds
      );
      return newExcludeStrategyObj;
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
      if (this.activeName != "first") {
        this.activeName = "first";
      }
      this.$emit("closedEvent", false);
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
          // const metricsTypeData = res
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
    changeSourceMetric(val) {
      const length = val.length;
      if (length > 0) {
        this.form.resourceType = this.codeMap[val[length - 1]].split(".");
        this.$set(this, "cidParam", "");
        this.cidParam = this.form.resourceType[
          this.form.resourceType.length - 1
        ];
      } else {
        this.form.resourceType = [];
      }
      this.getCiids();
    },
    getCiids() {
      const params = {
        model: this.cidParam
      };
      if (this.cidParam === undefined) {
        this.ciids = {};
        return;
      }
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
      // console.info(obj)
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
      });
    },
    changeRuleScript(value) {
      const index = _.findIndex(this.metricRuleOpt, function(o) {
        return Number(o.value) === value;
      });
      let ruleParams = [];
      if (index > -1) {
        this.form.ruleScript = this.metricRuleOpt[index].script;
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
#times {
  border: 1px solid #ddd;
  padding: 6px 21px;
  border-radius: 5px;
  margin-left: 9px;
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

// 弹窗样式
.search_btn {
  background: #42b983;
  border: 1px solid #42b983;
  color: #ffffff;
  font-size: 14px;
  &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
}
.details-title {
  margin-bottom: 20px;
  .sp {
    display: inline-block;
    min-height: 28px;
    color: #42b983;

    span {
      padding-left: 10px;
      border-left: 3px solid #42b983;
    }

    i {
      padding-left: 10px;
    }
  }

  .sBtn {
    text-align: right;
    margin: 20px 56px;

    button {
      padding: 9px 17px;
    }
  }
}
</style>
