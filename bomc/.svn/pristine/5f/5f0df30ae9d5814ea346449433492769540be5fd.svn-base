<template>
	<div class='container'>
		<el-row>
			<el-col>
				<el-card>
					<el-form :inline="true" :model="formInline" class="demo-form-inline">
						<el-form-item>
							<!--<el-input placeholder="请输入平台类别"></el-input>-->
							<el-input v-model="formInline.region" placeholder="请输入任务的名称" @change='selectChange($event)'>
								<el-option v-for='(item,index) in platName' :key="index" :label="item.platformName" :value="item.platformId"></el-option>
							</el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary">查询</el-button>
						</el-form-item>
						<el-form-item class="buttonItem">
							<el-button type="success" size="small" icon="el-icon-circle-plus-outline" round @click="addUserDialog=true">新增</el-button>
							<el-button type="danger" size="small" icon="el-icon-circle-close-outline" round>删除</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-card>
					<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'userId', order: 'ascending'}">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="taskType" label='任务类型' width="100" >
						</el-table-column>
						<el-table-column prop="taskName" label='任务名称' width="100">
						</el-table-column>
						<el-table-column prop="operationDetails" label='操作详情' width="100" >
						</el-table-column>
						<el-table-column prop="inspectionRange" label='巡检范围' width="100">
						</el-table-column>
						<el-table-column prop="temDetails" label='模板详情' width="100">
							<template slot-scope="scope">
								<el-popover placement="top" width="400" trigger="hover">
									<el-collapse v-model="activeNames">
										<el-collapse-item title="节点1：节点名称" name="1"></el-collapse-item>
										<el-collapse-item title="节点2：节点名称" name="2"></el-collapse-item>
										<el-collapse-item title="节点3：节点名称" name="3">
											<div>find filename -type f | xargs grep -I "hello world">>findResult.txt</div>
											<div>find filename -type f | xargs grep -I "hello world">>findResult.txt</div>
										</el-collapse-item>
										<el-collapse-item title="节点4：节点名称" name="4"></el-collapse-item>
									</el-collapse>
									<i class="el-icon-view" slot="reference"></i>
								</el-popover>
							</template>
						</el-table-column>
						
						<el-table-column label='操作'>
							<template slot-scope="scope">
								<i class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" style="font-size:18px;margin-right:10px"></i>
								<i class="el-icon-delete" @click="handleDelete(scope.row.id)" style="font-size:18px;"></i>
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
		<!-- 新增命令弹窗 -->
		<el-dialog :title="dialog.title" :visible.sync="addUserDialog " >
			<el-row>
					<div >
						<div>
							<h3 style="margin-bottom:10px">模板信息</h3>
							<hr style="color：#eee;margin-bottom:10px"> 
						</div>
						<el-form inline="true" :model="form" style="margin-bottom:10px;border:1px solid #eee">
							<el-form-item label="模板名称" :label-width="formLabelWidth" style="margin-top:10px">
								<el-input v-model="form.name" auto-complete="off" ></el-input>
							</el-form-item>
							<el-form-item label="平台类型" :label-width="formLabelWidth" style="margin-top:10px">
								<el-select v-model="platformNameDefault" clearable placeholder="请选择" >
									<el-option v-for='(item,index) in platName' :key="index" :label="item.platformName" :value="item.platformId"></el-option>
								</el-select>
							</el-form-item>
						</el-form>

						<div>
							<h3 style="margin-bottom:10px">流程配置</h3>
							<hr style="color：#eee;margin-bottom:10px"> 
						</div>
						<el-form inline="true" :model="form" style="margin-bottom:10px;border:1px solid #eee">
							<el-form-item label="选择节点" :label-width="formLabelWidth" style="margin-top:10px">
								<el-select v-model="sectionNameDefault" clearable placeholder="请选择" >
									<el-option v-for='(item,index) in section' :key="index" :label="item.sectionName" :value="item.sectionId"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="节点名称" :label-width="formLabelWidth" style="margin-top:10px">
								<el-input v-model="form.name" auto-complete="off" ></el-input>
							</el-form-item>
						</el-form>
						<div style="margin-bottom:10px;border:1px solid #eee">
							<el-form  :model="form" style="margin-top:10px">
								<el-form-item label="选择命令" :label-width="formLabelWidth" style="margin-right:10px;">
									<el-input v-model="form.name" auto-complete="off" ></el-input>
								</el-form-item>
							</el-form>
							<el-form inline="true" :model="form" >
								<el-form-item label="选择脚本" :label-width="formLabelWidth" >
									<el-input v-model="form.name" auto-complete="off" ></el-input>
								</el-form-item>
								<el-form-item  >
									<el-upload>
										<el-button type="primary" size="small">上传脚本</el-button>
									</el-upload>
								</el-form-item>
							</el-form>
						</div>
						<el-form inline="true" style="margin-bottom:10px;border:1px solid #eee">
							<el-form-item label="对象类型" :label-width="formLabelWidth" style="margin-top:10px;">
								<el-select v-model="objectNameDefault" clearable placeholder="请选择">
									<el-option v-for='(item,index) in object' :key="index" :label="item.objectName" :value="item.objectId"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="巡检项" :label-width="formLabelWidth" style="margin-top:10px;">
								<el-select v-model="inspectionItemName" clearable placeholder="请选择">
									<el-option v-for='(item,index) in inspectionItem' :key="index" :label="item.inspectionItemName" :value="item.inspectionItemId"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
						<el-form inline="true" style="margin-bottom:10px;border:1px solid #eee">
							<el-form-item label="本地上传" :label-width="formLabelWidth" style="margin-top:10px;">
								<el-input v-model="form.name" auto-complete="off" ></el-input>
							</el-form-item>
							<el-form-item label="目的路径" :label-width="formLabelWidth" style="margin-top:10px;">
								<el-input v-model="form.name" auto-complete="off" ></el-input>
							</el-form-item>
						</el-form>

						<div>
							<h3 style="margin-bottom:10px">其他信息</h3>
							<hr style="color：#eee;margin-bottom:10px"> 
						</div>
						<el-form inline="true" :model="form" style="margin-bottom:10px;border:1px solid #eee">
							<el-form-item label="操作员" :label-width="formLabelWidth" style="margin-top:10px">
								<el-input v-model="form.name" auto-complete="off" ></el-input>
							</el-form-item>
							<el-form-item label="任务级别" :label-width="formLabelWidth" style="margin-top:10px">
								<el-select v-model="taskLevelDefault" clearable placeholder="请选择">
									<el-option v-for="item in taskLevel" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="模板状态" :label-width="formLabelWidth">
								<el-radio v-model="radio1" label="1">设为公共</el-radio>
								<el-radio v-model="radio1" label="2">设为私有</el-radio>
							</el-form-item>
						</el-form>
						
					</div>	
			
			</el-row>
			<div>
				<el-button type="primary" style="width:150px">确定</el-button>
				<el-button style="width:150px" @click="addUserDialog=false">取消</el-button>
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
					fileList: [{
						name: 'food.jpeg',
						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					}, {
						name: 'food2.jpeg',
						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					}]
				},
				textarea3: '',
			
				platName: [],
				operationName: [],
				addUserDialog: false,


				//编辑
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
					title: '巡检模板',
				},
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: "80px",
				platName: [{platformId:'选项1',platformName:'IaaS层基础平台模板'},
						{platformId:'选项2',platformName:'PaaS层软件集群模板'},
						{platformId:'选项3',platformName:'SaaS层应用模板'}],
						platformNameDefault: '选项1',
				section: [{sectionId:'选项1',sectionName:'节点01'},
						{sectionId:'选项2',sectionName:'节点02'},
						{sectionId:'选项3',sectionName:'节点03'}],
						sectionNameDefault: '选项1',
				object: [{objectId: '选项1',objectName: '主机'},
						{objectId: '选项2',objectName: '数据库'}],
						objectNameDefault: '选项1',
				inspectionItem: [{inspectionItemId: '选项1',inspectionItemName: '性能'},
								{inspectionItemId: '选项2',inspectionItemName: '磁盘'},
								{inspectionItemId: '选项3',inspectionItemName: '进程'}],
								inspectionItemName: '选项1',
				tableData: [{taskType: '实时',taskName: '20160909',operationDetails: '任务详情',temDetails:'',inspectionRange: '主机'}],
				taskLevel: [{value:'选项1',label:'高'},
							{value:'选项2',label:'中'},
							{value:'选项3',label:'低'},],
							taskLevelDefault: '选项1',
				radio1:'1',
				activeNames:'3',

			};
		},
		mounted() {
			this.queryPlatformName()
			this.queryData()
			this.queryOperation()
			//this.deleteInfo()
		},
		methods: {
			selectChange(e){
				console.log(e)
				//根据这个id发送请求，请求回来的数据放到
				e.resourceTypeId
			},
			//表单查询
			queryData() {
				const params = {
					start: (1 - 1) * this.pageSize,
					limit: this.pageSize
				}
				service.queryData(params).then(res => {
					//console.log(res)
					this.tableData = res.result.list
				})
			},
			//平台类别查询
			queryPlatformName() {
				service.queryPlatformName().then(res => {
					//console.log(res)
					this.platName = res.result
				})
			},
			//操作对象查询
			queryOperation() {
				service.queryOperation().then(res => {
					//console.log(res)
					this.operationName = res.result
				})
			},
			//删除查询信息
			handleDelete(id) {	
				console.log(id)
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
						console.log(res)
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
			},

			onSubmit() {
				console.log('submit!');
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

