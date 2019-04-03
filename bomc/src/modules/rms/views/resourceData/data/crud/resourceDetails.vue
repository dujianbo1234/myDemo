<template>
  <div class="content">
    <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"> -->
      <el-container>
        <el-header class="el_head">
          <h3>{{ciname}}</h3>
          <el-button class="console" @click="open2()" size="mini">关 闭</el-button>
          <span class="model">所属模型：<strong>{{$store.state.resourceManagement.resourceDetails.modelName}}</strong></span>
        </el-header>
        <el-container>
          <el-aside width="140px">
            <el-col :span="12" style="width: 100%; height: 100%;">
              <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen"
                @close="handleClose">
                <router-link :to="{name:'resourceDetailsLink'}">
                  <el-menu-item index="1">
                    <span slot="title">
                      资源详情
                    </span>
                  </el-menu-item>
                </router-link>
                <router-link :to="{name:'topologyLink'}">
                  <el-menu-item index="2">
                    <span slot="title">
                      拓扑展现
                    </span>
                  </el-menu-item>
                </router-link>
                <router-link  v-on:click.native="toLifeCycleLink" to="">
                  <el-menu-item index="3" :disabled = lifeCycleLink>
                    <span slot="title">
                      生命周期状态
                    </span>
                  </el-menu-item>
                </router-link>
                <router-link :to="{name:'workListLink'}">
                  <el-menu-item index="4">
                    <span slot="title">
                      工单信息
                    </span>
                  </el-menu-item>
                </router-link>
                <router-link :to="{name:'maintenanceLogLink'}">
                  <el-menu-item index="5">
                    <span slot="title">
                      维护日志
                    </span>
                  </el-menu-item>
                </router-link>
              </el-menu>
            </el-col>
          </el-aside>
          <el-container>
            <router-view></router-view>
          </el-container>
        </el-container>
      </el-container>
    <!-- </el-form> -->
  </div>
</template>

<script>
 export default {
    created() {
      debugger
      if(this.$store.state.resourceManagement.resourceDetails.type == '物理类'){
          this.lifeCycleLink = false
      }
      this.$nextTick(() => {
          this.ciname = this.$store.state.resourceManagement.resourceDetails.ciname;
      })
    },
    computed: {
        modelType() {
          return this.$store.state.resourceManagement.treeData;
        }
    },
    watch: {
        modelType(val){
          debugger
          if(val == '物理类'){
            this.lifeCycleLink = false
          }
        }
    },
    data() {
      return {
        lifeCycleLink: true,
        ciname: '',
      };
    },
    methods: {
      open2(formName) {
        // this.$confirm('内容还未保存，离开当前页面将导致已填内容丢失，是否确认离开?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
          this.$router.push({path: '/resourceData/data'});
        // }).catch(() => {
                  
        // });
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      toLifeCycleLink(){
        debugger
        if(this.$store.state.resourceManagement.resourceDetails.type == '物理类'){
          this.$router.push({name:'lifeCycleLink'})
        }
      }
    }
  }
</script>

<style scoped>
.content {
  padding: 10px;
  font-size: 14px;
}
.el_head {
  height: 40px !important;
  line-height: 40px;
  border-bottom: 1px solid #cccccc;
}
.console {
    position: absolute;
    top: 10px;
    right: 10px;
}
.model {
  padding: 10px;
  position: absolute;
  top: 0;
  right: 70px;
}
h3.content_title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
}
header.el-header.el_head {
    padding-left: 10px;
}
main.el-main.el_main {
    padding: 8px 15px;
}
.content_main {
    padding: 20px;
    padding-bottom: 0;
}
.edition {
    float: right;
    margin-top: 30px;
    margin-right: 453px;
}
.edition span{
  color: #ccc;
}
.el_foot .el-form-item {
    margin-top: 20px !important;
}
.el_foot {
    height: 50px;
    border-top: 1px solid #ccc;
}
.attr_set_left {
    height: 100%;
    overflow-y: auto;
    width: 30%;
    display: inline-block;
}
.attr_set_left li {
    margin-top: 15px;
}
.attr_set_left li i {
    float: right;
    font-weight: 700;
    font-size: 18px;
    color: #aaa;
    margin-right: 28px;
}
.attr_set_right {
    width: 50%;
    display: inline-block;
    height: 100%;
    vertical-align: top;
    margin-left: 40px;
}
.attr_set_right p {
    margin-top: 15px;
}
.attr_set_right p input {
    margin-left: 30px;
}
.attr_set_right p label {
    font-weight: 400 !important;
}
.el-form-item__label {
    font-weight: 400 !important;
}
.content_col {
  width: 30%;
  display: inline-block;
}
.el-form-item {
  margin-top: 0;
}




.el-menu {
    height: 100%;
}
</style>

