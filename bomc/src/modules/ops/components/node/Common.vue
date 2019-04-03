<template>
<div class="block">
	<!-- <h3 class="mes">节点信息  <el-button icon="el-icon-circle-plus-outline"  class="add-mes " size="small" type="success" @click="addMes()">新增节点</el-button></h3> -->
	<el-collapse v-model="form.activeNames" @change="handleChange" class="collapseC">
		<el-collapse-item :title="item.node" :name="item.step" v-for="(item, index) in form.Common" :key="index" class="collapseC">
			<el-form-item label="节点名称" :prop="'Common.'+ index+'.name'" :rules="{validator: validateCodeSize,trigger: 'blur',required:'true'}">
				<el-input v-model="item.name"></el-input>
			</el-form-item>
			<el-button  class="del"  @click="delNode(index)"><i class="iconfont step_btn">&#xe63b;</i>删除该节点</el-button>
			<el-button  class="del"  @click="copyNode(item,index)"><i class="iconfont step_btn">&#xe647;</i>复制该节点</el-button>
			<el-form-item label="节点类型" prop="isScript">
				<el-radio-group v-model="item.isScript">
					<el-radio label="0">命令</el-radio>
					<el-radio label="1">脚本</el-radio>
				</el-radio-group>
			</el-form-item>
			<br/>
			<!-- :prop="'Common.'+ index+'.content'"  :rules="{required: true, message: '命令不能为空', trigger: 'blur'}" -->
			<el-form-item  v-show="item.isScript == 0" label="输入/选择命令" >
				<el-popover
					placement="bottom"
					width="400"
					trigger="click"
					@show="contentShow(item)">
					<el-tree
					class="filter-tree"
					:data="treeArr"
					:props="props"
					default-expand-all
					@node-click="handleNodeClick">
					</el-tree>
					<el-input
						v-model="item.content"
						slot="reference">
					</el-input>
				</el-popover>
			</el-form-item>
			<!-- :prop="'Common.'+ index+'.scriptAddressName'"  :rules="{required: true, message: '脚本不能为空', trigger: 'change'}" -->
			<el-form-item v-show="item.isScript == 1" label="输入/选择脚本" >
				<el-popover
					placement="bottom"
					width="400"
					trigger="click"
					@show="contentShow(item)">
					<el-tree
					class="filter-tree"
					:data="scriptData"
					:props="props"
					default-expand-all
					@node-click="handleNodeClick2">
					</el-tree>
					<el-input
						v-model="item.scriptAddressName"
						slot="reference">
					</el-input>
				</el-popover>
			</el-form-item>
			<el-form-item label-width="0" v-show="item.isScript == 1" >
				<el-upload class="upload-demo" :action="base_api + '/ops/api/v1/mainTask/upload '" :before-remove="beforeRemove" :on-exceed="handleExceed" :headers="myHeaders" :limit="1" :on-success="onSuccess" :show-file-list="false" :file-list="form.Common[index].fileList">
					<el-button size="small" type="text" class="under_line" @click="btnUp(index)">点击上传</el-button>
				</el-upload>
			</el-form-item>
			<el-form-item label="选择主机" :prop="'Common.'+ index+'.resourceGroupName'"  :rules="{type:'array',required: true, message: '主机不能为空', trigger: 'change'}">
				<el-select style="width:100%"  v-model="item.resourceGroupName" placeholder="请选择主机用户" multiple collapse-tags>
					<el-option v-for='(item,index) in hostIPDate' :key="index" :label="item" :value="item"></el-option>
				</el-select>
			</el-form-item>
		</el-collapse-item>
	</el-collapse>
	</div>
</template>

<script>
	import { getToken } from '@/utils/auth'
	import * as service from '@/modules/ops/api/ops/commandManage/admilManage.js'
	import * as service2 from '@/modules/ops/api/ops/taskManagement/taskManagement.js'
	export default {
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
				// 默认展开哪个树形图
				unfoldTreeIs: [],
				TreeName:'',
				// 树形图数据储存
				treeArr: [],
				props:{
					value: 'content',
          			label: 'label'
				},
				filterText:'',
				ceshi:{"code":200,"msg":"操作成功","result":[{"modelName":"普通类型","modelType":1},{"modelName":"服务启停","modelType":2},{"modelName":"部署更新","modelType":3},{"modelName":"自动迁移","modelType":4},{"modelName":"自动巡检","modelType":5},{"modelName":"诊断处理","modelType":6},{"modelName":"资源调配","modelType":7}]},
				indexData:{},
				scriptData:[],
				hostIPDate:[],
			};
		},

		mounted() {
			this.command();
			this.scriptFn();
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
			cascaderChange(){
				
			},
			//IP地址查询
			queryIP() {
				service2.queryIP().then(res => {
					this.hostIPDate = res.result;
				})
			},
			filterNode(value, data) {
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			contentShow(val){
				// 记录是第几个命令
				this.indexData = val
				console.log(this.indexData)
			},
			handleNodeClick(item,node){
				if(!node.data.children){
					this.indexData.content = node.data.content
				}
				console.log(item,node)
			},
			handleNodeClick2(item,node){
				if(!node.data.children){
					this.indexData.scriptAddressName = node.data.object.path
					this.indexData.scriptAddress = node.data.object.path
				}
				console.log(item,node)
			},
			// 脚本数据查询
			scriptFn(){
				const params = {
					name: '',
				}
				service.scriptLink(params).then(res => {
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
				})
			},
			//树形栏数据查询
			command() {
				// types为0时 查询
				const params = {
					name: '',
				}
				service.command(params).then(res => {
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
							item.content = item.object.content;
							item.label = item.object.name;
							if (item.children) {
							deep(item.children);
							}
						});
					};
					deep(res);
					this.treeArr = res
				})
			},
			// 点击上传按钮事件
			btnUp(index) {
				const _self = this
				_self.form.Common[index].fileList = []
				_self.upIndex = index
			},
			// 上传完成时触发的函数
			onSuccess(response, file, fileList) {
				const _self = this
				if(response.code == 200){
					_self.form.Common[_self.upIndex].scriptAddress = response.result
					_self.form.Common[_self.upIndex].scriptAddressName = fileList[0].name
					_self.form.Common[_self.upIndex].isScript = "1"
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


			// 节点验证
			validateCodeSize(rule, value, callback) {
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
					callback(new Error('请输入节点名称'))
				}
				if(bol) {
					callback()
				}
			},
			// 折叠面板函数
			handleChange(val) {
				console.log(val)
				this.form.Common.activeNames = val
			},
			// 复制该节点
			copyNode(datas, indexs) {
				var obj = {};
				obj.resourceGroupName= [];
				for(var i = 0 ; i < datas.resourceGroupName.length; i++) {
					obj.resourceGroupName.push(datas.resourceGroupName[i])
				}
				obj.id = datas.id;
				obj.step = datas.step;
				obj.name = datas.name;
				obj.region = datas.region;
				obj.types = datas.types;
				obj.node = datas.node;
				obj.content = datas.content;
				obj.scriptAddress = datas.scriptAddress;
				obj.scriptAddressName = datas.scriptAddressName;
				obj.fileList = datas.fileList;
				obj.isScript = datas.isScript;
				obj.user = datas.user;
				this.form.Common.splice(indexs + 1, 0, obj);
				for(var i = 0; i < this.form.Common.length; i++) {
					this.form.Common[i].node = "当前为节点 " + Number(i + 1)
					this.form.Common[i].step = Number(i + 1)
					this.form.Common[i].id = Number(i + 1)
				}
			},
			// 删除节点的函数
			delNode(indexs) {
				this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.form.Common.splice(indexs, 1);
					for(var i = 0; i < this.form.Common.length; i++) {
						this.form.Common[i].node = "当前为节点 " + Number(i + 1)
					}
					for(var i = 0; i < this.form.Common.length; i++) {
						this.form.Common[i].step = i + 1
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
			filterText(val) {
				console.log(val)
				this.$refs.tree2.filter(val);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.under_line {
		color: #42B983;
		text-decoration: underline;
		font-size: 14px;
	}
	.del {
		color: #42B983;
		border: 1px solid #42B983;
		border-radius: 6px;
		padding: 4px;
		float: right;
		cursor: pointer;
	}
	.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>