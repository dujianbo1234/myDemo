<template>
  <div class="eventInfluence-container">
    <el-card>
      <el-form
        :inline="true"
        :model="eventInfluenceConditions"
        label-position="right"
        label-width="100px"
        size="small"
        id="eventInfluence"
      >
        <el-row>
          <el-col :span="6">
            <el-input v-model="area" placeholder="请输入影响性区域"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="customer" placeholder="请输入影响客户"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button class='blueStyleBtn' @click="getEventSingleData(1,true)">查询</el-button>
            <el-button class='defaultBtn' @click="eventReset">重置</el-button>
            <span class="btn_set" @click="searchItemDown" v-show="!searchItemShow">
                <i class="el-icon-d-arrow-right btn_rote" style="color: #42B983;"></i>
             </span>
            <span class="btn_set" @click="searchItemDown" v-show="searchItemShow">
                <i class="el-icon-d-arrow-right btn_rote1" style="color: #42B983;"></i>
             </span>
          </el-col>
        </el-row>
        <el-row   v-show="searchItemShow" class="searchTop" type="flex" justify="space-between">
          <el-col :span="6">
            <el-input v-model="system" placeholder="请输入影响系统"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input  v-model="serviceLeavel" placeholder="请输入服务级别"></el-input>
          </el-col>
          <el-col :span="6">
            <el-select v-model="eventInfluenceConditions.degree" placeholder="请选择事件影响度" clearable>
              <el-option
                v-for="item in eventLeavel"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input  v-model="eventInfluenceConditions.founder" placeholder="请输入创建人"></el-input>
          </el-col>
        </el-row>
        <el-row  v-show="searchItemShow" class="searchTop">
          <el-col :span='6'>
            <el-date-picker
              v-model="aTimeStartSearch"
              unlink-panels
              type="datetimerange"
              value-format="yyyyMMddHHmmss"
              :default-time="['00:00:00', '23:59:59']"
              start-placeholder="创建开始日期"
              end-placeholder="创建结束日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-select v-model="eventInfluenceConditions.enable" clearable placeholder="请选择启停状态">
              <el-option
                v-for="item in stopOrStart"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
		  
        </el-row>
      </el-form>
    </el-card>
    <el-card class="event-container">
      <el-row class="btnInfo" type="flex" justify="space-between">
        <el-col :span="6">
          <el-button class='greenStyleBtn' @click="eventAdd">新增</el-button>
          <el-button class='redStyleBtn' @click="bitchDel">批量删除</el-button>
        </el-col>
        <el-col :span="3">
          <!-- <span class="set-item-show">设置列隐藏/显示</span> -->
        </el-col>
      </el-row>
      <el-table
         resizable
          border
        :header-cell-style="headStyle"
        v-loading="tableLoading"
        ref="eventInfluenceTable"
        :data="eventInfluenceTableData"
        @selection-change="eventSelectChange"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column  align="center" type="selection" :selectable="checkboxT" width="55"></el-table-column>
        <el-table-column  align="center" prop="name" label="名称" width="160"></el-table-column>
        <el-table-column  align="center" prop="alias" label="别名" width="180"></el-table-column>
        <el-table-column  align="center" prop="founder" label="创建人" width="100"></el-table-column>
        <!-- <el-table-column prop="id" label="ID" width="210"></el-table-column> -->
        <el-table-column  align="center" prop="priority" label="优先级" width="80"></el-table-column>
        <el-table-column  align="center" label="影响程度" width="100">
          <template slot-scope="scope">{{scope.row.degree | eventLeavel}}</template>
        </el-table-column>
        <el-table-column  align="center" label="事件启停" width="100">
            <template slot-scope="scope">
               <el-button  v-if="!scope.row.enable" el-button type="text" size="small" @click.stop="aStart(scope.row)">
                  <el-tooltip content="启动" placement="top" effect="light" class="item">
                    <span class="iconfont" style="color: rgba(95,195,150,1);">&#xe603;</span>
                  </el-tooltip>
              </el-button>
              <el-button   v-if="scope.row.enable" el-button type="text" size="small" @click.stop="aEnd(scope.row)">
                  <el-tooltip class="item" effect="light" content="停止" placement="top">
                    <span class="iconfont" style="color: rgba(247, 8, 56,1);">&#xe60a;</span>
                  </el-tooltip>
              </el-button>
            </template>
        </el-table-column>
        <el-table-column  align="center" prop="desc" label="策略描述" show-overflow-tooltip></el-table-column>
        <el-table-column  align="center" prop="expression" label="分析表达式" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column  align="center" label="创建时间" width="180" >
          <template slot-scope="scope">{{scope.row.createTime | strToDataFromat}}</template>
        </el-table-column>
        <el-table-column  align="center" label="生效时间" width="180" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.startTime | strToDataFromat}} 至 {{scope.row.endTime | strToDataFromat}}</template>
        </el-table-column>
        <el-table-column  align="center" fixed="right" label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="fontColorStyle" @click="eventInfluenceInfo(scope.row)">查看</el-button>
            <el-button type="text" size="small" class="fontColorStyle" @click.stop="eventEdit(scope.row.id,scope.row.enable)">编辑</el-button>
            <el-button type="text" size="small" class="fontColorStyle" @click.stop.native.prevent="deleteRow(scope.row.id,scope.row.enable)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        align="right"
        @size-change="eventSizeChange"
        @current-change="eventPageChange"
        :page-size="allLimitNumber"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      ></el-pagination>
    </el-card>
    <!-- 新增模态框 -->
    <el-dialog  :visible.sync="eventAddDialog" width="40%" class="eventAddDialog"  :close-on-click-modal="false">
      <el-tabs v-model="activeAdd">
        <el-tab-pane  name="first">
          <span slot="label" class="label_pane">影响性分析</span>
          <el-form :model="eventAddForm" label-position="right" label-width="100px" size="small">
            <el-form-item label="名称">
              <el-input v-model="eventAddForm.name" @keyup.native="nameAdd" placeholder="请输入事件标题(英文)"></el-input>
            </el-form-item>
            <el-form-item label="别名">
              <el-input v-model="eventAddForm.alias" @keyup.native="aAliasAdd" placeholder="请输入别名(中文)"></el-input>
            </el-form-item>
            <el-form-item label="策略描述" class="expreesionStyle">
              <el-input type="textarea" rows="4" v-model="eventAddForm.desc" placeholder="请进行详细描述"></el-input>
            </el-form-item>
            <el-form-item label="告警选择器">
              <el-cascader
                placeholder="请选择告警选择器"
                :options="ruleData"
                v-model="selectNameAdd"
                :props="propsSelect"
              ></el-cascader>
              <el-button
                @click="addDomainDialog"
                icon="el-icon-circle-plus-outline"
                class='blueStyleBtn'
                size="mini"
                circle
              ></el-button>
              <el-form :model="alertSelectAddFrom" id="alertSelectAddItem">
                <el-form-item v-for="(domain,index) in alertSelectAddFrom.domains" :key="index">
                  <el-input v-model="domain.name" disabled class="key-length fontSizeStyle"></el-input>
                  <el-input v-model="domain.value" class="value-length fontSizeStyle"></el-input>
                  <el-button
                    class='redStyleBtn'
                    icon="el-icon-delete"
                    @click.prevent="removeDomainDialog(domain)"
                    size="mini"
                    circle
                  ></el-button>
                </el-form-item>
              </el-form>
            </el-form-item>
            <el-form-item label="分析表达式" class="expreesionStyle">
              <el-input
                type="textarea"
                rows="4"
                v-model="eventAddForm.expression"
                placeholder="例 (影响区域=='北京') || (服务级别=='高')"
              ></el-input>
              <el-popover
                placement="right"
                width="300"
                trigger="click"
              >
                <h3>表达式字段:</h3>
                <ul>
                  <li>服务级别:service_level</li>
                  <li>影响系统:influence_system</li>
                  <li>影响区域:influence_area</li>
                  <li>影响客户:influence_customer</li>
                </ul>
                <br>
                <h3>表达式符号: && ||</h3>
                <br>
                <h3>表达式的值使用: ''(单引号) 或者 ""(双引号)</h3>
                <span slot="reference" class="seeWarn">
                  <i class="el-icon-warning"></i>
                </span>
                <br>
                <h3>示例:</h3>
                <!-- <p>service_level=='aa'&&influence_system=='bb'&&(influence_area=='cc'||influence_customer=='dd')</p> -->
                <p>service_level=='aa'&&influence_system=='bb'</p>
              </el-popover>
            </el-form-item>
            <el-form-item label="生效时间">
              <el-date-picker
                 v-model="aTimeAdd"
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
            <el-form-item label="影响程度">
              <el-select v-model="eventAddForm.degree" placeholder="请选择影响程度">
                <el-option
                  v-for="item in eventLeavel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优先级">
              <el-select v-model="eventAddForm.priority" placeholder="请选择优先级">
                <el-option
                  v-for="item in leavelChange"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-radio-group v-model="eventAddForm.enable">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eventAddDialog = false" class='defaultBtn'>取 消</el-button>
        <el-button class='blueStyleBtn' @click="eventAddSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑模态框 -->
    <el-dialog :visible.sync="eventEditDialog" width="40%" class="eventEditDialog"  :close-on-click-modal="false">
       <el-tabs v-model="activeEdit">
        <el-tab-pane  name="first">
          <span slot="label" class="label_pane">影响性分析</span>
          <el-form :model="eventEditForm" label-position="right" label-width="100px" size="small">
            <el-form-item label="名称">
              <el-input v-model="eventEditForm.name" @keyup.native="nameEdit" placeholder="请输入事件标题(英文)"></el-input>
            </el-form-item>
            <el-form-item label="别名">
              <el-input v-model="eventEditForm.alias" @keyup.native="aliasEdit" placeholder="请输入别名(中文)"></el-input>
            </el-form-item>
            <el-form-item label="策略描述" class="expreesionStyle">
              <el-input type="textarea" rows="4" v-model="eventEditForm.desc" placeholder="请进行详细描述"></el-input>
            </el-form-item>
            <el-form-item label="告警选择器">
              <el-cascader
                placeholder="请选择告警选择器"
                :options="ruleData"
                v-model="selectNameEdit"
                :props="propsSelect"
              ></el-cascader>
              <el-button
                @click="editDomainDialog"
                icon="el-icon-circle-plus-outline"
                class='blueStyleBtn'
                size="mini"
                circle
              ></el-button>
              <el-form :model="alertSelectEditFrom" id="alertSelectEditItem">
                <el-form-item v-for="(domain,index) in alertSelectEditFrom.domains" :key="index">
                  <el-input v-model="domain.name" disabled class="key-length fontSizeStyle"></el-input>
                  <el-input v-model="domain.value" class="value-length fontSizeStyle"></el-input>
                  <el-button
                    class='redStyleBtn'
                    icon="el-icon-delete"
                    @click.prevent="removeDomainDialogEdit(domain)"
                    size="mini"
                    circle
                  ></el-button>
                </el-form-item>
              </el-form>
            </el-form-item>
            <el-form-item label="分析表达式" class="expreesionStyle">
              <el-input
                type="textarea"
                rows="4"
                v-model="eventEditForm.expression"
                placeholder="例 (影响区域=='北京') || (服务级别=='高')"
              ></el-input>
              <el-popover
                placement="right"
                width="300"
                trigger="click"
              >
                <h3>表达式字段:</h3>
                <ul>
                  <li>服务级别:service_level</li>
                  <li>影响系统:influence_system</li>
                  <li>影响区域:influence_area</li>
                  <li>影响客户:influence_customer</li>
                </ul>
                <br>
                <h3>表达式符号: && ||</h3>
                <br>
                <h3>表达式的值使用: ''(单引号) 或者 ""(双引号)</h3>
                <span slot="reference" class="seeWarn">
                  <i class="el-icon-warning"></i>
                </span>
                <br>
                <h3>示例:</h3>
                <!-- <p>service_level=='aa'&&influence_system=='bb'&&(influence_area=='cc'||influence_customer=='dd')</p> -->
                <p>service_level=='aa'&&influence_system=='bb'</p>
              </el-popover>
            </el-form-item>
            <el-form-item label="生效时间">
              <el-date-picker
                 v-model="aTimeEdit"
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
            <el-form-item label="影响程度">
              <el-select v-model="eventEditForm.degree" placeholder="请选择影响程度">
                <el-option
                  v-for="item in eventLeavel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优先级">
              <el-select v-model="eventEditForm.priority" placeholder="请选择优先级">
                <el-option
                  v-for="item in leavelChange"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-radio-group v-model="eventEditForm.enable">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
       </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eventEditDialog = false" class='defaultBtn'>取 消</el-button>
        <el-button class='blueStyleBtn' @click="eventEditSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 预览模态框 -->
    <el-dialog :visible.sync="eventYuLanDialog" width="40%" class="eventYuLanDialog eventEditDialog"  :close-on-click-modal="false">
      <el-tabs v-model="activeSearch">
        <el-tab-pane  name="first">
          <span slot="label" class="label_pane">影响性分析</span>
          <el-form :model="eventEditForm" label-position="right" label-width="100px" size="small">
            <el-form-item label="名称">
              <!-- <el-input v-model="eventEditForm.name" @keyup.native="nameEdit" disabled placeholder="请输入事件标题(英文)"></el-input> -->
              {{eventEditForm.name}}
            </el-form-item>
            <el-form-item label="别名">
              <!-- <el-input v-model="eventEditForm.alias" @keyup.native="aliasEdit" disabled placeholder="请输入别名(中文)"></el-input> -->
              {{eventEditForm.alias}}
            </el-form-item>
            <el-form-item label="策略描述" class="expreesionStyle">
              <!-- <el-input type="textarea" rows="4" v-model="eventEditForm.desc" disabled placeholder="请进行详细描述"></el-input> -->
              {{eventEditForm.desc}}
            </el-form-item>
            <el-form-item label="告警选择器">
              <!-- <el-cascader
              disabled
                placeholder="请选择告警选择器"
                :options="ruleData"
                v-model="selectNameEdit"
                :props="propsSelect"
              ></el-cascader>
              <el-button
                @click="editDomainDialog"
                icon="el-icon-circle-plus-outline"
                class='blueStyleBtn'
                size="mini"
                circle
              ></el-button> -->
              <!-- <el-form :model="alertSelectEditFrom" id="alertSelectEditItem"> -->
                <!-- <el-form-item v-for="(domain,index) in alertSelectEditFrom.domains" :key="index"> -->
                  <!-- <el-input v-model="domain.name" disabled class="key-length"></el-input>
                  <el-input v-model="domain.value" disabled  class="value-length"></el-input> -->
                  <!-- <span  class="key-length">{{domain.name}}</span> &nbsp; &nbsp;
                  <span  class="value-length">{{domain.value}}</span> -->
                  
                  <!-- <el-button
                    class='redStyleBtn'
                    icon="el-icon-delete"
                    @click.prevent="removeDomainDialogEdit(domain)"
                    size="mini"
                    circle
                  ></el-button> -->
                  <div>{{eventEditForm.bizLineName}}</div>
                  <div
                    class="aInfo"
                    v-for="(item,index) in eventEditForm.selectorMap"
                    :key="index"
                  >
                    <span>{{item.label}} = {{item.val}}</span>
                  </div>
            </el-form-item>
            <el-form-item label="分析表达式" class="expreesionStyle">
              <!-- <el-input
                disabled
                type="textarea"
                rows="4"
                v-model="eventEditForm.expression"
                placeholder="例 (影响区域=北京) || (服务级别=高)"
              ></el-input> -->
              {{eventEditForm.expression}}
              <!-- <el-popover
                placement="right"
                width="300"
                trigger="click"
                >
                <h3>表达式字段:</h3>
                <ul>
                  <li>服务级别:service_level</li>
                  <li>影响系统:influence_system</li>
                  <li>影响区域:influence_area</li>
                  <li>影响客户:influence_customer</li>
                </ul>
                <br>
                <h3>表达式符号: && ||</h3>
                <br>
                <h3>表达式的值使用: ''(单引号) 或者 ""(双引号)</h3>
                <span slot="reference" class="seeWarn">
                  <i class="el-icon-warning"></i>
                </span>
                <br>
                <h3>示例:</h3>
                <p>service_level=='aa'&&influence_system=='bb'</p>
              </el-popover> -->
            </el-form-item>
             <el-form-item label="生效时间">
               {{eventEditForm.startTime | strToDataFromat}} 至 {{eventEditForm.endTime | strToDataFromat}}
             </el-form-item>
            <el-form-item label="影响程度">
              <!-- <el-select v-model="eventEditForm.degree" placeholder="请选择影响程度">
                <el-option
                disabled
                  v-for="item in eventLeavel"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select> -->
              {{eventEditForm.degree | eventLeavel}}
            </el-form-item>
            <el-form-item label="优先级">
              <!-- <el-select v-model="eventEditForm.priority" placeholder="请选择优先级" disabled>
                <el-option
                  v-for="item in leavelChange"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select> -->
              {{eventEditForm.priority}}
            </el-form-item>
            <el-form-item label="是否启用">
              <!-- <el-radio-group v-model="eventEditForm.enable" disabled>
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group> -->
              {{eventEditForm.enable?'是':'否'}}
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eventYuLanDialog = false" class='defaultBtn'>取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
   
<script>
import * as service from "@/modules/mms/api/eventInfluenceModule.js";
import * as encodeMethods from "@/modules/mms/untils/encodeurl.js";
export default {
  data() {
    let _this = this;
    return {
      searchItemShow:false,
      activeAdd:'first',
      activeEdit:'first',
      activeSearch:'first',
      headStyle: {
        'background-color': '#F4F8F9',
        'color': 'rgba(0,0,0,0.60)',
      },
      tableLoading:true,
      eventInfluenceConditions: {
        degree: "",
        founder:'',
        enable:"",
      },
      aTimeStartSearch:[],
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
      ],
      eventInfluenceTableData: [],
      eventAddDialog: false,
      // 分页
      pageAllFlag: true, //如果是所有数据分页,则为true fenye
      eventParams: {}, //查询 深拷贝数据
      allLimitNumber: 10, //所有分页每一页的条数
      totalPage: 0, //总页数
      currentPage: 1, //当前页,
      //查询
      area:"",
      customer:"",
      system:"",
      serviceLeavel:"",
      // 新增数据
      eventAddForm: {
        name: "",
        alias: "",
        desc: "",
        enable: "",
        priority: "",
        expression: "",
        degree: ""
      },
      //生效时间
      aTimeAdd:[],
      aTimeEdit:[],
      ruleData: [],
      selectNameAdd: [],
      alertSelectAddFrom: {
        domains: []
      },
      propsSelect: {
        value: "key",
        label: "name",
        children: "tags"
      },
      bizLineCodeAdd: "",
      selectFlagAdd: true,
      eventSelectIds:[],
      eventYuLanDialog:false,
      // 编辑--------------------
      eventEditDialog:false,
      eventEditForm: {
        name: "",
        alias: "",
        desc: "",
        enable: "",
        priority: "",
        expression: "",
        degree: ""
      },
      selectNameEdit: [],
      alertSelectEditFrom: {
        domains: []
      },
      //服务器时间
      serviceTime: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < _this.serviceTime - 8.64e7;
        }
      },
    };
  },
  mounted() {
    this.getAllData(1);
    this.ruleSearch();
  },
  methods: {
    searchItemDown(){
      this.searchItemShow = !this.searchItemShow
    },
    nameAdd() {
      this.eventAddForm.name = this.eventAddForm.name.replace(
        /[^A-z]/,
        ""
      ).replace('^','');
    },
    aAliasAdd() {
      this.eventAddForm.alias = this.eventAddForm.alias.replace(
        /[^\u4E00-\u9FA5]/g,
        ""
      );
    },
    nameEdit() {
      this.eventEditForm.name = this.eventEditForm.name.replace(
        /[^A-z]/,
        ""
      ).replace('^','');
    },
    aliasEdit() {
      this.eventEditForm.alias = this.eventEditForm.alias.replace(
        /[^\u4E00-\u9FA5]/g,
        ""
      );
    },
    //查询
    eventInfluenceInfo(row){
      this.eventYuLanDialog=true;
      this.alertSelectEditFrom.domains=[];
      service.forIdToeventData(row.id).then(res=>{
        this.eventEditForm=res.data;
        let xzq = res.data.selector;
        let lineCode =res.data.bizLineCode;
        this.bizLineCodeEdit =res.data.bizLineCode;
        this.selectNameEdit=[];
        xzq.forEach(res => {
          //等号分割
          let arr1 = res.split("=");
          //[ "bizSys,sys34"]
          //要通过第一个key id去查找名字
          let backName = "";
          let bizName = '';
          let regInfoEdit = ''
          
          this.ruleData.forEach(val=>{
            if(lineCode == val.key){
              bizName = val.name;
              if(val.tags){
                val.tags.forEach(value=>{
                  if(value.key==arr1[0]){
                    backName = value.name
                    if(value.reg){
                      regInfoEdit = value.reg
                    }
                  }
                })
              }
            }
          })
          this.alertSelectEditFrom.domains.push({
            key: arr1[0],
            value: arr1[1],
            name: bizName+'/'+backName,
            reg:regInfoEdit
          });
        });
      })
    },
    //查询所有
    getAllData(pageNumber) {
      let params = {
        start: (pageNumber - 1) * this.allLimitNumber,
        limit: this.allLimitNumber
      };
      service.eventData(params).then(res => {
        this.eventInfluenceTableData = res.data;
        this.totalPage = res.count;
        this.tableLoading=false;
        this.serviceTime = res.timestamp;
      });
    },
    //条件查询
    getEventSingleData(startPage, flag) {
      this.tableLoading=true;
      this.pageAllFlag = false;
      if (flag) {
        this.currentPage = 1;
        let arr=[];
        arr.push(this.area,this.customer,this.system,this.serviceLeavel)
        this.eventInfluenceConditions.values = encodeURIComponent(JSON.stringify(arr))
        console.log(this.eventInfluenceConditions);
        console.log(arr);
        //时间
        console.log(this.aTimeStartSearch);
        if(this.aTimeStartSearch) {
           this.eventInfluenceConditions.createTimeStart=this.aTimeStartSearch[0];
           this.eventInfluenceConditions.createTimeEnd=this.aTimeStartSearch[1];
        }else{
          this.eventInfluenceConditions.createTimeStart='';
           this.eventInfluenceConditions.createTimeEnd='';
        }
        this.eventParams = JSON.parse(
          JSON.stringify(this.eventInfluenceConditions)
        );
        console.log(this.eventParams);
      }
      this.eventParams.start = (startPage - 1) * this.allLimitNumber;
      this.eventParams.limit = this.allLimitNumber;
      service.eventData(this.eventParams).then(res => {
        this.eventInfluenceTableData = res.data;
        this.totalPage = res.count;
        this.tableLoading=false;
      });
    },
    //分析 分页
    eventPageChange(val) {
      this.tableLoading=true;
      this.currentPage = val;
      if (this.pageAllFlag) {
        //如果查询所有的数据
        this.getAllData(val);
      } else {
        //如果是查询参数的数据
        this.getEventSingleData(val, false);
      }
    },
    //分析分页页容量
    eventSizeChange(val) {
      this.tableLoading=true;
      this.allLimitNumber = val;
      this.currentPage = 1;
      if (this.pageAllFlag) {
        //如果查询所有的数据
        this.getAllData(1);
      } else {
        //如果是查询参数的数据
        this.getEventSingleData(1, false);
      }
    },
    //重置
    eventReset() {
      
      this.pageAllFlag = true;
      this.eventParams = {};
      this.area="";
      this.customer="";
      this.system="";
      this.serviceLeavel="";
      this.eventInfluenceConditions = {
        degree: "",
        founder:"",
        enable:'',
      };
      this.aTimeStartSearch=[];
      // this.tableLoading=true;
      // this.currentPage = 1;
      // this.getAllData(1);
    },
    //新增模态框
    eventAdd() {
      this.eventAddDialog = true;
      this.alertSelectAddFrom = {
        domains: []
      };
      this.aTimeAdd=[];
      this.selectNameAdd = [];
      this.eventAddForm = {
        name: "",
        alias: "",
        desc: "",
        enable: "",
        priority: "",
        expression: "",
        degree: ""
      };
    },
    //新增确定
    eventAddSave() {
      // console.log(this.eventAddForm);
      // console.log(this.aTimeAdd);
      
      //时间处理 校验开始-结束时间   创建时间
      if (this.aTimeAdd.length) {
        this.eventAddForm.startTime = this.aTimeAdd[0];
        this.eventAddForm.endTime = this.aTimeAdd[1];
      } else {
        this.eventAddForm.startTime = "";
        this.eventAddForm.endTime = "";
      }
      //业务线
      this.eventAddForm.bizLineCode = this.bizLineCodeAdd;
      const inputDataAdd = this.alertSelectAddFrom.domains;
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
        this.eventAddForm.selector = arr;
      } else {
        this.eventAddForm.selector = "";
      }
      service.eventAddService(this.eventAddForm).then(res => {
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.currentPage=1;
        this.getAllData(1);
        this.eventAddDialog = false;
      });
    },
    //删除单个
    deleteRow(id,enable){
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
          service.delSingle(id).then(res=>{
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.currentPage=1;
            this.getAllData(1);
          })
        })
    },
    //批量删除
    bitchDel(){
      // console.log(this.eventSelectIds);
      if(this.eventSelectIds.length){
        this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let ids = [];
            this.eventSelectIds.forEach(val => {
              ids.push(val.id);
            });
            ids = ids.join(",");
            let params = {
              id:ids
            }
            service.delSome(params).then(res=>{
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.currentPage=1;
              this.getAllData(1);
            })
          })
      }else{
        this.$message({
          message: "请选择数据",
          type: "error"
        });
      }
    },
    aStart(row){
      this.$confirm('是否启用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.enable == true ? (row.enable = false) : (row.enable = true);
          service.eventEditService(row).then(res=>{
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.getAllData(this.currentPage);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    aEnd(row){
      this.$confirm('是否停止?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.enable == true ? (row.enable = false) : (row.enable = true);
          service.eventEditService(row).then(res=>{
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.getAllData(this.currentPage);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
    },
    //编辑
    eventEdit(id,enable){
      if (enable) {
        this.$message.error("启用状态不可编辑");
        return;
      }
      console.log(id);
      this.eventEditDialog=true;
      this.alertSelectEditFrom.domains=[];
       this.aTimeEdit=[];
      service.forIdToeventData(id).then(res=>{
        this.eventEditForm=res.data;
        let xzq = res.data.selector;
        let lineCode =res.data.bizLineCode;
        this.bizLineCodeEdit =res.data.bizLineCode;
        this.selectNameEdit=[];
        xzq.forEach(res => {
          //等号分割
          let arr1 = res.split("=");
          //[ "bizSys,sys34"]
          //要通过第一个key id去查找名字
          let backName = "";
          let bizName = '';
          let regInfoEdit = ''
          
          this.ruleData.forEach(val=>{
            if(lineCode == val.key){
              bizName = val.name;
              if(val.tags){
                val.tags.forEach(value=>{
                  if(value.key==arr1[0]){
                    backName = value.name
                    if(value.reg){
                      regInfoEdit = value.reg
                    }
                  }
                })
              }
            }
          })
          this.alertSelectEditFrom.domains.push({
            key: arr1[0],
            value: arr1[1],
            name: bizName+'/'+backName,
            reg:regInfoEdit
          });
        });
        this.aTimeEdit.push(res.data.startTime);
        this.aTimeEdit.push(res.data.endTime);
      })
    },
    checkboxT(row) {
      if (row.enable != 0) {
        return 0;
      } else {
        return 1;
      }
    },
    //编辑保存
    eventEditSave(){
      //时间处理 校验开始-结束时间   创建时间
      if (this.aTimeEdit.length) {
        this.eventEditForm.startTime = this.aTimeEdit[0];
        this.eventEditForm.endTime = this.aTimeEdit[1];
      } else {
        this.eventEditForm.startTime = "";
        this.eventEditForm.endTime = "";
      }
      this.eventEditForm.bizLineCode = this.bizLineCodeEdit;
      const inputDataAdd = this.alertSelectEditFrom.domains;
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
        this.eventEditForm.selector = arr;
      } else {
        this.eventEditForm.selector = "";
      }
      delete this.eventEditForm.selectorMap
      console.log(this.eventEditForm);
      service.eventEditService(this.eventEditForm).then(res=>{
        this.$message({
          message: "编辑成功",
          type: "success"
        });
        this.getAllData(this.currentPage);
        this.eventEditDialog = false;
      })
    },
    eventSelectChange(val){
      this.eventSelectIds=val
    },
    ruleSearch(params) {
      service.ruleSearchService(params).then(res => {
        this.ruleData = res.data;
      });
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
            let regInfo ='';
            this.ruleData.forEach(val => {
              // this.bizLineCodeAdd=val.key
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
            this.alertSelectAddFrom.domains.push({
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
          this.ruleData.forEach(val => {
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
    removeDomainDialogEdit(item) {
      var index = this.alertSelectEditFrom.domains.indexOf(item);
      if (index !== -1) {
        this.alertSelectEditFrom.domains.splice(index, 1);
      }
    },
    editDomainDialog() {
      //去除规则
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
          this.selectFlagAdd = true;
          this.alertSelectEditFrom.domains.forEach(val => {
            if (this.selectNameEdit[1] == val.key) {
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
            this.ruleData.forEach(val => {
              // this.bizLineCodeEdit=val.key
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
            this.alertSelectEditFrom.domains.push({
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
          this.ruleData.forEach(val => {
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
          this.alertSelectEditFrom.domains.push({
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
    
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.eventInfluence-container {
  padding: 10px;
  #eventInfluence {
    .el-date-editor,
    .el-input,
    .el-select {
      width: 260px;
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
    .searchTop{
      margin-top: 10px;
    }
  }
  .iconStyle {
    margin-left: 20px;
  }
  .event-container {
    margin-top: 5px;
    .btnInfo {
      margin-bottom: 10px;
      .set-item-show {
        color: skyblue;
        font-size: 12px;
        vertical-align: bottom;
        cursor: pointer;
      }
    }
  }
  // 新增模态框
  .eventAddDialog {
    .el-input,
    .el-select,
    .el-date-editor,
    .el-cascader {
      width: 316px;
    }
    #alertSelectAddItem {
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
    .el-popover{
      width: 350px;
    }
    .seeWarn {
      position: absolute;
      top: 30px;
      left: -40px;
      cursor: pointer;
    }
  }
  // 编辑模态框
  .eventEditDialog {
    .el-input,
    .el-date-editor,
    .el-select,
    .el-cascader {
      width: 316px;
    }
    #alertSelectEditItem {
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
    .el-popover{
      width: 350px;
    }
    .seeWarn {
      position: absolute;
      top: 30px;
      left: -40px;
      cursor: pointer;
    }
  }
}
.noBtnStyle {
    width: 70px;
    padding-left: 12px;
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
/deep/.eventYuLanDialog .aInfo {
    // background-color: red;
    width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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