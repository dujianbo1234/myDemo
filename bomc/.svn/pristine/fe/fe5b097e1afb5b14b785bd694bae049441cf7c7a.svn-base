<template>
  <div style="background:#fff;padding:20px;height:315px;">
    <div class="header" style="height:32px;line-height:32px;">
      <span>我收藏的链接</span>
      <el-button type="primary" size="small" style="float:right">添加链接</el-button>
    </div>
    <div class="content">
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
.content{
  text-align: center;
}
.content span{
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
/*  .content span:nth(2n){
    margin-left:20px;
  }*/
  .content span.active{
    background: #efc532;
  }
    .el-row{
    margin:0 !important;
  }
   .el-row>div{
    padding:0 !important;
  }
  .el-row>div:nth-child(2n){
    padding-left:10px !important;
  }
</style>