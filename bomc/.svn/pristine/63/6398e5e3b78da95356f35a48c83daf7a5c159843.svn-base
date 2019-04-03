<template>
  <div style="background-color:white" class="a">
    <el-row :gutter="20" class="block">
      <el-col :span="12" :push="3">
        <!-- <el-button @click="handleClick">接口联调指标规则</el-button> -->
        <label for="indicatorType" style="width:50%"/>
        <el-input 
id="indicatorType" 
v-model="search.name" size="medium" style="width:50%" placeholder="请输入指标计算规则名称"
                  @keyup.enter.native="queryMetricsRul(search)"/>
        <!--   <el-col :span="7" :pull="3" >
         <label for="indicatorType" style="width:50%"></label>
         <el-input id="indicatorType" v-model="search.code" size="medium" style="width:50%" placeholder="请输入指标计算规则编码" />
         </el-col> -->
        <el-button type="primary" style="margin:0 0 0 10px" @click="queryMetricsRul(search)">搜索</el-button>
        <el-button type="primary" style="margin:0 0 0 10px" @click="reset">重置</el-button>
      </el-col>
    </el-row>

    <el-row class="btnInfo">
      <el-col :push="3">
        <el-button type="primary" style="margin-bottom:15px" @click="showDialog">新增规则</el-button>
        <el-button :disabled="multipleSelectionIds===''" type="danger" @click="deleteMetricsRule(multipleSelectionIds, '')">批量删除</el-button>
      </el-col>
    </el-row>

    <el-row class="block">
      <el-col :span="18" :push="3" >
        <el-table 
ref="multipleTable" 
:data="metricsRuleData" border tooltip-effect="dark" style="width: 100%"
                  @selection-change="handleSelectionChange" 
@row-click="openDialog">
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="name" label="规则名" />
          <!-- <el-table-column prop="code" label="规则编码" width="120"/> -->
          <el-table-column prop="description" label="规则描述"/>
          <el-table-column prop="founder" label="创建人" />
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | dateFilter }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="showUpdateDialog(scope.row,dialogVisibleUpdate)">修改</el-button>
              <!--(metricsRuleData[scope.$index]['ruleId'])-->
              <el-button type="text" size="small" @click="deleteMetricsRule(scope.row.ruleId,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="totalCount3>0" class="pagination">
          <el-pagination
            :current-page.sync="currentPage3"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            :total="totalCount3"
            align="right"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible" 
:close-on-click-modal='false' title="新增规则" @close="closeDialog">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="计算规则名: " prop="name">&nbsp; &nbsp;
          <el-input v-model="form.name" style="width:400px;" autocomplete="off" required placeholder="请输入名称（仅支持英文）" @keyup.native="form.name=form.name.replace(/[^\w\.\/]/ig,'')" />
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="计算规则别名:" prop="alias">
          <el-input v-model="form.alias" style="width:400px;" autocomplete="off" required placeholder="请输入别名" />
          <!--  <el-input v-model="form.alias" autocomplete="off" required placeholder="请输入别名" @keyup.native="form.alias=form.alias.replace(/[^\u4E00-\u9FA5]/g,'')"/> -->
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="规则描述:" prop="description">
          <el-input 
v-model="form.description"
                    style="width:600px;"
                    :autosize="{ minRows: 2, maxRows: 5}" 
      autocomplete="off"
                    required
                    type="textarea"
                    placeholder="请输入规则描述" />
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="规则脚本:" prop="scriptTemplet">
          <el-input
            v-model="form.scriptTemplet"
            :autosize="{ minRows: 5, maxRows: 18}"
            style="width:600px;"
            autocomplete="off"
            required
            type="textarea"
            placeholder="请输入规则脚本" />
        </el-form-item>

        <el-form-item
          v-for="(domain, index) in form.domains"
           style="width:100%;"
          :label="'规则参数' + index"
          :key="domain.key"
          :rules="{
            required: true, message: '规则参数不能为空', trigger: 'blur'
        }">

          <br>
          <el-row :gutter="2">
            <el-col :span="2"><span>name:</span></el-col>
            <el-col :span="6"><el-input v-model="domain.value1" label="name" style="width:200px;" /></el-col>
            <el-col :span="2" style="margin-left:40px" ><span>type:</span></el-col>
            <el-col :span="6"><el-input v-model="domain.value2" label="type" style="width:200px;"/></el-col>
            <el-col :span="6" style="margin-left:20px">
              <el-button @click.prevent="removeDomain(domain)">删除</el-button>
              <el-button @click="resetForm1(index)">重置</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain">新增规则参数</el-button>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="creatMetricsRule(form)">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVisibleUpdate"
      title="修改规则"
      @close='dialogVisibleUpdate=false'
      :close-on-click-modal="false"
      width="60%">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="计算规则名: " prop="name">&nbsp; &nbsp;
          <el-input v-model="form.name" style="width:400px;" autocomplete="off" required placeholder="请输入名称（仅支持英文）" @keyup.native="form.name=form.name.replace(/[^\w\.\/]/ig,'')" />
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="计算规则别名:" prop="alias">
          <el-input v-model="form.alias" style="width:400px;" autocomplete="off" required placeholder="请输入别名" />
          <!--  <el-input v-model="form.alias" autocomplete="off" required placeholder="请输入别名" @keyup.native="form.alias=form.alias.replace(/[^\u4E00-\u9FA5]/g,'')"/> -->
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="规则描述:" prop="description">
          <el-input 
v-model="form.description"
                    style="width:600px;"
                    :autosize="{ minRows: 2, maxRows: 5}" 
      autocomplete="off"
                    required
                    type="textarea"
                    placeholder="请输入规则描述" />
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="规则脚本:" prop="scriptTemplet">
          <el-input
            v-model="form.scriptTemplet"
            :autosize="{ minRows: 5, maxRows: 18}"
            style="width:600px;"
            autocomplete="off"
            required
            type="textarea"
            placeholder="请输入规则脚本" />
        </el-form-item>

        <el-form-item
          v-for="(domain, index) in form.domains" 
           style="width:100%;"
          :label="'规则参数' + index"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true, message: '规则参数不能为空', trigger: 'blur'
        }">

          <br>
          <el-row :gutter="2">
            <el-col :span="2"><span>name:</span></el-col>
            <el-col :span="6"><el-input v-model="domain.value1" label="name" style="width:200px;" /></el-col>
            <el-col :span="2" style="margin-left:40px" ><span>type:</span></el-col>
            <el-col :span="6"><el-input v-model="domain.value2" label="type" style="width:200px;"/></el-col>


          </el-row>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleUpdate = false">取消</el-button>
        <el-button type="primary" @click="updateTable(form)">提交</el-button>
      </div>
    </el-dialog>

    <!--
     详细信息，点击某一行查看此行的详情
     -->
    <el-dialog
      :visible.sync="dialogInformation"
      title="详细信息"
      @close='closeDialog'
      width="60%">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="计算规则名: " prop="name">&nbsp; &nbsp;
          <el-input v-model="form.name" style="width:400px;" autocomplete="off" disabled="disabled" placeholder="请输入名称（仅支持英文）" @keyup.native="form.name=form.name.replace(/[^\w\.\/]/ig,'')" />
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="计算规则别名:" prop="alias">
          <el-input v-model="form.alias" style="width:400px;" autocomplete="off" disabled="disabled" placeholder="请输入别名" />
          <!--  <el-input v-model="form.alias" autocomplete="off" required placeholder="请输入别名" @keyup.native="form.alias=form.alias.replace(/[^\u4E00-\u9FA5]/g,'')"/> -->
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="规则描述:" prop="description">
          <el-input 
v-model="form.description"
                    style="width:600px;"
                    :autosize="{ minRows: 2, maxRows: 5}" 
      autocomplete="off"
                    disabled="disabled"
                    type="textarea"
                    placeholder="请输入规则描述" />
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="规则脚本:" prop="scriptTemplet">
          <el-input
            v-model="form.scriptTemplet"
            :autosize="{ minRows: 5, maxRows: 18}"
            style="width:600px;"
            autocomplete="off"
            disabled="disabled"
            type="textarea"
            placeholder="请输入规则脚本" />
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import * as server from '../../../../api/kms'
import * as utils from '../../../../utils/utils.js'
export default {
  filters: {
    dateFilter(value) {
      return utils.dateFilter(value)
    }
  },

  data() {
    return {
      search: {
        name: '',
        createTime: ''
      },
      multipleSelectionIds: '',
      totalCount3: '', // 指标规则总条数
      currentPage3: 1, // 指标规则当前页
      pageSize: 5, // 每页显示默认条数
      tableDataTemplet: [{}], // 指标规则参数详情输入框数据
      currentId: '',
      form: {
        name: '',
        alias: '',
        code: '',
        createTime: '',
        description: '',
        paramsTemplet: '',
        scriptTemplet: '',
        domains: []
      },
      rules: {
        name: [{ required: true, message: '请填写英文名', trigger: 'blur' }],
        alias: [
          { required: true, message: '请填写别名(中)', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请填写规则描述', trigger: 'blur' }
        ],
        scriptTemplet: [
          { required: true, message: '请填写规则脚本', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      dialogVisibleUpdate: false,
      dialogInformation: false,

      metricsRuleData: [],
      multipleSelection: []
    }
  },
  created() {
    this.getMetricsRule()
  },

  methods: {

    addDomain() {
      this.form.domains.push({
        value: '',
        key: Date.now()
      })
      },
    resetForm1(index) {
      this.form.domains[index].value1 = ''
        this.form.domains[index].value2 = ''
      },
    removeDomain(item) {
      var index = this.form.domains.indexOf(item)
      if (index !== -1) {
        this.form.domains.splice(index, 1)
      }
    },
    showDialog() {
      this.initDialog()
      this.dialogVisible = true
    },
    openDialog(row) {
      this.dialogInformation = !this.dialogInformation  
       //this.form=rule
        this.form.name = ''
        this.form.alias = ''
        this.form.code = ''
        this.form.description = ''
        this.form.scriptTemplet = ''
        this.form.paramsTemplet = ''
        // console.table(row)
        // debugger
        this.form.name = row.name
        this.form.alias = row.alias
        this.form.code = row.code
        this.form.description = row.description
        this.form.scriptTemplet = row.scriptTemplet
        this.form.paramsTemplet = row.paramsTemplet
      },

    initDialog() {
      // debugger
      this.form = {
        name: '',
        alias: '',
        code: '',
        createTime: '',
        description: '',
        paramsTemplet: '',
        scriptTemplet: '',
        domains: []
      }
    },
    closeDialog() {
      // debugger
      this.initDialog()
    },
    handleClick() {
      this.getMetricsRule()
    },

    showUpdateDialog(rule, dialogVisibleUpdate) {
      this.form = rule
      this.form['domains'] = JSON.parse(rule.paramsTemplet)
      this.dialogVisibleUpdate = !dialogVisibleUpdate
      this.currentId = rule.ruleId
      event.cancelBubble = true//避免二次弹框
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelectionIds = val.map(item =>
        item.metricId
      ).join(',')
    },
    open(p, index) {
      let param, val
      if (p === 'scriptTe') {
        param = 'scriptTemplet'
        val = '脚本详情'
      } else {
        param = 'paramsTemplet'
        val = '参数详情'
      }

      this.$alert(this.metricsRuleData[index][param], val, {
        confirmButtonText: '确定'
        /*  callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        } */
      })
    },

    getMetricsRule(search) {
      // 从后台查询指标规则整个表格信息，再加上指标规则分页
      const params = {
        start: (this.currentPage3 - 1) * this.pageSize + 1, // （当前页数-1）*每页显示的条数
        limit: this.pageSize
      }

        params['sortfield'] = 'createTime'
        params['sortorder'] = 'DESC'
        //debugger
        //params['sortfield']=createTime; 
        //params['sortorder']=DESC; 
        for (const item in search) {
        if (search.hasOwnProperty(item) && search[item].trim() !== '') {
          params[item] = search[item].trim()
          }
      }
      server.getMetricsRule(params).then(
        res => {
          this.metricsRuleData = res.metricsData
          this.totalCount3 = res.count //后台的页面总数给前端
          console.info(res)
          console.info(this.metricsRuleData)
        } // 查询指标规则
      )
    },
    // 新增指标规则
    creatMetricsRule(form) {
      this.dialogVisible = false
      // debugger
      /*    this.form.name = form.name
      this.form.alias = form.alias
      //this.form.code = form.code
      this.form.description = form.description
      this.form.paramsTemplet = form.paramsTemplet
      this.form.scriptTemplet = form.scriptTemplet */
      form.paramsTemplet = JSON.stringify(form.domains)
      delete form['domains']
      // debugger
      this.$refs.form.validate(valid => {
        if (valid) {
          //  alert("submit!");
          // debugger
          server.postMetricsRule(form).then(res => {
            this.getMetricsRule(this.search)
              this.form.name = '';
            this.form.alias = '';
            this.form.description = '';
            this.form.scriptTemplet = '';
          })
          } else {
          alert('不允许提交空白表单!请完整填写弹框信息！')
            console.log('111')
          return false
          }
      })
     
    },
    // 修改规则
    changeMetricsRule(form, ruleId) {
      this.dialogVisibleUpdate = false,
      this.form.ruleId = ruleId,
      server.putMetricsRule(form).then(res => {
        // console.info(res)
        // this.metricsTypeData.push({name,alias,founder:"houtt",createTime:"20181022" ,typeId:"3"});
        // this.metricsTypeData=res
        this.getMetricsRule(this.search)

        this.form.name = ''
        this.form.alias = ''
        // this.form.code = ''
        this.form.description = ''
        this.form.paramsTemplet = ''
        this.form.scriptTemplet = ''
        this.form.ruleId = ''
        // alert("已成功修改指标规则！");
        this.$message({
          showClose: true,
          message: '已成功修改指标规则！',
          type: 'success'
        })
      }, error => {
        console.error('请求异常！' + error)
        this.$message({
          showClose: true,
          message: '修改失败！',
          type: 'error'
        })
      })
    },
    	updateTable(form) {
      this.changeMetricsRule(form, this.currentId)
    },

    deleteMetricsRule(ids, index) {
      server.deleteMetricsRule(ids).then(res => {
        console.info(ids)
        this.currentPage3 = 1
        this.getMetricsRule(this.search)
         this.$message({
          showClose: true,
          message: '删除成功！',
          type: 'success'
        })
      }, error => {
        console.error('请求异常！' + error)
        this.$message({
          showClose: true,
          message: '删除失败！',
          type: 'error'
        })
      })
      event.cancelBubble = true
},
    // 指标规则搜索
    queryMetricsRul(search) {
      const params = {
        start: 1, // （当前页数-1）*每页显示的条数
        limit: this.pageSize
      }
     // alert(this.form.createTime);
      params['search'] = true 
      params['sortfield'] = 'createTime'
      params['sortorder'] = 'DESC'
    for (const item in search) {
        if (search.hasOwnProperty(item) && search[item].trim() !== '') {
          params[item] = search[item].trim()
        }
      }
      // debugger
      server.queryMetricsRul(params).then(
        res => {
          this.metricsRuleData = res.metricsData
          this.currentPage3 = 1 //搜索后数据从第一页开始显示
          this.totalCount3 = res.count //后台的页面总数给前端
        }// 查询
      )
    },
    handleSizeChange(val) {
      // 设置每页多少条
      this.pageSize = val
      this.getMetricsRule(this.search)
    },
    handleCurrentChange(val) {
      // 当前页
      this.currentPage3 = val
      this.getMetricsRule(this.search)
     },

    // 重置
    reset() {
      this.search.name = ''
       // this.search.code = '';
      }

  }

}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .a{
    margin: 20px 10px 12px 10px;
    overflow-x: hidden;
    padding:10px;
  }
  .block {
    margin: 20px 0 12px 0;
  }
  .text {
    font-size: 14px;
  }
  .item {
    padding: 8px 0;
  }
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-button-padding{
    padding: 0px;
}
</style>
