<template>
	<div class='container'>
		<el-row>
			<el-col>
				<el-card>
					<el-form :inline="true" :model="formInline" class="demo-form-inline">
						<el-form-item>
							<el-input placeholder="请输入查询字段"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary">查询</el-button>
						</el-form-item>
						<el-form-item class="buttonItem">
							<el-button type="primary" round>导出</el-button>
							<el-button type="primary" round @click="editDialog=true">编辑</el-button>
                            <el-button type="danger" round>删除</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-card>
					<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'userId', order: 'ascending'}">
						<el-table-column type="selection" width="55" align="center">
						</el-table-column>
						<el-table-column prop="insTask" label='巡检任务' width="90" align="center">
						</el-table-column>
						
						<el-table-column prop="insItem" label='巡检项' width="90" align="center">
						</el-table-column>
						<el-table-column prop="insBLValue" label='巡检项基线值' width="90" align="center">
						</el-table-column>
						<el-table-column prop="insBLUL" label='巡检项基线上限' width="90" align="center">
						</el-table-column>
						<el-table-column prop="insBLLL" label='巡检项基线下限' width="90" align="center">
						</el-table-column>
						<el-table-column prop="insPeriod" label='巡检周期'  width="90" align="center">
						</el-table-column>
                        <el-table-column prop="state" label='状态' width="90" align="center">
						</el-table-column>
						<el-table-column  label='巡检结果' width="90" align="center">
							<template slot-scope="scope">
								<el-popover placement="right" width="630" trigger="hover">
									<el-table :data="gridData">
										<el-table-column width="100" property="insBL" label="巡检基线"></el-table-column>
										<el-table-column width="100" property="upperLimit" label="上限"></el-table-column>
										<el-table-column width="100" property="lowerLimit" label="下限"></el-table-column>
										<el-table-column width="100" property="number" label="次数"></el-table-column>
										<el-table-column width="110" property="insResult" label="巡检结果"></el-table-column>
										<el-table-column width="100" property="normal" label="是否正常"></el-table-column>
									</el-table>
									<i class="el-icon-view" slot="reference"></i>
								</el-popover>
							</template>
						</el-table-column>
                        <el-table-column prop="comResult" label='基线比对结果' width="90" align="center">
						</el-table-column>
						<el-table-column prop="insNumber" label='巡检次数' width="90" align="center">
						</el-table-column>
                        <el-table-column prop="operate" label='操作' width="130" align="center">
							<template slot-scope="scope">
								<el-button size="mini" round>导出</el-button>
								<i class="el-icon-delete" style="font-size:16px;margin-left:10px"></i>
							</template>
						</el-table-column>
					</el-table>
					<div class="block" align="right">
						<el-pagination :page-size="pageSize" :total="totalSize" layout="prev, pager, next, jumper">
						</el-pagination>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- dialog -->
		<!-- 编辑命令弹窗 -->
		<el-dialog  :visible.sync="editDialog">
			<el-row>
				<el-col>
					<el-form label-width="200px">
						<el-form-item label="将上次检查结果作为基线">
							<el-radio v-model="radioResult" label="1">是</el-radio>
							<el-radio v-model="radioResult" label="2">否</el-radio>
						</el-form-item>
						<el-form-item label="手工输入基线数据">
								<el-input type="text" style="width:200px;display:inline-block"></el-input>
								
						</el-form-item>
						<el-form-item label="基线上限">
							<el-input type="text" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="基线下限" >
							<el-input type="text" style="width:200px;"></el-input>
						</el-form-item>
						<el-form-item label="是否警告">
							<el-radio v-model="radioAlert" label="1">是</el-radio>
							<el-radio v-model="radioAlert" label="2">否</el-radio>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" >保存</el-button>
				<el-button  >取消</el-button>
			</div>
		</el-dialog>

	</div>
</template>


<script>
	import * as service from '@/modules/ops/api/ops/commandManage/admilManage.js'
	export default {
		data() {
			return {
				pageSize: 10, // 每页多少条
				totalSize: 1000, // 总条数	
				formInline: {
					user: "",
					region: "",
					region1: "",
					
				},
				radioResult: '1',
				radioAlert: '2',
				textarea3: '',
				tableData: [{insTask:'性能',insNumber:'第一次',insItem:'CPU',insBLValue:'%5',insBLUL:'%10',insBLLL:'%5',insPeriod:'2H/次',state:'巡检中',comResult:'正常'}],
	
				operationName: [],
				editDialog: false,
				gridData:[{insBL:'CPU%5',upperLimit:'%10',lowerLimit:'%3',number:'第一次',insResult:'CPU占比%10',normal:'正常'}],


				handleEdit(row) {
					this.form.userId = row.userId;
					this.form.loginName = row.loginName;
					this.form.userName = row.userName;
					this.form.department = row.department;
					this.form.tel = row.tel;
					this.form.time = row.time;
					this.addUserDialog = true;
					this.dialog.title = '修改命令';
				},


				dialog: {
					show: false,
					title: '新增命令',
				},
				form: {
					name: "",
					region: "",
					date1: "",
					date2: "",
					delivery: false,
					type: [],
					resource: "",
					desc: ""
				},
				formLabelWidth: "120px"
			};
		},
		mounted() {
			
			this.queryData()
			
			//this.deleteInfo()
		},
		methods: {
			selectChange(e){
				//根据这个id发送请求，请求回来的数据放到
				e.resourceTypeId
			},
			//表单查询
			queryData() {
				
				service.queryData().then(res => {
					
				})
			},
			//平台类别查询
			queryPlatformName() {
				service.queryPlatformName().then(res => {
					this.platName = res.result
				})
			},
			//操作对象查询
			queryOperation() {
				service.queryOperation().then(res => {
					this.operationName = res.result
				})
			},
			//删除查询信息
			handleDelete(id) {	
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
					const params = {
					  id:id
					}
					service.deleteInfo(params).then(res => {
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},

			addUser() {
			},
			delUser() {
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
</style>





