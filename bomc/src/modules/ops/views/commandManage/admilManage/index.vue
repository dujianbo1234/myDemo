<template>
	<div class='container'>
		<el-row>
			<el-col>
				<el-card>
					<el-form :inline="true" :model="formInline"  ref="formInline" :rules="formInlineRules" class="demo-form-inline">
						<el-form-item>
							<el-cascader
								:options="cascaderIndex"
								change-on-select
								v-model="formInline.formType"
								clearable 
								:props="props"
								@change="cascaderIndexChange">
							</el-cascader>
						</el-form-item>
					
						<el-form-item>
							<el-input v-model="inputName" clearable placeholder="请输入命令名称"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" class="el-icon-search" @click="queryData()">查询</el-button>
						</el-form-item>
						<el-form-item class="buttonItem">
							<el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addDialog()">新增</el-button>
							<el-button type="danger" size="small" icon="el-icon-circle-close-outline" @click="deleteRow" round>删除</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-card>
					<el-table v-loading="tableLoading" @selection-change="handleSelectionChange" :data="tableData"  :default-sort="{prop: 'userId', order: 'ascending'}">
						<el-table-column type="selection" >
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="platformId" label='平台类别' align="center" sortable>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="resourceClassId" label='资源类型' align="center" :formatter="formatterResourceClassId">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="resourceTypeId" label='对象类型' align="center" :formatter="formatterResourceTypeId">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="name" label='命令名称' align="center" sortable>
						</el-table-column>
						<el-table-column  prop="content" label='命令详情' align="center" sortable>

							<template slot-scope="scope">
								<el-popover trigger="hover" v-if="scope.row.content" placement="top-start">
									<p>{{ scope.row.content }}</p>
									<div slot="reference" class="name-wrapper">
										<i class="el-icon-view" :percentage="scope.row.content"></i>
									</div>
								</el-popover>
								<el-tag v-else type="info">无数据</el-tag>
							</template>
							
							<!--<template slot-scope="scope">
								<el-popover trigger="hover" placement="top">							
									<el-popover trigger="hover" v-if="scope.row.content" placement="top-start">
									<p>{{ scope.row.content }}</p>
									<div slot="reference" class="name-wrapper">
										<el-tag slot="reference">{{ scope.row.content }}</el-tag>
									</div>
								</el-popover>
								<el-tag v-else type="info">无数据</el-tag>
									<div slot="reference" class="name-wrapper">
										<i class="el-icon-view" :percentage="scope.row.percent"></i>
									</div>
								</el-popover>
							</template>															-->
					
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="creator" label='操作人' align="center">
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
			<el-form :model="addForm" ref="addForm" :rules="addFormRules"  style="margin:10px;width:auto;">
				<el-form-item label="命令名称" :label-width="formLabelWidth" prop="nameInfo">
					<el-input v-model="addForm.nameInfo" auto-complete="off" placeholder="请输入操作名称"></el-input>
				</el-form-item>

				<el-form-item label="对象类型" :label-width="formLabelWidth" prop="formType">
					<el-cascader
						:options="cascaderIndex"
						clearable
						v-model="addForm.formType"
						:props="props"
						@change="cascaderIndexChange">
					</el-cascader>
				</el-form-item>

				<!--<el-form-item label="选择脚本" :label-width="formLabelWidth">

					<el-upload ref="uploads" :auto-upload="false" class="upload-demo" :on-change="uploadChange" :action="base_api + '/cps/script/upload '" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :on-exceed="handleExceed" :limit="1">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>

				</el-form-item>-->

				<el-form-item label="输入内容" :label-width="formLabelWidth" prop="contentInfo">
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="addForm.contentInfo">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addDialogFail()">取 消</el-button>
				<el-button type="primary" @click="saveAddInfo('addForm')">保 存</el-button>
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
				addForm : {
					formType: [],
					contentInfo: "",
					nameInfo: '',
				},
				addFormRules: {
					formType: [
						{ required: true, message: '请选择对象类型', trigger: 'change' }
					],
					nameInfo: [
						{ required: true, message: '请输入命令名称', trigger: 'blur' },
						{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
						{ validator: rule.admvalidateCode, trigger: 'blur' }
					],
					contentInfo: [
						{ required: true, message: '请输入内容', trigger: 'blur' },
						// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
				},
				// 判断新增/编辑弹框的显示隐藏
				addUserDialog: false,
				// 格式转换
				formatterResourceClassIdData:[],
				formatterResourceTypeIdData:[],
				// 判断是编辑还是新增  新增 true 编辑 false
				editAndAdd:true,
				// 保存编辑的id
				editId:'',
				// 表格数据
				tableData: [],
				// 表格加载状态bol
				tableLoading: true,
				// 新增的弹框
				dialog: {
					show: false,
					title: '新增命令',
				},
				// 表单标题的宽度
				formLabelWidth: "120px",
				// ------------------------------------------
				fileList: [],
				multipleSelection: []
			};
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
			// ------------------------------------------------------------
			nameFn() {
				return '1232134'
			},
			cascaderIndexChange(val) {
			},
			// 获取首页级联数据 资源类型
			queryIndexResourceClassId() {
				const params = {
					level:2
				}
				service.queryIndexResourceClassId(params).then(res => {
					if(res.code==200){
						this.formatterResourceClassIdData = res.result
					}
				})
			},
			// 获取首页级联数据 对象类型
			queryIndexResourceTypeId() {
				const params = {
					level:3
				}
				service.queryIndexResourceClassId(params).then(res => {
					if(res.code==200){
						this.formatterResourceTypeIdData = res.result
					}
				})
			},
			// 转换格式 资源类型
			formatterResourceClassId(row, column) {
				for(var i = 0;i<this.formatterResourceClassIdData.length;i++){
					if(row.resourceClassId == this.formatterResourceClassIdData[i].id) {
						return this.formatterResourceClassIdData[i].object
					}
				}
			},
			// 转换格式 对象类型
			formatterResourceTypeId(row, column) {
				for(var i = 0;i<this.formatterResourceTypeIdData.length;i++){
					if(row.resourceTypeId == this.formatterResourceTypeIdData[i].id) {
						return this.formatterResourceTypeIdData[i].object
					}
				}
			},
			// 新增命令关闭
			closeAdd() {
				this.$refs['addForm'].resetFields();
			},
			//弹框保存
			saveAddInfo(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const params = {
							platformId: this.addForm.formType[0],
							resourceClassId: this.addForm.formType[1],
							resourceTypeId: this.addForm.formType[2],
							name: this.addForm.nameInfo,
							content: this.addForm.contentInfo,
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
						}else {
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
						formType: [datas.platformId,datas.resourceClassId,datas.resourceTypeId],
						contentInfo:datas.content,
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
					level:3
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
					platformId: this.formInline.formType[0],
					resourceClassId: this.formInline.formType[1],
					resourceTypeId: this.formInline.formType[2],
					name: this.inputName,
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
				this.editAndAdd = true
				// 判断显示的对话框
				this.addUserDialog = true
			},
			
			
			//新增弹出框取消
			addDialogFail() {
				this.addUserDialog = false
			},
			addUser() {
			},
			delUser() {
			},
			//文件上传
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			onChange(file, fileList) {
				this.fileList = fileList
			},
			handleSelectionChange(val) {
				this.multipleSelection = val
			},
			

			
			//多条删除		
			deleteRow() {
				var ids = [];
				if(this.multipleSelection.length == 0) {
					this.$message({
						message: '请选择需要删除的数据',
						type: 'warning'
					});
				}else{
					this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'error'
					}).then(() => {
						this.multipleSelection.forEach((item,index)=>{
							ids.push(item.id)
						})
						service.deleteRow(ids).then(res=>{
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

