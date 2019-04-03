<template>
	<div class='container'>
		<el-row>
			<el-col>
				<el-card>
					<el-form :inline="true" :model="formInline" class="demo-form-inline">
						<el-form-item prop="name">
							<el-input type="text" v-model="formInline.name" placeholder="请输入操作项名称/操作人" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item>
							<el-date-picker v-model="formInline.time" type="datetimerange" range-separator="至" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" class="el-icon-search" @click="logQuery()">查询</el-button>
							<!-- <el-button type="primary">重置</el-button>-->
						</el-form-item>
						<el-form-item class="buttonItem">
							<el-button type="primary" icon='document' @click="exportLogo()"><i class="el-icon-download"></i>导出excel</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-card>
					<el-table @selection-change="handleSelectionChange" fixed:true :data="tableData" style="width: 100%" :default-sort="{prop: 'userId', order: 'ascending'}">
						<el-table-column type="selection" />
						<el-table-column show-overflow-tooltip prop="operationType" label="操作类型" sortable />
						<el-table-column show-overflow-tooltip prop="modifyTermName" label="操作项名称" />
						<el-table-column show-overflow-tooltip prop="beforeModify" label="操作前" sortable />
						<el-table-column show-overflow-tooltip prop="afterModify" label="操作后" />
						<el-table-column show-overflow-tooltip prop="updateCause" label="操作原因" sortable />
						<el-table-column show-overflow-tooltip prop="updateTime" label="操作时间" sortable />
						<el-table-column show-overflow-tooltip prop="operateUserName" label="操作人" sortable />
					</el-table>
					<div class="block" align="right">
						<!--<el-pagination :page-size="pageSize" :total="totalSize" layout="prev, pager, next, jumper">
						</el-pagination>-->

						<el-pagination v-if="totalCount>0" :current-page="currentPage" :page-sizes="[5, 10, 20, 50, 100, 200, 500]" :page-size="pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

					</div>
				</el-card>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import * as service from '@/modules/ops/api/ops/serviceDo/serviceDo.js'

	export default {
		data() {
			return {
				// -----------------------------------------------------
				// 控制表格加载
				tableLoading: true,

				// -----------------------------------------------------
				pageSize: 10, // 每页多少条
				currentPage: 1, // 当前页
				totalCount: '', // 总条数
				list: null,
				//文件导出参数
				listLoading: true,
				downloadLoading: false,
				filename: '',
				autoWidth: true,
				bookType: 'xlsx',
				formInline: {
					name: '',
					time: null
				},
				tableData: [],
				addUserDialog: false,
				operationTypes: '',
				formLabelWidth: "120px",
				// 进程组名称
				operationNames: "",
				//服务名
				serviceName: "",
				//主机名
				ipName: ""
			};
		},
		created() {},
		mounted() {
			this.logQuery()
		},
		methods: {
			// -------------------------------------------------------
			// 表格左边选择事件
			handleSelectionChange(val) {
				this.multipleSelection = val
				console.log(this.multipleSelection);
			},
			//导出文件
			exportLogo() {
				var ids = [];
				console.log(this.multipleSelection)
				if(this.multipleSelection == undefined || this.multipleSelection.length == 0) {
					import('@/modules/mms/vendor/Export2Excel').then(excel => {
						const tHeader = [
							'操作类型',
							'操作项名称',
							'操作前',
							'操作后',
							'操作原因',
							'操作时间',
							'操作人',
						]
						const filterVal = [
							'operationType',
							'modifyTermName',
							'beforeModify',
							'afterModify',
							'updateCause',
							'updateTime',
							'operateUserName',
						]
						const list = this.tableData
						const data = this.formatJsonAll(filterVal, list)
						excel.export_json_to_excel({
							header: tHeader,
							data,
							filename: '任务日志',
							autoWidth: true
						});
					})
				} else {
					import('@/modules/mms/vendor/Export2Excel').then(excel => {
						const tHeader = [
							'操作类型',
							'操作项名称',
							'操作前',
							'操作后',
							'操作原因',
							'操作时间',
							'操作人',
						]
						const filterVal = [
							'operationType',
							'modifyTermName',
							'beforeModify',
							'afterModify',
							'updateCause',
							'updateTime',
							'operateUserName',
						]
						const list = this.multipleSelection
						const data = this.formatJson(filterVal, list)
						excel.export_json_to_excel({
							header: tHeader,
							data,
							filename: '任务日志'
						})
					})
					//				if(this.multipleSelection == undefined) {
					//					window.open("/ops/api/v1/userlog/excel?module=3&ids=" + "&limit=" + this.pageSize + "&start=" + (this.currentPage-1));
					//				} else {
					//					var ids = [];
					//					for(var i = 0; i < this.multipleSelection.length; i++) {
					//						ids.push(this.multipleSelection[i].id);
					//					}
					//					window.open("/ops/api/v1/userlog/excel?module=3&ids=" + ids + "&limit=" + this.pageSize + "&start=" + (this.currentPage-1));
					//				}
				}
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]))
			},
			formatJsonAll(filterVal, jsonData) {
				return jsonData.map(v =>
					filterVal.map(j => {
						if(j === 'timestamp') {
							// return parseTime(v[j]);
						} else {
							return v[j]
						}
					})
				)
			},
			// -------------------------------------------------------
			//查询列表
			logQuery() {
				this.tableLoading = true;
				const params = {
					name: this.formInline.name,
					module: 3,
					start: (this.currentPage - 1) * this.pageSize,
					limit: this.pageSize,
				}
				if(this.formInline.time !== null) {
					params.queryStartTime = this.formInline.time[0];
					params.queryEndTime = this.formInline.time[1]
				}

				service.logQuery(params).then(res => {
					this.tableData = res.result.list;
					this.totalCount = res.result.count;
					this.tableData.forEach((item, index) => {
						if(item.operationType == '1') {
							item.operationType = '新增'
						} else if(item.operationType == '2') {
							item.operationType = '修改'
						} else if(item.operationType = '3') {
							item.operationType = '删除'
						}
					});
					this.tableLoading = false;
				})

			},

			handleSizeChange(val) { // 设置每页多少条
				this.pageSize = val
				this.logQuery()
			},
			handleCurrentChange(val) { // 当前页
				this.currentPage = val
				this.logQuery()
			},

			handleDelete() {
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			addUser() {
				console.log("add");
			},
			delUser() {
				console.log("del");
			},
			//文件上传
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			}

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
</style>