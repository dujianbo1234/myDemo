<template>
  <div class="cLog">
    <!-- 模板新增、修改、克隆-->
    <el-dialog :close-on-click-modal="false" :visible.sync="detailsDialog" width='64%' @close="close(false)" v-if="optType !== 'details'" class="logAdd-dialog opt">
      <div class="details-title">
        <div>
          <el-form :rules="rules" :inline="true" :model="selectData" label-position="right" label-width="90px" size="small" ref="qForm" style="text-align:left;">
            <span class="sp"><span>基本信息</span></span>
            <div class="logAdd-obj">
              <el-form-item label="模板名称:" prop="template_name">
                <el-input v-model="selectData.template_name"></el-input>
              </el-form-item>
              <el-form-item label="资源类型:" prop="resource_type" required>
                <el-cascader expand-trigger="hover" :options="treeData" v-model="selectData.resource_type" @change="resChange">
                </el-cascader>
              </el-form-item>
              <el-form-item label="分组:" prop="group">
                <el-input v-model="selectData.group"></el-input>
              </el-form-item>
              <el-form-item label="使用代理:">
                <el-checkbox v-model="selectData.is_agent" :disabled="true"></el-checkbox>
              </el-form-item>
              <el-form-item label="描述:" prop="description" class="des">
                <el-input type="textarea" :autosize="{ minRows: 3}" v-model="selectData.description"></el-input>
              </el-form-item>
            </div>
            <span class="sp" v-if="collectType ===4"><span>数据库信息</span></span>
            <span class="sp" v-if="collectType ===2"><span>JMX接口信息</span></span>
            <span class="sp" v-if="collectType ===5"><span>自定义信息</span></span>
            <div class="logAdd-obj" v-if="collectType !== 0">
              <el-form-item label="用户名:" prop="userName">
                <el-input v-model="selectData.userName"></el-input>
              </el-form-item>
              <el-form-item v-if="visible" label="密码:" prop="passWord">
                <el-input type="password" v-model="selectData.passWord">
                  <i slot="suffix" @click="changePass('show')" class="el-icon-view icon_pass" v-if="selectData.passWord"></i>
                </el-input>
              </el-form-item>
              <el-form-item v-else label="密码:" prop="passWord">
                <el-input type="text" v-model="selectData.passWord">
                  <svg-icon slot="suffix" :icon-class="'eye'" @click.native.stop="changePass('hide')" class="icon_pass">
                  </svg-icon>
                </el-input>
              </el-form-item>
              <el-form-item label="端口:" prop="port" v-if="collectType!==5">
                <el-input v-model="selectData.port"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="details-title">
        <span class="sp"><span>采集指标</span></span>
        <div class="logAdd-obj">
          <Metrics :collectType="collectType" :optType="optType" :selectData="selectData" ref="metrics2" :resource_type="resource_type"></Metrics>
        </div>
        <div class="sBtn">
          <el-button class="finish" v-if="optType==='add'" @click="increase('qForm')">保存</el-button>
          <el-button class="finish" v-show="optType==='edit'" @click="updateSave('qForm')">保存</el-button>
          <el-button class="finish" v-if="optType==='clone'" @click="cloneFun('qForm')">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <!--模板详情 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="detailsDialog" width='64%' @close="close(false);" v-if="optType === 'details'" class="logAdd-dialog">
      <div class="details-title">
        <span class="sp"><span>基本信息</span></span>
        <div class="details-obj">
          <el-form :inline="true" :model="selectData" label-position="right" label-width="75px" size="mini" style="text-align:left;">
            <el-form-item label="模板名称:">
              <div @click="downClick" :class="{down_class:down}" style="text-overflow: ellipsis;overflow: hidden;">
                {{selectData.template_name}}
              </div>                   
            </el-form-item>
            <el-form-item label="资源类型:">
              <el-cascader expand-trigger="hover" :options="treeData" v-model="selectData.resource_type" @change="resChange" ref="cascader" v-show="false">
              </el-cascader>
              {{resource_name}}
            </el-form-item>
            <el-form-item label="分组:">
              {{selectData.group}}
            </el-form-item>
            <el-form-item label="使用代理:">
              {{selectData.is_agent?'是' : '否'}}
            </el-form-item>
            <el-form-item label="描述:" class="des">           
              {{selectData.description}}                    
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="details-title" v-if="collectType !== 0">
        <span class="sp" v-if="collectType ===4"><span>数据库信息</span></span>
        <span class="sp" v-if="collectType ===2"><span>JMX接口信息</span></span>
        <span class="sp" v-if="collectType ===5"><span>自定义信息</span></span>
        <div class="details-obj">
          <el-form :inline="true" :model="selectData" label-position="right" label-width="75px" size="mini" style="text-align:left;">
            <el-form-item label="用户名:">
              {{selectData.userName}}
            </el-form-item>
            <el-form-item v-if="visible" label="密码:" prop="passWord">
              <span>
                ******
                <i slot="suffix" @click="changePass('show')" class="el-icon-view icon_pass" v-if="selectData.passWord"></i>
              </span>
              
            </el-form-item>
            <el-form-item v-else label="密码:" prop="passWord">
              <span>{{selectData.passWord}}
                <svg-icon slot="suffix" :icon-class="'eye'" @click.native.stop="changePass('hide')" class="icon_pass">
                </svg-icon>
              </span>
              
            </el-form-item>
            <el-form-item label="端口:" v-if="collectType!==5">
              {{selectData.port}}
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="details-title">
        <span class="sp"><span>采集指标</span></span>
        <div class="logAdd-obj">
          <Metrics :collectType="collectType" :optType="optType" :selectData="selectData" ref="metrics2" :resource_type="resource_type"></Metrics>
        </div>
      </div>
    </el-dialog>
    <!--日志详情 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="logDialog" width='64%' @close="close(false);" v-if="optType === 'details'" class="details-dialog">
      <div class="details-title">
        <span class="sp"><span>基本信息</span></span>
        <div class="details-obj">
          <el-form :inline="true" :model="selectData" label-position="right" label-width="75px" size="mini" style="text-align:left;">
            <el-form-item label="模板名称:">
              {{selectData.template_name}}
            </el-form-item>
            <el-form-item label="资源类型:">
              <el-cascader expand-trigger="hover" :options="treeData" v-model="selectData.resource_type" @change="resChange" ref="cascader" v-show="false">
              </el-cascader>
              {{resource_name}}
            </el-form-item>
            <el-form-item label="分组:">
              {{selectData.group}}
            </el-form-item>
            <!-- <el-form-item label="推送位置:">
              {{selectData.push_position | filPosition}}
            </el-form-item> -->
            <el-form-item label="使用代理:">
              {{selectData.is_agent?'是' : '否'}}
            </el-form-item>
            <el-form-item label="描述:" class="des">
              {{selectData.description}}
            </el-form-item>
          </el-form>
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
                <el-form :inline="true" :model="selectData" label-position="right" label-width="120px" size="mini" style="text-align:left;">
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
                  <el-form-item label="性能日志:" v-show="selectData.template_content[logIndex].isPerformanceLog">
                    {{selectData.template_content[logIndex].isPerformanceLog}}
                  </el-form-item>
                  <div v-show="selectData.template_content[logIndex].isPerformanceLog">
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
    </el-dialog>
    <!--日志新增、修改、克隆-->
    <el-dialog :close-on-click-modal="false" :visible.sync="logDialog" width='64%' @close="close(false);" v-if="optType !== 'details'" class="logAdd-dialog opt">
      <div class="details-title">
        <span class="sp"><span>基本信息</span></span>
        <div class="logAdd-obj">
          <el-form :rules="rules" :inline="true" :model="selectData" label-position="right" label-width="90px" size="small" ref="qForm" style="text-align:left;">
            <el-form-item label="模板名称:" prop="template_name">
              <el-input v-model="selectData.template_name"></el-input>
            </el-form-item>
            <el-form-item label="资源类型:" prop="resource_type" required>
              <el-cascader expand-trigger="hover" :options="treeData" v-model="selectData.resource_type" @change="resChange">
              </el-cascader>
            </el-form-item>
            <el-form-item label="分组:" prop="group">
              <el-input v-model="selectData.group"></el-input>
            </el-form-item>
            <!-- <el-form-item label="推送位置:" prop="push_position">
              <el-select v-model="selectData.push_position" placeholder="请选择推送位置">
                <el-option v-for="item in options" :key="item.value"
                :label="item.label":value="item.value"></el-option>
              </el-select>
            </el-form-item>   -->
            <el-form-item label="使用代理:">
              <el-checkbox v-model="selectData.is_agent" :disabled="true"></el-checkbox>
            </el-form-item>       
            <el-form-item label="描述:" prop="description" class="des">
              <el-input type="textarea" :autosize="{ minRows: 3}" v-model="selectData.description"></el-input>
            </el-form-item>           
          </el-form>
        </div>
      </div>
      <div class="details-title">
        <span class="sp"><span>日志文件</span>
        <i class="el-icon-circle-plus-outline" @click="addQuota(1)" v-show="addType===0"></i>
        <i class="el-icon-remove-outline" @click="addType=0" v-show="addType===1 | addType===2"></i>
      </span>
      <div style="margin:0 56px 0 146px;">
        <el-table ref="multipleTables" :data="selectData.template_content" tooltip-effect="dark" @selection-change="quotaSelection" :header-cell-style="headStyle">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="file" label="实时文件名称">
          </el-table-column>
          <el-table-column prop="fileDir" label="实时文件路径">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="修改" placement="top">
                <i class="el-icon-edit table_btn" @click.stop="editLog(scope.row,scope.$index,2)"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <i class="el-icon-circle-close-outline table_btn" @click.stop="delLog(scope.row,scope.$index,2)"></i>
              </el-tooltip>
              
            </template>
          </el-table-column>
        </el-table>
        <el-form :rules="rule2" :inline="false" :model="stDetails" class="logAdd-form" label-position="right" label-width="120px" size="small" ref="stDetails" v-if="addType===1">
          <el-tabs type="border-card" v-model="activeTab" @tab-click="tabClick" :before-leave="beforeTab">
            <el-tab-pane label="文件配置" name="tab-pane1" class="tab-pane1">
              <el-form-item label="实时文件名称" prop="file">
                <el-input v-model="stDetails.file"></el-input>
                <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                  <div slot="content">{{titles.file_title}}<br />{{titles.file_title2}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="实时文件路径" prop="fileDir">
                <el-input v-model="stDetails.fileDir"></el-input>
              </el-form-item>
              <el-form-item label="历史文件名称" prop="historyFile">
                <el-input v-model="stDetails.historyFile"></el-input>
                <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                  <div slot="content">{{titles.historyName_title}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="历史文件路径" prop="historyFileDir">
                <el-input v-model="stDetails.historyFileDir"></el-input>
                <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                  <div slot="content">{{titles.historyUrl_title}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="文件初始编号" prop="initFileNum">
                <el-input v-model="stDetails.initFileNum"></el-input>
                <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                  <div slot="content">{{titles.initFileNum_title}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item class="nbtns">
                <el-button class="nbtn" @click="tabClick('tab-pane2','stDetails')">下一步</el-button>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="规则配置" name="tab-pane2" class="tab-pane2">
              <el-form-item label="过滤内容规则" prop="filterContentRule">
                <el-input v-model="stDetails.filterContentRule"></el-input>
                <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                  <div slot="content">{{titles.filterContentRule_title}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="解析日志规则" prop="analysisLogRule">
                <el-input type="textarea" :autosize="{ minRows: 3}" v-model="stDetails.analysisLogRule"></el-input>
                <div class="desTop">
                  <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                    <div slot="content">{{titles.analysisLogRule_title}}</div>
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </div>
              </el-form-item>
              <el-form-item label="日志内容" prop="filterContentRule" class="logCon">
                <el-input v-model="stDetails.log"></el-input>
                <el-button :disabled="stDetails.filterContentRule.length<=0 && stDetails.analysisLogRule.length<=0 && stDetails.log.length<=0" class="xbtn" @click="checkRules(stDetails)">检验</el-button>
              </el-form-item>
              <el-form-item label="检验结果">
                <el-input type="textarea" :autosize="{ minRows: 3}" v-model="checkResult"></el-input>
              </el-form-item>
              <el-form-item class="nbtns">
                <el-button @click="tabClick('tab-pane1')">上一步</el-button>
                <el-button class="nbtn" @click="tabClick('tab-pane3')">下一步</el-button>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="时间配置" name="tab-pane3" class="tab-pane3">
              <el-form-item label="采集起始时间" prop="firstCollectionTime">
                <el-date-picker v-model="stDetails.firstCollectionTime" type="date" placeholder="选择日期">
                </el-date-picker>
                <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                  <div slot="content">
                    {{titles.fct_title1}}<br />
                    {{titles.fct_title2}}<br />
                    {{titles.fct_title3}}<br />
                    {{titles.fct_title4}}
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="从采集起始时间开始采集">
                <el-checkbox v-model="stDetails.eraseStatus"></el-checkbox>
              </el-form-item>
              <el-form-item class="nbtns">
                <el-button @click="tabClick('tab-pane2')">上一步</el-button>
                <el-button class="nbtn" @click="tabClick('tab-pane4')">下一步</el-button>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="指标配置" name="tab-pane4" class="tab-pane4">
              <el-form-item label="性能日志">
                <el-checkbox v-model="stDetails.isPerformanceLog"></el-checkbox>
              </el-form-item>
              <div v-show="stDetails.isPerformanceLog">
                <span v-for="(item,index) in map" class="alarm">
                  <el-form-item>
                    <el-input v-model="item.kpi" placeholder="请填写指标管理的指标"></el-input>
                    <el-input v-model="item.key" placeholder="请填写日志中的Key"></el-input>       
                    <i class="el-icon-circle-plus-outline" @click="addKpi(0)"></i>
                    <i class="el-icon-remove-outline" @click="deteleKpi(index,item,0)"></i>                              
                  </el-form-item> 
                </span>
              </div>
              <el-form-item class="nbtns">
                <el-button @click="tabClick('tab-pane3')">上一步</el-button>
                <el-button class="nbtn" @click="saveList('save','stDetails',stDetails,map)">完成</el-button>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>
        <el-form :rules="rule2" :inline="false" :model="detailData" class="logAdd-form" label-position="right" label-width="120px" size="small" ref="detailData" v-else-if="addType===2">
          <el-tabs type="border-card" v-model="activeTab" @tab-click="tabClick" :before-leave="beforeTab">
            <el-tab-pane label="文件配置" name="tab-pane1" class="tab-pane1">
              <el-form-item label="实时文件名称" prop="file">
                <el-input v-model="detailData.file"></el-input>
                <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                  <div slot="content">{{titles.file_title}}<br />{{titles.file_title2}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="实时文件路径" prop="fileDir">
                <el-input v-model="detailData.fileDir"></el-input>
              </el-form-item>
              <el-form-item label="历史文件名称" prop="historyFile">
                <el-input v-model="detailData.historyFile"></el-input>
                <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                  <div slot="content">{{titles.historyName_title}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="历史文件路径" prop="historyFileDir">
                <el-input v-model="detailData.historyFileDir"></el-input>
                <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                  <div slot="content">{{titles.historyUrl_title}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="文件初始编号" prop="initFileNum">
                <el-input v-model="detailData.initFileNum"></el-input>
                <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                  <div slot="content">{{titles.initFileNum_title}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item class="nbtns">
                <el-button class="nbtn" @click="tabClick('tab-pane2','detailData')">下一步</el-button>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="规则配置" name="tab-pane2" class="tab-pane2">
              <el-form-item label="过滤内容规则" prop="filterContentRule">
                <el-input v-model="detailData.filterContentRule"></el-input>
                <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                  <div slot="content">{{titles.filterContentRule_title}}</div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="解析日志规则" prop="analysisLogRule">
                <el-input type="textarea" :autosize="{ minRows: 3}" v-model="detailData.analysisLogRule"></el-input>
                <div class="desTop">
                  <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                    <div slot="content">{{titles.analysisLogRule_title}}</div>
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </div>
              </el-form-item>
              <el-form-item label="日志内容" prop="filterContentRule">
                <el-input v-model="detailData.log"></el-input>
                <el-button :disabled="detailData.filterContentRule.length<=0 && detailData.analysisLogRule.length<=0 && detailData.log.length<=0" class="xbtn" @click="checkRules(detailData)">检验</el-button>
              </el-form-item>
              <el-form-item label="检验结果">
                <el-input type="textarea" :autosize="{ minRows: 3}" v-model="checkResult"></el-input>
              </el-form-item>
              <el-form-item class="nbtns">
                <el-button @click="tabClick('tab-pane1')">上一步</el-button>
                <el-button class="nbtn" @click="tabClick('tab-pane3')">下一步</el-button>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="时间配置" name="tab-pane3" class="tab-pane3">
              <el-form-item label="采集起始时间" prop="firstCollectionTime">
                <el-date-picker v-model="detailData.firstCollectionTime" type="date" placeholder="选择日期">
                </el-date-picker>
                <el-tooltip class="item" effect="dark" placement="bottom" popper-class="toolTipClass">
                  <div slot="content">
                    {{titles.fct_title1}}<br />
                    {{titles.fct_title2}}<br />
                    {{titles.fct_title3}}<br />
                    {{titles.fct_title4}}
                  </div>
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="从采集起始时间开始采集">
                <el-checkbox v-model="detailData.eraseStatus"></el-checkbox>
              </el-form-item>
              <el-form-item class="nbtns">
                <el-button @click="tabClick('tab-pane2')">上一步</el-button>
                <el-button class="nbtn" @click="tabClick('tab-pane4')">下一步</el-button>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="指标配置" name="tab-pane4" class="tab-pane4">
              <el-form-item label="性能日志">
                <el-checkbox v-model="detailData.isPerformanceLog"></el-checkbox>
              </el-form-item>
              <div v-show="detailData.isPerformanceLog">
                <span v-for="(item,index) in detailData.map" class="alarm">
                  <el-form-item>
                    <el-input v-model="item.kpi" placeholder="请填写指标管理的指标"></el-input>
                    <el-input v-model="item.key" placeholder="请填写日志中的Key"></el-input>       
                    <i class="el-icon-circle-plus-outline" @click="addKpi(1)"></i>
                    <i class="el-icon-remove-outline" @click="deteleKpi(index,item,1)"></i>                              
                  </el-form-item> 
                </span>
              </div>
              <el-form-item class="nbtns">
                <el-button @click="tabClick('tab-pane3')">上一步</el-button>
                <el-button class="nbtn" @click="update_save(detailData)">完成</el-button>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>
        <div class="sBtn" style="margin: 20px 0;">
          <el-button class="finish" v-if="optType==='add'" @click="increase('qForm')">保存</el-button>
          <el-button class="finish" v-show="optType==='edit'" @click="updateSave('qForm')">保存</el-button>
          <el-button class="finish" v-if="optType==='clone'" @click="cloneFun('qForm')">保存</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</div>
</template>
<script>
  import * as server from "@/modules/collector/api/tmpManage.js";
  import Metrics from './Metrics';
  import { mapState, mapMutations } from 'vuex';
  export default {
    name: "Clog",
    components: {
      Metrics
    },
    props: {
      optType: String,
      selectData: Object,
      collectType: Number,
      treeData: Array
    },
    data() {
      let valid_name = (rule, value, callback) => {
        if (value.length > 64) {
          callback(new Error('长度不能超过64个字符'));
        } else {
          let reg = new RegExp("[`~!@#%$^&*()+=|{}':',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；;：”“'。，、？\u4E00-\u9FA5 ]",'u');
          if (reg.test(value)) {
            callback(new Error('不能含有特殊字符、空格、汉字'));
          } else {
            callback();
          }
        }
      };
      let valid_group = (rule, value, callback) => {
        if (!value || value === null) {
          callback();
          return;
        }
        if (value.length > 10) {
          callback(new Error('长度不能超过10个字符'));
        } else {
          let reg1 = new RegExp("[`~!@#%$^&*()+=|{}':',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；;：”“'。，、？ ]",'u');
          if (reg1.test(value)) {
            callback(new Error('不能含有特殊字符、空格'));
          } else {
            callback();
          }
        }
      };
      let valid_des = (rule, value, callback) => {
        if (!value || value === null) {
          callback();
          return;
        }
        if (value.length > 64) {
          callback(new Error('长度不能超过64个字符'));
        } else {
          callback();
        }
      };
      return {
        checkResult:'',
        options: [{
          value: 0,
          label: '推送到默认位置'
        }, {
          value: 1,
          label: '推送到默认位置和指定位置'
        }, {
          value: 2,
          label: '仅推送到指定位置'
        }],
        down:false,
        resource_name: '',
        activeTab: 'tab-pane1',
        headStyle: {
          'background-color': '#F4F8F9',
          'color': 'rgba(0,0,0,0.60)',
        },
        logIndex: 0,
        titles: {
          file_title: `实时文件不带日期：历史文件路径和历史文件名称务必配置 。`,
          file_title2: `实时文件带日期、实时文件带序号、实时文件带日期和文件序号：历史文件路径和历史文件名称不需配置带序号时，需要配置对应采集的文件起始编号 。`,
          historyName_title: `实时文件名称不带日期时配置`,
          historyUrl_title: `实时文件名称不带日期时配置`,
          initFileNum_title: `实时文件名称或历史文件名称配置文件序号（%i），即可相应配置起始编号，默认为0 。`,
          filterContentRule_title: "配置正则表达式",
          analysisLogRule_title: `对采集出来的日志，根据这个解析规则，解析成json格式 。`,
          fct_title1: `不填写默认从今天开始采集 该时间与文件上次的采集断点进行比较：`,
          fct_title2: `起始时间 < 上次断点时间，从上次断点时间开始 。`,
          fct_title3: `起始时间 > 上次断点时间，从起始时间开始 。`,
          fct_title4: `若想强制从起始时间开始采集，请勾选"从采集时间开始采集 。`,
          logContent:`请输入一行日志内容`
        },
        stDetails: {
          analysisLogRule: '',
          eraseStatus: false,
          file: '',
          fileDir: '',
          log:'',
          filterContentRule: '',
          firstCollectionTime: '',
          historyFile: '',
          historyFileDir: '',
          initFileNum: '',
          isPerformanceLog: false,
          dataDirs:'',
          checkPointDir:'',
        },
        stIndex: 0,
        addType: 0,
        detailData: {},
        detele_list: [],
        map: [
        { kpi: "", key: "" }
        ],
        rules: {
          template_name: [
          { required: true, message: '请输入模板名称', trigger: 'change' },
          { validator: valid_name, trigger: 'blur' }
          ],
          resource_type: [
          { required: true, message: '请输入资源类型', trigger: 'change' }
          ],
          port: [
          { required: true, message: '请输入端口号', trigger: 'change' }
          ],
          group: [
          { validator: valid_group, trigger: 'blur' }
          ],
          description: [
          { validator: valid_des, trigger: 'blur' }
          ],
        },
        rule2: {
          fileDir: [
          { required: true, message: '请输入实时文件路径', trigger: 'blur' }
          ],
          file: [
          { required: true, message: '请输入实时文件名称', trigger: 'blur' }
          ]
        },
        visible: true,
        logDialog: false,
        detailsDialog: false,
        template_content: {},
        resource_type: []
      }
    },
    created() {
      this.resource_type = this.selectData.resource_type;
      if(this.optType === 'add'){
        if (this.collectType === 1 || this.collectType === 0 || this.collectType === 3) {
          this.selectData.is_agent = true;
        }
      }
      
      if (this.collectType === 3) {
        this.logDialog = true;
      } else {
        this.detailsDialog = true;
      }
    },
    mounted() {
      if (this.optType === 'details') {
        this.$nextTick(_ => {
          this.resource_name = this.$refs.cascader.currentLabels.join(' / ');
        });
      }     
      if (this.collectType !== 3) {
        this.$nextTick(_ => {
          this.$refs.metrics2.queryMetrics();  
        });     
      } else {
        if(this.optType === 'details'){
          return;
        }
        this.$nextTick(_ => {
          this.selectData.template_content.forEach(obj => {
            this.$refs.multipleTables.toggleRowSelection(obj, true);
          });
        });
      }      
    },
    methods: {
      ...mapMutations([
        'SELECT_MET'
        ]),
      checkRules(data){
        this.checkResult = '';
        let params = {    
          analysisLogRule:data.analysisLogRule ,
          filterContentRule: data.filterContentRule,
          log: data.log
        };
        server.checkRules(params).then((res)=>{
          res.map((item,index)=>{
            this.checkResult +=item.msg+`\n\r`;
          });
        })
        .catch((err)=>{
          err.map((item,index)=>{
            this.checkResult +=item.msg+`\n\r`;
          });
        });
      },
      downClick(){
        this.down = !this.down;
      },
      beforeTab() {
        let formName = this.addType === 1 ? 'stDetails' : 'detailData';
        let bool = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            bool = true;
          } else {
            this.$message.error('请填写对应内容');
            bool = false;
          }
        });
        if (this.activeTab === 'tab-pane1') {
          return bool;
        } else {
          return true;
        }
      },
      tabClick(tab, formName) {
        if (tab.index === undefined) {
          if (tab === 'tab-pane2' && formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.activeTab = tab;
              } else {
                this.$message.error('请填写对应内容');
                return false;
              }
            });
          } else {
            this.activeTab = tab;
          }
        } else {
          formName = this.addType === 1 ? 'stDetails' : 'detailData';
          if (tab.$parent.value === 'tab-pane1') {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.activeTab = tab.name;
              } else {
                this.activeTab = 'tab-pane1';
                this.$message.error('请填写对应内容');
                return;
              }
            });
          }
        }
      },
      resChange(value) {
        this.resource_type = value;
        this.$nextTick(_ => {
          if (this.collectType === 3) {
            return;
          }
          this.$refs.metrics2.queryMetrics();
        });
      },
      quotaSelection(val) {
        this.detele_list = val;
      },
      addQuota(type) {
        this.checkResult = '';
        this.activeTab = 'tab-pane1';
        this.stDetails = {
          analysisLogRule: "",
          eraseStatus: false,
          file: "",
          fileDir: "",
          log:"",
          filterContentRule: "",
          firstCollectionTime: "",
          historyFile: "",
          historyFileDir: "",
          initFileNum: "",
          isPerformanceLog: false,
          dataDirs:'',
          checkPointDir:'',
        };
        this.addType = type;
      },
      editLog(row, index, type) {
        this.checkResult = '';
        this.detailData = Object.assign({}, row);
        this.detailData.dataDirs = '',
        this.detailData.checkPointDir = '',
        this.addType = type;
        this.stIndex = index;
      },
      delLog(row, index, type) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$nextTick(_ => {
            this.selectData.template_content.splice(index, 1);
            this.$message({ type: 'success', message: '删除成功!' });
          });
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消删除' });
        });
      },
      validate_time(value) {
        var date = value.file;
        if (date) {
          if (date.indexOf('%') > 0) {
            if (date.indexOf('%d{yyyyMMdd}') > 0 || date.indexOf('%i') > 0 || date.indexOf('%d{yyyy-MM-dd}') > 0) {
              return true;
            } else {
              this.$message.error('请输入正确的匹配规则 如: %d{yyyyMMdd}或者%d{yyyy-MM-dd}或者%i');
              return false;
            }
          } else {
            if (value.historyFile === "" || value.historyFileDir === "") {
              this.$message.error('请输入历史文件名称和历史文件路径');
              return false;
            } else {
              return true;
            }
          }
        } else {
          return true;
        }
      },
    //新增指标map方法
    addKpi(type) {
      if (type === 0) {
        this.map.push({ kpi: '', key: '' });
      } else {
        this.detailData.map.push({ kpi: '', key: '' });
      }
    },
    //删除列表项
    deteleKpi(index, item, type) {
      if (type === 0) {
        if (index !== 0) {
          this.map.splice(index, 1);
        } else {
          this.selectData.isPerformanceLog = false;
          item.kpi = "";
          item.key = "";
        }
      } else {
        if (index !== 0) {
          this.detailData.map.splice(index, 1);
        } else {
          this.detailData.isPerformanceLog = false;
          item.kpi = "";
          item.key = "";
        }
      }
    },
    handelFun(formName) {
      this.addType = 0;
      this.map = [{ kpi: '', key: '' }];
      this.$refs[formName].resetFields();
    },
    update_save(data) {
      if (data.firstCollectionTime && data.firstCollectionTime instanceof Date) {
        data.firstCollectionTime = data.firstCollectionTime.getTime();
      }
      var bloo = this.validate_time(data);
      if (bloo) {
        if (data.isPerformanceLog) {
          for (var i = 0; i < data.map.length; i++) {
            if (data.map[i].key.trim() === "" || data.map[i].kpi.trim() === "") {
              this.$message.error('对应的key或指标不能为空');
              return;
            }
          }
        }
        if (data.eraseStatus === true) {
          if (data.firstCollectionTime === '' || data.firstCollectionTime === null) {
            this.$message.error('请选择起始时间');
            return;
          }
        } else {
          if (data.firstCollectionTime) {
            this.$message.error('请勾选开始时间选择框');
            return;
          }
        }
        this.selectData.template_content.splice(this.stIndex, 1, this.detailData);
        this.activeTab = 'tab-pane1';
        this.addType = 0;
      }
    },
    saveList(type, formName, data, map) {
      var bloo = this.validate_time(data);
      if (bloo) {
        if (data.isPerformanceLog) {
          for (var i = 0; i < map.length; i++) {
            if (map[i].key.trim() === '' || map[i].kpi.trim() === '') {
              this.$message.error('对应的key或指标不能为空');
              return;
            }
          }
        }
        if (data.eraseStatus === true) {
          if (data.firstCollectionTime === '' || data.firstCollectionTime === null) {
            this.$message.error('请选择起始时间');
            return;
          }
        } else {
          if (data.firstCollectionTime) {
            this.$message.error('请勾选开始时间选择框');
            return;
          }
        }
        let time = '';
        if (data.firstCollectionTime) {
          time = data.firstCollectionTime.getTime();
        }
        let arr = [];
        map.forEach(function(item) {
          arr.push({
            kpi: item.kpi,
            key: item.key
          });
        });
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.selectData.template_content.push({
              file: data.file,
              fileDir: data.fileDir,
              historyFile: data.historyFile,
              log:data.log,
              historyFileDir: data.historyFileDir,
              initFileNum: data.initFileNum,
              filterContentRule: data.filterContentRule,
              eraseStatus: data.eraseStatus,
              analysisLogRule: data.analysisLogRule,
              isPerformanceLog: data.isPerformanceLog,
              map: arr,
              firstCollectionTime: time,
              dataDirs:'',
              checkPointDir:'',
            });
            this.activeTab = 'tab-pane1';
            this.handelFun(formName);
          } else {
            this.$message.error('请填写对应内容后提交');
            return false;
          }
        });
      }
    },
    //新增
    increase(formName) {
      if (this.collectType !== 3) {
        this.$refs.metrics2.changePageCoreRecordData();
        this.template_content = this.getContent();
        if (this.selectMetData.length === 0) {
          this.$message.error('请至少选择一个指标');
          return;
        }
      } else {
        this.template_content = this.getContent();
        if (this.detele_list.length === 0) {
          this.$message.error('必须选择日志文件');
          return;
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.getParams();
          server.add_module(params).then(res => {
            this.$message.success('新增成功！');
            this.SELECT_MET([]);
            this.close(true);
          });
        } else {
          this.$message.error('请填写对应内容后提交');
          return;
        }
      });
    },
    //克隆
    cloneFun(formName) {
      if (this.collectType !== 3) {
        this.$refs.metrics2.changePageCoreRecordData();
        this.template_content = this.getContent();
        if (this.selectMetData.length === 0) {
          this.$message.error('请至少选择一个指标');
          return;
        }
      } else {
        this.template_content = this.getContent();
        if (this.detele_list.length === 0) {
          this.$message.error('必须选择日志文件');
          return;
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {       
          let params = this.getParams();
          server.add_module(params).then(res => {
            this.$message.success('克隆成功！');
            this.close(true);
          });
        } else {
          this.$message.error('请填写对应内容后提交');
          return;
        }
      });
    },
    //修改
    updateSave(formName) {
      if (this.collectType !== 3) {
        this.$refs.metrics2.changePageCoreRecordData();
        this.template_content = this.getContent();
        if (this.selectMetData.length === 0) {
          this.$message.error('请至少选择一个指标');
          return;
        }
      } else {
        this.template_content = this.getContent();
        if (this.detele_list.length === 0) {
          this.$message.error('必须选择日志文件');
          return;
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.getParams();
          server.update_module(params, params.template_id)
          .then((res) => {
            this.$message.success("修改成功！");
            this.close(true);
          });
        } else {
          this.$message.error('请填写对应内容后提交');
          return;
        }
      });
    },
    getParams(){
      let resource_type = this.selectData.resource_type.join('.');
      let params = {
        create_user_id: this.userName || 'admin',
        is_agent: this.selectData.is_agent,
        group: this.selectData.group,
        description: this.selectData.description.trim(),
        resource_type: resource_type,
        template_content: this.template_content,
        template_name: this.selectData.template_name,
        template_type: this.collectType   
      };
      if(this.optType === 'edit'){
        params.template_id = this.selectData.template_id;
      }
      // if (this.collectType === 3) {
      //   params.push_position = this.selectData.push_position;
      // }
      return params;      
    },
    getContent() {
      let template_content = {};
      switch (this.collectType) {
        case 0:
        template_content.kpiList = this.selectMetData;
        break;
        case 2:
        template_content.jmxInner = {
          templateKpiInners: this.selectMetData,
          userName: this.selectData.userName,
          passWord: this.selectData.passWord,
          port: this.selectData.port
        };
        break;
        case 3:
        template_content.logInner = this.detele_list;
        break;
        case 4:
        template_content.dbInner = {
          templateKpiInners: this.selectMetData,
          userName: this.selectData.userName,
          passWord: this.selectData.passWord,
          port: this.selectData.port
        };
        break;
        case 5:
        template_content.customInner = {
          templateCmdInners: this.selectMetData,
          userName: this.selectData.userName,
          passWord: this.selectData.passWord,
        };
        break;
      }
      return template_content;
    },
    changePass(value) {
      this.visible = !(value === 'show');
    },
    close(bool) {
      this.$emit('closeClog', bool);
      if (this.optType === 'details') {
        return;
      } else {
        this.$refs['qForm'].resetFields();
      }
    },
  },
  computed: {
    ...mapState({
      selectMetData: state => state.collect.selectMetData,
      userName: state => state.user.name
    })
  }
}

</script>
<style lang="scss" scoped>
.cLog {
  .icon_pass {
    cursor: pointer;
    width: 25px;
    color: #606266;
    padding-left:5px;
  }
}

.details-title {
  margin-bottom: 20px;

  .sp {
    display: inline-block;
    min-height: 28px;
    color: #42B983;

    span {
      padding-left: 10px;
      border-left: 3px solid #42B983;
    }

    i {
      padding-left: 10px;
    }
  }

  .sBtn {
    text-align: right;
    margin: 20px 56px;

    button {
      padding: 9px 17px;
    }
  }
}

/deep/.details-obj {
  background: #F4F8F9;
  border-radius: 4px;
  margin: 0 56px;

  .el-form-item {
    width: 45%;
    margin: 6px 10px;
    min-height: 28px;
  }

  .el-form-item__label {
    color: rgba(0, 0, 0, 0.40);
  }

  .el-form-item__content {
    color: rgba(0, 0, 0, 1);
    width: 75%;
    text-overflow: ellipsis;
    overflow: hidden;   
  }
  .down_class {
    word-wrap: break-word;
  }

  .details-log {
    height: 275px;

    .el-form-item__label {
      display: block;
      float: left;
      width: 25% !important;
      text-align: left;
      padding: 0 0 0 20px;
    }

    .el-form-item__content {
      display: block;
      float: left;
      width: 75%;
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
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
    .el-form-item__content {
      width: 85%;
    }
  }
}

.logAdd-dialog /deep/ {
  .des {
    min-height:28px;
    width: 100%;
    text-overflow: ellipsis;
    word-wrap: break-word;
    .el-form-item__content {
      width: 85%;
    }
  }

  .logAdd-obj {
    margin: 0 46px 0 56px;

    /deep/ {
      .el-form-item {
        width: 48%;
      }

      .el-form-item__content {
        width: calc(100% - 90px);

        .el-input,
        .el-cascader,
        .el-select {
          width: 100%;
        }
      }
      .des{
        width: calc(96% + 20px);

        .el-form-item__content {
          width: calc(100% - 90px - 5px);
        }
      }
    }
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
        width: 80%;
      }

      .nbtns {
        /deep/.el-form-item__content {
          margin-right: calc(100% * 0.2);
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
      padding-left: 5px;
    }
    .xbtn {
      margin-left:10px;
    }
  }
}

.alarm /deep/ {
  .el-input {
    width: 180px;
    padding: 0 10px 0 0;
  }
}

.finish {
  background: #42B983;
  border: 1px solid #42B983;
  color: #FFFFFF;

  &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
}

.el-form {
  text-align: left;
}

/deep/ {
  .el-dialog__header {
    padding: 0px 20px 10px;
  }

  .el-dialog__headerbtn {
    top: 10px;
  }

  .el-dialog__body {
    padding: 10px 20px;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.el-table /deep/ {
  .el-checkbox.is-checked .el-checkbox__inner {
    background-color: #42B983;
    border-color: #42B983;
  }

  .el-checkbox__inner {
    &:hover {
      border-color: #42B983;
    }
  }

  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #42B983;
  }

  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #42B983;
    border-color: #42B983;
  }
}

.table_btn {
  color: rgba(66, 185, 131, 1);
  cursor: pointer;
}

.opt /deep/ {
  .el-form-item--small .el-form-item__label {
    line-height: 34px;
  }

  .el-input--small .el-input__inner,
  .el-checkbox,
  .el-checkbox__input {
    height: 34px;
    line-height: 34px;
  }
}

</style>
