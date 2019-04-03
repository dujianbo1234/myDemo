<template>
  <div style="height:350px;">
    <el-row :gutter="32">
      <el-col :span="12">
        <line-chart :chart-data="lineChartData" />
      </el-col>
      <el-col :span="12">
        <div style="text-align:center;">
          <h1>多中心切换状态</h1>
          <div class="toggleBtn">
            <el-row :gutter="36">
              <el-col :span="12"><span>应用前台</span></el-col>
              <el-col :span="12"><span class="active">电渠</span></el-col>
              <el-col :span="12"><span>客服</span></el-col>
              <el-col :span="12"><span>一级BOSS</span></el-col>
              <el-col :span="12"><span>tuxdo调用bes</span></el-col>
              <el-col :span="12"><span>小渠道</span></el-col>
              <el-col :span="12"><span>个人家庭订单</span></el-col>
              <el-col :span="12"><span>定时任务</span></el-col>
              <el-col :span="12"><span>客服dt</span></el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './LineChart'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
}
export default {
  name: 'Alarm',
  components: {
    LineChart
  },
  props: {
    className: {
      type: String,
      default: 'primary'
    },
    tittle: {
      type: String,
      default: '主要消息'
    },
    data: {
      type: Object,
      default: function() {
        return { cpu: 38, memory: 60, storage: 77 }
      }
    }
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  }
}
</script>

<style scoped>
  .toggleBtn span{
      background:#91d1c9;
      /*padding:10px 20px;*/
      height:35px;
      line-height:35px;
      width:120px;
      border-radius:40px;
      display:inline-block;
      margin-top:10px;
      color: #fff;
      cursor:pointer;
      /*float: left;*/
  }
  .toggleBtn span.active{
    background: #efc532;
  }
  h1{
        font-size: 16px;
    margin: 0;
    font-style: normal;
    font-weight: normal;
    margin-top: 20px;
  }
  .el-row{
    margin:0 !important;
  }
   .el-row>div{
    padding:0 !important;
  }
</style>