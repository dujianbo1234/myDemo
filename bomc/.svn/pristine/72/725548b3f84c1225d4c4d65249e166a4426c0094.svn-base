<template>
	<div class='container'>
		<div class="" style="width: 100%;height: auto;border: 1px solid transparent;">

			

	
		<div class="conRight" style="width: calc(100% - 196px);height: auto;;float: right;">
			
			<!--以上是头部搜索部门-->

			<div class="RightRow1" style="">
				<el-row>
					<el-col>
						<el-card>
							
						

							
						</el-card>
						
						<div style="border: 2px solid red;width: 1111px;height: 300px;">
	
		<el-table :data="tableData" border style="width: 100%" >
      <el-table-column align="center" prop="createTime" label="创建时间" width="150">
      </el-table-column>
      
      <el-table-column  width="55" prop="id" label="id"  ></el-table-column>
      <el-table-column align="center" prop="keywords" label="keywords-Gr" width="250">
      </el-table-column>
      <el-table-column align="center" prop="page.sort" label="Page 's sort'" width="150">
      </el-table-column>
      
      <el-table-column align="center" prop="page.order" label="Page 's order" width="120" >
      </el-table-column>
      
       <el-table-column  width="155" prop="updateTime" label="updateTime-Rus"  ></el-table-column>
 
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

<script>import { roleSch, needDept, needPost, needRole, userDele, recover, leftData, resetPwd, checkUname, adCmit, editCmit, getInfo, needPostHave, treeShow, needPstSelect, needPstSelectAll, needDeptSelectAll } from "../../../api/userManage";
export default {
	data() {

		return {

			tableData:[ {
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
			],

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
};</script>

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