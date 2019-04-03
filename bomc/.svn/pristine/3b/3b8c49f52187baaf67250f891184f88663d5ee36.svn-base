<template>
	<div class='container'>
		<el-row>
			<el-col>
				<el-card>
					<el-form :inline="true" :model="formCascader"  ref="formCascader" :rules="formCascaderRules" class="demo-form-inline" label-width="110px">
						<el-form-item prop="type">
							<el-cascader
								:options="cascaderIndex"
								change-on-select
								v-model="formCascader.type"
								clearable 
								:props="cascaderProps"
								placeholder="请选择巡检类型/巡检项"
								@change="cascaderIndexChange">
							</el-cascader>
							<!-- <el-select v-model="formCascader.type" placeholder="请选择巡检指标">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select> -->
							
						</el-form-item>
						
						<el-form-item prop="name">
							<el-input v-model="formCascader.name" placeholder="请输入任务名称"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" @click="queryDataClick('formCascader')">查询</el-button>
						</el-form-item>
						<el-form-item class="buttonItem">
							<el-button type="success" size="small" icon="el-icon-circle-plus-outline"   @click="addDialogPolling('form')">新增</el-button>
							<el-button type="warning" size="small" icon="el-icon-check" @click="executeTask('0')">执行</el-button>
							<el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="taskCusCopy()" >复制</el-button>
							<el-button type="danger" size="small" icon="el-icon-circle-close-outline" @click="deleteRowTask()" round>删除</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-card>
					<el-table v-loading="tableLoading" @selection-change="handleSelectionChange" :data="tableData" style="width: 100%" :default-sort="{prop: 'userId', order: 'ascending'}">
						<el-table-column type="selection" width="55" align="center">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="name" label='任务名称' min-width="80" align="center">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="creator" label='操作人' min-width="80" align="center">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="level" label='任务级别' min-width="80" align="center">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="objectNumber" label='主机数量/个' min-width="100" align="center">
						</el-table-column>
						<el-table-column prop="" label='巡检指标数' min-width="80" align="center">
							<template slot-scope="scope">
								<el-popover trigger="hover" placement="top">
									<el-table :data="scope.row.inspectionItems">
										<el-table-column show-overflow-tooltip  prop="nodeName" label='节点名' width="100" align="center">
										</el-table-column>
										<el-table-column show-overflow-tooltip  prop="name" label='巡检指标名' width="100" align="center">
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="reference" label='基线数据' width="100" align="center">
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="lowerLimit" label='基线下限' width="100" align="center">
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="highLimit" label='基线上限' width="100" align="center"> 
										</el-table-column>
										<!-- <el-table-column show-overflow-tooltip prop="alarm" label='是否告警' width="100" align="center" :formatter="formatAlarm"> 
										</el-table-column> -->
									</el-table>
									<div slot="reference" style="text-align:center;color:#409EFF;text-decoration: underline;" class="name-wrapper">
										{{scope.row.itemCount}}
									</div>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="triggerType" label='调度方式' min-width="80" align="center">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="range" label='调度周期' min-width="140" align="center">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="content" label='触发条件' min-width="80" >
							<template slot-scope="scope">
								<i class="iconfont detail_btn">&#xe670;</i>	
							</template>
						</el-table-column>
						<el-table-column prop="" label='节点详情' width="80">
							<template slot-scope="scope">
								<el-popover trigger="hover" placement="top">
									<el-table :data="scope.row.taskNodes">
										<el-table-column show-overflow-tooltip prop="name" label='节点名称' width="100">
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="content" label='命令' width="200">
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="scriptAddress" label='脚本' width="200">
										</el-table-column>
										<el-table-column show-overflow-tooltip prop="poName" label='巡检指标' width="200">
										</el-table-column>
									</el-table>
									<div slot="reference" style="font-size: 20px;" class="name-wrapper">
										<i class="el-icon-view"></i>
									</div>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="state" label='状态' min-width="80" align="center">
						</el-table-column>
						<el-table-column   label='操作'  min-width="300" align="center">
							<template slot-scope="scope" >
								<el-button size="mini" type="primary" @click="editDialogPolling(scope.row.id)">编辑</el-button>
								<el-button size="mini" type="warning" @click="executeTask('1',scope.row.id)">执行</el-button>
								<el-button size="mini" type="danger" @click="deleteTask(scope.row.id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="block" align="right">
						<el-pagination v-if="totalCount>0" :current-page="currentPage" :page-sizes="[5, 10, 20, 50, 100, 200, 500]" :page-size="pageSize" :total="totalCount" layout="total, sizes, prev, pager, next, jumper" 
							@size-change="handleSizeChange" @current-change="handleCurrentChange" />
					</div>
				</el-card>
			</el-col>
		</el-row>

		<!-- dialog -->
		<!-- 新增命令弹窗 -->
		<el-dialog :title="dialog.title" :visible.sync="addUserDialog" width="70%" @close="dialogClose('form')" :close-on-click-modal="false">
			<el-form ref="form" :rules="rules" :model="form" label-width="110px">
				<el-row>
					<el-col :span="8">
						<el-form-item label="任务名称" prop="name" label-width='100px' >
							<el-input  v-model="form.name" @blur="nameCode"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="任务级别" prop="taskRank" label-width='100px'>
							<el-select v-model="form.taskRank" placeholder="请选择任务级别">
								<el-option
									v-for="item in rank"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="平台类型" prop="platformType" label-width='100px'>
							<el-select v-model="form.platformType" placeholder="请选择平台类型" @change="nameCode">
								<el-option
									v-for="item in taskTypeList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					
				</el-row>
				<h3 class="mes">节点信息  <el-button icon="el-icon-circle-plus-outline"  class="add-mes " size="small" type="success" @click="addMes()">新增节点</el-button></h3>
				<el-collapse v-model="activeNames" @change="handleChange">
					 <el-collapse-item :title="item.node" :name="item.step" v-for="(item, index) in form.mes" :key="index">
						
						<el-row>
							<el-col :span="8">
								<!--  :prop="'mes.'+ index+'.name'"  :rules="{required: true, message: '节点不能为空', trigger: 'blur'}" -->
								<el-form-item label="节点名称"  :prop="'mes.'+ index+'.name'"  :rules="{required: true,validator: validateFontSize,  trigger: 'blur'}">
									<el-input v-model="item.name"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4"  :offset="8">
								<el-button style="float: right;" icon="el-icon-circle-plus-outline" size="small" type="primary" @click="copyNode(item,index)" round>复制该节点</el-button>
							</el-col>
							<el-col :span="4">
								<el-button style="float: right;" icon="el-icon-circle-close-outline" size="small" type="danger" @click="delNode(index)" round>删除该节点</el-button>
							</el-col>
						</el-row>

						<el-form-item label="节点类型" prop="nodeType">
							<el-radio-group v-model="item.nodeType">
								<el-radio label="0">命令</el-radio>
								<el-radio label="1">脚本</el-radio>
								<el-radio label="2">巡检指标</el-radio>
							</el-radio-group>
						</el-form-item>

						<el-row v-show="item.nodeType == 0">
							<el-col :span="8">
								<!-- :prop="'mes.'+ index+'.content'"  :rules="{required: true, message: '命令不能为空', trigger: 'blur'}" -->
								<el-form-item label="输入命令" >
									<el-input v-model="item.content"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row  v-show="item.nodeType == 1">
							<el-col :span="8">
								<!-- :prop="'mes.'+ index+'.scriptAddressName'"  :rules="{required: true, message: '脚本不能为空', trigger: 'change'}" -->
								<el-form-item label="选择脚本" >
									<el-select  @change="scriptFn(index)" v-model="item.scriptAddressName" placeholder="请选择脚本" clearable >
										<el-option
											v-for="item in options"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-upload
								class="upload-demo"
								:action="base_api + '/ops/api/v1/mainTask/upload '"
								:before-remove="beforeRemove"
								:on-exceed="handleExceed"
								:headers="myHeaders"
								:limit="1"
								:on-success="onSuccess"
								:on-error="onError"
								:show-file-list="false"
								:file-list="form.mes[index].fileList">
								<el-button size="small" type="primary" @click="btnUp(index)">点击上传</el-button>
							</el-upload>
						</el-row>
						<el-row v-show="item.nodeType == 2">
							<el-col :span="8">
								<!-- :prop="'mes.'+ index+'.polling'"  :rules="{required: true, message: '巡检指标不能为空', trigger: 'change'}" -->
								<el-form-item label="选择巡检指标" >
									<el-popover
										placement="bottom-start"
										width="400"
										trigger="click">
										<el-tree
											
											:props="defaultProps"
											:data="treeData"
											show-checkbox
											node-key="id"
											:default-checked-keys="item.pollingId"  
											ref='treePolling'
											:default-expanded-keys="item.pollingId"
											leafOnly="fasle"
											@check-change="pitchState(index)">
											<span class="custom-tree-node" slot-scope="{ node, data }">
												<span>{{ data.name }}</span>
												<span >
													<el-button
														type="text"
														size="mini"
														@click="() => pollingEdit(node, data)">
														<i class="el-icon-edit"></i>
													</el-button>
												</span>
												<span >
													<el-button
														v-if="!data.list"
														type="text"
														size="mini"
														@click="() => pollingRemove(node, data)">
														<i class="el-icon-delete"></i>
													</el-button>
												</span>
											</span>
											
											
										</el-tree>
										<el-input style="background-color: white; cursor: pointer;" v-model="item.polling" slot="reference" disabled placeholder="请选择巡检类型"></el-input>
									</el-popover>
									
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-button size="small" type="primary" class="polling-add" @click="addPolling">新增巡检指标</el-button>
							</el-col>
							<el-col v-show="item.polling != ''" :span="24">
								<el-form-item label="">
									<el-tabs v-model="pollingName" @tab-click="tabsPolling">
										<el-tab-pane :label="String(datas.name)" :name="String(datas.id)" v-for="(datas,indexs) in item.inspectionItems" :key="datas.id">
											<el-row>
												<el-form-item label="是否添加巡检基线" label-width="130px" >
													<el-radio-group v-model="datas.isInspection">
														<el-radio label="1">是</el-radio>
														<el-radio label="0">否</el-radio>
													</el-radio-group>
												</el-form-item>
											</el-row>
											<br>
											<el-row v-show="datas.isInspection == '1'">
												<el-row>
													<el-form-item label="巡检命令" class="pollingTabs" label-width="130px" >
														<el-input placeholder="巡检命令" disabled v-model="datas.command"></el-input>
													</el-form-item>
												</el-row>
												<el-row>
													<el-form-item label="请选择类型" class="pollingTabs" label-width="130px" >
														<el-select v-model="datas.dataType"  @change="pollingType(index)">
															<el-option
																v-for="item in keynoteType"
																:key="item.value"
																:label="item.label"
																:value="item.value">
															</el-option>
														</el-select>
													</el-form-item>
												</el-row>
												<el-row v-show="datas.dataType == 'double' || datas.dataType == 'int' ">
													<el-form-item label="请输入基线数据" class="pollingTabs" label-width="130px" >
														<el-input-number placeholder="请输入基线数据" v-model="datas.reference" :min="0" :max="100"></el-input-number>
													</el-form-item>
												</el-row>
												<el-row v-show="datas.dataType == 'double' || datas.dataType == 'int' ">
													<el-form-item label="基线上限" class="pollingTabs" label-width="130px" >
														<el-input-number placeholder="请输入基线上限" v-model="datas.highLimit" :min="0" :max="100"></el-input-number>
													</el-form-item>
												</el-row>
												<el-row v-show="datas.dataType == 'double' || datas.dataType == 'int' ">
													<el-form-item label="基线下限" class="pollingTabs" label-width="130px" > 
														<el-input-number placeholder="请输入基线下限"  v-model="datas.lowerLimit" :min="0" :max="100"></el-input-number>
													</el-form-item>
												</el-row>
												<el-row v-show="datas.dataType == 'string'">
													<el-form-item label="基线详情" class="pollingTabs" label-width="130px" >
														<el-input placeholder="请输入基线详情" v-model="datas.stringResult"></el-input>
													</el-form-item>
												</el-row>
												<!-- <el-row>
													<el-form-item label="是否告警" label-width="130px" >
														<el-radio-group v-model="datas.alarm" >
															<el-radio label="1">是</el-radio>
															<el-radio label="0">否</el-radio>
														</el-radio-group>
													</el-form-item>
												</el-row> -->
											</el-row>
										</el-tab-pane>
									</el-tabs>
								</el-form-item>
							</el-col>
						</el-row>
						
						<el-row>
							<el-col :span="8">
								<!-- :prop="'mes.'+ index+'.resourceGroupName'"  :rules="{required: true, message: '对象不能为空', trigger: 'blur'}" -->
								<el-form-item label="选择主机" :prop="'mes.'+ index+'.resourceGroupName'"  :rules="{type:'array',required: true, message: '对象不能为空', trigger: 'change'}">
									<!-- <el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addObject(index)">选择主机</el-button> -->
									<el-select style="width:100%"  v-model="item.resourceGroupName" placeholder="请选择主机用户" multiple collapse-tags>
										<el-option v-for='(item,index) in hostIPDate' :key="index" :label="item" :value="item"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-tag
							style="margin-left:10px"
							v-for="tag in form.mes[index].resourceGroupName"
							:key="tag.name"
							closable
							@close="closeTag(tag,index)"
							type="success">
							{{tag}}
						</el-tag>
					</el-collapse-item>
				</el-collapse>

					
				
				
				
				<h3 class="execute">执行配置</h3>
				<div class="confInfo">
				
				<el-row>
					<el-col :span="24">
					<el-form-item label="执行方式" prop="way">
						 <el-radio-group v-model="form.way">
							<el-radio label="0">手动执行</el-radio>
							<el-radio label="1">周期执行</el-radio>
							<el-radio label="2">定时执行</el-radio>
						</el-radio-group>
					</el-form-item>
					</el-col>
				</el-row>	

				<el-row v-show="dateShow && disabledDate">
				    <el-form-item label="选择日期" prop="selectDate" >
						<el-date-picker
							
							v-model="form.selectDate"
							type="datetimerange"
							value-format="yyyy-MM-dd HH:mm:ss"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:picker-options="pickerOptions" 
							:editable='false'>
						</el-date-picker>
						 <!-- <el-date-picker
							v-if="disabledDate"
							v-model="form.selectDate"
							type="datetimerange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期">
						</el-date-picker> -->
						
				    </el-form-item>
					
				 </el-row>
				 <el-row v-show="dateShow && disabledDate == false">
					<el-form-item label="选择日期" prop="selectDate">
						<el-date-picker
							v-model="form.selectDatetwo"
							value-format="yyyy-MM-dd HH:mm:ss"
							type="datetime"
							placeholder="选择日期时间"
							:picker-options="pickerOptionTime" 
							:editable='false'>
						</el-date-picker>
					</el-form-item>
 				</el-row>
				<el-row v-show="frequencyShow">
					<el-form-item label="设置频率">
						<el-input-number v-model="form.frequency" controls-position="right"  :min="1" :max="60"></el-input-number>-
						   <el-select  v-model="form.region" placeholder="选择时间单位">
								<el-option label="天" value="天"></el-option>
								<el-option label="时" value="时"></el-option>
								<el-option label="分" value="分"></el-option>
							</el-select>/次
					</el-form-item>
				</el-row>

				<el-row>
						<el-form-item label="触发条件" prop="conditionObject conditionIndex conditionType conditionRelation">
							<el-select v-model="form.conditionObject" placeholder="择任对象">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							
							<el-select v-model="form.conditionIndex" placeholder="择任指标">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							
							<el-select v-model="form.conditionType" placeholder="择任类型">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<el-select v-model="form.conditionRelation" placeholder="关联关系">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
				</el-row>
				
				
				<!-- <el-row>
					<el-form-item label="超时阈值">
						<el-input-number v-model="form.valueMinute" controls-position="right"  :min="0" :max="10"></el-input-number>分
						<el-input-number v-model="form.valueSecond" controls-position="right"  :min="0" :max="10"></el-input-number>秒
					</el-form-item>
				</el-row> -->
				
				<el-row>
					<el-form-item label="超时阈值" prop="overTimeDate">
						<el-input-number v-model="form.overTime" controls-position="right"  :min="1" :max="60"></el-input-number>-
						
						<el-select v-model="form.overTimeDate" placeholder="选择时间单位">
								<el-option label="天" value="天"></el-option>
								<el-option label="时" value="时"></el-option>
								<el-option label="分" value="分"></el-option>
						</el-select>
						
					</el-form-item>
				</el-row>
				
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addDialogFail('form')">取 消</el-button>
				<el-button type="primary" @click="addDialogSave('form')">保 存</el-button>
				<!-- <el-button @click="resetFromClick()">重置</el-button> -->
			</div>
		</el-dialog>
		<el-dialog title="新增指标" :visible.sync="addPollingDialog" width="40%" @close="pollingResetForm('PollingForm')" >
			<el-form :model="PollingForm" :rules="PollingRules" ref="PollingForm" label-width="100px" class="demo-ruleForm">

				<el-form-item label="巡检项" prop="parentId">
					<el-cascader
						ref="cascader"
						:options="pollingProject"
						change-on-select
						v-model="PollingForm.parentId"
						clearable 
						 @change="pollingChange"
						:props="pollingProps">
					</el-cascader>
				</el-form-item>
				<el-form-item label="巡检指标" prop="name">
					<el-input v-model="PollingForm.name"></el-input>
				</el-form-item>
				<el-form-item label="巡检说明">
					<el-input v-model="PollingForm.itemDesc"></el-input>
				</el-form-item>
				<el-form-item label="命令" prop="command">
					<el-input v-model="PollingForm.command"></el-input>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="pollingResetForm('PollingForm')">取 消</el-button>
				<el-button type="primary" @click="pollingFormSave('PollingForm')">保 存</el-button>
			</div>
		</el-dialog>

		<el-dialog title="新增主机" :visible.sync="addObjectDialog" @close="closeMainDialog('addObjectForm')">
			<el-form :model="addObjectForm" ref="addObjectForm" :rules="addObjectFormRules" style="margin:10px;width:auto;" label-width="80px">
				<el-form-item label="主机用户" prop="main">
					<el-select  v-model="addObjectForm.main" placeholder="请选择主机用户" multiple>
						<el-option v-for='(item,index) in hostIPDate' :key="index" :label="item" :value="item"></el-option>
					</el-select>
					
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addObjectDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveObjectAdd('addObjectForm')">保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>


<script>
	import * as service from '@/modules/ops/api/ops/autoInspection/insTaskManage.js'
	import * as rule from '@/modules/ops/api/rules.js'
	import { getToken } from '@/utils/auth'
	export default {
		data() {
			return {
				pageSize: 10, // 每页多少条
				totalSize: 1000, // 总条数	
				currentPage: 1, // 当前页
				totalCount: '', // 总条数
				// ----------------------------------------------------------
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < new Date(new Date().toLocaleDateString()).getTime();
					}
				},
				pickerOptionTime: {
					disabledDate(time) {
						return time.getTime() < new Date(new Date().toLocaleDateString()).getTime();
					}
				},
				// 编辑的id
				editId: '',
				// 判断是新增还是编辑
				editBol: false,
				// 表格选中的行
				multipleSelection: [],
				// 判断巡检指标是新增还是编辑
				pollingAddEditBol:false,
				// 巡检指标编辑id
				pollingEditId: '',
				// 保存级联选择器的数据
				pollingProject:[],
				pollingProps: {
					children: 'list',
					label: 'name',
					value: 'id'
				},
				// 保存addObject index
				addObjectIndex : '',
				// 选择的主机数组
				hostIPDate: [],
				userInfoData:[],
				// 选择对象弹框
				addObjectDialog:false,
				// 新增主机
				addObjectForm:{
					main:[],
				},
				addObjectFormRules:{
					main: [
						{ type:'array', required: true, message: '请选择对象类型', trigger: 'change' }
					],
				},
				// 选择对象标签页
				typeName: '',
				// 新增巡检指标弹框
				addPollingDialog:false,
				// 新增巡检指标数据
				
				PollingForm: {
					command:'',
					itemDesc:'',
					name:'',
					parentId:[],
				},
				PollingRules: {
					name: [
						{ required: true, message: '请输入巡检指标', trigger: 'blur' },
					],
					command: [
						{ required: true, message: '请输入命令', trigger: 'blur' },
					],
					parentId: [
						{ type: 'array', required: true, message: '请选择巡检项', trigger: 'blur' }
					],
				},
				// 控制表格加载
				tableLoading:true,
				// 记录点击的时第几个上传的按钮
				upIndex:'',
				// 选择对象标签页
				typeName: '',
				// 巡检指标标签页
				pollingName:'',
				// 巡检指标自动展开
				unfoldPollingTree:[],
				// 巡检指标树形图数据
				treeData: [],
				defaultProps: {
					children: 'list',
					label: 'name',
					value: 'id'
				},
				// 改变级联选择器的key值
				cascaderProps: {
					value: 'id',
					label: 'name',
					children: 'list',
				},
				treeProps: {
					children: 'list',
					// label: 'name'
				},
				// 首页搜索的表单数据
				formCascader: {
					type: [],
					name:''
				},
				// 首页搜索的验证规则
				formCascaderRules: {
					name:[ 
						{ validator: rule.validateQueryName, trigger: 'blur' },
					]
				},
				// 保存首页级联选择器的数据
				cascaderIndex: [],
				
				// 控制频率是否可选
				frequencyShow:false,
				// 控制显示哪种日期选择器
				dateShow:false,
				// 控制日期选择器是否可以选择
				disabledDate:true,
				// 脚本宽度
				popoverWidth:"200",
				// 上传的地址
				base_api: '',
				// 折叠面板是否展开
				activeNames: [],
				form: {
					// 平台类型
					platformType :"",
					template: "",
					name: "",
					region: "分",
					date1: "",
					mes: [
						// {name:'',types:"",id:"",node:"",order:"",scrip:"",typeId:""}
					],
					date2: "",
					delivery: false,
					type: [],
					taskType: "",
					operator: "",
					taskRank: "",
					way: "0",
					conditionObject: "",
					conditionIndex: "",
					conditionType: "", 
					conditionRelation: "",
					selectDate: "",
					selectDatetwo: "",
					frequency: "",
					overTime: "5",
					overTimeDate: "分",
					valueMinute: "",
					valueSecond: "",
					resource: "",
					desc: ""
				},
				rules: {
					name: [
						{ required: true, message: '请输入任务名称', trigger: 'blur' },
						{ min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
						//  { validator: rule.validateCodeName, trigger: 'blur' },
						//  { validator: rule.validateCode, trigger: 'blur' },
						
					],
					platformType: [
						{ required: true, message: '请选择平台类型', trigger: 'change' }
					],
					taskRank: [
						{ required: true, message: '请选择任务级别', trigger: 'change' }
					],
					overTimeDate: [
						{ required: true, message: '请选择时间单位', trigger: 'change' }
					]
				},
				// 任务级别
				rank: [{
					value: '1',
					label: '低'
				}, {
					value: '2',
					label: '中'
				}, {
					value: '3',
					label: '高'
				}],
				// 任务类型
				taskTypeList: [{
					value: 1,
					label: 'laaS层基础平台'
				}, {
					value: 2,
					label: 'paaS软件集群'
				}, {
					value: 3,
					label: 'SaaS层应用'
				}],
				// 基线类型 
				keynoteType : [
					{value:'string',label:'字符串'},
					{value:'int',label:'整形'},
					{value:'double',label:'小数'},
				],
				// 类型列表
				inspectionType: [{value:'选项1',label:'巡检类型'},
                                {value:'选项2',label:'主机'},
                                {value:'选项3',label:'数据库'},
                                {value:'选项4',label:'中间件'},
                                {value:'选项5',label:'网络设备'},
								{value:'选项6',label:'PasS集成组件'},],
				// 类型默认值
				inspectionTypeDefault: '选项1',

				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				// 记录编辑的名字
				taskName:'',
				// ----------------------------------------------------------				




                
				taskTemplate: [{value: '选项1',label: '模板01'}],
							  taskTemplateDefault: '选项1',
				operationName: [],
				addUserDialog: false,
				tableData: [{taskName: '名称水电费水电费水电费是XXX',operator: '张三丰',taskLevel: '高',objectQuantity: '10',inspectionItem: '巡检项1',indexNumber: '40',dispatchPeriod:'18/01/01-18/02/02',triggerCondition:'2',state:'审核中'}],
				taskType: [{value:'选项1',label:'IaaS层基础平台模板'},
						   {value:'选项2',label:'PaaS层软件集群模板'},
						   {value:'选项3',label:'SaaS层应用模板'},],
						   taskTypeDefault: '选项1',
				taskLevel: [{value:'选项1',label:'高'},
							{value:'选项2',label:'中'},
							{value:'选项3',label:'低'},],
							taskLevelDefault: '选项1',
				dialog: {
					show: false,
					title: '新增任务',
				},
				formLabelWidth: "120px",
				radio1: '1',
				radio2: '1',
				radio3: '1',
				activeName: 'second',
				selCommand:[{value:'选项1',label:'请选择命令'}],
							selCommandDefault: '选项1',
				object: [{value:'选项1',label:'对象1'}],
						objectDefault: '选项1',
				
				
				flag: true,
				handleEdit(row) {
					this.form.userId = row.userId;
					this.form.loginName = row.loginName;
					this.form.userName = row.userName;
					this.form.department = row.department;
					this.form.tel = row.tel;
					this.form.time = row.time;
					this.addUserDialog = true;
					this.dialog.title = '修改命令';
				},
				startTime: '',
				endTime: '',
				startTimeDisabled: false,
				endTimeDisabled: false,
				day: '',
				hour: '',
				minute: '',
				second: '',
				minuteThreshold: '',
				secondThreshold: '',
				object: [],
				index: [],
				type: [],
				selectValue: [{value:'选项1',label:'>'},
							  {value:'选项2',label:'<'},
							  {value:'选项3',label:'>='},
							  {value:'选项4',label:'<='},],
				incidenceRelation: [{value:'选项1',label:'或'},
							        {value:'选项2',label:'与'},],
				gridData:[{object:'CPU',index:'%10',type:'%3',selectValue:'>',incidenceRelation:'或'}],



			};
		},
		
		mounted() {
			// 首页表格查询
			this.queryData()
			// 选择主机ip查询
			this.queryIP()
			// 巡检指标树形栏查询
			this.treeQuery()
			//this.deleteInfo()
		},
		computed: {
			myHeaders: function () {
				// `this` 指向 vm 实例
				const datas = {
					'X-Token':getToken()
				}
				return datas
			}
		},
		methods: {
			// ------------------------------------------------
			
			// 表格转换
			formatAlarm(row, column) {
				var data = ''
				var array = ['否','是']
				data = array[row.alarm]
				return data
			},
			validateFontSize(rule,value,callback){
				let specialKey = "[%`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"; 
				var bol = true;
				var myObj=value.replace(/\s+/g,"");
				if(myObj!=value){
					bol = false;
					callback(new Error('请不要输入空白字符'));
				}
				for (let i = 0; i < value.length; i++) {
					if (specialKey.indexOf(value.substr(i, 1)) != -1) {
					bol = false;
					callback(new Error('请不要输入特殊字符'))
					}
				}
				if(value == '') {
					callback(new Error('节点不能为空'))
				}
				if(bol){
					callback()
				}
			},
			nameCode() {
				// 判断是不是编辑
					if(this.form.name != '' &&  this.form.platformType != ''){
					const params = {
						name:this.form.name,
						modelType:5,
						platformId:this.form.platformType,
					}
					if(this.editBol) {
						params.id = this.editId
					}
					service.addTaskRepeatName(params).then(res => {
						if(res.code == 400){
							this.$message({
								type: 'warning',
								message: res.msg
							});  
							this.form.name = ''
						}
					})
					
				}
			},
			// 巡检类型选择
			pollingType(indexs) {
				console.log(this.form.mes[indexs].inspectionItems)
				
			},
			// 重置表单数据的函数
			resetForm() {
				this.form.template= "";
				this.form.name= "";
				this.form.region= "分";
				this.form.date1= "";
				this.form.mes= [
					// {sname:'',types:"",id:"",node:"",order:"",scrip:"",typeId:""}
				];
				this.form.date2= "";
				this.form.delivery= false;
				this.form.type= [];
				this.form.taskType= "";
				this.form.operator= "";
				this.form.taskRank= "";
				this.form.way= "0";
				this.form.conditionObject= "";
				this.form.conditionIndex= "";
				this.form.conditionType= "";
				this.form.conditionRelation= "";
				this.form.selectDate= [];
				this.form.selectDatetwo= "";
				this.form.frequency= "";
				this.form.overTime= "5",
				this.form.overTimeDate= "分",
				this.form.valueMinute= "";
				this.form.valueSecond= "";
				this.form.resource= "";
				this.form.desc= "";
				this.form.platformType = "",
				// 编辑需要传的参数
				this.editId = "";
				this.editBol = false;
				this.createTime = "";

				
			},
			// 复制
			taskCusCopy() {
				if(this.multipleSelection.length == 0) {
					this.$message({
						message: '请选择需要复制的数据',
						type: 'warning'
					});
					return false;
				}
				var ids = [];
				this.multipleSelection.forEach((item,index)=>{
					ids.push(item.id)
				})
				this.$confirm('是否开始复制所选任务', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
				
				const params = {
					taskIds:ids.join(',')
				}
				service.taskCusCopy(params).then(res=>{
					this.$message({
							type: 'success',
							message: res.msg
						})
					this.queryData()
				}).catch(() => {
						this.$message({
							type: 'info',
							message:  res.msg
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					})
				})
			},
			//多条删除		
			deleteRowTask() {
				const _self = this
				var ids = [];
				if(this.multipleSelection.length == 0) {
					this.$message({
						message: '请选择需要删除的数据',
						type: 'warning'
					});
				}else{
					this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'error'
					}).then(() => {
						_self.multipleSelection.forEach((item,index)=>{
							ids.push(item.id)
						})
						service.deleteRowTask(ids).then(res=>{
							this.$message({
									type: 'success',
									message: res.msg
								})
							_self.queryData()
						}).catch(() => {
							this.$message({
								type: 'info',
								message: res.msg
							})
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						})
					})
				}
					
			},
			//删除单条信息
			deleteTask(id) {
				
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					const params = {
						id: id
					}
					service.deleteTask(params).then(res => {
						
						this.$message({
							type: 'success',
							message: res.msg
						})
						this.queryData()
					}).catch(() => {
						this.$message({
							type: 'info',
							message: res.msg
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			//复选框
			handleSelectionChange(val){
				this.multipleSelection  = val
			},
			//执行	
			executeTask(types,dataId) {
				var ids = [];
				// types 0多条执行 types 1单条执行
				
				if(types == '0') {
					if(this.multipleSelection.length == 0) {
						this.$message({
							message: '请选择需要执行的数据',
							type: 'warning'
						});
						return false;
					}
					this.multipleSelection.forEach((item,index)=>{
						ids.push(item.id)
					})
				}else if(types == '1'){
					ids.push(dataId)
				}
				
				
				
				this.$confirm('是否开始执行所选任务', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
				
				let params = {
					taskIds:ids.join(',')
				}
				service.executeTask(params).then(res=>{
					this.$message({
							type: 'success',
							message: res.msg
						})
					this.queryData()
				}).catch(() => {
						this.$message({
							type: 'info',
							message: res.msg
						})
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					})
				})
			},
			//分页条数设置
			handleSizeChange(val) { // 设置每页多少条
				this.pageSize = val
				this.queryData()
			},
			//当前页
			handleCurrentChange(val) { // 当前页
				this.currentPage = val
				this.queryData()
			},
			// 树节点编辑
			pollingEdit(node, data) {
				
				const params = {
					id:data.id
				}
				service.treeQueryEdit(params).then(res => {
					if(res.code == 200) {
						console.log(res)
						console.log(res.result.parentIds)
						// console.log(res.result.parentIds.pop())
						console.log(res.result.parentIds.slice(0,res.result.parentIds.length-1))
						// arr.splice(0, 1);
						// this.PollingForm.parentId  = res.result.parentIds; 
						this.PollingForm.parentId  = res.result.parentIds.slice(0,res.result.parentIds.length-1)
						this.PollingForm.command = res.result.item.command;
						this.PollingForm.itemDesc = res.result.item.itemDesc;
						this.PollingForm.name = res.result.item.name;
						this.pollingEditId = data.id;
						this.pollingAddEditBol = true;
						this.addPollingDialog = true;
					}
					
				})
			},
			//树节点删除
			pollingRemove(node, data) {
				this.pollingDelete(data.id);
			},
			// 新增的保存
			 addDialogSave(formName) {
				 for(var i = 0 ; i <this.form.mes.length;i++) {
					if(this.form.mes[i].nodeType == 0) {
						if(this.form.mes[i].content == ''){
							this.$message({
								message:'节点'+Number(i+1)+'命令不能为空',
								type: 'warning'
							});
							return
						}
					}else if (this.form.mes[i].nodeType == 1){
						if(this.form.mes[i].scriptAddressName == ''){
							this.$message({
								message:'节点'+Number(i+1)+'脚本不能为空',
								type: 'warning'
							});
							return
						}
					}else if (this.form.mes[i].nodeType == 2){
						if(this.form.mes[i].polling == ''){
							this.$message({
								message:'节点'+Number(i+1)+'巡检指标不能为空',
								type: 'warning'
							});
							return
						}
					}
					if(this.form.mes[i].inspectionItems !== null){
						for(var j = 0;j<this.form.mes[i].inspectionItems.length;j++) {
							if(this.form.mes[i].inspectionItems[j].isInspection == "1"){
								if(this.form.mes[i].inspectionItems[j].dataType == 'double' || this.form.mes[i].inspectionItems[j].dataType == 'int' ) {
									this.form.mes[i].inspectionItems[j].stringResult  = ''
									if(this.form.mes[i].inspectionItems[j].reference == '' || this.form.mes[i].inspectionItems[j].highLimit == '' || this.form.mes[i].inspectionItems[j].lowerLimit == ''){
										this.$message({
											message:'巡检指标 ('+ this.form.mes[i].inspectionItems[j].name+') 数据不完整',
											type: 'warning'
										});
										return
									}
								}
								if(this.form.mes[i].inspectionItems[j].dataType == 'string' ) {
									this.form.mes[i].inspectionItems[j].reference = this.form.mes[i].inspectionItems[j].highLimit = this.form.mes[i].inspectionItems[j].lowerLimit = 0
									if(this.form.mes[i].inspectionItems[j].stringResult  == '' ){
										this.$message({
											message:'巡检指标 ('+ this.form.mes[i].inspectionItems[j].name+') 数据不完整',
											type: 'warning'
										});
										return
									}
								}
							}
							if(this.form.mes[i].inspectionItems[j].isInspection == "0"){
								// 删除json数据删除json数据

								delete this.form.mes[i].inspectionItems[j].alarm 
								delete this.form.mes[i].inspectionItems[j].lowerLimit 
								delete this.form.mes[i].inspectionItems[j].highLimit 
								delete this.form.mes[i].inspectionItems[j].reference 
								delete this.form.mes[i].inspectionItems[j].stringResult 
								delete this.form.mes[i].inspectionItems[j].dataType 
							}
						}
						
					}
					// nodeType 0命令 1脚本 2巡检指标
					if(this.form.mes[i].nodeType == 0){
						// 清空脚本
						this.form.mes[i].scriptAddress = ''
						this.form.mes[i].scriptAddressName = ''
					}else if(this.form.mes[i].nodeType == 1){
						// 清空命令
						this.form.mes[i].content = ''
					}else if(this.form.mes[i].nodeType == 2){
						// 清空脚本
						this.form.mes[i].scriptAddress = ''
						this.form.mes[i].scriptAddressName = ''
						// 清空命令
						this.form.mes[i].content = ''
					}
					this.form.mes[i].resourceGroup = this.form.mes[i].resourceGroupName.join(',')
				 } 
				 console.log(this.form.mes)
				 
				this.$refs[formName].validate((valid) => {
				if (valid) {
						var dateIndex = '';
						var dateIndexTwo = '';
						var frequencydata = '';
						if(this.form.way == 2) {
							dateIndex = this.form.selectDatetwo;
							if(dateIndex == '') {
								this.$message({
									type: 'warning',
									message: '请选择时间!'
								})		
								return false
							}
							var thisTime=dateIndex.replace(/-/g, '/');
							var time=(new Date(thisTime)).getTime();
							var timeNow=(new Date()).getTime();
							if(time<timeNow){
								this.$message({
									type: 'warning',
									message: '选择日期时间不能小于当前系统时间!'
								})		
								return false;
							}
							
						}
						if(this.form.way == 1) {
							console.log(this.form.selectDate)
							frequencydata = this.form.frequency + "" + this.form.region + "/次";
							if(this.form.selectDate.length == 0) {
								this.$message({
									type: 'warning',
									message: '请选择时间!'
								})		
								return false
							}
							dateIndex = this.form.selectDate[0];
							dateIndexTwo = this.form.selectDate[1];
							var thisTime1=dateIndex.replace(/-/g, '/');
							var thisTime2=dateIndexTwo.replace(/-/g, '/');
							var time1=(new Date(thisTime1)).getTime();
							var time2=(new Date(thisTime2)).getTime();
							var timeNow=(new Date()).getTime();
							if(time1<timeNow){
								this.$message({
									type: 'warning',
									message: '选择开始时间不能小于当前系统时间!'
								})		
								return false;
							}
							if(time2<timeNow){
								this.$message({
									type: 'warning',
									message: '选择结束时间不能小于当前系统时间!'
								})		
								return false;
							}
							if(time2<time1||time2==time1){
								this.$message({
									type: 'warning',
									message: '选择结束时间不能小于开始时间!'
								})		
								return false;
							}
						}
					
					const param = {
						task_level: this.form.taskRank,
						over_time: this.form.overTime+""+this.form.overTimeDate
					};
					const jsonStr = JSON.stringify(param);
					const params = {
						platformId: this.form.platformType,
						modelType:5,
						name:this.form.name,
						inspTaskNodes:this.form.mes,
						trigger: {
							startPlanTime: dateIndex,
							endPlanTime: dateIndexTwo,
							triggerType: this.form.way,
							executeRate: frequencydata
						},
						param: jsonStr
					}
					if(this.editBol) {
						params.id = this.editId
						params.createTime = this.createTime
						console.log('编辑:'+params)
						service.pollingEdit(params).then(res => {
							console.log(res)
							if(res.code == 200) {
								this.queryData();
								this.addUserDialog = false
								this.$message({
									message: res.msg,
									type: 'success'
								});
							}else {
								this.$message({
									message: res.msg,
									type: 'warning'
								});
							}
						})
					}else {
						if(this.fileUrl) params.scriptAddress = this.fileUrl
						console.log('新增:'+params)
						service.pollingAdd(params).then(res => {
							console.log(res)
							if(res.code == 200) {
								this.queryData();
								this.addUserDialog = false
								this.$message({
									message: res.msg,
									type: 'success'
								});
							}else {
								this.$message({
									message: res.msg,
									type: 'warning'
								});
							}
						})
					}
					
					
				} else {
					console.log('error submit!!');
					return false;
				}
				});
			},
			// 选择对象弹框
			addObject(indexs) {
				console.log(indexs)
				this.addObjectIndex = indexs;
				this.addObjectDialog = true;
			},
			//IP地址查询
			queryIP() {
				service.queryIP().then(res => {
					this.hostIPDate = res.result;
					console.log(this.hostIPDate)
				})
			},
			// 级联函数
			pollingChange(val) {
				console.log(val)
			},
			// 新增巡检项的取消
			pollingResetForm(formName) {
				this.addPollingDialog = false;
				this.PollingForm = {
					command:'',
					itemDesc:'',
					name:'',
					parentId:[],
				}
				this.$refs[formName].resetFields();
			},
			// 新增巡检项的保存
			pollingFormSave(formName) {
				console.log(this.PollingForm)
				// return
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const datas = this.PollingForm
						
						const params = datas
						console.log(datas)
						
						if(this.pollingAddEditBol) {
							params.id = this.pollingEditId;
							var str = datas.parentId[datas.parentId.length-1];
							params.parentId = str;
							service.treeEdit(params).then(res => {
								if(res.code == 200){
									console.log(res)
									this.treeQuery();
									this.addPollingDialog = false;
									this.$message({
										message: res.msg,
										type: 'success'
									});
								}else {
									this.$message({
										message: res.msg,
										type: 'warning'
									});
								}
								
							})
						}else {
							var str = datas.parentId[datas.parentId.length-1]
							params.parentId = str
							service.treeAdd(params).then(res => {
								if(res.code == 200){
									console.log(res)
									this.treeQuery();
									this.addPollingDialog = false;
									this.$message({
										message: res.msg,
										type: 'success'
									});
								}else {
									this.$message({
										message: res.msg,
										type: 'warning'
									});
								}
								
							})
						}
						
						
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//树形栏数据查询
			treeQuery() {
				service.treeQuery().then(res => {
					if(res.code == 200){
						this.treeData = res.result
						this.cascaderIndex = res.result
						this.pollingProject = res.result
						console.log(this.pollingProject)
					}else {
						 this.$message({
							message: res.msg,
							type: 'warning'
						});
					}
					
				})
			},
			// 新增弹出框点击关闭或阴影
			dialogClose(formName) {
				// this.resetForm();
				this.$refs[formName].resetFields();
				this.addUserDialog = false;
			},
			
			// 关闭弹框的毁掉
			closeMainDialog(formName) {
				this.$refs[formName].resetFields();
			},
			// 删除标签事件
			closeTag(tag,index) {
				this.form.mes[index].resourceGroupName.splice(this.form.mes[index].resourceGroupName.indexOf(tag), 1);
			},
			// 新增巡检指标弹框
			addPolling(){
				this.PollingForm = {};
				this.pollingAddEditBol = false;
				this.addPollingDialog = true;
			},
			// 新增弹框
			addDialogPolling(formName) {
				this.resetForm()
				this.addUserDialog = true
			},
			// 编辑弹框
			editDialogPolling(ids) {
				const params = {
					id: ids
				};
				service.pollingIndexEdit(params).then(res => {
					console.log(res)
					// 表单重置函数
					this.resetForm()
					this.editBol = true
					this.editId = ids
					this.createTime = res.result.createTime
					var overTime = eval('(' + res.result.param + ')').over_time
					console.log(overTime)
					overTime = overTime.substring(0, overTime.length - 1);  
					var overTimeDate = eval('(' + res.result.param + ')').over_time
					var strs=overTimeDate.split(""); //字符分割 
					for (var i=0;i<strs.length ;i++ ) {
						overTimeDate = strs[i]
					}
					this.addUserDialog = true;
					const datas = res.result;
					for(var j = 0 ;j<datas.taskNodes.length;j++){
						datas.taskNodes[j].resourceGroupName = []
						if(datas.taskNodes[j].scriptAddress !== null) {
							datas.taskNodes[j].scriptAddressName = datas.taskNodes[j].scriptAddress.substring(datas.taskNodes[j].scriptAddress.lastIndexOf('\\') + 14,datas.taskNodes[j].scriptAddress.length)
						}
					}
					
					this.form.mes = res.result.taskNodes;
					this.form.platformType = res.result.platformId;
					this.form.taskType = Number(res.result.modelType) ;
					this.taskName = res.result.name;
					this.form.name = res.result.name;
					this.form.taskRank = eval('(' + res.result.param + ')').task_level;
					this.form.overTime = overTime
					// this.form.overTimeDate = overTimeDate

					var str1 = res.result.trigger.executeRate.substring(res.result.trigger.executeRate.length-2,0)
					this.form.frequency =str1.substring(0,str1.length-1)
					this.form.region = str1.substring(str1.length-1,str1.length)

					this.form.way = res.result.trigger.triggerType
					if(res.result.trigger.triggerType == 1) {
						this.form.selectDate = []
						this.form.selectDate.push(res.result.trigger.startPlanTime) 
						this.form.selectDate.push(res.result.trigger.endPlanTime)
					}
					if(res.result.trigger.triggerType == 2) {
						this.form.selectDatetwo = res.result.trigger.startPlanTime;
					} 
					for(var i = 0 ; i < this.form.mes.length;i++) {
						this.form.mes[i].node = "当前为节点 " + Number(i+1)
						this.activeNames.push(i+1)
						this.form.mes[i].step = i+1
						this.form.mes[i].pollingId = []
						this.form.mes[i].polling = ''
						this.form.mes[i].resourceGroupName = this.form.mes[i].resourceGroup.split(',')
						console.log(this.form.mes[i].inspectionItems)
						if(this.form.mes[i].inspectionItems !== null){
							for(var j = 0 ; j < this.form.mes[i].inspectionItems.length;j++) {
								this.form.mes[i].polling += this.form.mes[i].inspectionItems[j].name  +','
								this.form.mes[i].pollingId.push(this.form.mes[i].inspectionItems[j].id)
								this.pollingName =  String(this.form.mes[i].inspectionItems[j].id)
								// this.form.mes[i].inspectionItems[j].dataType = 'string'
								this.form.mes[i].inspectionItems[j].alarm = '1'
							}
						}
					}
				})
				this.addUserDialog = true;
				
			},
			//新增弹出框取消
			addDialogFail(formName) {
				this.$refs[formName].resetFields();
				this.addUserDialog = false
			},
			// 首頁表單查询
			queryDataClick(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.queryData()
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			// 获取表格数据
			queryData() {
				
				this.tableLoading = true;
				// var ywData = this.formCascader.type;
				// console.log( this.formCascader.type.pop())
				// ywData = ywData.join(',');
				// console.log(ywData)
				var itemId = ''
				for(var i = 0 ; i < this.formCascader.type.length;i++) {
					
					itemId = this.formCascader.type[i]
				}
				console.log(itemId)
				
				const params = {
					itemId:itemId,
					name:this.formCascader.name,
					start: (this.currentPage - 1) * this.pageSize, 
					limit: this.pageSize
				};
				console.log(itemId)
				service.queryData(params).then(res => {
					this.tableData = res.result.list;
					console.log(this.tableData)
					for(var i = 0 ;i<this.tableData.length;i++) {
						var pollingName = '';
						var objectNumber = 0;
						var poName = '';
						for(var j = 0 ; j < this.tableData[i].taskNodes.length; j ++) {
							pollingName += this.tableData[i].taskNodes[j].name+','
							objectNumber = Number(objectNumber + this.tableData[i].taskNodes[j].resourceGroup.split(',').length)
							console.log(this.tableData[i].taskNodes[j].inspectionItems)
							if(this.tableData[i].taskNodes[j].inspectionItems != null){
								for(var k = 0 ; k < this.tableData[i].taskNodes[j].inspectionItems.length; k++){
									this.tableData[i].taskNodes[j].poName = ''
									this.tableData[i].taskNodes[j].poName = this.tableData[i].taskNodes[j].inspectionItems[k].name+','
								}
							}
							
						}
						this.tableData[i].pollingName = pollingName
						this.tableData[i].objectNumber = objectNumber
					}
					this.totalCount = res.result.count;
					this.tableLoading = false;
					console.log(this.formCascader.type)
				})
			},
			// 点击上传按钮事件
			btnUp(datas) {
				this.form.mes[datas].fileList = []
				this.upIndex = datas
			},
			// 巡检指标函数
			tabsPolling(tab, event) {
				console.log(tab, event);
			},
			// 警告框
			warningMessage(){
				this.$message({
					message: '选择命令、选择脚本、巡检指标，无法同时选择',
					type: 'warning'
				});
			},
			// 选择脚本事件
			scriptFn(indexs) {
				this.form.mes[indexs].polling = "";
				this.$refs.treePolling[indexs].setCheckedKeys([]);
				this.form.mes[indexs].nodeType = "1";
			},
			// 树形节点点击
			pitchState(indexs) {
				console.log(this.$refs.treePolling[indexs])
				this.form.mes[indexs].polling = "";
				this.form.mes[indexs].pollingId = [];
				const last = this.form.mes[indexs].inspectionItems;
				this.form.mes[indexs].inspectionItems = [];
				for(var i = 0;i<this.$refs.treePolling[indexs].getCheckedNodes(true).length;i++){
					this.form.mes[indexs].polling += this.$refs.treePolling[indexs].getCheckedNodes(true)[i].name  +','
					this.form.mes[indexs].pollingId.push(this.$refs.treePolling[indexs].getCheckedNodes(true)[i].id)
					this.pollingName = String(this.$refs.treePolling[indexs].getCheckedNodes(true)[i].id)
					const datas = {
						"id": this.$refs.treePolling[indexs].getCheckedNodes(true)[i].id,
						"name": this.$refs.treePolling[indexs].getCheckedNodes(true)[i].name,
						"itemDesc": this.$refs.treePolling[indexs].getCheckedNodes(true)[i].itemDesc,
						"command":this.$refs.treePolling[indexs].getCheckedNodes(true)[i].command,
						"alarm": "1",
						"lowerLimit": "",
						"highLimit": "",
						"reference": "",
						"stringResult": "",
						"dataType": "string",
						"isInspection":"0",
					}
					// 巡检指标数据
					this.form.mes[indexs].inspectionItems.push(datas)
				}
				for(var i = 0 ; i <this.form.mes[indexs].inspectionItems.length;i++) {
					for(var j = 0 ; j <last.length;j++){
						if(this.form.mes[indexs].inspectionItems[i].id == last[j].id) {
							this.form.mes[indexs].inspectionItems[i] = last[j]
						}
					}
				}
			},
			// 级联选择器选中状态
			cascaderIndexChange(val) {
				console.log(val)
				console.log(this.formCascader.type)
			},
			// 复制该节点
			copyNode(datas,indexs) {
				var obj = {};
				obj.id = datas.id;
				obj.inspectionItems = [];
				if(datas.inspectionItems!=null){
					for(var i = 0 ; i < datas.inspectionItems.length; i++) {
						const val = {
							"id": datas.inspectionItems[i].id,
							"name": datas.inspectionItems[i].name,
							"itemDesc": datas.inspectionItems[i].itemDesc,
							"command":datas.inspectionItems[i].command,
							"alarm": datas.inspectionItems[i].alarm,
							"lowerLimit": datas.inspectionItems[i].lowerLimit,
							"highLimit": datas.inspectionItems[i].highLimit,
							"reference": datas.inspectionItems[i].reference,
							"stringResult": datas.inspectionItems[i].stringResult,
							"dataType": datas.inspectionItems[i].dataType,
							"isInspection": datas.inspectionItems[i].isInspection,
						}
						obj.inspectionItems.push(val)
					}
				}
				
				obj.resourceGroupName= [];
				for(var i = 0 ; i < datas.resourceGroupName.length; i++) {
					obj.resourceGroupName.push(datas.resourceGroupName[i])
				}
				obj.step = datas.step;
                obj.name = datas.name;
                obj.region = datas.region;
                obj.types = datas.types;
                obj.target= datas.target;
                obj.node = datas.node;
                obj.content = datas.content;
				obj.scriptAddress = datas.scriptAddress;
				obj.scriptAddressName = datas.scriptAddressName;
				obj.polling = datas.polling
				obj.pollingId = datas.pollingId
				obj.fileList = datas.fileList;
				obj.nodeType = datas.nodeType;
				obj.user = datas.user;
				this.activeNames = [];
				// this.form.mes.push(obj);
				this.form.mes.splice(indexs+1,0,obj);
				this.activeNames = []
				for(var i = 0 ; i < this.form.mes.length ; i ++){
					this.form.mes[i].node = "当前为节点 " + Number(i+1)
					this.activeNames.push(Number(i+1))
					this.form.mes[i].step = Number(i+1)
					this.form.mes[i].id = Number(i+1)
				}
				
			},
			// 删除节点的函数
			delNode(indexs) {
				this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
					this.form.mes.splice(indexs, 1); 
					for(var i = 0 ; i < this.form.mes.length ; i ++){
						this.form.mes[i].node = "当前为节点 " + Number(i+1)
					}
					for(var i = 0 ; i < this.form.mes.length ; i ++){
						this.form.mes[i].step = i+1
					}
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
				
			},
			// 新增配置信息
			addMes() {
				var obj = {};
				obj.id = "";
				obj.inspectionItems = [];
				obj.resourceGroupName= [];
				obj.step = "";
                obj.name = "";
                obj.region = "";
                obj.types = "";
                obj.target= "";
                obj.node = "";
                obj.content = "";
				obj.scriptAddress = "";
				obj.scriptAddressName = "";
				obj.polling = "";
				obj.pollingId = [];
				obj.fileList = [];
				obj.nodeType = "0";
				obj.user = [];
				this.activeNames = [];
				this.form.mes.push(obj);
				// this.activeNames.push(this.form.mes.length)
				for(var i = 0 ; i < this.form.mes.length ; i ++){
					this.form.mes[i].node = "当前为节点 " + Number(i+1)
					this.activeNames.push(Number(i+1))
					this.form.mes[i].step = Number(i+1)
					this.form.mes[i].id = Number(i+1)
				}

			},
			// 折叠面板函数
			handleChange(val) {
				this.activeNames = val
			},
			// 上传失败触发
			onError(err, file, fileList) {
				console.log(err)
				console.log(file)
				console.log(fileList)
			},
			// 上传完成时触发的函数
			onSuccess(response, file, fileList){
				this.form.mes[this.upIndex].scriptAddress = response.result
				this.form.mes[this.upIndex].scriptAddressName = fileList[0].name
				console.log(this.form.mes[this.upIndex].scriptAddressName)
				this.form.mes[this.upIndex].nodeType = "1"
			},
			// 获取所有被选中的节点
			// 树形图被点击的回调
			handleCheckChange(datas, checked, indeterminate,indexs) {
				const data = this.form.mes[datas]
				data.types = ''
				data.target = ''
				const userS = data.user
				data.user = []

				for(var i = 0;i<this.$refs.tree[datas].getCheckedNodes().length;i++){

					data.user.push({'name':this.$refs.tree[datas].getCheckedNodes()[i].id})
					data.target += this.$refs.tree[datas].getCheckedNodes()[i].id  +','
					data.types += this.$refs.tree[datas].getCheckedNodes()[i].label +','
					this.typeName = this.$refs.tree[datas].getCheckedNodes()[i].label
				}
				
				data.types = data.types.substr(0, data.types.length - 1);  
				data.target = data.target.substr(0, data.target.length - 1);  

				

			},
			// ------------------------------------------------
			//删除巡检指标信息
			pollingDelete(id) {	
				 this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
					const params = {
					  id:id
					}
					service.pollingDeleteInfo(params).then(res => {
						this.$message({
							type: 'success',
							message: res.msg
						})
						if(res.code == 200) {
							this.treeQuery()
						}
						
					})
					}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
				// this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
				// 	confirmButtonText: '确定',
				// 	cancelButtonText: '取消',
				// 	type: 'error'
				// }).then(() => {
					
				// 	const params = {
				// 	  id:id
				// 	}
				// 	service.pollingDeleteInfo(params).then(res => {
				// 		this.$message({
				// 			type: 'success',
				// 			message: res.msg
				// 		})
				// 	})
				// }).catch(() => {
				// 	this.$message({
				// 		type: 'info',
				// 		message: '已取消删除'
				// 	})
				// })
			},

			addUser() {
				console.log("add");
			},
			delUser() {
				console.log("del");
			},
			//文件上传
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},


    
		},
		watch:{
			'form.way': function(newVal){
				// 1手动执行 2周期执行 3定时执行
				if(newVal == 0) {
					this.dateShow = false;
					this.frequencyShow = false;
				}else if (newVal == 1) {
					this.dateShow = true;
					this.disabledDate = true;
					this.frequencyShow = true;
				}else if (newVal == 2) {
					this.dateShow = true;
					this.disabledDate = false;
					this.frequencyShow = false;
				}
			},
		},
	};
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
	
	.confInfo {
		margin-top: 5px;
		border-top: 1px solid #ddd;
		width: 100%;
	}
	.mes {
		height: 32px;
	}
	.add-mes {
		float: right;
	}
	.confInfo-mes {
		height:500px;
		border: 1px solid #dcdfe6;
    	padding: 15px;
	}
	.execute {
		margin-top: 20px;
	}
	.polling-add {
		margin-left: 3px;
	}
	.pollingTabs {
		height: 50px;
	}
	.el-checkbox {
		color: #606266;
		font-weight: 500;
		font-size: 14px;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.detail_btn {
		color: rgba(66, 185, 131, 1);
		cursor:pointer;
		padding: 8px 11px;
	}
</style>
<style lang="scss">
.el-input.is-disabled .el-input__inner {
	cursor: pointer;
	background-color: white;
}
.el-popover {
	height: 300px;
	overflow: scroll;
}

</style>



