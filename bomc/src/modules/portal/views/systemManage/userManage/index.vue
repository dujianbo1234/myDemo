<template>
	<div class='container'>
		<div class="" style="width: 100%;min-width:1180px;height: auto;border: 1px solid transparent;">

			<div class="conLeft" ref="conLefticon" style="width: 18%;min-width:200px;height: auto;float: left;border: 1px solid #F3F3F4;margin-top: 20px;display: block;">

				<el-tree :data="dataLeftTree" node-key="deptId" @node-click="deptTree" :default-expanded-keys="[100]" :props="defaultProps3"></el-tree>
			</div>
			<div class="conRight" ref="conRighticon" style="width: 81%;min-width:930px;height: auto;;float: right;margin-top: -20px;">
				<!--xe652-->
				<i class="iconfont" @click="arrowTest2()" style="position: relative;left: 0%; top: 7px; z-index: 555;font-size:45px;color:#42B983">&#xe660;</i>
				<div class="RightRow1">

					<el-row style="margin-top: -40px;">
						<el-col>
							<el-card>
								<el-form :inline="true" :model="formInline" ref="formInline" label-position="right" label-width="70px" size="small">
								
									<el-form-item label="登录名称" prop="userName">
										<el-input v-model="formInline.userName" style="width: 210px;"></el-input>
									</el-form-item>
									<el-form-item label="手机号码" prop="phonenumber">
										<el-input type="tel" v-model="formInline.phonenumber" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" onkeyup="this.value=this.value.replace(/[^\w]/g,'');" style="width: 210px;"></el-input>
									</el-form-item>

									<el-button class="search_btn" @click="roleSearch2(formInline)" style="margin-left:10px;">查询</el-button>
									<el-button class="opt_btn" @click="resetChongZhi('formInline')">重置</el-button>

									<i class="iconfont step_btn" v-bind:class="[isShowing ? blurClass : '',bkClass]" @click="arrowTest()">&#xe619;</i>
									<i class="iconfont step_btn" @click="arrowTest1()">&#xe615;</i>



<el-button type="primary" icon='document' @click="exportLogo()"><i class="el-icon-download"></i>导出excel</el-button>
									
			
			<!--<el-upload class="upload-demo" accept="sh" action='/ops/api/v1/mainTask/upload' :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"  multiple :limit="1" :on-exceed="handleExceed" :on-error="onError" :on-success="onSuccess" :file-list="addForm.fileList" :beforeUpload="beforeAvatarUpload">
						<el-button size="small" type="primary" title="请上传ssh脚本文件">点击上传</el-button>
			</el-upload>-->
					
					
					<!--<el-upload class="upload-demo" accept="sh" action='/pps/api/v1/excel/export' :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"  multiple :limit="1" :on-exceed="handleExceed" :on-error="onError" :on-success="onSuccess" :file-list="addForm.fileList" :beforeUpload="beforeAvatarUpload">
						<el-button size="small" type="primary" title="请上传ssh脚本文件">点击上传</el-button>
					</el-upload>-->
					
					
									<div ref="schItemShow2" class="schItemShow" style="">

										<el-form-item label="用户状态" prop="status">
										<!--	<el-select value="所有" v-model="formInline.status" placeholder="所有" style="height: 36px;width: 220px;">-->
											<el-select value="所有" v-model="formInline.status" placeholder="所有" style="height: 36px;width: 210px;">
												<el-option label="所有" value=""></el-option>
												<el-option label="正常" value="0"></el-option>
												<el-option label="禁用" value="1"></el-option>
											</el-select>
										</el-form-item>

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
				<!--以上是头部搜索部门-->

				<div class="RightRow1" style="">
					<el-row>
						<el-col>
							<el-card>
								<div class="buttonItem">

									<el-button class="search_btn" @click="handleAdd('formAdd')">新增 </el-button>
									<el-button class="opt_btn" @click="handleDeleteAll(2)">删除</el-button>
									<el-button class="opt_btn" @click="handleDeleteAll(1)">禁用</el-button>
									<!--<el-button class="opt_btn" @click="beback2()">恢复</el-button>-->

								</div>
								<!--{{tableData[0]}}    -->
								<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :default-sort="{prop: 'userId', order: 'ascending'}" v-show="tableRus" @selection-change="handleSelectionChange" @select-all="selectAllRus">
									<el-table-column fixed type="selection" width="35">
									</el-table-column>

									<el-table-column fixed prop="realName" label='用户名称' min-width="80" style="width: 12%;">
									</el-table-column>
									<el-table-column prop="userId" label='用户id' min-width="65" style="width: 12%;">
									</el-table-column>
									<el-table-column prop="userName" label='登录名称' min-width="80" style="width: 12%;">
									</el-table-column>
									<el-table-column prop="dept.deptName" label='部门' min-width="80" style="width: 12%;">
									</el-table-column>

									<el-table-column prop="email" label='邮箱' min-width="120" style="width: 12%;">
									</el-table-column>
									<el-table-column prop="phonenumber" label='手机号码' min-width="120" style="width: 12%;">
									</el-table-column>
									<el-table-column prop="createTime" resizable sortable label='创建时间' min-width="170" style="width: 15%;">
									</el-table-column>

									<el-table-column prop="sex" label='性别' min-width="60">
										<template scope="scope">
											<label v-if='scope.row.sex==0' size="mini">男</label>
											<label v-if='scope.row.sex==1' size="mini">女</label>
											<label v-if='scope.row.sex==2' size="mini">未知</label>
										</template>
									</el-table-column>

									<el-table-column prop="status" label='状态' width="60" style="width: 12%;">
										<template slot-scope="scope">
											<div v-if='scope.row.status==1'>
												<img :src="stopImg" alt="正常">

											</div>
											<div v-if='scope.row.status==0'>
												<img :src="runImg" alt="禁用">
											</div>
										</template>
									</el-table-column>

									<el-table-column label='用户管理' fixed="right" width="110">
										<template value="aa" slot-scope="scope">
											<i class="iconfont co" title="禁用" @click="handleDelete(scope.row.userId,1)">&#xe65a;</i>
											<i class="iconfont co" title="恢复" @click="beback(scope.row.userId)">&#xe65c;</i>
											<i class="iconfont co" title="重置密码" @click="reset(scope.row.userId,scope.row.userName)">&#xe65b;</i>

										</template>
									</el-table-column>

									<el-table-column label='信息编辑' fixed="right" width="130">
										<template value="aa" slot-scope="scope">

											<el-button class="form_btn" size="mini" @click="handleEdit(scope.row)">编辑</el-button>

											<el-button class="form_btn" size="mini" @click="handleDelete(scope.row.userId,2)">删除</el-button>

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

		<!-- dialog -->
		<!-- 01-新增信息 -->
		<el-dialog title="新增用户" :visible.sync="addUserDialog" class="logAdd-dialog opt" :before-close="handleClose">

			<el-form :model="formAdd" :rules="rules" ref="formAdd" style="margin:10px;width:auto;">

				<span class="sp"><span>登录信息</span></span>

				<el-form-item label="登录名称" :label-width="formLabelWidth" prop="userName" required>
					<el-input v-model.trim="formAdd.userName" v-on:blur="blurCheck()"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth" prop="password" required>

					<el-input :type="pwdType" v-model.trim="formAdd.password" auto-complete="off"></el-input>
				</el-form-item>
				<span class="show-pwd" @click="showPwd">
		          <svg-icon icon-class="eye" style="position: relative;top: -46px;left: 95%;" />
		        </span>

				<el-form-item label="确认密码" :label-width="formLabelWidth" prop="password2" required>
					<el-input :type="pwdType2" v-model.trim="formAdd.password2" auto-complete="off"></el-input>
				</el-form-item>
				<span class="show-pwd" @click="showPwd2">
		          <svg-icon icon-class="eye" style="position: relative;top: -46px;left: 95%;" />
		        </span>

				<span class="sp"><span>用户信息</span></span>
				<el-form-item label="用户名称" :label-width="formLabelWidth" prop="realName" required>
					<el-input v-model.trim="formAdd.realName" autocomplete="off" auto-complete="off"></el-input>
				</el-form-item>

				<!--<el-form-item label="组织机构" :label-width="formLabelWidth" required>
					<el-cascader v-model.trim="formAdd.deptId" placeholder="请选择组织机构" style="height: 36px;width: 100%;" :options="eventInGroupList" change-on-select >
					</el-cascader>

				</el-form-item>-->
		


<el-form-item label="组织机构44" :label-width="formLabelWidth" prop="deptId" required>
					<!--:value='formAdd.deptId'    eventInGroupList  -->

					<el-cascader v-model.trim="selectedOptions" placeholder="请选择组织机构" style="height: 36px;width: 100%;" :options="eventInGroupList" change-on-select :readonly="true">
					</el-cascader>

				</el-form-item>
				

				
				
				<!--prop="postId" required-->
				<el-form-item label="岗位列表" :label-width="formLabelWidth" required>

					<el-select value='22' v-model.trim="formAdd.postId" placeholder="请选择岗位" size="small" style="height: 36px;width: 100%;">
						<el-option v-for="items in post" :key="items.deptName" :label="items.postName" :value="items.postId">{{items.postName}}
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item type="email" label="邮箱" :label-width="formLabelWidth" prop="email">
					<el-input v-model.trim="formAdd.email" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="性别" :label-width="formLabelWidth" prop="sex" required>
					<el-select value="aa" v-model.trim="formAdd.sex" style="height: 36px;width: 100%;" placeholder="请选择性别">
						<el-option label="男" value="0"></el-option>
						<el-option label="女" value="1"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="手机号码" :label-width="formLabelWidth" prop="phonenumber" required>
					<el-input type="tel" :label-width="formLabelWidth" v-model="formAdd.phonenumber" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
				</el-form-item>

				<el-form-item label="角色" :label-width="formLabelWidth">
					<el-table ref="multipleTableRole" :data="roles" stripe border height="350" prop="roles" required tooltip-effect="dark" style="width: 100%" header-align="center" :header-cell-style="headStyle" @selection-change="postSelNum">
						<el-table-column type="selection" min-width="55">
						</el-table-column>
						<el-table-column prop="roleId" label="角色Id" min-width="130"> </el-table-column>
						<el-table-column prop="roleName" label="角色名" min-width="130"> </el-table-column>

					</el-table>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">

				<el-button type="primary" @click="addCommit('formAdd',formAdd)">提交</el-button>

				<el-button @click="addUserDialog = false">关闭</el-button>

			</div>
		</el-dialog>

		<!--02-重置密码-->
		<el-dialog title="重置密码" :visible.sync="resetDialog" :before-close="handleClose">
			<!--<el-form :model="formRset" style="margin:10px;width:auto;">-->
			<el-form :model="formRset" :rules="rules2" ref="formRset" style="margin:10px;width:auto;">
				<el-form-item label="登录名称" :label-width="formLabelWidth">
					<el-input v-model.trim="formRset.userName" auto-complete="off" readonly></el-input>
				</el-form-item>

				<el-form-item label="输入密码" :label-width="formLabelWidth" prop="password" required>
					<el-input :type="pwdType" v-model.trim="formRset.password" auto-complete="off"></el-input>
				</el-form-item>
				<span class="show-pwd" @click="showPwd">
		          <svg-icon icon-class="eye" style="position: relative;top: -46px;left: 95%;" />
		        </span>
				<el-form-item label="确认密码" :label-width="formLabelWidth" prop="password2" required>
					<el-input :type="pwdType2" v-model.trim="formRset.password2" auto-complete="off"></el-input>
				</el-form-item>
				<span class="show-pwd" @click="showPwd2">
		          <svg-icon icon-class="eye" style="position: relative;top: -46px;left: 95%;" />
		        </span>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="resetCommit('formRset',formRset.password)">提交</el-button>
				<el-button @click="resetDialog = false">关闭</el-button>
			</div>
		</el-dialog>

		<!--03-编辑-->
		<el-dialog title="编辑用户" :visible.sync="resetDialog22" :before-close="handleClose">
			<!--{{postHave}}-->
			<el-form :model="formEd" :rules="rules" ref="formEd" style="margin:10px;width:auto;">
				<el-form-item label="用户名称" :label-width="formLabelWidth" prop="realName" required>
					<el-input v-model.trim="formEd.realName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="登录名称" :label-width="formLabelWidth" prop="userName" required>
					<el-input v-model.trim="formEd.userName" auto-complete="off"></el-input>
				</el-form-item>
				<!--<el-form-item label="组织机构名称11" :label-width="formLabelWidth" prop="deptId" required>
				<el-select value="aa" v-model.trim="formEd.deptId" placeholder="请选择组织机构" size="small" style="height: 36px;width: 100%;">
					<el-option v-for="items in deptSeleAll" :key="items.deptName" :label="items.deptName" :value="items.deptId">{{items.deptName}}
					</el-option>
				</el-select>
			</el-form-item>-->

				<el-form-item label="组织机构" :label-width="formLabelWidth" prop="deptId" required>
					<!--:value='formAdd.deptId'    eventInGroupList  -->
					<el-cascader v-model.trim="selectedOptions" placeholder="请选择组织机构" style="height: 36px;width: 100%;" :options="eventInGroupList" change-on-select :readonly="true">
					</el-cascader>

				</el-form-item>

				<el-form-item label="岗位名称" :label-width="formLabelWidth" prop="postId" required>
					<!--{{postSeleAll}}-->
					<el-select value="aa" v-model.trim="formEd.postId" placeholder="请选择岗位" size="small" style="height: 36px;width: 100%;">
						<el-option v-for="items in postSeleAll" :key="items.postName" :label="items.postName" :value="items.postId">{{items.postName}}
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="手机号码" :label-width="formLabelWidth" prop="phonenumber" required>
					<el-input type="tel" :label-width="formLabelWidth" v-model="formEd.phonenumber" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
				</el-form-item>

				<el-form-item label="角色" :label-width="formLabelWidth">
					<el-table ref="multipleTablePost" :data="roles" stripe border height="350" tooltip-effect="dark" style="width: 100%" @selection-change="postSelNum" header-align="center" :header-cell-style="headStyle">
						<el-table-column type="selection" width="55" style="border: 1px solid red;background: red;">
						</el-table-column>
						<el-table-column prop="roleId" label="角色Id" style="background: #F4F8F9;" min-width="130"> </el-table-column>
						<el-table-column prop="roleName" label="角色名" style="background: #F4F8F9;" min-width="130"> </el-table-column>
					</el-table>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="editCommit('formEd',formEd)">提交</el-button>
				<el-button @click="resetDialog22 = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import runImg from '@/assets/images/run.png'
	import stopImg from '@/assets/images/stop.png'
	import { roleSch, needDept, needPost, needRole, userDele, recover, leftData, resetPwd, checkUname, adCmit, editCmit, getInfo, needPostHave, treeShow, needPstSelect, needPstSelectAll, needDeptSelectAll, queryEventInGroup } from "../../../api/userManage";
	export default {
		data() {
			var validatePwd = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				}
				var s = value;
				var ls = 0;
				if(s.match(/([0-9])+/)) {
					ls++; //	 alert("01检索到数字了！");
				}
				if(s.match(/([a-z])+/)) {
					ls++; //	 alert("02 检索到小写！");
				}
				if(s.match(/([A-Z])+/)) {
					ls++; //alert("03检索到大写！");
				}
				if(s.match(/[^a-zA-Z0-9]+/)) {
					ls++; // alert("04检索到特殊字符！"); 
				}
				if(s.length > 7) {
					ls++; // alert("05 长度已经够8位了");
				}
				if(s.length < 30) {
					ls++; // alert("05 长度已经够8位了");
				}
				if(ls == 6) { //	 alert("5 个教验证通过")
					callback();
				} else {
					return callback(new Error('密码必须包含大小写字母，数字，特殊字符且长度至少8位，且小于30位,请重置!'));
				}
			};

			var validatePwd2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.formAdd.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};

			var validatePwd3 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.formRset.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var validateRName = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入用户名称'));
				}
				var s = value;
				var ls = 0;

				if(s.match(/[^a-zA-Z0-9]+/)) {
					ls++;
				}
				if(s.length < 2) {
					ls++;
				}
				if(s.length > 20) {
					ls++;
				}
				if(ls !== 1 && ls !== 2 && ls !== 3) { //	 alert("5 个教验证通过")
					callback();
				} else {
					return callback(new Error('登录名称不能包含特殊字符，长度在 2 到 20 个字符，请重置'));
				}
			};
			return {
				
				// 新增的表单数据
				addForm: {
					platformId: "",
					host: '',
					hostPassword: "",
					hostName: '',
					path: "",
					name: "",
					programGroup: [],
					fileList: [],
					myPath: "",
					scriptAddress:""//脚本成功返回路径
				},
				tableDataDload:[],
				tableDataDload2:[],
				
				
				
				selectedOptions: [],

				headStyle: {
					'background-color': '#F4F8F9',
					'color': 'rgba(0,0,0,0.60)',
				},
				isShowing: false,
				bkClass: 'bk',
				blurClass: 'blur',
				runImg: runImg,
				stopImg: stopImg,
				pwdType: 'password',
				pwdType2: 'password',
				eventInGroupList: [],

				startDatePicker: this.beginDate(),
				endDatePicker: this.processDate(),
				pagesize: 4,
				currentPage: 1,
				rules: {
					realName: [
						//						{  validator: validateRName, trigger: 'blur' }
						{ required: true, message: '请输入用户名称', trigger: 'blur' },
						{ min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
					],
					password: [
						{ validator: validatePwd, trigger: 'blur' }
					],
					userName: [
						//					{  validator: validateRName, trigger: 'blur' }
						{ required: true, message: '请输入登录名称', trigger: 'blur' },
						{ min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
					],

					phonenumber: [
						{ required: true, message: '请输入手机号码', trigger: 'blur' },
						{ min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
					],

					//					deptId: [
					//						{ required: true, message: '请选择组织机构', trigger: 'blur' }
					//					],
					//					postId: [
					//						{ required: true, message: '请选择岗位', trigger: 'blur' }
					//					],

					password2: [
						{ validator: validatePwd2, trigger: 'blur' }
					],
					email: [
						{ required: true, type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }, { min: 5, max: 55, message: '邮箱长度在 5 到 55 个字符', trigger: 'blur' }
					],
					roles: [
						{ required: true, message: '请选中角色', trigger: 'blur' }
					],
					sex: [
						{ required: true, message: '请输入性别', trigger: 'blur' }
					],
				},
				rules2: {
					userName: [
						{ required: true, message: '请选择登录名称', trigger: 'blur' },
						{ min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
					],
					password: [
						{ validator: validatePwd, trigger: 'blur' }
					],
					password2: [
						{ validator: validatePwd3, trigger: 'blur' }
					],

				},
				tableData: [],
				
				
				depts: [],
				post: [],
				formAdd: {
					remark: "",
					realName: "",
					userName: "",
					deptId: "",
					password: "",
					password2: "",
					email: "",
					sex: "",
					phonenumber: "",
					roleIds: [],
					roles: [],
					postId: ""
				},
				formAdddeptId: "",
				mulSelPost: [],
				postTemp: [],
				//				编辑按钮中已有post选中的相关变量
				roles: [],
				postHave: [],
				postSele: [],
				postSeleAll: [],
				deptSeleAll: [],
				formEd: {
					remark: "",
					userId: "",
					realName: "",
					userName: "",
					roleIds: [],
					deptId: [],
					deptName: "",
					postId: "",
					postName: "",
					phonenumber: "",
					time: ""
				},

				arrRo: [],
				cName2: "",

				formRset: {
					userId: "",
					userName: "",
					password: "",
					password2: "",
				},

				selecteduserSearch: [],
				selecteduserSearch2: [],

				tableRus: true,

				dataLeftTree: [],
				defaultProps3: {
					children: 'children',
					label: 'deptName'
				},
				tree: [],
				data3: [],
				menus: [],

				arr1: [],
				arr2: [],
				arr3: [],
				arr4: [],
				arr5: [],

				formInline: {
					userName: "",
					phonenumber: "",
					status: "",
					params: {
						beginTime: "",
						endTime: ""
					}
				},
				addUserDialog: false,
				resetDialog: false,
				resetDialog22: false,

				dialog: {
					show: false,
					title: '新增信息',
				},

				multipleSelection: [],
				formLabelWidth: "120px"
			};
		},
		created() {
			//	新增按钮的组织结构 请求的数据
			this.roleSearch(this.formInline);
			//左边树状结构的数据
			leftData().then((response) => {
				this.tree = response;
				var data = this.getData(0, this.tree);
				this.dataLeftTree = data;

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

		},
		mounted() {},

		methods: {
				//文件上传
			handleRemove(file, fileList) {
					console.log(file, fileList);
				},
				handlePreview(file) {
					console.log(file);
				},
				handleExceed(files, fileList) {
					this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
				},
				onSuccess(response, files, fileList) {
					var myData = response;
					if(myData.code!= 200) {
						this.$message.warning(myData.msg);
					} else {
						this.$message.success("文件上传成功");
						this.scriptAddress = myData.result
					}
				},
				
				onError(err) {
					this.$message.warning(reponse.msg);
				},
				beforeRemove(file, fileList) {
					return this.$confirm(`确定移除 ${ file.name }？`);
				},
				beforeAvatarUpload(file) {
				var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
				const extension = testmsg === 'txt'
				const extension2 = testmsg === 'excel'
				const extension3 = testmsg === 'py'
				const extension4 = testmsg === 'sql'
				const isLt2M = file.size / 1024 / 1024 < 1
				if(!extension && !extension2 && !extension3 && !extension4) {
					this.$message({
						message: '只能上传txt.excel.sql.pl格式的文件!',
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

			
			//导出文件  来自 ops--doLogManage   handleSelectionChange
			exportLogo() {
//				console.log(this.multipleSelection)

				if(this.multipleSelection == undefined || this.multipleSelection.length == 0) {
					import('@/modules/mms/vendor/Export2Excel').then(excel => {
						const tHeader = [
							'用户名称', '用户Id', '登录名称', '部门', '邮箱', '手机号码', '创建时间',
						]
						const filterVal = [       
							'realName', 'userId', 'userName', 'deptShow', 'email', 'phonenumber', 'createTime',
						]
						//	将部门对象中的 部门名称提取出来显示,否则部门是个对象无法显示
						for(var i=0;i<this.tableData.length;i++){
							this.tableDataDload[i]=this.tableData[i]
							if(this.tableData[i].dept.deptName){
								this.tableDataDload[i].deptShow=this.tableData[i].dept.deptName;								
							}							
						}						
						const list = this.tableDataDload								
						const data = this.formatJsonAll(filterVal, list)
						excel.export_json_to_excel({
							header: tHeader,
							data,
							filename: '用户管理导出',
							autoWidth: true
						});
					})
				} else {
					import('@/modules/mms/vendor/Export2Excel').then(excel => {
						const tHeader = [
							'用户名称',
							'用户Id',
							'登录名称',							
							'部门',					
							'邮箱',
							'手机号码',
							'创建时间',
						]
						const filterVal = [
							'realName',
							'userId',
							'userName',		
							'deptShow',
							'email',
							'phonenumber',
							'createTime',
						]
                    //将部门对象中的 部门名称提取出来显示,否则部门是个对象无法显示
							for(var i=0;i<this.multipleSelection.length;i++){
							this.tableDataDload2[i]=this.multipleSelection[i]
							if(this.tableDataDload2[i].dept.deptName){
								this.tableDataDload2[i].deptShow=this.multipleSelection[i].dept.deptName;								
							}							
						}
						const list = this.tableDataDload2	
						
						const data = this.formatJson(filterVal, list)
						excel.export_json_to_excel({
							header: tHeader,
							data,
							filename: '选中的用户管理导出'
						})
					})

				}
			},



			formatJson(filterVal, jsonData) {
				
				debugger;
				return jsonData.map(v => filterVal.map(j => v[j]))
				
			},
			formatJsonAll(filterVal, jsonData) {
				return jsonData.map(v =>
					filterVal.map(j => {
						if(j === 'timestamp') {
							// return parseTime(v[j]);
						} else {
							return v[j]
						}
					})
				)
			},



			showPwd() {
				if(this.pwdType === 'password') {
					this.pwdType = ''
				} else {
					this.pwdType = 'password'
				}
			},
			showPwd2() {
				if(this.pwdType2 === 'password') {
					this.pwdType2 = ''
				} else {
					this.pwdType2 = 'password'
				}
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
			deptTree(treeNode) {
				//			   alert("dd---"+treeNode.deptId);
				var dId = treeNode.deptId;
				treeShow(dId).then((response) => {
					this.tableData = response;
				})
			},
			// 分页
			handleSizeChange(val) {
				this.pagesize = val
				console.log(`每页 ${val} 条`)
			},
			handleCurrentChange(val) {
				this.currentPage = val
			},

			//此处四个方法是填充左边树状结构的，只需要知道自己的id，自己的部门名，父级id显示出来，不管以后要展开四级还是五级用了递归
			//dataLeftTree01 这四个方法将后端的数据转换成了el-tree所识别的格式
			getData(parentId, arry) {
				const childArry = this.getParentArry(parentId, arry)
				const menu = []
				if(childArry.length > 0) {
					for(const i in childArry) {
						menu.push(this.getItem(childArry[i].deptId, arry))
					}
				}
				return menu
			},
			//dataLeftTree02     根据菜单主键id生成菜单列表html deptId：菜单主键id arry：菜单数组信息
			getItem(deptId, arry) {
				const childArry = this.getParentArry(deptId, arry)
				var item = this.tree[this.getIndex(deptId, arry)]
				if(childArry.length > 0) {
					item['children'] = []
					for(var i in childArry) {
						item['children'].push(childArry[i])
						this.getItem(childArry[i].deptId, arry)
					}
				}
				return item
			},
			//dataLeftTree03
			getIndex(deptId, arry) {
				for(const i in arry) {
					if(arry[i].deptId === deptId) { return i }
				}
			},
			//dataLeftTree04 根据菜单主键id获取下级菜单 deptId：菜单主键id  arry：菜单数组信息
			getParentArry(deptId, arry) {
				var newArry = []
				for(var i in arry) {
					if(arry[i].parentId === deptId) { newArry.push(arry[i]) }
				}
				return newArry
			},
			handleChange(value) {
				console.log(value);
			},

			//			handleSelectionChange(val) {
			//				this.multipleSelection = val;
			//			},

			//表格的单选按钮点击后 收集被点中的id
			handleSelectionChange(val) {
				this.multipleSelection = val;
				var arrTest = [];
				for(var i in val) {
					arrTest.push(val[i].userId);
				}
				this.arrRo = [];
				this.arrRo = arrTest;
			},
			//表格全选按钮 点击后 收集被选中的id
			selectAllRus(val) {
				var arrTest = [];
				for(var i in val) {
					arrTest.push(val[i].userId);
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

			//点击箭头图标，展示所有输入框，箭头旋转180deg
			arrowTest() {
				this.isShowing = !this.isShowing;

				if(this.$refs.schItemShow2.style.display == 'block') {
					this.$refs.schItemShow2.style.display = 'none';
				} else {
					this.$refs.schItemShow2.style.display = 'block';
				}
			},

			arrowTest2() {

				if(this.$refs.conLefticon.style.display == 'block') {
					this.$refs.conLefticon.style.display = 'none';
					this.$refs.conRighticon.style.width = '100%';
				} else {
					this.$refs.conLefticon.style.display = 'block';
					this.$refs.conRighticon.style.width = '81%';
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
			
			//批量恢复按钮
			beback2(uid) {				
					//1.获取到的选中集合，去重			
				var temp = [];
				for(var i = 0; i < this.arrRo.length; i++) {
					if(temp.indexOf(this.arrRo[i]) == -1) {
						temp.push(this.arrRo[i]);
					}
				}
				if(temp.length == 0) {
					this.$confirm('请选择要-恢复-的数据?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'error'
					})

				} else {
						recover(temp).then((response) => {
					this.roleSearch(this.formInline);

					this.$message({
						type: 'success',
						message: '恢复成功！'
					})
				})
				}},

			//			禁用单个按钮	
			handleDelete(delNum0, statu) {
				var delNum = delNum0;
				if(statu == 1) {
					var ddText = "禁用"
				}
				if(statu == 2) {
					var ddText = "删除"
				}

				this.$confirm('此操作将-' + ddText + '-该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					userDele(delNum, statu).then((response) => {
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

			//点击重置密码按钮
			reset(idd, named) {
				this.resetDialog = true;
				this.formRset.userName = named;
				this.formRset.userId = idd;
				this.formRset.password = "";
				this.formRset.password2 = "";
			},

			//			重置密码模态框的 提交按钮
			resetCommit(formRset, pwdd) {

				this.$refs[formRset].validate((valid) => {
					//      	 alert('00formRset--'+valid);
					if(valid) {
						//          alert('01--submit!');
						this.formRset.password = pwdd;
						resetPwd(this.formRset).then((response) => {
							this.resetDialog = false;
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
							let length = this.roles.length
							let roleId = row.roleId
							for(let i = 0; i < length; i++) {
								if(roleId === this.roles[i].roleId) {
									return this.$refs.multipleTablePost.toggleRowSelection(this.roles[i], true);
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
					if(temp.indexOf(this.mulSelPost[i].roleId) == -1) {
						temp.push(this.mulSelPost[i].roleId);
					}
				}
				this.postTemp = temp.sort();
			},

			//编辑
			handleEdit(row) {
				//获取所有角色信息
				var nedDptId = row.userId;
				needRole().then((response) => {
					this.roles = response;
					if(this.roles) {
						//这里用嵌套，就是因为获取roles所要的时间稍长，等roles全部获取到之后，再去请求所具有的post，
						//						两个数组相匹配,匹配上的就勾选,否则,两个如果有一个数据没有返回就开始匹配,就会时而勾得上,有时勾不上,很不稳定
						//	//获取所-具有的-角色信息-需要传入当前的deptId
						needPostHave(nedDptId).then((response) => {

							this.postHave = response;
							//获取到该角色具有的roleId					
							for(var i = 0; i < this.postHave.length; i++) {
								this.arr1.push(this.postHave[i].roleId);
							}

							//				两层循环，匹配上的就勾选上
							for(var i = 0; i < this.arr1.length; i++) {
								for(var j = 0; j < this.roles.length; j++) {

									if(this.arr1[i] == this.roles[j].roleId) {
										this.$refs.multipleTablePost.toggleRowSelection(this.roles[j]);
										this.arr4.push(this.roles[j].roleId);
									}
								}
							}
							this.$nextTick(function() { this.toggleSelection(this.postHave) });
							//					this.resetDialog22 = true;
						})
					}
				})
				//         清空表格所有的勾选
				this.$nextTick(function() { this.toggleSelection() });

				//				获取具有的岗位信息 needPstSelect
				needPstSelect(nedDptId).then((response) => {
					this.postSele = response;
				})

				//	获取所有岗位信息 needPstSelectAll
				needPstSelectAll(nedDptId).then((response) => {
					this.postSeleAll = response;
				})
				//	获取所有Dept信息 l
				needDeptSelectAll(nedDptId).then((response) => {
					this.deptSeleAll = response;
				})
				this.$nextTick(function() { this.toggleSelection(this.postHave) });

				this.formEd.userId = row.userId;
				this.formEd.realName = row.realName;
				this.formEd.userName = row.userName;
				this.formEd.deptId = row.dept.deptId;
				this.formEd.deptName = row.dept.deptName;
				this.formEd.postId = row.post.postId;
				this.formEd.postName = row.post.postName;
				this.formEd.phonenumber = row.phonenumber;
				this.formEd.remark = row.remark;

				this.formEd.time = row.time;

				this.resetDialog22 = true;

			},

			//编辑弹窗的提交按钮
			editCommit(formEd) {

			},

			editCommit(formEd01, formEd) {

//				alert(this.selectedOptions);
				if(this.selectedOptions == 100) {
					this.$message({
						message: '组织机构不能选择根节点,请重选！',
						type: 'warning'
					})
					return false;
				}

				var tepIdArr = this.selectedOptions;
				tepIdArr.sort((num1, num2) => {
					return num1 - num2 < 0
				})

				this.formEd.deptId = tepIdArr[0];

				this.$refs[formEd01].validate((valid) => {
					if(valid) {
						this.formEd.roleIds = this.postTemp;
						if(this.postTemp == 0) {
							alert("角色没有勾选，提交失败！");
							return false;
						}

						this.resetDialog22 = false;

						editCmit(formEd).then((response) => {
							this.roleSearch(this.formInline);
							this.$message({
								type: 'success',
								message: '编辑成功！'
							})
						})
					} else {
							this.$message({
						message: '提交失败!',
						type: 'warning'
					})
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

			resetChongZhi(formName) {
				this.$refs[formName].resetFields();
			},

			//新增
			handleAdd(formAdd) {
      
				//获取部门信息也就是组织机构
				needDept().then((response) => {
					this.depts = response;
				})

				//获取岗位信息
				needPost().then((response) => {
					this.post = response;
				})
				//获取角色信息
				needRole().then((response) => {
					this.roles = response;
				})

				if(this.depts && this.post && this.roles) {

					this.addUserDialog = true;
					//				alert(this.depts.length+"--"+this.post.length+"--"+this.roles.length);
					this.$refs[formAdd].resetFields();
					
					  this.selectedOptions="";
                  alert(this.selectedOptions);

				}
			},

			blurCheck() {
				var cName = this.formAdd.userName;
				//新增按钮中 输入用户名后去后台检验是否存在
				checkUname(cName).then((response) => {
					this.cName2 = response;
					if(this.cName2 == 1) {
						this.$message({
							message: '这个登录名称在数据库里已经存在,请改名！',
							type: 'warning'
						})
					}
				})

			},

			//新增弹窗的提交按钮
			addCommit(formAdd, formAdd22) {

				if(this.formAdd.realName == "") {
					this.$message({
						message: '请输入用户名称！',
						type: 'warning'
					})
					return false;
				}
				if(this.formAdd.userName == "") {
					this.$message({
						message: '请输入登录名称！',
						type: 'warning'
					})
					return false;
				}
				//     组织机构 formAdd.deptId   岗位 formAdd.postId
				if(this.formAdd.deptId == "") {
					this.$message({
						message: '请选择组织机构！',
						type: 'warning'
					})
					return false;
				}

				if(this.formAdd.postId == "") {
					this.$message({
						message: '请选择岗位 ！',
						type: 'warning'
					})
					return false;
				}

				//           alert(this.formAdd.deptId);
				if(this.selectedOptions == 100) {
					this.$message({
						message: '组织机构不能选择根节点,请重选！',
						type: 'warning'
					})
					return false;
				}

				if(this.cName2 == 1) {
					this.$message({
						message: '这个名字数据库里已经存在,请改名！',
						type: 'warning'
					})
					return false;
				}

				if(this.postTemp.length == 0) {
					this.$message({
						message: '请选择角色',
						type: 'warning'
					})
					return false;
				}
				//				alert("ad--1");
				//部门列表的最大值就是最末尾点中的，通过降序排列，第一个就是最大的，也就是点中的
//				var tepIdArr = this.formAdd.deptId;
				var tepIdArr = this.selectedOptions
				tepIdArr.sort((num1, num2) => {
					return num1 - num2 < 0
				})

				this.formAdd.deptId = tepIdArr[0];
				this.$refs[formAdd].validate((valid) => {
					//      	 alert('00--'+valid);
					//					alert("ad03");
					if(valid) {
						//          alert('01--submit!');
						this.formAdd.roleIds = this.postTemp;
						this.addUserDialog = false;
						adCmit(formAdd22).then((response) => {
							//    如果添加成功就 再执行一次查询	
							this.roleSearch(this.formInline);

							if(response.length == 0) {
								//这里是清空新增的输入框，无论后端是否返回response都执行一次清空，这里加判断是防止清空操作 先执行
								this.$refs[formAdd].resetFields();
								this.$refs.multipleTableRole.clearSelection();
							} else {
								this.$refs[formAdd].resetFields();
								this.$refs.multipleTableRole.clearSelection();
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

		}
	};
</script>

<style scoped lang="scss">
	.opt /deep/ {
		.el-form-item--small .el-form-item__label {
			line-height: 34px;
		}
		.el-input--small .el-input__inner,
		.el-checkbox,
		.el-checkbox__input {
			height: 34px;
			line-height: 34px;
		}
	}
	
	.logAdd-obj {
		margin: 0 46px 0 56px;
		/deep/ {
			.el-form-item {
				width: 48%;
			}
			.el-form-item__content {
				width: calc(100% - 90px);
				.el-input,
				.el-cascader,
				.el-select {
					width: 100%;
				}
			}
			.des {
				width: calc(96% + 20px);
				.el-form-item__content {
					width: calc(100% - 90px - 5px);
				}
			}
		}
	}
	
	.sp {
		display: inline-block;
		min-height: 28px;
		color: #42B983;
		span {
			padding-left: 10px;
			border-left: 3px solid #42B983;
		}
		i {
			padding-left: 10px;
		}
	}
	
	.co {
		color: #42B983;
		margin-left: 6px;
		cursor: pointer;
	}
	
	.bk {
		transition: all 0.1s ease-out;
		display: inline-block;
		width: 40px;
	}
	
	.blur {
		transform: rotate(180deg);
		display: inline-block;
		width: 40px;
	}
	
	.schItemShow {
		display: none;
		padding-bottom: -53px;
		height: 34px;
	}
	
	.step_btn {
		background: rgba(66, 185, 131, 0.4);
		border: 1px solid #42B983;
		color: rgba(66, 185, 131, 1);
		cursor: pointer;
		margin-left: 8px;
		border-radius: 3px;
		padding: 8px 11px;
		&:hover {
			background: rgba(66, 185, 131, 0.2);
		}
	}
	
	.search_btn {
		background: #42B983;
		border: 1px solid #42B983;
		color: #FFFFFF;
		font-size: 14px;
		&:hover {
			background: rgba(66, 185, 131, 0.8);
		}
	}
	
	.form_btn {
		background: transparent;
		color: #42B983;
		width: 45px;
		font-size: 14px;
		border: none;
		height: 34px;
		padding-left: 9px;
		padding-top: 7px;
		&:hover {
			background: #42B983;
			border-color: #42B983;
			color: #fff;
		}
	}
	
	.opt_btn {
		background: #F4F8F9;
		color: rgba(0, 0, 0, 0.70);
		margin-left: 8px;
		font-size: 14px;
		border: none;
		height: 34px;
		&:hover {
			background: #42B983;
			border-color: #42B983;
			color: #fff;
		}
	}
	
	.container {
		padding: 10px 20px;
		.buttonItem {
			margin-bottom: 10px;
		}
		.block {
			margin-top: 20px;
		}
		.li01 {
			list-style: none;
		}
		.tableRus2Sty {
			width: auto;
			height: auto;
			list-style: none;
			padding: 5px;
		}
		.tableRus2Sty:hover {
			background: #F5F5F5;
		}
		.spanRus2Sty {
			width: 190px;
			display: inline-block;
		}
		.RightRow1 {
			width: calc(100% - 40px);
			height: auto;
			margin: 20px;
			border-radius: 5px;
		}
	}
</style>