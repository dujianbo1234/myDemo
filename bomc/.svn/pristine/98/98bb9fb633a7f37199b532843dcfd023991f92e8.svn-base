<template>
  <div class="app-container">
    <el-container>
      <el-aside width="200px" style="" class="test test-1" >
        <div class="head">资源模型树</div>
        <el-input
          placeholder="请输入资源模型名称"
          v-model="filterText" style="width: 90%;display: block;margin: 0 auto;" size="mini">
        </el-input>

        <el-tree
          class="filter-tree"
          :data="nav_treeData"
          :props="defaultProps"
          :expand-on-click-node = 'false'
          node-key="id"
          :default-expanded-keys="[0,1,2,3,4]"
          :filter-node-method="filterNode"
          ref="tree2" @node-click="handleNodeClick">
        </el-tree>
      </el-aside>
      <el-container>
        <el-header>
          <!-- <div class="search">
            <el-input id="u19_input" v-model="input" suffix-icon="el-icon-search" placeholder="请输入资源名称、模型描述" size="mini">
              <i class="el-icon-search"/>
            </el-input>
          </div> -->
          <div class="operation">
            <!-- <i class="switch el-icon-more" @click="show()"/>
            <i class="switch">|</i>
            <i class="switch el-icon-more-outline" @click="hide()"/> -->
            <el-button type="primary" size="mini" @click="add_dialogVisible()">
              <i class="el-icon-plus">
                 新增
              </i>
            </el-button>
            <!-- <el-button type="primary" size="mini">
              <i class="el-icon-upload2"> 
              <router-link :to="{name:''}" class="dropdown-item">导入</router-link>
              </i>
            </el-button> -->
            <el-button type="primary" size="mini" @click="delAll">
              <i class="el-icon-delete">
                删除
              </i>
            </el-button>
            <!-- <el-button type="primary" size="mini"><i class="el-icon-download"> 导出</i></el-button> -->
          </div>
        </el-header>
        <el-main>
          <div class="template_tab">
            <template >
              <el-table :data="temp" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  min-width="7%"/>
                <el-table-column
                  prop="name"
                  label="关系名称"
                  min-width="30%"/>
                <el-table-column
                  prop="source"
                  label="发起端资源"
                  min-width="30%"/>
                <el-table-column
                  label="节点关系"
                  min-width="30%">
                  <template slot-scope="scope">
                    {{scopeRelation[scope.row.relation]}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="target"
                  min-width="30%"
                  label="接收端资源"/>
                <el-table-column
                  label="创建时间"
                  min-width="35%">
                  <template slot-scope="scope">
                    {{scope.row.create_time|formatTime('YMDHMS')}}
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="15%">
                  <template slot-scope="scope">
                    <!-- <router-link :to="{name:'resourceDetailsLink'}"> -->
                      <!-- <i
                        class="el-icon-edit-outline"
                        size="mini"
                        style="margin: 0 5px;font-size: 16px;font-weight: 700;"
                        @click="handleEdit(scope.$index, scope.row)"/> -->
                    <!-- </router-link> -->
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
          <div class="block">
            <el-pagination
              @size-change="sizeChange"
              @current-change="currentChange"
              :page-sizes="[10, 20, 30,40]"
              :page-size="page.pageSize"
              :current-page.sync="page.pageNum +1"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.totalRecords">
            </el-pagination>
          </div>
        </el-footer>
      </el-container>
      <el-dialog
        title="新增资源关系模型"
        :visible.sync="dialogVisible"
        width="55%"
        :before-close="handleClose">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="发起端资源">
              <el-select v-model="formInline.source"  size='mini'>
                <el-option
                  v-for="item in models"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="节点关系">
              <el-select v-model="formInline.relation" size='mini' @change="optionsChange(formInline.relation)">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                  :content="item.content">
                </el-option>
              </el-select>
              <!-- <i class="el-icon-circle-plus" @click="dialogFormVisible = true"></i> -->
              <el-tooltip class="item" effect="dark" placement="bottom-start">
                <div slot="content">解释:<span v-html="slot"></span> </div>
                <i class="el-icon-question"></i>
                <el-button></el-button>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="接收端资源">
              <el-select v-model="formInline.target"  size='mini'>
                <el-option
                  v-for="item in models"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="abbResourcesData()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="添加节点关系" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="addoptions" ref="addoptions">
          <el-form-item label="关系名称" :label-width="formLabelWidth" prop="label"
            :rules="[
              { required: true, message: '关系名称不能为空'},
            ]">
            <el-input v-model="addoptions.label" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="content"
            :rules="[
              { required: true, message: '描述不能为空'},
            ]">
            <el-input v-model="addoptions.content" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addoptions')">确 定</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import * as service from '@/modules/rms/api/model/associationRelationship/associationRelationship';
export default {
  watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
  },
  created: function created() {
    debugger;
    // this.$store.dispatch('stateType');
    if (!this.$store.state.resourceManagement.on_treeData) {
      this.$store.dispatch('treeData');
    }
  },
  computed: {
    nav_treeData() {
      return this.$store.state.resourceManagement.nav_treeData
    }
  }, 
  mounted(){
  　　this.init() //页面内初始加载就调用这个函数
      this.dataList() 
  },
  data() {
    return {
      filterText: '',
      data: [
        {
        label: '全部资源',
        children: [{
          label: 'SaaS',
          children: [
            {
            label: '业务类',
            children: [
             ]
            }, 
            {
              label: '应用类',
              children: [
             ]
            }
          ]
        }, 
        {
          label: 'PaaS',
          children: [
            {
            label: '逻辑类',
            children: [
            ]
            }
          ]
        }, 
        {
          label: 'IaaS',
          children: [{
            label: '逻辑类',
            children: [
            ]
          }, {
            label: '物理类',
            children: [
            ]
          }]
        }, 
        {
          label: '其他类',
          children: [
          ]
        }]
      }],
      temp: [
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      slot:'源部署目标。例如虚拟机部署在宿主机上、<br/>软件集群部署在服务器上;',
      scopeRelation:{
        Deployed: '部署',
        NetConnects: '网络连接',
        StorConnects: '存储连接',
        Uses: '使用',
        BasedOn: '基于',
        RunsOn: '运行在',
        Depends: '依赖',
      },
      options: [{
          value: 'Deployed',
          label: '部署',
          content: '源部署目标。例如虚拟机部署在宿主机上、<br/>软件集群部署在服务器上;'
        }, {
          value: 'NetConnects',
          label: '网络连接',
          content: '表示两个逻辑单元的网络连接关系。<br/>如：服务器和网络设备的网络连接;'
        }, {
          value: 'StorConnects',
          label: '存储连接',
          content: '表示两个逻辑单元的存储连接关系。<br/>如：服务器和存储光纤交换机的存储连接;'
        }, {
          value: 'Uses',
          label: '使用',
          content: '源使用目标。如：进程使用数据库对象、进程使用<br/>非关系型数据库实例、进程使用消息队列实例;'
        }, {
          value: 'Depends',
          label: '依赖',
          content: '源依赖于目标。<br/>如：业务功能依赖于应用服务;'
        },{
          value: 'BasedOn',
          label: '基于',
          content: '源基于目标。<br/>如：应用服务基于进程;'
        },{
          value: 'RunsOn',
          label: '运行在',
          content: '源运行在目标上。<br/>如：进程运行在虚拟机、进程运行在容器实例;'
        },
      ],
      addoptions:{
        label:'',
        content: '',
        value:''
      },
      formInline: {
          source: '',
          target: '',
          relation:{
            value: 'Deployed',
            label: '部署',
            content: '源部署目标。例如虚拟机部署在宿主机上、<br/>软件集群部署在服务器上;'
          }
      },
      models: [],
      page: {
        pageSize: 10, //每页条数,  默认10条
        totalRecords: 0, //总条数
        totalPages: 0, //总页数
        pageNum:0,
        model:'',
        value: '',
      },
      isshow: true,
      ishide: false,
      dialogVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '80px',
      multipleSelection: [], //多选的数据
      delarr:[],//存放删除的数据
    }
  },
  methods: {
    add_dialogVisible(){
      debugger
      if(this.$store.state.resourceManagement.treeData.length  == 0){
        this.$message({
          showClose: true,
          message: '未发现模型，不可新增关系！',
          type: 'warning'
        })
      }else{
        this.dialogVisible = true;
      }
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    show() {
      this.isshow = true
      this.ishide = false
    },
    hide() {
      this.isshow = false
      this.ishide = true
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            debugger
            this.dialogVisible = false
            this.formInline.relation = {
              value: 'Deployed',
              label: '部署',
              content: '源部署目标。例如虚拟机部署在宿主机上、<br/>软件集群部署在服务器上;'
            },
            done();
          })
          .catch(_ => {});
      },
    handleClick(tab, event) {
        console.log(tab, event);
    },
    filterNode(value, data) {
      debugger
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
    },
    open4() {
        this.$message.error('您还未选择数据！');
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          debugger
          if (valid) {
            // console.log(this.$refs[formName]);
            // this.$store.dispatch('addstateType',this.handleChangeData);
            this.addoptions.value = this.addoptions.label;
            this.options.push(this.addoptions);
            this.dialogFormVisible = false;
            // this.$router.push({path: '/data/appResource'});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    optionsChange(value) {
      debugger
      this.slot = value.content;
    },
    handleSelectionChange(val) {
      debugger
        this.multipleSelection = val; // 多选的数据
    },
    // 树状点击查询
    handleNodeClick(data,node) {
      this.page.pageSize = 10; //每页条数,  默认5条
      this.page.pageNum = 0; //从那一页开始,  默认0
      this.page.model = data.value;
      if(data.label == '全部资源'){
        this.page.model = '';
        this.page.value = '';
        this.init();
        return
      }
      if(data.value == "SaaS" || data.value == "PaaS" || data.value == "IaaS" || data.value == "Others"){
        this.page.value = data.value;
        // service.queryResourcesParent(this.page).then(res => {
        //   debugger
        //   if(res){
        //     this.page.totalRecords = parseInt(res.count);
        //     this.temp = res.datas;
        //   }
        // })
        this.queryResourcesParent()
        return
      }
      if(node.parent.data.value == "SaaS" || node.parent.data.value == "PaaS" || node.parent.data.value == "IaaS" || node.parent.data.value == "Others"){
        this.page.value = node.parent.data.value +'.'+ data.value;
        // service.queryResourcesParent(this.page).then(res => {
        //   debugger
        //   if(res){
        //     this.page.totalRecords = parseInt(res.count);
        //     this.temp = res.datas;
        //   }
        // })
        this.queryResourcesParent()

        return
      }
      if(data.uri){
        let value = data.uri.split('.');
        this.page.model = data.uri;
        this.page.value = data.value;
        this.init();
      }
    },
    // 新增关系
    abbResourcesData(){
      debugger
      var data = {}
      data.source = this.formInline.source;
      data.target= this.formInline.target;
      data.relation = this.formInline.relation.value;
      data.describe = this.formInline.relation.content;
      service.abbResourcesData(data).then(res => {
                debugger
                if(res){
                  if(res.type == 1){
                    this.$message.error('添加失败，已存在关系！')
                  }else{
                    this.dialogVisible = false;
                  // this.$store.dispatch('modelList');
                    // this.$store.dispatch('treeData');
                    this.$alert('添加成功', '消息提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        if(this.page.value == "SaaS" || this.page.value == "PaaS" || this.page.value == "IaaS" || this.page.value == "Others"){
                          this.queryResourcesParent()
                          return
                        }
                        if(this.page.value && this.page.value.indexOf('.') != -1){
                          this.queryResourcesParent()
                          return
                        }
                        this.init();
                      }
                    });
                  }
                }
            })
    },
    // 所有模型名称
    dataList() {
      service.dataList().then(res => {
        debugger      
        var alias = res;
        for(var i =0; i < alias.length; i++){
          this.models.push({"label" : alias[i].name,"value" : alias[i].name})
        }
        this.formInline.source = this.models[0].value;
        this.formInline.target = this.models[0].value;
      })
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
        this.delarr.push(this.multipleSelection[i].name)     
      }
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', { type: 'warning' })
        .then(() => { // 向服务端请求删除
          service.deleteInfoMultiple(this.delarr)
          .then((res) => {
              if(res.type == 0){
                this.$message.success('成功删除了数据!');
                debugger
                if(this.temp.length === length){
                  this.page.pageNum = this.page.pageNum - 1;
                }
                if(this.page.pageNum <= 0){
                  this.page.pageNum = 0;
                }
                if(this.page.value == "SaaS" || this.page.value == "PaaS" || this.page.value == "IaaS" || this.page.value == "Others"){
                  this.queryResourcesParent()
                  return
                }
                if(this.page.value && this.page.value.indexOf('.') != -1){
                  this.queryResourcesParent()
                  return
                }
                this.init();
              }
              if(res.type == 4){
              debugger
              this.$message.error( '所选模型中已有数据存在!');
            }
            })
        })
        .catch(() => {
        this.$message.info('已取消操作!');
      });
    },
    // 单个删除
    deleteInfo(user){
      this.$confirm('此操作将永久删除数据'+ user.name +', 是否继续?', '提示', { type: 'warning' })
        .then(() => {
          debugger
          service.deleteInfo(user).then(res => {
            if(res.type == 0){
              this.$message.success('成功删除了数据' + user.name + '!');
              debugger
              if(this.temp.length ===1){
                this.page.pageNum = this.page.pageNum - 1;
              }
              if(this.page.pageNum <= 0){
                  this.page.pageNum = 0;
                }
              if(this.page.value == "SaaS" || this.page.value == "PaaS" || this.page.value == "IaaS" || this.page.value == "Others"){
                  this.queryResourcesParent()
                  return
              }
              if(this.page.value && this.page.value.indexOf('.') != -1){
                  this.queryResourcesParent()
                  return
              }
              this.init();
            }
            if(res.type == 4){
              debugger
              this.$message.error( '所选模型中已有数据存在!');
            }
          })
        }) 
        .catch(() => {
        this.$message.info('已取消操作!');
      });
    },
    // 初始化数据
    init(){
      debugger
      this.temp = [];
      service.resourcesData(this.page).then(res => {
          debugger
          this.page.totalRecords = parseInt(res.count);
          this.temp = res.datas;
      })
    },
    // 树状点击父类查询
    queryResourcesParent() {
      service.queryResourcesParent(this.page).then(res => {
          debugger
          if(res){
            this.page.totalRecords = parseInt(res.count);
            this.temp = res.datas;
          }
        })
    },
    // 每页显示多少条数据
    sizeChange(val) {
        debugger
        this.page.pageSize = val;
        if(this.page.value == "SaaS" || this.page.value == "PaaS" || this.page.value == "IaaS" || this.page.value == "Others"){
            this.queryResourcesParent()
            return
        }
        if(this.page.value && this.page.value.indexOf('.') != -1){
            this.queryResourcesParent()
            return
        }
        this.init();
    },
    // 翻页
    currentChange(val) {
        debugger
        this.page.pageNum = val-1;
        if(this.page.value == "SaaS" || this.page.value == "PaaS" || this.page.value == "IaaS" || this.page.value == "Others"){
            this.queryResourcesParent()
            return
        }
        if(this.page.value && this.page.value.indexOf('.') != -1){
            this.queryResourcesParent()
            return
        }
        this.init();
    },
  }
}
</script>

<style scoped>
.show{
  display: block;
}
.hide{
  display: none;
}
.el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #fff;
    border-radius: 4px;
    margin-right: 10px;
  }

  .el-main {
    /* background-color: #E9EEF3; */
    /* color: #333; */
    text-align: center;
    line-height: 160px;
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
.search {
    height: 25px;
    width: 260px;
    position: relative;
    float: left;
}
.search input {
    width: 100%;
    height: 100%;
}
header.el-header {
    height: 50px !important;
    line-height: 50px;
}
i.el-icon-search {
  position: absolute;
    top: 15px;
    right: 12px;
}
.operation {
    width: 60%;
    position: relative;
    height: 50px;
    float: right;
    text-align: left;
    font-size: 14px;
    text-align: right;
}
.operation el-button {
    border-radius: 5px;
    border: none;
    padding: 5px;
    /* background: #ccc; */
    margin-left: 10px;
}
.operation .switch {
  font-size: 20px;
}
ul.list {
    font-size: 12px;
}
li.list_itme {
    width: 220px;
    height: 170px;
    border: 1px solid;
    float: left;
    margin-right: 12px;
    margin-bottom: 12px;
}
.list_itme_head {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid;
}
.list_itme_head span {
    float: left;
    padding-left: 10px;
    font-weight: 700;
}
.list_itme_head i {
    float: right;
    padding: 7px;
}
.list_itme_content {
    height: 110px;
    padding: 10px
}
.list_itme_content p {
    height: 30px;
    line-height: 30px;
    text-align: left;
}
.list_itme_foot {
    border-top: 1px solid;
    height: 28px;
    line-height: 28px;
    text-align: left;
}
.list i {
    font-size: 16px;
    font-weight: 700;
}
.list_itme_foot i {
    margin-left: 26px;
    font-size: 16px;
    font-weight: 700;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
.el-dialog__body {
    padding: 15px 20px;
    color: #606266;
    font-size: 14px;
}
.el-form--inline .el-form-item {
    width: 32%;
    text-align: center;
    margin-right: 0;
}

</style>