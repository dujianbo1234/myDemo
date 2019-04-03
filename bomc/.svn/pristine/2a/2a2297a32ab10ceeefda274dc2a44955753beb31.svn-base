<template>
   <div class="">
       <div class="RightRow1">
          <el-card>
          	 <el-form 
          	  :inline="true" 
          	  style="text-align:left;" 
          	  class="demo-form-inline" 
          	  label-position="left" 
          	  label-width="99px" 
          	  size="medium" 
          	  ref="queryForm"
          	  > 
           <div style="margin-bottom: 16px;">
             <span class="search_div">
             <label>模板ID:</label>
               <el-input id="input-test" type="text" v-model.trim="queryParams.template_id" placeholder="请输入模板ID" @keyup.enter.native="query"></el-input>
             </span>
              <span class="search_div">
               <label>采集对象:</label>
               <el-input id="input-test" type="text" v-model.trim="queryParams.collect_obj_id" placeholder="请输入模板ID" @keyup.enter.native="query"></el-input>
             </span>
             <span class="search_div">
               <label>父任务ID:</label>
               <el-input id="input-test" type="text" v-model.trim="queryParams.task_id" placeholder="请输入父任务ID" @keyup.enter.native="query"></el-input>
             </span>
           </div>
           <div>
            <span class="search_div">
             <label>代理ID:</label>
             <el-input id="input-test" type="text" v-model.trim="queryParams.agent_id" placeholder="请输入代理ID" @keyup.enter.native="query"></el-input>
            </span>
             <span class="search_div">
             <label>任务执行结果:</label>
              <el-select :style="selectStyle" v-model="queryParams.exec_result">
                <el-option v-for="item in taskStatus" :key="item.id" :label="item.text" :value="item.id" />
              </el-select>
             </span>
             <el-button style="margin-left: 29px;" class="btn_query" type="success"@click="query">
               <span>查询</span>
            </el-button>
            <el-button class="btn_reset"  @click="reset">
               <span>重置</span>
            </el-button>
             <span class="btn_set" >
                  <i class="el-icon-d-arrow-right btn_rote" style="color: #42B983;"></i>
               </span>
               <span class="btn_set">
                  <i class="el-icon-setting" style="color: #42B983;"></i>
               </span>
           </div>
           
          	<!--  <el-col :span="34" class="rbtn" >
                        <el-form-item label="父任务ID:" class="redItem">
                          <el-input  v-model="queryParams.task_id" placeholder="请输入父任务ID"></el-input>
                        </el-form-item>
                        <el-form-item label="代理ID:" class="redItem">
                          <el-input class="redItem_ipt"  v-model="queryParams.agent_id" placeholder="请输入代理ID"></el-input>
                        </el-form-item>
                        <el-form-item label="任务执行结果:" >
                            <el-select :style="selectStyle" v-model="queryParams.exec_result">
                            <el-option v-for="item in taskStatus" :key="item.id" :label="item.text" :value="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item class="handleBtn">
                            <el-button type="primary" @click.stop="query">查询</el-button>
                            <el-button type="warning" @click.stop="reset">重置</el-button>
                          </el-form-item>
                       </el-col> -->
	        </el-form>
          </el-card>
       </div>
   </div>         
</template>

<script>
   export default {
   	name: "TracktaskHeader",
   	data () {
   	     return {
   	     	 activeName: '',
	   	     taskStatus: [ { id: '',text:"全部"},{ id: true,text:"正常"},{ id: false,text:"异常"}],
	   	     queryParams: {
	   	       exec_result: '',
	           task_id: this.$route.params.task_id || "",
	           agent_id: this.$route.params.agent_id  || "",
             template_id: this.$route.params.template_id || "",
             collect_obj_id: ""
	   	     },
	   	 selectStyle: {
	   	      marginRight: "20px;",
	   	      width: "185px"
	   	 }
   	     }
   	},
   	created () {
             this.activeName = this.$route.name;
   	},
   	mounted () {
          this.query()
            /*this.$route.path = "/taskManage/trackTask"*/
   	},
   	methods: {
   	     query () {
                let reg = new RegExp("[`~!@#%$^&*()=|{}':',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；;：”“'。，、？\u4E00-\u9FA5]", 'g');
                if(reg.test(this.queryParams.template_id)){
                  this.$message.warning("模板名称请勿输入特殊字符、汉字！");
                  return;
                }
                if(reg.test(this.queryParams.task_id)){
                  this.$message.warning("模板名称请勿输入特殊字符、汉字！");
                  return;
                }
                if(reg.test(this.queryParams.agent_id)){
                  this.$message.warning("模板名称请勿输入特殊字符、汉字！");
                  return;
                }
   	          this.$emit('query',this.queryParams)
   	     },
	           reset () {
	                 this.queryParams = {
	                    exec_result: '',
	                    task_id: "",
	                    agent_id: "",
                      template_id: "",
                      collect_obj_id: ""
	                 }
	         }
   	}
}
</script>

<style lang="scss">
  .RightRow1 {
    height: auto;
    margin: 20px 0;
    border-radius: 5px;
    /deep/ .el-form {
      text-align: left;
      margin-bottom: 0px;
    }
  }
   .redItem .el-form-item__label{
       text-align: right
    }
    .redItem .redItem_ipt{
           width: 16.5rem;
    }
   .handleBtn {
        margin-left: 2.8rem
   }
   .search_div {
  margin-right: 15px;
  label {
      width:56px;
      height:14px;
      font-size:14px;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(0,0,0,1);
      line-height:14px;
      opacity:0.7;
  };
  input {
    width:auto;
    height:34px;
    border:1px solid rgba(220,223,230,1);
    border-radius:4px;  
    padding: 0 10px 3px;
    outline:none;
  };
  input::-webkit-input-placeholder{
        color: rgba(0,0,0,1);
        width:98px;
        height:14px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:14px;
        opacity:0.3; 
  };
  input::-moz-placeholder{
        color: rgba(0,0,0,1);
        width:98px;
        height:14px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:14px;
        opacity:0.3;      
      };
  input::-ms-input-placeholder{
        color: rgba(0,0,0,1);
        width:98px;
        height:14px;
        font-size:14px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:14px;
        opacity:0.3;       
      };
}
.btn_set {
  width:40px;
  height:34px;
  background:rgba(66,185,131,0.4);
  border:1px solid rgba(66,185,131,1);
  border-radius:4px;
  display: inline-block;
  padding: 8px 8px 8px 11px;
  cursor: pointer;
}
.btn_rote {
  transform: rotate(90deg);
}
.btn_query {
  width:64px;
  height:34px;
  background:rgba(66,185,131,1);
  border-radius:4px;  
  padding:8px;
  span {
    width:27px;
    height:14px;
    font-size:14px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:14px;
  }
}
.btn_reset {
  width:64px;
  height:34px;
  background:rgba(244,248,249,1);
  border-radius:4px;
  padding:8px;
  span {
    width:28px;
    height:14px;
    font-size:14px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(0,0,0,1);
    line-height:14px;
    opacity:0.7;
  }
}
.search_div /deep/.el-input {
        position: relative;
         display: inline-block;
         width: auto;
  }
</style>