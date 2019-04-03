<template>
  <div class="app-container">
    <div class="content_head">
        <h3 class="content_title">生命周期操作</h3>
        
        <div class="switch_box">
          <el-button type="primary" size="mini" class="fr" @click="addlifeCycle()">新增生命周期</el-button>
        </div>
    </div>
    <el-main>
      <ul class="list">
        <li v-for="(itme,index) in temp" :key="index" class="list_itme">
          <div class="list_itme_head">
            <span>{{ itme.state }}</span> <i>{{'周期' + index}}</i>
          </div>
          <div class="list_itme_content">
            <p>创建时间：<span>{{ itme.last_update_time|formatTime('YMDHMS')}}</span></p>
            <p>创建人：<span>{{ itme.last_update_staff }}</span></p>
            <p>应用位置：<span>{{ itme.influence_area }}</span></p>
            <p>工单号：<span>{{ itme.last_update_time }}</span></p>
          </div>
          
        </li>
      </ul>
    </el-main>  
    <el-dialog title="新增生命周期状态" :visible.sync="dialogFormVisible" width = "35%">
        <el-form :model="addTemp" :rules="rules" ref="addTemp" label-width="120px" class="demo-temp">
            <el-form-item label="资源ID：">
                <el-input v-model="addTemp.ciid" disabled = disabled size="mini"></el-input>
            </el-form-item>
            <el-form-item label="配置管理员："> 
                <el-input v-model="addTemp.manager" disabled = disabled size="mini"></el-input>
            </el-form-item>
            <el-form-item label="状态调整为：" prop="state">
                <el-select v-model="addTemp.state" placeholder="请选择状态" size="mini">
                  <el-option label="已接收" value="已接收"></el-option>
                  <el-option label="已部署" value="已部署"></el-option>
                  <el-option label="测试中" value="测试中"></el-option>
                  <el-option label="使用中" value="使用中"></el-option>
                  <el-option label="维护中" value="维护中"></el-option>
                  <el-option label="已下线" value="已下线"></el-option>
                  <el-option label="报废" value="报废"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="资源名称：" prop="ciname">
                <el-input v-model="addTemp.ciname" size="mini" disabled = disabled></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('addTemp')" :disabled = isDisable>确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import * as service from '@/modules/rms/api/data/crud/lifeCycle.js';
export default {
  created() {
      debugger
      if(!this.$store.state.resourceManagement.resourceDetails){
        debugger
        this.$router.push({path: '/resourceData/data'});
      }else{
        this.models.model = this.$store.state.resourceManagement.resourceDetails.modelName;
        this.models.id = this.$store.state.resourceManagement.resourceDetails.ciid;
        this.init() //页面内初始加载就调用这个函数
      }
  },
  mounted(){
      debugger
  },  
  data() {
    return {
      temp:{}, // 所有数据
      models:{}, // 用于查询传值
      dialogFormVisible: false,
      isDisable: false,
      addTemp:{}, //新增周期数据
      rules: {
          ciname: [
            { required: true, message: '请输入资源名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ],
      }
    }
  },
  methods: {
    // 初始化数据
    init(){
      debugger
      this.temp = {};
      this.isDisable = false;
      service.lifeCycleData(this.models).then(res => {
          debugger
          if(!res.datas.History){
            this.temp = []
          }else{
            this.temp = res.datas.History;
          }
          this.temp.push(this.$store.state.resourceManagement.resourceDetails);
      })
    },
    // 新增生命周期
    addlifeCycle() {
        debugger
        this.addTemp = JSON.parse(JSON.stringify(this.$store.state.resourceManagement.resourceDetails));
        this.dialogFormVisible = true;
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            debugger
            
        if (valid) {
            if(this.addTemp.state === this.$store.state.resourceManagement.resourceDetails.state){
                this.dialogFormVisible = false;
                return
            } 
            this.isDisable = true;
            service.addLifeCycleData(this.models,this.addTemp).then(res => {
                  if(res.type == 0){
                    this.dialogFormVisible = false;
                    this.addTemp.type = this.$store.state.resourceManagement.resourceDetails.type;
                    this.$store.dispatch('resourceDetails', this.addTemp);
                    service.conditionQuery(this.models).then(res => {
                        debugger
                        this.$store.state.resourceManagement.resourceDetails.last_update_time = res.datas[this.models.model][0].last_update_time;
                        this.$alert('添加成功', '消息提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            this.init();
                            }
                        });
                    })
                    
                  }
              })
          } else {
            return false;
          }
        });
    },
    open4() {
        this.$message.error('您还未选择数据！');
    },
  }
}
</script>

<style scoped>
.app-container{
    width: 100%
}
h3.content_title {
    height: 35px;
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
    padding-right: 8px;
    font-size: 12px !important;
    font-style: normal;
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
    margin-left: 30px;
}
</style>

