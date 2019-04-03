<template>
  <div>
    <el-dialog :visible="outerVisible" width="1100px" title="新增指标" top="5vh" @close="dialogClosed()">
      <el-form ref="form" :model="form" :inline="true" size="small" label-width="140px">
        <el-form-item label="指标名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="指标编码" prop="code">
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item label="指标别名(规范)" prop="alias">
          <el-input v-model="form.alias" />
        </el-form-item>
        <el-form-item label="指标别名(自定义)" prop="label">
          <el-input v-model="form.label" />
        </el-form-item>
        <el-form-item label="指标类型" prop="sytpe">
          <el-select v-model="form.metricType" placeholder="请选择" style="width:185px">
            <el-option v-for="item in metricTypeOpt" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="指标维度" prop="dimension">
          <el-select v-model="form.metricDimension" multiple collapse-tags placeholder="请选择" style="width:185px">
            <el-option v-for="item in metricDimensionOpt" :key="item.value" :value="item.value+''" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <!-- <el-switch v-model="form.status" /> -->
          <el-radio-group v-model="form.status">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间对齐设置">
          <el-select v-model="form.alignUnit" placeholder="请选择" style="width:185px">
            <el-option key="不对齐" :value="0" label="不对齐" />
            <el-option key="分" :value="4" label="分" />
            <el-option key="时" :value="3" label="时" />
            <el-option key="日" :value="2" label="日" />
            <el-option key="月" :value="1" label="月" />
          </el-select>
        </el-form-item>
        <el-form-item label="指标描述" style="display:block" prop="description">
          <el-input v-model="form.description" type="textarea" rows="4" cols="60" />
        </el-form-item>
        <el-form-item label="指标所属资源类型">
          <!--  <el-cascader :options="resourceTypeOpt" v-model="form.resourceType" placeholder="试试搜索" filterable style="width:185px" @change="show" /> -->
          <el-cascader :options="treeData" v-model="form.resourceType" style="width:185px" @change="getCidParam" @blur="getCiids" />
        </el-form-item>
        <el-form-item label="采集频率" prop="collection">
          <el-input v-model="frequency" style="width:94px" />
          <el-select v-model="isFrequency" placeholder="请选择" style="width:94px">
            <!-- <el-option v-for="item in frequencyOpt" :key="item.value" :label="item.label" :value="item.value" /> -->
            <el-option key="second" :value="1" label="秒/次" />
            <!-- <el-option key="minutes" :value="2" label="分/次" /> -->
            <!-- <el-option key="hours" :value="3" label="时/次" /> -->
            <!-- <el-option key="day" :value="4" label="日/次" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="指标单位" prop="unit">
          <el-input v-model="form.unit" />
        </el-form-item>
        <el-row>
          <el-col :push="1">
            <el-tabs type="border-card" style="width:1000px" tab-position="left" center="true">
              <el-tab-pane label="指标配置">
                <el-form-item label="计算类型">
                  <el-radio-group v-model="form.calcType">
                    <el-radio :label="0">原始指标</el-radio>
                    <el-radio :label="1">聚合指标</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-card shadow="never" style="width:80%">
                  <original v-if="form.calcType===0" :data-type.sync="form.dataType" :collect-type.sync="form.collectType" />
                  <aggregation v-if="form.calcType===1" :rule-id.sync="form.ruleId" :rule-params.sync="form.ruleParams" :rule-script.sync="form.ruleScript" :source-metric.sync="form.sourceMetric" />
                </el-card>
                <el-form-item label="指标分类">
                  <el-radio-group v-model="form.category">
                    <el-radio :label="0">
                      性能指标
                    </el-radio>
                    <el-radio :label="1">
                      告警指标
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane :disabled="!form.category?true:false" label="告警配置">
                <el-row>
                  <el-col :span="4">
                    <el-card class="box-card" style="text-align:center">
                      <ol>
                        <li>
                          <a key="list_0" :class="{text:true,item:true,active:clickIndex==='list_0'}" style="display:block" href="javascript:void(0);" @click="selectTrategy(0)">
                              默认策略
                            </a>
                        </li>
                        <li>
                          <a v-for="o in excludeStrategyCount" :key="'list_'+o" :class="{text:true,item:true,active:clickIndex==='list_'+o}" style="display:block" href="javascript:void(0);" @click="selectTrategy(o)">
                              {{ '特殊策略' + o }}
                            </a>
                        </li>
                      </ol>
                      <el-button icon="el-icon-plus" size="mini" circle @click="addExcludeTrategy()" />
                      <el-button :disabled="excludeStrategyCount==0" icon="el-icon-minus" size="mini" circle @click="reduceExcludeTrategy()" />
                    </el-card>
                  </el-col>
                  <el-col :span="20">
                    <!-- <template v-if="clickIndex=='list_0'"> -->
                    <el-form-item label="校验时间">
                      <el-date-picker v-model="triggerTime" :default-time="['12:00:00']" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" />
                    </el-form-item>
                    <!--
</template>-->
                    <el-form-item v-if="clickIndex!=='list_0'" label="特殊对象选择" style="display:block">
                      <el-select v-model="triggerObj.ciid" multiple collapse-tags filterable default-first-option placeholder="请选择">
                        <el-option v-for="item in ciids" :key="item.value" :label="item.label" :value="item.value+''" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="校验器类型">
                      <el-select v-model="triggerObj.comparatorType" placeholder="请选择" style="width:200px" @change="changeComparatorType">
                        <el-option v-for="item in comparatorTypeOpt" :value="item.value" :label="item.label" :key="item.comparatorInfoId" />
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
                        <el-option value="字符串校验器" label="字符串校验器" /> -->
                      </el-select>
                    </el-form-item>
                    <el-form-item label="告警内容" style="display:block">
                      <el-input v-model="triggerObj.comparatorMsg" :autosize="{ minRows: 3, maxRows: 4}" cols="50" type="textarea" placeholder="请输入内容" />
                    </el-form-item>
                    <el-form-item label="校验器配置">
                      <el-table :data="triggerObj.thresholds" border>
                        <el-table-column prop="level" label="级别" width="112" />
                        <el-table-column prop="flag" label="阈值" width="150">
<template slot-scope="scope">
  <el-col :span="11">
    <el-input v-model="scope.row.from" />
  </el-col>
  <el-col :span="2" class="line" style="text-align:center">-</el-col>
  <el-col :span="11">
    <el-input v-model="scope.row.to" />
  </el-col>
</template>
                        </el-table-column>
                      </el-table>
                    </el-form-item>
                  </el-col>

                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClosed()">取 消</el-button>
        <el-button type="primary" @click="updateMetricsDef(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import original from './original'
  import aggregation from './aggregation'
  // import * as server from '../../../../../api/kms'
  import * as server from '../../../../../api/kms'
  var _ = require('lodash')
  export default {
    name: 'CreateDialog',
    components: {
      original,
      aggregation
    },
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
        default: 'create'
      }
    },
    data() {
      return {
        ciids: [{
          value: '选项1',
          label: '主机1'
        }, {
          value: '选项2',
          label: '主机2'
        }, {
          value: '选项3',
          label: '主机3'
        }, {
          value: '选项4',
          label: '主机4'
        }, {
          value: '选项5',
          label: '主机5'
        }],
        putFlag: 0,
        value5: [],
        value11: [],
        activeName2: 'first',
        title: '',
        input: '',
        value: '',
        value1: '',
        checkType: '',
        // visible: false,
        // innerVisible: false,
        check: false,
        choose: '1',
        copyForm: _.cloneDeep(this.form),
        form: {
          name: '',
          alias: '',
          calcType: 0,
          category: 0,
          taskId: '',
          code: '',
          collectType: [0],
          createTime: 0,
          dataType: 0,
          description: '',
          founder: '',
          frequency: 0,
          label: '',
          metricDimension: [],
          metricId: 0,
          metricType: '',
          resourceType: [],
          ruleId: undefined,
          ruleParams: '',
          ruleScript: '',
          sourceMetric: [],
          status: 0,
          alignUnit: 0,
          trigger: {},
          unit: ''
        },
        initForm: {},
        frequency: '',
        isFrequency: 1, // 频率
        triggerTime: () => {
          [this.triggerObj.startTime, this.triggerObj.endTime]
        },
        triggerObj: {
          // triggerTime: [
          //   new Date(),
          //   new Date()
          // ],
          startTime: new Date(),
          endTime: new Date(),
          ciid: [],
          // comparator: {
          //   type: '数值校验器',
          //   content: '${kpi_name}=${kpi_value},大于${threshold},触发告警'
          // },
          comparatorType: '',
          comparatorMsg: '',
          thresholds: [{
              level: '严重',
              value: 'critical',
              from: '',
              to: ''
            },
            {
              level: '主要',
              value: 'major',
              from: '',
              to: ''
            },
            {
              level: '一般',
              value: 'normal',
              from: '',
              to: ''
            },
            {
              level: '恢复',
              value: 'reset',
              from: '',
              to: ''
            }
          ]
        },
        // triggerObj: {
        //   // triggerTime: [
        //   //   new Date(),
        //   //   new Date()
        //   // ],
        //   startTime: new Date(),
        //   endTime: new Date(),
        //   ciid: [],
        //   // comparator: {
        //   //   type: '数值校验器',
        //   //   content: '${kpi_name}=${kpi_value},大于${threshold},触发告警'
        //   // },
        //   comparatorType: '数值校验器',
        //   comparatorMsg: '${kpi_name}=${kpi_value},大于${threshold},触发告警',
        //   thresholds: {
        //     critical: {
        //       from: '90',
        //       to: '100'
        //     },
        //     major: {
        //       from: '80',
        //       to: '90'
        //     },
        //     normal: {
        //       from: '70',
        //       to: '80'
        //     },
        //     reset: {
        //       from: '0',
        //       to: '65'
        //     }
        //   }
        // },
        // triggerObj2: {
        //   'ciid': '',
        //   'startTime': '2018-10-06 10:09:20',
        //   'endTime': '2018-10-06 10:09:20',
        //   'comparatorType': '数值校验器',
        //   'comparatorMsg': '${kpi_name}=${kpi_value},大于${threshold},触发告警',
        //   'thresholds': {
        //     'reset': {
        //       'from': 0,
        //       'to': 65
        //     },
        //     'normal': {
        //       'from': 70,
        //       'to': 80
        //     },
        //     'major': {
        //       'from': 80,
        //       'to': 90
        //     },
        //     'critical': {
        //       'from': 90,
        //       'to': 100
        //     }
        //   }
        // },
        normalStrategy: {},
        excludeStrategy: [],
        excludeStrategyCount: 0,
        metricTypeOpt: [],
        metricDimensionOpt: [],
        comparatorTypeOpt: [],
        comparatorContentMap: {},
        // confTable:,
        formLabelWidth: '120px',
        codeOptions: [{
          value: 'PM-00-01-001-01',
          label: 'PM-00-01-001-01'
        }, {
          value: 'PM-00-01-001-02',
          label: 'PM-00-01-001-02'
        }, {
          value: 'PM-00-01-001-03',
          label: 'PM-00-01-001-03'
        }],
        metricsDefData: [{
            num: '1',
            name: 'ss_q',
            alias: '指标1',
            code: 'PM-00-01-001-03',
            source_metric: 'MySql',
            frequency: '1h',
            calc_type: '平台采集',
            status: '是'
          },
          {
            num: '1',
            name: 'ss_q',
            alias: '指标1',
            code: 'PM-00-01-001-03',
            source_metric: 'MySql',
            frequency: '1h',
            calc_type: '平台采集',
            status: '是'
          },
          {
            num: '1',
            name: 'ss_q',
            alias: '指标1',
            code: 'PM-00-01-001-03',
            source_metric: 'MySql',
            frequency: '1h',
            calc_type: '平台采集',
            status: '是'
          },
          {
            num: '1',
            name: 'ss_q',
            alias: '指标1',
            code: 'PM-00-01-001-03',
            source_metric: 'MySql',
            frequency: '1h',
            calc_type: '平台采集',
            status: '是'
          }
        ],
        code: '',
        clickIndex: 'list_0',
        formInline: {
          name: '',
          code: 'test_metrics-kafka',
          metric_type: '',
          startTime: '',
          endTime: ''
        },
        rules: {
          name: [{
            required: true,
            message: '请输入指标名',
            trigger: 'blur'
          }],
          code: [{
            required: true,
            message: '请输入字母或者数字',
            trigger: 'blur'
          }],
          alias: [{
            required: true,
            message: '请输入指标别名',
            trigger: 'blur'
          }],
          description: [{
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }],
          unit: [{
            required: true,
            message: '请输入指标单位',
            trigger: 'blur'
          }],
          sytpe: [{
            required: true,
            message: '请选择指标类型',
            trigger: 'change'
          }],
          collection: [{
            required: true,
            type: 'number',
            message: '请输入数字'
          }],
          dimension: [{
            required: true,
            message: '请选择指标维度',
            trigger: 'change'
          }]
        }
      }
    },
    computed: {
      treeData() {
        // //debugger
        return this.$store.state.resourceManagement.treeData
      }
      // confTable(){
      //   return this.objToTable(this.normalStrategyObj)
      // }
    },
    watch: {
      'form.dataType': function(newValue, oldValue) {
        console.info(newValue)
      },
      // 'form.resourceType': function(newValue, oldValue) {
      //   console.info(newValue)
      //   //debugger
      // },
      // 'form.collectType': function(newValue, oldValue) {
      //   console.info(newValue)
      // },
      'triggerTime': {
        handler(newValue, oldValue) {
          console.log('triggerObj', newValue)
          this.triggerObj.startTime = newValue[0]
          this.triggerObj.endTime = newValue[1]
          // //debugger
        },
        deep: true
      },
      updateType: {
        handler(newValue, oldValue) {
          this.initData()
          if (newValue === 'create') {
            this.form = this.copyForm
            this.frequency = ''
            this.initTrigger()
            this.triggerTime = [new Date(), new Date()]
          }
        },
        immediate: true
      },
      outerData: {
        handler(newValue, oldValue) {
          // //debugger
          // debugger
          if (JSON.stringify(newValue) !== '{}') {
            // debugger
            var subForm = _.cloneDeep(newValue)
            subForm.resourceType = subForm.resourceType.split('.')
            // debugger
            this.$set(this, 'form', subForm)
            // this.form = subForm
            this.frequency = subForm.frequency
            if (subForm.trigger.hasOwnProperty('excludeStrategy')) {
              this.excludeStrategy = subForm.trigger.excludeStrategy
              this.excludeStrategyCount = this.excludeStrategy.length
            }
            // console.log('outerData.trgger', subForm)
            // //debugger
            this.normalStrategy = subForm.trigger.normalStrategy
            // this.triggerTime = [this.normalStrategy.startTime, this.normalStrategy.endTime]
            // this.selectTrategy(this.currentIndex)
            this.triggerObj = this.parseNormalStrategyObj(this.normalStrategy)
            // this.confTable = this.objToTable(subForm.thresholds)
            // console.log('this.normalStrategy', this.normalStrategy)
            // //debugger
            // console.info(JSON.stringify(this.excludeStrategy))
          } else {
            this.form = this.copyForm
            this.frequency = ''
            this.initTrigger()
            this.triggerTime = [new Date(), new Date()]
          }
          // console.info(this.triggerObj.conf)
        },
        deep: true
        // immediate: true
      },
      // 'triggerObj.comparatorType': {
      //   handler(newValue, oldValue) {
      //     this.triggerObj.comparatorMsg = this.comparatorContentMap[newValue]
      //     // //debugger
      //   }
      // },
      // confTable: {
      //   handler(newValue, oldValue) {
      //     this.triggerObj.thresholds = this.tableToObj(newValue)
      //     // console.info(this.triggerObj.conf)
      //   },
      //   deep: true,
      //   immediate: true
      // },
      // frequency: {
      //   handler(newValue, oldValue) {
      //     // //debugger
      //     this.form.frequency = Number(newValue) * this.isFrequency
      //     // console.info(this.form.frequency)
      //   },
      //   immediate: true
      // },
      // isFrequency: {
      //   handler(newValue, oldValue) {
      //     let count = 60
      //     count = newValue === 2 ? count * 60 : count
      //     count = newValue === 3 ? count * 60 * 60 : count
      //     count = newValue === 4 ? count * 60 * 60 * 60 : count
      //     this.form.frequency = Number(this.frequency) * count
      //     // //debugger
      //     // console.info(this.form.frequency)
      //   }
      //   // immediate: true
      // },
      frequency: {
        handler: function handler(newValue, oldValue) {
          var flag = this.isFrequency
          var count = 1
          count = flag === 2 ? count * 60 : count
          count = flag === 3 ? count * 60 * 60 : count
          count = flag === 4 ? count * 60 * 60 * 60 : count
          console.info(this.form.frequency)
          this.form.frequency = Number(newValue) * count
          // //debugger
        }
        // immediate: true
      },
      clickIndex(newValue, oldValue) {
        console.info(newValue)
      },
      triggerObj: {
        handler(newValue, oldValue) {
          const tempIndex = this.clickIndex
          const index = Number(tempIndex.replace('list_', ''))
          if (index === 0) {
            this.normalStrategy = this.createNormalStrategyObj(this.triggerObj)
          } else {
            this.excludeStrategy[index - 1] = this.createExcludeStrategyObj(this.triggerObj)
          }
          const obj = {}
          obj['excludeStrategy'] = this.excludeStrategy
          obj['normalStrategy'] = this.normalStrategy
          // //debugger
          // this.form.trigger = _.assign(this.form.trigger, this.normalStrategy, obj)
          this.form.trigger = _.assign(this.form.trigger, obj)
          // this.triggerObj.conf = this.tableToObj(newValue)
          // console.info(JSON.stringify(this.form.trigger))
        },
        deep: true,
        immediate: true
      }
    },
    // mounted() {
    //   console.info(this.outerVisible)
    // },
    created() {
      if (!this.$store.state.resourceManagement.on_treeData) {
        this.$store.dispatch('treeData')
      }
      this.initData()
      // this.$message('新增成功！')
      // this.form
      // ////debugger
      // this.initTrigger()
      // console.info('yes')
      // console.info(_.uniqBy([{ 'value': 1 }, { 'value': 2 }, { 'value': 1 }], 'value'))
      // console.info('time')
      // console.info(_.split('2018-11-06 00:00:00', /-| |:/))
      // visible = this.outerVisible
      // this.getMetricsDef()
      // console.info(this.form)
      // let
      // this.form.trigger = _.assign(this.createNormalStrategy(), { 'excludeStrategy': [] })
      // this.form.trigger.excludeStrategy.push(this.createExcludeStrategy())
      // console.info(JSON.stringify(this.form.trigger))
      // _.remove(this.form.trigger.excludeStrategy, function(value, index, array) { return index == 0 })
      // console.info(JSON.stringify(this.form.trigger))
      // let obj = this.createExcludeStrategyObj()
      // console.info(obj)
      // obj = this.parseExcludeStrategyObj(obj)
      // console.info(obj)
    },
    mounted() {
      // console.info(this.form)
      // console.info(JSON.stringify(this.form))
      // console.info(this.form.resourceType)
      // this.from.trigger = this.triggerObj
      // console.info('this.from.trigger')
      // ////debugger
      // console.info(this.triggerObj)
      // ////debugger
    },
    methods: {
      createNormalStrategyObj(triggerObj) {
        let normalStrategyObj = _.cloneDeep(triggerObj)
        // delete excludeStrategyObj['triggerTime']
        normalStrategyObj = _.omit(normalStrategyObj, 'ciid')
        normalStrategyObj.ciid = ''
        normalStrategyObj = JSON.parse(JSON.stringify(normalStrategyObj))
        const startTime = new Date(normalStrategyObj.startTime)
        const endTime = new Date(normalStrategyObj.endTime)
        // var tempTime = {}
        normalStrategyObj['startTime'] = parseInt((startTime.getTime()) / 1000)
        // //debugger
        normalStrategyObj['endTime'] = parseInt((endTime.getTime()) / 1000)
        // debugger
        normalStrategyObj['thresholds'] = this.tableToObj(normalStrategyObj['thresholds'])
        // normalStrategyObj.triggerTime = tempTime
        return normalStrategyObj
        // console.info(normalStrategyObj)
      },
      parseNormalStrategyObj(normalStrategyObj) {
        // console.info(JSON.stringify(normalStrategyObj))
        normalStrategyObj = JSON.parse(JSON.stringify(normalStrategyObj))
        // this.form.trigger = _.assign(normalStrategyObj, { 'excludeStrategy': [] })
        // ////debugger
        const startTime = new Date(Number(normalStrategyObj['startTime']) * 1000)
        const endTime = new Date(Number(normalStrategyObj['endTime']) * 1000)
        var array = []
        array.push(startTime)
        array.push(endTime)
        this.triggerTime = array
        // //debugger
        const newNormalStrategyObj = {}
        _.assign(newNormalStrategyObj, normalStrategyObj, {
          'ciid': []
        })
        newNormalStrategyObj.thresholds = this.objToTable(normalStrategyObj.thresholds)
        // //debugger
        return newNormalStrategyObj
      },
      createExcludeStrategyObj(triggerObj) {
        let excludeStrategyObj = _.cloneDeep(triggerObj)
        // delete excludeStrategyObj['triggerTime']
        // excludeStrategyObj = _.omit(excludeStrategyObj, 'startTime')
        const startTime = new Date(excludeStrategyObj.startTime)
        const endTime = new Date(excludeStrategyObj.endTime)
        excludeStrategyObj.startTime = parseInt((startTime.getTime()) / 1000)
        // excludeStrategyObj = _.omit(excludeStrategyObj, 'endTime')
        excludeStrategyObj.endTime = parseInt((endTime.getTime()) / 1000)
        excludeStrategyObj.ciid = excludeStrategyObj.ciid.join(',')
        excludeStrategyObj = JSON.parse(JSON.stringify(excludeStrategyObj))
        excludeStrategyObj['thresholds'] = this.tableToObj(excludeStrategyObj['thresholds'])
        // console.info(JSON.stringify(excludeStrategyObj))
        return excludeStrategyObj
      },
      parseExcludeStrategyObj(excludeStrategyObj) {
        const newExcludeStrategyObj = JSON.parse(JSON.stringify(excludeStrategyObj))
        // console.info('supersea')
        // console.info(newExcludeStrategyObj)
        const startTime = new Date(Number(newExcludeStrategyObj['startTime']) * 1000)
        const endTime = new Date(Number(newExcludeStrategyObj['endTime']) * 1000)
        var array = []
        array.push(startTime)
        array.push(endTime)
        this.triggerTime = array
        // //debugger
        const ciid = newExcludeStrategyObj.ciid
        newExcludeStrategyObj.ciid = _.compact(_.split(ciid, ','))
        newExcludeStrategyObj.thresholds = this.objToTable(newExcludeStrategyObj.thresholds)
        return newExcludeStrategyObj
      },
      addExcludeTrategy() {
        const obj = this.createExcludeStrategyObj(this.triggerObj)
        // if (!this.form.trigger.hasOwnProperty('excludeStrategy')) {
        //   this.form.trigger = _.assign(this.createExcludeStrategyObj(), { 'excludeStrategy': [] })
        // }
        this.excludeStrategy.push(obj)
        // console.info(JSON.stringify(this.excludeStrategy))
        this.excludeStrategyCount++
      },
      reduceExcludeTrategy() {
        if (this.excludeStrategy.length > 0) {
          this.excludeStrategy.pop()
          if (('list_' + this.excludeStrategyCount) === this.clickIndex && this.excludeStrategyCount > 0) {
            this.clickIndex = 'list_' + (this.excludeStrategyCount - 1)
            this.selectTrategy(this.excludeStrategyCount - 1)
          }
          this.excludeStrategyCount--
        }
      },
      selectTrategy(currentIndex) {
        this.$nextTick(
          function() {
            this.clickIndex = 'list_' + currentIndex
            let currentStrategyObj = {}
            if (currentIndex > 0) {
              // console.info(currentIndex)
              currentStrategyObj = this.excludeStrategy[currentIndex - 1]
              this.triggerObj = this.parseExcludeStrategyObj(currentStrategyObj)
            } else {
              currentStrategyObj = this.normalStrategy
              this.triggerObj = this.parseNormalStrategyObj(currentStrategyObj)
            }
          }
        )
        // console.info(this.triggerObj)
        // alert(this.clickIndex)
      },
      initData() {
        this.copyForm = _.cloneDeep(this.form)
        this.copyTrigger = _.cloneDeep(this.triggerObj)
        this.getMetricTypeOpt()
        this.getMetricDimensionOpt()
        this.getComparatorInfoOpt()
      },
      initTrigger() {
        // debugger
        this.triggerObj = this.copyTrigger
        this.normalStrategy = this.createNormalStrategyObj(this.copyTrigger)
        this.excludeStrategy = []
        this.excludeStrategyCount = 0
        // //debugger
        // this.normalStrategy = this.createNormalStrategyObj(this.triggerObj)
        //       this.excludeStrategy.push(obj)
        // // console.info(JSON.stringify(this.excludeStrategy))
        // this.excludeStrategyCount++
        // console.info('this.normalStrategy')
        // console.info(this.normalStrategy)
        // this.form.trigger = _.assign(this.form.trigger, this.normalStrategy, { 'excludeStrategy': [] })
        // console.info(this.form.trigger)
      },
      dialogClosed() {
        // console.info('yes')
        this.$emit('closedEvent', false)
        this.form.name = ''
        this.form.code = ''
        this.form.alias = ''
        this.form.label = ''
        this.form.description = ''
        this.form.metricType=''
        this.form.unit = ''
        this.form.metricDimension=''
      },
      getMetricTypeOpt() {
        server.getMetricsType({
          'limit': 1000,
          'start': 1
        }).then(
          res => {
            const data = res.metricsData
            // //debugger
            this.metricTypeOpt = _.uniqBy(data.map(item => {
              return {
                value: item.alias,
                label: item.alias
              }
              // var map = {}
              // map[item.typeId] = item.alias
              // return map
            }), 'value')
            // console.info(this.metricTypeOpt)
            // const metricsTypeData = res
            // 查询
          }, error => {
            console.error('请求异常！' + error)
          })
      },
      getMetricDimensionOpt() {
        server.getMetricsDimension({
          'limit': 1000,
          'start': 1
        }).then(
          res => {
            const data = res.metricsData
            // //debugger
            this.metricDimensionOpt = data.map(item => {
              return {
                value: item.alias,
                label: item.alias
              }
            })
            // const metricsTypeData = res
            // ////debugger
          }, error => {
            console.error('请求异常！' + error)
          })
      },
      getComparatorInfoOpt() {
        server.getComparatorInfo().then(
          res => {
            const data = res.metricsData
            this.comparatorTypeOpt = _.uniqBy(data.map(item => {
              return {
                value: item.alias,
                label: item.alias
              }
            }), 'value')
            // //debugger
            var obj = {}
            data.forEach(item => {
              obj[item.alias] = item.content
            })
            this.comparatorContentMap = obj
            // ////debugger
            // const metricsTypeData = res
            // ////debugger
          }, error => {
            console.error('请求异常！' + error)
          })
      },
      getMetricsDef() {
        server.getMetricsDef().then(res => {
          this.metricsDefData = res.metricsData
          this.codeOptions = _.uniqBy(this.metricsDefData.map(item => {
            return {
              value: item.code,
              label: item.code
            }
          }), 'value')
        }, error => {
          console.error('请求异常！' + error)
        })
      },
      postMetricsDef(form) {
        server.postMetricsDef(form)
          .then(res => {
            this.$refs.form.validate((valid) => {
              if (valid) {
                this.$message({
                  showClose: true,
                  message: '新增成功！',
                  type: 'success'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '新增失败！',
                  type: 'error'
                })
                return false
              }
            })
            /*   this.$message({
            showClose: true,
            message: '新增成功！',
            type: 'success'
          })*/
          }, error => {
            this.$message({
              showClose: true,
              message: '新增失败！',
              type: 'error'
            })
            console.error('请求异常！' + error)
          })
      },
      putMetricsDef(form) {
        server.putMetricsDef([form]).then(res => {
          res
          this.$message({
            showClose: true,
            message: '修改成功！',
            type: 'success'
          })
        }, error => {
          this.$message({
            showClose: true,
            message: '修改失败！',
            type: 'error'
          })
          console.error('请求异常！' + error)
        })
      },
      updateMetricsDef(form) {
        var subForm = _.cloneDeep(form)
        subForm.resourceType = subForm.resourceType.join('.')
        subForm.taskId = subForm.taskId ? subForm.taskId : ''
        subForm.ruleParams = subForm.ruleParams ? subForm.ruleParams : ''
        subForm.trigger.normalStrategy.ciid = ''
        // server.putMetricsDef(subForm).then(res => {
        //   res
        // }, error => {
        //   console.error('请求异常！' + error)
        // })
        console.log('subForm.type', JSON.stringify(subForm))
        // //debugger
        if (this.updateType === 'create') {
          this.postMetricsDef(subForm)
        } else if (this.updateType === 'update') {
          this.putMetricsDef(subForm)
        }
        // this.que
        // console.log('subForm.type', JSON.stringify(subForm))
        // //debugger
        // if (this.updateType === 'create') { this.postMetricsDef(subForm) } else if (this.updateType === 'update') { this.putMetricsDef(subForm) }
        // console.info(JSON.stringify(subForm))
        // //debugger
        this.dialogClosed()
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.form.name = ''
            this.form.alias = ''
            this.form.label = ''
            this.form.code = ''
            this.description = ''
            this.unit = ''
          } else {
            alert('不允许提交空白表单!请完整填写弹框信息！')
            return false
          }
        })
      },
      getCidParam(val) {
        this.$set(this, 'cidParam', '')
        const length = val.length
        this.cidParam = val[length - 1]
        // console.info(this.cidParam)
      },
      getCiids() {
        const params = {
          'model': this.cidParam
        }
        if (this.cidParam === undefined) {
          this.ciids = {}
          return
        }
        // //debugger
        server.getCIIDS(params).then(
          res => {
            const data = res.datas[this.cidParam]
            if (!data) {
              this.ciids = []
              return
            }
            this.ciids = data.map(item => {
              return {
                value: item.ciid,
                label: item.ciname
              }
            })
          }
        )
        // //debugger
        // 上级cidparam
        // console.info(val)
        // const length = val.length
        // this.cidParam = val[length - 1]
      },
      tableToObj(table) {
        const obj = {}
        // debugger
        table.map(v => {
          const {
            level,
            value,
            from,
            to
          } = v
          this.$set(obj, value, {})
          this.$set(obj[value], 'from', from)
          this.$set(obj[value], 'to', to)
        })
        // console.info(obj)
        return obj
      },
      objToTable(obj) {
        const table = [{
            level: '严重',
            value: 'critical',
            from: obj.critical.from,
            to: obj.critical.to
          },
          {
            level: '主要',
            value: 'major',
            from: obj.major.from,
            to: obj.major.to
          },
          {
            level: '一般',
            value: 'normal',
            from: obj.normal.from,
            to: obj.normal.to
          },
          {
            level: '恢复',
            value: 'reset',
            from: obj.reset.from,
            to: obj.reset.to
          }
        ]
        return table
      },
      // 默认返回yyyy-MM-dd HH:mm:ss
      // dateFormatter(str) {
      //   var hasTime = arguments[1] !== false // 可传第二个参数false，返回yyyy-MM-dd
      //   var d = new Date(str)
      //   var year = d.getFullYear()
      //   var month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()
      //   var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
      //   var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
      //   var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
      //   var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
      //   if (hasTime) {
      //     return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
      //   } else {
      //     return [year, month, day].join('-')
      //   }
      // },
      // stringToDate(str) {
      //   var dateObj = _.split(str, /-| |:/)
      //   var [year, month, day, hour, minute, second] = dateObj
      //   return new Date(year, month, day, hour, minute, second)
      // },
      changeComparatorType(newValue) {
        // //debugger
        this.triggerObj.comparatorMsg = this.comparatorContentMap[newValue]
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .block {
    margin: 20px 0 12px 0;
  }
  .text {
    font-size: 14px;
  }
  .item {
    padding: 8px 0;
  }
  .active {
    background-color: #409eff;
    color: white;
  }
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
