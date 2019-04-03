<template>
  <el-row class="panel-group" :gutter="20">
    <el-col :xs="9" :sm="9" :lg="5" class="card-panel-col">
      <div class='card-panel iconsvg-people' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-iconsvg-wrapper ">
          <svg-icon icon-class="alarm2" class-name="card-panel-iconsvg" />
        </div>
        <div class="card-panel-description">
          <div style="">
          <div class="card-panel-text">{{data.all_AMOUNT}}<span class="relText">总告警数</span></div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="5" class="card-panel-col">
      <div class="card-panel iconsvg-message" @click="handleSetLineChartData('messages')">
        <div class="card-panel-iconsvg-wrapper">
          <svg-icon icon-class="timeout" class-name="card-panel-iconsvg" />
        </div>
        <div class="card-panel-description">
          <div style="">
          <div class="card-panel-text">{{data.wait_AMOUNT}}<span class="relText">待处理</span></div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="5" class="card-panel-col">
      <div class="card-panel iconsvg-money" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-iconsvg-wrapper">
          <svg-icon icon-class="peding" class-name="card-panel-iconsvg" />
        </div>
        <div class="card-panel-description">
          <div style="">
          <div class="card-panel-text">{{data.done_AMOUNT}}<span class="relText">已处理</span></div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="5" class="card-panel-col">
      <div class="card-panel iconsvg-shoppingCard" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-iconsvg-wrapper">
          <svg-icon icon-class="dale" class-name="card-panel-iconsvg" />
        </div>
        <div class="card-panel-description">
          <div style="">
          <div class="card-panel-text">{{data.doing_AMOUNT}}<span class="relText">处理中</span></div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="9" :sm="9" :lg="5" class="card-panel-col">
      <div class="card-panel iconsvg-timeout" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-iconsvg-wrapper">
          <svg-icon icon-class="ling" class-name="card-panel-iconsvg" />
        </div>
        <div class="card-panel-description">
          <div style="">
          <div class="card-panel-text">{{data.overtime_AMOUNT}}<span class="relText">处理超时</span></div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import page from '@/modules/portal/api/page'

export default {
  props: {
    sourceApi: {
      type: String,
      default: ''
    }
  },
  data(){
    return{
      data:{},
      timer: null
    }
  },
  components: {
    CountTo
  },

  mounted(){
    const _this = this;
    var api = this.sourceApi===''?'/AlertMonitorData':this.sourceApi;
    this.dealData(api);
  },
  beforeDestroy() {
    const _this = this;
    clearTimeout(_this.timer);
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    dealData(url){
      const _this = this;
      page.AlertMonitorData(url).then(function(res){
        _this.data = res;
        _this.timer = setTimeout(function(){
          _this.dealData(url);
        },300000);
      })
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
  .iconsvg-people {
      background: linear-gradient(#9caaff,#687dff);
    }
    .iconsvg-message {
      background: linear-gradient(#fad460,#ff9351);
    }
    .iconsvg-money {
      background: linear-gradient(#6dd9a9,#45bb85);
    }
    .iconsvg-shoppingCard {
      background: linear-gradient(#8dc1fd,#4791fe);
    }
     .iconsvg-timeout {
      background: linear-gradient(#fe9999,#f36161);
    }
  .card-panel {
    height: 90px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    //background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    text-align:center;
    border-radius: 4px;
   /* &:hover {
      .card-panel-iconsvg-wrapper {
        color: #fff;
      }
      .iconsvg-people {
         background: #fff;
      }
      .iconsvg-message {
        background: #fff;
      }
      .iconsvg-money {
        background: #fff;
      }
      .iconsvg-shoppingCard {
        background: #fff
      }
       .iconsvg-timeout {
        background: #fff
      }
    }*/

    .card-panel-iconsvg-wrapper {
      //float: left;
      /*margin: 5px 0 0 14px;
      padding: 16px;*/
      transition: all 0.38s ease-out;
      border-radius: 6px;
      position: absolute;
    left: -40px;
    bottom: -20px;
    color: #fff;
    }
    .card-panel-iconsvg {
      //float: left;
      font-size: 140px;
      opacity: 0.2;
    }
    .card-panel-description {
      color:#fff;
      .card-panel-text {
        font-size: 40px;
        margin-top: 20px;
        position: relative;
        .relText{
          position: absolute;
          right: 17px;
          top: -5px;
          font-size: 14px;
          line-height: 0;
        }
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>


