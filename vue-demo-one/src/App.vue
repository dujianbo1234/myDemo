<template>
	<div class='app'>
		<el-row>
			<el-col>
				<el-card>
					<el-form :inline="true" class="demo-form-inline">
						<!--<el-select v-model="modelType" clearable  placeholder="选择任务类型" >
							<el-option v-for='(item,index) in taskDate' :key="index" :label="item.modelName" :value="item.modelType"></el-option>
						</el-select>-->
						<el-form-item>
							<el-input v-model="name" placeholder="请输入任务名称"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input v-model="creator" placeholder="请输入操作人"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" icon="el-icon-search" >查询</el-button>
						</el-form-item>
						<!--<el-form-item class="buttonItem">
							<el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addDialog()">新增</el-button>
							<el-button type="danger" size="small" icon="el-icon-circle-close-outline" round>删除</el-button>
						</el-form-item>-->
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col>
				<el-card class="oper_button">
				  <!-- <el-button type="danger" icon="el-icon-refresh" @click="restartTask()" plain>重新执行</el-button> -->
				  <!-- <el-button type="primary" icon="el-icon-circle-close" @click="multipleKillTask()" plain>停止</el-button> -->
				  <el-button type="warning" icon="el-icon-zoom-out" plain >暂停</el-button>
				  <el-button type="success" icon="el-icon-circle-check-outline"  plain>继续</el-button>
				  <el-button type="danger" icon="el-icon-close" plain>删除</el-button>
				</el-card>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col>
				<el-card>
					<el-table @selection-change="handleSelectionChange" :data="tableData" style="width: 100%" :default-sort="{prop: 'userId', order: 'ascending'}">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="name" label='任务名称' width="150">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="modelType" label='服务' width="100" sortable>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="creator" label='操作人' width="100" sortable>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="level" label='任务级别' width="120" sortable :formatter="formatmodelLevel">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="triggerType" label='调度方式' width="120" sortable>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="content" label='触发条件' width="120" sortable>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="startTime" label='开始时间' width="150" sortable>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="endTime" label='结束时间' width="150" sortable>
						</el-table-column>
						<el-table-column prop="percent" label='任务进展' width="150" sortable>
							<template slot-scope="scope">
								<!-- <el-popover trigger="hover" placement="top">							
									<el-table :data="scope.row.nodeInstList">
										<el-table-column prop="name" label='节点名称' width="100">
										</el-table-column>
										<el-table-column prop="content" label='命令内容' width="300">
										</el-table-column>
										<el-table-column prop="scriptAddress" label='脚本地址' width="300">
										</el-table-column>
									</el-table>
									<div slot="reference" class="name-wrapper">
										<el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.percent" ></el-progress>
									</div>
								</el-popover> -->
								<el-progress :text-inside="true" :stroke-width="18" :percentage="Number(scope.row.percent)" ></el-progress>
							</template>
						</el-table-column>
						<el-table-column prop="nodeInstList" label='结果详情' width="100" sortable  align="center">
							<template >
								<!-- <el-button size="mini" type="primary" @click="resultDetail(scope.row.id)">显示详情</el-button> -->
								 <!-- <el-button  size="mini" type="primary" icon="el-icon-location-outline" @click="resultDetail(scope.row.id)" plain></el-button> -->
								 <i class="el-icon-view" style="    font-size: 20px;" ></i>
								<!-- <el-popover trigger="hover" placement="top">
									<el-table :data="scope.row.nodeInstList">
										<el-table-column prop="startTime" label='开始时间' width="100">
										</el-table-column>
										<el-table-column prop="endTime" label='结束时间' width="100">
										</el-table-column>
										<el-table-column prop="executeResult" label='执行结果' width="950">
										</el-table-column>
									</el-table>
									<div slot="reference" class="name-wrapper">
										<el-tag size="medium">显示详情</el-tag>
									</div>
								</el-popover> -->
							</template>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="state" label='状态' width="80" sortable :formatter="formatmodelState">
						</el-table-column>
						
						
						<el-table-column label='操作' fixed="right" width="250">
							<template >
								<!-- <el-button size="mini" type="primary" @click="stopTask(scope.row.id)">停止</el-button> -->
								<el-button :disabled="scope.row.state.indexOf('0') != -1 || scope.row.state.indexOf('2') != -1 || scope.row.state.indexOf('3') != -1" size="mini" type="warning" @click="stopTask(scope.row.id)">暂停</el-button>
								<el-button size="mini" type="success" >继续</el-button>
								<el-button size="mini" type="danger" >删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="block" align="right">
						<el-pagination v-if="totalCount>0" :current-page="currentPage" :page-sizes="[5, 10, 20, 50, 100, 200, 500]" :page-size="pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper" 
							 />
					</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- 详情弹框 -->
		<el-dialog v-loading="tableLoadingDetail" title="结果详情" :visible.sync="resultDetailDialog" width="60%">
			<el-table  :data="resultDetailTable">
				<el-table-column show-overflow-tooltip property="taskCount" label="执行次数"></el-table-column>
				<el-table-column show-overflow-tooltip property="state" label="状态" :formatter="formatmodelStateTwo"></el-table-column>
				<el-table-column show-overflow-tooltip property="startTime" label="开始时间" min-width="150"></el-table-column>
				<el-table-column show-overflow-tooltip property="endTime" label="结束时间" min-width="150"></el-table-column>
				<el-table-column label='节点详情' fixed="right" width="150">
					<template slot-scope="scope">
						<el-popover trigger="click" placement="top" title="显示详情" width="1100">
							<el-table :data="scope.row.nodeInfos">
								<el-table-column show-overflow-tooltip prop="name" label='节点名称' min-width="100">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="content" label='节点内容' min-width="100">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="step" label='步骤' min-width="100">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="state" label='状态' min-width="100" :formatter="formatmodelPopoverState">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="startTime" label='开始时间' min-width="100">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="endTime" label='结束时间' min-width="100">
								</el-table-column>
								<el-table-column show-overflow-tooltip prop="executeResult" label='执行结果' min-width="100">
								</el-table-column>
							</el-table>
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">显示详情</el-tag>
							</div>
						</el-popover>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="scss">
	.container {
		padding: 10px 20px;
		.buttonItem {
			float: right;
			margin-right: 0px !important;
		}
		.block {
			margin-top: 20px;
		}
	}
	.oper_button{
		    text-align: right;
	}
	
</style>
