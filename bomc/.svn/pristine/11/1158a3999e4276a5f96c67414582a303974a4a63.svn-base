<template>
  <div class="a">
    <div class="RightRow">
      <el-card>
      <el-form :inline="true" class="elform">
       <el-form-item label="指标类型名">
        <el-input v-model="search.name" style="width:260px"  placeholder="请输入指标类型" @keyup.enter.native="queryMetricsType(search)"></el-input>
       </el-form-item>
       <el-form-item label="指标类型别名">
        <el-input v-model="search.alias" style="width:260px" placeholder="请输入类型别名" @keyup.enter.native="queryMetricsType(search)"></el-input>
       </el-form-item>
       <el-form-item>
       <el-button  class="search_btn" @click="queryMetricsType(search)">查询</el-button>
       <el-button  class="opt_btn" @click.stop="reset">重置</el-button>
        <i class="iconfont step_btn">&#xe619;</i>
        <el-popover
            placement="bottom"
            width="400"
            trigger="click">
              <template>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox label="指标类型名" disabled></el-checkbox>
                  <el-checkbox label="指标类型别名" disabled></el-checkbox>
                  <el-checkbox label="创建人"></el-checkbox>
                  <el-checkbox label="创建时间" style="margin-left:0"></el-checkbox>
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
        <el-button class="search_btn" @click="showDialog('',dialogFormVisible,'add_type_id')">新增类型</el-button>
        <!-- <el-button :disabled="multipleSelectionIds===''"  class="opt_btn del_btn" @click="deleteMetricsType(multipleSelectionIds,good, '')">批量删除</el-button> -->
        <el-button :disabled="multipleSelectionIds===''" class="opt_btn del_btn" @click="deleteMetricsType(multipleSelectionIds,good, '')">批量删除</el-button>
      </div>
      <div class="block">
        <el-table
          ref="multipleTable"
          :data="metricsTypeData"
          tooltip-effect="dark" 
          :header-cell-style="headStyle"
          @selection-change="handleSelectionChange('type',$event)">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="指标类型名" v-if="oneshow"/>
          <el-table-column prop="alias" label="指标类型别名" v-if="twoshow"/>
          <el-table-column prop="founder" label="创建人" v-if="thirdshow" />
          <el-table-column label="创建时间" v-if="fourshow">
            <template slot-scope="scope">
              {{ scope.row.createTime | dateFilter }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" class="table_btn" @click="updateDialog(scope.row,dialogFormUpdate,'change_type_id')">修改</el-button>
              <el-button type="text" size="small" class="table_btn" @click="deleteMetricsType(scope.row.typeId,scope.row.alias,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="totalCount1>0" class="pagination">
          <el-pagination
            :current-page.sync="currentPage1"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            :total="totalCount1"
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
      <span class="sp"><span>指标类型信息</span></span>
      <div class="logAdd-obj">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="类型名" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width:60%;" required placeholder="请输入英文或者数字" @keyup.native="form.name=form.name.replace(/[^\w\.\/]/ig,'')" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="类型别名" prop="alias">
          <el-input v-model="form.alias" autocomplete="off" style="width:60%;" required placeholder="请输入别名" @keyup.native="form.alias=form.alias.replace(/[^0-9a-zA-Z\u4e00-\u9fa5\.\/]/ig,'')"/>
        </el-form-item>
      </el-form>
      </div>
     </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearValidate(form)">取消</el-button>
        <el-button class="finish" :disabled="disabled" @click="updateTable(form.name,form.alias,touch_button)">提交</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog :visible.sync="dialogFormUpdate" :close-on-click-modal="false" style="margin:auto;width:1200px;" @close="closeDialog">
     <div class="details-title">
      <span class="sp"><span>修改类型信息</span></span>
      <div class="logAdd-obj">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="类型名" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width:60%;" required placeholder="请输入英文或者数字" @keyup.native="form.name=form.name.replace(/[^\w\.\/]/ig,'')" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="类型别名" prop="alias">
          <el-input v-model="form.alias" autocomplete="off" style="width:60%;" required placeholder="请输入别名" @keyup.native="form.alias=form.alias.replace(/[^0-9a-zA-Z\u4e00-\u9fa5\.\/]/ig,'')"/>
        </el-form-item>
      </el-form>
      </div>
     </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearValidate(form)">取消</el-button>
        <el-button class="finish" :disabled="disabled" @click="updateTable(form.name,form.alias,touch_button)">提交</el-button>
      </div>
    </el-dialog>   
  </div>
</template>
<script>
import * as server from '../../../../api/kms'
import * as utils from '../../../../utils/utils.js'
import { getUserName } from '@/utils/auth'
import { debug } from 'util'
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
        name:'',
        alias:'',
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
      checkedCities:  ['指标类型名', '指标类型别名', '创建人','创建时间'],
      // value:this.form.alias,
      alias:"",
      delete:{},
      mustcount:'',
      allcount:'',
      numName:"",
      totalCount1: '', // 指标类型总条数
      currentPage1: 1, // 指标类型当前页
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
        name: [{ required: true, message: '请填写英文或者数字', trigger: 'change' },
               { min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur' },],
                // { required: true, trigger: 'blur',validator: validatePass },
        alias: [
          { required: true, message: '请填写别名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度不能超过10个字符', trigger: 'blur' }
        ]
      },
      formLabelWidth: '160px',
      metricsTypeData: []
    }
  },
  created() {
    this.getMetricsType(this.search)
    console.info('kms  created')
  },
  mounted() {
    console.info('kms  mounted')
    // this.clearValidate('form') ;
  },
  methods: {
      handleCheckedCitiesChange(value) {
         var a=[]
        //  debugger
        for(var i=0;i<value.length;i++){
           a.push(value[i])
        }
        if(a.indexOf("指标类型名")==-1){
            this.oneshow=false
        }else{
          this.oneshow=true
        }
        if(a.indexOf("指标类型别名")==-1){
           this.twoshow=false
        }else {
           this.twoshow=true
        }
        if(a.indexOf("创建人")==-1){
           this.thirdshow=false
        }else{
           this.thirdshow=true
        }if(a.indexOf("创建时间")==-1){
          this.fourshow=false
        }else{
          this.fourshow=true
        }
      },

    clearValidate(form) {
      this.form.name = ''
      this.form.alias = ''  
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
    },
    /**
     * 指标信息的接口
     */
     queryMetricsDef(row) {
      //  debugger
       const params = {}
       var value=row.alias
      console.log(row.name)
      console.log(value)
       params['search']=true
       params["keys"] ="metricType"
       params["value"] = value
       return server.queryMetricsDef(params).then(
        res => {
          this.mustcount = res.count;
          }
       );
     },
   async updateDialog(row, dialogFormUpdate, touch_button) { 
     this.disabled=false;
        let a = this.queryMetricsDef(row)
       await a
       console.log(this.mustcount)
       if(this.mustcount !== 0){
         this.$alert('该指标类型已绑定指标定义，不能修改', '提示', {
          confirmButtonText: '确定',
        });
       }else{
      this.form.name = ''
      this.form.alias = ''
      this.dialogFormUpdate = !dialogFormUpdate// 取反表示弹框
      this.touch_button = touch_button
      // debugger
      if (touch_button === 'add_type_id') {
        this.title = '新增指标类型'
        this.lableType = '类型名'
        this.lableChiese = '类型别名'
      }  else if (touch_button === 'change_type_id') {
        this.title = '修改指标类型'
        this.lableType = '类型名'
        this.lableChiese = '类型别名'
        this.currentId = row.typeId
        this.form.name = row.name
        this.form.alias = row.alias
      }
     } 
    },
    /**
     * 指标类型查询
     * @param search
     */
     getMetricsType(search) {
        //从后台查询指标类型整个表格信息，再加上指标类型分页
        const params = {
          start: (this.currentPage1 - 1) * this.pageSize + 1, // （当前页数-1）*每页显示的条数
          limit: this.pageSize
        };
        params['keys'] = "name,alias"
        params['value'] =search.name+","+search.alias
        params['search']=true; 
        params['sortfield']='createTime';
        params['sortorder']='DESC';
        // for (const item in search) {
        //   if (search.hasOwnProperty(item) && search[item].trim() !== "") {
        //     params[item] = search[item].trim();
        //   }
        // }
      server.getMetricsType(params).then(
        res => {
          this.metricsTypeData = res.metricsData // 后台获取的整个表格的数据给前台数组中
          this.totalCount1 = res.count // 后台的页面总数给前端
        } // 查询
      ) // 拿到数据后，这里可以先判断下当前页拿到的数据是否为空？免得批量删除当前页时候，后面不显示。
    },
    /**
     * 指标类型搜索
     * @param search
     */
    queryMetricsType(search) {
      debugger
        let reg = new RegExp("[`~!@#%$^&*()=|{}':',\\[\\].<>《》~！@#￥……&*（）——|{}【】‘；;：”“'。，、？]", 'g');
        if(reg.test(this.search.name)){
             this.$message.warning("类型名请勿输入特殊字符！");
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
        console.log(this.search.name)
        this.$emit('queryMetricsType',this.form)
        const params = {
          start: 1, // （当前页数-1）*每页显示的条数
          
          limit: this.pageSize
      }
      params['keys'] = "name,alias"
      params['value'] =search.name+","+search.alias
      params['search'] = true
      params['sortfield'] = 'createTime'
      params['sortorder'] = 'DESC'
      // for (const item in search) {
      //   if (search.hasOwnProperty(item) && search[item].trim() !== '') {
      //     params[item] = search[item].trim()
      //   }
      // }
      server.getMetricsType(params).then(
        res => {
          this.metricsTypeData = res.metricsData // 后台获取的整个表格的数据给前台数组中
          this.currentPage1 = 1 // 搜索后数据从第一页开始显示
          this.totalCount1 = res.count // 后台的页面总数给前端
        } // 查询
      )// 拿到数据后，这里可以先判断下当前页拿到的数据是否为空？免得批量删除当前页时候，后面不显示。
    },
    handleSizeChange(val) {
      // 设置每页多少条
      this.pageSize = val
      this.getMetricsType(this.search)
    },
    handleCurrentChange(val) {
      // 当前页
      this.currentPage1 = val
      this.getMetricsType(this.search)
    },

    // 重置
    reset() {
      this.search.name ='';
      this.search.alias='';  
    },
    // 新增指标类型
    createMetricsType(name, alias) {
        debugger
      this.disabled=true;
      this.$refs.form.validate(valid => {
        if (valid) {
          var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
            if(reg.test(this.form.name)){
              this.$message({
                showClose: true,
                message: '类型名中不能含有文字!',
                type: 'error'
              })
              this.disabled=false;
             this.dialogFormVisible = true
              }else{
          var { name, alias, founder } = this.form
          server.postMetricsType({ name, alias, founder }).then(res => {         
            this.getMetricsType(this.search)
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
          console.log('111')
          return false
        }
      })
    },
    // 修改指标类型
    changeMetricsType(name, alias, typeId) {
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
            server.putMetricsType({ name, alias, typeId, founder }).then(res => {
               this.getMetricsType(this.search)
            if (res.errorMsg =="请求成功") {
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
     * */
      deleteMetricsType(ids,index,row) {
        // debugger
       this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
       }).then(() => {
        server.deleteMetricsType(index).then(res => {
          if(res.errorMsg!=="请求成功"){
             console.log("111")
          }else{
          this.currentPage1 = 1
          this.getMetricsType(this.search)
          this.$message.success("删除成功！");
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }),
       error => {
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
      if (touch_button === 'add_type_id') {
        this.createMetricsType(name, alias)
      } else if (touch_button === 'change_type_id') {
        this.changeMetricsType(name, alias, this.currentId)
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
      console.log(this.good)
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


