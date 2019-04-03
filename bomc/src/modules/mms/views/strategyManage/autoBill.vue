<template>
  <div class="strategyManage-container">
    <el-card class="alertHiddenStyle">
      <el-form
        :inline="true"
        :model="autoBillSearchConditions"
        label-position="right"
        label-width="100px"
        size="small"
        id="autoBillStyle"
        >
        <el-row>
          <el-col :span="6">
            <el-input v-model="autoBillSearchConditions.name" @keyup.native="nameSearch" placeholder="请输入事件名称"></el-input>
          </el-col>
          <el-col :span="6">
            <el-select v-model="autoBillSearchConditions.enable" clearable placeholder="请选择启停状态">
              <el-option
                v-for="item in stopOrStart"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button class='blueStyleBtn chaBtn' @click="autoBillSearch(1,true)">查询</el-button>
            <el-button class='defaultBtn' @click="autoBillReset">重置</el-button>
             <span class="btn_set" @click="searchItemDown" v-show="!searchItemShow">
                <i class="el-icon-d-arrow-right btn_rote" style="color: #42B983;"></i>
             </span>
            <span class="btn_set" @click="searchItemDown" v-show="searchItemShow">
                <i class="el-icon-d-arrow-right btn_rote1" style="color: #42B983;"></i>
             </span>
          </el-col>
        </el-row>
        <el-row  v-show="searchItemShow" class="searchTop">
          <el-col :span="6">
            <el-date-picker
              v-model="autoBillTime"
              unlink-panels
              type="datetimerange"
              value-format="yyyyMMddHHmmss"
              :default-time="['00:00:00', '23:59:59']"
              start-placeholder="事件发生开始日期"
              end-placeholder="事件发生结束日期"
            ></el-date-picker> 
          </el-col>
          <el-col :span='6'>
            <el-button
              class='blueStyleBtn billAlertBtn'
              @click="billAlertDown=!billAlertDown"
            >告警选择器</el-button>
            <div class="alert-info" v-if="billAlertDown" :class="alertSelectShow == true ? 'isFixed' :''">
              <div class="title">
                <i></i>告警选择器
                <el-button
                  @click="billSearchDomain"
                  icon="el-icon-circle-plus-outline"
                  class='blueStyleBtn'
                  size="mini"
                  circle
                ></el-button>
              </div>
              <el-cascader
                placeholder="请选择"
                :options="ruleData"
                v-model="billSelectNameSearch"
                :props="propsSelect"
              ></el-cascader>
              <el-form :model="billAlertSelertFrom" class="alertStyle">
                <el-form-item v-for="(domain,index) in billAlertSelertFrom.domains" :key="index">
                  <el-input v-model="domain.name" disabled class="key-length fontSizeStyle"></el-input>
                  <el-input v-model="domain.value  " class="value-length fontSizeStyle"></el-input>
                  <el-button
                    class='redStyleBtn'
                    icon="el-icon-delete"
                    @click.prevent="billRemoveDomain(domain)"
                    size="mini"
                    circle
                  ></el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="cardM">
      <el-row class="btnInfo" type="flex" justify="space-between">
        <el-col :span="6">
          <el-button class='greenStyleBtn'  @click="autoBillAdd">新增提单</el-button>
          <el-button class='redStyleBtn' @click="autoBillBatchDel">批量删除</el-button>
        </el-col>
        <el-col :span="3">
          <span class="set-item-show" @click="setAutoBillShowDialog">设置列隐藏/显示</span>
        </el-col>
      </el-row>
      <el-row v-loading="tableLoading">
        <el-table
           resizable
          border
          :header-cell-style="headStyle"
          ref="autoBillTable"
          :data="autoBillTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="autoBillSelectionChange"
          >
          <el-table-column align='center' type="selection" width="55"></el-table-column>
          <el-table-column key='1' align='center' v-if="autoBillShowname" prop="name" label="事件名称" width="160"></el-table-column>
          <el-table-column key='2' align='center' v-if="autoBillShowalias" prop="alias" label="事件别名" width="180"></el-table-column>
          <el-table-column
            v-if="autoBillShowdesc"
            prop="desc"
            key='3' 
            align='center'
            label="事件描述"
            width="200"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column v-if="autoBillShowciid" prop="ciid" label="资源对象ID" width="120"></el-table-column> -->
          <el-table-column key='4' align='center' v-if="autoBillShowfounder" prop="founder" label="创建人" width="100"></el-table-column>
          <!-- <el-table-column
            align='center'
            v-if="autoBillShowregistrantName"
            prop="registrantName"
            label="登记人"
            width="100"
          ></el-table-column> -->
          <!-- <el-table-column v-if="autoBillShoweventInfluenceDegree" label="事件影响度" width="120">
            <template slot-scope="scope">{{scope.row.eventInfluenceDegree |eventLeavel}}</template>
          </el-table-column> -->
          <!-- <el-table-column align='center' v-if="autoBillShowenable" label="状态" width="100">
            <template slot-scope="scope">
              <div v-if="scope.row.enable==1" >
                <img :src="runImg" title="启动">
              </div>
              <div v-if="scope.row.enable==0" >
                 <img :src="stopImg" title="停止">
              </div>
            </template>
          </el-table-column> -->
          <el-table-column   align="center" label="策略启停" width="100">
            <template slot-scope="scope">
               <el-button  v-if="!scope.row.enable" el-button type="text" size="small" @click.stop="billStart(scope.row)">
                  <el-tooltip content="启动" placement="top" effect="light" class="item">
                    <span class="iconfont" style="color: rgba(95,195,150,1);">&#xe603;</span>
                  </el-tooltip>
              </el-button>
              <el-button key='5'  v-if="scope.row.enable" el-button type="text" size="small" @click.stop="billEnd(scope.row)">
                  <el-tooltip class="item" effect="light" content="停止" placement="top">
                    <span class="iconfont" style="color: rgba(247, 8, 56,1);">&#xe60a;</span>
                  </el-tooltip>
              </el-button>
            </template>
        </el-table-column>
          <!-- <el-table-column v-if="autoBillShoweventNature" label="事件性质" width="120">
            <template slot-scope="scope">{{scope.row.eventNature |eventNatureF}}</template>
          </el-table-column> -->
          <!-- <el-table-column key='6' align='center' v-if="autoBillShowsystem" label="所属系统信息" width="260">
            <template
              slot-scope="scope"
            >{{scope.row.systemName}}/{{scope.row.systemSubclassName}}/{{scope.row.systemItemName}}</template>
          </el-table-column> -->
          <!-- <el-table-column v-if="autoBillShoweventPriority" label="事件优先级" width="100">
            <template slot-scope="scope">{{scope.row.eventPriority |eventLeavelJI}}</template>
          </el-table-column> -->
          <el-table-column key='7' align='center' v-if="autoBillShowcreateTime" label="发生时间" width="180">
            <template slot-scope="scope">{{scope.row.createTime | strToDataFromat}}</template>
          </el-table-column>
          <el-table-column key='8' align='center' v-if="autoBillShowSXTime" show-overflow-tooltip label="生效时间" width="180">
            <template slot-scope="scope">{{scope.row.startTime | strToDataFromat}} 至 {{scope.row.endTime | strToDataFromat}}</template>
          </el-table-column>
          <el-table-column align='center' label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" class="fontColorStyle" size="small" @click.stop="autoBillEdit(scope.row.id)">编辑</el-button>
              <el-button
                id="sceondBtn"
                class="fontColorStyle"
                type="text"
                size="small"
                @click.stop.native.prevent="billDeleteRow(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          align="right"
          @current-change="autoBillPage"
          @size-change="autoBillPageSizeChange"
          :current-page.sync="currentPageBill"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="allLimitNumberBill"
          :page-sizes="[5, 10, 20, 30]"
          :total="totalPageBill"
        ></el-pagination>
      </el-row>
    </el-card>

    <!-- 自动提单新增 -->
    <el-dialog
      :visible.sync="autoBillDialog"
      width="40%"
      :close-on-click-modal="false"
      class="autoBillAddStyle"
      >
       <el-tabs  v-model="activeAdd">
           <el-tab-pane name="first">
              <span slot="label" class="label_pane">自动提单</span>
              <el-form :model="autoBillAddData" label-position="right" label-width="100px" size="small">
                <el-form-item label="名称">
                  <el-input v-model="autoBillAddData.name" @keyup.native="nameAdd" placeholder="请输入名称(英文)"></el-input>
                </el-form-item>
                <el-form-item label="别名">
                  <el-input v-model="autoBillAddData.alias" @keyup.native="aliasAdd" placeholder="请输入别名(中文)"></el-input>
                </el-form-item>
                <el-form-item label="策略描述" class="expreesionStyle">
                  <el-input type="textarea" rows="4" v-model="autoBillAddData.desc" placeholder="请进行详细描述"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                  <el-radio-group v-model="autoBillAddData.enable">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="优先级">
                  <el-select v-model="autoBillAddData.priority" placeholder="请选择优先级">
                    <el-option
                      v-for="item in leavelChange"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生效时间">
                  <el-date-picker
                    v-model="autoBillTimeAdd"
                    type="datetimerange"
                    align="right"
                    value-format="yyyyMMddHHmmss"
                    :default-time="['00:00:00', '23:59:59']"
                    :picker-options="pickerOptions"
                    :unlink-panels="true"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="事件性质">
                  <el-select v-model="autoBillAddData.eventNature" placeholder="请选择事件性质">
                    <el-option
                      v-for="item in eventNatureData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="事件优先级">
                  <el-select v-model="autoBillAddData.eventPriority" placeholder="请选择事件优先级">
                    <el-option
                      v-for="item in eventLeavelJi"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item> -->
                <!-- <el-form-item label="事件影响度">
                  <el-select v-model="autoBillAddData.eventInfluenceDegree" placeholder="请选择事件影响度">
                    <el-option
                      v-for="item in eventLeavel"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item> -->
                <!-- <el-form-item label="所属系统信息">
                  <el-cascader :options="relatedOrgData" v-model="styleInfo" placeholder="请选择所属系统信息"></el-cascader>
                </el-form-item> -->
                <el-form-item label="事件涉及组">
                  <el-cascader :options="eventGroupData" v-model="eventInfo" placeholder="请选择事件涉及组信息"></el-cascader>
                </el-form-item>
                <!-- <el-form-item label="资源对象ID">
                  <el-input v-model="autoBillAddData.ciid" placeholder="请输入资源对象ID"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="登记人">
                  <el-cascader
                    :options="registrantIdData"
                    v-model="registrantIdArrAdd"
                    :props="propsSelectPerson"
                    placeholder="请选择登记人"
                  ></el-cascader>
                </el-form-item> -->
                <el-form-item label="告警选择器">
                  <el-cascader
                    placeholder="请选择告警选择器"
                    :options="ruleData"
                    v-model="billSelectNameAdd"
                    :props="propsSelect"
                  ></el-cascader>
                  <el-button
                    @click="billAddDomainAdd"
                    icon="el-icon-circle-plus-outline"
                    class='blueStyleBtn'
                    size="mini"
                    circle
                  ></el-button>
                  <el-form :model="alertSelectAddFrom" id="alertSelectAddItemBill">
                    <el-form-item v-for="(domain,index) in alertSelectAddFrom.domains" :key="index">
                      <el-input v-model="domain.name" disabled class="key-length fontSizeStyle"></el-input>
                      <el-input v-model="domain.value" class="value-length fontSizeStyle"></el-input>
                      <el-button
                        class='redStyleBtn'
                        icon="el-icon-delete"
                        @click.prevent="billAddRemoveDomain(domain)"
                        size="mini"
                        circle
                      ></el-button>
                    </el-form-item>
                  </el-form>
                </el-form-item>
              </el-form>
           </el-tab-pane>
       </el-tabs>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="autoBillDialog = false" class='defaultBtn'>取 消</el-button>
        <el-button class='blueStyleBtn' @click="billAddSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 自动提单编辑 -->
    <el-dialog
      :visible.sync="autoBillDialogEdit"
      width="40%"
      :close-on-click-modal="false"
      class="autoBillAddStyle"
    >
      <el-tabs  v-model="activeEdit">
           <el-tab-pane name="first">
              <span slot="label" class="label_pane">自动提单</span>
              <el-form :model="autoBillEditData" label-position="right" label-width="100px" size="small">
                <el-form-item label="名称">
                  <el-input v-model="autoBillEditData.name" @keyup.native="aliasEdit" placeholder="请输入名称(英文)"></el-input>
                </el-form-item>
                <el-form-item label="别名">
                  <el-input v-model="autoBillEditData.alias" @keyup.native="aliasEdit" placeholder="请输入别名(中文)"></el-input>
                </el-form-item>
                <el-form-item label="策略描述" class="expreesionStyle">
                  <el-input type="textarea" rows="4" v-model="autoBillEditData.desc" placeholder="请进行详细描述"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                  <el-radio-group v-model="autoBillEditData.enable">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="优先级">
                  <el-select v-model="autoBillEditData.priority" placeholder="请选择优先级">
                    <el-option
                      v-for="item in leavelChange"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item label="生效时间">
                  <el-date-picker
                    v-model="autoBillTimeEdit"
                    type="datetimerange"
                    align="right"
                    value-format="yyyyMMddHHmmss"
                    :default-time="['00:00:00', '23:59:59']"
                    :picker-options="pickerOptions"
                    :unlink-panels="true"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="事件性质">
                  <el-select v-model="autoBillEditData.eventNature" placeholder="请选择事件性质">
                    <el-option
                      v-for="item in eventNatureData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="事件优先级">
                  <el-select v-model="autoBillEditData.eventPriority" placeholder="请选择事件优先级">
                    <el-option
                      v-for="item in eventLeavelJi"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item> -->
                <!-- <el-form-item label="事件影响度">
                  <el-select v-model="autoBillEditData.eventInfluenceDegree" placeholder="请选择事件影响度">
                    <el-option
                      v-for="item in eventLeavel"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item> -->
                <!-- <el-form-item label="所属系统信息">
                  <el-cascader :options="relatedOrgData" v-model="styleInfoEdit" placeholder="请选择所属系统信息"></el-cascader>
                </el-form-item> -->
                <el-form-item label="事件涉及组">
                  <el-cascader :options="eventGroupData" v-model="eventInfoEdit" placeholder="请选择所属系统信息"></el-cascader>
                </el-form-item>
                <!-- <el-form-item label="资源对象ID">
                  <el-input v-model="autoBillEditData.ciid" placeholder="请输入资源对象ID"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="登记人">
                  <el-cascader
                    :options="registrantIdData"
                    v-model="registrantIdArrEdit"
                    :props="propsSelectPerson"
                    placeholder="请选择登记人"
                  ></el-cascader>
                </el-form-item> -->
                <el-form-item label="告警选择器">
                  <el-cascader
                    placeholder="请选择告警选择器"
                    :options="ruleData"
                    v-model="billSelectNameEdit"
                    :props="propsSelect"
                  ></el-cascader>
                  <el-button
                    @click="billAddDomainEdit"
                    icon="el-icon-circle-plus-outline"
                    class='blueStyleBtn'
                    size="mini"
                    circle
                  ></el-button>
                  <el-form :model="billAlertSelertEditFrom" id="alertSelectAddItemBill">
                    <el-form-item v-for="(domain,index) in billAlertSelertEditFrom.domains" :key="index">
                      <el-input v-model="domain.name" disabled class="key-length fontSizeStyle"></el-input>
                      <el-input v-model="domain.value" class="value-length fontSizeStyle"></el-input>
                      <el-button
                        class='redStyleBtn'
                        icon="el-icon-delete"
                        @click.prevent="billEditRemoveDomain(domain)"
                        size="mini"
                        circle
                      ></el-button>
                    </el-form-item>
                  </el-form>
                </el-form-item>
              </el-form>
           </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="autoBillDialogEdit = false" class='defaultBtn'>取 消</el-button>
        <el-button class='blueStyleBtn' @click="billEditSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 自动提单设置显示隐藏 -->
    <el-dialog title="设置列隐藏/显示" class="cloumnStyle" :visible.sync="autoBillShowDialog" width="30%">
      <ul>
        <li v-for="(item,index) in autoBillDialogData" :key="index">
          <el-checkbox v-model="item.select"></el-checkbox>
          <span>{{item.name}}</span>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button class='blueStyleBtn' @click="confirmAutoBillItemShow">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeTransfer from "@/components/treeTransfer/transfer-extend";
import * as service from "@/modules/mms/api/strategyModule.js";
import * as encodeMethods from "@/modules/mms/untils/encodeurl.js";
import runImg from '@/assets/images/run.png'
import stopImg from '@/assets/images/stop.png'
export default {
  name: "strategyManage",
  data() {
    let _this = this;
    //分析自定义规则
    let validateTime = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("请选择时间"));
      }
    };
    let validateTimeEdit = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("请选择时间"));
      }
    };
    let validatePushchannelAdd = (rule, value, callback) => {
      if (value.length) {
        callback();
      } else {
        callback(new Error("请选择推送渠道"));
      }
    };
    let validatePushchannelEdit = (rule, value, callback) => {
      if (value.length) {
        callback();
      } else {
        callback(new Error("请选择推送渠道"));
      }
    };
    return {
       stopOrStart: [
        {
          label: "启用",
          value: true
        },
        {
          label: "停止",
          value: false 
        },
      ],
      searchItemShow:false,
      autoBillTimeAdd:[],
      autoBillTimeEdit:[],
      activeAdd:'first',
      activeEdit:'first',
      headStyle: {
        'background-color': '#F4F8F9',
        'color': 'rgba(0,0,0,0.60)',
      },
      runImg: runImg,
      stopImg: stopImg,
      tableLoading:true,
      // 自动提单 start---------------------
      alertSelectShow:false,
      autoBillSearchConditions: {
        name: ""
      },
      autoBillTime: [],
      billAlertDown: false,
      billSelectNameSearch: [],
      billBizLineCodeSearch: "",
      autoBillTableData: [], //表格数据
      autoBillDialog: false,
      autoBillAddData: {
        name: "",
        alias: "",
        desc: "",
        enable: true,
        priority: "",
      },
      registrantIdArrAdd: [], //登记人
      styleInfo: [], //所属系统信息
      eventInfo: [], //事件涉及组信息
      relatedOrgData: [], //所属系统信息数据
      eventGroupData: [], //事件涉及组信息数据
      ciData: [], //资源对象ID原数据
      registrantIdData: [], //登记人ID原数据
      eventNatureData: [
        {
          label: "系统故障",
          value: 0
        },
        {
          label: "平台告警",
          value: 1
        }
      ],
      eventLeavel: [
        {
          label: "重大",
          value: 3
        },
        {
          label: "严重",
          value: 2
        },
        {
          label: "一般",
          value: 1
        },
        {
          label: "无",
          value: 0
        }
      ],
      eventLeavelJi: [
        {
          label: "低",
          value: 3
        },
        {
          label: "中",
          value: 2
        },
        {
          label: "高",
          value: 1
        },
        {
          label: "紧急",
          value: 0
        }
      ],
      billAlertSelertFrom: {
        domains: []
      },
      billAlertSelertAddFrom: {
        domains: []
      },
      billSelectNameAdd: [],
      billBizLineCodeAdd: "",
      //分页
      pageAllFlagBill: true, //如果是所有数据分页,则为true fenye
      billParams: {}, //查询 深拷贝数据
      allLimitNumberBill: 10, //所有分页每一页的条数
      totalPageBill: 0, //总页数
      currentPageBill: 1, //当前页

      //编辑
      autoBillDialogEdit: false,
      autoBillEditData: {},
      registrantIdArrEdit: [],
      styleInfoEdit: [],
      eventInfoEdit: [],
      billAlertSelertEditFrom: {
        domains: []
      },
      billSelectNameEdit: [],
      billBizLineCodeEdit: "",
      autoBillSeleteRows: [],
      autoBillShowDialog: false,
      autoBillShowname: true,
      autoBillShowalias: true,
      autoBillShowdesc: true,
      autoBillShowciid: true,
      autoBillShowfounder: true,
      autoBillShoweventInfluenceDegree: true,
      autoBillShowregistrantName: true,
      autoBillShowenable: true,
      autoBillShoweventNature: true,
      autoBillShowsystem: true,
      autoBillShoweventPriority: true,
      autoBillShowcreateTime: true,
      autoBillShowSXTime: true,
      autoBillDialogData: [
        {
          name: "事件名称",
          select: true,
          flag: "autoBillShowname"
        },
        {
          name: "事件别名",
          select: true,
          flag: "autoBillShowalias"
        },
        {
          name: "事件描述",
          select: true,
          flag: "autoBillShowdesc"
        },
        {
          name: "创建人",
          select: true,
          flag: "autoBillShowfounder"
        },
        {
          name: "是否启用",
          select: true,
          flag: "autoBillShowenable"
        },
        {
          name: "事件发生时间",
          select: true,
          flag: "autoBillShowcreateTime"
        },
        {
          name: "事件生效时间",
          select: true,
          flag: "autoBillShowSXTime"
        }
      ],
      // 自动提单 end---------------------
      pFilterAdd1: "",
      pFilterAdd2: "",
      pFilterEdit1: "",
      pFilterEdit2: "",
      pFilterSearch1: "",
      pFilterSearch2: "",

      defaultProps: {
        children: "children",
        label: "userName"
      },
      defaultPropsArr: {
        children: "member",
        label: "label"
      },
      //告警选择器和rule
      propsSelect: {
        value: "key",
        label: "name",
        children: "tags"
      },
      propsSelectPerson: {
        children: "member"
      },
      // -----------------
      nameOne: "first1",
      tabOneShow: true,
      tabTwoShow: false,
      tabThreeShow: false,
      pickerOptions: {
        disabledDate(time) {
          // return time.getTime() < Date.now() - 8.64e7;
          return time.getTime() < _this.serviceTime - 8.64e7;
        }
      },
      //分析策略新增规则
      analysisRule: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        alias: [{ required: true, message: "请输入别名", trigger: "blur" }],
        priority: [
          { required: true, message: "请选择优先级", trigger: "change" }
        ],
        enable: [{ required: true, message: "请选择状态", trigger: "change" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        aTimeAdd: [{ validator: validateTime, trigger: "blur" }]
      },
      //分析编辑规则
      analysisRulesEdit: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        alias: [{ required: true, message: "请输入别名", trigger: "blur" }],
        priority: [
          { required: true, message: "请选择优先级", trigger: "change" }
        ],
        enable: [{ required: true, message: "请选择状态", trigger: "change" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        aTimeEdit: [{ validator: validateTimeEdit, trigger: "blur" }]
      },
      //推送策略新增规则
      pushRule: {
        strategy_name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        max_count: [
          { required: true, message: "请输入推送次数", trigger: "blur" }
        ],
        retry_interval: [
          { required: true, message: "请输入推送间隔", trigger: "blur" }
        ],
        content_template: [
          { required: true, message: "请输入推送模板", trigger: "blur" }
        ],
        pushchannelAdd: [{ validator: validatePushchannelAdd, trigger: "blur" }]
      },
      //推送策略编辑规则
      pushRuleEdit: {
        strategy_name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        max_count: [
          { required: true, message: "请输入推送次数", trigger: "blur" }
        ],
        retry_interval: [
          { required: true, message: "请输入推送间隔", trigger: "blur" }
        ],
        content_template: [
          { required: true, message: "请输入推送模板", trigger: "blur" }
        ],
        pushchannelEdit: [
          { validator: validatePushchannelEdit, trigger: "blur" }
        ]
      },
      //服务器时间
      serviceTime: "",
      selectFlagEdit: true,
      selectFlagSearch: true,
      selectFlagAdd: true,

      pushSelectFlagEdit: true,
      pushSelectFlagSearch: true,
      pushSelectFlagAdd: true,
      //分析分页
      pageAllFlag: true, //如果是所有数据分页,则为true fenye
      analysisParams: {}, //查询 深拷贝数据
      allLimitNumber: 10, //所有分页每一页的条数
      allLimitNumberP: 10, //所有分页每一页的条数
      totalPage: 0, //总页数
      currentPage: 1, //当前页

      //推送分页
      pushPgeAllFlag: true, //如果是所有数据分页,则为true fenye
      pushParams: {}, //查询 深拷贝数据
      pushTotalPage: 0, //总页数
      pushCurrentPage: 1, //当前页

      // 分析策略查询数据kobe
      yuHuoSearch: true,
      rule: {
        alertDuration: [],
        alertCount: []
      },
      ruleData: [], //存放所有规则
      ruleDataForOneAdd: [], //规则业务线数据
      ruleDataForOneChoseAdd: "", //选中的规则业务
      selectRuleDataAdd: [], //新增的时候选择的规则
      ruleItemAdd: [],

      ruleDataForOneChoseEdit: "",
      selectRuleDataEdit: [],
      ruleItemEdit: [],

      ruleDataForOneChoseSearch: "",
      selectRuleDataSearch: [],
      ruleItemSearch: [],

      strategyAnalysisSearchData: {
        strategy_name: "",
        priority: "",
        type: "",
        rule: {}
      },
      aSearchData: {}, //查询数据
      strategyAnalysisSearchDataReset: {
        indexByCIID: "",
        indexByAlertID: "",
        indexByHost: "",
        indexByIP: "",
        indexBySubSys: "",
        indexByModule: "",
        indexByBizLine: "",
        selectionRange: ""
      },
      alertNameAdd: [],
      alertNameAddArr: [],
      strategyAnalysisFormSingleData: {}, //分析策略表单预览数据
      //分析策略选择
      searchShowOne: true,
      searchShowTwo: true,
      searchShowThree: true,
      searchShowFour: true,
      //分析规则查询-------------start
      selectorData: [], //告警选择器所有的值

      alertDurationCondShow: true,
      alertDurationUnitShow: true,
      alertDurationLevelNumShow: true,
      alertCountCondShow: true,
      alertCountNumShow: true,
      alertCountLevelNumShow: true,

      dayInterSearch: "", //分析策略分析规则范围
      dayBeforeSearch: "",
      alertDurationSelectData: [
        {
          label: "时间",
          value: "time"
        },
        {
          label: "数值",
          value: "count"
        }
      ],
      alertDurationCondVal: "",
      alertDurationInput: "",
      alertDurationUnitVal: "",
      alertDurationLevelValCount: "",

      alertCountSelectData: [
        {
          label: "次数",
          value: "次数"
        },
        {
          label: "升降级",
          value: "升降级"
        }
      ],
      alertCountCondVal: "",
      alertCountCondValInput: "",
      alertCountLevelValCount: "",
      alertJuHeShow: false,
      alertJuHeShowEdit: false,
      alertJuHeShowSearch: false,
      //-----------import 查询唯一循环数据start------------------------------
      trueOfFalse: [
        {
          label: "--",
          value: ""
        },
        {
          label: "true",
          value: true
        },
        {
          label: "false",
          value: false
        }
      ],
      leavelChange: [
        {
          label: "0",
          value: 0
        },
        {
          label: "1",
          value: 1
        },
        {
          label: "2",
          value: 2
        },
        {
          label: "3",
          value: 3
        },
        {
          label: "4",
          value: 4
        },
        {
          label: "5",
          value: 5
        },
        {
          label: "6",
          value: 6
        },
        {
          label: "7",
          value: 7
        },
        {
          label: "8",
          value: 8
        },
        {
          label: "9",
          value: 9
        }
      ],
      leavelChangeOne: [
        {
          label: "0",
          value: 0
        },
        {
          label: "1",
          value: 1
        },
        {
          label: "2",
          value: 2
        },
        {
          label: "3",
          value: 3
        },
        {
          label: "4",
          value: 4
        },
        {
          label: "5",
          value: 5
        },
        {
          label: "6",
          value: 6
        },
        {
          label: "7",
          value: 7
        },
        {
          label: "8",
          value: 8
        },
        {
          label: "9",
          value: 9
        }
      ],
      typeChange: [
        {
          label: "过滤",
          value: 0
        },
        {
          label: "合并",
          value: 1
        },
        {
          label: "关联",
          value: 2
        },
        {
          label: "升降级",
          value: 3
        }
      ],
      typeChangeOne: [
        {
          label: "过滤",
          value: 0
        },
        {
          label: "合并",
          value: 1
        },
        {
          label: "关联",
          value: 2
        },
        {
          label: "升降级",
          value: 3
        }
      ],
      maxOfmin: [
        {
          label: "请选择",
          value: ""
        },
        {
          label: ">",
          value: ">"
        },
        {
          label: "<",
          value: "<"
        },
        {
          label: ">=",
          value: ">="
        },
        {
          label: "<=",
          value: "<="
        }
      ],
      minOfSec: [
        {
          label: "请选择",
          value: ""
        },
        {
          label: "秒",
          value: "s"
        },
        {
          label: "分钟",
          value: "m"
        },
        {
          label: "小时",
          value: "h"
        },
        {
          label: "天",
          value: "d"
        }
      ],
      numLeavel: [
        {
          label: "-2",
          value: -2
        },
        {
          label: "-1",
          value: -1
        },
        {
          label: "1",
          value: 1
        },
        {
          label: "2",
          value: 2
        }
      ],
      dayWorkLeaver: [
        {
          label: "每天",
          value: "perday"
        },
        {
          label: "工作日",
          value: "workday"
        },
        {
          label: "频率",
          value: "frequency"
        }
      ],
      hourMinDay: [
        {
          label: "小时",
          value: "h"
        },
        {
          label: "分钟",
          value: "m"
        },
        {
          label: "天",
          value: "d"
        }
      ],
      alertLeavel: [
        {
          label: "所有",
          value: ""
        },
        {
          label: "严重",
          value: "0"
        },
        {
          label: "主要",
          value: "1"
        },
        {
          label: "一般",
          value: "2"
        }
      ],
      //-----------import 查询唯一循环数据end------------------------------
      //分析规则查询-------------end
      //分析设置显示隐藏列
      analysisShowDialog: false,
      typeShow: true,
      enableShow: true,
      aliasShow: true,
      timeShow: true,
      personShow: true,
      analysisDialogData: [
        {
          name: "分析策略类型",
          select: true,
          flag: "typeShow"
        },
        {
          name: "分析策略别名",
          select: true,
          flag: "aliasShow"
        },
        {
          name: "创建人",
          select: true,
          flag: "personShow"
        },
        {
          name: "创建时间",
          select: true,
          flag: "timeShow"
        }
      ],
      //分析规则show
      ruleShowEdit: true,
      ruleShowAdd: false,
      ruleShowSearch: true,
      //分析规则新增-----start
      //新增告警选择器的key
      selectNameAdd: [],
      selectNameEdit: [], //编辑的key
      selectNameSearch: [], //查询的key
      alertDurationCondShowAdd: true,
      alertDurationUnitShowAdd: true,
      alertDurationLevelNumShowAdd: true,
      alertCountCondShowAdd: true,
      alertCountNumShowAdd: true,
      alertCountLevelNumShowAdd: true,
      ruleAdd: {
        alertDuration: [],
        alertCount: []
      },
      //策略新增数据
      strategyAnalysisAddData: {
        aTimeAdd: "",
        groupId: "111",
        founder: "张三",
        name: "",
        alias: "",
        priority: "",
        type: "",
        description: "",
        enable: "",
        startTime: "",
        endTime: "",
        rule: {}
      },
      bizLineCodeAdd: "",
      bizLineCodeAddS: "",
      bizLineCodeEdit: "",
      bizLineCodeEditS: "",
      bizLineCodeSearch: "",
      bizLineCodeSearchS: "",

      pushBizLineCodeAdd: "",
      pushBizLineCodeEdit: "",
      pushBizLineCodeSearch: "",
      strategyAddSave: {
        groupId: "111",
        founder: "张三"
      },
      strategyAnalysisAddRuleDataReset: {
        indexByCIID: "",
        indexByAlertID: "",
        indexByHost: "",
        indexByIP: "",
        indexBySubSys: "",
        indexByModule: "",
        indexByBizLine: "",
        selectionRange: ""
      },
      alertDurationSelectDataAdd: [
        {
          label: "时间",
          value: "time"
        },
        {
          label: "数值",
          value: "count"
        }
      ],

      alertDurationCondValAdd: "",
      alertDurationCondValInputAdd: "",
      alertDurationUnitValAdd: "",
      alertDurationLevelValCountAdd: "",

      alertCountCondValAdd: "",
      alertCountCondValInputAdd: "",
      alertCountLevelValCountAdd: "",
      dayInterSearchAdd: "", //分析策略新增分析规则范围
      dayBeforeSearchAdd: "",

      //策略选择
      addShowOne: true,
      addShowTwo: true,
      addShowThree: true,
      addShowFour: true,
      //分析规则新增-----end

      //分析规则编辑---------------start
      selectRuleDataEdit: [],
      alertDurationCondShowEdit: true,
      alertDurationLevelNumShowEdit: true,
      alertCountCondShowEdit: true,
      alertCountNumShowEdit: true,
      alertCountLevelNumShowEdit: true,
      ruleEdit: {
        alertDuration: [],
        alertCount: []
      },
      ruleEdit1: {
        indexByCIID: "",
        indexByAlertID: "",
        indexByHost: "",
        indexByIP: "",
        indexBySubSys: "",
        indexByModule: "",
        indexByBizLine: ""
      },
      strategyAnalysisEdit: {
        aTimeEdit: "",
        name: "",
        alias: "",
        priority: "",
        type: "",
        enable: "",
        description: ""
      },
      analysisEditSaveData: {
        founder: "张三",
        groupId: "111"
      }, //分析编辑保存
      strategyAnalysisEditRuleReset: {
        indexByCIID: "",
        indexByAlertID: "",
        indexByHost: "",
        indexByIP: "",
        alertDuration: "",
        alertCount: "",
        indexBySubSys: "",
        indexByModule: "",
        indexByBizLine: "",
        selectionRange: ""
      },

      alertDurationCondValEdit: "",
      alertDurationCondValInputEdit: "",
      alertDurationUnitValEdit: "",
      alertDurationLevelValCountEdit: "",

      alertCountCondValEdit: "",
      alertCountCondValInputEdit: "",
      alertCountLevelValEdit: "",
      dayInterEdit: "",
      dayBeforeEdit: "",
      //策略编辑策略选择
      editShowOne: true,
      editShowTwo: true,
      editShowThree: true,
      editShowFour: true,
      //分析规则编辑---------------end
      pushStrategyFormData: [],
      strategyDialog: false,
      ruleDown: false,
      alertDown: false,
      pushStrategyAlertDown: false,
      alertSelertFrom: {
        domains: []
      },
      aTimeStartSearch: [],
      aTimeEndSearch: [],
      createTimeSearch: [],

      aTimeAdd: [],
      aTimeEdit: [],

      alertSelertFromObj: {},
      alertSelectAddFrom: {
        domains: []
      },
      alertSelertFromObjAdd: {},
      alertSelectEditFrom: {
        domains: []
      },
      alertSelertFromObjEdit: {},
      pushStrategyAlertSelertFrom: {
        domains: []
      },
      pushStrategyAlertSelertAddFrom: {
        domains: []
      },
      pushStrategyEditFrom: {
        domains: []
      },
      strategyAnalysisData: [],
      strategyAnalysisSelection: [], //分析策略表格选中的数据
      pushStrategySelection: [],
      strategyAnalysisDialog: false,
      strategyAnalysisAddDialog: false,
      strategyAnalysisEditDialog: false,
      pushStrategyEditDialog: false,
      pushStrategyAddDialog: false,
      strategyAnalysisActiveName: "first",
      strategyAnalysisActiveNameAdd: "first",
      strategyAnalysisActiveNamePre: "first",
      checktime: "",
      startTime: "",
      endTime: "",
      pushchannel: [],
      pushchannelData: [
        {
          label: "APP",
          value: "app"
        },
        {
          label: "电话",
          value: "telephone"
        },
        {
          label: "邮件",
          value: "mail"
        },
        {
          label: "短信",
          value: "sms"
        }
      ],
      pushStrategyCreateTime: [],
      //推送策略 ---------------start
      //分析设置显示隐藏列
      pushShowDialog: false,
      channelShow: true,
      receiverShow: true,
      templateShow: true,
      time1Show: true,
      retryShow: true,
      pushfounderShow: true,
      pushcreateTimeShow: true,
      pushnameShow: true,

      pushDialogData: [
        {
          name: "推送渠道",
          select: true,
          flag: "channelShow"
        },
        {
          name: "推送角色",
          select: true,
          flag: "receiverShow"
        },
        {
          name: "内容模板",
          select: true,
          flag: "templateShow"
        },
        {
          name: "推送间隔",
          select: true,
          flag: "retryShow"
        },
        {
          name: "推送时间",
          select: true,
          flag: "time1Show"
        },
        {
          name: "创建人",
          select: true,
          flag: "pushfounderShow"
        },
        {
          name: "创建时间",
          select: true,
          flag: "pushcreateTimeShow"
        },
        {
          name: "推送策略名称",
          select: true,
          flag: "pushnameShow"
        }
      ],
      //推送策略预览
      pushStrategyYuLan: {},
      //推送策略编辑
      yuHuoEdit: true,
      pushDelId: "",
      pushStrategyEditData: {
        strategy_name: "",
        max_count: "",
        content_template: "",
        pushchannelEdit: [],
        retry_interval: ""
      },
      pushSendTimeEdit: "",
      pushStartTimeEdit: "",
      pushEndTimeEdit: "",
      pushchannelEdit: [],
      pushSendIntervalInputEdit: "",
      sendInterfilEdit: "",
      handlerCheckedEdit: true, //责任人选择框
      otherCheckedEdit: true,
      groupCheckedEdit: true,
      handlerCheckEdit: [], //新增的责任人
      pushHandlerEditData: "", //当前的责任人
      receiverInfoEditDialog: false, //责任人明细dialog
      data2: [
        {
          id: 1,
          label: "一级 1"
        },
        {
          id: 2,
          label: "一级 2"
        }
      ],
      //编辑 组
      //传给后台 责任人id 组id
      personId: "",
      groupId: "",

      toDataEdit: [],
      addGroupShowEdit: false,
      addGroupBtnStyleEdit: false,
      addUserGroupNameEdit: "", //组名
      addGroupDataEdit: [], // 选择到组的成员
      pushGroupEdit: "", //编辑当前存在组
      pushAddDataSave: {
        //保存的数据
        founder: "admin"
      },
      //新增---推送时间模块框
      timeDialogEdit: false,
      tableDataTimeEdit: [
        {
          workday: true,
          frequency: "",
          pushStartTimeAdd: "",
          pushEndTimeAdd: ""
        }
      ],
      //推送策略新增
      pushSelectNameAdd: [], //新增告警选择器值
      pushSelectNameEdit: [],
      pushSelectNameSearch: [],
      personAddId: "",
      yuHuo: true,
      innerVisible: false,
      timeDialogAdd: false,
      handlerChecked: false,
      otherChecked: false,
      groupChecked: true,
      handlerCheckedSearch: true,
      groupCheckedSearch: true,
      otherCheckedValue: [],
      addGroupData: [],
      groupAllData: [],
      mode: "transfer",
      title: ["当前组", "选择推送组"],
      fromData: [],
      toData: [],
      addGroupShow: false,
      addGroupBtnStyle: false,
      pushAddData: {
        founder: "admin",
        strategy_name: "",
        max_count: "",
        content_template: "",
        pushchannelAdd: [],
        retry_interval: ""
      },
      //新增组 zukobe
      allGroupPersonData: [], //所有成员的数据
      addUserGroupName: "", //新增组名
      pushSendTimeAdd: "",
      pushStartTimeAdd: "",
      pushEndTimeAdd: "",
      pushchannelAdd: [],
      sendInterfilAdd: "",
      pushSendIntervalInputAdd: "",
      pushHandlerAddData: "", //新增当前责任人数据
      handlerAllData: [],
      allGroupData: [],
      //新增---推送时间模块框
      tableDataTime: [
        {
          workday: true,
          frequency: "",
          pushStartTimeAdd: "",
          pushEndTimeAdd: ""
        }
      ],
      //推送策略查询数据
      savePerson: [],
      pushStrategySearchData: {
        name: "",
        founder: ""
      },
      pushSendTime: "",
      pushSearchStartTime: "",
      pushSearchEndTime: "",
      pushWorkDay: true,
      searchFrequency: "",
      sendInterfil: "",
      pushSendIntervalInput: "",
      receiverInfoDialog: false,
      pushAlertConfirm: false,
      personSearchValue: [],
      founderStr: "", // 存放所有的推送角色
      toDataSearch: [],
      //推送策略 ---------------end
      checkHandlerData: [], //推送新增选中的责任人数据
      arrShowAdd: false,
      arrShowEdit: false,
      checkGroupData: [], //新增选中的组
      checkHandlerDataEdit: [], //推送编辑选中的责任人数据
      arrShowEdit: false,
      checkGroupEdit: [],
      checkHandlerDataSearch: [], //查询编辑选中的责任人数据
      checkGroupSearch: []
    };
  },
  watch: {
    pFilterAdd1(val) {
      this.$refs.hanlderAdd.filter(val);
    },
    pFilterAdd2(val) {
      this.$refs.arrNameAdd.filter(val);
    },
    pFilterEdit1(val) {
      this.$refs.hanlderEdit.filter(val);
    },
    pFilterEdit2(val) {
      this.$refs.arrNameEdit.filter(val);
    },
    pFilterSearch1(val) {
      this.$refs.hanlderSearch.filter(val);
    },
    pFilterSearch2(val) {
      this.$refs.arrNameSearch.filter(val);
    }
  },
  methods: {
    searchItemDown(){
      this.searchItemShow = !this.searchItemShow
    },
      //获取localstorage列的隐藏显示
    getColData(){
      let colData = localStorage.getItem('autoBillColData')
      if(colData){
        let colObj = JSON.parse(colData);
        for (const key in colObj) {
          this[key] = colObj[key]
        }
      }
    },
    kkk() {
      console.log(this.bizLineCodeEdit);
      console.log(this.bizLineCodeEditS);
    },
    checkboxT(row) {
      if (row.enable != 0) {
        return 0;
      } else {
        return 1;
      }
    },
    //策略新增正则
    valueFilterAdd(val, inval, index) {
      if (val == "告警级别") {
        if (inval != "0" && inval != "1" && inval != "2") {
          this.$message({
            showClose: true,
            message: "输入值无效",
            type: "error"
          });
          this.alertSelectAddFrom.domains[index].value = "";
        }
      }
      if ((val = "ip地址")) {
        if (
          !/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/.test(
            inval
          )
        ) {
          this.alertSelectAddFrom.domains[index].value = "";
        }
      }
    },
    //策略编辑正则
    valueFilterEdit(val, inval, index) {
      if (val == "告警级别") {
        if (inval != "0" && inval != "1" && inval != "2") {
          this.$message({
            showClose: true,
            message: "输入值无效",
            type: "error"
          });
          this.alertSelectEditFrom.domains[index].value = "";
        }
      }
      if ((val = "ip地址")) {
        if (
          !/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/.test(
            inval
          )
        ) {
          this.alertSelectEditFrom.domains[index].value = "";
        }
      }
    },

    renderContentAdd(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              class="btnAddStyle"
              type="text"
              icon="el-icon-error"
              on-click={() => this.groupDelAdd(node, data)}
            />
          </span>
        </span>
      );
    },
    pushrenderContentEdit(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              class="btnAddStyle"
              type="text"
              icon="el-icon-error"
              on-click={() => this.groupDelEdit(node, data)}
            />
          </span>
        </span>
      );
    },
    groupDelAdd(node, data) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const parent = node.parent;
        const children = parent.data.member || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
        if (data.member) {
          //父节点
          let params = {
            group_id: data.id
          };
          service.pushDelGroupService(params).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getAllGroupPerson();
          });
        } else {
          //子节点
          let params = {
            group_id: data.parentId,
            user_id: data.userId
          };
          service.pushDelGroupPersonService(params).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getAllGroupPerson();
          });
        }
      });
    },
    groupDelEdit(node, data) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const parent = node.parent;
        const children = parent.data.member || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
        if (data.member) {
          //父节点
          let params = {
            group_id: data.id
          };
          service.pushDelGroupService(params).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getAllGroupPerson();
          });
        } else {
          //子节点
          let params = {
            group_id: data.parentId,
            user_id: data.userId
          };
          service.pushDelGroupPersonService(params).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getAllGroupPerson();
          });
        }
      });
    },
    cutSelectHandler(id) {
      console.log(id);
      this.checkHandlerData = this.checkHandlerData.filter(val => {
        return val.id != id;
      });
    },
    cutSelectHandlerEdit(id) {
      this.checkHandlerDataEdit = this.checkHandlerDataEdit.filter(val => {
        return val.id != id;
      });
    },
    cutSelectHandlerSearch(id) {
      this.checkHandlerDataSearch = this.checkHandlerDataSearch.filter(val => {
        return val.id != id;
      });
    },

    //新增选中的责任人到配置
    getHandlerAdd() {
      this.checkHandlerData = this.$refs.hanlderAdd.getCheckedNodes();
    },
    //新增组的确定
    pHandlerArrConfirm() {
      console.log(this.$refs.hanlderArrPersonAdd.getCheckedNodes());
      this.arrShowAdd = false;
      //先获取选取的组员
      //组名 addUserGroupName
      let personArr = this.$refs.hanlderArrPersonAdd.getCheckedNodes();
      let arr = [];
      personArr.forEach(val => {
        arr.push(val);
      });
      let params = {
        groupName: this.addUserGroupName,
        member: arr
      };
      service.pushAddGroup(params).then(res => {
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.getAllGroupPerson();
        this.arrShowAdd = false;
      });
    },
    //编辑--新增组的确定
    pHandlerArrConfirmEdit() {
      console.log(this.$refs.hanlderArrPersonEdit.getCheckedNodes());
      this.arrShowEdit = false;
      //先获取选取的组员
      //组名 addUserGroupName
      let personArr = this.$refs.hanlderArrPersonEdit.getCheckedNodes();
      let arr = [];
      personArr.forEach(val => {
        arr.push(val);
      });
      let params = {
        groupName: this.addUserGroupNameEdit,
        member: arr
      };
      service.pushAddGroup(params).then(res => {
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.getAllGroupPerson();
        this.arrShowEdit = false;
      });
    },
    //新增组到选中的组
    addArrToPeroson() {
      // console.log(this.$refs.arrNameAdd.getCheckedNodes());
      // // let data=this.$refs.arrNameAdd.getCheckedNodes()
      this.checkGroupData = this.$refs.arrNameAdd.getCheckedNodes();
    },
    //编辑 - 选择到的责任人
    getHandlerEdit() {
      console.log(this.$refs.hanlderEdit.getCheckedNodes());
      this.checkHandlerDataEdit = this.$refs.hanlderEdit.getCheckedNodes();
    },
    //编辑 - 选择到的组
    editArrToPeroson() {
      this.checkGroupEdit = this.$refs.arrNameEdit.getCheckedNodes();
    },

    //查询 - 选择到的责任人
    getHandlerSearch() {
      this.checkHandlerDataSearch = this.$refs.hanlderSearch.getCheckedNodes();
    },
    //查询 - 选择到的组
    searchArrToPeroson() {
      this.checkGroupSearch = this.$refs.arrNameSearch.getCheckedNodes();
    },

    //删除已经选择的组
    delSelectHandler(id) {
      this.checkGroupData = this.checkGroupData.filter(val => {
        return val.groupId != id;
      });
    },
    //编辑 --删除已经选择的组
    delSelectHandlerEdit(id) {
      this.checkGroupEdit = this.checkGroupEdit.filter(val => {
        return val.groupId != id;
      });
    },
    delSelectHandlerSearch(id) {
      this.checkGroupSearch = this.checkGroupSearch.filter(val => {
        return val.groupId != id;
      });
    },
    //推送新增组
    pushHandlerArrAdd() {
      this.addUserGroupName = "";
      this.arrShowAdd = !this.arrShowAdd;
    },
    //编辑新增组
    pushHandlerArrEdit() {
      this.addUserGroupNameEdit = "";
      this.arrShowEdit = !this.arrShowEdit;
    },
    filterNodeHanlderAdd(value, data) {
      if (!value) return true;
      return data.userName.indexOf(value) !== -1;
    },
    filterNodeHanlderArrAdd(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    filterNodeHanlderEdit(value, data) {
      if (!value) return true;
      return data.userName.indexOf(value) !== -1;
    },
    filterNodeHanlderArrEdit(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    filterNodeHanlderSearch(value, data) {
      if (!value) return true;
      return data.userName.indexOf(value) !== -1;
    },
    filterNodeHanlderArrSearch(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    ruleDown1() {
      this.ruleDown = !this.ruleDown;
      this.alertDown = false;
    },
    kobe1(tab) {
      console.log(tab.name);
      if (tab.name == "first1") {
        this.tabOneShow = true;
        this.tabTwoShow = false;
        this.tabThreeShow = false;
      } else if (tab.name == "second1") {
        this.tabOneShow = false;
        this.tabTwoShow = true;
        this.tabThreeShow = false;
      } else if ((tab.name = "three")) {
        this.tabOneShow = false;
        this.tabTwoShow = false;
        this.tabThreeShow = true;
      }
    },
    tabOne() {
      console.log(1);
    },
    tabTwo() {
      console.log(2);
    },
    //输入框为整数
    proving() {
      this.pushAddData.max_count = this.pushAddData.max_count.replace(
        /[^\.\d]/g,
        ""
      );
      this.pushAddData.max_count = this.pushAddData.max_count.replace(".", "");
    },

    //分析  查询输入验证 ---------------------
    aNameSearch() {
      this.strategyAnalysisSearchData.strategy_name = this.strategyAnalysisSearchData.strategy_name.replace(
        /[^A-z]/,
        ""
      );
    },
    pushName() {
      this.pushStrategySearchData.name = this.pushStrategySearchData.name.replace(
        /[^\w\u4E00-\u9FA5]/g,
        ""
      );
    },
    //分析  新增输入验证 ---------------------
    //别名验证
    aAlias() {
      // this.strategyAnalysisAddData.alias=this.strategyAnalysisAddData.alias.replace(new RegExp("[\\+,\\/,\\\\,\\?,\\？,\\%,\\#,\\&,\\=,\\(,\\),\\（,\\）,\\{,\\},\\',\\\",\\<,\\>,\\@,\\!,\\！,\\$,\\.,\\，,\\、,\\:,\\：,\\;,\\；,\\￥,\\*,\\~,\\`,\\-,\\——,\\_,\\^,\\“,\\”,\\‘,\\’,\\……,\\【,\\】,\\[,\\],\\,]", "gm"), "").replace(/\s+/g,'');
      this.strategyAnalysisAddData.alias = this.strategyAnalysisAddData.alias.replace(
        /[^\u4E00-\u9FA5]/g,
        ""
      );
    },
    //名称验证
    aName() {
      this.strategyAnalysisAddData.name = this.strategyAnalysisAddData.name.replace(
        /[^A-z]/,
        ""
      );
    },
    //范围验证
    aInterDay() {
      this.dayInterSearchAdd = this.dayInterSearchAdd
        .replace(/[^\.\d]/g, "")
        .replace(".", "");
    },
    aBeforeDay() {
      this.dayBeforeSearchAdd = this.dayBeforeSearchAdd
        .replace(/[^\.\d]/g, "")
        .replace(".", "");
    },
    //次数验证
    aCount() {
      this.alertCountCondValInputAdd = this.alertCountCondValInputAdd
        .replace(/[^\.\d]/g, "")
        .replace(".", "");
    },
    //分析  编辑输入验证----------------------------------
    aNameEdit() {
      this.strategyAnalysisEdit.name = this.strategyAnalysisEdit.name.replace(
        /[^A-z]/,
        ""
      );
    },
    //别名验证
    aAliasEdit() {
      this.strategyAnalysisEdit.alias = this.strategyAnalysisEdit.alias.replace(
        /[^\u4E00-\u9FA5]/g,
        ""
      );
    },
    //范围验证
    aInterDayEdit() {
      this.dayInterEdit = this.dayInterEdit
        .replace(/[^\.\d]/g, "")
        .replace(".", "");
    },
    aBeforeDayEdit() {
      this.dayBeforeEdit = this.dayBeforeEdit
        .replace(/[^\.\d]/g, "")
        .replace(".", "");
    },
    //周期次数
    aTimeCountEdit() {
      this.alertDurationCondValInputEdit = this.alertDurationCondValInputEdit
        .replace(/[^\.\d]/g, "")
        .replace(".", "");
    },
    //次数验证
    aCountEdit() {
      this.alertCountCondValInputEdit = this.alertCountCondValInputEdit
        .replace(/[^\.\d]/g, "")
        .replace(".", "");
    },
    //分析策略 删除单个数据
    deleteRow(id, enable) {
      if (enable) {
        this.$message.error("启用状态不可删除");
        return;
      }
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.querystrategyAnalysisFormDelData(id);
        })
        .catch(() => {});
    },
    pushStrategyEditDialogdeleteRow(id) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.pushStrategDelService(id);
        })
        .catch(() => {});
    },
    //推送策略预览
    strategyRowChange(row) {
      service.pushAnalysisSingleSearch(row.id).then(res => {
        let resoult = res.data;
        this.pushStrategyYuLan = resoult;
        this.pushStrategyYuLan.start = resoult.push_time_strategy.start;
        this.pushStrategyYuLan.end = resoult.push_time_strategy.end;
        this.pushStrategyYuLan.range = resoult.push_time_strategy.start;
        this.pushStrategyYuLan.frequency = resoult.push_time_strategy.frequency;
      });
      this.strategyDialog = true;
    },
    billEditRemoveDomain(item) {
      var index = this.billAlertSelertEditFrom.domains.indexOf(item);
      if (index !== -1) {
        this.billAlertSelertEditFrom.domains.splice(index, 1);
      }
    },
    billAddDomainEdit() {
      if (this.billSelectNameEdit.length) {
        if (this.billAlertSelertEditFrom.domains.length) {
          //判断重复line
          if (this.billSelectNameEdit[0] != this.billBizLineCodeEdit) {
            this.$message({
              message: "告警选择器业务线不一致",
              type: "error"
            });
            return;
          }
          //判断不能是重复的选择器
          this.selectFlagSearch = true;
          this.billAlertSelertEditFrom.domains.forEach(val => {
            if (this.billSelectNameEdit[1] == val.key) {
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.selectFlagSearch = false;
            }
          });

          if (this.selectFlagSearch) {
            let backName = "";
            let backNameKey = "";
            let regInfo = '';
            this.ruleData.forEach(val => {
              if (val.key == this.billBizLineCodeEdit) {
                if (val.tags) {
                  val.tags.forEach(value => {
                    if (value.key == this.billSelectNameEdit[1]) {
                      backName = val.name + "/" + value.name;
                      backNameKey = value.key;
                      if(value.reg){
                        regInfo = value.reg
                      }
                    }
                  });
                }
              }
            });
            this.billAlertSelertEditFrom.domains.push({
              key: backNameKey,
              value: "",
              name: backName,
              reg:regInfo
            });
          }
        } else {
          console.log("没有长度");
          this.billBizLineCodeEdit = this.billSelectNameEdit[0];
          let backName = "";
          let backNameKey = "";
          let regInfo ='';
          this.ruleData.forEach(val => {
            if (val.key == this.billBizLineCodeEdit) {
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == this.billSelectNameEdit[1]) {
                    backName = val.name + "/" + value.name;
                    backNameKey = value.key;
                    if(value.reg){
                        regInfo = value.reg
                      }
                  }
                });
              }
            }
          });
          this.billAlertSelertEditFrom.domains.push({
            key: backNameKey,
            value: "",
            name: backName,
            reg:regInfo
          });
        }
      } else {
        this.$message({
          message: "请选择告警选择器",
          type: "error"
        });
      }
    },

    billAddRemoveDomain(item) {
      var index = this.alertSelectAddFrom.domains.indexOf(item);
      if (index !== -1) {
        this.alertSelectAddFrom.domains.splice(index, 1);
      }
    },
    billAddDomainAdd() {
      if (this.billSelectNameAdd.length) {
        if (this.alertSelectAddFrom.domains.length) {
          //判断重复line
          if (this.billSelectNameAdd[0] != this.billBizLineCodeAdd) {
            this.$message({
              message: "告警选择器业务线不一致",
              type: "error"
            });
            return;
          }
          //判断不能是重复的选择器
          this.selectFlagSearch = true;
          this.alertSelectAddFrom.domains.forEach(val => {
            if (this.billSelectNameAdd[1] == val.key) {
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.selectFlagSearch = false;
            }
          });

          if (this.selectFlagSearch) {
            let backName = "";
            let backNameKey = "";
            let regInfo ='';
            this.ruleData.forEach(val => {
              if (val.key == this.billBizLineCodeAdd) {
                if (val.tags) {
                  val.tags.forEach(value => {
                    if (value.key == this.billSelectNameAdd[1]) {
                      backName = val.name + "/" + value.name;
                      backNameKey = value.key;
                      if(value.reg){
                        regInfo = value.reg
                      }
                    }
                  });
                }
              }
            });
            this.alertSelectAddFrom.domains.push({
              key: backNameKey,
              value: "",
              name: backName,
              reg:regInfo
            });
          }
        } else {
          console.log("没有长度");
          this.billBizLineCodeAdd = this.billSelectNameAdd[0];

          let backName = "";
          let backNameKey = "";
          let regInfo ='';
          this.ruleData.forEach(val => {
            if (val.key == this.billBizLineCodeAdd) {
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == this.billSelectNameAdd[1]) {
                    backName = val.name + "/" + value.name;
                    backNameKey = value.key;
                    if(value.reg){
                        regInfo = value.reg
                      }
                  }
                });
              }
            }
          });
          this.alertSelectAddFrom.domains.push({
            key: backNameKey,
            value: "",
            name: backName,
            reg:regInfo
          });
        }
      } else {
        this.$message({
          message: "请选择告警选择器",
          type: "error"
        });
      }
    },
    billRemoveDomain(item) {
      var index = this.billAlertSelertFrom.domains.indexOf(item);
      if (index !== -1) {
        this.billAlertSelertFrom.domains.splice(index, 1);
      }
    },
    billSearchDomain() {
      if (this.billSelectNameSearch.length) {
        if (this.billAlertSelertFrom.domains.length) {
          //判断重复line
          if (this.billSelectNameSearch[0] != this.billBizLineCodeSearch) {
            this.$message({
              message: "告警选择器业务线不一致",
              type: "error"
            });
            return;
          }
          //判断不能是重复的选择器
          this.selectFlagSearch = true;
          this.billAlertSelertFrom.domains.forEach(val => {
            if (this.billSelectNameSearch[1] == val.key) {
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.selectFlagSearch = false;
            }
          });

          if (this.selectFlagSearch) {
            let backName = "";
            let backNameKey = "";
            this.ruleData.forEach(val => {
              // this.bizLineCodeSearch=val.key;
              if (val.key == this.billBizLineCodeSearch) {
                if (val.tags) {
                  val.tags.forEach(value => {
                    if (value.key == this.billSelectNameSearch[1]) {
                      backName = value.name;
                      backNameKey = value.key;
                    }
                  });
                }
              }
            });
            this.billAlertSelertFrom.domains.push({
              key: backNameKey,
              value: "",
              name: backName
            });
          }
        } else {
          console.log("没有长度");
          this.billBizLineCodeSearch = this.billSelectNameSearch[0];

          let backName = "";
          let backNameKey = "";
          this.ruleData.forEach(val => {
            if (val.key == this.billBizLineCodeSearch) {
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == this.billSelectNameSearch[1]) {
                    backName = value.name;
                    backNameKey = value.key;
                  }
                });
              }
            }
          });
          this.billAlertSelertFrom.domains.push({
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
    addDomain() {
      if (this.selectNameSearch.length) {
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
          this.selectFlagSearch = true;
          this.alertSelertFrom.domains.forEach(val => {
            if (this.selectNameSearch[1] == val.key) {
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.selectFlagSearch = false;
            }
          });

          if (this.selectFlagSearch) {
            let backName = "";
            let backNameKey = "";
            this.ruleData.forEach(val => {
              // this.bizLineCodeSearch=val.key;
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
          this.ruleData.forEach(val => {
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
      /* if (this.selectNameSearch.length) {
        //[key:value]
        if(this.bizLineCodeSearchS){
          //不是第一次
          if(this.bizLineCodeSearchS != this.selectNameSearch[0]){
            this.$message({
                message: "告警选择器业务线和规则业务线不一致",
                type: "error"
              });
          }else{
            if (this.alertSelertFrom.domains.length) {
              //判断不能是重复的选择器
              this.selectFlagSearch = true;
              this.alertSelertFrom.domains.forEach(val => {
                if (this.selectNameSearch[1] == val.key) {
                  this.$message({
                    message: "不能重复选择选择器",
                    type: "error"
                  });
                  this.selectFlagSearch = false;
                } 
              });

              if (this.selectFlagSearch) {
                let backName = "";
                let backNameKey='';
                this.ruleData.forEach(val => {
                  if(val.key==this.bizLineCodeSearch){
                    if(val.tags){
                      val.tags.forEach(value=>{
                        if(value.key==this.selectNameSearch[1]){
                          backName =value.name;
                          backNameKey = value.key
                        }
                      })
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
              this.bizLineCodeSearch=this.selectNameSearch[0];

              let backName = "";
              let backNameKey='';
              this.ruleData.forEach(val => {
                if(val.key==this.bizLineCodeSearch){
                  if(val.tags){
                    val.tags.forEach(value=>{
                      if(value.key==this.selectNameSearch[1]){
                        backName = val.name+'/'+value.name;
                        backNameKey = value.key
                      }
                    })
                  }
                }
              });
              this.alertSelertFrom.domains.push({
                key: backNameKey,
                value: "",
                name: backName
              });
            }
          }
        }else{
          //第一次
          if (this.alertSelertFrom.domains.length) {
            //判断重复line
            if(this.selectNameSearch[0] != this.bizLineCodeSearch ){
               this.$message({
                message: "告警选择器业务线不一致",
                type: "error"
              });
              return;
            }
            //判断不能是重复的选择器
            this.selectFlagSearch = true;
            this.alertSelertFrom.domains.forEach(val => {
              if (this.selectNameSearch[1] == val.key) {
                this.$message({
                  message: "不能重复选择选择器",
                  type: "error"
                });
                this.selectFlagSearch = false;
              } 
            });
            
            if (this.selectFlagSearch) {
              let backName = "";
              let backNameKey='';
              this.ruleData.forEach(val => {
                this.bizLineCodeSearch=val.key;
                if(val.key==this.bizLineCodeSearch){
                  if(val.tags){
                    val.tags.forEach(value=>{
                      if(value.key==this.selectNameSearch[1]){
                        backName =value.name;
                        backNameKey = value.key
                      }
                    })
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
            this.bizLineCodeSearch=this.selectNameSearch[0];

            let backName = "";
            let backNameKey='';
            this.ruleData.forEach(val => {
              if(val.key==this.bizLineCodeSearch){
                if(val.tags){
                  val.tags.forEach(value=>{
                    if(value.key==this.selectNameSearch[1]){
                      backName =value.name;
                      backNameKey = value.key
                    }
                  })
                }
              }
            });
            this.alertSelertFrom.domains.push({
              key: backNameKey,
              value: "",
              name: backName
            });
          }
        }
      } else {
        this.$message({
          message: "请选择告警选择器",
          type: "error"
        });
      } */
    },
    removeDomainDialog(item) {
      var index = this.alertSelectAddFrom.domains.indexOf(item);
      if (index !== -1) {
        this.alertSelectAddFrom.domains.splice(index, 1);
      }
    },
    addDomainDialog() {
      //去除规则
      if (this.selectNameAdd.length) {
        if (this.alertSelectAddFrom.domains.length) {
          //判断重复line
          if (this.selectNameAdd[0] != this.bizLineCodeAdd) {
            this.$message({
              message: "告警选择器业务线不一致",
              type: "error"
            });
            return;
          }
          //判断不能是重复的选择器
          this.selectFlagAdd = true;
          this.alertSelectAddFrom.domains.forEach(val => {
            if (this.selectNameAdd[1] == val.key) {
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.selectFlagAdd = false;
            }
          });

          if (this.selectFlagAdd) {
            let backName = "";
            let backNameKey = "";
            this.ruleData.forEach(val => {
              // this.bizLineCodeAdd=val.key
              if (val.key == this.bizLineCodeAdd) {
                if (val.tags) {
                  val.tags.forEach(value => {
                    if (value.key == this.selectNameAdd[1]) {
                      backName = val.name + "/" + value.name;
                      backNameKey = value.key;
                    }
                  });
                }
              }
            });
            this.alertSelectAddFrom.domains.push({
              key: backNameKey,
              value: "",
              name: backName
            });
          }
        } else {
          console.log("没有长度");
          this.bizLineCodeAdd = this.selectNameAdd[0];

          let backName = "";
          let backNameKey = "";
          this.ruleData.forEach(val => {
            if (val.key == this.bizLineCodeAdd) {
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == this.selectNameAdd[1]) {
                    backName = val.name + "/" + value.name;
                    backNameKey = value.key;
                  }
                });
              }
            }
          });
          this.alertSelectAddFrom.domains.push({
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

      //有规则
      /* if (this.selectNameAdd.length) {
        //[key:value]
        if(this.bizLineCodeAddS){
          //不是第一次
          if(this.bizLineCodeAddS != this.selectNameAdd[0]){
            this.$message({
                message: "告警选择器业务线和规则业务线不一致",
                type: "error"
              });
          }else{
            if (this.alertSelectAddFrom.domains.length) {
              //判断不能是重复的选择器
              this.selectFlagAdd = true;
              this.alertSelectAddFrom.domains.forEach(val => {
                if (this.selectNameAdd[1] == val.key) {
                  this.$message({
                    message: "不能重复选择选择器",
                    type: "error"
                  });
                  this.selectFlagAdd = false;
                } 
              });

              if (this.selectFlagAdd) {
                let backName = "";
                let backNameKey='';
                this.ruleData.forEach(val => {
                  if(val.key==this.bizLineCodeAdd){
                    if(val.tags){
                      val.tags.forEach(value=>{
                        if(value.key==this.selectNameAdd[1]){
                          backName = val.name+'/'+value.name;
                          backNameKey = value.key
                        }
                      })
                    }
                  }
                });
                this.alertSelectAddFrom.domains.push({
                  key: backNameKey,
                  value: "",
                  name: backName
                });
              }
            } else {
              console.log("没有长度");
              this.bizLineCodeAdd=this.selectNameAdd[0];

              let backName = "";
              let backNameKey='';
              this.ruleData.forEach(val => {
                if(val.key==this.bizLineCodeAdd){
                  if(val.tags){
                    val.tags.forEach(value=>{
                      if(value.key==this.selectNameAdd[1]){
                        backName = val.name+'/'+value.name;
                        backNameKey = value.key
                      }
                    })
                  }
                }
              });
              this.alertSelectAddFrom.domains.push({
                key: backNameKey,
                value: "",
                name: backName
              });
            }
          }
        }else{
          //第一次
          if (this.alertSelectAddFrom.domains.length) {
            
            //判断重复line
            if(this.selectNameAdd[0] != this.bizLineCodeAdd ){
              this.$message({
                message: "告警选择器业务线不一致",
                type: "error"
              });
              return;
            }
            //判断不能是重复的选择器
            this.selectFlagAdd = true;
            this.alertSelectAddFrom.domains.forEach(val => {
              if (this.selectNameAdd[1] == val.key) {
                this.$message({
                  message: "不能重复选择选择器",
                  type: "error"
                });
                this.selectFlagAdd = false;
              } 
            });

            if (this.selectFlagAdd) {
              let backName = "";
              let backNameKey='';
              this.ruleData.forEach(val => {
                if(val.key==this.bizLineCodeAdd){
                  if(val.tags){
                    val.tags.forEach(value=>{
                      if(value.key==this.selectNameAdd[1]){
                        backName = val.name+'/'+value.name;
                        backNameKey = value.key
                      }
                    })
                  }
                }
              });
              this.alertSelectAddFrom.domains.push({
                key: backNameKey,
                value: "",
                name: backName
              });
            }
          } else {
            console.log("没有长度");
            this.bizLineCodeAdd=this.selectNameAdd[0];

            let backName = "";
            let backNameKey='';
            this.ruleData.forEach(val => {
              if(val.key==this.bizLineCodeAdd){
                if(val.tags){
                  val.tags.forEach(value=>{
                    if(value.key==this.selectNameAdd[1]){
                      backName = val.name+'/'+value.name;
                      backNameKey = value.key
                    }
                  })
                }
              }
            });
            this.alertSelectAddFrom.domains.push({
              key: backNameKey,
              value: "",
              name: backName
            });
          }
        }
      } else {
        this.$message({
          message: "请选择告警选择器",
          type: "error"
        });
      } */
    },
    removeDomainDialogEdit(item) {
      var index = this.alertSelectEditFrom.domains.indexOf(item);
      if (index !== -1) {
        this.alertSelectEditFrom.domains.splice(index, 1);
      }
    },
    addDomainDialogEdit() {
      if (this.selectNameEdit.length) {
        if (this.alertSelectEditFrom.domains.length) {
          //判断重复line
          if (this.selectNameEdit[0] != this.bizLineCodeEdit) {
            this.$message({
              message: "告警选择器业务线不一致",
              type: "error"
            });
            return;
          }
          //判断不能是重复的选择器
          this.selectFlagEdit = true;
          this.alertSelectEditFrom.domains.forEach(val => {
            if (this.selectNameEdit[1] == val.key) {
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.selectFlagEdit = false;
            }
          });

          if (this.selectFlagEdit) {
            let backName = "";
            let backNameKey = "";
            this.ruleData.forEach(val => {
              if (val.key == this.bizLineCodeEdit) {
                if (val.tags) {
                  val.tags.forEach(value => {
                    if (value.key == this.selectNameEdit[1]) {
                      backName = val.name + "/" + value.name;
                      backNameKey = value.key;
                    }
                  });
                }
              }
            });
            this.alertSelectEditFrom.domains.push({
              key: backNameKey,
              value: "",
              name: backName
            });
          }
        } else {
          console.log("没有长度");
          this.bizLineCodeEdit = this.selectNameEdit[0];

          let backName = "";
          let backNameKey = "";
          this.ruleData.forEach(val => {
            if (val.key == this.bizLineCodeEdit) {
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == this.selectNameAdd[1]) {
                    backName = val.name + "/" + value.name;
                    backNameKey = value.key;
                  }
                });
              }
            }
          });
          this.alertSelectEditFrom.domains.push({
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
      /* if (this.selectNameEdit.length) {
        //[key:value]
        if(this.bizLineCodeEditS){
          //不是第一次
          if(this.bizLineCodeEditS != this.selectNameEdit[0]){
            this.$message({
                message: "告警选择器业务线和规则业务线不一致",
                type: "error"
              });
          }else{
            if (this.alertSelectEditFrom.domains.length) {
              //判断不能是重复的选择器
              this.selectFlagEdit = true;
              this.alertSelectEditFrom.domains.forEach(val => {
                if (this.selectNameEdit[1] == val.key) {
                  this.$message({
                    message: "不能重复选择选择器",
                    type: "error"
                  });
                  this.selectFlagEdit = false;
                } 
              });

              if (this.selectFlagEdit) {
                let backName = "";
                let backNameKey='';
                this.ruleData.forEach(val => {
                  if(val.key==this.bizLineCodeEdit){
                    if(val.tags){
                      val.tags.forEach(value=>{
                        if(value.key==this.selectNameEdit[1]){
                          backName = val.name+'/'+value.name;
                          backNameKey = value.key
                        }
                      })
                    }
                  }
                });
                this.alertSelectEditFrom.domains.push({
                  key: backNameKey,
                  value: "",
                  name: backName
                });
              }
            } else {
              console.log("没有长度1");
              this.bizLineCodeEdit=this.selectNameEdit[0];

              let backName = "";
              let backNameKey='';
              this.ruleData.forEach(val => {
                if(val.key==this.bizLineCodeEdit){
                  if(val.tags){
                    val.tags.forEach(value=>{
                      if(value.key==this.selectNameEdit[1]){
                        backName = val.name+'/'+value.name;
                        backNameKey = value.key
                      }
                    })
                  }
                }
              });
              this.alertSelectEditFrom.domains.push({
                key: backNameKey,
                value: "",
                name: backName
              });
            }
          }
        }else{
          //第一次
          if (this.alertSelectEditFrom.domains.length) {
            //判断重复line
            if(this.selectNameEdit[0] != this.bizLineCodeEdit ){
              this.$message({
                message: "告警选择器业务线不一致",
                type: "error"
              });
              return;
            }
            //判断不能是重复的选择器
            this.selectFlagEdit = true;
            this.alertSelectEditFrom.domains.forEach(val => {
              if (this.selectNameEdit[1] == val.key) {
                this.$message({
                  message: "不能重复选择选择器",
                  type: "error"
                });
                this.selectFlagEdit = false;
              } 
            });

            if (this.selectFlagEdit) {
              let backName = "";
              let backNameKey='';
              this.ruleData.forEach(val => {
                if(val.key==this.bizLineCodeEdit){
                  if(val.tags){
                    val.tags.forEach(value=>{
                      if(value.key==this.selectNameEdit[1]){
                        backName = val.name+'/'+value.name;
                        backNameKey = value.key
                      }
                    })
                  }
                }
              });
              this.alertSelectEditFrom.domains.push({
                key: backNameKey,
                value: "",
                name: backName
              });
            }
          } else {
            console.log("没有长度");
            this.bizLineCodeEdit=this.selectNameEdit[0];
            console.log(this.ruleData);
            let backName = "";
            let backNameKey='';
            this.ruleData.forEach(val => {
              if(val.key==this.bizLineCodeEdit){
                if(val.tags){
                  val.tags.forEach(value=>{
                    if(value.key==this.selectNameAdd[1]){
                      backName = val.name+'/'+value.name;
                      backNameKey = value.key
                    }
                  })
                }
              }
            });
            this.alertSelectEditFrom.domains.push({
              key: backNameKey,
              value: "",
              name: backName
            });
            console.log(this.alertSelectEditFrom);
          }
        }
      } else {
        this.$message({
          message: "请选择告警选择器",
          type: "error"
        });
      } */
    },

    removepushStrategyAlertSelectAddDialog(item) {
      var index = this.pushStrategyAlertSelertAddFrom.domains.indexOf(item);
      if (index !== -1) {
        this.pushStrategyAlertSelertAddFrom.domains.splice(index, 1);
      }
    },
    pushStrategyAlertSelectAddDialog() {
      if (this.pushSelectNameAdd.length) {
        //[key:value]
        //第一次
        if (this.pushStrategyAlertSelertAddFrom.domains.length) {
          //判断重复line
          if (this.pushSelectNameAdd[0] != this.pushBizLineCodeAdd) {
            this.$message({
              message: "告警选择器业务线不一致",
              type: "error"
            });
            return;
          }
          //判断不能是重复的选择器
          this.pushSelectFlagAdd = true;
          this.pushStrategyAlertSelertAddFrom.domains.forEach(val => {
            if (this.pushSelectNameAdd[1] == val.key) {
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.pushSelectFlagAdd = false;
            }
          });

          if (this.pushSelectFlagAdd) {
            let backName = "";
            let backNameKey = "";
            this.selectorData.forEach(val => {
              // this.pushBizLineCodeAdd = val.key;
              if (val.key == this.pushBizLineCodeAdd) {
                if (val.tags) {
                  val.tags.forEach(value => {
                    if (value.key == this.pushSelectNameAdd[1]) {
                      backName = val.name + "/" + value.name;
                      backNameKey = value.key;
                    }
                  });
                }
              }
            });
            this.pushStrategyAlertSelertAddFrom.domains.push({
              key: backNameKey,
              value: "",
              name: backName
            });
          }
        } else {
          console.log("没有长度");
          this.pushBizLineCodeAdd = this.pushSelectNameAdd[0];

          let backName = "";
          let backNameKey = "";
          this.selectorData.forEach(val => {
            if (val.key == this.pushBizLineCodeAdd) {
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == this.pushSelectNameAdd[1]) {
                    backName = val.name + "/" + value.name;
                    backNameKey = value.key;
                  }
                });
              }
            }
          });
          this.pushStrategyAlertSelertAddFrom.domains.push({
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
      /*  if (this.pushSelectNameAdd) {
        //[key:value]
        if (this.pushStrategyAlertSelertAddFrom.domains.length) {
          this.pushSelectFlagAdd = true;
          this.pushStrategyAlertSelertAddFrom.domains.forEach(val => {
            if (this.pushSelectNameAdd == val.key) {
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.pushSelectFlagAdd = false;
            } else {
              console.log("true");
            }
          });
          if (this.pushSelectFlagAdd) {
            let backName = "";
            this.selectorData.forEach(val => {
              if (val.key == this.pushSelectNameAdd) {
                backName = val.name;
              }
            });
            this.pushStrategyAlertSelertAddFrom.domains.push({
              key: this.pushSelectNameAdd,
              value: "",
              name: backName
            });
          }
        } else {
          let backName = "";
          this.selectorData.forEach(val => {
            if (val.key == this.pushSelectNameAdd) {
              backName = val.name;
            }
          });
          this.pushStrategyAlertSelertAddFrom.domains.push({
            key: this.pushSelectNameAdd,
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
    removepushStrategyDomain(item) {
      var index = this.pushStrategyAlertSelertFrom.domains.indexOf(item);
      if (index !== -1) {
        this.pushStrategyAlertSelertFrom.domains.splice(index, 1);
      }
    },
    pushStrategyAddDomain() {
      if (this.pushSelectNameSearch.length) {
        //[key:value]
        //第一次
        if (this.pushStrategyAlertSelertFrom.domains.length) {
          //判断重复line
          if (this.pushSelectNameSearch[0] != this.pushBizLineCodeSearch) {
            this.$message({
              message: "告警选择器业务线不一致",
              type: "error"
            });
            return;
          }
          //判断不能是重复的选择器
          this.pushSelectFlagSearch = true;
          this.pushStrategyAlertSelertFrom.domains.forEach(val => {
            if (this.pushSelectNameSearch[1] == val.key) {
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.pushSelectFlagSearch = false;
            }
          });

          if (this.pushSelectFlagSearch) {
            let backName = "";
            let backNameKey = "";
            this.selectorData.forEach(val => {
              this.pushBizLineCodeSearch = val.key;
              if (val.key == this.pushBizLineCodeSearch) {
                if (val.tags) {
                  val.tags.forEach(value => {
                    if (value.key == this.pushSelectNameSearch[1]) {
                      backName = value.name;
                      backNameKey = value.key;
                    }
                  });
                }
              }
            });
            this.pushStrategyAlertSelertFrom.domains.push({
              key: backNameKey,
              value: "",
              name: backName
            });
          }
        } else {
          console.log("没有长度");
          this.pushBizLineCodeSearch = this.pushSelectNameSearch[0];

          let backName = "";
          let backNameKey = "";
          this.selectorData.forEach(val => {
            if (val.key == this.pushBizLineCodeSearch) {
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == this.pushSelectNameSearch[1]) {
                    backName = value.name;
                    backNameKey = value.key;
                  }
                });
              }
            }
          });
          this.pushStrategyAlertSelertFrom.domains.push({
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

    removePushStrategyEditAlertSelect(item) {
      var index = this.pushStrategyEditFrom.domains.indexOf(item);
      if (index !== -1) {
        this.pushStrategyEditFrom.domains.splice(index, 1);
      }
    },
    pushStrategyEditAlertSelect() {
      if (this.pushSelectNameEdit.length) {
        //[key:value]
        //第一次
        if (this.pushStrategyEditFrom.domains.length) {
          //判断重复line
          if (this.pushSelectNameEdit[0] != this.pushBizLineCodeEdit) {
            this.$message({
              message: "告警选择器业务线不一致",
              type: "error"
            });
            return;
          }
          //判断不能是重复的选择器
          this.pushSelectFlagEdit = true;
          this.pushStrategyEditFrom.domains.forEach(val => {
            if (this.pushSelectNameEdit[1] == val.key) {
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.pushSelectFlagEdit = false;
            }
          });

          if (this.pushSelectFlagEdit) {
            let backName = "";
            let backNameKey = "";
            this.selectorData.forEach(val => {
              this.pushBizLineCodeEdit = val.key;
              if (val.key == this.pushBizLineCodeEdit) {
                if (val.tags) {
                  val.tags.forEach(value => {
                    if (value.key == this.pushSelectNameEdit[1]) {
                      backName = val.name + "/" + value.name;
                      backNameKey = value.key;
                    }
                  });
                }
              }
            });
            this.pushStrategyEditFrom.domains.push({
              key: backNameKey,
              value: "",
              name: backName
            });
          }
        } else {
          console.log("没有长度");
          this.pushBizLineCodeEdit = this.pushSelectNameEdit[0];

          let backName = "";
          let backNameKey = "";
          this.selectorData.forEach(val => {
            if (val.key == this.pushBizLineCodeEdit) {
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == this.pushSelectNameEdit[1]) {
                    backName = val.name + "/" + value.name;
                    backNameKey = value.key;
                  }
                });
              }
            }
          });
          this.pushStrategyEditFrom.domains.push({
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
      /*  if (this.pushSelectNameEdit) {
        //[key:value]
        if (this.pushStrategyEditFrom.domains.length) {
          this.pushSelectFlagEdit = true;
          this.pushStrategyEditFrom.domains.forEach(val => {
            if (this.pushSelectNameEdit == val.key) {
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              });
              this.pushSelectFlagEdit = false;
            } else {
              console.log("true");
            }
          });
          if (this.pushSelectFlagEdit) {
            let backName = "";
            this.selectorData.forEach(val => {
              if (val.key == this.pushSelectNameEdit) {
                backName = val.name;
              }
            });
            this.pushStrategyEditFrom.domains.push({
              key: this.pushSelectNameEdit,
              value: "",
              name: backName
            });
          }
        } else {
          console.log("没有长度");
          let backName = "";
          this.selectorData.forEach(val => {
            if (val.key == this.pushSelectNameEdit) {
              backName = val.name;
            }
          });
          this.pushStrategyEditFrom.domains.push({
            key: this.pushSelectNameEdit,
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
    strategyAnalysisSelectionChange(val) {
      this.strategyAnalysisSelection = val;
    },
    pushStrategySelectionChange(val) {
      this.pushStrategySelection = val;
    },

    strategyAnalysisRowChange(row) {
      console.log(row.id);
      this.querystrategyAnalysisFormSingleData(row.id);
      this.strategyAnalysisDialog = true;
    },
    // 分析策略类型选择
    strategyAnalysisTypeChange(val) {
      console.log(val);
      if (val == "") {
        // this.strategySearchRuleDataReset();
        this.selectRuleDataSearch = [];
        this.alertDurationCondShow = true;
        this.alertDurationLevelNumShow = true;
        this.alertCountCondShow = true;
        this.alertCountLevelNumShow = true;

        this.ruleShowSearch = true;
        this.searchShowOne = true;
        this.searchShowTwo = true;
        this.searchShowThree = true;
        this.searchShowFour = true;
      } else if (val == "4" || val == "2") {
        // this.strategySearchRuleDataReset();
        this.selectRuleDataSearch = [];
        this.ruleShowSearch = true;
        this.searchShowOne = true;
        this.searchShowTwo = false;
        this.searchShowThree = false;
        this.searchShowFour = true;
      } else if (val == "1") {
        // this.strategySearchRuleDataReset();
        this.selectRuleDataSearch = [];
        this.ruleShowSearch = true;
        this.searchShowOne = true;
        this.searchShowTwo = true;
        this.searchShowThree = false;
        this.searchShowFour = true;
      } else if (val == "3") {
        this.selectRuleDataSearch = [];
        // this.strategySearchRuleDataReset();
        this.alertDurationCondShow = true; //qwer
        this.alertDurationLevelNumShow = true;
        this.alertCountCondShow = true;
        this.alertCountLevelNumShow = true;

        this.ruleShowSearch = true;
        this.searchShowOne = true;
        this.searchShowTwo = false;
        this.searchShowThree = true;
        this.searchShowFour = false;
      }
      if (val == "0") {
        this.selectRuleDataSearch = [];
        this.aSearchData = {};
        this.ruleShowSearch = false;
      }
    },
    alertDurationSelect(val) {
      if (this.rule.alertDuration.length == 1) {
        this.rule.alertDuration.forEach(val => {
          console.log(val);
          if (val == "时间") {
            this.alertDurationCondShow = true;
            this.alertDurationLevelNumShow = false;
          } else {
            this.alertDurationCondShow = false;
            this.alertDurationLevelNumShow = true;
          }
        });
      }
      if (this.rule.alertDuration.length == 2) {
        this.alertDurationCondShow = true;
        this.alertDurationLevelNumShow = true;
      }
      if (this.rule.alertDuration.length == 0) {
        this.alertDurationCondShow = false;
        this.alertDurationLevelNumShow = false;
      }
    },
    alertCountSelect(val) {
      if (this.rule.alertCount.length == 1) {
        this.rule.alertCount.forEach(val => {
          console.log(val);
          if (val == "次数") {
            this.alertCountCondShow = true;
            this.alertCountLevelNumShow = false;
          } else {
            this.alertCountCondShow = false;
            this.alertCountLevelNumShow = true;
          }
        });
      }
      if (this.rule.alertCount.length == 2) {
        this.alertCountCondShow = true;
        this.alertCountLevelNumShow = true;
      }
      if (this.rule.alertCount.length == 0) {
        this.alertCountCondShow = false;
        this.alertCountLevelNumShow = false;
      }
    },
    alertDurationSelectAdd(val) {
      console.log(val);
      if (this.ruleAdd.alertDuration.length == 1) {
        this.ruleAdd.alertDuration.forEach(val => {
          if (val == "时间") {
            this.alertDurationCondShowAdd = true;
            this.alertDurationLevelNumShowAdd = false;
          } else if (val == "数值") {
            this.alertDurationCondShowAdd = false;
            this.alertDurationLevelNumShowAdd = true;
          }
        });
      }
      if (this.ruleAdd.alertDuration.length == 2) {
        this.alertDurationCondShowAdd = true;
        this.alertDurationLevelNumShowAdd = true;
      }
      if (this.ruleAdd.alertDuration.length == 0) {
        this.alertDurationCondShowAdd = false;
        this.alertDurationLevelNumShowAdd = false;
      }
    },
    alertCountSelectAdd(val) {
      if (this.ruleAdd.alertCount.length == 1) {
        this.ruleAdd.alertCount.forEach(val => {
          console.log(val);
          if (val == "次数") {
            this.alertCountCondShowAdd = true;
            this.alertCountLevelNumShowAdd = false;
          } else {
            this.alertCountCondShowAdd = false;
            this.alertCountLevelNumShowAdd = true;
          }
        });
      }
      if (this.ruleAdd.alertCount.length == 2) {
        this.alertCountCondShowAdd = true;
        this.alertCountLevelNumShowAdd = true;
      }
      if (this.ruleAdd.alertCount.length == 0) {
        this.alertCountCondShowAdd = false;
        this.alertCountLevelNumShowAdd = false;
      }
    },
    alertDurationSelectEdit(val) {
      if (this.ruleEdit.alertDuration.length == 1) {
        this.ruleEdit.alertDuration.forEach(val => {
          console.log(val);
          if (val == "时间") {
            this.alertDurationCondShowEdit = true;
            this.alertDurationLevelNumShowEdit = false;
          } else {
            this.alertDurationCondShowEdit = false;
            this.alertDurationLevelNumShowEdit = true;
          }
        });
      }
      if (this.ruleEdit.alertDuration.length == 2) {
        this.alertDurationCondShowEdit = true;
        this.alertDurationLevelNumShowEdit = true;
      }
      if (this.ruleEdit.alertDuration.length == 0) {
        this.alertDurationCondShowEdit = false;
        this.alertDurationLevelNumShowEdit = false;
      }
    },
    alertCountSelectEdit(val) {
      if (this.ruleEdit.alertCount.length == 1) {
        this.ruleEdit.alertCount.forEach(val => {
          console.log(val);
          if (val == "次数") {
            this.alertCountCondShowEdit = true;
            this.alertCountLevelNumShowEdit = false;
          } else {
            this.alertCountCondShowEdit = false;
            this.alertCountLevelNumShowEdit = true;
          }
        });
      }
      if (this.ruleEdit.alertCount.length == 2) {
        this.alertCountCondShowEdit = true;
        this.alertCountLevelNumShowEdit = true;
      }
      if (this.ruleEdit.alertCount.length == 0) {
        this.alertCountCondShowEdit = false;
        this.alertCountLevelNumShowEdit = false;
      }
    },
    //分析策略新增 策略类型选择
    strategyAnalysisTypeChangeAdd(val) {
      console.log(val);
      this.strategyRuleDataReset();
      if (val == "0") {
        this.strategyAddSave = {
          groupId: "111",
          founder: "张三"
        };
        // this.selectRuleDataAdd=[];
        // this.strategyAnalysisAddData.rule.selectionRange = "";
        this.ruleShowAdd = false;
      } else if (val == "4" || val == "2") {
        // this.selectRuleDataAdd=[];
        // this.strategyAnalysisAddData.rule.selectionRange = "";
        this.ruleShowAdd = true;
        this.addShowOne = true;
        this.addShowTwo = false;
        this.addShowThree = false;
        this.addShowFour = true;
      } else if (val == "1") {
        // this.selectRuleDataAdd=[];
        // this.strategyAnalysisAddData.rule.selectionRange = "";

        this.ruleShowAdd = true;
        this.addShowOne = true;
        this.addShowTwo = true;
        this.addShowThree = false;
        this.addShowFour = true;
      } else if (val == "3") {
        // this.selectRuleDataAdd=[];
        // this.strategyAnalysisAddData.rule.selectionRange = "";

        this.alertDurationCondShowAdd = true;
        this.alertDurationLevelNumShowAdd = true;
        this.alertCountCondShowAdd = true;
        this.alertCountLevelNumShowAdd = true;

        this.ruleShowAdd = true;
        this.addShowOne = true;
        this.addShowTwo = false;
        this.addShowThree = true;
        this.addShowFour = false;
      }
    },
    //分析策略编辑 策略类型选择
    strategyAnalysisTypeChangeEdit(val) {
      console.log(val);
      if (val == "0") {
        this.analysisEditSaveData = {
          founder: "张三",
          groupId: "111"
        };
        this.ruleShowEdit = false;
      } else if (val == "4" || val == "2") {
        this.strategyEditRuleDataReset();
        this.ruleShowEdit = true;
        this.editShowOne = true;
        this.editShowTwo = false;
        this.editShowThree = false;
        this.editShowFour = true;
      } else if (val == "1") {
        this.strategyEditRuleDataReset();
        this.ruleShowEdit = true;
        this.editShowOne = true;
        this.editShowTwo = true;
        this.editShowThree = false;
        this.editShowFour = true;
      } else if (val == "3") {
        this.strategyEditRuleDataReset();
        this.alertDurationCondShowEdit = true;
        this.alertDurationLevelNumShowEdit = true;
        this.alertCountCondShowEdit = true;
        this.alertCountLevelNumShowEdit = true;
        this.ruleShowEdit = true;

        this.editShowOne = true;
        this.editShowTwo = false;
        this.editShowThree = true;
        this.editShowFour = false;
      }
    },
    // 监听穿梭框组件添加
    add(fromData, toData, obj) {
      this.toData = toData;
    },
    // 监听穿梭框组件移除
    remove(fromData, toData, obj) {
      this.toData = toData;
    },
    addGroupMethod() {
      this.addUserGroupName = "";
      this.addGroupData = [];
      this.groupAllData = this.savePerson;
      this.addGroupShow = true;
      this.addGroupBtnStyle = true;
    },
    // 自定义节点 仅树形结构支持
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.del(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },
    // kobe1(){
    //   console.log(this.fromData);
    //   console.log(this.toData);
    // },
    //删除节点
    del(node, data) {
      if (data.pid == 0) {
        //如果是父节点
        let params = {
          group_id: data.id
        };
        service.pushDelGroupService(params).then(res => {
          this.fromData.forEach((val, index) => {
            if (val == data) {
              this.fromData.splice(index, 1);
            }
          });
          this.toData.forEach((val, index) => {
            if (val == data) {
              this.toData.splice(index, 1);
            }
          });
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getAllGroupPerson();
        });
      } else {
        let params = {
          group_id: data.pid,
          user_id: data.userId
        };
        service.pushDelGroupPersonService(params).then(res => {
          let flag;
          this.fromData.forEach((val, idx) => {
            if (val.member.length) {
              val.member.forEach((value, index) => {
                if (value == data) {
                  val.member.splice(index, 1);
                  flag = 1;
                }
              });
            }
          });
          this.toData.forEach((val, idx) => {
            if (val.member.length) {
              val.member.forEach((value, index) => {
                if (value == data) {
                  val.member.splice(index, 1);
                  flag = 0;
                }
              });
            }
          });

          if (flag == 1) {
            this.fromData = JSON.parse(JSON.stringify(this.fromData));
          } else if (flag == 0) {
            this.toData = JSON.parse(JSON.stringify(this.toData));
          }
          this.$message({
            message: "删除成功",
            type: "success"
          });
        });
      }
    },
    addGroupConfirm() {
      //根据选择的id 构建数据
      //ids addGroupData [1,2]
      if (!this.addUserGroupName || this.addGroupData.length == 0) {
        this.$message({
          message: "请把信息填写完整",
          type: "error"
        });
        return;
      }
      let arr = [];
      if (this.addGroupData.length) {
        this.addGroupData.forEach(val => {
          //拿到每一个id,去遍历用户所有信息,拿到id对应的item
          this.allGroupPersonData.forEach(value => {
            if (val == value.userId) {
              arr.push(value);
            }
          });
        });
      }
      console.log(arr);
      let params = {
        groupName: this.addUserGroupName,
        member: arr
      };

      service.pushAddGroup(params).then(res => {
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.getAllGroupPerson();
        this.addGroupBtnStyle = false;
        this.addGroupShow = false;
      });
    },
    //推送新增--推送角色展开
    sendPersonInfo() {
      console.log(this.pushBizLineCodeAdd);
      const inputDataAdd = this.pushStrategyAlertSelertAddFrom.domains;
      const obj = {};
      if (inputDataAdd.length) {
        inputDataAdd.forEach(res => {
          var kk = res.key;
          obj[kk] = res.value;
        });
      }
      let arr = [];
      for (const key in obj) {
        arr.push(key + "=" + obj[key]);
      }
      this.pushAddData.selector = encodeURIComponent(
        encodeMethods.encode(obj).join(",")
      );

      // console.log(this.pushAddData.selector);
      //先判断用户是否填写了选择器,如果没有提示用户
      if (!this.pushAddData.selector || this.pushAddData.selector == "=") {
        this.$message({
          message: "请填写选择器",
          type: "error"
        });
      } else {
        let params = {
          selector: this.pushAddData.selector,
          bizLineCode: this.pushBizLineCodeAdd
        };
        params = encodeMethods.objToStr(params);
        //根据选择器请求责任人数据
        service.qualityAllDataServiceSingle(params).then(res => {
          console.log(res.data);
          //目前只能选择一个责任人
          if (res.data.length) {
            console.log(111);
            this.personAddId = res.data[0].handlerId;
            this.pushHandlerAddData = res.data[0].handlerName;
          }
          //------------下面是针对后期责任人选择多个的情况,目前只能选择一个责任人----------------
          //当前选择器对应责任人id
          /* if(res.data.length){
            this.personAddId = res.data[0].handlerId;
            let handlerArr = res.data;
            let arr = [];
            if (handlerArr) {
              handlerArr.forEach(val => {
                arr.push(val.handlerName);
              });
              this.pushHandlerAddData = arr.join(",");
            }
          } */
          //----------------------------
        });
        this.innerVisible = true;
      }
    },
    // 分析策略请求 akobe------------------------------------
    //规则新增 业务线选择
    rulechangeAdd(bizline) {
      this.bizLineCodeAddS = bizline;
      this.selectRuleDataAdd = [];
      this.alertJuHeShow = true;
      this.ruleData.forEach(val => {
        if (val.key == bizline) {
          this.ruleItemAdd = val.tags;
        }
      });
      /* if(!this.alertSelectAddFrom.domains.length){
        //第一次
        console.log(1);
        this.alertJuHeShow=true;
        this.selectRuleDataAdd=[];
        //拿到业务线再去构造业务线下面的参数
        this.ruleData.forEach(val=>{
          if(val.key ==bizline){
            this.selectRuleDataAdd=val.tags
          }
        })
      }else{
        if(this.bizLineCodeAddS != this.bizLineCodeAdd){
          console.log(2);
          this.$message({
            message: "告警选择器业务线和规则业务线不一致",
            type: "error"
          });
          this.alertJuHeShow=false;
          this.ruleDataForOneChoseAdd='';
          this.bizLineCodeAddS='';
        }else{
          console.log(3);
          this.alertJuHeShow=true;
          this.selectRuleDataAdd=[];
          //拿到业务线再去构造业务线下面的参数

          this.ruleData.forEach(val=>{
            if(val.key ==bizline){
              this.selectRuleDataAdd=val.tags
            }
          })
        }
      } */
    },
    rulechangeEdit(bizline) {
      this.bizLineCodeEditS = bizline;
      this.alertJuHeShowEdit = true;
      this.selectRuleDataEdit = [];
      this.ruleData.forEach(val => {
        if (val.key == bizline) {
          this.ruleItemEdit = val.tags;
        }
      });
      /* if(!this.alertSelectEditFrom.domains.length){
        //第一次
        console.log(1);
        this.alertJuHeShowEdit=true;
        this.selectRuleDataEdit=[];
        //拿到业务线再去构造业务线下面的参数
        this.ruleData.forEach(val=>{
          if(val.key ==bizline){
            this.selectRuleDataEdit=val.tags
          }
        })
      }else{
        if(this.bizLineCodeEditS != this.bizLineCodeEdit){
            console.log(2);
            this.$message({
              message: "告警选择器业务线和规则业务线不一致",
              type: "error"
            });
            this.alertJuHeShowEdit=false;
            this.ruleDataForOneChoseEdit='';
            this.bizLineCodeEditS='';
        }else{
          console.log(3);
          this.alertJuHeShowEdit=true;
          this.selectRuleDataEdit=[];
          //拿到业务线再去构造业务线下面的参数

          this.ruleData.forEach(val=>{
            if(val.key ==bizline){
              this.selectRuleDataEdit=val.tags
            }
          })
        }
      } */
    },
    rulechangeSearch(bizline) {
      this.bizLineCodeSearchS = bizline;
      this.selectRuleDataSearch = [];
      this.alertJuHeShowSearch = true;
      this.ruleData.forEach(val => {
        if (val.key == bizline) {
          this.ruleItemSearch = val.tags;
        }
      });
      /* if(!this.alertSelertFrom.domains.length){
        //第一次
        console.log(1);
        this.alertJuHeShowSearch=true;
        this.selectRuleDataSearch=[];
        //拿到业务线再去构造业务线下面的参数
        this.ruleData.forEach(val=>{
          if(val.key ==bizline){
            this.selectRuleDataSearch=val.tags
          }
        })
      }else{
        if(this.bizLineCodeSearchS != this.bizLineCodeSearch){
          console.log(2);
          this.$message({
            message: "告警选择器业务线和规则业务线不一致",
            type: "error"
          });
          this.alertJuHeShowSearch=false;
          this.ruleDataForOneChoseSearch='';
          this.bizLineCodeSearchS='';
        }else{
          console.log(3);
          this.alertJuHeShowSearch=true;
          this.selectRuleDataSearch=[];
          //拿到业务线再去构造业务线下面的参数

          this.ruleData.forEach(val=>{
            if(val.key ==bizline){
              this.selectRuleDataSearch=val.tags
            }
          })
        }
      } */
    },
    //分析规则查询
    ruleSearch(params) {
      service.ruleSearchService(params).then(res => {
        this.ruleData = res.data;
        this.selectorData = res.data;
        //构造数据
        //分析规则业务线
        if (res.data.length) {
          res.data.forEach(val => {
            this.ruleDataForOneAdd.push({
              value: val.key,
              label: val.name
            });
          });
        }
      });
    },
    // //选择器的请求
    // selectSearch(params) {
    //   service.ruleSearchService(params).then(res => {
    //     this.selectorData = res.data;
    //   });
    // },
    //设置显示隐藏
    setAnalysisShowDialog() {
      this.analysisShowDialog = true;
      this.analysisDialogData.forEach(val => {
        if (this[val.flag]) {
          val.select = true;
        } else {
          val.select = false;
        }
      });
    },
    //推送设置列显示隐藏
    setPushShowDialog() {
      this.pushShowDialog = true;
      this.pushDialogData.forEach(val => {
        if (this[val.flag]) {
          val.select = true;
        } else {
          val.select = false;
        }
      });
    },
    confirmAnalysisItemShow() {
      this.analysisDialogData.forEach(val => {
        this[val.flag] = val.select;
      });
      this.analysisShowDialog = false;
    },
    //分析策略 条件查询
    strategyAnalysisSearchService(startPage, flag) {
      this.pageAllFlag = false;
      if (flag) {
        this.currentPage = 1;
        let type1 = this.strategyAnalysisSearchData.type;
        if (type1 != "0") {
          if (!Number(type1)) {
            this.aSearchData.rule = {};
            if (this.selectRuleDataSearch.length) {
              this.aSearchData.rule = {
                aggregation: this.selectRuleDataSearch
              };
            }
            //周期 次数
            if (this.alertCountLevelValCount) {
              this.aSearchData.rule.levelNum = this.alertCountLevelValCount;
            }

            if (this.selectRuleDataSearch.length) {
              this.aSearchData.rule.durationWithCountRelationship = this.yuHuoSearch;
            }
            //rule alertDuration 处理----------start
            let durObjAdd = {};
            if (
              !this.alertDurationCondVal &&
              !this.alertDurationInput &&
              !this.alertDurationUnitVal
            ) {
            } else {
              durObjAdd = {
                cond: this.alertDurationCondVal,
                num: Number(this.alertDurationInput),
                unit: this.alertDurationUnitVal
              };
              this.aSearchData.rule.alertDuration = durObjAdd;
            }

            //rule alertDuration 处理----------end

            //rule alertCount 处理----------start
            let countObjAdd = {};
            if (!this.alertCountCondVal && !this.alertCountCondValInput) {
            } else {
              countObjAdd = {
                cond: this.alertCountCondVal,
                num: Number(this.alertCountCondValInput)
              };
              this.aSearchData.rule.alertCount = countObjAdd;
            }

            //rule alertCount 处理----------end

            if (this.dayInterSearch && this.dayBeforeSearch) {
              this.aSearchData.rule.selectionRange =
                this.dayInterSearch + "," + this.dayBeforeSearch;
            }

            if (JSON.stringify(this.aSearchData.rule) == "{}") {
              delete this.aSearchData.rule;
            }
          } else if (type1 == "2" || type1 == "4") {
            if (this.selectRuleDataSearch.length) {
              this.aSearchData.rule = {
                aggregation: this.selectRuleDataSearch
              };
            } else {
              delete this.aSearchData.rule;
            }
            console.log(this.selectRuleDataSearch);
          } else if (type1 == "3") {
            this.aSearchData.rule = {};
            if (this.selectRuleDataSearch.length) {
              this.aSearchData.rule = {
                aggregation: this.selectRuleDataSearch
              };
            } else {
              // this.aSearchData.rule = {
              //   aggregation:''
              // };
            }
            //周期 次数
            if (this.alertCountLevelValCount) {
              this.aSearchData.rule.levelNum = this.alertCountLevelValCount;
              this.aSearchData.rule.durationWithCountRelationship = this.yuHuoSearch;
            }
            //rule alertDuration 处理----------start
            let durObjAdd = {};
            if (
              !this.alertDurationCondVal &&
              !this.alertDurationInput &&
              !this.alertDurationUnitVal
            ) {
            } else {
              durObjAdd = {
                cond: this.alertDurationCondVal,
                num: Number(this.alertDurationInput),
                unit: this.alertDurationUnitVal
              };
              this.aSearchData.rule.alertDuration = durObjAdd;
            }

            //rule alertDuration 处理----------end

            //rule alertCount 处理----------start
            let countObjAdd = {};
            if (!this.alertCountCondVal && !this.alertCountCondValInput) {
            } else {
              countObjAdd = {
                cond: this.alertCountCondVal,
                num: Number(this.alertCountCondValInput)
              };
              this.aSearchData.rule.alertCount = countObjAdd;
            }

            //rule alertCount 处理----------end
          } else if (type1 == "1") {
            //合并
            if (this.selectRuleDataSearch.length) {
              this.aSearchData.rule = {
                aggregation: this.selectRuleDataSearch
              };
            }
            //range
            if (this.dayInterSearch && this.dayBeforeSearch) {
              this.aSearchData.rule.selectionRange =
                this.dayInterSearch + "," + this.dayBeforeSearch;
            }
            if (
              !this.dayInterSearch &&
              !this.dayBeforeSearch &&
              !this.selectRuleDataSearch.length
            ) {
              delete this.aSearchData.rule;
            } else {
              // this.aSearchData.rule = encodeURIComponent(
              //   JSON.stringify(this.aSearchData.rule)
              // );
            }
          }
        }

        //时间处理 校验开始-结束时间   创建时间
        if (this.aTimeStartSearch.length) {
          this.aSearchData.startTimeStart = this.aTimeStartSearch[0];
          this.aSearchData.startTimeEnd = this.aTimeStartSearch[1];
        } else {
          this.aSearchData.startTimeStart = "";
          this.aSearchData.startTimeEnd = "";
        }
        if (this.aTimeEndSearch.length) {
          this.aSearchData.endTimeStart = this.aTimeEndSearch[0];
          this.aSearchData.endTimeEnd = this.aTimeEndSearch[1];
        } else {
          this.aSearchData.startTimeStart = "";
          this.aSearchData.startTimeEnd = "";
        }
        if (this.createTimeSearch) {
          this.aSearchData.createTimeStart = this.createTimeSearch[0];
          this.aSearchData.createTimeEnd = this.createTimeSearch[1];
        } else {
          this.aSearchData.createTimeStart = "";
          this.aSearchData.createTimeEnd = "";
        }
        //选择器

        const inputData = this.alertSelertFrom.domains;
        if (inputData.length) {
          inputData.forEach(res => {
            var kk = res.key;
            this.alertSelertFromObj[kk] = res.value;
          });
          this.aSearchData.selector = encodeURIComponent(
            encodeMethods.encode(this.alertSelertFromObj).join(",")
          );
        } else {
          this.aSearchData.selector = "";
        }
        //业务线
        // if(this.bizLineCodeSearch){
        //    this.aSearchData.bizLineCode=this.bizLineCodeSearch
        // }
        // if(this.bizLineCodeSearchS){
        //    this.aSearchData.bizLineCode=this.bizLineCodeSearchS
        // }
        // if(!this.bizLineCodeSearch&&!this.bizLineCodeSearchS){
        //   delete  this.aSearchData.bizLineCode
        // }

        this.aSearchData.name = this.strategyAnalysisSearchData.strategy_name;
        this.aSearchData.priority = this.strategyAnalysisSearchData.priority;
        this.aSearchData.type = this.strategyAnalysisSearchData.type;

        console.log(this.aSearchData.selector);

        // if (type1 != 0) {
        //   this.aSearchData.rule = encodeURIComponent(
        //     JSON.stringify(this.aSearchData.rule)
        //   );
        // }else {
        //   console.log('过滤');
        //   this.aSearchData.rule =''
        // }

        // console.log(this.aSearchData.rule);

        //深拷贝
        this.analysisParams = JSON.parse(JSON.stringify(this.aSearchData));
      }
      this.analysisParams.start = (startPage - 1) * this.allLimitNumber;
      this.analysisParams.limit = this.allLimitNumber;

      //  let params = encodeMethods.objToStr(this.analysisParams)
      //----------方法2--------------------------------------
      let paramsObj = this.analysisParams;
      let a = "";
      let params = ""; //传给后台的参数
      for (const key in paramsObj) {
        if (key != "rule") {
          a += key + "=" + paramsObj[key] + "&";
        }
      }
      console.log(params);
      //存在rule
      if (
        this.strategyAnalysisSearchData.type != 0 ||
        typeof this.strategyAnalysisSearchData.type == "string"
      ) {
        console.log("不是过滤");
        console.log(this.aSearchData.rule);
        //规则不填
        if (this.aSearchData.rule) {
          params =
            a +
            "rule" +
            "=" +
            encodeURIComponent(JSON.stringify(this.aSearchData.rule));
        } else {
          params = a.substring(0, a.length - 1);
        }
      } else {
        console.log("过滤");
        console.log(a);
        params = a.substring(0, a.length - 1);
      }
      console.log("后台参数params:" + params);
      // console.log(a+'rule'+'='+encodeURIComponent(JSON.stringify(this.aSearchData.rule)));
      //----------方法2--------------------------------------

      //-------------方法一 start-----------------------------
      //  let paramsArr=[];
      //  for (const key in paramsObj) {
      //    if(key != 'rule'){
      //      paramsArr.push(key+'='+paramsObj[key])
      //    }
      //  }
      //  paramsArr.push('rule'+'='+ encodeURIComponent(JSON.stringify(this.aSearchData.rule)))
      //   console.log(paramsArr);
      //   let params='';
      //   paramsArr.forEach(val=>{
      //     params += val +'&'
      //   })
      //   console.log(params);
      //   console.log(params.substring(0,params.length-1));
      //-------------方法一 end-----------------------------

      service.strategyAnalysisSearchSingle(params).then(res => {
        this.strategyAnalysisData = res.data;
        this.totalPage = res.count;
      });
    },
    //重置
    aresetData() {
      this.ruleDataForOneChoseSearch = "";
      this.selectRuleDataSearch = [];
      this.ruleDown = false;
      this.alertDown = false;
      this.alertJuHeShowSearch = false;
      this.bizLineCodeSearch = "";
      this.bizLineCodeSearchS = "";

      this.selectNameSearch = [];
      this.ruleShowSearch = true;
      this.strategyAnalysisSearchData = {
        strategy_name: "",
        priority: "",
        type: "",
        rule: {}
      };
      this.aTimeStartSearch = [];
      this.aTimeEndSearch = [];
      this.createTimeSearch = [];
      this.dayInterSearch = "";
      this.dayBeforeSearch = "";

      this.alertDurationCondVal = "";
      this.alertDurationInput = "";
      this.alertDurationUnitVal = "";
      this.alertDurationLevelValCount = "";
      this.alertCountCondVal = "";
      this.alertCountCondValInput = "";
      this.alertCountLevelValCount = "";

      this.alertSelertFrom.domains = [];
      this.alertSelertFromObj = {};
      this.alertDurationCondShow = true;
      this.alertDurationLevelNumShow = true;
      this.alertCountCondShow = true;
      this.alertCountLevelNumShow = true;

      this.pageAllFlag = true;
      this.currentPage = 1;
      // this.strategySearchRuleDataReset();
      this.querystrategyAnalysisData(1);
    },
    //分析策略查询所有
    querystrategyAnalysisData(pageNumber) {
      let params = {
        start: (pageNumber - 1) * this.allLimitNumber,
        limit: this.allLimitNumber
      };
      service.strategyAnalysisSearch(params).then(res => {
        this.strategyAnalysisData = res.data;
        this.totalPage = res.count;
        this.serviceTime = res.timestamp;
      });
    },
    //分析 分页
    analysisPage(val) {
      this.currentPage = val;
      if (this.pageAllFlag) {
        //如果查询所有的数据
        this.querystrategyAnalysisData(val);
      } else {
        //如果是查询参数的数据
        this.strategyAnalysisSearchService(val, false);
      }
    },
    //分析分页页容量
    analysisPageSizeChange(val) {
      this.allLimitNumber = val;
      this.currentPage = 1;
      if (this.pageAllFlag) {
        //如果查询所有的数据
        this.querystrategyAnalysisData(1);
      } else {
        //如果是查询参数的数据
        this.strategyAnalysisSearchService(1, false);
      }
    },
    //分析策略表格单个数据查询
    querystrategyAnalysisFormSingleData(id) {
      service.strategyAnalysisFormSingleSearch(id).then(res => {
        this.strategyAnalysisFormSingleData = res.data;
        if (res.data.rule) {
          for (const key in res.data.rule) {
            this.strategyAnalysisFormSingleData[key] = res.data.rule[key];
          }
          if (this.strategyAnalysisFormSingleData.selectionRange) {
            let arr = this.strategyAnalysisFormSingleData.selectionRange.split(
              ","
            );
            this.strategyAnalysisFormSingleData.beforeDay = arr[0];
            this.strategyAnalysisFormSingleData.afterDay = arr[1];
          }
        }
      });
    },
    //分析策略 单个删除请求
    querystrategyAnalysisFormDelData(id) {
      service.strategyAnalysisFormDelSearch(id).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.querystrategyAnalysisData(1);
      });
    },
    // 分析策略批量删除请求
    queryStrategDelSome(ids) {
      let params = {
        id: ids
      };
      service.strategyAnalysisFormSomeDelSearch(params).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.querystrategyAnalysisData(1);
      });
    },
    //分析策略批量删除
    batchDel() {
      if (this.strategyAnalysisSelection.length) {
        this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let ids = [];
            this.strategyAnalysisSelection.forEach(val => {
              ids.push(val.id);
            });
            ids = ids.join(",");
            this.queryStrategDelSome(ids);
          })
          .catch(() => {});
      } else {
        this.$message({
          message: "请选择数据",
          type: "error"
        });
      }
    },
    //分析新增dialog
    aOpenAddDialog() {
      //重置数据
      this.bizLineCodeAdd = "";
      this.bizLineCodeAddS = "";
      this.ruleDataForOneChoseAdd = "";
      this.selectRuleDataAdd = [];
      this.selectNameAdd = [];
      this.alertJuHeShow = false;
      this.ruleShowAdd = false;

      this.strategyAnalysisAddData = {
        aTimeAdd: "",
        name: "",
        alias: "",
        priority: "",
        type: "",
        enable: "",
        startTime: "",
        endTime: "",
        description: "",
        rule: {}
      };
      this.alertSelectAddFrom.domains = [];
      this.alertSelertFromObjAdd = {};
      this.ruleAdd = {
        alertDuration: [],
        alertCount: []
      };
      this.dayInterSearchAdd = "";
      this.dayBeforeSearchAdd = "";

      this.strategyAnalysisAddDialog = true;
    },
    //分析策略新增
    strategyAnalysisAddSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //判断告警选择器和rule
          if (!this.selectNameAdd.length) {
            this.$message.error("请填写选择器");
            return;
          }
          if (this.strategyAnalysisAddData.type != 0) {
            console.log("不是过滤");
            if (this.strategyAnalysisAddData.type != 3) {
              console.log("不是升降机");
              if (!this.selectRuleDataAdd.length) {
                this.$message.error("请选择聚合参数");
                return;
              }
              //合并
              if (this.strategyAnalysisAddData.type == 1) {
                if (!this.dayInterSearchAdd || !this.dayBeforeSearchAdd) {
                  this.$message.error("规则参数填写完整");
                  return;
                }
              }
            } else {
              //升降级
              //周期 次数 2选一  升级数值必填
              if (
                (!this.alertDurationCondValAdd &&
                  !this.alertDurationCondValInputAdd &&
                  !this.alertDurationUnitValAdd &&
                  !this.alertCountCondValAdd &&
                  !this.alertCountCondValInputAdd) ||
                !this.alertCountLevelValCountAdd
              ) {
                this.$message.error("规则参数填写完整");
                return;
              }
            }
          }

          this.strategyAddSave.name = this.strategyAnalysisAddData.name;
          this.strategyAddSave.alias = this.strategyAnalysisAddData.alias;
          this.strategyAddSave.priority = this.strategyAnalysisAddData.priority;
          this.strategyAddSave.enable = this.strategyAnalysisAddData.enable;
          this.strategyAddSave.type = this.strategyAnalysisAddData.type;
          this.strategyAddSave.description = this.strategyAnalysisAddData.description;

          let aTime = this.strategyAnalysisAddData.aTimeAdd;
          //时间处理 校验开始-结束时间   创建时间
          if (aTime.length) {
            this.strategyAddSave.startTime = aTime[0];
            this.strategyAddSave.endTime = aTime[1];
          } else {
            this.strategyAddSave.startTime = "";
            this.strategyAddSave.endTime = "";
          }

          console.log(this.selectRuleDataAdd);
          let type1 = this.strategyAnalysisAddData.type;
          if (type1 != "0") {
            if (type1 == "2" || type1 == "4") {
              this.strategyAddSave.rule = {
                aggregation: this.selectRuleDataAdd
              };
            } else if (type1 == "3") {
              this.strategyAddSave.rule = {
                aggregation: this.selectRuleDataAdd
              };
              this.strategyAddSave.rule.levelNum = this.alertCountLevelValCountAdd;
              this.strategyAddSave.rule.durationWithCountRelationship = this.yuHuo;

              //周期 次数
              //rule alertDuration 处理----------start
              let durObjAdd = {};
              if (
                !this.alertDurationCondValAdd &&
                !this.alertDurationCondValInputAdd &&
                !this.alertDurationUnitValAdd
              ) {
              } else {
                durObjAdd = {
                  cond: this.alertDurationCondValAdd,
                  num: this.alertDurationCondValInputAdd,
                  unit: this.alertDurationUnitValAdd
                };
                this.strategyAddSave.rule.alertDuration = durObjAdd;
              }

              //rule alertDuration 处理----------end

              //rule alertCount 处理----------start
              let countObjAdd = {};
              if (
                !this.alertCountCondValAdd &&
                !this.alertCountCondValInputAdd
              ) {
              } else {
                countObjAdd = {
                  cond: this.alertCountCondValAdd,
                  num: this.alertCountCondValInputAdd
                };
                this.strategyAddSave.rule.alertCount = countObjAdd;
              }

              //rule alertCount 处理----------end
            } else if (type1 == "1") {
              //合并
              this.strategyAddSave.rule = {
                aggregation: this.selectRuleDataAdd,
                selectionRange:
                  this.dayInterSearchAdd + "," + this.dayInterSearchAdd
              };
            }
          }
          //业务线
          this.strategyAddSave.bizLineCode = this.bizLineCodeAdd;

          const inputDataAdd = this.alertSelectAddFrom.domains;
          if (inputDataAdd.length) {
            let obj = {};
            inputDataAdd.forEach(res => {
              var kk = res.key;
              // this.alertSelertFromObjAdd[kk] = encodeURIComponent(res.value);
              obj[kk] = res.value;
            });
            //对obj进行处理 {a:1,b:2} ==> [a=1,b=2]
            let arr = [];
            for (const key in obj) {
              arr.push(key + "=" + obj[key]);
            }
            this.strategyAddSave.selector = arr;
            console.log(obj);
          } else {
            this.strategyAddSave.selector = "";
          }
          //encodeMethods
          console.log(this.strategyAddSave);

          let params = this.strategyAddSave;
          if (params.rule) {
            ["alertCount", "alertDuration"].forEach(e => {
              const ruleInfo = params.rule[e];
              if (ruleInfo) {
                ruleInfo.num = Number(ruleInfo.num);
              }
            });
          }
          // console.log(this.strategyAnalysisAddData.rule);
          console.log(params);
          service.strategyAnalysisFormAdd(params).then(res => {
            this.$message({
              message: "新增成功",
              type: "success"
            });
            this.querystrategyAnalysisData(1);
            this.strategyAnalysisAddDialog = false;
          });
        } else {
          return false;
        }
      });
    },
    aDialogAdd(formName) {
      this.$refs["analysisRuleFrom"].resetFields();
    },
    //分析 编辑
    editStrategyAnalysisData(id, enable) {
      if (enable) {
        this.$message.error("启用状态不可编辑");
        return;
      }
      //重置
      this.selectRuleDataEdit = [];
      this.alertSelectEditFrom.domains = [];
      this.alertSelertFromObjEdit = {};
      this.strategyEditRuleDataReset();
      (this.analysisEditSaveData = {
        founder: "张三",
        groupId: "111"
      }),
        service.strategyAnalysisFormSingleSearch(id).then(res => {
          console.log(res);
          let result = res.data;
          // if(res.data.startTime && res.data.endTime){
          //   this.aTimeEdit.push(res.data.startTime);
          //   this.aTimeEdit.push(res.data.endTime);
          // }
          this.bizLineCodeEditS = res.data.bizLineCode;
          this.bizLineCodeEdit = res.data.bizLineCode;

          this.strategyAnalysisEdit.name = result.name;
          this.strategyAnalysisEdit.id = result.id;
          this.strategyAnalysisEdit.alias = result.alias;
          this.strategyAnalysisEdit.priority = result.priority;
          this.strategyAnalysisEdit.enable = result.enable;
          this.strategyAnalysisEdit.type = result.type;
          this.strategyAnalysisEdit.description = result.description;
          this.strategyAnalysisEdit.aTimeEdit = [];
          this.strategyAnalysisEdit.aTimeEdit.push(result.startTime);
          this.strategyAnalysisEdit.aTimeEdit.push(result.endTime);
          if (res.data.type == "0") {
            this.ruleShowEdit = false;
          } else if (res.data.type == "4" || res.data.type == "2") {
            this.ruleShowEdit = true;
            this.editShowOne = true;
            this.editShowTwo = false;
            this.editShowThree = false;
            this.editShowFour = true;
          } else if (res.data.type == "1") {
            this.ruleShowEdit = true;
            this.editShowOne = true;
            this.editShowTwo = true;
            this.editShowThree = false;
            this.editShowFour = true;
          } else if (res.data.type == "3") {
            this.ruleShowEdit = true;
            this.editShowOne = true;
            this.editShowTwo = false;
            this.editShowThree = true;
            this.editShowFour = false;
          }

          //下面逻辑主要是rule部分
          // 0-过滤  1-合并  2-关联  3-升降级  4-恢复
          if (res.data.type != 0) {
            this.ruleShowEdit = true;
            this.alertJuHeShowEdit = true;
            //公共部分回显 true/false
            // for (const key in res.data.rule) {
            //   this.ruleEdit1[key] = res.data.rule[key];
            // }

            //业务线
            this.ruleDataForOneChoseEdit = res.data.bizLineCode;
            //聚合参数
            //所有的值
            this.ruleData.forEach(val => {
              if (val.key == this.ruleDataForOneChoseEdit) {
                this.ruleItemEdit = val.tags;
              }
            });
            //选中的值
            if (res.data.rule.aggregation.length) {
              res.data.rule.aggregation.forEach(val => {
                this.selectRuleDataEdit.push(val.key);
              });
            }

            if (res.data.type == 3) {
              //针对升降级回显
              //告警周期
              /* if (res.data.rule.alertDuration) {
                if (
                  res.data.rule.alertDuration.levelNum &&
                  !res.data.rule.alertDuration.num
                ) {
                  this.ruleEdit.alertDuration = ["时间"];
                  this.alertDurationCondShowEdit = true;
                  this.alertDurationLevelNumShowEdit = false;
                  this.alertDurationCondValEdit =
                    res.data.rule.alertDuration.cond;
                  this.alertDurationCondValInputEdit =
                    res.data.rule.alertDuration.levelNum;
                  this.alertDurationUnitValEdit =
                    res.data.rule.alertDuration.unit;
                } else if (
                  !res.data.rule.alertDuration.levelNum &&
                  res.data.rule.alertDuration.num
                ) {
                  this.ruleEdit.alertDuration = ["数值"];
                  this.alertDurationCondShowEdit = false;
                  this.alertDurationLevelNumShowEdit = true;
                  this.alertDurationLevelValCountEdit =
                    res.data.rule.alertDuration.num;
                } else {
                  this.ruleEdit.alertDuration = ["时间", "数值"];
                  this.alertDurationCondShowEdit = true;
                  this.alertDurationLevelNumShowEdit = true;
                  this.alertDurationCondValEdit =
                    res.data.rule.alertDuration.cond;
                  this.alertDurationCondValInputEdit =
                    res.data.rule.alertDuration.num;
                  this.alertDurationUnitValEdit =
                    res.data.rule.alertDuration.unit;
                  this.alertDurationLevelValCountEdit =
                    res.data.rule.alertDuration.levelNum;
                }
              }
              //次数回显
              if (res.data.rule.alertCount) {
                if (
                  res.data.rule.alertCount.alertCountCondValInputEdit &&
                  !res.data.rule.alertCount.alertCountLevelValEdit
                ) {
                  this.ruleEdit.alertCount = ["次数"];
                  this.alertCountCondShowEdit = true;
                  this.alertCountLevelNumShowEdit = false;
                  this.alertCountCondValEdit = res.data.rule.alertCount.cond;
                  this.alertCountCondValInputEdit =
                    res.data.rule.alertCount.num;
                } else if (
                  !res.data.rule.alertCount.alertCountCondValInputEdit &&
                  res.data.rule.alertCount.alertCountLevelValEdit
                ) {
                  this.ruleEdit.alertDuration = ["升降级"];
                  this.alertCountCondShowEdit = false;
                  this.alertCountLevelNumShowEdit = true;
                  this.alertCountLevelValEdit =
                    res.data.rule.alertCount.levelNum;
                } else {
                  this.ruleEdit.alertCount = ["次数", "升降级"];
                  this.alertCountCondShowEdit = true;
                  this.alertCountLevelNumShowEdit = true;
                  this.alertCountCondValEdit = res.data.rule.alertCount.cond;
                  this.alertCountCondValInputEdit =
                    res.data.rule.alertCount.num;
                  this.alertCountLevelValEdit =
                    res.data.rule.alertCount.levelNum;
                }
              } */
              if (res.data.rule.alertDuration) {
                this.alertDurationCondValEdit =
                  res.data.rule.alertDuration.cond;
                this.alertDurationCondValInputEdit =
                  res.data.rule.alertDuration.num;
                this.alertDurationUnitValEdit =
                  res.data.rule.alertDuration.unit;
              }
              if (res.data.rule.alertCount) {
                this.alertCountCondValEdit = res.data.rule.alertCount.cond;
                this.alertCountCondValInputEdit = res.data.rule.alertCount.num;
              }
              this.alertCountLevelValEdit = res.data.rule.levelNum;
              this.yuHuoEdit = res.data.rule.durationWithCountRelationship;
            }
            if (res.data.type == 1) {
              //合并回显
              // ("2,3");
              if (res.data.rule.selectionRange) {
                let rangeArr = res.data.rule.selectionRange.split(",");
                this.dayInterEdit = rangeArr[0];
                this.dayBeforeEdit = rangeArr[1];
              }
            }
          } else {
            this.ruleShowEdit = false;
          }

          this.selectNameEdit = [];
          let xzq = res.data.selector;
          let lineCode = res.data.bizLineCode;
          xzq.forEach(res => {
            //等号分割
            let arr1 = res.split("=");
            //[ "bizSys,sys34"]
            //要通过第一个key id去查找名字
            let backName = "";
            let bizName = "";

            this.ruleData.forEach(val => {
              if (lineCode == val.key) {
                bizName = val.name;
                if (val.tags) {
                  val.tags.forEach(value => {
                    if (value.key == arr1[0]) {
                      backName = value.name;
                    }
                  });
                }
              }
            });
            this.alertSelectEditFrom.domains.push({
              key: arr1[0],
              value: arr1[1],
              name: bizName + "/" + backName
            });
          });

          this.strategyAnalysisEditDialog = true;
        });
    },
    //分析策略编辑保存
    strategyAnalysisEditSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //判断告警选择器和rule
          console.log(this.alertSelectEditFrom);
          this.analysisEditSaveData.bizLineCode = this.bizLineCodeEdit;
          if (!this.alertSelectEditFrom.domains.length) {
            if (!this.selectNameEdit.length) {
              this.$message.error("请填写选择器");
              return;
            }
          }

          if (this.strategyAnalysisEdit.type != 0) {
            console.log("不是过滤");
            if (this.strategyAnalysisEdit.type != 3) {
              console.log("不是升降机");
              if (!this.selectRuleDataEdit.length) {
                this.$message.error("请选择聚合参数");
                return;
              }
              //合并
              if (this.strategyAnalysisEdit.type == 1) {
                if (!this.dayInterEdit || !this.dayBeforeEdit) {
                  this.$message.error("规则参数填写完整");
                  return;
                }
              }
            } else {
              //升降级
              //周期 次数 2选一  升级数值必填
              if (
                (!this.alertDurationCondValEdit &&
                  !this.alertDurationCondValInputEdit &&
                  !this.alertDurationUnitValEdit &&
                  !this.alertCountCondValEdit &&
                  !this.alertCountCondValInputEdit) ||
                !this.alertCountLevelValEdit
              ) {
                this.$message.error("规则参数填写完整");
                return;
              }
            }
          }

          this.analysisEditSaveData.id = this.strategyAnalysisEdit.id;
          this.analysisEditSaveData.name = this.strategyAnalysisEdit.name;
          this.analysisEditSaveData.alias = this.strategyAnalysisEdit.alias;
          this.analysisEditSaveData.priority = this.strategyAnalysisEdit.priority;
          this.analysisEditSaveData.enable = this.strategyAnalysisEdit.enable;
          this.analysisEditSaveData.startTime = this.strategyAnalysisEdit.aTimeEdit[0];
          this.analysisEditSaveData.endTime = this.strategyAnalysisEdit.aTimeEdit[1];
          this.analysisEditSaveData.type = this.strategyAnalysisEdit.type;
          this.analysisEditSaveData.description = this.strategyAnalysisEdit.description;

          let type1 = this.strategyAnalysisEdit.type;
          if (type1 != "0") {
            if (type1 == "2" || type1 == "4") {
              this.analysisEditSaveData.rule = {
                aggregation: this.selectRuleDataEdit
              };
            } else if (type1 == "3") {
              this.analysisEditSaveData.rule = {
                aggregation: this.selectRuleDataEdit
              };
              this.analysisEditSaveData.rule.levelNum = this.alertCountLevelValEdit;
              this.analysisEditSaveData.rule.durationWithCountRelationship = this.yuHuoEdit;
              //周期 次数
              //rule alertDuration 处理----------start
              if (
                !this.alertDurationCondValEdit &&
                this.alertDurationCondValInputEdit &&
                this.alertDurationUnitValEdit
              ) {
              } else {
                let durObjAdd = {};
                durObjAdd = {
                  cond: this.alertDurationCondValEdit,
                  num: this.alertDurationCondValInputEdit,
                  unit: this.alertDurationUnitValEdit
                };
                this.analysisEditSaveData.rule.alertDuration = durObjAdd;
              }

              //rule alertDuration 处理----------end

              //rule alertCount 处理----------start
              if (
                !this.alertCountCondValEdit &&
                !this.alertCountCondValInputEdit
              ) {
              } else {
                let countObjAdd = {};
                countObjAdd = {
                  cond: this.alertCountCondValEdit,
                  num: this.alertCountCondValInputEdit
                };
                this.analysisEditSaveData.rule.alertCount = countObjAdd;
              }

              //rule alertCount 处理----------end
            } else if (type1 == "1") {
              //合并
              this.analysisEditSaveData.rule = {
                aggregation: this.selectRuleDataEdit
              };
              //range
              this.analysisEditSaveData.rule.selectionRange =
                this.dayInterEdit + "," + this.dayBeforeEdit;
            }
          }

          const inputDataAdd = this.alertSelectEditFrom.domains;
          if (inputDataAdd.length) {
            inputDataAdd.forEach(res => {
              var kk = res.key;
              this.alertSelertFromObjEdit[kk] = res.value;
            });
          }
          let arr = [];
          for (const key in this.alertSelertFromObjEdit) {
            arr.push(key + "=" + this.alertSelertFromObjEdit[key]);
          }
          this.analysisEditSaveData.selector = arr;
          // this.analysisEditSaveData.selector = encodeMethods.encode(
          //   this.alertSelertFromObjEdit
          // );

          console.log(this.analysisEditSaveData);
          console.log(this.aTimeEdit);

          //编辑请求
          service
            .strategyAnalysisFormEdit(this.analysisEditSaveData)
            .then(res => {
              this.$message({
                message: "编辑成功",
                type: "success"
              });
              this.strategyAnalysisEditDialog = false;
              this.querystrategyAnalysisData(1);
            });
        } else {
          return false;
        }
      });
    },
    aDialogEdit(formName) {
      this.$refs[formName].resetFields();
    },
    //策略启停
    aStart(row) {
      row.enable == true ? (row.enable = false) : (row.enable = true);
      
      service.strategyAnalysisStart(row).then(res => {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.querystrategyAnalysisData(1);
      });
    },
    billStart(row){
       this.$confirm('是否启用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.enable == true ? (row.enable = false) : (row.enable = true);
          service.autoBillEditService(row).then(res=>{
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.getAllAutoBillData(this.currentPage);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    billEnd(row){
       this.$confirm('是否停止?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.enable == true ? (row.enable = false) : (row.enable = true);
          service.autoBillEditService(row).then(res=>{
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.getAllAutoBillData(this.currentPage);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    //分析策略新增--规则选择重置数据
    strategyRuleDataReset() {
      this.alertDurationCondValAdd = "";
      this.alertDurationCondValInputAdd = "";
      this.alertDurationUnitValAdd = "";
      this.alertDurationLevelValCountAdd = "";
      this.alertCountCondValAdd = "";
      this.alertCountCondValInputAdd = "";
      this.alertCountLevelValCountAdd = "";
      this.dayInterSearchAdd = "";
      this.dayBeforeSearchAdd = "";
      this.ruleAdd = {
        alertDuration: [],
        alertCount: []
      };
    },
    //分析策略查询--规则选择重置数据
    strategySearchRuleDataReset() {
      this.strategyAnalysisSearchData.rule = this.strategyAnalysisSearchDataReset;
      this.dayInterSearch = ""; //分析策略分析规则范围
      this.dayBeforeSearch = "";
      this.alertDurationCondVal = "";
      this.alertDurationInput = "";
      this.alertDurationUnitVal = "";
      this.alertDurationLevelValCount = "";
      this.alertCountCondVal = "";
      this.alertCountCondValInput = "";
      this.alertCountLevelValCount = "";
      this.rule = {
        alertDuration: [],
        alertCount: []
      };
    },
    //分析策略编辑--规则选择重置数据
    strategyEditRuleDataReset() {
      this.alertDurationCondValEdit = "";
      this.alertDurationCondValInputEdit = "";
      this.alertDurationUnitValEdit = "";
      this.alertDurationLevelValCountEdit = "";
      this.alertCountCondValEdit = "";
      this.alertCountCondValInputEdit = "";
      this.alertCountLevelValEdit = "";
      this.dayInterEdit = "";
      this.dayBeforeEdit = "";
      this.ruleEdit = {
        alertDuration: [],
        alertCount: []
      };
      this.ruleEdit1 = {
        indexByCIID: "",
        indexByAlertID: "",
        indexByHost: "",
        indexByIP: "",
        indexBySubSys: "",
        indexByModule: "",
        indexByBizLine: ""
      };
    },

    // 推送策略请求 pkobe--------------start----------------------
    //推送显示隐藏
    confirmPushItemShow() {
      this.pushDialogData.forEach(val => {
        this[val.flag] = val.select;
      });
      this.pushShowDialog = false;
    },
    //查询所有
    querypushStrategyData(page) {
      let params = {
        start: (page - 1) * this.allLimitNumberP,
        limit: this.allLimitNumberP
      };
      service.pushAnalysisSearch(params).then(res => {
        this.pushStrategyFormData = res.data;
        this.pushTotalPage = res.count;
      });
    },
    //推送  条件查询
    pushStrategySearch(startPage, flag) {
      this.pushStrategyAlertDown = false;
      this.pushPgeAllFlag = false;
      let gArr = [];
      let pArr = [];
      if (flag) {
        this.pushCurrentPage = 1;
        //告警选择器------------处理
        const inputDataAdd = this.pushStrategyAlertSelertFrom.domains;
        const obj = {};
        if (inputDataAdd.length) {
          inputDataAdd.forEach(res => {
            var kk = res.key;
            obj[kk] = res.value;
          });
          this.pushStrategySearchData.selector = encodeURIComponent(
            encodeMethods.encode(obj).join(",")
          );
        } else {
          this.pushStrategySearchData.selector = "";
        }
        if (!inputDataAdd.length) {
          // delete this.pushStrategySearchData.bizLineCode
          // this.pushStrategySearchData.bizLineCode=this.pushBizLineCodeSearch;
        }
        // this.pushStrategySearchData.selector = this.$qs
        //   .stringify(obj)
        //   .replace(/&/g, ",");

        //获取推送角色数据
        // let pArr = [];
        if (this.checkHandlerDataSearch.length) {
          this.checkHandlerDataSearch.forEach(val => {
            pArr.push(val.userId);
          });
        }
        console.log(this.checkHandlerDataSearch);
        console.log(pArr);
        // let gArr = [];
        if (this.checkGroupSearch.length) {
          this.checkGroupSearch.forEach(val => {
            gArr.push(val.groupId);
          });
        }
        // this.pushStrategySearchData.group = gArr.join(",");
        // this.pushStrategySearchData.receiver = pArr.join(",");

        //创建时间
        if (this.pushStrategyCreateTime.length) {
          this.pushStrategySearchData.createTimeStart = this.pushStrategyCreateTime[0];
          this.pushStrategySearchData.createTimeEnd = this.pushStrategyCreateTime[1];
        }
        //推送时间
        if (this.pushSearchStartTime && this.pushSearchEndTime) {
          if (this.pushWorkDay) {
            this.pushStrategySearchData.time_range =
              "%5B" +
              this.pushSearchStartTime.replace(":", "!") +
              "@" +
              this.pushSearchEndTime.replace(":", "!") +
              "%5D" +
              "perday";
          } else {
            this.pushStrategySearchData.time_range =
              "%5B" +
              this.pushSearchStartTime.replace(":", "!") +
              "@" +
              this.pushSearchEndTime.replace(":", "!") +
              "%5D" +
              "workday";
          }
        }
        if (this.searchFrequency) {
          this.pushStrategySearchData.frequency = this.searchFrequency;
        }

        //推送渠道
        // this.pushStrategySearchData.push_channel = this.pushchannel.join(",");

        //推送间隔
        if (this.pushSendIntervalInput) {
          this.pushStrategySearchData.retry_interval = this.pushSendIntervalInput;
        }

        //深拷贝
        this.pushParams = JSON.parse(
          JSON.stringify(this.pushStrategySearchData)
        );
      }
      this.pushParams.start = (startPage - 1) * this.allLimitNumberP;
      this.pushParams.limit = this.allLimitNumberP;
      console.log(this.pushStrategySearchData);
      let params = encodeMethods
        .objToStr(this.pushParams)
        .replace(/!/g, ":")
        .replace(/@/g, ",");
      if (this.checkHandlerDataSearch.length) {
        params += "&receiver=" + gArr.join(",");
      }
      if (this.checkGroupSearch.length) {
        params += "&group=" + pArr.join(",");
      }
      if (this.pushchannel.length) {
        params += "&push_channel=" + this.pushchannel.join(",");
      }
      console.log(params);
      service.pushAnalysisSearchSingleData(params).then(res => {
        this.pushStrategyFormData = res.data;
        this.pushTotalPage = res.count;
      });
    },
    //推送删除单个请求
    pushStrategDelService(id) {
      console.log(id);
      service.pushAnalysisFormDelSearchSingle(id).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.querypushStrategyData(1);
      });
    },
    //推送分页
    pushPageChange(val) {
      this.pushCurrentPage = val;
      if (this.pushPgeAllFlag) {
        //如果查询所有的数据
        this.querypushStrategyData(val);
      } else {
        //如果是查询参数的数据
        this.pushStrategySearch(val, false);
      }
    },
    pushSizeChange(val) {
      this.allLimitNumberP = val;
      this.pushCurrentPage = 1;
      if (this.pushPgeAllFlag) {
        //如果查询所有的数据
        this.querypushStrategyData(1);
      } else {
        //如果是查询参数的数据
        this.pushStrategySearch(1, false);
      }
    },
    //批量删除请求
    pushStrategDelSomeService(ids) {
      let params = {
        strategy_id: ids
      };
      service.pushAnalysisFormDelSearchSome(params).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.querypushStrategyData(1);
      });
    },
    //推送批量删除
    pushStrategyBatchDel() {
      if (this.pushStrategySelection.length) {
        this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let delIdArr = [];
            this.pushStrategySelection.forEach(val => {
              delIdArr.push(val.id);
            });
            delIdArr = delIdArr.join(",");

            this.pushStrategDelSomeService(delIdArr);
          })
          .catch(() => {});
      } else {
        this.$message({
          message: "请选择数据",
          type: "error"
        });
      }
    },
    //推送重置
    pushReset() {
      this.pushStrategyAlertDown = false;
      this.pushBizLineCodeSearch = "";
      this.pushSelectNameSearch = [];
      this.pushStrategySearchData = {
        name: "",
        founder: ""
      };
      this.pushStrategyAlertSelertFrom = {
        domains: []
      };
      this.pushSendTime = "";
      this.pushSearchStartTime = "";
      this.pushSearchEndTime = "";
      this.pushchannel = [];
      this.pushSearchStartTime = "";
      this.pushStrategyCreateTime = [];
      this.pushSendIntervalInput = "";

      this.personSearchValue = [];
      this.toDataSearch = [];
      this.groupAllData = this.savePerson;

      this.pushPgeAllFlag = true;
      this.pushCurrentPage = 1;
      this.getAllGroupPerson();
      this.querypushStrategyData(1);
    },
    //新增责任人配置模态框关闭
    delall() {
      //清空前一次责任人选择的状态
      this.$refs.hanlderAdd.setCheckedKeys([]);
    },
    delallEdit() {
      //清空前一次责任人选择的状态
      this.$refs.hanlderEdit.setCheckedKeys([]);
    },
    //推送新增模态框 --重置
    pushAddDialog() {
      this.pushSelectNameAdd = [];
      this.pushBizLineCodeAdd = "";
      this.otherCheckedValue = []; //待删除

      this.checkHandlerData = [];
      this.checkGroupData = [];

      //重置新增组 右边清空
      this.getAllGroupPerson();
      this.toData = [];

      //清楚模态框数据
      this.pushAddData = {
        founder: "admin",
        strategy_name: "",
        max_count: "",
        content_template: "",
        pushchannelAdd: [],
        retry_interval: ""
      };
      this.tableDataTime = [
        {
          workday: true,
          frequency: "",
          pushStartTimeAdd: "",
          pushEndTimeAdd: ""
        }
      ];
      this.pushchannelAdd = [];
      this.pushSendIntervalInputAdd = "";
      this.pushStrategyAlertSelertAddFrom.domains = [];

      this.pushStrategyAddDialog = true;
    },
    //推送新增保存
    pushAddSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.pushAddData.push_channel = this.pushAddData.pushchannelAdd.join(
            ","
          );
          // this.pushAddData.retry_interval = this.pushSendIntervalInputAdd;
          //----------------推送间隔  old----
          // this.pushAddData.retry_interval =
          // this.pushSendIntervalInputAdd + this.sendInterfilAdd;

          //推送时间
          //workday-true/每天  false/工作日
          //[{"time_range":"[8:00,20:00] per day"},{"frequency":"5m"}]

          let timeArr = [];
          if (this.tableDataTime[0].workday) {
            timeArr.push(
              {
                time_range:
                  "[" +
                  this.tableDataTime[0].pushStartTimeAdd +
                  "," +
                  this.tableDataTime[0].pushEndTimeAdd +
                  "]" +
                  "perday"
              },
              { frequency: this.tableDataTime[0].frequency }
            );
          } else {
            timeArr.push(
              {
                time_range:
                  "[" +
                  this.tableDataTime[0].pushStartTimeAdd +
                  "," +
                  this.tableDataTime[0].pushEndTimeAdd +
                  "]" +
                  "workday"
              },
              { frequency: this.tableDataTime[0].frequency }
            );
          }
          this.pushAddData.push_time = {
            rules: timeArr
          };

          //告警选择器------------处理
          const inputDataAdd = this.pushStrategyAlertSelertAddFrom.domains;
          const obj = {};
          if (inputDataAdd.length) {
            inputDataAdd.forEach(res => {
              var kk = res.key;
              obj[kk] = res.value;
            });
          }
          let arr = [];
          for (const key in obj) {
            arr.push(key + "=" + obj[key]);
          }
          this.pushAddData.selector = arr;
          // this.pushAddData.selector = encodeMethods.encode(obj);
          this.pushAddData.bizLineCode = this.pushBizLineCodeAdd;
          // this.pushAddData.selector = this.$qs
          //   .stringify(obj)
          //   .replace(/&/g, ",")
          //   .split(",");

          //责任人数据
          let otherArr = [];
          let groupArr = [];
          if (this.checkHandlerData.length) {
            this.checkHandlerData.forEach(val => {
              otherArr.push(val.userId);
            });
          }
          if (this.checkGroupData.length) {
            this.checkGroupData.forEach(val => {
              groupArr.push(val.groupId);
            });
          }
          this.pushAddData.receiver = {
            userId: this.personAddId,
            otherId: otherArr.join(","),
            groupId: groupArr.join(",")
          };
          console.log(this.pushAddData);

          service.pushAddService(this.pushAddData).then(res => {
            this.$message({
              message: "新增成功",
              type: "success"
            });
            this.pushStrategyAddDialog = false;
            this.querypushStrategyData(1);
          });
        } else {
          return false;
        }
      });
    },
    //推送策略编辑
    pushEdit(id) {
      //编辑数据重置
      this.pushStrategyEditFrom.domains = [];
      this.checkHandlerDataEdit = [];
      this.checkGroupEdit = [];
      this.addUserGroupName = "";
      this.pushGroupEdit = "";
      this.personId = "";

      //重置新增组 右边清空
      this.getAllGroupPerson();
      this.toData = [];

      service.pushAnalysisSingleSearch(id).then(res => {
        // this.pushStrategyEditData = res.data;
        // this.pushStrategyEditData.pushchannelEdit=[];
        // this.pushStrategyEditData.pushchannelEdit = res.data.push_channel.split(",");
        let result = res.data;
        this.pushStrategyEditData.strategy_name = result.strategy_name;
        this.pushStrategyEditData.id = result.id;
        this.pushStrategyEditData.max_count = result.max_count;
        this.pushStrategyEditData.content_template = result.content_template;
        this.pushStrategyEditData.retry_interval = result.retry_interval;
        this.pushStrategyEditData.pushchannelEdit = result.push_channel.split(
          ","
        );

        //存放编辑删除组的时候 当前策略的id
        this.pushDelId = res.data.id;

        //推送间隔
        // this.pushSendIntervalInputEdit = res.data.retry_interval;

        //推送时间
        let sj = res.data.push_time_strategy;
        this.tableDataTimeEdit = [
          {
            workday: sj.range == "perday" ? true : false,
            frequency: sj.frequency,
            pushStartTimeAdd: sj.start,
            pushEndTimeAdd: sj.end
          }
        ];

        //选择器
        this.pushBizLineCodeEdit = res.data.bizLineCode;
        this.pushSelectNameEdit = [];
        let xzq = res.data.selector;
        let lineCode = res.data.bizLineCode;
        xzq.forEach(res => {
          //等号分割
          let arr1 = res.split("=");
          //[ "bizSys,sys34"]
          //要通过第一个key id去查找名字
          let backName = "";
          let bizName = "";

          this.ruleData.forEach(val => {
            if (lineCode == val.key) {
              bizName = val.name;
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == arr1[0]) {
                    backName = value.name;
                  }
                });
              }
            }
          });
          this.pushStrategyEditFrom.domains.push({
            key: arr1[0],
            value: arr1[1],
            name: bizName + "/" + backName
          });
        });
        //角色
        //回显
        this.personId = res.data.receiver.userId;
        //已经选择的其他人
        let pIdArr = res.data.receiver.otherId.split(",");
        console.log(pIdArr);
        //[1,2]
        if (pIdArr.length) {
          pIdArr.forEach(val => {
            this.allGroupPersonData.forEach(value => {
              if (value.member) {
                value.member.forEach(val1 => {
                  if (val == val1.id) {
                    this.checkHandlerDataEdit.push(val1);
                  }
                });
              }
            });
          });
        }
        //已经选的责任组
        let pGroupArr = res.data.receiver.groupId.split(",");
        console.log(this.allGroupData);
        if (pGroupArr.length) {
          pGroupArr.forEach(val => {
            this.allGroupData.forEach(value => {
              if (val == value.groupId) {
                this.checkGroupEdit.push(value);
              }
            });
          });
        }

        this.pushHandlerEditData = res.data.user_id;
      });
      this.pushStrategyEditDialog = true;
    },
    //推送编辑 责任人详情
    sendPersonEdit() {
      //先判断选择器里面里面是否有值
      const inputDataAdd = this.pushStrategyEditFrom.domains;
      const obj = {};
      if (inputDataAdd.length) {
        inputDataAdd.forEach(res => {
          var kk = res.key;
          obj[kk] = res.value;
        });
      }
      let arr = [];
      for (const key in obj) {
        arr.push(key + "=" + obj[key]);
      }
      this.pushAddData.selector = arr.join(",");
      // this.pushAddData.selector = encodeMethods.encode(obj).join(",");

      // console.log(this.pushAddData.selector);
      //先判断用户是否填写了选择器,如果没有提示用户
      if (!this.pushAddData.selector || this.pushAddData.selector == "=") {
        this.$message({
          message: "请填写选择器",
          type: "error"
        });
      } else {
        // let params = {
        //   selector: this.pushAddData.selector
        // };
        // console.log(params);
        // 根据选择器请求责任人数据

        // service.pushAlertSelectSearchData(params).then(res => {

        //   console.log(res.data.data);
        //   let handlerArr = res.data.data;
        //   let arr = [];
        //   if(handlerArr.length){
        //      handlerArr.forEach(val => {
        //       arr.push(val.handlerName);
        //     });
        //     this.pushHandlerEditData =this.pushHandlerEditData+','+arr.join(",")
        //   }
        // });
        this.receiverInfoEditDialog = true;
      }
    },
    //推送编辑保存
    pushEditSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.pushStrategyEditFrom.domains.length) {
            this.$message({
              message: "请填写选择器",
              type: "error"
            });
            return;
          }
          console.log(this.pushStrategyEditData);
          this.pushAddDataSave.bizLineCode = this.pushBizLineCodeEdit;
          this.pushAddDataSave.id = this.pushStrategyEditData.id;
          this.pushAddDataSave.strategy_name = this.pushStrategyEditData.strategy_name;
          this.pushAddDataSave.push_channel = this.pushStrategyEditData.pushchannelEdit.join(
            ","
          );
          this.pushAddDataSave.max_count = this.pushStrategyEditData.max_count;
          this.pushAddDataSave.content_template = this.pushStrategyEditData.content_template;

          this.pushAddDataSave.retry_interval = this.pushStrategyEditData.retry_interval;

          //推送时间
          let timeArr = [];
          if (this.tableDataTimeEdit[0].workday) {
            timeArr.push(
              {
                time_range:
                  "[" +
                  this.tableDataTimeEdit[0].pushStartTimeAdd +
                  "," +
                  this.tableDataTimeEdit[0].pushEndTimeAdd +
                  "]" +
                  "perday"
              },
              { frequency: this.tableDataTimeEdit[0].frequency }
            );
          } else {
            timeArr.push(
              {
                time_range:
                  "[" +
                  this.tableDataTimeEdit[0].pushStartTimeAdd +
                  "," +
                  this.tableDataTimeEdit[0].pushEndTimeAdd +
                  "]" +
                  "workday"
              },
              { frequency: this.tableDataTimeEdit[0].frequency }
            );
          }
          this.pushAddDataSave.push_time = {
            rules: timeArr
          };

          //告警选择器------------处理
          const inputDataAdd = this.pushStrategyEditFrom.domains;
          const obj = {};
          if (inputDataAdd.length) {
            inputDataAdd.forEach(res => {
              var kk = res.key;
              obj[kk] = res.value;
            });
          }
          let arr = [];
          for (const key in obj) {
            arr.push(key + "=" + obj[key]);
          }
          this.pushAddDataSave.selector = arr;
          // this.pushAddDataSave.selector = encodeMethods.encode(obj);

          //责任人数据
          let otherArr = [];
          let groupArr = [];
          if (this.checkHandlerDataEdit.length) {
            this.checkHandlerDataEdit.forEach(val => {
              otherArr.push(val.userId);
            });
          }
          if (this.checkGroupEdit.length) {
            this.checkGroupEdit.forEach(val => {
              groupArr.push(val.groupId);
            });
          }
          this.pushAddDataSave.receiver = {
            userId: this.personId,
            otherId: otherArr.join(","),
            groupId: groupArr.join(",")
          };

          service.pushEditServie(this.pushAddDataSave).then(res => {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.pushStrategyEditDialog = false;
            this.querypushStrategyData(1);
          });
          console.log(this.pushAddDataSave);
        } else {
          return false;
        }
      });
    },
    //编辑组
    addEdit(fromData, toDataEdit, obj) {
      this.toDataEdit = toDataEdit;
    },
    // 监听穿梭框组件移除
    removeEdit(fromData, toDataEdit, obj) {
      this.toDataEdit = toDataEdit;
    },
    // 自定义节点 仅树形结构支持
    renderContentEdit(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.delEdit(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },
    //编辑新增组
    addGroupMethodEdit() {
      this.addGroupDataEdit = [];
      this.groupAllData = this.savePerson;
      this.addGroupShowEdit = true;
      this.addGroupBtnStyleEdit = true;
    },
    addGroupConfirmEdit() {
      //根据选择的id 构建数据
      //ids addGroupData [1,2]
      if (!this.addUserGroupNameEdit || this.addGroupDataEdit.length == 0) {
        this.$message({
          message: "请把信息填写完整",
          type: "error"
        });
        return;
      }
      let arr = [];
      if (this.addGroupDataEdit.length) {
        this.addGroupDataEdit.forEach(val => {
          //拿到每一个id,去遍历用户所有信息,拿到id对应的item
          this.allGroupPersonData.forEach(value => {
            if (val == value.userId) {
              arr.push(value);
            }
          });
        });
      }
      // console.log(arr);
      let params = {
        groupName: this.addUserGroupNameEdit,
        member: arr
      };
      service.pushAddGroup(params).then(res => {
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.getAllGroupPerson();
        this.addGroupBtnStyleEdit = false;
        this.addGroupShowEdit = false;
      });
    },
    //编辑删除节点
    delEdit(node, data) {
      if (data.pid == 0) {
        //如果是父节点
        let params = {
          group_id: data.id,
          strategy_id: this.pushDelId
        };
        service.pushDelGroupService(params).then(res => {
          this.fromData.forEach((val, index) => {
            if (val == data) {
              this.fromData.splice(index, 1);
            }
          });
          this.toDataEdit.forEach((val, index) => {
            if (val == data) {
              this.toDataEdit.splice(index, 1);
            }
          });

          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getAllGroupPerson();
        });
      } else {
        let params = {
          group_id: data.pid,
          user_id: data.userId,
          strategy_id: this.pushDelId
        };
        service.pushDelGroupPersonService(params).then(res => {
          let flag;
          this.fromData.forEach((val, idx) => {
            if (val.member.length) {
              val.member.forEach((value, index) => {
                if (value == data) {
                  val.member.splice(index, 1);
                  flag = 1;
                }
              });
            }
          });
          this.toDataEdit.forEach((val, idx) => {
            if (val.member.length) {
              val.member.forEach((value, index) => {
                if (value == data) {
                  val.member.splice(index, 1);
                  flag = 0;
                }
              });
            }
          });

          if (flag == 1) {
            this.fromData = JSON.parse(JSON.stringify(this.fromData));
          } else if (flag == 0) {
            this.toDataEdit = JSON.parse(JSON.stringify(this.toDataEdit));
          }

          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getAllGroupPerson();
        });
      }
    },
    //
    //查询组
    add1(fromData, toDataSearch, obj) {
      this.toDataSearch = toDataSearch;
    },
    // 监听穿梭框组件移除
    remove1(fromData, toDataSearch, obj) {
      this.toDataSearch = toDataSearch;
    },
    //不需要
    getAllHandlerData() {
      //请求所有责任人数据
      service.pushAlertSelectSearchData().then(res => {
        console.log(res);

        let allArr = res.data;
        let pAll = [];
        if (allArr) {
          allArr.forEach(val => {
            pAll.push({
              key: val.handlerName,
              value: val.handlerName
            });
          });
          this.handlerAllData = pAll;
        }
      });
    },
    //所有组的 人员信息
    getAllGroupData() {
      service.pushGroupAllData().then(res => {
        // if (res.data) {
        //   this.allGroupPersonData = res.data;
        //   this.allGroupPersonData.forEach(val => {
        //     val.label = val.userName;
        //     val.id = val.userId;
        //   });
        //   this.savePerson = this.allGroupPersonData;
        // }
        let arr = res.data;
        if (arr) {
          arr.forEach((val, index) => {
            val.label = val.deptName;
            val.disabled = "true";
            val.member.forEach((value, idx) => {
              value.label = value.realName;
              value.id = value.userId;
            });
          });
        }
        this.allGroupPersonData = arr;
      });
    },
    //所有组的信息 zukobe
    getAllGroupPerson() {
      service.pushQueryGroupService().then(res => {
        // this.allGroupData =res.data;
        let result = res.data;
        console.log("-----------");

        if (result) {
          result.forEach((val, index) => {
            val.id = val.groupId;
            val.label = val.groupName;
            val.member.forEach((value, idx) => {
              value.disabled = true;
              value.label = value.userName;
              value.id = value.userId;
              value.parentId = val.groupId;
            });
          });
        }
        this.allGroupData = result;
        // console.log(result);
      });
    },
    // 推送策略请求 --------------end----------------------
    //自动提单请求
    nameSearch() {
      this.autoBillSearchConditions.name = this.autoBillSearchConditions.name.replace(
        /[^\w\u4E00-\u9FA5]/g,
        ""
      );
    },
    nameAdd() {
      this.autoBillAddData.name = this.autoBillAddData.name.replace(
        /[^A-z]/,
        ""
      );
    },
    aliasAdd(){
      this.autoBillAddData.alias = this.autoBillAddData.alias.replace(
        /[^\u4E00-\u9FA5]/g,
        ""
      );
    },
    nameEdit() {
      this.autoBillEditData.name = this.autoBillEditData.name.replace(
        /[^A-z]/,
        ""
      );
    },
    aliasEdit(){
      this.autoBillEditData.alias = this.autoBillEditData.alias.replace(
        /[^\u4E00-\u9FA5]/g,
        ""
      );
    },

    // 自动提单新增按钮
    autoBillAdd() {
      this.autoBillDialog = true;
      this.autoBillTimeAdd=[];
      this.autoBillAddData = {
        name: "",
        alias: "",
        desc: "",
        enable: true,
        priority: "",
      };
      this.registrantIdArrAdd = [];
      this.styleInfo = [];
      this.eventInfo = [];
      this.billSelectNameAdd = [];
      this.alertSelectAddFrom.domains = [];
      this.billBizLineCodeAdd = "";
    },
    //自动提单新增保存
    billAddSave() {
      // console.log(this.autoBillAddData);
      // console.log(this.styleInfo);
      // console.log(this.registrantIdArrAdd);
      // this.autoBillAddData.system = this.styleInfo[0]; //系统类型
      // this.autoBillAddData.systemSubclass = this.styleInfo[1] || ""; //系统子类
      // this.autoBillAddData.systemItem = this.styleInfo[2] || ""; //系统条
        //时间处理 校验开始-结束时间   创建时间
      if (this.autoBillTimeAdd.length) {
        this.autoBillAddData.startTime = this.autoBillTimeAdd[0];
        this.autoBillAddData.endTime = this.autoBillTimeAdd[1];
      } else {
        this.autoBillAddData.startTime = "";
        this.autoBillAddData.endTime = "";
      }
      //事件涉及组
      console.log(this.eventInfo);
      this.autoBillAddData.relatedOrg = this.eventInfo.join("&");
      console.log(this.autoBillAddData);
      //登记人
      // this.autoBillAddData.deptId = this.registrantIdArrAdd[0];
      // this.autoBillAddData.registrant = this.registrantIdArrAdd[1];
      //告警选择器------------处理
      const inputDataAdd = this.alertSelectAddFrom.domains;
      const obj = {};
      if (inputDataAdd.length) {
        let flagOne =false;
        for(let i=0,len=inputDataAdd.length;i<len;i++){
          if(inputDataAdd[i].reg){
            if(!new RegExp(inputDataAdd[i].reg).test(inputDataAdd[i].value)){
              this.$message({
                  message: inputDataAdd[i].key+"的值不合法",
                  type: "error"
              });
              flagOne = true;
              break ;
            }
          }
        }
        if(flagOne){
          return;
        }
        let arr = [];
        inputDataAdd.forEach(val=>{
          arr.push(val.key+'='+val.value)
        })
        this.autoBillAddData.selector = arr;
      }
      this.autoBillAddData.bizLineCode = this.billBizLineCodeAdd;
      service.autoBillAddService(this.autoBillAddData).then(res => {
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.currentPageBill=1;
        this.getAllAutoBillData(1);
        this.autoBillDialog = false;
      });
    },
    //查询所有
    getAllAutoBillData(page) {
      let params = {
        start: (page - 1) * this.allLimitNumberBill,
        limit: this.allLimitNumberBill
      };
      service.autoBillSeach(params).then(res => {
        this.tableLoading=false;
        this.autoBillTableData = res.data;
        this.totalPageBill = res.count;
         this.serviceTime = res.timestamp;
      });
    },
    // 条件查询
    autoBillSearch(startPage, flag) {
      this.tableLoading=true;
      this.pageAllFlagBill = false;
      if (flag) {
        this.currentPageBill = 1;
        //时间
        console.log(this.autoBillTime);
        if (this.autoBillTime) {
          this.autoBillSearchConditions.createTimeStart = this.autoBillTime[0];
          this.autoBillSearchConditions.createTimeEnd = this.autoBillTime[1];
        } else {
          this.autoBillSearchConditions.createTimeStart = "";
          this.autoBillSearchConditions.createTimeEnd = "";
        }
        const inputDataAdd = this.billAlertSelertFrom.domains;
        const obj = {};
        if (inputDataAdd.length) {
          inputDataAdd.forEach(res => {
            var kk = res.key;
            obj[kk] = res.value;
          });
          // console.log(obj);
          //{a:1,b:2}===> [a=1,b=2]
          let tempArr = [];
          for (const key in obj) {
            tempArr.push(key + "=" + obj[key]);
          }
          // console.log(tempArr);
          this.autoBillSearchConditions.selector = encodeURIComponent(
            tempArr.join(",")
          );
          // this.autoBillSearchConditions.selector = encodeURIComponent(
          //   encodeMethods.encode(obj).join(",")
          // );
        } else {
          this.autoBillSearchConditions.selector = "";
        }

        this.billParams = JSON.parse(
          JSON.stringify(this.autoBillSearchConditions)
        );
      }
      console.log(this.billParams);
      this.billParams.start = (startPage - 1) * this.allLimitNumberBill;
      this.billParams.limit = this.allLimitNumberBill;

      let paramsObj = this.billParams;
      let a = "";
      let params = ""; //传给后台的参数
      for (const key in paramsObj) {
        a += key + "=" + paramsObj[key] + "&";
      }
      a = a.substring(0, a.length - 1);
      service.autoBillSeachTiaojian(a).then(res => {
        this.tableLoading=false;
        this.autoBillTableData = res.data;
        this.totalPageBill = res.count;
      });
    },
    autoBillPage(val) {
      this.tableLoading=true;
      this.currentPageBill = val;
      if (this.pageAllFlagBill) {
        //如果查询所有的数据
        this.getAllAutoBillData(val);
      } else {
        //如果是查询参数的数据
        this.autoBillSearch(val, false);
      }
    },
    autoBillPageSizeChange(val) {
       this.tableLoading=true;
      this.allLimitNumberBill = val;
      this.currentPageBill = 1;
      if (this.pageAllFlagBill) {
        //如果查询所有的数据
        this.getAllAutoBillData(1);
      } else {
        //如果是查询参数的数据
        this.autoBillSearch(1, false);
      }
    },
    // 删除单个
    billDeleteRow(id) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        service.autoBillDelSingle(id).then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.currentPageBill=1;
          this.getAllAutoBillData(1);
        });
      });
    },
    // 批量删除
    autoBillBatchDel() {
      if (this.autoBillSeleteRows.length) {
        this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let ids = [];
            this.autoBillSeleteRows.forEach(val => {
              ids.push(val.id);
            });
            ids = ids.join(",");
            service.autoBillDelSome({ id: ids }).then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.currentPageBill=1;
              this.getAllAutoBillData(1);
            });
          })
          .catch(() => {});
      } else {
        this.$message({
          message: "请选择数据",
          type: "error"
        });
      }
    },
    autoBillSelectionChange(val) {
      this.autoBillSeleteRows = val;
    },
    //重置
    autoBillReset() {
       
      this.autoBillSearchConditions = {
        name: ""
      };
      this.billAlertSelertFrom.domains = [];
      this.billSelectNameSearch = [];
      this.autoBillTime = [];
      this.billAlertDown = false;
      this.pageAllFlagBill = true;
      // this.tableLoading=true;
      // this.currentPageBill=1;
      // this.getAllAutoBillData(1);
    },
    //编辑
    autoBillEdit(id) {
      this.billAlertSelertEditFrom.domains = [];
       this.autoBillTimeEdit=[];
      service.autoBillSeachSingle(id).then(res => {
        let result = res.data;
        this.autoBillDialogEdit = true;
        this.autoBillEditData = res.data;

        this.billSelectNameEdit = [];
        let xzq = result.selector;
        this.billBizLineCodeEdit = result.bizLineCode;
        let lineCode = result.bizLineCode;
        xzq.forEach(res => {
          //等号分割
          let arr1 = res.split("=");
          //[ "bizSys,sys34"]
          //要通过第一个key id去查找名字
          let backName = "";
          let bizName = "";
          let regInfoEdit = '';

          this.ruleData.forEach(val => {
            if (lineCode == val.key) {
              bizName = val.name;
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == arr1[0]) {
                    backName = value.name;
                     if(value.reg){
                        regInfoEdit = value.reg
                      }
                  }
                });
              }
            }
          });
          this.billAlertSelertEditFrom.domains.push({
            key: arr1[0],
            value: arr1[1],
            name: bizName + "/" + backName,
            reg:regInfoEdit
          });
        });
        //所属系统信息
        // let systemArr = [];
        // systemArr.push(result.system, result.systemSubclass, result.systemItem);
        // this.styleInfoEdit = systemArr;
        //事件涉及组
        this.eventInfoEdit = result.relatedOrg.split("&");
        //生效时间
        this.autoBillTimeEdit.push(res.data.startTime);
        this.autoBillTimeEdit.push(res.data.endTime);
        //登记人
        // let perArr = [];
        // perArr.push(result.deptId, result.registrant);
        // this.registrantIdArrEdit = perArr;
      });
    },
    //编辑保存
    billEditSave() {
      //时间处理 校验开始-结束时间   创建时间
      if (this.autoBillTimeEdit.length) {
        this.autoBillEditData.startTime = this.autoBillTimeEdit[0];
        this.autoBillEditData.endTime = this.autoBillTimeEdit[1];
      } else {
        this.autoBillEditData.startTime = "";
        this.autoBillEditData.endTime = "";
      }
      // this.autoBillEditData.system = this.styleInfoEdit[0]; //系统类型
      // this.autoBillEditData.systemSubclass = this.styleInfoEdit[1] || ""; //系统子类
      // this.autoBillEditData.systemItem = this.styleInfoEdit[2] || ""; //系统条
      //事件涉及组
      this.autoBillEditData.relatedOrg = this.eventInfoEdit.join("&");
      //登记人
      // this.autoBillEditData.deptId = this.registrantIdArrEdit[0];
      // this.autoBillEditData.registrant = this.registrantIdArrEdit[1];
      //告警选择器------------处理
      const inputDataAdd = this.billAlertSelertEditFrom.domains;
      const obj = {};
      if (inputDataAdd.length) {
        let flagOne =false;
        for(let i=0,len=inputDataAdd.length;i<len;i++){
          if(inputDataAdd[i].reg){
            if(!new RegExp(inputDataAdd[i].reg).test(inputDataAdd[i].value)){
              this.$message({
                  message: inputDataAdd[i].key+"的值不合法",
                  type: "error"
              });
              flagOne = true;
              break ;
            }
          }
        }
        if(flagOne){
          return;
        }
        let arr= [];
        inputDataAdd.forEach(val=>{
          arr.push(val.key+'='+val.value)
        })
        this.autoBillEditData.selector = arr;
      }
      this.autoBillEditData.bizLineCode = this.billBizLineCodeEdit;
      delete this.autoBillEditData.registrantName;
      console.log(this.autoBillEditData);
      service.autoBillEditService(this.autoBillEditData).then(res => {
        this.$message({
          message: "编辑成功",
          type: "success"
        });
        this.autoBillDialogEdit = false;
        this.getAllAutoBillData(this.currentPageBill);
      });
    },
    //设置列显示隐藏
    setAutoBillShowDialog() {
      this.autoBillShowDialog = true;
      this.autoBillDialogData.forEach(val => {
        if (this[val.flag]) {
          val.select = true;
        } else {
          val.select = false;
        }
      });
    },
    confirmAutoBillItemShow() {
      this.autoBillDialogData.forEach(val => {
        this[val.flag] = val.select;
      });
      this.autoBillShowDialog = false;
      let obj = {};
      this.autoBillDialogData.forEach(val=>{
        let dd=val.flag
        obj[dd]=val.select
      })
      localStorage.setItem('autoBillColData',JSON.stringify(obj))
    },
    //影响性数据
    getEventInfluenceData() {
      service.autoBillEventData().then(res => {
        //事件涉及组
        let deep1 = function(arr) {
          arr.forEach(item => {
            item.value = item.object.deptId;
            item.label = item.object.deptName;
            if (item.children) {
              deep1(item.children);
            }
          });
        };
        let deep = function(arr) {
          arr.forEach(item => {
            item.value = item.object.id;
            item.label = item.object.name;
            if (item.children) {
              deep(item.children);
            }
          });
        };
        deep1(res.data.orgTree);
        // deep(res.data.system);
        // this.relatedOrgData = res.data.system;
        this.eventGroupData = res.data.orgTree;
        // res.data.user.forEach(val => {
        //   val.label = val.deptName;
        //   val.value = val.deptId + "";
        //   if (val.member.length) {
        //     val.member.forEach(value => {
        //       value.label = value.realName;
        //       value.value = value.userId + "";
        //     });
        //   }
        // });
        // this.registrantIdData = res.data.user;
      });
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = document.querySelector('.cardM').offsetTop
      if (scrollTop > offsetTop) {
        if(this.billAlertDown){
          this.alertSelectShow=true;
        }
      } else {
         this.alertSelectShow=false;
      }
    },
  },
  mounted() {
    this.getColData();
    window.addEventListener('scroll', this.handleScroll);
    this.ruleSearch();
    this.getAllAutoBillData(1);
    this.getEventInfluenceData();
  },
  destroyed () {//离开该页面需要移除这个监听的事件
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: { treeTransfer }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.strategyManage-container {
  .isFixed{
    position:fixed !important;
    top:59px;
    z-index:999;
  }
  padding: 10px;
  .cardM {
    margin-top: 5px;
  }
  .iconStyle{
    margin-left: 4px;
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
  }
  .btnInfo {
    .set-item-show {
      color: #4690FE;
      font-size: 12px;
      vertical-align: bottom;
      cursor: pointer;
    }
  }
  #ruleStyle {
    .rule-info {
      position: absolute;
      z-index: 998 !important;
      margin-top: 5px;
      padding: 5px;
      width: 284px;
      background-color: white;
      box-shadow: 0px 0px 2px #3a8ee6;
      span {
        font-size: 14px;
      }
      .title {
        i {
          display: inline-block;
          width: 5px;
          height: 16px;
          margin-right: 5px;
          background: #42B983;
        }
        margin-bottom: 5px;
      }
      .el-input {
        width: 206px;
      }
      .el-select {
        width: 78px;
      }
      .count-style {
        width: 52px;
      }
      .selecetShot {
        width: 68px;
      }
      .count-stylea {
        width: 50px;
      }
      .count-styleb {
        width: 107px;
      }
      .selectLength-a {
        width: 188px;
      }
      .ruleSelectStyleSearch {
        .el-select {
          width: 272px;
        }
      }
    }
  }
  #alertStyle {
    .chaBtn {
      margin-left: 3px;
    }
    .alertStyle {
      .el-form-item {
        margin-bottom: 0;
      }
    }
    .alert-info {
      position: absolute;
      z-index: 998 !important;
      margin-top: 5px;
      padding: 5px;
      width: 262px;
      background-color: white;
      box-shadow: 0px 0px 2px #3a8ee6;
      .title {
        i {
          display: inline-block;
          width: 5px;
          height: 16px;
          margin-right: 5px;
          background: #42B983;
        }
        margin-bottom: 5px;
      }
      .el-select {
        width: 248px;
      }
      .key-length {
        width: 90px;
      }
      .value-length {
        width: 112px;
      }

      .el-form-item {
        margin-top: 8px;
      }
    }
  }
  //自动提单查询
  #autoBillStyle {
    .el-input,
    .el-select,
    .el-date-editor {
      width:260px;
    }
    .chaBtn {
      margin-left: 10px;
    }
    .alertStyle {
      .el-form-item {
        margin-bottom: 0;
      }
    }
    .searchTop{
      margin-top: 10px;
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
      margin-left: 10px;
    }
    .btn_rote {
      transform: rotate(90deg);
    }
    .btn_rote1 {
      transform: rotate(-90deg);
    }
    .alert-info {
      position: absolute;
      z-index: 998 !important;
      margin-top: 5px;
      padding: 5px;
      width: 262px;
      background-color: white;
      box-shadow: 0px 0px 2px #3a8ee6;
      .title {
        i {
          display: inline-block;
          width: 5px;
          height: 16px;
          margin-right: 5px;
          background: #42B983;
        }
        margin-bottom: 5px;
      }
      .el-cascader {
        width: 206px;
      }
      .key-length {
        width: 90px;
      }
      .value-length {
        width: 112px;
      }

      .el-form-item {
        margin-top: 8px;
      }
    }
  }
  //自动提单新增
  .autoBillAddStyle {
    .el-input,
    .el-select,
    .el-date-editor,
    .el-cascader {
      width: 316px;
    }
    #alertSelectAddItemBill {
      .key-length {
        width: 166px;
      }
      .value-length {
        width: 146px;
      }
    }
    .expreesionStyle {
      .el-textarea {
        width: 316px;
      }
    }
  }
  .btnInfo {
    margin-bottom: 10px;
  }
  

  //隐藏显示列
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
  .noBtnStyle {
    width: 70px;
    padding-left: 12px;
  }
  .line {
    width: 100%;
    height: 1px;
    border: 1px solid rgba(75, 245, 247, 0.5);
    // background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
    // background-size: 8px 1px;
    // background-repeat: repeat-x;
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
.redStyleBtn:hover{
  background-color:  #FA5555;
  color:white;
  border: 1px solid #FA5555;
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
#sceondBtn{
  margin-left: 2px;
}
/deep/.strategyManage-container {
  .alertHiddenStyle {
    overflow: visible;
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
/deep/.el-pagination {
  margin-top: 10px;
  .el-pager li.active{
    min-width: 28px;
    height: 28px;
    background: rgba(66,185,131,1);
    font-size: 14px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
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
// /deep/.el-tooltip__popper {
//   display: none;
// }
</style>
