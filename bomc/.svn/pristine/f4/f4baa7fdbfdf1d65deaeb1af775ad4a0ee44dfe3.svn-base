<template>
	<div class='container'>
		<div class="" style="width: 100%;height: auto;border: 1px solid transparent;">

			<div class="conRight" style="width:100%;height: auto;">
				<div class="RightRow1" style="">
					<el-row>
						<el-col>
							<el-card>
								
										<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
											<el-form-item label="数据名字" prop="dataName">
												<el-input v-model="formInline.dataName" style="width: 210px;"></el-input>
											</el-form-item>

											<el-form-item label="数据键值" prop="dataKey">
												<el-input v-model="formInline.dataKey"></el-input>
											</el-form-item>
										
											<el-button class="search_btn" @click="roleSearch2(formInline)" style="margin-left:10px;">查询</el-button>
		<el-button class="opt_btn"  @click="resetChongZhi('formInline')">重置</el-button>								
						
		<i class="iconfont step_btn" v-bind:class="[isShowing ? blurClass : '',bkClass]" @click="arrowTest()">&#xe619;</i>
		<i class="iconfont step_btn" @click="arrowTest1()">&#xe615;</i>
		
		<el-button type="primary" icon='document' @click="exportLogo()"><i class="el-icon-download"></i>导出excel</el-button>
									
			
					<!--<el-upload class="upload-demo" accept="sh" action='/pps/api/v1/excel/export' :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"  multiple :limit="1" :on-exceed="handleExceed" :on-error="onError" :on-success="onSuccess" :file-list="addForm.fileList" :beforeUpload="beforeAvatarUpload">
						<el-button size="small" type="primary" title="请上传ssh脚本文件">点击上传</el-button>
					</el-upload>	-->

				<div ref="schItemShow2" class="schItemShow">
											<el-form-item label="数据状态" prop="status">
												<el-select value="所有" v-model="formInline.status" placeholder="所有" style="height: 36px;width: 210px;">
													<el-option label="所有" value=""></el-option>
													<el-option label="正常" value="0"></el-option>
													<el-option label="禁用" value="1"></el-option>
												</el-select>
											</el-form-item>
										
											<el-form-item label="创建时间">
												<el-col :span="11">
													<el-form-item prop="params.beginTime">
														<el-date-picker type="date" placeholder="起始日期" v-model="formInline.params.beginTime" value-format="yyyy-MM-dd" style="width: 100%;" :picker-options="startDatePicker" @change="dateChangeBeginTime"></el-date-picker>
													</el-form-item>
												</el-col>
												<el-col class="line" :span="2">-</el-col>

												<el-col :span="11">
													<el-form-item prop="params.endTime">
														<el-date-picker type="date" placeholder="结束日期" v-model="formInline.params.endTime" value-format="yyyy-MM-dd" style="width: 100%;" :picker-options="endDatePicker" @change="dateChangeEndTime"></el-date-picker>
													</el-form-item>
												</el-col>
											</el-form-item>
											</div>
										</el-form>
								

							</el-card>
						</el-col>
					</el-row>
				</div>

				<div class="RightRow1" style="">
					<el-row>
						<el-col>
							<el-card>
								<div class="buttonItem">
									
									<el-button class="search_btn"  @click="handleAdd('formAdd')" >新增 </el-button>								
								<el-button class="opt_btn" @click="handleDeleteAll(2)">删除</el-button>
								<el-button class="opt_btn" @click="handleDeleteAll(1)">禁用</el-button>
								<!--<el-button class="opt_btn" @click="beback2()">恢复</el-button>-->
								</div>
								<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :default-sort="{order: 'ascending'}" @selection-change="handleSelectionChange" @select-all="selectAllRus">
									<el-table-column type="selection" width="55">
									</el-table-column>
									<el-table-column prop="dataId" label='数据Id' width="80">
									</el-table-column>
						
									<el-table-column prop="dataName" label='数据名字' width="100">
									</el-table-column>
									<el-table-column prop="createTime" resizable sortable label='创建时间' width="170">
									</el-table-column>
									<el-table-column prop="remark" label='描述' min-width="180">
									</el-table-column>
								
										 <el-table-column prop="status" label='状态' width="60">
			 <template slot-scope="scope">
              <div  v-if='scope.row.status==1' >
              	<img :src="stopImg" alt="正常">
                
              </div>
              <div v-if='scope.row.status==0'>
                 <img :src="runImg" alt="禁用">
              </div>
            </template>
		</el-table-column>

		
					<el-table-column label='操作管理' fixed="right" width="80">
				<template value="aa" slot-scope="scope">
		<i class="iconfont co" title="禁用"  @click="handleDelete(scope.row.dataId,1)">&#xe65a;</i> 
		<i class="iconfont co" title="恢复" @click="beback(scope.row.dataId)">&#xe65c;</i>
								</template>
		</el-table-column>
								
						<el-table-column label='信息编辑' fixed="right" width="190">
									<template value="aa" slot-scope="scope">							
	    <el-button class="form_btn" size="mini"   @click="handleEdit(scope.row)">编辑</el-button>			
	    <el-button class="form_btn" size="mini"   @click="handleDelete(scope.row.dataId,2)">删除</el-button>
									
									</template>
				</el-table-column>	
								</el-table>

								<!--	<tree-grid :columns="columns" :tree-structure="true" :data-source="tableData"></tree-grid>-->
								<div class="block" align="right">
									<el-pagination :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="pagesize" :total="tableData.length" align="right" layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
								</div>
							</el-card>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>

		<!--新增 -->
		<el-dialog title="新增数据" :visible.sync="addUserDialog" :before-close="handleClose">
			<!--<el-form :model="formAdd">-->
			<el-form :model="formAdd" :rules="rules" ref="formAdd" style="margin:10px;width:auto;">

				<el-form-item label="数据名字:" :label-width="formLabelWidth" prop="dataName" required>
					<el-input v-model.trim="formAdd.dataName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="数据方法:" :label-width="formLabelWidth" prop="method" required>
					<el-input v-model.trim="formAdd.method" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述:" :label-width="formLabelWidth" prop="remark" required>
					<el-input v-model.trim="formAdd.remark" autocomplete="off" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addCommit('formAdd',formAdd)">提交</el-button>

				<el-button @click="addUserDialog = false">关闭</el-button>
			</div>
		</el-dialog>

		<!--03-编辑-->
		<el-dialog title="编辑数据" :visible.sync="resetDialog22" :before-close="handleClose">
			<!--<el-form :model="formEd" style="margin:10px;width:auto;">-->
			<el-form :model="formEd" :rules="rules" ref="formEd" style="margin:10px;width:auto;">

				<!--<el-form-item label="数据键值:" :label-width="formLabelWidth">
					<el-input v-model="formEd.dataKey" auto-complete="off"></el-input>
				</el-form-item>-->
				<el-form-item label="数据名字:" :label-width="formLabelWidth" prop="dataName" required>
					<el-input v-model.trim="formEd.dataName" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">

				<el-button type="primary" @click="editCommit('formEd',formEd)">提交</el-button>
				<el-button @click="resetDialog22 = false">关闭</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
		import runImg from '@/assets/images/run.png'
    import stopImg from '@/assets/images/stop.png'
	import { TreeGrid } from '@/components/treeTable'
	import { roleSch, rightDele, recover, adCmit, editCmit } from "../../../api/dataManage";
	export default {
		data() {
			return {
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
					scriptAddress:""//脚本成功返回路径
				},
				tableDataDload:[],
				tableDataDload2:[],
				
				isShowing:false,
				bkClass:'bk',
				blurClass:'blur',
				runImg: runImg,
                stopImg: stopImg,
				eventInGroupList: [],
				
				startDatePicker: this.beginDate(),
				endDatePicker: this.processDate(),

				pagesize: 4,
				currentPage: 1,
				rules: {
					//					dataKey: [
					//						{ required: true, message: '请输入数据键值', trigger: 'blur' },
					//						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					//					],
					dataName: [
						{ required: true, message: '请输入数据名字 ', trigger: 'blur' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					method: [
						{ required: true, message: '请输入数据方法', trigger: 'blur' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					remark: [
						{ required: true, message: '请输入描述', trigger: 'blur' },
						{ min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
					],

				},
				resetDialog22: false,
				formInline: {
					dataKey: "",
					dataName: "",
					params: {
						beginTime: "",
						endTime: ""
					}
				},

				formEd: {
					dataId: "",
					dataName: "",
					dataKey: "",

				},

				multipleSelection: [],
				arrRo: [],
				columns: [],
				tableData: [],

				addUserDialog: false,
				formAdd: {
					remark: "",
					dataKey: "",
					dataName: "",
					method: "",
					url: ""
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
			}
		},

		created() {

			this.roleSearch(this.formInline);
		},
		watch: {
		
		},

		methods: {
							//文件上传
			handleRemove(file, fileList) {
					console.log(file, fileList);
				},
				handlePreview(file) {
					console.log(file);
				},
				handleExceed(files, fileList) {
					this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
				},
				onSuccess(response, files, fileList) {
					var myData = response;
					if(myData.code!= 200) {
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
				var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
				const extension = testmsg === 'txt'
				const extension2 = testmsg === 'excel'
				const extension3 = testmsg === 'py'
				const extension4 = testmsg === 'sql'
				const isLt2M = file.size / 1024 / 1024 < 1
				if(!extension && !extension2 && !extension3 && !extension4) {
					this.$message({
						message: '只能上传txt.excel.sql.pl格式的文件!',
						type: 'warning'
					});
				}
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 1MB!',
						type: 'warning'
					});
				}
				return extension || extension2 || extension3 || extension4 && isLt2M
			},

			
			//导出文件  来自 ops--doLogManage   handleSelectionChange
			exportLogo() {
				if(this.multipleSelection == undefined || this.multipleSelection.length == 0) {
					import('@/modules/mms/vendor/Export2Excel').then(excel => {
						const tHeader = [
							'数据Id', '数据名字', '创建时间', '描述', 
						]
						const filterVal = [       
							'dataId', 'dataName', 'createTime', 'remark', 
						]					
						const list = this.tableData								
						const data = this.formatJsonAll(filterVal, list)
						excel.export_json_to_excel({
							header: tHeader,
							data,
							filename: '数据管理导出',
							autoWidth: true
						});
					})
				} else {
					import('@/modules/mms/vendor/Export2Excel').then(excel => {
						const tHeader = [
							'数据Id', '数据名字', '创建时间', '描述', 
						]
						const filterVal = [
							'dataId', 'dataName', 'createTime', 'remark', 
						]
                    //将部门对象中的 部门名称提取出来显示,否则部门是个对象无法显示
							for(var i=0;i<this.multipleSelection.length;i++){
							this.tableDataDload2[i]=this.multipleSelection[i]
						
						}
						const list = this.tableDataDload2							
						const data = this.formatJson(filterVal, list)
						excel.export_json_to_excel({
							header: tHeader,
							data,
							filename: '选中的数据管理导出'
						})
					})

				}
			},




			formatJson(filterVal, jsonData) {
				
				debugger;
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



			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			beginDate() { //提出开始时间必须小于今天
				let self = this
				return {
					disabledDate(time) {
						return time.getTime() > Date.now() //开始时间不选时，结束时间最大值小于等于当天
					}
				}
			},
			processDate() { //提出结束时间必须大于提出开始时间
				let self = this
				return {
					disabledDate(time) {
						if(self.formInline.params.beginTime) {
							return new Date(self.formInline.params.beginTime).getTime() > time.getTime()
						} else {
							return time.getTime() > Date.now()
							//开始时间不选时，结束时间最大值小于等于当天
						}
					}
				}
			},

			dateChangeBeginTime(val) {
				console.log(val);
				let self = this;
				this.formInline.params.beginTime = val;
			},
			dateChangeEndTime(val) {
				console.log(val);
				let self = this;
				self.formInline.params.endTime = val;
			}, // 分页
			handleSizeChange(val) {
				this.pagesize = val
				console.log(`每页 ${val} 条`)
			},
			handleCurrentChange(val) {
				this.currentPage = val
			},
			//编辑
			handleEdit(row) {

				this.resetDialog22 = true;
				this.formEd.dataId = row.dataId;
				this.formEd.dataName = row.dataName;
				this.formEd.dataKey = row.dataKey;
			},
			//编辑弹窗的提交按钮
			//			editCommit(formEd) {
			//				this.resetDialog22 = false;
			//				//获取角色信息
			//				editCmit(formEd).then((response) => {
			//					this.roleSearch(this.formInline);
			//				})
			//
			//			},
			editCommit(formEd01, formEd) {
				this.$refs[formEd01].validate((valid) => {
					if(valid) {
						this.resetDialog22 = false;
						editCmit(formEd).then((response) => {
							this.roleSearch(this.formInline);
								this.$message({
						type: 'success',
						message: '编辑成功！'
					})
						})
					} else {
						alert('提交失败!');
						return false;
					}
				});
			},
			//01查询按钮------------------------
			roleSearch(formInline) {
				if(formInline.params.beginTime == null) {
					this.formInline.params.beginTime = "";
				}
				if(formInline.params.endTime == null) {
					this.formInline.params.endTime = "";
				}
				//防止用户点击第五页的时候，查询第一页的数据，初始化当前页为第一页
				//				this.currentPage = 1;
				roleSch(formInline).then((response) => {
					this.tableData = response;
				})
			},
					//点击箭头图标，展示所有输入框，箭头旋转180deg
			arrowTest(){	
				this.isShowing =!this.isShowing;
				
				if(this.$refs.schItemShow2.style.display=='block'){					
					this.$refs.schItemShow2.style.display='none';
				}else{
					this.$refs.schItemShow2.style.display='block';
				}
			},
			//02查询按钮-----单独的查询按钮的当前页 必须是第一页，而编辑，禁用是要回到当前页，为了区分查询用方法2
				roleSearch2(formInline) {
				if(formInline.params.beginTime == null) {
					this.formInline.params.beginTime = "";
				}
				if(formInline.params.endTime == null) {
					this.formInline.params.endTime = "";
				}
				//防止用户点击第五页的时候，查询第一页的数据，初始化当前页为第一页
								this.currentPage = 1;
				roleSch(formInline).then((response) => {
					this.tableData = response;
				})
			},
			//全部删除按钮的准备工作
			//			handleSelectionChange(val) {
			//				this.multipleSelection = val;
			//
			//			},
			//表格的单选按钮点击后 收集被点中的id
			handleSelectionChange(val) {
				this.multipleSelection = val;
				var arrTest = [];
				for(var i in val) {
					arrTest.push(val[i].dataId);
				}
				this.arrRo = [];
				this.arrRo = arrTest;
			},
			//表格全选按钮 点击后 收集被选中的id
			selectAllRus(val) {
				var arrTest = [];
				for(var i in val) {
					arrTest.push(val[i].dataId);
				}
				this.arrRo = [];
				this.arrRo = arrTest;
			},
			//删除全部按钮	
			handleDeleteAll(statu) {
				if(statu == 1) {
					var ddText = "禁用"
				}
				if(statu == 2) {
					var ddText = "删除"
				}
				//1.获取到的选中集合，去重			
				var temp = [];
				for(var i = 0; i < this.arrRo.length; i++) {
					if(temp.indexOf(this.arrRo[i]) == -1) {
						temp.push(this.arrRo[i]);
					}
				}

				if(temp.length == 0) {
					//					this.$confirm('请选择要删除的数据?', '提示', {
					this.$confirm('请选择要-' + ddText + '-的数据?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'error'
					})

				} else {
					this.handleDelete(temp, statu);
				}
			},
			//恢复按钮
			beback(uid) {
				recover(uid).then((response) => {
					this.roleSearch(this.formInline);
					this.$message({
						type: 'success',
						message: '恢复成功！'
					})
				})
			},		//批量恢复按钮
			beback2(uid) {				
					//1.获取到的选中集合，去重			
				var temp = [];
				for(var i = 0; i < this.arrRo.length; i++) {
					if(temp.indexOf(this.arrRo[i]) == -1) {
						temp.push(this.arrRo[i]);
					}
				}
				if(temp.length == 0) {
					this.$confirm('请选择要-恢复-的数据?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'error'
					})

				} else {
						recover(temp).then((response) => {
					this.roleSearch(this.formInline);

					this.$message({
						type: 'success',
						message: '恢复成功！'
					})
				})
				}},
			//禁用单个按钮	
			handleDelete(delNum0, statu) {
				var delNum = delNum0;
				if(statu == 1) {
					var ddText = "禁用"
				}
				if(statu == 2) {
					var ddText = "删除"
				}

				this.$confirm('此操作将-' + ddText + '-该记录, 是否继续?', '提示', {
					//				this.$confirm('此操作将禁用该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					rightDele(delNum, statu).then((response) => {
						this.$message({
							message: '提示：' + response,
							type: 'warning'
						})
						//                 如果删除成功就 再执行一次查询	
						this.roleSearch(this.formInline);
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消' + ddText
					})
				})
			},
			//新增
			handleAdd(formAdd) {
				this.addUserDialog = true;
				this.$refs[formAdd].resetFields();
			},
			//新增弹窗的提交按钮
			addCommit(formAdd01, formAdd) {
				//            if(formAdd.areaName=""){
				//					alert("不能为空");
				////					return false
				//				}
				this.$refs[formAdd01].validate((valid) => {
					//					      	 alert('03--'+valid);
					if(valid) {
						this.addUserDialog = false;
						adCmit(formAdd).then((response) => {
							//    如果添加成功就 再执行一次查询	
							this.roleSearch(this.formInline);
							if(response.length == 0) {
								//这里是清空新增的输入框，无论后端是否返回response都执行一次清空，这里加判断是防止清空操作 先执行
								this.$refs[formAdd01].resetFields();
							} else {
								this.$refs[formAdd01].resetFields();
							}
							this.$message({
								type: 'success',
								message: '新增成功啦！'
							});
						})
					} else {
						alert('提交失败!');
						return false;
					}
				});
			},
			resetChongZhi(formName) {
				this.$refs[formName].resetFields();
			},
		},

		components: {
			TreeGrid
		}
	};
</script>

<style scoped lang="scss">
.co{color: #42B983;margin-left: 6px;cursor: pointer;}
.bk{transition :all 0.1s ease-out;display: inline-block;width: 40px;}
.blur{transform:rotate(180deg);display: inline-block;width: 40px;}
.schItemShow{display: none;padding-bottom: -53px;height: 34px;}

.step_btn { background: rgba(66, 185, 131, 0.4); border: 1px solid #42B983; color: rgba(66, 185, 131, 1); cursor:pointer; margin-left:8px; border-radius: 3px; padding: 8px 11px; &:hover { background: rgba(66, 185, 131, 0.2); } } 
.search_btn { background: #42B983; border: 1px solid #42B983; color: #FFFFFF; font-size:14px; &:hover { background: rgba(66, 185, 131, 0.8); } }
.form_btn { background: transparent;color: #42B983;width: 45px; font-size:14px; border: none; height: 34px; padding-left: 9px; padding-top: 7px; &:hover { background: #42B983; border-color: #42B983; color: #fff; } }
.opt_btn { background: #F4F8F9; color: rgba(0, 0, 0, 0.70); margin-left: 8px; font-size:14px; border: none; height: 34px; &:hover { background: #42B983; border-color: #42B983; color: #fff; } }
	.container {
		padding: 10px 20px;
		.buttonItem {
			margin-bottom: 10px;
		}
		.block {
			margin-top: 20px;
		}
		.RightRow1 {
			width: calc(100% - 40px);
			height: auto;
			margin: 20px;
			border-radius: 5px;
		}
	}
</style>