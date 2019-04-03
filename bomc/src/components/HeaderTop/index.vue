<template>
	<div>
		<div class="topWraper">
			<div class="header-item fl">
				<img class="logoTag" src="@/assets/images/u4.png" alt="">
			</div>
			<div class="header-item fl">
				<hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
			</div>
			<div @mouseleave="mounte">
				<el-menu :default-active="activeIndex2" class="el-menu-header fl" mode="horizontal" text-color="#fff" background-color="transparent" @select="handleSelect">
					<el-menu-item v-for="(item, index) in menuList" :index="item.index">
						<a :href="item.src" @mouseenter="mount(item)"><i :class="item.icon" />{{ item.name }}</a>
					</el-menu-item>

				</el-menu>
			</div>
			<el-dropdown class="header-item header-setting" style=";padding:0px 20px 0px 2px" @command="handleCommand" trigger="click">
				<span class="el-dropdown-link">
        <i class="el-icon-setting"/>
      </span>
				<el-dropdown-menu slot="dropdown" >

					<el-dropdown-item>
						<!--{{this.$store.state.user.userId}}-->
						<el-button type="success" size="small" class="btnSty" @click="handleAdd()" style="">个人中心</el-button>
					</el-dropdown-item>

					<el-dropdown-item>
						<el-button type="success" size="small" class="btnSty" @click="reset()" style="">修改密码</el-button>

					</el-dropdown-item>
					<el-dropdown-item command="logout">
						<el-button type="success" size="small" class="btnSty">退出登录</el-button>
					</el-dropdown-item>

				</el-dropdown-menu>
			</el-dropdown>
			<span style="font-size: 14px;padding:0px 0px" class="header-item header-setting">欢迎,{{ this.$store.state.user.name }}</span>

		</div>
		<div>
			<!--02-重置密码-->
			<el-dialog title="重置密码" :visible.sync="resetDialog">
				<el-form :model="formRset" :rules="rules2" ref="formRset" style="margin:10px;width:auto;">
					<el-form-item label="登录名称" :label-width="formLabelWidth">
						<el-input v-model.trim="formRset.userName" auto-complete="off" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="输入原始密码" :label-width="formLabelWidth" prop="oldPwd" required>
						<el-input :type="pwdType" v-model.trim="formRset.oldPwd" v-on:blur="blurCheckPwd()" auto-complete="off"></el-input>
					</el-form-item>
					<span class="show-pwd" @click="showPwd">
		          <svg-icon icon-class="eye" style="position: relative;top: -46px;left: 95%;" />
		        </span>
					<el-form-item label="输入密码" :label-width="formLabelWidth" prop="password" required>
						<el-input :type="pwdType2" v-model.trim="formRset.password" auto-complete="off"></el-input>
					</el-form-item>
					<span class="show-pwd" @click="showPwd2">
		          <svg-icon icon-class="eye" style="position: relative;top: -46px;left: 95%;" />
		        </span>
					<el-form-item label="确认密码" :label-width="formLabelWidth" prop="password2" required>
						<el-input :type="pwdType3" v-model.trim="formRset.password2" auto-complete="off"></el-input>
					</el-form-item>
					<span class="show-pwd" @click="showPwd3">
		          <svg-icon icon-class="eye" style="position: relative;top: -46px;left: 95%;" />
		        </span>

				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="resetCommit('formRset',formRset.password)">提交</el-button>
					<el-button @click="resetDialog = false">关闭</el-button>
				</div>
			</el-dialog>

			<el-dialog title="个人信息" :visible.sync="dialogVisible">

				<!--{{tableDataRole}}-->
				<el-form :model="formAdd" :rules="rules" ref="formAdd" style="margin:10px;width:auto;">

					<el-form-item label="登录名称:" :label-width="formLabelWidth">
						<el-input v-model.trim="formAdd.userName" auto-complete="off" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="部门名称:" :label-width="formLabelWidth">
						<el-input v-model.trim="formAdd.dept.deptName" auto-complete="off" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="用户名称:" :label-width="formLabelWidth" prop="realName" required>
						<el-input v-model.trim="formAdd.realName" auto-complete="off"></el-input>
					</el-form-item>

					<el-form-item label="邮箱:" :label-width="formLabelWidth" prop="email" required>
						<el-input v-model.trim="formAdd.email" auto-complete="off"></el-input>
					</el-form-item>

					<el-form-item label="岗位列表:" :label-width="formLabelWidth">
						<el-input v-model.trim="formAdd.post.postName" auto-complete="off" :disabled="true"></el-input>
					</el-form-item>

					<el-form-item label="性别" :label-width="formLabelWidth">
						<el-select v-model.trim="formAdd.sex" style="height: 36px;width: 100%;" placeholder="请选择性别">
							<el-option label="男" value="0"></el-option>
							<el-option label="女" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="手机号码" :label-width="formLabelWidth" prop="phonenumber" required>
						<el-input type="tel" :label-width="formLabelWidth" v-model="formAdd.phonenumber" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
					</el-form-item>

					<el-form-item label="角色信息" :label-width="formLabelWidth">
						<el-table :data="tableDataRole" border style="width: 100%">
							<el-table-column prop="roleId" label='角色Id' min-width="130">
							</el-table-column>
							<el-table-column prop="roleName" label='角色列表' min-width="130">
							</el-table-column>
						</el-table>
					</el-form-item>

				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="addCommit('formAdd',formAdd)">提交</el-button>

					<el-button @click="dialogVisible = false">关闭</el-button>
				</div>
			</el-dialog>
		</div>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Hamburger from '@/components/Hamburger'
	import { roleSch, editCmit, needPostHave, checkPwd } from "@/modules/portal/api/userManage";
	var testFun = (name) => {
		const produ = (process.env.NODE_ENV === 'production')
		if(produ) {
			if(location.pathname.indexOf('index') == -1 && !/^\/CTBOMC\/$/.test(location.pathname)) {
				return name == 'index' ? '../' : '../' + name + '/'
			} else {
				return name == 'index' ? './' : './' + name + '/'
			}
		} else {
			return ''
		}
	}
	const menuList = [
		{ src: testFun('index') + 'index.html', name: '综合门户', icon: 'el-icon-location', index: '1' },
		{ src: testFun('mms') + 'mms.html', name: '监控管理', icon: 'el-icon-menu', index: '8' },
		{ src: testFun('oms') + 'oms.html', name: '运维管理', icon: 'el-icon-service', index: '9' },
		{ src: testFun('ops') + 'ops.html', name: '操作管理', icon: 'el-icon-edit-outline', index: '10' },
		{ src: testFun('pms') + 'pms.html', name: '流程平台', icon: 'el-icon-news', index: '11' },
		{ src: testFun('rms') + 'rms.html', name: '资源管理', icon: 'el-icon-view', index: '12' },
		{ src: testFun('collector') + 'collector.html', name: '采集平台', icon: 'el-icon-location', index: '13' },
		{ src: testFun('kms') + 'kms.html', name: '指标管理', icon: 'el-icon-share', index: '14' }
	]
	export default {
		name: 'HeaderTop',
		components: { Hamburger },
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
					return callback(new Error('密码必须包含大小写字母，数字，特殊字符且长度8位至30位请重置'));
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
			return {
				rules2: {
					oldPwd: [
						{ required: true, message: '请输入用户密码', trigger: 'blur' },
						//						{ min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
					],

					password: [
						{ validator: validatePwd, trigger: 'blur' }
					],
					password2: [
						{ validator: validatePwd2, trigger: 'blur' }
					],

				},
				resetDialog: false,
				formRset: {
					userId: "",
					oldPwd: "",
					oldPwdBack: "",
					userName: "",
					password: "",
					password2: "",
				},
				rules: {
					realName: [
						{ required: true, message: '请输入用户名称', trigger: 'blur' },
						{ min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
					],

					phonenumber: [
						{ required: true, message: '请输入手机号码', trigger: 'blur' },
						{ min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
					],
					email: [
						{ required: true, type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
						{ min: 5, max: 55, message: '邮箱长度在 5 到 55 个字符', trigger: 'blur' }
					],
				},
				pwdType: 'password',
				pwdType2: 'password',
				pwdType3: 'password',
				formAdd: {
					remark: "",
					realName: "",
					userName: "",

					dept: { deptName: "" },
					postId: "",
					post: { postName: "" },
					password: "",
					password2: "",
					email: "",
					sex: "",
					roleIds: [],
					//					roles: [],
					deptId: "",
					postId: ""
				},
				formLabelWidth: "120px",
				tableData: [],
				tableDataRole: [],
				formInline: {
					userName: "",
					phonenumber: "",
					status: "",

				},
				dialogVisible: false,
				menuList: menuList,
				fs: true
			}
		},
		mounted() {
			this.menuList = this.fsceen = this.getSources().splice(0, 8)
		},
		computed: {
			...mapGetters([
				'sidebar',
				'headState'
			]),
			routes() {
				return this.$router.options.routes
			},
			isCollapse() {
				return !this.sidebar.opened
			},
			activeIndex2() {
				return this.headState
			}
		},
		methods: {
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
			showPwd3() {
				if(this.pwdType3 === 'password') {
					this.pwdType3 = ''
				} else {
					this.pwdType3 = 'password'
				}
			},
			blurCheckPwd() {
				var oldPwd = this.formRset.oldPwd;

				//http://192.168.127.247:8092/pps/api/v1/user/selectUserByUserName?userName=luohui
				//
				//
				//然后再调取http://192.168.127.247:8092/pps/api/v1/user  这个接口进行编辑
				//put请求
				var uName = this.$store.state.user.name;
				checkPwd(uName).then((response) => {
					this.formRset.oldPwdBack = response.password;
					if(this.formRset.oldPwd == this.formRset.oldPwdBack) {
						this.$message({
							type: 'success',
							message: '两者密码相等！'
						})
					} else {
						this.$message({
							type: 'warning',
							message: '原始密码输入错误！'
						})
					}

				})
				//	alert(this.formRset.oldPwdBack);

			},
			addCommit(formEd01, formEd) {
				this.$refs[formEd01].validate((valid) => {
					if(valid) {
						this.dialogVisible = false;
						formEd.deptId = formEd.dept.deptId;
						formEd.postId = formEd.post.postId;
						var tempRoles = [];
						for(var i = 0; i < this.tableDataRole.length; i++) {
							tempRoles.push(this.tableDataRole[i].roleId);
						}
						formEd.roleIds = tempRoles;
						editCmit(formEd).then((response) => {
							this.$message({
								type: 'success',
								message: '提交成功！'
							})
						})
					} else {
						this.$message({
							type: 'warning',
							message: '提交失败！'
						})
						this.dialogVisible = false;
						return false;
					}
				});
			},
			reset() {
				this.resetDialog = true;
				this.formRset.userName = this.$store.state.user.name;
			},

			handleAdd() {
				this.formInline.userName = this.$store.state.user.name;
				this.dialogVisible = true;
				roleSch(this.formInline).then((response) => {
					this.tableData = response;
					this.formAdd = this.tableData[0];
				})
				var roleId = this.$store.state.user.userId;
				needPostHave(roleId).then((response) => {
					this.tableDataRole = response;
				})
			},
			handleSelect(key, keyPath) {
				this.$store.dispatch('toggleHeadState', key)
			},
			toggleSideBar() {
				this.$store.dispatch('toggleSideBar')
			},
			handleCommand(command) {
				if(command == 'logout') {
					console.log('logoutStart')
					this.$store.dispatch('LogOut').then(() => {
						location.reload()
					})
				}
			},
			getSources() {
				return window.JSON.parse(window.JSON.stringify(menuList))
			},
			mount(obj) {

			},
			mounte() {}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
	.hamburger-container {
		margin-top: 5px;
	}
	
	.logoTag {
		height: 35px;
	}
	
	li.el-menu-item {
		background-color: transparent !important;
		color: #fff !important;
		border: none !important;
	}
	
	li.el-menu-item.is-active:before {
		content: '';
		width: 100%;
		height: 100%;
		display: inline-block;
		position: absolute;
		left: 0;
		background: #fff !important;
		opacity: 0.2;
		z-index: -1;
	}
	
	.el-menu-header {
		border: none;
		a {
			display: inline-block;
		}
	}
	
	.topWraper {
		height: 60px;
		/*background: rgb(10, 34, 68);*/
		background: linear-gradient(to right, #2b93ca, #85c129);
		position: fixed;
		top: 0;
		min-width: 1016px;
		width: 100%;
		left: 0;
		z-index: 99;
		user-select: none;
	}
	
	.header-item {
		line-height: 60px;
		height: 60px;
		padding: 0 22px;
		img {
			vertical-align: middle;
		}
	}
	
	.btnSty {
		background: transparent;
		border: none;
		color: black;
	}
	
	.fl {
		float: left;
	}
	
	.header-setting {
		color: #fff;
		font-size: 18px;
		float: right;
	}
	
	@media screen and (max-width: 1302px) {
		.el-menu-item {
			padding: 0 16px;
		}
	}
	
	@media screen and (max-width: 1238px) {
		.el-menu-item {
			padding: 0 14px;
		}
	}
	
	@media screen and (max-width: 1207px) {
		.el-menu-item {
			padding: 0 12px;
		}
	}
	
	@media screen and (max-width: 1175px) {
		.el-menu-item {
			padding: 0 10px;
		}
	}
	
	@media screen and (max-width: 1142px) {
		.el-menu-item {
			padding: 0 8px;
		}
	}
	
	@media screen and (max-width: 1114px) {
		.el-menu-item {
			padding: 0 6px;
		}
	}
	
	@media screen and (max-width: 1098px) {
		.el-menu-item {
			padding: 0 2px;
		}
	}
</style>