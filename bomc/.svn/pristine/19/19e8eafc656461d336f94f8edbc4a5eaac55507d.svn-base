<template>
	<div class='container'>
		<el-container v-show="listOrDetail">
			<el-aside width="260px">
				<el-card>
					<el-form :inline="true" :model="formSearch"  ref="formSearch" :rules="formSearchRules" class="demo-form-inline" label-width="110px">
						<el-row style="padding: 10px 20px;">
							<el-col :span="16">
								<!-- v-model="searchScriptInput" -->
								<el-form-item prop="name">
									<el-input  id="inputStyleCss"  v-model="formSearch.name" placeholder="请输入应用名称" ></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<!--  @click="queryDataClick" -->
								<el-button type="primary" style="margin-left:10px" round @click="queryDataSerach">查询</el-button>
							</el-col>
						</el-row>
					</el-form>
					<br/>
					<el-row>
						<el-tree :data="data" ref="tree" @node-click="treeQuery"></el-tree>
					</el-row>
				</el-card>
			</el-aside>
			<el-container>
				<el-card style="width:100%">
					<el-header>
						<el-radio-group v-model="radioGround" @change="radioEvent()">
							<el-radio-button label="0">公有应用</el-radio-button>
							<el-radio-button label="1">私有应用</el-radio-button>
						</el-radio-group>
						<div class="buttonItem">
							<el-button type="success" @click="addUse">新增应用</el-button>	 
							<el-button type="danger" @click="deleteRowTask">删除应用</el-button>	 
							<el-button type="primary" @click="cut" v-text="cutText"></el-button>
							<el-select v-model="downOrTime" placeholder="请选择" style="width:110px" @change="updateAndDownload">
								<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</div>
					</el-header>
					<el-main >
						
						
						<el-row v-if="useList==0" style="    text-align: center;">
							暂无数据
						</el-row>
						<el-row v-else v-show="cutBol == true">
							<!-- <el-col :span="6" v-for="(item, index) in useList" :key="index" :offset=" index == '0' || index == '3' ? 1 : 2"  class="useCol"> -->
								<el-card :body-style="{ padding: '0px'}"  v-for="(item, index) in useList" :key="index" style="width:300px;height:200px;    float: left;margin: 30px 0 0 30px;">
								<div >
									<div class="use-list">
										
										<p class="use-list-name none-one" @click="detail(item)">
											<el-button icon="el-icon-check" circle v-bind:class="{active:item.active}" @click.stop="selected(index,item)" class="btnPosi"></el-button>
											{{item.appName}}
										</p>
										<p class="use-list-type none-one">{{item.lastVersion}}</p>
										<p class="use-list-brief none-three">{{item.appInfo}}</p>
									</div>
									
									<div class="bottom clearfix">
										<el-button type="text" class="button" style="color: #999999;cursor:default">{{item.typeName.split(":")[0]}}</el-button>
										<!-- <el-button type="text" class="button" style="color: #999999;cursor:default">下载量:{{item.downloadCount}}</el-button> -->
										<!-- <el-button type="text" class="button" style="color: #999999;cursor:default">日期:{{item.updateTime}}</el-button> -->

										<el-button type="text" class="button btn" icon="el-icon-edit"  @click="editUse(item, index)">编辑</el-button>
										<el-button type="text" class="button btn" icon="el-icon-close"  @click="handleDelete(item.id, index)">删除</el-button>
									</div>
									<div class="bottom clearfix">
										<el-button type="text" class="button" style="color: #999999;cursor:default">下载量:{{item.downloadCount}}</el-button>
										<el-button type="text" class="button btn" style="color: #999999;cursor:default">更新日期:{{item.updateTime}}</el-button>
									</div>
								</div>
								</el-card>
							<!-- </el-col> -->
						</el-row>
						<el-row v-show="cutBol == false">
							<el-col>
								<el-card>
									<!--  v-loading="tableLoading" -->
									<el-table @selection-change="useHandleSelectionChange" :data="useList" style="width: 100%" :default-sort="{prop: 'userId', order: 'ascending'}">
										<el-table-column type="selection" width="55" align="center">
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="appName" min-width="80" align="center"  label='应用名称'>
											<template slot-scope="scope" >
												<el-button size="mini" type="text"  @click="detail(scope.row)">{{scope.row.appName}}</el-button>
											</template>
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="typeName" label='应用类型' min-width="80" align="center">
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="appInfo" label='应用简介' min-width="80" align="center">
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="lastVersion" label='应用版本' min-width="80" align="center">
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="downloadCount" label='下载量' min-width="80" align="center">
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="updateTime" label='更新时间' min-width="80" align="center">
										</el-table-column>
										<el-table-column   label='操作'  min-width="150" align="center">
											<template slot-scope="scope" >
												<el-button size="mini" type="primary" @click="editUse(scope.row)">编辑</el-button>
												<el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
											</template>
										</el-table-column>
									</el-table>
								</el-card>
							</el-col>
						</el-row>
						
					</el-main>
					<el-footer>
						<div class="block" align="right">
							<el-pagination v-if="totalCount>0" :current-page="currentPage" :page-sizes="[6]" :page-size="pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper" 
								@size-change="handleSizeChange" @current-change="handleCurrentChange" />
						</div>
					</el-footer>
				</el-card>
			</el-container>
		</el-container>

		<el-tabs type="border-card" v-show="!listOrDetail">
			<el-tab-pane label="应用简介">
				<el-row style="border-bottom:1px solid #E4E4E4">
					<el-col :span="3" class="lHeight">
						应用类型：{{brief.typeName}}
					</el-col>
					<el-col :span="3" class="lHeight">
						作者：{{brief.creator}}
					</el-col>
					<el-col :span="6" class="lHeight">
						最新版本：{{brief.lastVersion}}
					</el-col>
					<el-col :span="12" >
						<el-button style="float:right" type="success" @click="back">返回</el-button>
						<el-button style="float:right;margin-right: 10px;" type="primary" round @click="uploadUse">上传版本</el-button>
					</el-col>
				</el-row>
				<el-card class="box-card">
					<h1 style="font-size: 40px;">
						{{brief.appName}}
					</h1>
					<h4 style="margin-top:40px;margin-bottom:20px">
						应用详情
					</h4>
					<div>
						{{brief.appInfo}}
					</div>
				</el-card>
			</el-tab-pane>
			<el-tab-pane label="应用版本">
				<el-row style="border-bottom:1px solid #E4E4E4">
					<el-col :span="3" class="lHeight">
						应用类型：{{brief.typeName}}
					</el-col>
					<el-col :span="3" class="lHeight">
						作者：{{brief.creator}}
					</el-col>
					<el-col :span="6" class="lHeight">
						最新版本：{{brief.lastVersion}}
					</el-col>
					<el-col :span="12" >
						<el-button style="float:right" type="success" @click="back">返回</el-button>
						<el-button style="float:right;margin-right: 10px;" type="primary" round @click="uploadUse">上传版本</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" >
						<el-form :inline="true" :model="serachForm" :rules="serachFormRules" ref="serachForm" class="demo-form-inline">
							<el-form-item label="版本号" prop="use">
								<el-input v-model="serachForm.use" placeholder="请输入版本号"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onSerach">查询</el-button>
							</el-form-item>
							<el-form-item>
								<el-button type="danger" @click="uploadMoreDelUse">删除</el-button>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="3" :offset="13" style="line-height: 42px;text-align:right">
						共{{totalCount2}}个版本
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-card>
							<el-table v-loading="tableLoading2" @selection-change="handleSelectionChange" :data="tableData2" style="width: 100%" :default-sort="{prop: 'userId', order: 'ascending'}">
								<el-table-column type="selection" width="55" align="center">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="version" label='版本号' min-width="80" align="center">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="size" label='大小' min-width="80" align="center">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="creator" label='作者' min-width="80" align="center">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="updateTime" label='更新日期' min-width="100" align="center">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="versionInfo" label='版本介绍' min-width="80" align="center">
								</el-table-column>
								<el-table-column   label='操作'  min-width="200" align="center">
									<template slot-scope="scope" >
										<el-button size="mini" type="primary" @click="uploadEdit(scope.row)">编辑</el-button>
										<el-button size="mini" type="danger" @click="uploadDelUse(scope.row.id)">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
							<div class="block" align="right">
								<el-pagination v-if="totalCount2>0" :current-page="currentPage2" :page-sizes="[5, 10, 20, 50, 100, 200, 500]" :page-size="pageSize2" :total="totalCount2" layout="total, sizes, prev, pager, next, jumper" 
									@size-change="handleSizeChange2" @current-change="handleCurrentChange2" />
							</div>
						</el-card>
					</el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>

		<el-dialog :title="useTitle" :visible.sync="dialogUes" width="60%" @close="addUseRepeat('addUseForm')">
			<el-form :model="addUseForm" ref="addUseForm" :rules="addUseFormRules" style="margin:10px;width:auto;" label-width="110px">
				<el-form-item label="应用权限">
					<el-radio-group v-model="addUseForm.addRadioGround">
						<el-radio label="0">公有应用</el-radio>
						<el-radio label="1">私有应用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-row>
					<el-col :span="8">
						 <el-form-item label="应用类型分类" prop="typeClassify">
							<el-select v-model="addUseForm.typeClassify" placeholder="请选择应用类型" @change="appOwnerSelect">
								<el-option
									v-for="item in addUseNav"
									:key="item.typeClassId"
									:label="item.typeClassName"
									:value="item.typeClassId">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						 <el-form-item label="应用类型" prop="type">
							<el-select v-model="addUseForm.type" placeholder="请选择应用类型">
								<el-option
									v-for="item in addUseNavType"
									:key="item.typeId"
									:label="item.typeName.split(':')[0]"
									:value="item.typeId">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				
				 
				<el-form-item label="应用名称" prop="name">
					<el-input v-model="addUseForm.name" autocomplete="off" placeholder="请输入应用名称"></el-input>
				</el-form-item>
				<el-form-item label="应用简介" prop="appInfo">
					<el-input type="textarea" v-model="addUseForm.appInfo" autocomplete="off" placeholder="请输入应用简介"></el-input>
				</el-form-item>
				<el-form-item label="版本号" prop="versions" v-show="addUseEdit.bol">
					<el-input-number v-model="addUseForm.versions" :precision="2" :step="0.1" :min="1" :max="1000"></el-input-number>
					<!-- <el-input v-model="addUseForm.versions" autocomplete="off"></el-input> -->
				</el-form-item>
				<el-form-item label="版本简介" prop="brief" v-show="addUseEdit.bol">
					<el-input type="textarea" v-model="addUseForm.brief" autocomplete="off" placeholder="请输入应用简介"></el-input>
				</el-form-item>
				<el-form-item label="版本上传" prop="use" v-show="addUseEdit.bol">
					<el-col :span="8">
						<!-- <el-input v-model="addUseForm.use" disabled placeholder="请输入脚本" v-show="false"></el-input> -->
						<!-- <el-select v-model="addUseForm.use" placeholder="请选择脚本">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select> -->
					</el-col>
					<el-upload
						class="upload-demo"
						action=""
						:before-remove="beforeRemove2"
						:on-exceed="handleExceed2"
						:on-change="onChange2"
						:limit="1"
						:on-success="onSuccess2"
						:file-list="fileList2"
						:auto-upload="false">
						<el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="配置文件" prop="deploy" v-show="addUseEdit.bol">
					<el-col :span="8">
						<el-input v-model="addUseForm.deploy" disabled placeholder="请输入脚本" v-show="false"></el-input>
						<!-- <el-select v-model="addUseForm.deploy" placeholder="请选择脚本">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select> -->
					</el-col>
					<el-upload
						class="upload-demo"
						action=""
						:before-remove="beforeRemove"
						:on-exceed="handleExceed"
						:on-change="onChange"
						:limit="1"
						:on-success="onSuccess"
						:file-list="fileList1"
						:auto-upload="false">
						<el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
				</el-form-item>
			
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addUseRepeat('addUseForm')">取 消</el-button>
				<el-button type="primary" @click="addUseSave('addUseForm')">保 存</el-button>
			</div>
		</el-dialog>

		<el-dialog :title="uploadUseTitle" :visible.sync="uploadUseDialog" width="30%" @close="uploadUseRepeat('uploadUseForm')">
			<el-form :model="uploadUseForm" ref="uploadUseForm" :rules="uploadUseFormRules" style="margin:10px;width:auto;" label-width="80px">
				<el-form-item label="版本号" prop="version">
					<el-input-number v-model="uploadUseForm.version" :precision="2" :step="0.1" :min="1" :max="1000"></el-input-number>
					<!-- <el-input v-model="uploadUseForm.version" autocomplete="off"></el-input> -->
				</el-form-item>
				<el-form-item label="版本简介" prop="versionInfo">
					<el-input type="textarea" v-model="uploadUseForm.versionInfo" autocomplete="off" placeholder="请输入应用简介"></el-input>
				</el-form-item>
				<el-form-item label="版本上传" prop="use" >
					<el-col :span="8">
						<el-input v-model="uploadUseForm.use"  placeholder="请输入脚本" v-show="false"></el-input>
						<!-- <el-select v-model="uploadUseForm.use" placeholder="请选择脚本">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select> -->
					</el-col>
					<el-upload
						class="upload-demo"
						action=""
						:before-remove="beforeRemove2"
						:on-exceed="handleExceed2"
						:on-change="onChange2"
						:limit="1"
						:on-success="onSuccess2"
						:file-list="fileList2"
						:auto-upload="false">
						<el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="配置文件" prop="deploy" >
					<el-col :span="8">
						<el-input v-model="uploadUseForm.deploy" disabled placeholder="请输入脚本" v-show="false"></el-input>
						<!-- <el-select v-model="uploadUseForm.deploy" placeholder="请选择脚本">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select> -->
					</el-col>
					<el-upload
						class="upload-demo"
						action=""
						:before-remove="beforeRemove"
						:on-exceed="handleExceed"
						:on-change="onChange"
						:limit="1"
						:on-success="onSuccess"
						:file-list="fileList1"
						:auto-upload="false">
						<el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="uploadUseRepeat('uploadUseForm')">取 消</el-button>
				<el-button type="primary" @click="uploadUseSave('uploadUseForm')">保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>


<script>  
		 	import * as service from '@/modules/ops/api/ops/deployUpdate/deployStoreManag.js'
	import { getToken } from '@/utils/auth'
	import * as rule from '@/modules/ops/api/rules.js'
	import { Message, MessageBox } from 'element-ui'
	
	export default {
		data() {
			return {
				pageSize: 6, // 每页多少条
				totalSize: 1000, // 总条数	
				currentPage: 1, // 当前页
				totalCount: 10, // 总条数
				

				pageSize2: 10, // 每页多少条
				totalSize2: 1000, // 总条数	
				currentPage2: 1, // 当前页
				totalCount2: 10, // 总条数

				cutText:'显示列表',
				cutBol:true,

				data:[],
				// 应用版本表格
				tableData2:[],
				
				// 应用版本表格加载状态
				tableLoading2:true,
				// 应用版本表单
				serachForm:{
					use:''
				},
				serachFormRules :{
					// use:[ 
					// 	{ validator: rule.validateQueryName, trigger: 'blur' },
					// ],
				},
				// 控制表格加载
				tableLoading:true,
				// 应用列表
				useList:[],
				carMultiple:[],
				tableMultiple:[],
				// 应用分类导航栏
				useNav:[],
				nav:[],
				// 记录切换的坐标
				ins:-1,
				// 公有私有切换
				radioGround:'0',
				// 下载和时间切换
				options: [{
					value: 'update_time',
					label: '更新时间'
					}, {
					value: 'download_count',
					label: '下载量'
					}],
				downOrTime: 'update_time',
				formSearch:{
					name:'',
				},
				formSearchRules:{
					name:[ 
						{ validator: rule.validateQueryName, trigger: 'blur' },
					],
				},
				// 判断查询的应用分类
				typeClassId:'',
				typeId:'',

				// 新增或编辑应用弹框
				dialogUes:false,
				// 新增或编辑标题
				useTitle:'新增应用',
				// 新增应用表单
				addUseForm:{
					type:'',
					name:'',
					brief:'',
					addRadioGround:'0',
					typeClassify:'',
					versions:'',
					appInfo:'',
				},
				
				addUseFormRules:{
					type: [
						{ required: true, message: '请选择应用类型', trigger: 'change' },
					],
					typeClassify: [
						{ required: true, message: '请选择应用类型分类', trigger: 'change' },
					],
					appInfo: [
						{ required: true, message: '请输入应用简介', trigger: 'blur' },
					],
					resourceGroup: [
						{ required: true, message: '请输入应用简介', trigger: 'blur' },
					],
					name:[ 
						{ required: true, message: '请输入应用名称', trigger: 'blur' },
					],
					brief:[
						{ required: true, message: '请输入版本介绍', trigger: 'blur' },
					]
					// use: [
					// 	{ required: true, message: '请选择版本或上传版本', trigger: 'change' },
					// ],
				},
				addUseEdit:{
					bol:true,
					id:'',
				},
				addUseNav:[],
				addUseNavType:[],
				// 上传文件的列表
				fileList1: [], 
				fileList2: [], 

				// 显示列表或显示详情
				listOrDetail:true,
				// 表格选中的行
				multipleSelection: [],
				// 详情
				brief:{
					typeName:'',
					creator:'',
					lastVersion:'',
					appName:'',
					appInfo:'',
					appId:'',
				},
				uploadUseForm:{
					versionInfo:'',
					version:'',
					use:'',
					deploy:'',
				},
				// 应用上传
				uploadUseFormRules:{
					versionInfo: [
						{ required: true, message: '请输入版本简介', trigger: 'blur' },
					],
					version: [
						{ required: true, message: '请输入版本号', trigger: 'blur' },
					],
					// use: [
					// 	{ required: true, message: '请上传应用', trigger: 'blur' },
					// ],
				},
				// 新增或编辑应用上传标题
				uploadUseTitle:'应用上传(新增)',
				uploadUseDialog:false,
				// 新增或编辑
				addRadioGround:'0',
				oo:[
						{"children":[
							{"pId":"typeClassId:1","id":"typeId:5","object":{"appName":"database","typeName":"database","typeId":5,"id":5}},
							{"pId":"typeClassId:1","id":"typeId:6","object":{"appName":"cache","typeName":"cache","typeId":6,"id":6}},
							{"pId":"typeClassId:1","id":"typeId:7","object":{"appName":"nginx","typeName":"nginx","typeId":7,"id":7}}
							],
							"pId":"0","id":"typeClassId:1","object":{"typeClassName":"中间件","typeClassId":1,"appName":"中间件","id":1}
						},
						{"children":[
							{"pId":"typeClassId:2","id":"typeId:8","object":{"appName":"javaapp","typeName":"javaapp","typeId":8,"id":8}},
							{"pId":"typeClassId:2","id":"typeId:9","object":{"appName":"goapp","typeName":"goapp","typeId":9,"id":9}},
							{"pId":"typeClassId:2","id":"typeId:10","object":{"appName":"capp","typeName":"capp","typeId":10,"id":10}},
							{"pId":"typeClassId:2","id":"typeId:11","object":{"appName":"pythonapp","typeName":"pythonapp","typeId":11,"id":11}},
							{"pId":"typeClassId:2","id":"typeId:12","object":{"appName":"collection_agent","typeName":"collection_agent",
							"typeId":12,"id":12}}
							],
							"pId":"0","id":"typeClassId:2","object":{"typeClassName":"普通应用","typeClassId":2,"appName":"普通应用",
							"id":2}
						}
					]
			};
		},
		mounted() {
			this.queryDataTypeUse()
			this.queryDataTree()
			this.queryData()
		},
		methods: {
			// 上传应用保存函数
			uploadUs(formdatas){
				service.uploadAttachment(formdatas).then(res => {
					if(res.code == 200){
						this.$message({
							type: 'success',
							message: res.msg
						})
						const datas = {
							appId:this.brief.appId,
							start: (this.currentPage2 - 1) * this.pageSize2,
							limit: this.pageSize2,
						}
						this.queryDataVersion(datas)
						this.uploadUseDialog = false
					}else {
						this.$message({
							type: 'info',
							message: res.msg
						})
					}
				});
			},
			// 上传应用保存
			uploadUseSave(formName){
				this.$refs[formName].validate((valid) => {
				if (valid) {
					// 上传附件
					const formdatas = new FormData();
					this.fileList1.forEach((item, index) => {
						if(item.raw !== undefined) {
							formdatas.append("configfile", item.raw);
						}
					});
					this.fileList2.forEach((item, index) => {
						if(item.raw !== undefined) {
							formdatas.append("file", item.raw);
						}
					});
					formdatas.append("version", this.uploadUseForm.version);
					formdatas.append("versionInfo", this.uploadUseForm.versionInfo);
					formdatas.append("appId", this.brief.appId);
					if(this.uploadUseTitle == '应用上传(编辑)') {
						formdatas.append("id", this.uploadUseForm.id);
					}
					console.log(formdatas)
					const params = {
						appId:this.brief.appId,
						version:this.uploadUseForm.version
					}
					service.detectionVersion(params).then(res => {
						console.log(res)
						if(res.code == 500){
							this.$confirm(res.msg+', 是否继续?', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								this.uploadUs(formdatas)
							}).catch(() => {     
							});
						}else {
							this.uploadUs(formdatas)
						}
						
						// if(res.code == 200){
						// 	this.$message({
						// 		type: 'success',
						// 		message: res.msg
						// 	})
						// }else {
						// 	this.$message({
						// 		type: 'info',
						// 		message: res.msg
						// 	})
						// }
					});
					
				} else {
					console.log('error submit!!');
					return false;
				}
				});
			},
			// 上传应用表单重置
			uploadUseRepeat(formName) {
				this.fileList1 = [];
				this.fileList2 = [];
				this.$refs[formName].resetFields();
				this.uploadUseDialog = false;
			},
			// 卡片获取选中元素
			selected(index,item){
				 if(!item.active){
					this.$set(item,'active', 1)
					this.carMultiple.push(item);
				}else{
					this.$set(item,'active',0)
					this.carMultiple.splice(this.carMultiple.indexOf(item),1);
				}
				console.log(this.carMultiple)
			},
			// 上传编辑
			uploadEdit(item){
				console.log(item)
				// 保存值 // 回显
				this.uploadUseForm = item;
				this.uploadUseTitle = '应用上传(编辑)';
				this.fileList1 = []
				var obj = {
					name:item.path
				}
				this.fileList2.push(obj)
				this.uploadUseDialog = true;
				this.queryData()
				// this.uploadEditItem.editBol = true
				// fileList1 fileList2 清空
				// bol值
			},
			// 上传删除单条信息
			uploadDelUse(id){
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					const params = {
						ids: id,
						appId:this.brief.appId,
					}
					service.uploadDeleteTask(params).then(res => {
						
						this.$message({
							type: 'success',
							message: res.msg
						})
						const datas = {
							appId:this.brief.appId,
							start: (this.currentPage2 - 1) * this.pageSize2,
							limit: this.pageSize2,
						}
						
						this.queryDataVersion(datas)
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
			// 上传多条删除信息
			uploadMoreDelUse(){
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
						service.uploadDeleteRowTask(ids).then(res=>{
							this.$message({
									type: 'success',
									message: res.msg
								})
							const datas = {
								appId:this.brief.appId,
								start: (this.currentPage2 - 1) * this.pageSize2,
								limit: this.pageSize2,
							}
							this.queryDataVersion(datas)
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
			//应用删除单条信息
			handleDelete(id) {
				console.log(id)
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
			//多条删除		
			deleteRowTask() {
				const _self = this
				var datas = []
				if(this.cutBol){
					// 卡片
					console.log('卡片')
					datas = _self.carMultiple
				}else {
					// 列表
					console.log('列表')
					datas = _self.tableMultiple
				}
				var ids = [];
				if(datas.length == 0) {
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
						datas.forEach((item,index)=>{
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
			// 列表和卡片切换
			cut(){
				this.cutBol = !this.cutBol;
				if(this.cutBol) {
					this.cutText = '显示列表';
				}else {
					this.cutText = '显示卡片';
				}
			},
			// 属性导航查询
			treeQuery(val,node){
				const params = {
					name : this.formSearch.name,
					appOwner:this.radioGround,
					start: (this.currentPage - 1) * this.pageSize,
					limit: this.pageSize,
					sortfield : this.downOrTime
				};
				if(val.children){
					params.typeClassId = val.value
					this.typeClassId = val.value
				}else{
					params.typeClassId = node.parent.data.value 
					this.typeClassId = node.parent.data.value 
					params.typeId = val.value
					this.typeId = val.value
				}
				if(node.data.label == '全部资源'){
					this.typeClassId = ''
					this.typeId = ''
				}
				service.queryData(params).then(res => {
					if(res.code == 200) {
						this.useList = res.result.list;
						for(let index in this.useList) {  
							if(this.useList[index].lastVersion == null || this.useList[index].lastVersion == '0'){
								this.useList[index].lastVersion = '没有版本(用户未上传)'
							}
						};  
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
			// 获取树形导航
			queryDataTree(){
				service.queryDataTree().then(res => {

					let deep = function(arr) {
						arr.forEach(item => {
							item.value = item.object.id;
							item.label = item.object.appName;
							if (item.children) {
							deep(item.children);
							}
						});
					};
					deep(res);
					var hig = Object
					hig.children = res;
					hig.value = '';
					hig.label = '全部资源'
					this.data.push(hig) 
					
				})
			},
			// 选择应用类型分类事件 
			appOwnerSelect(){
				this.addUseForm.type = ''
				const params = {
					typeClassId:this.addUseForm.typeClassify
				}
				service.queryDataType(params).then(res => {
					if(res.code == 200) {
						this.addUseNavType = res.result
					}else {
						this.$message({
							type: 'error',
							message: res.msg
						})
					}
					
				})
			},
			queryDataTypeUse(){
				service.queryDataTypeUse().then(res => {
					if(res.code == 200) {
						this.nav = res.result
						this.addUseNav = res.result
					}else {
						this.$message({
							type: 'error',
							message: res.msg
						})
					}
					
				})
			},
			//应用分类
			queryDataType(val) {
				const params = {
					typeClassId:val
				}
				service.queryDataType(params).then(res => {
					if(res.code == 200) {
						this.useNav = res.result
					}else {
						this.$message({
							type: 'error',
							message: res.msg
						})
					}
					
				})
			},
			//表单查询
			queryData() {
				this.tableLoading = true;
				const params = {
					typeId : this.typeId,
					typeClassId : this.typeClassId,
					name : this.formSearch.name,
					appOwner:this.radioGround,
					start: (this.currentPage - 1) * this.pageSize,
					limit: this.pageSize,
					sortfield : this.downOrTime
				};
				service.queryData(params).then(res => {
					if(res.code == 200) {
						this.carMultiple = [];
						this.tableMultiple = [];
						this.useList = res.result.list;
						for(let index in this.useList) {  
							if(this.useList[index].lastVersion == null || this.useList[index].lastVersion == '0'){
								this.useList[index].lastVersion = '没有版本(用户未上传)'
							}
							console.log(index,this.useList[index]);  
						};  
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
			// 公有私有的切换
			radioEvent(val){
				this.queryData()
			},
			// 应用名称查询
			queryDataSerach() {
				this.queryData()
			},
			// 更新时间和下载量搜索
			updateAndDownload(){
				this.queryData()
			},
			// 新增应用弹框
			addUse() {
				this.addUseEdit.bol = true;
				this.useTitle = '新增应用'
				this.dialogUes = true
				this.addUseForm.addRadioGround = '0';
				this.addUseForm.typeClassify = '';
				this.addUseForm.type = '';
				this.addUseForm.name = '';
				this.addUseForm.appInfo = '';
			},
			// 编辑应用弹框
			editUse(item, index) {
				console.log(item)
				this.addUseForm.addRadioGround = String(item.appOwner) ;
				this.addUseForm.typeClassify = item.typeClassId;
				this.appOwnerSelect();
				this.addUseForm.type = item.typeId;
				this.addUseForm.name = item.appName;
				this.addUseForm.appInfo = item.appInfo;
				this.addUseEdit.id = item.id;
				this.addUseEdit.bol = false;
				this.useTitle = '编辑应用'
				this.dialogUes = true
			},
			// 新增应用的保存
			addUseSave(formName) {
				
				this.$refs[formName].validate((valid) => {
				if (valid) {
					const params = {
						typeClassId:this.addUseForm.typeClassify,
						typeId:this.addUseForm.type,
						appName:this.addUseForm.name,
						appOwner: this.addUseForm.addRadioGround,
						appInfo:this.addUseForm.appInfo,
					}
					if(this.addUseEdit.bol){
						
						service.addUseSave(params).then(res => {
							console.log(res)
							if(res.code == 200) {
								this.queryData()
								this.dialogUes = false
								this.uploadAttachment2(res.result)
							}else {
								this.$message({
									type: 'error',
									message: res.msg
								})
							}
							
						})
					}else {
						params.id = this.addUseEdit.id
						service.addUseSave(params).then(res => {
							if(res.code == 200) {
								this.queryData()
								this.dialogUes = false
							}else {
								this.$message({
									type: 'error',
									message: res.msg
								})
							}
							
						})
					}
					
					
					
					
				} else {
					console.log('error submit!!');
					return false;
				}
				});
				
			},
			// 新增应用表单重置
			addUseRepeat(formName) {
				this.addUseForm.addRadioGround = '';
				this.addUseForm.typeClassify = '';
				this.addUseForm.type = '';
				this.addUseForm.name = '';
				this.addUseForm.appInfo = '';
				this.fileList1 = [];
				this.fileList2 = [];
				this.$refs[formName].resetFields();
				this.dialogUes = false;
			},
			// 上传应用表格接口
			queryDataVersion(params){
				service.queryDataVersion(params).then(res => {
					if(res.code == 200) {
						this.brief.lastVersion = res.result.version
						this.tableData2 = res.result.list;
						this.totalCount2 = res.result.count;
						this.tableLoading2 = false
					}else {
						this.$message({
							type: 'error',
							message: res.msg
						})
					}
					
				})
			},
			// 详情
			detail(item) {
				this.listOrDetail = !this.listOrDetail
				
				if(item.lastVersion == null || item.lastVersion == '0'){
					item.lastVersion = '没有版本(用户未上传)'
				}
				const brief = {
					typeName:item.typeName,
					creator:item.creator,
					lastVersion:item.lastVersion,
					appName:item.appName,
					appInfo:item.appInfo,
					appId:item.id,
				}
				this.brief = brief
				const params = {
					appId:item.id,
					start: (this.currentPage2 - 1) * this.pageSize2,
					limit: this.pageSize2,
				}
				this.queryDataVersion(params)
				
			},
			// 查询
			onSerach(){
				const params = {
					appId:this.brief.appId,
					start: (this.currentPage2 - 1) * this.pageSize2,
					limit: this.pageSize2,
				}
				if(this.serachForm.use != ''){
					params.version = this.serachForm.use
				}
				
				this.queryDataVersion(params)
			},
			// 应用复选框
			useHandleSelectionChange(val){
				this.tableMultiple = val
			},
			//复选框
			handleSelectionChange(val){
				this.multipleSelection  = val
				console.log(this.multipleSelection)
			},
			// 返回
			back() {
				// this.typeId = ''
				// this.typeClassId =' '
				this.queryData()
				this.listOrDetail = !this.listOrDetail
				this.serachForm.use == ''
			},
			uploadUse() {
				this.uploadUseTitle = '应用上传(新增)';
				this.uploadUseForm={
					versionInfo:'',
					version:'',
					use : '',
					deploy : '',
				};
				// this.uploadUseRepeat('uploadUseForm');
				this.uploadUseDialog = true;
			},
			uploadAttachment() {
				// 上传附件
				const formdatas = new FormData();
				this.fileList1.forEach((item, index) => {
					formdatas.append("configfile", item.raw);
				});
				this.fileList2.forEach((item, index) => {
					formdatas.append("file", item.raw);
				});
				formdatas.append("typeClassId", this.addUseForm.typeClassify);
				formdatas.append("typeId", this.addUseForm.type);
				formdatas.append("appName", this.addUseForm.name);
				formdatas.append("version", this.addUseForm.versions);
				formdatas.append("versionInfo", this.addUseForm.brief);
				formdatas.append("appOwner", this.addUseForm.addRadioGround);
				formdatas.append("appInfo", this.addUseForm.appInfo);
				console.log(formdatas)
				service.uploadAttachment(formdatas).then(res => {
					if(res.code == 200){
						this.queryData()
						this.dialogUes = false
					}
				});
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			onSuccess(response, file, fileList){
				console.log(response)
			},
			onChange(file, fileList){
				console.log(fileList)
				this.fileList1 = fileList;
			},
			uploadAttachment2(appId) {
				// 上传附件
				const formdatas = new FormData();
				this.fileList1.forEach((item, index) => {
					formdatas.append("configfile", item.raw);
				});
				this.fileList2.forEach((item, index) => {
					formdatas.append("file", item.raw);
				});
				// formdatas.append("typeClassId", this.addUseForm.typeClassify);
				// formdatas.append("typeId", this.addUseForm.type);
				// formdatas.append("appName", this.addUseForm.name);
				formdatas.append("version", this.addUseForm.versions);
				formdatas.append("versionInfo", this.addUseForm.brief);
				formdatas.append("appId", appId);
				// formdatas.append("appOwner", this.addUseForm.addRadioGround);
				// formdatas.append("appInfo", this.addUseForm.appInfo);
				console.log(formdatas)
				service.uploadAttachment(formdatas).then(res => {
					if(res.code == 200){
						this.queryData()
						this.dialogUes = false
					}
				});
			},
			handleExceed2(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove2(file, fileList) {
				// const _self = this
				return this.$confirm(`确定移除 ${ file.name }？`)
				// .then(() => {
				// 	console.log(_self.uploadUseForm.use)
				// 	_self.uploadUseForm.use = '1'
				// 	_self.$message({
				// 		type: 'info',
				// 		message: '删除成功'
				// 	})
				// }).catch(() => {
				// 	console.log(_self.uploadUseForm.use)
				// 	_self.uploadUseForm.use = '0'
				// 	_self.$message({
				// 		type: 'info',
				// 		message: '已取消删除'
				// 	})
				// })   
			},
			onSuccess2(response, file, fileList){
				console.log(response)
			},
			onChange2(file, fileList){
				console.log(fileList)
				this.fileList2 = fileList;
				this.addUseForm.use = fileList[0].name
			},
			handleSizeChange(val) { // 设置每页多少条
				this.pageSize = val
				this.queryData()
			},
			handleCurrentChange(val) { // 当前页
				this.currentPage = val
				this.queryData()
			},
			handleSizeChange2(val) { // 设置每页多少条
				this.pageSize2 = val
				const datas = {
					appId:this.brief.appId,
					start: (this.currentPage2 - 1) * this.pageSize2,
					limit: this.pageSize2,
				}
				this.queryDataVersion(datas)
			},
			handleCurrentChange2(val) { // 当前页
				this.currentPage2 = val
				const datas = {
					appId:this.brief.appId,
					start: (this.currentPage2 - 1) * this.pageSize2,
					limit: this.pageSize2,
				}
				this.queryDataVersion(datas)
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
	// 超出隐藏
	.none-three {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:3;  /* 设置行数 */
		-webkit-box-orient: vertical;
	}
	// 超出隐藏
	.none-one {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:1;  /* 设置行数 */
		-webkit-box-orient: vertical;
	}
	.use-nav {
		text-align: center;
		padding: 10px 10px;
		color: #333333;
		cursor: pointer;
	}
	.use-nav-top {
		text-align: center;
		color: black;
		padding: 10px 10px;
		cursor: pointer;
	}
	.active {
		color:black;
		font-weight: bold;
		background-color: #D7D7D7;
	}
	.use-list {
		text-align: center;
	}
	.use-list-name {
		cursor: pointer;
		font-weight: bold;
		padding: 20px 0 10px 0;
		font-size: 18px;
		color: black;
		position: relative;
		background: #42b983;
	}
	.use-list-type {
		font-size: 12px;
		color: #999999;
		padding: 10px 0;
	}
	.use-list-brief {
		font-size: 14px;
		margin: 10px;
	}
	.classify {
		// margin: 10px;
		font-size: 12px;
		color: #999999;
	}
	.clearfix {
		margin: 0px 10px 0 10px;
	}
	.btn {
		float: right;
	}
	.lHeight {
		line-height: 37px;
	}
	.active{
		color: #fff;
		background: #66b1ff;
	}
	.btnPosi {
		position: absolute;
		right: 10px;
		top: 10px;
	}
	.useCol {
		margin-top: 20px;
	}
</style>

