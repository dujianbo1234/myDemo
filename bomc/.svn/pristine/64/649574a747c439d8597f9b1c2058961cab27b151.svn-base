<template>
	<div class="container">
		<el-row>
			<el-col>
				<el-card>
					<el-form :inline="true" :model="formInline" class="demo-form-inline">
						<el-form-item label="字典名称">
							<el-input v-model="formInline.user" />
						</el-form-item>
						<el-form-item label="字典类型">
							<el-input v-model="formInline.user" />
						</el-form-item>
						<el-form-item label="字典状态">
							<el-select v-model="formInline.region" placeholder="所有">
								<el-option label="正常" value="shanghai" />
								<el-option label="停用" value="beijing" />
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
						</el-form-item>
						<el-form-item>
							<el-button type="primary">查询</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-card>
					<div class="buttonItem">
						<el-button type="success" size="small" icon="el-icon-circle-plus-outline" round @click="addUserDialog=true">新增</el-button>
						<el-button type="danger" size="small" icon="el-icon-circle-close-outline" round>删除</el-button>
					</div>
					<el-table :data="tableData" :default-sort="{prop: 'userId', order: 'ascending'}" style="width: 100%">
						<el-table-column type="selection" width="55" />
						<el-table-column prop="userId" label="字典主键" width="80" />
						<el-table-column prop="loginName" label="字典名称" width="100" />
						<el-table-column prop="userName" label="字典类型" width="120" />
						<el-table-column prop="department" label="状态" width="150" />
						<el-table-column prop="tel" label="备注" width="180" />
						<el-table-column prop="time" label="创建时间" width="180" />
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
								<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="block" align="right">
						<el-pagination :page-size="100" :total="1000" layout="prev, pager, next, jumper" />
					</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- dialog -->
		<!-- 信息 -->
		<el-dialog :title="dialog.title" :visible.sync="addUserDialog" :before-close="handleClose">
			<el-form :model="form" style="margin:10px;width:auto;">
				<el-form-item :label-width="formLabelWidth" label="性别">
					<el-select v-model="form.region" placeholder="请选择活性别">
						<el-option label="男" value="nan" />
						<el-option label="女" value="nv" />
					</el-select>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" label="登录名称">
					<el-input v-model="form.name" auto-complete="off" />
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addUserDialog = false">取 消</el-button>
				<el-button type="primary" @click="addUserDialog = false">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<style scoped lang="scss">
	.container {
		padding: 10px 20px;
		.buttonItem {
			margin-bottom: 10px;
		}
		.block {
			margin-top: 20px;
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				formInline: {
					user: '',
					region: ''
				},
				tableData: [{
						userId: 1,
						loginName: 'Admin',
						userName: 'kobe',
						department: '研发一部',
						tel: '15888888888',
						time: '2018-03-16 11:33:00'
					},
					{
						userId: 2,
						loginName: 'ry',
						userName: 'silence',
						department: '研发一部',
						tel: '15888888888',
						time: '2018-03-16 11:33:00'
					}
				],
				addUserDialog: false,
				value6: '',

				// 新增
				//      addUserDialog(data){
				//        axios({
				//          type:'get',
				//          path:'',
				//          data:data,
				//          fn:data=>{
				//            this.$message('新增成功'),
				//              this.paginations.total = data.count;
				//            this.getList({fun: () => {} });
				//            this.dialog.show = false;
				//          },
				//          errFn:()=>{
				//            this.$message.error('新增失败请重试')
				//          }
				//        })
				//      },

				//      删除
				//      delUserDialog(row) {
				// id来删除数据
				//        this.$message({
				//          showClose: true,
				//          message: '对不起，您暂无此操作权限~',
				//          type: 'success'
				//        });
				//        return;
				//        let data = {
				//          id:row.id
				//        }
				//        axios({
				//          type:'get',
				//          path:'',
				//          data:data,
				//          fn:data=>{
				//            this.$message('删除成功'),
				//              this.paginations.total = data.count;
				//            this.getList({fun: () => {} });
				//            删除成功后，重新加载数据;
				//          },
				//          errFn:()=>{
				//            this.$message.error('删除失败请重试')
				//          }
				//        })
				//      },

				// 编辑
				handleEdit(row) {
					this.form.userId = row.userId
					this.form.loginName = row.loginName
					this.form.userName = row.userName
					this.form.department = row.department
					this.form.tel = row.tel
					this.form.time = row.time
					this.addUserDialog = true
					this.dialog.title = '修改信息'
				},
				//      editUserDialog(data){
				//        axios({
				//          type:'get',
				//          path:'',
				//          data:data,
				//          fn:data=>{
				//            this.$message('编辑成功'),
				//            this.paginations.total = data.count;
				//            this.getList({fun: () => {} });
				//            this.dialog.show = false;
				//          },
				//          errFn:()=>{
				//            this.$message.error('编辑失败请重试')
				//          }
				//        })
				//      },
				//      },
				dialog: {
					show: false,
					title: '新增信息'
				},
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px'
			}
		},
		created() {},
		methods: {
			//    handleEdit(index, row) {
			//      console.log(index, row);
			//    },
			handleDelete() {
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			addUser() {
				console.log('add')
			},
			delUser() {
				console.log('del')
			}
		}
	}
</script>