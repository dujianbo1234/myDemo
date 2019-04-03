<template>
	     <el-pagination align="right"  @size-change="localSizeChange"   @current-change="localCurrentChange"   :current-page="currentPage"   :page-sizes="[1, 2, 3, 4]"   :page-size="pageSize"   layout="total, sizes, prev, pager, next, jumper"   :total="totalItems">
                  </el-pagination>
</template>
    
<script>
  export default {
  	name: "AgentPage",
  	props: {
  	     totalItems: {
  	     	type: Number,
  	     	default () {
  	     	      return 0
  	     	}
  	     }
  	},
  	data () {
  	     return {
  	     	currentPage: 1,
  	     	pageSize: 10
  	     }
  	},
  	methods: {
  	     localSizeChange (val) {
  	             let tableDataEnd = [];
		 this.pageSize = val;
		 if (this.totalItems > this.pageSize) {
		 for (let index = 0; index < this.pageSize; index++) {
		           tableDataEnd.push(this.agentList[index])
		     }
	             } else {
		        tableDataEnd = this.agentList;
		 }
  	     },
  	     localCurrentChange (val) {
  	             this.tableDataEnd = [];
		 this.currentPage = val;
		 let totalPage = Math.ceil(this.totalItems / this.pageSize)
		 if (this.localPage.currentPage === totalPage) {
		        for (let index = (this.currentPage - 1) * this.pageSize; index < this.totalItems; index++) {
		          this.tableDataEnd.push(this.agentList[index])
		        }
		      } else {
		        for (let index = (this.currentPage - 1) * this.pageSize; index < this.currentPage * this.pageSize; index++) {
		          this.tableDataEnd.push(this.agentList[index])
		        }
		 }
  	     }
  	}
   }
</script>

<style lang="scss" scoped>
	
</style>