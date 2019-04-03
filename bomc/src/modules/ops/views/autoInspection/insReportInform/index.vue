<template>
	<div class='container'>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<el-form :inline="true" :model="formTopQuery" ref="formTopQuery" :rules="formTopQueryRules" class="demo-form-inline" label-width="80px">
					<el-form-item label="巡检结果" prop="inspectionResultDefault">
						<el-select style="width:150px" v-model="formTopQuery.inspectionResultDefault" clearable  > 
							<el-option v-for="(item,index) in inspectionResult" :key="index" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<!-- <el-form-item label="执行方式" prop="executeWayDefault">
						<el-select style="width:150px" v-model="formTopQuery.executeWayDefault" > 
							<el-option v-for="(item,index) in executeWay" :key="index" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item> -->
					<el-form-item  prop="name">
						<el-input  v-model="formTopQuery.name" style="width:200px" placeholder="请输入任务名称/执行人"></el-input>
					</el-form-item>
					<el-form-item  prop="selectDate">
						<el-date-picker
							v-model="formTopQuery.selectDate"
							type="datetimerange"
							value-format="yyyy-MM-dd HH:mm:ss"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
					
					<el-form-item>
						<el-button type="primary" @click="queryDataClick('formTopQuery')">查询</el-button>
					</el-form-item>
					<el-form-item class="buttonItem">
                        <el-button type="primary" icon='document' @click="exportLogo()"><i class="el-icon-download"></i>导出excel</el-button>
                    </el-form-item>

				</el-form>
			</div>
			<!-- <el-checkbox-group v-model="checkList"> -->
			<!-- <div  v-for="(item,indexs) in tableData" :key="indexs">
				{{item}}
			</div> -->
			<div style="padding:20px;background:#F2F2F2;margin-top:10px;    position: relative;" v-for="(item,indexs) in tableData" :key="indexs">

				 <!-- {{item}} -->
				 <el-checkbox v-model="item.elCheckBox" size="medium" style="position: absolute;top: 40%;"></el-checkbox>
				<div style="height: 35px;    margin-left: 30px;"> 
					任务名称：{{item.taskName}}&nbsp; &nbsp; 执行方式：{{item.fromExec}}&nbsp; &nbsp; 执行人：{{item.executive}}&nbsp;&nbsp; 对象：{{item.hostObjectCount}}&nbsp; &nbsp; {{item.execDate}}
					<el-tag class="el-tag-yw" v-if="item.state == '异常'" type="danger">{{item.state}}</el-tag>
					<el-tag class="el-tag-yw" v-else type="success">{{item.state}}</el-tag>
				</div>
				
				<div style=" margin-left: 30px;">
					本次任务共巡检主机{{item.hostObjectCount}}个，耗时{{item.timeConsuming}}秒，发生异常的主机共{{item.hostExceptionCount}}个，共巡检指标{{item.itemCount}}项，发生异常指标{{item.itemExceptionCount}}项
					<!-- <el-tag class="el-tag-yw" type="info">未通知</el-tag> -->
				</div>
			</div>
			<!-- </el-checkbox-group> -->
			<div class="block" align="right">
				<el-pagination v-if="totalCount>0" :current-page="currentPage" :page-sizes="[5, 10, 20, 50, 100, 200, 500]" :page-size="pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper" 
					@size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</div>
			<!-- <div class="block" align="right">
				<el-pagination :page-size="pageSize" :total="totalSize" layout="prev, pager, next, jumper">
				</el-pagination>
			</div> -->
		</el-card>

		<!-- dialog -->
		<!-- 新增命令弹窗 -->
		<el-dialog :title="dialog.title" :visible.sync="addUserDialog">
			<el-form :model="form" style="margin:10px;width:auto;">
				<el-form-item label="命令名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off" placeholder="请输入操作名称"></el-input>
				</el-form-item>
				<el-form-item label="平台类别" :label-width="formLabelWidth">
					<el-select v-model="form.region" clearable placeholder="请选择">
						<!--<el-option label="IaaS层基础平台模板" value="IaaS"></el-option>-->
						<el-option v-for='(item,index) in platName' :key="index" :label="item.platformName" :value="item.platformId"></el-option>
						<!--<el-option label="Paas层软件集群模板" value="Paas"></el-option>
						<el-option label="Saas层应用模块" value="Saas"></el-option>-->
					</el-select>
				</el-form-item>
				<el-form-item label="操作对象" :label-width="formLabelWidth">
					<el-select v-model="form.region" clearable placeholder="请选择">
						<el-option v-for='(item,index) in operationName' :key="index" :label="item.resourceTypeName"  :value="item.resourceTypeId"></el-option>
						<!--<el-option label="主机" value="zj"></el-option>-->
						<!--<el-option label="数据库" value="sjk"></el-option>
						<el-option label="网络" value="wl"></el-option>
						<el-option label="中间件" value="zjj"></el-option>-->
					</el-select>
				</el-form-item>
				<el-form-item label="选择脚本" :label-width="formLabelWidth">

					<!--<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传.sh文件</div>
					</el-upload>-->

				</el-form-item>

				<el-form-item label="输入内容" :label-width="formLabelWidth">
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea3">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addUserDialog = false">取 消</el-button>
				<el-button type="primary" @click="addUserDialog = false">保 存</el-button>
			</div>
		</el-dialog>

	</div>
</template>


<script>
	import * as service from '@/modules/ops/api/ops/autoInspection/insReportInform.js'
	import * as rule from '@/modules/ops/api/rules.js'
	export default {
		data() {
			return {
				// ---------------------------
				pageSize: 10, // 每页多少条
				totalSize: 1000, // 总条数	
				currentPage: 1, // 当前页
				totalCount: 500, // 总条数
				platName: [],
				checkList:[],
				tableData:[

				],
				// 首页搜索的表单数据
				formTopQuery: {
					name:'',
					selectDate:'',
					inspectionResultDefault:'',
					executeWayDefault:'',
				},
				// 首页搜索的验证规则
				formTopQueryRules: {
					name:[ 
						{ validator: rule.validateQueryName, trigger: 'blur' },
					],
				},
				inspectionResult: [{value:'0',label:'正常'},{value:'1',label:'异常'}],
				executeWay: [{value:'0',label:'自动'},{value:'1',label:'手动'}],
				
				// ---------------------------
				
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

				
				operationName: [],
				addUserDialog: false,


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
			
		},
		methods: {
			// ------------------------------------------
			//分页条数设置
			handleSizeChange(val) { // 设置每页多少条
				this.pageSize = val
				this.queryData()
			},
			//当前页
			handleCurrentChange(val) { // 当前页
				this.currentPage = val
				this.queryData()
			},
			//导出文件
			exportLogo() {
				const multipleSelection = []
				for(var i = 0;i<this.tableData.length;i++){
					if(this.tableData[i].elCheckBox){
						multipleSelection.push(this.tableData[i])
					}
				}			
				if(multipleSelection.length == 0){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
					import('@/modules/mms/vendor/Export2Excel').then(excel => {
						const tHeader = [
							'任务名称',
							'执行方式',
							'执行人',
							'对象',
							'日期',
							'内容',
							'是否异常',
							// '是否通知',
						]
						const filterVal = [
							'taskName',
							'fromExec',
							'executive',
							'hostObjectCount',
							'execDate',
							'content',
							'state',
							// 'inform',
						]
						const list = this.tableData
						for(var i = 0 ; i < list.length;i++) {
							list[i].content = "本次任务共巡检主机"+list[i].hostObjectCount+"个，耗时"+list[i].timeConsuming+"秒，发生异常的主机共"+list[i].hostExceptionCount+"个，共巡检指标"+list[i].itemCount+"项，发生异常指标"+list[i].itemExceptionCount+"项"
							// list[i].inform = '未通知'
						}
						const data = this.formatJsonAll(filterVal, list)
						excel.export_json_to_excel({
							header: tHeader,
							data,
							filename: '巡检报告和巡检通知',
							autoWidth: true
						});
					})
					
					
				}else {
					import('@/modules/mms/vendor/Export2Excel').then(excel => {
						const tHeader = [
							'任务名称',
							'执行方式',
							'执行人',
							'对象',
							'日期',
							'内容',
							'是否异常',
							// '是否通知',
						]
						const filterVal = [
							'taskName',
							'fromExec',
							'executive',
							'hostObjectCount',
							'execDate',
							'content',
							'state',
							// 'inform',
						]
						const list = multipleSelection
						for(var i = 0 ; i < list.length;i++) {
							list[i].content = "本次任务共巡检主机"+list[i].hostObjectCount+"个，耗时"+list[i].timeConsuming+"秒，发生异常的主机共"+list[i].hostExceptionCount+"个，共巡检指标"+list[i].itemCount+"项，发生异常指标"+list[i].itemExceptionCount+"项"
							// list[i].inform = '未通知'
						}
						const data = this.formatJson(filterVal, list)
						excel.export_json_to_excel({
							header: tHeader,
							data,
							filename: '巡检报告和巡检通知'
						})
						// this.$refs.currentAlertTable.clearSelection()
					})
				}
				
				
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]))
			},
			formatJsonAll(filterVal, jsonData) {
				return jsonData.map(v =>
					filterVal.map(j => {
						if (j === 'timestamp') {
							// return parseTime(v[j]);
						} else {
							return v[j]
						}
					})
				)
			},
			// ---------------------------------
			// 首頁表單查询
			queryDataClick(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.queryData()
						
					} else {
						return false;
					}
				});
			},
			//表单查询
			queryData() {
				const params = {
					name:this.formTopQuery.name,
					start: (this.currentPage - 1) * this.pageSize,
					limit: this.pageSize
				}
				service.queryData(params).then(res => {
					if(res.code == 200) {
						this.tableData = res.result.list
						this.totalCount = res.result.count;
						this.tableLoading = false;
					}else {
						this.$message({
							type: 'error',
							message: res.msg
						})
					}
					
					
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
	.el-tag-yw{
		float: right;
	}
	// .el-card__header {
	// 	padding:18px 20px 0 20px;
	// }
	// .el-card__body {
	// 	padding:0 20px 20px 20px;
	// }
	// .el-card{
	// 	background:#f2f2f2;
	// }
</style>
<style lang="scss">
	// .el-card__header {
	// 	padding:18px 20px 0 20px;
	// }
	// .el-card__body {
	// 	padding:0 20px 20px 20px;
	// }
	// .el-card{
	// 	background:#f2f2f2;
	// }
</style>





