<template>
     <div id="main" role="main">
       <el-dialog title="请选择要绑定的角色或用户" :visible.sync="dialogVisible" width="30%">
          <span style="display: inline-block;margin-bottom: 20px;">
            <el-button @click="activeStat = 'role'" :class="{'el-button--primary' : activeStat == 'role'}">绑定角色</el-button>
            <el-button @click="activeStat = 'user'" :class="{'el-button--primary' : activeStat == 'user'}">绑定用户</el-button>
          </span>
          <span>
          <div v-if="activeStat == 'role'">
            请选择角色：
          <el-select v-model="role">
            <el-option v-for="item in roleList" :key="item.roleId" :value="item.roleId" :label="item.roleName"></el-option>
          </el-select>
          </div>
          <div v-if="activeStat == 'user'">
            请选择用户：
          <el-select v-model="user">
            <el-option v-for="item in userList" :key="item.userId" :value="item.userId" :label="item.userName"></el-option>
          </el-select>
          </div>       
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="bindRold">确 定</el-button>
          </span>
      </el-dialog>
          <el-row :gutter="10">
            <el-col :span="8"  v-for="widgetForm in itemList">
              <el-card class="box-card previewCard">
              <div slot="header" class="clearfix">
                <span class="card-name">{{widgetForm.templetName}}</span>
      

  <!-- <el-button type="info" icon="el-icon-message" circle></el-button> -->
  <!-- <el-button type="warning" icon="el-icon-star-off" circle></el-button> -->
  <el-button type="danger" icon="el-icon-delete" circle style="float: right;margin-left:5px;" title="删除模版" @click="deleteTemp(widgetForm.templetId)"></el-button>
  <el-button type="success" icon="el-icon-share" circle style="float: right;margin-left:5px;" title="分配成员" @click="slotMember(widgetForm.templetId)"></el-button>
    <el-button type="primary" icon="el-icon-edit" circle style="float: right;margin-left:5px;" title="重新编辑" @click="transferParameters(widgetForm)"></el-button>
              </div>
              <!-- <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }} -->
                <div style="height: 324px;">
                  <el-scrollbar style="height:100%;">
                    <generate-form :data="JSON.parse(widgetForm.templetJson)" :value="widgetModels" ref="generateForm"></generate-form>
                    </el-scrollbar>
                </div>
             <!-- </div> -->
          </el-card>
            </el-col>
          </el-row>
          <div>
            <router-link :to="{ path: 'making' }">
            <span class="el-icon-circle-plus addButton" title="添加新组件"></span>
          </router-link>
          </div>
        </div>
</template>

<script>
import GenerateForm from '@/components/FromMaking/GenerateForm'
import portalApi  from '@/modules/portal/api/portal'
const dataSource = [{"templetId":1,"templetType":"test","templetName":"test","templetJson":"{\"list\":[{\"type\":\"pieChart\",\"name\":\"饼图\",\"icon\":\"chart-pie\",\"options\":{\"width\":\"100%\",\"defaultValue\":\"\",\"sourceData\":\"pie\",\"dataType\":\"string\",\"sourceApi\":\"\",\"remoteFunc\":\"func_1542783470000_11287\"},\"key\":\"1542783470000_11287\",\"model\":\"pieChart_1542783470000_11287\",\"rules\":[]},{\"type\":\"barChart\",\"name\":\"柱状图\",\"icon\":\"chart-bar\",\"options\":{\"width\":\"100%\",\"defaultValue\":\"\",\"sourceData\":\"bar\",\"dataType\":\"string\",\"sourceApi\":\"\",\"remoteFunc\":\"func_1542783468000_61885\"},\"key\":\"1542783468000_61885\",\"model\":\"barChart_1542783468000_61885\",\"rules\":[{\"type\":\"string\",\"message\":\"柱状图格式不正确\"}]}],\"config\":{\"labelWidth\":100,\"labelPosition\":\"top\"}}","authority":"1","stateFlag":"1"},{"templetId":1,"templetType":"test","templetName":"test","templetJson":"{\"list\":[{\"type\":\"barChart\",\"name\":\"柱状图\",\"icon\":\"chart-bar\",\"options\":{\"width\":\"100%\",\"defaultValue\":\"\",\"sourceData\":\"bar\",\"dataType\":\"string\",\"sourceApi\":\"\",\"remoteFunc\":\"func_1541660425000_72647\"},\"key\":\"1541660425000_72647\",\"model\":\"barChart_1541660425000_72647\",\"rules\":[{\"type\":\"string\",\"message\":\"柱状图格式不正确\"}]}],\"config\":{\"labelWidth\":100,\"labelPosition\":\"top\"}}","authority":"1","stateFlag":"1"},{"templetId":6,"templetType":"string","templetName":"string","templetJson":"{\"list\":[{\"type\":\"barChart\",\"name\":\"柱状图\",\"icon\":\"chart-bar\",\"options\":{\"width\":\"100%\",\"defaultValue\":\"\",\"sourceData\":\"bar\",\"dataType\":\"string\",\"sourceApi\":\"\",\"remoteFunc\":\"func_1541660425000_72647\"},\"key\":\"1541660425000_72647\",\"model\":\"barChart_1541660425000_72647\",\"rules\":[{\"type\":\"string\",\"message\":\"柱状图格式不正确\"}]}],\"config\":{\"labelWidth\":100,\"labelPosition\":\"top\"}}","authority":"string","stateFlag":"string"},{"templetId":7,"templetType":"string","templetName":"string","templetJson":"{\"list\":[{\"type\":\"pieChart\",\"name\":\"饼图\",\"icon\":\"chart-pie\",\"options\":{\"width\":\"100%\",\"defaultValue\":\"\",\"sourceData\":\"pie\",\"dataType\":\"string\",\"remoteFunc\":\"func_1542336863000_48932\"},\"key\":\"1542336863000_48932\",\"model\":\"pieChart_1542336863000_48932\",\"rules\":[{\"type\":\"string\",\"message\":\"饼图格式不正确\"}]}],\"config\":{\"labelWidth\":100,\"labelPosition\":\"top\"}}","authority":"string","stateFlag":"string"},{"templetId":26,"templetType":"string","templetName":"string","templetJson":"{\"list\":[{\"type\":\"barChart\",\"name\":\"柱状图\",\"icon\":\"chart-bar\",\"options\":{\"width\":\"100%\",\"defaultValue\":\"\",\"sourceData\":\"bar\",\"dataType\":\"string\",\"sourceApi\":\"\",\"remoteFunc\":\"func_1541660425000_72647\"},\"key\":\"1541660425000_72647\",\"model\":\"barChart_1541660425000_72647\",\"rules\":[{\"type\":\"string\",\"message\":\"柱状图格式不正确\"}]}],\"config\":{\"labelWidth\":100,\"labelPosition\":\"top\"}}","authority":"string","stateFlag":"string"},{"templetId":27,"templetType":"string","templetName":"string","templetJson":"{\"list\":[{\"type\":\"pieChart\",\"name\":\"饼图\",\"icon\":\"chart-pie\",\"options\":{\"width\":\"100%\",\"defaultValue\":\"\",\"sourceData\":\"pie\",\"dataType\":\"string\",\"remoteFunc\":\"func_1542336863000_48932\"},\"key\":\"1542336863000_48932\",\"model\":\"pieChart_1542336863000_48932\",\"rules\":[{\"type\":\"string\",\"message\":\"饼图格式不正确\"}]}],\"config\":{\"labelWidth\":100,\"labelPosition\":\"top\"}}","authority":"string","stateFlag":"string"}];
const roleList = [{key:'1',value:'99',label:'集团公司'},{key:'2',value:'98',label:'专业公司'},{key:'3',value:'97',label:'省公司'}];
export default {
  name: 'Section',
  components:{GenerateForm},
  data(){
    return{
      itemList : [],
      widgetModels: {},
      dialogVisible: false,
      currentTempId: 0,
      roleList: [],
      userList: [],
      role: '',
      user: '',
      activeStat: 'role'
    }
  },
  mounted(){
    const _this = this;
    this.getTemplate()
     portalApi.roleSch().then(function(res){
      // console.log('ROALlList',res);
      _this.roleList = res;
    })
     portalApi.userSch().then(function(res){
      // console.log('ROALlList',res);
      _this.userList = res;
    })
  },
  methods: {
    getTemplate(){
      const _this = this;
      portalApi.getAllTemplate(999,1).then(function(res){
      // _this.itemList = res;
      _this.itemList = res.filter(item=> item.stateFlag != '-1')
      // _this.itemList = res.filter((item )=> {
      //   console.log(item instanceof Object)
      //   return item.stateFlag != '-1'
      // })
    })
    },
    transferParameters(parame) {
      console.log('transferParameters',parame);
      this.$router.push({
        name:"making",
        params:{//通过query 传递参数
          'data':parame,
        }
      })
    },
    deleteTemp(id){
      const _this = this;
      this.$confirm('此操作将会删除该模版, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          portalApi.delete_template(id,'1').then(function(res){
            // res.code == 200 &&(
            _this.$message({
              type: 'success',
              message: '删除成功!'
            }),_this.getTemplate()
            // )
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    slotMember(id){
      this.currentTempId = id
      this.dialogVisible = true
    },
    bindRold(){
      const ids = this.activeStat == 'role' && this.role || this.activeStat == 'user' && this.user;
      const info = {id:ids,string:this.activeStat} , _this=this
      if( !ids ) return this.$alert('请选择要绑定的角色或用户', '提示', {
          confirmButtonText: '确定'
          }
        );
      this.dialogVisible = false
      portalApi.assign_template(this.currentTempId,info).then(function(res){
            _this.$message({
              type: 'success',
              message: '绑定成功!'
            });
      })
    }
  }
}
</script>


<style rel="stylesheet/css">
.el-dialog__body{
  padding:10px 20px;
}
.el-scrollbar__wrap {
overflow-x: hidden;
}
.addButton{
color: #2b93c9;
    font-size: 40px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor:pointer;
}
.previewCard>div{
  padding:10px 15px !important;
}
.card-name{
  line-height:36px;
}
.previewCard{
  /*width:50%;*/
  margin-top:10px;
}
#main {
    margin-bottom: 20px;
    padding: 10px 20px 0;
}
.product-box li {
    width: 20%;
    height: 90px;
    float: left;
    position: relative;
}
.product-box li .pro-text {
    font-size: 22px;
    position: absolute;
    line-height: 1;
    left: 100px;
    top: 50%;
    color: #0085d1;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
}
.product-box li .pro-text .pro-de {
    font-size: 14px;
    color: #5ca8e5;
}
.product-box li img {
    width: 60px;
    margin-top: 14px;
    margin-left: 23px;
}
.product-box li:active, .product-box li:focus, .product-box li:hover {
    background-color: rgba(8,146,212,.17);
    cursor: pointer;
    border-radius: 4px;
}
.product-box.product-box-offline {
    overflow: hidden;
}
</style>
