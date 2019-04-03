<template>
  <span :class="className" class="cachet">
    <span class="font-clo">{{ tittle }}</span>
    <i class="font-clo">{{ num }}</i>
  </span>
</template>

<script>
export default {
  name: 'ColorLabel',
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
  .font-clo{
    color: #fff;
    font-style: normal;
  }
  .cachet{
    padding:10px 20px;
    border-radius: 4px;
    display:inline-block;
    width:100%;
    text-align: left;
    margin-top:10px;
  }
  .cachet i{
    float:right;
  }
</style>