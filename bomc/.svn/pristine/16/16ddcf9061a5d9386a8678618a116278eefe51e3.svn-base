<template>
	<div class="CommandOperation_content">

		<!--<el-tabs v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="命令执行" name="first">-->

		<div >
			<el-form :model="addMainForm" ref="addMainForm" :rules="addMainFormRules" style="margin:10px;width:auto;" label-width="100px">
				<el-form-item label="主机用户" >
					<el-select style="    width: 300px;" multiple collapse-tags v-model="addMainForm.main" placeholder="请选择主机用户" @change="changeCeshi">
						<el-option v-for='(item,index) in hostIPDate' :key="index" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-tag
				style="margin-left:10px"
				v-for="(tag,index) in tags"
				:key="index"
				closable
				@close="closeTag(tag)"
				type="success">
				{{tag}}
			</el-tag>

		</div>
		<div class="crud">

			<div style="width: 851px;">
				<!--<button @click="sendData">执行</button>-->
				<el-button type="primary"  @click="sendData()" round>执行</el-button>
				<el-button type="warning" @click="requestStop()" round>暂停</el-button>
				<el-button type="info" @click="requestContinue()" round>继续</el-button>
				<el-button type="danger" @click="requestKill()" round>中断</el-button>
				<el-button type="success" @click="addDialog(0)" round>另存</el-button>

				<el-button  type="primary" @click="addGetOneDialog = true">
					远程连接<i class="el-icon-upload el-icon--right"></i>
				</el-button>

			</div>
			<textarea id="" v-model="cmd" name="" cols="30" rows="10" placeholder="手动输入命令"></textarea>
			<div class="crud-message">
				<p>
					<span>状态：<i>{{ stateinfo }}</i></span>
				</p>
				<div>
					<p>执行结果：</p>
					<!-- {{datashow}} -->
					<!-- <div v-for="(item,index) in datashow" :key="index"> -->
						<el-card v-for="(item,index) in datashow" :key="index">
							<!-- <div class="pLeft80"></div> -->
							<pre><span style="color:red">主机:</span>{{item.host}}</pre>
							<!-- <div>msg:</div> -->
							<pre><span style="color:red">结果:</span>{{item.msg}}</pre>
							<!-- <div class="pLeft80"></div> -->
							<pre><span style="color:red">状态:</span>{{item.state}}</pre>
							<br/>
						</el-card>
				</div>
			</div>
		</div>
		<div class="CommandOperation_tree" style="height: 475px;overflow: scroll;">
			<div class="tree-head">
				<!--<el-input v-model="filterText" placeholder="输入关键字进行过滤" />-->
				<el-input size="mini" style="width:140px" class="hostIP" placeholder="输入关键字进行过滤" v-model="TreeName" clearable>
				</el-input>
				<el-button size="mini" type="warning" @click="command()">查询</el-button><el-button size="mini" type="warning" @click="addDialog(1)">新增</el-button>
				<!-- <el-button size="mini" type="warning" icon="el-icon-plus" @click="command()">新增</el-button> -->
				<!--新增-->
				<!--<i class="el-icon-error tree-head_del" />-->
			</div>
			<!--命令树-->
			<!-- <el-tree :data="treeArr" node-key="resourceType"  :expand-on-click-node="false" @node-click="handleNodeClick" >
				<span class="custom-tree-node" slot-scope="{ node, data }">
	        	<span>{{ data.resourceType || data.name }}</span>
				<el-button type="text" size="mini" @click="() => remove(node, data)" v-if="!data.resourceType">
					<i class="el-icon-delete show"></i>
				</el-button>
				</span>
			</el-tree> -->
			<el-tree
				:data="treeArr"
				node-key="id"
				:default-expanded-keys="unfoldTreeIs"
				@node-click="handleNodeClick">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ data.object.name }}</span>
					<span >
						<el-button
							v-if="data.object.content"
							type="text"
							size="mini"
							@click="() => remove(node, data)">
							<i class="el-icon-delete"></i>
						</el-button>
					</span>
				</span>
			</el-tree>

		</div>

		<!--<div id="gateone_container" style="width: 6em; height: 3em;">
					<div id="gateone"></div>
				</div>
		<iframe src="src/modules/ops/operations.html"></iframe>-->

		<!--<div id="gateone_container" style="width: 6em; height: 3em;">
			<div id="gateone"></div>
		</div>-->
		<!--<div class="plugin_container">
			<div id="gateone_container" style="width: 6em; height: 3em;">
				<div id="gateone"></div>
			</div>
		</div>-->

		<!-- 远程连接 -->
		<!--<el-dialog :title="dialog.title" :visible.sync="addUserDialog">
			<el-form :model="form">
				<div class="plugin_container">
					<div id="gateone_container" style="width: 6em; height: 3em;">
						<div id="gateone"></div>
					</div>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addDialogFail()">关 闭</el-button>
			</div>
		</el-dialog>-->

		

		<!-- 另存命令弹窗 -->
		<el-dialog title="另存" :visible.sync="addSave">
			<el-form :model="form" style="margin:10px;width:auto;">
				<el-form-item label="命令名称" :label-width="formLabelWidth" required>
					<el-input v-model="nameInfo" auto-complete="off" placeholder="请输入操作名称"></el-input>
				</el-form-item>

				<el-form-item label="平台类别" :label-width="formLabelWidth" required>
					<el-select v-model="formInline.regionAdd" clearable placeholder="选择平台类别" @change='selectChangeAdd($event)'>
						<el-option v-for='(item,index) in platName' :key="index" :label="item.platformName" :value="item.platformId"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="对象类型" :label-width="formLabelWidth" required>
					<el-select v-model="formInline.regionAdd1" clearable placeholder="选择对象类型">
						<el-option v-for='(item,index) in operationName' :key="index" :label="item.resourceTypeName" :value="item.resourceTypeId"></el-option>
					</el-select>
				</el-form-item>
				<!--<el-form-item label="选择脚本" :label-width="formLabelWidth">
					
					<el-upload
						:auto-upload="false"
					  class="upload-demo"
					  :on-change="uploadChange"
					  :action="base_api + '/cps/script/upload '"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  :on-exceed="handleExceed"
					  :limit="1"
					  >
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>

				</el-form-item>-->

				<el-form-item label="输入内容" :label-width="formLabelWidth" required>
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="contentInfos">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addCance()">取 消</el-button>
				<el-button type="primary" @click="saveAdds()">保 存</el-button>
			</div>
		</el-dialog>
		</el-tab-pane>

		<!--<el-tab-pane label="远程连接" name="second" @click="addDialog()">
				<div id="gateone_container" style="width: 60em; height: 37em;" >
					<div id="gateone"></div>
				</div>
			</el-tab-pane>
		
		</el-tabs>-->


		<!-- 新增命令弹窗 -->
		<el-dialog :title="dialog.title" :visible.sync="addUserDialog" @close="closeAdd">
			<el-form :model="addForm" ref="addForm" :rules="addFormRules"  style="margin:10px;width:auto;">
				<el-form-item label="命令名称" :label-width="formLabelWidth" prop="nameInfo">
					<el-input v-model="addForm.nameInfo" auto-complete="off" placeholder="请输入操作名称"></el-input>
				</el-form-item>

				<el-form-item label="对象类型" :label-width="formLabelWidth" prop="formType">
					<el-cascader
						:options="cascaderIndex"
						clearable
						v-model="addForm.formType"
						:props="props"
						@change="cascaderIndexChange">
					</el-cascader>
				</el-form-item>

				<!--<el-form-item label="选择脚本" :label-width="formLabelWidth">

					<el-upload ref="uploads" :auto-upload="false" class="upload-demo" :on-change="uploadChange" :action="base_api + '/cps/script/upload '" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :on-exceed="handleExceed" :limit="1">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>

				</el-form-item>-->

				<el-form-item label="输入内容" :label-width="formLabelWidth" prop="contentInfo">
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="addForm.contentInfo">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addDialogFail()">取 消</el-button>
				<el-button type="primary" @click="saveAddInfo('addForm')">保 存</el-button>
			</div>
		</el-dialog>


		<el-dialog title="选择主机" :visible.sync="addGetOneDialog" @close="closeMainDialog('getOneForm')" style="margin:auto;width:1200px;">
			<el-form :model="getOneForm" ref="getOneForm" :rules="getOneFormRules" style="margin:10px;width:auto;" label-width="100px">
				<el-form-item label="主机用户" prop="main">
					<el-select  @change="getOneRequest"  v-model="getOneForm.main" placeholder="请选择主机">
						<el-option v-for='(item,index) in hostIPDate' :key="index" :label="item" :value="item"></el-option>
					</el-select>
					
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button  type="primary" @click="addGetOneDialog = false">
					<a :href='parms' target="_blank" id="aHref">远程连接<i class="el-icon-upload el-icon--right"></i></a>
				</el-button>
			</div>
		</el-dialog>
	</div>

</template>
<script>
	import * as service from '@/modules/ops/api/ops/commandManage/admilManage.js'
	import { Message, MessageBox } from 'element-ui'
import { setTimeout } from 'timers';
	//import '@/modules/ops/views/commandManage/operManage/gateone.js'
	export default {
		data() {
			const data = [{

				id: 1,
				label: '一级 1',
				children: [{
					id: 4,
					label: '二级 1-1',
					children: [{
						id: 9,
						label: '三级 1-1-1'
					}, {
						id: 10,
						label: '三级 1-1-2'
					}]
				}]
			}, {
				id: 2,
				label: '一级 2',
				children: [{
					id: 5,
					label: '二级 2-1'
				}, {
					id: 6,
					label: '二级 2-2'
				}]
			}, {
				id: 3,
				label: '一级 3',
				children: [{
					id: 7,
					label: '二级 3-1'
				}, {
					id: 8,
					label: '二级 3-2'
				}]
			}];
			return {
				// ---------------------------------------------------------------
				// 属性图格式转变
				// defaultProps: {
				// 	label: function(datas,node) {
				// 		return datas.object.name	
				// 	},
				// 	id:'id'
				// },
				// getOne弹框
				addGetOneDialog:false,
				// 选址主机
				getOneFormRules:{
					main: [
						{required: true, message: '请选择主机', trigger: 'change' }
					],
				},
				getOneForm:{
					main:'',
				},
				// 标签页
				 tags: [],
				// 新增主机弹框
				addMainDialog:false,

				// 新增主机
				addMainForm:{
					main:[],
					user:'',
				},
				addMainFormRules:{
				},
				// 默认展开哪个树形图
				unfoldTreeIs: [],
				// 树形图数据储存
				treeArr: [],
				// 新增的弹框
				dialog: {
					show: false,
					title: '新增命令',
				},
				// 判断新增弹框显示隐藏
				addUserDialog: false,
				// 新增的表单数据
				addForm : {
					formType: [],
					contentInfo: "",
					nameInfo: '',
				},
				addFormRules: {
					formType: [
						{ required: true, message: '请选择对象类型', trigger: 'change' }
					],
					nameInfo: [
						{ required: true, message: '请输入命令名称', trigger: 'blur' },
						// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
					contentInfo: [
						{ required: true, message: '请输入内容', trigger: 'blur' },
						// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
				},
				// 表单标题的宽度
				formLabelWidth: "120px",

				// 保存级联选择器的数据
				cascaderIndex: [],

				// 改变级联选择器的key值
				props: {
					value: 'id',
					label: 'object'
				},
				// 右边树形图输入框
				TreeName: '',
				// 选择的主机数组
				hostIPDate: [],
				userInfoData:[],
				// 选中的值
				hostip: "",
				userInfo: "",
				// ---------------------------------------------------------------

				parms: 'javascript:void(0);',
				classA: "false",
				classB: "false",
				classC: "false",
				classD: "false",
				classE: "false",
				data5: JSON.parse(JSON.stringify(data)),
				
				addUserDialog: false,
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
				filterText: '',
				
				formInline: {
					user: "",
					region: "",
					region1: "",
					regionAdd: "",
					regionAdd1: "",
				},
				contentInfo: '',
				fileList: [],
				host: '',
				username: '',
				cmd: '',
				treeId: '',
				password: '',
				datashow: [],
				id: '',
				cmdinfo: '',
				usernameinfo: '',
				stateinfo: '',
				getOneDate: '',
				addUserlog: false,
				
				nameInfo: '',
				platName: [],
				operationName: [],
				base_api: 'http://192.168.137.10:8081',
				isScript: '1',
				
				addSave: false,
				
				activeName: 'first',
				
				forms: {

					content: ''

				},
				contentInfos: '',
			}
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val)
			}
//			cmd(curVal,oldVal) {
//				console.log(curVal)
//				 sessionStorage.setItem("cmd", curVal);
//				console.log(this.$route.path);
//				
//			},
		},

		mounted() {	
//			this.cmd = this.$store.getters.cmd
//			 this.$store.getters.cmd =  this.cmd
//			 this.cmd = sessionStorage.getItem("cmd");   
			if(this.cmd == 'null') {
				this.cmd = ''
			}
			this.queryIP();
			this.command();
			// 获取新增级联选择数据
			this.queryIndexCascader()
			//this.addDialog();
			// this.getOneRequest();
		},
		methods: {
			// -----------------------------------------------------------------------
			// 关闭弹框的毁掉
			closeMainDialog(formName) {
				this.$refs[formName].resetFields();
			},
			changeCeshi(val){
				this.tags = val
			},
			// 删除标签事件
			closeTag(tag) {
				this.tags.splice(this.tags.indexOf(tag), 1);
			},
			// 主机change事件
			userChange(val) {
				console.log(val)	
				for(var i = 0 ; i<this.hostIPDate.length;i++) {
					if(val == this.hostIPDate[i].host){
						this.userInfoData = this.hostIPDate[i].username
					}
				}
				
			},
			// 对象类型选择切换
			cascaderIndexChange(val) {
				console.log(val)
			},
			//新增弹出框
			addDialog(types) {
				// types 判断是新增还是另存 0另存 1新增
				if(types == 0) {
					this.addForm.contentInfo = this.cmd 
					this.dialog.title = '另存'
				}else {
					this.addForm.contentInfo = ""
					this.dialog.title = '新增'
				}
				
				// 判断是编辑还是新增
				this.editAndAdd = true
				// 判断显示的对话框
				this.addUserDialog = true
			},
			
			
			//新增弹出框取消
			addDialogFail() {
				this.addUserDialog = false
			},

			// 新增命令关闭
			closeAdd() {
				this.$refs['addForm'].resetFields();
			},
			//新增命令保存
			saveAddInfo(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const params = {
							platformId: this.addForm.formType[0],
							resourceClassId: this.addForm.formType[1],
							resourceTypeId: this.addForm.formType[2],
							name: this.addForm.nameInfo,
							content: this.addForm.contentInfo,
						}
						if(this.editAndAdd) {
							service.AddInfo(params).then(res => {
								this.$message({
									type: 'success',
									message: res.msg
								})
								this.addUserDialog = false
								this.command();
							}).catch(() => {
								this.$message({
									type: 'info',
									message: res.msg
								})
							})
						}else {
							params.id = this.editId
							service.modifyInfo(params).then(res => {

								this.addUserDialog = false
								
								this.command();
								this.$message({
									type: 'success',
									message: res.msg
								});
								this.addUserDialog = false
								this.fileList = [];
							}).catch(() => {
								this.$message({
									type: 'info',
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
			// 获取新增弹框级联数据
			queryIndexCascader() {
				const params = {
					level:3
				}
				service.queryIndexCascader(params).then(res => {
					this.cascaderIndex = res;
				})
			},
			handleNodeClick(datas) {
				console.log(datas)
				// 判断是否有content参数
				if(datas.object.content) {
					// 有参数时执行
					this.cmd = datas.object.content
					this.treeId = datas.object.id
				}else {
					// 没有参数时执行
				}

				
			},
			// -----------------------------------------------------------------------
			

			//树形栏数据查询
			command() {
				// types为0时 查询
				const params = {
					name: this.TreeName,
				}
				service.command(params).then(res => {
					console.log(res)
					
					// this.treeArr = res
					for(var i = 0 ; i< res.length; i++ ) {
						var datai = res[i]
						this.unfoldTreeIs.push(datai.id)
						for(var j = 0;j< datai.children.length; j++) {
							var dataj = datai.children[j]
							this.unfoldTreeIs.push(dataj.id)
							for(var k = 0;k<dataj.children.length; k++) {
								var datak = dataj.children[k]
								this.unfoldTreeIs.push(datak.id)
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
					this.treeArr = res
					console.log(this.unfoldTreeIs)
				})
			},
			//树节点删除
			remove(node, data) {
				// const parent = node.parent;
				// const children = parent.data.children || parent.data;
				// const index = children.findIndex(d => d.id === data.id);
				this.handleDelete(data.object.id);
				// children.splice(index, 1);
			},
			//tab切换
			handleClick(tab, event) {
			},
			//getOne请求
			getOneRequest(val) {
				console.log(val)
				const params = {
					url: val.split('@')[0],
					user: val.split('@')[1]
				}
				service.getOneRequest(params).then(res => {
					this.getOneDate = res.result
					var data = res.result; 
					var res = '';
					for(var value in data) {
						res += value + '=' + data[value] + '&'
					}
					// var aScript = document.createElement('a')
					// aScript.href = 'src/modules/ops/views/commandManage/test/index1.html?id=' + encodeURIComponent(res);
					// aScript.target = '_blank'
					// console.log(aScript);
					// aScript.click()
					// 调试
					// this.parms = 'src/modules/ops/views/commandManage/test/index1.html?id=' + encodeURIComponent(res)
					const isDev = process.env.NODE_ENV === "development";
					if (isDev) {
						this.parms = 'src/modules/ops/views/commandManage/test/index1.html?id=' + encodeURIComponent(res)
					}else {
						this.parms = 'static/index1.html?id=' + encodeURIComponent(res)
					}	
					
					// var aHrefHTML = document.getElementById('aHref')
					// aHrefHTML.click()
					// this.parms = 'javascript:void(0);'
					// 开发环境 测试环境
					// this.parms = 'static/index1.html?id=' + encodeURIComponent(res)
					// window.open('src/modules/ops/views/commandManage/test/index1.html?id=' + encodeURIComponent(res)) 
										// this.connectGetOne(res.result);
				})
				//this.connectGetOne(this.getOneDate)
			},

			//弹出框取消
			addDialogFail() {
				this.addUserDialog = false
			},


			//暂停
			requestStop() {
				const params = {
					id: this.id
				}
				service.requestStop(params).then(res => {
					console.log(res)
					// Message({
					// 	message: res.result
					// })
				})
			},

			//继续
			requestContinue() {
				const params = {
					id: this.id
				}
				service.requestContinue(params).then(res => {
					console.log(res)
					// Message({
					// 	message: res.result
					// })
					// this.sendData()
					let obj = {
						isFirst: true
					};
					
					const timer = setInterval(() => {
						this.freshData(timer, obj);
					}, 3000)
				})
			},

			//中断
			requestKill() {
				const params = {
					id: this.id
				}
				service.requestKill(params).then(res => {
					Message({
						message: res.msg
					})
				})
			},
			selectChange(e) { //监听平台类别的变化
				this.formInline.region1 = ''
				let params = {
					platformId: this.formInline.region
				}
			},
			//新增平台类别监听
			selectChangeAdd(e) {
				this.formInline.regionAdd1 = ''

				let params = {
					platformId: this.formInline.regionAdd
				}

			},

			
			//另存弹框
			addSaves() {
				this.addSave = true
				this.platFormType = this.platName
				this.nameInfo = ''
				this.formInline.regionAdd = ''
				this.formInline.regionAdd1 = ''
				this.contentInfos = this.cmd
			},
			addCance() {
				this.addSave = false
			},
			//另存
			saveAdds() {

				const params = {
					name: this.nameInfo,
					platformId: this.formInline.regionAdd,
					resourceTypeId: this.formInline.regionAdd1,
					content: this.contentInfos
				}

				service.AddInfo(params).then(res => {
					this.$message({
						type: 'success',
						message: '添加成功!'
					})
					this.command();
				})
				this.addSave = false

			},

			//删除节点信息
			handleDelete(id) {

				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {

					const params = {
						id: id
					}
					service.deleteInfo(params).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
						this.command()
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '主节点无法删除'
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},

			//IP地址查询
			queryIP() {
				service.queryIP().then(res => {
					this.hostIPDate = res.result;
					console.log(this.hostIPDate)
				})
			},


			//新增弹出框
			addDialogs() {
				this.addUserlog = true
				this.platFormType = this.platName
				this.nameInfo = ''
				this.formInline.regionAdd = ''
				this.formInline.regionAdd1 = ''
				this.contentInfo = ''
			},
			//新增弹出框取消
			addDialogFails() {
				this.addUserlog = false
			},
			filterNode(value, data) {
				if(!value) return true
				return data.label.indexOf(value) !== -1
			},
			//执行
			sendData() {
				if(this.tags.length == 0){
					this.$message({
						type: 'info',
						message: '请选择主机'
					})
					return
				}
				const data1 = {
					// 'username': this.userInfo,
					// 'host': this.hostip,
					'resourceGroup':this.tags.join(','),
					'cmd': this.cmd,
					// 'password': this.password,
					'id': this.treeId
				}
				
				console.log(JSON.stringify(data1))
				
				service.sendData1(data1).then(res => {
					if(res.code == '200') {
						if(!res.result.resolveResult) {
							//this.freshData(res.result.id)

							//	this.datashow.innerHTML(txts);
							Message({
								message: '正在获取执行结果',
								type: 'info',
								duration: 0
							});
							let obj = {
								isFirst: true
							};
							
							const timer = setInterval(() => {
								this.freshData(timer, obj);
							}, 3000)
							
						}
						this.id = res.result.id
						this.datashow = res.result.resolveResult
						this.datashow = JSON.parse(this.datashow);
						// for(var i = 0 ; i < this.datashow.length; i ++){

						// }
						this.cmdinfo = this.cmd
						this.usernameinfo = res.result.username

						this.stateinfo = res.result.state
					}
				});
				
				
				
				
				
				
			},
			//刷新请求
			freshData(timer, obj) {
				const data2 = {
					id: this.id
				}
				service.fresh(data2).then(res => {
					if(res.code == '200') {
						if(res.result.state == '任务暂停' || res.result.state == '任务出错' || res.result.state == '任务完成') {
							clearInterval(timer);
							Message.closeAll();
							Message({
								message: res.result.state,
								type: 'success',
								duration: 5 * 1000
							});
						}
						if(!res.result.resolveResult && obj.isFirst) {
							Message({
								message: '正在获取执行结果',
								type: 'info',
								duration: 0
							});
							
							obj.isFirst = false;
						}else if(res.result.resolveResult) {
							clearInterval(timer);
							
							Message.closeAll();
							
							Message({
								message: res.result.state,
								type: 'success',
								duration: 5 * 1000
							});
							

							
						}
						this.id = res.result.id
						this.datashow = res.result.resolveResult
						this.datashow = JSON.parse(this.datashow);
						this.cmdinfo = this.cmd
						this.usernameinfo = res.result.username

						if(res.result.state == "任务出错") {
							this.classA = false
							this.classB = true
							this.classC = true
							this.classD = true
							this.classE = true
						} else if(res.result.state == "任务完成") {
							this.classA = true
							this.classB = false
							this.classC = true
							this.classD = true
							this.classE = true
						} else if(res.result.state == "任务就绪") {
							this.classA = true
							this.classB = true
							this.classC = false
							this.classD = true
							this.classE = true
						} else if(res.result.state == "任务暂停") {
							this.classA = true
							this.classB = true
							this.classC = true
							this.classD = false
							this.classE = true
						} else if(res.result.state == "任务运行中") {
							this.classA = true
							this.classB = true
							this.classC = true
							this.classD = true
							this.classE = false
						}
						this.stateinfo = res.result.state
					}
				})
			},
			append(data) {
				const newChild = {
					id: id++,
					label: 'testtest',
					children: []
				};
				if(!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.push(newChild);
			},

			uploadChange(file, fileList) {

				if(fileList[0].raw.type.indexOf('sh') > -1) {
					this.fileList = fileList;
				} else {
					this.$message.error("必须上传 .sh 文件");
				}

			},
			deleteRow() {
				var ids = [];
				this.multipleSelection.forEach((item, index) => {
					ids.push(item.id)
				})

				service.deleteRow(ids).then(res => {
					this.queryData()
				})
			}
		},
		
	}
</script>
<style lang="scss" scoped>
	.show {
		display: none;
	}
	
	.el-tree-node__content:hover {
		height: 26px;
		line-height: 26px;
		.show {
			display: inline;
		}
	}
	
	.user {
		margin: 30px 0;
		display: inline-block;
	}
	
	.user input {
		height: 33px;
		width: 269px;
	}
	
	.user-name {
		display: inline-block;
		margin: 0 118px;
		/*position: relative;*/
	}
	
	.user-name input {
		height: 33px;
		width: 293px;
	}
	
	.crud {
		margin-top: 20px;
		width: 65%;
		display: inline-block;
	}
	
	.CommandOperation_content {
		padding: 20px;
		font-size: 14px;
		.painter {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			align-content: center;
		}
	}
	
	.right {
		/*position: absolute;
    top: 0;
    right: 80px;*/
		/*height: 33px;
   width: 300px;*/
		margin: 0px 17px;
		display: inline-block;
	}
	
	.right input {
		height: 33px;
		width: 298px;
	}
	
	.crud-head button {
		height: 35px;
		line-height: 35px;
		width: 75px;
		border: none;
		border-radius: 5px;
		border: 1px solid #999;
		background: #fff;
		margin-right: 10px;
	}
	
	.crud-head button:hover {
		background: #2d92ed;
		border: 0;
	}
	
	.crud-state {
		height: 45px;
		line-height: 41px;
		border: 1px solid #ccc;
	}
	
	.crud-state span {
		padding-left: 10px;
		font-size: 16px;
	}
	
	.crud—block {
		float: right;
	}
	
	.crud—block span {
		font-size: 14px;
		font-size: 14px;
		vertical-align: middle;
		text-align: center;
		height: 30px;
		width: 108px;
		line-height: 30px;
		display: inline-block;
	}
	
	.bj1 {
		background: #2d92ed;
		color: #ffffff;
	}
	
	.bj2 {
		background: #008000;
		color: #ffffff;
	}
	
	.bj3 {
		background: #d5e9fb;
		color: #999;
	}
	
	.crud-message {
		height: 371px;
		width: 100%;
		background: #e4eef7;
		margin-top: 10px;
		padding: 10px 20px;
		overflow: scroll;
	}
	
	.crud-message p {
		height: 30px;
	}
	
	.crud-message .fl {
		float: right;
	}
	
	.crud-CommandOperation {
		width: 89%;
		float: right;
		line-height: 1.5;
	}
	
	textarea {
		width: 100%;
		height: 125px;
		background: #e4eef7;
		margin-top: 10px;
		border: 0;
		resize: none;
		outline: none;
		padding: 15px;
	}
	
	.CommandOperation_tree {
		margin-top: 35px;
		width: 28%;
		float: right;
		margin-right: 40px;
	}
	
	.tree-head {
		background: #A7cff4;
		height: 45px;
		line-height: 45px;
	}
	
	.tree-head .el-input {
		width: 55%;
		margin-left: 25px;
	}
	
	.tree-head i {
		float: right;
		color: #2d92ed;
		margin: 15px 18px 0px 0px;
		font-size: 18px;
		cursor: pointer;
	}
	
	.tree-head_del {
		margin-right: 30px !important;
		font-size: 16px !important;
	}
	
	.plugin_container {
		position: relative;
		width: 727px;
		height: 300px;
	}
	
	.hostIP {
		width: 299px;
	}
	.pLeft80 {
		margin-left: 80px;
	}
	.pLeft120 {
		margin-left: 120px;
	}
</style>