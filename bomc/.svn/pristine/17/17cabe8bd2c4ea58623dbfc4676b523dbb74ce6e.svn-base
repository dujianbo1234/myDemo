<template>
  <div class="shadowWrap" :style="{marginBottom:bottom}" style="height:100%;">
    <div class="header">
        <span class="leftTittle">{{tittle}}</span>
        <span class="rightEntry"><a :href="line" class="decLine">进入专题<i class="iconfont icon-right-circle decIcon"></i></a></span>
    </div>
    <div :style="{padding:padding,background:background}" style="height:calc(100% - 50px);" class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleWraper',
  props: {
    tittle:{
      type: String,
      default: '未命名标题'
    },
    line:{
      type: String,
      default: 'javascript:;'
    },
    // height:{
    //   type: String,
    //   default: 'calc(100% - 50px);'
    // },
    bottom:{
      type: String,
      default: '0'
    },
    padding:{
      type: String,
      default: '0'
    },
    background:{
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}
.leftTittle{
  /*display: inline-block;*/
  float: left;
}
.header{
  height: 50px;
  line-height: 50px;
  font-size:14px;
  background:#fff;
  border-bottom:1px solid #358ecb;
  padding:0 10px;
}
.rightEntry{
  float: right;
}
span,a{
  color: #358ecb;
  display: inline;
}
.shadowWrap{
  /*box-shadow: 1px 1px 8px rgba(0,0,0,0.4);*/
}
.decIcon{
    position: absolute;
    font-size: 22px;
    right: -26px;
}
.decLine{
  position: relative;
  margin-right: 30px;
}
.content{
  /*text-align: center;*/
  width:100%;
}
</style>