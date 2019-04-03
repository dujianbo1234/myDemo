<template>
  <div class="conRight">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="平台资源模板" name="platform"></el-tab-pane>
      <el-tab-pane label="日志模板" name="log"></el-tab-pane>
      <el-tab-pane label="数据库模板" name="database"></el-tab-pane>
      <el-tab-pane label="中间件模板" name="middleware"></el-tab-pane>
      <el-tab-pane label="自定义模板" name="customize"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
	export default {
		data(){
			return {
				activeName:''
			}
		},
		created(){
			this.activeName = this.$route.name;
		},
		methods: {
	    handleClick(tab, event) {
	      this.$router.push({ path: tab.name });
	    }
	  }
	}
</script>
<style lang="scss" scoped>
	
</style>