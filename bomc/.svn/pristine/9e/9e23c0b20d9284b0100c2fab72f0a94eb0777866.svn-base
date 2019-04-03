<template>
	<div class='container'>
		<el-row>
			<el-col>
				<el-card>
					<el-form :inline="true" class="demo-form-inline">
						<!--<el-select v-model="modelType" clearable  placeholder="选择任务类型" >
							<el-option v-for='(item,index) in taskDate' :key="index" :label="item.modelName" :value="item.modelType"></el-option>
						</el-select>-->
						<el-form-item>
							<el-input v-model="name" placeholder="请输入任务名称"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input v-model="creator" placeholder="请输入操作人"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" icon="el-icon-search" @click="queryTaskInst()">查询</el-button>
						</el-form-item>
						<!--<el-form-item class="buttonItem">
							<el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addDialog()">新增</el-button>
							<el-button type="danger" size="small" icon="el-icon-circle-close-outline" round>删除</el-button>
						</el-form-item>-->
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col>
				<el-card class="oper_button">
				  <!-- <el-button type="danger" icon="el-icon-refresh" @click="restartTask()" plain>重新执行</el-button> -->
				  <!-- <el-button type="primary" icon="el-icon-circle-close" @click="multipleKillTask()" plain>停止</el-button> -->
				  <el-button type="warning" icon="el-icon-zoom-out" plain @click="multipleStopTask()">暂停</el-button>
				  <el-button type="success" icon="el-icon-circle-check-outline" @click="killTaskContinue()" plain>继续</el-button>
				  <el-button type="danger" icon="el-icon-close" @click="deleteTaskKill()" plain>删除</el-button>
				</el-card>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col>
				<el-card>
					<el-table @selection-change="handleSelectionChange" :data="tableData" style="width: 100%" :default-sort="{prop: 'userId', order: 'ascending'}">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="name" label='任务名称' width="150">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="modelType" label='服务' width="100" sortable>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="creator" label='操作人' width="100" sortable>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="level" label='任务级别' width="120" sortable :formatter="formatmodelLevel">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="triggerType" label='调度方式' width="120" sortable>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="content" label='触发条件' width="120" sortable>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="startTime" label='开始时间' width="150" sortable>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="endTime" label='结束时间' width="150" sortable>
						</el-table-column>
						<el-table-column prop="percent" label='任务进展' width="150" sortable>
							<template slot-scope="scope">
								<!-- <el-popover trigger="hover" placement="top">							
									<el-table :data="scope.row.nodeInstList">
										<el-table-column prop="name" label='节点名称' width="100">
										</el-table-column>
										<el-table-column prop="content" label='命令内容' width="300">
										</el-table-column>
										<el-table-column prop="scriptAddress" label='脚本地址' width="300">
										</el-table-column>
									</el-table>
									<div slot="reference" class="name-wrapper">
										<el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.percent" ></el-progress>
									</div>
								</el-popover> -->
								<el-progress :text-inside="true" :stroke-width="18" :percentage="Number(scope.row.percent)" ></el-progress>
							</template>
						</el-table-column>
						<el-table-column prop="nodeInstList" label='结果详情' width="100" sortable  align="center">
							<template slot-scope="scope">
								<!-- <el-button size="mini" type="primary" @click="resultDetail(scope.row.id)">显示详情</el-button> -->
								 <!-- <el-button  size="mini" type="primary" icon="el-icon-location-outline" @click="resultDetail(scope.row.id)" plain></el-button> -->
								 <i class="el-icon-view" style="    font-size: 20px;" @click="resultDetail(scope.row.id)"></i>
								<!-- <el-popover trigger="hover" placement="top">
									<el-table :data="scope.row.nodeInstList">
										<el-table-column prop="startTime" label='开始时间' width="100">
										</el-table-column>
										<el-table-column prop="endTime" label='结束时间' width="100">
										</el-table-column>
										<el-table-column prop="executeResult" label='执行结果' width="950">
										</el-table-column>
									</el-table>
									<div slot="reference" class="name-wrapper">
										<el-tag size="medium">显示详情</el-tag>
									</div>
								</el-popover> -->
							</template>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="state" label='状态' width="80" sortable :formatter="formatmodelState">
						</el-table-column>
						
						
						<el-table-column label='操作' fixed="right" width="250">
							<template slot-scope="scope">
								<!-- <el-button size="mini" type="primary" @click="stopTask(scope.row.id)">停止</el-button> -->
								<el-button :disabled="scope.row.state.indexOf('0') != -1 || scope.row.state.indexOf('2') != -1 || scope.row.state.indexOf('3') != -1" size="mini" type="warning" @click="stopTask(scope.row.id)">暂停</el-button>
								<el-button size="mini" type="success" @click="continueOne(scope.row.id)">继续</el-button>
								<el-button size="mini" type="danger" @click="deleteTaskInst(scope.row.id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="block" align="right">
						<el-pagination v-if="totalCount>0" :current-page="currentPage" :page-sizes="[5, 10, 20, 50, 100, 200, 500]" :page-size="pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper" 
							@size-change="handleSizeChange" @current-change="handleCurrentChange" />
					</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- 详情弹框 -->
		<el-dialog v-loading="tableLoadingDetail" title="结果详情" :visible.sync="resultDetailDialog" width="60%">
			<el-table  :data="resultDetailTable">
				<el-table-column show-overflow-tooltip property="taskCount" label="执行次数"></el-table-column>
				<el-table-column show-overflow-tooltip property="state" label="状态" :formatter="formatmodelStateTwo"></el-table-column>
				<el-table-column show-overflow-tooltip property="startTime" label="开始时间" min-width="150"></el-table-column>
				<el-table-column show-overflow-tooltip property="endTime" label="结束时间" min-width="150"></el-table-column>
				<el-table-column label='节点详情' fixed="right" width="150">
					<template slot-scope="scope">
						<el-popover trigger="click" placement="top" title="显示详情" width="1100">
							<el-table :data="scope.row.nodeInfos">
								<el-table-column show-overflow-tooltip prop="name" label='节点名称' min-width="100">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="content" label='节点内容' min-width="100">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="step" label='步骤' min-width="100">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="state" label='状态' min-width="100" :formatter="formatmodelPopoverState">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="startTime" label='开始时间' min-width="100">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="endTime" label='结束时间' min-width="100">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="executeResult" label='执行结果' min-width="100">
								</el-table-column>
							</el-table>
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">显示详情</el-tag>
							</div>
						</el-popover>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>



<script>
	import * as service from '@/modules/ops/api/ops/taskManagement/taskManagement.js'
	export default {
		data() {
			return {
				// -------------------------------------
				// 控制表格加载
				tableLoading:true,
				// 控制详情表格加载
				tableLoadingDetail:true,
				// 控制表格选中状态
				multipleSelection:[],
				// -------------------------------------
				pageSize: 10, // 每页多少条
				currentPage: 1, // 当前页
				totalCount: '', // 总条数
				tableData:[],
				taskDate:[],
				value: '',
				modelType:'',
				name:'',
				creator:'',

				// ------------
				// 结果详情弹框
				resultDetailDialog: false,
				resultDetailTable: [],
			};
		},

		mounted() {
				this.queryTaskInst();
				this.taskType();
		},

		methods: {
			// ----------------------------------------------------------
			// 表格转换
			// 级别转换
			formatmodelLevel(row, column) {
				var data = ''
				var array = ['','低','中','高']
				data = array[row.level]
				return data
			},
			// 状态转换
			formatmodelState(row, column) {
				var data = ''
				var array = ['等待','执行中','完成','暂停','异常']
				data = array[row.state]
				return data
			},
			// 弹框表格的状态
			formatmodelStateTwo(row, column) {
				var data = ''
				var array = ['等待执行','执行中','完成','超时','暂停','失败']
				data = array[row.state]
				return data
			},
			formatmodelPopoverState(row, column) {
				var data = ''
				var array = ['等待执行','下发中','执行中','成功','失败','暂停']
				data = array[row.state]
				return data
			},
			// 结果详情函数
			resultDetail(ids) {
				const _self = this
				_self.tableLoadingDetail = true;
				_self.resultDetailDialog = true;
				const params = {
					id: ids
				}
				service.resultDetail(params).then(res => {
					const datas = res.result;
					
					_self.resultDetailTable = datas;
					_self.tableLoadingDetail = false;
				})

			},
			// ----------------------------------------------------------
			
			//任务类型查询
			taskType() {
				service.taskType().then(res => {
					this.taskDate=res.result
				})
			},
			
			//表单查询
			queryTaskInst() {
				this.tableLoading = true;
				const params = {
					modelType:this.modelType,
					name:this.name,
					creator:this.creator,
					start: (this.currentPage - 1) * this.pageSize,
					limit: this.pageSize
				}
				service.queryTaskInst(params).then(res => {
					console.log(res.result.list)
					this.tableData = res.result.list;
					this.totalCount = res.result.count;
					this.tableLoading = false;
				})
			},
			

			
			//删除单条信息
			deleteTaskInst(id) {
				
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					const params = {
						id: id
					}
					service.deleteTaskInst(params).then(res => {
						
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
						this.queryTaskInst()
					}).catch(() => {
						this.$message({
							type: 'info',
							message: res.msg
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			
			//复选框
			handleSelectionChange(val){
				this.multipleSelection  = val
				console.log(this.multipleSelection)
			},
			
			//多条删除		
			deleteTaskKill() {
				var id = [];
				console.log(this.multipleSelection)
				if(this.multipleSelection.length == 0) {
					this.$message({
						message: '请选择需要删除的数据',
						type: 'warning'
					});
				}else {
					this.multipleSelection.forEach((item,index)=>{
						id.push(item.id)
					})
					this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'error'
					}).then(() => {
						
					service.deleteTaskKill(id).then(res=>{
						this.$message({
								type: 'success',
								message: '删除成功!'
							})
						this.queryTaskInst();
					}).catch(() => {
							this.$message({
								type: 'info',
								message: res.msg
							})
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						})
					})
				}
				
			},
			// 单条继续
			continueOne(id) {
				
				this.$confirm('此操作将继续该任务, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
					const data = {
						ids: id
					}
					service.continueOne(data).then(res => {
						
						this.$message({
							type: 'success',
							message: '继续成功!'
						})
						this.queryTaskInst()
					}).catch(() => {
						this.$message({
							type: 'info',
							message: res.msg
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			//多条继续		
			killTaskContinue() {
				var id = [];
					
				this.multipleSelection.forEach((item,index)=>{
					id.push(item.id)
				})
				let params = {
					ids:id.join(',')
				}
				this.$confirm('此操作将继续该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
					
				service.killTaskContinue(params).then(res=>{
					this.$message({
							type: 'success',
							message: '继续成功!'
						})
					this.queryTaskInst();
				}).catch(() => {
						this.$message({
							type: 'info',
							message: res.msg
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消继续'
					})
				})
			},
			
			//多条暂停	
			multipleStopTask() {
				var id = [];
					
				this.multipleSelection.forEach((item,index)=>{
					id.push(item.id)
				})
				let params = {
					ids:id.join(',')
				}
				this.$confirm('此操作将暂停多条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					
				service.multipleStopTask(params).then(res=>{
					this.$message({
							type: 'success',
							message: '暂停成功!'
						})
					this.queryTaskInst();
				}).catch(() => {
						this.$message({
							type: 'info',
							message: res.msg
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消暂停'
					})
				})
			},
			
			//暂停条信息
			stopTask(id) {
				this.$confirm('此操作将暂停任务, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					const params = {
						ids: id
					}
					service.stopTask(params).then(res => {
						
						this.$message({
							type: 'success',
							message: '暂停成功!'
						})
						this.queryTaskInst()
					}).catch(() => {
						this.$message({
							type: 'info',
							message: res.msg
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消暂停'
					})
				})
			},
			//停止单条信息
			killTask(id) {
				this.$confirm('此操作将停止任务, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					const params = {
						ids: id
					}
					service.killTask(params).then(res => {
						
						this.$message({
							type: 'success',
							message: '停止成功!'
						})
						this.queryTaskInst()
					}).catch(() => {
						this.$message({
							type: 'info',
							message: res.msg
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消停止'
					})
				})
			},
			
			//多条停止
			multipleKillTask() {
				var id = [];
					
				this.multipleSelection.forEach((item,index)=>{
					id.push(item.id)
				})
				let params = {
					ids:id.join(',')
				}
				this.$confirm('此操作将停止多条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					
				service.multipleKillTask(params).then(res=>{
					this.$message({
							type: 'success',
							message: '停止成功!'
						})
					this.queryTaskInst();
				}).catch(() => {
						this.$message({
							type: 'info',
							message: res.msg
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消停止'
					})
				})
			},
			
			//重新执行
			restartTask() {
				var id = [];
					
				this.multipleSelection.forEach((item,index)=>{
					id.push(item.id)
				})
				let params = {
					ids:id.join(',')
				}
				this.$confirm('此操作将停止多条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					
				service.restartTask(params).then(res=>{
					this.$message({
							type: 'success',
							message: '停止成功!'
						})
					this.queryTaskInst();
				}).catch(() => {
						this.$message({
							type: 'info',
							message: res.msg
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消停止'
					})
				})
			},
			
			//分页条数设置
			handleSizeChange(val) { // 设置每页多少条
				this.pageSize = val
				this.queryTaskInst()
			},
			//当前页
			handleCurrentChange(val) { // 当前页
				this.currentPage = val
				this.queryTaskInst()
			},
			

		}
	};
</script>
<style scoped lang="scss">
	.container {
		padding: 10px 20px;
		.buttonItem {
			float: right;
			margin-right: 0px !important;
		}
		.block {
			margin-top: 20px;
		}
	}
	.oper_button{
		    text-align: right;
	}
	
</style>