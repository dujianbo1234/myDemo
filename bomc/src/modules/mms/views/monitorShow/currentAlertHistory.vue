<template>
  <div class="monitor-container">
    <el-card class="alertHiddenStyle">
      <div class="alert-history-info">
        <el-form
          :inline="true"
          :model="alertHistorySearch"
          label-position="right"
          label-width="70px"
          id="alert-history"
        >
          <el-row>
            <el-col :span="6">
              <!-- <el-form-item label="告警名称" > -->
              <el-input v-model="alertHistorySearch.host" @keyup.native="nameSearch" placeholder="请输入主机名称"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <!-- <el-form-item label="告警编码" > -->
              <el-input v-model="alertHistorySearch.code" @keyup.native="codeSearch" placeholder="请输入告警编码"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <el-button class='blueStyleBtn chaBtn'  @click="queryAlertHistory(1,true)">查询</el-button>
              <el-button class='defaultBtn chaBtn'  @click="alertHistoryReset">重置</el-button>
              <span class="btn_set" @click="searchItemDown" v-show="!searchItemShow">
                <i class="el-icon-d-arrow-right btn_rote" style="color: #42B983;"></i>
             </span>
              <span class="btn_set" @click="searchItemDown" v-show="searchItemShow">
                <i class="el-icon-d-arrow-right btn_rote1" style="color: #42B983;"></i>
             </span>
            </el-col>
          </el-row>
          <el-row v-show="searchItemShow" class="searchTop">
            <el-col :span="6">
              <!-- <el-form-item label="告警级别"> -->
              <el-select v-model="alertHistorySearch.level" clearable placeholder="请选择告警级别">
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
              <!-- <el-input v-model="alertHistorySearch.content"  @keyup.native="contentSearch" placeholder="请输入告警内容"></el-input> -->
              <el-input v-model="alertHistorySearch.content"  placeholder="请输入告警内容"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <!-- <el-form-item label="告警时间"> -->
              <el-date-picker
                v-model="alertHistoryTime"
                type="datetimerange"
                align="right"
                unlink-panels
                value-format="yyyyMMddHHmmss"
                :default-time="['00:00:00', '23:59:59']"
                start-placeholder="告警开始日期"
                end-placeholder="告警开始日期"
              ></el-date-picker>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <el-date-picker
                v-model="alertHistoryTimeEnd"
                type="datetimerange"
                align="right"
                unlink-panels
                value-format="yyyyMMddHHmmss"
                :default-time="['00:00:00', '23:59:59']"
                start-placeholder="告警结束日期"
                end-placeholder="告警结束日期"
              ></el-date-picker>
            </el-col>
          </el-row>
          <el-row v-show="searchItemShow" class="searchTop">
            <el-col :span="6">
              <el-select v-model="alertHistorySearch.pushStatus" clearable placeholder="请选择推送状态">
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
              <el-input v-model="alertHistorySearch.ciid"  @keyup.native="CIIDSearch" placeholder="请输入CIID"></el-input>
              <!-- </el-form-item> -->
            </el-col>
            <el-col :span="6">
              <el-select v-model="alertHistorySearch.status" clearable placeholder="请选择告警状态">
                <el-option
                  v-for="item in alertOfStateHis"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" id="alertHistoryStyle">
              <!-- <el-form-item label="选择器" > -->
              <el-button class='greenStyleBtn' @click="alertDownHistory=!alertDownHistory">告警选择器</el-button>
              <div class="alert-info" key='' v-if="alertDownHistory" :class="alertSelectShow == true ? 'isFixed' :''">
                <div class="title">
                  <i class="kks"></i>告警选择器
                  <el-button
                    id="alertHistoryStyle-add"
                    @click="addDomainHistory"
                    icon="el-icon-circle-plus-outline"
                    class='blueStyleBtn'
                    size="mini"
                    circle
                  ></el-button>
                </div>
                <!-- <el-select v-model="selectNameHistorySearch" placeholder="请选择">
                    <el-option
                      v-for="item in selectorData"
                      :key="item.key"
                      :label="item.name"
                      :value="item.key"
                    ></el-option>
                </el-select>-->
                <el-cascader
                  placeholder="请选择"
                  :options="selectorData"
                  v-model="selectNameHistorySearch"
                  :props="propsSelect"
                ></el-cascader>
                <el-form :model="alertSelertFromHistory" class="alertHStyle">
                  <el-form-item
                    v-for="(domain,index) in alertSelertFromHistory.domains"
                    :key="index"
                  >
                    <el-input v-model="domain.name" disabled class="key-length fontSizeStyle"></el-input>
                    <el-input v-model="domain.value  " class="value-length fontSizeStyle"></el-input>
                    <el-button
                     class='redStyleBtn'
                      icon="el-icon-delete"
                      @click.prevent="removeDomainHistory(domain)"
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
      <el-row class="btnInfo" justify="end" type="flex">
        <el-col :span="4">
          <el-button class='defaultBtn' @click="alertHistoryExportCheck">导出</el-button>
          <!-- <el-button class='blueStyleBtn' @click="alertHistoryExportAll">导出所有</el-button> -->
          <span class="set-item-show" @click="setAlertDialog">设置列隐藏/显示</span>
        </el-col>
      </el-row>
      <div v-loading="listLoading">
        <el-table
          :header-cell-style="headStyle"
          resizable
          border
          ref="alertHistoryTable"
          :data="alertHistoryData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="alertHistorySelectionChange"
        >
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column  align="center" key='1' v-if="alertHistorycodeShow" prop="code" label="告警编码" width="160"></el-table-column>
          <el-table-column align="center"  key='2' v-if="alertHistoryidShow" label="告警ID" width="210">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column align="center" key='3' v-if="alertHistoryStateShow" label="告警状态" width="100">
            <template slot-scope="scope">{{ scope.row.status | leavelState}}</template>
          </el-table-column>
          <el-table-column align="center" key='4' v-if="alertHistoryPushStatusShow" label="推送状态" width="100">
            <template slot-scope="scope">{{ scope.row.pushStatus |sendStateFilter}}</template>
          </el-table-column>
          <el-table-column align="center" key='5' v-if="alertHistoryinfluenceDegreeShow" label="影响程度" width="100">
            <template slot-scope="scope">{{ scope.row.influenceDegree |eventLeavel}}</template>
          </el-table-column>
          <el-table-column align="center" key='6' v-if="alertHistoryobjShow" prop="ciid" label="CIID" width="180"></el-table-column>
          <el-table-column align="center" key='7' v-if="alertHistoryhostShow" prop="host" label="主机名称" width="120"></el-table-column>
          <el-table-column align="center" key='8' v-if="alertHistoryipShow" prop="ip" label="IP" width="120"></el-table-column>
          <el-table-column
            align="center"
            key='9' 
            v-if="alertHistorysubsystemShow"
            prop="subSystem"
            label="子系统名称"
            width="120"
          ></el-table-column>
          <el-table-column align="center" key='10' v-if="alertHistoryappIdShow" prop="appId" label="业务系统名称" width="120"></el-table-column>
          <el-table-column align="center" key='11' v-if="alertHistorymoduleShow" prop="module" label="模块名称" width="120"></el-table-column>
          <el-table-column align="center" key='12' v-if="alertHistoryinstanceShow" prop="instance" label="实例名称" width="120"></el-table-column>
          <el-table-column align="center" key='13' v-if="alertHistorymsgTypeShow" prop="msgType" label="告警类别" width="100"></el-table-column>
          <el-table-column
            key='14' 
            v-if="alertHistoryrelevantPartyShow"
            prop="relevantParty"
            label="业务相关方"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column
          align="center"
            key='15' 
            v-if="alertHistoryInfoShow"
            prop="content"
            label="告警内容"
            width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column align="center" key='16' v-if="alertHistoryLeaveShow" label="告警级别" width="120">
            <template slot-scope="scope">
              <!-- <el-button class='blueStyleBtn' v-if="scope.row.level =='0'">一般告警</el-button>
              <el-button type="warning" v-if="scope.row.level =='1'">主要告警</el-button>
              <el-button class='redStyleBtn1' v-if="scope.row.level =='2'">严重告警</el-button> -->
              <div v-if="scope.row.level =='0'">
                <img :src="commonImg" title="一般告警">
              </div>
              <div v-if="scope.row.level =='1'">
                 <img :src="majorImg" title="主要告警">
              </div>
              <div v-if="scope.row.level =='2'">
                 <img :src="criticalImg" title="严重告警">
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" key='17' v-if="alertHistoryCsShow" label="首次告警时间" width="180">
            <template slot-scope="scope">{{scope.row.firstAlertTime | strToDataFromat}}</template>
          </el-table-column>
          <el-table-column  align="center" key='18' v-if="alertHistoryLastTimeShow" label="最后告警时间" width="180">
            <template slot-scope="scope">{{scope.row.lastAlertTime | strToDataFromat}}</template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                class="fontColorStyle"
                type="text"
                size="small"
                @click="alertHistoryRowChange(scope.row)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          align="right"
          @size-change="alertHistoryizeChange"
          :current-page.sync="historyCurrentPage"
          @current-change="historyChange"
          :page-size="allLimitNumberThree"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="historyTotalPage"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 告警历史查询 dialog-->
    <el-dialog :visible.sync="alertHistoryDialog" width="70%" id="alertHistory">
      <el-tabs v-model="alertHistoryAcive">
        <el-tab-pane  name="first">
           <span slot="label" :class="{ label_pane:alertHistoryAcive==='first' }">告警信息</span>
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
                <el-form-item label="当前告警级别">{{alertHistorytableData.level | alertLeavel}}</el-form-item>
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
        <el-tab-pane  name="second">
          <span slot="label" :class="{ label_pane:alertHistoryAcive==='second' }">对象信息</span>
          <mailTable :tableData="alertHistortyTableDataThree" :tableStyle="{ width:'600px' }"></mailTable>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button class="defaultBtn" @click="alertHistoryDialog = false">返回</el-button>
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
export default {
  name: "monitorShow",
  data() {
    return {
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
      orderForm: {
        title: "",
        eventNature: "",
        eventSource: "",
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
          name: "当前告警级别",
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
          label: "未提交工单",
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
      alertSelectShow:false,
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
          name: "当前告警级别",
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
        },
        {
          name: "影响程度",
          select: true,
          flag: "alertHistoryinfluenceDegreeShow"
        }
      ],
      isTimeOut: true,
      alertHistoryPushStatusShow: true,
      alertHistoryinfluenceDegreeShow: true,
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
      timeZero: ""
    };
  },
  methods: {
      //获取localstorage列的隐藏显示
    getColData(){
      let colData = localStorage.getItem('alertHistoryColData')
      if(colData){
        let colObj = JSON.parse(colData);
        for (const key in colObj) {
          this[key] = colObj[key]
        }
      }
    },
     searchItemDown(){
      this.searchItemShow = !this.searchItemShow
      this.alertDownHistory=false;
    },
    //当前告警定时刷新
    freshTime(val) {
      if (!val) {
        this.$notify.success({
          message: "已开启自动刷新",
          showClose: false,
          duration: 2000
        });
        this.timeZero = setInterval(() => {
          this.currentPage = 1;
          this.queryCurrentAllData(1);
        }, 5000);
      } else {
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
    /* drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'));
      // 绘制图表
      myChart.setOption({
        // tooltip: {
        //   trigger: "axis",
        //   position: function(pt) {
        //     return [pt[0], "10%"];
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.echartsData
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        series: [
          {
            name: '模拟数据',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: 'rgb(255, 70, 131)'
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                  }
                ])
              }
            },
            data: [14, 23, 23, 3, 23, 5, 23, 4]
          }
        ]
      })
    }, */
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
            "当前告警级别",
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
        this.$message({
          message: "Please select at least one item",
          type: "warning"
        });
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
          "当前告警级别",
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
            "当前告警级别",
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
        // this.$message({
        //   message: "Please select at least one item",
        //   type: "warning"
        // });
        this.alertHistoryExportAll();
      }
    },
    alertHistoryExportAll() {
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
          "当前告警级别",
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
              this.bizLineCodeSearch = val.key;
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

      if (flag) {
        this.currentPage = 1;
        if (this.currentSearchTime.length) {
          this.currentAlertSearchData.firstAlertTimeStart = this.currentSearchTime[0];
          this.currentAlertSearchData.firstAlertTimeEnd = this.currentSearchTime[1];
        } else {
          this.currentAlertSearchData.firstAlertTimeStart = "";
          this.currentAlertSearchData.firstAlertTimeEnd = "";
        }
        if (this.currentSearchTimeEnd.length) {
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
      }
      this.CurrentAlertParams.start = (startPage - 1) * this.allLimitNumber;
      this.CurrentAlertParams.limit = this.allLimitNumber;
      if (!this.currentAlertSearchData.status) {
        this.CurrentAlertParams.status = 0;
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
        status: 0
      };
      service.currentAlertSearch(params).then(res => {
        this.alertData = res.data;
        this.totalPage = res.count;
      });
    },
    //分页 fenye
    //pageAllFlag:true,
    currentAlertPage(pageNumber) {
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
      this.currentPage = 1;
      this.alertSelertFrom.domains = [];
      this.alertDown = false;
      this.queryCurrentAllData(1);
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
      if (value.length) {
        value.forEach(val => {
          this.currentAlertDisposeSelectDataMerge.push(val.id);
        });
      }
    },
    //选择的关联告警
    selectChangeGuan(value) {
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
      console.log(this.alertChecked);
      // console.log(ids);
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
        // this.currentAlertDisposeDialog = false;
      });
    },
    toOrderList() {
      this.orderForm = {
        title: "",
        eventNature: "",
        eventSource: "",
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
    },
    //-------------当前告警方法end-------

    //-------------告警历史方法start-------
    nameSearch() {
      this.alertHistorySearch.host = this.alertHistorySearch.host.replace(
        /[^\w\u4E00-\u9FA5]/g,
        ""
      );
    },
    codeSearch() {
      let reg = new RegExp("[`~!@#%$^&*()=|{}':',\\[\\].<>《》~！@#￥……&*（）——|?{}【】‘；;：”“'。，、？]", 'g');
      if(reg.test(this.alertHistorySearch.code)){
        this.alertHistorySearch.code='';   
      }
    },
    CIIDSearch() {
      let reg = new RegExp("[`~!@#%$^&*()=|{}':',\\[\\].<>《》~！@#￥……&*（）——|?{}【】‘；;：”“'。，、？]", 'g');
      if(reg.test(this.alertHistorySearch.ciid)){
        this.alertHistorySearch.ciid='';   
      }
    },
    contentSearch() {
      this.alertHistorySearch.content = this.alertHistorySearch.content.replace(
         /[^\w\u4E00-\u9FA5]/g,
        ""
      );
    },
    confirmAlertHistroyShow() {
      this.alertHistoryDialogData.forEach(val => {
        this[val.flag] = val.select;
      });
      this.alertHistoryShowDialog = false;
      let obj = {};
      this.alertHistoryDialogData.forEach(val=>{
        let dd=val.flag
        obj[dd]=val.select
      })
      localStorage.setItem('alertHistoryColData',JSON.stringify(obj))
    },
    //所有数据
    queryAlertHistoryAllData(pageNumber) {
      let params = {
        // isGeneral:true,
        start: (pageNumber - 1) * this.allLimitNumberThree,
        limit: this.allLimitNumberThree,
        status: -2
      };
      service.currentAlertSearch(params).then(res => {
        this.listLoading=false;
        this.alertHistoryData = res.data;
        this.historyTotalPage = res.count;
      });
    },
    queryAlertHistory(startPage, flag) {
      this.historyPageAllFlag = false;
      this.listLoading=true;
      if (flag) {
        this.historyCurrentPage = 1;
        if (this.alertHistoryTime) {
          this.alertHistorySearch.firstAlertTimeStart = this.alertHistoryTime[0];
          this.alertHistorySearch.firstAlertTimeEnd = this.alertHistoryTime[1];
        } else {
          this.alertHistorySearch.firstAlertTimeStart = "";
          this.alertHistorySearch.firstAlertTimeEnd = "";
        }
        if (this.alertHistoryTimeEnd) {
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
          this.historyAlertParams.status = -2;
        }
        if(this.historyAlertParams.content){
          this.historyAlertParams.content=encodeURIComponent(this.historyAlertParams.content)
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
        this.listLoading=false;
      });
    },
    //分页选择
    historyChange(val) {
      this.listLoading=true;
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
      this.listLoading=true;
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
              // this.bizLineCodeSearchHistory = val.key;
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
      //  this.listLoading=true;
      //  this.historyCurrentPage = 1;
      // this.queryAlertHistoryAllData(1);
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
        if(this.alertDownHistory){
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
  mounted() {
    this.getColData();
    window.addEventListener('scroll', this.handleScroll);
    this.selectSearch();
    this.dropSatartVal();
    // this.queryCurrentAllData(1);
    this.queryAlertHistoryAllData(1);
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
  padding: 10px;
  .cardM {
    margin-top: 5px;
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
    .timeintervalStyle {
      margin-left: 80px;
      margin-top: 10px;
    }
  }
  #currentAlertDisposeDialogID {
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
        flex: 1;
      }
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
      width: 764px;
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
.blueStyleBtn {
  // background-color: #4690FE;
  // color: white;
  //  border: 1px solid #4690FE;
  background-color: #42B983;
  color:white;
   border: 1px solid #42B983;
}
.blueStyleBtn:hover {
  // background-color: #4690FE;
  // color:white;
  //  border: 1px solid #4690FE;
  background-color: #42B983;
  color:white;
   border: 1px solid #42B983;
}
.redStyleBtn {
  background-color: #F4F8F9;
  color: rgba(0,0,0,0.70);
   border: 1px solid #F4F8F9;
}
.redStyleBtn:hover{
  background-color:  #FA5555;
  color:white;
   border: 1px solid #FA5555;
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
.fontColorStyle{
  color:#42B983;
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
