<template>
  <div class="dashboard-container">
    <el-tabs type="border-card">
      <el-tab-pane label="责任人管理">
        <div class="quality-manage-info">
          <el-form
            :inline="true"
            :model="querySearchData"
            class="demo-form-inline"
            label-position="right"
            label-width="120px"
            id="preForm"
          >
            <el-row>
              <el-col :span="4">
                <!-- <el-form-item label="责任人" > -->
                <el-input v-model="querySearchData.name"  @keyup.native="nameSearch" placeholder="请输入责任人"></el-input>
                <!-- </el-form-item> -->
              </el-col>
              <el-col :span="3" id="alertStyle">
                <!-- <el-form-item label="告警选择器"> -->
                <el-button class='blueStyleBtn' @click="alertDown=!alertDown">告警选择器</el-button>
                <div class="alert-info" v-if="alertDown" :class="alertSelectShow == true ? 'isFixed' :''">
                  <div class="title">
                    <i></i>告警选择器
                    <el-button
                      @click="addDomain"
                      icon="el-icon-circle-plus-outline"
                      class='blueStyleBtn'
                      size="mini"
                      circle
                    ></el-button>
                  </div>
                  <!-- <el-select v-model="selectNameSearch" placeholder="请选择">
                        <el-option
                          v-for="item in selectorData"
                          :key="item.key"
                          :label="item.name"
                          :value="item.key">
                        </el-option>
                  </el-select>-->
                  <el-cascader
                    placeholder="请选择"
                    :options="selectorData"
                    v-model="selectNameSearch"
                    :props="propsSelect"
                  ></el-cascader>
                  <el-form :model="alertSelertFrom" class="alertStyle">
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
              <el-col :span="8">
                <el-form-item>
                  <el-col id="quality-manage-btn">
                    <el-button class='blueStyleBtn' @click="querySearchDataMethod(1,true)">查询</el-button>
                    <el-button class='defaultBtn' @click="personReset">重置</el-button>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-form-item label="归属部门">
              <el-input v-model="querySearchData.apartment" ></el-input>
            </el-form-item>
            <el-form-item label="是否主要负责人">
              <el-select v-model="querySearchData.type">
                  <el-option
                    v-for="item in isOfNot"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="归属科室">
              <el-input v-model="querySearchData.section" ></el-input>
            </el-form-item>-->
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-card class="cardM">
      <el-row class="btnInfo">
        <el-col :span="18">
          <el-button class='greenStyleBtn' @click="openPersonDialog">设置责任人</el-button>
          <el-button class='redStyleBtn' @click="delSome">批量删除</el-button>
        </el-col>
        <el-col :span="6">
          <!-- <span class="set-item-show" @click="setShowDialog">设置列隐藏/显示</span> -->
        </el-col>
      </el-row>
      <div v-loading="listLoading">
        <el-table
        :header-cell-style="headStyle"
          ref="currentAlertTable"
          :data="qualityManageData"
          resizable
          border
          tooltip-effect="dark"
          @selection-change="strategyAnalysisSelectionChange"
          style="width: 100%"
        >
          <el-table-column  align='center' type="selection" width="55"></el-table-column>
          <el-table-column  align='center' prop="handlerName" label="责任人" width="200"></el-table-column>
          <!-- <el-table-column v-if="lockStateShow" prop="handlerId" label="责任人ID" width="160"></el-table-column> -->
          <el-table-column  align='center' v-if="telShow" prop="handlerPhone" label="责任人电话" width="160"></el-table-column>
          <el-table-column  align='center' v-if="monitorObjShow" prop="apartment" label="归属部门" width="180"></el-table-column>
          <el-table-column  align='center' v-if="systemShow" prop="section" label="归属科室" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column  align='center' fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text"  class="fontColorStyle" size="small" @click="strategyAnalysisRowChange(scope.row)">查看</el-button>
              <el-button type="text"  class="fontColorStyle" size="small" @click.stop="editSingle(scope.row.id)">编辑</el-button>
              <el-button
                class="fontColorStyle"
                type="text"
                size="small"
                @click.stop.native.prevent="delSingle(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          align="right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="allLimitNumber"
          :current-page.sync="currentPage"
          :page-sizes="[5, 10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 设置责任人 -->
    <el-dialog
      id="pHandlerStyleAdd"
      :close-on-click-modal="false"
      :visible.sync="setPersonDialog"
       @closed="aDialogAdd"
      width="60%"
      >
       <el-tabs v-model="activeAdd">
        <el-tab-pane name="first">
          <span slot="label" class="label_pane">设置责任人</span>
          <el-form label-position="right" :model="setPersonData" label-width="120px">
            <!-- <el-row>
              <el-col :span='12'>
                <el-form-item label="归属部门">
                    <el-input></el-input>
                </el-form-item> 
              </el-col>
              <el-col :span='12'>
                <el-form-item label="归属科室">
                    <el-input ></el-input>
                </el-form-item> 
              </el-col>
            </el-row>-->
          
            <el-row>
              <el-col :span="12">
                <el-form-item label="告警选择器" id="pushStrategyAlertStyle">
                  <el-button
                    class='blueStyleBtn'
                    icon="el-icon-share"
                    @click="pushStrategyAlertDown=!pushStrategyAlertDown"
                  ></el-button>
                  <div class="alert-info" v-if="pushStrategyAlertDown">
                    <div class="title">
                      <i></i>告警选择器
                      <el-button
                        @click="pushStrategyAddDomain"
                        icon="el-icon-circle-plus-outline"
                        class='blueStyleBtn'
                        size="mini"
                        circle
                      ></el-button>
                    </div>
                    <el-cascader
                      placeholder="请选择"
                      :options="selectorData"
                      v-model="selectNameAdd"
                      :props="propsSelect"
                    ></el-cascader>
                    <el-form :model="pushStrategyAlertSelertFrom">
                      <el-form-item
                        v-for="(domain,index) in pushStrategyAlertSelertFrom.domains"
                        :key="index"
                      >
                        <el-input v-model="domain.name" disabled class="key-length fontSizeStyle"></el-input>
                        <el-input v-model="domain.value" class="value-length fontSizeStyle"></el-input>
                        <el-button
                          class='redStyleBtn'
                          icon="el-icon-delete"
                          @click.prevent="removepushStrategyDomain(domain)"
                          size="mini"
                          circle
                        ></el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 责任人配置改造 -->
            <el-row>
              <el-col :span='8'>
                <el-card class="leftCard">
                  <el-tabs type="border-card">
                    <el-tab-pane label="责任人">
                      <el-input placeholder="输入关键字进行过滤" v-model="pFilterAdd1"></el-input>
                      <el-tree
                        :data="personAllData"
                        check-strictly
                        accordion
                        show-checkbox
                        node-key="id"
                        :props="defaultPropsArr"
                        :filter-node-method="filterNodeHanlderArrAdd"
                        ref="arrNameSearch"
                        class="personHAdd"
                      ></el-tree>
                    </el-tab-pane>
                  </el-tabs>
                </el-card>
              </el-col>
              <el-col :span='8'>
                <el-button circle class="personAddStyle greenStyleBtn" icon="el-icon-arrow-right" @click="personSetAdd"></el-button>
              </el-col>
              <el-col :span='8'>
                <el-card> 
                    配置的责任人
                    <el-tree
                      :data="personCheckData"
                      :props="defaultPropsArr"
                      default-expand-all
                      :render-content="otherPersonAdd"
                    ></el-tree> 
                </el-card>
              </el-col>
            </el-row>
            <!-- <el-row>
              <h3 class="pTitleStyle">已配置推送角色详情</h3>
              <el-card>
                <div>
                  <span class="contentFontStyle">已选责任人</span>
                  <ul>
                    <li v-for="(item,index) in checkHandlerDataAdd" :key="index">
                      {{item.label}}
                      <i
                        class="el-icon-circle-close redStyle"
                        @click="cutSelectHandlerAdd(item.id)"
                      ></i>
                    </li>
                  </ul>
                </div>
                <br>
              </el-card>
              <h3 class="pTitleStyle">请配置推送角色</h3>
              <el-card>
                <el-row>
                  <div class="userStyle">
                    <el-row type="flex" justify="space-between">
                      <el-col :span="8">
                        <h4>选择其他人</h4>
                      </el-col>
                      <el-col :span="2">
                        <i @click="getHandlerAdd" class="el-icon-success greenStyle"></i>
                      </el-col>
                    </el-row>
                    <br>
                    <el-input placeholder="输入关键字进行过滤" v-model="pFilterAdd1"></el-input>
                    <el-tree
                      :data="personAllData"
                      check-strictly
                      show-checkbox
                      node-key="id"
                      :props="defaultPropsArr"
                      :filter-node-method="filterNodeHanlderArrAdd"
                      ref="arrNameSearch"
                      class="personHAdd"
                    ></el-tree>
                  </div>
                </el-row>
              </el-card>
            </el-row> -->
          </el-form>
        </el-tab-pane>
       </el-tabs>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button class='blueStyleBtn' @click="personAddSave">保存</el-button>
        <el-button class="defaultBtn" @click="setPersonDialog = false">返回</el-button>
      </div>
    </el-dialog>

    <!-- 责任人预览 -->
    <el-dialog  :visible.sync="preDialog" id="preDialog" width="70%">
      <el-tabs v-model="personActive">
        <el-tab-pane label="基本信息" name="first">
          <span slot="label" class="label_pane">责任人预览</span>
          <el-form
            :inline="true"
            :model="personDataYuLan"
            label-position="right"
            label-width="100px"
            size="mini"
            >
            <el-row>
              <el-col :span="12">
                <el-form-item label="责任人">{{personDataYuLan.handlerName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="责任人电话">{{personDataYuLan.handlerPhone}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="责任人邮箱">{{personDataYuLan.handlerEmail}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="归属部门">{{personDataYuLan.apartment}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="归属科室">{{personDataYuLan.section}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="选择器">
                  <div>{{personDataYuLan.bizLineName}}</div>
                  <span v-for="(item,index) in personDataYuLan.selectorName" :key="index">
                    {{item.tagName}} = {{item.value}}
                    <br>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button class="defaultBtn" @click="preDialog = false">返回</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="setPersonDialogEdit"
      width="70%"
      @closed="aDialogEdit"
      id="personEditDialog"
      >
      <el-tabs v-model="activeSearch">
        <el-tab-pane name="first">
			    <span slot="label" class="label_pane">设置责任人</span>
            <el-form label-position="right" :model="setPersonDataEdit" label-width="120px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="告警选择器" id="personAlert">
                    <el-button
                      class='blueStyleBtn'
                      icon="el-icon-share"
                      @click="pushStrategyAlertDownEdit=!pushStrategyAlertDownEdit"
                    ></el-button>
                    <div class="alert-info" v-if="pushStrategyAlertDownEdit">
                      <div class="title">
                        <i></i>告警选择器
                        <el-button
                          id="person-select"
                          @click="pushStrategyDomainEdit"
                          icon="el-icon-circle-plus-outline"
                          class='blueStyleBtn'
                          size="mini"
                          circle
                        ></el-button>
                      </div>
                      <el-cascader
                        placeholder="请选择"
                        :options="selectorData"
                        v-model="selectNameEdit"
                        :props="propsSelect"
                      ></el-cascader>
                      <el-form :model="pushStrategyAlertSelertFromEdit">
                        <el-form-item
                          v-for="(domain,index) in pushStrategyAlertSelertFromEdit.domains"
                          :key="index"
                        >
                          <el-input v-model="domain.name" disabled class="key-length fontSizeStyle"></el-input>
                          <el-input v-model="domain.value" class="value-length fontSizeStyle"></el-input>
                          <el-button
                            class='redStyleBtn'
                            icon="el-icon-delete"
                            @click.prevent="removepushStrategyDomainEdit(domain)"
                            size="mini"
                            circle
                          ></el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 编辑责任人改造 -->
              <el-row>
                <el-col :span='8'>
                  <el-card class="leftCard">
                    <el-tabs type="border-card">
                      <el-tab-pane label="责任人">
                        <el-input placeholder="输入关键字进行过滤" v-model="pFilterEdit"></el-input>
                        <el-tree
                          :data="personAllData"
                          check-strictly
                          show-checkbox
                          node-key="id"
                          :props="defaultPropsArr"
                          :filter-node-method="filterNodeHanlderArrEdit"
                          ref="arrNameEdit"
                          class="personHEdit"
                        ></el-tree>
                      </el-tab-pane>
                    </el-tabs>
                  </el-card>
                </el-col>
                <el-col :span='8'>
                  <el-button circle class="personAddStyle greenStyleBtn" icon="el-icon-arrow-right" @click="personSetEdit"></el-button>
                </el-col>
                <el-col :span='8'>
                  <el-card> 
                      配置的责任人
                      <el-tree
                        :data="personCheckDataEdit"
                        :props="defaultPropsArr"
                        default-expand-all
                        :render-content="otherPersonEdit"
                      ></el-tree> 
                  </el-card>
                </el-col>
              </el-row>
              <!-- <el-row>
                <h3 class="pTitleStyle">已配置推送角色详情</h3>
                <el-card>
                  <div>
                    <span class="contentFontStyle">已选责任人</span>
                    <ul>
                      <li v-for="(item,index) in checkHandlerDataEdit" :key="index">
                        {{item.label}}
                        <i
                          class="el-icon-circle-close redStyle"
                          @click="cutSelectHandlerEdit(item.id)"
                        ></i>
                      </li>
                    </ul>
                  </div>
                  <br>
                </el-card>
                <h3 class="pTitleStyle">请配置推送角色</h3>
                <el-card>
                  <el-row>
                    <div class="userStyle">
                      <el-row type="flex" justify="space-between">
                        <el-col :span="8">
                          <h4>选择其他人</h4>
                        </el-col>
                        <el-col :span="2">
                          <i @click="getHandlerEdit" class="el-icon-success greenStyle"></i>
                        </el-col>
                      </el-row>
                      <br>
                      <el-input placeholder="输入关键字进行过滤" v-model="pFilterEdit"></el-input>
                      <el-tree
                        :data="personAllData"
                        check-strictly
                        show-checkbox
                        node-key="id"
                        :props="defaultPropsArr"
                        :filter-node-method="filterNodeHanlderArrEdit"
                        ref="arrNameEdit"
                        class="personHEdit"
                      ></el-tree>
                    </div>
                  </el-row>
                </el-card>
              </el-row> -->
            </el-form>
        </el-tab-pane>
       </el-tabs>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button class='blueStyleBtn' @click="personEditSave">保存</el-button>
        <el-button class="defaultBtn" @click="setPersonDialogEdit = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//  import treeTransfer from 'el-tree-transfer'
import treeTransfer from "@/components/treeTransfer/transfer-extend";
import * as service from "@/modules/mms/api/qualityModule.js";
import * as encodeMethods from "@/modules/mms/untils/encodeurl.js";
export default {
  name: "qualityManage",
  data() {
    return {
      activeAdd:'first',
      activeEdit:'first',
      activeSearch:'first',
      headStyle: {
        'background-color': '#F4F8F9',
        'color': 'rgba(0,0,0,0.60)',
      },
      checkHandlerDataSearch: [],
      checkHandlerDataEdit: [],
      checkHandlerDataAdd: [],
      //分页
      pageAllFlag: true, //如果是所有数据分页,则为true fenye
      personParams: {}, //查询 深拷贝数据
      allLimitNumber: 10, //所有分页每一页的条数
      totalPage: 0, //总页数
      currentPage: 1, //当前页

      setPersonDialog: false,
      listLoading: true,
      formInline: {
        user: "",
        region: ""
      },
      lockStateShow: true,
      monitorObjShow: true,
      systemShow: true,
      telShow: true,
      qualityManageData: [],
      mode: "addressList",
      title: ["责任人选择", "责任人类型选择:主要", "责任人类型选择:次要"],
      fromData: [
        {
          id: "1",
          pid: 0,
          label: "一级 1",
          children: [
            {
              id: "1-1",
              pid: "1",
              label: "二级 1-1",
              children: []
            },
            {
              id: "1-2",
              pid: "1",
              label: "二级 1-2",
              children: [
                {
                  id: "1-2-1",
                  pid: "1-2",
                  children: [],
                  label: "二级 1-2-1"
                },
                {
                  id: "1-2-2",
                  pid: "1-2",
                  children: [],
                  label: "二级 1-2-2"
                }
              ]
            }
          ]
        }
      ],
      toData: [],
      preDialog: false,
      form: {
        name: "",
        region: ""
      },
      //------------------
      alertSelectShow:false,
      ruleDown: false,
      alertDown: false,
      pushStrategyAlertDown: false,
      alertSelertFrom: {
        domains: []
      },
      strategyAnalysisSelection: [],
      personActive: "first",
      pushStrategyAlertDown: false,
      pushStrategyAlertSelertFrom: {
        domains: []
      },
      personAdd: [], //新增 责任人
      personAllData: [], //所有的责任人
      personCheckData: [], //选中的责任人
      setPersonData: {},
      personDataYuLan: {},
      selectNameAdd: [], //告警选择器
      selectNameEdit: [],
      selectNameSearch: [],
      selectorData: [],
      selectFlagEdit: true,
      selectFlagSearch: true,
      selectFlagAdd: true,
      //-------编辑
      personCheckDataEdit:[],//选中的责任人
      personSingleIdEdit:'',
      personEditId:'',
      setPersonDialogEdit: false,
      pushStrategyAlertDownEdit: false,
      pushStrategyAlertSelertFromEdit: {
        domains: []
      },
      personEdit: [], //编辑 责任人
      currentPersonEdit: [], //当前责任人
      setPersonDataEdit: {},
      personEditSaveData: {}, //编辑责任人保存数据
      //查询所有
      querySearchData: {
        name: ""
      },
      //遍历
      isOfNot: [
        {
          label: "是",
          value: "是"
        },
        {
          label: "否",
          value: "否"
        }
      ],
      pFilterAdd1: "",
      pFilterEdit: "",
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
      bizLineCodeSearch: "",
      bizLineCodeAdd: "",
      bizLineCodeEdit: ""
    };
  },
  methods: {
    nameSearch() {
      this.querySearchData.name = this.querySearchData.name.replace(
        /[^\w\u4E00-\u9FA5]/g,
        ""
      );
    },
    //新增 - 选择到的责任人
    getHandlerAdd() {
      this.checkHandlerDataAdd = this.$refs.arrNameSearch.getCheckedNodes();
    },
    cutSelectHandlerAdd(id) {
      this.checkHandlerDataAdd = this.checkHandlerDataAdd.filter(val => {
        return val.id != id;
      });
    },
    getHandlerEdit() {
      this.checkHandlerDataEdit = this.$refs.arrNameEdit.getCheckedNodes();
    },
    cutSelectHandlerEdit(id) {
      this.checkHandlerDataEdit = this.checkHandlerDataEdit.filter(val => {
        return val.id != id;
      });
    },
    getReturnNode(node,_array,value){
      let isPass = node.data &&  node.data.label && node.data.label.indexOf(value) !== -1;
      isPass?_array.push(isPass):'';
      this.index++;
      console.log(this.index)
      if(!isPass && node.level!=1 && node.parent){
        this.getReturnNode(node.parent,_array,value);
      }
    },
    filterNodeHanlderArrAdd(value, data,node) {
        if(!value){
        return true;
      }
      let level = node.level;
      let _array = [];//这里使用数组存储 只是为了存储值。
      this.getReturnNode(node,_array,value);
      let result = false;
      _array.forEach((item)=>{
        result = result || item;
      });
      return result;
    },
    filterNodeHanlderArrEdit(value, data,node) {
        if(!value){
        return true;
      }
      let level = node.level;
      let _array = [];//这里使用数组存储 只是为了存储值。
      this.getReturnNode(node,_array,value);
      let result = false;
      _array.forEach((item)=>{
        result = result || item;
      });
      return result;
    },
    aDialogAdd() {
       console.log(this.$refs.arrNameSearch.defaultExpandAll);
      this.$refs['arrNameSearch'].setCheckedKeys([]);
    },
    aDialogEdit() {
      this.$refs['arrNameEdit'].setCheckedKeys([]);
    },
    // 监听穿梭框组件添加
    add(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
    // 监听穿梭框组件移除
    remove(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
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
      /* if(this.selectNameSearch){
        //[key:value] 
        if(this.alertSelertFrom.domains.length){
          this.alertSelertFrom.domains.forEach(val=>{
            if (this.selectNameSearch == val.key) {
             
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              })
              this.selectFlag= false;
            }else{
              console.log('true');
              this.selectFlag=true;
            }
          })
          if(this.selectFlag){
              let backName='';
              this.selectorData.forEach(val=>{
                if(val.key== this.selectNameSearch){
                  backName = val.name
                }
              })
              this.alertSelertFrom.domains.push({
                key: this.selectNameSearch,
                value: "",
                name:backName
              });
            }
        }else{
          console.log('没有长度');
          let backName='';
            this.selectorData.forEach(val=>{
              if(val.key== this.selectNameSearch){
                backName = val.name
              }
            })
            this.alertSelertFrom.domains.push({
              key: this.selectNameSearch,
              value: "",
              name:backName
            });
        }
      }else{
        this.$message({
          message: "请选择告警选择器",
          type: "error"
        })
      } */
    },
    removeDomain(item) {
      var index = this.alertSelertFrom.domains.indexOf(item);
      if (index !== -1) {
        this.alertSelertFrom.domains.splice(index, 1);
      }
    },
    strategyAnalysisSelectionChange(val) {
      this.strategyAnalysisSelection = val;
    },
    //编辑
    editSingle(id) {
      this.pushStrategyAlertDownEdit = false;
      this.setPersonDialogEdit = true;
      this.personEdit = [];
      this.pushStrategyAlertSelertFromEdit.domains = [];
      this.personEditId='';
      this.personCheckDataEdit=[];
      this.personSingleIdEdit=id; 
      service.singlePersonDataService(id).then(res => {
        let dataObj = res.data;
        this.personEditId=dataObj.handlerId;
        //已选责任人
        //[1,2]
        let arr=[];
        this.personAllData.forEach(val2=>{
          val2.member.forEach(val3=>{
            if(val3.userId==this.personEditId){
               arr.push({label:val2.label,id:val2.deptId,member:[val3]})
            }
          })
        })
        let newArr=[];
        let obj={};
        for(let i=0,len=arr.length;i<len;i++){
          if(obj[arr[i].id]){
            //此时数组里面有这个值了,根据id添加member
            newArr.forEach(val=>{
              if(val.id==obj[arr[i].id]){
                val.member.push(arr[i].member[0])
              }
            })
          }else{
            obj[arr[i].id]=arr[i].id;
            newArr.push(arr[i])
          }
        }
        this.personCheckDataEdit=newArr;

        this.bizLineCodeEdit = res.data.bizLineCode;
        this.selectNameEdit = [];
        let xzq = res.data.selector;
        xzq.forEach(res => {
          //等号分割
          let arr1 = res.split("=");
          //[ "bizSys,sys34"]
          //要通过第一个key id去查找名字
          let backName = "";
          let bizName = "";
          let regInfoEdit = '';

          this.selectorData.forEach(val => {
            if (this.bizLineCodeEdit == val.key) {
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
          this.pushStrategyAlertSelertFromEdit.domains.push({
            key: arr1[0],
            value: arr1[1],
            name: bizName + "/" + backName,
            reg:regInfoEdit
          });
        });
      });
    },
    //编辑保存
    personEditSave() {
     if(this.personCheckDataEdit.length){
        let len=0;
        this.personCheckDataEdit.forEach(val=>{
          len+=val.member.length;
        })
        console.log(len);
        if(len>1){
          this.$message({
            message: "目前只能选择一位责任人",
            type: "error"
          });
          return;
        }else if(len==0){
          this.$message({
            message: "请选择责任人",
            type: "error"
          });
          return;
        }
      }else{//右边为空
        this.$message({
            message: "请选择责任人",
            type: "error"
          });
          return;
      }
      if(!this.pushStrategyAlertSelertFromEdit.domains.length){
        this.$message({
          message: "请填写告警选择器",
          type: "error"
        });
        return;
      }
      const inputDataAdd = this.pushStrategyAlertSelertFromEdit.domains;
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
        this.personEditSaveData.selector = arr;
      }
      this.personEditSaveData.bizLineCode = this.bizLineCodeEdit;
      //所有责任人
      // console.log('---------');
      console.log(this.personCheckDataEdit);
      this.personEditSaveData.handlerName = this.personCheckDataEdit[0].member[0].userName;
      this.personEditSaveData.handlerId = this.personCheckDataEdit[0].member[0].userId;
      
      //id
       this.personEditSaveData.id = this.personSingleIdEdit;

      service.editPersonService(this.personEditSaveData).then(res => {
        this.$message({
          message: "编辑成功",
          type: "success"
        });
        this.getQualityData(this.currentPage);
        this.setPersonDialogEdit = false;
      });
      console.log(this.personEditSaveData);
    },
    //删除单个
    delSingle(id) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          service.delSinglePersonService(id).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.currentPage=1;
            this.getQualityData(1);
          });
        })
        .catch(() => {});
    },
    //批量删除
    delSome() {
      if (this.strategyAnalysisSelection.length) {
        this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let ids = [];
          this.strategyAnalysisSelection.forEach(val => {
            ids.push(val.id);
          });
          let params = {
            id: ids.join(",")
          };
          service
            .delSomePersonService(params)
            .then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.currentPage=1;
              this.getQualityData(1);
            })
            .catch(() => {});
        });
      } else {
        this.$message({
          message: "请选择数据",
          type: "error"
        });
      }
    },
    //预览
    strategyAnalysisRowChange(row) {
      this.preDialog = true;
      service.singlePersonDataService(row.id).then(res => {
        this.personDataYuLan = res.data;
      });
    },
    //查询所有
    getQualityData(page) {
      let params = {
        start: (page - 1) * this.allLimitNumber,
        limit: this.allLimitNumber
      };
      service.qualityAllDataService(params).then(res => {
        console.log(res.data);
        this.listLoading=false;
        this.qualityManageData = res.data;
        this.totalPage = res.count;
      });
    },
    //重置
    personReset() {
      
      this.alertDown = false;
      this.selectNameSearch = [];
      this.querySearchData = {
        name: ""
      };
      this.alertSelertFrom = {
        domains: []
      };
      this.pageAllFlag = true;
      // this.listLoading=true;
      // this.currentPage = 1;
      // this.getQualityData(1);
    },
    //条件查询
    querySearchDataMethod(startPage, flag) {
      this.listLoading=true;
      console.log(this.alertSelertFrom);
      this.pageAllFlag = false;
      if (flag) {
        this.currentPage = 1;
        if (this.alertSelertFrom.domains.length) {
          const inputDataAdd = this.alertSelertFrom.domains;
          const obj = {};
          if (inputDataAdd.length) {
            inputDataAdd.forEach(res => {
              var kk = res.key;
              obj[kk] = res.value;
            });
          }
          // this.querySearchData.selector =  encodeMethods.encode(obj).join(',')
          this.querySearchData.selector = encodeURIComponent(
            encodeMethods.encode(obj).join(",")
          );
        } else {
          this.querySearchData.selector = "";
        }
        console.log(this.querySearchData);
        this.personParams = JSON.parse(JSON.stringify(this.querySearchData));
        console.log(this.personParams);
      }
      this.personParams.start = (startPage - 1) * this.allLimitNumber;
      this.personParams.limit = this.allLimitNumber;
      let params = encodeMethods.objToStr(this.personParams);
      console.log(params);
      service.qualityAllDataServiceSingle(params).then(res => {
        this.qualityManageData = res.data;
        this.totalPage = res.count;
        this.listLoading=false;
      });
    },
    //分页
    handleCurrentChange(val) {
      this.listLoading=true;
      this.currentPage = val;
      if (this.pageAllFlag) {
        //如果查询所有的数据
        this.getQualityData(val);
      } else {
        //如果是查询参数的数据
        this.querySearchDataMethod(val, false);
      }
    },
    handleSizeChange(val) {
      this.listLoading=true;
      this.allLimitNumber = val;
      this.currentPage = 1;
      if (this.pageAllFlag) {
        //如果查询所有的数据
        this.getQualityData(1);
      } else {
        //如果是查询参数的数据
        this.querySearchDataMethod(1, false);
      }
    },
    //------------新增------------------------------
    //新增告警选择器
    removepushStrategyDomain(item) {
      var index = this.pushStrategyAlertSelertFrom.domains.indexOf(item);
      if (index !== -1) {
        this.pushStrategyAlertSelertFrom.domains.splice(index, 1);
      }
    },
    pushStrategyAddDomain() {
      if (this.selectNameAdd.length) {
        //[key:value]
        //第一次
        if (this.pushStrategyAlertSelertFrom.domains.length) {
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
          this.pushStrategyAlertSelertFrom.domains.forEach(val => {
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
              let regInfo ='';
            this.selectorData.forEach(val => {
              if (val.key == this.bizLineCodeAdd) {
                if (val.tags) {
                  val.tags.forEach(value => {
                    if (value.key == this.selectNameAdd[1]) {
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
            this.pushStrategyAlertSelertFrom.domains.push({
              key: backNameKey,
              value: "",
              name: backName,
              reg:regInfo
            });
          }
        } else {
          console.log("没有长度");
          this.bizLineCodeAdd = this.selectNameAdd[0];

          let backName = "";
          let backNameKey = "";
           let regInfo ='';
          this.selectorData.forEach(val => {
            if (val.key == this.bizLineCodeAdd) {
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == this.selectNameAdd[1]) {
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
          this.pushStrategyAlertSelertFrom.domains.push({
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
    //编辑告警选择器
    removepushStrategyDomainEdit(item) {
      var index = this.pushStrategyAlertSelertFromEdit.domains.indexOf(item);
      if (index !== -1) {
        this.pushStrategyAlertSelertFromEdit.domains.splice(index, 1);
      }
    },
    pushStrategyDomainEdit() {
      if (this.selectNameEdit.length) {
        //[key:value]
        //第一次
        if (this.pushStrategyAlertSelertFromEdit.domains.length) {
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
          this.pushStrategyAlertSelertFromEdit.domains.forEach(val => {
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
             let regInfo ='';
            this.selectorData.forEach(val => {
              // this.bizLineCodeEdit = val.key;
              if (val.key == this.bizLineCodeEdit) {
                if (val.tags) {
                  val.tags.forEach(value => {
                    if (value.key == this.selectNameEdit[1]) {
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
            this.pushStrategyAlertSelertFromEdit.domains.push({
              key: backNameKey,
              value: "",
              name: backName,
               reg:regInfo
            });
          }
        } else {
          console.log("没有长度");
          this.bizLineCodeEdit = this.selectNameEdit[0];

          let backName = "";
          let backNameKey = "";
           let regInfo ='';
          this.selectorData.forEach(val => {
            if (val.key == this.bizLineCodeEdit) {
              if (val.tags) {
                val.tags.forEach(value => {
                  if (value.key == this.selectNameEdit[1]) {
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
          this.pushStrategyAlertSelertFromEdit.domains.push({
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
      /* if(this.selectNameEdit){
        //[key:value] 
        if(this.pushStrategyAlertSelertFromEdit.domains.length){
          this.pushStrategyAlertSelertFromEdit.domains.forEach(val=>{
            if (this.selectNameEdit == val.key) {
              console.log(11);
              this.$message({
                message: "不能重复选择选择器",
                type: "error"
              })
              this.selectFlagEdit= false;
            }else{
              console.log('true');
              this.selectFlagEdit=true;
            }
          })
          if(this.selectFlagEdit){
              console.log(22);
              let backName='';
              this.selectorData.forEach(val=>{
                if(val.key== this.selectNameEdit){
                  backName = val.name
                }
              })
              this.pushStrategyAlertSelertFromEdit.domains.push({
                key: this.selectNameEdit,
                value: "",
                name:backName
              });
            }
        }else{
          console.log('没有长度');
          let backName='';
            this.selectorData.forEach(val=>{
              if(val.key== this.selectNameEdit){
                backName = val.name
              }
            })
            this.pushStrategyAlertSelertFromEdit.domains.push({
              key: this.selectNameEdit,
              value: "",
              name:backName
            });
        }
      }else{
        this.$message({
          message: "请选择告警选择器",
          type: "error"
        })
      } */
    },
    filterMethodAdd(query, item) {
      return item.label.indexOf(query) > -1;
    },
    filterMethodEdit(query, item) {
      return item.label.indexOf(query) > -1;
    },
    openPersonDialog() {
      this.setPersonDialog = true;
      //重置数据
      this.personCheckData=[];
      this.selectNameAdd=[];
      this.personAdd = [];
      this.pushStrategyAlertSelertFrom = {
        domains: []
      };
      this.pushStrategyAlertDown = false;
    },
    //新增责任人
    personAddSave() {
      console.log('-------');
      console.log(this.personCheckData);
      if(this.personCheckData.length){
        let len=0;
        this.personCheckData.forEach(val=>{
          len+=val.member.length;
        })
        console.log(len);
        if(len>1){
          this.$message({
            message: "目前只能选择一位责任人",
            type: "error"
          });
          return;
        }else if(len==0){
          this.$message({
            message: "请选择责任人",
            type: "error"
          });
          return;
        }
      }else{//右边为空
        this.$message({
            message: "请选择责任人",
            type: "error"
          });
          return;
      }
      //告警选择器------------处理
      const inputDataAdd = this.pushStrategyAlertSelertFrom.domains;
      const obj = {};
      if (inputDataAdd.length) {
        // inputDataAdd.forEach(res => {
        //   var kk = res.key;
        //   obj[kk] = res.value;
        // });
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
        this.setPersonData.selector = arr;
      }else{
        this.$message({
            message: "选择器不能为空",
            type: "error"
          });
          return;
      }

      this.setPersonData.handlerName = this.personCheckData[0].member[0].userName;
      this.setPersonData.handlerId = this.personCheckData[0].member[0].userId;
      
      
      if (this.bizLineCodeAdd) {
        this.setPersonData.bizLineCode = this.bizLineCodeAdd;
      } else {
        this.setPersonData.bizLineCode = "";
      }

      service.addPersonDataService(this.setPersonData).then(res => {
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.currentPage=1;
        this.setPersonDialog = false;
        this.getQualityData(1);
      });
      // console.log(this.setPersonData);
    },
    //-----------所有责任人
    getAllPersonData() {
      service.allPersonDataService().then(res => {
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
        this.personAllData = arr;
      });
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
    // 新增配置责任人kk
    otherPersonAdd(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              class="btnAddStyle"
              type="text"
              icon="el-icon-error"
              on-click={() => this.delOtherPersonAdd(node, data)}
            />
          </span>
        </span>
      );
    },
    // 删除已配置的责任人
    delOtherPersonAdd(node, data){
      if(node.childNodes.length){
        //父节点
        this.personCheckData=this.personCheckData.filter(val=>{
          return val!=data
        })
      }else{
        //子节点
        //父节点但是没有子元素了
        if(node.data.member){
          this.personCheckData=this.personCheckData.filter(val=>{
            return val!=data
          })
        }else{
          //有父节点
          this.personCheckData=this.personCheckData.filter(val=>{
            val.member=val.member.filter(item=>{
              return item !=data
            })
            return true;
          })
        }
      }
    },
    //新增选择的责任人
    personSetAdd(){
      let choseOtherArr = this.$refs.arrNameSearch.getCheckedNodes();
      console.log(choseOtherArr);
      //点击后新增责任人到其他人
      //根据这个数据遍历 
      let arr=[]
      
       if(choseOtherArr.length){
         choseOtherArr.forEach(val1=>{
           this.personAllData.forEach(val2=>{
             val2.member.forEach(val3=>{
               if(val3==val1){
                arr.push({label:val2.label,id:val2.deptId,member:[val3]})
               }
             })
           })
         })
       }
        console.log(arr);
        //把arr重复的项进行合并
        let newArr=[];
        let obj={};
        for(let i=0,len=arr.length;i<len;i++){
          if(obj[arr[i].id]){
            //此时数组里面有这个值了,根据id添加member
            newArr.forEach(val=>{
              if(val.id==obj[arr[i].id]){
                val.member.push(arr[i].member[0])
              }
            })
          }else{
            obj[arr[i].id]=arr[i].id;
            newArr.push(arr[i])
          }
        }
        
        console.log(newArr);
        this.personCheckData=newArr
    },
    //编辑选则责任人按钮
    personSetEdit(){
      let choseOtherArr = this.$refs.arrNameEdit.getCheckedNodes();
      console.log(choseOtherArr);
      //点击后新增责任人到其他人
      //根据这个数据遍历 
      let arr=[]
      
       if(choseOtherArr.length){
         choseOtherArr.forEach(val1=>{
           this.personAllData.forEach(val2=>{
             val2.member.forEach(val3=>{
               if(val3==val1){
                arr.push({label:val2.label,id:val2.deptId,member:[val3]})
               }
             })
           })
         })
       }
        console.log(arr);
        //把arr重复的项进行合并
        let newArr=[];
        let obj={};
        for(let i=0,len=arr.length;i<len;i++){
          if(obj[arr[i].id]){
            //此时数组里面有这个值了,根据id添加member
            newArr.forEach(val=>{
              if(val.id==obj[arr[i].id]){
                val.member.push(arr[i].member[0])
              }
            })
          }else{
            obj[arr[i].id]=arr[i].id;
            newArr.push(arr[i])
          }
        }
        
        console.log(newArr);
        this.personCheckDataEdit=newArr
    },
    // 新增配置责任人
    otherPersonEdit(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              class="btnAddStyle"
              type="text"
              icon="el-icon-error"
              on-click={() => this.delOtherPerson(node, data)}
            />
          </span>
        </span>
      );
    },
    // 删除已配置的责任人
    delOtherPerson(node, data){
      if(node.childNodes.length){
        //父节点
        this.personCheckDataEdit=this.personCheckDataEdit.filter(val=>{
          return val!=data
        })
      }else{
        //子节点
        //父节点但是没有子元素了
        if(node.data.member){
          this.personCheckDataEdit=this.personCheckDataEdit.filter(val=>{
            return val!=data
          })
        }else{
          //有父节点
          this.personCheckDataEdit=this.personCheckDataEdit.filter(val=>{
            val.member=val.member.filter(item=>{
              return item !=data
            })
            return true;
          })
        }
      }
    },
  },
  watch: {
    pFilterAdd1(val) {
      this.$refs.arrNameSearch.filter(val);
    },
    pFilterEdit(val) {
      this.$refs.arrNameEdit.filter(val);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.selectSearch();
    this.getQualityData(1);
    this.getAllPersonData();
  },
  destroyed () {//离开该页面需要移除这个监听的事件
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: { treeTransfer }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  .isFixed{
    position:fixed !important;
    top:59px;
    z-index:999;
  }
  padding: 10px;
  .cardM {
    margin-top: 5px;
    .btnInfo{
      margin-bottom: 10px;
    }
  }
  .quality-manage-info {
    .btnInfo {
      margin: 10px;
    }
    .el-input {
      width: 160px;
    }
    .set-item-show {
      color: skyblue;
      font-size: 12px;
      vertical-align: bottom;
      cursor: pointer;
    }
    #preForm {
      .el-select {
        width: 185px;
      }
      .el-date-editor {
        width: 234px;
      }
    }

    #quality-manage-btn {
      padding-left: 20px;
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
    #alertStyle {
      .alert-info {
        position: absolute;
        z-index: 998 !important;
        margin-top: 5px;
        padding: 5px;
        width: 260px;
        background-color: white;
        box-shadow: 0px 0px 2px #3a8ee6;
        .alertStyle {
          .el-form-item {
            margin-bottom: 0;
          }
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
        .el-select {
          width: 206px;
        }
        .key-length {
          width: 98px;
        }
        .value-length {
          width: 104px;
        }

        .el-form-item {
          margin-top: 8px;
        }
      }
    }
  }
  // .pre-alert-info {
  //   .btnInfo {
  //     margin: 10px 0;
  //   }
  //   .set-item-show {
  //     color: skyblue;
  //     font-size: 12px;
  //     vertical-align: bottom;
  //     cursor: pointer;
  //   }
  //   #preForm {
  //     .el-select {
  //       width: 185px;
  //     }
  //     .el-date-editor {
  //       width: 185px;
  //     }
  //   }

  //   #pre-alertbtn {
  //     padding-left: 200px;
  //   }

  //   #myChart {
  //     z-index: 998;
  //   }
  //   .circle {
  //     display: inline-block;
  //     width: 10px;
  //     height: 10px;
  //     box-sizing: border-box;
  //     background-color: red;
  //     // border: 2px solid red;
  //     border-radius: 50%;
  //   }
  // }
  #pushStrategyAlertStyle {
    .alert-info {
      position: absolute;
      z-index: 998 !important;
      margin-top: 5px;
      padding: 5px;
      width: 336px;
      background-color: white;
      box-shadow: 0px 0px 2px #3a8ee6;
      .el-input,
      .el-select {
        width: 274px;
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
      .key-length {
        width: 120px;
      }
      .value-length {
        width: 150px;
      }
      #select-add {
        margin-left: 198px;
      }
      .el-form-item {
        margin-top: 8px;
      }
      .el-date-editor {
        width: 208px;
      }
    }
  }
  #personEditDialog {
    #personAlert {
      .alert-info {
        position: absolute;
        z-index: 998 !important;
        margin-top: 5px;
        padding: 5px;
        width: 336px;
        background-color: white;
        box-shadow: 0px 0px 2px #3a8ee6;
        .el-input {
          width: 208px;
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
        .key-length {
          width: 120px;
        }
        .value-length {
          width: 150px;
        }
        #person-select {
          margin-left: 198px;
        }
        .el-form-item {
          margin-top: 8px;
        }
        .el-date-editor {
          width: 208px;
        }
      }
    }
  }
}
/deep/ #preDialog label.el-form-item__label {
  margin-right: 50px;
}
/deep/.dashboard-container .el-tabs__content {
  overflow: visible;
  .el-tab-pane {
    margin-top: 10px;
  }
}
/deep/ .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .btnAddStyle {
    color: #f56c6c;
  }
}
//推送新增配置责任人
#pHandlerStyleAdd,
#personEditDialog {
  .el-cascader{
    width: 274px;
  }
  .pTitleStyle {
    margin: 10px 0;
    font-weight: none;
    font-size: 14px;
    color: #606266;
  }
  .contentFontStyle {
    font-size: 14px;
    color: #606266;
  }
  .userStyle {
    padding: 20px;
    width: 280px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    .personHAdd {
      height: 300px;
      overflow: auto;
    }
  }
  .leftCard{
    // width: 300px;
    height: 500px;
    overflow: auto;
  }
  .personAddStyle {
    margin: 200px auto;
    display: block;
  }
}
.greenStyle {
  color: #67c23a;
}
.blueStyle {
  color: #409eff;
}
.redStyle {
  color: #f56c6c;
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
</style>
