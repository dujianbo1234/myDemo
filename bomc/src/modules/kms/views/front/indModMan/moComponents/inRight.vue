<template>
  <div class="a">
    <div class="RightRow">
      <el-card>
      <el-form :inline="true" class="elform">
       <el-form-item label="指标维度名">
        <el-input v-model="search.name" style="width:260px" placeholder="请输入指标维度" @keyup.enter.native="queryMetricsDimension(search)"></el-input>
       </el-form-item>
       <el-form-item label="指标维度别名">
        <el-input v-model="search.alias" style="width:260px" placeholder="请输入维度别名" @keyup.enter.native="queryMetricsDimension(search)"></el-input>
       </el-form-item>
       <el-form-item>
       <el-button  class="search_btn" @click="queryMetricsDimension(search)">查询</el-button>
       <el-button  class="opt_btn" @click.stop="reset">重置</el-button>
        <i class="iconfont step_btn">&#xe619;</i>            
         <el-popover
            placement="bottom"
            width="400"
            trigger="click">
              <template>
                <div></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox label="指标维度名" disabled></el-checkbox>
                  <el-checkbox label="指标维度别名" disabled></el-checkbox>
                  <el-checkbox label="创建人"></el-checkbox>
                  <el-checkbox label="创建时间" style="margin-left:0px"></el-checkbox>
                </el-checkbox-group>
              </template>
            <i class="iconfont step_btn"  slot="reference">&#xe615;</i> 
        </el-popover> 
       </el-form-item>
      </el-form>
      </el-card>
   </div> 

    <div class="buttonItem">
      <el-card>
        <div>
        <el-button class="search_btn" @click="showDialog('',dialogFormVisible,'add_dimension_id')">新增维度</el-button>
        <el-button :disabled="multipleSelectionIds===''" class="opt_btn del_btn" @click="deleteMetricsDimension(multipleSelectionIds,good, '')">批量删除</el-button>
        </div>
        <div class="block">
         <el-table
          ref="multipleTable"
          :data="metricsDimensionData"
          tooltip-effect="dark"
          :header-cell-style="headStyle" 
          style="width: 100%"
          @selection-change="handleSelectionChange('dimension',$event)">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="指标维度名" v-if="oneshow"/>
          <el-table-column prop="alias" label="指标维度别名" v-if="twoshow"/>
          <el-table-column prop="founder" label="创建人" v-if="thirdshow"/>
          <el-table-column label="创建时间" v-if="fourshow">
            <template slot-scope="scope">
              {{ scope.row.createTime | dateFilter }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" class="table_btn"  @click="updateDialog(scope.row,dialogFormUpdate,'change_dimension_id')">修改</el-button>
              <el-button type="text" size="small" class="table_btn"  @click="deleteMetricsDimension(scope.row.dimensionId,scope.row.alias,scope.row)">删除</el-button>
            </template>
          </el-table-column>
         </el-table>
         <div v-if="totalCount2>0" class="pagination" style="magin-left:500px">
          <el-pagination
            :current-page.sync="currentPage2"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            :total="totalCount2"
            align="right"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
         </div>
        </div>
      </el-card> 
    </div> 
      <!-- 新建 -->
    <el-dialog :visible.sync="dialogFormVisible" :close-on-click-modal="false" style="margin:auto;width:1200px;" @close="closeDialog">
      <div class="details-title">
      <span class="sp"><span>指标维度信息</span></span>
      <div class="logAdd-obj">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="维度名" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width:60%;" required placeholder="请输入英文或者数字" @keyup.native="form.name=form.name.replace(/[^\w\.\/]/ig,'')" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="维度别名" prop="alias">
          <el-input v-model="form.alias" autocomplete="off" style="width:60%;" required placeholder="请输入别名" @keyup.native="form.alias=form.alias.replace(/[^0-9a-zA-Z\u4e00-\u9fa5\.\/]/ig,'')"/>
        </el-form-item>
      </el-form>
      </div>
     </div>    
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearValidate(form)" >取 消</el-button>
        <el-button class="finish" :disabled="disabled" @click="updateTable(form.name,form.alias,touch_button)">提交</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog :visible.sync="dialogFormUpdate" :close-on-click-modal="false" style="margin:auto;width:1200px;" @close="closeDialog">
      <div class="details-title">
      <span class="sp"><span>修改类型信息</span></span>
      <div class="logAdd-obj">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="维度名" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width:60%;" required placeholder="请输入英文或者数字" @keyup.native="form.name=form.name.replace(/[^\w\.\/]/ig,'')" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="维度别名" prop="alias">
          <el-input v-model="form.alias" autocomplete="off" style="width:60%;" required placeholder="请输入别名" @keyup.native="form.alias=form.alias.replace(/[^0-9a-zA-Z\u4e00-\u9fa5\.\/]/ig,'')"/>
        </el-form-item>
      </el-form>
      </div>
     </div>    
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearValidate(form)" >取 消</el-button>
        <el-button class="finish" :disabled="disabled" @click="updateTable(form.name,form.alias,touch_button)">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as server from '../../../../api/kms'
import * as utils from '../../../../utils/utils.js'
import { getUserName } from '@/utils/auth'
export default {
  name: 'ModuleManagement',
  dialogFormVisible: false,
  dialogFormUpdate:false,
  title: '',
  filters: {
    dateFilter(value) {
      return utils.dateFilter(value)
    }
  },
  data() {
    return {
      search: {
        name: '',
        alias:''
      },
      disabled:false,
      oneshow:true,
      twoshow:true,
      thirdshow:true,
      fourshow:true,
      headStyle: {
        'background-color': '#F4F8F9',
        'color': 'rgba(0,0,0,0.60)',
      },
      checkedCities:  ['指标维度名', '指标维度别名', '创建人','创建时间'],
      mustcount:"",
      allcount:'',
      numName:"",
      totalCount2: '', // 指标维度总条数
      currentPage2: 1, // 指标维度当前页
      pageSize: 5, // 每页显示默认条数
      multipleSelectionIds: '',
      good:"",
      touch_button: '',
      currentId: '',
      activeName2: 'first',
      title: this.title,
      lableType: this.lableType,
      lableChiese: this.lableChiese,
      input: '',
      dialogFormVisible: this.dialogFormVisible,
      dialogFormUpdate:this.dialogFormUpdate,
      form: {
        name: '',
        alias: '',
        region: '',
        founder: getUserName(),
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [{ required: true, message: '请填写英文或者数字', trigger: 'blur' },
               { min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur' }],
        alias: [
          { required: true, message: '请填写别名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度不能超过10个字符', trigger: 'blur' }
        ]
      },
      formLabelWidth: '160px',
      metricsDimensionData: []
    }
  },
  created() {
    this.getMetricsDimension(this.search)
    console.info('kms  created')
  },
  mounted() {
    console.info('kms  mounted')
  },
  methods: {
    handleCheckedCitiesChange(value) {
         var a=[]
        //  debugger
        for(var i=0;i<value.length;i++){
           a.push(value[i])
        }
        if(a.indexOf("指标维度名")==-1){
            this.oneshow=false
        }else{
          this.oneshow=true
        }
        if(a.indexOf("指标维度别名")==-1){
           this.twoshow=false
        }else {
           this.twoshow=true
        }
        if(a.indexOf("创建人")==-1){
           this.thirdshow=false
        }else{
           this.thirdshow=true
        }
        if(a.indexOf("创建时间")==-1){
          this.fourshow=false
        }else{
          this.fourshow=true
        }
      },
    clearValidate(form) {
      this.dialogFormVisible = false
      this.dialogFormUpdate=false
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
    },
    closeDialog() {
      this.form.name = ''
      this.form.alias = ''
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
    },
    handleClick() {},
    showDialog(row, dialogFormVisible, touch_button){
      this.disabled=false;
        this.form.name = ''
      this.form.alias = ''
      this.dialogFormVisible = !dialogFormVisible // 取反表示弹框
      this.touch_button = touch_button
      // debugger
    },
   async updateDialog(row, dialogFormUpdate, touch_button) {
     this.disabled=false
    //  debugger
        let a = this.queryMetricsDef(row)
       await a
       console.log(this.mustcount)
       if(this.mustcount !== 0){
         this.$alert('该指标维度已绑定指标定义，不能修改', '提示', {
          confirmButtonText: '确定',
        });
       }else{
       this.form.name = ''
      this.form.alias = ''
      this.dialogFormUpdate = !dialogFormUpdate // 取反表示弹框
      this.touch_button = touch_button
      // debugger
     if (touch_button === 'add_dimension_id') {
        this.title = '新增指标维度'
        this.lableType = '维度名'
        this.lableChiese = '维度别名'
      }  else {
        this.title = '修改指标维度'
        this.lableType = '维度名'
        this.lableChiese = '维度别名'
        this.currentId = row.dimensionId
        this.form.name = row.name
        this.form.alias = row.alias
      }
       }
    },
    handleSizeChange(val) {
      // 设置每页多少条
      this.pageSize = val
      this.getMetricsDimension(this.search)
    },
    handleCurrentChange(val) {
      // 当前页
      this.currentPage2 = val
      this.getMetricsDimension(this.search)
    },
    // 重置
    reset() {
      this.search.name = ''
      this.search.alias=''
    },
    /**
     * 指标维度查询
     * @param search
     */
    getMetricsDimension(search) {
      debugger
      // 从后台查询指标维度整个表格信息，指标维度分页
      const params = {
        start: (this.currentPage2 - 1) * this.pageSize + 1, // （当前页数-1）*每页显示的条数
        limit: this.pageSize
      }
      params['keys'] = "name,alias"
      params['value'] =search.name+","+search.alias
      params['sortfield'] = 'createTime'
      params['sortorder'] = 'DESC'
      params['search'] = true
      // for (const item in search) {
      //   if (search.hasOwnProperty(item) && search[item].trim() !== '') {
      //     params[item] = search[item].trim()
      //   }
      // }
      server.getMetricsDimension(params).then(
        res => {
          this.metricsDimensionData = res.metricsData // 后台获取的整个表格的数据给前台数组中
          this.totalCount2 = res.count // 后台的页面总数给前端
        } // 查询
      )
    },
     /**
     * 指标信息的接口
     */
    queryMetricsDef(row) {  
      // debugger   
      var  value=[]
      value=row.alias
      const params = {}      
        params['search']=true      
        params["keys"] ="metricDimension"     
        params['value'] = value
        return server.queryMetricsDef(params).then(
          res => {this.mustcount = res.count;
          }); 
        },
     /**
     * 批量删除指标信息的接口
     */
    // queryAllMetricsDef() {
    //   //  debugger
    //    const params = {}
    //    var value=this.numName
    //    params['search']=true
    //    params["keys"] ="metricDimension"
    //    params["value"] = this.numName
    //   return server.queryMetricsDef(params).then(
    //     res => {
    //       this.allcount=res.count;
    //       console.log(res.count)
    //       }
    //    ); 
    //  },
    /**
     * 指标维度搜索
     * @param search
     */
    queryMetricsDimension(search) {
      let reg = new RegExp("[`~!@#%$^&*()=|{}':',\\[\\].<>《》~！@#￥……&*（）——|{}【】‘；;：”“'。，、？]", 'g');
          if(reg.test(this.search.name)){
             this.$message.warning("维度名请勿输入特殊字符！");
               return;
                }
      String.prototype.trim = function()
            {
                // 用正则表达式将前后空格
                // 用空字符串替代。
                return this.replace(/(^\s*)|(\s*$)/g, "");
            }
        this.search.name=this.search.name.trim();
        this.search.alias=this.search.alias.trim();          
        this.$emit('queryMetricsDimension',this.form)
      const params = {
        start: 1, // （当前页数-1）*每页显示的条数
        limit: this.pageSize
      }
      params['keys'] = "name,alias"
      params['value'] = search.name+","+search.alias
      params['search'] = true
      params['sortfield'] = 'createTime'
      params['sortorder'] = 'DESC'
      // for (const item in search) {
      //   if (search.hasOwnProperty(item) && search[item].trim() !== '') {
      //     params[item] = search[item].trim()
      //   }
      // }
      server.getMetricsDimension(params).then(res => {
        this.currentPage2 = 1 // 搜索后数据从第一页开始显示
        this.metricsDimensionData = res.metricsData
        this.totalCount2 = res.count // 搜搜到的后台的页面总数给前端
      })
    },
    // 新增指标维度
    createMetricsDimension(name, alias) {
      this.disabled=true;
      this.$refs.form.validate(valid => {
        if (valid) {
           var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
            if(reg.test(this.form.name)){
              this.$message({
                showClose: true,
                message: '维度名中不能含有文字!',
                type: 'error'
              })
              this.disabled=false;
             this.dialogFormVisible = true
              }else{
          var { name, alias, founder } = this.form
          server.postMetricsDimension({ name, alias, founder }).then(res => {
            this.getMetricsDimension(this.search)
            if (res.errorMsg=="请求成功") {
              this.$message({
                showClose: true,
                message: '新增成功！',
                type: 'success'
              })
              this.form.name = ''
              this.form.alias = ''              
              this.dialogFormVisible = false
            }else{
              this.dialogFormVisible=true
              this.disabled=false;
            }
          })
              }
        } else {
            this.$message({
                showClose: true,
                message: '不允许提交空白表单!请完整填写弹框信息！！',
                type: 'error'
              })
              this.disabled=false; 
          //alert('不允许提交空白表单!请完整填写弹框信息！')
          return false
        }
      })
    },
    // 修改确定指标维度
    changeMetricsDimension(name, alias, dimensionId) {
      this.disabled=true; 
      var { name, alias, founder } = this.form
      // debugger
      this.$refs.form.validate(valid => {
        if (valid) { 
          var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
            if(reg.test(this.form.name)){
              this.$message({
                showClose: true,
                message: '维度名中不能含有文字!',
                type: 'error'
              })
              this.disabled=false;
             this.dialogFormUpdate = true
              }else{
      server.putMetricsDimension({ name, alias, dimensionId, founder }).then(res => {
         this.getMetricsDimension(this.search)
            if (res.errorMsg=="请求成功") {
              this.$message({
                showClose: true,
                message: "修改成功！",
                type: "success"
              });
              this.form.name = ''
              this.form.alias = ''              
              this.dialogFormUpdate = false
            }else{
              this.dialogFormUpdate=true;
              this.disabled=false; 
            }
          })
              }
        } else {
          this.$message({
            showClose: true,
            message: "不允许提交空白表单!请完整填写弹框信息！！",
            type: "error"
          });
          this.disabled=false; 
          console.log("111");
          return false;
        }
        error => {
          console.error("请求异常！" + error);
          (this.dialogFormUpdate = false),
            this.$message({
              showClose: true,
              message: "修改失败！",
              type: "error"
            });
        };
      });
    },
    /**
     * 删除
     */
     deleteMetricsDimension(ids, index,row) {
      //  debugger
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        server.deleteMetricsDimension(index).then(res => {
        if(res.errorMsg!=="请求成功" ){
              console.log("111")
          }else{
          this.currentPage2 = 1
          this.getMetricsDimension(this.search)
          this.$message.success("删除成功！");
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }), error => {
        console.error('请求异常！' + error)
        this.$message({
          showClose: true,
          message: '删除失败！',
          type: 'error'
        })
      }
      // this.metricsTypeData.splice(index,1);
    },
    updateTable(name, alias, touch_button) {
       if (touch_button === 'add_dimension_id') {
        this.createMetricsDimension(name, alias)
      }  else {
        this.changeMetricsDimension(name, alias, this.currentId)
      }
    },
     handleSelectionChange(flag, val) {
      if (flag === 'type') {
        this.multipleSelectionIds = val.map(item => item.typeId).join(',')
        this.good=val.map(item=>item.alias).join(",")
      } else if (flag === 'dimension') {
        this.multipleSelectionIds = val.map(item => item.dimensionId).join(',')
        this.good=val.map(item=>item.alias).join(",")
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .block {
    margin: 20px 0 12px 0;
  }
  .RightRow {
    margin: 20px 10px 12px 20px;
    border-radius: 5px;
    height:auto;

    .elform{
      margin-bottom: -15px;
      margin-top: 5px;
    }
  }
  .buttonItem {
    margin: 20px 10px 20px 20px;
    border-radius: 5px;
  }
  .search_btn{
  background: #42B983;
  border: 1px solid #42B983;
  color: #FFFFFF;
    &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
  }
  .step_btn {
  background: rgba(66, 185, 131, 0.4);
  border: 1px solid #42B983;
  color: rgba(66, 185, 131, 1);
  cursor:pointer;
  margin-left:8px;
  border-radius: 3px;
  padding: 8px 11px;
  &:hover {
    background: rgba(66, 185, 131, 0.2);
  }
}
.opt_btn {
  background: #F4F8F9;
  color: rgba(0, 0, 0, 0.70);
  margin-left: 8px;
  font-size:14px;
  border: none;
  height: 34px;
  &:hover {
    background: #42B983;
    border-color: #42B983;
    color: #fff;
  }
}
.del_btn {
  &:hover {
    background: #FA5555;
    border-color: #FA5555;
    color: #fff;
  }
}
.table_btn {
  color: rgba(66, 185, 131, 1);
  font-size:14px;
}
.details-title {
  // margin-bottom: 20px;
  margin-top:-30px;

  .sp {
    display: inline-block;
    height: 20px;
    color: #42B983;
    margin-bottom: 10px;
    font-size:15px;

    span {
      padding-left: 10px;
      border-left: 3px solid #42B983;
    }
  }
}
.logAdd-obj {
    margin-top:20px;
}
.dialog-footer{
  margin-top:-30px;
}
.finish {
  background: #42B983;
  border: 1px solid #42B983;
  color: #FFFFFF;

  &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
} 

</style>
