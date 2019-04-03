<template>
	<div class='container'>
		<el-row>
			<el-col>
				<el-card>
					<el-form :inline="true" class="demo-form-inline"  :model="queryForm" :rules="queryRules" ref="queryForm">
					<el-select v-model="queryForm.modelType" clearable  placeholder="选择任务类型" >
						<el-option v-for='(item,index) in taskDate' :key="index" :label="item.modelName" :value="item.modelType"></el-option>
					</el-select>
						
						<el-form-item prop="name">
							<el-input v-model="queryForm.name" placeholder="请输入任务名称"></el-input>
						</el-form-item>
						
						<el-form-item prop="creator">
							<el-input v-model="queryForm.creator" placeholder="请输入操作人"></el-input>
						</el-form-item>

			
						<el-form-item>
							<el-button type="primary" @click="queryTaskClick('queryForm')">查询</el-button>
						</el-form-item>
						<el-form-item class="buttonItem">
							<el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addDialog()">新增</el-button>
							<el-button type="info" size="small" icon="el-icon-edit" >验证</el-button>
							<el-button type="warning" size="small" icon="el-icon-check" @click="executeTask('0')">执行</el-button>
							<el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="taskCusCopy()" >复制</el-button>
							<el-button type="danger" size="small" icon="el-icon-circle-close-outline" @click="deleteRowTask()" round>删除</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-card>
					<el-table  @selection-change="handleSelectionChange"  :data="tableData" style="width: 100%" :default-sort="{prop: 'userId', order: 'ascending'}">
						<el-table-column type="selection" width="55" >
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="name" label='任务名称' width="150">
						</el-table-column>
						<el-table-column show-overflow-tooltip  prop="modelType" label='任务类型' width="150" :formatter="formatmodelType">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="creator" label='操作人' width="100" >
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="platformName" label='平台类型' width="150">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="level" label='任务级别' width="80" >
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="executeRate" label='执行频率' width="100" >
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="state" label='审核状态' width="100" >
						</el-table-column>
						<el-table-column prop="" label='节点详情' width="80" >
							<template slot-scope="scope">
								<el-popover trigger="hover" placement="top">
									<el-table :data="scope.row.taskNodes">
										<el-table-column show-overflow-tooltip prop="name" label='节点名称' width="100">
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="content" label='命令' width="350">
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="scriptAddress" label='脚本' width="350">
										</el-table-column>
									</el-table>
									<div slot="reference" class="name-wrapper">
										<el-tag size="medium">显示节点</el-tag>
									</div>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="triggerType" label='调度方式' width="80" >
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="range" label='调度周期' width="330" >
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="updateTime" label='更新时间' width="120" >
						</el-table-column>
						
						<el-table-column label='操作'  fixed="right" width="230" >
							<template slot-scope="scope">
								<el-button size="mini" type="primary" @click="editTaskHTML(scope.row.id)">编辑</el-button>
								<el-button size="mini" type="warning" @click="executeTask('1',scope.row.id)">执行</el-button>
								<el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="block" align="right">
						<el-pagination v-if="totalCount>0" :current-page="currentPage" :page-sizes="[5, 10, 20, 50, 100, 200, 500]" :page-size="pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper" 
							@size-change="handleSizeChange" @current-change="handleCurrentChange" />
					</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- dialog -->
		<!-- 新增命令弹窗 -->
		<el-dialog :title="dialog.title" :visible.sync="addUserDialog" :fullscreen="true" width="70%" @close="dialogClose('form')" >
			<el-form ref="form" :rules="rules" :model="form" label-width="80px">
				<el-row>
					<el-col :span="8">
						<el-form-item label="任务名称" prop="name" label-width='100px'>
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="8">
						<el-form-item label="任务模板" prop="template">
							  <el-select v-model="form.template" filterable placeholder="请选择" @change="taskTemplate">
								<el-option
								v-for="item in options"
								:key="item.id"
								:label="item.name"
								:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col> -->
					<el-col :span="8">
						<el-form-item label="平台类型" prop="platformType" label-width='100px'>
							<el-select v-model="form.platformType" placeholder="请选择平台类型">
								<el-option
									v-for="item in platformType"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
					<el-form-item label="任务类型" prop="taskType" label-width='100px'>
						<el-select v-model="form.taskType" placeholder="请选择任务类型"  >
							<el-option
								v-for="item in taskTypeList"
								:key="item.modelType"
								:label="item.modelName"
								:value="item.modelType">
							</el-option>
						</el-select>
					</el-form-item>
					</el-col>
					
				</el-row>
				<el-row>
					<!-- <el-col :span="8">
						<el-form-item label="操作员" prop="operator">
							<el-input v-model="form.operator" ></el-input>
						</el-form-item>
					</el-col> -->
					<el-col :span="8">
						<el-form-item label="操作员" prop="operator" label-width='100px'>
							<el-input v-model="form.operator" ></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="任务级别" prop="taskRank" label-width='100px'>
							<el-select v-model="form.taskRank" placeholder="请选择任务级别">
								<el-option
									v-for="item in rank"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					
					</el-row>
				
				<el-form-item label="是否使用图形化编排" label-width='150px'>
					<el-radio v-model="graphicalArrange" label="yes" @change="modifyArrangeYes">是</el-radio>
  					<el-radio v-model="graphicalArrange" label="no" @change="modifyArrangeNo">否</el-radio>
				</el-form-item>
				<el-tabs type="border-card" v-model='arrangeValue'>
					<el-tab-pane label="普通编排" name='first' :disabled="general">
						<el-form-item label="任务模板" prop="template">
							<el-select v-model="form.template" placeholder="请选择模板" @change="taskTemplate">
								 <el-option
									v-for="item in options"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
							<h3 class="mes">节点信息  <el-button icon="el-icon-circle-plus-outline"  class="add-mes " size="small" type="success" @click="addMes()">新增</el-button></h3>
				<el-collapse v-model="activeNames" @change="handleChange">
					 <el-collapse-item :title="item.node" :name="item.step" v-for="(item, index) in form.mes" :key="index">
						 
							<el-row>
								<el-col :span="8">
									<!-- :rules="{required:true,message:'请输入节点信息',trigger:'blur'}" -->
									<el-form-item label="节点名称" :prop="'mes.'+ index+'.name'"  :rules="{required: true, message: '节点不能为空', trigger: 'blur'}" >
										<el-input v-model="item.name"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4"  :offset="8">
									<el-button style="float: right;" icon="el-icon-circle-plus-outline" size="small" type="primary" @click="copyNode(item,index)" round>复制该节点</el-button>
								</el-col>
								<el-col :span="4">
									<el-button style="float: right;" icon="el-icon-circle-close-outline" size="small" type="danger" @click="delNode(index)" round>删除该节点</el-button>
								</el-col>
							</el-row>
							
							<el-row>
							<el-col :span="8">
							<el-form-item label="输入命令">
								<el-input v-model="item.content"></el-input>
								<!-- <el-select v-model="item[index].content" filterable placeholder="请选择命令">
									<el-option
										v-for="item in options"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select> -->
							</el-form-item>
							</el-col>
							</el-row>
							
							<el-row>
					<el-col :span="8">
					<el-form-item label="选择脚本">
						<el-select v-model="form.mes[index].scriptAddressName" placeholder="请选择脚本">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					</el-col>
					<!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
						<el-button size="small" type="primary">上传脚本</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload> -->
					<el-upload
						class="upload-demo"
						:action="base_api + '/ops/api/v1/mainTask/upload '"
						:before-remove="beforeRemove"
						:on-exceed="handleExceed"
						:headers="myHeaders"
						:limit="1"
						:on-success="onSuccess"
						:show-file-list="false"
						:file-list="form.mes[index].fileList">
						<el-button size="small" type="primary" @click="btnUp(index)">点击上传</el-button>
					</el-upload>
					<!-- <el-upload ref="uploads" :auto-upload="false" class="upload-demo" :on-change="uploadChange" :action="base_api + '/cps/script/upload '" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :on-exceed="handleExceed" :limit="1">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload> -->
					</el-row>
							<el-row>
								<el-col :span="8">
									<el-form-item label="选择对象">
										<el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addObject(index)">添加对象</el-button>
										<!-- <el-popover
											placement="bottom"
											visible-arrow=true
											width="300"
											trigger="click">
											<el-tree  
												@check-change="handleCheckChange(index)" 
												node-key="id" 
												:default-checked-keys="item.resourceGroup.split(',')"  
												:data="treedata"  
												show-checkbox 
												default-expand-all
												ref="tree" 
												highlight-current 
												:props="defaultProps">
											</el-tree>
											<el-input ref="popoverInput" v-model="item.resourceGroup" slot="reference" placeholder="请选择对象类型"></el-input>
										</el-popover> -->
									</el-form-item>
								</el-col>
							</el-row>
							<!-- 标签页 -->
							<el-tag
								style="margin-left:10px"
								v-for="tag in form.mes[index].resourceGroup"
								:key="tag.name"
								closable
								@close="closeTag(tag)"
								type="success">
								{{tag.host}}-{{tag.username[0]}}
							</el-tag>
							<!-- tab切换 -->
							<!-- <el-row v-show="item.resourceGroup != ''">
								<el-form-item label="">
									<el-tabs v-model="typeName" @tab-click="tabsPolling">
										<el-tab-pane :label="datas" :name="datas" v-for="(datas,indexs) in item.resourceGroup.split(',')" :key="datas">
											<el-form-item label="用户">
												<el-input placeholder="请输入用户名"></el-input>
											</el-form-item>
										</el-tab-pane>
									</el-tabs>
								</el-form-item>
							</el-row> -->
					</el-collapse-item>
				</el-collapse>
			</el-tab-pane>

					
			<el-tab-pane label="图形编排" name='second' :disabled="graphical">
							<!-- <h3 class="mes">任务编排</h3> -->
				<div class="confInfo confInfo-mes">				
					<bpmn  :filePath.sync="fileUrl" :parentDialog="dialogCloseFlag" @sonDialogFlag="recieveDialogFlag"></bpmn>
				</div>
			</el-tab-pane>
		</el-tabs>
				
				
				
				<h3 class="execute">执行配置</h3>
				<div class="confInfo">
				
				<el-row>
					<el-col :span="24">
					<el-form-item label="执行方式" prop="way">
						 <el-radio-group v-model="form.way">
							<el-radio label="0">手动执行</el-radio>
							<el-radio label="1">周期执行</el-radio>
							<el-radio label="2">定时执行</el-radio>
						</el-radio-group>
					</el-form-item>
					</el-col>
				</el-row>	

				<el-row style="margin-left:30px" v-show="dateShow">
				    <el-form-item label="选择日期" prop="selectDate">
						<el-date-picker
							v-if="disabledDate"
							v-model="form.selectDate"
							type="datetimerange"
							value-format="yyyy-MM-dd HH:mm:ss"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期">
						</el-date-picker>
						 <!-- <el-date-picker
							v-if="disabledDate"
							v-model="form.selectDate"
							type="datetimerange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期">
						</el-date-picker> -->
						<el-date-picker
							v-else
							v-model="form.selectDatetwo"
							value-format="yyyy-MM-dd HH:mm:ss"
							type="datetime"
							placeholder="选择日期时间">
						</el-date-picker>
				    </el-form-item>
				 </el-row>
				

				<el-row style="margin-left:30px" v-show="frequencyShow">
					<el-form-item label="设置频率">
						<el-input-number v-model="form.frequency" controls-position="right"  :min="1" :max="60"></el-input-number>-
						   <el-select  v-model="form.region" placeholder="选择时间单位">
								<el-option label="天" value="天"></el-option>
								<el-option label="时" value="时"></el-option>
								<el-option label="分" value="分"></el-option>
							</el-select>/次
					</el-form-item>
				</el-row>

				<el-row>
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
				</el-row>
				
				
				<!-- <el-row>
					<el-form-item label="超时阈值">
						<el-input-number v-model="form.valueMinute" controls-position="right"  :min="0" :max="10"></el-input-number>分
						<el-input-number v-model="form.valueSecond" controls-position="right"  :min="0" :max="10"></el-input-number>秒
					</el-form-item>
				</el-row> -->
				
				<el-row>
					<el-form-item label="超时阈值" prop="overTimeDate">
						<el-input-number v-model="form.overTime" controls-position="right"  :min="1" :max="60"></el-input-number>-
						
						<el-select v-model="form.overTimeDate" placeholder="选择时间单位">
								<el-option label="天" value="天"></el-option>
								<el-option label="时" value="时"></el-option>
								<el-option label="分" value="分"></el-option>
						</el-select>
						
					</el-form-item>
				</el-row>
				
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addDialogFail('form')">取 消</el-button>
				<el-button type="primary" @click="addDialogSave('form')">保 存</el-button>
				<!-- <el-button @click="resetFromClick()">重置</el-button> -->
			</div>
		</el-dialog>
		<el-dialog title="新增对象" :visible.sync="addObjectDialog" @close="closeMainDialog('addObjectForm')">
			<el-form :model="addObjectForm" ref="addObjectForm" :rules="addObjectFormRules" style="margin:10px;width:auto;" label-width="80px">
				<el-form-item label="主机" prop="main">
					<el-select  @change="userChange"  v-model="addObjectForm.main" placeholder="请选择主机">
						<el-option v-for='(item,index) in hostIPDate' :key="index" :label="item.host" :value="item.host"></el-option>
					</el-select>
					
				</el-form-item>
				<el-form-item label="用户" prop="user">
					<el-select v-model="addObjectForm.user" placeholder="请选择用户">
						<el-option v-for='(item,index) in userInfoData' :key="index" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addObjectDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveObjectAdd('addObjectForm')">保 存</el-button>
			</div>
		</el-dialog>
		

	</div>
</template>


<script>
	import * as service from '@/modules/ops/api/ops/taskManagement/taskManagement.js'
	import * as rule from '@/modules/ops/api/rules.js'
	import bpmn from '@/components/bpmn/bpmn.vue'
	import { getToken } from '@/utils/auth'
	import { setTimeout } from 'timers';
	export default {
		
		data() {
				
			return {
				// ----------------------------------------------------------
				// 保存addObject index
				addObjectIndex : '',
				// 选择的主机数组
				hostIPDate: [],
				userInfoData:[],
				// 选择对象弹框
				addObjectDialog:false,
				// 新增主机
				addObjectForm:{
					main:'',
					user:'',
				},
				addObjectFormRules:{
					main: [
						{ required: true, message: '请选择对象类型', trigger: 'change' }
					],
					user: [
						{ required: true, message: '请选择对象类型', trigger: 'change' }
					],
				},
				// 选择对象标签页
				typeName: '',
				// base_api:'http://192.168.191.28:8082',
				// base_api:'http://localhost:9528',
				base_api:'http://192.168.127.247:12000',
				// 记录点击的时第几个上传的按钮
				upIndex:'',
				// 控制表格加载
				tableLoading:true,
				// 表格选中的行
				multipleSelection: [],
				// ----------------------------------------------------------
				fileUrl: '',
				popoverWidth:"200",
				// 控制显示哪种日期选择器
				dateShow:false,
				// 控制频率是否可选
				frequencyShow:false,
				// 控制日期选择器是否可以选择
				disabledDate:true,
				// 编辑的id
				editId: '',
				// 判断是新增还是编辑
				editBol: false,

				pageSize: 10, // 每页多少条
				currentPage: 1, // 当前页
				totalCount: '', // 总条数
				fileList:[],
				tableData:[],
				radio: '1',
				addUserDialog:false,
				value6:'',
				num1:0,
				taskDate:[],
				modelType:'',
				// 首頁查詢表單
				queryForm:{
					name:'',
					creator:'',
					modelType:'',
				},
				queryRules:{
					name:[ 
						{ validator: rule.validateCode, trigger: 'blur' },
					],
					creator:[
						{ validator: rule.validateCode, trigger: 'blur' },
					],
				},
				id:'',
				ids:'',
				value1:'',
				dialog: {
					show: false,
					title: '任务信息',
				},
				taskTypeList: [],
				activeNames: [],
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
				form: {
					// 平台类型
					platformType :"",
					template: "",
					name: "",
					region: "分",
					date1: "",
					mes: [
						// {name:'',types:"",id:"",node:"",order:"",scrip:"",typeId:""}
					],
					date2: "",
					delivery: false,
					type: [],
					taskType: "",
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
					desc: ""
				},
				rules: {
					name: [
						{ required: true, message: '请输入任务名称', trigger: 'blur' },
						{ min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
					],
					platformType: [
						{ required: true, message: '请选择平台类型', trigger: 'change' }
					],
					taskType: [
						{ required: true, message: '请选择任务类型', trigger: 'change' }
					],
					taskRank: [
						{ required: true, message: '请选择任务级别', trigger: 'change' }
					],
					overTimeDate: [
						{ required: true, message: '请选择时间单位', trigger: 'change' }
					]
				},
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
				platformType: [{
					value: 1,
					label: 'laaS层基础平台'
				}, {
					value: 2,
					label: 'paaS软件集群'
				}, {
					value: 3,
					label: 'SaaS层应用'
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				treedata: [{
					id: '192.168.127.242',
					label: '192.168.127.242',
					}, {
					id: '192.168.127.243',
					label: '192.168.127.243',
					}, {
					id: '192.168.127.244',
					label: '192.168.127.244',
					},{
						id: '192.168.127.245',
						label: '192.168.127.245',
					},{
						id: '192.168.127.246',
						label: '192.168.127.246',
					},{
						id: '192.168.127.247',
						label: '192.168.127.247',
					},{
						id: '192.168.127.248',
						label: '192.168.127.248',
				}],
				value: '',
				activeName: 'first',
				selectModel:[],
				taskModel:'',
				selectModelType:[],
				//bpmnShow: false,
				graphicalArrange: 'no',
				arrangeValue: 'first',
				general: false,
				graphical: true,

				dialogCloseFlag: false	//记录对话框有没有关闭，并将这个值传给bpmn组件使用
			};
		},

		mounted() {
			this.queryIP();
			this.queryTask();
			this.taskType();
			this.queryModel();
			this.base_api = service.request.defaults.baseURL;
		},
		updated(){
			this.isNull()
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
			// ----------------------------------------------------------
			// 选择对象弹框
			addObject(indexs) {
				console.log(indexs)
				this.addObjectIndex = indexs;
				this.addObjectDialog = true;
			},
			//IP地址查询
			queryIP() {
				service.queryIP().then(res => {
					this.hostIPDate = res.result;
					console.log(this.hostIPDate)
				})
			},
			// 主机change事件
			userChange(val) {
				console.log(val)	
				for(var i = 0 ; i<this.hostIPDate.length;i++) {
					this.addObjectForm.user = ''
					if(val == this.hostIPDate[i].host){
						this.userInfoData = this.hostIPDate[i].username
					}
				}
				
			},
			// 新增主机的保存
			saveObjectAdd(formName) {
				console.log(this.form.mes)
				console.log(this.addObjectIndex)
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const datas = this.addObjectForm
						const username = []
						username.push(datas.user)
						const tagList = {
							host:datas.main,
							username:username
						}
						this.form.mes[this.addObjectIndex].resourceGroup.push(tagList) 
						this.addObjectDialog = false
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			// 关闭弹框的毁掉
			closeMainDialog(formName) {
				this.$refs[formName].resetFields();
			},
			// 删除标签事件
			closeTag(tag) {
				this.form.mes[this.addObjectIndex].resourceGroup.splice(this.form.mes[this.addObjectIndex].resourceGroup.indexOf(tag), 1);
			},
			// 巡检指标函数
			tabsPolling(tab, event) {
				console.log(tab, event);
			},
			// 上传完成时触发的函数
			onSuccess(response, file, fileList){
				this.form.mes[this.upIndex].scriptAddress = response.result
				this.form.mes[this.upIndex].scriptAddressName = fileList[0].name
				this.form.mes[this.upIndex].isScript = "1"
			},
			// 点击上传按钮事件
			btnUp(datas) {
				this.form.mes[datas].fileList = []
				this.upIndex = datas
			},
			// 表格转换
			formatmodelType(row, column) {
				var data = ''
				var array = ['普通类型','服务启停','部署更新','自动迁移','自动巡检','诊断处理','资源调配']
				data = array[row.modelType-1]
				return data
			},
			// 日期时间转换函数
			getTime(datas) {
				this.form.selectDate = datas;
			},
			// 折叠面板函数
			handleChange(val) {
				this.activeNames = val
			},
			
			// ----------------------------------------------------------
			// 任务模板获取数据
			taskTemplateAxios() {
				service.taskTemplateAxios().then(res => {
					if(res.code == 200) {
						this.options = res.result.model
					}
					
				})
			},
			// 任务模板回调
			taskTemplate(val) {
				const _self = this
				const params = {
					id:val
				}
				service.taskTemplateClick(params).then(res => {
					console.log(res)
					var axiosData = res.result.model
					if(res.code == 200) {
						_self.form.mes= []
						console.log(_self.form)
						for(var i = 0 ; i<axiosData.templateNodes.length;i++){
							var obj = {};
							obj.node = "当前为节点 " + Number(i+1)
							obj.content = axiosData.templateNodes[i].content
							obj.isScript = axiosData.templateNodes[i].isScript
							obj.name = axiosData.templateNodes[i].name
							obj.scriptAddress = axiosData.templateNodes[i].scriptAddress
							obj.step = axiosData.templateNodes[i].step
							obj.resourceGroup= [];
							_self.form.mes.push(obj)
							this.activeNames.push(Number(i+1))
						}
						// _self.form.mes = axiosData.templateNodes;
						_self.form.platformType = axiosData.platformId;
						// _self.form.name = axiosData.name;
						_self.form.taskType = Number(axiosData.modelType) ;
					}
					
				})
				console.log(val)
			},
			// 复制该节点
			copyNode(datas,indexs) {
				console.log(datas)
				console.log(indexs)
				var obj = {};
				obj.id = datas.id;
				obj.step = datas.step;
                obj.name = datas.name;
                obj.region = datas.region;
                obj.types = datas.types;
                obj.resourceGroup= [];
				for(var i = 0 ; i < datas.resourceGroup.length; i++) {
					obj.resourceGroup.push(datas.resourceGroup[i])
				}
				console.log(datas.resourceGroup)
                obj.node = datas.node;
                obj.content = datas.content;
				obj.scriptAddress = datas.scriptAddress;
				obj.scriptAddressName = datas.scriptAddressName;
				obj.fileList = datas.fileList;
				obj.isScript = datas.isScript;
				obj.user = datas.user;
				// this.form.mes.push(obj);
				this.form.mes.splice(indexs+1,0,obj);
				console.log(this.form.mes)
				this.activeNames = []
				for(var i = 0 ; i < this.form.mes.length ; i ++){
					this.form.mes[i].node = "当前为节点 " + Number(i+1)
					this.activeNames.push(Number(i+1))
					this.form.mes[i].step = Number(i+1)
					this.form.mes[i].id = Number(i+1)
				}
			},
			// 删除节点的函数
			delNode(indexs) {
				this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
					this.form.mes.splice(indexs, 1); 
					for(var i = 0 ; i < this.form.mes.length ; i ++){
						this.form.mes[i].node = "当前为节点 " + Number(i+1)
					}
					for(var i = 0 ; i < this.form.mes.length ; i ++){
						this.form.mes[i].step = i+1
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
			// 重置表单数据的函数
			resetForm() {
				this.form.template= "";
				this.form.name= "";
				this.form.region= "分";
				this.form.date1= "";
				this.form.mes= [
					// {sname:'',types:"",id:"",node:"",order:"",scrip:"",typeId:""}
				];
				this.form.date2= "";
				this.form.delivery= false;
				this.form.type= [];
				this.form.taskType= "";
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
			//表单保存
			saveFrom(){
				console.log(this.form)
				// 隐藏表单弹框
				addMesTypeDialog = false
				
			},
			// 获取所有被选中的节点
			// 树形图被点击的回调
			handleCheckChange(datas, checked, indeterminate,indexs) {
				this.form.mes[datas].types = ''
				this.form.mes[datas].resourceGroup = []
				const userS = this.form.mes[datas].user
				this.form.mes[datas].user = []

				for(var i = 0;i<this.$refs.tree[datas].getCheckedNodes().length;i++){

					console.log(this.$refs.tree[datas].getCheckedNodes()[i].id)
					this.form.mes[datas].user.push({'name':this.$refs.tree[datas].getCheckedNodes()[i].id})
					this.form.mes[datas].resourceGroup += this.$refs.tree[datas].getCheckedNodes()[i].id  +','
					this.form.mes[datas].types += this.$refs.tree[datas].getCheckedNodes()[i].label +','
					this.typeName = this.$refs.tree[datas].getCheckedNodes()[i].label
				}
				this.form.mes[datas].types = this.form.mes[datas].types.substr(0, this.form.mes[datas].types.length - 1);  
				this.form.mes[datas].resourceGroup = this.form.mes[datas].resourceGroup.substr(0, this.form.mes[datas].resourceGroup.length - 1);  

			},
			// 首頁表單查询
			queryTaskClick(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.tableLoading = true;
						const params = {
							modelType:this.queryForm.modelType,
							name:this.queryForm.name,
							creator:this.queryForm.creator,
							start: (this.currentPage - 1) * this.pageSize,
							limit: this.pageSize
						}
						// this.queryModel()
						service.queryTask(params).then(res => {
							const datas = res.result.list;
							for(var i = 0 ; i < datas.length;i++) {
								for(var j = 0 ;j<datas[i].taskNodes.length;j++){
									console.log(datas[i].taskNodes[j].scriptAddress)
									if(datas[i].taskNodes[j].scriptAddress !== null) {
										datas[i].taskNodes[j].scriptAddress = datas[i].taskNodes[j].scriptAddress.substring(datas[i].taskNodes[j].scriptAddress.lastIndexOf('\\') + 14,datas[i].taskNodes[j].scriptAddress.length)
									}
								}
							}
							this.tableData = datas;
							this.totalCount = res.result.count;
							this.tableLoading = false;
							
						})
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//表单查询
			queryTask() {
				
				this.tableLoading = true;
				const params = {
					modelType:this.queryForm.modelType,
					name:this.queryForm.name,
					creator:this.queryForm.creator,
					start: (this.currentPage - 1) * this.pageSize,
					limit: this.pageSize
				}
				// this.queryModel()
				service.queryTask(params).then(res => {
					const datas = res.result.list;
					for(var i = 0 ; i < datas.length;i++) {
						for(var j = 0 ;j<datas[i].taskNodes.length;j++){
							console.log(datas[i].taskNodes[j].scriptAddress)
							if(datas[i].taskNodes[j].scriptAddress !== null) {
							datas[i].taskNodes[j].scriptAddress = datas[i].taskNodes[j].scriptAddress.substring(datas[i].taskNodes[j].scriptAddress.lastIndexOf('\\') + 14,datas[i].taskNodes[j].scriptAddress.length)
								
							}
						}
					}
					this.tableData = datas;
					this.totalCount = res.result.count;
					this.tableLoading = false;
					
				})
			},
			
			//模板查询
			queryModel() {
				
				service.queryModel().then(res => {
					console.log(res)
					this.selectModel = res.result.list;
				})
			},
			
			//模板查询
			queryModelType() {
				const params = {
					
				}
				service.queryModelType().then(res => {
					this.selectModelType = res.result;
				})
			},
			
			//任务类型查询
			taskType() {
				service.taskType().then(res => {
					this.taskDate=res.result
				})
			},
			//tab切换
			handleClick(tab, event) {
				console.log(tab, event);
			},
			//删除单条信息
			handleDelete(id) {
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
						this.queryTask()
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
				console.log(this.multipleSelection)
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
							_self.queryTask()
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
					ids:ids.join(',')
				}
				service.executeTask(data).then(res=>{
					this.$message({
							type: 'success',
							message: res.msg
						})
					this.queryTask()
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
				
				let data = {
					ids:ids.join(',')
				}
				service.taskCusCopy(data).then(res=>{
					this.$message({
							type: 'success',
							message: res.msg
						})
					this.queryTask()
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
			
			//分页条数设置
			handleSizeChange(val) { // 设置每页多少条
				this.pageSize = val
				this.queryTask()
			},
			//当前页
			handleCurrentChange(val) { // 当前页
				this.currentPage = val
				this.queryTask()
			},
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
				// 获取任务模板接口
				this.taskTemplateAxios()
				this.addUserDialog = true
				// 任务类型接口
				service.taskType().then(res => {
					this.taskTypeList = res.result
				})
				// 选择命令接口
				// service.taskType().then(res => {
				// 	this.taskTypeList = res.result
				// })
			},
			// 新增弹出框点击关闭或阴影
			dialogClose(formName) {
				this.$refs[formName].resetFields();
				this.addUserDialog = false;
				this.dialogCloseFlag = true;
				
			},
			//新增弹出框取消
			addDialogFail(formName) {
				this.$refs[formName].resetFields();
				this.addUserDialog = false
			},
			// 打开编辑
			editTaskHTML(ids) {
				
				
				// 任务类型接口
				service.taskType().then(res => {
					
					this.taskTypeList = res.result
					const params = {
						id: ids
					};
					service.editTaskCusOpen(params).then(res => {
						console.log(res)
						// 表单重置函数
						this.resetForm()
						this.editBol = true
						this.editId = ids
						this.createTime = res.result.createTime
						var overTime = eval('(' + res.result.param + ')').over_time
						console.log(overTime)
						overTime = overTime.substring(0, overTime.length - 1);  
						var overTimeDate = eval('(' + res.result.param + ')').over_time
						var strs=overTimeDate.split(""); //字符分割 
						for (var i=0;i<strs.length ;i++ ) {
							overTimeDate = strs[i]
						}
						this.addUserDialog = true;
						const datas = res.result;
						for(var j = 0 ;j<datas.taskNodes.length;j++){
							if(datas[i].taskNodes[j].scriptAddress !== null) {
								datas.taskNodes[j].scriptAddressName = datas.taskNodes[j].scriptAddress.substring(datas.taskNodes[j].scriptAddress.lastIndexOf('\\') + 14,datas.taskNodes[j].scriptAddress.length)
							}
						}
						
						this.form.mes = res.result.taskNodes;
						this.form.platformType = res.result.platformId;
						this.form.taskType = Number(res.result.modelType) ;
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
						for(var i = 0 ; i < this.form.mes.length ; i ++){
							this.form.mes[i].node = "当前为节点 " + Number(i+1)
							this.activeNames.push(i+1)
							this.form.mes[i].step = i+1
						}
					})
				})
			},
			// 新增命令弹框的保存
			addDialogSave(formName) {
				
				this.$refs[formName].validate((valid) => {
					if (valid) {
						
						var dateIndex = ''
						var dateIndexTwo = ''
						var frequencydata = ''
						if(this.form.way == 2) {
							dateIndex = this.form.selectDatetwo
						}
						if(this.form.way == 1){
							dateIndex = this.form.selectDate[0] 
							dateIndexTwo = this.form.selectDate[1] 
							frequencydata = this.form.frequency+""+this.form.region+"/次"
						}
						
						const param = {
							task_level: this.form.taskRank,
							over_time: this.form.overTime+""+this.form.overTimeDate
						};
						const jsonStr = JSON.stringify(param);
						// for(var i = 0 ; i < this.form.mes.length ; i++ ){
						// 	const mesData = JSON.stringify(this.form.mes[i].resourceGroup);
						// 	this.form.mes[i].resourceGroup = mesData
						// }
						const params = {
							platformId: this.form.platformType,
							modelType:this.form.taskType,
							name:this.form.name,
							taskNodes:this.form.mes,
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
							service.editTaskCus(params).then(res => {
								console.log(1)
								this.queryTask();
								this.resetForm();
								this.addUserDialog = false
								console.log(res)
							})
						}else {
							if(this.fileUrl) params.scriptAddress = this.fileUrl
							service.AddTaskCus(params).then(res => {
								console.log(2)
								this.queryTask();
								this.resetForm();
								this.addUserDialog = false
								console.log(res)
							})
						}
						
						console.log(params)
						
					} else {
					console.log('error submit!!');
						return false;
					}
				});
				
			},
			// 新增配置信息
			addMes() {
				var obj = {};
				obj.id = "";
				obj.step = "";
                obj.name = "";
                obj.region = "";
                obj.types = "";
                obj.resourceGroup= [];
                obj.node = "";
                obj.content = "";
				obj.scriptAddress = "";
				obj.scriptAddressName = "";
				obj.fileList = [];
				obj.isScript = "0";
				obj.user = [];
				this.activeNames = [];
				this.form.mes.push(obj);
				console.log(this.form.mes)
				// this.activeNames.push(this.form.mes.length)
				for(var i = 0 ; i < this.form.mes.length ; i ++){
					this.form.mes[i].node = "当前为节点 " + Number(i+1)
					this.activeNames.push(Number(i+1))
					this.form.mes[i].step = Number(i+1)
					this.form.mes[i].id = Number(i+1)
				}

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
			//通过控制bpmnShow的值来控制bpmn组件
			isNull(){
				// if(this.form.name){
				// 	this.bpmnShow = true
				// }
			},

			//修改arrangeValue
			modifyArrangeYes(){
				this.arrangeValue = 'second';
				this.general = true;
				this.graphical = false;
			},
			modifyArrangeNo(){
				this.arrangeValue = 'first';
				this.general = false;
				this.graphical = true;
			},

			//接收子组件的值(用于重新将dialogCloseFlag重新初始化为false)
			recieveDialogFlag(sonDialogFlag){
				//console.log('before--dialogCloseFlag:'+this.dialogCloseFlag);
				this.dialogCloseFlag = sonDialogFlag;
				//console.log('after--dialogCloseFlag:'+this.dialogCloseFlag)
			}
		},
		watch:{
			'form.way': function(newVal){
				console.log(newVal)
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
      'fileUrl': {
      handler(newValue, oldValue) {
        // this.myPath = newValue
        console.log('fileUrl',newValue);
        // changeRuleScript(myRuleId)
      },
       deep: true
    },
    // 'options':{
    // 	handler(newValue, oldValue) {
    //     console.log('optionsAAA',newValue);
    //   },
    //    deep: true
    // }
		},
		components: {bpmn},
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
	.confInfo {
		margin-top: 5px;
		border-top: 1px solid #ddd;
		width: 100%;
	}
	.mes {
		height: 32px;
	}
	.add-mes {
		float: right;
	}
	.confInfo-mes {
		height:500px;
		border: 1px solid #dcdfe6;
    	padding: 15px;
	}
	.execute {
		margin-top: 20px;
	}
</style>