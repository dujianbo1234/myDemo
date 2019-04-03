<template>
  <div>
    <el-form>
      <el-form-item label="计算规则" style="display:block">
        <el-select v-model="myRuleId" placeholder="请选择" @change="changeRuleScript(myRuleId)">
          <el-option v-for="item in metricRuleOpt" :key="item.label" :label="item.label" :value="Number(item.value)" />
        </el-select>
      </el-form-item>
      <el-form-item label="源输入指标" style="display:block">
        <!-- <el-select
    v-model="value10"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签">
    <el-option
      v-for="item in options5"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select> -->
        <!--  <el-select v-model="myRuleId" placeholder="请选择" @change="changeRuleScript(myRuleId)">
          <el-option v-for="item in metricRuleOpt" :key="item.label" :label="item.label" :value="Number(item.value)" />
        </el-select> -->
        <el-input v-model="mySourceMetric" type="text" style="width:200px" placeholder="请输入内容" @blur="changeSourceMetric"/>
      </el-form-item>
      <el-form-item label="规则脚本" style="display:block">
        <!-- <el-input
            v-model="ruleScript"
            style="width:50%"/> -->
        <el-input v-model="myRuleScript" type="textarea" readOnly="true" autosize style="width:650px" placeholder="禁止输入"/>
      </el-form-item>
      <el-form-item label="规则参数:" style="display:block">
        <template v-if="paramsMap.length > 0">
          <ul>
            <!-- <li v-for="key of Object.keys(paramsMap)" :key="key">
              <el-form-item class="el-margin-bottom">
                <el-tag>{{ key }}</el-tag>
                <el-input v-model="paramsMap[key]" style="width:80px" @blur="changeParamsMap(key,paramsMap[key])"/>
              </el-form-item>
            </li> -->
            <li v-for="(item, index) in paramsMap">
              <el-form-item class="el-margin-bottom">
                <el-tag>{{ item.name }}</el-tag>
                <el-input v-model="paramsMap[index].value" :placeholder="item.type" style="width:120px" @blur="changeParamsMap(index)"/>
              </el-form-item>
            </li>
          </ul>
        </template>
        <template v-else>
          该脚本未包含参数
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMetricsRule } from '../../../../../api/kms'
// import { debug } from 'util'
var _ = require('lodash')
export default {
  name: 'Original',
  props: {
    ruleId: {
      type: Number,
      default: undefined
    },
    ruleParams: {
      type: String,
      default: ''
    },
    ruleScript: {
      type: String,
      default: ''
    },
    sourceMetric: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dataType: '',
      paramsMap: [],
      myRuleId: this.ruleId,
      myRuleParams: this.ruleParams,
      myRuleScript: this.ruleScript,
      metricRuleOpt: [],
      mySourceMetric: this.sourceMetric.join(','),
      paramsValue: ''
    }
  },
  watch: {
    ruleId: {
      handler(newValue, oldValue) {
        this.myRuleId = newValue
        // debugger
        // changeRuleScript(myRuleId)
      },
      immediate: true
    },
    ruleScript: {
      handler(newValue, oldValue) {
        this.myRuleScript = newValue
        // debugger
        // changeRuleScript(myRuleId)
      },
      immediate: true
    },
    ruleParams: {
      handler(newValue, oldValue) {
        this.myRuleParams = newValue
        // debugger
        // changeRuleScript(myRuleId)
      },
      immediate: true
    },
    sourceMetric: {
      handler(newValue, oldValue) {
        this.mySourceMetric = newValue.join(',')
        // debugger
        // changeRuleScript(myRuleId)
      },
      immediate: true,
      deep: true
    }
    // ruleParams: {
    //   handler(newValue, oldValue) {
    //     this.myRuleId = newValue
    //     // debugger
    //     changeRuleScript(myRuleId)
    //   },
    //   immediate: true
    // },

    // ruleScript: {
    //   handler(newValue, oldValue) {
    //     // console.info(this.paramsMap)
    //     this.paramsMap = {}
    //     if (this.myRuleParams !== '') {
    //       try {
    //         this.paramsMap = JSON.parse(this.myRuleParams)
    //         // debugger
    //         return
    //       } catch (e) {
    //         this.paramsMap = {}
    //       }
    //       // debugger
    //     }
    //     let params = newValue.match(/{[^{]+?}/gm)
    //     params = params == null ? [] : params
    //     const length = params.length
    //     for (let i = 0; i < length; i++) {
    //       let param = params[i]
    //       param = param.replace('{', '').replace('}', '')
    //       this.paramsMap[param] = ''
    //       // this.paramsMap.push(obj)
    //     }
    //     // this.myRuleParams = JSON.stringify(this.paramsMap)
    //     // console.info(this.paramsMap !== {})
    //     // debugger
    //   },
    //   immediate: true
    // }
  },
  created() {

    // if(this.ruleId)
    // this.changeRuleScript(this.ruleId)
    // console.info('this.myRuleId')
    // console.info(this.myRuleId)
  },
  mounted() {
    this.init()
    // debugger
    this.getMetricRuleOpt()
    // console.info(this.metricRuleOpt)

    // this.changeRuleScript(this.ruleId)
    // console.info(this.paramsMap)
    // debugger
  },
  methods: {
    init() {
      console.info(this.ruleParams)
      // debugger
      // this.myRuleId = this.ruleId
      // this.myRuleParams = this.ruleParams
      // this.myRuleScript = this.ruleScript
    },
    getMetricRuleOpt() {
      getMetricsRule().then(
        res => {
          const data = res.metricsData
          // debugger
          this.metricRuleOpt = data.map(item => {
            // debugger
            return { value: item.ruleId, label: item.name, script: item.scriptTemplet, params: item.paramsTemplet }
          })
          this.changeRuleScript(this.ruleId)
          // const metricsTypeData = res
          // debugger
        })//
    },
    changeRuleScript(value) {
      const index = _.findIndex(this.metricRuleOpt, function(o) { return o.value === value })
      // debugger
      let RuleParams = ''
      if (index > -1) {
        this.myRuleScript = this.metricRuleOpt[index].script
        RuleParams = this.metricRuleOpt[index].params
      }
      // debugger
      if (RuleParams !== '') {
        this.paramsMap = JSON.parse(RuleParams)
      } else {
        this.paramsMap = []
      }

      // debugger
      // this.myRuleParams = { 'dsada': 'dasda', 'dd': 'das' }
      // this.myRuleParams = JSON.stringify(this.myRuleParams)
      // if (this.ruleParams === '') {
      //   this.paramsMap = JSON.parse(this.metricRuleOpt[index].params)
      //   // debugger
      //   this.paramsMap.forEach(item => {
      //     item.value = ''
      //   }
      //   )
      this.initParamsMap()
      this.updateRuleId(this.myRuleId)
      this.updateRuleScript(this.myRuleScript)
    },
    initParamsMap() {
      // debugger
      if (this.ruleParams !== '') {
        this.myRuleParams = JSON.parse(this.ruleParams)
      } else {
        this.myRuleParams = {}
      }
      this.paramsMap.forEach(item => {
        item.value = ''
        if (this.myRuleParams[item.name]) { item.value = this.myRuleParams[item.name] }
      })
    },
    changeParamsMap(index) {
      // this.paramsMap[index].value = value
      // this.myRuleParams = JSON.stringify()
      // debugger
      this.myRuleParams = {}
      this.paramsMap.forEach(item => {
        this.myRuleParams[ item.name ] = item.value
      }
      )
      // debugger
      this.updateRuleParams(JSON.stringify(this.myRuleParams))
      // console.info(this.myRuleParams)
    },
    changeSourceMetric() {
      this.updateSourceMetric(this.mySourceMetric.split(','))
    },
    updateRuleId(ruleId) {
      this.$emit('update:ruleId', ruleId)
      // debugger
    },
    updateRuleParams(ruleParams) {
      this.$emit('update:ruleParams', ruleParams)
      // debugger
    },
    updateRuleScript(ruleScript) {
      this.$emit('update:ruleScript', ruleScript)
    },

    updateSourceMetric(sourceMetric) {
      this.$emit('update:sourceMetric', sourceMetric)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .el-margin-bottom {
    margin-bottom: 5px;
  }
</style>
