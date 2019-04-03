<template>
  <div class="dashboard-container">
            <el-tabs type="border-card">
	  <el-tab-pane label="数据总览">数据总览</el-tab-pane>
	  <el-tab-pane label="检索">
	  	<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="应用运行日志" name="first">应用运行日志</el-tab-pane>
		    <el-tab-pane label="系统日志" name="second">系统日志</el-tab-pane>
		    <el-tab-pane label="应用交易日志" name="third">应用交易日志</el-tab-pane>
	             </el-tabs>
	  </el-tab-pane>
	  <el-tab-pane label="仪表盘">仪表盘</el-tab-pane>
	</el-tabs>
  </div>
</template>

<script>
/* import query from "query"*/
export default {
  name: 'data-management',
   data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components:{
    	query:query
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
