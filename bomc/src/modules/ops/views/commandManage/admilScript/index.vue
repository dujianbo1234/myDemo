<template>
	<div class='container'>
		<el-tabs v-model="aName">
			<el-tab-pane label="编辑脚本" name="first">
				<el-container>
					<el-aside width="350px" style="padding: 10px;" >
						<div class="RightRow">
							<el-card>
							<el-row style="padding: 10px 10px;">
								<el-col :span="21">
									<el-input id="inputStyleCss"  
										v-model="searchScriptInput" 
										@keyup.enter.native="searchScript" 
										placeholder="搜索脚本">
										<i slot="prefix" class="iconfont add_yw2">&#xe623;</i>
									</el-input>
								</el-col>
								<!-- <el-col :span="10"> -->
									<!-- <el-button size="mini" type="primary" icon="el-icon-search" @click="searchScript" style="margin-left: 5px;height: 36px;"></el-button> -->
									<!-- <el-button size="mini" type="success" icon="el-icon-circle-plus-outline" @click="addNewTab()" style="height: 36px;"></el-button> -->
								<i class="iconfont add_yw"  @click="addNewTab()">&#xe64b;</i>
								<!-- </el-col> -->
							</el-row>
							<br/>
							<el-row>
								<!-- :default-expanded-keys="unfoldTreeIs" -->
								<el-tree :data="scriptData" node-key="id" :default-expanded-keys="unfoldTreeIs"  @node-click="addUpdateTab">
									<span class="custom-tree-node" slot-scope="{ node, data }">
										<span>{{ data.object.name }}</span>
									<span>
									<el-button v-if="data.object.path" type="text" size="mini" @click="() => remove(node, data)">
										<i class="iconfont tree_del">&#xe63b;</i>
									</el-button>
								</span>
									</span>
								</el-tree>
							</el-row>
							<br/>
							</el-card>
						</div>
					</el-aside>
						
					<el-main style="padding-top: 10px;"  class="logAdd-dialog opt">
						<div class="RightRow">
							<el-card>
								<div class="details-title">
									<div>
									<el-form :rules="editFormRules" :inline="true" :model="editForm" label-position="right" label-width="90px" size="small" ref="editForm" style="text-align:left;">
										<span class="sp"><span>编辑脚本</span></span>
										<div class="logAdd-obj">
											<el-form-item label="脚本名称" prop="scriptName">
												<el-input :disabled="updateId == ''" v-model="editForm.scriptName"  placeholder="请输入脚本名称"></el-input>
											</el-form-item>
											<el-form-item label="脚本类型" prop="scriptTypeId">
												<el-select :disabled="updateId == ''" v-model="editForm.scriptTypeId" placeholder="请选择脚本类型" >
													<el-option v-for="team in allScriptTypes" :key="team.scriptTypeId" :label="team.scriptTypeName" :value="team.scriptTypeId">
													</el-option>
												</el-select>
											</el-form-item>
											<el-form-item label="平台类型" prop="formType">
												<el-cascader :disabled="updateId == ''" :options="cascaderIndex" v-model="editForm.formType" placeholder="请选择平台类型" clearable :props="props" @change="cascaderIndexChange">
												</el-cascader>
											</el-form-item>
											<el-form-item label="脚本参数" prop="scriptParams">
												<el-input :disabled="updateId == ''" v-model="editForm.scriptParams" placeholder="请输入脚本参数"></el-input>
											</el-form-item>
											<el-form-item label="脚本说明" prop="desc">
												<el-input :disabled="updateId == ''" v-model="editForm.desc" placeholder="请输入脚本说明"></el-input>
											</el-form-item>
											<el-form-item>
												<el-upload :disabled="updateId == ''" class="upload-demo" :headers="myHeaders" accept="sh" action='/cps/api/v1/script/upload' :on-preview="handlePreview" :beforeUpload="beforeAvatarUpload" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-error="onError" :on-success="editOnSuccess" :file-list="editForm.fileList">
													<el-button :disabled="updateId == ''" size="small" type="text" class="under_line" title="请上传sh.pl.sql.pl脚本文件">上传脚本</el-button>
													<!-- <el-button :disabled="updateId == ''" size="small" type="success" title="请上传sh.pl.sql.pl脚本文件">上传脚本</el-button> -->
												</el-upload>
											</el-form-item>
											<el-form-item label="编辑脚本" prop="scriptContent" style="width:97%">
												<el-input :disabled="updateId == ''" type="textarea" v-model="editForm.scriptContent" :autosize="{ minRows: 10, maxRows: 10}"  required></el-input>
											</el-form-item>
										</div>
									</el-form>
									</div>
								</div>
								<div class="details-title">
									<div class="sBtn">
										<el-button :disabled="updateId == ''" class="finish" @click="editSubmitForm('editForm')">保存</el-button>
									</div>
								</div>
							</el-card>
						</div>
						
						<!-- <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-row>
								<el-form-item label="脚本名称" prop="scriptName">
									<el-input v-model="ruleForm.scriptName" style='min-width: 360px;' placeholder="请输入脚本名称"></el-input>
								</el-form-item>
								<el-form-item label="脚本类型" prop="scriptTypeId">
									<el-select v-model="ruleForm.scriptTypeId" placeholder="请选择脚本类型" style='min-width: 360px;'>
										<el-option v-for="team in allScriptTypes" :key="team.scriptTypeId" :label="team.scriptTypeName" :value="team.scriptTypeId">
										</el-option>
									</el-select>
								</el-form-item>
							</el-row>
							<el-row>
								<el-form-item label="平台类型" prop="formType">
									<el-cascader style='min-width:360px;' :options="cascaderIndex" v-model="ruleForm.formType" placeholder="请选择平台类型" clearable :props="props" @change="cascaderIndexChange">
									</el-cascader>
								</el-form-item>
								<el-form-item label="脚本参数" prop="scriptParams">
									<el-input v-model="ruleForm.scriptParams" style="min-width:360px" placeholder="请输入脚本参数"></el-input>
								</el-form-item>
							</el-row>
							<el-row>
								<el-form-item label="脚本说明" prop="desc">
									<el-input v-model="ruleForm.desc" style='min-width: 600px;' placeholder="请输入脚本说明"></el-input>
								</el-form-item>
								<el-form-item>
									<el-upload class="upload-demo" :headers="myHeaders" accept="sh" action='/cps/api/v1/script/upload' :on-preview="handlePreview" :beforeUpload="beforeAvatarUpload" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-error="onError" :on-success="onSuccess" :file-list="ruleForm.fileList">
										<el-button size="small" type="success" title="请上传sh.pl.sql.pl脚本文件">上传脚本</el-button>
									</el-upload>
								</el-form-item>
							</el-row>
							<el-row>
								<el-form-item label="编辑脚本" prop="scriptContent">
									<el-input type="textarea" v-model="ruleForm.scriptContent" :autosize="{ minRows: 10, maxRows: 10}" style='min-width: 800px;' required></el-input>
								</el-form-item>
							</el-row>
							<el-row style="margin: 0 35%;">
								<el-button type="success" @click="submitForm('ruleForm')" :disabled="mydisabled">保存</el-button>
							</el-row>
						</el-form> -->
					</el-main>

				</el-container>
			</el-tab-pane>
			<el-tab-pane label="执行脚本" name="second">
				<div class="RightRow1">
					<el-row>
						<el-col>
							<el-card>
								<el-form :inline="true" :model='formHistory' label-position="right" label-width="70px" size="small">
									<el-form-item label="脚本名称" prop="scriptName">
										<el-input v-model="formHistory.scriptName" style="width: 210px;"></el-input>
									</el-form-item>
									<el-form-item label="操作人" prop="createName">
										<el-input v-model="formHistory.createName" style="width: 210px;"></el-input>
									</el-form-item>
									<el-button class="search_btn" @click="btnHistory(formHistory)" style="margin-left:10px;">查询</el-button>
									<el-button class="opt_btn" @click="resetChongZhi('formHistory')">重置</el-button>
									<i class="iconfont step_btn" v-bind:class="[isShowing ? blurClass : '',bkClass]" @click="arrowTest()">&#xe619;</i>
									<!--<i class="iconfont step_btn" @click="arrowTest1()">&#xe615;</i>-->
									<div ref="schItemShow2" class="schItemShow">
										<el-form-item label="主机名称" prop="hostName">
											<el-input v-model="formHistory.hostName" style="width: 210px;"></el-input>
										</el-form-item>
									</div>

								</el-form>

							</el-card>
						</el-col>
					</el-row>
					<el-row style="margin-top: 20px;">
						<el-col>
							<el-card>
								<div class="buttonItem">
									<el-button class="search_btn" @click="addScript()">执行脚本 </el-button>
									<el-button class="opt_btn del_btn" @click="deleteAll()">批量删除</el-button>
								</div>
							</el-card>
						</el-col>
					</el-row>
					<el-table :data="historyData" @selection-change="handleSelectionChange" :default-sort="{order: 'ascending'}">
						<el-table-column type="selection">
						</el-table-column>
						<el-table-column prop="name" align='center' label="脚本名称">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="targetHost" align='center' label="主机名称">
						</el-table-column>
						<el-table-column prop="creator" align='center' label="操作人">
						</el-table-column>
						<el-table-column prop="startTime" align='center' label="开始时间">
						</el-table-column>
						<el-table-column prop="endTime" align='center' label="结束时间" width="160px">
						</el-table-column>
						<el-table-column prop="state" label='执行状态' width="80" align='center'>
							<template slot-scope="scope">
								<div v-if='scope.row.state==0' title="任务运行中">
									<img :src="jjImg" alt="任务运行中">
								</div>
								<div v-if='scope.row.state==1' title="任务就绪">
									<img :src="ddImg" alt="任务就绪">
								</div>
								<div v-if='scope.row.state==2' title="任务完成">
									<img :src="runImg" alt="任务完成">
								</div>
								<div v-if='scope.row.state==3' title="任务暂停">
									<img :src="zdImg" alt="任务暂停">
								</div>
								<div v-if='scope.row.state==4' title="任务出错">
									<img :src="stopImg" alt="任务出错">
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="executeResult" align='center' label="执行结果">
							<template slot-scope="scope">
								<el-popover trigger="hover" v-if="scope.row.resolveResult" placement="top-start" width="500">
									<el-card style="overflow:scroll" v-for="(item,index) in JSON.parse(scope.row.resolveResult)" :key="index">
										<pre><span style="color:red">主机:</span>{{item.host}}</pre>
										<pre><span style="color:red">结果:</span>{{item.msg}}</pre>
										<pre><span style="color:red">状态:</span>{{item.state}}</pre>
										<br/>
									</el-card>
									<div slot="reference" class="name-wrapper">
										<i class="el-icon-view" :percentage="scope.row.resolveResult"></i>
									</div>
								</el-popover>
								<el-tag v-else type="info">无数据</el-tag>
							</template>
						</el-table-column>

						<el-table-column align='center' label="操作">
							<template slot-scope="scope">
								<span class="table_btn" @click="continueOne(scope.row.taskId)">重新执行</span>
								<span class="table_btn" @click="handleDelete(scope.row.taskId)">删除</span>
							</template>
						</el-table-column>
					</el-table>
					<div class="block" align="right">
						<el-pagination v-if="totalCount>0" :current-page="currentPage" :page-sizes="[ 10, 20, 30, 40, 50]" :page-size="pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
					</div>
				</div>
				<el-dialog :title="dialog.title" :visible.sync="addUserDialog" @close="closeAdd">
					<el-form :model="addForm" ref="addForm" :rules="addFormRules" style="margin:10px;width:600;">
						<el-form-item label="平台类型" required :label-width="formLabelWidth" placeholder="请选择平台类型">
							<el-cascader style='min-width: 400px;' :options="toTaskType" v-model="addForm.taskScriptName" placeholder="请选择平台类型" clearable :props="props" @change="scriptOptionsChange(addForm.taskScriptName)">
							</el-cascader>
						</el-form-item>
						<el-form-item label="选择脚本" :label-width="formLabelWidth" sortable required>
							<el-select v-model="addForm.allScript" clearable placeholder="请选择脚本" prop="allScript" style='min-width: 400px;' @change="scriptChange(addForm.allScript)">
								<el-option v-for="item in allScripts" :label="item.name" :value="item.name" :key="item.name">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="脚本参数" :label-width="formLabelWidth" sortable prop="scriptParm">
							<el-input placeholder="请输入脚本参数" v-model="addForm.scriptParm" style='min-width: 400px;'>
							</el-input>
						</el-form-item>
						<el-form-item label="目标主机" required :label-width="formLabelWidth" sortable>
							<el-select v-model="addForm.allHost" multiple collapse-tags clearable placeholder="请选择主机" style='min-width: 400px;' prop="allHost" @change="hostChange(addForm.allHost)">
								<el-option v-for="item in hostIPDate" :label="item" :value="item" :key="item.name">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="默认超时" :label-width="formLabelWidth" prop="timeOut">
							<el-input-number v-model="addForm.timeOut" controls-position="right" :min="0" :max="600" style='min-width: 400px;'>
							</el-input-number>秒
						</el-form-item>
						<el-form-item style="text-align: center;">
							<el-button type="success" @click="saveAddInfo('addForm')">执行</el-button>
							<el-button @click="addDialogFail('addForm')">取 消</el-button>
						</el-form-item>
					</el-form>
				</el-dialog>
			</el-tab-pane>
		</el-tabs>

		<!-- <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-row>
				<el-form-item label="脚本名称" prop="scriptName">
					<el-input v-model="ruleForm.scriptName" style='min-width: 360px;' placeholder="请输入脚本名称"></el-input>
				</el-form-item>
				<el-form-item label="脚本类型" prop="scriptTypeId">
					<el-select v-model="ruleForm.scriptTypeId" placeholder="请选择脚本类型" style='min-width: 360px;'>
						<el-option v-for="team in allScriptTypes" :key="team.scriptTypeId" :label="team.scriptTypeName" :value="team.scriptTypeId">
						</el-option>
					</el-select>
				</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="平台类型" prop="formType">
					<el-cascader style='min-width:360px;' :options="cascaderIndex" v-model="ruleForm.formType" placeholder="请选择平台类型" clearable :props="props" @change="cascaderIndexChange">
					</el-cascader>
				</el-form-item>
				<el-form-item label="脚本参数" prop="scriptParams">
					<el-input v-model="ruleForm.scriptParams" style="min-width:360px" placeholder="请输入脚本参数"></el-input>
				</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="脚本说明" prop="desc">
					<el-input v-model="ruleForm.desc" style='min-width: 600px;' placeholder="请输入脚本说明"></el-input>
				</el-form-item>
				<el-form-item>
					<el-upload class="upload-demo" :headers="myHeaders" accept="sh" action='/cps/api/v1/script/upload' :on-preview="handlePreview" :beforeUpload="beforeAvatarUpload" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-error="onError" :on-success="onSuccess" :file-list="ruleForm.fileList">
						<el-button size="small" type="success" title="请上传sh.pl.sql.pl脚本文件">上传脚本</el-button>
					</el-upload>
				</el-form-item>
			</el-row>
			<el-row>
				<el-form-item label="编辑脚本" prop="scriptContent">
					<el-input type="textarea" v-model="ruleForm.scriptContent" :autosize="{ minRows: 10, maxRows: 10}" style='min-width: 800px;' required></el-input>
				</el-form-item>
			</el-row>
			<el-row style="margin: 0 35%;">
				<el-button type="success" @click="submitForm('ruleForm')" :disabled="mydisabled">保存</el-button>
			</el-row>
		</el-form> -->


		<el-dialog :close-on-click-modal="false" :visible.sync="addScriptDialog" width='64%' @close="dialogClose('addForm')" class="logAdd-dialog opt">
			<div class="details-title">
				<div>
				<el-form :rules="addFormRules" :inline="true" :model="addForm" label-position="right" label-width="90px" size="small" ref="addForm" style="text-align:left;">
					<span class="sp"><span>新增脚本</span></span>
					<div class="logAdd-obj">
						<el-form-item label="脚本名称" prop="scriptName">
							<el-input v-model="addForm.scriptName"  placeholder="请输入脚本名称"></el-input>
						</el-form-item>
						<el-form-item label="脚本类型" prop="scriptTypeId">
							<el-select v-model="addForm.scriptTypeId" placeholder="请选择脚本类型">
								<el-option v-for="team in allScriptTypes" :key="team.scriptTypeId" :label="team.scriptTypeName" :value="team.scriptTypeId">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="平台类型" prop="formType">
							<el-cascader  :options="cascaderIndex" v-model="addForm.formType" placeholder="请选择平台类型" clearable :props="props" @change="cascaderIndexChange">
							</el-cascader>
						</el-form-item>
						<el-form-item label="脚本参数" prop="scriptParams">
							<el-input v-model="addForm.scriptParams" placeholder="请输入脚本参数"></el-input>
						</el-form-item>
						<el-form-item label="脚本说明" prop="desc">
							<el-input v-model="addForm.desc"  placeholder="请输入脚本说明"></el-input>
						</el-form-item>
						<el-form-item>
							<el-upload class="upload-demo" :headers="myHeaders" accept="sh" action='/cps/api/v1/script/upload' :on-preview="handlePreview" :beforeUpload="beforeAvatarUpload" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-error="onError" :on-success="addOnSuccess" :file-list="addForm.fileList">
								<el-button size="small" type="text" class="under_line" title="请上传sh.pl.sql.pl脚本文件">上传脚本</el-button>
							</el-upload>
						</el-form-item>
						<el-form-item label="编辑脚本" prop="scriptContent" style="width:97%">
							<el-input type="textarea" v-model="addForm.scriptContent" :autosize="{ minRows: 10, maxRows: 10}"  required></el-input>
						</el-form-item>
					</div>
				</el-form>
				</div>
			</div>
			<div class="details-title">
				<div class="sBtn">
					<el-button class="cancel" @click="dialogClose('addForm')">取消</el-button>
					<el-button class="finish" @click="addSubmitForm('addForm')">保存</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import * as service from '@/modules/ops/api/ops/commandManage/admilManage.js'
	import { getToken } from '@/utils/auth'
	import { Message, MessageBox } from 'element-ui'
	import runImg from '@/assets/images/run.png'
	import stopImg from '@/assets/images/stop.png'
	import ddImg from '@/assets/images/major.png'
	import zdImg from '@/assets/images/waiting.png'
	import jjImg from '@/assets/images/connmon.png'
	export default {
		data() {
			return {
				timer:1,
				allScriptTypes: [],
				scriptAddress: '',
				myclosable: true,
				allScripts: [],
				toTaskType: [],
				myOptions: [],
				multipleSelection: [],
				formTypeData: [],
				addUserDialog: false,
				doServiceData: [],
				pageSize: 10, // 每页多少条
				currentPage: 1, // 当前页
				totalCount: '', // 总条数
				mydisabled: false,
				isShowing: false,
				bkClass: 'bk',
				blurClass: 'blur',
				runImg: runImg,
				jjImg: jjImg,
				ddImg: ddImg,
				zdImg: zdImg,
				stopImg: stopImg,
				aName: "first",
				props: {
					value: 'id',
					label: 'object'
				},
				myoption: {
					value: 'pId',
					label: 'pId'
				},
				/*el-aside区域的数据*/
				fileList: [],
				//脚本记录显示相关的数据
				/*el-main区域的数据*/
				id: '',
				dialog: {
					show: false,
					title: '执行脚本',
				},
				formHistory: {
					scriptName: '',
					createName: '',
					hostName: ''
				},
				scriptPath: '',
				// -------------------------------
				// 搜索脚本val
				searchScriptInput: '',

				// 记录自动删除tab的name
				tabDel: '1',
				editableTabsValue2: '1',
				editableTabs2: [{
					title: '未命名脚本 ',
					fileList: [],
					name: '1',
					scriptContent: '',
					id: null,
					

				}],
				ruleForm: {
					scriptName: '',
					desc: '',
					scriptParams: '',
					formType: [],
					scriptTypeId: ''
				},
				rules: {
					scriptName: [{
						required: true,
						message: '请输入脚本名称',
						trigger: 'blur'
					}],
					formType: [{
						required: true,
						message: '请输入平台类型',
						trigger: 'blur'
					}],
				},
				tabIndex: 1,
				newTabIndex: 1,
				updateTabIndex: 1,
				// -------------------------------
				scriptData: [],
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					mes: [
						// {name:'',types:"",id:"",node:"",order:"",scrip:"",typeId:""}
					],
				},
				// 行内表单数据
				formInline: {
					formType: [],
				},
				// 记录点击的时第几个上传的按钮
				upIndex: '',
				treeArr: [],
				unfoldTreeIs: [],
				// 新增主机弹框
				addMainDialog: false,
				// 新增平台类型
				cascaderIndex: [],
				// 选择的主机数组
				hostIPDate: [],
				userInfoData: [],
				scriptContent: '',
				formLabelWidth: '120px',
				//用于刷新请求的Id
				freshId: 0,
				//用保存修改请求的Id
				updateId: '',
				//用于存储脚本的路径
				path: '',
				//用于记录是增加新增标签页还是增加修改标签页
				newTabFlag: true,
				updateTabFlag: false,

				//用于记录要新增的标签页是否在标签栏中已经打开
				hasScriptName: false,

				originalTabsLength: 1, //删除前标签页的长度
				middleRirhtDelete: false, //记录从中间往右删除的状态
				rightLeftDelete: false, //记录从左往右删除的状态

				/*历史执行记录相关数据*/
				history: false, // 控制历史记录弹框
				tableLoading: true, // 控制历史记录表格加载
				historyData: [], // 存储从后台返回的历史执行记录
				midDeleteIndex: 1, // 记录删除中间的第几个标签

				//执行脚本弹框数据
				addForm: {
					scriptName:'',
					scriptTypeId:'',
					formType:[],
					scriptParams:'',
					desc:'',
					fileList:[],
					scriptContent:'',
					scriptAddress:'',
				},
				addFormRules: {
					scriptName: [{
						required: true,
						message: '请输入脚本名称',
						trigger: 'blur'
					}],
					scriptTypeId: [{
						required: true,
						message: '请输入平台类型',
						trigger: 'change'
					}],
					formType: [{
						required: true,
						message: '请输入平台类型',
						trigger: 'blur'
					}],
				},

				editForm: {
					scriptName:'',
					scriptTypeId:'',
					formType:[],
					scriptParams:'',
					desc:'',
					fileList:[],
					scriptContent:'',
					scriptAddress:'',
				},
				editFormRules: {
					scriptName: [{
						required: true,
						message: '请输入脚本名称',
						trigger: 'blur'
					}],
					scriptTypeId: [{
						required: true,
						message: '请输入平台类型',
						trigger: 'change'
					}],
					formType: [{
						required: true,
						message: '请输入平台类型',
						trigger: 'blur'
					}],
				},

				// 
				addScriptDialog: false,
			}
		},
		mounted() {
			this.queryIndexCascader()
			this.searchScript()
			this.btnHistory();
			this.queryIP();
			this.queryScript();
			this.timerFn();
			// this.getScriptData(params);
		},
		updated() {

		},
		 beforeDestroy() {
			Message.closeAll()
			this.timer = -1
      		// clearInterval(this.timer);
   		 },
		watch: {
			// aName(val) {
			// 	console.log(val)
			// 	if(val == 'second') {
			// 		this.timer=setInterval(() => {
			// 			this.btnHistory();
			// 		}, 5000)
			// 		console.log("执行")
			// 	} else if(val == 'first') {
			// 		clearInterval(this.timer);
			// 		console.log("编辑")
			// 	}
			// },
			
		},
		computed: {
			myHeaders: function() {
				// `this` 指向 vm 实例
				const datas = {
					'X-Token': getToken()
				}
				return datas
			}
		},
		methods: {
			// axios轮循
			timerFn(){
				var _self = this
				_self.timer++
				if(_self.timer>0){
					setTimeout(function(){
						_self.btnHistory();
						_self.timerFn()
					},5000)
				}
			},
			//脚本类型查询
			queryScript() {
				service.queryScriptType().then(res => {
					this.allScriptTypes = res
				})

			},
			//平台类型查询
			queryIndexCascader() {
				const params = {
					level: 3
				}
				service.queryIndexCascader(params).then(res => {
					this.cascaderIndex = res;
					this.toTaskType = res;
				})
			},
			cascaderIndexChange(val) {},
			//执行脚本选择平台类型
			scriptOptionsChange(type) {
				if(type) {
					console.log(type)
					const pTypes = {
						platformId: type[0],
						resourceClassId: type[1],
						resourceTypeId: type[2],
					}
					service.queryTaskScript(pTypes).then(res => {
						console.log(res);
						if(res.result.length > 0) {
							this.allScripts = res.result;
						} else {
							this.$message({
								type: 'info',
								message: '当前平台类型无脚本请重新选择'
							})
							this.allScripts = [];
						}
						this.addForm.allScript = '';
						this.addForm.scriptParm = '';

					})
				}
			},
			scriptChange(name) {
				console.log(name)
				if(name != '') {
					for(var n = 0; n < this.allScripts.length; n++) {
						if(name == this.allScripts[n].name) {
							console.log(this.allScripts[n].name)
							this.addForm.scriptParm = this.allScripts[n].param;
							this.scriptPath = this.allScripts[n].path;
						}
					}
				} else {
					this.addForm.scriptParm = '';
					this.scriptPath = "";
				}
			},
			hostChange(val) {
				console.log(val);

			},
			/*****el-aside区域的方法*****/
			// 查询按钮的点击事件
			searchScript(datas) {
				const params = {
					name: this.searchScriptInput,
				}
				service.scriptLink(params).then(res => {
					console.log(res)
					
					for(var i = 0; i < res.length; i++) {
						var datai = res[i]
						this.unfoldTreeIs.push(datai.id)
						for(var j = 0; j < datai.children.length; j++) {
							var dataj = datai.children[j]
							this.unfoldTreeIs.push(dataj.id)
							for(var k = 0; k < dataj.children.length; k++) {
								var datak = dataj.children[k]
								this.unfoldTreeIs.push(datak.id)
								// console.log(datak)
								// for(var l = 0; l < datak.children.length; l++){
									
								// 	var datal = datak.children[l].object
								// 	this.unfoldTreeIs.push(String(datal.id))
								// }
							}
						}
					}
					let deep = function(arr) {
						arr.forEach(item => {
							item.id = item.object.id;
							item.label = item.object.name;
							if (item.children) {
							deep(item.children);
							}
						});
					};
					deep(res);
					this.scriptData = res
					console.log(this.unfoldTreeIs)
				})
			},
			//单条删除编辑脚本
			delScript(id) {
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					const params = {
						id: id
					}
					service.deleteOneScript(params).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
						this.inputName = ''
						this.removeTab(this.editableTabsValue2);
						this.searchScript();
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},

			/*el-main区域的方法*/

			//新增弹框
			addNewTab() {
				// 显示弹框
				this.addScriptDialog = true
			},
			getScriptData(params){
				service.getScriptData(params).then(res => {
					this.editForm.scriptName= res.result.model.name,
					this.editForm.desc= res.result.model.desc,
					this.editForm.scriptParams= res.result.model.param,
					this.editForm.formType= [res.result.model.platformId, res.result.model.resourceClassId, res.result.model.resourceTypeId],
					this.editForm.scriptTypeId= res.result.model.scriptTypeId
					this.editForm.scriptAddress = res.result.model.path
					this.editForm.scriptContent = res.result.model.content
				}) 
			},
			// 编辑标签页
			addUpdateTab(datas) {
				this.updateId = datas.object.id
				const params = {
					id: datas.object.id,
				}
				this.getScriptData(params)
			},
			removeTab(targetName) {
				console.log(targetName)
				let tabs = this.editableTabs2;
				let activeName = this.editableTabsValue2;
				if(activeName === targetName) {
					tabs.forEach((tab, index) => {
						if(tab.name === targetName) {
							this.hasScriptName = false;
							this.editableTabs2.splice(index, 1)
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if(nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}

				console.log(this.editableTabs2);
				this.editableTabsValue2 = activeName;
				this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
			},

			// 删除标签页
			//			removeTab(targetName) {
			//				console.log(targetName)
			//				let tabs = this.editableTabs2;
			//				let activeName = this.editableTabsValue2;
			//				this.editableTabs2.splice(targetName - 1, 1);
			//				console.log(this.editableTabs2);
			//				if(activeName === targetName) {
			//					console.log(activeName === targetName)
			//					tabs.forEach((tab, index) => {
			//						if(tab.name === targetName) {
			//							let nextTab = tabs[index + 1] || tabs[index - 1];
			//							if(nextTab) {
			//								activeName = nextTab.name;
			//							}
			//						}
			//					});
			//				}
			//				this.editableTabsValue2 = activeName;
			//				this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
			//				var deleteTabCount = this.couArrayOffset(targetName);
			//				this.deleteTab(deleteTabCount, targetName, tabs);
			//				this.editableTabsValue2 = activeName;
			//				this.tabDel = activeName
			//				this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);

			//			},

			//判断是从中间开始删除还是从最右边开始删除标签
			deleteTab(deleteTabCount, targetName, tabs) {
				/*只有当删除新增脚本标签时才有效*/
				if((tabs[parseInt(targetName) - deleteTabCount - 1].title.indexOf('未命名脚本')) != -1) {
					console.log('删除新增脚本标签页');
					if(parseInt(targetName) < this.originalTabsLength) { //从中间往右边删除
						console.log('从中间往右边删除');
						this.middleRirhtDelete = true;
						//this.tabIndex--;
						if(this.editableTabs2.length === 2) {
							console.log('删除最后一个标签页');
							this.tabIndex = 1;
							this.newTabIndex = 1; //删除完最后一个标签后，要重新初始化newTabIndex的值
							this.originalTabsLength = 1;
							this.middleRirhtDelete = false;
						}

					}
					//从右往左删除
					else if(parseInt(targetName) === this.originalTabsLength) {
						if(this.middleRirhtDelete && this.editableTabs2.length === 2) {
							console.log('删除最后一个标签页');
							this.tabIndex = 1;
							this.newTabIndex = 1; //删除完最后一个标签后，要重新初始化newTabIndex的值
							this.originalTabsLength = 1;
							this.middleRirhtDelete = false;
							//this.deleteTabCount = 0;
						} else {
							console.log('从右往左删除');
							this.tabIndex--;
							this.newTabIndex--;
							this.originalTabsLength--;
						}

					}
				} else { //删除已经在左边栏中显示的标签时才执行
					console.log('删除左边列表已经存在的标签页');
					if(parseInt(targetName) < this.originalTabsLength) { //从中间往右边删除
						console.log('从中间往右边删除');
						this.middleRirhtDelete = true;
						//this.tabIndex--;
						if(this.editableTabs2.length === 2) {
							console.log('删除最后一个标签页');
							this.tabIndex = 1;
							this.newTabIndex = 1; //删除完最后一个标签后，要重新初始化newTabIndex的值
							this.originalTabsLength = 1;
							this.middleRirhtDelete = false;
						}
					}
					//从右往左删除
					else if(parseInt(targetName) === this.originalTabsLength) {
						if(this.middleRirhtDelete && this.editableTabs2.length === 2) {
							console.log('删除最后一个标签页');
							this.tabIndex = 1;
							this.newTabIndex = 1; //删除完最后一个标签后，要重新初始化newTabIndex的值
							this.originalTabsLength = 1;
							this.middleRirhtDelete = false;
							//this.deleteTabCount = 0;
						} else {
							console.log('从右往左删除');
							this.tabIndex--;
							this.originalTabsLength--;
						}

					}
				}

			},

			//计算数组的偏移量
			couArrayOffset(targetName) {
				var deleteTabCount = 0;
				var isFind = true;
				for(var i = 1; i < parseInt(targetName); i++) {
					for(var j = 0; j < this.editableTabs2.length; j++) {
						//console.log('i:'+i);
						//console.log('j:'+j);
						//console.log('name:'+this.editableTabs2[j].name);
						if(this.editableTabs2[j].name === (i + '')) {
							isFind = true;
							break;
						} else {
							isFind = false;
						}
					}
					if(!isFind) {
						//console.log('execute deleteTabCount++ statement');
						deleteTabCount++;
					}
				}
				return deleteTabCount;
			},

			//			标签的点击事件
			tabClick(tab, event) {
				console.log('into tabClick function')
				console.log(tab);
				console.log('label:' + tab.label)
				console.log('this.editableTabsValue2:' + this.editableTabsValue2);
				for(var i = 0; i < this.scriptData.length; i++) {
					var deleteTabCount = this.couArrayOffset(this.editableTabsValue2);
					if(this.editableTabs2[parseInt(this.editableTabsValue2) - deleteTabCount - 1].title == this.scriptData[i].name) {
						this.updateId = this.scriptData[i].id; //在左边的列表栏找到点击标签所对应的ID，并将ID赋值给updateId然后发送给后台
					}
				}
				if(tab.label.indexOf("未命名脚本") != -1) {
					console.log('if')
					this.newTabFlag = true
					this.updateTabFlag = false
				} else {
					console.log('else')
					this.newTabFlag = false
					this.updateTabFlag = true
				}

			},
			// 关闭新增脚本弹框
			dialogClose(formName){
				this.addForm.fileList = [];
				this.$refs[formName].resetFields();
				this.addScriptDialog = false
			},
			// 新增脚本保存
			addSubmitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const params = {
							name: this.addForm.scriptName,
							desc: this.addForm.desc,
							param: this.addForm.scriptParams,
							content: this.addForm.scriptContent,
							path: this.addForm.scriptAddress,
							platformId: this.addForm.formType[0],
							resourceClassId: this.addForm.formType[1],
							resourceTypeId: this.addForm.formType[2],
							scriptTypeId: this.addForm.scriptTypeId
						}
						if(this.addForm.scriptAddress == '') {
							params.path = this.path
						}
						service.saveNewData(params).then(res => {
							if(res.code == 200) {
								this.$message.success(res.msg);
								this.searchScript();
								this.dialogClose('addForm');
							} else {
								// this.$message.error(res.msg);
								this.$message({
									dangerouslyUseHTMLString: true,
									// message: '<strong>这是 <i>HTML</i> 片段</strong>',
									message:res.msg,
									type:'info',
								});
							}
						})
					} else {
						return false;
					}
				});
			},
			// 编辑脚本保存
			editSubmitForm(formName) {
				
				this.$refs[formName].validate((valid) => {
					if(valid) {
						const params = {
							name: this.editForm.scriptName,
							desc: this.editForm.desc,
							param: this.editForm.scriptParams,
							content: this.editForm.scriptContent,
							id: this.updateId,
							path: this.editForm.scriptAddress,
							platformId: this.editForm.formType[0],
							resourceClassId: this.editForm.formType[1],
							resourceTypeId: this.editForm.formType[2],
							scriptTypeId: this.editForm.scriptTypeId
						}
						if(this.editForm.scriptAddress == '') {
							params.path = this.path
						}
						service.saveUpdateData(params).then(res => {
							
							if(res.code == 200) {
								this.$message.success(res.msg);
								this.searchScript()
							}else if(res.code == 500){
								
								console.log('code500')
								this.$message({
									showClose: true,
									duration:0,
									dangerouslyUseHTMLString: true,
									message:res.msg,
									type:'info',
								});
								
							}
						})
					} else {
						return false;
					}
				});
			},
			//删除编辑脚本单条数据
			remove(node, data) {
				this.delScript(data.object.id);
			},
			// tab表单重置
			resetChongZhi(formName) {
				this.formHistory.scriptName = "";
				this.formHistory.createName = "";
				this.formHistory.hostName = "";

			},
			//文件上传
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			beforeAvatarUpload(file) {
				var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
				const extension = testmsg === 'sh'
				const extension2 = testmsg === 'pl'
				const extension3 = testmsg === 'py'
				const extension4 = testmsg === 'sql'
				const isLt2M = file.size / 1024 / 1024 < 1
				if(!extension && !extension2 && !extension3 && !extension4) {
					this.$message({
						message: '只能上传sh.pl.sql.pl格式的文件!',
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
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			onChange(file, fileList) {
				this.fileList = fileList
			},
			// 上传完成时触发的函数(新增)
			addOnSuccess(response, file, fileList) {
				var myData = response;
				console.log(myData)
				if(myData.code == 200) {
					this.$message.success("文件上传成功");
					this.addForm.scriptAddress = myData.result.path;
					this.addForm.scriptContent = myData.result.text;
					//					this.editableTabs2[parseInt(this.editableTabsValue2) - 1].scriptContent = response.result
				}
				if(myData.code == 4000) {
					this.$message.warning(myData.result.valid);
					this.addForm.scriptContent = myData.result.text;
					this.addForm.scriptAddress = myData.result.path;
				}
				if(myData.code == 500) {
					this.$message.warning(myData.msg);
				}

			},
			// 上传完成时触发的函数(编辑)
			editOnSuccess(response, file, fileList) {
				var myData = response;
				console.log(myData)
				if(myData.code == 200) {
					this.$message.success("文件上传成功");
					this.editForm.scriptAddress = myData.result.path;
					this.editForm.scriptContent = myData.result.text;
					//					this.editableTabs2[parseInt(this.editableTabsValue2) - 1].scriptContent = response.result
				}
				if(myData.code == 4000) {
					this.$message.warning(myData.result.valid);
					this.editForm.scriptContent = myData.result.text;
					this.editForm.scriptAddress = myData.result.path;
				}
				if(myData.code == 500) {
					this.$message.warning(myData.msg);
				}

			},
			//主机列表查询
			queryIP() {
				service.queryIP().then(res => {
					this.hostIPDate = res.result;
					console.log(this.hostIPDate)
				})
			},

			// 删除标签事件
			closeTag(tag) {
				this.MainframeInfos.splice(this.MainframeInfos.indexOf(tag), 1);
			},

			onError(err) {
				this.$message.warning('文件上传失败');
			},
			beforeRemove(file, fileList) {
				return
			},
			//获取历史执行记录的数据
			handleSizeChange(val) { // 设置每页多少条
				this.pageSize = val
				this.btnHistory()
			},
			handleCurrentChange(val) { // 当前页
				this.currentPage = val
				this.btnHistory()
			},
			handleSelectionChange(val) {
				this.multipleSelection = val
				console.log(this.multipleSelection)
			},

			//			执行脚本表格数据
			btnHistory() {
				this.history = true;
				const params = {
					name: this.formHistory.scriptName,
					creator: this.formHistory.createName,
					targetHost: this.formHistory.hostName,
					isScript: '1',
					start: (this.currentPage - 1) * this.pageSize,
					limit: this.pageSize
				}
				service.getHistoryData(params).then(res => {
					if(res) {
						this.tableLoading = false;
						this.historyData = res.result.list;
						this.totalCount = res.result.count;
					}
				})
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
			//新增执行脚本
			addScript() {
				this.addUserDialog = true;
				this.addForm.taskScriptName = [];
				this.addForm.scriptParm = '';
				this.addForm.allHost = [];
				this.addForm.timeOut = 0;
				this.addForm.allScript = '';
				this.scriptPath = ''
			},
			addDialogFail() {
				this.addUserDialog = false;
			},
			closeAdd() {
				//				this.$refs[formName].resetFields();
			},
			//保存执行脚本
			saveAddInfo(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var myresourceGroup = this.addForm.allHost.join(',')
						const scriptParam = {
							resourceGroup: myresourceGroup, //主机地址
							platformId: this.addForm.taskScriptName[0], //平台类型三个
							resourceClassId: this.addForm.taskScriptName[1],
							resourceTypeId: this.addForm.taskScriptName[2],
							overTime: this.addForm.timeOut, //超时时间
							params: this.addForm.scriptParm, //脚本参数
							name: this.addForm.allScript, //脚本名称
							scriptPath: this.scriptPath //脚本路径

						}
						service.saveScript(scriptParam).then(res => {
							if(res.code == 200) {
								this.btnHistory()
								this.addUserDialog = false;
								this.$message({
									type: 'success',
									message: res.msg
								})
							} else {
								this.addUserDialog = true;
								this.$message({
									type: 'error',
									message: res.msg
								})
							}
						})
					} else {
						return false;
					}
				});
			},
			//批量删除
			deleteAll() {
				var taskId = [];
				console.log(this.multipleSelection)
				if(this.multipleSelection.length == 0) {
					this.$message({
						message: '请选择需要删除的数据',
						type: 'warning'
					});
				} else {
					this.multipleSelection.forEach((item, index) => {
						taskId.push(item.taskId)
					})
					this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'error'
					}).then(() => {
						service.deleteTaskALLScript(taskId).then(res => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							})
							this.btnHistory();
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
			//单条删除
			handleDelete(taskId) {
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					const params = {
						taskId: taskId
					}
					service.deleteTaskScript(params).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
						this.btnHistory();
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
			//重新执行
			continueOne(taskId) {
				this.$confirm('此操作将重新执行该任务, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
					const data = {
						taskId: taskId
					}
					service.goStart(data).then(res => {
						this.$message({
							type: 'success',
							message: '重新执行成功!'
						})
						this.btnHistory();
					})
				})
			}
		}
	};
</script>
<style scoped lang="scss">
	
	.under_line {
		color: #42B983;
		text-decoration: underline;
		font-size: 14px;
	}
	.add_yw2 {
		color: rgb(66, 185, 131);
		cursor: pointer;
		line-height: 35px;
		font-size: 20px;
	}
	.add_yw {
		color: rgb(66, 185, 131);
		cursor: pointer;
		margin-left: 12px;
		line-height: 35px;
		font-size: 20px;
	}
	.tree_del {
		color: rgb(66, 185, 131);
		cursor: pointer;
		line-height: 35px;
		font-size: 16px;
	}
	@import "./index.scss";
</style>