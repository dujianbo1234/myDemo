<template>
  <el-row class="panel-group" :gutter="20">
    <el-col :xs="9" :sm="9" :lg="5" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="alarm2" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <count-to class="card-panel-num" :startVal="0" :endVal="240" :duration="260"></count-to>
          <div class="card-panel-text">总告警数</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="timeout" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <count-to class="card-panel-num" :startVal="0" :endVal="121" :duration="300"></count-to>
          <div class="card-panel-text">待处理</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="peding" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <count-to class="card-panel-num" :startVal="0" :endVal="92" :duration="320"></count-to>
          <div class="card-panel-text">已处理</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="dale" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <count-to class="card-panel-num" :startVal="0" :endVal="36" :duration="360"></count-to>
          <div class="card-panel-text">处理中</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="5" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-timeout">
          <svg-icon icon-class="ling" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <count-to class="card-panel-num" :startVal="0" :endVal="16" :duration="360"></count-to>
          <div class="card-panel-text">处理超时</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-col-lg-5{
  width:20% !important;
}
.panel-group {
  /*margin-top: 18px;*/
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 90px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
       .icon-timeout {
        background: #ffa724
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
     .icon-timeout {
      color: #ffa724
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 5px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 18px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-top: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
