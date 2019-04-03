<script>
import draggable from "vuedraggable";
import layoutRow from "./layoutRow";
// import instance from "../request";
// import processSteps from "./processSteps";
import processSteps from "@/modules/oms/views/components/processSteps";

import Vue from "vue";

Vue.component("customWidget", {
  props: {
    template: String,
    form: Object
  },
  render(h) {
    const custom = Vue.extend({
      template: this.template,
      props: {
        form: Object
      }
    });

    return h(custom, {
      props: {
        from: this.form
      }
    });
  }
});

export default {
  name: "LayoutTemplate",
  props: {
    layoutData: {
      type: Array,
      required: true
    },
    fieldData: {
      type: Array
    },
    packagedComponentData: {
      type: Array
    },
    activeWidget: {
      type: Object,
      required: true
    },
    labelPosition: {
      type: String,
      default: "right"
    },
    formSize: {
      type: String,
      default: "mini"
    },
    labelWidth: {
      type: Number,
      default: 120
    },
    widgetSpace: {
      type: Number,
      default: 18
    },
    sectionMargin: {
      type: Number,
      default: 16
    },
    sectionPadding: {
      type: Number,
      default: 16
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
  data() {
    return {
      form: {},
      isActive: null,
      currentWidget: this.activeWidget,
      value: [],
      validField: ["layout", "section", "custom"],
      packagedComponentDataArray: ["processSteps"],
      val: ""
    };
  },
  components: {
    draggable,
    layoutRow,
    processSteps
  },
  updated() {
    // debugger
    console.log(this.layoutData);
  },
  watch: {
    currentWidget(val) {
      this.$emit("update:activeWidget", val);
    }
  },
  render(h) {
    let {
      layoutData,
      form,
      formSize,
      labelWidth,
      labelPosition,
      layout
    } = this;

    labelWidth += "px";
    
    return (
      <div class="layout-form" onClick={e => this.handleSelect(e, {})}>
        <el-form
          disabled
          class="layout-form"
          model={form}
          size={formSize}
          labelWidth={labelWidth}
          labelPosition={labelPosition}
        >
          <draggable
            list={layoutData}
            class="form-drag-content"
            options={{ group: { name: "dragLayout" } }}
            move={this.move}
          >
            {layout(layoutData)}
          </draggable>
        </el-form>
      </div>
    );
  },
  methods: {
    move(evt) {
      // 防止拖拽后复制
      return !evt.relatedContext.component.$el.className.includes(
        "form-content"
      );
    },
    renderWidget(tpl) {
      const styleObjects = this.assignStyle(tpl.style, {
        height: tpl.height,
        width: tpl.width
      });

      switch (tpl.type) {
        case "text":
          return (
            <el-input
              // style={styleObjects}
              maxlength={tpl.maxLength}
              minlength={tpl.minLength}
              clearable={tpl.clearable}
              value={this.val}
              placeholder={tpl.placeholder}
            />
          );
        case "select":
          if (tpl.isRemote) {
            return (
              <el-select
                clearable={tpl.clearable}
                value={this.val}
                placeholder={tpl.placeholder}
              />
            );
          } else {
            const ops = tpl.ops.map(ops => (
              <el-option label={ops.key} value={ops.value} />
            ));
            return (
              <el-select
                value={this.val}
                clearable={tpl.clearable}
                placeholder={tpl.placeholder}
              >
                {ops}
              </el-select>
            );
          }

        case "time":
          return (
            <el-time-picker
              // style={styleObjects}
              value={this.val}
              clearable={tpl.clearable}
              placeholder={tpl.placeholder}
            />
          );
        case "date":
          return (
            <el-date-picker
              // style={styleObjects}
              value={this.val}
              clearable={tpl.clearable}
              placeholder={tpl.placeholder}
              type="date"
            />
          );
        case "datetime":
          return (
            <el-date-picker
              // style={styleObjects}
              value={this.val}
              clearable={tpl.clearable}
              placeholder={tpl.placeholder}
              type="datetime"
            />
          );
        case "textarea":
          return (
            <el-input
              style={styleObjects}
              type="textarea"
              maxlength={tpl.maxLength}
              minlength={tpl.minLength}
              value={this.val}
              clearable={tpl.clearable}
              placeholder={tpl.placeholder}
            />
          );
        case "cascader":
          return (
            <el-cascader
              options={[]}
              // style={styleObjects}
              value={[]}
              clearable={tpl.clearable}
              placeholder={tpl.placeholder}
            />
          );
        case "radio":
          if (tpl.isRemote) {
            return (
              <el-radio-group
                // style={styleObjects}
                value={this.val}
                clearable={tpl.clearable}
                placeholder={tpl.placeholder}
              />
            );
          } else {
            const ops = tpl.ops.map(ops => (
              <el-radio label={ops.value}>{ops.key}</el-radio>
            ));
            return (
              <el-radio-group
                // style={styleObjects}
                value={this.val}
                clearable={tpl.clearable}
                placeholder={tpl.placeholder}
              >
                {ops}
              </el-radio-group>
            );
          }

        case "checkbox":
          if (tpl.isRemote) {
            return (
              <el-checkbox-group
                // style={styleObjects}
                value={this.val}
                clearable={tpl.clearable}
                placeholder={tpl.placeholder}
              />
            );
          } else {
            const ops = tpl.ops.map(ops => (
              <el-checkbox label={ops.value}>{ops.key}</el-checkbox>
            ));

            return (
              <el-checkbox-group
                // style={styleObjects}
                clearable={tpl.clearable}
                value={this.val}
                placeholder={tpl.placeholder}
              >
                {ops}
              </el-checkbox-group>
            );
          }

        case "number":
          return (
            <el-input-number
              style={tpl.style}
              value={this.val}
              clearable={tpl.clearable}
              placeholder={tpl.placeholder}
              v-model={this.form[tpl.fieldName]}
            />
          );
      }
    },
    layout(layoutData) {
      let {
        sectionMargin,
        sectionPadding,
        widgetSpace,
        isActive,
        sectionBdWidth,
        sectionBdColor,
        sectionBdRadius
      } = this;

      sectionMargin += "px";
      sectionPadding += "px";
      widgetSpace += "px";
      sectionBdWidth += "px";
      sectionBdRadius += "px";

      return layoutData.map((tpl, index) => {
        if (tpl.type === "layout") {
          return (
            <layout-row
              layoutData={layoutData}
              handleSelect={this.handleSelect}
              isActive={isActive}
              deleteWidget={this.deleteWidget}
              rowData={tpl}
              index={index}
              layout={this.layout}
            />
          );
        } else if (tpl.type === "section") {
          const styleObjects = this.assignStyle(tpl.style, {
            marginBottom: sectionMargin,
            height: tpl.height,
            width: tpl.width
          });

          const sectionContentStyleObjects = this.assignStyle(";", {
            padding: sectionPadding,
            borderWidth: sectionBdWidth,
            borderColor: sectionBdColor,
            borderRadius: sectionBdRadius
          });

          return (
            <div
              class={[
                "section-container",
                { "current-active": isActive === tpl }
              ]}
              onClick={e => this.handleSelect(e, tpl)}
              onKeyup={e => this.deleteWidget(e, layoutData, index, tpl)}
              style={styleObjects}
              tabIndex="-1"
            >
              <h3 class="section-title">{tpl.title}</h3>
              <draggable
                list={tpl.children}
                options={{ group: "dragLayout" }}
                class="section-content"
                style={sectionContentStyleObjects}
              >
                {this.layout(tpl.children)}
              </draggable>
            </div>
          );
        } else if (tpl.type === "processSteps") {
          const styleObjects = this.assignStyle(tpl.style, {
            height: tpl.height,
            width: tpl.width
          });
          return (
            <div
              style={styleObjects}
              class={isActive === tpl ? "current-active" : ""}
              onClick={e => this.handleSelect(e, tpl)}
              onKeyup={e => this.deleteWidget(e, layoutData, index, tpl)}
              tabIndex="-1"
            >
              <process-steps procInstId="procInstId" ruleForm="ruleForm" />
            </div>
          );
        } else if (tpl.type === "custom") {
          return (
            <div
              class={isActive === tpl ? "current-active" : ""}
              onClick={e => this.handleSelect(e, tpl)}
              onKeyup={e => this.deleteWidget(e, layoutData, index, tpl)}
              tabIndex="-1"
            >
              <custom-widget template={tpl.template} from={this.form} />
            </div>
          );
        } else {
          const styleObjects = this.assignStyle(tpl.style, {
            height: tpl.height,
            width: tpl.width
          });
          return (
            <div
              style={styleObjects}
              onClick={e => this.handleSelect(e, tpl)}
              onKeyup={e => this.deleteWidget(e, layoutData, index, tpl)}
              class={isActive === tpl ? "current-active" : ""}
              tabIndex="-1"
            >
              <el-form-item
                class={"layout-form-item"}
                label={tpl.label}
                style={{ marginBottom: widgetSpace }}
              >
                {this.renderWidget(tpl)}
              </el-form-item>
            </div>
          );
        }
      });
    },

    deleteWidget(e, data, index, tpl) {
      // backspace 删除控件
      e.stopPropagation();

      const keyCode = e.keyCode || e.which || e.charCode;
      // backspace 键
      if (keyCode === 8) {
        data.splice(index, 1);
        // 控件删除后重新 push 到字段列表
        // this.recursionWidget(tpl);
      }
    },
    handleSelect(e, tpl) {
      e.stopPropagation();

      this.isActive = tpl;
      this.currentWidget = tpl;
    },
    recursionWidget(data) {
      if (data instanceof Array) {
        data.forEach(item => this.recursionWidget(item));
      } else {
        if (!this.validField.includes(data.type)) {
          if (this.packagedComponentDataArray.includes(data.type)) {
            this.packagedComponentData.push(data);
          } else {
            this.fieldData.push(data);
          }
        } else if (data.type === "layout") {
          data.rows.forEach(
            item =>
              item.children &&
              item.children.length &&
              this.recursionWidget(item.children)
          );
        } else {
          if (data.children && data.children.length) {
            this.recursionWidget(data.children);
          }
        }
      }
    },
    assignStyle(style, object) {
      if (!style) {
        return object;
      }
      try {
        return style
          .split(";")
          .map(styles => {
            const styleArray = styles.split(":");
            const styleObject = {};

            styleObject[styleArray[0]] = styleArray[1];
            return styleObject;
          })
          .reduce((a, b) => Object.assign({}, a, b), object);
      } catch (e) {
        this.$message.error("样式格式错误！");
      }
    }
  }
};
</script>

<style lang="scss">
.layout-form {
  height: 100%;
  > .form-drag-content {
    height: 100%;
  }
  .el-select,
  .el-input {
    width: 100%;
  }
  .layout-form-item {
    cursor: move;
  }
  .el-textarea > .el-textarea__inner {
    height: 100% !important;
  }
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #eceff7;
}
.edit-layout {
  margin-bottom: 16px;
}
.section-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 3px;
}
.section-content {
  min-height: 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.current-active {
  // border: 1px dotted #ccc;
  outline: none;
  border: 2px solid rgb(125, 184, 252);
  border-radius: 2px;
}
</style>


