<template>
  <div class="app-container">
    <div class="content_head">
        <h3 class="content_title">资源实例关系</h3>
        <div class="switch_box">
            <i class="switch el-icon-more" @click="show()"/>
            <i class="">|</i>
            <i class="switch el-icon-more-outline" @click="hide()"/>
        </div>
        
    </div>
        <div class="template_tab">
            <template >
              <el-table :data="temp" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="40"/>
                <el-table-column
                  type="index"
                  label="序号"
                  width="50"/>
                <el-table-column
                  prop="task"
                  label="发起端资源"
                  width="180"/>
                <el-table-column
                  prop="name"
                  label="节点关系"
                  width="180"/>
                <el-table-column
                  prop="user"
                  width="180"
                  label="接收端资源"/>
                <el-table-column
                  prop="time"
                  label="创建时间"
                  width="180"/>
                <el-table-column label="操作" width="178">
                  <template slot-scope="scope">
                    <router-link :to="{name:'resourceDetailsLink'}">
                      <i
                        class="el-icon-edit-outline"
                        size="mini"
                        style="margin: 0 5px;font-size: 16px;font-weight: 700;"
                        @click="handleEdit(scope.$index, scope.row)"/>
                    </router-link>
                    <i
                      class="el-icon-delete"
                      size="mini"
                      type="danger"
                      style="margin: 0 5px;font-size: 16px;font-weight: 700;"
                      @click="delete_tab(scope.row)"/>
                  </template>

                </el-table-column>
              </el-table>
            </template>
        </div>
       <el-button type="primary" size="mini" @click="addNode">新增关系</el-button>             
  </div>
</template>

<script>
export default {
  data() {
    return {
      temp:[
           {
            task: '具体资源实例',
            name: '存储连接',
            user: '数据库实例',
            crux: '是',
            time: '2018-1-17 14：00：00',
        }, {
            task: '具体资源实例',
            name: '存储连接',
            user: '数据库实例',
            crux: '是',
            time: '2018-1-17 14：00：00',
        }, {
            task: '具体资源实例',
            name: '存储连接',
            user: '数据库实例',
            crux: '是',
            time: '2018-1-17 14：00：00',
        }, {
            task: '具体资源实例',
            name: '存储连接',
            user: '数据库实例',
            crux: '是',
            time: '2018-1-17 14：00：00',
        }, {
            task: '具体资源实例',
            name: '存储连接',
            user: '数据库实例',
            crux: '是',
            time: '2018-1-17 14：00：00',
        },
      ]
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
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
    addNode() {
        debugger
        this.ruleForm.nodes.push('1');
      },
  }
}
</script>

<style scoped>
.app-container{
    width: 100%
}
h3.content_title {
    height: 30px;
    padding-top: 8px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    margin-bottom: 10px;
}
.template_tab {
    text-align: center;
}
.content_head i {
    font-size: 20px
}
.switch {
    cursor: pointer;
}
.content_head{
    position: relative;
}
.content_head .switch_box{
    position: absolute;
    top: 0px;
    right: 15px;
}
</style>

