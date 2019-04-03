<template>

	<div class="login-container" style="">

		<img :src="loginbg01Img" alt="禁用11" style="border: 1px solid transparent;    width: 100%;
    height: 100%;">

			<div style="    border: 1px solid transparent;
    position: absolute;
    width: 800px;
    height: 450px;
    left: 50%;
    top: 50%;
    transform:translate(-50%,-57%);">

				<img :src="loginbg02Img" alt="禁用22" style="border: 1px solid transparent;
    width: 800px;height: 450px;">

					<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left" style="    position: relative;
    top: -90%;
    left: 53%;">

						<h4 class="title">集中化BOMC账号登录</h4>

						<el-form-item prop="">
							<span class="svg-container svg-container_login">
            <!--<svg-icon icon-class="user" />-->
            <i class="iconfont">&#xe661;</i>
          </span>
							<el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="请输入用户名" />
						</el-form-item>
						<el-form-item prop="">
							<span class="svg-container">
            <!--<svg-icon icon-class="password" />-->
            <i class="iconfont">&#xe663;</i>
          </span>
							<el-input :type="pwdType" v-model="loginForm.password" name="password" auto-complete="on" placeholder="请输入密码" @keyup.enter.native="handleLogin" />
							<span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
						</el-form-item>

						<el-form-item>

							<span class="svg-container">
            <i class="iconfont">&#xe662;</i>
          </span>

							<el-input type="text" v-model="loginForm.getcode" placeholder="请输入验证码" @keyup.enter.native="handleLogin" style="width:90px;" />

							<img :src="sscode" class="show-pwd" alt="" style="height: 35px;
    box-sizing: border-box;
    width: 100px;
    top: 7px;
    left: 158px;
    background: rgb(255, 255, 255);" @click="editCaptcha">

						</el-form-item>
						<el-form-item style="background: transparent;border: none;">
							<el-button :loading="loading" type="primary" style=" width: 100%;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 30px 0px;
    border-radius: 19px;
    letter-spacing: 30px;
    font-weight: bolder;
    text-align: center;
    font-family: PingFang-SC-Bold;
    border: none;
    background-image: linear-gradient(-116deg, rgb(34, 142, 220) 0%, rgb(142, 198, 26) 100%);
    padding-left: 19%;
    margin-top: 10%;" @click.native.prevent="handleLogin">
								登录
								</el-button>
						</el-form-item>

						</el-form>
	</div>
	</div>
</template>

<script>
	import loginbg01Img from '@/assets/images/loginbg01.png'
	import loginbg02Img from '@/assets/images/loginbg02.png'

	import runImg from '@/assets/images/run.png'

	import { isvalidUsername } from '@/utils/validate'
	import { getCode } from '@/api/login'
	export default {
		name: 'Login',
		data() {
			const validateUsername = (rule, value, callback) => {
				if(!isvalidUsername(value)) {
					callback(new Error('请输入正确的用户名'))
				} else {
					callback()
				}
			}
			const validatePass = (rule, value, callback) => {
				if(value.length < 5) {
					callback(new Error('密码不能小于5位'))
				} else {
					callback()
				}
			}
			return {
				loginbg01Img: loginbg01Img,
				loginbg02Img: loginbg02Img,
				sscode: '', // 国通临时
				//    sscode: '/api/v1/code/getCode',
				loginRus: [],
				loginForm: {
					username: '',
					password: '',
					getcode: '',
					random: ''
				},
				loginRules: {
					username: [{ required: true, trigger: 'blur', validator: validateUsername }],
					password: [{ required: true, trigger: 'blur', validator: validatePass }]
				},
				loading: false,
				pwdType: 'password'
			}
		},

		created() {
			this.getRandom()
		},

		methods: {
			showPwd() {
				if(this.pwdType === 'password') {
					this.pwdType = ''
				} else {
					this.pwdType = 'password'
				}
			},

			editCaptcha() {
				this.sscode = ''
				getCode().then(response => {
					this.loginForm.random = response.headers.random
					return 'data:image/png;base64,' + btoa(
						new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
					)
				}).then(data => {
					this.sscode = data
				})
			},

			getRandom() {
				getCode().then(response => {
					this.loginForm.random = response.headers.random
					return 'data:image/png;base64,' + btoa(
						new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
					)
				}).then(data => {
					this.sscode = data
				})
			},
			handleLogin() {
				// debugger
				this.$refs.loginForm.validate(valid => {
					if(valid) {
						// console.log(this.loginForm);
						this.loading = true
						this.$store.dispatch('Login', this.loginForm).then(() => {
							this.loading = false
							//          this.$store.dispatch("changeNeedDealCount");
							this.$router.push({ path: '/' })
						}).catch(() => {
							this.loading = false
							this.getRandom()
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			}

		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	/* reset element-ui css  #C3D9D7  */
	
	.login-container {
		.el-input {
			display: inline-block;
			height: 47px;
			width: 85%;
			input {
				background: #FFFFFF;
				border: 0px;
				-webkit-appearance: none;
				border-radius: 0px;
				padding: 12px 5px 12px 15px;
				color: #000000;
				height: 47px;
				&:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px #FFFFFF inset !important;
					-webkit-text-fill-color: #000000 !important;
				}
			}
		}
		.el-form-item {
			border-bottom: 1px solid #C3D9D7;
			border-width: 80%;
			background: #FFFFFF;
			border-radius: 2px;
			color: #454545;
			margin-bottom: 0px;
		}
	}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
	$dark_gray:#889aa4;
	.login-container {
		position: fixed;
		height: 100%;
		min-height: 600px;
		width: 100%;
		min-width: 950px;
		background-color: #2d3a4b;
		.login-form {
			/*position: absolute;
    left: 52%;
    top:22%;*/
			width: 328px;
			padding: 35px 35px 15px 35px;
		}
		.tips {
			font-size: 14px;
			color: #fff;
			margin-bottom: 10px;
			span {
				&:first-of-type {
					margin-right: 16px;
				}
			}
		}
		.svg-container {
			padding: 6px 5px 6px 15px;
			color: $dark_gray;
			vertical-align: middle;
			width: 30px;
			display: inline-block;
			&_login {
				font-size: 20px;
			}
		}
		.title {
			font-size: 25px;
			font-weight: 400;
			color: black;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
		.show-pwd {
			position: absolute;
			right: 10px;
			top: 7px;
			font-size: 16px;
			color: $dark_gray;
			cursor: pointer;
			user-select: none;
		}
	}
</style>