<template>
  <div style="height:350px;">
    <div style="" class="leftInfo">     
      <div>
        <span class="cmName">主机数量</span>
        <span class="cmNum">2333</span>
      </div>
      
    </div>
    <div class="circleWraper" style="line-height:350px;">
      <span>
        <el-progress type="circle" :percentage="data.cpu" color="#efc632" :stroke-width="12"></el-progress>
        <span class="tittleWraper"><i class="iconfont icon-setting" style="color:#efc632;margin-right:5px;"></i>CPU(%)</span>
      </span>
      <span>
        <el-progress type="circle" :percentage="data.memory" color="#81dbd2" :stroke-width="12"></el-progress>
        <span class="tittleWraper"><i class="iconfont icon-setting" style="color:#81dbd2;margin-right:5px;"></i>内存(%)</span>
      </span>
      <span>
        <el-progress type="circle" :percentage="data.storage" color="#db88a8" :stroke-width="12"></el-progress>
        <span class="tittleWraper"><i class="iconfont icon-setting" style="color:#db88a8;margin-right:5px;"></i>存储(%)</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CpuManage',
  props: {
    className:{
      type: String,
      default: 'primary'
    },
    tittle:{
      type: String,
      default: '主要消息'
    },
    data:{
      type: Object,
      default: function(){
        return {cpu:38,memory:60,storage:77}
      }
    }
  }
}
</script>

<style scoped>
  .circleWraper .el-progress{
    vertical-align: middle;
  }
  .circleWraper{
    margin-left: 104px;
    text-align: center;
  }
  .cmNum{
    font-size:36px;
    display:block;
    color: #49abd4;
    margin-top:50px;
  }
  .cmName{
    margin-top:200px;
  }
  .leftInfo{
    width:140px;
    text-align: center;
    vertical-align: middle;
    position: relative;
  }
  .leftInfo>div{
    display: inline-block;
    position: absolute;
    left: 12px;
    top: 50px;
  }
  .tittleWraper{
    position: absolute;
    display: inline;
    line-height: 0;
    top: -106px;
    right: 25px;
  }
  .circleWraper>span{
    position: relative;
  }
</style>