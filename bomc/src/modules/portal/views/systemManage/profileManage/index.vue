<template>
	<div class='container'>
		<div class="" style="width: 100%;height: auto;border: 1px solid transparent;">

			

	
		<div class="conRight" style="width: calc(100% - 196px);height: auto;;float: right;">
			
			<!--以上是头部搜索部门-->

			<div class="RightRow1" style="">
				<el-row>
					<el-col>
						<el-card>
							
							<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :default-sort="{prop: 'userId', order: 'ascending'}" v-show="tableRus" @selection-change="handleSelectionChange">
								<el-table-column fixed type="selection" width="35">
								</el-table-column>

								<el-table-column fixed prop="realName" label='用户名称' width="80">
								</el-table-column>
								<el-table-column prop="userId" label='用户id' width="65">
								</el-table-column>
								
								<el-table-column prop="phonenumber" label='手机号码' width="120">
								</el-table-column>
								<el-table-column prop="createTime" label='创建时间' width="170">
								</el-table-column>
								<el-table-column prop="remark" label='描述' min-width="180">
								</el-table-column>

							

							

							</el-table>

							
						</el-card>
						
						<div style="border: 2px solid red;width: 1111px;height: 300px;">
						   <el-table
      :data="tableData" border style="width: 100%" >
      <el-table-column type="selection" width="55" fixed align="center" ></el-table-column>
      <el-table-column align="center" prop="title" label="文章标题" width="250">
      </el-table-column>
      <el-table-column align="center" prop="sort" label="所属分类" width="150">
      </el-table-column>
      <el-table-column align="center" prop="createtime" label="创建时间" width="150">
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态" width="120" :formatter="formatterColumn">
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="EditRow(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" class="red" @click="SingleDel(scope.$index, scope.row)">删除</el-button>
          <el-button type="text" icon="el-icon-delete" class="red" @click="Prohibit(scope.$index, scope.row)" :disabled="isdisabled" >禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
						</div>
						
					</el-col>
				</el-row>
			</div>
		</div>
	</div>

	<!-- dialog -->
	</div>
</template>

<script>
	import { roleSch, needDept, needPost, needRole, userDele, recover, leftData, resetPwd, checkUname, adCmit, editCmit, getInfo, needPostHave, treeShow, needPstSelect, needPstSelectAll, needDeptSelectAll } from "../../../api/userManage";
	export default {
		data() {

			return {

var arr={
  "categoryId": 0,
  "content": "string",
  "coverId": 0,
  "createTime": "2019-03-19T01:57:56.282Z",
  "description": "string",
  "id": 0,
  "keywords": "string",
  "page": {
    "by": "id",
    "order": "asc",
    "pageNum": 1,
    "pageSize": 15,
    "sort": "id"
  },
  "sort": 0,
  "status": 0,
  "system": 0,
  "title": "string",
  "updateTime": "2019-03-19T01:57:56.282Z",
  "url": "string",
  "viewNums": 0
}
			

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
								})

							},

							watch: {
								multipleSelection: function() {
									this.arrRo = [];
									for(let i in this.multipleSelection) {
										this.arr.push(this.multipleSelection[i].userId);
									}
								}
							},
							methods: {
								
							
							
							}
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