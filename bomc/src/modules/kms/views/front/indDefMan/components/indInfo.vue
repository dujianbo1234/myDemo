<template>
  <div style="background-color:white" class="a">
    <el-card shadow="never" class="block">
      <el-row :gutter="20" class="">
        <el-col :span="10" :push="3">
          <label for="indicatorType" style="width:50%">指标名称:</label>
          <el-input id="indicatorType" v-model="search.name" size="medium" style="width:50%" placeholder="请输入内容" />
        </el-col>
        <el-col :span="10" :push="1">
          <label for="indicatorType" style="width:50%">指标编码:</label>
          <el-select v-model="search.code" filterable default-first-option placeholder="请选择编码">
            <el-option label="全部" value="" selected>全部</el-option>
            <el-option v-for="item in codeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" :push="3">
          <label for="indicatorType" style="width:50%">指标类型:</label>
          <el-input id="indicatorType" v-model="search.type" size="medium" style="width:50%" placeholder="请输入内容" />
          <el-button type="primary" style="margin:0 0 0 10px" @click="queryMetricsDef(search)">
            搜索
          </el-button>
          <el-button type="primary" style="margin:0 0 0 10px" @click="reset">
            重置
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-row class="btnInfo">
      <el-col>
        <el-button type="primary" @click="outerVisible = true, updateType='create'">新增指标</el-button>
        <!-- <el-button type="primary">修改指标</el-button> -->
        <el-button :disabled="multipleSelectionIds===''" type="danger" @click="deleteMetricsDefData(multipleSelectionIds)">批量删除</el-button>
        <!-- <el-button type="primary">批量启用</el-button>
              <el-button type="primary">批量停用</el-button> -->
      </el-col>
    </el-row>
    <el-row class="block">
      <el-col :span="24">
        <el-table ref="multipleTable" :data="metricsDefData" :fit="true" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange($event)"  >
          <el-table-column type="selection" width="50" fixed="left" />
          <!-- <el-table-column prop="metricId" label="序号" /> -->
          <el-table-column prop="name" label="指标名" />
          <el-table-column prop="alias" label="指标别名" />
          <el-table-column prop="metricType" label="指标类型" />
          <el-table-column prop="code" label="指标编码" />
          <el-table-column prop="resourceType" label="所属资源类型" width="120" />
          <el-table-column label="采集频率">
            <template slot-scope="scope">
                  {{ scope.row.frequency+'s' }}
</template>
          </el-table-column>
          <el-table-column :formatter="formatterCalcType" prop="calcType" label="计算类型" />
          <el-table-column :formatter="formatterStatus" prop="status" label="任务状态" />
          <el-table-column fixed="right" width="220" label="任务操作">
<template slot-scope="scope">
  <el-tooltip class="item" effect="dark" content="启动" placement="top-start">
    <el-button type="text" size="mini" class="el-button-padding" circle @click="operate(scope.$index,5)">
      <svg-icon icon-class="start" style="font-size:2em;" />
      <!-- <i class="el-icon-circle-check-outline"/> -->
    </el-button>
  </el-tooltip>
  <el-tooltip class="item" effect="dark" content="停止" placement="top-start">
    <el-button type="text" size="mini" class="el-button-padding" circle @click="operate(scope.$index, 4)">
      <svg-icon icon-class="black" style="font-size:2em" />
      <!-- <i class="el-icon-circle-close-outline"/> -->
    </el-button>
  </el-tooltip>
  <el-tooltip class="item" effect="dark" content="暂停" placement="top-start">
    <el-button type="text" size="mini" class="el-button-padding" circle @click="operate(scope.$index, 2)">
      <svg-icon icon-class="stop" style="font-size:2em" />
      <!-- <i class="el-icon-circle-close-outline"/> -->
    </el-button>
  </el-tooltip>
  <el-tooltip class="item" effect="dark" content="恢复" placement="top-start">
    <el-button type="text" size="mini" class="el-button-padding" circle @click="operate(scope.$index, 1)">
      <svg-icon icon-class="restart" style="font-size:2em" />
      <!-- <i class="el-icon-circle-close-outline"/> -->
    </el-button>
  </el-tooltip>
  <el-tooltip class="item" effect="dark" content="重分配" placement="top-start">
    <el-button type="text" size="mini" class="el-button-padding" circle @click="operate(scope.$index,3)">
      <svg-icon icon-class="balance" style="font-size:2em" />
      <!-- <i class="el-icon-circle-close-outline"/> -->
    </el-button>
  </el-tooltip>
</template>
          </el-table-column>
          <el-table-column fixed="right" width="100" label="编辑操作">
<template slot-scope="scope">
  <el-button type="primary" size="mini" class=".el-button-padding" icon="el-icon-edit" circle @click="putMetricsDefData(scope.$index)">
    <!-- <i class="el-icon-edit"/> -->
    <!-- <svg-icon icon-class="edit" /> -->
    <!-- 修改 -->
  </el-button>
  <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="deleteMetricsDefData(scope.row.metricId)">
    <!-- <i class="el-icon-delete"/> -->
    <!-- <svg-icon icon-class="delete" /> -->
    <!-- 删除 -->
  </el-button>
</template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          :total="dataCount"
          align="right"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </el-col>
    </el-row>
    <create-dialog :outer-visible="outerVisible" :update-type="updateType" :outer-data="outerData" @closedEvent="handleClose"/>
  </div>
</template>

<script>
  import createDialog from './indInfoComponents/createDialog'
  import * as server from '../../../../api/kms'
  var _ = require('lodash')
  export default {
    name: 'IndInfo',
    components: {
      createDialog
    },
    data() {
      return {
        // 指标查询表单
        search: {
          name: '',
          code: '',
          metricType: ''
        },
        // startOrBlack: true,
        // stopOrRestart: true,
        selected: null,
        currentPage: 1,
        pageSize: 5,
        dataCount: 0,
        outerVisible: false,
        updateType: 'create',
        codeOptions: [],
        formLabelWidth: '120px',
        metricsDefData: [],
        outerData: {},
        multipleSelectionIds: '',
        metricTypeMap: {},
        calcTypeMap: new Map(),
        // rules: {
        //     name: [
        //       { required: true, message: '请输入活动名称', trigger: 'blur' },
        //       { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        //     ],
        //   }
      }
    },
    // computed: {
    //   metricsDefPageData() {
    //     return this.metricsDefData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    //   }
    // },
    watch: {
      metricsDefData: {
        handler(newValue, oldValue) {
          console.info(newValue)
        },
        deep: true
      },
      pageSize(current, last) {
        this.getMetricsDef()
      }
    },
    created() {
      this.getMetricsDef()
      this.getCodes({
        'model': 'MetricsDef',
        'params': 'code'
      })
      this.getMetricType()
    },
    methods: {
      getMetricsDef() {
        // console.log('metricsDefs.methods', this.currentPage, this.pageSize)
        // this.pageSize
        // //debugger
        server.getMetricsDef(this.pageSize * (this.currentPage - 1) + 1, this.pageSize).then(res => {
          this.dataCount = res.count
          this.metricsDefData = res.metricsData
          // if (res.metricsData !== undefined) {
          //   this.codeOptions = _.uniqWith(res.metricsData.map(item => {
          //     return {
          //       value: item.code,
          //       label: item.code
          //     }
          //   }), _.isEqual)
          // }
          // res.metricsData.map(item => {
          //   this.calcTypeMap.set(item.)
          // })
        }, error => {
          console.error('请求异常！' + error)
        })
      },
      getCodes(params) {
        server.getCodes(params).then(
          res => {
            // //debugger
            this.codeOptions = _.uniqWith(res.datas.MetricsDef.map(item => {
              return {
                value: item.code,
                label: item.code
              }
            }), _.isEqual)
            // console.info(JSON.stringify(this.codeOptions))
          }
        )
      },
      handleClose(closed) {
        // console.info('yes' + closed)
        this.outerVisible = closed
        this.getMetricsDef()
      },
      queryMetricsDef(search) {
        const params = {}
        for (const item in search) {
          if (search.hasOwnProperty(item) && search[item] !== '') {
            params[item] = search[item]
          }
        }
        params['limit'] = this.pageSize
        params['start'] = this.pageSize * (this.currentPage - 1) + 1
        // params['search'] = true
        // //debugger
        server.queryMetricsDef(params).then(
          res => {
            this.metricsDefData = res.metricsData
            this.dataCount = res.count
            if (res === '') this.metricsDefData = []
            // //debugger
          }, error => {
            console.error('请求异常！' + error)
          })
      },
      putMetricsDefData(index) {
        this.outerData = this.metricsDefData[index]
        this.outerVisible = true
        this.updateType = 'update'
        // console.info(JSON.stringify(this.outerData))
        //  //debugger
      },
      // play(index) {
      //   var metricsDefData = this.metricsDefData[index]
      //   metricsDefData.status = 1
      //   metricsDefData.trigger.normalStrategy.ciid = ''
      //   var table = [metricsDefData]
      //   server.putMetricsDef(table).then(
      //     res => {
      //       this.getMetricsDef()
      //     }
      //   )
      // },
      /**
       * 任务操作
       * @param index
       * @param status
       */
      operate(index, status) {
        var taskId = this.metricsDefData[index].taskId
        // //debugger
        // //debugger
        // metricsDefData.status = status
        // metricsDefData.trigger.normalStrategy.ciid = ''
        // var table = [metricsDefData]
        if (!taskId && status === 5) {
          var metricsDefData = this.metricsDefData[index]
          metricsDefData.status = 1
          metricsDefData.trigger.normalStrategy.ciid = ''
          var table = [metricsDefData]
          // operType topologyId waitTime
          server.putMetricsDef(table).then(
            res => {
              this.getMetricsDef()
            })
        } else if (!taskId) {
          this.$message({
            showClose: true,
            message: '该任务为空！',
            type: 'error'
          })
        } else {
          // //debugger
          server.operate({
            'operType': status,
            'topologyId': taskId,
            'waitTime': '30'
          }).then(
            res => {
              this.getMetricsDef()
            })
        }
      },
      reset() {
        this.search = {
          name: '',
          code: '',
          metricType: ''
        }
      },
      deleteMetricsDefData(ids) {
        const params = {
          metricIds: ids,
          metricStatus: '',
          taskIds: '',
          codes: ''
        }
        // //debugger
        server.deleteMetricsDefData(ids).then(res => {
          console.info('ids')
          this.getMetricsDef()
          // this.metricsTypeData.splice(index, 1)
          this.$message({
            showClose: true,
            message: '删除成功！',
            type: 'success'
          })
        }, error => {
          console.error('请求异常！' + error)
          this.$message({
            showClose: true,
            message: '删除失败！',
            type: 'error'
          })
        })
      },
      getMetricType() {
        server.getMetricsType().then(
          res => {
            const data = res.metricsData
            // //debugger
            this.metricTypeMap = {}
            data.forEach(item => {
              this.metricTypeMap[item.typeId] = item.alias
              // return { value: item.typeId, label: item.alias }
            })
            console.info(this.metricTypeMap)
            // const metricsTypeData = res
          } // 查询
        )
      },
      handleSelectionChange(val) {
        this.multipleSelectionIds = val.map(item =>
          item.metricId
        ).join(',')
      },
      formatterStatus(row, column) {
        var val = '未启动'
        switch (row.status) {
          case 0:
            val = '未启动';
            break
          case 1:
            val = '运行中';
            break
          case 2:
            val = '暂停';
            break
          case 3:
            val = '重分配';
            break
          case 4:
            val = '停止';
            break
        }
        return val
      },
      formatterCalcType(row, column) {
        var val = '未知类型'
        switch (row.calcType) {
          case 0:
            val = '原始指标';
            break
          case 1:
            val = '聚合指标';
            break
        }
        return val
      },
      // 分页
      handleSizeChange(val) {
        this.pageSize = val
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log('currentChangge', val)
        this.currentPage = val
        this.getMetricsDef()
      },
      formatterMetricType(row, column) {
        return this.metricTypeMap[row.metricType]
        // //debugger
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .a {
    margin: 20px 10px 12px 10px;
    overflow-x: hidden;
    padding: 10px;
  }
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
  .el-button-padding {
    padding: 0px;
  }
  .el-crad {
    border: none;
  }
</style>
