<template>
	<div class='container'>
		<div class="" style="width: 100%;height: auto;border: 1px solid transparent;">

			<div class="conRight" style="width:100%;height: auto;">
				<div class="RightRow1" style="">
					<el-row>
						<el-col>
							<el-card>
								<el-collapse style="width: 100%;">
									<el-collapse-item title="点击此处展开条件查询列表" name="1">
										<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
											<el-form-item label="组织名字" value="组织名字" prop="deptName">
												<el-input v-model="formInline.deptName" style="width: 340px;"></el-input>
											</el-form-item>

											<el-form-item label="创建时间">
												<el-col :span="11">
													<el-form-item prop="params.beginTime">
														<el-date-picker type="date" value="起始日期" placeholder="起始日期" v-model="formInline.params.beginTime" value-format="yyyy-MM-dd" style="width: 100%;" :picker-options="startDatePicker" @change="dateChangeBeginTime"></el-date-picker>
													</el-form-item>
												</el-col>
												<el-col class="line" :span="2">-</el-col>

												<el-col :span="11">
													<el-form-item prop="params.endTime">
														<el-date-picker type="date" value="结束日期" placeholder="结束日期" v-model="formInline.params.endTime" value-format="yyyy-MM-dd" style="width: 100%;" :picker-options="endDatePicker" @change="dateChangeEndTime"></el-date-picker>
													</el-form-item>
												</el-col>
											</el-form-item>
											<el-form-item>
												<el-button value="" type="primary" @click="roleSearch(formInline)">查询</el-button>
												<el-button value="" type="primary" @click="resetChongZhi('formInline')">重置</el-button>
											</el-form-item>
										</el-form>
									</el-collapse-item>
								</el-collapse>

							</el-card>
						</el-col>
					</el-row>
				</div>

				<div class="RightRow1" style="">
					<el-row>
						<el-col>
							<el-card>
								<div class="buttonItem">
									<el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="handleAdd" round>新增</el-button>
									<el-button type="danger" size="small" icon="el-icon-circle-close-outline" round @click="handleDeleteAll(2)">删除</el-button>
									<el-button type="danger" size="small" icon="el-icon-circle-close-outline" round @click="handleDeleteAll(1)">禁用</el-button>
								</div>
								<!--{{tableData[1]}}-->
								<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :default-sort="{order: 'ascending'}" @selection-change="handleSelectionChange" @select-all="selectAllRus">
									<el-table-column type="selection" width="55">
									</el-table-column>
									<el-table-column prop="deptId" value="组织ID" label='组织ID' width="80">
									</el-table-column>
									<el-table-column prop="deptName" value="组织名字" label='组织名字' width="160">
									</el-table-column>
									<el-table-column prop="createTime" value="创建时间" label='创建时间' width="170">
									</el-table-column>
									<el-table-column prop="remark" value="描述" label='描述' min-width="180">
									</el-table-column>
									<el-table-column prop="status" value="状态" label='状态' width="80">
										<template scope="scope">
											<el-button v-if='scope.row.status==1' size="mini" type="danger" disabled>禁用</el-button>
											<el-button v-if='scope.row.status==0' size="mini" type="success">正常</el-button>

										</template>
									</el-table-column>

									<el-table-column label='操作' width="100">
										<template slot-scope="scope">
											<el-select value="操作" placeholder="操作">
												<el-option value="aa">
													<el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
												</el-option>
												<el-option value="aa">
													<el-button size="mini" type="danger" @click="handleDelete(scope.row.deptId,2)">删除</el-button>
												</el-option>
												<el-option value="aa">
													<el-button size="mini" type="danger" @click="handleDelete(scope.row.deptId,1)">禁用</el-button>
												</el-option>
												<el-option value="aa">
													<el-button size="mini" type="primary" @click="beback(scope.row.deptId)">恢复</el-button>
												</el-option>

											</el-select>
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
		<el-dialog title="新增部门" :visible.sync="addUserDialog" :before-close="handleClose">
			<!--<el-form :model="formAdd">-->
			<el-form :model="formAdd" :rules="rules" ref="formAdd" style="margin:10px;width:auto;">

				<el-form-item label="组织名字:" :label-width="formLabelWidth" prop="deptName" required>
					<el-input v-model.trim.trim="formAdd.deptName" auto-complete="off"></el-input>
				</el-form-item>
				<!--<el-form-item label="选择上级名称01:" :label-width="formLabelWidth" prop="parentId" required>

					<el-select v-model.trim="formAdd.parentId" placeholder="选择上级名称" size="small" style="width: 100%;height: 36px;" >
						<el-option v-for="items in tree" :key="items.deptName" :label="items.deptName" :value="items.deptId">{{items.deptName}}
						</el-option>
					</el-select>
				</el-form-item>-->

				<el-form-item label="选择上级名称" :label-width="formLabelWidth" prop="parentId" required>

					<el-cascader v-model.trim="formAdd.parentId" placeholder="选择上级名称" style="height: 36px;width: 100%;" :options="eventInGroupList" change-on-select :readonly="true">
					</el-cascader>
				</el-form-item>

				<el-form-item label="描述:" :label-width="formLabelWidth" prop="remark" required>
					<el-input v-model.trim="formAdd.remark" autocomplete="off" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="岗位列表:" :label-width="formLabelWidth">
					<el-table ref="multipleTablePost" :data="postAll" stripe border height="350" tooltip-effect="dark" style="width: 100%" @selection-change="postSelNum">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="postId" label="岗位ID" min-width="130"> </el-table-column>
						<el-table-column prop="postName" label="岗位名字" min-width="130"> </el-table-column>

					</el-table>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addCommit('formAdd',formAdd)">提交</el-button>

				<el-button @click="addUserDialog = false">关闭</el-button>
			</div>
		</el-dialog>

		<!--03-编辑-->
		<el-dialog title="编辑组织" :visible.sync="resetDialog22" :before-close="handleClose">
			<el-form :model="formEd" :rules="rules" ref="formEd" style="margin:10px;width:auto;">

				<el-form-item label="组织名字:" :label-width="formLabelWidth" prop="deptName" required>
					<el-input v-model.trim="formEd.deptName" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="选择上级名称:" v-if="edParent" prop="parentId" required :label-width="formLabelWidth">

					<el-select v-model.trim="formEd.parentId" placeholder="选择上级名称" size="small" style="width: 100%;height: 36px;">
						<!--<el-option v-for="items in tree" :key="items.deptName" :label="items.deptName" :value="items.deptId">{{items.deptName}}
						</el-option>-->
						<el-option v-for="items in tree2
							" :key="items.deptName" :label="items.deptName" :value="items.deptId">{{items.deptName}}
							</el-option>
					</el-select>

				</el-form-item>

				<el-form-item label="描述:" :label-width="formLabelWidth" prop="remark" required>
					<el-input v-model.trim="formEd.remark" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="岗位列表:" :label-width="formLabelWidth">
					<el-table ref="multipleTablePost" :data="postAll" stripe border height="350" tooltip-effect="dark" style="width: 100%" @selection-change="postSelNum">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="postId" label="岗位ID" min-width="130"> </el-table-column>
						<el-table-column prop="postName" label="岗位名字" min-width="130"> </el-table-column>

					</el-table>
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
	import { roleSch, rightDele, recover, adCmit, editCmit, needPost, needPostHave, queryEventInGroup } from "../../../api/deptManage";
	import { leftData, leftData2 } from "../../../api/userManage";
	export default {
		data() {
			return {
				eventInGroupList: [],
				startDatePicker: this.beginDate(),
				endDatePicker: this.processDate(),
				pagesize: 4,
				currentPage: 1,
				rules: {
					deptName: [
						{ required: true, message: '请输入组织名字', trigger: 'blur' },
						{ min: 2, max: 15, message: '长度在 2到 15 个字符', trigger: 'blur' }
					],
					parentId: [
						{ required: true, message: '请选择上级名称', trigger: 'blur' }
					],
					remark: [
						{ required: true, message: '请输入描述', trigger: 'blur' },
						{ min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
					],

				},
				resetDialog22: false,
				formInline: {
					deptKey: "",
					deptName: "",
					params: {
						beginTime: "",
						endTime: ""
					}
				},
				//				编辑按钮中已有post选中的相关变量
				postAll: [],
				postHave: [],
				postTemp: [],
				mulSelPost: [],

				formEd: {
					remark: "",
					deptId: "",
					deptName: "",
					deptKey: "",
					parentId: "",
					postIds: []

				},
				tree: [],
				tree2: [],
				edParent: false,
				multipleSelection: [],
				arrRo: [],
				columns: [],
				tableData: [],

				addUserDialog: false,
				formAdd: {
					remark: "",
					deptKey: "",
					deptName: "",
					parentId: "",
					postIds: []
				},

				formLabelWidth: "120px"
			}
		},

		created() {
			this.roleSearch(this.formInline);

			//	//获取所有岗位信息
			needPost().then((response) => {
				this.postAll = response;
			});
			//  新增中的级联按钮 的数据处理  添加value labe属性 
			queryEventInGroup().then(res => {
				let deep = function(arrRo) {
					arrRo.forEach(item => {
						item.value = item.object.deptId;
						item.label = item.object.deptName;
						if(item.children) {
							deep(item.children);
						}
					});
				};
				deep(res);
				this.eventInGroupList = res;
			});
		},
		watch: {
			//检查查询表格的复选框是否被勾上，如果勾上就传入数组	
			//			multipleSelection: function() {
			//				this.arrRo = [];
			//				for(let i in this.multipleSelection) {
			//					this.arrRo.push(this.multipleSelection[i].deptId);
			//				}
			//			}
		},
		mounted() {

		},

		methods: {
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
			}, // 分页
			handleSizeChange(val) {
				this.pagesize = val
				console.log(`每页 ${val} 条`)
			},
			handleCurrentChange(val) {
				this.currentPage = val
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

				//		alert(this.postTemp);
			},
			//编辑
			handleEdit(row) {
				//	//获取所-具有的-岗位信息-需要传入当前的deptId
				var nedDptId = row.deptId;

				//左边树状结构的数据
				leftData().then((response) => {
					this.tree = response;
				})
				leftData(nedDptId).then((response) => {
					this.tree2 = response;
				})
				//         清空表格所有的勾选
				this.$nextTick(function() { this.toggleSelection() });

				needPostHave(nedDptId).then((response) => {
					this.postHave = response;

					this.$nextTick(function() { this.toggleSelection(this.postHave) });

					this.resetDialog22 = true;

				})
				//				alert(row.parentId);
				//           如果是parentId是0表示是最顶级,就将它的上级部门隐藏
				if(row.parentId == 0) {
					this.edParent = false;
				} else {
					this.edParent = true;
				}
				this.formEd.parentId = row.parentId;
				this.formEd = row;
			},
			editClose() {
				this.resetDialog22 = false;
				this.roleSearch(this.formInline);
			},
			//编辑弹窗的提交按钮
			editCommit(formEd01, formEd) {

				this.formEd.postIds = this.postTemp;
				if(this.formEd.postIds == 0) {
					this.$message({
						message: '请选择岗位',
						type: 'warning'
					})
					return false;
				}

				this.$refs[formEd01].validate((valid) => {
					//					      	 alert('03--'+valid);
					if(valid) {
						this.resetDialog22 = false;
						//获取角色信息
						editCmit(formEd).then((response) => {
							this.roleSearch(this.formInline);
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
			resetChongZhi(formName) {
				this.$refs[formName].resetFields();
			},
			//全部删除按钮的准备工作
			//			handleSelectionChange(val) {
			//				this.multipleSelection = val;
			//
			//			},
			//表格的单选按钮点击后 收集被点中的id
			handleSelectionChange(val) {
				var arrTest = [];
				for(var i in val) {
					arrTest.push(val[i].deptId);
				}
				this.arrRo = [];
				this.arrRo = arrTest;
			},
			//表格全选按钮 点击后 收集被选中的id
			selectAllRus(val) {
				var arrTest = [];
				for(var i in val) {
					arrTest.push(val[i].deptId);
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
			},
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
			handleAdd() {
				this.$nextTick(function() { this.toggleSelection() });
				this.addUserDialog = true;

				//左边树状结构的数据
				leftData().then((response) => {
					this.tree = response;
				})

			},
			//			//新增弹窗的提交按钮
			addCommit(formAdd01, formAdd) {

				this.formAdd.postIds = this.postTemp;
				//			alert(this.formAdd.postIds.length);
				if(this.formAdd.postIds.length == 0) {
					this.$message({
						message: '请选择岗位',
						type: 'warning'
					})
					return false;
				}

				this.$refs[formAdd01].validate((valid) => {
					//					      	 alert('03--'+valid);
					if(valid) {

						this.addUserDialog = false;

						//岗位列表的最大值就是最末尾点中的，通过降序排列，第一个就是最大的，也就是点中的
						var tepIdArr = this.formAdd.parentId;
						tepIdArr.sort((num1, num2) => {
							return num1 - num2 < 0
						})
						this.formAdd.parentId = tepIdArr[0];

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

	};
</script>

<style scoped lang="scss">
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