<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header>
          <div class="operation">
            <div class="resource_name">
              <el-input v-model="query.code" placeholder="请输入关键字" size="mini"></el-input>
            </div>
            <el-button type="primary" size="mini"> 查询</el-button>
            <el-button type="primary" icon="el-icon-delete" size="mini" class="fr" @click="delAll">删除</el-button>
            
              <!-- <router-link :to="{name:'appResourceLink'}"> -->
                <el-button type="primary" icon="el-icon-plus" size="mini" class="fr">
                设置
                </el-button>
              <!-- </router-link> -->
          </div>
        </el-header>
        <el-main>
          <div class="template_tab">
            <template >
              <el-table :data="temp" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  />
                <el-table-column
                  prop="name"
                  label="自动化发现资源ID"
                  min-width="35%"/>
                <el-table-column
                  prop="code"
                  label="ID"
                  min-width="30%"/>
                <el-table-column
                  prop="user"
                  label="资源类型"
                  min-width="20%"/>
                <el-table-column
                  prop="task"
                  label="发现状态"
                  min-width="20%"/>
                <el-table-column
                  prop="time"
                  label="时间"
                  min-width="40%"/>
                
                <el-table-column label="更多" min-width="20%">
                  <template slot-scope="scope">
                    <!-- <el-button size="mini" @click="delete_tab(scope.row)">{{scope.row.crux}}</el-button> -->
                    <a href="javascript:;" @click="delete_tab(scope.row)">废弃</a>
                    <a href="javascript:;">查看</a>
                    <!-- <i
                      class="el-icon-delete"
                      size="mini"
                      type="danger"
                      style="margin: 0 5px;font-size: 16px;font-weight: 700;"
                      @click="delete_tab(scope.row)"/> -->
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
              :page-sizes="[10, 20, 30, 40]"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.totalRecords">
            </el-pagination>
            <!-- <el-pagination
              @size-change="sizeChange"
              @current-change="currentChange"
              :page-sizes="[10,20,30,40]"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next"
              :total="page.totalRecords">
            </el-pagination> -->
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import Paging from '../../components/Paging'

export default {
  components: {
    // Paging
  },
  data() {
    return {
      query: {
        select: '',
        checked: false,
        name:'',
        code:''
      },
      temp: [],
      page: {
        pageSize: 10, //每页条数,  默认10条
        totalRecords: 7, //总条数
        totalPages: 2, //总页数
        pageNum:0
      },
      multipleSelection: [], //多选的数据
      delarr:[],//存放删除的数据
    }
  },
  mounted(){
  　　this.init() //页面内初始加载就调用这个函数
  },
  methods: {
    filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
    delete_tab(user){
      this.$confirm('此操作将永久删除数据 ' + user.name + ', 是否继续?', '提示', { type: 'warning' })
        .then(() => { // 向服务端请求删除
          this.$http.delete(Main.deleteStudent(user.id,0)).then((response) => {
            this.$message.success('成功删除了数据' + user.name + '!');this.init()})
            .catch((response) => {
              this.$message.error('删除失败!');
            });
        }) .catch(() => {
        this.$message.info('已取消操作!');
      });
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    open4() {
        this.$message.error('您还未选择数据！');
    },
    delAll() {     
      debugger
      const length = this.multipleSelection.length;
      if(length == 0){
          this.open4()
          return;
      }     
      for (let i = 0; i < length; i++) {      
        this.delarr.push(this.multipleSelection[i].PackingId)     
      }
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', { type: 'warning' })
        .then(() => { // 向服务端请求删除
          // this.$http.delete(Main.deleteStudent(user.id,0))
          this.$axios.get("/api/delPackTotalMade.do",{
                params:{
                    delarr:this.delarr
              }
          })
          .then((response) => {
            this.$message.success('成功删除了数据!');
            this.init()
            })
            .catch((response) => {
              this.$message.error('删除失败!');
            });
        }) .catch(() => {
        this.$message.info('已取消操作!');
      });
    },
    init(){
      this.temp = [];
      let {pageNum, pageSize } = this.page; //es6写法
      // pageNum:页数从0开始
      //pageSize:每页显示10条

      // this.$http.get(Main.getStudent(pageNum,pageSize)).then(res =>{
      //   let {errCode,errMsg}=res.data;
      //   this.page.totalRecords=res.data.totalRecords; //总条数
      //   if(errCode==0){
      //     const studentArray=res.data.dataList;
      this.temp=[
          {
          task: '已接收',
          name: '172.165.7.135*DZQD_LE_DBS',
          user: '数据库实例',
          code: 'SW-DBS-ZZZ-005498',
          crux: '还原到该版本',
          time: '2018-1-17  14：00：00',
        }, {
          task: '已接收',
          name: '172.165.7.135*DZQD_LE_DBS',
          user: '数据库实例',
          code: 'SW-DBS-ZZZ-005498',
          crux: '还原到该版本',
          time: '2018-1-17  14：00：00',
        },{
          task: '已接收',
          name: '172.165.7.135*DZQD_LE_DBS',
          user: '数据库实例',
          code: 'SW-DBS-ZZZ-005498',
          crux: '还原到该版本',
          time: '2018-1-17  14：00：00',
        },{
          task: '已接收',
          name: '172.165.7.135*DZQD_LE_DBS',
          user: '数据库实例',
          code: 'SW-DBS-ZZZ-005498',
          crux: '还原到该版本',
          time: '2018-1-17  14：00：00',
        },{
          task: '已接收',
          name: '172.165.7.135*DZQD_LE_DBS',
          user: '数据库实例',
          code: 'SW-DBS-ZZZ-005498',
          crux: '还原到该版本',
          time: '2018-1-17  14：00：00',
        },
      ];
      //   }else{
      //       alert(errMsg);
      //   }
      // }, response => {
      // })
    },
      // 每页显示多少条数据
      sizeChange(val) {
        debugger
        this.page.pageSize = val;
        this.init();
      },
      //翻页
      currentChange(val) {
        debugger
        this.page.pageNum=val-1;
        console.log(this.page.pageNum);
        this.init();
      },
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

