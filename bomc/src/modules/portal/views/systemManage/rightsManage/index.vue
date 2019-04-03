<template>
	<div class='container'>
		<div class="" style="width: 100%;height: auto;border: 1px solid transparent;">

			<div class="conRight" style="width:100%;height: auto;">
				<div class="RightRow1" style="">
					<el-row>
						<el-col>
							<el-card>

								<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
									<el-form-item label="权限域" value="权限域" prop="group.groupName">
										<el-input v-model="formInline.group.groupName" style="width: 210px;"></el-input>
									</el-form-item>

									<el-form-item label="权限名称" value="权限名称" prop="label">
										<el-input v-model="formInline.label" style="width: 210px;"></el-input>
									</el-form-item>

									<el-button class="search_btn" @click="roleSearch2(formInline)" style="margin-left:10px;">查询</el-button>
									<el-button class="opt_btn" @click="resetChongZhi('formInline')">重置</el-button>

									<i class="iconfont step_btn" v-bind:class="[isShowing ? blurClass : '',bkClass]" @click="arrowTest()">&#xe619;</i>
									<i class="iconfont step_btn" @click="arrowTest1()">&#xe615;</i>

									<div ref="schItemShow2" class="schItemShow" style="height: 100px;">
										<el-form-item label="权限状态" value="权限状态" prop="status">
											<el-select value="所有" v-model="formInline.status" placeholder="所有" style="height: 36px;width: 210px;">
												<el-option label="所有" value=""></el-option>
												<el-option label="正常" value="0"></el-option>
												<el-option label="禁用" value="1"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="url  " value="url" prop="menu.url">
											<el-input v-model="formInline.menu.url" style="width: 210px;"></el-input>
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

				<div class="RightRow1" style="">
					<el-row>
						<el-col>
							<el-card>
								<div class="buttonItem">

								</div>

								<el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
									<!--permission_type（0:菜单-操作，1：数据，2：页面元素，3：地域权限）-->
									<!--{{tableData6a[0]}}-->

									<el-tab-pane label="操作权限" name="first">
										<el-table :data="tableData6a.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%; margin-top: 20px" header-align="center">
											<el-table-column prop="permissionId" width="80" label="权限Id" value="权限Id">
											</el-table-column>
											<el-table-column prop="group.groupName" width="80" label="权限域" value="权限域">
											</el-table-column>

											<el-table-column prop="label" width="100" label="权限名" value="权限名">
											</el-table-column>

											<el-table-column prop="permissionKey" width="100" label="权限键" value="权限键">
											</el-table-column>

											<el-table-column prop="menu.url" min-width="170" label="url" value="url">
											</el-table-column>
											<el-table-column prop="createTime"  resizable sortable width="150" label='创建时间' value='创建时间'>
											</el-table-column>
											
											<el-table-column prop="remark" width="150" label='描述' value='描述'>
											</el-table-column>

											<el-table-column prop="status" label='状态' width="60">
												<template slot-scope="scope">
													<div v-if='scope.row.status==1'>
														<img :src="stopImg" alt="正常">

													</div>
													<div v-if='scope.row.status==0'>
														<img :src="runImg" alt="禁用">
													</div>
												</template>
											</el-table-column>

											<el-table-column label='操作管理' fixed="right" width="80">
												<template value="aa" slot-scope="scope">
													
													<i class="iconfont co" title="禁用" @click="handleDelete(scope.row.permissionId,1)">&#xe65a;</i>
													<i class="iconfont co" title="恢复" @click="beback(scope.row.permissionId)">&#xe65c;</i>
												</template>
											</el-table-column>

											<el-table-column label='信息编辑' fixed="right" width="190">
												<template value="aa" slot-scope="scope">
													<el-button class="form_btn" size="mini" @click="handleAddData(0)">新增</el-button>
													
													<el-button class="form_btn" size="mini" @click="handleEdit0(scope.row)">编辑</el-button>
												
													<el-button class="form_btn" size="mini" @click="handleDelete(scope.row.permissionId,2)">删除</el-button>

												</template>
											</el-table-column>

										</el-table>

									</el-tab-pane>

									<!--{{dataSchRig}}-->
									<el-tab-pane label="数据权限" name="second">
										
										<el-table :data="dataSchRig.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%; margin-top: 20px" header-align="center">
											
											<el-table-column prop="TypeId" label="部门Id" value="部门Id" width="140">
											</el-table-column>

											<el-table-column prop="name" label="数据名" value="数据名">
											</el-table-column>
											<el-table-column prop="alias" label="别名" value="别名">
											</el-table-column>
											<el-table-column prop="uri" label="uri" value="uri">
											</el-table-column>

											<el-table-column prop="TypeSubId" label='上级Id' value='上级Id' width="170">
											</el-table-column>
											
											<el-table-column prop="remark" width="150" label='描述' value='描述'>
											</el-table-column>

											<el-table-column prop="status" label='状态' width="60">
												<template slot-scope="scope">
													<div v-if='scope.row.status==1'>
														<img :src="stopImg" alt="正常">

													</div>
													<div v-if='scope.row.status==0'>
														<img :src="runImg" alt="禁用">
													</div>
												</template>
											</el-table-column>

											<el-table-column label='操作管理' fixed="right" width="80">
												<template value="aa" slot-scope="scope">
													<i class="iconfont co" title="禁用" @click="handleDelete(scope.row.permissionId,1)">&#xe65a;</i>
													<i class="iconfont co" title="恢复" @click="beback(scope.row.permissionId)">&#xe65c;</i>
												</template>
											</el-table-column>

											<el-table-column label='信息编辑' fixed="right" width="190">
												<template value="aa" slot-scope="scope">
													<el-button class="form_btn" size="mini" @click="handleAddData(2)">新增</el-button>
													<el-button class="form_btn" size="mini" @click="handleEdit0(scope.row)">编辑</el-button>
													<el-button class="form_btn" size="mini" @click="handleDelete(scope.row.permissionId,2)">删除</el-button>

												</template>
											</el-table-column>

										</el-table>

									</el-tab-pane>

									<!--{{tableData6d}}-->

									<el-tab-pane label="地域权限" name="third">
										<el-table :data="tableData6d.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%; margin-top: 20px" header-align="center">

											<el-table-column prop="area.areaId" width="80" label="权限Id" value="地域Id">
											</el-table-column>
											<el-table-column prop="group.groupName" width="80" label="权限域" value="权限域">
											</el-table-column>

											<el-table-column prop="area.areaName" label="地域名" value="地域名">
											</el-table-column>

											</el-table-column>
											<el-table-column prop="createTime" resizable sortable label='创建时间' value='创建时间' width="170">
											</el-table-column>
											
											<el-table-column prop="remark" width="150" label='描述' value='描述'>
											</el-table-column>

											<el-table-column prop="status" label='状态' width="60">
												<template slot-scope="scope">
													<div v-if='scope.row.status==1'>
														<img :src="stopImg" alt="正常">

													</div>
													<div v-if='scope.row.status==0'>
														<img :src="runImg" alt="禁用">
													</div>
												</template>
											</el-table-column>

											<el-table-column label='操作管理' fixed="right" width="80">
												<template value="aa" slot-scope="scope">
													<i class="iconfont co" title="禁用" @click="handleDelete(scope.row.permissionId,1)">&#xe65a;</i>
													<i class="iconfont co" title="恢复" @click="beback(scope.row.permissionId)">&#xe65c;</i>
												</template>
											</el-table-column>

											<el-table-column label='信息编辑' fixed="right" width="190">
												<template value="aa" slot-scope="scope">
													<el-button class="form_btn" size="mini" @click="handleAddData(3)">新增</el-button>
													<el-button class="form_btn" size="mini" @click="handleEdit0(scope.row)">编辑</el-button>
													<el-button class="form_btn" size="mini" @click="handleDelete(scope.row.permissionId,2)">删除</el-button>

												</template>
											</el-table-column>

										</el-table>

									</el-tab-pane>
								</el-tabs>

								<div class="block" align="right">

									<el-pagination :current-page="currentPage" v-show="this.activeName=='first'" :page-sizes="[100, 200, 300, 400]" :page-size="pagesize" :total="tableData6a.length" align="right" layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
									</el-pagination>

									<el-pagination :current-page="currentPage" v-show="this.activeName=='second'" :page-sizes="[100, 200, 300, 400]" :page-size="pagesize" :total="tableData6b.length" align="right" layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
									</el-pagination>

									<el-pagination :current-page="currentPage" v-show="this.activeName=='third'" :page-sizes="[100, 200, 300, 400]" :page-size="pagesize" :total="tableData6d.length" align="right" layout="prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
									</el-pagination>
								</div>
							</el-card>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<!--03-0-菜单--编辑-->
		<el-dialog title="编辑操作权限" :visible.sync="resetDialog220" :before-close="handleClose">
			<el-form :model="formEd0" style="margin:10px;width:auto;">

				<el-form-item label="权限域:" value="权限域:" :label-width="formLabelWidth">
					<el-select value="aa" v-model.trim="formEd0.group.groupName" placeholder="请选择权限域" size="small" style="width: 100%;height: 36px;">
						<el-option v-for="items in rigAreList" :key="items.groupName" :label="items.groupName" :value="items.groupName">{{items.groupName}}
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="权限名:" value="权限名:" :label-width="formLabelWidth">
					<el-input v-model.trim="formEd0.label" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限键:" value="权限键:" :label-width="formLabelWidth">
					<el-input v-model.trim="formEd0.permissionKey" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述:" value="描述:" :label-width="formLabelWidth">
					<el-input v-model.trim="formEd0.remark" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="editCommit0(formEd0)">提交</el-button>
				<!--<el-button @click="resetDialog220 = false">关闭</el-button>-->
				<el-button @click="close0()">关闭</el-button>
			</div>
		</el-dialog>
		<!--03-2--指令---编辑-->
		<el-dialog title="编辑指令权限" :visible.sync="resetDialog222" :before-close="handleClose">
			<el-form :model="formEd2" style="margin:10px;width:auto;">

				<el-form-item label="权限域:" value="权限域:" :label-width="formLabelWidth">
					<el-select value="aa" v-model.trim="formEd2.group.groupName" placeholder="请选择权限域" size="small" style="width: 100%;height: 36px;">
						<el-option v-for="items in rigAreList" :key="items.groupName" :label="items.groupName" :value="items.groupName">{{items.groupName}}
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="菜单名:" value="菜单名:" :label-width="formLabelWidth">
					<el-input v-model.trim="formEd2.menu.menuName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="url:" value="url:" :label-width="formLabelWidth">
					<el-input v-model.trim="formEd2.menu.url" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述:" value="描述:" :label-width="formLabelWidth">
					<el-input v-model.trim="formEd2.remark" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="editCommit2(formEd2)">提交</el-button>
				<!--<el-button @click="resetDialog222 = false">关闭</el-button>-->
				<el-button @click="close2()">关闭</el-button>
			</div>
		</el-dialog>

		<!--03--数据--编辑-->
		<el-dialog title="编辑数据权限" :visible.sync="resetDialog22" :before-close="handleClose">
			<el-form :model="formEd" style="margin:10px;width:auto;">

				<el-form-item label="权限域:" value="权限域:" :label-width="formLabelWidth">
					<el-select value="aa" v-model.trim="formEd.group.groupName" placeholder="请选择权限域" size="small" style="width: 100%;height: 36px;">
						<el-option v-for="items in rigAreList" :key="items.groupName" :label="items.groupName" :value="items.groupName">{{items.groupName}}
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="菜单名:" value="菜单名:" :label-width="formLabelWidth">
					<el-input v-model.trim="formEd.menu.menuName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="url:" value="url:" :label-width="formLabelWidth">
					<el-input v-model.trim="formEd.menu.url" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述:" value="描述:" :label-width="formLabelWidth">
					<el-input v-model.trim="formEd.remark" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="editCommit(formEd)">提交</el-button>
				<!--<el-button @click="resetDialog22 = false">关闭</el-button>-->
				<el-button @click="close()">关闭</el-button>
			</div>
		</el-dialog>

		<!--04-地域--编辑-->
		<el-dialog title="编辑地域权限" :visible.sync="resetDialog223" :before-close="handleClose">
			<el-form :model="formEd3" style="margin:10px;width:auto;">

				<el-form-item label="权限域:" value="权限域:" :label-width="formLabelWidth">
					<el-select value="aa" v-model.trim="formEd3.group.groupName" placeholder="请选择权限域" size="small" style="width: 100%;height: 36px;">
						<el-option v-for="items in rigAreList" :key="items.groupName" :label="items.groupName" :value="items.groupName">{{items.groupName}}
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="菜单名:" value="菜单名:" :label-width="formLabelWidth">
					<el-input v-model.trim="formEd3.menu.menuName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="url:" value="url:" :label-width="formLabelWidth">
					<el-input v-model.trim="formEd3.menu.url" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述:" value="描述:" :label-width="formLabelWidth">
					<el-input v-model.trim="formEd3.remark" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="editCommit3(formEd3)">提交</el-button>
				<!--<el-button @click="resetDialog223 = false">关闭</el-button>-->
				<el-button @click="close3()">关闭</el-button>
			</div>
		</el-dialog>

		<!--新增 03-->
		<el-dialog title="新增权限" :visible.sync="addUserMenu" :before-close="handleClose">
			<el-form :model="formAddData" :rules="rules" ref="formAddData" style="margin:10px;width:auto;">

				<el-form-item label="权限域:" value="权限域:" :label-width="formLabelWidth" prop="groupId" required>
					<el-select value="aa" v-model.trim="formAddData.groupId" @change="handleChangeGid(formAddData.groupId)" clearable placeholder="请选择权限域" size="small" style="width: 100%;height: 36px;">
						<el-option v-for="items in rigAreList" :key="items.groupId" :label="items.groupName" :value="items.groupId">{{items.groupName}}
						</el-option>
					</el-select>

				</el-form-item>

				<!--操作权限0      数据权限1       页面权限2     地域权限3-->
				<el-form-item label="权限类别:" value="权限类别:" v-if="a0" :label-width="formLabelWidth">
					<el-input placeholder="操作权限 " :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="权限类别:" value="权限类别:" v-if="a1" :label-width="formLabelWidth">
					<el-input placeholder="数据权限" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="权限类别:" value="权限类别:" v-if="a2" :label-width="formLabelWidth">
					<el-input placeholder="页面权限" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="权限类别:" value="权限类别:" v-if="a3" :label-width="formLabelWidth">
					<el-input placeholder="地域权限" :disabled="true"></el-input>
				</el-form-item>

				<!--0 menu 1 data 2 html-->

				<el-form-item label="菜单明细" v-if="a0" :label-width="formLabelWidth">
				</el-form-item>
				<el-form-item v-if="a0">

					<!--{{getDataList0[0]}}-->

					<el-table :data="getDataList0" stripe border height="350" ref="multipleTableRole" tooltip-effect="dark" style="width: 100%" @selection-change="postSelNum0" header-align="center">
						<el-table-column type="selection" width="35">
						</el-table-column>
						<el-table-column prop="menuId" label="菜单Id" value="菜单Id" width="70"> </el-table-column>
						<el-table-column prop="url" label="url" value="url" min-width="130"> </el-table-column>
						<el-table-column prop="param" label="菜单标识" value="菜单标识" width="120"> </el-table-column>
						<el-table-column prop="menuName" label="菜单名" value="菜单名" width="70"> </el-table-column>
						<el-table-column prop="remark" label="描述" value="描述" min-width="80"> </el-table-column>

					</el-table>

				</el-form-item>

				<el-form-item label="权限明细-数据:" value="权限明细-数据:" v-if="a1" :label-width="formLabelWidth">

					<el-table :data="getDataList" stripe border height="350" ref="multipleTableRole" tooltip-effect="dark" style="width: 100%" @selection-change="postSelNum" header-align="center">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="dataId" label="数据Id" value="数据Id" min-width="130"> </el-table-column>
						<el-table-column prop="dataName" label="数据名" value="数据名" min-width="130"> </el-table-column>

					</el-table>
				</el-form-item>

				<el-form-item label="权限明细 -页面:" value="权限明细 -页面:" v-if="a2" :label-width="formLabelWidth">

					<el-table :data="getDataList2" stripe border height="350" ref="multipleTableRole" tooltip-effect="dark" style="width: 100%" @selection-change="postSelNum2" header-align="center">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="htmlId" label="页面Id" value="页面Id" min-width="130"> </el-table-column>
						<el-table-column prop="htmlName" label="页面名" value="页面名" min-width="130"> </el-table-column>

					</el-table>

				</el-form-item>

				<el-form-item label="权限明细-地域:" value="权限明细-地域:" v-if="a3" :label-width="formLabelWidth">

					<el-table :data="getDataList3" stripe border height="350" ref="multipleTableRole" tooltip-effect="dark" style="width: 100%" @selection-change="postSelNum3" header-align="center">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column prop="areaId" label="地域Id" value="地域Id" min-width="130"> </el-table-column>
						<el-table-column prop="areaName" label="地域名" value="地域名" min-width="130"> </el-table-column>

					</el-table>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addCommitData('formAddData',formAddData)">提交</el-button>
				<el-button @click="addUserMenu = false">关闭</el-button>

			</div>
		</el-dialog>
	</div>
</template>

<script>
	import runImg from '@/assets/images/run.png'
	import stopImg from '@/assets/images/stop.png'
	import store from '@/store';
	import { TreeGrid } from "../../../../../components/treeTableRight";
	import { roleSch, rightDele, checkUname, dataSch, rightList, rightListHv, recover, rightAreaList, roleSchData, adCmitData, roleSchData2, roleSchData3, roleSchData0, editCmit, } from "../../../api/rightsManage";

	export default {
		data() {
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
				
				
				isShowing: false,
				bkClass: 'bk',
				blurClass: 'blur',
				runImg: runImg,
				stopImg: stopImg,
				eventInGroupList: [],

				startDatePicker: this.beginDate(),
				endDatePicker: this.processDate(),
				pagesize: 4,
				currentPage: 1,
				postTemp: "",
				rules: {
					groupId: [
						{ required: true, message: '请选择权限域', trigger: 'blur' },
					],

				},
				a0: false,
				a1: true,
				a2: false,
				a3: false,
				formInline: {
					label: "",
					status: "",

					params: {
						beginTime: "",
						endTime: ""
					},
					group: {
						groupName: ""
					},
					menu: {
						menuName: "",
						remark:"",
						url: ""
					}
				},

				tableData6all: [],
				tableData6a: [],
				tableData6b: [],
				tableData6c: [],
				tableData6d: [],
				dataSource: [],

				optionsRus: [],

				value1: true,
				dialogVisible01: false,
				dialogVisible02: false,

				rigAreList: [],
				//				getDataList0: [{menuId :"", label :"",  remark :"",}],
				getDataList0: [],
				getDataList: [],
				getDataList2: [],
				getDataList3: [],

				rigTypeList: [{ id: 0, name: "菜单权限" },
					{ id: 1, name: "数据权限" },
					{ id: 2, name: "页面权限" },
					{ id: 3, name: "地域权限" }
				],

				resetDialog22: false,
				resetDialog220: false,
				resetDialog222: false,
				resetDialog223: false,

				formEd0: {
					label: "",
					permissionKey: "",
					remark: "",
					group: {
						groupName: "",
					},
					menu: {
						name: "",
						url: "",
						remark: ""
					}
				},
				formEd: {
					group: {
						groupName: "",
					},
					menu: {
						name: "",
						url: "",
						remark: ""
					}
				},

				formEd2: {
					group: {
						groupName: "",
					},
					menu: {
						name: "",
						url: "",
						remark: ""
					}
				},
				formEd3: {
					group: {
						groupName: "",
					},
					menu: {
						name: "",
						url: "",
						remark: ""
					}
				},
				ggid: "",
				tyIdNed: "",
				activeName: 'first',

				addUserMenu: false,
				addUserMenu0: false,
				addUserMenu2: false,

				formAddData: {
					groupId: "",
					permissionType: "",
					permissionDetail: "",
					label: "",
					remark: "",

					//					groupName 权限域    permissionType 权限类别  permissionDetail 权限明细
					//					permissionName权限名称   permissionKey权限标识					
				},
				dataSchRig: [],
				mulSelPost: [],
				mulSelPost2: [],
				formLabelWidth: "120px",

			};
		},
		computed: {
			data2() {
				return this.$store.state.resourceManagement.treeData;
				console.log("right11----");
				console.log(data2);
			}

		},

		created() {
			this.roleSearch(this.formInline);
			rightAreaList().then((response) => {
				this.rigAreList = response;
			});

			dataSch().then((response) => {
				this.dataSchRig = response;
			});

			if(!this.$store.state.resourceManagement.on_treeData) {
				this.$store.dispatch('treeData').then(() => {
					console.log("right11----");
					console.log(this.$store.state.resourceManagement.treeData);
				})
			}

		},

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
				if(this.multipleSelection == undefined || this.multipleSelection.length == 0) {
					import('@/modules/mms/vendor/Export2Excel').then(excel => {
						const tHeader = [
						              
							'地域ID', '地域名字', '创建时间', '描述', 
						]
						const filterVal = [       
							'areaId', 'areaName', 'createTime', 'remark', 
						]					
						const list = this.tableData								
						const data = this.formatJsonAll(filterVal, list)
						excel.export_json_to_excel({
							header: tHeader,
							data,
							filename: '权限管理导出',
							autoWidth: true
						});
					})
				} else {
					import('@/modules/mms/vendor/Export2Excel').then(excel => {
						const tHeader = [
							'地域ID', '地域名字', '创建时间', '描述', 
						]
						const filterVal = [
							'areaId', 'areaName', 'createTime', 'remark', 
						]
                    //将部门对象中的 部门名称提取出来显示,否则部门是个对象无法显示
							for(var i=0;i<this.multipleSelection.length;i++){
							this.tableDataDload2[i]=this.multipleSelection[i]
						
						}
						const list = this.tableDataDload2							
						const data = this.formatJson(filterVal, list)
						excel.export_json_to_excel({
							header: tHeader,
							data,
							filename: '选中的权限管理导出'
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


// 这是点击编辑后没有提交,点击关闭,会造成缓存显示在表格上,重新查询一次,达到去除缓存的目的
close(){
	this.resetDialog22 = false;
	this.roleSearch(this.formInline);
},
close0(){
	this.resetDialog220 = false;
	this.roleSearch(this.formInline);
},
close2(){
	this.resetDialog222 = false;
	this.roleSearch(this.formInline);
},
close3(){
	this.resetDialog223 = false;
	this.roleSearch(this.formInline);
},



			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},

			handleClick(tab, event) {
				console.log(tab, event);
				//      alert("01");
				//       alert(tab);
				//      alert("02");
				//      alert(this.activeName);

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
			// 分页
			handleSizeChange(val) {
				this.pagesize = val
				console.log(`每页 ${val} 条`)
			},
			handleCurrentChange(val) {
				this.currentPage = val
			},
			//			新增菜单的准备工作,点击权限域 和权限类别后将权限域id传给后端,得到权限明细的列表
			//			现在是获取权限明细中 选中的id
			//1 点击后选中的dataId数量
			postSelNum(val) {
				this.mulSelPost = val;
				var temp = [];
				for(var i = 0; i < this.mulSelPost.length; i++) {
					if(temp.indexOf(this.mulSelPost[i].dataId) == -1) {
						temp.push(this.mulSelPost[i].dataId);
					}
				}
				this.formAddData.permissionDetailList = temp.sort();
			},
			// 0点击后选中的menuId数量
			postSelNum0(val) {
				this.mulSelPost = val;
				this.mulSelPost2 = val;
				var temp = [];
				for(var i = 0; i < this.mulSelPost.length; i++) {
					if(temp.indexOf(this.mulSelPost[i].menuId) == -1) {
						temp.push(this.mulSelPost[i].menuId);

					}
				}
				this.formAddData.permissionDetailList = temp.sort();
			},

			// 2点击后选中的htmlId数量
			postSelNum2(val) {
				this.mulSelPost = val;
				var temp = [];
				for(var i = 0; i < this.mulSelPost.length; i++) {
					if(temp.indexOf(this.mulSelPost[i].htmlId) == -1) {
						temp.push(this.mulSelPost[i].htmlId);
					}
				}
				this.formAddData.permissionDetailList = temp.sort();
			},
			// 3点击后选中的areaId数量
			postSelNum3(val) {
				this.mulSelPost = val;
				var temp = [];
				for(var i = 0; i < this.mulSelPost.length; i++) {
					if(temp.indexOf(this.mulSelPost[i].areaId) == -1) {
						temp.push(this.mulSelPost[i].areaId);
					}
				}
				this.formAddData.permissionDetailList = temp.sort();
			},

			//-----编辑0--菜单
			handleEdit0(row) {
				this.resetDialog220 = true;
				this.formEd0.group.groupName = row.group.groupName;
				this.formEd0 = row;
			},
			//03编辑弹窗的提交按钮
			editCommit0(formEd0) {
			
		
				var row0 = formEd0;
				console.log(formEd0);
				this.resetDialog220 = false;
				//获取角色信息
//				editCmit(formEd0).then((response) => {
//					this.roleSearch(this.formInline);
//					this.$message({
//						type: 'success',
//						message: '编辑成功！'
//					});
//				})
				editCmit(row0).then((response) => {
					this.roleSearch(this.formInline);
					this.$message({
						type: 'success',
						message: '编辑成功！'
					});
				})
			},
			//-----编辑02指令----
			handleEdit2(row) {
				this.resetDialog222 = true;
				this.formEd2.group.groupName = row.group.groupName;
				this.formEd2 = row;
			},
			//02编辑弹窗的提交按钮
			editCommit2(formEd2) {
				this.resetDialog222 = false;
				//获取角色信息
				editCmit(formEd2).then((response) => {
					this.roleSearch(this.formInline);
					this.$message({
						type: 'success',
						message: '编辑成功！'
					});
				})
			},
			//--编辑03地域---
			handleEdit3(row) {
				this.resetDialog223 = true;
				this.formEd3.group.groupName = row.group.groupName;
				this.formEd3 = row;
			},
			//03编辑弹窗的提交按钮
			editCommit3(formEd3) {
				this.resetDialog223 = false;
				//获取角色信息
				editCmit(formEd3).then((response) => {
					this.roleSearch(this.formInline);
					this.$message({
						type: 'success',
						message: '编辑成功！'
					});
				})
			},

			//-------编辑-数据-----没有尾数的
			handleEdit(row) {
				this.resetDialog22 = true;
				this.formEd.group.groupName = row.group.groupName;
				this.formEd = row;
			},
			//03编辑弹窗的提交按钮
			editCommit(formEd) {
				this.resetDialog22 = false;
				//获取角色信息
				editCmit(formEd).then((response) => {
					this.roleSearch(this.formInline);
					this.$message({
						type: 'success',
						message: '编辑成功！'
					});
				})
			},

			//-----------新增按钮03Data
			handleAddData(tyId) {

				this.tyIdNed = tyId;
				this.addUserMenu = true;
				roleSchData().then((response) => {
					this.getDataList = response;

				})
			},

			resetChongZhi(formName) {
				this.$refs[formName].resetFields();
			},
			handleChangeGid(gid) {
				this.ggid = gid;

				var perType = this.tyIdNed;
				var pgid = this.formAddData.groupId;
				if(perType == 0) {
					this.a0 = true;
					this.formAddData.permissionType = 0;
					this.a1 = false;
					this.a2 = false;
					this.a3 = false;
					//						取得权限域的id:
					roleSchData0(pgid).then((response) => {
						this.getDataList0 = response;

					})
				} else if(perType == 1) {
					this.a0 = false;
					this.a1 = true;
					this.formAddData.permissionType = 1;
					this.a2 = false;
					this.a3 = false;
					roleSchData().then((response) => {
						this.getDataList = response;

					})
				} else if(perType == 2) {
					this.a0 = false;
					this.a1 = false;
					this.a2 = true;
					this.formAddData.permissionType = 2;
					this.a3 = false;
					roleSchData2().then((response) => {
						this.getDataList2 = response;

					})
				} else if(perType == 3) {
					this.a0 = false;
					this.a1 = false;
					this.a2 = false;
					this.a3 = true;
					this.formAddData.permissionType = 3;
					roleSchData3().then((response) => {
						this.getDataList3 = response;

					})
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
			//新增03弹窗的提交按钮
			addCommitData(formAddData01, formAddData) {

				console.log("新增权限中选中的对象------");
				console.log(this.mulSelPost2);

				var temp = this.mulSelPost2;
				var fGId = formAddData.groupId;
				if(fGId == "" || temp == "") {
					this.$message({
						type: 'warning',
						message: '权限域或表单没有勾选，请检查！'
					});
					return false;
				}

				for(var i = 0; i < temp.length; i++) {
					temp[i].groupId = formAddData.groupId;
					temp[i].permissionType = formAddData.permissionType;

					temp[i].permissionDetail = temp[i].menuId;
					temp[i].label = temp[i].menuName;
					temp[i].permissionKey = temp[i].param;

				}

				console.log("重组后的权限对象---temp---");
				console.log(temp);

				this.addUserMenu = false;

				adCmitData(temp).then((response) => {
					this.$refs[formAddData01].resetFields();
					this.$refs.multipleTableRole.clearSelection();

					this.$message({
						type: 'success',
						message: '新增成功啦！'
					});
					//    如果添加成功就 再执行一次查询	
					this.roleSearch();
					//这里是清空新增的输入框，无论后端是否返回response都执行一次清空，这里加判断是防止清空操作 先执行

					if(response.length == 0) {
						//						 alert("04--rus");	
						//这里是清空新增的输入框，无论后端是否返回response都执行一次清空，这里加判断是防止清空操作 先执行
						this.$refs[formAddData01].resetFields();
						this.$refs.multipleTableRole.clearSelection();
					} else {
						this.$refs[formAddData01].resetFields();
						this.$refs.multipleTableRole.clearSelection();

					}

				})
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
				this.tableData6a = [];
				this.tableData6b = [];
				this.tableData6c = [];
				this.tableData6d = [];

				roleSch(formInline).then((response) => {
					this.tableData6all = response;
					//		根据权限分组展示	<!--permission_type（0:菜单，1：数据，2：页面元素，3：地域权限）-->

					for(var i = 0; i < this.tableData6all.length; i++) {
						if(this.tableData6all[i].permissionType == 0) {
							this.tableData6a.push(this.tableData6all[i]);
						} else if(this.tableData6all[i].permissionType == 1) {
							this.tableData6b.push(this.tableData6all[i]);
						} else if(this.tableData6all[i].permissionType == 2) {
							this.tableData6c.push(this.tableData6all[i]);
						} else if(this.tableData6all[i].permissionType == 3) {
							this.tableData6d.push(this.tableData6all[i]);
						}
					}

				})
			},
			//02查询按钮------------------------
			roleSearch2(formInline) {
				if(formInline.params.beginTime == null) {
					this.formInline.params.beginTime = "";
				}
				if(formInline.params.endTime == null) {
					this.formInline.params.endTime = "";
				}
				//防止用户点击第五页的时候，查询第一页的数据，初始化当前页为第一页
				//				this.currentPage = 1;
				this.tableData6a = [];
				this.tableData6b = [];
				this.tableData6c = [];
				this.tableData6d = [];
				

				roleSch(formInline).then((response) => {
					this.tableData6all = response;
					//		根据权限分组展示	<!--permission_type（0:菜单，1：数据，2：页面元素，3：地域权限）-->
					//				这里加加验证返回数据的长度 ,
					if(this.tableData6all.length !== 0) {
					this.currentPage = 1;
						for(var i = 0; i < this.tableData6all.length; i++) {
							if(this.tableData6all[i].permissionType == 0) {
								this.tableData6a.push(this.tableData6all[i]);
								//							alert("01");
							} else if(this.tableData6all[i].permissionType == 1) {
								this.tableData6b.push(this.tableData6all[i]);
							} else if(this.tableData6all[i].permissionType == 2) {
								this.tableData6c.push(this.tableData6all[i]);
							} else if(this.tableData6all[i].permissionType == 3) {
								this.tableData6d.push(this.tableData6all[i]);
							}
						}
						
					}

				})
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

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消' + ddText
					})
				})
			},

		},
		components: {
			TreeGrid
		}
	};
</script>

<style scoped lang="scss">
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
		.RightRow1 {
			width: calc(100% - 40px);
			height: auto;
			margin: 20px;
			border-radius: 5px;
		}
	}
</style>