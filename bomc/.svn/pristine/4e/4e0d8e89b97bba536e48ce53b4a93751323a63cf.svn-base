<template>
<div class="block">
	<!-- <h3 class="mes">节点信息  <el-button icon="el-icon-circle-plus-outline"  class="add-mes " size="small" type="success" @click="addMes()">新增节点</el-button></h3> -->
	<el-collapse v-model="form.activeNames" @change="handleChange" class="collapseC">
		<el-collapse-item :title="item.node" :name="item.step" v-for="(item, index) in form.deployUpdateTask" :key="index" class="collapseC">
			
			<el-form-item  label="节点名称"  :prop="'deployUpdateTask.'+ index+'.name'"  :rules="{required: true,validator: validateFontSize,  trigger: 'blur'}">
				<el-input v-model="item.name"></el-input>
			</el-form-item>
			<el-button  class="del"  @click="delNode(index)"><i class="iconfont step_btn">&#xe63b;</i>删除该节点</el-button>
			<el-button  class="del"  @click="copyNode(item,index)"><i class="iconfont step_btn">&#xe647;</i>复制该节点</el-button>
			<el-form-item label="应用类型"  :prop="'deployUpdateTask.'+ index+'.appOwner'"  :rules="{required: true,message: '请选择应用类型',  trigger: 'change'}">
				<el-radio-group v-model="item.appOwner" @change="typeClassIdSelect(item,index)">
					<el-radio label="0">公有</el-radio>
					<el-radio label="1">私有</el-radio>
				</el-radio-group>
			</el-form-item>
			<br/>
			<el-form-item label="选择应用"  :prop="'deployUpdateTask.'+ index+'.useChoose'"  :rules=" { required: true, message: '请选择应用', trigger: 'change' }">
				<el-cascader
					:options="item.UseTreeData"
					v-model="item.useChoose"
					@change="cascaderChange(item,index)">
				</el-cascader>
			</el-form-item>
			
			<span style="line-height: 35px;">{{item.path}}</span>
			<br/>
			<div v-if="item.scriptBol == 2">
				<el-form-item label="节点类型" prop="isScript">
					<el-radio-group v-model="item.isScript" @change="isScrChange">
						<el-radio label="0">命令</el-radio>
						<el-radio label="1">脚本</el-radio>
					</el-radio-group>
				</el-form-item>
				<br/>
				<!--  :prop="'deployUpdateTask.'+ index+'.startCmd'"  :rules="{required: true, message: '命令不能为空', trigger: 'blur'}" -->
				<el-form-item v-show="item.isScript == 0" label="输入命令">
					<el-input v-model="item.startCmd"></el-input>
				</el-form-item>
				<!-- :prop="'deployUpdateTask.'+ index+'.scriptAddressName'"  :rules="{required: true, message: '脚本不能为空', trigger: 'change'}" -->
				<el-form-item v-show="item.isScript == 1" label="选择脚本" >
					<el-select v-model="form.deployUpdateTask[index].scriptAddressName" placeholder="请选择脚本" clearable>
						<el-option
							v-for="item in fileListChoose"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label-width="0" v-show="item.isScript == 1" >
					<el-upload class="upload-demo" :action="base_api + '/ops/api/v1/auto_deploy/upload'" :before-remove="beforeRemove" :on-exceed="handleExceed" :headers="myHeaders" :limit="1" :on-success="onSuccess" :show-file-list="false" :file-list="form.deployUpdateTask[index].fileList">
						<el-button size="small" type="text" class="under_line" @click="btnUp(index)">点击上传</el-button>
					</el-upload>
				</el-form-item>	
				<el-form-item v-show="item.isScript == 1" label="启动脚本路径" >
					<el-input v-model="item.startScript " placeholder="请输入启动脚本路径"></el-input>
				</el-form-item>
			</div>
			
			<br/>
			<el-form-item  label="选择主机用户" :prop="'deployUpdateTask.'+ index+'.resourceGroupName'"  :rules="{type:'array',required: true, message: '对象不能为空', trigger: 'change'}">
				<el-select style="width:100%"  v-model="item.resourceGroupName" placeholder="请选择主机用户" multiple collapse-tags>
					<el-option v-for='(item,index) in hostIPDate' :key="index" :label="item" :value="item"></el-option>
				</el-select>
			</el-form-item>
			<br/>
			<el-tag
				style="margin-left:10px"
				v-for="tag in form.deployUpdateTask[index].resourceGroupName"
				:key="tag.name"
				closable
				@close="closeTag(tag,index)"
				type="success">
				{{tag}}
			</el-tag>
			<br/>
			<el-form-item label="安装路径" :prop="'deployUpdateTask.'+ index+'.installDir'"  :rules=" { required: true, message: '请输入安装路径', trigger: 'blur' }">
				<el-input v-model="item.installDir" placeholder="请输入安装路径"></el-input>
			</el-form-item>
			<!-- <el-form-item label="日志路径" >
				<el-input v-model="item.name" placeholder="请输入日志路径"></el-input>
			</el-form-item> -->
			
			<!-- <el-form-item label="部署实例数" >
				<el-input v-model="item.name" placeholder="请输入配置文件目标路径"></el-input>
			</el-form-item> -->
		</el-collapse-item>
	</el-collapse>
	</div>
</template>

<script>
	import { getToken } from '@/utils/auth'
	import * as service from '@/modules/ops/api/ops/components/nodeDeployUpdateTask.js'
	import scriptData from '@/modules/ops/components/nodeElement/scriptData'
	export default {
		components: {
			scriptData
		},
		props: {
			form: {
				type: Object,
				default: []
			},
			// getToken:  Function,
		},
		data() {
			return {
				base_api : '',
				fileListChoose:[],

				// 部署
				hostIPDate:[],

			};
		},

		mounted() {
			this.queryIP()
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
			// 脚本命令事件
			isScrChange(val){
				// 0是命令 1是脚本
				// console.log(val)
				// if(val == 0){
				// 	this.$refs['scriptAddressName'].clearValidate()
				// }else if(val == 1){
				// 	console.log(this.$refs['startCmd'])
				// 	this.$refs['startCmd'].clearValidate()
				// }
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
						item.UseTreeData = res;
						
					// }else {
					// 	this.$message({
					// 		type: 'error',
					// 		message: res.msg
					// 	})
					// }
					
				})
			},
			// 选择公有私有的事件
			typeClassIdSelect(item,index) {
				item.useChoose = []
				item.scriptBol = ''
				this.queryDataUseTree(item,index)
			},
			// 获取主机用户事件
			queryIP() {
				console.log(111)
				service.queryIP().then(res => {
					this.hostIPDate = res.result;
				})
			},
			// 级联选择事件
			cascaderChange(item,index){
				console.log(item)
				this.queryDataUseTree(item,index)
				item.scriptBol = item.useChoose[0].split(':')[1].split('+')[0]
				console.log(item.useChoose[3].split('/'))
				item.path = item.useChoose[3].split('/')[item.useChoose[3].split('/').length-1].split('*')[0]
				
				console.log(item.scriptBol)
			},
			// 验证节点
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
			// 删除标签事件
			closeTag(tag,index) {
				this.form.deployUpdateTask[index].resourceGroupName.splice(this.form.deployUpdateTask[index].resourceGroupName.indexOf(tag), 1);
			},

			// ------------------------------------脚本上传和选择------------------------------------
			// 点击上传按钮事件
			btnUp(index) {
				const _self = this
				_self.form.deployUpdateTask[index].fileList = []
				_self.upIndex = index
			},
			// 上传完成时触发的函数
			onSuccess(response, file, fileList) {
				console.log(fileList)
				const _self = this
				if(response.code == 200){
					_self.form.deployUpdateTask[_self.upIndex].startUrl = response.result
					_self.form.deployUpdateTask[_self.upIndex].scriptAddress = response.result
					console.log(fileList[0].response.result.split('/'))
					console.log(fileList[0].response.result.split('/').length)
					
					// _self.form.deployUpdateTask[_self.upIndex].scriptAddressName = fileList[0].response.result.substring(fileList[0].response.result.lastIndexOf('\\') + 14,fileList[0].response.result.length)
					_self.form.deployUpdateTask[_self.upIndex].scriptAddressName = fileList[0].response.result.split('/')[fileList[0].response.result.split('/').length-1]
					_self.form.deployUpdateTask[_self.upIndex].isScript = "1"
				}else {
					this.$message({
						type: 'warning',
						message: response.msg
					}); 
				}
			},
			//文件上传
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			// ------------------------------------脚本上传和选择------------------------------------


			// 新增配置信息
			// 折叠面板函数
			handleChange(val) {
				console.log(val)
				this.form.deployUpdateTask.activeNames = val
			},
			// 复制该节点
			copyNode(datas, indexs) {
				var obj = {};
				// this.queryDataUseTree(datas, indexs)
				obj.startUrl = datas.startUrl;
				obj.UseTreeData = datas.UseTreeData;
				obj.scriptBol = datas.scriptBol;
				obj.appOwner = datas.appOwner;
				obj.useChoose = datas.useChoose;
				obj.installDir = datas.installDir
				obj.id = datas.id;
				obj.step = datas.step;
				obj.name = datas.name;
				obj.region = datas.region;
				obj.types = datas.types;
				obj.node = datas.node;
				obj.startCmd = datas.startCmd;
				obj.startScript = datas.startScript;
				
				obj.scriptAddress = datas.scriptAddress;
				obj.scriptAddressName = datas.scriptAddressName;
				obj.fileList = datas.fileList;
				obj.isScript = datas.isScript;
				obj.user = datas.user;
				obj.resourceGroupName= [];
				for(var i = 0 ; i < datas.resourceGroupName.length; i++) {
					obj.resourceGroupName.push(datas.resourceGroupName[i])
				}
				this.form.deployUpdateTask.splice(indexs + 1, 0, obj);
				for(var i = 0; i < this.form.deployUpdateTask.length; i++) {
					this.form.deployUpdateTask[i].node = "当前为节点 " + Number(i + 1)
					this.form.deployUpdateTask[i].step = Number(i + 1)
					this.form.deployUpdateTask[i].id = Number(i + 1)
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
					for(var i = 0; i < this.form.deployUpdateTask.length; i++) {
						this.form.deployUpdateTask[i].node = "当前为节点 " + Number(i + 1)
					}
					for(var i = 0; i < this.form.deployUpdateTask.length; i++) {
						this.form.deployUpdateTask[i].step = i + 1
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
		},
		watch: {
		}
	};
</script>
<style lang="scss" scoped>
	.del {
		color: #42B983;
		border: 1px solid #42B983;
		border-radius: 6px;
		padding: 4px;
		float: right;
		cursor: pointer;
	}
	.under_line {
		color: #42B983;
		text-decoration: underline;
		font-size: 14px;
	}
</style>