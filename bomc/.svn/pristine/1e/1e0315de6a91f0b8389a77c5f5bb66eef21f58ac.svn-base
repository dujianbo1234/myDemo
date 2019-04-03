<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"></github-corner> -->
    <el-row style="position: absolute;right: 10px;top: -32px;">
      <el-button type="primary" icon="el-icon-edit" circle title="布局编辑" @click="showEdit" size="mini" />
      <el-button v-if="edit" type="success" icon="el-icon-refresh" circle title="还原" @click="restore" size="mini" />
      <el-button v-if="edit" type="success" icon="el-icon-check" circle title="确定更改" @click="prompt" size="mini" />
    </el-row>
    <grid-layout :layout="layout" :col-num="12" :row-height="30" :is-draggable="draggable" :is-resizable="edit" :vertical-compact="true" :use-css-transforms="true" :margin="[20, 10]">
      <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" :is-draggable="draggable && item.draggable" @resized="resizedEvent">
        <panel-group v-if="item.type == 'groud'" @handleSetLineChartData="handleSetLineChartData" />
        <i v-if="edit && item.type != 'groud'" class="el-icon-delete deleteBtn" title="删除" @click="recove(item)" />
        <!-- <div style="width:100%;height:100%;background:#e2e2e2;"></div> -->
        <Decoration v-if="item.type != 'groud'" :tittle="item.title" :line="'#/dashboard'">
          <div v-for="element in item.config.list" v-if="element.type == 'barChart'">
            <bar-chart :sourceApi="element.options.sourceApi"> </bar-chart>
          </div>
          <div v-for="element in item.config.list" v-if="element.type == 'lineChart'">
            <line-chart :sourceApi="element.options.sourceApi"> </line-chart>
          </div>
          <div v-for="element in item.config.list" v-if="element.type == 'pieChart'">
            <pie-chart :sourceApi="element.options.sourceApi"> </pie-chart>
          </div>
          <div v-if="item.type == 'rad'" class="chart-wrapper">
            <Raddar-view />
          </div>
          <div v-if="item.type == 'anu'" class="chart-wrapper">
            <annular />
          </div>
          <div v-if="item.type == 'map'" class="chart-wrapper">
            <map-chart :height="'698px'" />
          </div>
          <div v-if="item.type == 'table1'" class="chart-wrapper">
            <el-table :data="tableData" stripe style="width: 100%" size="small">
              <el-table-column prop="address" label="类型" />
              <el-table-column prop="name" label="资源数" width="" />
              <el-table-column prop="date" label="已分配" width="" />
              <el-table-column prop="rade" label="资源利用率" width="" />
            </el-table>
          </div>
          <div v-if="item.type == 'table2'" class="chart-wrapper">
            <el-table :data="tableData2" stripe style="width: 100%" size="small">
              <el-table-column prop="type" label="类型" />
              <el-table-column prop="rade" label="成功率调用" width="" />
              <el-table-column prop="delay" label="服务及时性" width="" />
            </el-table>
          </div>
          <div v-if="item.type == 'table3'" class="chart-wrapper">
            <el-table :data="tableData3" stripe style="width: 100%" size="small">
              <el-table-column prop="type" label="类型" />
              <el-table-column prop="rade" label="" width="" />
              <el-table-column prop="date" label="排队数" width="" />
              <el-table-column prop="name" label="当前处理量" width="" />
            </el-table>
          </div>
          <div v-if="item.type == 'table4'" class="chart-wrapper">
            <el-table :data="tableData4" stripe style="width: 100%" size="small">
              <el-table-column prop="type" label="类型" />
              <el-table-column prop="rade" label="可用性" width="" />
              <el-table-column prop="delay" label="空间及时率" width="" />
            </el-table>
          </div>
          <div v-if="item.type == 'line'" class="chart-wrapper">
            <el-row>
              <el-col>
                <line-chart :chart-data="lineChartData" />
              </el-col>
            </el-row>
          </div>
          <div v-if="item.type == 'alarm'" class="chart-wrapper">
            <alarm />
          </div>
          <div v-if="item.type == 'minu'" class="chart-wrapper">
            <el-row :gutter="32">
              <el-col :span="12">
                <line-chart :chart-data="lineChartData" />
              </el-col>
              <el-col :span="12" style="padding-top:40px;">
                <bar-chart />
              </el-col>
            </el-row>
          </div>
          <div v-if="item.type == 'cpu'" class="chart-wrapper">
            <cpu-manage />
          </div>
          <!-- <div class="chart-wrapper" v-if="item.type == 'alarm'">
                        <alarm />
                    </div>
                    <div class="chart-wrapper" v-if="item.type == 'alarm'">
                        <alarm />
                    </div>
                    <div class="chart-wrapper" v-if="item.type == 'alarm'">
                        <alarm />
                    </div> -->
        </Decoration>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
  import VueGridLayout from 'vue-grid-layout'
  // import GithubCorner from '@/components/GithubCorner'
  import PanelGroup from './components/PanelGroup'
  // import LineChart from './components/LineChart'
  import RaddarChart from './components/RaddarChart'
  import RaddarView from './components/RadViewChart'
  // import PieChart from './components/PieChart'
  import Annular from './components/Annular'
  import BarChart from '@/components/FromMaking/chartsComponents/BarChart'
  import LineChart from '@/components/FromMaking/chartsComponents/LineChart'
  import PieChart from '@/components/FromMaking/chartsComponents/PieChart'
  import MapChart from './components//MapChart'
  // import TransactionTable from './components/TransactionTable'
  import TodoList from './components/TodoList'
  import BoxCard from './components/BoxCard'
  import Decoration from './components/Decoration'
  import ColorLabel from './components/ColorLabel'
  import CpuManage from './components/CpuManage'
  import Alarm from './components/Alarm'
  import MyPlan from './components/MyPlan'
  import MyLine from './components/MyLine'
  import deepClone from '@/utils/deepClone'
  import portalApi  from '@/modules/portal/api/portal'
  import axios  from 'axios'

  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }
  const testLayout = []
  const baseGird = {
              'title': '告警状态',
              'x': 0,
              'y': 0,
              'w': 4,
              'h': 10,
              'visible': true,
              'draggable': true
            }
  export default {
    name: 'DashboardAdmin',
    components: {
      // GithubCorner,
      PanelGroup,
      LineChart,
      Annular,
      RaddarChart,
      PieChart,
      BarChart,
      MapChart,
      RaddarView,
      // TransactionTable,
      TodoList,
      BoxCard,
      Decoration,
      ColorLabel,
      CpuManage,
      Alarm,
      MyPlan,
      MyLine,
      VueGridLayout
    },
    data() {
      return {
        widgetModels: {},
        lineChartData: lineChartData.newVisitis,
        layout: testLayout,
        draggable: false,
        resizable: true,
        edit: false,
        tableData: [{
          rade: '30%',
          date: '54',
          name: '100',
          address: '功能型服务器'
        }, {
          rade: '50%',
          date: '240',
          name: '500',
          address: '处理型服务器'
        }, {
          rade: '70%',
          date: '1000',
          name: '1654',
          address: '记载型服务器'
        }, {
          rade: '90%',
          date: '200',
          name: '238',
          address: '存储型服务器'
        }],
        tableData3: [{
          rade: 'RocktMQ',
          date: '54',
          name: '2350',
          type: '加载子系统'
        }, {
          rade: 'Metadb',
          date: '240',
          name: '2134',
          type: '处理型服务器'
        }, {
          rade: 'xCluster',
          date: '1000',
          name: '1980',
          type: '记载型服务器'
        }, {
          rade: 'xCluster',
          date: '200',
          name: '1345',
          type: '存储型服务器'
        }],
        tableData2: [{
          rade: '60%',
          delay: '<275ms',
          type: '监控管理中心'
        }, {
          rade: '70%',
          delay: '<275ms',
          type: '采集平台'
        }, {
          rade: '80%',
          delay: '<275ms',
          type: '数据管理平台'
        }, {
          rade: '90%',
          delay: '<275ms',
          type: '业务管理中心'
        }],
        tableData4: [{
          rade: '60%',
          delay: '80%',
          type: '功能型服务器'
        }, {
          rade: '70%',
          delay: '80%',
          type: '处理型服务器'
        }, {
          rade: '80%',
          delay: '90%',
          type: '记载型服务器'
        }, {
          rade: '90%',
          delay: '70%',
          type: '存储型服务器'
        }]
      }
    },
    mounted() {
      const _this = this;
      // axios.get('http://192.168.127.247:8092/pps/api/v1/templet/getTempletListByUserId?userId=1').then(function(res){
   this.localDate().then(function(res) {
        _this.resource = deepClone(res), _this.layout = res.filter(item => item.visible != false)
      })
    },
    methods: {
      apiMethod(){
        const _this = this;
        this.layout = [];
        // axios.get('https://easy-mock.com/mock/5bd7b650a0fa6d218201b6d0/charts/portalGrid').then(function(res){
        portalApi.getTemplateByUserId(1).then(function(res){
          // if(res.data && res.data.length>0){
          if(res && res.length>0){
          var layoutView = [];
          let cou = 0,height = 10,lev = 0,wlev = 0;
          for (let item of res){
          // for (let item of res.data){
            baseGird.config = JSON.parse(item.templetJson),
            baseGird.i = cou + '',
            baseGird.y = height*lev,
            baseGird.x = 4*wlev,
            layoutView.push(JSON.parse(JSON.stringify(baseGird)))
            wlev++
            if(cou%3 == 2) {lev++ , wlev = 0}
            cou++
            console.log('config',cou,wlev);
          }
          _this.layout = layoutView,
          console.log('layoutData.view',_this.layout);
        }
      },function(err){
        // _this.localDate().then(function(res) {
        // _this.resource = deepClone(res), _this.layout = res.filter(item => item.visible != false)
      // })
      })
      },
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      },
      localDate() {
        return new Promise((resolve, reject) => {
          resolve([{
              'title': '',
              'x': 0,
              'y': 0,
              'w': 12,
              'h': 3,
              'i': '0',
              'visible': true,
              'type': 'groud',
              'draggable': false,
              'config':[]
            },
            {
              'title': '告警状态',
              'x': 4,
              'y': 0,
              'w': 8,
              'h': 20,
              'i': '2',
              'visible': true,
              'type': 'map',
              'draggable': true,
              'config':[]
            },
            {
              'title': '告警分布（按系统）',
              'x': 0,
              'y': 4,
              'w': 4,
              'h': 10,
              'i': '1',
              'visible': true,
              'type': 'rad',
              'draggable': true,
              'config':[]
            },
            {
              'title': '按告警级别统计',
              'x': 0,
              'y': 14,
              'w': 4,
              'h': 10,
              'i': '3',
              'visible': true,
              'type': 'anu',
              'draggable': true,
              'config':[]
            },
            {
              'title': '资源状态',
              'x': 0,
              'y': 22,
              'w': 6,
              'h': 10,
              'i': '4',
              'visible': true,
              'type': 'table1',
              'draggable': true,
              'config':[]
            },
            {
              'title': '关键服务运行状态',
              'x': 6,
              'y': 22,
              'w': 6,
              'h': 10,
              'i': '5',
              'visible': true,
              'type': 'table2',
              'draggable': true,
              'config':[]
            },
            {
              'title': '数据库使用情况',
              'x': 0,
              'y': 32,
              'w': 6,
              'h': 10,
              'i': '6',
              'visible': true,
              'type': 'table3',
              'draggable': true,
              'config':[]
            },
            {
              'title': '资源利用率',
              'x': 6,
              'y': 32,
              'w': 6,
              'h': 10,
              'i': '7',
              'visible': true,
              'type': 'table4',
              'draggable': true,
              'config':[]
            },
            {
              'title': '告警趋势图',
              'x': 0,
              'y': 42,
              'w': 12,
              'h': 11,
              'i': '8',
              'visible': true,
              'type': 'line',
              'draggable': true,
              'config':[]
            },
            {
              'title': '访问量趋势',
              'x': 0,
              'y': 53,
              'w': 6,
              'h': 11,
              'i': '9',
              'visible': true,
              'type': 'line',
              'draggable': true,
              'config':[]
            },
            {
              'title': '告警故障处理',
              'x': 6,
              'y': 53,
              'w': 6,
              'h': 11,
              'i': '10',
              'visible': true,
              'type': 'alarm',
              'draggable': true,
              'config':[]
            },
            {
              'title': '日志统计',
              'x': 0,
              'y': 64,
              'w': 6,
              'h': 11,
              'i': '11',
              'visible': true,
              'type': 'minu',
              'draggable': true,
              'config':[]
            },
            {
              'title': '容量规划管理',
              'x': 6,
              'y': 64,
              'w': 6,
              'h': 11,
              'i': '12',
              'visible': true,
              'type': 'cpu',
              'draggable': true,
              'config':[]
            }
          ])
        })
      },
      showEdit() {
        this.edit = !this.edit
        this.draggable = !!this.edit
        var myEvent = new Event('resize');
        window.dispatchEvent(myEvent);
        // 保存当前布局历史
        this.edit ? this.history = JSON.parse(JSON.stringify(this.layout)) : this.layout = this.history
      },
      prompt() {
        this.edit = false
        this.draggable = false
        console.log(this.layout)
      },
      recove(item) {
        console.log(item)
        item.visible = false
        this.layout = this.layout.filter(obj => obj.i != item.i)
        // this.layout.splice(item.i,1);
      },
      restore() {
        this.layout = deepClone(this.resource)
      },
      resizedEvent(){
        var myEvent = new Event('resize');
        window.dispatchEvent(myEvent);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 10px;
    background-color:  #F4F8F9;
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  .labelWraper {
    padding: 10px;
  }
  .labelWraper span:nth-child(2n) {
    /* margin-left:20px; */
  }
  .deleteBtn {
    position: absolute;
    right: -16px;
    cursor: pointer;
  }
</style>
