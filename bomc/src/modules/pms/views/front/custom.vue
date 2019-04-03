<template>
  <div class="custom-container">
    <!-- 步骤 -->
    <!-- <div class="step-container">
      <el-steps
        :active="active"
        direction="vertical"
      >
        <el-step
          title="字段"
          description="新增字段"
        ></el-step>
        <el-step
          title="编辑表单"
          description="通过拖拽完成布局"
        ></el-step>
        <el-step
          title="节点设置"
          description="根据节点设置字段的可读性、可见性"
        ></el-step>
      </el-steps>

      <div style="margin-top: 24px;">
        <el-button
          type="text"
          size="mini"
          @click="prev"
        >上一步</el-button>
        <el-button
          type="text"
          size="mini"
          @click="next"
        >下一步</el-button>
      </div>
    
    </div> -->

    <div>
      <el-button
        type="text"
        size="mini"
        @click="prev"
      >上一步</el-button>
      <el-button
        type="text"
        size="mini"
        @click="next"
      >下一步</el-button>
    </div>

    <!-- 每个步骤详细 -->
    <div class="custom-content-container">
      <div
        class="field-content"
        v-show="active === 1"
      >
        <el-form
          :inline="true"
          :model="fieldForm"
          size="mini"
        >
          <el-form-item>
            <el-input
              v-model="fieldForm.processDefinitionId"
              placeholder="查询流程定义"
            ></el-input>

          </el-form-item>
          <el-form-item>
            <el-button
              plain
              @click="queryForm"
            >查询</el-button>
          </el-form-item>

          <el-form-item>
            <el-button
              plain
              @click="addField"
            >新增字段</el-button>

            <el-button
              plain
              type="danger"
              @click="batchDeleteField"
            >批量删除字段</el-button>
          </el-form-item>
        </el-form>

        <el-dialog
          title="新增字段"
          :visible.sync="addFieldDialogVisible"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          width="30%"
        >

          <el-form
            :model="addFieldForm"
            :rules="addFieldFormRules"
            ref="addFieldForm"
            label-width="110px"
            size="mini"
            v-if="addFieldDialogVisible"
          >
            <el-form-item
              label="字段名称"
              prop="fieldName"
            >
              <el-input
                v-model="addFieldForm.fieldName"
                placeholder="请输入字段名称（英文）"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="数据类型"
              prop="dataType"
            >
              <el-select
                v-model="addFieldForm.dataType"
                filterable
                allow-create
                placeholder="请选择数据类型，也可以自己输入创建"
              >
                <el-option
                  v-for="(item, index) in dataTypeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="数据类型长度"
              prop="dataLength"
            >
              <el-input
                v-model.number="addFieldForm.dataLength"
                placeholder="请输入数据类型长度"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="字段Lable"
              prop="label"
            >
              <el-input
                v-model="addFieldForm.label"
                placeholder="请输入字段Label"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="控件类型"
              prop="type"
            >
              <el-select
                v-model="addFieldForm.type"
                placeholder="请选择控件类型"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="网关变量">
              <el-switch v-model="addFieldForm.gatewayVariable">
              </el-switch>
            </el-form-item>

            <el-form-item label="字段填充">
              <el-input
                v-model="addFieldForm.placeholder"
                placeholder="请输入字段填充"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button @click="addFieldDialogVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="confirmAddField"
              >确 定</el-button>
            </el-form-item>

          </el-form>

        </el-dialog>

        <el-table
          ref="fieldDataTable"
          :data="fieldData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="fieldDataHandleSelectionChange"
        >
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="50"
          >
          </el-table-column>

          <el-table-column
            type="selection"
            width="50"
            align="center"
          >
          </el-table-column>

          <el-table-column
            align="center"
            label="字段名"
            prop="fieldName"
          >
          </el-table-column>

          <el-table-column
            align="center"
            label="数据类型"
            prop="dataType"
          >
          </el-table-column>

          <el-table-column
            align="center"
            label="数据类型的长度"
            prop="dataLength"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="type"
            label="控件类型"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="label"
            align="center"
            label="字段label"
            show-overflow-tooltip
          >
          </el-table-column>

          <!-- <el-table-column
            align="center"
            prop="placeholder"
            label="字段填充"
            show-overflow-tooltip
          >
          </el-table-column> -->

          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="fieldHandleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="fieldHandleDelete(scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div
        class="form-content"
        v-show="active === 2"
      >
        <el-row
          :gutter="8"
          class="form-content"
        >
          <el-col :span="4">
            <el-alert
              title="字段列表"
              type="success"
              :closable="false"
            >
            </el-alert>

            <draggable
              v-model="validFieldData"
              :clone="clone"
              :options="{ group: { name: 'dragLayout',  pull: 'clone', put: false}, sort: false }"
            >
              <el-col
                :span="12"
                v-for="item in validFieldData"
                :key="item.fieldName"
                class="field-col-12"
              >
                <el-tag size="mini">
                  {{item.label}}
                  <i
                    v-if="item.gatewayVariable"
                    class="el-icon-rank"
                  ></i> </el-tag>
              </el-col>

            </draggable>

            <el-alert
              title="布局组件"
              type="success"
              :closable="false"
            >
            </el-alert>

            <draggable
              v-model="layoutData"
              :clone="clone"
              :options="{ group: { name: 'dragLayout', pull: 'clone', put: false }, sort: false }"
            >
              <el-tag
                size="mini"
                v-for="item in layoutData"
                :key="item.fieldName"
              >{{item.fieldName}}</el-tag>
            </draggable>

            <el-alert
              title="其他组件"
              type="success"
              :closable="false"
            >
            </el-alert>

            <draggable
              v-model="packagedComponentData"
              :clone="clone"
              :options="{ group: { name: 'dragLayout', put: false }, sort: false }"
            >
              <el-tag
                size="mini"
                v-for="item in packagedComponentData"
                :key="item.type"
              >{{item.fieldName}}</el-tag>
            </draggable>

            <el-alert
              title="其他组件"
              type="success"
              :closable="false"
            >
            </el-alert>

            <el-button
              size="mini"
              type="primary"
              plain
              @click="customWidget"
            >
              自定义添加控件
            </el-button>

            <el-dialog
              title="自定义添加控件"
              :visible.sync="customDialogVisible"
            >

              <codemirror
                v-model="code"
                :options="cmOption"
              ></codemirror>

              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button
                  size="small"
                  @click="customDialogVisible = false"
                >取 消</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="confirmCustomCode"
                >确 定</el-button>
              </span>
            </el-dialog>

          </el-col>

          <el-col
            :span="20"
            class="form-content"
          >

            <el-row
              class="form-content"
              :gutter="8"
            >
              <el-col
                :span="18"
                class="form-content form-area"
              >

                <layout-templates
                  :active-widget.sync="activeWidget"
                  :field-data="fieldData"
                  :packaged-component-data="packagedComponentData"
                  :layout-data="currentLayout"
                  :label-position="layout.labelPosition"
                  :form-size="layout.formSize"
                  :label-width="layout.labelWidth"
                  :widget-space="layout.widgetSpace"
                  :section-margin="layout.sectionMargin"
                  :section-padding="layout.sectionPadding"
                  :section-bd-width="layout.sectionBdWidth"
                  :section-bd-radius="layout.sectionBdRadius"
                  :section-bd-color="layout.sectionBdColor"
                ></layout-templates>

              </el-col>

              <el-col
                :span="6"
                class="form-content form-panel"
              >
                <Panel
                  :layout-data="currentLayout"
                  :active-widget.sync="activeWidget"
                  :label-position.sync="layout.labelPosition"
                  :form-size.sync="layout.formSize"
                  :label-width.sync="layout.labelWidth"
                  :widget-space.sync="layout.widgetSpace"
                  :section-margin.sync="layout.sectionMargin"
                  :section-padding.sync="layout.sectionPadding"
                  :section-bd-width.sync="layout.sectionBdWidth"
                  :section-bd-radius.sync="layout.sectionBdRadius"
                  :section-bd-color.sync="layout.sectionBdColor"
                ></Panel>
              </el-col>
            </el-row>

          </el-col>
        </el-row>

      </div>
      <div
        class="node-content"
        v-show="active === 3"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item
            label="表名"
            prop="tableName"
          >
            <el-input v-model="ruleForm.tableName"></el-input>
          </el-form-item>
          <el-form-item
            label="流程定义ID"
            prop="processDefinitionId"
          >
            <el-input v-model="ruleForm.processDefinitionId"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="saveField"
            >保存</el-button>

            <el-button
              plain
              type="primary"
              @click="preview"
            >
              预览
            </el-button>
          </el-form-item>

        </el-form>

        <!-- <el-button
          plain
          size="mini"
          type="primary"
          @click="upDateField"
        >修改</el-button> -->

        <!-- <router-link to="/Preview">预览</router-link> -->
      </div>
    </div>

  </div>
</template>

<script>
import draggable from "vuedraggable";
import layoutTemplates from "../layout/components/LayoutTemplate.vue";
import Panel from "../layout/components/Panel";

import * as request from "@/modules/pms/api/pms/custom.js";

import { mapState } from "vuex";

import { codemirror } from "vue-codemirror";

import _ from "lodash";

import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/vue/vue";

import "codemirror/addon/edit/matchbrackets.js";

// import 'codemirror/addon/hint/javascript-hint'
import "codemirror/addon/hint/show-hint.css";

import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/anyword-hint.js";

import "codemirror/theme/dracula.css";
// require styles
import "codemirror/lib/codemirror.css";

export default {
  name: "Custom",
  data() {
    return {
      active: 1,

      customDialogVisible: false,
      code: "",
      cmOption: {
        tabSize: 4,
        mode: "vue",
        theme: "dracula",
        lineNumbers: true,
        line: true,
        extraKeys: { "Ctrl+.": "autocomplete" }
      },

      layoutData: [
        {
          type: "layout",
          fieldName: "row",
          gutter: 20,
          rows: [
            {
              span: 12,
              children: []
            },
            {
              span: 12,
              children: []
            }
          ]
        },
        {
          type: "section",
          fieldName: "section",
          title: "默认标题",
          children: []
        }
      ],
      packagedComponentData: [
        {
          type: "processSteps",
          fieldName: "流程步骤"
        }
      ],

      ruleForm: {
        tableName: "",
        processDefinitionId: ""
      },
      rules: {
        tableName: [
          { required: true, message: "请输入表名", trigger: "blur" },
          {
            pattern: /^\s*[\S].{0,49}\s*$/,
            message: "表名长度为 1 到 50 个字符",
            trigger: "blur"
          }
        ],
        processDefinitionId: [
          { required: true, message: "请输入流程定义ID", trigger: "blur" },
          {
            pattern: /^\s*[\S].{0,49}\s*$/,
            message: "流程定义ID长度为 1 到 50 个字符",
            trigger: "blur"
          }
        ]
      },

      fieldForm: {
        processDefinitionId: "myProcess:1:950041"
      },
      fieldData: [
        // {
        //   fieldName: "name",
        //   label: "姓名",
        //   type: "text",
        //   placeholder: "请输入姓名",
        //   clearable: true,
        //   dataType: "varchar",
        //   dataLength: 255,
        //   width: "100%"
        // },
        // {
        //   fieldName: "age",
        //   label: "出生年月日",
        //   type: "date",
        //   placeholder: "请选择出生年月日",
        //   clearable: true,
        //   dataType: "int",
        //   dataLength: 100,
        //   format: "yyyy-MM-dd",
        //   width: "100%"
        // },
        // {
        //   fieldName: "orgId",
        //   label: "组织机构",
        //   type: "cascader",
        //   placeholder: "请选择组织机构",
        //   dataType: "varchar",
        //   dataLength: 255,
        //   width: "100%"
        // },
        // {
        //   fieldName: "eventNature",
        //   label: "事件性质",
        //   type: "select",
        //   placeholder: "请选择事件性质",
        //   clearable: true,
        //   ops: [],
        //   dataType: "varchar",
        //   dataLength: 255,
        //   width: "100%"
        // },
        // {
        //   fieldName: "food",
        //   label: "食物",
        //   type: "select",
        //   placeholder: "请选择最爱的食物",
        //   clearable: true,
        //   ops: [],
        //   dataType: "varchar",
        //   dataLength: 255,
        //   width: "100%"
        // },
        // {
        //   fieldName: "likes",
        //   label: "爱好",
        //   type: "textarea",
        //   placeholder: "请输入爱好",
        //   dataType: "varchar",
        //   dataLength: 255
        // },
        // {
        //   fieldName: "resource",
        //   label: "资源",
        //   type: "radio",
        //   placeholder: "请输入爱好",
        //   ops: [],
        //   dataType: "varchar",
        //   dataLength: 255
        // },
        // {
        //   fieldName: "type",
        //   label: "活动性质",
        //   type: "checkbox",
        //   placeholder: "请输入爱好",
        //   ops: [],
        //   dataType: "varchar",
        //   dataLength: 255
        // }
      ],

      typeOptions: [
        {
          value: "text",
          label: "文本"
        },
        {
          value: "select",
          label: "下拉框"
        },
        {
          value: "time",
          label: "时间选择器"
        },
        {
          value: "date",
          label: "日期选择器"
        },
        {
          value: "datetime",
          label: "日期时间选择器"
        },
        {
          value: "textarea",
          label: "长文本"
        },
        {
          value: "cascader",
          label: "级联"
        },
        {
          value: "radio",
          label: "单选框"
        },
        {
          value: "checkbox",
          label: "多选框"
        },
        {
          value: "number",
          label: "计数器"
        }
      ],
      dataTypeOptions: [
        {
          value: "varchar",
          label: "字符串型"
        },
        {
          value: "float",
          label: "浮点数型"
        },
        {
          value: "int",
          label: "整型"
        },
        {
          value: "datetime",
          label: "时间类型"
        },
        {
          value: "text",
          label: "短文本"
        },
        {
          value: "mediumtext",
          label: "中等长度文本"
        },
        {
          value: "longtext",
          label: "长文本"
        }
      ],
      addFieldDialogVisible: false,
      addFieldForm: {
        fieldName: "",
        type: "",
        label: "",
        dataType: "",
        dataLength: "",
        placeholder: ""
      },
      addFieldFormRules: {
        fieldName: [
          { required: true, message: "请输入字段名称", trigger: "blur" },
          {
            required: true,
            pattern: /^\s*[\S].{0,23}[\S]\s*$/,
            message: "字段名称长度2-25"
          }
        ],
        type: [
          { required: true, message: "请选择控件类型", trigger: "change" }
        ],
        dataType: [
          { required: true, message: "请选择数据类型", trigger: "change" }
        ],
        dataLength: [
          { required: true, message: "请输入数据类型长度", trigger: "change" }
        ],
        label: [
          { required: true, message: "请输入字段label", trigger: "blur" },
          {
            required: true,
            pattern: /^\s*[\S].{0,18}[\S]\s*$/,
            message: "字段名称长度2-15"
          }
        ]
      },
      activeWidget: {},
      isEdit: false
    };
  },
  updated() {
    // this.$store.commit("layout", this.layout);
    // this.$store.commit("layoutWithWidgetData", this.currentLayout);
  },
  computed: {
    currentLayout: {
      get() {
        return this.$store.state.layout.layoutWithWidgetData;
      },
      set(value) {
        this.$store.commit("layoutWithWidgetData", value);
      }
    },
    layout: {
      get() {
        return this.$store.state.layout.layout;
      },
      set(value) {
        this.$store.commit("layout", value);
      }
    },

    validFieldData() {
      return this.fieldData.filter(item => {
        // debugger
        return !JSON.stringify(this.currentLayout).includes(item.fieldName);
        // return !this.currentLayout.some(
        //   field => field.fieldName === item.fieldName
        // );
      });
    }
  },
  components: {
    draggable,
    layoutTemplates,
    Panel,
    codemirror
  },
  mounted() {
    window.onbeforeunload = function() {
      return true;
    };
  },
  destroyed() {
    window.onbeforeunload = null;
  },
  watch: {
    // currentLayout: {
    //   deep: true,
    //   handler() {
    //     this.handldDuplicate();
    //   }
    // },
    // fieldData() {
    //   this.handldDuplicate();
    // }
  },
  methods: {
    next() {
      // 下一步
      if (this.active++ > 2) {
        this.active = 1;
      }
    },
    prev() {
      if (this.active-- === 1) {
        this.active = 3;
      }
    },

    hasInLayout(field) {
      // debugger
      console.log("hasInLayout");
      return !this.currentLayout.some(item => item.fieldName === field);
    },

    clone(array) {
      return _.cloneDeep(array);
    },

    preview() {
      this.$store.commit("layout", this.layout);
      this.$store.commit("layoutWithWidgetData", this.currentLayout);
      this.$router.push("/Preview");
    },

    customWidget() {
      this.customDialogVisible = true;
    },
    confirmCustomCode() {
      // debugger
      const code = this.code;

      const codeLower = code.toLowerCase();

      const inValidElement = ["script", "link", "img"];

      const isIncludesInvalid = inValidElement.some(item => {
        return codeLower.includes(item);
      });

      // if(codeLower.includes('script')) {
      //   return this.$message.error("只能自定义组件，请勿添加脚本！");
      // }

      // if(isIncludesInvalid) {
      //   return this.$message.error("请勿包含可以获取远程脚本的属性")
      // }

      if (isIncludesInvalid) {
        return this.$message.error("请勿包含可以获取远程脚本的 HTML 元素");
      }

      if (code.trim()) {
        this.currentLayout.push({
          type: "custom",
          template: this.code
        });

        this.customDialogVisible = false;
      } else {
        this.$message.warning("请输入想要自定义的代码！");
      }
    },

    // duplicateField(layoutData, cloneFieldData) {
    //   layoutData.forEach(item => {
    //     if (item.type === "section") {
    //       if (item.children && item.children.length) {
    //         this.duplicateField(item.children, cloneFieldData);
    //       }
    //     } else if (item.type === "layout") {
    //       item.rows.forEach(
    //         item =>
    //           item.children &&
    //           item.children.length &&
    //           this.duplicateField(item.children, cloneFieldData)
    //       );
    //     } else {
    //       const index = cloneFieldData
    //         .map(item => item.fieldName)
    //         .indexOf(item.fieldName);
    //       cloneFieldData.splice(index, 1);
    //     }
    //   });
    // },
    // handldDuplicate() {
    //   // debugger

    //   const cloneFieldData = this.clone(this.fieldData);

    //   this.duplicateField(this.currentLayout, cloneFieldData);
    //   this.hasNotLayoutFieldData = cloneFieldData;
    // },

    queryForm() {
      // 查询整个表单
      const { processDefinitionId } = this.fieldForm;

      request
        .queryFormByProcessDefine({ processDefinitionId: processDefinitionId })
        .then(res => {
          let result = res.result[0];
          let { content } = result;
          if (content) {
            try {
              content = JSON.parse(content);
              const { layout, layoutData, fieldData } = content;
              // debugger
              this.layout = layout;
              this.currentLayout = layoutData;
              this.fieldData = fieldData;
            } catch (e) {
              console.log(e);
            }
          }
        });
    },
    addField() {
      // 新增字段
      this.addFieldDialogVisible = true;
    },
    saveField() {
      // 保存
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let processDefinitionFieldTable = {...this.ruleForm};

          processDefinitionFieldTable.actFormContentList = this.fieldData.map(
            field => {
              const fieldObject = {};
              fieldObject[field.fieldName] = 1;
              fieldObject[field.dataType] = field.dataLength;
              return fieldObject;
            }
          );

          processDefinitionFieldTable.content = JSON.stringify({
            layout: this.layout,
            layoutData: this.currentLayout,
            fieldData: this.fieldData
          });

          const taskIdArray = [
            "taskId001",
            "taskId002",
            "taskId003",
            "taskId004",
            "taskId005",
            "taskId006",
            "taskId007"
          ];

          processDefinitionFieldTable.nodes = taskIdArray.map(item => {
            const taskPermission = {};
            taskPermission.taskId = item;

            const permission = {};
            this.fieldData.forEach(fieldItem => {
              permission[fieldItem.fieldName] = Math.random() * 10 > 5 ? 0 : 1;
            });

            taskPermission.permission = permission;

            return taskPermission;
          });

          request
            .publishForm(JSON.stringify(processDefinitionFieldTable))
            .then(res => {
              const data = res;
              if (!data) {
                this.$message.success("发布成功！");
              } else {
                this.$message.error(data.message);
              }
            });
        } else {
          return false;
        }
      });
    },
    upDateField() {},
    confirmAddField() {
      // 确认增加字段
      this.$refs.addFieldForm.validate(valid => {
        if (valid) {
          const addFieldForm = Object.assign({}, this.addFieldForm);

          const hasOpsField = ["cascader", "select", "checkbox", "radio"];

          const hasClearableField = [
            "text",
            "select",
            "cascader",
            "date",
            "datetime",
            "time"
          ];

          const hasFormat = [
            { type: "time", format: "HH:mm:ss" },
            { type: "date", format: "yyyy-MM-dd" },
            { type: "datetime", format: "yyyy-MM-dd HH:mm:ss" }
          ];

          const { type, dataType, dataLength } = addFieldForm;

          if (hasOpsField.includes(type)) {
            addFieldForm.ops = [];
          }

          if (hasClearableField.includes(type)) {
            addFieldForm.clearable = true;
            addFieldForm.width = "100%";
          }

          hasFormat.forEach(item => {
            if (type === item.type) {
              addFieldForm.format = item.format;
            }
          });

          if (!this.isEdit) {
            this.fieldData.push(addFieldForm);
          }

          this.$message.success("添加字段成功！");
          this.addFieldDialogVisible = false;
          this.$refs.addFieldForm.resetFields();
          this.addFieldForm.placeholder = "";
        } else {
          return false;
        }
      });
    },
    batchDeleteField() {
      // 批量删除字段
    },
    fieldDataHandleSelectionChange() {
      // 监听多选时间
    },
    fieldHandleEdit(row) {
      this.addFieldForm = row;
      this.addFieldDialogVisible = true;
      this.isEdit = true;
    },
    fieldHandleDelete(index) {
      this.fieldData.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
.custom-container {
  padding: 16px 8px 16px 16px;
  position: relative;
  min-height: calc(100vh - 156px);

  .el-dialog {
    .el-select {
      width: 100%;
    }
  }

  .custom-content,
  .form-content {
    // height: 100%;
    height: calc(100vh - 156px);
  }

  // .custom-content-container {
  //   // overflow: auto;
  // }

  .field-col-12 {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .form-panel,
  .form-area {
    overflow: auto;
  }

  .form-area {
    background: #f8f8f8;
    border-radius: 4px;
    overflow-x: hidden;

    .no-layout {
      font-size: 12px;
      color: #ccb;
      text-align: center;
      // padding-top: 100px;
      // border: 1px dashed rgb(172, 172, 238);
      // padding: 16px;
    }
  }

  .el-alert {
    margin-bottom: 4px;
  }

  .el-tag {
    margin-right: 6px;
    margin-bottom: 4px;
    cursor: move;
  }

  .step-container {
    position: absolute;
    // left: 16px;
    left: 8px;
    top: 16px;
    height: calc(100% - 100px);
    width: 150px;
    box-shadow: 2px 2px 8px #ccb;
    border-radius: 2px;
    padding: 5px;
  }
}
</style>