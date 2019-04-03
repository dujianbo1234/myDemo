<template>
  <div class="app-container">
    <el-container>
        <el-header>
          <div class="operation">
            <div class="resource_name">
              <el-input v-model="query" placeholder="请输入基线ID、基线名称、基线描述" size="mini"></el-input>
            </div>
            <el-button type="primary" size="mini" @click="queryBaselineCondition()"> 查询</el-button>
            <el-button type="primary" icon="el-icon-delete" size="mini" class="fr" @click="delAll">删除</el-button>
            
            <el-button type="primary" icon="el-icon-plus" size="mini" class="fr" @click="addBaseline">
              新增
            </el-button>
          </div>
        </el-header>
        <el-main>
          <div class="template_tab">
            <template >
              <el-table :data="temp" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  min-width="10%"/>
                <el-table-column
                  prop="id"
                  label="基线ID"
                  min-width="30%"/>
                <el-table-column
                  prop="name"
                  label="基线名称"
                  min-width="30%"/>
                <el-table-column
                  prop="description"
                  min-width="30%"
                  label="基线描述"/>
                <el-table-column
                  label="创建时间"
                  min-width="30%">
                  <template slot-scope="scope">
                    {{scope.row.create_time|formatTime('YMDHMS')}}
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="23%">
                  <template slot-scope="scope">
                    <el-button size="mini">还原该版本</el-button>
                    <i
                      class="el-icon-delete"
                      size="mini"
                      type="danger"
                      style="margin: 0 5px;font-size: 16px;font-weight: 700;"
                      @click="deleteInfo(scope.row)"/>
                  </template>

                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-main>
        <el-footer>
          <paging :page = "page" :size-change = "sizeChange" :current-change = "currentChange"/>
        </el-footer>
        <el-dialog title="新增基线" :visible.sync="addBaselineForm" width="35%" :before-close="attributeAdd" :close-on-click-modal = false>
          <el-form :model="add_form"  ref="add_form" :rules="rules1">
            <el-form-item label="基线名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="add_form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="基线描述" :label-width="formLabelWidth" prop="description">
              <el-input v-model="add_form.description" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="attributeAdd()">取 消</el-button>
            <el-button type="primary" @click="add_subBaseline('add_form')" :disabled = isDisable>确 定</el-button>
          </div>
        </el-dialog>
    </el-container>
  </div>
</template>

<script>
import Paging from '@/modules/rms/components/Paging'
import * as service from '../../../api/model/baseline/baseline.js';
export default {
  components: {
    Paging
  },
  data() {
    var attributeData  = (rule, value, callback) => {
      if (/^[a-zA-Z]*$/.test(value) === false) {
        return callback(new Error('名称只能输入英文!'));
      } else {
         callback();
       }
    };
    var isdescription = (rule, value, callback) => {
      let regExp = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]*$/;
      if (regExp.test(value) === false) {
        return callback(new Error('只能输入中英文和数字,下划线,连接符!'));
      } else {
         callback();
      }
    }
    return {
      isDisable: false,
      query: "",
      temp: [],
      page: {
        pageSize: 8, //每页条数,  默认8条
        totalRecords: 0, //总条数
        pageSizes: [10, 20, 30, 40], // 分几页
        pageNum: 0, //页数从0开始
        name: '',
        description: '',
        id: '',
        search: false,
        searchByAny: false,
      },
      multipleSelection: [], //多选的数据
      delarr:[],//存放删除的数据
      addBaselineForm: false,
      add_form:{
        // "id":"",
        // "create_time":'',
        // "localtion":"机房"
      },
      formLabelWidth: '90px',
      rules1: {
        name: [
            { required: true, message: '请输入基线名称', trigger: 'blur' },
            { validator: isdescription, trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
        ],
        description: [
            { required: true, message: '请输入基线描述', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
            { validator: isdescription, trigger: 'blur'}
        ]
      },
    }
  },
  mounted(){
  　　this.init() //页面内初始加载就调用这个函数
  },
  methods: {
    // filterNode(value, data) {
    //     if (!value) return true;
    //     return data.label.indexOf(value) !== -1;
    // },
    handleSelectionChange(val) {
      debugger
      this.multipleSelection = val;
    },
    open4() {
      this.$message.error('您还未选择数据！');
    },
    // 按条件查询
    queryBaselineCondition() {
      let regExp = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]*$/;
      if (regExp.test(this.query) === false) {
        this.$message.error('只能输入中英文和数字,下划线,连接符,进行查询')
        return 
      }
      if(this.query != ""){
        this.page.pageSize = 10; //每页条数,  默认8条
        this.page.pageNum = 0;
        this.page.totalRecords = 0;
        this.page.name = this.query;
        this.page.description = this.query;
        this.page.id = this.query;
        this.page.search= true,
        this.page.searchByAny= true,
        this.temp = [];
        service.queryBaseline(this.page).then(res => {
            debugger
            if(res.count){
              this.page.totalRecords = parseInt(res.count);
            }
            this.temp = res.datas;
        })
      }else{
        this.init()
      }
    },
    // 单个删除
    deleteInfo(item){
      this.$confirm('此操作将永久删除数据 , 是否继续?', '提示', { type: 'warning' })
        .then(() => { // 向服务端请求删除
          service.deleteInfo(item.id)
            .then((res) => {
              if(res.type == 0){
                this.$message.success('成功删除了数据'+item.name + '!');
                this.init()
              }else{
                this.$message.error('删除失败!');
              }
              // if(res.type == 4){
              //   this.$message.error('模型里面已有数据'+item.name + '!');
              // }
            })
            .catch((res) => {
              this.$message.error('删除失败!');
            });
        }) 
        .catch(() => {
        this.$message.info('已取消操作!');
      });
    },
    // 批量删除
    delAll() {     
      debugger
      this.delarr = [];
      const length = this.multipleSelection.length;
      if(length == 0){
          this.open4()
          return;
      }     
      for (let i = 0; i < length; i++) {      
        this.delarr.push(this.multipleSelection[i].id)     
      }
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', { type: 'warning' })
        .then(() => { // 向服务端请求删除
          service.deleteInfoMultiple(this.delarr)
          .then((res) => {
            debugger
              if(res.type == 0){
                this.$message.success('成功删除了数据!');
                this.init()
              }else{
                this.$message.error('删除失败!');
              }
          })
          .catch((res) => {
              this.$message.error('删除失败!');
          });
        }) 
        .catch(() => {
        this.$message.info('已取消操作!');
      });
    },
    // 初始化数据展示
    init(){
      this.page.pageSize= 10; //每页条数,  默认8条
      this.page.totalRecords= 0;
      this.page.pageSizes= [10, 20, 30, 40];
      this.page.pageNum= 0;
      this.page.name= '';
      this.page.description= '';
      this.page.id= '';
      // this.page.search= false;
      // this.page.searchByAny= false;
      this.temp = [];
      service.queryBaseline(this.page).then(res => {
        debugger
        if(res){
          this.page.totalRecords = parseInt(res.count);
          this.temp = res.datas;
        }
      })

    },
    // 打开新增页面
    addBaseline() {
      debugger
      this.add_form = {};
      this.addBaselineForm = true;
    },
    // 取消新增
    attributeAdd() {
        debugger
        this.$refs['add_form'].resetFields();
        this.addBaselineForm = false
    },
    // 新增基线
    add_subBaseline(formName) {
      debugger
      this.$refs[formName].validate((valid) => {
          if (valid) {
            debugger
            this.isDisable = true;
            service.addBaseline(this.add_form).then(res => {
              debugger
              if(res.type == 0){
                this.addBaselineForm = false;
                this.$alert('添加成功', '消息提示', {
                          confirmButtonText: '确定',
                          callback: action => {
                            this.isDisable = false;
                            this.init();
                          }
                });
              }
              if (res.type == 1) {
              this.$message.error('基线名称已存在,请重新输入!');
              this.isDisable = false;
            }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    },
    // 每页显示多少条数据
    sizeChange(val) {
         debugger
         this.page.pageSize = val;
         service.queryBaseline(this.page).then(res => {
        debugger
        if(res){
          this.page.totalRecords = parseInt(res.count);
          this.temp = res.datas;
        }
      });
    },
     //翻页
    currentChange(val) {
         debugger
         this.page.pageNum=val-1;
         service.queryBaseline(this.page).then(res => {
        debugger
        if(res){
          this.page.totalRecords = parseInt(res.count);
          this.temp = res.datas;
        }
      });
    }
  },
  
}
</script>

<style scoped>
  .el-header {
    height: 45px !important;
    border-bottom: 1px solid #ccc;
    color: #333;
    text-align: left !important;
    font-size: 14px;
    line-height: 45px !important;
  }
  .el-aside {
    /* background-color: #D3DCE6; */
    /* color: #333; */
    text-align: center;
    /* line-height: 200px; */
  }

  .el-main {
    /* background-color: #E9EEF3; */
    /* color: #333; */
    text-align: center;
    /* line-height: 160px; */
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .app-container{
    padding: 10px;
  }
  main.el-main{
    padding: 10px;
  }
.head {
    height: 50px;
    line-height: 50px;
    /* border-bottom: 1px solid #ccc; */
    text-align: left;
    text-indent: 18px;
    font-size: 14px;
    font-weight: 700;
}
.el-tree {
    background: none;
}
header.el-header {
    line-height: 46px;
}
.resource_name { 
    width: 22%;
    display: inline-block;
}
.resource_crux { 
    width: 20%;
    display: inline-block;
    padding-left: 20px;
}
.resource_crux .el-checkbox {
  padding: 5px 20px 9px 10px;
}
.fr {
    float: right;
    margin-top: 9px;
}
</style>

