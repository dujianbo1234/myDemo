<template>
	<div class='container'>
		<el-row>
			<el-col>
				<el-card>
					<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
						<el-form-item>
							<el-select v-model="doServiceDefault" placeholder="请选择服务" @change="serviceChange(doServiceDefault)">
								<el-option v-for="(item,index) in doServiceResult" :key="index" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-input v-model="inputName" clearable placeholder="请输入服务名称"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" class="el-icon-search" @click="queryData(doServiceDefault)">查询</el-button>
						</el-form-item>
						<el-form-item class="buttonItem">
							<el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addDialog(doServiceDefault)">新增</el-button>
							<el-button type="danger" size="small" icon="el-icon-circle-close-outline" @click="deleteRow" round>删除</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-card>
					<el-table v-loading="tableLoading" @selection-change="handleSelectionChange" :data="tableData" :default-sort="{prop: 'userId', order: 'ascending'}">
						<el-table-column type="selection">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="name" :label='doService' align="center">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="platformName" label='所属类型' align="center">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="groupNameList" label='详情' align="center" v-if="myShow">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="serviceName" label='归属组' align="center" v-if="!myShow">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="instanceName" label='归属实例' align="center" v-if="!myShow">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="path" label='所在路径' align="center" v-if="!myShow">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="creatorName" label='创建人' align="center">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="state" label='运行状态' align="center">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="createTime" label='创建时间' align="center" min-width="170">
						</el-table-column>
						<el-table-column label='操作' align="center" min-width="170">
							<template slot-scope="scope">
								<el-button size="mini" type="primary" @click="queryModifyData(scope.row.id)" icon="el-icon-edit">编辑</el-button>
								<el-button size="mini" type="danger" @click="handleDelete(scope.row.id)" icon="el-icon-circle-close-outline">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="block" align="right">
						<el-pagination v-if="totalCount>0" :current-page="currentPage" :page-sizes="[ 10, 20, 30, 40, 50]" :page-size="pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
					</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- dialog -->
		<!-- 新增命令弹窗 -->
		<el-dialog :title="dialog.title" :visible.sync="addUserDialog" @close="addDialogFail">
			<el-form :model="addForm" ref="addForm" :rules="addFormRules" style="margin:10px;width:auto;">
				<el-form-item label="应用类型" :label-width="formLabelWidth" prop="platformId">
					<el-select v-model="addForm.platformId" :label-width="formLabelWidth" clearable placeholder="请选择所属平台类型">
						<el-option v-for="item in formTypeData" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所在主机" :label-width="formLabelWidth" prop="host" v-if="doServiceDefault==0">
					<el-select v-model="addForm.host" collapse-tags placeholder="请选择服务所在主机">
						<el-option v-for="item in hostIPDate" :key="item.host" :label="item.host" :value="item.host">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="服务名称" :label-width="formLabelWidth" sortable prop="name" v-if="doServiceDefault==0">
					<el-input placeholder="请输入服务名称" v-model="addForm.name">
					</el-input>
				</el-form-item>
				<el-form-item label="用户名" :label-width="formLabelWidth" sortable prop="hostName" v-if="doServiceDefault==0">
					<el-input placeholder="请输入用户名" v-model="addForm.hostName">
					</el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth" sortable prop="hostPassword" v-if="doServiceDefault==0">
					<el-input placeholder="请输入密码" v-model="addForm.hostPassword">
					</el-input>
				</el-form-item>
				<el-form-item label="所在路径" :label-width="formLabelWidth" sortable prop="path" v-if="doServiceDefault==0">
					<el-input placeholder="请输入服务所在路径" v-model="addForm.path">
					</el-input>
				</el-form-item>
				<el-form-item label="服务状态监测脚本" v-if="doServiceDefault==0">
					<el-upload class="upload-demo" accept="sh" action='/ops/api/v1/mainTask/upload' :on-preview="handlePreview" :on-remove="handleRemove" :beforeUpload="beforeAvatarUpload" :before-remove="beforeRemove" :limit="1" :on-error="onError" :on-success="onSuccess" :file-list="addForm.fileList">
						<el-button size="small" type="primary" title="请上传ssh脚本文件">点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="服务组命名" :label-width="formLabelWidth" sortable prop="name" v-if="doServiceDefault==1">
					<el-input placeholder="请给服务组命名" v-model="addForm.name">
					</el-input>
				</el-form-item>
				<el-form-item label="服务实例命名" :label-width="formLabelWidth" sortable prop="name" v-if="doServiceDefault==2">
					<el-input placeholder="请给服务实例命名" v-model="addForm.name">
					</el-input>
				</el-form-item>
				<el-form-item label="服务列表" :label-width="formLabelWidth" sortable prop="programGroup" v-if="doServiceDefault=='1'||doServiceDefault==2">
					<el-select v-model="addForm.programGroup" multiple collapse-tags clearable placeholder="请选择服务">
						<el-option v-for="item in doServiceData" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center;">
				<el-button type="primary" @click="saveAddInfo('addForm')">保 存</el-button>
				<el-button @click="addDialogFail('addForm')">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import * as service from '@/modules/ops/api/ops/serviceDo/serviceDo.js'
	import { setTimeout } from 'timers';
	import * as rule from '@/modules/ops/api/rules.js'
	import { getToken } from '@/utils/auth'
	export default {
		data() {
			return {
				label: "",
				doService: "服务名称",
				hostIPDate: [],
				myShow: false,
				doServiceData: [],
				doServiceResult: [{
						value: '0',
						label: '服务'
					},
					{
						value: '1',
						label: '服务组'
					},
					{
						value: '2',
						label: '服务实例'
					}
				],
				//								props: {
				//									value: 'array',
				//									label: 'object'
				//								},
				formTypeData: [{
						value: '1',
						label: 'IAAS基础平台'
					},
					{
						value: '2',
						label: 'PAAS软件集群'
					},
					{
						value: '3',
						label: 'SAAS层应用'

					}
				],
				doServiceDefault: '0',
				base_api: 'http://192.168.137.10:8081',
				pageSize: 10, // 每页多少条
				currentPage: 1, // 当前页
				totalCount: '', // 总条数
				id: '',
				// 保存级联选择器的数据
				cascaderIndex: [],
				// 行内表单数据
				formInline: {
					//					platformId: {},
				},
				//				formCom: [],
				// 行内表单的命令名称数据
				inputName: '',
				formInlineules: {},
				// 新增的表单数据
				addForm: {
					platformId: "",
					host: '',
					hostPassword: "",
					hostName: '',
					path: "",
					name: "",
					programGroup: [],
					fileList: [],
					myPath: "",
					scriptAddress: "" //脚本成功返回路径
				},
				addFormRules: {
					platformId: [{
						required: true,
						message: '请选择平台类型',
						trigger: 'blur'
					}],
					host: [{
						required: true,
						message: '请选择服务所在主机',
						trigger: 'blur'
					}],
					programGroup: [{
						required: true,
						message: '请选择服务',
						trigger: 'change'
					}],
					name: [{
						validator: rule.validateCode,
						trigger: 'blur',
						required: true
					}],
					hostName: [{
							validator: rule.validateCode,
							trigger: 'blur',
							required: true
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: 'blur'
						}
					],
					hostPassword: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
					path: [{
							required: true,
							message: '请输入服务所在路径',
							trigger: 'blur'
						},
						// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
				},
				// 判断新增/编辑弹框的显示隐藏
				addUserDialog: false,
				// 格式转换
				// 判断是编辑还是新增  新增 true 编辑 false
				editAndAdd: true,
				// 保存编辑的id
				editId: '',
				tableData: [],
				// 表格加载状态bol
				tableLoading: true,
				// 新增的弹框
				dialog: {
					show: false,
					title: '新增服务',
				},
				// 表单标题的宽度
				formLabelWidth: "120px",
				formLabelWidth2: "200px",
				// ------------------------------------------
				//				fileList: [],
				multipleSelection: []
			};
		},
		mounted() {
			// 转换格式 资源类型
			//			this.queryIndexResourceClassId()
			//			// 转换格式 对象类型
			//			this.queryIndexResourceTypeId()
			// 获取首页级联数据
			this.queryGetService()
			// 获取列表数据
			this.queryData()
			//获取主机列表
			this.queryIP()
		},
		computed: {
			myHeaders: function() {
				// `this` 指向 vm 实例
				const datas = {
					'X-Token': getToken()
				}
				console.log(datas)
				return datas
			}
		},
		methods: {
			queryIP() {
				service.queryIP().then(res => {
					this.hostIPDate = res.result;
					console.log(this.hostIPDate)
				})
			},
			queryGetService() {
				service.queryGetService().then(res => {
					this.doServiceData = res.result;
				})
			},

			//弹框保存
			saveAddInfo(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const params = {
							groupId: this.doServiceDefault, //服务类型
							platformId: this.addForm.platformId, //平台类型
							host: this.addForm.host, //主机地址
							hostName: this.addForm.hostName, //用户名
							hostPassword: this.addForm.hostPassword, //密码
							path: this.addForm.path, //文件路径
							name: this.addForm.name, //名称
							programGroup: this.addForm.programGroup, //服务列表
							scriptAddress: this.scriptAddress
						}
						if(this.editAndAdd) {
							service.AddInfo(params).then(res => {
								if(res.code == 200) {
									this.addUserDialog = false;
									this.$message({
										type: 'success',
										message: res.msg
									})
									this.queryData();
								} else {
									this.addUserDialog = true;
									this.$message({
										type: 'error',
										message: res.msg
									})
								}
							}).catch(() => {
								this.addUserDialog = true;
								this.$message({
									type: 'info',
									message: res.msg
								})
							})
						} else {
							params.id = this.editId
							service.modifyInfo(params).then(res => {
								if(res.code == 200) {
									this.queryData();
									this.addUserDialog = false;
									this.$message({
										type: 'success',
										message: res.msg
									})
									this.queryData();
								} else {
									this.addUserDialog = true;
									this.$message({
										type: 'error',
										message: res.msg
									})
								}
							})
						}

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//文件上传
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			onSuccess(response, file, fileList) {
				var myData = response;
				console.log(myData);
				if(myData.code != 200) {
					this.$message.warning(myData.msg);
				} else {
					this.$message.success("文件上传成功");
					this.scriptAddress = myData.result
				}

			},
			onError(err) {
				this.$message.warning(reponse.msg);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			beforeAvatarUpload(file) {
				const sh = file.name.split('.')[1] === 'sh'
				if(!sh) {
					this.$message.error("请上传正确文件");
				}
				return false
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
					console.log(res.result);
					const editForm = {
						groupId: datas.groupId,
						platformId: datas.platformId.toString(), //平台类型
						host: datas.host, //主机地址
						hostName: datas.hostName, //用户名
						hostPassword: datas.hostPassword, //用户密码
						path: datas.path, //文件路径
						name: datas.name, //服务名称
						programGroup: datas.programGroup, //服务列表
						scriptAddress: this.scriptAddress
					}
					this.addForm = editForm
					// 判断是编辑还是新增
					this.editAndAdd = false
				})
			},
			serviceChange(param) {
				this.queryData(param);
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
			queryData(type) {
				this.tableLoading = true;
				if(type == 0) {
					this.doService = '服务名称';
					this.myShow = false;
				}
				if(type == 1) {
					this.doService = '服务组名称';
					this.myShow = true;
				}
				if(type == 2) {
					this.doService = '服务实例名称';
					this.myShow = true;
				}
				const params = {
					name: this.inputName, //服务名称
					groupId: this.doServiceDefault,
					start: (this.currentPage - 1) * this.pageSize,
					limit: this.pageSize
				}
				service.queryData(params).then(res => {
					if(res.result.list.length > 0) {
						this.tableData = res.result.list;
						this.tableLoading = false;
					}
					this.totalCount = res.result.count;
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
			handleSelectionChange(val) {
				this.multipleSelection = val
			},
			//新增弹出框
			addDialog(val) {
				if(this.doServiceDefault == '') {
					this.$message({
						type: 'info',
						message: '请先选择服务!'
					})
					this.addUserDialog = false
				} else {
					this.myType = val;
					// 判断是编辑还是新增
					this.editAndAdd = true
					// 判断显示的对话框
					this.addUserDialog = true
					this.dialog.title = "新增" + this.doServiceResult[val].label
					this.addForm.platformId = ''
					this.addForm.host = '',
						this.addForm.hostPassword = '',
						this.addForm.path = '',
						this.addForm.name = '',
						this.addForm.programGroup = [],
						this.addForm.fileList = []
					this.addForm.myPath = ''
				}
			},
			//新增弹出框取消
			addDialogFail(formName) {
				this.addUserDialog = false;
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
</style>