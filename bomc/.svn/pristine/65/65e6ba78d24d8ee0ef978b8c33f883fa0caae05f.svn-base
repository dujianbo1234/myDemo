<template>
  <div class="monitor-container">
    <el-card class="alertHiddenStyle">
      <div class="current-alert-info">
        <el-form
          :inline="true"
          :model="currentAlertSearchData"
          label-position="right"
          label-width="70px"
          id="preForm"
          >
          <el-row>
            <el-col :span="6">
              <!-- <el-form-item label="告警名称" > -->
              <el-input v-model="currentAlertSearchData.host" @keyup.native="nameSearch" placeholder="请输入主机名称"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <!-- <el-form-item label="告警编码" > -->
              <el-input v-model="currentAlertSearchData.code" @keyup.native="codeSearch" placeholder="请输入告警编码"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <el-button class='blueStyleBtn' @click="queryCurrentAlert(1,true)">查询</el-button>
              <el-button class='defaultBtn' @click="currentReset">重置</el-button>
              <span class="btn_set" @click="searchItemDown" v-show="!searchItemShow">
                <i class="el-icon-d-arrow-right btn_rote" style="color: #42B983;"></i>
             </span>
              <span class="btn_set" @click="searchItemDown" v-show="searchItemShow">
                <i class="el-icon-d-arrow-right btn_rote1" style="color: #42B983;"></i>
             </span>
            </el-col>
            <el-col :span="6" class="freshInfoStyle">
              <el-popover
                placement="right"
                width="400"
                v-model="visibleFresh"
                trigger="click">
                <div class="freshEqure">
                  <p class="labelStyle">设置刷新频率(当前系统刷新频率{{currentfreshValue}}分钟)</p>
                  <el-input placeholder="请输入刷新频率" v-model="freshValue" @keyup.native="proving"></el-input><span class="inputMin">分钟</span>
                  <p class="labelStyle">快捷设置</p>
                  <ul>
                    <li v-for="(item,index) in freshTimeArr" :key="index" @click="setFreshValue(item)">
                      <span>{{item}}</span> 分钟
                    </li>
                  </ul>
                  <div slot="footer"  class="dialog-footer btnTop" align="center">
                    <el-button class='greenStyleBtn'  @click="confirmFreshTime">确定</el-button>
                  </div>
                </div>
                <i class="el-icon-info" slot="reference" v-show="setFreshTime"></i>
              </el-popover>
              <el-switch
                v-model="isTimeOut"
                @change="freshTime"
                active-text="手动刷新"
                inactive-text="定时刷新"
              ></el-switch>
            </el-col>
          </el-row>
          <el-row  v-show="searchItemShow" class="searchTop">
            <el-col :span="6">
              <!-- <el-form-item label="告警级别"> -->
              <el-select v-model="currentAlertSearchData.level" clearable placeholder="请选择告警级别">
                <el-option
                  v-for="item in alertOfLeavel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <!-- <el-form-item label="告警内容"> -->
              <el-input v-model="currentAlertSearchData.content"  placeholder="请输入告警内容"></el-input>
              <!-- <el-input v-model="currentAlertSearchData.content"  @keyup.native="contentSearch" placeholder="请输入告警内容"></el-input> -->
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <!-- <el-form-item label="告警时间"> -->
              <el-date-picker
                v-model="currentSearchTime"
                type="datetimerange"
                align="right"
                value-format="yyyyMMddHHmmss"
                unlink-panels
                :default-time="['00:00:00', '23:59:59']"
                start-placeholder="告警开始日期"
                end-placeholder="告警开始日期"
              ></el-date-picker>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <el-date-picker
                v-model="currentSearchTimeEnd"
                type="datetimerange"
                align="right"
                value-format="yyyyMMddHHmmss"
                unlink-panels
                :default-time="['00:00:00', '23:59:59']"
                start-placeholder="告警结束日期"
                end-placeholder="告警结束日期"
              ></el-date-picker>
            </el-col>
          </el-row>
          <el-row  v-show="searchItemShow" class="searchTop">
            <el-col :span="6">
              <el-select
                v-model="currentAlertSearchData.pushStatus"
                clearable
                placeholder="请选择推送状态"
              >
                <el-option
                  v-for="item in sendState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <!-- <el-form-item label="监控对象"> -->
              <el-input v-model="currentAlertSearchData.ciid"  @keyup.native="CIIDSearch" placeholder="请输入CIID"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <!-- <el-form-item label="告警状态"> -->
              <el-select v-model="currentAlertSearchData.status" clearable placeholder="请选择告警状态">
                <el-option
                  v-for="item in alertOfState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6" id="alertStyle">
              <!-- <el-form-item label="选择器" > -->
              <el-button class='greenStyleBtn' @click="alertDown=!alertDown">告警选择器</el-button>
              <div class="alert-info" v-if="alertDown" :class="alertSelectShow == true ? 'isFixed' :''">
                <div class="title">
                  <i class="kks"></i>告警选择器
                  <el-button
                    id="select-add"
                    @click="addDomain"
                    icon="el-icon-circle-plus-outline"
                    class='blueStyleBtn'
                    size="mini"
                    circle
                  ></el-button>
                </div>
                <el-cascader
                  placeholder="请选择"
                  :options="selectorData"
                  v-model="selectNameSearch"
                  :props="propsSelect"
                ></el-cascader>
                <el-form :model="alertSelertFrom" class="alertHStyle">
                  <el-form-item v-for="(domain,index) in alertSelertFrom.domains" :key="index">
                    <el-input v-model="domain.name" disabled class="key-length fontSizeStyle"></el-input>
                    <el-input v-model="domain.value" class="value-length fontSizeStyle"></el-input>
                    <el-button
                      class='redStyleBtn'
                      icon="el-icon-delete"
                      @click.prevent="removeDomain(domain)"
                      size="mini"
                      circle
                    ></el-button>
                  </el-form-item>
                </el-form>
              </div>
              <!-- </el-form-item> -->
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="cardM">
      <el-row class="btnInfo">
        <el-col :span="20">
          <el-button class='greenStyleBtn' @click="currentAlertDispose">处理</el-button>
        </el-col>
        <el-col :span="4">
          <el-button class='defaultBtn' @click="currentAlertExportCheck">导出</el-button>
          <!-- <el-button class='blueStyleBtn' @click="currentAlertExportAll">导出所有</el-button> -->
          <span class="set-item-show" @click="setShowDialog">设置列隐藏/显示</span>
        </el-col>
      </el-row>
       
      <div v-loading="listLoading">
        <el-table
          :header-cell-style="headStyle"
          resizable
          border
          ref="currentAlertTable"
          :data="alertData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="currentAlertSelectionChange"
          >
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" key='1' v-if="currentAlertcodeShow" prop="code" label="告警编码" width="140"></el-table-column>
          <el-table-column align="center" key='2' v-if="currentAlertidShow" label="告警ID" width="210">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column align="center" key='3' v-if="currentAlertStateShow" label="告警状态" width="100">
            <template slot-scope="scope">{{ scope.row.status | leavelState}}</template>
          </el-table-column>
          <el-table-column align="center" key='4' v-if="currentAlertPushStatusShow" label="推送状态" width="100">
            <template slot-scope="scope">{{ scope.row.pushStatus |sendStateFilter}}</template>
          </el-table-column>
          <el-table-column align="center" key='5' v-if="currentAlertinfluenceDegreeShow" label="影响程度" width="100">
            <template slot-scope="scope">{{ scope.row.influenceDegree | eventLeavel}}</template>
          </el-table-column>
          <el-table-column align="center" key='6' v-if="currentAlertobjShow" prop="ciid" label="CIID" width="180"></el-table-column>
          <el-table-column align="center" key='7' v-if="currentAlerthostShow" prop="host" label="主机名称" width="120"></el-table-column>
          <el-table-column align="center" key='8' v-if="currentAlertipShow" prop="ip" label="IP" width="120"></el-table-column>
          <el-table-column
            key='9' 
            v-if="currentAlertsubsystemShow"
            prop="subSystem"
            label="子系统名称"
            align="center"
            width="120"
          ></el-table-column>
          <el-table-column align="center" key='10' v-if="currentAlertappIdShow" prop="appId" label="业务系统" width="120"></el-table-column>
          <el-table-column align="center" key='11' v-if="currentAlertmoduleShow" prop="module" label="模块名称" width="120"></el-table-column>
          <el-table-column align="center" key='12' v-if="currentAlertinstanceShow" prop="instance" label="实例名称" width="120"></el-table-column>
          <el-table-column align="center" key='13' v-if="currentAlertmsgTypeShow" prop="msgType" label="告警类别" width="100"></el-table-column>
          <el-table-column
            key='14'
            v-if="currentAlertrelevantPartyShow"
            prop="relevantParty"
            align="center"
            label="业务相关方"
            width="100"
          ></el-table-column>
          <el-table-column
            key='15' 
            v-if="currentAlertInfoShow"
            prop="content"
            align="center"
            label="告警内容"
            width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column align="center" key='16' v-if="currentAlertLeaveShow" label="告警级别" width="120">
            <template slot-scope="scope">
              <div  v-if="scope.row.level =='0'">
                <img :src="commonImg" title="一般告警">
              </div>
              <div  v-if="scope.row.level =='1'">
                 <img :src="majorImg" title="主要告警">
              </div>
              <div  v-if="scope.row.level =='2'">
                 <img :src="criticalImg" title="严重告警">
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" key='17' v-if="currentAlertCsShow" label="首次告警时间" width="180">
            <template slot-scope="scope">{{scope.row.firstAlertTime | strToDataFromat}}</template>
          </el-table-column>
          <el-table-column align="center" key='18' v-if="currentAlertLastTimeShow" label="最后告警时间" width="180">
            <template slot-scope="scope">{{scope.row.lastAlertTime | strToDataFromat}}</template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                class="fontColorStyle"
                type="text"
                size="small"
                @click="currentAlertRowChange(scope.row)"
              >查看</el-button>
              <!-- <el-button
                class="fontColorStyle"
                type="text"
                size="small"
                @click.stop.native.prevent="handPush(scope.row.id)"
              >手动推送</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          align="right"
          :page-size="allLimitNumber"
          @size-change="alertSizeChange"
          :current-page.sync="currentPage"
          @current-change="currentAlertPage"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 当前告警详情dialog -->
    <el-dialog :visible.sync="currentAlertDialog" width="70%" id="dialog">
      <el-tabs v-model="currentAlertactiveNameInfo">
        <el-tab-pane  name="first">
          <span slot="label" :class="{ label_pane:currentAlertactiveNameInfo==='first' }">告警信息</span>
          <el-form
            :inline="true"
            :model="alertYuLanData"
            label-position="right"
            label-width="100px"
            size="mini"
            >
            <el-row>
              <!-- <el-col :span="8">
                <el-form-item label="告警名称">{{alertYuLanData.name}}</el-form-item>
              </el-col>-->
              <el-col :span="8">
                <el-form-item label="告警ID">{{alertYuLanData.id}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="告警编码">{{alertYuLanData.code}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="责任人">{{alertYuLanData.handlerId}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="8">
                <el-form-item label="生成策略ID">{{alertYuLanData.analysisStrategyId}}</el-form-item>
              </el-col>-->
              <el-col :span="8">
                <el-form-item label="首次告警时间">{{alertYuLanData.firstAlertTime | strToDataFromat}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最后告警时间">{{alertYuLanData.lastAlertTime | strToDataFromat}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="告警次数">{{alertYuLanData.count}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="告警状态">{{alertYuLanData.status | leavelState}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="告警级别">{{alertYuLanData.level | alertLeavel}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="告警内容">
                  <div class="alertContent">{{alertYuLanData.content}}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane  name="second">
          <span slot="label" :class="{ label_pane:currentAlertactiveNameInfo==='second' }">对象信息</span>
          <mailTable :tableData="alertTableData" :tableStyle="{ width:'600px' }"></mailTable>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button class="defaultBtn" @click="currentAlertDialog = false">返回</el-button>
      </div>
    </el-dialog>
    <!-- 当前告警表单设置显示隐藏 -->
    <el-dialog
      class="cloumnStyle"
      :visible.sync="currentAlertShowDialog"
      width="30%"
      >
      <!-- <el-table :data="currentAlertDialogData">
        <el-table-column property="name" label="列名" align='center'></el-table-column>
        <el-table-column label="是否显示" width="100" align='center'>
          <template slot-scope="scope">
              <el-checkbox v-model="scope.row.select" value='s'></el-checkbox>
          </template>
        </el-table-column>
      </el-table>-->
        <!-- <span slot="label" :class="{ label_pane:currentAlertactiveNameInfo==='first' }">设置列隐藏/显示</span> -->
        <span  class="label_pane">设置列隐藏/显示</span>
      <ul>
        <li v-for="(item,index) in currentAlertDialogData" :key="index">
          <el-checkbox v-model="item.select" value="s"></el-checkbox>
          <span>{{item.name}}</span>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="confirmCurrentAlertShow" class='blueStyleBtn'>确定</el-button>
      </div>
    </el-dialog>
    <!-- 当前告警处理按钮 -->
    <el-dialog
      :visible.sync="currentAlertDisposeDialog"
      width="80%"
      id="currentAlertDisposeDialogID"
      @close="clearAlertData"
      >
      <ul  class="alertName titleName">
        <li class="titlefont">
         <!-- <el-checkbox v-model="checkAll"  @change="ee(checkAll)"></el-checkbox> -->
         <el-checkbox v-model="checkAll"></el-checkbox>
          告警编码
          <!-- <el-button @click="ee1"></el-button> -->
        </li>
        <li>CIID</li>
        <li>告警类别</li>
        <li>告警级别</li>
        <li>告警内容</li>
        <li>最后告警时间</li>
      </ul>
      <div v-for="(item, index) in disposeAlertData" :key="index">
        <ul class="alertName">
          <li class="titlefont ">
            <el-checkbox
              v-model="alertChecked[index]"
              @change="alertCheckChange(item.id,alertChecked[index])"
              :disabled="item.status==0?false:true"
            ></el-checkbox>
            {{item.code}}
            <!-- <i class="el-icon-caret-bottom" @click="showTotal(index)"></i> -->
            <i class="el-icon-caret-bottom" @click="showTotal(index)" v-show="item.hasMerges">合并</i>
            <i class="el-icon-caret-bottom" @click="showTotal(index)" v-show="item.hasLinks">关联</i>
          </li>
          <li>{{item.ciid}}</li>
          <li>{{item.msgType}}</li>
          <li>{{item.level | alertLeavel}}</li>
          <li class="contentStyle">{{item.content}}</li>
          <li>{{item.lastAlertTime | strToDataFromat}}</li>
        </ul>
        <div v-show="showTotalItem[index].key">
          <div v-show="item.hasMerges">
              <!-- <h2 class="titleOne">
              <span>合并告警</span>
              <i class="el-icon-arrow-down" @click="showHe(index)"></i>
              </h2> -->
              <div >
                <el-table
                  resizable
                  border
                  :data="currentAlertDisposeDialogMerge[index]"
                  @selection-change="selectChangeHe"
                  style="width: 100%"
                >
                  <!-- <el-table-column align='center' type="selection" :selectable="checkboxT" width="55"></el-table-column> -->
                  <el-table-column align='center' prop="code" label="告警编码" width="140"></el-table-column>
                  <el-table-column align='center' prop="ciid" label="CIID" width="160"></el-table-column>
                  <el-table-column align='center' prop="msgType" label="告警类别" width="160"></el-table-column>
                  <el-table-column align='center'  show-overflow-tooltip prop="content" label="告警内容" width="180"></el-table-column>
                  <el-table-column align='center' width="180" label="最后告警时间">
                    <template slot-scope="scope">{{scope.row.lastAlertTime | strToDataFromat}}</template>
                  </el-table-column>
                  <el-table-column  align='center' label="告警分析策略"  width="280">
                    <template slot-scope="scope">
                      <div>
                        <span>聚合参数:</span>
                        <span
                          class="aInfo"
                          v-for="(item,index) in scope.row.processAnalysisRule.aggregation"
                          :key="index"
                        >
                          {{item}},
                        </span>
                      </div>
                      <div>
                        <span>范围:</span>
                        <span
                          class="aInfo"
                          v-for="(item,index) in scope.row.processAnalysisRule.selectionRange"
                          :key="index"
                        >
                          <span v-show="index == 0">{{item}}分钟之内</span>
                          <span v-show="index == 1">{{item}}</span>
                          <span v-show="index == 2">{{item}}分钟之前</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column align='center' label="告警选择器" show-overflow-tooltip width="180">
                    <template slot-scope="scope">
                      <div
                        class="aInfo"
                        v-for="(item,index) in scope.row.hitAnalysisSelectorObj"
                        :key="index"
                      >
                        <span>{{item.label}} = {{item.val}}</span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
          </div>
          <br>
          <div v-show="item.hasLinks">
              <!-- <h2 class="titleTwo">
                <span>关联告警</span>
                <i class="el-icon-arrow-down" @click="showGuan(index)"></i>
              </h2>
              <br> -->
              <!-- <div v-show="showArr[index].key2"> -->
              <div>
                <el-table
                  resizable
                  border
                  :data="currentAlertDisposeDialogRelation[index]"
                  @selection-change="selectChangeGuan"
                  style="width: 100%"
                >
                  <el-table-column align='center' type="selection" :selectable="checkboxT" width="55"></el-table-column>
                  <el-table-column align='center' prop="code" label="告警编码" width="140"></el-table-column>
                  <el-table-column align='center' prop="ciid" label="CIID" width="160"></el-table-column>
                  <el-table-column align='center' prop="msgType" label="告警类别" width="160"></el-table-column>
                  <el-table-column align='center'  show-overflow-tooltip prop="content" label="告警内容" width="180"></el-table-column>
                  <el-table-column align='center' width="180" label="最后告警时间">
                    <template slot-scope="scope">{{scope.row.lastAlertTime | strToDataFromat}}</template>
                  </el-table-column>
                  <el-table-column align='center' label="告警分析策略" show-overflow-tooltip width="120">
                    <template slot-scope="scope">
                      <span>聚合参数:</span>
                      <span
                        class="aInfo"
                        v-for="(item,index) in scope.row.processAnalysisRule.aggregation"
                        :key="index"
                      > 
                        <span>{{item}}</span>,
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column align='center' label="告警选择器" show-overflow-tooltip width="180">
                    <template slot-scope="scope">
                      <div
                        class="aInfo"
                        v-for="(item,index) in scope.row.hitAnalysisSelectorObj"
                        :key="index"
                      >
                        <span>{{item.label}} = {{item.val}}</span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
           
          </div>
        </div>
      </div>
      <br>
      <h2>
        <span>处理意见</span>
      </h2>
      <br>
      <el-input type="textarea" v-model="disposeSuggestion"></el-input>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button class='blueStyleBtn' @click="disposeConfirm(false)">确定</el-button>
        <el-button class='blueStyleBtn' @click="toOrderList">转工单</el-button>
        <el-button class="defaultBtn" @click="currentAlertDisposeDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 工单dialog -->
    <el-dialog width="80%" title="工单详情" :visible.sync="orderListDialog" id="orderContainer">
      <el-form :inline="true" :model="orderForm" label-position="right" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="事件标题">
              <el-input v-model="orderForm.title"  @keyup.native="titleAdd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件性质">
              <el-select v-model="orderForm.eventNature">
                <el-option
                  v-for="item in eventNatureData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件涉及组">
              <el-cascader :options="eventGropuData" v-model="eventGropu"></el-cascader>
            </el-form-item>
            <!-- <el-form-item label="事件来源">
              <el-select v-model="orderForm.eventSource">
                <el-option
                  v-for="item in eventSourceData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="事件优先级">
              <el-select v-model="orderForm.eventPriority">
                <el-option
                  v-for="item in eventPriorityData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事件影响度">
              <el-select v-model="orderForm.eventInfluenceDegree">
                <el-option
                  v-for="item in eventInfluenceDegreeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地点">
              <el-input v-model="orderForm.location" @keyup.native="locationAdd"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="事件发生时间">
              <el-date-picker
                v-model="orderForm.eventTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyyMMddHHmmss"
                :picker-options="pickerOptionsOrder"
              ></el-date-picker>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row>
          <!-- <el-col :span='8'>
            <el-form-item label="事件类别信息">
              <el-cascader :options="eventCategoryData" v-model="eventType" ></el-cascader>
            </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="所属系统信息">
              <el-cascader :options="relatedOrgData" v-model="styleInfo"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="事件描述" class="eventStyle">
              <el-input type="textarea" rows="4" v-model="orderForm.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button class='blueStyleBtn' @click="orderSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!-- 预警详情dialog -->
    <el-dialog title="预警详情" :visible.sync="preAlertDialog" width="70%" id="preAlertDialog">
      <el-tabs v-model="activeName">
        <el-tab-pane label="预警信息" name="first">
          <el-form :inline="true" label-position="right" label-width="100px" size="mini">
            <el-row>
              <el-col :span="8">
                <el-form-item label="预警名称">GJ001</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预警ID">GJ001</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预警编码">001</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="生成策略ID">策略ID</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="首次预警时间">2018-06-11 12:20:00</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最后预警时间">2018-06-11 12:20:00</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="预警状态">待处理</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当前预警级别">主要预警</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预警次数">2次</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="责任人">李四</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预警内容">告警内容</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="对象信息" name="second">对象信息</el-tab-pane>
        <!-- <el-tab-pane label="其他信息" name="third">
          <div>
            <h2>预警处理记录</h2>
            <el-table
              :data="prAlerttableData"
              style="width: 100%">
              <el-table-column
                prop="time"
                label="发生时间"
                width="160">
              </el-table-column>
              <el-table-column
                prop="content"
                label="预警内容"
                width="360">
              </el-table-column>
              <el-table-column
                prop="leavel"
                label="预警级别"
                width='100'
                >
              </el-table-column>
              <el-table-column
                prop="HandlePerson"
                label="处理人"
                width='80'
                >
              </el-table-column>
              <el-table-column
                prop="HandleTime"
                label="处理时间"
                >
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>-->
      </el-tabs>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="preAlertDialog = false">返回</el-button>
      </div>
    </el-dialog>

    <!-- 告警历史查询 dialog-->
    <el-dialog :visible.sync="alertHistoryDialog" width="70%" id="alertHistory">
      <el-tabs v-model="alertHistoryAcive">
        <el-tab-pane label="告警信息" name="first">
          <el-form
            :inline="true"
            :model="alertHistorytableData"
            label-position="right"
            label-width="100px"
            size="mini"
          >
            <el-row>
              <!-- <el-col :span="8">
                <el-form-item label="告警名称">{{alertHistorytableData.name}}</el-form-item>
              </el-col>-->
              <el-col :span="8">
                <el-form-item label="告警ID">{{alertHistorytableData.id}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="告警编码">{{alertHistorytableData.code}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="责任人">{{alertHistorytableData.handlerName}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="8">
                <el-form-item label="生成策略ID">{{alertHistorytableData.analysisStrategyId}}</el-form-item>
              </el-col>-->
              <el-col :span="8">
                <el-form-item label="告警状态">{{alertHistorytableData.status | leavelState}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="告警级别">{{alertHistorytableData.level | alertLeavel}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="告警次数">{{alertHistorytableData.count}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="首次告警时间"
                >{{alertHistorytableData.firstAlertTime |strToDataFromat}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="最后告警时间"
                >{{alertHistorytableData.lastAlertTime | strToDataFromat}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="告警处理时间">{{alertHistorytableData.handleTime | strToDataFromat}}</el-form-item>
              </el-col>
            </el-row>
            <el-row></el-row>
            <el-row>
              <el-col>
                <el-form-item label="告警内容">
                  <div class="alertContent">{{alertHistorytableData.content}}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="对象信息" name="second">
          <mailTable :tableData="alertHistortyTableDataThree" :tableStyle="{ width:'600px' }"></mailTable>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="alertHistoryDialog = false">返回</el-button>
      </div>
    </el-dialog>
    <!-- 告警历史表单设置显示隐藏 -->
    <el-dialog
      title="设置列隐藏/显示"
      class="cloumnStyle"
      :visible.sync="alertHistoryShowDialog"
      width="30%"
      >
      <!-- <el-table :data="alertHistoryDialogData">
        <el-table-column property="name" label="列名" align="center"></el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.select" value="s"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>-->
      <ul>
        <li v-for="(item,index) in alertHistoryDialogData" :key="index">
          <el-checkbox v-model="item.select" value="s"></el-checkbox>
          <span>{{item.name}}</span>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="confirmAlertHistroyShow" class='blueStyleBtn'>确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import * as service from "@/modules/mms/api/alertModule.js";
import * as encodeMethods from "@/modules/mms/untils/encodeurl.js";
import mailTable from "@/components/columnTable/cloumnTable.vue";
import criticalImg from '@/assets/images/critical.png'
import majorImg from '@/assets/images/major.png'
import commonImg from '@/assets/images/common.png'
// import wTable from '../../components/tableDrag/index'
export default {
  name: "monitorShow",
  data() {
    return {
      defaultWorkOrder:{},
      visibleFresh:false,
      freshTimeArr:[10,30,60,120,150,180,210],
      freshValue:'',
      currentfreshValue:0,
      setFreshTime:false,
      searchItemShow:false,
      criticalImg: criticalImg,
      majorImg: majorImg,
      commonImg: commonImg,
      //kkk
      headStyle: {
        'background-color': '#F4F8F9',
        'color': 'rgba(0,0,0,0.60)',
      },
      pickerOptionsOrder: {
        disabledDate(time) {
          // return time.getTime() < Date.now() - 8.64e7;
          return time.getTime() > Date.now();
        }
      },
      alertSelectShow:false,
      orderForm: {
        title: "",
        eventNature: "",
        eventPriority: "",
        eventInfluenceDegree: "",
        location: "",
        description: ""
      },
      eventGropu: [],
      eventGropuData: [], //事件涉及组
      styleInfo: [],
      relatedOrgData: [], //所属系统信息
      // eventType:[],
      // eventCategoryData:[],//事件类别信息
      eventNatureData: [
        {
          label: "平台告警",
          value: "平台告警"
        },
        {
          label: "系统故障",
          value: "系统故障"
        }
      ],
      eventSourceData: [
        {
          label: "监控告警",
          value: "监控告警"
        }
      ],
      eventPriorityData: [
        {
          label: "紧急",
          value: "紧急"
        },
        {
          label: "高",
          value: "高"
        },
        {
          label: "中",
          value: "中"
        },
        {
          label: "低",
          value: "低"
        }
      ],
      eventInfluenceDegreeData: [
        {
          label: "重大",
          value: "重大"
        },
        {
          label: "严重",
          value: "严重"
        },
        {
          label: "一般",
          value: "一般"
        },
        {
          label: "无",
          value: "无"
        }
      ],
      //转工单选择的idArr
      toOrderIdArr: [],
      alertTableData: [],
      alertHistortyTableDataThree: [],
      nameOne: "one",
      oneShow: true,
      twoShow: false,
      threeShow: false,
      fourShow: false,
      activeName: "first",
      currentAlertDialogData: [
        {
          name: "告警状态",
          select: true,
          flag: "currentAlertStateShow"
        },
        {
          name: "子系统名称",
          select: false,
          flag: "currentAlertsubsystemShow"
        },
        {
          name: "告警内容",
          select: true,
          flag: "currentAlertInfoShow"
        },

        {
          name: "模块名称",
          select: false,
          flag: "currentAlertmoduleShow"
        },
        {
          name: "告警级别",
          select: true,
          flag: "currentAlertLeaveShow"
        },
        {
          name: "IP",
          select: false,
          flag: "currentAlertipShow"
        },
        {
          name: "最后告警时间",
          select: true,
          flag: "currentAlertLastTimeShow"
        },
        {
          name: "业务系统名称",
          select: false,
          flag: "currentAlertappIdShow"
        },
        {
          name: "CIID",
          select: true,
          flag: "currentAlertobjShow"
        },
        {
          name: "实例名称",
          select: false,
          flag: "currentAlertinstanceShow"
        },
        {
          name: "首次告警时间",
          select: true,
          flag: "currentAlertCsShow"
        },
        {
          name: "业务相关方",
          select: false,
          flag: "currentAlertrelevantPartyShow"
        },
        {
          name: "推送状态",
          select: true,
          flag: "currentAlertPushStatusShow"
        },
        {
          name: "告警ID",
          select: false,
          flag: "currentAlertidShow"
        },
        {
          name: "告警类别",
          select: true,
          flag: "currentAlertmsgTypeShow"
        },
        {
          name: "主机名称",
          select: false,
          flag: "currentAlerthostShow"
        },
        {
          name: "告警编码",
          select: true,
          flag: "currentAlertcodeShow"
        },
        {
          name: "影响程度",
          select: true,
          flag: "currentAlertinfluenceDegreeShow"
        }
      ],
      confirmAlertData: [],
      currentAlertStateShow: true,
      currentAlertPushStatusShow: true,
      currentAlertInfoShow: true,
      currentAlertLeaveShow: true,
      currentAlertLastTimeShow: true,
      currentAlertobjShow: true,
      currentAlertCsShow: true,
      currentAlertcodeShow: true,
      currentAlertinfluenceDegreeShow: true,
      currentAlertipShow: false,
      currentAlertsubsystemShow: false,
      currentAlertappIdShow: false,
      currentAlertmoduleShow: false,
      currentAlertinstanceShow: false,
      currentAlertmsgTypeShow: true,
      currentAlertrelevantPartyShow: false,
      currentAlertidShow: false,
      currentAlerthostShow: false,
      //告警选择器和rule
      propsSelect: {
        value: "key",
        label: "name",
        children: "tags"
      },
      bizLineCodeSearch: "",
      bizLineCodeSearchHistory: "",
      listLoading: true,
      alertData: [],
      currentAlerttableData: [
        {
          time: "2018-06-15 12:00:00",
          content: "实时检查，CPU使用率大于0.85，当前值为1",
          leavel: "一般告警",
          HandlePerson: "张三",
          HandleTime: "2018-06-15 12:00:00"
        },
        {
          time: "2018-06-15 12:00:00",
          content: "实时检查，CPU使用率大于0.85，当前值为1",
          leavel: "一般告警",
          HandlePerson: "张三",
          HandleTime: "2018-06-15 12:00:00"
        }
      ],
      currentAlertShowDialog: false,
      prealertData: [
        {
          id: "YJ001",
          state: "新产生",
          object: "host-cpu:host:cpu",
          currentLeave: "严重预警(2次)",
          info: "实时检查,线程活动数大于0,当前值为3",
          lastTime: "2018/06/11 12:00:01"
        },
        {
          id: "YJ002",
          state: "新产生",
          object: "host-cpu:host:cpu",
          currentLeave: "严重预警(2次)",
          info: "实时检查,线程活动数大于0,当前值为3",
          lastTime: "2018/06/11 12:00:01"
        },
        {
          id: "YJ003",
          state: "新产生",
          object: "host-cpu:host:cpu",
          currentLeave: "严重预警(2次)",
          info: "实时检查,线程活动数大于0,当前值为3",
          lastTime: "2018/06/11 12:00:01"
        }
      ],
      prAlerttableData: [
        {
          time: "2018-06-15 12:00:00",
          content: "实时检查，CPU使用率大于0.85，当前值为1",
          leavel: "一般预警",
          HandlePerson: "张三",
          HandleTime: "2018-06-15 12:00:00"
        },
        {
          time: "2018-06-15 12:00:00",
          content: "实时检查，CPU使用率大于0.85，当前值为1",
          leavel: "一般预警",
          HandlePerson: "张三",
          HandleTime: "2018-06-15 12:00:00"
        }
      ],
      alertHistoryData: [],
      alertHistorytableData: {},
      preAlertHistoryData: [
        {
          id: "YJLSS001",
          state: "新产生",
          object: "host-cpu:host:cpu",
          currentLeave: "严重告警(2次)",
          info: "实时检查,线程活动数大于0,当前值为3",
          lastTime: "2018/06/11 12:00:01"
        },
        {
          id: "YJLSS002",
          state: "新产生",
          object: "host-cpu:host:cpu",
          currentLeave: "严重告警(2次)",
          info: "实时检查,线程活动数大于0,当前值为3",
          lastTime: "2018/06/11 12:00:01"
        },
        {
          id: "YJLSS003",
          state: "新产生",
          object: "host-cpu:host:cpu",
          currentLeave: "严重告警(2次)",
          info: "实时检查,线程活动数大于0,当前值为3",
          lastTime: "2018/06/11 12:00:01"
        }
      ],
      preAlertHistorytableData: [
        {
          time: "2018-06-15 12:00:00",
          content: "实时检查，CPU使用率大于0.85，当前值为1",
          leavel: "一般告警",
          HandlePerson: "张三",
          HandleTime: "2018-06-15 12:00:00"
        },
        {
          time: "2018-06-15 12:00:00",
          content: "实时检查，CPU使用率大于0.85，当前值为1",
          leavel: "一般告警",
          HandlePerson: "张三",
          HandleTime: "2018-06-15 12:00:00"
        }
      ],
      currentAlertSelection: [],
      currentAlertDialog: false,
      preAlertSelection: [],
      preAlertDialog: false,
      alertHistorySelection: [],
      preAlertHistorySelection: [],
      alertHistoryDialog: false,
      preAlertHistoryDialog: false,
      //-------------------当前告警start-----------------------
      sendState: [
        {
          label: "未生成工单",
          value: 0
        },
        {
          label: "待推送",
          value: 1
        },
        {
          label: "已推送",
          value: 2
        }
      ],
      alertOfLeavel: [
        // {
        //   label: "所有",
        //   value: "",
        // },
        {
          label: "严重告警",
          value: "2"
        },
        {
          label: "主要告警",
          value: "1"
        },
        {
          label: "一般告警",
          value: "0"
        }
      ],
      alertOfState: [
        {
          label: "待处理",
          value: "0"
        },
        {
          label: "处理中",
          value: "1"
        }
      ],
      alertOfStateHis: [
        {
          label: "已处理",
          value: "2"
        },
        {
          label: "已过滤",
          value: "3"
        },
        {
          label: "已恢复",
          value: "4"
        }
      ],
      alertChecked: [], //kkkk
      alertCheckData: [],
      selectorData: [], //告警选择器所有的值
      selectNameSearch: [],
      selectNameHistorySearch: [], //告警历史,
      selectFlag: true,
      selectFlagHistroy: true,
      currentAlertactiveNameInfo: "first",
      currentAlertDisposeDialog: false,
      currentAlertDisposeDialogMerge: [], //存放处理合并的数据
      currentAlertDisposeDialogRelation: [], //存放 关联的数据
      currentAlertDisposeSelectDataMerge: [], //选择的合并告警
      currentAlertDisposeSelectDataRelation: [], //选择的关联告警
      //当前告警查询数据
      currentAlertSearchData: {
        name: "",
        code: "",
        id: "",
        level: "",
        status: "",
        content: "",
        ciid: ""
      },
      alertDown: false,
      alertSelertFrom: {
        domains: []
      },
      currentSearchTime: [],
      currentSearchTimeEnd: [],
      alertleavel: "",
      alertYuLanData: {}, //告警预览数据

      pageAllFlag: true, //如果是所有数据分页,则为true fenye
      CurrentAlertParams: {}, //查询 深拷贝数据
      allLimitNumber: 10, //所有分页每一页的条数
      totalPage: 0, //总页数
      currentPage: 1, //当前页
      //-------------------当前告警end-----------------------
      disposeAlertData: [], //处理 --存放多少条告警信息    kobe1
      disposeSuggestion: "", //处理意见
      showArr: [], //存放有多少条数据显示隐藏的
      showTotalItem: [], //最外面的下拉按钮
      //-------------------告警历史start-----------------------
      alertHistoryAcive: "first",
      alertHistorySearch: {
        name: "",
        code: "",
        id: "",
        level: "",
        status: "",
        content: "",
        ciid: ""
      },
      alertHistoryTime: [],
      alertHistoryTimeEnd: [],
      alertSelertFromHistory: {
        domains: []
      },
      alertDownHistory: false,
      orderListDialog: false,
      //-------------告警历史分页
      historyPageAllFlag: true, //如果是所有数据分页,则为true fenye
      historyAlertParams: {}, //查询 深拷贝数据
      historyTotalPage: 0, //总页数
      historyCurrentPage: 1, //当前页
      allLimitNumberThree: 10, //所有分页每一页的条数

      alertHistoryShowDialog: false,
      alertHistoryDialogData: [
        {
          name: "告警状态",
          select: true,
          flag: "alertHistoryStateShow"
        },
        {
          name: "IP",
          select: false,
          flag: "alertHistoryipShow"
        },
        {
          name: "告警内容",
          select: true,
          flag: "alertHistoryInfoShow"
        },
        {
          name: "子系统名称",
          select: false,
          flag: "alertHistorysubsystemShow"
        },
        {
          name: "告警级别",
          select: true,
          flag: "alertHistoryLeaveShow"
        },
        {
          name: "业务系统名称",
          select: false,
          flag: "alertHistoryappIdShow"
        },
        {
          name: "最后告警时间",
          select: true,
          flag: "alertHistoryLastTimeShow"
        },
        {
          name: "模块名称",
          select: false,
          flag: "alertHistorymoduleShow"
        },
        {
          name: "CIID",
          select: true,
          flag: "alertHistoryobjShow"
        },
        {
          name: "实例名称",
          select: false,
          flag: "alertHistoryinstanceShow"
        },
        {
          name: "首次告警时间",
          select: true,
          flag: "alertHistoryCsShow"
        },
        {
          name: "业务相关方",
          select: false,
          flag: "alertHistoryrelevantPartyShow"
        },
        {
          name: "推送状态",
          select: true,
          flag: "alertHistoryPushStatusShow"
        },
        {
          name: "告警ID",
          select: false,
          flag: "alertHistoryidShow"
        },
        {
          name: "告警类别",
          select: true,
          flag: "alertHistorymsgTypeShow"
        },
        {
          name: "主机名称",
          select: false,
          flag: "alertHistoryhostShow"
        },
        {
          name: "告警编码",
          select: true,
          flag: "alertHistorycodeShow"
        }
      ],
      isTimeOut: true,
      alertHistoryPushStatusShow: true,
      alertHistoryStateShow: true,
      alertHistoryInfoShow: true,
      alertHistoryLeaveShow: true,
      alertHistoryLastTimeShow: true,
      alertHistoryobjShow: true,
      alertHistoryCsShow: true,
      alertHistorycodeShow: true,
      alertHistoryipShow: false,
      alertHistorysubsystemShow: false,
      alertHistoryappIdShow: false,
      alertHistorymoduleShow: false,
      alertHistoryinstanceShow: false,
      alertHistorymsgTypeShow: true,
      alertHistoryrelevantPartyShow: false,
      alertHistoryidShow: false,
      alertHistoryhostShow: false,
      //-------------------告警历史end-----------------------
      timeZero: "",
      // checkAll:'',
      arrTemp:[],
    };
  },
  methods: {
     //获取localstorage列的隐藏显示
    getColData(){
      let colData = localStorage.getItem('currentAlertColData')
      if(colData){
        let colObj = JSON.parse(colData);
        for (const key in colObj) {
          this[key] = colObj[key]
        }
      }
    },
    //输入框为整数
    proving() {
      this.freshValue = this.freshValue.replace(
        /[^\.\d]/g,
        ""
      );
      this.freshValue = this.freshValue.replace(".", "");
    },
    setFreshValue(val){
      this.freshValue=val
    },
    searchItemDown(){
      this.searchItemShow = !this.searchItemShow
      this.alertDown=false;
    },
    nameSearch() {
      this.currentAlertSearchData.host = this.currentAlertSearchData.host.replace(
        /[^\w\u4E00-\u9FA5]/g,
        ""
      );
    },
    codeSearch() {
      let reg = new RegExp("[`~!@#%$^&*()=|{}':',\\[\\].<>《》~！@#￥……&*（）——|?{}【】‘；;：”“'。，、？]", 'g');
      if(reg.test(this.currentAlertSearchData.code)){
        this.currentAlertSearchData.code='';   
      }
    },
    CIIDSearch() {
      let reg = new RegExp("[`~!@#%$^&*()=|{}':',\\[\\].<>《》~！@#￥……&*（）——|?{}【】‘；;：”“'。，、？]", 'g');
      if(reg.test(this.currentAlertSearchData.ciid)){
        this.currentAlertSearchData.ciid='';   
      }
    },
    contentSearch() {
      this.currentAlertSearchData.content = this.currentAlertSearchData.content.replace(
         /[^\w\u4E00-\u9FA5]/g,
        ""
      );
    },
    titleAdd() {
      this.orderForm.title = this.orderForm.title.replace(
         /[^\w\u4E00-\u9FA5]/g,
        ""
      );
    },
    locationAdd() {
      this.orderForm.location = this.orderForm.location.replace(
         /[^\w\u4E00-\u9FA5]/g,
        ""
      );
    },
    //刷新频率确定
    confirmFreshTime(){
      if(!this.freshValue){
        this.$message({
          showClose: true,
          message: '请设置刷新评率',
          type: 'warning'
        });
        return;
      }

      this.$message({
         showClose: true,
         message: '设置成功',
         type: 'success'
       });
      this.currentfreshValue=this.freshValue;
      this.visibleFresh=false;
      this.freshTimeOut(this.freshValue)
    },
    freshTimeOut(val){
      this.timeZero = setInterval(() => {
          // this.currentPage = 1;
          this.queryCurrentAllData(this.currentPage);
      }, val*60*1000);
    },
    //当前告警定时刷新
    freshTime(val) {
      if (!val) {
        this.$notify.success({
          message: "已开启定时刷新,请设置刷新时间",
          showClose: false,
          duration: 2000
        });
        this.setFreshTime=true;
        this.currentfreshValue=0;
        this.freshValue='';
      } else {
         this.setFreshTime=false;
        clearInterval(this.timeZero);
        this.timeZero = null;
        this.$notify.success({
          message: "已开启手动刷新",
          showClose: false,
          duration: 2000
        });
      }
    },
    // 转工单提交
    orderSubmit() {
      // console.log(this.toOrderIdArr);
      // console.log(this.styleInfo);
      this.orderForm.alertIds = this.toOrderIdArr;
      this.orderForm.relatedOrg = this.eventGropu.join("&");

      this.orderForm.system = this.styleInfo[0]; //系统类型
      this.orderForm.systemSubclass = this.styleInfo[1] || ""; //系统子类
      this.orderForm.systemItem = this.styleInfo[2] || ""; //系统条

      // this.orderForm.eventCategory = this.eventType[0]; //事件类别
      // this.orderForm.eventCategory1 = this.eventType[1] || ""; //事件子类
      // this.orderForm.eventCategory2 = this.eventType[2] || ""; //事件条目
      console.log(this.orderForm);
      service.submitOrder(this.orderForm).then(res => {
        this.$message({
          message: "工单提交成功",
          type: "success"
        });
        this.orderListDialog = false;
        this.queryCurrentAllData(1);
      });
    },
    kobe1(tab) {
      console.log(tab.name);
      if (tab.name == "one") {
        this.oneShow = true;
        this.twoShow = false;
        this.threeShow = false;
        this.fourShow = false;
      }
      if (tab.name == "two") {
        this.oneShow = false;
        this.twoShow = true;
        this.threeShow = false;
        this.fourShow = false;
      }
      if (tab.name == "three") {
        this.oneShow = false;
        this.twoShow = false;
        this.threeShow = true;
        this.fourShow = false;
      }
      if (tab.name == "four") {
        this.oneShow = false;
        this.twoShow = false;
        this.threeShow = false;
        this.fourShow = true;
      }
    },
    currentAlertRowChange(row) {
      this.currentAlertactiveNameInfo = "first";
      service.currentAlertSingleSearch(row.id).then(res => {
        this.alertYuLanData = res.data;
        console.log(res.data);
        let result = res.data.resObj;
        if (result) {
          this.alertTableData = result.filter(val => {
            return val.label;
          });
        } else {
          this.alertTableData = [];
        }
      });
      this.currentAlertDialog = true;
    },
    //当前告警设置列显示隐藏
    setShowDialog() {
      this.currentAlertShowDialog = true;
      this.currentAlertDialogData.forEach(val => {
        if (this[val.flag]) {
          val.select = true;
        } else {
          val.select = false;
        }
      });
    },
    //告警历史设置列显示隐藏
    setAlertDialog() {
      this.alertHistoryShowDialog = true;
      this.alertHistoryDialogData.forEach(val => {
        if (this[val.flag]) {
          val.select = true;
        } else {
          val.select = false;
        }
      });
    },
    preAlertSelectionChange(val) {
      this.preAlertSelection = val;
    },
    preAlertRowChange(row) {
      this.preAlertDialog = true;
      // this.drawLine();
    },
    alertHistorySelectionChange(val) {
      console.log(val);
      this.alertHistorySelection = val;
    },
    alertHistoryRowChange(row) {
      this.alertHistoryAcive = "first";
      service.currentAlertSingleSearch(row.id).then(res => {
        this.alertHistorytableData = res.data;
        let result = res.data.resObj;
        if (result) {
          this.alertHistortyTableDataThree = result.filter(val => {
            return val.label;
          });
        } else {
          this.alertHistortyTableDataThree = [];
        }
        this.alertHistoryDialog = true;
      });
    },
    preAlertHistorySelectionChange(val) {
      console.log(val);
      this.preAlertHistorySelection = val;
    },
    preAlertHistoryRowChange(row) {
      this.preAlertHistoryDialog = true;
      // this.drawLine();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    currentAlertExportCheck() {
      if (this.currentAlertSelection.length) {
        import("@/modules/mms/vendor/Export2Excel").then(excel => {
          const tHeader = [
            "告警编码",
            "告警ID",
            "告警状态",
            "推送状态",
            "影响程度",
            "CIID",
            "主机名称",
            "IP",
            "子系统名称",
            "业务系统",
            "模块名称",
            "实例名称",
            "告警类别",
            "业务相关方",
            "首次告警时间",
            "最后告警时间",
            "告警级别",
            "告警内容"
          ];
          const filterVal = [
            "code",
            "id",
            "status",
            "pushStatus",
            "influenceDegree",
            "ciid",
            "host",
            "ip",
            "subSystem",
            "appId",
            "module",
            "instance",
            "msgType",
            "relevantParty",
            "firstAlertTime",
            "lastAlertTime",
            "level",
            "content"
          ];
          const list = this.currentAlertSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "当前告警信息"
          });
          this.$refs.currentAlertTable.clearSelection();
        });
      } else {
        // this.$message({
        //   message: "Please select at least one item",
        //   type: "warning"
        // });
        this.currentAlertExportAll();
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    currentAlertExportAll() {
      import("@/modules/mms/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "告警编码",
          "告警ID",
          "告警状态",
          "推送状态",
          "影响程度",
          "CIID",
          "主机名称",
          "IP",
          "子系统名称",
          "业务系统",
          "模块名称",
          "实例名称",
          "告警类别",
          "业务相关方",
          "首次告警时间",
          "最后告警时间",
          "告警级别",
          "告警内容"
        ];
        const filterVal = [
          "code",
          "id",
          "status",
          "pushStatus",
          "influenceDegree",
          "ciid",
          "host",
          "ip",
          "subSystem",
          "appId",
          "module",
          "instance",
          "msgType",
          "relevantParty",
          "firstAlertTime",
          "lastAlertTime",
          "level",
          "content"
        ];
        const list = this.alertData;
        const data = this.formatJsonAll(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "当前告警信息",
          autoWidth: true
        });
      });
    },
    formatJsonAll(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            // return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    preAlertExportCheck() {
      if (this.preAlertSelection.length) {
        import("@/modules/mms/vendor/Export2Excel").then(excel => {
          const tHeader = [
            "预警ID",
            "预警状态",
            "对象",
            "当前预警级别(次数)",
            "预警内容",
            "最后发生时间"
          ];
          const filterVal = [
            "id",
            "state",
            "object",
            "currentLeave",
            "info",
            "lastTime"
          ];
          const list = this.preAlertSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "预警信息"
          });
          this.$refs.preAlertTable.clearSelection();
        });
      } else {
        this.$message({
          message: "Please select at least one item",
          type: "warning"
        });
      }
    },
    preAlertExportAll() {
      import("@/modules/mms/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "预警ID",
          "预警状态",
          "对象",
          "当前预警级别(次数)",
          "预警内容",
          "最后发生时间"
        ];
        const filterVal = [
          "id",
          "state",
          "object",
          "currentLeave",
          "info",
          "lastTime"
        ];
        const list = this.prealertData;
        const data = this.formatJsonAll(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "当前预警信息",
          autoWidth: true
        });
      });
    },
    alertHistoryExportCheck() {
      if (this.alertHistorySelection.length) {
        import("@/modules/mms/vendor/Export2Excel").then(excel => {
          const tHeader = [
            "告警编码",
            "告警ID",
            "告警状态",
            "推送状态",
            "CIID",
            "主机名称",
            "IP",
            "子系统名称",
            "业务系统",
            "模块名称",
            "实例名称",
            "告警类别",
            "业务相关方",
            "首次告警时间",
            "最后告警时间",
            "告警级别",
            "告警内容"
          ];
          const filterVal = [
            "code",
            "id",
            "status",
            "pushStatus",
            "ciid",
            "host",
            "ip",
            "subSystem",
            "appId",
            "module",
            "instance",
            "msgType",
            "relevantParty",
            "firstAlertTime",
            "lastAlertTime",
            "level",
            "content"
          ];
          const list = this.alertHistorySelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "告警历史信息"
          });
          this.$refs.alertHistoryTable.clearSelection();
        });
      } else {
        this.$message({
          message: "Please select at least one item",
          type: "warning"
        });
      }
    },
    alertHistoryExportAll() {
      import("@/modules/mms/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "告警编码",
          "告警ID",
          "告警状态",
          "推送状态",
          "CIID",
          "主机名称",
          "IP",
          "子系统名称",
          "业务系统",
          "模块名称",
          "实例名称",
          "告警类别",
          "业务相关方",
          "首次告警时间",
          "最后告警时间",
          "告警级别",
          "告警内容"
        ];
        const filterVal = [
          "code",
          "id",
          "status",
          "pushStatus",
          "ciid",
          "host",
          "ip",
          "subSystem",
          "appId",
          "module",
          "instance",
          "msgType",
          "relevantParty",
          "firstAlertTime",
          "lastAlertTime",
          "level",
          "content"
        ];
        const list = this.alertHistoryData;
        const data = this.formatJsonAll(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "告警历史信息",
          autoWidth: true
        });
      });
    },
    preAlertHistoryExportCheck() {
      if (this.preAlertHistorySelection.length) {
        import("@/modules/mms/vendor/Export2Excel").then(excel => {
          const tHeader = [
            "预警ID",
            "预警状态",
            "对象",
            "当前预警级别(次数)",
            "预警内容",
            "最后发生时间"
          ];
          const filterVal = [
            "id",
            "state",
            "object",
            "currentLeave",
            "info",
            "lastTime"
          ];
          const list = this.preAlertHistorySelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "预警历史信息"
          });
          this.$refs.preAlertHistoryTable.clearSelection();
        });
      } else {
        this.$message({
          message: "Please select at least one item",
          type: "warning"
        });
      }
    },
    preAlertHistoryExportAll() {
      import("@/modules/mms/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "预警ID",
          "预警状态",
          "对象",
          "当前预警级别(次数)",
          "预警内容",
          "最后发生时间"
        ];
        const filterVal = [
          "id",
          "state",
          "object",
          "currentLeave",
          "info",
          "lastTime"
        ];
        const list = this.preAlertHistoryData;
        const data = this.formatJsonAll(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "预警历史信息",
          autoWidth: true
        });
      });
    },
    //-------------当前告警方法start kobe1-------
    addDomain() {
      if (this.selectNameSearch.length) {
        //[key:value]
        //第一次
        if (this.alertSelertFrom.domains.length) {
          //判断重复line
          if (this.selectNameSearch[0] != this.bizLineCodeSearch) {
            this.$message({
              message: "告警选择器业务线不一致",
              type: "error"
            });
            return;
          }
          //判断不能是重复的选择器
          this.selectFlag = true;
          this.alertSelertFrom.domains.forEach(val => {
            if (this.selectNameSearch[1] == val.key) {
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.selectFlag = false;
            }
          });

          if (this.selectFlag) {
            let backName = "";
            let backNameKey = "";
            this.selectorData.forEach(val => {
              // this.bizLineCodeSearch = val.key;
              if (val.key == this.bizLineCodeSearch) {
                if (val.tags) {
                  val.tags.forEach(value => {
                    if (value.key == this.selectNameSearch[1]) {
                      backName = value.name;
                      backNameKey = value.key;
                    }
                  });
                }
              }
            });
            this.alertSelertFrom.domains.push({
              key: backNameKey,
              value: "",
              name: backName
            });
          }
        } else {
          console.log("没有长度");
          this.bizLineCodeSearch = this.selectNameSearch[0];

          let backName = "";
          let backNameKey = "";
          this.selectorData.forEach(val => {
            if (val.key == this.bizLineCodeSearch) {
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == this.selectNameSearch[1]) {
                    backName = value.name;
                    backNameKey = value.key;
                  }
                });
              }
            }
          });
          this.alertSelertFrom.domains.push({
            key: backNameKey,
            value: "",
            name: backName
          });
        }
      } else {
        this.$message({
          message: "请选择告警选择器",
          type: "error"
        });
      }
    },
    removeDomain(item) {
      var index = this.alertSelertFrom.domains.indexOf(item);
      if (index !== -1) {
        this.alertSelertFrom.domains.splice(index, 1);
      }
    },
    //条件查询
    queryCurrentAlert(startPage, flag) {
      this.pageAllFlag = false;
      this.listLoading=true;
      if (flag) {
        this.currentPage = 1;
        if (this.currentSearchTime) {
          this.currentAlertSearchData.firstAlertTimeStart = this.currentSearchTime[0];
          this.currentAlertSearchData.firstAlertTimeEnd = this.currentSearchTime[1];
        } else {
          this.currentAlertSearchData.firstAlertTimeStart = "";
          this.currentAlertSearchData.firstAlertTimeEnd = "";
        }
        if (this.currentSearchTimeEnd) {
          this.currentAlertSearchData.lastAlertTimeStart = this.currentSearchTimeEnd[0];
          this.currentAlertSearchData.lastAlertTimeEnd = this.currentSearchTimeEnd[1];
        } else {
          this.currentAlertSearchData.lastAlertTimeStart = "";
          this.currentAlertSearchData.lastAlertTimeEnd = "";
        }

        const inputData = this.alertSelertFrom.domains;
        if (inputData.length) {
          let newObj = {};
          inputData.forEach(res => {
            var kk = res.key;
            newObj[kk] = res.value;
          });
          this.currentAlertSearchData.tags = encodeURIComponent(
            encodeMethods.encode(newObj).join(",")
          );
        } else {
          this.currentAlertSearchData.tags = "";
        }
        //业务线
        // delete this.currentAlertSearchData.bizLineCode
        // if (this.bizLineCodeSearch) {
        //   this.currentAlertSearchData.bizLineCode = this.bizLineCodeSearch;
        // } else {
        //   this.currentAlertSearchData.bizLineCode = "";
        // }
        // console.log(this.currentAlertSearchData);

        this.CurrentAlertParams = JSON.parse(
          JSON.stringify(this.currentAlertSearchData)
        );
        if(this.CurrentAlertParams.content){
          this.CurrentAlertParams.content=encodeURIComponent(this.CurrentAlertParams.content)
        }
      }
      this.CurrentAlertParams.start = (startPage - 1) * this.allLimitNumber;
      this.CurrentAlertParams.limit = this.allLimitNumber;
      if (!this.currentAlertSearchData.status) {
        this.CurrentAlertParams.status = -1;
      }
      // console.log(this.CurrentAlertParams);
      // let paramsObj = this.CurrentAlertParams;
      // let a = "";
      // let params = ""; //传给后台的参数
      // for (const key in paramsObj) {
      //   if (key != "rule") {
      //     a += key + "=" + paramsObj[key] + "&";
      //   }
      // }
      // params=a.substring(0, a.length - 1);
      let params = encodeMethods.objToStr(this.CurrentAlertParams);
      console.log(params);
      service.currentAlertSearchSingle(params).then(res => {
         this.listLoading=false;
        this.alertData = res.data;
        this.totalPage = res.count;
      });
    },
    //查询所有
    queryCurrentAllData(pageNumber) {
      let params = {
        // isGeneral:true,
        start: (pageNumber - 1) * this.allLimitNumber,
        limit: this.allLimitNumber,
        status: -1
      };
      service.currentAlertSearch(params).then(res => {
        this.listLoading=false;
        this.alertData = res.data;
        this.totalPage = res.count;
      });
    },
    handPush(id){
      console.log(id);
    },
    //分页 fenye
    //pageAllFlag:true,
    currentAlertPage(pageNumber) {
       this.listLoading=true;
      this.currentPage = pageNumber;
      if (this.pageAllFlag) {
        //如果查询所有的数据
        this.queryCurrentAllData(pageNumber);
      } else {
        //如果是查询参数的数据
        this.queryCurrentAlert(pageNumber, false);
      }
    },
    alertSizeChange(val) {
      this.listLoading=true;
      this.allLimitNumber = val;
      this.currentPage = 1;
      if (this.pageAllFlag) {
        //如果查询所有的数据
        this.queryCurrentAllData(1);
      } else {
        //如果是查询参数的数据
        this.queryCurrentAlert(1, false);
      }
    },
    //重置
    currentReset() {
     
      this.bizLineCodeSearch = "";
      this.selectNameSearch = [];
      this.pageAllFlag = true;
      this.currentAlertSearchData = {};
      this.currentSearchTime = [];
      this.currentSearchTimeEnd = [];
      this.alertSelertFrom.domains = [];
      this.alertDown = false;
      // this.currentPage = 1;
      //  this.listLoading=true;
      // this.queryCurrentAllData(1);
    },
    showHe(index) {
      this.showArr[index].key1 = !this.showArr[index].key1;
    },
    showGuan(index) {
      this.showArr[index].key2 = !this.showArr[index].key2;
    },
    showTotal(index) {
      this.showTotalItem[index].key = !this.showTotalItem[index].key;
    },
    confirmCurrentAlertShow() {
      this.currentAlertDialogData.forEach(val => {
        this[val.flag] = val.select;
      });
      this.currentAlertShowDialog = false;
      let obj = {};
      this.currentAlertDialogData.forEach(val=>{
        let dd=val.flag
        obj[dd]=val.select
      })
      localStorage.setItem('currentAlertColData',JSON.stringify(obj))
    },
    currentAlertSelectionChange(val) {
      this.currentAlertSelection = val;
    },
    alertCheckChange(id, checkFlag) {
      if (checkFlag) {
        this.alertCheckData.push(id);
      } else {
        let index = this.alertCheckData.indexOf(id);
        this.alertCheckData.splice(index, 1);
      }
    },
    //告警处理按钮
    currentAlertDispose() {
      //拿到数据id
      if (this.currentAlertSelection.length) {
        //重置数据showArr:[{'key1':false,'key2':false},{'key1':false,'key2':false}]
        this.showArr.forEach(val => {
          for (let key in val) {
            val[key] = false;
          }
        });
        this.showTotalItem.forEach(val => {
          val.key = false;
        });

        let idArr = [];
        console.log(this.currentAlertSelection);
        this.currentAlertSelection.forEach(val => {
          if (val.refId) {
            idArr.push(val.refId);
          } else {
            idArr.push(val.id);
          }
        });
        console.log(idArr);

        //告警处理
        let params = {
          id: idArr.join(",")
        };
        service.currentAlertProcesess(params).then(res => {
          this.disposeAlertData = res.data.alerts;
          this.alertChecked=[];
          this.alertCheckData=[]
          res.data.alerts.forEach(val=>{
            this.alertChecked.push(true)
            this.alertCheckData.push(val.id)
          })
          this.arrTemp =  this.alertCheckData
          //-----start 关联和合并单独性
          //有合并
          res.data.merges.forEach((val,i)=>{
            if(val.length){
              this.disposeAlertData[i].hasMerges=true;
            }else{
               this.disposeAlertData[i].hasMerges=false;
            }
          })
          res.data.links.forEach((val,i)=>{
            if(val.length){
              this.disposeAlertData[i].hasLinks=true;
            }else{
              this.disposeAlertData[i].hasLinks=false;
            }
          })
            
          //-----end
          this.currentAlertDisposeDialogRelation = res.data.links;
          this.currentAlertDisposeDialogMerge = res.data.merges;

          this.disposeSuggestion = "";
          this.currentAlertDisposeDialog = true;
          this.confirmAlertData = res.data.alerts;
          //-------
          let result = res.data;
          //事件涉及组
          let deep = function(arr) {
            arr.forEach(item => {
              item.value = item.object.deptId;
              item.label = item.object.deptName;
              if (item.children) {
                deep(item.children);
              }
            });
          };
          let deep1 = function(arr) {
            arr.forEach(item => {
              item.value = item.object.id;
              item.label = item.object.name;
              if (item.children) {
                deep1(item.children);
              }
            });
          };
          deep(result.depts);
          deep1(result.resModelSystem);
          this.eventGropuData = result.depts;
          this.relatedOrgData = result.resModelSystem;
          //工单默认信息
          this.defaultWorkOrder =  result.defaultWorkOrder;
        });
      } else {
        this.$message({
          message: "请选择数据",
          type: "error"
        });
      }
    },
    //处理  选择的合并告警
    selectChangeHe(value) {
        this.currentAlertDisposeSelectDataMerge=[];
      if (value.length) {
        value.forEach(val => {
          this.currentAlertDisposeSelectDataMerge.push(val.id);
        });
      }
    },
    //选择的关联告警
    selectChangeGuan(value) {
        this.currentAlertDisposeSelectDataRelation=[];
      if (value.length) {
        value.forEach(val => {
          this.currentAlertDisposeSelectDataRelation.push(val.id);
        });
      }
    },
    checkboxT(row) {
      if (row.status != 0) {
        return 0;
      } else {
        return 1;
      }
    },
    clearAlertData() {
      //处理的dialog消失之前,先把所选择的告警放到数组里面
      this.toOrderIdArr = this.alertCheckData
        .concat(this.currentAlertDisposeSelectDataMerge)
        .concat(this.currentAlertDisposeSelectDataRelation);

      this.currentAlertDisposeSelectDataMerge = [];
      this.currentAlertDisposeSelectDataRelation = [];
      this.alertCheckData = [];
      this.alertChecked = [];
      this.currentAlertSelection.forEach(val => {
        this.alertChecked.push(false);
      });
    },
    //处理--确定
    disposeConfirm(order) {
      console.log(this.alertCheckData);
      // console.log(this.currentAlertDisposeSelectDataMerge);
      // console.log(this.currentAlertDisposeSelectDataRelation);
      let data = {
        handleSuggestion: this.disposeSuggestion,
        id: this.alertCheckData
          .concat(this.currentAlertDisposeSelectDataMerge)
          .concat(this.currentAlertDisposeSelectDataRelation)
          .join(","),
        isTransferOrder: order
      };
      console.log(data);
      service.currentAlertProcesessSave(data).then(res => {
        this.$message({
          message: "处理成功",
          type: "success"
        });
        this.currentAlertDisposeSelectDataMerge = [];
        this.currentAlertDisposeSelectDataRelation = [];
        this.queryCurrentAllData(1);
        this.currentAlertDisposeDialog = false;
      });
    },
    toOrderList() {
      this.orderForm = {
        title: "",
        eventNature: "",
        eventPriority: "",
        eventInfluenceDegree: "",
        location: "",
        description: ""
      };
      this.eventGropu = [];
      this.styleInfo = [];
      //请求工单信息
      if (
        !this.alertCheckData.length &&
        !this.currentAlertDisposeSelectDataMerge.length &&
        !this.currentAlertDisposeSelectDataRelation.length
      ) {
        this.$message({
          message: "请选择要转工单的告警",
          type: "error"
        });
        return;
      }
      this.currentAlertDisposeDialog = false;
      this.orderListDialog = true;
      //默认填好工单的某些信息
      this.orderForm.eventNature = this.defaultWorkOrder.eventNature;
      this.orderForm.eventPriority = this.defaultWorkOrder.eventPriority;
      this.orderForm.eventInfluenceDegree = this.defaultWorkOrder.eventInfluenceDegree;
      this.orderForm.location = this.defaultWorkOrder.location;
      this.styleInfo=[];
      this.styleInfo.push(this.defaultWorkOrder.system,this.defaultWorkOrder.systemSubclass,this.defaultWorkOrder.systemItem)

    },
    //-------------当前告警方法end-------

    //-------------告警历史方法start-------

    confirmAlertHistroyShow() {
      this.alertHistoryDialogData.forEach(val => {
        this[val.flag] = val.select;
      });
      this.alertHistoryShowDialog = false;
    },
    //所有数据
    queryAlertHistoryAllData(pageNumber) {
      let params = {
        // isGeneral:true,
        start: (pageNumber - 1) * this.allLimitNumberThree,
        limit: this.allLimitNumberThree,
        status: 2
      };
      service.currentAlertSearch(params).then(res => {
        this.alertHistoryData = res.data;
        this.historyTotalPage = res.count;
      });
    },
    queryAlertHistory(startPage, flag) {
      this.historyPageAllFlag = false;

      if (flag) {
        this.historyCurrentPage = 1;
        if (this.alertHistoryTime.length) {
          this.alertHistorySearch.firstAlertTimeStart = this.alertHistoryTime[0];
          this.alertHistorySearch.firstAlertTimeEnd = this.alertHistoryTime[1];
        } else {
          this.alertHistorySearch.firstAlertTimeStart = "";
          this.alertHistorySearch.firstAlertTimeEnd = "";
        }
        if (this.alertHistoryTimeEnd.length) {
          this.alertHistorySearch.lastAlertTimeStart = this.alertHistoryTimeEnd[0];
          this.alertHistorySearch.lastAlertTimeEnd = this.alertHistoryTimeEnd[1];
        } else {
          this.alertHistorySearch.lastAlertTimeStart = "";
          this.alertHistorySearch.lastAlertTimeEnd = "";
        }
        const inputData = this.alertSelertFromHistory.domains;
        if (inputData.length) {
          let newObj = {};
          inputData.forEach(res => {
            var kk = res.key;
            newObj[kk] = res.value;
          });
          this.alertHistorySearch.tags = encodeURIComponent(
            encodeMethods.encode(newObj).join(",")
          );
        } else {
          this.alertHistorySearch.tags = "";
        }
        //业务线
        // if (this.bizLineCodeSearchHistory) {
        //   this.alertHistorySearch.bizLineCode = this.bizLineCodeSearchHistory;
        // } else {
        //   this.alertHistorySearch.bizLineCode = "";
        // }

        this.historyAlertParams = JSON.parse(
          JSON.stringify(this.alertHistorySearch)
        );

        if (!this.alertHistorySearch.status) {
          this.historyAlertParams.status = 2;
        }
      }
      this.historyAlertParams.start =
        (startPage - 1) * this.allLimitNumberThree;
      this.historyAlertParams.limit = this.allLimitNumberThree;
      // console.log(this.alertSelertFromHistory.domains);
      let params = encodeMethods.objToStr(this.historyAlertParams);
      service.currentAlertSearchSingle(params).then(res => {
        this.alertHistoryData = res.data;
        this.historyTotalPage = res.count;
      });
    },
    //分页选择
    historyChange(val) {
      console.log(val);
      this.historyCurrentPage = val;
      if (this.historyPageAllFlag) {
        //如果查询所有的数据
        this.queryAlertHistoryAllData(val);
      } else {
        //如果是查询参数的数据
        this.queryAlertHistory(val, false);
      }
    },
    alertHistoryizeChange(val) {
      this.historyCurrentPage = 1;
      this.allLimitNumberThree = val;
      if (this.historyPageAllFlag) {
        //如果查询所有的数据
        this.queryAlertHistoryAllData(1);
      } else {
        //如果是查询参数的数据
        this.queryAlertHistory(1, false);
      }
    },
    addDomainHistory() {
      if (this.selectNameHistorySearch.length) {
        //[key:value]
        //第一次
        if (this.alertSelertFromHistory.domains.length) {
          //判断重复line
          if (
            this.selectNameHistorySearch[0] != this.bizLineCodeSearchHistory
          ) {
            this.$message({
              message: "告警选择器业务线不一致",
              type: "error"
            });
            return;
          }
          //判断不能是重复的选择器
          this.selectFlagHistroy = true;
          this.alertSelertFromHistory.domains.forEach(val => {
            if (this.selectNameHistorySearch[1] == val.key) {
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.selectFlagHistroy = false;
            }
          });

          if (this.selectFlagHistroy) {
            let backName = "";
            let backNameKey = "";
            this.selectorData.forEach(val => {
              this.bizLineCodeSearchHistory = val.key;
              if (val.key == this.bizLineCodeSearchHistory) {
                if (val.tags) {
                  val.tags.forEach(value => {
                    if (value.key == this.selectNameHistorySearch[1]) {
                      backName = value.name;
                      backNameKey = value.key;
                    }
                  });
                }
              }
            });
            this.alertSelertFromHistory.domains.push({
              key: backNameKey,
              value: "",
              name: backName
            });
          }
        } else {
          console.log("没有长度");
          this.bizLineCodeSearchHistory = this.selectNameHistorySearch[0];

          let backName = "";
          let backNameKey = "";
          this.selectorData.forEach(val => {
            if (val.key == this.bizLineCodeSearchHistory) {
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == this.selectNameHistorySearch[1]) {
                    backName = value.name;
                    backNameKey = value.key;
                  }
                });
              }
            }
          });
          this.alertSelertFromHistory.domains.push({
            key: backNameKey,
            value: "",
            name: backName
          });
        }
      } else {
        this.$message({
          message: "请选择告警选择器",
          type: "error"
        });
      }
      /* if (this.selectNameHistorySearch) {
        //[key:value]
        if (this.alertSelertFromHistory.domains.length) {
          this.alertSelertFromHistory.domains.forEach(val => {
            if (this.selectNameHistorySearch == val.key) {
              console.log(11);
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.selectFlag = false;
            } else {
              console.log("true");
              this.selectFlag = true;
            }
          });
          if (this.selectFlag) {
            console.log(22);
            let backName = "";
            this.selectorData.forEach(val => {
              if (val.key == this.selectNameHistorySearch) {
                backName = val.name;
              }
            });
            this.alertSelertFromHistory.domains.push({
              key: this.selectNameHistorySearch,
              value: "",
              name: backName
            });
          }
        } else {
          console.log("没有长度");
          let backName = "";
          this.selectorData.forEach(val => {
            if (val.key == this.selectNameHistorySearch) {
              backName = val.name;
            }
          });
          this.alertSelertFromHistory.domains.push({
            key: this.selectNameHistorySearch,
            value: "",
            name: backName
          });
        }
      } else {
        this.$message({
          message: "请选择告警选择器",
          type: "error"
        });
      } */
    },
    removeDomainHistory(item) {
      var index = this.alertSelertFromHistory.domains.indexOf(item);
      if (index !== -1) {
        this.alertSelertFromHistory.domains.splice(index, 1);
      }
    },
    //告警历史重置
    alertHistoryReset() {
      this.bizLineCodeSearchHistory = "";
      this.selectNameHistorySearch = [];
      this.historyPageAllFlag = true;
      this.historyCurrentPage = 1;
      this.alertHistorySearch = {
        name: "",
        code: "",
        id: "",
        level: "",
        status: "",
        content: "",
        ciid: ""
      };
      this.alertSelertFromHistory.domains = [];
      this.alertDownHistory = false;
      this.alertHistoryTime = [];
      this.alertHistoryTimeEnd = [];
      this.queryAlertHistoryAllData(1);
    },
    //-------------告警历史方法end-------
    //处理里面下拉显示的初始值
    dropSatartVal() {
      for (let i = 0; i < 50; i++) {
        this.showArr.push({ key1: false, key2: false });
        this.showTotalItem.push({ key: false });
      }
    },
    //选择器的请求
    selectSearch(params) {
      service.ruleSearchService(params).then(res => {
        this.selectorData = res.data;
      });
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = document.querySelector('.cardM').offsetTop
      
      if (scrollTop > offsetTop) {
        if(this.alertDown){
          this.alertSelectShow=true;
        }
      } else {
         this.alertSelectShow=false;
      }
    },
  },
  components: {
    mailTable
  },
  computed: {
    checkAll:{
      get(){ 
            return this.alertChecked.every(p=>p);
          },
      set(val){ 
        let arr = [];
        if(val){
          this.alertCheckData= this.arrTemp
        }else{
          this.alertCheckData=[]
        }
        this.alertChecked.forEach(p=>{
          arr.push(val)
        })
        this.alertChecked=arr;
      }
    },
  },
  mounted() {
    this.getColData();
    window.addEventListener('scroll', this.handleScroll);
    this.selectSearch();
    this.dropSatartVal();
    this.queryCurrentAllData(1);
    // this.queryAlertHistoryAllData(1);
  },
  destroyed () {//离开该页面需要移除这个监听的事件
    window.removeEventListener('scroll', this.handleScroll)
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scope>
.monitor-container {
  .isFixed{
    position:fixed !important;
    top:59px;
    z-index:999;
  }
  
    .iconStyle{
      padding-left:14px;
    }
  padding: 10px;
  .cardM {
    margin-top: 5px;
    .btnInfo {
      margin-bottom: 10px;
    }
  }
  .set-item-show {
    color: #4690FE;
    font-size: 12px;
    vertical-align: bottom;
    cursor: pointer;
  }
  .current-alert-info {
    .btnInfo {
      margin: 10px 0;
    }

    #preForm {
      .el-input {
        width: 260px;
      }
      .el-select {
        width: 260px;
      }
      .el-date-editor {
        width: 260px;
      }
      #alertStyle {
        .alert-info {
          position: absolute;
          z-index: 998 !important;
          margin-top: 5px;
          padding: 5px;
          width: 260px;
          background-color: white;
          box-shadow: 0px 0px 2px #3a8ee6;
          .el-input,
          .el-select {
            width: 208px;
          }
          .alertHStyle {
            .el-form-item {
              margin-bottom: 0;
            }
          }
          .title {
            .kks {
              display: inline-block;
              width: 5px;
              height: 16px;
              margin-right: 5px;
              background: #42B983;
            }
            margin-bottom: 5px;
          }
          .key-length {
            width: 88px;
          }
          .value-length {
            width: 116px;
          }
          // #select-add {
          //   margin-left: 116px;
          // }
          .el-form-item {
            margin-top: 8px;
          }
        }
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
        margin-left:10px;
      }
      .btn_rote {
        transform: rotate(90deg);
      }
      .btn_rote1 {
        transform: rotate(-90deg);
      }
      .searchTop{
        margin-top: 10px;
      }
    }

    #myChart {
      z-index: 998;
    }
    .circle {
      display: inline-block;
      width: 10px;
      height: 10px;
      box-sizing: border-box;
      background-color: red;
      // border: 2px solid red;
      border-radius: 50%;
    }
  }
  #currentAlertDisposeDialogID {
    .contentStyle {
      width: 200px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .demo-table-expand {
      font-size: 0;
    }
    .titlefont {
      color: #3a8ee6;
      font-size: 16px;
      margin-bottom: 5px;
    }
    span {
      font-size: 14px;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      // width: 50%;
    }
    .alertName {
      display: flex;
      li {
        // flex: 1;
        // text-align: center;
        width: 160px;
        i{
          cursor: pointer;
        }
      }
      .titlefont{
        width: 250px;
      }
    }
    .titleName li {
      // font-size:16px;
      // color: #909399;
      margin-bottom: 10px;
      font-size:15px;
      font-family:PingFang-SC-Bold;
      font-weight:bold;
      color:rgba(66,185,131,1);
    }
    .titleOne,
    .titleTwo {
      margin-left: 34px;
    }
  }
  .pre-alert-info {
    .btnInfo {
      margin: 10px 0;
    }
    .set-item-show {
      color: skyblue;
      font-size: 12px;
      vertical-align: bottom;
      cursor: pointer;
    }
    #pre-alert {
      .el-input {
        width: 260px;
      }
      .el-select {
        width: 260px;
      }
      .el-date-editor {
        width: 260px;
      }
    }

    #pre-alertbtn {
      padding-left: 200px;
    }

    #myChart {
      z-index: 998;
    }
    .circle {
      display: inline-block;
      width: 10px;
      height: 10px;
      box-sizing: border-box;
      background-color: red;
      // border: 2px solid red;
      border-radius: 50%;
    }
  }
  .alert-history-info {
    .btnInfo {
      margin: 10px 0;
    }
    .set-item-show {
      color: skyblue;
      font-size: 12px;
      vertical-align: bottom;
      cursor: pointer;
    }
    #alert-history {
      .el-input {
        width: 260px;
      }
      .el-select {
        width: 260px;
      }
      .el-date-editor {
        width: 260px;
      }
      #alertHistoryStyle {
        .chaBtn {
          margin-left: 3px;
        }
        .alert-info {
          position: absolute;
          z-index: 998 !important;
          margin-top: 5px;
          padding: 5px;
          width: 275px;
          background-color: white;
          box-shadow: 0px 0px 2px #3a8ee6;
          .alertHStyle {
            .el-form-item {
              margin-bottom: 0;
            }
          }
          .el-input {
            width: 222px;
          }
          .title {
            .kks {
              display: inline-block;
              width: 5px;
              height: 16px;
              margin-right: 5px;
            background: #42B983;
            }
            margin-bottom: 5px;
          }
          .key-length {
            width: 108px;
          }
          .value-length {
            width: 110px;
          }
          // #alertHistoryStyle-add {
          //   margin-left: 198px;
          // }
          .el-form-item {
            margin-top: 8px;
          }
        }
      }
    }

    #pre-alertbtn {
      padding-left: 200px;
    }

    #myChart {
      z-index: 998;
    }
    .circle {
      display: inline-block;
      width: 10px;
      height: 10px;
      box-sizing: border-box;
      background-color: red;
      // border: 2px solid red;
      border-radius: 50%;
    }
  }
  .pre-alert-history-info {
    .btnInfo {
      margin: 10px 0;
    }
    .set-item-show {
      color: skyblue;
      font-size: 12px;
      vertical-align: bottom;
      cursor: pointer;
    }
    #current-alertbtn {
      padding-left: 200px;
    }
    #pre-alert-history {
      .el-select {
        width: 185px;
      }
      // .el-date-editor {
      //   width: 185px;
      // }
    }

    #pre-alertbtn {
      padding-left: 200px;
    }

    #myChart {
      z-index: 998;
    }
    .circle {
      display: inline-block;
      width: 10px;
      height: 10px;
      box-sizing: border-box;
      background-color: red;
      // border: 2px solid red;
      border-radius: 50%;
    }
  }
  //当前告警处理预览
  #dialog {
    .alertContent {
      width: 764px;
    }
  }
  //告警历史预览
  #alertHistory {
    .alertContent {
      width: 780px;
    }
  }
  //影藏显示列
  .cloumnStyle {
    ul {
      padding-left: 35px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      li {
        margin-top: 10px;
        width: 50%;
      }
    }
  }
}
.monitor-container .alertHiddenStyle {
  overflow: visible;
}
// .el-tooltip__popper {
//   display: none;
// }
#orderContainer {
  .el-input {
    width: 200px;
  }
  .eventStyle {
    .el-form-item__content {
      width: 872px;
    }
  }
}
.greenStyleBtn {
  background-color: #42B983;
  color:white;
  border: 1px solid #42B983;
}
.greenStyleBtn:hover {
  background-color: #42B983;
  color:white;
  border: 1px solid #42B983;
}
.blueStyleBtn {
  // background-color: #4690FE;
  // color: white;
  // border: 1px solid #4690FE;
  background-color: #42B983;
  color:white;
  border: 1px solid #42B983;
}
.blueStyleBtn:hover {
  // background-color: #4690FE;
  // color:white;
  // border: 1px solid #4690FE;
  background-color: #42B983;
  color:white;
  border: 1px solid #42B983;
}
.redStyleBtn {
  background-color: #F4F8F9;
  color: rgba(0,0,0,0.70);
  border: 1px solid #F4F8F9;
}
.redStyleBtn1 {
  background-color:  #FA5555;
  color:white;
  border: 1px solid #FA5555;;
}
.redStyleBtn1:hover {
  background-color:  #FA5555;
  color:white;
  border: 1px solid #FA5555;;
}
.redStyleBtn:hover{
  background-color:  #FA5555;
  color:white;
  border: 1px solid #FA5555;
}
.fontColorStyle{
  color:#42B983;
}
.defaultBtn {
  background-color: #F4F8F9;
  color: rgba(0,0,0,0.70);
  border: 1px solid #F4F8F9;
}
.defaultBtn:hover {
  background-color: #42B983;
  color: white;
  border: 1px solid #42B983;
}
.fontSizeStyle{
  font-size: 14px;
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
.el-pagination {
  margin-top: 10px;
  /deep/.el-pager li.active{
    min-width: 28px;
    height: 28px;
    background: rgba(66,185,131,1);
    font-size: 14px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1) ;
    line-height: 28px;
    border-radius:3px;
  } 
}
.label_pane {
  width:64px;
  height:20px;
  font-size:15px;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(66,185,131,1);
  line-height:20px;
}
.labelStyle{
  font-size:15px;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(66,185,131,1);
  margin: 10px 0;
}
.freshEqure{
  .el-input {
    width: 200px;
  }
  .inputMin{
    font-size: 18px;
    margin-left: 5px;
  }
  ul {
    background: #f4f8f9;
    padding-left: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    li {
      margin-top: 10px;
      width: 20%;
      cursor: pointer;
      color:black;
    }
    li:hover {
      background-color: rgba(66,185,131,1);
      color: blue;
    }
  }
  .btnTop{
    margin-top: 10px;
  }
}
// /deep/#dialog label.el-form-item__label {
//     margin-right: 20px;
//   }
// /deep/#preAlertDialog label.el-form-item__label {
//     margin-right: 20px;
//   }
// /deep/#alertHistory label.el-form-item__label {
//     margin-right: 20px;
//   }
// /deep/#preAlertHistoryDialog label.el-form-item__label {
//     margin-right: 20px;
//   }
</style>
