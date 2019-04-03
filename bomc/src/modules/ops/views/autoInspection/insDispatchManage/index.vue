<template>
	<div class='container'>
		<el-row>
			<el-col>
				<el-card>
					<el-form :inline="true" :model="formInline" class="demo-form-inline">
						<el-form-item>
							<el-input placeholder="请输入任务名称"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary">查询</el-button>
						</el-form-item>
						<el-form-item class="buttonItem">
							<el-button type="primary" size="small" round >重新执行</el-button>
							<el-button type="danger" size="small" round >停止</el-button>
							<el-button type="primary" size="small" round >暂停</el-button>
							<el-button type="primary" size="small" round >继续</el-button>
							<el-button type="danger" size="small"  round>删除</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-card>
					<el-table :data="tableData" style="width: 100%" >
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="taskName" label='任务名称' width="100">
						</el-table-column>
						<el-table-column prop="operator" label='操作人' width="100">
						</el-table-column>
						<el-table-column prop="taskLevel" label='任务级别' width="100">
						</el-table-column>
						<el-table-column prop="exeWay" label='执行方式' width="100">
						</el-table-column>
						<el-table-column prop="triCondition" label='触发条件/条' width="100">
							<template slot-scope="scope">
								<el-popover placement="top" width="400" trigger="hover">
									<el-table :data="gridData">
										<el-table-column width="100" property="insBL" label="巡检基线"></el-table-column>
										<el-table-column width="100" property="upperLimit" label="上限"></el-table-column>
										<el-table-column width="100" property="lowerLimit" label="下限"></el-table-column>
										<el-table-column width="100" property="number" label="次数"></el-table-column>
										<el-table-column width="110" property="insResult" label="巡检结果"></el-table-column>
										<el-table-column width="100" property="normal" label="是否正常"></el-table-column>
									</el-table>
									<el-tag  slot="reference">2</el-tag>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column prop="insRange" label='巡检范围' width="100">
						</el-table-column>
						<el-table-column prop="insItem" label='巡检项' width="100">
						</el-table-column>
						<el-table-column prop="startTime" label='开始时间' width="150">
						</el-table-column>
						<el-table-column prop="endTime" label='结束时间' width="150" >
						</el-table-column>
						<el-table-column prop="taskProgress" label='任务进展' width="100" >
							<template slot-scope="scope">
								<el-popover placement="top" width="400" trigger="hover">
									<el-form label-width="80px">
										<el-form-item label="执行进度">
											<el-progress percentage="70" stroke-width="10"></el-progress>
										</el-form-item>
									</el-form>
									<el-collapse v-model="activeNames" >
 										 <el-collapse-item title="节点1：节点名称 " name="1">
 										 </el-collapse-item>
										 <el-collapse-item title="节点2：节点名称 " name="2">
 										 </el-collapse-item>
										 <el-collapse-item title="节点3：节点名称 " name="3">
											 <div>find filename -type f |xargs grep -l "hello word" >> findResult.txt</div>
 										 </el-collapse-item>
										 <el-collapse-item title="节点4：节点名称 " name="4">
 										 </el-collapse-item>
									</el-collapse>
									<i class="el-icon-view" slot="reference"></i>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column prop="state" label='状态' width="100" >
						</el-table-column>
						<el-table-column prop="result" label='结果' width="100" >
							<template slot-scope="scope">
								<el-popover placement="top" width="400" trigger="hover">
									<el-input type="text" :value="message"></el-input>
									<i class="el-icon-view" slot="reference"></i>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column prop="operate" label='操作' width="300">
							<template slot-scope="scope">
								<el-button size="mini" round>停止</el-button>
								<el-button size="mini" round>暂停</el-button>
								<el-button type="danger" size="mini" icon="el-icon-delete" round></el-button>
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

		
		<!-- 新增命令弹窗 -->
		<el-dialog :title="dialog.title" :visible.sync="addUserDialog" width="400px" >
			<el-row >
				<el-col >
					<el-form  label-width="80px">
						<el-form-item label="调度方式:" >
							<el-radio v-model="radio" label="1" >手动调度</el-radio>
							<el-radio v-model="radio" label="2" >周期调度</el-radio>
						</el-form-item>
						<el-form-item label="开始执行:" >
							<el-input  placeholder="2018/07/09"></el-input>
						</el-form-item>
						<el-form-item label="结束执行:" >
							<el-input  placeholder="2018/07/12"></el-input>
						</el-form-item>
						<el-form-item label="执行周期:" >
							<el-input  placeholder="30s/次"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
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
				tableData: [{taskName:'名称XXX',operator:'张三丰',taskLevel:'高',exeWay:'实时',insRange:'主机',insItem:'巡检项1',startTime:'2018/01/01 00:00',endTime:'2018/01/01 00:00',state:'正常'}],
                inspectionType: [{inspectionTypeId:'选项1',inspectionTypeName:'巡检类型'},
                                {inspectionTypeId:'选项2',inspectionTypeName:'主机'},
                                {inspectionTypeId:'选项3',inspectionTypeName:'数据库'},
                                {inspectionTypeId:'选项4',inspectionTypeName:'中间件'},
                                {inspectionTypeId:'选项5',inspectionTypeName:'网络设备'},
                                {inspectionTypeId:'选项6',inspectionTypeName:'PasS集成组件'},],
                                inspectionTypeNameDefault: '选项1',
				operationName: [],
				addUserDialog: false,
				gridData:[{insBL:'CPU%5',upperLimit:'%10',lowerLimit:'%3',number:'第一次',insResult:'CPU占比%10',normal:'正常'}],
				message:'成功执行',
				activeNames: ['1'],

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
					title: '调度配置',
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
				formLabelWidth: "120px",
				radio: '1'
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


