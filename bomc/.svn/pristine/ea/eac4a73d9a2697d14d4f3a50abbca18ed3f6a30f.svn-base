
<template>
  <div class="app-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-main class="el_main">
        <div class="content_head">
          <h3 class="content_title">根类通用属性设置</h3>
          <div class="content_main">
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="搜索代码">
                  <el-input
                    v-model="ruleForm.ciid"
                    placeholder="请输入搜索代码"
                    size="mini"
                    disabled="disabled"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="content_col" style="width: 35%;">
                <el-form-item label="资源名称" prop="ciname">
                  <el-input v-model="ruleForm.ciname" placeholder="请输入资源名称" size="mini"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="状态" prop="state" v-if="levelClass == '物理类'">
                  <el-select v-model="ruleForm.state" placeholder="请选择状态" size="mini">
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
                  <el-input value="使用中" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="审核状态" prop="check">
                  <el-select v-model="ruleForm.check" placeholder="请选择审核状态" size="mini">
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
                    <el-checkbox name="crux"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="资源描述" prop="description">
                  <el-input v-model="ruleForm.description" placeholder="请输入资源描述" size="mini"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <div class="content_head" v-if="levelClass == '逻辑类'">
          <h3 class="content_title">逻辑类属性设置*</h3>
          <div class="content_main">
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="所属系统" prop="module">
                  <el-input v-model="ruleForm.name" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="所属模块" prop="model">
                  <el-input v-model="ruleForm.module" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="子模块" prop="sub_module">
                  <el-input v-model="ruleForm.sub_module" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="影响区域">
                  <el-select v-model="ruleForm.influence_area" placeholder="请选择影响区域" size="mini">
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
                <el-form-item label="影响客户">
                  <el-select
                    v-model="ruleForm.influence_customer"
                    placeholder="请选择影响客户"
                    size="mini"
                  >
                    <el-option label="所有客户" value="所有客户"></el-option>
                    <el-option label="全球通客户" value="全球通客户"></el-option>
                    <el-option label="神州行客户" value="神州行客户"></el-option>
                    <el-option label="动感地带客户" value="动感地带客户"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="影响系统">
                  <el-select v-model="ruleForm.influence_system" placeholder="请选择影响系统" size="mini">
                    <el-option label="BOSS系统" value="BOSS系统"></el-option>
                    <el-option label="CRM应用" value="CRM应用"></el-option>
                    <el-option label="PBOSS" value="PBOSS"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="使用部门">
                  <el-select v-model="ruleForm.department" placeholder="请选择使用部门" size="mini">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="服务级别">
                  <el-select v-model="ruleForm.service_level" placeholder="请选择服务级别" size="mini">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="集成商">
                  <el-input v-model="ruleForm.integrator" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="服务提供商">
                  <el-input v-model="ruleForm.service_provider" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <div class="content_head" v-if="levelClass == '应用类'">
          <h3 class="content_title">应用类属性设置*</h3>
          <div class="content_main">
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="所属系统" prop="module">
                  <el-input v-model="ruleForm.name" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="所属模块" prop="model">
                  <el-input v-model="ruleForm.module" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="子模块" prop="sub_module">
                  <el-input v-model="ruleForm.sub_module" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="影响区域">
                  <el-select v-model="ruleForm.influence_area" placeholder="请选择影响区域" size="mini">
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
                <el-form-item label="影响客户">
                  <el-select
                    v-model="ruleForm.influence_customer"
                    placeholder="请选择影响客户"
                    size="mini"
                  >
                    <el-option label="所有客户" value="所有客户"></el-option>
                    <el-option label="全球通客户" value="全球通客户"></el-option>
                    <el-option label="神州行客户" value="神州行客户"></el-option>
                    <el-option label="动感地带客户" value="动感地带客户"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="影响系统">
                  <el-select v-model="ruleForm.influence_system" placeholder="请选择影响系统" size="mini">
                    <el-option label="BOSS系统" value="BOSS系统"></el-option>
                    <el-option label="CRM应用" value="CRM应用"></el-option>
                    <el-option label="PBOSS" value="PBOSS"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="使用部门">
                  <el-select v-model="ruleForm.department" placeholder="请选择使用部门" size="mini">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="服务级别">
                  <el-select v-model="ruleForm.service_level" placeholder="请选择服务级别" size="mini">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="集成商">
                  <el-input v-model="ruleForm.integrator" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="服务提供商">
                  <el-input v-model="ruleForm.service_provider" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <div class="content_head" v-if="levelClass == '物理类'">
          <h3 class="content_title">物理属性设置*</h3>
          <div class="content_main">
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="所属系统" prop="module">
                  <el-input v-model="ruleForm.name" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="所属模块" prop="model">
                  <el-input v-model="ruleForm.module" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="子模块" prop="sub_module">
                  <el-input v-model="ruleForm.sub_module" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="影响区域">
                  <el-select v-model="ruleForm.influence_area" placeholder="请选择影响区域" size="mini">
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
                <el-form-item label="影响客户">
                  <el-select
                    v-model="ruleForm.influence_customer"
                    placeholder="请选择影响客户"
                    size="mini"
                  >
                    <el-option label="所有客户" value="所有客户"></el-option>
                    <el-option label="全球通客户" value="全球通客户"></el-option>
                    <el-option label="神州行客户" value="神州行客户"></el-option>
                    <el-option label="动感地带客户" value="动感地带客户"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="影响系统">
                  <el-select v-model="ruleForm.influence_system" placeholder="请选择影响系统" size="mini">
                    <el-option label="BOSS系统" value="BOSS系统"></el-option>
                    <el-option label="CRM应用" value="CRM应用"></el-option>
                    <el-option label="PBOSS" value="PBOSS"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="使用部门">
                  <el-select v-model="ruleForm.department" placeholder="请选择使用部门" size="mini">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="服务级别">
                  <el-select v-model="ruleForm.service_level" placeholder="请选择服务级别" size="mini">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="集成商">
                  <el-input v-model="ruleForm.integrator" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="服务提供商">
                  <el-input v-model="ruleForm.service_provider" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <div class="content_head" v-if="levelClass == '业务类'">
          <h3 class="content_title">业务类属性设置*</h3>
          <div class="content_main">
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="所属系统" prop="module">
                  <el-input v-model="ruleForm.name" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="所属模块" prop="model">
                  <el-input v-model="ruleForm.module" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="子模块" prop="sub_module">
                  <el-input v-model="ruleForm.sub_module" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="影响区域">
                  <el-select v-model="ruleForm.influence_area" placeholder="请选择影响区域" size="mini">
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
                <el-form-item label="影响客户">
                  <el-select
                    v-model="ruleForm.influence_customer"
                    placeholder="请选择影响客户"
                    size="mini"
                  >
                    <el-option label="所有客户" value="所有客户"></el-option>
                    <el-option label="全球通客户" value="全球通客户"></el-option>
                    <el-option label="神州行客户" value="神州行客户"></el-option>
                    <el-option label="动感地带客户" value="动感地带客户"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="影响系统">
                  <el-select v-model="ruleForm.influence_system" placeholder="请选择影响系统" size="mini">
                    <el-option label="BOSS系统" value="BOSS系统"></el-option>
                    <el-option label="CRM应用" value="CRM应用"></el-option>
                    <el-option label="PBOSS" value="PBOSS"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="使用部门">
                  <el-select v-model="ruleForm.department" placeholder="请选择使用部门" size="mini">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="服务级别">
                  <el-select v-model="ruleForm.service_level" placeholder="请选择服务级别" size="mini">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="集成商">
                  <el-input v-model="ruleForm.integrator" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="服务提供商">
                  <el-input v-model="ruleForm.service_provider" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <div class="content_head" v-if="levelClass == '其他类'">
          <h3 class="content_title">其他类属性设置*</h3>
          <div class="content_main">
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="所属系统" prop="module">
                  <el-input v-model="ruleForm.name" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="所属模块" prop="model">
                  <el-input v-model="ruleForm.module" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="子模块" prop="sub_module">
                  <el-input v-model="ruleForm.sub_module" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="影响区域">
                  <el-select v-model="ruleForm.influence_area" placeholder="请选择影响区域" size="mini">
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
                <el-form-item label="影响客户">
                  <el-select
                    v-model="ruleForm.influence_customer"
                    placeholder="请选择影响客户"
                    size="mini"
                  >
                    <el-option label="所有客户" value="所有客户"></el-option>
                    <el-option label="全球通客户" value="全球通客户"></el-option>
                    <el-option label="神州行客户" value="神州行客户"></el-option>
                    <el-option label="动感地带客户" value="动感地带客户"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="影响系统">
                  <el-select v-model="ruleForm.influence_system" placeholder="请选择影响系统" size="mini">
                    <el-option label="BOSS系统" value="BOSS系统"></el-option>
                    <el-option label="CRM应用" value="CRM应用"></el-option>
                    <el-option label="PBOSS" value="PBOSS"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="使用部门">
                  <el-select v-model="ruleForm.department" placeholder="请选择使用部门" size="mini">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="服务级别">
                  <el-select v-model="ruleForm.service_level" placeholder="请选择服务级别" size="mini">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="content_row">
              <div class="content_col">
                <el-form-item label="集成商">
                  <el-input v-model="ruleForm.integrator" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
              <div class="content_col">
                <el-form-item label="服务提供商">
                  <el-input v-model="ruleForm.service_provider" size="mini" disabled="disabled"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <div class="content_head Proper">
          <h3 class="content_title">专有属性设置</h3>
          <div class="content_col">
            <div class="content_main">
              <el-form :model="Proprietary" ref="Proprietary" label-width="150px" class="demo-dynamic">
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
                      <el-input type="int" v-model="Proprietary.string[index][item.name]"></el-input>
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
                      style="width: 80%;"
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
                  
                </el-form>
              
            </div>
          </div>
        </div>
        <div class="content_head">
          <h3 class="content_title">关联关系设置</h3>
          <div class="content_main">
            <el-form
              :model="relationshipForm"
              ref="relationshipForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <div
                class="content_row"
                v-for="(item,index) in relationshipForm.relationship"
                :key="index"
              >
                <div class="content_col" style="width:28%">
                  <el-form-item label="发起端资源">
                    <el-input
                      v-model="relationshipForm.relationship[index].source"
                      size="mini"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="content_col">
                  <el-form-item
                    label="节点关系"
                    :prop="'relationship.' + index + '.relation'"
                    :rules="[{ required: true, message: '节点关系不能为空', trigger: 'change'}]"
                  >
                    <el-select
                      v-model="relationshipForm.relationship[index].relation"
                      placeholder="请选择节点"
                      @change="choiceRelation(index,relationshipForm.relationship[index].relation)"
                      size="mini"
                    >
                      <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :label="item.name"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="content_col">
                  <el-form-item
                    label="接收端资源"
                    :prop="'relationship.' + index + '.target'"
                    :rules="[{ required: true, message: '接收端资源不能为空', trigger: 'change'}]"
                  >
                    <el-select
                      v-model="relationshipForm.relationship[index].target"
                      placeholder="请选择接收端资源"
                      size="mini"
                      :disabled="item.show"
                    >
                      <el-option
                        v-for="(item,index) in relationshipForm.relationshipArr[index].target"
                        :key="index"
                        :value="item.ciid"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <el-button type="danger" @click.prevent="removeDomain(item)" size="mini">删除</el-button>
              </div>
            </el-form>
            <el-button type="primary" size="mini" @click="addNode">新增关系</el-button>
          </div>
        </div>
      </el-main>
      <!-- <el-main class="el_main">
      </el-main>-->
      <el-footer class="el_foot">
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button type="info" @click="open2()">取消</el-button>
        </el-form-item>
      </el-footer>
    </el-form>
  </div>
</template>
<script>
import * as service from "../../../../../api/data/data.js";
import router from "../../../../../router";
export default {
  data() {
    var checkCode = (rule, value, callback) => {
      debugger;
      let regExp = /^[A-Z,0-9]{6}$/;
      if (regExp.test(value) === false) {
        callback(new Error("只能输入6位大写字母和数字"));
      } else {
        callback();
      }
    };
    var regExpInput = (rule, value, callback) => {
      let regExp = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]*$/;
      if (regExp.test(value) === false) {
        return callback(new Error("只能输入中英文和数字,下划线,连接符!"));
      } else {
        callback();
      }
    };
    var attrError = (rule, value, callback) => {
      debugger
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }else {
              callback();
        }
      };
    return {
      URL: true,
      ruleForm: {
        // proprietary:{}
      },
      options: [],
      relationshipForm: {
        relationship: [],
        relationshipArr: []
      },
      eachRelationship: [],
      rules: {
        ciname: [
          { required: true, message: "请输入资源名称", trigger: "blur" },
          { validator: regExpInput, trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        // ciid: [
        //   { required: true, message: '请输入代码片段', trigger: 'blur' },
        //   { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
        //   { validator: checkCode, trigger: 'blur' }
        // ],
        description: [
          {
            min: 0,
            max: 20,
            message: "长度不能超过20个字符",
            trigger: "blur"
          },
          { validator: regExpInput, trigger: "blur" }
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
        requiredAttr: [
          { required: true, message: "关键属性不能为空", trigger: "change" }
        ]
      },
      crux: "",
      attrList: {
        domains:[
          {
            name: "OPPO",
            type: null,
            auto_get: true,
            required: false,
            description: "手机品牌",
            classification: null,
            create_time: null,
            OPPO: "qweqwe"
          },
          {
            name: "leng",
            type: "int",
            auto_get: true,
            required: true,
            description: "长度",
            classification: "工程类",
            create_time: 1551165863142,
            leng: "伯父er"
          },
          {
            name: "qrrwr",
            type: "date",
            auto_get: true,
            required: true,
            description: "werwrwr",
            classification: "维保类",
            create_time: 1551324096390,
            qrrwr: "werwqer"
          },
          {
            name: "size",
            type: "string",
            auto_get: true,
            required: true,
            description: "大小",
            classification: "运行类",
            create_time: 1551165863142,
            size: "werqre"
          }
        ]
      },
      Proprietary: {
        string: [],
        int: [],
        boolean: [],
        date: [],
        array: [],
        password: []
      },
      setProprietary: "",
    };
  },
  created() {
    debugger;
    if (!this.$store.state.resourceManagement.resourceDetails) {
      debugger;
      const currentRouteName = this.$route.name;
      this.$router.push({ path: "/resourceData/data" });
      return;
    } else {
      //获取默认数据
      this.ruleForm = this.$store.state.resourceManagement.resourceDetails;
      //获取专有属性
        service.attProprietary(this.$store.state.resourceManagement.resourceDetails.modelName).then(res => {
          debugger
        // for (var i = 0; i < this.attrList.domains.length; i++) {
        //   if (!this.ruleForm[this.attrList.domains[i].name]) {
        //     this.attrList.domains[i][this.attrList.domains[i].name] = "";
        //   } else {
        //     this.attrList.domains[i][
        //       this.attrList.domains[i].name
        //     ] = this.ruleForm[this.attrList.domains[i].name];
        //   }
        // }
        for (var i = 0; i < res.datas[0].attributes.length; i++) {
          if (res.datas[0].attributes[i].type == "string") {
            this.Proprietary.string.push(JSON.parse(JSON.parse(this.ruleForm.proprietary)[res.datas[0].attributes[i].name]));
          }
          if (res.datas[0].attributes[i].type == "array") {
            this.Proprietary.array = JSON.parse(JSON.parse(this.ruleForm.proprietary)[res.datas[0].attributes[i].name]);
          }
          if (res.datas[0].attributes[i].type == "boolean") {
            this.Proprietary.boolean.push(JSON.parse(JSON.parse(this.ruleForm.proprietary)[res.datas[0].attributes[i].name]));
          }
          if (res.datas[0].attributes[i].type == "int") {
            this.Proprietary.int.push(JSON.parse(JSON.parse(this.ruleForm.proprietary)[res.datas[0].attributes[i].name]));
          }
          if (res.datas[0].attributes[i].type == "date") {
            this.Proprietary.date = JSON.parse(JSON.parse(this.ruleForm.proprietary)[res.datas[0].attributes[i].name]);
          }
          if (res.datas[0].attributes[i].type == "password") {
            this.Proprietary.password = (JSON.parse(JSON.parse(this.ruleForm.proprietary)[res.datas[0].attributes[i].name]));
          }
        }
      });
      debugger;
      //获取节点关系
      service.queryRelationalNode(this.ruleForm.ciid).then(res => {
        if (res) {
          if (!res) {
            this.disabled = true;
          } else {
            debugger;
            for (const key in res) {
              if (res.hasOwnProperty(key)) {
                for (var i = 0; i < res[key].length; i++) {
                  this.relationshipForm.relationship.push({
                    source: this.ruleForm.ciid,
                    relation: key,
                    target: res[key][i].target.ciid,
                    show: true
                  });
                  this.relationshipForm.relationshipArr.push({
                    source: this.ruleForm.ciid,
                    relation: key,
                    target: res[key][i].target.ciid
                  });
                  
                }
              }
            }
          }
        }
      });
      //获取节点关系下拉选项
      service
        .queryRelationship(
          this.$store.state.resourceManagement.resourceDetails.modelName
        )
        .then(res => {
          debugger;
          if (res) {
            if (!res.datas) {
              this.disabled = true;
            } else {
              this.options = res.datas;
            }
          }
        });
    }
    if (this.ruleForm.isimportant == "true") {
      this.crux = true;
      // this.ruleForm.ciname = this.ruleForm.ciname.slice(1);
    }
  },
  mounted() {
    router.beforeEach((to, from, next) => {
      debugger;
      if (this.URL) {
        if (
          from.path === "/resourceData/app" ||
          from.path === "/resourceData/appResource" ||
          from.path === "/resourceData/resource/resourceDetails"
        ) {
          this.$confirm(
            "内容还未保存，离开当前页面将导致已填内容丢失，是否确认离开?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              this.URL = false;
              next();
            })
            .catch(() => {
              next(false);
            });
        }
      } else {
        next();
      }
    });
  },
  computed: {
    levelClass() {
      debugger;
      return this.$store.state.resourceManagement.resourceDetails.type;
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // if (valid) {
          this.$refs["Proprietary"].validate(Attrlist => {
            debugger;
            // if (Attrlist) {
              this.$refs["relationshipForm"].validate(innerValid => {
                if (innerValid && valid && Attrlist) {
                  if (this.crux) {
                    debugger;
                    this.ruleForm.isimportant = true;
                  } else {
                    this.ruleForm.isimportant = false;
                  }
                  debugger;
                  // for (const key in this.Proprietary) {
                  //   debugger
                  //   const element = this.Proprietary[key];
                  //   for (var i = 0; i < element.length; i++) {
                  //     debugger
                  //     if(element[i].name){
                  //       this.ruleForm[element[i].name] = JSON.stringify(element);
                  //     }
                  //   }
                  // }
                  this.ruleForm.proprietary = {};
                  // for (const key in this.Proprietary) {
                  //   debugger
                  //   const element = this.Proprietary[key];
                  //   for (var i = 0; i < element.length; i++) {
                  //     debugger
                  //     // if(element[i].name){
                  //     //   this.ruleForm[element[i].name] = JSON.stringify(element);
                  //     // }
                  //     if(element[i].type){
                  //       if(element[i].type == 'array'){
                  //         this.ruleForm.proprietary[element[i].name] = JSON.stringify(element);
                  //         this.ruleForm[element[i].name]  = [];
                  //         this.ruleForm[element[i].name].push(element[i]['value']);
                  //       }else if(element[i].type == 'date'){
                  //         this.ruleForm.proprietary[element[i].name] = JSON.stringify(element);
                  //         // this.ruleForm[element[i].name] = '年月日:'+element[i]['date1'] +'，日分秒:'+ element[i]['date2'];
                  //         this.ruleForm[element[i].name] = element[i]['date2'].getTime();
                  //       }else if(element[i].type == 'password'){
                  //         this.ruleForm.proprietary[element[i].name] = JSON.stringify(element);
                  //         this.ruleForm[element[i].name]  = [];
                  //         this.ruleForm[element[i].name].push({username:element[i]['user'],password:element[i]['pass']});
                  //       }else{
                  //         this.ruleForm.proprietary[element[i].name] = JSON.stringify(element[i]);
                  //         this.ruleForm[element[i].name] = element[i][element[i].name];
                  //       }
                  //     }
                  //   }
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
                          if(typeof(this.ruleForm[element[0].name]) == 'string'){
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
                          if(typeof(this.ruleForm[element[0].name]) == 'string'){
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
                  var obj = {};
                  obj = JSON.parse(JSON.stringify(this.ruleForm));
                  obj.资源关系 = [];
                  this.relationshipForm.relationship.map(function(item) {
                    var temp = [];
                    temp.push(item.source, item.relation, item.target);
                    obj.资源关系.push(temp);
                  });
                  service.modifiedModel(obj).then(res => {
                    debugger;
                    console.log(res);
                    if (res.type == 0) {
                      // this.$store.dispatch('modelList');
                      this.URL = false;
                      this.$alert("添加成功", "消息提示", {
                        confirmButtonText: "确定",
                        callback: action => {
                          this.$router.push({ path: "/resourceData/data" });
                        }
                      });
                    }
                  });
                } else {
                  console.log("inner error");
                  return false;
                }
              });
            // } else {
            //   return false;
            // }
          });
        // } else {
        //   console.log("error submit!!");
        //   return false;
        // }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 增加节点关系
    addNode() {
      debugger;
      this.relationshipForm.relationship.push({
        source: this.ruleForm.ciid,
        relation: "",
        target: "",
        show: true
      });
      this.relationshipForm.relationshipArr.push({
        source: this.ruleForm.ciid,
        relation: "",
        target: ""
      });
    },
    // 选择节点关系请求接收数据
    choiceRelation(index, item) {
      debugger;
      this.relationshipForm.relationship[index].relation = item.name;
      this.relationshipForm.relationship[index].show = false;
      service.queryReceive(item.target).then(res => {
        debugger;
        if (res.count === "0") {
          this.relationshipForm.relationship[index].target = "";
          this.relationshipForm.relationshipArr[index].target = "";
        } else {
          this.relationshipForm.relationshipArr[index].target =
            res.datas[item.target];
        }
      });
    },
    // 删除节点关系
    removeDomain(item) {
      debugger;
      var index = this.relationshipForm.relationship.indexOf(item);
      if (index !== -1) {
        this.relationshipForm.relationship.splice(index, 1);
        this.relationshipForm.relationshipArr.splice(index, 1);
      }
    },
    open2(formName) {
      // this.$confirm('内容还未保存，离开当前页面将导致已填内容丢失，是否确认离开?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      this.$router.push({ path: "/resourceData/data" });
      // }).catch(() => {

      // });
    }
  }
};
</script>

<style scoped>
.content {
  padding: 10px;
  font-size: 14px;
}
.el_head {
  height: 40px !important;
  line-height: 40px;
  border-bottom: 1px solid #cccccc;
}
.console {
  position: absolute;
  top: 10px;
  right: 10px;
}
.model {
  padding: 10px;
  position: absolute;
  top: 0;
  right: 70px;
}
h3.content_title {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
}
header.el-header.el_head {
  padding-left: 10px;
}
main.el-main.el_main {
  padding: 8px 15px;
}
.content_main {
  padding: 20px;
  padding-bottom: 0;
}
.edition {
  float: right;
  margin-top: 30px;
  margin-right: 453px;
}
.edition span {
  color: #ccc;
}
.el_foot .el-form-item {
  margin-top: 20px !important;
}
.el_foot {
  height: 50px;
  border-top: 1px solid #ccc;
}
.attr_set_left {
  height: 100%;
  overflow-y: auto;
  width: 30%;
  display: inline-block;
}
.attr_set_left li {
  margin-top: 15px;
}
.attr_set_left li i {
  float: right;
  font-weight: 700;
  font-size: 18px;
  color: #aaa;
  margin-right: 28px;
}
.attr_set_right {
  width: 50%;
  display: inline-block;
  height: 100%;
  vertical-align: top;
  margin-left: 40px;
}
.attr_set_right p {
  margin-top: 15px;
}
.attr_set_right p input {
  margin-left: 30px;
}
.attr_set_right p label {
  font-weight: 400 !important;
}
.el-form-item__label {
  font-weight: 400 !important;
}
.content_col {
  width: 30%;
  display: inline-block;
}
.el-form-item {
  margin-top: 0;
}
.app-container {
  padding: 10px;
  width: 100%;
}
.Proper .content_col {
  width: 100%;
  display: inline-block;
}
.Proper .el-form-item {
  margin-top: 0;
  width: 40%;
  display: inline-block;
}
.active {
}
.active .el-form-item__label:before {
  content: "";
  margin-right: 4px;
}
</style>

