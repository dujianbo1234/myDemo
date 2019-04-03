<template>
  <div style="background:#fff;height:315px;">
    <div class="header" style="padding:20px;">个人工作计划</div>
    <div class="clock" style="margin:20px 0;padding:0 20px;">
      <div class="container">
        <div class="block" style="float:left;">
          <el-date-picker
            v-model="value"
            type="date"
            placeholder="选择日期" />
        </div>
      </div>
      <el-button type="primary" icon="el-icon-search" style="margin-left:20px;">搜索</el-button>
    </div>
    <div class="content" style="padding:0 20px;">
      <div class="list">
        <div class="list-head">
          <span class="fn">1</span>
          <span class="list-info">08-12 周五(2条)</span>
          <i class="tips waming">滞后</i>
        </div>
        <ul>
          <li><span>上午12:00 ST</span></li>
          <li><span>上午12:00 ffff</span></li>
        </ul>
      </div>
      <div class="list">
        <div class="list-head">
          <span class="fn">1</span>
          <span class="list-info">08-12 周五(2条)</span>
          <i class="tips waming">滞后</i>
        </div>
        <ul>
          <li><span>上午12:00 ST</span></li>
          <li><span>上午12:00 ffff</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPlan',
  props: {
    className: {
      type: String,
      default: 'primary'
    },
    tittle: {
      type: String,
      default: '主要消息'
    },
    num: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style scoped>
  .primary{
    background:#409EFF;
  }
  .success{
    background:#67C23A;
  }
  .waming{
    background:#E6A23C;
  }
  .danger{
    background:#F56C6C;
  }
  .info{
    background:#909399;
  }
  ul,ul li{
    list-style: none;
    margin:0;
    padding:0;
  }
  .tips{
    font-style: normal;
    color: #fff;
    font-size:14px;
    padding:2px 0;
  }
  .list-info{
    color:#409EFF;
  }
  .list-head{
    border-bottom:1px solid #d2d2d2;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }
  .fn{
    background: #409EFF;
    color: #fff;
    padding:2px 5px;
  }
  .list>ul>li span{
      color: #409EFF;
      margin-left:20px;
  }
  .list{
    margin-bottom:10px;
  }
</style>