<template>
	<div>
		<el-table :data="data" border style="width: 100%" :row-style="showTr">
			<el-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text">
				<template slot-scope="scope">
					<span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space" :key="levelIndex"></span>
					<span class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-arrow-right" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="el-icon-arrow-down" aria-hidden="true"></i>
        </span>
					<span v-else-if="index===0" class="ms-tree-space"></span> {{scope.row[column.dataIndex]}}
				</template>
			</el-table-column>
			<el-table-column label="操作" v-if="treeType === 'normal'" width="260">
				<template slot-scope="scope">
					
					<el-button @click="dialogVisible = true" size="mini"> 编辑
					</el-button>
					<el-button @click="dialogVisible = true" size="mini"> 新增
					</el-button>
					<el-button size="small" type="danger" @click="handleDelete()">
						删除
					</el-button>

				</template>
			</el-table-column>
		</el-table>
		<!-- 信息 01-->
		<el-dialog title="添加部门" :visible.sync="dialogVisible" :before-close="handleClose">
		
			<el-form :model="form" style="margin:10px;width:auto;">

				<el-form-item label="上级部门" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="部门名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="显示排序" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="负责人" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="联系电话" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="部门状态" :label-width="formLabelWidth">
					 <el-radio v-model="radio" label="1">正常</el-radio>
  					 <el-radio v-model="radio" label="2">停用</el-radio>
				</el-form-item>
				

				
		</el-form>
				
			<span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">提 交</el-button>
    
    <el-button @click="dialogVisible = false">关 闭</el-button>
  </span>
		</el-dialog>

	

	</div>
</template>
<script>
	import Utils from '../utils/index.js'
	//  import Vue from 'vue'
	export default {
		name: 'tree-grid',
		props: {
			// 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
			treeStructure: {
				type: Boolean,
				default: function() {
					return false
				}
			},
			// 这是相应的字段展示
			columns: {
				type: Array,
				default: function() {
					return []
				}
			},
			// 这是数据源
			dataSource: {
				type: Array,
				default: function() {
					return []
				}
			},
			// 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
			requestUrl: {
				type: String,
				default: function() {
					return ''
				}
			},
			// 这个是是否展示操作列
			treeType: {
				type: String,
				default: function() {
					return 'normal'
				}
			},
			// 是否默认展开所有树
			defaultExpandAll: {
				type: Boolean,
				default: function() {
					return false
				}
			}
		},
		data() {
			return {
				dialogVisible: false,
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
				formLabelWidth: "120px"
			}
		},
		computed: {
			// 格式化数据源
			data: function() {
				let me = this
				if(me.treeStructure) {
					let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
					console.log(data)
					return data
				}
				return me.dataSource
			}
		},
		methods: {
			// 显示行
			showTr: function({ row, rowIndex }) {
				let obj = { row, rowIndex }
				let show = (obj.row._parent ? (obj.row._parent._expanded && obj.row._parent._show) : true)
				obj.row._show = show
				return show ? '' : 'display:none;'
			},
			// 展开下级
			toggle: function(trIndex) {
				let me = this
				let record = me.data[trIndex]
				record._expanded = !record._expanded
			},
			// 显示层级关系的空格和图标
			spaceIconShow(index) {
				let me = this
				if(me.treeStructure && index === 0) {
					return true
				}
				return false
			},
			// 点击展开和关闭的时候，图标的切换
			toggleIconShow(index, record) {
				let me = this
				if(me.treeStructure && index === 0 && record.children && record.children.length > 0) {
					return true
				}
				return false
			},
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
			handleEdit() {
				alert("dataGrid里面更改");
				this.addUserMenu = true;
				this.dialog.title = '编辑角色JP';
			}
		}
	}
</script>
<style scoped>
	.ms-tree-space {
		position: relative;
		top: 1px;
		display: inline-block;
		font-family: "Glyphicons Halflings";
		font-style: normal;
		font-weight: 400;
		line-height: 1;
		width: 18px;
		height: 14px;
	}
	
	.ms-tree-space::before {
		content: "";
	}
	
	table td {
		line-height: 16px;
	}
</style>