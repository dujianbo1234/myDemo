<template>
  <div class="app-container">
    <div class="content_head">
        <h3 class="content_title">维护日志</h3>
    </div>
        <div class="template_tab">
            <template >
              <el-table :data="temp" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                  type="index"
                  label="序号"
                  width="50"/>
                <el-table-column
                  prop="task"
                  label="操作名称"
                  width="180"/>
                <el-table-column
                  prop="name"
                  label="操作人"
                  width="180"/>
                <el-table-column
                  prop="time"
                  width="280"
                  label="操作时间"/>
                <el-table-column
                  prop="user"
                  label="操作结果"
                  width="180"/>
                <el-table-column label="还原" width="118">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="delete_tab(scope.row)">{{scope.row.crux}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
        </div>
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
      this.$confirm('确定还原' + user.name + ', 是否继续?', '提示', { type: 'warning' })
        .then(() => { // 向服务端请求删除
          this.$http.delete(Main.deleteStudent(user.id,0)).then((response) => {
            this.$message.success('还原成功' + user.name + '!');this.init()})
            .catch((response) => {
              this.$message.error('还原失败!');
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

