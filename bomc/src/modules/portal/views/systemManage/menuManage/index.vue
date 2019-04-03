<template>
	<div class='container'>
		<div class="" style="width: 100%;height: auto;border: 1px solid transparent;">

			<div class="conRight" style="width:100%;height: auto;">
				<div class="RightRow1">
					<el-row>
						<el-col>
							<el-card>
								
								
										<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
											<el-form-item label="菜单名称" prop="menuName">
												<el-input v-model="formInline.menuName" style="width: 210px;"></el-input>
											</el-form-item>

											<el-form-item label="权限域名" prop="group.groupName">
												<el-input v-model="formInline.group.groupName" style="width: 210px;"></el-input>
											</el-form-item>
			
				
					
										
			<el-button class="search_btn" @click="roleSearch2(formInline)" style="margin-left:10px;">查询</el-button>
			<el-button class="opt_btn"  @click="resetChongZhi('formInline')">重置</el-button>	
												
			<i class="iconfont step_btn" v-bind:class="[isShowing ? blurClass : '',bkClass]" @click="arrowTest()">&#xe619;</i>
			<i class="iconfont step_btn" @click="arrowTest1()">&#xe615;</i>
			
			
			<el-button type="primary" icon='document' @click="exportLogo()"><i class="el-icon-download"></i>导出excel</el-button>
									
			
					<!--<el-upload class="upload-demo" accept="sh" action='/pps/api/v1/excel/export' :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"  multiple :limit="1" :on-exceed="handleExceed" :on-error="onError" :on-success="onSuccess" :file-list="addForm.fileList" :beforeUpload="beforeAvatarUpload">
						<el-button size="small" type="primary" title="请上传ssh脚本文件">点击上传</el-button>
					</el-upload>	-->
											
        <div ref="schItemShow2" class="schItemShow" style="height: 100px;">
        	
											<el-form-item label="请求方法" prop="method">
												<el-input v-model="formInline.method" style="width: 210px;"></el-input>
											</el-form-item>

											<el-form-item label="菜单状态" prop="status">
												<el-select value="所有" v-model="formInline.status" placeholder="所有" style="height: 36px;width: 210px;">
													<el-option label="所有" value=""></el-option>
													<el-option label="正常" value="0"></el-option>
													<el-option label="禁用" value="1"></el-option>
												</el-select>
											</el-form-item>
											<el-form-item label=" url " prop="url">
												<el-input v-model="formInline.url" style="width: 210px;"></el-input>
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
								<!--{{tableData[2]}}-->
								<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :default-sort="{order: 'ascending'}" @selection-change="handleSelectionChange" @select-all="selectAllRus">

									<el-table-column type="selection" width="55">
									</el-table-column>
									<el-table-column prop="menuId" label='菜单Id' width="80">
									</el-table-column>

									<el-table-column prop="menuName" label='菜单名称' min-width="130">
									</el-table-column>

									<el-table-column prop="param" label='菜单标识' min-width="130">
									</el-table-column>

									<el-table-column prop="group.groupName" label='权限域名' width="80">
									</el-table-column>
									<el-table-column prop="method" label='方法' width="100">
									</el-table-column>
									<el-table-column prop="url" label='url' min-width="130">
									</el-table-column>
									<el-table-column prop="createTime" resizable sortable label='创建时间' width="170">
									</el-table-column>
									<el-table-column prop="remark" label='描述' min-width="130">
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
		<i class="iconfont co" title="禁用"  @click="handleDelete(scope.row.menuId,1)">&#xe65a;</i> 
		<i class="iconfont co" title="恢复" @click="beback(scope.row.menuId)">&#xe65c;</i>
								</template>
		</el-table-column>
								
						<el-table-column label='信息编辑' fixed="right" width="190">
									<template value="aa" slot-scope="scope">							
	    <el-button class="form_btn" size="mini"   @click="handleEdit(scope.row)">编辑</el-button>			
	    <el-button class="form_btn" size="mini"   @click="handleDelete(scope.row.menuId,2)">删除</el-button>
									
									</template>
				</el-table-column>	
								</el-table>



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
		<el-dialog title="新增菜单" :visible.sync="addUserDialog" :before-close="handleClose">
			<el-form :model="formAdd" :rules="rules" ref="formAdd" style="margin:10px;width:auto;">
				<el-form-item label="菜单名称" :label-width="formLabelWidth" prop="menuName" required>
					<el-input v-model.trim="formAdd.menuName" auto-complete="off" v-on:blur="blurCheck()"></el-input>
				</el-form-item>

				<el-form-item label="权限域名" :label-width="formLabelWidth">

					<el-select v-model.trim="formAdd.groupId" placeholder="请选择权限域名" size="small" style="width: 100%;height: 36px;">
						<el-option v-for="items in depts" :key="items.groupId " :label="items.groupName" :value="items.groupId">{{items.groupName}}
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="菜单标识" :label-width="formLabelWidth" prop="param" required>
					<el-input v-model.trim="formAdd.param" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="请求方法" :label-width="formLabelWidth" prop="method" required>
					<el-input v-model.trim="formAdd.method" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="URL" :label-width="formLabelWidth" prop="url" required>
					<el-input v-model.trim="formAdd.url" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="描述" :label-width="formLabelWidth" prop="remark" required>
					<el-input v-model.trim="formAdd.remark" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">

				<el-button type="primary" @click="addCommit('formAdd',formAdd)">提交</el-button>

				<el-button @click="addUserDialog = false">关闭</el-button>
			</div>
		</el-dialog>

		<!--03-编辑-->
		<el-dialog title="编辑菜单" :visible.sync="resetDialog22" :before-close="handleClose">
			<el-form :model="formEd" :rules="rules" ref="formEd" style="margin:10px;width:auto;">

				<el-form-item label="菜单名称" :label-width="formLabelWidth" prop="menuName" required>
					<el-input v-model.trim="formEd.menuName" auto-complete="off"></el-input>
				</el-form-item>
				<!--<el-form-item label="权限域名-del" :label-width="formLabelWidth" prop="group" required>
					<el-input v-model.trim="formEd.group.groupName" auto-complete="off"></el-input>
				</el-form-item>-->
				<el-form-item label="权限域名" :label-width="formLabelWidth" prop="group" required>
					<el-select v-model.trim="formEd.groupId" placeholder="请选择权限域名" size="small" style="width: 100%;height: 36px;">
						<el-option v-for="items in depts" :key="items.groupId " :label="items.groupName" :value="items.groupId">{{items.groupName}}
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="菜单方法" :label-width="formLabelWidth" prop="method" required>
					<el-input v-model.trim="formEd.method" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="菜单标识" :label-width="formLabelWidth" prop="param" required>
					<el-input v-model.trim="formEd.param" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="url" :label-width="formLabelWidth" prop="url" required>
					<el-input v-model.trim="formEd.url" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述" :label-width="formLabelWidth" prop="remark" required>
					<el-input v-model.trim="formEd.remark" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="editCommit('formEd',formEd)">提交</el-button>
				<el-button @click="editClose()">关闭</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
		import runImg from '@/assets/images/run.png'
    import stopImg from '@/assets/images/stop.png'
	import { TreeGrid } from '@/components/treeTable'
	import { roleSch, rightDele, groupLst, checkUname, getRusLst, needDept, recover, adCmit, editCmit } from "../../../api/menuManage";
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
				
				columns: [
					{ text: 'groupName', dataIndex: 'groupName' },
					{ text: '权限名', dataIndex: 'remark' },
					{ text: 'groupDirect', dataIndex: 'groupDirect' },
				],
				startDatePicker: this.beginDate(),
				endDatePicker: this.processDate(),
				pagesize: 4,
				currentPage: 1,
				rules: {

					menuName: [
						{ required: true, message: '请输入菜单名称', trigger: 'blur' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					group: [
						{ required: true, message: '请选择权限域名', trigger: 'blur' },
					],
					url: [
						{ required: true, message: '请输入URL', trigger: 'blur' },
						{ min: 3, max: 55, message: '长度在 3 到 55 个字符', trigger: 'blur' }
					],
					method: [
						{ required: true, message: '请输入请求方法', trigger: 'blur' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					param: [
						{ required: true, message: '请输入菜单标识', trigger: 'blur' },
						{ min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
					],
					remark: [
						{ required: true, message: '请输入描述', trigger: 'blur' },
						{ min: 3, max: 55, message: '长度在 3 到 55 个字符', trigger: 'blur' }
					],

				},
				resetDialog22: false,
				formInline: {
					menuKey: "",
					menuName: "",
					method: "",
					url: "",
					group: {
						groupName: ""
					},
					params: {
						beginTime: "",
						endTime: ""
					}
				},
				depts: [],
				formEd: {
					//						menuId:"",
					//					menuName:"",
					//					 parentId: "",
					//					menuKey: "",
					//					method: "",
					//					url: ""
					group: {
						groupName: "",
					}
				},

				multipleSelection: [],
				arrRo: [],
				//				columns: [],
				tableData: [],
				tableData2: [],
				tableData3: [],
				addUserDialog: false,
				formAdd: {
					parentId: "",
					groupId: "",
					menuName: "",
					param: "",
					method: "",
					url: "",
					remark: "",
					menuKey: "",
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
			//			获得所有权限域列表,用再treeTable上的第一步
			groupLst().then((response) => {
				this.tableData2 = response;
			});

			var aa = 3;
			getRusLst(aa).then((response) => {
				this.tableData3 = response;
			});

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
						              
						'菜单Id', '菜单名称', '菜单标识', '权限域名', '方法', 'url', '创建时间', '描述', 
						]
						const filterVal = [       
					'menuId', 'menuName','param', 'groupShow','method', 'url','createTime', 'remark', 
						]	
						
						 
						    //	将部门对象中的 部门名称提取出来显示,否则部门是个对象无法显示
						for(var i=0;i<this.tableData.length;i++){
							this.tableDataDload[i]=this.tableData[i]
							if(this.tableData[i].group.groupName){
								this.tableDataDload[i].groupShow=this.tableData[i].group.groupName;								
							}							
						}						
						const list = this.tableDataDload
						
												
						const data = this.formatJsonAll(filterVal, list)
						excel.export_json_to_excel({
							header: tHeader,
							data,
							filename: '菜单管理导出',
							autoWidth: true
						});
					})
				} else {
					import('@/modules/mms/vendor/Export2Excel').then(excel => {
						const tHeader = [
						'菜单Id', '菜单名称', '菜单标识', '权限域名', '方法', 'url', '创建时间', '描述', 
						]
						const filterVal = [
					'menuId', 'menuName','param', 'groupName','method', 'url','createTime', 'remark', 
						]
                
						    //将部门对象中的 部门名称提取出来显示,否则部门是个对象无法显示
							for(var i=0;i<this.multipleSelection.length;i++){
							this.tableDataDload2[i]=this.multipleSelection[i]
							if(this.tableDataDload2[i].group.groupName){
								this.tableDataDload2[i].groupShow=this.multipleSelection[i].group.groupName;								
							}							
						}
						const list = this.tableDataDload2	
						
						
						
						const data = this.formatJson(filterVal, list)
						excel.export_json_to_excel({
							header: tHeader,
							data,
							filename: '选中的菜单管理导出'
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
			},
			// 分页
			handleSizeChange(val) {
				this.pagesize = val
				console.log(`每页 ${val} 条`)
			},
			handleCurrentChange(val) {
				this.currentPage = val
			},
			blurCheck() {
				var cName = this.formAdd.menuName;
				//新增按钮中 输入用户名后去后台检验是否存在
				checkUname(cName).then((response) => {

					this.cName2 = response;
					if(this.cName2 == 0) {
						//					alert("这个名字可以，数据库里面为0");
					} else {
						this.$message({
							message: '这个菜单名称数据库里已经存在，请重新输入',
							type: 'warning'
						})
					}
				})

			},
			resetChongZhi(formName) {
				this.$refs[formName].resetFields();
			},
			//编辑
			handleEdit(row) {
				needDept().then((response) => {
					this.depts = response;
				})

				this.resetDialog22 = true;
				this.formEd = row;

				this.formEd.group.groupName = row.group.groupName

			},

			editClose() {
				this.resetDialog22 = false;
				this.roleSearch(this.formInline);
			},
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
					arrTest.push(val[i].menuId);
				}
				this.arrRo = [];
				this.arrRo = arrTest;
			},
			//表格全选按钮 点击后 收集被选中的id
			selectAllRus(val) {
				var arrTest = [];
				for(var i in val) {
					arrTest.push(val[i].menuId);
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
					//					this.$message({
					//						type: 'success',
					//						message: '删除成功!'
					//					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消' + ddText
					})
				})
			},
			//新增
			handleAdd(formAdd) {

				needDept().then((response) => {
					this.depts = response;
				})
				this.addUserDialog = true;
				this.$refs[formAdd].resetFields();
			},
			//新增弹窗的提交按钮
			//			addCommit(formAdd) {
			addCommit(formAdd01, formAdd) {

				//				this.addUserDialog = false;
				//				adCmit(formAdd).then((response) => {
				//					//    如果添加成功就 再执行一次查询	
				//					this.roleSearch(this.formInline);
				//				})

				var aa = this.formAdd.groupId;

				if(aa.length == 0) {
					this.$message({
						message: '请选择权限域名',
						type: 'warning'
					})
					return false;
				}

				// alert(formAdd.group.groupId );
				this.$refs[formAdd01].validate((valid) => {
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