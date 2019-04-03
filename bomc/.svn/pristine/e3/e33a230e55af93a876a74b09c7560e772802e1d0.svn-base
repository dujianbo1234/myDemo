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
        <!-- <div style="width:100%;height:100%;background:#e2e2e2;">{{item}}</div> -->
        <Decoration v-if="!computedWrap(item.config)" :tittle="item.tittle" :line="'#/dashboard'" :iconStyle="item.iconClass">
                    <generate-form :data="item.config" :value="widgetModels" ref="generateForm" :warpHeight.sync="item.h"></generate-form>
        </Decoration>
        <generate-form v-if="computedWrap(item.config)" :data="item.config" :value="widgetModels" ref="generateForm" :warpHeight.sync="item.h"></generate-form>
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
  import GenerateForm from '@/components/FromMaking/GenerateForm'
import Cookies from 'js-cookie'


const userId = Cookies.get('userId') || '1'

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
      Annular,
      RaddarChart,
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
      VueGridLayout,
      GenerateForm
    },
    data() {
      return {
        widgetModels: {},
        layout: testLayout,
        draggable: false,
        resizable: true,
        edit: false,
        resource: [],
        visibleView: [],
      }
    },
    computed: {
      // 控制显示的内容
      computedWrap() {
        return function(value) {
          return this.getTypeLoop(value.list)
        }
      }
    },
    mounted() {
      const _this = this;
      // axios.get('http://192.168.127.245:8092/pps/api/v1/findTempletLocation?userId='+userId).then(function(res){
      //     console.log('index.findTempletlocation',res);
      // })
      portalApi.getGridData().then(function(res){
        if(Array.isArray(res)&&res[0]&&res[0].location_info){
        console.log('index.findTempletlocation',res);
          // _this.layout=JSON.parse(res[0].location_info)
            _this.visibleView = JSON.parse(res[0].location_info).filter(obj => obj.visible != true)
            _this.apiMethod(JSON.parse(res[0].location_info))
        }else{
          _this.apiMethod([])

        }
      })
    },
    methods: {
      apiMethod(gridData){
        const _this = this;
        this.layout = [];
        // axios.get('https://easy-mock.com/mock/5bd7b650a0fa6d218201b6d0/charts/portalGrid').then(function(res){
        portalApi.getTemplateByUserId(1).then(function(res){
          // if(res.data && res.data.length>0){
          if(res && res.length>=0){
          var layoutView = [];
          let cou = 0,height = 10,lev = 0,wlev = 0,glev = 0;
          for (let item of res){
            let configFlag = true
          // for (let item of res.data){
            if(item.stateFlag == '-1') continue;
            baseGird.tittle = item.templetName,
            baseGird.iconClass = item.templetType,
            baseGird.config = JSON.parse(item.templetJson)
            // console.log('gridType',baseGird.config.list);
            for(let sub of baseGird.config.list){
              if(sub.type == 'grid') glev += (sub.columns.length-1)
            }
            baseGird.i = cou + '',
            baseGird.y = height*lev,
            baseGird.x = 4*wlev,
            baseGird.h = 10 * (baseGird.config.list.length + glev)
            for(let temp of gridData){
              // console.log('commit',JSON.stringify(temp.config),item.templetJson,JSON.stringify(temp.config) == item.templetJson);
              JSON.stringify(temp.config) == item.templetJson && (configFlag = false)
            }
            configFlag && (baseGird.i = (gridData.length + 1),gridData.push(JSON.parse(JSON.stringify(baseGird))))
            // layoutView.push(JSON.parse(JSON.stringify(baseGird)))
            wlev++
            if(cou%3 == 2) {lev++ , wlev = 0}
            cou++
          }
          _this.layout = gridData.filter(obj => obj.visible == true)
          // _this.resource = gridData
        }
      },function(err){
        // _this.localDate().then(function(res) {
        // _this.resource = deepClone(res), _this.layout = res.filter(item => item.visible != false)
      // })
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
        console.log(JSON.stringify(this.resource))
        // axios.post('test/templetLocation?userId='+userId+'&locationInfo='+encodeURIComponent(JSON.stringify(this.layout))).then(function(res){
        //       console.log('postGrid.list',res);
        // })
        // portalApi.saveGridData().then(function(res){
        portalApi.saveGridData(this.layout.concat(this.visibleView)).then(function(res){

        })
      },
      recove(item) {
        console.log(item)
        item.visible = false
        this.visibleView.push(item)
        this.layout = this.layout.filter(obj => obj.i != item.i)
        // this.layout.splice(item.i,1);
      },
      restore() {
        // this.visibleView = this.visibleView.map(item => item.visible = true)
        // for(let item of this.visibleView){
        //   item.visible = true;
        // }
        console.log('layout',this.layout);
        var layoutList = deepClone(this.layout);
        function compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        }
        layoutList.sort(compare('y'))
        var maxY = layoutList[layoutList.length-1]['y'] + layoutList[layoutList.length-1]['h']
        console.log('visibleview',maxY);
        console.log('visibleview',this.visibleView);
        var count = 0;
        for(let item of this.visibleView){
          item.visible = true;
          if(count >=12 ) {
            count = 0;
            maxY = maxY + item.h
          }
          item.y = maxY
          item.x = count
          count += item.w

        }
        this.layout = deepClone(this.layout.concat(this.visibleView))
        this.visibleView = []
        var myEvent = new Event('resize');
        window.dispatchEvent(myEvent);
      },
      resizedEvent(i, newH, newW, newHPx, newWPx){
        console.log("RESIZE i=",JSON.stringify(this.layout));
        // console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
        var myEvent = new Event('resize');
        window.dispatchEvent(myEvent);
      },
      getTypeLoop(value){
        if(Array.isArray(value)&&value.length<=1){
          return value[0].type == 'datagroud'
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 10px;
    background-color: #F4F8F9;
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
