<template>
  <el-form
    label-position="top"
    label-width="130px"
    size="mini"
    class="form-panel-container"
  >
    <el-tabs
      class=""
      type="card"
      :stretch="true"
    >
      <el-tab-pane label="控件设置">

        <div v-if="hasWidgetProperty">
          <el-alert
            title="选中控件之后，backspace 删除"
            type="info"
          >
          </el-alert>
        </div>

        <!-- <el-form-item label="自定义添加属性">
          <el-input v-model="activeWidget.customProperty"></el-input>
        </el-form-item> -->

        <div v-if="isFieldType">

          <el-form-item label="字段名称">
            <el-input
              type="text"
              v-model="activeWidget.fieldName"
            />
          </el-form-item>

          <el-form-item
            label="时间格式"
            v-if="hasFormat"
          >
            <el-input v-model="activeWidget.format"></el-input>
            <a
              target="_blank"
              href="http://element-cn.eleme.io/#/zh-CN/component/date-picker#ri-qi-ge-shi"
            >
              更多格式
            </a>
          </el-form-item>

          <el-form-item label="label">
            <el-input
              type="text"
              v-model="activeWidget.label"
            />
          </el-form-item>

          <el-form-item
            label="默认填充"
            v-if="hasPlaceHolderProperty"
          >
            <el-input
              type="text"
              v-model="activeWidget.placeholder"
            />
          </el-form-item>

          <el-form-item
            label="是否可清除"
            v-if="hasClearableProperty"
          >
            <el-switch v-model="activeWidget.clearable">
            </el-switch>
          </el-form-item>

          <el-form-item
            label="是否可多选"
            v-if="hasMultipleProperty"
          >
            <el-switch v-model="activeWidget.multiple">
            </el-switch>
          </el-form-item>

          <el-form-item
            label="长度限制"
            v-if="hasRulesProperty"
          >
            <el-col :span="11">
              <el-input
                type="text"
                placeholder="最小值"
                v-model="activeWidget.minLength"
              />
            </el-col>
            <el-col
              :span="2"
              class="line"
            >
              <span>-</span>
            </el-col>
            <el-col :span="11">
              <el-input
                type="text"
                placeholder="最大值"
                v-model="activeWidget.maxLength"
              />
            </el-col>

          </el-form-item>

          <el-form-item label="关联其他表单值">
            <el-select
              v-model="activeWidget.bindField"
              multiple
              placeholder="选择其他字段"
            > 
              <el-option
                v-for="item in layoutData"
                :key="item.fieldName"
                :label="item.fieldName"
                :value="item.fieldName"
                :disabled="item.fieldName === activeWidget.fieldName"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="绑定其他表单值">
            <el-select
              v-model="activeWidget.bindingField"
              placeholder="选择其他字段"
            >
              <el-option
                v-for="item in layoutData"
                :key="item.fieldName"
                :label="item.fieldName"
                :value="item.fieldName"
                :disabled="item.fieldName === activeWidget.fieldName"
              >
              </el-option>
            </el-select>
          </el-form-item>

        </div>

        <div v-if="activeWidget.type === 'section'">
          <el-form-item label="Section 标题">
            <el-input v-model="activeWidget.title"></el-input>
          </el-form-item>
          <el-form-item label="边框颜色">
            <el-color-picker v-model="borderColor"></el-color-picker>
          </el-form-item>
          <el-form-item label="边框宽度">
            <el-input v-model.number="borderWidth"></el-input>
          </el-form-item>
          <el-form-item label="边框圆角">
            <el-input v-model.number="borderRadius"></el-input>
          </el-form-item>
        </div>

        <div v-else-if="activeWidget.type === 'layout'">

          <el-form-item label="栅格间隔">
            <el-input v-model.number="activeWidget.gutter"></el-input>
          </el-form-item>

          <el-form-item label="栅格">
            <el-button
              @click="addRows"
              icon="el-icon-plus"
              type="primary"
              class="add-options-icon"
              size="mini"
              circle
            ></el-button>

            <div
              v-for="(row, index) in activeWidget.rows"
              :key="index"
              :label="'列 ' + (index+1) "
            >
              <el-button
                @click="removeRows(index)"
                icon="el-icon-minus"
                size="mini"
                circle
              ></el-button>

              <el-input-number
                v-model="row.span"
                size="mini"
                controls-position="right"
                :min="1"
                :max="24"
              ></el-input-number>

            </div>
          </el-form-item>

        </div>

        <div v-else-if="hasStaticResource">

          <el-form-item label="数据源">
            <el-radio
              v-model="activeWidget.isRemote"
              :label="true"
            >
              远程数据
            </el-radio>

            <el-radio
              :disabled="activeWidget.type === 'cascader'"
              v-model="activeWidget.isRemote"
              :label="false"
            >
              静态数据
            </el-radio>
          </el-form-item>

          <el-form-item
            v-if="activeWidget.isRemote"
            label="远程数据源"
          >
            <!-- <el-input
              type="text"
              placeholder="远程数据源对应的方法名，不能重名"
              v-model="activeWidget.remoteFunction"
            /> -->
            <el-select
              v-model="activeWidget.remoteFunction"
              filterable
              allow-create
              default-first-option
              placeholder="远程数据源对应的方法名"
            >
              <el-option
                v-for="item in codes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            v-if="activeWidget.isRemote === false"
            label="静态数据源"
          >
            <el-button
              @click="addOps"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              class="add-options-icon"
              circle
            ></el-button>

            <div
              v-for="(ops, index) in activeWidget.ops"
              :key="index"
            >
              <el-col :span="10">
                <el-input
                  v-model="ops.label"
                  size="mini"
                  placeholder="label"
                />
              </el-col>
              <el-col :span="10">
                <el-input
                  v-model="ops.value"
                  size="mini"
                  placeholder="value"
                />
              </el-col>

              <el-col :span="4">
                <el-button
                  @click="removeOps(index)"
                  icon="el-icon-minus"
                  size="mini"
                  circle
                ></el-button>
              </el-col>

            </div>

          </el-form-item>
        </div>

        <div v-if="hasWidgetProperty">

          <el-form-item label="宽">
            <el-input
              v-model="activeWidget.width"
              placeholder="请自行加上单位（px/%）"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="高"
            v-if="activeWidget.type === 'textarea'"
          >
            <el-input
              v-model="activeWidget.height"
              placeholder="请自行加上单位（px/%）"
            ></el-input>
          </el-form-item>

          <el-form-item label="其他样式">
            <el-input
              v-model="activeWidget.style"
              placeholder="手动输入css样式（分号分隔）"
            ></el-input>
          </el-form-item>
        </div>

      </el-tab-pane>

      <el-tab-pane label="表单设置">
        <el-form-item label="对齐方式">
          <el-radio-group
            v-model="position"
            size="small"
          >
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="表单size">
          <el-radio-group
            v-model="size"
            size="small"
          >
            <el-radio-button label="medium">medium</el-radio-button>
            <el-radio-button label="small">small</el-radio-button>
            <el-radio-button label="mini">mini</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="label宽度">
          <el-input
            v-model.number="width"
            placeholder=""
          ></el-input>
        </el-form-item>

        <el-form-item label="控件行间距">
          <el-input
            v-model.number="space"
            placeholder=""
          ></el-input>
        </el-form-item>

        <el-form-item label="段落下边距">
          <el-input
            v-model.number="margin"
            placeholder=""
          ></el-input>
        </el-form-item>

        <el-form-item label="段落内边距">
          <el-input
            v-model.number="padding"
            placeholder=""
          ></el-input>
        </el-form-item>

      </el-tab-pane>
    </el-tabs>
  </el-form>

</template>

<script>
import { codes } from "@/modules/pms/until/builtInOriginFunc.js";

export default {
  name: "Panel",
  data() {
    return {
      codes: codes,
      
      position: this.labelPosition,
      width: this.labelWidth,
      size: this.formSize,
      margin: this.sectionMargin,
      padding: this.sectionPadding,
      space: this.widgetSpace,
      borderWidth: this.sectionBdWidth,
      borderColor: this.sectionBdColor,
      borderRadius: this.sectionBdRadius
    };
  },
  props: {
    layoutData: {
      type: Array
    },
    activeWidget: {
      type: Object,
      required: true
    },
    labelPosition: {
      type: String
    },
    formSize: {
      type: String
    },
    labelWidth: {
      type: Number
    },
    widgetSpace: {
      type: Number
    },
    sectionMargin: {
      type: Number
    },
    sectionPadding: {
      type: Number
    },
    sectionBdColor: {
      type: String
    },
    sectionBdWidth: {
      type: Number
    },
    sectionBdRadius: {
      type: Number
    }
  },
  updated() {
    // console.log(this.activeWidget);
    // debugger
    if (!this.activeWidget.bindField) {
      this.$set(this.activeWidget, "bindField", []);
    }

    if (this.activeWidget.type === "cascader") {
      if (!this.activeWidget.isRemote) {
        this.$set(this.activeWidget, "isRemote", true);
      }
    }
  },
  computed: {
    // builtInOriginFuncName() {
    //   return Object.keys(builtInOriginFunc);
    // },
    hasStaticResource() {
      // 静态资源
      const hasStaticResources = ["select", "cascader", "radio", "checkbox"];
      return hasStaticResources.includes(this.activeWidget.type);
    },
    hasPlaceHolderProperty() {
      // 填充属性
      const hasPlaceHolderProperty = ["radio", "number", "checkbox"];
      return !hasPlaceHolderProperty.includes(this.activeWidget.type);
    },
    hasClearableProperty() {
      // 清除属性
      const hasClearableProperty = [
        "text",
        "select",
        "time",
        "date",
        "datetime",
        "cascader"
      ];
      return hasClearableProperty.includes(this.activeWidget.type);
    },
    hasRulesProperty() {
      const hasRulesProperty = ["text", "textarea"];
      return hasRulesProperty.includes(this.activeWidget.type);
    },
    hasWidgetProperty() {
      return !!Object.keys(this.activeWidget).length;
    },
    isFieldType() {
      // 是否是字段类型
      const isNotFieldArray = ["section", "layout", "processSteps"];
      return (
        !isNotFieldArray.includes(this.activeWidget.type) &&
        this.hasWidgetProperty
      );
    },
    hasFormat() {
      const hasFormat = ["time", "date", "datetime"];
      return hasFormat.includes(this.activeWidget.type);
    },
    hasMultipleProperty() {
      const hasMultipleProperty = ["select"];
      return hasMultipleProperty.includes(this.activeWidget.type);
    }
  },
  watch: {
    'activeWidget.isRemote': function(value) {
      if(value && this.activeWidget.remoteFunction === undefined) {
        this.$set(this.activeWidget, "remoteFunction", '');
      }
    },
    position(val) {
      this.$emit("update:labelPosition", val);
    },
    size(val) {
      this.$emit("update:formSize", val);
    },
    width(val) {
      this.$emit("update:labelWidth", val || 0);
    },
    margin(val) {
      this.$emit("update:sectionMargin", val || 0);
    },
    padding(val) {
      this.$emit("update:sectionPadding", val || 0);
    },
    space(val) {
      this.$emit("update:widgetSpace", val || 0);
    },
    borderWidth(val) {
      this.$emit("update:sectionBdWidth", val || 0);
    },
    borderColor(val) {
      this.$emit("update:sectionBdColor", val);
    },
    borderRadius(val) {
      this.$emit("update:sectionBdRadius", val || 0);
    }
  },
  methods: {
    addOps() {
      this.activeWidget.ops.push({
        label: "label",
        value: "value"
      });
    },
    removeOps(index) {
      this.activeWidget.ops.splice(index, 1);
    },
    removeRows(index) {
      this.activeWidget.rows.splice(index, 1);
    },

    addRows() {
      const remainRows = this.activeWidget.rows.push({
        span: 12,
        children: []
      });
    },
    throth(fn, time = 350) {
      let self = fn,
        isFirst = true,
        timer = null,
        _this = this;

      return function() {
        const args = arguments;

        if (isFirst) {
          isFirst = false;
          return self.apply(_this, args);
        }

        timer = setTimeout(function() {
          clearTimeout(timer);
          timer = null;
          self.apply(_this, args);
        }, time);
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.form-panel-container {
  .el-form-item {
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;
  }
  .add-options-icon {
    margin-bottom: 8px;
  }
  .line {
    text-align: center;
  }
}
</style>