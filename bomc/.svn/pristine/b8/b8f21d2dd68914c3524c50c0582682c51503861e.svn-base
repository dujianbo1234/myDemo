<template>
  <div class="container">
    <!-- <el-tabs v-model="activeName" type="border-card" tab-position="top" @tab-click="handleClick"> -->
      <!-- <el-tab-pane label="原始指标" name="first"> -->

        <origin-metric/>
        <!-- <ind-info/> -->

      <!-- </el-tab-pane> -->
      <!-- <el-tab-pane label="聚合指标" name="second"> -->
        <!-- 聚合指标 -->
        <!-- <ind-rule/> -->
        <!-- <merge-metric/> -->
      <!-- </el-tab-pane> -->
    <!-- </el-tabs> -->
  </div>
</template>

<script>
import originMetric from './originMetric'
import mergeMetric from './mergeMetric'
// import indRule from './components/indRule'
export default {
  name: 'IndInfoMan',
  components: {
    originMetric,
    mergeMetric
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  created() {
    console.info(this.activeName)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .container {
    padding: 10px;
    font-family: sans-serif;
    .block {
      margin: 20px 0 12px 0;
    }
    .text {
      font-size: 14px;
    }
    .item {
      padding: 8px 0;
    }
  }
  ol li a,
  ol li a:visited {
    background-color: #fff;
    /* 背景色 */
    border: 0px #4e667d solid;
    /* 边框 */
    color:  #000;
    /* 文字颜色 */
    display: block;
    /* 此元素将显示为块级元素，此元素前后会带有换行符 */
    line-height: 1.35em;
    /* 行高 */
    padding: 4px 20px;
    /* 内部填充的距离 */
    text-decoration: none;
    /* 不显示超链接下划线 */
    white-space: nowrap;
    /* 对于文本内的空白处，不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
  }
  /* 所有class为menu的div中的ul中的a样式(鼠标移动到元素中的样式) */
  ol li a:hover {
    background-color: #DCDFE6;
    /* 背景色 */
    color: #000;
    /* 文字颜色 */
    text-decoration: none;
    /* 不显示超链接下划线 */
  }
  /* 所有class为menu的div中的ul中的a样式(鼠标点击元素时的样式) */
  ol li a:active ,.active{
    background-color: #409EFF;
    /* 背景色 */
    color: #fff;
    /* 文字颜色 */
    text-decoration: none;
    /* 不显示超链接下划线 */
  }
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
