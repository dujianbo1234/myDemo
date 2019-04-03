

<template>
	<div class='container'>
		<div class="cont">
			<div class="RightRow">
				<el-card>
					<el-form :inline="true" label-position="right" label-width="70px" size="small" :model="formCascader" :rules="formCascaderRules" ref="formCascader">
						<el-form-item label="部署任务" prop="nameInfo">
							<el-input v-model="formCascader.name" placeholder="请输入部署任务"  @keyup.enter.native="queryDataClick('formCascader')"></el-input>
						</el-form-item>
						<el-form-item label="创建人"  prop="creator"> 
							<el-input v-model="formCascader.creator" placeholder="请输入创建人"  @keyup.enter.native="queryDataClick('formCascader')"></el-input>
						</el-form-item>
							<el-button size="small" class="search_btn" @click="queryDataClick('formCascader')" style="margin-left:10px;">查询</el-button>
							<el-button size="small" class="opt_btn" @click.stop="queryDataRest('formCascader')">重置</el-button>
							<!-- <i class="iconfont step_btn" v-bind:class="[isShowing ? blurClass : '',bkClass]" @click="arrowTest()">&#xe619;</i>
							<el-popover
								placement="top-end"
								title=""
								width="250"
								trigger="click">
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
							</el-popover>
							<div ref="schItemShow2" class="schItemShow">
								<el-form-item label="平台类型"  prop="name"> 
									<el-input v-model="formCascader.name" placeholder="请选择模板类型" @keyup.enter.native="queryDataClick('formCascader')"></el-input>
								</el-form-item>
							</div> -->
					</el-form>
				</el-card>
			</div>
      		<div class="RightRow">
        		<el-card>
					<div class="buttonItem">
						<el-button size="small" class="search_btn" @click="addDialogPolling('form')">新增任务</el-button>
						<el-button size="small" class="opt_btn" @click="executeTask('0')">批量执行</el-button>
						<el-button size="small" class="opt_btn" @click="taskCusCopy()">批量复制</el-button>
						<el-button size="small" plain class="opt_btn del_btn" @click="deleteRowTask()">批量删除</el-button>
					</div>
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" :header-cell-style="headStyle">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="platformName" label='平台类型' min-width="80" align="center">
									</el-table-column>
									<el-table-column show-overflow-tooltip prop="name" label='部署任务' min-width="80" align="center">
									</el-table-column>
									<el-table-column show-overflow-tooltip prop="creator" label='创建人' min-width="80" align="center">
									</el-table-column>
									<el-table-column show-overflow-tooltip prop="createTime" label='创建时间' min-width="80" align="center">
									</el-table-column>
									<el-table-column show-overflow-tooltip prop="updateTime" label='修改时间' min-width="80" align="center">
									</el-table-column>
									<el-table-column show-overflow-tooltip prop="state" label='状态' min-width="80" align="center">
									</el-table-column>
						<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="text" class="table_btn" size="small" @click.stop="editDialog(scope.row.id)">修改</el-button>
							<el-button type="text" class="table_btn" size="small" @click.stop="executeTask('1',scope.row.id)">执行</el-button>
							<el-button type="text" class="table_btn" size="small" @click.stop="deleteTask(scope.row.id)">删除</el-button>
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


		<!-- dialog -->
		<!-- 新增命令弹窗 -->
		<el-dialog :close-on-click-modal="false" :visible.sync="addUserDialog" width='64%' @close="dialogClose('form')" class="logAdd-dialog opt">
      <div class="details-title">
        <div>
          <el-form :rules="rules" :inline="true" :model="form" label-position="right" label-width="110px" size="small" ref="form" style="text-align:left;">
            <span class="sp"><span>任务信息</span></span>
            <div class="logAdd-obj">
                <el-form-item label="任务名称" prop="name" >
					<el-input  v-model="form.name" @blur="nameCode"></el-input>
				</el-form-item>
				<el-form-item >
					<el-tooltip class="item" effect="dark" content="2-15个字符,不能包含特殊符号" placement="right">
						<i class="iconfont detail_btn" >&#xe6f4;</i>
					</el-tooltip>
				</el-form-item>
                <el-form-item label="任务级别" prop="taskRank" >
					<el-select v-model="form.taskRank" placeholder="请选择任务级别">
						<el-option
							v-for="item in rank"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
                <el-form-item label="平台类型" prop="platformType" >
					<el-select v-model="form.platformType" placeholder="请选择平台类型" @change="nameCode">
						<el-option
							v-for="item in taskTypeList"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部署模板" prop="template" >
					<el-select v-model="form.template" placeholder="请选择模板" @change="taskTemplate">
							<el-option
							v-for="item in updateTemplate"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
            </div>
            <span class="sp" ><span>节点信息</span>	<i class="iconfont nodeAdd"   @click="addMes()">&#xe64b;</i><i class="iconfont nodeAdd">&#xe64d;</i></span>
				
            <div class="logAdd-obj">
				<nodeDeployUpdateTask ref="nodeDeployUpdateTask" v-bind:form="form" ></nodeDeployUpdateTask>
            </div>
			<br/>
			<span class="sp" >
				<span>执行配置</span>
				<div class="logAdd-obj">
						<el-form-item label="执行方式" prop="way">
							<el-radio-group v-model="form.way">
								<el-radio label="0">手动执行</el-radio>
								<el-radio label="1">周期执行</el-radio>
								<el-radio label="2">定时执行</el-radio>
							</el-radio-group>
						</el-form-item>
						<br/>
						<el-form-item label="选择日期" prop="selectDate" v-show="dateShow && disabledDate">
							<el-date-picker
								v-model="form.selectDate"
								type="datetimerange"
								value-format="yyyy-MM-dd HH:mm:ss"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								:picker-options="pickerOptions" 
								:editable='false'>
							</el-date-picker>
				    </el-form-item>
						<el-form-item label="选择日期" prop="selectDate" v-show="dateShow && disabledDate == false">
							<el-date-picker
								v-model="form.selectDatetwo"
								value-format="yyyy-MM-dd HH:mm:ss"
								type="datetime"
								placeholder="选择日期时间"
								:picker-options="pickerOptionTime" 
								:editable='false'>
							</el-date-picker>
						</el-form-item>
						<br/>
						<el-form-item label="设置频率">
							<el-input-number v-model="form.frequency" controls-position="right"  :min="1" :max="60"></el-input-number>
						</el-form-item>
						<el-form-item label="频率时间">
							<el-select  v-model="form.region" placeholder="选择时间单位">
									<el-option label="天" value="天"></el-option>
									<el-option label="时" value="时"></el-option>
									<el-option label="分" value="分"></el-option>
								</el-select>
						</el-form-item>
						<el-form-item label="触发条件" prop="conditionObject conditionIndex conditionType conditionRelation">
							<el-select v-model="form.conditionObject" placeholder="择任对象">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							
							<el-select v-model="form.conditionIndex" placeholder="择任指标">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							
							<el-select v-model="form.conditionType" placeholder="择任类型">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<el-select v-model="form.conditionRelation" placeholder="关联关系">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<br/>
						<el-form-item label="超时阈值" prop="overTimeDate">
								<el-input-number v-model="form.overTime" controls-position="right"  :min="1" :max="60"></el-input-number>
						</el-form-item>
						<el-form-item label="阈值时间" prop="overTimeDate">
							<el-select v-model="form.overTimeDate" placeholder="选择时间单位">
									<el-option label="天" value="天"></el-option>
									<el-option label="时" value="时"></el-option>
									<el-option label="分" value="分"></el-option>
							</el-select>
						</el-form-item>
				</div>
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
	import * as service from '@/modules/ops/api/ops/deployUpdate/deployUpdateTask.js'
	import * as rule from '@/modules/ops/api/rules.js'
	import { getToken } from '@/utils/auth'
	// 节点组件
	import nodeDeployUpdateTask from '@/modules/ops/components/node/nodeDeployUpdateTask'
	export default {
		components: {
			nodeDeployUpdateTask,
		},
		data() {
			return {
				checkList:[],
				// 表头样式
				headStyle: {
					'background-color': '#F4F8F9',
					'color': 'rgba(0,0,0,0.60)',
				},
				// 图标样式
				isShowing: false,
				bkClass: 'bk',
				blurClass: 'blur',

				scriptList:[],
				selectedOptions:[],

				// 分页
				pageSize: 10, // 每页多少条
				totalSize: 1000, // 总条数	
				currentPage: 1, // 当前页
				totalCount: 1, // 总条数
				// ----------------------------------------------------------
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < new Date(new Date().toLocaleDateString()).getTime();
					}
				},
				pickerOptionTime: {
					disabledDate(time) {
						return time.getTime() < new Date(new Date().toLocaleDateString()).getTime();
					}
				},
				
				// 编辑的id
				editId: '',
				// 判断是新增还是编辑
				editBol: false,
				// 表格选中的行
				multipleSelection: [],
				// 保存addObject index
				addObjectIndex : '',
				// 选择对象标签页
				typeName: '',
				// 新增巡检指标弹框
				addPollingDialog:false,
				// 新增巡检指标数据
				
				PollingForm: {
					command:'',
					itemDesc:'',
					name:'',
					parentId:[],
				},
				PollingRules: {
					name: [
						{ required: true, message: '请输入巡检指标', trigger: 'blur' },
					],
					command: [
						{ required: true, message: '请输入命令', trigger: 'blur' },
					],
					parentId: [
						{ type: 'array', required: true, message: '请选择巡检项', trigger: 'change' }
					],
				},
				// 控制表格加载
				tableLoading:true,
				// 记录点击的时第几个上传的按钮
				upIndex:'',
				// 选择对象标签页
				typeName: '',
				// 巡检指标标签页
				pollingName:'',
				// 巡检指标自动展开
				unfoldPollingTree:[],
				defaultProps: {
					children: 'list',
					label: 'name',
					value: 'id'
				},
				// 改变级联选择器的key值
				cascaderProps: {
					value: 'id',
					label: 'name',
					children: 'list',
				},
				treeProps: {
					children: 'list',
					// label: 'name'
				},
				// 首页搜索的表单数据
				formCascader: {
					type: [],
					name:'',
					creator:'',
				},
				// 首页搜索的验证规则
				formCascaderRules: {
					name:[ 
						{ validator: rule.validateQueryName, trigger: 'blur' },
					],
					creator:[ 
						{ validator: rule.validateQueryName, trigger: 'blur' },
					]
				},
				// 控制频率是否可选
				frequencyShow:false,
				// 控制显示哪种日期选择器
				dateShow:false,
				// 控制日期选择器是否可以选择
				disabledDate:true,
				// 脚本宽度
				popoverWidth:"200",
				// 上传的地址
				base_api: '',
				// 折叠面板是否展开
				activeNames: [],
				form: {
					// 平台类型
					platformType :"",
					// 命令
					order:"",
					template: "",
					name: "",
					region: "分",
					date1: "",
					mes:[],
					deployUpdateTask: [],
					date2: "",
					delivery: false,
					type: [],
					taskType: "3",
					operator: "",
					taskRank: "",
					way: "0",
					conditionObject: "",
					conditionIndex: "",
					conditionType: "", 
					conditionRelation: "",
					selectDate: "",
					selectDatetwo: "",
					frequency: "",
					overTime: "5",
					overTimeDate: "分",
					valueMinute: "",
					valueSecond: "",
					resource: "",
					desc: "",
				},
				rules: {
					name: [
						{ required: true, message: '请输入任务名称', trigger: 'blur' },
						{ required: true,  min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' },
						 {required: true,  validator: rule.validateCodeName, trigger: 'blur' },
						//  { validator: rule.validateCode, trigger: 'blur' },
						
					],
					platformType: [
						{ required: true, message: '请选择平台类型', trigger: 'change' }
					],
					taskRank: [
						{ required: true, message: '请选择任务级别', trigger: 'change' }
					],
					overTimeDate: [
						{ required: true, message: '请选择时间单位', trigger: 'change' }
					]
				},
				// 任务级别
				rank: [{
					value: '1',
					label: '低'
				}, {
					value: '2',
					label: '中'
				}, {
					value: '3',
					label: '高'
				}],
				// 任务类型
				taskTypeList: [{
					value: 1,
					label: 'laaS层基础平台'
				}, {
					value: 2,
					label: 'paaS软件集群'
				}, {
					value: 3,
					label: 'SaaS层应用'
				}],
				// 基线类型 
				keynoteType : [
					{value:'string',label:'字符串'},
					{value:'int',label:'整形'},
					{value:'double',label:'小数'},
				],
				// 类型列表
				inspectionType: [{value:'选项1',label:'巡检类型'},
                                {value:'选项2',label:'主机'},
                                {value:'选项3',label:'数据库'},
                                {value:'选项4',label:'中间件'},
                                {value:'选项5',label:'网络设备'},
								{value:'选项6',label:'PasS集成组件'},],
				// 类型默认值
				inspectionTypeDefault: '选项1',
				// 部署模板数据
				updateTemplate:[],
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
				// 记录编辑的名字
				taskName:'',
				// ----------------------------------------------------------				




                
				taskTemplate: [{value: '选项1',label: '模板01'}],
							  taskTemplateDefault: '选项1',
				operationName: [],
				addUserDialog: false,
				tableData: [],
				taskType: [{value:'选项1',label:'IaaS层基础平台模板'},
						   {value:'选项2',label:'PaaS层软件集群模板'},
						   {value:'选项3',label:'SaaS层应用模板'},],
						   taskTypeDefault: '选项1',
				taskLevel: [{value:'选项1',label:'高'},
							{value:'选项2',label:'中'},
							{value:'选项3',label:'低'},],
							taskLevelDefault: '选项1',
				dialog: {
					show: false,
					title: '新增任务',
				},
				formLabelWidth: "120px",
				radio1: '1',
				radio2: '1',
				radio3: '1',
				activeName: 'second',
				selCommand:[{value:'选项1',label:'请选择命令'}],
							selCommandDefault: '选项1',
				object: [{value:'选项1',label:'对象1'}],
						objectDefault: '选项1',
				
				
				flag: true,
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
				startTime: '',
				endTime: '',
				startTimeDisabled: false,
				endTimeDisabled: false,
				day: '',
				hour: '',
				minute: '',
				second: '',
				minuteThreshold: '',
				secondThreshold: '',
				object: [],
				index: [],
				type: [],
				selectValue: [{value:'选项1',label:'>'},
							  {value:'选项2',label:'<'},
							  {value:'选项3',label:'>='},
							  {value:'选项4',label:'<='},],
				incidenceRelation: [{value:'选项1',label:'或'},
							        {value:'选项2',label:'与'},],
				gridData:[{object:'CPU',index:'%10',type:'%3',selectValue:'>',incidenceRelation:'或'}],

			};
		},
		
		mounted() {
			// this.base_api = service.request.defaults.baseURL;
			// 首页表格查询
			this.queryData()
			// 选择主机ip查询
			// this.queryIP()

			// this.queryIPGather()

			// this.queryDataUseTree()


			// this.taskTemplateAxios()
		},
		computed: {
			myHeaders: function () {
				// `this` 指向 vm 实例
				const datas = {
					'X-Token':getToken()
				}
				return datas
			}
		},
		methods: {
			// ------------------------------------------------
			// 部署模板
			// 表单重置
			queryDataRest(formName) {
				this.$refs[formName].resetFields();
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
			// 任务模板获取数据
			taskTemplateAxios() {
				const params = {
					modelType:3
				}
				service.taskTemplateAxios(params).then(res => {
					if(res.code == 200) {
						this.updateTemplate = res.result.model
					}
					
				})
			},
			
			
			
			// 应用类型分类
			queryDataTypeUse(index){
				service.queryDataTypeUse().then(res => {
					if(res.code == 200) {
						this.form.deployUpdateTask[index].typeClassIdList = res.result
					}else {
						this.$message({
							type: 'error',
							message: res.msg
						})
					}
					
				})
			},
			// 新增和编辑验证名称
			nameCode() {
				// 判断是不是编辑
				if(this.form.name != '' &&  this.form.platformType != ''){
					const params = {
						name:this.form.name,
						modelType:3,
						platformId:this.form.platformType,
					}
					if(this.editBol) {
						params.id = this.editId
					}
					service.addTaskRepeatName(params).then(res => {
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
			// 表格转换
			formatAlarm(row, column) {
				var data = ''
				var array = ['否','是']
				data = array[row.alarm]
				return data
			},
			validateFontSize(rule,value,callback){
				let specialKey = "[%`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"; 
				var bol = true;
				var myObj=value.replace(/\s+/g,"");
				if(myObj!=value){
					bol = false;
					callback(new Error('请不要输入空白字符'));
				}
				for (let i = 0; i < value.length; i++) {
					if (specialKey.indexOf(value.substr(i, 1)) != -1) {
					bol = false;
					callback(new Error('请不要输入特殊字符'))
					}
				}
				if(value == '') {
					callback(new Error('节点不能为空'))
				}
				if(bol){
					callback()
				}
			},
			// 重置表单数据的函数
			resetForm() {
				this.form.template= "";
				this.form.name= "";
				this.form.region= "分";
				this.form.date1= "";
				this.form.deployUpdateTask= [];
				this.form.date2= "";
				this.form.delivery= false;
				this.form.type= [];
				this.form.taskType= "3";
				this.form.operator= "";
				this.form.taskRank= "";
				this.form.way= "0";
				this.form.conditionObject= "";
				this.form.conditionIndex= "";
				this.form.conditionType= "";
				this.form.conditionRelation= "";
				this.form.selectDate= [];
				this.form.selectDatetwo= "";
				this.form.frequency= "";
				this.form.overTime= "5",
				this.form.overTimeDate= "分",
				this.form.valueMinute= "";
				this.form.valueSecond= "";
				this.form.resource= "";
				this.form.desc= "";
				this.form.platformType = "",
				// 编辑需要传的参数
				this.editId = "";
				this.editBol = false;
				this.createTime = "";

				
			},
			// 复制
			taskCusCopy() {
				if(this.multipleSelection.length == 0) {
					this.$message({
						message: '请选择需要复制的数据',
						type: 'warning'
					});
					return false;
				}
				var ids = [];
				this.multipleSelection.forEach((item,index)=>{
					ids.push(item.id)
				})
				this.$confirm('是否开始复制所选任务', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
				
				const params = {
					taskIds:ids.join(',')
				}
				service.taskCusCopy(params).then(res=>{
					this.$message({
							type: 'success',
							message: res.msg
						})
					this.queryData()
				}).catch(() => {
						this.$message({
							type: 'info',
							message:  res.msg
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					})
				})
			},
			//多条删除		
			deleteRowTask() {
				const _self = this
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
						_self.multipleSelection.forEach((item,index)=>{
							ids.push(item.id)
						})
						service.deleteRowTask(ids).then(res=>{
							this.$message({
									type: 'success',
									message: res.msg
								})
							_self.queryData()
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
			//删除单条信息
			deleteTask(id) {
				
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					const params = {
						ids: id
					}
					service.deleteTask(params).then(res => {
						
						this.$message({
							type: 'success',
							message: res.msg
						})
						this.queryData()
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
			},
			//复选框
			handleSelectionChange(val){
				this.multipleSelection  = val
			},
			//执行	
			executeTask(types,dataId) {
				var ids = [];
				// types 0多条执行 types 1单条执行
				
				if(types == '0') {
					if(this.multipleSelection.length == 0) {
						this.$message({
							message: '请选择需要执行的数据',
							type: 'warning'
						});
						return false;
					}
					this.multipleSelection.forEach((item,index)=>{
						ids.push(item.id)
					})
				}else if(types == '1'){
					ids.push(dataId)
				}
				
				
				
				this.$confirm('是否开始执行所选任务', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
				
				let data = {
					taskIds:ids.join(',')
				}
				service.executeTask(data).then(res=>{
					this.$message({
							type: 'success',
							message: res.msg
						})
					this.queryData()
				}).catch(() => {
						this.$message({
							type: 'info',
							message: res.msg
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					})
				})
			},
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
			// 新增的保存
			 addDialogSave(formName) {
				 for(var i = 0 ; i <this.form.deployUpdateTask.length;i++) {
					if(this.form.deployUpdateTask[i].scriptBol == 2) {
						if(this.form.deployUpdateTask[i].isScript == "0") {
							if(this.form.deployUpdateTask[i].startCmd == ''){
								this.$message({
									message:'节点'+Number(i+1)+'命令不能为空',
									type: 'warning'
								});
								return
							}
						}else if (this.form.deployUpdateTask[i].isScript == "1"){
							if(this.form.deployUpdateTask[i].scriptAddressName == ''){
								this.$message({
									message:'节点'+Number(i+1)+'脚本不能为空',
									type: 'warning'
								});
								return
							}
							if(this.form.deployUpdateTask[i].startScript == ''){
								this.$message({
									message:'节点'+Number(i+1)+'启动脚本不能为空',
									type: 'warning'
								});
								return
							}
						}
				 	}
				 }
				this.$refs[formName].validate((valid) => {
				if (valid) {
					var dateIndex = '';
						var dateIndexTwo = '';
						var frequencydata = '';
						if(this.form.way == 2) {
							dateIndex = this.form.selectDatetwo;
							if(dateIndex == '') {
								this.$message({
									type: 'warning',
									message: '请选择时间!'
								})		
								return false
							}
							var thisTime=dateIndex.replace(/-/g, '/');
							var time=(new Date(thisTime)).getTime();
							var timeNow=(new Date()).getTime();
							if(time<timeNow){
								this.$message({
									type: 'warning',
									message: '选择日期时间不能小于当前系统时间!'
								})		
								return false;
							}
							
						}
						if(this.form.way == 1) {
							frequencydata = this.form.frequency + "" + this.form.region + "/次";
							if(this.form.selectDate.length == 0) {
								this.$message({
									type: 'warning',
									message: '请选择时间!'
								})		
								return false
							}
							dateIndex = this.form.selectDate[0];
							dateIndexTwo = this.form.selectDate[1];
							var thisTime1=dateIndex.replace(/-/g, '/');
							var thisTime2=dateIndexTwo.replace(/-/g, '/');
							var time1=(new Date(thisTime1)).getTime();
							var time2=(new Date(thisTime2)).getTime();
							var timeNow=(new Date()).getTime();
							if(time1<timeNow){
								this.$message({
									type: 'warning',
									message: '选择开始时间不能小于当前系统时间!'
								})		
								return false;
							}
							if(time2<timeNow){
								this.$message({
									type: 'warning',
									message: '选择结束时间不能小于当前系统时间!'
								})		
								return false;
							}
							if(time2<time1||time2==time1){
								this.$message({
									type: 'warning',
									message: '选择结束时间不能小于开始时间!'
								})		
								return false;
							}
						}
					
					const param = {
						task_level: this.form.taskRank,
						over_time: this.form.overTime+""+this.form.overTimeDate
					};
					const jsonStr = JSON.stringify(param);
					for(var i = 0 ; i < this.form.deployUpdateTask.length; i ++){
						this.form.deployUpdateTask[i].typeClassId = this.form.deployUpdateTask[i].useChoose[0].split(':')[1].split('+')[0]
						this.form.deployUpdateTask[i].typeClassName = this.form.deployUpdateTask[i].useChoose[0].split(':')[1].split('+')[1].split('*')[1]
						this.form.deployUpdateTask[i].typeId = this.form.deployUpdateTask[i].useChoose[1].split(':')[1].split('+')[0]
						this.form.deployUpdateTask[i].typeName = this.form.deployUpdateTask[i].useChoose[1].split(':')[1].split('+')[1].split('*')[1]
						this.form.deployUpdateTask[i].appId = this.form.deployUpdateTask[i].useChoose[2].split(':')[1].split('+')[0]
						this.form.deployUpdateTask[i].appName = this.form.deployUpdateTask[i].useChoose[2].split(':')[1].split('+')[1].split('*')[1]
						this.form.deployUpdateTask[i].versionId = this.form.deployUpdateTask[i].useChoose[3].split(':')[1].split('+')[0]
						this.form.deployUpdateTask[i].versionName = this.form.deployUpdateTask[i].useChoose[3].split(':')[1].split('+')[1].split('*')[1]
						this.form.deployUpdateTask[i].packageUrl = this.form.deployUpdateTask[i].useChoose[3].split(':')[1].split('+')[1].split('*')[0]
					}
					var users = ''
					var usersLast = ''
					for(var i = 0 ; i < this.form.deployUpdateTask.length; i ++){
						// isScript 0命令 1脚本
						if(this.form.deployUpdateTask[i].isScript == 0){
							// 清空脚本
							this.form.deployUpdateTask[i].scriptAddress = ''
							this.form.deployUpdateTask[i].scriptAddressName = ''
						}else if(this.form.deployUpdateTask[i].isScript == 1){
							// 清空命令
							this.form.deployUpdateTask[i].startCmd = ''
						}
						this.form.deployUpdateTask[i].resourceGroup = this.form.deployUpdateTask[i].resourceGroupName.join(',')
						if(this.form.deployUpdateTask[i].resourceGroupName.length == 1){
							this.form.deployUpdateTask[i].user = this.form.deployUpdateTask[i].resourceGroupName[0].split('@')[1]
						}else if(this.form.deployUpdateTask[i].resourceGroupName.length > 1){
							for(var j = 1;j<this.form.deployUpdateTask[i].resourceGroupName.length;j++){
								usersLast = this.form.deployUpdateTask[i].resourceGroupName[j-1].split('@')[1]
								users = this.form.deployUpdateTask[i].resourceGroupName[j].split('@')[1]
								
								if(usersLast !== users) {
									this.$message({
										message:'必须是同一个用户' ,
										type: 'info'
									});
									return 
								}
							}
							this.form.deployUpdateTask[i].user = users
						}
						this.form.deployUpdateTask[i].dstHosts = ''
						this.form.deployUpdateTask[i].extendContent = []
						for(var j = 0;j<this.form.deployUpdateTask[i].resourceGroupName.length;j++){
							this.form.deployUpdateTask[i].dstHosts += this.form.deployUpdateTask[i].resourceGroupName[j].split('@')[0]+','
							// var exData = this.form.deployUpdateTask[i].resourceGroupName[j].split('@')[0]+':'+this.form.deployUpdateTask[i].resourceGroupName[j].split('@')[1]
							// this.form.deployUpdateTask[i].extendContent.push(exData)
							var obj = {}
							obj[this.form.deployUpdateTask[i].resourceGroupName[j].split('@')[0]] = this.form.deployUpdateTask[i].resourceGroupName[j].split('@')[1]
							this.form.deployUpdateTask[i].extendContent.push(obj)
							// this.form.deployUpdateTask[i].extendContent[this.form.deployUpdateTask[i].resourceGroupName[j].split('@')[0]] = this.form.deployUpdateTask[i].resourceGroupName[j].split('@')[1]
						}
							
							
					}
					
					const params = {
						platformId: this.form.platformType,
						modelType:3,
						name:this.form.name,
						taskNodes:this.form.deployUpdateTask,
						trigger: {
							startPlanTime: dateIndex,
							endPlanTime: dateIndexTwo,
							triggerType: this.form.way,
							executeRate: frequencydata
						},
						param: jsonStr
					}
					if(this.editBol) {
						params.id = this.editId
						params.createTime = this.createTime
						console.log('编辑:'+params)
						service.queryDataAdd(params).then(res => {
							if(res.code == 200) {
								this.queryData();
								this.addUserDialog = false
								this.$message({
									message: res.msg,
									type: 'success'
								});
							}else {
								this.$message({
									message: res.msg,
									type: 'warning'
								});
							}
						})
					}else {
						if(this.fileUrl) params.startScript  = this.fileUrl
						console.log('新增:'+params)
						service.queryDataAdd(params).then(res => {
							if(res.code == 200) {
								this.queryData();
								this.addUserDialog = false
								this.$message({
									message: res.msg,
									type: 'success'
								});
							}else {
								this.$message({
									message: res.msg,
									type: 'warning'
								});
							}
						})
					}
					
					
				} else {
					return false;
				}
				});
			},
			
			// 新增弹出框点击关闭或阴影
			dialogClose(formName) {
				this.$refs[formName].resetFields();
				this.addUserDialog = false;
			},
			// 删除标签事件
			closeTag(tag,index) {
				this.form.deployUpdateTask[index].resourceGroupDel.splice(this.form.deployUpdateTask[index].resourceGroupDel.indexOf(tag), 1);
			},
			// 新增弹框
			addDialogPolling(formName) {
				this.resetForm()
				this.addUserDialog = true
			},
			// 编辑弹框
			editDialog(ids) {
				const params = {
					id: ids
				};
				service.editTaskCusOpen(params).then(res => {
					// 表单重置函数
					this.resetForm()
					this.editBol = true
					this.editId = ids
					this.createTime = res.result.createTime
					var overTime = eval('(' + res.result.param + ')').over_time
					overTime = overTime.substring(0, overTime.length - 1);  
					var overTimeDate = eval('(' + res.result.param + ')').over_time
					var strs=overTimeDate.split(""); //字符分割 
					for (var i=0;i<strs.length ;i++ ) {
						overTimeDate = strs[i]
					}
					this.addUserDialog = true;
					const datas = res.result;
					for(var j = 0 ;j<datas.taskNodes.length;j++){
						if(datas.taskNodes[j].scriptAddress !== null) {
							datas.taskNodes[j].scriptAddressName = datas.taskNodes[j].scriptAddress.split('/')[datas.taskNodes[j].scriptAddress.split('/').length-1]
							// datas.taskNodes[j].scriptAddressName = datas.taskNodes[j].scriptAddress.substring(datas.taskNodes[j].scriptAddress.lastIndexOf('\\') + 14,datas.taskNodes[j].scriptAddress.length)
						}
					}
					
					
					this.form.platformType = res.result.platformId;
					this.form.taskType = Number(res.result.modelType) ;
					this.taskName = res.result.name;
					this.form.name = res.result.name;
					this.form.taskRank = eval('(' + res.result.param + ')').task_level;
					this.form.overTime = overTime
					// this.form.overTimeDate = overTimeDate

					var str1 = res.result.trigger.executeRate.substring(res.result.trigger.executeRate.length-2,0)
					this.form.frequency =str1.substring(0,str1.length-1)
					this.form.region = str1.substring(str1.length-1,str1.length)

					this.form.way = res.result.trigger.triggerType
					if(res.result.trigger.triggerType == 1) {
						this.form.selectDate = []
						this.form.selectDate.push(res.result.trigger.startPlanTime) 
						this.form.selectDate.push(res.result.trigger.endPlanTime)
					}
					if(res.result.trigger.triggerType == 2) {
						this.form.selectDatetwo = res.result.trigger.startPlanTime;
					} 
					var nodes = res.result.taskNodes
					for(var i = 0 ; i < nodes.length ; i ++){
						console.log(nodes[i])
						nodes[i].resourceGroupName = nodes[i].resourceGroup.split(',')
						nodes[i].node = "当前为节点 " + Number(i+1)
						nodes[i].step = i+1
						nodes[i].appOwnerList = [
							{value: '0',label: '公有'},
							{value: '1',label: '私有'},
						];
						console.log(nodes[i])
						nodes[i].appOwner = String(nodes[i].appOwner)
						nodes[i].UseTreeData = []
						this.queryDataUseTree(nodes[i],i)
						nodes[i].useChoose = ["typeClassId:2-undefined", "typeId:8-undefined", "appId:28-undefined", "versionId:9-/repository/1/ctbomc-cps-server-1.0.jar"];
						nodes[i].useChoose = [];
						nodes[i].useChoose.push('typeClassId:'+nodes[i].typeClassId+'+undefined*'+nodes[i].typeClassName)
						nodes[i].useChoose.push('typeId:'+nodes[i].typeId+'+undefined*'+nodes[i].typeName)
						nodes[i].useChoose.push('appId:'+nodes[i].appId+'+undefined*'+nodes[i].appName)
						nodes[i].useChoose.push('versionId:'+nodes[i].versionId+'+'+nodes[i].packageUrl+'*'+nodes[i].versionName)
						nodes[i].scriptBol = nodes[i].useChoose[0].split(':')[1].split('+')[0]
						var tagList = [{
							host:nodes[i].dstHosts,
							username:nodes[i].user
						}]
						nodes[i].resourceGroupDel = tagList
						this.activeNames.push(i+1)
					}
					this.form.deployUpdateTask = nodes;
				})
				this.addUserDialog = true;
			},
			// 获取选择应用树状接口
			queryDataUseTree(item,index){
				console.log(item)
				const params = {
					appOwner: item.appOwner,
				}
				service.queryDataUseTree(params).then(res => {
					// if(res.code == 200) {
						let deep = function(arr) {
						arr.forEach(item => {
							item.value = item.id+'+'+item.object.path+'*'+item.object.appName;
							item.label = item.object.appName;
							if (item.children) {
							deep(item.children);
							}
						});
						};
						deep(res);
						this.form.deployUpdateTask[index].UseTreeData = res;
						
					// }else {
					// 	this.$message({
					// 		type: 'error',
					// 		message: res.msg
					// 	})
					// }
					
				})
			},
			//新增弹出框取消
			addDialogFail(formName) {
				this.$refs[formName].resetFields();
				this.addUserDialog = false
			},
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
			// 获取表格数据
			queryData() {
				this.tableLoading = true;
				const params = {
					creator:this.formCascader.creator,
					modelType:3,
					name:this.formCascader.name,
					start: (this.currentPage - 1) * this.pageSize, 
					limit: this.pageSize
				};
				service.queryData(params).then(res => {
					this.tableData = res.result.list;
					this.totalCount = res.result.count;
					this.tableLoading = false;
				})
			},
			// 点击上传按钮事件
			btnUp(datas) {
				this.form.deployUpdateTask[datas].fileList = []
				this.upIndex = datas
			},
			// 巡检指标函数
			tabsPolling(tab, event) {
			},
			// 警告框
			warningMessage(){
				this.$message({
					message: '选择命令、选择脚本、巡检指标，无法同时选择',
					type: 'warning'
				});
			},
			// 选择脚本事件
			scriptFn(indexs) {
				this.form.deployUpdateTask[indexs].isScript = "1";
				this.form.deployUpdateTask[indexs].startScript  = this.form.deployUpdateTask[indexs].startUrlName
			},
			// 复制该节点
			copyNode(datas,indexs) {
				var obj = {};
				obj.id = datas.id;
				obj.chooseObject = datas.chooseObject;
				obj.user = datas.user
				obj.useChoose = datas.useChoose;
				obj.resourceGroupDel= [];
				obj.dstHosts = datas.dstHosts
				obj.appOwnerList = datas.appOwnerList
				// 树状结构
				obj.UseTreeData = [];
				obj.startCmd = datas.startCmd
				obj.typeClassId = datas.typeClassId;
				obj.typeClassIdList = datas.typeClassIdList;
				obj.typeId = datas.typeId;
				obj.typeIdList = datas.typeIdList;
				
				obj.appId = datas.appId;
				obj.appIdList = datas.appIdList;
				
				obj.versionId = datas.versionId;
				obj.versionIdList = datas.versionIdList;
				
				obj.appOwner = datas.appOwner;
				obj.installDir = datas.installDir;
				obj.configDir = datas.configDir;
				obj.envVar = datas.envVar;
				obj.startUrl = datas.startUrl;
				obj.extendContent = datas.extendContent;
				obj.order = datas.order;
				obj.packageUrl = datas.packageUrl;
				obj.configUrl  = datas.configUrl ;
				for(var i = 0 ; i < datas.resourceGroupDel.length; i++) {
					obj.resourceGroupDel.push(datas.resourceGroupDel[i])
				}
				obj.step = datas.step;
                obj.name = datas.name;
                obj.region = datas.region;
                obj.types = datas.types;
                obj.target= datas.target;
                obj.node = datas.node;
                obj.startCmd = datas.startCmd;
				obj.startScript  = datas.startScript ;
				obj.startUrlName = datas.startUrlName;
				obj.fileList = datas.fileList;
				obj.isScript = datas.isScript;
				obj.typeName = datas.typeName
				this.activeNames = [];
				// this.form.deployUpdateTask.push(obj);
				this.form.deployUpdateTask.splice(indexs,0,obj);
				this.activeNames = []
				for(var i = 0 ; i < this.form.deployUpdateTask.length ; i ++){
					this.form.deployUpdateTask[i].node = "当前为节点 " + Number(i+1)
					this.activeNames.push(Number(i+1))
					this.form.deployUpdateTask[i].step = Number(i+1)
					this.form.deployUpdateTask[i].id = Number(i+1)
				}
			},
			// 删除节点的函数
			delNode(indexs) {
				this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
					this.form.deployUpdateTask.splice(indexs, 1); 
					for(var i = 0 ; i < this.form.deployUpdateTask.length ; i ++){
						this.form.deployUpdateTask[i].node = "当前为节点 " + Number(i+1)
					}
					for(var i = 0 ; i < this.form.deployUpdateTask.length ; i ++){
						this.form.deployUpdateTask[i].step = i+1
					}
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
				
			},
			// 新增配置信息
			addMes() {
				if(this.form.taskType == "3"){
					var obj = {};
					obj.id = "";
					obj.resourceGroupDel= [];
					obj.resourceGroupName= [];
					obj.appOwnerList = [
						{value: '0',label: '公有'},
						{value: '1',label: '私有'},
					];
					obj.dstHosts = '';
					obj.UseTreeData = []
					obj.user = "";
					obj.startCmd = "";
					obj.packageUrl = "";
					obj.configUrl  = "" ;
					obj.chooseObject = "0";
					obj.typeClassId = "";
					obj.typeClassIdList = [];
					obj.typeId = "";
					obj.typeIdList = [];
					obj.appId = "";
					obj.appIdList = [];
					obj.versionId = "";
					obj.versionIdList = [];
					obj.appOwner = "";
					obj.useChoose = [];
					obj.installDir = "";
					obj.configDir = "";
					obj.envVar = "";
					obj.startUrl = "";
					obj.extendContent = [];
					obj.order= "",
					obj.step = "";
					obj.name = "";
					obj.region = "";
					obj.types = "";
					obj.target= "";
					obj.node = "";
					obj.startCmd = "";
					obj.startScript  = "";
					obj.startUrlName = "";
					obj.fileList = [];
					obj.isScript = "0";
					obj.typeName = '';
					obj.scriptBol = '';
					obj.scriptAddress = "";
					obj.scriptAddressName = "";
					this.form.deployUpdateTask.push(obj)
					for(var i = 0; i < this.form.deployUpdateTask.length; i++) {
						this.form.deployUpdateTask[i].node = "节点 " + Number(i + 1)
						this.form.deployUpdateTask[i].step = Number(i + 1)
						this.form.deployUpdateTask[i].id = Number(i + 1)
					}
				}
			},
			// ------------------------------------------------
		


    
		},
		watch:{
			'form.way': function(newVal){
				// 1手动执行 2周期执行 3定时执行
				if(newVal == 0) {
					this.dateShow = false;
					this.frequencyShow = false;
				}else if (newVal == 1) {
					this.dateShow = true;
					this.disabledDate = true;
					this.frequencyShow = true;
				}else if (newVal == 2) {
					this.dateShow = true;
					this.disabledDate = false;
					this.frequencyShow = false;
				}
			},
		},
	};
</script>


<style lang="scss" scoped>
	@import "./index.scss";
</style>