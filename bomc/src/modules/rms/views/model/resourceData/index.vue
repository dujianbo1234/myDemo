<template>
  <div class="app-container">
    <el-container>
      <el-aside width="185px" style="">
        <div class="head">资源结构树</div>
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" default-expand-all :expand-on-click-node = 'false'/>
      </el-aside>
      <el-container>
        <el-header>
          <div class="search">
            <el-input v-model="query" placeholder="请输入模型名称、模型描述" size="mini">
            <!-- <el-button type="primary" size="mini">
                <i class="el-icon-search" @click="queryResources()">
                查询
                </i>
              </el-button> -->
               <el-button slot="append" icon="el-icon-search" @click="queryResources()" ></el-button>
            </el-input>
          </div>
          <div class="operation">
            <!-- <el-tooltip class="item" effect="light" content="卡片展示" placement="bottom">
              <i class="switch el-icon-more" @click="show()"/>
            </el-tooltip>
            <i class="switch"> | </i>
            <el-tooltip class="item" effect="light" content="列表展示" placement="bottom">
              <i class="switch el-icon-more-outline" @click="hide()"/>
            </el-tooltip> -->
            <router-link :to="{name:'appLink'}">
              <el-button type="primary" size="mini">
                <i class="el-icon-plus">
                新增
                </i>
              </el-button>
            </router-link>
            <el-button type="primary" size="mini" @click="delAll()">
                <i class="el-icon-delete">
                删除
                </i>
            </el-button>
            <el-button type="primary" size="mini" @click="show_hide()">
                {{content}}
            </el-button>
            <router-link :to="{name:'attributeManagLink'}">
              <el-button type="primary" size="mini">
                <i class="el-icon-setting"> 
                  扩展属性操作
                </i>
              </el-button>
            </router-link>
            <router-link :to="{name:'versionManagLink'}">
              <el-button type="primary" size="mini">
                <i class="el-icon-setting"> 
                  模型变更操作
                </i>
              </el-button>
            </router-link>
          </div>
        </el-header>
        <el-main>
          <ul v-show="isshow" class="list">
            <div v-if="data_none" class="data_none"><span class="el-table__empty-text">暂无数据</span></div>
            <li v-for="(item,index) in modelList" :key="index" class="list_itme" @click="selected(index,item)">
              <div class="list_itme_head">
                <span class="list_itme_name" @click.stop="modify(index,item)">{{ item.name }}</span> 
                <div class="list_itme_sub">
                  <el-button type="danger" icon="el-icon-delete" circle @click.stop="deleteInfo(item.name)"></el-button>
                  <el-button icon="el-icon-check" circle v-bind:class="{active:item.active}" @click.stop="selected(index,item)"></el-button>
                </div>
              </div>
              <div class="list_itme_content">
                <p>所属层级：{{ item.level }}</p>  
                <p>模型分类：{{ item.type }}</p>
                <p>模型描述：{{ item.alias }}</p>
                <p>实例数量：{{ item.example }}</p>
              </div>
            </li>
          </ul>
          <div v-show="ishide" class="template_tab">
            <template >
              <el-table
                :data="modelList"
                border
                style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  min-width="10%"/>
                <el-table-column
                  prop="name"
                  label="模型名称"
                  min-width="25%"/>
                <el-table-column
                  prop="level"
                  label="所属层级"
                  min-width="20%"/>
                <el-table-column
                  prop="type"
                  min-width="20%"
                  label="模型分类"/>
                <el-table-column
                  prop="alias"
                  label="模型描述"
                  min-width="35%"/>
                <el-table-column
                  prop="example"
                  label="实例数量"
                  min-width="15%"/>
                <el-table-column label="操作" min-width="20%">
                  <template slot-scope="scope">
                    <i
                      class="el-icon-edit-outline"
                      size="mini"
                      style="margin: 0 15px;font-size: 16px;font-weight: 700;cursor: pointer;"
                      @click="modify(scope.$index,scope.row)" />
                    <i
                      class="el-icon-delete"
                      size="mini"
                      type="danger"
                      style="margin: 0 15px;font-size: 16px;font-weight: 700;cursor: pointer;"
                      @click="deleteInfo(scope.row.name)"/>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-main>
        <el-footer>
          <paging :page = "page" :size-change = "sizeChange" :current-change = "currentChange"/>
        </el-footer>
      </el-container>
      <el-dialog
        title="资源模型管理"
        :visible.sync="dialogVisibleSet"
        width="55%"
        :before-close="handleClose"
        :close-on-click-modal = 'false'
        >
        <el-row>
          <!-- <span class="fr">模型版本： <span>{{this.module_attr.version}}</span></span>
          <el-button  type="primary" size="mini">检查更新</el-button>
          <el-button  type="danger" size="mini">还原之前版本</el-button> -->
        </el-row>
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick" class="version_tab allAttributes Proper">
            <el-tab-pane label="专有属性" name="first">
              <el-button  type="primary" size="mini" @click="yes_dialogFormVisible()">新增属性</el-button>
              <el-table
                  :data="Proper"
                  style="width: 100%;" header-align='left'>
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="属性名称">
                          <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="关键属性">
                          <span>{{props.row.required == true?"是":"否"}}</span>
                        </el-form-item>
                        <el-form-item label="属性分类">
                          <span>{{ props.row.classification }}</span>
                        </el-form-item>
                        <el-form-item label="自动采集">
                          <span>{{ props.row.auto_get == true?"是":"否" }}</span>
                        </el-form-item>
                        <el-form-item label="属性类型">
                          <span>{{ props.row.type }}</span>
                        </el-form-item>
                        <el-form-item label="属性说明">
                          <span>{{ props.row.description }}</span>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="属性名称"
                    prop="name" min-width="20%">
                  </el-table-column>
                  <el-table-column
                    label="属性分类"
                    prop="classification" min-width="20%">
                  </el-table-column>
                  <el-table-column
                    label="属性说明"
                    prop="description" min-width="50%">
                  </el-table-column>
                  <el-table-column label="操作" min-width="15%">
                    <template slot-scope="scope">
                      <i
                        class="el-icon-delete"
                        size="mini"
                        type="danger"
                        style="margin: 0 5px;font-size: 16px;font-weight: 700;"
                        @click="delete_tab(scope.$index,scope.row)"
                      />
                    </template>
                  </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane :label="classification_tab" name="second">
              <template>
                <el-table
                  :data="classification"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="属性名称"
                   min-width="20%">
                  </el-table-column>
                  <el-table-column
                    prop="description"
                    label="说明"
                    min-width="80%">
                  </el-table-column>
                </el-table>
              </template>
            </el-tab-pane>
            <el-tab-pane label="根类通用属性" name="third">
              <template>
                <el-table
                  :data="ResObject"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="属性名称"
                    min-width="20%">
                  </el-table-column>
                  <el-table-column
                    prop="description"
                    label="说明"
                    min-width="80%">
                  </el-table-column>
                </el-table>
              </template>
            </el-tab-pane>
          </el-tabs>
        </template>
        <span slot="footer" class="dialog-footer" v-if="activeName == 'first'">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="modelAttributeSave()">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog
          title="选择属性"
          :visible.sync="dialogFormVisible"
          class="allAttributes"
          :before-close="handleClose_attr"
          width="60%"
          >
          <el-card class="box-card" style="margin-bottom: 10px">
            <div class="resource_name">
                <span>属性名称</span>
                <el-input v-model="page_attr.name" placeholder="请输入内容" size="mini"></el-input>
              </div>
              <div class="resource_name">
                <span>属性分类</span>
                <el-select v-model="page_attr.select" placeholder="请选择" size="mini">
                  <el-option label="全部分类" value="全部"></el-option>
                  <el-option label="运行类" value="运行类"></el-option>
                  <el-option label="工程类" value="工程类"></el-option>
                  <el-option label="维保类" value="维保类"></el-option>
                </el-select>
              </div>
              <div class="resource_crux">
                <el-checkbox v-model="page_attr.checked" label="关键属性" border size="mini"></el-checkbox>
              </div>
              <el-button size="mini" @click="reset">重置</el-button>
              <el-button type="primary" size="mini" @click="queryattributeManag(page)">开始搜索</el-button>
              <!-- <el-button type="primary" icon="el-icon-delete" size="mini"  @click="delAll">删除</el-button> -->
          </el-card>
          <el-card class="box-card">
            <el-table
              :data="temp"
              style="width: 100%; text-align: left" @selection-change="handleSelectionChange_attr" header-align='left'>
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="属性名称">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="关键属性">
                      <span>{{props.row.required == true?"是":"否"}}</span>
                    </el-form-item>
                    <el-form-item label="属性分类">
                      <span>{{ props.row.classification }}</span>
                    </el-form-item>
                    <el-form-item label="自动采集">
                      <span>{{ props.row.auto_get == true?"是":"否" }}</span>
                    </el-form-item>
                    <el-form-item label="属性类型">
                      <span>{{ props.row.type }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                      <span>{{ props.row.create_time|formatTime('YMDHMS') }}</span>
                    </el-form-item>
                    <el-form-item label="属性说明">
                      <span>{{ props.row.description }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column type="selection"/>
              <el-table-column
                label="属性名称"
                prop="name">
              </el-table-column>
              <el-table-column
                label="属性分类"
                prop="classification">
              </el-table-column>
              <el-table-column
                label="属性说明"
                prop="description">
              </el-table-column>
              <el-table-column label="关键属性">
                <template slot-scope="scope">{{scope.row.required == true?"是":"否"}}</template>
              </el-table-column>
            </el-table>
          </el-card>
          <div class="paging">
              <PagingAttr :page="page_attr" :size-change="sizeChange_attr" :current-change="currentChange_attr"/>
           </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose_attr()">取 消</el-button>
            <el-button type="primary" @click="on_dialogFormVisible()">确 定</el-button>
          </div>
        </el-dialog>
    </el-container>
  </div>
</template>

<script>
import Paging from '@/modules/rms/components/Paging'
import PagingAttr from '@/modules/rms/components/Paging'
import * as service from '../../../api/model/resourceData/resourceData.js';
import * as serviceAttr from "../../../api/model/resourceData/attributeManag.js";
export default {
  components: {
    Paging,
    PagingAttr
  },
  data() {
    var attributeData  = (rule, value, callback) => {
      if (/^[a-zA-Z]*$/.test(value) === false) {
        return callback(new Error('名称只能输入英文!'));
      } else {
         callback();
       }
    };
    var isdescription = (rule, value, callback) => {
      // let regExp = /^(?!_)(?!.*?_$)[a-zA-Z0-9-_\u4e00-\u9fa5]*$/; !/^[a-zA-Z0-9_\u4e00-\u9fa5\" "]+$/
      let regExp = /^[a-zA-Z0-9_\u4e00-\u9fa5]*$/;
      if (regExp.test(value) === false) {
        return callback(new Error('只能输入中英文和数字,下划线!'));
      } else {
         callback();
      }
    }
    return {
      data: [{
        label: '全部资源',
        children: [{
          label: 'SaaS',
          children: [{
            label: '业务类'
          }, {
            label: '应用类'
          }]
        }, {
          label: 'PaaS',
          children: [{
            label: '逻辑类'
          }]
        }, {
          label: 'IaaS',
          children: [{
            label: '逻辑类'
          }, {
            label: '物理类'
          }]
        }, {
          label: 'Others',
          children: [{
            label: '其他类'
          }
          ]
        }]
      }],
      page: {
        pageSize: 8, //每页条数,  默认8条
        totalRecords: 0, //总条数
        pageSizes: [8, 12, 16, 20], // 分几页
        pageNum: 0, //页数从0开始
        level: '',
        type: '',
        alias: '',
        name: '',
        search: false,
        searchByAny: false,
      },
      page_attr: {
        pageSize: 5, //每页条数,  默认8条
        totalRecords: 0, //总条数
        pageSizes: [5, 10, 15, 20], // 分几页
        pageNum: 0, //页数从0开始
        select: "",
        checked: false,
        name: "",
      },
      temp:[],
      data_none: false,
      module_attr: "", // 单个模型的数据
      version: '', // 页面显示版本号
      //页面展示数据
      modelList: [],
      //专有数据
      Proper: [],
      //分类
      classification: [],
      //分类标签
      classification_tab: '',
      dialogFormVisible: false,
      // 专有属性修改
      form:{},
      add_form:{},
      formLabelWidth: '90px',
      rules2: {
          name: [
              { required: true, message: '请输入属性名称', trigger: 'blur' },
              { validator: attributeData, trigger: 'blur' },
              { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
          ],
          description: [
              { required: true, message: '请输入属性说明', trigger: 'blur' },
              { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
              { validator: isdescription, trigger: 'blur'}
          ]
        },
      rules3: {
        name: [
            { required: true, message: '请输入属性名称', trigger: 'blur' },
            { validator: attributeData, trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
        ],
        description: [
            { required: true, message: '请输入属性说明', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
            { validator: isdescription, trigger: 'blur'}
        ]
      },
      //物理类数据
      Physical: [
                {
                name: 'level',
                description: '描述该资源所处层级；具体描述为IaaS'
              }, {
                name: 'asset_number',
                description: '该资源的资产编号'
              }, {
                name: 'serial_number',
                description: '该资源的序列号'
              }, {
                name: 'name',
                description: '资源所属的系统名称，参见“资源所属系统” 定义（自动填写）'
              }, {
                name: 'module',
                description: '资源所属系统的模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）'
              }, {
                name: 'sub_module',
                description: '资源所属系统的子模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）'
              }, {
                name: 'influence_area',
                description: '描述该资源失效后会影响到的区域范围；具体描述为：全省、某中心、某关键地市、其他地市'
              }, {
                name: 'influence_customer',
                description: '描述该资源失效后会影响到的客户：具体描述为：所有客户、全球通客户、神州行客户、动感地带客户等'
              }, {
                name: 'influence_system',
                description: '描述该资源失效后会影响到的系统范围，分为：BOSS应用、CRM应用、PBOSS等'
              }, {
                name: 'department',
                description: '使用该资源部门（手工填写）'
              }, {
                name: 'service_start',
                description: '资源支持服务的服务合同开始日期YYYY-MM-DD（手工填写）'
              }, {
                name: 'service_end',
                description: '资源支持服务的服务合同结束日期YYYY-MM-DD（手工填写）'
              }, {
                name: 'manufacturer',
                description: '该资源的原始厂商 ，“参见资源管理建设方案附录5.1”'
              }, {
                name: 'service_level',
                description: '资源支持服务厂商提供的相应的服务级别（如5x8，7x24等）（自动填写）'
              }, {
                name: 'service_provider',
                description: '为该资源管理建设方案提供服务的厂商名称，“参见附录5.3”（自动填写）'
              }, {
                name: 'service_tel',
                description: '资源支持服务厂商提供的支持服务的联系方式，能提供联络信息，如电话、邮件等（手工填写）'
              }
      ],
      //逻辑类数据
      Logic: [
          {
            name: 'level',
            description: '描述该资源所处层级；具体描述为：IaaS、PaaS'
          },{
            name: 'name',
            description: '资源所属的系统名称，参见“资源所属系统” 定义（自动填写）'
          },{
            name: 'module',
            description: '资源所属系统的模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）'
          },{
            name: 'sub_module',
            description: '资源所属系统的子模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）'
          },{
            name: 'influence_area',
            description: '描述该资源失效后会影响到的区域范围；具体描述为：全省、某中心、某关键地市、其他地市'
          },{
            name: 'influence_customer',
            description: '描述该资源失效后会影响到的客户：具体描述为：所有客户、全球通客户、神州行客户、动感地带客户等'
          },{
            name: 'influence_system',
            description: '描述该资源失效后会影响到的系统范围，分为：BOSS应用、CRM应用、PBOSS等'
          },{
            name: 'department',
            description: '使用该资源部门（手工填写）'
          },{
            name: 'service_level',
            description: '资源支持服务厂商提供的相应的服务级别（如5x8，7x24等）（手工填写）'
          },{
            name: 'integrator',
            description: '该资源管理建设方案的集成商“参见附录5.2”（自动填写）'
          },{
            name: 'service_provider',
            description: '为该资源管理建设方案提供服务的厂商名称，“参见附录5.3”（自动填写）'
          },
      ],
      //应用类数据
      Application: [
              {
                name: 'level',
                description: '描述该资源所处层级；具体描述为SaaS'
              },{
                name: 'name',
                description: '资源所属的系统名称，参见“资源所属系统” 定义（自动填写）'
              },{
                name: 'module',
                description: '资源所属系统的模块名称，参见资源管理建设方案附录“5.4” 定义（自动填写）'
              },{
                name: 'sub_module',
                description: '资源所属系统的子模块名称，参见资源管理建设方案附录“5.4” 定义（自动填写）'
              },{
                name: 'influence_area',
                description: '描述该资源失效后会影响到的区域范围；具体描述为：全省、某中心、某关键地市、其他地市'
              },{
                name: 'influence_customer',
                description: '描述该资源失效后会影响到的客户：具体描述为：所有客户、全球通客户、神州行客户、动感地带客户等'
              },{
                name: 'influence_system',
                description: '描述该资源失效后会影响到的系统范围，分为：BOSS应用、CRM应用、PBOSS等'
              },{
                name: 'department',
                description: '使用该资源部门（手工填写）'
              },{
                name: 'service_level',
                description: '资源支持服务厂商提供的相应的服务级别（如5x8，7x24等）（手工填写）'
              },{
                name: 'integrator',
                description: '该资源管理建设方案的集成商“参见附录5.2”（自动填写）'
              },
              {
                name: 'service_provider',
                description: '为该资源管理建设方案提供服务的厂商名称，“参见附录5.3”（手工填写）'
              },
      ],
      //业务类数据
      Business: [
            {
              name: 'level',
              description: '描述该资源所处层级；具体描述为SaaS'
            },{
              name: 'name',
              description: '资源所属的系统名称，参见“资源所属系统” 定义（自动填写）'
            },{
              name: 'module',
              description: '资源所属系统的模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）'
            },{
              name: 'sub_module',
              description: '资源所属系统的子模块名称，参见资源管理建设方案附录“5.4” 定义，支持填多个（自动填写）'
            },{
              name: 'influence_area',
              description: '描述该资源失效后会影响到的区域范围；具体描述为：全省、某中心、某关键地市、其他地市'
            },{
              name: 'influence_customer',
              description: '描述该资源失效后会影响到的客户：具体描述为：所有客户、全球通客户、神州行客户、动感地带客户等'
            },{
              name: 'influence_system',
              description: '描述该资源失效后会影响到的系统范围，分为：BOSS应用、CRM应用、PBOSS等'
            },{
              name: 'department',
              description: '使用该资源部门（手工填写）'
            },{
              name: 'service_level',
              description: '资源支持服务厂商提供的相应的服务级别（如5x8，7x24等）（手工填写）'
            },{
              name: 'integrator',
              description: '该资源管理建设方案的集成商“参见附录5.2”（自动填写）'
            }
      ],
      //其它类数据
      Others: [
          {
            name: 'location',
            description: '该资源的物理位置'
          }
      ],
      //根类数据
      ResObject: [
                {
                name: 'ciid',
                description: '资源的唯一识别码'
              }, {
                name: 'name',
                description: '资源的名称'
              }, {
                name: 'state',
                description: '该资源的状态，分为：已接收、已部署（替换已安装）、测试中、使用中、维护中、已下线、报废'
              }, {
                name: 'check',
                description: '配置审核活动中，资源的审核状态，分为：已审核，未审核，不匹配，丢失'
              }, {
                name: 'last_check_time',
                description: '最近一次审核该资源的时间，即审核状态从”未审核”变为”已审核”/”不匹配”/”丢失”任一状态的时间；参见“配置审核”'
              }, {
                name: 'create_time',
                description: '该资源被创建的时间YYYY-MM-DD hh:mm（系统自动产生）'
              }, {
                name: 'isdelete',
                description: '该资源是否被删除；分为：正常/已删除'
              }, {
                name: 'delete_time',
                description: '该资源被删除的时间，既删除状态从”正常”变为”已删除”的时间YYYY-MM-DD hh:mm（系统自动产生）'
              }, {
                name: 'last_update_staff:',
                description: '最后更新该资源的人员（系统自动产生）'
              }, {
                name: 'last_update_time',
                description: '最后更新该资源的时间，既最后一次更新资源任一属性的时间；YYYY-MM-DD hh:mm（系统自动产生）'
              }, {
                name: 'description',
                description: '该资源的其他描述信息（手工填写）'
              }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isshow: true,
      ishide: false,
      dialogVisible: false,
      dialogVisibleSet: false,
      dialogVisibleSet_attr: false,
      activeName: 'first',
      active:'',
      query:'',
      multipleSelection: [], //多选的数据
      multipleSelection_attr: [], //多选的数据
      delarr:[],//存放删除的数据
      delarr_attr:[],//存放删除的数据
      content:'列表展示'
    }
  },
  created() {
  },
  mounted() {
    this.init()
	},
  methods: {
    // 初始化数据展示
    init(){
      this.modelList =[];
      service.queryClassResources(this.page).then(res => {
        if(res){
          this.page.totalRecords = parseInt(res.count);
          var temp = res.datas;
          if(temp){
            this.data_none = false;
            service.queryResourcesExample().then(res => {
              debugger
              for(var i = 0; i < temp.length; i++){
                debugger
                var key = temp[i]['name']
                temp[i]['example'] = res[key] 
              }
              this.modelList = temp;
            })
          }else{
            this.data_none = true;
          }
          
        }
      })

    },
    // 初始化扩展属性数据
    init_attr() {
      this.temp = [];
      serviceAttr.queryattributeManag(this.page_attr).then(res => {
        if (res) {
          debugger;
          this.page_attr.totalRecords = parseInt(res.count);
          this.temp = res.datas;
          this.dialogFormVisible = true;
        }
      });
    },
     // 按条件查询
    queryattributeManag() {
      let regExp = /^[a-zA-Z0-9\-_\u4e00-\u9fa5]*$/;
      if (regExp.test(this.page_attr.name) === false) {
        this.$message.error("只能输入中英文和数字,下划线,连接符,进行查询");
        return;
      }
      this.page_attr.pageSize = 5; //每页条数,  默认8条
      this.page_attr.pageNum = 0;
      this.init_attr();
      
    },
    // 属性多选的数据
    handleSelectionChange_attr(val) {
      debugger
      this.multipleSelection_attr = val; 
    },
    // 加入到模型属性中
    on_dialogFormVisible() {
          debugger;
          this.delarr_attr = [];
          const length = this.multipleSelection_attr.length;
          if (length == 0) {
            this.open4();
            return;
          }
          for (let i = 0; i < length; i++) {
            this.delarr_attr.push(this.multipleSelection_attr[i]);
          }
          for(var i=0;i<this.Proper.length;i++){
              for(var j=0;j<this.delarr_attr.length;j++){
                  if(this.Proper[i].name==this.delarr_attr[j].name){ // 如果数据能保证id和name一直配对，则可以少一个比较条件
                      this.$alert("添加失败，存在相同的属性名称,属性名称为:"+this.delarr_attr[j].name , "消息提示", {
                        confirmButtonText: "确定"
                      });
                      return;
                  }
              }
          }
          this.Proper = this.Proper.concat(this.delarr_attr);
          debugger;
          this.dialogFormVisible = false;
          this.$message.success("添加成功！");
    },
    // 每页显示多少条数据
    sizeChange_attr(val) {
      debugger;
      this.page_attr.pageSize = val;
      this.init_attr();
    },
    //翻页
    currentChange_attr(val) {
      debugger;
      this.page_attr.pageNum = val - 1;
      this.init_attr();
    },
    // 多选的数据
    handleSelectionChange(val) {
      debugger
      this.multipleSelection = val; 
    },
    // 按条件查询
    queryResources() {
      let regExp = /^[a-zA-Z0-9_\u4e00-\u9fa5]*$/;
      if (regExp.test(this.query) === false) {
        this.$message.error('只能输入中英文和数字,下划线,进行查询')
        return 
      }
      if(document.querySelector(".is-current")){
        document.querySelector(".is-current").classList.remove("is-current");
      }
        this.page.pageSize = 8; //每页条数,  默认8条
        this.page.pageNum = 0;
        this.page.totalRecords = 0;
        this.page.level = '';
        this.page.type = '';
        this.page.alias = this.query;
        this.page.name = this.query;
      if(this.query != ""){
        this.page.search= true,
        this.page.searchByAny= true,
        this.init()
      }else{
        this.init()
      }
    },
    // 按分类查询
    handleNodeClick(data,node,event) {
      debugger
      if(event){
        event.$el.classList.add("is-current");
      }
      this.page.pageSize = 8; //每页条数,  默认8条
      this.page.pageNum = 0;
      this.page.level = '';
      this.page.alias = '';
      this.page.name = '';
      this.page.type = '';
      this.page.search= false;
      this.page.searchByAny= false;
      if(data.label == '全部资源'){
        this.init();
        return
      }
      if(data.children){
        this.page.level = data.label;
        this.page.type = '';
        this.init();
      }else{
        this.page.level = node.parent.label;
        this.page.type = data.label;
        this.init();
      }
    },
    // 查询条件重置
    reset() {
      this.page_attr.select = "全部";
      this.page_attr.name = "";
      this.page_attr.code = "";
      this.page_attr.checked = false;
    },
    // 关闭护展属性页面
    handleClose_attr(done) {
        this.dialogFormVisible = false;
    },
    // 打开增加页面
    yes_dialogFormVisible() {
      // this.add_form = {};
      debugger;
      this.page_attr.pageSize = 5; //每页条数,  默认8条
      this.page_attr.pageNum = 0;
      this.reset();
      this.init_attr();
    },
    
    // 专有属性删除
    delete_tab(index,user){
      debugger
      if(this.Proper.length == 1){
        this.$message.warning('专有属性不能全部删除！')
        return
      }
      this.$confirm('此操作将删除数据 ' + user.name + ', 是否继续?', '提示', { type: 'warning' })
        .then(() => { // 向服务端请求删除
          this.Proper.splice(index,1);
        })
        .catch(() => {
        this.$message.info('已取消操作!');
      });
    },
    // 模型属性保存
    modelAttributeSave() {
      debugger
      if(JSON.stringify(this.module_attr.attributes) == JSON.stringify(this.Proper)){
        this.dialogVisibleSet = false;
        return;
      }
      this.module_attr.attributes = this.Proper;
      service.modifyAttribute(this.module_attr).then(res => {
              debugger
              if(res.type == 0){
                this.dialogVisibleSet = false;
                this.$alert('修改属性成功', '消息提示', {
                          confirmButtonText: '确定',
                          callback: action => {
                            this.init()
                          }
                        });
              }
              if(res.type == 7){
                  this.$alert('添加失败，存在相同的属性名', '消息提示', {
                    confirmButtonText: '确定',
                  });
              }
            })
            .catch(err => {
                this.$message.error("请求失败！")
            })
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    show_hide() {
      debugger
      this.multipleSelection = [];
      if(this.content == '卡片展示'){
        this.isshow = true
        this.ishide = false
        this.content = '列表展示'
      }else{
        this.isshow = false
        this.ishide = true
        this.content = '卡片展示'
      }
    },
    hide() {
      this.multipleSelection = [];
      this.isshow = false
      this.ishide = true
    },
    handleClose(done) {
        this.$confirm('数据尚未保存，是否确认关闭？')
          .then(_ => {
            this.dialogVisibleSet = false;
            // done();
          })
          .catch(_ => {});
      },
    
    handleClick(tab, event) {
        console.log(tab, event);
    },
    // 单个删除
    deleteInfo(name){
      this.$confirm('此操作将永久删除数据 , 是否继续?', '提示', { type: 'warning' })
        .then(() => { // 向服务端请求删除
          service.deleteInfo(name)
            .then((res) => {
              debugger
              if(res.type == 0){
                this.$message.success('成功删除了数据'+name + '!');
                if(this.modelList.length ===1){
                  this.page.pageNum = this.page.pageNum - 1;
                }
                if(this.page.pageNum <= 0){
                  this.page.pageNum = 0;
                }
                this.$store.dispatch('treeData');
                this.init()
              }
              if(res.type == 4){
                this.$message.error(name +'模型中已存在数据!');
              }
              if(res.type == 5){
                this.$message.error(name +'模型中已存在子类模型!');
              }
            })
        }) 
        .catch(() => {
        this.$message.info('已取消操作!');
      });
    },
    // 多选功能
    selected(index,item){
      debugger

      if(!item.active){
        this.$set(item,'active', 1)
        this.multipleSelection.push(item);
      }else{
        this.$set(item,'active',0)
        this.multipleSelection.splice(this.multipleSelection.indexOf(item),1);
      }
    },
    // 批量删除
    delAll() {     
      debugger
      this.delarr = [];
      const length = this.multipleSelection.length;
      if(length == 0){
          this.open4()
          return;
      }     
      for (let i = 0; i < length; i++) {  
        this.delarr.push(this.multipleSelection[i].name)     
      }
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', { type: 'warning' })
        .then(() => { // 向服务端请求删除
          service.deleteInfoMultiple(this.delarr)
          .then((res) => {
            debugger
            if(res.type == 0){
              this.$message.success('成功删除了数据!');
              if(this.modelList.length === length){
                  this.page.pageNum = this.page.pageNum - 1;
              }
              if(this.page.pageNum <= 0){
                  this.page.pageNum = 0;
              }
              this.$store.dispatch('treeData');
              this.init()
            }
            if(res.type == 4){
              this.$message.error('模型中已存在数据!');
            }
            if(res.type == 5){
              this.$message.error('模型中已存在子类模型!');
            }
          })
        }) 
        .catch(() => {
        this.$message.info('已取消操作!');
      });
    },
    // 查看模型详情页面
    modify(index,item) {
      debugger
      this.module_attr = item;
      // this.version = item.version;
      this.dialogVisibleSet = true;
      this.Proper = JSON.parse(JSON.stringify(item.attributes));
      this.ResObject = this.ResObject;
      if(item.type =='逻辑类'){
        this.classification = this.Logic;
        this.classification_tab = '逻辑类通用属性'
      }
      if(item.type =='应用类'){
        this.classification = this.Application;
        this.classification_tab = '应用类通用属性'
      }
      if(item.type =='业务类'){
        this.classification = this.Business;
        this.classification_tab = '业务类通用属性'
      }
      if(item.type =='物理类'){
        this.classification = this.Physical;
        this.classification_tab = '物理类通用属性'
      }
      if(item.type =='其他类'){
        this.classification = this.Others;
        this.classification_tab = '其他类通用属性'
      }
      
      
    },
    // 每页显示多少条数据
    sizeChange(val) {
         debugger
         this.page.pageSize = val;
         this.init()
    },
     //翻页
    currentChange(val) {
         debugger
         this.page.pageNum=val-1;
         this.init()
    },
    open4() {
        this.$message.error('您还未选择数据！');
    },
  }
}
</script>

<style scoped>
.show{
  display: block;
}
.hide{
  display: none;
}
.el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #fff;
    border-radius: 4px;
    margin-right: 10px;
  }

  .el-main {
    /* background-color: #E9EEF3; */
    /* color: #333; */
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .app-container{
    padding: 10px;
  }
  main.el-main{
    margin-left: 10px;
    padding: 0px;
    margin-top: 10px;
  }
  .head {
    height: 50px;
    line-height: 50px;
    /* border-bottom: 1px solid #ccc; */
    text-align: left;
    text-indent: 18px;
    font-size: 14px;
    font-weight: 700;
}
.el-tree {
    background: none;
}
.search {
    height: 50px;
    width: 280px;
    position: relative;
    float: left;
}
.search input {
    width: 100%;
    height: 100%;
}
header.el-header {
    height: 50px !important;
    line-height: 50px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
}
i.el-icon-search {
  position: absolute;
    top: 15px;
    right: 12px;
}
.operation {
    width: 60%;
    position: relative;
    height: 50px;
    float: right;
    text-align: left;
    font-size: 14px;
    text-align: right;
}
.operation .el-button {
    /* border-radius: 5px;
    border: none;
    padding: 5px; */
    margin-left: 10px !important;
}
.operation .switch {
  font-size: 20px;
  cursor: pointer;
}
ul.list {
    font-size: 12px;
}
li.list_itme {
    width: 215px;
    height: 180px;
    float: left;
    margin-right: 12px;
    background: #fff;
    margin-bottom: 12px;
    border-radius: 6px;
    -webkit-backface-visibility: hidden;
}
li.list_itme:hover {
    /* -webkit-box-shadow: 0 7px 10px 0 rgba(0,0,0,.2); */
    -webkit-box-shadow: 0 10px 12px 0 rgba(0,0,0,.2);
    box-shadow: 0 10px 12px 0 rgba(0,0,0,.2);
    transform: translate3d(0, -2px, 0);
}
.active{
    color: #fff;
    background: #66b1ff;
}
.list_itme_head {
    height: 40px;
    line-height: 40px;
    border-radius: 6px 6px 0 0;
    border-bottom: 1px Dotted #ccc;
    background: #ecf5ff;
}
.list_itme_head span {
    float: left;
    padding-left: 10px;
    font-weight: 700;
    cursor: pointer;
}
.list_itme_head i {
    float: right;
    padding: 7px;
}
.list_itme_sub {
    padding-right: 10px;
    text-align: right;
} 
.list_itme_sub .el-button--medium.is-circle{
    padding: 5px !important;
} 
.list_itme_content {
    height: 130px;
    padding: 10px;
}
.list_itme_content p {
    height: 30px;
    line-height: 30px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
    margin-left: 26px;
    font-size: 16px;
    font-weight: 700;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
.el-dialog__body {
    padding: 15px 20px;
    color: #606266;
    font-size: 14px;
}
.data_none {
    font-size: 14px;
    min-height: 60px;
    text-align: center;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: #fff;
}
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf !important;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.paging {
    padding-right: 50px;
    text-align: right;
    margin-top: 24px;
}
.resource_name {
  width: 30%;
  display: inline-block;
}
.resource_name .el-input,
.el-select {
  width: 60%;
}
.resource_crux {
  width: 15%;
  display: inline-block;
}
.resource_crux .el-checkbox {
  padding: 5px 20px 9px 10px;
}
.fr {
  float: right;
  margin-top: 9px;
}
</style>

