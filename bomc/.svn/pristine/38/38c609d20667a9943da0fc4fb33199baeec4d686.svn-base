<template>
	<div class='container'>
		<el-row>
			<el-col>
				<el-card>
					<el-form :inline="true" class="demo-form-inline" :model="formInline" :rules="formInlineRules" ref="queryForm">
						<el-form-item>
							<el-input v-model="formInline.hostNum" placeholder="请输入主机编号"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input v-model="formInline.hostIp" placeholder="请输入IP"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input v-model="formInline.hostCreator" placeholder="请输入创建人"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="queryData()">查询</el-button>
						</el-form-item>
						<el-form-item class="buttonItem">
							<el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addDialog()">新增</el-button>
							<el-button type="danger" size="small" icon="el-icon-circle-close-outline" @click="deleteRow()" round>删除</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-card>
					<el-table @selection-change="handleSelectionChangeOne" :data="tableData" :default-sort="{prop: 'userId', order: 'ascending'}">
						<el-table-column prop="status" :reserve-selection="true" type="selection">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="platformId" label='主机类型' align="center" sortable>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="resourceClassId" label='主机编号' align="center" :formatter="formatterResourceClassId">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="resourceTypeId" label='IP' align="center" :formatter="formatterResourceTypeId">
						</el-table-column>
						<!--<el-table-column show-overflow-tooltip prop="name" label='命令名称' align="center" sortable>
						</el-table-column>-->
						<el-table-column prop="content" label='用户' align="center" sortable>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="creator" label='创建人' align="center">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="createTime" label='创建时间' align="center" min-width="170" sortable>
						</el-table-column>
						<el-table-column label='操作' align="center" min-width="170">
							<template slot-scope="scope">
								<el-button size="mini" type="primary" @click="queryModifyData(scope.row.id)" class="el-icon-edit">编辑</el-button>
								<el-button size="mini" type="danger" @click="handleDelete(scope.row.id)" icon="el-icon-circle-close-outline">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="block" align="right">
						<el-pagination v-if="totalCount>0" :current-page="currentPage" :page-sizes="[5, 10, 20, 50, 100, 200, 500]" :page-size="pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
					</div>
				</el-card>
			</el-col>
		</el-row>
		<!-- dialog -->
		<!-- 新增命令弹窗 -->
		<el-dialog :title="dialog.title" :visible.sync="addUserDialog" @close="closeAdd">
			<el-form :model="addForm" ref="addForm" :rules="addFormRules" style="margin:30px;width: auto;">
				<el-steps :active="active" align-center>
					<el-step title="选择主机机型"></el-step>
					<el-step title="选择主机"></el-step>
					<el-step title="输入用户"></el-step>
				</el-steps>
				<div ref="stepOne" class="stepOne">
					<el-form-item label="选择主机类型" style="margin-left: 23%;margin-top: 50px;">
						<el-cascader :options="cascaderIndex" clearable v-model="addForm.formType" :props="props" @change="cascaderIndexChange">
						</el-cascader>
					</el-form-item>
				</div>
				<div ref="stepTwo" class="stepTwo">
					<el-form-item>
						<el-table @selection-change="handleSelectionChangeTwo" :data="ipName" ref="ipName">
							<el-table-column type="selection">
							</el-table-column>
							<el-table-column show-overflow-tooltip prop="num" label='主机资源编号' align="center">
							</el-table-column>
							<el-table-column show-overflow-tooltip prop="ip" label='IP' align="center">
							</el-table-column>
							<el-table-column prop="name" label='区域' align="center" sortable>
							</el-table-column>
							<el-table-column show-overflow-tooltip prop="name" label='系统' align="center">
							</el-table-column>
						</el-table>
						<!--<div class="block" align="right">
					<el-pagination v-if="totalCount>0" :current-page="currentPage" :page-sizes="[5, 10, 20, 50, 100, 200, 500]" :page-size="pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
				</div>-->
					</el-form-item>
				</div>
				<div ref="stepThree" class="stepThree">
					<el-form-item>
						<el-tabs tabPosition="left" style="height: 300px;margin-top: 30px;overflow-y:scroll;">
							<el-tab-pane :label="item.name" v-for="(item,index1) in myHost">
								<el-row>
									<el-scrollbar style="height: 100%;">
										<el-col :span="10">
											<el-form-item label="主机资源编号" label-width='120px'>
												<el-input v-model="item.num" disabled></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="10">
											<el-form-item label="IP" label-width='80px'>
												<el-input v-model="item.ip" disabled></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="10" style="margin-top: 10px;">
											<el-form-item v-for="(domain, index) in item.domains" :label="'用户' + index" :key="domain.key" label-width='120px' style="margin-top: 10px;">
												<el-input v-model="domain.userName" style="width: 160px;"></el-input>
											</el-form-item>
										</el-col>
										<el-col :span="10" style="margin-top: 10px;">
											<el-form-item v-for="(domain, index) in item.domains" :label="'密码' + index" :key="domain.key" label-width='80px' style="margin-top: 10px;">
												<el-input v-model="domain.passWord" style="width: 160px;"></el-input>
												<el-button size="mini" type="danger" @click.prevent="removeDomain(index1,index)" icon="el-icon-circle-close-outline"></el-button>
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item>
												<el-button @click="addDomain(index1)">新增</el-button>
											</el-form-item>
										</el-col>
									</el-scrollbar>
								</el-row>
							</el-tab-pane>
						</el-tabs>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="pre" v-if="active==1||active==2" id="pre">上一步</el-button>
				<el-button @click="next" v-if="active==1||active==0" id="next" title="请选择数据" refs="nextStep" :disabled="mydisabled">下一步</el-button>
				<!--<el-button @click="addDialogFail()">取 消</el-button>-->
				<el-button type="primary" @click="saveAddInfo('addForm')" v-if="active==2">保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import * as service from '@/modules/ops/api/ops/commandManage/admilManage.js'
	import * as rule from '@/modules/ops/api/rules.js'
	import { setTimeout } from 'timers';
	export default {
		data() {
			return {
				dynamicValidateForm: {
					domains: [{
						value: ''
					}]
				},
				mydisabled: false,
				active: 0,
				base_api: 'http://192.168.137.10:8081',
				pageSize: 10, // 每页多少条
				currentPage: 1, // 当前页
				totalCount: '', // 总条数
				id: '',
				// ------------------------------------------
				// 改变级联选择器的key值
				props: {
					value: 'id',
					label: 'object'
				},
				// 保存级联选择器的数据
				cascaderIndex: [],
				// 行内表单数据
				formInline: {
					formType: [],
				},
				// 行内表单的命令名称数据
				inputName: '',
				formInlineRules: {},
				// 新增的表单数据
				addForm: {
					formType: [],
					contentInfo: "",
					nameInfo: '',
				},
				multiples: [],
				addFormRules: {
					formType: [{
						required: true,
						message: '请选择对象类型',
						trigger: 'change'
					}],
					nameInfo: [{
							required: true,
							message: '请输入命令名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: 'blur'
						},
						{
							validator: rule.admvalidateCode,
							trigger: 'blur'
						}
					],
					contentInfo: [{
							required: true,
							message: '请输入内容',
							trigger: 'blur'
						},
						// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
				},
				// 判断新增/编辑弹框的显示隐藏
				addUserDialog: false,
				// 格式转换
				formatterResourceClassIdData: [],
				formatterResourceTypeIdData: [],
				// 判断是编辑还是新增  新增 true 编辑 false
				editAndAdd: true,
				// 保存编辑的id
				editId: '',
				// 表格数据
				tableData: [],
				// 表格加载状态bol
				tableLoading: true,
				// 新增的弹框
				dialog: {
					show: false,
					title: '新增主机',
				},
				// 表单标题的宽度
				formLabelWidth: "120px",
				// ------------------------------------------
				fileList: [],
				multipleSelection: [],
				myHost: [],
				//新增中的表格
				mulitples: [],
				ipName: [{
					name: "主机1",
					id: 1,
					ip: "192.168.0.1",
					num: "1",
					domains: [{
						userName: 'user111',
						passWord: "user111"
					}]
				}, {
					name: "主机2",
					id: 2,
					ip: "192.168.0.2",
					num: "2",
					domains: [{
						userName: 'user222',
						passWord: "user222"
					},
					{
						userName: 'user222-2',
						passWord: "user222-2"
					},
					{
						userName: 'user222-3',
						passWord: "user222-3"
					}]
				}, {
					id: 3,
					name: "主机3",
					ip: "192.168.0.3",
					num: "3",
					domains: [{
						userName: 'user333',
						passWord: "user333"
					}]
				}, {
					name: "主机4",
					id: 4,
					ip: "192.168.0.4",
					num: "4",
					domains: [{
						userName: 'user444',
						passWord: "user444"
					}]
				}, {
					name: "主机5",
					id: 5,
					ip: "192.168.0.5",
					num: "5",
					domains: [{
						userName: 'user555',
						passWord: "user555"
					}]
				}]
			}
		},
		mounted() {
			// 转换格式 资源类型
			this.queryIndexResourceClassId()
			// 转换格式 对象类型
			this.queryIndexResourceTypeId()
			// 获取首页级联数据
			this.queryIndexCascader()
			// 获取列表数据
			this.queryData()
		},
		methods: {
			removeDomain(index1, index) {
				this.myHost[index1].domains.splice(index, 1);
			},
			addDomain(index) {
				const obj = {}
				obj.passWord = "";
				obj.userName = "";
				this.myHost[index].domains.push(obj);
			},
			cascaderIndexChange(val) {
				console.log(val)
			},
			// 获取首页级联数据 资源类型
			queryIndexResourceClassId() {
				const params = {
					level: 2
				}
				service.queryIndexResourceClassId(params).then(res => {
					if(res.code == 200) {
						this.formatterResourceClassIdData = res.result
					}
				})
			},
			// 获取首页级联数据 对象类型
			queryIndexResourceTypeId() {
				const params = {
					level: 3
				}
				service.queryIndexResourceClassId(params).then(res => {
					if(res.code == 200) {
						this.formatterResourceTypeIdData = res.result
					}
				})
			},
			// 转换格式 资源类型
			formatterResourceClassId(row, column) {
				for(var i = 0; i < this.formatterResourceClassIdData.length; i++) {
					if(row.resourceClassId == this.formatterResourceClassIdData[i].id) {
						return this.formatterResourceClassIdData[i].object
					}
				}
			},
			// 转换格式 对象类型
			formatterResourceTypeId(row, column) {
				for(var i = 0; i < this.formatterResourceTypeIdData.length; i++) {
					if(row.resourceTypeId == this.formatterResourceTypeIdData[i].id) {
						return this.formatterResourceTypeIdData[i].object
					}
				}
			},
			// 新增窗口关闭
			closeAdd() {
				this.$refs['addForm'].resetFields();
				this.$refs.ipName.clearSelection();
			},
			//弹框保存
			saveAddInfo(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const params = {
							typeId: this.addForm.formType,
							arr: this.myHost
						}

						if(this.editAndAdd) {
							service.AddInfo(params).then(res => {
								this.addUserDialog = false
								this.$message({
									type: 'success',
									message: res.msg
								})
								this.queryData();
							}).catch(() => {
								this.$message({
									type: 'info',
									message: res.msg
								})
							})
						} else {
							params.id = this.editId
							service.modifyInfo(params).then(res => {
								this.addUserDialog = false
								this.queryData()
								this.$message({
									type: 'success',
									message: '修改成功!'
								});

								this.fileList = [];
							})
						}

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//编辑弹出信息查询
			queryModifyData(id) {
				this.addUserDialog = true
				this.editId = id
				const params = {
					id: id,
				}
				service.queryDataModify(params).then(res => {
					const datas = res.result.list[0]
					const editForm = {
						formType: [datas.platformId, datas.resourceClassId, datas.resourceTypeId],
						contentInfo: datas.content,
						nameInfo: datas.name,
					}
					this.addForm = editForm
					// 判断是编辑还是新增
					this.editAndAdd = false
				})
			},

			// 获取首页级联数据
			queryIndexCascader() {
				const params = {
					level: 3
				}
				service.queryIndexCascader(params).then(res => {
					this.cascaderIndex = res;
				})
			},
			//单条删除
			handleDelete(id) {
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					const params = {
						id: id
					}
					service.deleteInfo(params).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
						this.inputName = ''
						this.queryData()
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '删除失败'
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			// ------------------------------------------------------------
			//查询列表
			queryData() {
				this.tableLoading = true;
				const params = {
					hostNum: this.formInline.hostNum,
					hostIp: this.formInline.hostIp,
					hostCreator: this.formInline.hostCreator,
					start: (this.currentPage - 1) * this.pageSize,
					limit: this.pageSize
				}
				service.queryData(params).then(res => {
					this.tableData = res.result.list;
					this.totalCount = res.result.count;
					this.tableLoading = false;
				})
			},
			handleSizeChange(val) { // 设置每页多少条
				this.pageSize = val
				this.queryData()
			},
			handleCurrentChange(val) { // 当前页
				this.currentPage = val
				this.queryData()
			},
			//新增弹出框
			addDialog() {
				// 判断是编辑还是新增
				this.active = 0;
				this.editAndAdd = true;
				// 判断显示的对话框
				this.addUserDialog = true;
				this.myHost = [];
				setTimeout(() => {
					if(this.addUserDialog) {
						this.$refs.stepOne.style.display = "block";
						this.$refs.stepTwo.style.display = "none";
						this.$refs.stepThree.style.display = "none";
					}

				}, 100)
			},
			//上一步
			//因为不支持v-show
			pre() {
				if(this.active-- < 1) this.active = 0;
				if(this.active == 1) {
					this.$refs.stepOne.style.display = "none";
					this.$refs.stepTwo.style.display = "block";
					this.$refs.stepThree.style.display = "none";
					//					setTimeout(() => {
					if(this.$refs.stepTwo.style.display == "block") {
						for(var i = 0; i < this.myHost.length; i++) {
							for(let index = 0; index < this.ipName.length; index++) {
								if(this.myHost[i].id == this.ipName[index].id) { //服务端返回需选中项的id
									this.$refs.ipName.toggleRowSelection(this.ipName[index], true); // 选中
								}
							}
						}
					}
					//					}, 200)
				}
				if(this.active == 0) {
					this.$refs.stepOne.style.display = "block";
					this.$refs.stepTwo.style.display = "none";
					this.$refs.stepThree.style.display = "none";
//										if(this.addForm.formType.length == 0) {
//											this.mydisabled = true;
//										} else {
//											this.mydisabled = false;
//										}
				}
			},
			next() {
				if(this.active++ > 1) this.active = 2;
//				if(this.active == 1 && this.addForm.formType.length == 0) {
//					this.active = 0;
//					this.$message({
//						message: '请选择主机机型',
//						type: 'warning'
//					});
//					return false
//				}
				if(this.active == 1) {
					this.$refs.stepOne.style.display = "none";
					this.$refs.stepTwo.style.display = "block";
					this.$refs.stepThree.style.display = "none";
					//					setTimeout(() => {
					if(this.$refs.stepTwo.style.display == "block") {
						for(var i = 0; i < this.myHost.length; i++) {
							for(let index = 0; index < this.ipName.length; index++) {
								if(this.myHost[i].id == this.ipName[index].id) { //服务端返回需选中项的id
									this.$refs.ipName.toggleRowSelection(this.ipName[index], true); //选中
								}
							}
						}
					}
					//					if(this.myHost.length == 0) {
					//						this.mydisabled = true;
					//					} else {
					//						this.mydisabled = false;
					//					}
					//										}, 200)
				}
				if(this.active == 2 && this.myHost.length == 0) {
					this.active = 1
					this.$refs.stepOne.style.display = "none";
					this.$refs.stepTwo.style.display = "block";
					this.$refs.stepThree.style.display = "none";
					this.$message({
						message: '请先勾选所需要的主机',
						type: 'warning'
					});
					return false
				}
				if(this.active == 2 && this.myHost.length > 0) {
					this.$refs.stepOne.style.display = "none";
					this.$refs.stepTwo.style.display = "none";
					this.$refs.stepThree.style.display = "block";
				}
				console.log(this.active)
			},
			//新增弹出框取消
			addDialogFail() {
				this.addUserDialog = false;

			},
			handleSelectionChangeOne(val) {
				this.multipleSelection = val
			},
			handleSelectionChangeTwo(val) {
				this.multiples = val;
				console.log(this.multiples);
				this.myHost = val;
				console.log(this.myHost);
			},
			//多条删除		
			deleteRow() {
				var ids = [];
				if(this.multipleSelection.length == 0) {
					this.$message({
						message: '请选择需要删除的数据',
						type: 'warning'
					});
				} else {
					this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'error'
					}).then(() => {
						this.multipleSelection.forEach((item, index) => {
							ids.push(item.id)
						})
						service.deleteRow(ids).then(res => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							})
							this.inputName = ''
							this.queryData();
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '删除失败'
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
	
	.el-cascader--medium {
		width: 50% !important;
	}
	
	.el-form-item__content {
		text-align: center;
	}
	
	.el-form-item--medium .el-form-item__label {
		margin-left: 20% !important;
	}
	
	.stepOne {
		display: block;
	}
	
	.stepTwo {
		display: none;
	}
	
	.stepThree {
		display: none;
	}
</style>