<template>
  <div class="deep-table-container">
    <el-row class="table-header">
      <!-- <el-col :span="1">
        序号
      </el-col> -->
      <el-col :span="6">
        单号
      </el-col>
      <el-col :span="4">
        标题
      </el-col>
      <el-col :span="3">
        业务名称
      </el-col>
      <el-col :span="2">
        状态
      </el-col>
      <el-col :span="5">
        期望解决时间
      </el-col>
      <el-col :span="4">
        处理人
      </el-col>
      <!-- <el-col :span="2">
        是否超时
      </el-col> -->
    </el-row>
    <p v-if="!data.length" class="no-data">暂无数据</p>
    <trs :data="data" v-if="data.length"></trs>
  </div>
</template>

<script>
import trs from "./trs.vue";

export default {
  name: "DeepTable",
  props: {
    data: Array
  },
  components: {
    trs
  }
};
</script>

<style scoped lang="scss">
.deep-table-container {
  text-align: center;
  margin-top: 8px;
  border-bottom: 1px solid #ebeef5;
  color: #606060;

  .table-header {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #ebeef5;
    color: #909399;
    font-weight: 700;
  }
  .no-data {
    color: #909399;
    padding-bottom: 24px;
  }
}
</style>