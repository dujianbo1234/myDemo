<template>
	<div class='container'>
		<div class="cont">
			<div class="RightRow">
				<el-card>
					<el-form :inline="true" label-position="right" label-width="70px" size="small" :model="queryForm" :rules="queryRules" ref="queryForm">
						<el-form-item label="模板名称" prop="nameInfo">
							<el-input v-model="queryForm.nameInfo" placeholder="请输入模板名称" @keyup.enter.native="queryData('queryForm')"></el-input>
						</el-form-item>
						<el-form-item label="模板类型"  prop="taskName"> 
							<el-select v-model="form.taskName" placeholder="请选择任务类型">
							<el-option v-for="item in taskDate" :key="item.modelType" :label="item.modelName" :value="item.modelType">
							</el-option>
						</el-select>
						</el-form-item>
						<el-button size="small" class="search_btn" @click="queryData('queryForm')" style="margin-left:10px;">查询</el-button>
						<el-button size="small" class="opt_btn" @click.stop="queryTaskRest('queryForm')">重置</el-button>
						<i class="iconfont step_btn" v-bind:class="[isShowing ? blurClass : '',bkClass]" @click="arrowTest()">&#xe619;</i>
						<!-- <el-popover
							placement="top-end"
							title="标题"
							width="250"
							trigger="hover">
							<el-checkbox-group v-model="checkList">
								<el-checkbox label="复选框 A"></el-checkbox>
								<el-checkbox label="复选框 B"></el-checkbox>
								<el-checkbox label="复选框 C"></el-checkbox>
								<el-checkbox label="复选框 A"></el-checkbox>
								<el-checkbox label="复选框 B"></el-checkbox>
								<el-checkbox label="复选框 C"></el-checkbox>
								<el-checkbox label="复选框 A"></el-checkbox>
								<el-checkbox label="复选框 B"></el-checkbox>
								<el-checkbox label="复选框 C"></el-checkbox>
							</el-checkbox-group>
							<i class="iconfont step_btn" slot="reference">&#xe615;</i>
						</el-popover>	 -->
						<div ref="schItemShow2" class="schItemShow">
							<el-form-item label="平台类型"  prop="taskName"> 
								<el-select v-model="form.taskName" placeholder="请选择平台类型" >
									<el-option v-for="item in rank" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</div>
					</el-form>
				</el-card>
			</div>

			<div class="RightRow">
				<el-card>
					<div class="buttonItem">
						<el-button size="small" class="search_btn" @click="addDialog">新增模板</el-button>
						<el-button size="small" plain class="opt_btn del_btn" @click="deleteRow()">批量删除</el-button>
					</div>
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" :header-cell-style="headStyle">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="name" label='模板名称' min-width="100" align="center">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="modelTypeName" label='模板类型' min-width="100" align="center" >
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="platformName" label='平台类型' min-width="100" align="center" >
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="creator" label='操作人' min-width="100" align="center" >
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="updateTime" label='更新时间' min-width="100" align="center" >
						</el-table-column>
							<el-table-column prop="" label='详情' min-width="200"  align="center">
							<template slot-scope="scope">
								<el-popover trigger="hover" placement="top">
									<el-table :data="scope.row.templateNodes">
										<el-table-column show-overflow-tooltip prop="name" label='节点名称'>
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="content" label='命令'>
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="scriptAddress" label='脚本'>
										</el-table-column>
									</el-table>
									<div slot="reference" style="font-size: 20px;" class="name-wrapper">
										<i class="iconfont detail_btn">&#xe67a;</i>							
									</div>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button type="text" class="table_btn" size="small" @click.stop="editTaskHTML(scope.row)">修改</el-button>
								<el-button type="text" class="table_btn" size="small" @click.stop="handleDelete(scope.row)">删除</el-button>
								<!-- <el-button type="text" class="table_btn" size="small" @click.stop="see(scope.row,'clone')">克隆</el-button> -->
							</template>
						</el-table-column>
					</el-table>
					<div class="block" align="right">
						<el-pagination align="right" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="[10,20,50]" layout="total,sizes,prev, pager, next, jumper" :total="totalCount" :pager-count="5">
						</el-pagination>
					</div>
				</el-card>
			</div>
		</div>



	<el-dialog :close-on-click-modal="false" :visible.sync="addUserDialog" width='1000px' @close="dialogClose('form')" class="logAdd-dialog opt">
		<div class="details-title">
			<div>
				<el-form :rules="rules" :inline="true" :model="form" label-position="right" label-width="90px" size="small" ref="form" style="text-align:left;">
					<span class="sp"><span>模块信息</span></span>
					<div class="logAdd-obj">
						<el-form-item label="模板名称:" prop="name" @blur="nameCode">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item >
							<el-tooltip class="item" effect="dark" content="2-15个字符,不能包含特殊符号" placement="right">
								<i class="iconfont detail_btn" >&#xe6f4;</i>
							</el-tooltip>
						</el-form-item>
						<el-form-item label="模板类型:" prop="taskType" required>
							<el-select v-model="form.taskType" placeholder="请选择任务类型">
								<el-option v-for="item in taskTypeList" :key="item.modelType" :label="item.modelName" :value="item.modelType" :disabled="item.disabled">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="平台类型:" prop="taskRank">
							<el-select v-model="form.taskRank" placeholder="请选择平台类型"  @change="nameCode">
								<el-option v-for="item in rank" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</div>
					<span class="sp" ><span>节点信息</span>	<i class="iconfont nodeAdd"   @click="addMes()">&#xe64b;</i><i class="iconfont nodeAdd">&#xe64d;</i></span>
					<div class="logAdd-obj">
						<Common ref="Common" v-bind:form="form" ></Common>
					</div>
					<br/>
					<span class="sp" >
						<span>模板状态</span>
						<el-radio-group v-model="form.way">
							<el-radio label="1">设为公有</el-radio>
							<el-radio label="2">设为私有</el-radio>
						</el-radio-group>
					</span>
				</el-form>
			</div>
		</div>
		<div class="details-title">
			<div class="sBtn">
				<el-button class="cancel" @click="dialogClose('form')">取消</el-button>
			<el-button class="finish"  @click="addDialogSave('form')">保存</el-button>
			</div>
		</div>
    </el-dialog>


	</div>
</template>

<script>
	import * as service from '@/modules/ops/api/ops/taskManagement/taskManagement.js'
	import * as rule from '@/modules/ops/api/rules.js'
	import { getToken } from '@/utils/auth'
	// 节点组件
	import Common from '@/modules/ops/components/node/Common'
	// import Template from '../Template';
	// import Paging from '@/modules/rms/components/Paging'
	export default {
		components: {
			Common,
			// Template
		},
		data() {
			// 驗證特殊字符
			const validateCode = (rule, value, callback) => {
				let specialKey = "[%`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
				var bol = true;
				var myObj = value.replace(/\s+/g, "");
				if(myObj != value) {
					bol = false;
					callback(new Error('请不要输入空白字符'));
				}
				for(let i = 0; i < value.length; i++) {
					if(specialKey.indexOf(value.substr(i, 1)) != -1) {
						bol = false;
						callback(new Error('请不要输入特殊字符'))
					}
				}
				if(value == '') {
					
					callback(new Error('请输入模板名称'))
				}
				if(bol) {
					callback()
				}
			};
			return {
				// ------------------------20190320--------------------------
				checkList:[],
				// 图标样式
				isShowing: false,
				bkClass: 'bk',
				blurClass: 'blur',
				// 表头样式
				headStyle: {
					'background-color': '#F4F8F9',
					'color': 'rgba(0,0,0,0.60)',
				},
				// 首頁查詢表單
				queryForm: {
					nameInfo: '',
					taskName: '',
				},
				queryRules: {
					nameInfo: [{
						validator: rule.admvalidateCode,
						trigger: 'blur'
					}]
				},
				rules: {
					name: [{
						validator: validateCode,
						required: true,
						trigger: 'blur'
					}],
					taskType: [{
						required: true,
						message: '请选择模板类型',
						trigger: 'change'
					}],
					taskRank: [{
						required: true,
						message: '请选择平台类型',
						trigger: 'change'
					}],
				},
				// ------------------------20190320--------------------------
				// 保存addObject index
				addObjectIndex: '',
				// 选择的主机数组
				hostIPDate: [],
				userInfoData: [],
				// 选择对象弹框
				addObjectDialog: false,
				// 新增主机
				addObjectForm: {
					main: '',
					user: '',
				},
				addObjectFormRules: {
					main: [{
						required: true,
						message: '请选择对象类型',
						trigger: 'change'
					}],
					user: [{
						required: true,
						message: '请选择对象类型',
						trigger: 'change'
					}],
				},
				// 选择对象标签页
				typeName: '',
				base_api: 'http://192.168.127.247:12000',
				// 记录点击的时第几个上传的按钮
				upIndex: '',

				// 控制表格加载
				tableLoading: true,
				// --------------------------------------------------
				// 编辑bol
				editBol: false,
				// 编辑id
				editId: "",

				// bpmn建模器
				bpmnModeler: null,
				container: null,
				canvas: null,
				nameInfo: '',
				showInfo: [],
				taskName: '',
				multipleSelection: [],

				popoverWidth: "200",
				// 控制显示哪种日期选择器
				dateShow: true,
				// 控制频率是否可选
				disabledImport: true,
				disabledSelect: true,
				// 控制日期选择器是否可以选择
				disabledDate: true,
				pageSize: 8, // 每页多少条
				currentPage: 1, // 当前页
				totalCount: 1, // 总条数
				fileList: [],
				tableData: [],
				radio: '1',
				addUserDialog: false,
				value6: '',
				num1: 0,
				taskDate: [],
				modelType: '',
				name: '',
				creator: '',
				id: '',
				ids: '',
				value1: '',
				dialog: {
					show: false,
					title: '模板信息',
				},
				taskTypeList: [],
				form: {
					template: "",
					name: "",
					region: "",
					date1: "",
					mes: [
						// {name:'',types:"",id:"",node:"",order:"",scrip:"",typeId:""}
					],
					// 普通类型
					Common:[],
					date2: "",
					delivery: false,
					type: [],
					taskType:1,
					operator: "",
					taskRank: "",
					way: "1",
					conditionObject: "",
					conditionIndex: "",
					conditionType: "",
					conditionRelation: "",
					selectDate: "",
					frequency: "",
					// frequencyDay: "",
					// frequencyHour: "",
					// frequencyMinute: "",
					// frequencySecond: "",
					overTime: "",
					overTimeDate: "",
					valueMinute: "",
					valueSecond: "",
					resource: "",
					desc: "",
					activeNames:[],
				},
				rank: [{
					value: 1,
					label: 'laaS层基础平台模板'
				}, {
					value: 2,
					label: 'paaS软件集群模板'
				}, {
					value: 3,
					label: 'SaaS层应用模板'
				}],
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				treedata: [{
					id: '192.168.121.162',
					label: '192.168.121.162',
				}, {
					id: '192.168.121.163',
					label: '192.168.121.163',
				}, {
					id: '192.168.121.164',
					label: '192.168.121.164',
				}, {
					id: '192.168.121.165',
					label: '192.168.121.165',
				}, {
					id: '192.168.121.162',
					label: '192.168.121.162',
				}],
				value: '',
				activeName: 'first',
				selectModel: [],
				taskModel: '',
				selectModelType: []
			};
		},

		mounted() {
			this.queryData('queryForm');
			this.taskType();
			this.base_api = service.request.defaults.baseURL;
		},
		computed: {
		},
		methods: {
			// ------------------------------------20190320-------------------------------------
			
			// 表单重置
			queryTaskRest(formName) {
				this.$refs[formName].resetFields();
			},
		// 表單查询
		queryData(formName) {
			this.$refs[formName].validate((valid) => {

				if(valid) {
					const _self = this
					_self.tableLoading = true;
					const params = {
						modelType: _self.queryForm.taskName,
						name: _self.queryForm.nameInfo,
						start: (_self.currentPage - 1) * _self.pageSize,
						limit: _self.pageSize
					}
					service.queryData(params).then(res => {
						const datas = res.result.list;
						for(var i = 0; i < datas.length; i++) {
							for(var j = 0; j < datas[i].templateNodes.length; j++) {
								console.log(datas[i].templateNodes[j].scriptAddress)
								datas[i].templateNodes[j].scriptAddress = datas[i].templateNodes[j].scriptAddress.substring(datas[i].templateNodes[j].scriptAddress.lastIndexOf('\\') + 14, datas[i].templateNodes[j].scriptAddress.length)
							}
						}
						_self.tableData = datas;
						_self.totalCount = res.result.count;
						_self.tableLoading = false;
					})

				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
			//点击鼠标显示
			arrowTest() {
				this.isShowing = !this.isShowing;

				if(this.$refs.schItemShow2.style.display == 'block') {
					this.$refs.schItemShow2.style.display = 'none';
				} else {
					this.$refs.schItemShow2.style.display = 'block';
				}
			},
			// ------------------------------------20190320-------------------------------------


			// 折叠面板函数
			handleChange(val) {
				this.activeNames = val
			},
			// 重名验证
			nameCode() {
				if(this.form.name != '' && this.form.taskType != '' && this.form.taskRank != ''){
					const params = {
						name:this.form.name,
						modelType:this.form.taskType,
						platformId:this.form.taskRank,
					}
					if(this.editBol) {
						params.id = this.editId
					}
					service.addTemplateRepeatName(params).then(res => {
						if(res.code == 400){
							this.$message({
								type: 'warning',
								message: res.msg
							});  
							this.form.name = ''
						}
					})
				}
			},
		// -----------------------------------------------------------
		// 新增弹出框点击关闭或阴影
		dialogClose(formName) {
			this.$refs[formName].resetFields();
			this.addUserDialog = false
			//this.bpmnShow = false
		},
		// 上传完成时触发的函数
		onSuccess(response, file, fileList) {
			const _self = this
			if(response.code == 200){
				_self.form.mes[_self.upIndex].scriptAddress = response.result
				_self.form.mes[_self.upIndex].scriptAddressName = fileList[0].name
				_self.form.mes[_self.upIndex].isScript = "1"
			}else {
				this.$message({
					type: 'warning',
					message: response.msg
				}); 
			}
		},
		// 点击上传按钮事件
		btnUp(datas) {
			const _self = this
			_self.form.mes[datas].fileList = []
			_self.upIndex = datas
		},
		
		// -----------------------------------------------------------
		// 
		

		//删除查询信息
		handleDelete(val) {

			this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error'
			}).then(() => {
				const params = {
					ids: val.id
				}
				service.deleteModel(params).then(res => {

					this.$message({
						type: 'success',
						message: '删除成功!'
					})
					this.queryData('queryForm')
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
		//复选框
		handleSelectionChange(val) {
			const _self = this
			_self.multipleSelection = val
		},
		//多选删除
		deleteRow() {
			const _self = this
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
					_self.multipleSelection.forEach((item, index) => {
						ids.push(item.id)
					})
					service.deleteRow(ids).then(res => {
						this.$message({
							type: 'success',
							message: res.msg
						})
						this.queryData('queryForm')
					}).catch(() => {
						this.$message({
							type: 'info',
							message: res.msg
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

		//任务类型查询
		taskType() {
			const _self = this;
			service.taskType().then(res => {
				_self.taskDate = res.result
			})
		},

		//分页条数设置
		handleSizeChange(val) { // 设置每页多少条
			this.pageSize = val
			this.queryData('queryForm')
		},
		//当前页
		handleCurrentChange(val) { // 当前页
			this.currentPage = val
			this.queryData('queryForm')
		},
		//新增弹出框取消
		addDialogFail(formName) {
			this.$refs[formName].resetFields();
			this.addUserDialog = false
		},

		addUser() {
			console.log("add");
		},
		delUser() {
			console.log("del");
		},
		//文件上传
		handleExceed(files, fileList) {
			this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
		},
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${ file.name }？`);
		},

		// ---------------------------------------------------------------
		// 日期时间转换函数
		getTime(datas) {
			console.log(datas)
			this.form.selectDate = datas;
			console.log(this.form.selectDate);
		},
		// 表单重置
		resetFromClick() {
			this.$confirm('此操作将重置表单数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.resetForm()
				this.$message({
					type: 'success',
					message: '重置成功!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消重置'
				});
			});
		},
		// 重置表单数据的函数
		resetForm() {
			this.form.template = "";
			this.form.name = "";
			this.form.region = "";
			this.form.date1 = "";
			this.form.mes = [];
			this.form.Common = [];
			this.form.date2 = "";
			this.form.delivery = false;
			this.form.type = [];
			this.form.taskType = 1;
			this.form.operator = "";
			this.form.taskRank = "";
			this.form.way = "1";
			this.form.conditionObject = "";
			this.form.conditionIndex = "";
			this.form.conditionType = "";
			this.form.conditionRelation = "";
			this.form.selectDate = "";
			this.form.frequency = "";
			this.form.overTime = "",
			this.form.overTimeDate = "",
			this.form.valueMinute = "";
			this.form.valueSecond = "";
			this.form.resource = "";
			this.form.desc = "";
			this.editId = "";
			this.editBol = false;
		},
		//表单保存
		saveFrom() {
			console.log(this.form)
			// 隐藏表单弹框
			addMesTypeDialog = false

		},
		// 获取所有被选中的节点
		// 树形图被点击的回调
		//新增配置信息对象类型弹出框
		addMesType() {
			this.addMesTypeDialog = true
		},
		//配置信息对象类型弹出框取消
		addMesTypeDialogFail() {
			this.addMesTypeDialog = false
			// this.$refs.tree.setCheckedKeys([]);
		},
		//新增弹出框
		addDialog() {
			// 表单重置函数
			this.resetForm()
			this.addUserDialog = true
			// 任务类型接口
			service.taskType().then(res => {
				this.taskTypeList = res.result
				this.taskTypeList[1].disabled = true;
				this.taskTypeList[3].disabled = true;
				this.taskTypeList[5].disabled = true;
				this.taskTypeList[6].disabled = true;



				this.taskTypeList[2].disabled = true;
				this.taskTypeList[4].disabled = true;
			})
		},
		// 新增命令弹框的保存
		addDialogSave(formName) {
			for(var i = 0 ; i <this.form.Common.length;i++) {
				if(this.form.Common[i].isScript == 0) {
					if(this.form.Common[i].content == ''){
						this.$message({
							message:'节点'+Number(i+1)+'命令不能为空',
							type: 'warning'
						});
						return
					}
				}else if (this.form.Common[i].isScript == 1){
					if(this.form.Common[i].scriptAddressName == ''){
						this.$message({
							message:'节点'+Number(i+1)+'脚本不能为空',
							type: 'warning'
						});
						return
					}
				}
				this.form.Common[i].resourceGroup = this.form.Common[i].resourceGroupName.join(',')
			}
			this.$refs[formName].validate((valid) => {
				if(valid) {
					var dateIndex = ''
					var dateIndexTwo = ''
					if(this.form.way == 3) {
						dateIndex = this.form.selectDate
					}
					if(this.form.way == 2) {
						dateIndex = this.form.selectDate[0]
						dateIndexTwo = this.form.selectDate[1]
					}

					if(this.editBol) {
						const params = {
							modelType: this.form.taskType,
							name: this.form.name,
							creator: this.form.operator,
							platformId: this.form.taskRank,
							id: this.editId,
						}
						if(this.form.taskType == 1){
							for(var i = 0 ; i < this.form.Common.length; i ++){
								if (this.form.Common[i].isScript == 0){
									this.form.Common[i].scriptAddress = ''
								}else if(this.form.Common[i].isScript == 1){
									this.form.Common[i].content = ''
								}     
							}
							params.templateNodes = this.form.Common
						}
						service.editTaskPUT(params).then(res => {
							var types = 'warning'
							if(res.code == 200) {
								this.queryData('queryForm');
								this.resetForm();
								this.addUserDialog = false;
								types = 'success'
							}
							this.$message({
								type: types,
								message: res.msg
							})
						})
					} else {
						const params = {
							modelType: this.form.taskType,
							name: this.form.name,
							creator: this.form.operator,
							platformId: this.form.taskRank,
						}
						if(this.form.taskType == 1){
							for(var i = 0 ; i < this.form.Common.length; i ++){
								if (this.form.Common[i].isScript == 0){
									this.form.Common[i].scriptAddress = ''
								}else if(this.form.Common[i].isScript == 1){
									this.form.Common[i].content = ''
								}     
							}
							params.templateNodes = this.form.Common
						}
						service.AddTask(params).then(res => {
							var types = 'warning'
							if(res.code == 200) {
								this.queryData('queryForm');
								this.resetForm();
								this.addUserDialog = false;
								types = 'success'
							}
							this.$message({
								type: types,
								message: res.msg
							})
						})
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			});

		},
		// 新增配置信息
		addMes() {
			// 1普通类型
			// 判断是哪种类型
			// if(this.form.taskType == 1){
				var obj = {};
				obj.id = "";
				obj.step = "";
				obj.name = "";
				obj.region = "";
				obj.types = "";
				obj.node = "";
				obj.content = "";
				obj.resourceGroupName= [];
				obj.scriptAddress = "";
				obj.scriptAddressName = "";
				obj.fileList = [];
				obj.isScript = "0";
				obj.user = [];
				this.form.Common.push(obj)
				for(var i = 0; i < this.form.Common.length; i++) {
					this.form.Common[i].node = "节点 " + Number(i + 1)
					this.form.Common[i].step = Number(i + 1)
					this.form.Common[i].id = Number(i + 1)
				}
			// }

		},
		// 编辑
		editTaskHTML(val) {
			this.editBol = true
			this.editId = val.id
			// 模板类型接口
			service.taskType().then(res => {
				
				this.taskTypeList = res.result
				const params = {
					id: val.id
				};
				service.editTask(params).then(res => {
					console.log(res)
					this.form.operator = res.result.model.creator
					this.form.name = res.result.model.name
					this.form.taskType = Number(res.result.model.modelType)
					this.form.taskRank = res.result.model.platformId
					const datas = res.result.model;
					for(var j = 0; j < datas.templateNodes.length; j++) {
						datas.templateNodes[j].resourceGroupName = []
						if(datas.templateNodes[j].scriptAddress != null || datas.templateNodes[j].scriptAddressName != undefined)
							datas.templateNodes[j].scriptAddressName = datas.templateNodes[j].scriptAddress.substring(datas.templateNodes[j].scriptAddress.lastIndexOf('\\') + 14, datas.templateNodes[j].scriptAddress.length)
					}
					// if(this.form.taskType == 1){
					// 	this.form.Common = res.result.model.templateNodes
					// }
					// for(var i = 0; i < this.form.Common.length; i++) {
					// 	this.form.Common[i].resourceGroupName = this.form.Common[i].resourceGroup.split(',')
					// 	this.form.Common[i].node = "节点 " + Number(i + 1)
					// 	this.form.Common[i].step = i + 1
					// }
					if(this.form.taskType == 1){
						this.form.Common = res.result.model.templateNodes;
						for(var i = 0 ; i < this.form.Common.length ; i ++){
							this.form.Common[i].resourceGroupName = this.form.Common[i].resourceGroup.split(',')
							this.form.Common[i].node = "节点 " + Number(i+1)
							this.form.activeNames.push(i+1)
							this.form.Common[i].step = i+1
						}
					}
				});
				this.addUserDialog = true
			})

		}

	},
	watch: {
		'form.way': function(newVal) {
			// 1手动执行 2周期执行 3定时执行
			if(newVal == 1) {
				this.dateShow = true;
				this.disabledImport = true;
				this.disabledDate = true;
				this.disabledSelect = true;
			} else if(newVal == 2) {
				this.dateShow = true;
				this.disabledImport = false;
				this.disabledDate = false;
				this.disabledSelect = false;
			} else if(newVal == 3) {
				this.dateShow = false;
				this.disabledImport = true;
				this.disabledSelect = true;
			}
		},
	}
	};
</script>
<style lang="scss" scoped>

	@import "./index.scss";
</style>
