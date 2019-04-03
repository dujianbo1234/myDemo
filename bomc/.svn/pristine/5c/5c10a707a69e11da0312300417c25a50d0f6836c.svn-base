<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header>
          <div class="operation">
            <div class="resource_name">
              <span>资源状态</span>
              <el-select v-model="page.resource_state" size="mini" @change="query_resource_state">
                <el-option label="待审核" value="0"></el-option>
                <el-option label="已审核" value="1"></el-option>
                <el-option label="已废弃" value="2"></el-option>
                <el-option label="已存在" value="3"></el-option>
              </el-select>
            </div>
            <div class="resource_name">
              <el-input v-model="query" placeholder="请输入关键字" size="mini"></el-input>
            </div>
            <el-button type="primary" size="mini" @click="queryDiscoveryCondition()"> 查询</el-button>
            
            <el-button v-if ="page.resource_state != '2' && page.resource_state != '3'" type="primary" icon="el-icon-delete" size="mini" class="fr" @click="delAll">删除</el-button>
                
          </div>
        </el-header>
        <el-main>
          <div class="template_tab">
            <template  >
              <el-table :data="temp" v-if="page.resource_state == '0'" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  min-width="10%"/>
                <el-table-column
                  prop="id"
                  label="自动化发现资源ID"
                  min-width="35%"/>
                <el-table-column
                  label="自动化发现状态"
                  min-width="30%">
                  <template slot-scope="scope">
                    <span v-if="scope.row.discovery_state == 0">待审核</span>
                    <span v-if="scope.row.discovery_state == 1">已审核</span>
                    <span v-if="scope.row.discovery_state == 2">已废弃</span>
                    <span v-if="scope.row.discovery_state == 3">已存在</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="自动化发现时间"
                  min-width="30%">
                  <template slot-scope="scope">
                    {{scope.row.discovery_time|formatTime('YMDHMS')}}
                  </template>
                </el-table-column>
                <el-table-column label="更多" min-width="25%">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="deleteInfo(scope.row)" v-if="page.resource_state == '0'">废弃</el-button>
                    <el-button size="mini" @click="on_discoveryDetails(scope.row)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-table :data="temp" v-if="page.resource_state == '1'" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  min-width="10%"/>
                <el-table-column
                  prop="id"
                  label="自动化发现资源ID"
                  min-width="35%"/>
                <el-table-column
                  label="自动化发现状态"
                  min-width="30%">
                  <template slot-scope="scope">
                    <span v-if="scope.row.discovery_state == 0">待审核</span>
                    <span v-if="scope.row.discovery_state == 1">已审核</span>
                    <span v-if="scope.row.discovery_state == 2">已废弃</span>
                    <span v-if="scope.row.discovery_state == 3">已存在</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="审核时间"
                  min-width="30%">
                  <template slot-scope="scope">
                    {{scope.row.timestamp|formatTime('YMDHMS')}}
                  </template>
                </el-table-column>
                <el-table-column label="更多" min-width="25%">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="deleteInfo(scope.row)" v-if="page.resource_state == '1'">废弃</el-button>
                    <el-button size="mini" @click="on_discoveryDetails(scope.row)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-table :data="temp" v-if="page.resource_state == '2'" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  min-width="10%"/>
                <el-table-column
                  prop="id"
                  label="自动化发现资源ID"
                  min-width="35%"/>
                <el-table-column
                  label="自动化发现状态"
                  min-width="30%">
                  <template slot-scope="scope">
                    <span v-if="scope.row.discovery_state == 0">待审核</span>
                    <span v-if="scope.row.discovery_state == 1">已审核</span>
                    <span v-if="scope.row.discovery_state == 2">已废弃</span>
                    <span v-if="scope.row.discovery_state == 3">已存在</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="废弃时间"
                  min-width="30%">
                  <template slot-scope="scope">
                    {{scope.row.timestamp|formatTime('YMDHMS')}}
                  </template>
                </el-table-column>
                <el-table-column label="更多" min-width="25%">
                  <template slot-scope="scope">
                    <!-- <el-button size="mini" @click="deleteInfo(scope.row)" v-if="page.resource_state == '0'">废弃</el-button> -->
                    <el-button size="mini" @click="on_discoveryDetails(scope.row)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-table :data="temp" v-if="page.resource_state == '3'" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  min-width="10%"/>
                <el-table-column
                  prop="id"
                  label="自动化发现资源ID"
                  min-width="35%"/>
                <el-table-column
                  label="自动化发现状态"
                  min-width="30%">
                  <template slot-scope="scope">
                    <span v-if="scope.row.discovery_state == 0">待审核</span>
                    <span v-if="scope.row.discovery_state == 1">已审核</span>
                    <span v-if="scope.row.discovery_state == 2">已废弃</span>
                    <span v-if="scope.row.discovery_state == 3">已存在</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="废弃时间"
                  min-width="30%">
                  <template slot-scope="scope">
                    {{scope.row.timestamp|formatTime('YMDHMS')}}
                  </template>
                </el-table-column>
                <el-table-column label="更多" min-width="25%">
                  <template slot-scope="scope">
                    <!-- <el-button size="mini" @click="deleteInfo(scope.row)" v-if="page.resource_state == '0'">废弃</el-button> -->
                    <el-button size="mini" @click="on_discoveryDetails(scope.row)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-main>
        <el-footer>
          <paging :page = "page" :size-change = "sizeChange" :current-change = "currentChange"/>
        </el-footer>
        <el-dialog title="新增基线" :visible.sync="addDiscoveryForm" width="35%" :before-close="attributeAdd" :close-on-click-modal = false>
          <el-form :model="add_form"  ref="add_form" :rules="rules1">
            <el-form-item label="基线名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="add_form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="基线描述" :label-width="formLabelWidth" prop="description">
              <el-input v-model="add_form.description" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="attributeAdd()">取 消</el-button>
            <el-button type="primary" @click="add_subDiscovery('add_form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="资源发现详情" :visible.sync="discoveryDetails" width="50%"  :close-on-click-modal = false>
          <el-form ref="discoveryData" :model="discoveryData" label-width="100px">
            <div class="discoveryDetails">
              <div class="head_Details">基本信息</div>
              <el-form-item label="资源发现id">
                <span>{{discoveryData.id}}</span>
              </el-form-item>
              <el-form-item label="资源数据id" v-if="discoveryData.ciid">
                <span>{{discoveryData.ciid}}</span>
              </el-form-item>
              <el-form-item label="资源状态">
                <span v-if="discoveryData.discovery_state == 0">待审核</span>
                <span v-if="discoveryData.discovery_state == 1">已审核</span>
                <span v-if="discoveryData.discovery_state == 2">已废弃</span>
              </el-form-item>
              <el-form-item label="操作时间">
                <span>{{discoveryData.discovery_time|formatTime('YMDHMS')}}</span>
              </el-form-item>
            </div>
            
            <div class="discoveryDetails">
              <div class="head_Details">发现属性</div>
              <el-form-item :label = "item.name"  v-for="(item, index) in discoveryData.attributes" :key="index">
                <span>{{item.value?item.value:'空'}}</span>
              </el-form-item>
            </div>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="discoveryDetails = false">取 消</el-button>
            <el-button v-if="page.resource_state == '0'" type="primary" @click="examine()">开始审核</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="选择模型"
          :visible.sync="dialogFormVisible"
          width="35%"
          :close-on-click-modal="false"
          :close-on-press-escape="false" class="choice_model"
          :before-close="model_Close"
          >
          <el-form :model="form" ref="form" :rules="rules2">
            <div class="block">
              <el-form-item label="所属层级/资源类型/资源模型父类" prop="type" class="content_main_select">
                <el-cascader
                  expand-trigger="hover"
                  :options="treeData"
                  change-on-select
                  v-model="form.type"
                  @change="handleChange"
                  style="width:70%"
                ></el-cascader>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="填写资源属性"
          :visible.sync="dialog_steps"
          width="80%"
          :before-close="dialog_steps_Close"
          :close-on-click-modal = false>
          <el-steps align-center :active="active" finish-status="success">
            <el-step :title="active == 0?'进行中':'步骤1'"  description="填写根类通用属性"></el-step>
            <el-step :title="active == 1?'进行中':'步骤2'" description="填写分类属性"></el-step>
            <el-step :title="active == 2?'进行中':'步骤3'" description="填写专有属性"></el-step>
          </el-steps>

          <el-form :model="General_attribute" :rules="rules" ref="General_attribute" label-width="100px" class="demo-ruleForm">
            <div class="content_head" v-show="active == 0">
              <h3 class="content_title">根类通用属性设置</h3>
              <div class="content_main">
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="搜索代码" prop="ciid">
                      <span class="search_code">{{searchCode}}</span>
                      <el-input class="code" v-model="General_attribute.ciid" placeholder="请输入搜索代码" size="mini"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="资源名称" prop="ciname">
                      <el-input v-model="General_attribute.ciname" placeholder="请输入资源名称" size="mini"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="状态" prop="state" v-if="levelClass == '物理类'">
                      <el-select v-model="General_attribute.state" placeholder="请选择状态" size="mini">
                        <el-option label="已接收" value="已接收"></el-option>
                        <el-option label="已部署" value="已部署"></el-option>
                        <el-option label="测试中" value="测试中"></el-option>
                        <el-option label="使用中" value="使用中"></el-option>
                        <el-option label="维护中" value="维护中"></el-option>
                        <el-option label="已下线" value="已下线"></el-option>
                        <el-option label="报废" value="报废"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="状态" v-if="levelClass != '物理类'">
                      <el-input  v-model="General_attribute.state" size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="审核状态" prop="check">
                      <el-select v-model="General_attribute.check" placeholder="请选择审核状态" size="mini">
                        <el-option label="已审核" value="已审核"></el-option>
                        <el-option label="未审核" value="未审核"></el-option>
                        <el-option label="不匹配" value="不匹配"></el-option>
                        <el-option label="丢失" value="丢失"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="关键资源">
                      <el-checkbox-group v-model="crux">
                        <el-checkbox  name="crux"></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="资源描述" prop="description">
                      <el-input v-model="General_attribute.description" placeholder="请输入资源描述" size="mini"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </el-form>

          <el-form :model="Categorical_attribute"  ref="Categorical_attribute" label-width="100px" class="demo-ruleForm">
            <div class="content_head" v-if="levelClass == '逻辑类' && active == 1 ">
              <h3 class="content_title">逻辑类属性设置</h3>
              <div class="content_main">
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="所属系统" prop="name">
                      <el-select v-model="Categorical_attribute.name" disabled="disabled" size="mini">
                        <el-option label="全省" value="全省"></el-option>
                        <el-option label="某中心" value="某中心"></el-option>
                        <el-option label="某关键城市" value="某关键城市"></el-option>
                        <el-option label="其他城市" value="其他城市"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="所属模块" prop="module">
                      <el-input v-model="Categorical_attribute.module"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="子模块" prop="sub_module">
                      <el-input v-model="Categorical_attribute.sub_module"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="影响区域" >
                      <el-select v-model="Categorical_attribute.influence_area" placeholder="请选择影响区域" size="mini">
                        <el-option label="全省" value="全省"></el-option>
                        <el-option label="某中心" value="某中心"></el-option>
                        <el-option label="某关键城市" value="某关键城市"></el-option>
                        <el-option label="其他城市" value="其他城市"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="影响客户" >
                      <el-select v-model="Categorical_attribute.influence_customer" placeholder="请选择影响客户" size="mini">
                        <el-option label="所有客户" value="所有客户"></el-option>
                        <el-option label="全球通客户" value="全球通客户"></el-option>
                        <el-option label="神州行客户" value="神州行客户"></el-option>
                        <el-option label="动感地带客户" value="动感地带客户"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="影响系统" >
                      <el-select v-model="Categorical_attribute.influence_system" placeholder="请选择影响系统" size="mini">
                        <el-option label="BOSS系统" value="BOSS系统"></el-option>
                        <el-option label="CRM应用" value="CRM应用"></el-option>
                        <el-option label="PBOSS" value="PBOSS"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="使用部门" >
                      <el-select v-model="Categorical_attribute.department" placeholder="请选择使用部门" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="服务级别" >
                      <el-select v-model="Categorical_attribute.service_level" placeholder="请选择服务级别" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="集成商">
                      <el-input v-model="Categorical_attribute.integrator"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="服务提供商">
                      <el-input v-model="Categorical_attribute.service_provider"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
            <div class="content_head" v-if="levelClass == '应用类' && active == 1 ">
              <h3 class="content_title">应用类属性设置</h3>
              <div class="content_main">
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="所属系统" prop="name">
                      <el-select v-model="Categorical_attribute.name" disabled="disabled" size="mini">                       
                        <el-option label="全省" value="全省"></el-option>                       
                        <el-option label="某中心" value="某中心"></el-option>                       
                        <el-option label="某关键城市" value="某关键城市"></el-option>                       
                        <el-option label="其他城市" value="其他城市"></el-option>                     
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="所属模块" prop="module">
                      <el-input v-model="Categorical_attribute.module"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="子模块" prop="sub_module">
                      <el-input v-model="Categorical_attribute.sub_module"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="影响区域" >
                      <el-select v-model="Categorical_attribute.influence_area" placeholder="请选择影响区域" size="mini">
                        <el-option label="全省" value="全省"></el-option>
                        <el-option label="某中心" value="某中心"></el-option>
                        <el-option label="某关键城市" value="某关键城市"></el-option>
                        <el-option label="其他城市" value="其他城市"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="影响客户" >
                      <el-select v-model="Categorical_attribute.influence_customer" placeholder="请选择影响客户" size="mini">
                        <el-option label="所有客户" value="所有客户"></el-option>
                        <el-option label="全球通客户" value="全球通客户"></el-option>
                        <el-option label="神州行客户" value="神州行客户"></el-option>
                        <el-option label="动感地带客户" value="动感地带客户"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="影响系统" >
                      <el-select v-model="Categorical_attribute.influence_system" placeholder="请选择影响系统" size="mini">
                        <el-option label="BOSS系统" value="BOSS系统"></el-option>
                        <el-option label="CRM应用" value="CRM应用"></el-option>
                        <el-option label="PBOSS" value="PBOSS"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="使用部门" >
                      <el-select v-model="Categorical_attribute.department" placeholder="请选择使用部门" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="服务级别" >
                      <el-select v-model="Categorical_attribute.service_level" placeholder="请选择服务级别" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="集成商">
                      <el-input v-model="Categorical_attribute.integrator"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="服务提供商">
                      <el-input v-model="Categorical_attribute.service_provider"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
            <div class="content_head" v-if="levelClass == '物理类' && active == 1 ">
              <h3 class="content_title">物理属性设置</h3>
              <div class="content_main">
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="所属系统" prop="name">
                      <el-select v-model="Categorical_attribute.name" disabled="disabled" size="mini">
                        <el-option label="全省" value="全省"></el-option>
                        <el-option label="某中心" value="某中心"></el-option>
                        <el-option label="某关键城市" value="某关键城市"></el-option>
                        <el-option label="其他城市" value="其他城市"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="所属模块" prop="module">
                      <el-input v-model="Categorical_attribute.module"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="子模块" prop="sub_module">
                      <el-input v-model="Categorical_attribute.sub_module"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="影响区域" >
                      <el-select v-model="Categorical_attribute.influence_area" placeholder="请选择影响区域" size="mini">
                        <el-option label="全省" value="全省"></el-option>
                        <el-option label="某中心" value="某中心"></el-option>
                        <el-option label="某关键城市" value="某关键城市"></el-option>
                        <el-option label="其他城市" value="其他城市"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="影响客户" >
                      <el-select v-model="Categorical_attribute.influence_customer" placeholder="请选择影响客户" size="mini">
                        <el-option label="所有客户" value="所有客户"></el-option>
                        <el-option label="全球通客户" value="全球通客户"></el-option>
                        <el-option label="神州行客户" value="神州行客户"></el-option>
                        <el-option label="动感地带客户" value="动感地带客户"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="影响系统" >
                      <el-select v-model="Categorical_attribute.influence_system" placeholder="请选择影响系统" size="mini">
                        <el-option label="BOSS系统" value="BOSS系统"></el-option>
                        <el-option label="CRM应用" value="CRM应用"></el-option>
                        <el-option label="PBOSS" value="PBOSS"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="使用部门" >
                      <el-select v-model="Categorical_attribute.department" placeholder="请选择使用部门" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="服务级别" >
                      <el-select v-model="Categorical_attribute.service_level" placeholder="请选择服务级别" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="集成商">
                      <el-input v-model="Categorical_attribute.integrator"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="服务提供商">
                      <el-input v-model="Categorical_attribute.service_provider"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
            <div class="content_head" v-if="levelClass == '业务类' && active == 1 ">
              <h3 class="content_title">业务类属性设置</h3>
              <div class="content_main">
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="所属系统" prop="name">
                      <el-select v-model="Categorical_attribute.name" disabled="disabled" size="mini">                       
                        <el-option label="全省" value="全省"></el-option>                       
                        <el-option label="某中心" value="某中心"></el-option>                       
                        <el-option label="某关键城市" value="某关键城市"></el-option>                       
                        <el-option label="其他城市" value="其他城市"></el-option>                     
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="所属模块" prop="module">
                      <el-input v-model="Categorical_attribute.module"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="子模块" prop="sub_module">
                      <el-input v-model="Categorical_attribute.sub_module"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="影响区域" >
                      <el-select v-model="Categorical_attribute.influence_area" placeholder="请选择影响区域" size="mini">
                        <el-option label="全省" value="全省"></el-option>
                        <el-option label="某中心" value="某中心"></el-option>
                        <el-option label="某关键城市" value="某关键城市"></el-option>
                        <el-option label="其他城市" value="其他城市"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="影响客户" >
                      <el-select v-model="Categorical_attribute.influence_customer" placeholder="请选择影响客户" size="mini">
                        <el-option label="所有客户" value="所有客户"></el-option>
                        <el-option label="全球通客户" value="全球通客户"></el-option>
                        <el-option label="神州行客户" value="神州行客户"></el-option>
                        <el-option label="动感地带客户" value="动感地带客户"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="影响系统" >
                      <el-select v-model="Categorical_attribute.influence_system" placeholder="请选择影响系统" size="mini">
                        <el-option label="BOSS系统" value="BOSS系统"></el-option>
                        <el-option label="CRM应用" value="CRM应用"></el-option>
                        <el-option label="PBOSS" value="PBOSS"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="使用部门" >
                      <el-select v-model="Categorical_attribute.department" placeholder="请选择使用部门" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="服务级别" >
                      <el-select v-model="Categorical_attribute.service_level" placeholder="请选择服务级别" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="集成商">
                      <el-input v-model="Categorical_attribute.integrator"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="服务提供商">
                      <el-input v-model="Categorical_attribute.service_provider"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
            <div class="content_head" v-if="levelClass == '其他类' && active == 1 ">
              <h3 class="content_title">其他类属性设置</h3>
              <div class="content_main">
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="所属系统" prop="name">
                      <el-select v-model="Categorical_attribute.name" disabled="disabled" size="mini">                       
                        <el-option label="全省" value="全省"></el-option>                       
                        <el-option label="某中心" value="某中心"></el-option>                       
                        <el-option label="某关键城市" value="某关键城市"></el-option>                       
                        <el-option label="其他城市" value="其他城市"></el-option>                     
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="所属模块" prop="module">
                      <el-input v-model="Categorical_attribute.module"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="子模块" prop="sub_module">
                      <el-input v-model="Categorical_attribute.sub_module"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="影响区域" >
                      <el-select v-model="Categorical_attribute.influence_area" placeholder="请选择影响区域" size="mini">
                        <el-option label="全省" value="全省"></el-option>
                        <el-option label="某中心" value="某中心"></el-option>
                        <el-option label="某关键城市" value="某关键城市"></el-option>
                        <el-option label="其他城市" value="其他城市"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="影响客户" >
                      <el-select v-model="Categorical_attribute.influence_customer" placeholder="请选择影响客户" size="mini">
                        <el-option label="所有客户" value="所有客户"></el-option>
                        <el-option label="全球通客户" value="全球通客户"></el-option>
                        <el-option label="神州行客户" value="神州行客户"></el-option>
                        <el-option label="动感地带客户" value="动感地带客户"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="影响系统" >
                      <el-select v-model="Categorical_attribute.influence_system" placeholder="请选择影响系统" size="mini">
                        <el-option label="BOSS系统" value="BOSS系统"></el-option>
                        <el-option label="CRM应用" value="CRM应用"></el-option>
                        <el-option label="PBOSS" value="PBOSS"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="使用部门" >
                      <el-select v-model="Categorical_attribute.department" placeholder="请选择使用部门" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="服务级别" >
                      <el-select v-model="Categorical_attribute.service_level" placeholder="请选择服务级别" size="mini">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <div class="content_row">
                  <div class="content_col">
                    <el-form-item label="集成商">
                      <el-input v-model="Categorical_attribute.integrator"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                  <div class="content_col">
                    <el-form-item label="服务提供商">
                      <el-input v-model="Categorical_attribute.service_provider"  size="mini" disabled="disabled"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </el-form>

          <!-- <el-form :model="Proprietary_attributes" :rules="rules" ref="Proprietary_attributes" label-width="100px" class="demo-ruleForm">
            <div class="content_head Proper" v-show="active == 2">
              <h3 class="content_title">专有属性设置</h3>
              <div class="content_col">
                <div class="content_main">
                  <el-form-item :label= item.description  v-for="(item, index) in Proprietary" :key="index">
                    <el-input v-model="Proprietary_attributes[item.name]" :disabled="item.name=='ip'" size="mini"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <el-form-item class="Proprietary_save">
              <el-button @click="next">{{active == 2?"保存":'下一步'}}</el-button>
              <el-button type="info" @click="dialog_steps_Close">取消</el-button>
            </el-form-item>
          </el-form> -->
          <el-form :model="Proprietary" ref="Proprietary" label-width="150px" class="demo-dynamic">
            <div class="content_head Proper" v-show="active == 2">
              <h3 class="content_title">专有属性设置</h3>
              <div class="content_col">
                <div class="content_main">
                    <el-form-item
                        v-for="(item, index) in Proprietary.string"
                        :label = item.description
                        :key="item.key"
                        :prop="item.required?'string.' + index + '.'+item.name:''"
                        :class="{ active: !item.required }"
                        :rules="{
                          required: true, message: '关键属性不能为空', trigger: 'blur',
                        }"
                      >
                      <el-tooltip content="字符类属性" placement="right">
                        <el-input type="int" v-model="Proprietary.string[index][item.name]" :disabled="item.name=='ip'"></el-input>
                      </el-tooltip>
                    </el-form-item>
                    <el-form-item
                        v-for="(item, index) in Proprietary.int"
                        :label = item.description
                        :key="item.key"
                        :prop="item.required?'int.' + index + '.'+item.name:''"
                        :class="{ active: !item.required }"
                        :rules="[
                          { required: true, message: '关键属性不能为空', trigger: 'blur'},
                          { type: 'number', message: '数字类属性必须为数字值'}
                        ]"
                      >
                      <el-tooltip content="数字类属性" placement="right">
                        <el-input v-model.number="Proprietary.int[index][item.name]"></el-input>
                      </el-tooltip>
                    </el-form-item>
                    <el-form-item
                        v-for="(item, index) in Proprietary.boolean"
                        :label = item.description
                        :key="item.key"
                        :prop="item.required?'boolean.' + index + '.'+item.name:''"
                        :class="{ active: !item.required }"
                        :rules="[
                          { required: true, message: '关键属性不能为空', trigger: 'change'},
                        ]"
                      >
                      <el-tooltip content="单选类属性" placement="right">
                        <el-select v-model="Proprietary.boolean[index][item.name]" placeholder="请选择活动区域">
                          <el-option label="是" value="true"></el-option>
                          <el-option label="否" value="false"></el-option>
                        </el-select>
                      </el-tooltip>
                    </el-form-item>
                    <el-form-item
                        v-for="(item, index) in Proprietary.date"
                        :label = item.description
                        required
                        :key="item.key"
                        :class="{ active: !item.required }"
                        style="width: 60%;"
                      >
                      <el-tooltip  content="时间类属性" placement="right">
                        <el-row>
                        <el-col :span="11">
                          <el-form-item style="width: 100%;" :prop="item.required?'date.' + index + '.date1':''"
                          :rules="[
                            { required: true, message: '关键属性不能为空', trigger: 'blur'},
                          ]"
                          >
                            <el-date-picker type="date" placeholder="选择日期" v-model="Proprietary.date[index]['date1']" style="width: 100%;"></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1" style="text-align: center;"> -</el-col>
                        <el-col :span="11">
                          <el-form-item style="width: 100%;" :prop="item.required?'date.' + index + '.date2':''"
                          :rules="[
                            { required: true, message: '关键属性不能为空', trigger: 'blur'},
                          ]"
                          >
                            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="Proprietary.date[index]['date2']" style="width: 100%;"></el-time-picker>
                          </el-form-item>
                        </el-col>
                        </el-row>
                      </el-tooltip>
                    </el-form-item>
                    <el-form-item
                        v-for="(item, index) in Proprietary.array"
                        :label = item.description
                        :key="item.key"
                        :prop="item.required?'array.' + index + '.value':''"
                        :class="{ active: !item.required }"
                        :rules="{
                          required: true, message: '关键属性不能为空', trigger: 'blur',
                        }"
                        style="width: 70%;"
                      >
                      <el-tooltip content="数组类属性" placement="right">
                        <el-input v-model="Proprietary.array[index]['value']" style="width: 50%;"></el-input>
                      </el-tooltip>
                      <el-button @click="addDomain(item,index)" v-if="index < 1">新增</el-button>
                      <el-button @click.prevent="removeArray(Proprietary.array[index])" v-if="index > 0">删除</el-button>
                    </el-form-item>
                    <el-form-item
                        v-for="(item, index) in Proprietary.password"
                        :label = item.description
                        required
                        :key="item.key"
                        :class="{ active: !item.required }"
                        style="width: 70%;"
                      >
                      <el-tooltip content="帐号类属性" placement="right">
                        <div>
                            <el-col :span="10">
                              <el-form-item style="width: 100%;" :prop="item.required?'password.' + index + '.user':''"
                              :rules="[
                                { required: true, message: '关键属性不能为空', trigger: 'blur'},
                              ]"
                              >
                                <el-input  placeholder="请输入帐号名称" autocomplete="off" v-model="Proprietary.password[index]['user']"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col class="line" :span="1" style="text-align: center;"> -</el-col>
                            <el-col :span="10">
                              <el-form-item style="width: 100%;" :prop="item.required?'password.' + index + '.pass':''"
                              :rules="[
                                { required: true, message: '关键属性不能为空', trigger: 'blur'},
                              ]"
                              >
                                <el-input type="password"  autocomplete="off" placeholder="请输入帐号密码" v-model="Proprietary.password[index]['pass']"></el-input>
                              </el-form-item>
                            </el-col>
                        </div>
                      </el-tooltip>
                      <el-button @click="addAccounts(item)" v-if="index < 1" style="position: absolute;bottom: 0;right: 0;"> 新增</el-button>
                      <el-button @click.prevent="removeAccounts(Proprietary.password[index])" v-if="index > 0" style="position: absolute;bottom: 0;right: 0;">删除</el-button>
                    </el-form-item>
                </div>
              </div>
            </div>
            <el-form-item class="Proprietary_save">
              <el-button @click="step" :disabled="active == 0">上一步</el-button>
              <el-button @click="next">{{active == 2?"保存":'下一步'}}</el-button>
              <el-button type="info" @click="dialog_steps_Close">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>  
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Paging from "@/modules/rms/components/Paging";
import * as service from "../../../api/automation/discovery/discovery.js";
export default {
  components: {
    Paging
  },
  data() {
    var attributeData = (rule, value, callback) => {
      if (/^[a-zA-Z]*$/.test(value) === false) {
        return callback(new Error("名称只能输入英文!"));
      } else {
        callback();
      }
    };
    var isdescription = (rule, value, callback) => {
      let regExp = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]*$/;
      if (regExp.test(value) === false) {
        return callback(new Error("只能输入中英文和数字,下划线,连接符!"));
      } else {
        callback();
      }
    };
    var levelType = (rule, value, callback) => {
      if (value.length < 3) {
        return callback(new Error("资源模型父类不能为空"));
      } else {
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      let regExp = /^[A-Z,0-9]{6}$/;
      if (regExp.test(value) === false) {
        callback(new Error("只能输入6位大写字母和数字"));
      }
      var data = {};
      debugger;
      data.ciid = this.searchCode + this.General_attribute.ciid;
      data.model = this.$store.state.resourceManagement.name;
      service.judgeSearchcode(data).then(res => {
        debugger;
        if (res.type == 0) {
          callback();
        }
        if (res.type == 2) {
          callback(new Error("搜索代码已重复"));
        }
      });
    };
    return {
      query: "",
      temp: [],
      page: {
        pageSize: 8, //每页条数,  默认8条
        totalRecords: 0, //总条数
        pageSizes: [10, 20, 30, 40], // 分几页
        pageNum: 0, //页数从0开始
        resource_state: "0", //分类展示
        name: "",
        description: "",
        id: "",
        search: false,
        searchByAny: false
      },
      form: {
        type: []
      },
      multipleSelection: [], //多选的数据
      delarr: [], //存放删除的数据
      // 每一条的详情数据
      discoveryData: {
        id: "",
        citype: "",
        host: "",
        discovery_time: "",
        discovery_state: "",
        ciid: "",
        timestamp: "",
        attributes: [
          {
            name: "",
            type: "",
            description: "",
            value: ""
          }
        ]
      },

      active: 0,
      discoveryDetails: false,
      addDiscoveryForm: false,
      dialogFormVisible: false,
      dialog_steps: false,
      add_form: {},
      isip: false,
      // 根类属性
      General_attribute: {
        ciname: "",
        ciid: "",
        state: "使用中",
        check: "",
        description: ""
      },
      // 分类属性
      Categorical_attribute: {
        module: "系统自动填写",
        name: "在线计费",
        sub_module: "系统自动填写",
        influence_customer: "",
        influence_system: "",
        influence_area: "",
        department: "",
        service_level: "",
        integrator: "系统自动填写",
        service_provider: "系统自动填写"
      },
      // 专有属性
      // Proprietary_attributes: {},
      ruleForm: {
        isimportant: false,
        type: "",
        last_check_time: "",
        delete_time: "",
        create_time: "",
        manager: "dadadas",
        level: "",
        last_update_time: "",
        last_update_staff: "系统管理员",
        manager: "根类属性登录用户",
        isdelete: "正常",
        proprietary:{}
      },
      crux: [],
      searchCode: "",
      // 专有属性
      Proprietary: {
        string: [],
        int: [],
        boolean: [],
        date: [],
        array: [],
        password: []
      },
      ip:'',
      formLabelWidth: "90px",
      rules: {
        ciname: [
          { required: true, message: "请输入资源名称", trigger: "blur" },
          { validator: isdescription, trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        description: [
          // { required: true, message: '请输入资源名称', trigger: 'blur' },
          { min: 0, max: 20, message: "长度不能超过20个字符", trigger: "blur" },
          { validator: isdescription, trigger: "blur" }
        ],
        ciid: [
          { required: true, message: "请输入代码片段", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          },
          { validator: checkCode, trigger: "blur" }
        ],
        state: [{ required: true, message: "请选择状态", trigger: "change" }],
        check: [
          { required: true, message: "请选择审核状态", trigger: "change" }
        ],
        influence_area: [
          { required: true, message: "请选择影响区域", trigger: "change" }
        ],
        influence_system: [
          { required: true, message: "请选择影响系统", trigger: "change" }
        ],
        influence_customer: [
          { required: true, message: "请选择影响客户", trigger: "change" }
        ],
        department: [
          { required: true, message: "请选择使用部门", trigger: "change" }
        ],
        service_level: [
          { required: true, message: "请选择服务级别", trigger: "change" }
        ],
        relation: [
          { required: true, message: "请选择节点", trigger: "change" }
        ],
        target: [
          { required: true, message: "请选择接收端资源", trigger: "change" }
        ],
        name: [{ required: true, message: "请选择所属系统", trigger: "change" }]
      },
      rules1: {
        name: [
          { required: true, message: "请输入基线名称", trigger: "blur" },
          { validator: isdescription, trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入基线描述", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          },
          { validator: isdescription, trigger: "blur" }
        ]
      },
      rules2: {
        type: [
          {
            required: true,
            message: "请选择所属层级/资源类型/资源模型父类",
            trigger: "change"
          },
          { validator: levelType, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.init(); //页面内初始加载就调用这个函数
  },
  created() {
    debugger;
    if (!this.$store.state.resourceManagement.on_treeData) {
      this.$store.dispatch("treeData");
    }
  },
  computed: {
    treeData() {
      return this.$store.state.resourceManagement.treeData;
    },
    levelClass() {
      debugger;
      return this.$store.state.resourceManagement.type;
    }
  },
  methods: {
    removeArray(item) {
      debugger;
      var index = this.Proprietary.array.indexOf(item);
      if (index !== -1) {
        this.Proprietary.array.splice(index, 1);
      }
    },
    addDomain(item, index) {
      debugger;
      this.Proprietary.array.push({
        value: "",
        key: Date.now(),
        required: item.required
      });
    },
    removeAccounts(item) {
      debugger;
      var index = this.Proprietary.password.indexOf(item);
      if (index !== -1) {
        this.Proprietary.password.splice(index, 1);
      }
    },
    addAccounts(item) {
      debugger;
      this.Proprietary.password.push({
        user: "",
        pass: "",
        key: Date.now(),
        required: item.required
      });
    },
    handleSelectionChange(val) {
      debugger;
      this.multipleSelection = val;
    },
    open4() {
      this.$message.error("您还未选择数据！");
    },
    // 关闭模型
    model_Close() {
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
    },
    // 关闭审核
    dialog_steps_Close() {
      debugger;
      // this.$refs['Categorical_attribute'].resetFields();
      // this.$refs['Proprietary_attributes'].resetFields();
      this.$confirm("内容还未保存，离开当前页面将导致已填内容丢失，是否确认离开?","提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
        .then(() => {
           this.$refs['Proprietary'].resetFields();
          this.$refs["form"].resetFields();
          this.$refs["General_attribute"].resetFields();
          this.Categorical_attribute = {
            module: "系统自动填写",
            name: "在线计费",
            sub_module: "系统自动填写",
            influence_customer: "",
            influence_system: "",
            influence_area: "",
            department: "",
            service_level: "",
            integrator: "系统自动填写",
            service_provider: "系统自动填写"
          },
          this.active = 0;
          this.dialog_steps = false;    
        })
        .catch(() => {
              this.$message.info("已取消操作!");
        });
     
    },
    // 按条件查询
    queryDiscoveryCondition() {
      let regExp = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]*$/;
      if (regExp.test(this.query) === false) {
        this.$message.error("只能输入中英文和数字,下划线,连接符,进行查询");
        return;
      }
      if (this.query != "") {
        this.page.pageSize = 10; //每页条数,  默认8条
        this.page.pageNum = 0;
        this.page.totalRecords = 0;
        this.page.name = this.query;
        this.page.description = this.query;
        // this.page.id = this.query;
        (this.page.search = true),
          (this.page.searchByAny = true),
          service.queryDiscovery(this.page).then(res => {
            debugger;
            if (res.count) {
              this.page.totalRecords = parseInt(res.count);
            }
            this.temp = res.datas;
          });
      } else {
        this.init();
      }
    },
    // 分类展示
    query_resource_state() {
      this.page.pageSize = 10; //每页条数,  默认8条
      this.page.pageNum = 0;
      this.page.name = "";
      service.queryDiscovery(this.page).then(res => {
        debugger;
        if (res.count) {
          this.page.totalRecords = parseInt(res.count);
        }
        this.temp = res.datas;
      });
    },
    // 单个删除
    deleteInfo(item) {
      this.$confirm("此操作将永久删除数据 , 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          // 向服务端请求删除
          service
            .deleteInfo(item.id)
            .then(res => {
              if (res.type == 0) {
                this.$message.success("成功删除了数据!");
                this.init();
              } else {
                this.$message.error("删除失败!");
              }
              // if(res.type == 4){
              //   this.$message.error('模型里面已有数据'+item.name + '!');
              // }
            })
            .catch(res => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    // 批量删除
    delAll() {
      debugger;
      this.delarr = [];
      const length = this.multipleSelection.length;
      if (length == 0) {
        this.open4();
        return;
      }
      for (let i = 0; i < length; i++) {
        this.delarr.push(this.multipleSelection[i].id);
      }
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          // 向服务端请求删除
          service
            .deleteInfoMultiple(this.delarr)
            .then(res => {
              debugger;
              if (res.type == 0) {
                this.$message.success("成功删除了数据!");
                this.init();
              } else {
                this.$message.error("删除失败!");
              }
            })
            .catch(res => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    // 初始化数据展示
    init() {
      this.page.pageSize = 10; //每页条数,  默认8条
      this.page.totalRecords = 0;
      this.page.pageSizes = [10, 20, 30, 40];
      this.page.pageNum = 0;
      this.page.name = "";
      this.page.description = "";
      this.page.id = "";
      // this.page.search= false;
      // this.page.searchByAny= false;
      this.temp = [];
      service.queryDiscovery(this.page).then(res => {
        debugger;
        if (res) {
          this.page.totalRecords = parseInt(res.count);
          this.temp = res.datas;
        }
      });
    },
    // 查看详情
    on_discoveryDetails(data) {
      debugger;
      this.discoveryDetails = true;
      this.discoveryData = JSON.parse(JSON.stringify(data));
      this.ip = '';
      for (var i = 0; i < this.discoveryData.attributes.length; i++) {
        // if (this.discoveryData.attributes[i].name == "ip") {
        //   debugger;
        // }
        if (this.discoveryData.attributes[i].name == "result") {
          debugger;
          this.ip = JSON.parse(this.discoveryData.attributes[i].value).hostIp;
          this.discoveryData.attributes.splice([i], 1);
          this.discoveryData.attributes.push({name: 'hostIp',value:this.ip})
        }
      }
    },
    // 获取模型专有属性
    attProprietary(data) {
      debugger;
      return new Promise((resolve, reject) => {
        debugger;
        this.Proprietary = {
          string: [],
          int: [],
          boolean: [],
          date: [],
          array: [],
          password: []
        }
        service.attProprietary(data).then(res => {
          debugger;
          // this.Proprietary = res.datas[0].attributes;
          // for(var i = 0; i<this.Proprietary.length; i++){
          //     if(this.Proprietary[i].name == 'ip'){
          //       debugger
          //       this.isip = true
          //     }
          // }
          for (var i = 0; i < res.datas[0].attributes.length; i++) {
            if (res.datas[0].attributes[i].name == "ip") {
              debugger;
              res.datas[0].attributes[i].ip = this.ip;
              this.isip = true;
            }
            if (res.datas[0].attributes[i].type == "string") {
              this.Proprietary.string.push(res.datas[0].attributes[i]);
            }
            if (res.datas[0].attributes[i].type == "array") {
              this.Proprietary.array.push(res.datas[0].attributes[i]);
            }
            if (res.datas[0].attributes[i].type == "boolean") {
              this.Proprietary.boolean.push(res.datas[0].attributes[i]);
            }
            if (res.datas[0].attributes[i].type == "int") {
              this.Proprietary.int.push(res.datas[0].attributes[i]);
            }
            if (res.datas[0].attributes[i].type == "date") {
              this.Proprietary.date.push(res.datas[0].attributes[i]);
            }
            if (res.datas[0].attributes[i].type == "password") {
              this.Proprietary.password.push(res.datas[0].attributes[i]);
            }
            // if (res.datas[0].attributes[i].name == "ip") {
            //   debugger;
            //   this.isip = true;
            // }
          }
          resolve(this.isip);
        });
      });
    },
    // 审核
    examine() {
      this.dialogFormVisible = true;
    },
    // 选择模型
    handleChange(data) {
      if (data.length < 3) {
        return;
      }
      this.handleChangeData = data;
    },
    // 提交模型
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        debugger;
        if (valid) {
          this.$store
            .dispatch("addstateType", this.handleChangeData)
            .then(res => {
              debugger;
              this.attProprietary(
                this.$store.state.resourceManagement.name
              ).then(res => {
                if (this.isip) {
                  var temp = {};
                  temp.type = this.$store.state.resourceManagement.type;
                  temp.model = this.$store.state.resourceManagement.name;
                  temp.system = this.Categorical_attribute.name;
                  this.discoveryDetails = false;
                  this.dialogFormVisible = false;
                  this.dialog_steps = true;
                  service.querySearchcode(temp).then(res => {
                    debugger;
                    if (res) {
                      this.searchCode = res;
                    }
                  });
                } else {
                  this.$confirm(
                    "未匹配到相应ip属性模型，请重新选择！",
                    "提示",
                    {
                      confirmButtonText: "确定",
                      showCancelButton: false,
                      type: "warning"
                    }
                  );
                }
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 上一步填写
    step() {
      debugger;
      if (this.active == 1) {
        this.active--;
      }
      if (this.active == 2) {
        this.active--;
      }
    },
    // 下一步填写
    next() {
      debugger;
      if (this.active == 0) {
        this.$refs["General_attribute"].validate(valid => {
          debugger;
          if (valid) {
            this.active++;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
        if (this.active == 1) {
          return;
        }
      }
      if (this.active == 1) {
        this.$refs["Categorical_attribute"].validate(valid1 => {
          debugger;
          if (valid1) {
            this.active++;
            return;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
        if (this.active == 2) {
          return;
        }
      }
      if (this.active == 2) {
        this.$refs["Proprietary"].validate(valid2 => {
          debugger;
          if (valid2) {
            // for (const key in this.Proprietary) {
            //     debugger
            //     const element = this.Proprietary[key];
            //     for (var i = 0; i < element.length; i++) {
            //       debugger
            //       if(element[i].type){
            //         if(element[i].type == 'array'){
            //           this.ruleForm.proprietary[element[i].name] = JSON.stringify(element);
            //           this.ruleForm[element[i].name]  = [];
            //           this.ruleForm[element[i].name].push(element[i]['value']);
            //         }else if(element[i].type == 'date'){
            //           this.ruleForm.proprietary[element[i].name] = JSON.stringify(element);
            //           // this.ruleForm[element[i].name] = '年月日:'+element[i]['date1'] +'，日分秒:'+ element[i]['date2'];
            //           this.ruleForm[element[i].name] = element[i]['date2'].getTime();
            //         }else if(element[i].type == 'password'){
            //           this.ruleForm.proprietary[element[i].name] = JSON.stringify(element);
            //           this.ruleForm[element[i].name]  = [];
            //           this.ruleForm[element[i].name].push({username:element[i]['user'],password:element[i]['pass']});
            //         }else{
            //           this.ruleForm.proprietary[element[i].name] = JSON.stringify(element[i]);
            //           this.ruleForm[element[i].name] = element[i][element[i].name];
            //         }
            //       }
            //     }
            // }
            for (const key in this.Proprietary) {
                debugger
                const element = this.Proprietary[key];
                for (var i = 0; i < element.length; i++) {
                  debugger
                  // if(element[i].name){
                  //   this.ruleForm[element[i].name] = JSON.stringify(element);
                  // }
                  if(element[i].type){
                    if(element[i].type == 'array'){
                      this.ruleForm.proprietary[element[0].name] = JSON.stringify(element);
                      if(typeof(this.ruleForm[element[0].name]) == 'undefined' || 
                      this.ruleForm[element[0].name].length == element.length){
                        this.ruleForm[element[0].name]  = [];
                      }
                      this.ruleForm[element[0].name].push(element[i]['value']);
                    }else if(element[i].type == 'date'){
                      this.ruleForm.proprietary[element[i].name] = JSON.stringify(element);
                      // this.ruleForm[element[i].name] = '年月日:'+element[i]['date1'] +'，日分秒:'+ element[i]['date2'];
                      this.ruleForm[element[i].name] = element[i]['date2'];
                    }else if(element[i].type == 'password'){
                      this.ruleForm.proprietary[element[0].name] = JSON.stringify(element);
                      // this.ruleForm[element[0].name]  = [];
                      if(typeof(this.ruleForm[element[0].name]) == 'undefined'  || 
                      this.ruleForm[element[0].name].length == element.length){
                        this.ruleForm[element[0].name]  = [];
                      }
                      this.ruleForm[element[0].name].push({username:element[i]['user'],password:element[i]['pass']});
                    }else{
                      this.ruleForm.proprietary[element[i].name] = JSON.stringify(element[i]);
                      this.ruleForm[element[i].name] = element[i][element[i].name];
                    }
                  }
                }
            }
            this.ruleForm = Object.assign(
              this.ruleForm,
              this.General_attribute,
              this.Categorical_attribute,
              // this.Proprietary
            );
            let myDate = new Date().getTime();
            this.ruleForm.create_time = myDate;
            if (this.crux.length) {
              // this.ruleForm.ciname = '*'+ this.ruleForm.ciname;
              this.ruleForm.isimportant = true;
            }
            this.ruleForm.ciid = this.searchCode + this.ruleForm.ciid;
            console.log(JSON.stringify(this.ruleForm));
            service
              .abbResourcesData(
                this.discoveryData.id,
                this.ruleForm,
                this.$store.state.resourceManagement.name
              )
              .then(res => {
                debugger;
                if (res.type == 0) {
                  // this.$store.dispatch('treeData');
                  this.dialog_steps = false;
                  this.active = 0;
                  this.$refs["form"].resetFields();
                  this.$refs["General_attribute"].resetFields();
                  this.$refs["Categorical_attribute"].resetFields();
                  this.$refs["Proprietary"].resetFields();
                  this.$alert("审核成功", "消息提示", {
                    confirmButtonText: "确定",
                    callback: action => {
                      this.init();
                    }
                  });
                }
                if (res.type == 2) {
                  this.$message.error("搜索代码已重复!");
                }
                if (res.type == 9) {
                  this.$message.error("审核失败!");
                }
              });
            return;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    // 打开新增页面
    addDiscovery() {
      debugger;
      this.add_form = {};
      this.addDiscoveryForm = true;
    },
    // 取消新增
    attributeAdd() {
      debugger;
      this.$refs["add_form"].resetFields();
      this.addDiscoveryForm = false;
    },
    // 新增自动化发现
    add_subDiscovery(formName) {
      debugger;
      this.$refs[formName].validate(valid => {
        if (valid) {
          debugger;
          this.add_form;
          service.addDiscovery(this.add_form).then(res => {
            debugger;
            if (res.type == 0) {
              this.addDiscoveryForm = false;
              this.$alert("添加成功", "消息提示", {
                confirmButtonText: "确定",
                callback: action => {
                  this.init();
                }
              });
            } else {
              this.$message.error("添加失败!");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 每页显示多少条数据
    sizeChange(val) {
      debugger;
      this.page.pageSize = val;
      service.queryDiscovery(this.page).then(res => {
        debugger;
        if (res) {
          this.page.totalRecords = parseInt(res.count);
          this.temp = res.datas;
        }
      });
    },
    //翻页
    currentChange(val) {
      debugger;
      this.page.pageNum = val - 1;
      service.queryDiscovery(this.page).then(res => {
        debugger;
        if (res) {
          this.page.totalRecords = parseInt(res.count);
          this.temp = res.datas;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-header {
  height: 45px !important;
  border-bottom: 1px solid #ccc;
  color: #333;
  text-align: left !important;
  font-size: 14px;
  line-height: 45px !important;
}
.el-aside {
  text-align: center;
}

.el-main {
  text-align: center;
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
.app-container {
  padding: 10px;
}
main.el-main {
  padding: 10px;
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
header.el-header {
  line-height: 46px;
}
.resource_name {
  width: 22%;
  display: inline-block;
}
.resource_crux {
  width: 20%;
  display: inline-block;
  padding-left: 20px;
}
.resource_crux .el-checkbox {
  padding: 5px 20px 9px 10px;
}
.fr {
  float: right;
  margin-top: 9px;
}
.discoveryDetails {
  display: inline-block;
  width: 100%;
  vertical-align: top;
}
.discoveryDetails .el-form-item {
  width: 48%;
  display: inline-block;
  margin: 0;
  margin-bottom: 15px;
  padding-left: 15px;
}
.head_Details {
  font-size: 14px;
  font-weight: 700;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
}
h3.content_title {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  margin: 10px 0;
  margin-bottom: 20px;
}
.content_col {
  width: 40%;
  display: inline-block;
  margin-right: 50px;
}
.search_code {
  position: absolute;
  z-index: 999;
  left: 10px;
  color: #bbb;
}
.Proper .content_col {
  width: 100%;
  display: inline-block;
}
.Proper .el-form-item {
  width: 40%;
  display: inline-block;
}
.Proprietary_save {
  text-align: right;
  margin-right: 50px;
}
</style>

