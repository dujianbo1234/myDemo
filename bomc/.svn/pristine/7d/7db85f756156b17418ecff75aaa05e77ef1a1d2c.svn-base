<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible="indinfoVisible"
      width="900px"
      top="5vh"
      @close="dialogClosed()"
    >
      <el-tabs  v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <div class="details-title">
          <el-form 
           ref="form"
           :model="form" 
           :inline="true" 
           size="small" 
           label-width="140px"         
          style="margin-left: auto; margin-right: auto; width:730px">
          <span class="sp"><span>基本信息</span></span>
            <div class="logAdd-obj">
            <el-form-item label="指标名" prop="name">
              <el-input v-model="form.name" :disabled="updateType==='update'" placeholder="请输入指标名"/>
            </el-form-item>
            <el-form-item label="指标编码" prop="code">
              <el-input
                v-model="form.code"
                :disabled="updateType==='update'"
                placeholder="请输入字母或者数字"
              />
            </el-form-item>
            <el-form-item label="指标别名" prop="alias">
              <el-input
                v-model="form.alias"
                :disabled="updateType==='update'"
                placeholder="请输入指标别名"
              />
            </el-form-item>
            <!-- <el-form-item label="指标别名(自定义)" prop="label">
              <el-input
                v-model="form.label"
                placeholder="请输入指标别名"
                style="margin-left: 5px;"
                :disabled="updateType==='update'"
              />
            </el-form-item> -->
            <el-form-item label="指标类型">
              <el-select
                v-model="form.metricType"
                placeholder="请选择"
                style="width: 180px;"
                :disabled="updateType==='update'"
              >
                <el-option
                  v-for="item in metricTypeOpt"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="指标维度">
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
            <el-form-item label="指标描述" style="display:block" prop="description">
              <el-input
                v-model="form.description"
                type="textarea"
                rows="4"
                cols="60"
                placeholder="请输入指标描述"
                :disabled="updateType==='update'"
              />
               </el-form-item>
            <el-form-item label="指标标签" style="display:block;">
                <el-tag
                      v-for="item in tagsArray"
                      :key="item"
                      closable
                      :type="item.type">
                      {{item}}
              </el-tag>
            </el-form-item>
           
            <el-form-item label="创建人" prop="founder">
              <el-input v-model="form.founder" :disabled="updateType==='update'"/>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <span id="times">{{ form.createTime | dateFilter }}</span>
            </el-form-item>

             <span class="sp" style="display:block"><span>来源配置</span></span>
            <el-form-item label="聚合频率" prop="frequency">
              <el-input v-model="frequency" style="width:94px" placeholder="请输入字母或者数字" :disabled="updateType==='update'"/>
              <el-select v-model="isFrequency" placeholder="请选择" style="width:94px">
                <!-- <el-option v-for="item in frequencyOpt" :key="item.value" :label="item.label" :value="item.value" /> -->
                <el-option key="second" :value="1" label="秒/次"/>
                <!-- <el-option key="minutes" :value="2" label="分/次" /> -->
                <!-- <el-option key="hours" :value="3" label="时/次" /> -->
                <!-- <el-option key="day" :value="4" label="日/次" /> -->
              </el-select>
            </el-form-item>
            <el-form-item label="时间对齐设置">
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
            </el-form-item>
            <!-- <original :data-type.sync="form.dataType" :collect-type.sync="form.collectType" /> -->
            <el-form-item label="输入源指标">
              <el-select 
                v-model="form.sourceMetric"
                multiple
                collapse-tags
                placeholder="请选择"
                style="width:195px"
                @change="changeSourceMetric"
                :disabled="updateType==='update'"
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
            <el-form-item label="所属资源类型">
              <!--  <el-cascader :options="resourceTypeOpt" v-model="form.resourceType" placeholder="试试搜索" filterable style="width:185px" @change="show" /> -->
              <el-cascader
                :options="treeData"
                v-model="form.resourceType"
                style="width:185px"
                :disabled="updateType==='update'"
              />
            </el-form-item>
              <el-form-item label="指标单位" prop="unit">
              <el-input v-model="form.unit" :disabled="updateType==='update'"  style="width:195px"/>
            </el-form-item>
            <el-form-item/>
            <el-form-item label="计算规则" style="display:block">
              <el-select
                style="width:195px"
                v-model="form.ruleName"
                placeholder="请选择"
                :disabled="updateType==='update'"
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
              <!-- <el-input
              v-model="ruleScript"
              style="width:50%"/>-->
              <el-input
                v-model="form.ruleScript"
                :disabled="updateType==='update'"
                :rows="6"
                type="textarea"
                style="width:550px"
                placeholder="请输入内容"
              />
            </el-form-item>
            <el-form-item label="规则参数:" style="display:block">
              <template v-if="JSON.stringify(paramsMap)!=='{}'">
                <ul>
                  <li v-for="key of Object.keys(paramsMap)" :key="key">
                    <el-form-item class="el-margin-bottom">
                      <el-tag>{{ key }}</el-tag>
                      <el-input
                        :disabled="updateType==='update'"
                       v-model="paramsMap[key]" style="width:80px"/>
                    </el-form-item>
                  </li>
                </ul>
              </template>
              <template v-else>该脚本未包含参数</template>
            </el-form-item>
            <el-form-item label="是否触发告警">
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
                    <!-- <el-button icon="el-icon-plus" size="mini" circle @click="addExcludeTrategy()" /> -->
                    <!-- <el-button :disabled="excludeStrategyCount==0" icon="el-icon-minus" size="mini" circle @click="reduceExcludeTrategy()" /> -->
                  </el-card>
                </el-col>
                <el-col :span="20">
                  <!-- <template v-if="clickIndex=='list_0'"> -->
                  <el-form-item label="校验时间">
                    <el-date-picker
                      v-model="triggerTime"
                      :default-time="['12:00:00']"
                      type="datetimerange"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      :disabled="updateType==='update'"
                    />
                  </el-form-item>
                  <!--
                  </template>-->
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
                      <!-- <el-option value="数值校验器" label="数值校验器" />
                          <el-option value="变化百分比校验器" label="变化百分比校验器" />
                          <el-option value="变化量校验器" label="变化量校验器" />
                          <el-option value="变化率校验器" label="变化率校验器" />
                          <el-option value="变化校验器" label="变化校验器" />
                          <el-option value="表达式校验器" label="表达式校验器" />
                          <el-option value="动态阈值波动率校验器" label="动态阈值波动率校验器" />
                          <el-option value="动态阈值绝对值校验器" label="动态阈值绝对值校验器" />
                          <el-option value="时间校验器" label="时间校验器" />
                          <el-option value="线性差异比例校验器" label="线性差异比例校验器" />
                      <el-option value="字符串校验器" label="字符串校验器" />-->
                    </el-select>
                  </el-form-item>
                  <el-form-item label="告警内容" style="display:block">
                    <el-input
                      v-model="triggerObj.comparatorMsg"
                      :disabled="updateType==='update'"
                      :autosize="{ minRows: 3, maxRows: 4}"
                      cols="50"
                      type="textarea"
                      placeholder="请输入内容"
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

      <div slot="footer" class="dialog-footer">
      </div>
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
  name: "CreateMergeDialog",
  props: {
    indinfoVisible: {
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
      tagsArray:[],
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
      // visible: false,
      // innerVisible: false,
      check: false,
      choose: "1",
      copyForm: _.cloneDeep(this.form),
      form: {
        tags:"",
        name: "",
        alias: "",
        calcType: 1,
        category: 0,
        taskId: "",
        code: "",
        collectType: [0],
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
        ruleName: "",
        ruleParams: "",
        ruleScript: "",
        sourceMetric: [],
        status: 0,
        alignUnit: 0,
        trigger: {},
        unit: "",
        paramsMap:{}
      },
      initForm: {},
      paramsMap: {},
      frequency: "",
      isFrequency: 1, // 频率
      triggerTime: () => {
        [this.triggerObj.startTime, this.triggerObj.endTime];
      },
      triggerObj: {
        triggerTime: [new Date(), new Date()],
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
      // confTable:,
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
      // debugger
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
          this.tagsArray=subForm.tags.split(",")
          this.paramsMap = {};
          if (subForm.ruleParams && subForm.ruleParams !== "null") {
            this.paramsMap = JSON.parse(subForm.ruleParams);
          }
         if(subForm.category==1){
          if (subForm.trigger.hasOwnProperty("excludeStrategy")) {
            this.excludeStrategy = subForm.trigger.excludeStrategy;
            this.excludeStrategyCount = this.excludeStrategy.length;
          }
          this.normalStrategy = subForm.trigger.normalStrategy;
          this.triggerObj = this.parseNormalStrategyObj(this.normalStrategy);
        } else {
          // this.form = this.copyForm;
          // this.changeRuleScript(this.form.ruleId);
          // this.frequency = "";
          // //debugger
          // this.initTrigger();
          this.triggerTime = [new Date(), new Date()];
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
        console.info(this.form.frequency);
        this.form.frequency = Number(newValue) * count;
        // //debugger
      }

      // immediate: true
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
        // //debugger
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
  mounted() {},
  methods: {
    createNormalStrategyObj(triggerObj) {
      let normalStrategyObj = _.cloneDeep(triggerObj);
      // delete excludeStrategyObj['triggerTime']
      normalStrategyObj = _.omit(normalStrategyObj, "ciid");
      normalStrategyObj.ciid = "";
      normalStrategyObj = JSON.parse(JSON.stringify(normalStrategyObj));

      const startTime = new Date(normalStrategyObj.startTime);
      const endTime = new Date(normalStrategyObj.endTime);
      // var tempTime = {}
      normalStrategyObj["startTime"] = parseInt(startTime.getTime() / 1000);
      // //debugger
      normalStrategyObj["endTime"] = parseInt(endTime.getTime() / 1000);
      // //debugger
      normalStrategyObj["thresholds"] = this.tableToObj(
        normalStrategyObj["thresholds"]
      );
      // normalStrategyObj.triggerTime = tempTime
      return normalStrategyObj;
      // console.info(normalStrategyObj)
    },
    parseNormalStrategyObj(normalStrategyObj) {
      // console.info(JSON.stringify(normalStrategyObj))
      normalStrategyObj = JSON.parse(JSON.stringify(normalStrategyObj));
      // this.form.trigger = _.assign(normalStrategyObj, { 'excludeStrategy': [] })
      // ////debugger
      const startTime = new Date(Number(normalStrategyObj["startTime"]) * 1000);
      const endTime = new Date(Number(normalStrategyObj["endTime"]) * 1000);

      var array = [];
      array.push(startTime);
      array.push(endTime);
      this.triggerTime = array;
      // //debugger
      const newNormalStrategyObj = {};
      _.assign(newNormalStrategyObj, normalStrategyObj, {
        ciid: []
      });
      newNormalStrategyObj.thresholds = this.objToTable(
        normalStrategyObj.thresholds
      );
      // //debugger
      return newNormalStrategyObj;
    },
    createExcludeStrategyObj(triggerObj) {
      let excludeStrategyObj = _.cloneDeep(triggerObj);
      // delete excludeStrategyObj['triggerTime']
      // excludeStrategyObj = _.omit(excludeStrategyObj, 'startTime')
      const startTime = new Date(excludeStrategyObj.startTime);
      const endTime = new Date(excludeStrategyObj.endTime);
      excludeStrategyObj.startTime = parseInt(startTime.getTime() / 1000);
      // excludeStrategyObj = _.omit(excludeStrategyObj, 'endTime')
      excludeStrategyObj.endTime = parseInt(endTime.getTime() / 1000);
      excludeStrategyObj.ciid = excludeStrategyObj.ciid.join(",");
      excludeStrategyObj = JSON.parse(JSON.stringify(excludeStrategyObj));
      excludeStrategyObj["thresholds"] = this.tableToObj(
        excludeStrategyObj["thresholds"]
      );
      // console.info(JSON.stringify(excludeStrategyObj))
      return excludeStrategyObj;
    },
    parseExcludeStrategyObj(excludeStrategyObj) {
      const newExcludeStrategyObj = JSON.parse(
        JSON.stringify(excludeStrategyObj)
      );
      // console.info('supersea')
      // console.info(newExcludeStrategyObj)
      const startTime = new Date(
        Number(newExcludeStrategyObj["startTime"]) * 1000
      );
      const endTime = new Date(Number(newExcludeStrategyObj["endTime"]) * 1000);
      var array = [];
      array.push(startTime);
      array.push(endTime);
      this.triggerTime = array;
      // //debugger
      const ciid = newExcludeStrategyObj.ciid;
      newExcludeStrategyObj.ciid = _.compact(_.split(ciid, ","));
      newExcludeStrategyObj.thresholds = this.objToTable(
        newExcludeStrategyObj.thresholds
      );
      return newExcludeStrategyObj;
    },
    addExcludeTrategy() {
      const obj = this.createExcludeStrategyObj(this.triggerObj);
      // if (!this.form.trigger.hasOwnProperty('excludeStrategy')) {
      //   this.form.trigger = _.assign(this.createExcludeStrategyObj(), { 'excludeStrategy': [] })
      // }
      this.excludeStrategy.push(obj);
      // console.info(JSON.stringify(this.excludeStrategy))
      this.excludeStrategyCount++;
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
          // console.info(currentIndex)
          currentStrategyObj = this.excludeStrategy[currentIndex - 1];
          this.triggerObj = this.parseExcludeStrategyObj(currentStrategyObj);
        } else {
          currentStrategyObj = this.normalStrategy;
          this.triggerObj = this.parseNormalStrategyObj(currentStrategyObj);
        }
      });
      // console.info(this.triggerObj)
      // alert(this.clickIndex)
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
      this.flag = true;
      this.$emit("closedEvent", false);
    },
    getMetricTypeOpt() {
      server.getMetricsType().then(
        res => {
          const data = res.metricsData;
          // //debugger
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
    changeSourceMetric(val) {
      // debugger
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
      const params = { model: this.cidParam };
      if (this.cidParam === undefined) {
        this.ciids = {};
        return;
      }
      // //debugger
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
  #times{
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
  background: #42B983;
  border: 1px solid #42B983;
  color: #FFFFFF;
  font-size:14px;
  &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
}
.details-title {
  margin-bottom: 20px;
  .sp {
    display: inline-block;
    min-height: 28px;
    color: #42B983;

    span {
      padding-left: 10px;
      border-left: 3px solid #42B983;
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
