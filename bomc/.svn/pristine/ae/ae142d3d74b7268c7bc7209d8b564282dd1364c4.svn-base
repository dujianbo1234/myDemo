<template>
	<div class='container'>
		<div class="" style="width: 100%;height: auto;border: 1px solid transparent;">

			<div class="conRight" style="width:100%;height: auto;">
				<div class="RightRow1" style="">
					<el-row>
						<el-col>
							<el-card>
								
<!--<el-form :inline="true" :model="formInline" ref="formInline"  label-position="right" label-width="70px" size="small">	-->
<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
							        <el-form-item label="角色名称" prop="roleName">
										<el-input v-model="formInline.roleName" style="width: 210px;"></el-input>
									</el-form-item>
											
								<el-form-item label="角色状态" prop="status">
								<el-select  value="所有" v-model="formInline.status" placeholder="所有" style="height: 36px;width: 210px;">
									<el-option label="所有" value=""></el-option>
									<el-option label="正常" value="0"></el-option>
									<el-option label="禁用" value="1"></el-option>
								</el-select>
								</el-form-item>
								
		<el-button class="search_btn" @click="roleSearch2(formInline)" style="margin-left:10px;">查询</el-button>
		<el-button class="opt_btn"  @click="resetChongZhi('formInline')">重置</el-button>								
						
		<i class="iconfont step_btn" v-bind:class="[isShowing ? blurClass : '',bkClass]" @click="arrowTest()">&#xe619;</i>
		<i class="iconfont step_btn" @click="arrowTest1()">&#xe615;</i>
									
									
				<div ref="schItemShow2" class="schItemShow">
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

							
								</div>
								<!--{{tableData[0]}}-->
								<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" :default-sort="{order: 'ascending'}" @selection-change="handleSelectionChange" @select-all="selectAllRus">
									<el-table-column type="selection" width="55">
									</el-table-column>
									<el-table-column prop="roleId" label='角色编号' width="80">
									</el-table-column>
									<el-table-column prop="roleName" label='角色名称' width="100">
									</el-table-column>

									<el-table-column prop="createTime" resizable sortable label='创建时间' width="180">
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
		
		<el-table-column label='操作管理' fixed="right" width="110">
									<template value="aa" slot-scope="scope">
			<i class="iconfont co" title="禁用"  @click="handleDelete(scope.row.roleId,1)">&#xe65a;</i> 
			<i class="iconfont co" title="恢复" @click="beback(scope.row.roleId)">&#xe65c;</i>
								</template>
		</el-table-column>
								
						<el-table-column label='信息编辑' fixed="right" width="130">
									<template value="aa" slot-scope="scope">
										
	<el-button class="form_btn" size="mini"   @click="handleEdit(scope.row)">编辑</el-button>
											
	<el-button class="form_btn" size="mini"   @click="handleDelete(scope.row.roleId,2)">删除</el-button>
									
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

		<!--01 新增-->

		<el-dialog title="新增角色" :visible.sync="addUserRle" :before-close="handleClose">
			<el-form :model="formAdd" :rules="rules" ref="formAdd" style="margin:10px;width:auto;">

				<el-form-item label="角色名称:" :label-width="formLabelWidth" prop="roleName" required>
					<el-input v-model.trim="formAdd.roleName" auto-complete="off" v-on:blur="blurCheck(formAdd.roleName)"></el-input>
				</el-form-item>

				<el-form-item label="描述:" :label-width="formLabelWidth" prop="remark" required>
					<el-input v-model.trim="formAdd.remark" autocomplete="off" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="权限列表:" :label-width="formLabelWidth">

					<!--{{showRigData}}-->
					<el-tree ref="tree0" @node-click="treeAdd0" class="treeSty" :default-expanded-keys="[22, 33]" :data="showRigData" show-checkbox node-key="permissionId" :props="defaultProps3">
					</el-tree>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addCommit('formAdd',formAdd,'tree0')">提交</el-button>

				<el-button @click="addUserRle = false">关闭</el-button>

			</div>
		</el-dialog>

		<!--03-编辑-->
		<el-dialog title="编辑角色" :visible.sync="resetDialog22" :before-close="handleClose">
			<el-form :model="formEd" :rules="rules" ref="formEd" style="margin:10px;width:auto;">

				<el-form-item label="角色名称:" :label-width="formLabelWidth" prop="roleName" required>
					<el-input v-model.trim="formEd.roleName" auto-complete="off" v-on:blur="blurCheck(formEd.roleName)"></el-input>
				</el-form-item>
				<el-form-item label="描述:" :label-width="formLabelWidth" prop="remark" required>
					<el-input v-model.trim="formEd.remark" auto-complete="off"></el-input>
				</el-form-item>
				<!--{{showRigData}}-->
				<el-form-item label="权限列表:" :label-width="formLabelWidth">

					<!--<el-tree :data="showRigData" ref="tree" class="treeSty" :default-expanded-keys="[22, 33]" show-checkbox @node-click="handleAdd2" node-key="permissionId" :default-checked-keys="this.nedArr" :props="defaultProps3">
					</el-tree>-->
					<el-tree :data="showRigData" ref="tree" class="treeSty"  show-checkbox @node-click="handleAdd2" node-key="permissionId" :default-checked-keys="this.nedArr" :props="defaultProps3">
					</el-tree>

				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="editCommit('formEd',formEd)">提交</el-button>

				<!--<el-button @click="resetDialog22 = false">关闭</el-button>-->
				<el-button @click="editClose()">关闭</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import runImg from '@/assets/images/run.png'
    import stopImg from '@/assets/images/stop.png'
	import store from '@/store';
	import { roleSch, checkUname, needRight, recover, rightDele, adCmit, needRightHave, editCmit } from "../../../api/roleManage";
	export default {
		data() {
			var validateRName = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入角色名称'));
				}
				var s = value;
				var ls = 0;

				
				if(s.length < 2) {
					ls++;
				}
				if(s.length > 15) {
					ls++;
				}
				if(ls !== 1 && ls !== 2 ) { //	 alert("5 个教验证通过")
					callback();
				} else {
					return callback(new Error('角色名称长度在 2 到 15 个字符，请重置'));
				}
			};

			return {
			
                   headStyle: {
        'background-color': '#F4F8F9',
        'color': 'rgba(0,0,0,0.60)',
      },
				isShowing:false,
				bkClass:'bk',
				blurClass:'blur',
				runImg: runImg,
                stopImg: stopImg,
				eventInGroupList: [],
                
				startDatePicker: this.beginDate(),
				endDatePicker: this.processDate(),
				nedArr: [],
				pagesize: 4,
				currentPage: 1,
				rules: {

					roleName: [
						{ validator: validateRName, trigger: 'blur' }
					],

					remark: [
						{ required: true, message: '请输入描述', trigger: 'blur' },
						{ min: 3, max: 100, message: '长度在  3 到 100 个字符', trigger: 'blur' }
					],

				},
				checked1: true,
				allRight: [],
				multipleSelection: [],
				multipleSelection2: [],
				arrRo: [],
				formInline: {
					roleName: "",
					roleKey: "",
					status: "",
					params: {
						beginTime: "",
						endTime: ""
					}
				},

				formAdd: {
					roleKey: "",
					roleName: "",
					remark: "",
					permissionIds: []
				},

				postAll: [],
				postHave: [],
				postTemp: [],
				mulSelPost: [],

				tableData: [],

				//新增角色
				addUserRle: false,
				dialog1: {
					show: false,
					title: '新增信息',
				},

				//编辑
				resetDialog22: false,
				dialog2: {
					show: false,
					title: '新增信息',
				},

				formEd: {
					roleId: "",
					roleName: "",
					roleKey: "",
					remark: "",
					permissionIds: []

				},

				form3: {
					name: "",
					region: "",
					date1: "",
					date2: "",
					delivery: false,
					type: [],
					resource: "",
					desc: ""
				},
				//      获取勾选上的permisID
				checkedPerIds: [],
				//     第一级别，是固定的，自己写的，第二级别，就是这四个
				defaultProps3: {
					children: 'children',
					label: 'label',
					//					label: 'groupId'
				},

				showRigData: [{
					id: '01',
					label: "全部",
					children: [
						{ id: '11', label: "数据权限", children: [] },
						{ id: '22', label: "地域权限", children: [] },
						{ id: '33', label: "操作权限", children: [] },
					]
				}],
				allRight: {},

				formLabelWidth: "120px"
			};
		},
		computed: {
			data4() {
				return this.$store.state.resourceManagement.treeData;
				console.log("role11----");
				console.log(data4);
			},

		},
		created() {

			this.roleSearch(this.formInline);

			if(!this.$store.state.resourceManagement.on_treeData) {
				this.$store.dispatch('treeData').then(() => {})
			}
		},

		watch: {
			//检查查询表格的复选框是否被勾上，如果勾上就传入数组	
			multipleSelection: function() {
				this.arrRo = [];
				for(let i in this.multipleSelection) {
					this.arrRo.push(this.multipleSelection[i].roleId);
				}
			},
			//授权 弹窗里的 权限勾选
			multipleSelection2: function() {
				for(let i in this.multipleSelection) {
					this.arrRo.push(this.multipleSelection[i].roleId);
				}
			}
		},

		methods: {
			handleAdd2(){
				console.log("handleAdd2");
			},
			treeAdd0(){
				console.log("treeAdd0");
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

			//编辑
			handleEdit(row) {

				//编辑按钮的准备工作--获取所有权限列表

				needRight().then((response) => {
					this.allRight = response;
//             第一步,先获取所有数据,然后分类显示权限列表
					for(var key in this.allRight) {

						if(key == "listData") {
							this.showRigData[0].children[0].children = "";
							//							this.showRigData[0].children[0].children = this.allRight.listData;
							this.showRigData[0].children[0].children = this.data4;

						} else if(key == "listArea") {
							this.showRigData[0].children[1].children = "";
							//							this.showRigData[0].children[1].children = this.allRight.listArea;

							var listAreaArr = this.allRight.listArea;

							for(var i = 0; i < listAreaArr.length; i++) {
								listAreaArr[i].label = listAreaArr[i].permissionKey + " " + listAreaArr[i].label
							}
							this.showRigData[0].children[1].children = listAreaArr;

						} else if(key == "listMenu") {

							this.showRigData[0].children[2].children = "";
							//							this.showRigData[0].children[2].children = this.allRight.listMenu;
							var listMenuArr = this.allRight.listMenu;

							for(var i = 0; i < listMenuArr.length; i++) {
								listMenuArr[i].label = listMenuArr[i].permissionKey + " " + listMenuArr[i].label
							}
							this.showRigData[0].children[2].children = listMenuArr;

						}
					}

//	<el-tree :data="showRigData" ref="tree" class="treeSty"  show-checkbox @node-click="handleAdd2" node-key="permissionId" :default-checked-keys="this.nedArr" :props="defaultProps3">
//					</el-tree>

					if(typeof(response) == 'object') {

						this.nedArr = row.permissionIds;
//												alert(this.nedArr);
						this.resetDialog22 = true;

					}
				})

				this.formEd = row;

			},
			editClose() {
				this.resetDialog22 = false;
				this.roleSearch(this.formInline);
			},
			//编辑弹窗的提交按钮
			editCommit(formEd01, formEd) {
				if(this.cName2 == 1) {
						this.$message({
							message: '这个名字已经重名,请更改!' ,
							type: 'warning'
						})
						return false;
					}
				
				this.$refs[formEd01].validate((valid) => {
					if(valid) {
						this.resetDialog22 = false;

						var idArr = this.$refs.tree.getCheckedNodes();
						for(var i = 0; i < idArr.length; i++) {
							for(var key in idArr[i]) {
								if(key == "permissionId") {
									this.checkedPerIds.push(idArr[i].permissionId)
								} else {}
							}
						}
						formEd.permissionIds = this.checkedPerIds;
						//				alert("树状结构的长度");
						//				alert(this.checkedPerIds.length);
						if(this.checkedPerIds.length == 0) {
//							alert("没有勾选权限，提交失败");
							
			
          this.$message({
          message: '没有勾选权限，提交失败',
          type: 'warning'
        });
        
        return false;
							
								
						}

						this.addUserRle = false;

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

			//新增的方法准备01
			getCheckedNodes() {
				var idArr = this.$refs.tree0.getCheckedNodes();

				for(var i = 0; i < idArr.length; i++) {
					for(var key in idArr[i]) {
						if(key == "permissionId") {
							this.checkedPerIds.push(idArr[i].permissionId)
						} else {}
					}
				}
				console.log("333--" + this.checkedPerIds);
			},
			resetChongZhi(formName) {
				this.$refs[formName].resetFields();
			},

			//新增按钮
			handleAdd(formAdd) {
				this.$nextTick(function() { this.toggleSelection() });

				//新增按钮的准备工作--获取权限列表
				needRight().then((response) => {
					this.allRight = response;

					for(var key in this.allRight) {

						if(key == "listData") {
							this.showRigData[0].children[0].children = "";
							//			this.showRigData[0].children[0].children = this.allRight.listData;
							this.showRigData[0].children[0].children = this.data4;
						} else if(key == "listArea") {
							this.showRigData[0].children[1].children = "";
							//							this.showRigData[0].children[1].children = this.allRight.listArea;

							var listAreaArr = this.allRight.listArea;

							for(var i = 0; i < listAreaArr.length; i++) {
								listAreaArr[i].label = listAreaArr[i].permissionKey + " " + listAreaArr[i].label
							}
							this.showRigData[0].children[1].children = listAreaArr;

						} else if(key == "listMenu") {
							this.showRigData[0].children[2].children = "";
							var listMenuArr = this.allRight.listMenu;

							for(var i = 0; i < listMenuArr.length; i++) {
								listMenuArr[i].label = listMenuArr[i].permissionKey + " " + listMenuArr[i].label
							}
							this.showRigData[0].children[2].children = listMenuArr;

						}
					}
					if(typeof(response) == 'object') {
						this.addUserRle = true;
						this.$refs[formAdd].resetFields();
					}
				})

			},

			//新增弹窗的提交按钮
			addCommit(formAdd01, formAdd, tree) {
				
				if(this.cName2 == 1) {
						this.$message({
							message: '这个名字已经重名,请更改!' ,
							type: 'warning'
						})
						return false;
					}
				
				var idArr = this.$refs.tree0.getCheckedNodes();
				if(idArr.length == 0) {
					this.$message({
						message: '请选择权限',
						type: 'warning'
					})
					return false;
				}
				this.checkedPerIds = [];
				for(var i = 0; i < idArr.length; i++) {
					for(var key in idArr[i]) {
						if(key == "permissionId") {
							this.checkedPerIds.push(idArr[i].permissionId)
						} else {}
					}
				}
				this.formAdd.permissionIds = this.checkedPerIds;

				this.$refs[formAdd01].validate((valid) => {
					//			 alert('03--'+valid);
					if(valid) {

						adCmit(formAdd).then((response) => {
							//    如果添加成功就 再执行一次查询	
							this.roleSearch(this.formInline);
							if(response.length == 0) {
								//这里是清空新增的输入框，无论后端是否返回response都执行一次清空，这里加判断是防止清空操作 先执行
								this.$refs[formAdd01].resetFields();
								this.$refs.tree0.setCheckedKeys([]);

								this.addUserRle = false;

							} else {
								this.$refs[formAdd01].resetFields();
								this.addUserRle = false;
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

			toggleSelection(rows) {
				if(rows) {
					rows.forEach(
						row => {
							let length = this.postAll.length
							let postId = row.postId
							for(let i = 0; i < length; i++) {
								if(postId === this.postAll[i].postId) {
									return this.$refs.multipleTablePost.toggleRowSelection(this.postAll[i], true);
								}
							}
						})
				} else {
					this.$refs.multipleTablePost.clearSelection();
				}
			},

			//点击后选中的postId数量
			postSelNum(val) {
				this.mulSelPost = val;
				var temp = [];
				for(var i = 0; i < this.mulSelPost.length; i++) {
					if(temp.indexOf(this.mulSelPost[i].postId) == -1) {
						temp.push(this.mulSelPost[i].postId);
					}
				}
				this.postTemp = temp.sort();

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

			checkinlist(aa) {
				//				alert(aa);
			},
			//全部删除按钮的准备工作
			//			handleSelectionChange(val) {
			//				this.multipleSelection = val;
			//
			//			},
			//表格的单选按钮点击后 收集被点中的id
//			handleSelectionChange(val) {
//				var arrTest = [];
//				for(var i in val) {
//					arrTest.push(val[i].userId);
//				}
//				this.arr = [];
//				this.arr = arrTest;
//			},
				//表格的单选按钮点击后 收集被点中的id
			handleSelectionChange(val) {
				var arrTest = [];
				for(var i in val) {
					arrTest.push(val[i].roleId);
				}
				this.arrRo = [];
				this.arrRo = arrTest;
			},
			//表格全选按钮 点击后 收集被选中的id
//			selectAllRus(val) {
//				var arrTest = [];
//				for(var i in val) {
//					arrTest.push(val[i].userId);
//				}
//				this.arr = [];
//				this.arr = arrTest;
//			},  
				//表格全选按钮 点击后 收集被选中的id
			selectAllRus(val) {
				var arrTest = [];
				for(var i in val) {
					arrTest.push(val[i].roleId);
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
//				alert(this.arrRo);
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

			//删除单个按钮	
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
			//恢复按钮
			beback(uid) {
				recover(uid).then((response) => {
					this.roleSearch(this.formInline);
					this.$message({
						type: 'success',
						message: '恢复成功！'
					})
				})
			},

			//02新增 和编辑按钮的角色名唯一验证--检查角色名是否唯一
			blurCheck(cName) {
				//新增按钮中 输入用户名后去后台检验是否存在
				checkUname(cName).then((response) => {
					this.cName2 = response;
//				this.cName2==0 就是没有重名,==1 就是重名了	
					if(this.cName2 == 0) {
//						alert("001");
					} else {
						this.$message({
							message: '这个名字已经重名,请更改!' ,
							type: 'warning'
						})
						return false;
					}
					
					
					
				})

			},

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
			;
			margin: 20px;
			border-radius: 5px;
		}
	}
	
	.treeSty {
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		height: 400px;
		overflow-y: scroll;
	}
	
  /*@font-face {font-family: "iconfont";
          src: url('iconfont.eot'); 
          src: url('iconfont.eot#iefix') format('embedded-opentype'), 
          url('iconfont.woff') format('woff'), 
          url('iconfont.ttf') format('truetype'),
          url('iconfont.svg#iconfont') format('svg'); 
        }
 
        .iconfont {
          font-family:"iconfont" !important;
          font-size:16px;
          font-style:normal;
          -webkit-font-smoothing: antialiased;
          -webkit-text-stroke-width: 0.2px;
          -moz-osx-font-smoothing: grayscale;
         }*/
</style>