<template>
  <div>
    <!-- 自定义模板详情 /修改-->
      <div v-if="customizeDialog" class="logAdd-dialog">
      	<div class="details-title" style="margin:0">
        <el-form :inline="true" :model="selectData" class="demo-form-inline" label-position="right" label-width="80px" size="medium" ref="customize" style="text-align:left;">
         <span class="sp"><span>模板详情</span></span>
         <div class="logAdd-obj">
          <div class="log_div">
          	<span style="margin-left: 1rem;">
          		<label>模板名称:</label>
                 <input :disabled="detail_disabled" v-model="selectData.template_name">
          	</span>
          	<span style="margin-left: 3rem;">
          		<label>资源类型:</label>
                <input :title="selectData.resource_type" :disabled="detail_disabled" v-model="selectData.resource_type">
          	</span>
          </div>
          <div>
          	<label style="margin-left: 2.8rem;">分组:</label>
            <input :disabled="d_disabled" v-model="selectData.group">
            <label style="margin-left: 3.1rem;">使用代理:</label>
            <span v-if="selectData.is_agent">是</span>
            <span v-if="!selectData.is_agent">否</span>
          </div>
          <div class="log_div">
          	<label style="margin-left: 2.8rem;">描述:</label>
            <textarea style="width: 68%;max-height:67px;overflow-y: auto;vertical-align: top;border: none;background: none;" :disabled="d_disabled" v-model="selectData.description"></textarea>
          </div>
        </div>
        <span class="sp"><span>自定义信息</span></span>
         <div class="logAdd-obj">
           <div class="log_div">
               <span style="margin-left: 1rem;">
          		<label>用户名:</label>
                 <input :disabled="detail_disabled" v-model="selectData.template_content.userName">
          	   </span>
          	   <span v-if="visible" style="margin-left: 2rem;">
               <!--  <el-form-item v-if="visible" label="密码:" prop="passWord">
               <el-input type="password" v-model="selectData.passWord">
                 <i slot="suffix" @click="changePass('show')" class="el-icon-view icon_pass" v-if="selectData.passWord"></i>
               </el-input>
                             </el-form-item>
                              <el-form-item v-else label="密码:" prop="passWord">
               <el-input type="text" v-model="selectData.passWord">
                 <svg-icon slot="suffix" :icon-class="'eye'" @click.native.stop="changePass('hide')" class="icon_pass">
                 </svg-icon>
               </el-input>
                             </el-form-item> -->
          		<label>密码:</label>
                                 <input  type="password" :disabled="detail_disabled" v-model="selectData.template_content.passWord">
                                 <i slot="suffix" title="显示密码" @click="changePass('show')" style="cursor:pointer;" class="el-input__icon iconfont icon-xianshi"></i>
                               </span>
                                <span v-else="visible" style="margin-left: 4.5rem;">
                <label>密码:</label>
                                 <input  type="password" :disabled="detail_disabled" v-model="selectData.template_content.passWord">
                                 <i slot="suffix" title="显示密码" @click="changePass('hide')" style="cursor:pointer;" class="el-input__icon iconfont icon-yincang"></i>
                               </span>     
           </div>
         <!--  <el-form-item v-if="visible" label="密码" prop="passWord">
           <el-input :disabled="detail_disabled" type="password" v-model="selectData.template_content.passWord">
             <i slot="suffix" title="显示密码" @click="changePass('show')" style="cursor:pointer;" class="el-input__icon iconfont icon-xianshi"></i>
           </el-input>
         </el-form-item>
         <el-form-item v-else label="密码" prop="passWord">
           <el-input :disabled="detail_disabled" type="password" v-model="selectData.template_content.passWord">
             <i slot="suffix" title="隐藏密码" @click="changePass('hide')" style="cursor:pointer;" class="el-input__icon iconfont icon-yincang"></i>
           </el-input>
         </el-form-item> -->
           </div>
        </el-form>
    </div>
      <div class="details-title">
        <span class="sp"><span>采集指标</span></span>
        <div class="logAdd-obj" style="background: none">
        <el-form :inline="true" class="demo-form-inline" label-position="right" label-width="100px" size="medium">
          <div class="search_input" style="padding: 14px 0">
          	   <span style="margin-left: 1rem;">
          		<label>指标名称:</label>
                 <input style="width:260px;height:34px;border-radius:4px;border:1px solid rgba(220,223,230,1);outline: none;padding: 0 6px;" placeholder="请输入指标名称" v-model="search_customize">
          	   </span>
           <!--  <el-form-item style="margin: 0;">
             <el-input v-model="search_customize" placeholder="请输入指标名称"></el-input>
           </el-form-item> -->
          </div>
          <el-table 
             ref="multipleTable1" 
             :data="filterCustomizedata" 
             tooltip-effect="dark" 
             border 
             :header-cell-style="rowClass"
          >
          <!--   <el-table-column type="selection" width="55" :selectable="selectable">
          </el-table-column> -->
             <el-table-column prop="kpi" label="CODE">
            </el-table-column>
            <el-table-column prop="alias" label="采集指标名称">
            </el-table-column>
            <el-table-column prop="frequency" label="采集频率">
            </el-table-column>
            <el-table-column prop="relation" label="关联的指标">
            </el-table-column>
            <el-table-column prop="cmd" label="执行的命令">
              <template slot-scope="scope">
                <el-input :disabled="detail_disabled" size="small" v-model="scope.row.cmd" placeholder="请输入命令"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
    </div>
  </div>
</div>
    <!-- 数据库模板详情 /修改-->
      <div v-if="databaseDialog" class="logAdd-dialog">
      	<div class="details-title" style="margin:0">
        <el-form :inline="true" :model="selectData" class="demo-form-inline" label-position="right" label-width="80px" size="medium" ref="database">
         <span class="sp" v-if="statu!=1"><span>基本信息</span></span>
        	 <div class="logAdd-obj">
	          <div class="log_div">
		          	<span style="margin-left: 1rem;">
		          		<label>模板名称:</label>
		                 <input :disabled="detail_disabled" v-model="selectData.template_name">
		          	</span>
		          	<span style="margin-left: 3rem;">
		          		<label>资源类型:</label>
		                <input :title="selectData.resource_type" :disabled="detail_disabled" v-model="selectData.resource_type">
		          	</span>
		      </div>
		          <div>
		          	<label style="margin-left: 2.8rem;">分组:</label>
		            <input :disabled="d_disabled" v-model="selectData.group">
		            <label style="margin-left: 3.1rem;">使用代理:</label>
		            <span v-if="selectData.is_agent">是</span>
		            <span v-if="!selectData.is_agent">否</span>
		          </div>
		          <div class="log_div">
		          	<label style="margin-left: 2.8rem;">描述:</label>
		            <textarea style="width: 68%;max-height:67px;overflow-y: auto;vertical-align: top;border: none;background: none;" :disabled="d_disabled" v-model="selectData.description"></textarea>
		          </div>
            </div>
          <span class="sp"><span>JMX接口信息</span></span>
          <div class="logAdd-obj">
	          <div class="log_div">
	               <span style="margin-left: 1rem;">
	          		<label>用户名:</label>
	                 <input :disabled="detail_disabled" v-model="selectData.template_content.userName">
	          	   </span>
	          	   <span v-if="visible" style="margin-left: 2rem;">
	          		<label>密码:</label>
	                 <input  type="password" :disabled="detail_disabled" v-model="selectData.template_content.passWord">
	                 <i slot="suffix" title="显示密码" @click="changePass('show')" style="cursor:pointer;" class="el-input__icon iconfont icon-xianshi"></i>
	          	   </span>
	          	    <span v-else="visible" style="margin-left: 4.5rem;">
	          		<label>密码:</label>
	                 <input  type="password" :disabled="detail_disabled" v-model="selectData.template_content.passWord">
	                 <i slot="suffix" title="显示密码" @click="changePass('hide')" style="cursor:pointer;" class="el-input__icon iconfont icon-yincang"></i>
	          	   </span> 
	          	   <div style="margin-left: 1.9rem;">
	          		<label>端口:</label>
	                 <input :disabled="detail_disabled" v-model="selectData.template_content.port">
	          	   </div>    
	           </div>
          </div>
        </el-form>
     </div>
    <div class="details-title">
     <span class="sp"><span>采集指标</span></span>
      <div class="logAdd-obj" style="background: none">
        <el-form :inline="true" class="demo-form-inline" label-position="right" label-width="100px" size="medium">
           <div class="search_input" style="padding: 14px 0">
          	   <span style="margin-left: 1rem;">
          		<label>指标名称:</label>
                 <input style="width:260px;height:34px;border-radius:4px;border:1px solid rgba(220,223,230,1);outline: none;padding: 0 6px;" placeholder="请输入指标名称" v-model="search_middleware">
          	   </span>
           <!--  <el-form-item style="margin: 0;">
             <el-input v-model="search_customize" placeholder="请输入指标名称"></el-input>
           </el-form-item> -->
          </div>
          <el-table 
             ref="multipleTable1" 
             :data="filterMiddlewaredata" 
             tooltip-effect="dark" 
             border 
             :header-cell-style="rowClass"
          >
          <!--   <el-table-column type="selection" width="55" :selectable="selectable">
          </el-table-column> -->
             <el-table-column prop="kpi" label="CODE">
            </el-table-column>
            <el-table-column prop="alias" label="采集指标名称">
            </el-table-column>
            <el-table-column prop="frequency" label="采集频率">
            </el-table-column>
            <el-table-column prop="relation" label="关联的指标">
            </el-table-column>
          </el-table>
            <!-- <el-pagination align="right" background @size-change="metSizeChange" @current-change="metCurrentChange" :current-page="metPage.currentPage" :page-sizes="[2,5]" :page-size="metPage.pageSize"  layout="total, sizes, prev, pager, next, jumper" :total="filterMiddlewaredata.totalItems" :pager-count="5">
            </el-pagination> -->
        </el-form>
      </div>
  </div>
  </div>
    <!-- 日志模板详情-->
      <div v-if="logDialog"class="logAdd-dialog">
      	<div class="details-title" style="margin:0">
        <el-form :inline="true" :model="selectData" class="demo-form-inline" label-position="right" label-width="100px" size="medium" ref="log">
          <span class="sp"v-if="statu!=1"><span>基本信息</span></span>
          <div class="logAdd-obj">
	          <div class="log_div">
		          	<span style="margin-left: 1rem;">
		          		<label>模板名称:</label>
		                 <input :disabled="detail_disabled" v-model="selectData.template_name">
		          	</span>
		          	<span style="margin-left: 3rem;">
		          		<label>资源类型:</label>
		                <input :title="selectData.resource_type" :disabled="detail_disabled" v-model="selectData.resource_type">
		          	</span>
		      </div>
		          <div>
		          	<label style="margin-left: 2.8rem;">分组:</label>
		            <input :disabled="d_disabled" v-model="selectData.group">
		            <label style="margin-left: 3.1rem;">使用代理:</label>
		            <span v-if="selectData.is_agent">是</span>
		            <span v-if="!selectData.is_agent">否</span>
		          </div>
		          <div class="log_div">
		          	<label style="margin-left: 2.8rem;">描述:</label>
		            <textarea style="width: 68%;max-height:67px;overflow-y: auto;vertical-align: top;border: none;background: none;" :disabled="d_disabled" v-model="selectData.description"></textarea>
		          </div>
            </div>
            <div class="details-title">
		       <span class="sp"><span>日志文件</span></span>
		        <div class="details-obj">
		          <div class="details-log">
		            <div class="tab_left">
		              <ul>
		                <li>实时文件名称</li>
		                <li v-for="(s,index) in selectData.template_content" :class="{'is-active':logIndex === index}" @click="logIndex=index">{{s.file}}</li>
		              </ul>
		            </div>
		            <div class="tab_right">
		              <ul>
		                <li>文件详情</li>
		              </ul>
		              <el-scrollbar style="height:235px;">
		                <el-form :inline="true" :model="selectData" class="demo-form-inline" label-position="right" label-width="120px" size="mini" style="text-align:left;">
		                  <el-form-item label="实时文件名称:">
		                    {{selectData.template_content[logIndex].file}}
		                  </el-form-item>
		                  <el-form-item label="实时文件路径:">
		                    {{selectData.template_content[logIndex].fileDir}}
		                  </el-form-item>
		                  <el-form-item label="历史文件名称:">
		                    {{selectData.template_content[logIndex].historyFile}}
		                  </el-form-item>
		                  <el-form-item label="历史文件路径:">
		                    {{selectData.template_content[logIndex].historyFileDir}}
		                  </el-form-item>
		                  <el-form-item label="文件初始编号:">
		                    {{selectData.template_content[logIndex].initFileNum}}
		                  </el-form-item>
		                  <el-form-item label="过滤内容规则:">
		                    {{selectData.template_content[logIndex].filterContentRule}}
		                  </el-form-item>
		                  <el-form-item label="解析日志规则:">
		                    <span>{{selectData.template_content[logIndex].analysisLogRule}}</span>
		                  </el-form-item>
		                  <el-form-item label="采集起始时间:">
		                    {{selectData.template_content[logIndex].firstCollectionTime | dateFilter('yyyy-MM-dd')}}
		                  </el-form-item>
		                  <el-form-item label="从采集起始时间开始采集:" class="longItem">
		                    <el-checkbox v-model="selectData.template_content[logIndex].eraseStatus" disabled></el-checkbox>
		                  </el-form-item>
		                  <el-form-item label="性能日志:" v-show="selectData.template_content[logIndex].isAlarmLog">
		                    {{selectData.template_content[logIndex].isAlarmLog}}
		                  </el-form-item>
		                  <div v-show="selectData.template_content[logIndex].isAlarmLog">
		                    <span v-for="(item,index) in selectData.template_content[logIndex].map" class="sp">
		                        <el-form-item label="指标管理的指标:">
		                          {{item.kpi}}
		                        </el-form-item>
		                        <el-form-item label="日志中的Key:">
		                          {{item.key}}
		                        </el-form-item>
		                      </span>
		                  </div>
		                </el-form>
		              </el-scrollbar>
		            </div>
		          </div>
		        </div>
		      </div>   
        </el-form>
    </div>
  </div>
    <!-- 中间件模板详情 /修改-->
      <div v-if="middlewareDialog"class="logAdd-dialog">
      	<div class="details-title" style="margin:0">
        <el-form :inline="true" :model="selectData" class="demo-form-inline" label-position="right" label-width="80px" size="medium" ref="middleware">
         <span class="sp"v-if="statu!=1"><span>基本信息</span></span>
        	 <div class="logAdd-obj">
	          <div class="log_div">
		          	<span style="margin-left: 1rem;">
		          		<label>模板名称:</label>
		                 <input :disabled="detail_disabled" v-model="selectData.template_name">
		          	</span>
		          	<span style="margin-left: 3rem;">
		          		<label>资源类型:</label>
		                <input :title="selectData.resource_type" :disabled="detail_disabled" v-model="selectData.resource_type">
		          	</span>
		      </div>
		          <div>
		          	<label style="margin-left: 2.8rem;">分组:</label>
		            <input :disabled="d_disabled" v-model="selectData.group">
		            <label style="margin-left: 3.1rem;">使用代理:</label>
		            <span v-if="selectData.is_agent">是</span>
		            <span v-if="!selectData.is_agent">否</span>
		          </div>
		          <div class="log_div">
		          	<label style="margin-left: 2.8rem;">描述:</label>
		            <textarea style="width: 68%;max-height:67px;overflow-y: auto;vertical-align: top;border: none;background: none;" :disabled="d_disabled" v-model="selectData.description"></textarea>
		          </div>
            </div>
          <span class="sp"><span>JMX接口信息</span></span>
          <div class="logAdd-obj">
	          <div class="log_div">
	               <span style="margin-left: 1rem;">
	          		<label>用户名:</label>
	                 <input :disabled="detail_disabled" v-model="selectData.template_content.userName">
	          	   </span>
	          	   <span v-if="visible" style="margin-left: 2rem;">
	          		<label>密码:</label>
	                 <input  type="password" :disabled="detail_disabled" v-model="selectData.template_content.passWord">
	                 <i slot="suffix" title="显示密码" @click="changePass('show')" style="cursor:pointer;" class="el-input__icon iconfont icon-xianshi"></i>
	          	   </span>
	          	    <span v-else="visible" style="margin-left: 4.5rem;">
	          		<label>密码:</label>
	                 <input  type="password" :disabled="detail_disabled" v-model="selectData.template_content.passWord">
	                 <i slot="suffix" title="显示密码" @click="changePass('hide')" style="cursor:pointer;" class="el-input__icon iconfont icon-yincang"></i>
	          	   </span> 
	          	   <div style="margin-left: 1.9rem;">
	          		<label>端口:</label>
	                 <input :disabled="detail_disabled" v-model="selectData.template_content.port">
	          	   </div>    
	           </div>
          </div>
        </el-form>
     </div>
     <div class="details-title">
     <span class="sp"><span>采集指标</span></span>
      <div class="logAdd-obj" style="background: none">
        <el-form :inline="true" class="demo-form-inline" label-position="right" label-width="100px" size="medium">
           <div class="search_input" style="padding: 14px 0">
          	   <span style="margin-left: 1rem;">
          		<label>指标名称:</label>
                 <input style="width:260px;height:34px;border-radius:4px;border:1px solid rgba(220,223,230,1);outline: none;padding: 0 6px;" placeholder="请输入指标名称" v-model="search_middleware">
          	   </span>
           <!--  <el-form-item style="margin: 0;">
             <el-input v-model="search_customize" placeholder="请输入指标名称"></el-input>
           </el-form-item> -->
          </div>
          <el-table 
             ref="multipleTable1" 
             :data="filterMiddlewaredata" 
             tooltip-effect="dark" 
             border 
             :header-cell-style="rowClass"
          >
          <!--   <el-table-column type="selection" width="55" :selectable="selectable">
          </el-table-column> -->
             <el-table-column prop="kpi" label="CODE">
            </el-table-column>
            <el-table-column prop="alias" label="采集指标名称">
            </el-table-column>
            <el-table-column prop="frequency" label="采集频率">
            </el-table-column>
            <el-table-column prop="relation" label="关联的指标">
            </el-table-column>
          </el-table>
        </el-form>
      </div>
  </div>
  </div>
    <!-- 平台资源模板详情 /修改-->
      <div v-if="platformDialog"class="logAdd-dialog">
      	<div class="details-title" style="margin:0">
        <el-form :inline="true" :model="selectData" class="demo-form-inline" label-position="right" label-width="80px" size="medium" ref="platform">
         <span class="sp"v-if="statu!=1"><span>基本信息</span></span>
        	 <div class="logAdd-obj">
	          <div class="log_div">
		          	<span style="margin-left: 1rem;">
		          		<label>模板名称:</label>
		                 <input :disabled="detail_disabled" v-model="selectData.template_name">
		          	</span>
		          	<span style="margin-left: 3rem;">
		          		<label>资源类型:</label>
		                <input :title="selectData.resource_type" :disabled="detail_disabled" v-model="selectData.resource_type">
		          	</span>
		      </div>
		          <div>
		          	<label style="margin-left: 2.8rem;">分组:</label>
		            <input :disabled="d_disabled" v-model="selectData.group">
		            <label style="margin-left: 3.1rem;">使用代理:</label>
		            <span v-if="selectData.is_agent">是</span>
		            <span v-if="!selectData.is_agent">否</span>
		          </div>
		          <div class="log_div">
		          	<label style="margin-left: 2.8rem;">描述:</label>
		            <textarea style="width: 68%;max-height:67px;overflow-y: auto;vertical-align: top;border: none;background: none;" :disabled="d_disabled" v-model="selectData.description"></textarea>
		          </div>
            </div>
        </el-form>
     </div>
      <div class="details-title">
     <span class="sp"><span>采集指标</span></span>
      <div class="logAdd-obj" style="background: none">
        <el-form :inline="true" class="demo-form-inline" label-position="right" label-width="100px" size="medium">
           <div class="search_input" style="padding: 14px 0">
          	   <span style="margin-left: 1rem;">
          		<label>指标名称:</label>
                 <input style="width:260px;height:34px;border-radius:4px;border:1px solid rgba(220,223,230,1);outline: none;padding: 0 6px;" placeholder="请输入指标名称" v-model="search_platform">
          	   </span>
           <!--  <el-form-item style="margin: 0;">
             <el-input v-model="search_customize" placeholder="请输入指标名称"></el-input>
           </el-form-item> -->
          </div>
          <el-table 
             ref="multipleTable1" 
             :data="filterPlatformdata" 
             tooltip-effect="dark" 
             border 
             :header-cell-style="rowClass"
          >
          <!--   <el-table-column type="selection" width="55" :selectable="selectable">
          </el-table-column> -->
             <el-table-column prop="kpi" label="CODE">
            </el-table-column>
            <el-table-column prop="alias" label="采集指标名称">
            </el-table-column>
            <el-table-column prop="frequency" label="采集频率">
            </el-table-column>
            <el-table-column prop="relation" label="关联的指标">
            </el-table-column>
          </el-table>
        </el-form>
      </div>
     </div>
  </div>
    <!-- 指标详情-->
      <!-- <div v-if="quotaDialog">
        <el-form :inline="true" :model="selectList" class="demo-form-inline" label-position="right" label-width="120px" size="medium" ref="selectList">
          <el-form-item label="实时文件名称">
            <el-input v-model="selectList.file" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="实时文件路径">
            <el-input v-model="selectList.fileDir" :disabled="true"></el-input>
          </el-form-item>
           <el-form-item label="历史文件名称">
            <el-input v-model="selectList.historyFile" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="历史文件路径">
            <el-input v-model="selectList.historyFileDir" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="数据缓存路径">
            <el-input v-model="selectList.dataDirs" :disabled="true"></el-input>
          </el-form-item>
           <el-form-item label="检查点存放路径">
            <el-input v-model="selectList.checkPointDir" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="文件初始编号">
            <el-input v-model="selectList.initFileNum" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="过滤内容规则">
            <el-input v-model="selectList.filterContentRule" :disabled="true"></el-input>
          </el-form-item>
            <el-form-item label="解析日志规则">
              <el-input v-model="selectList.analysisLogRule" :disabled="true"></el-input>
            </el-form-item>
            <div>
             <el-form-item style='margin-left: 1.8rem;'>
                <label style="width:217px;">从采集起始时间开始采集</label>
                <el-checkbox v-model="selectList.eraseStatus" :disabled="true"></el-checkbox>
              </el-form-item>
               <el-form-item>
                <div class="block" style="margin:0;margin-left: 154px;">
                  <label style="margin-right: 10px">起始时间</label>
                  <el-date-picker v-model="selectList.firstCollectionTime" style=" width: 187px;" type="date" :disabled="true" placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
              </div>
            <el-form-item label="性能日志">
              <el-checkbox v-model="!selectList.isAlarmLog" :disabled="true"></el-checkbox>
            </el-form-item>
          <div v-show="!selectList.isAlarmLog">
            <span v-for="item in selectList.map">
               <el-form-item label="指标管理的指标">
                <el-input v-model="item.kpi" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="日志中的Key">
                <el-input v-model="item.key" :disabled="true"></el-input>
              </el-form-item>
            </span>
          </div>
        </el-form>
      <div slot="footer" class="dialog-footer" align='center'>
        <el-button @click="quotaDialog=false">关闭 </el-button>
      </div>
        </div> -->
</div>
</template>
<script>
export default {
  name: "Clog",
  props: {
    type: [ String,Number ],
    selectData: Object,
    quotaData: Object,
    statu: [ String,Number ]
  },
  data() {
    return {
      d_disabled: true,
      detail_disabled: true,
      checked:true,
      visible: true,
      customizeDialog: false,
      databaseDialog: false,
      logDialog: false,
      middlewareDialog: false,
      platformDialog: false,
      quotaDialog: false,
      selectList: {},
      //搜索字段
      search_platform: "",
      search_middleware: "",
      search_customize: "",
      logIndex: 0,
      visible: true
    }
  },
  mounted() {
    this[this.type + 'Dialog'] = true;
    console.log(this.quotaData);
    console.log(this.selectData);
  },
  watch:{
    statu(n) {
       this.statu = n 
    },
    type(n) {
      this.getSrcList(n)
    }
  },
  computed: {
       filterPlatformdata () {
              if(this.quotaData.template_content && !this.quotaData.template_content.templateKpiInners && !this.quotaData.template_content.templateCmdInners){
                 var data = this.quotaData.template_content
                  return data.filter( (item) => {
                       if(item.alias){
                             return item.alias.match(this.search_platform)
                       }
                  } )
              }
       },
       filterMiddlewaredata () {
        if(this.quotaData.template_content && this.quotaData.template_content.templateKpiInners && !this.quotaData.template_content.templateCmdInners){
               var data = this.quotaData.template_content.templateKpiInners
              return data.filter( (item) => {
                   if(item.alias){
                         return item.alias.match(this.search_middleware)
                      }
                 } )
             }
       },
       filterCustomizedata () {
            if(this.quotaData.template_content && !this.quotaData.template_content.templateKpiInners && this.quotaData.template_content.templateCmdInners){
                   var data = this.quotaData.template_content.templateCmdInners
                   return data.filter( (item) => {
                   if(item.alias){
                         return item.alias.match(this.search_customize)
                    }
                } )
            }
       }
  },
  methods: {
    changePass(value) {
      this.visible = !(value === 'show');
    },
  	getSrcList(type){
  	   let types = ['platform', '', 'middleware', 'log', 'database', 'customize'];
  	   if( type ) {
	  	  for(var i=0;i<types.length;i++){
	  	  	 if( type == types[i] ) {
	  	  	 	this[types[i] + 'Dialog'] = true;
	  	  	 }else {
	  	  	 	this[types[i] + 'Dialog'] = false;
	  	  	 }
	  	  }
  	   }
  	},
    close(){
      let types = ['platform', '', 'middleware', 'log', 'database', 'customize'];
       for(var i=0;i<types.length;i++){
           this[types[i] + 'Dialog'] = false;
        }  
    },
    selectable(row, index) {
      if (row) {
        return false;
      }
    },
    headerClass({ row, rowIndex }) {
      return "textAlign:center;color:rgba(102,102,102,1);font-weight:800;font-size:14px;";
    },
    rowClass({ row, rowIndex }) {
      return "textAlign:center;background:rgba(244,248,249,1);";
    },
    changePass(value) {
      this.visible = !(value === 'show');
    },
    details(row) { 
      this.selectList = row;
      this.quotaDialog = true;
    }
  }
}

</script>
<style scoped lang="scss">
.details-title {
  margin-bottom: 20px;

  .sp {
    display: inline-block;
    height: 20px;
    color: #42B983;
    font-weight: bold;
    margin-top: 10px;

    span {
      padding-left: 10px;
      border-left: 3px solid #42B983;
    }

    i {
      padding-left: 10px;
    }
  }
}
.logAdd-dialog /deep/ {
  .des {
    width: 100%;

    .el-form-item__content {
      width: 85%;
    }
  }

.logAdd-obj {
    width:auto;
	height:auto;
	background:rgba(244,248,249,1);
	border-radius:4px;
	label {
		width:70px;
		height:20px;
		font-size:14px;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(0,0,0,0.4);
		line-height:20px;
	};
	input {
		width:auto;
		height:20px;
		font-size:14px;
		background: none;
		border: none;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(0,0,0,0.7);
		line-height:20px;
	};
	.log_div {
		padding: 14px 0;
	};
  }
 .search_input {
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
	}
  .logAdd-form /deep/ {
    .el-input {
      width: 80%;
    }

    .el-tabs--border-card {
      box-shadow: none;
    }

    .nbtns {
      text-align: right;
      margin-left: 120px;

      .nbtn {
        background: rgba(66, 185, 131, 0.30);
        border: 1px solid #42B983;
        color: #42b983;

        &:hover {
          background: rgba(66, 185, 131, 0.60);
        }
      }
    }

    .tab-pane1 {
      margin: 0 56px;

      .nbtns /deep/.el-form-item__content {
        margin-right: calc(100% * 0.2);

      }
    }

    .tab-pane2 {

      .el-input,
      .el-textarea {
        width: 90%;
      }

      .nbtns {
        /deep/.el-form-item__content {
          margin-right: calc(100% * 0.1);
        }
      }
    }

    .tab-pane3 {
      .el-input {
        width: 70%;
      }

      .nbtns {
        /deep/.el-form-item__content {
          margin-right: calc((100% * 0.3) - 72px);
        }
      }

      .el-form-item__label {
        width: 192px !important;
      }

      .el-form-item__content {
        width: auto;
      }
    }

    .tab-pane4 {
      .el-input {
        width: 44%;
      }

      .nbtns /deep/.el-form-item__content {
        margin-right: calc((100% * 0.12) + 5px);
      }
    }

    i {
      padding-left: 5px;
    }

    .desTop {
      display: inline-block;
      position: absolute;
      float: right;
    }
  }

}

/deep/.details-obj {
  background: #F4F8F9;
  border-radius: 4px;

  .el-form-item {
    width: 45%;
    margin: 6px 10px;
    height: 28px;
  }

  .el-form-item__label {
    color: rgba(0, 0, 0, 0.40);
  }

  .el-form-item__content {
    color: rgba(0, 0, 0, 1);
  }

  .details-log {
    height: 275px;

    .el-form-item__label {
      display: block;
      float: left;
      width: 32% !important;
      text-align: left;
      padding: 0 0 0 20px;
    }

    .el-form-item__content {
      display: block;
      float: left;
      width: 68%;
    }

    .longItem .el-form-item__label {
      width: 192px !important;
    }

    .longItem .el-form-item__content {
      width: auto;
    }

    .tab_left {
      width: 20%;
      float: left;
      height: inherit;
      background: #fff;
    }

    .tab_right {
      width: 80%;
      float: right;
      min-height: 275px;

      .el-form-item {
        height: 28px;
        margin: 6px 0;
        width: 95%;
        height: auto;
      }

      .sp {
        .el-form-item__label {
          width: 136px !important;
        }

        .el-form-item__content {
          width: auto;
        }
      }
    }

    ul {
      li {
        line-height: 40px;
        height: 40px;
        background: #fff;
        border: 1px solid #f4f8f9;
        padding: 0 5px;
        margin-bottom: -1px;
        margin-right: -1px;
        text-align: center;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.60);
        text-overflow: ellipsis;
        overflow: hidden;

        &:nth-child(1) {
          cursor: default;
        }
      }

      .is-active {
        background: #F4F8F9;
        color: rgba(0, 0, 0, 0.80);
      }
    }
  }

  .des {
    width: 100%;

    .el-form-item__content {
      width: 85%;
    }
  }
}
.tab_right/deep/.el-scrollbar__bar.is-vertical{
    width: auto;
    top: 2px;
}

</style>
