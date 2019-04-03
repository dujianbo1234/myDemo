<template>
    <div>
        <div class="cont">
			<div class="RightRow">
				<el-card>
					<el-form :inline="true" label-position="right" label-width="70px" size="small" :model="formCascader" :rules="formCascaderRules" ref="formCascader">
						<el-form-item label="操作类型" prop="operationTypes">
							<el-select v-model="formCascader.operationTypes" clearable placeholder="请选择操作类型">
                                <el-option label="新增" value="1"></el-option>
                                <el-option label="修改" value="2"></el-option>
                                <el-option label="删除" value="3"></el-option>
                            </el-select>
						</el-form-item>
                        <el-form-item prop="operateUserName" label="操作人">
                            <el-input type="text" v-model="formCascader.operateUserName" placeholder="请输入操作人" style="width:200px;"></el-input>
                        </el-form-item>
							<el-button size="small" class="search_btn" @click="queryDataClick('formCascader')" style="margin-left:10px;">查询</el-button>
							<el-button size="small" class="opt_btn" @click.stop="queryDataRest('formCascader')">重置</el-button>
							<i class="iconfont step_btn" v-bind:class="[isShowing ? blurClass : '',bkClass]" @click="arrowTest()">&#xe619;</i>
							<el-popover
								placement="top-end"
								title=""
								width="250"
								trigger="click">
								<el-checkbox-group v-model="checkList">
									<el-checkbox label="复选框 A"></el-checkbox>
									<el-checkbox label="复选框 B"></el-checkbox>
									<el-checkbox label="复选框 C"></el-checkbox>
									<el-checkbox label="复选框 A"></el-checkbox>
									<el-checkbox label="复选框 B"></el-checkbox>
									<el-checkbox label="复选框 C"></el-checkbox>
									<el-checkbox label="复选框 A"></el-checkbox>
									<el-checkbox label="复选框 B"></el-checkbox>
									<el-checkbox label="复选框 C"></el-checkbox>
								</el-checkbox-group>
								<i class="iconfont step_btn" slot="reference">&#xe615;</i>
							</el-popover>
							<div ref="schItemShow2" class="schItemShow">
                                <el-form-item label="日期时间" prop="time">
                                    <el-date-picker
                                    v-model="formCascader.time"
                                    type="datetimerange"
                                    range-separator="至"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
							</div>
					</el-form>
				</el-card>
			</div>
      		<div class="RightRow">
        		<el-card>
					<div class="buttonItem">
						<el-button size="small" plain class="opt_btn" @click="exportLogo()">导出</el-button>
					</div>
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" :header-cell-style="headStyle">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column show-overflow-tooltip prop="operationType" label="操作类型" min-width="100" :formatter="formatOperationType"></el-table-column>
                        <el-table-column show-overflow-tooltip prop="modifyTermName" label="操作项名称" min-width="100"></el-table-column>
                        <el-table-column show-overflow-tooltip prop="beforeModify" label="操作前" min-width="100"></el-table-column>
                        <el-table-column show-overflow-tooltip prop="afterModify" label="操作后" min-width="100"></el-table-column>
                        <el-table-column show-overflow-tooltip prop="operateReason" label="操作原因" min-width="100"></el-table-column>
                        <el-table-column show-overflow-tooltip prop="updateTime" label="操作时间" min-width="100"></el-table-column>
                        <el-table-column show-overflow-tooltip prop="operateUserName" label="操作人" min-width="100"></el-table-column>
					</el-table>
					<div class="block" align="right">
						<el-pagination align="right" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="[10,20,50]" layout="total,sizes,prev, pager, next, jumper" :total="totalCount" :pager-count="5">
						</el-pagination>
					</div>
        		</el-card>
      		</div>
    	</div>
    </div>
</template>

<script>
import * as service from '@/modules/ops/api/ops/autoInspection/insJournalManage.js'
import * as rule from '@/modules/ops/api/rules.js'
export default {
    data (){
        return{
             // 控制表格加载
            tableLoading:false,
            pageSize: 10, // 每页多少条
            totalSize: 1000, // 总条数	
            currentPage: 1, // 当前页
            totalCount: 1, // 总条数
            // 首页搜索的表单数据
             formCascader: {
                name:'',
                way:'',
                time:null,
                operationTypes:'',
                operateUserName:'',
            },
            // 首页搜索的验证规则
            formCascaderRules: {
                operateUserName:[ 
                    { validator: rule.validateQueryName, trigger: 'blur' },
                ],
            },
            tableData:[],
            headStyle: {
                'background-color': '#F4F8F9',
                'color': 'rgba(0,0,0,0.60)',
            },
            // 图标样式
            isShowing: false,
            bkClass: 'bk',
            blurClass: 'blur',
            checkList:[],
            
            
        }
    },
    mounted() {
        this.queryData()
    },
    methods: {
        formatOperationType(row, column) {
            var data = ''
            var array = ['新增','修改','删除']
            data = array[row.operationType-1]
            return data
        },
        //点击鼠标显示
        arrowTest() {
            this.isShowing = !this.isShowing;

            if(this.$refs.schItemShow2.style.display == 'block') {
                this.$refs.schItemShow2.style.display = 'none';
            } else {
                this.$refs.schItemShow2.style.display = 'block';
            }
        },
        // 表单重置
        queryDataRest(formName) {
            this.$refs[formName].resetFields();
        },
        // 首頁表單驗證
        queryDataClick(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.queryData()
                } else {
                    return false;
                }
            });
        },
        // 表格左边选择事件
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        //导出文件
        exportLogo() {
            var ids = [];
        
            if(this.multipleSelection == undefined || this.multipleSelection.length == 0 ){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                import('@/modules/mms/vendor/Export2Excel').then(excel => {
                    const tHeader = [
                        '操作类型',
                        '操作项名称',
                        '操作前',
                        '操作后',
                        '操作原因',
                        '操作时间',
                        '操作人',
                    ]
                    const filterVal = [
                        'operationType',
                        'modifyTermName',
                        'beforeModify',
                        'afterModify',
                        'operateReason',
                        'updateTime',
                        'operateUserName',
                    ]
                    const list = this.tableData
                    const data = this.formatJsonAll(filterVal, list)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: '巡检日志',
                        autoWidth: true
                    });
                })
            }else {
                import('@/modules/mms/vendor/Export2Excel').then(excel => {
                    const tHeader = [
                        '操作类型',
                        '操作项名称',
                        '操作前',
                        '操作后',
                        '操作原因',
                        '操作时间',
                        '操作人',
                    ]
                    const filterVal = [
                        'operationType',
                        'modifyTermName',
                        'beforeModify',
                        'afterModify',
                        'operateReason',
                        'updateTime',
                        'operateUserName',
                    ]
                    const list = this.multipleSelection
                    const data = this.formatJson(filterVal, list)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: '巡检日志'
                    })
                    this.$refs.currentAlertTable.clearSelection()
                })
            }
            
            
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        formatJsonAll(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === 'timestamp') {
                        // return parseTime(v[j]);
                    } else {
                        return v[j]
                    }
                })
            )
        },
        //查询列表
        queryData() {
            this.tableLoading = true;
            const params = {
                module: 5,
                operationType: this.formCascader.operationTypes,
                name:this.formCascader.operateUserName,
                // operateUserName: this.formCascader.operateUserName,
                start: (this.currentPage - 1) * this.pageSize,
                limit: this.pageSize
            }
            if(this.formCascader.time !== null) {
                params.queryStartTime = this.formCascader.time[0]
                params.queryEndTime = this.formCascader.time[1]
            }
            if(this.formCascader.name !== "") {
                params.name = this.formCascader.name
            }
            service.queryData(params).then(res => {
                if(res.code == 200) {
                    this.tableData = res.result.list;
                    this.totalCount=res.result.count;
                    // this.tableData.forEach((item, index) => {
                    //     if(item.operationType == '1') {
                    //         item.operationType = '新增'
                    //     } else if(item.operationType == '2') {
                    //         item.operationType = '修改'
                    //     } else if(item.operationType = '3') {
                    //         item.operationType = '删除'
                    //     }
                    // });
                    this.tableLoading = false;
                }
                
            })

        },
			
        handleSizeChange(val) { // 设置每页多少条
            this.pageSize = val
            this.queryData()
        },
        handleCurrentChange(val) { // 当前页
            this.currentPage = val
            this.queryData()
        },
    },
    
}
</script>

<style scoped lang="scss">
    @import "./index.scss";
</style>