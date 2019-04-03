<script>
import layoutRow from "./resolveRows";
import processSteps from "@/modules/oms/views/components/processSteps";
// import processSteps from "./processSteps";
import * as builtInOriginFunc from "@/modules/pms/until/builtInOriginFunc.js";

const { querySelectCodesList } = builtInOriginFunc;
const builtInOriginFuncList = { ...builtInOriginFunc, ...querySelectCodesList };

export default {
  name: "resolveTemplate",
  props: {
    layoutData: {
      type: Array,
      required: true
    },
    layoutStyle: {
      type: Object,
      required: true
    },
    allData: {
      type: Object
    }
  },
  data() {
    return {
      form: {},
      ops: {}
    };
  },
  components: {
    layoutRow,
    processSteps
  },
  created() {
    this.setFormProperty(this.layoutData);
  },
  watch: {
    form: {
      handler() {
        this.$emit('update:allData', this.form);
      },
      deep: true
    }
  },      
  updated() {
    // debugger
  },
  mounted() {
    // 手动添加字段到 form 对象，并进行绑定
    // 实现 form 数据的响应式
    // console.log("mounted");

    // console.log(this.layoutData);
    // console.log(this.form);
  },
  render() {
    console.log("render");

    let { layoutData, form, layout, layoutStyle } = this;

    let { formSize, labelWidth, labelPosition } = layoutStyle;

    labelWidth += "px";

    return (
      <el-form
        class="layout-form"
        model={form}
        size={formSize}
        labelWidth={labelWidth}
        labelPosition={labelPosition}
      >
        {layout(layoutData)}
      </el-form>
    );
  },
  methods: {
    setFormProperty(data) {
      data.forEach(item => {
        if (item.type === "section") {
          if (item.children && item.children.length) {
            this.setFormProperty(item.children);
          }
        } else if (item.type === "layout") {
          item.rows.forEach(
            item =>
              item.children &&
              item.children.length &&
              this.setFormProperty(item.children)
          );
        } else {
          if (
            item.type === "checkbox" ||
            item.type === "cascader" ||
            item.multiple
          ) {
            // 有些控件，如多选的或者级联初始值为 数组
            this.$set(this.form, item.fieldName, []);
          } else {
            this.$set(this.form, item.fieldName, "");
          }
          // 是否是从后台获取数据
          if (item.isRemote) {
            this.$set(this.ops, item.remoteFunction + "Ops", []);

            if (item.bindField && item.bindField.length) {
              // 是否与其他字段有关联，比如取决于其他字段
              // 手动 watch 并执行获取远程数据的 funciton
              item.bindField.forEach(field => {
                this.$watch(`form.${field}`, function(newVal, oldVal) {
                  if (Array.isArray(this.form[item.fieldName])) {
                    this.form[item.fieldName] = [];
                  } else {
                    this.form[item.fieldName] = "";
                  }
                  // 监听关联字段改变并触发远程数据调用
                  this.getOriginRes(item);
                });
              });
            } else {
              // 触发远程数据调用
              this.getOriginRes(item);
            }
          }
        }
      });
    },
    upDateRemoteFunctionOps(tpl, data) {
      switch (tpl.type) {
        case "select":
          this.ops[tpl.remoteFunction + "Ops"] = data.map(ops => (
            <el-option label={ops.label} value={ops.value} />
          ));
          break;
        case "cascader":
          this.ops[tpl.remoteFunction + "Ops"] = data;
          break;
        case "radio":
          this.ops[tpl.remoteFunction + "Ops"] = data.map(ops => (
            <el-radio label={ops.value}>{ops.label}</el-radio>
          ));
          break;
        case "checkbox":
          this.ops[tpl.remoteFunction + "Ops"] = data.map(ops => (
            <el-checkbox label={ops.value}>{ops.label}</el-checkbox>
          ));
          break;
      }
    },
    getOriginRes(tpl) {
      // 后台数据 function 回调
      // console.log('getOriginRes');
      const _this = this;
      console.log(tpl);
      const callback =
        builtInOriginFuncList[tpl.remoteFunction] ||
        this.$attrs[tpl.remoteFunction];

      if (!callback) {
        return this.$message.error("获取远程数据源方法未填写！");
      }
      
      // 获取远程数据是否依赖其他字段
      if (tpl.bindField && tpl.bindField.length) {
        const bindFieldData = tpl.bindField.map(item => this.form[item]);
        callback(
          tpl,
          function(data) {
            _this.upDateRemoteFunctionOps(tpl, data);
          },
          bindFieldData
        );
      } else {
        callback(tpl, function(data) {
          _this.upDateRemoteFunctionOps(tpl, data);
        });
      }
    },
    handleInput(value, fieldName) {
      // 数据绑定到 form
      this.form[fieldName] = value;
    },
    renderWidget(tpl) {
      // 渲染 form 组件
      // const styleObjects = this.assignStyle(tpl.style, {
      //   height: tpl.height,
      //   width: tpl.width
      // });

      const isBindingField = tpl.bindingField;

      const remoteFunction = tpl.remoteFunction;

      const styleObjects = this.assignStyle(tpl.style, {
        height: tpl.height,
        width: tpl.width
      });

      switch (tpl.type) {
        case "text":
          return (
            <el-input
              disabled={!!isBindingField}
              maxlength={tpl.maxLength}
              minlength={tpl.minLength}
              value={
                isBindingField
                  ? this.form[isBindingField]
                  : this.form[tpl.fieldName]
              }
              clearable={tpl.clearable}
              placeholder={tpl.placeholder}
              onInput={value => this.handleInput(value, tpl.fieldName)}
            />
          );
        case "select":
          if (tpl.isRemote) {
            return (
              <el-select
                clearable={tpl.clearable}
                placeholder={tpl.placeholder}
                value={this.form[tpl.fieldName]}
                multiple={tpl.multiple}
                onInput={value => this.handleInput(value, tpl.fieldName)}
              >
                {this.ops[remoteFunction + "Ops"]}
              </el-select>
            );
          } else {
            const ops = tpl.ops.map(ops => (
              <el-option label={ops.label} value={ops.value} key={ops.value} />
            ));

            return (
              <el-select
                disabled={!!isBindingField}
                clearable={tpl.clearable}
                placeholder={tpl.placeholder}
                value={
                  isBindingField
                    ? this.form[isBindingField]
                    : this.form[tpl.fieldName]
                }
                multiple={tpl.multiple}
                onInput={value => this.handleInput(value, tpl.fieldName)}
              >
                {ops}
              </el-select>
            );
          }

        case "time":
          return (
            <el-time-picker
              disabled={!!isBindingField}
              clearable={tpl.clearable}
              placeholder={tpl.placeholder}
              picker-options={{ selectableRange: "" }}
              value-format={tpl.format}
              value={
                isBindingField
                  ? this.form[isBindingField]
                  : this.form[tpl.fieldName]
              }
              onInput={value => this.handleInput(value, tpl.fieldName)}
            />
          );
        case "date":
          return (
            <el-date-picker
              disabled={!!isBindingField}
              clearable={tpl.clearable}
              placeholder={tpl.placeholder}
              value-format={tpl.format}
              value={
                isBindingField
                  ? this.form[isBindingField]
                  : this.form[tpl.fieldName]
              }
              onInput={value => this.handleInput(value, tpl.fieldName)}
              type="date"
            />
          );
        case "datetime":
          return (
            <el-date-picker
              type="datetime"
              disabled={!!isBindingField}
              clearable={tpl.clearable}
              placeholder={tpl.placeholder}
              value-format={tpl.format}
              value={
                isBindingField
                  ? this.form[isBindingField]
                  : this.form[tpl.fieldName]
              }
              onInput={value => this.handleInput(value, tpl.fieldName)}
            />
          );
        case "textarea":
          return (
            <el-input
              type="textarea"
              style={styleObjects}
              disabled={!!isBindingField}
              maxlength={tpl.maxLength}
              minlength={tpl.minLength}
              value={
                isBindingField
                  ? this.form[isBindingField]
                  : this.form[tpl.fieldName]
              }
              placeholder={tpl.placeholder}
              onInput={value => this.handleInput(value, tpl.fieldName)}
            />
          );
        case "cascader":
          return (
            <el-cascader
              options={this.ops[remoteFunction + "Ops"]}
              disabled={!!isBindingField}
              clearable={tpl.clearable}
              placeholder={tpl.placeholder}
              value={
                isBindingField
                  ? this.form[isBindingField]
                  : this.form[tpl.fieldName]
              }
              onInput={value => this.handleInput(value, tpl.fieldName)}
            />
          );
        case "radio":
          if (tpl.isRemote) {
            return (
              <el-radio-group
                value={this.form[tpl.fieldName]}
                onInput={value => this.handleInput(value, tpl.fieldName)}
              >
                {this.ops[remoteFunction + "Ops"]}
              </el-radio-group>
            );
          } else {
            const ops = tpl.ops.map(ops => {
              return (
                <el-radio label={ops.value} key={ops.value}>
                  {ops.label}
                </el-radio>
              );
            });
            return (
              <el-radio-group
                disabled={!!isBindingField}
                value={
                  isBindingField
                    ? this.form[isBindingField]
                    : this.form[tpl.fieldName]
                }
                onInput={value => this.handleInput(value, tpl.fieldName)}
              >
                {ops}
              </el-radio-group>
            );
          }

        case "checkbox":
          if (tpl.isRemote) {
            return (
              <el-checkbox-group
                clearable={tpl.clearable}
                value={this.form[tpl.fieldName]}
                onInput={value => this.handleInput(value, tpl.fieldName)}
              >
                {this.ops[remoteFunction + "Ops"]}
              </el-checkbox-group>
            );
          } else {
            const ops = tpl.ops.map(ops => (
              <el-checkbox label={ops.value} key={ops.value}>
                {ops.label}
              </el-checkbox>
            ));
            return (
              <el-checkbox-group
                disabled={!!isBindingField}
                value={
                  isBindingField
                    ? this.form[isBindingField]
                    : this.form[tpl.fieldName]
                }
                onInput={value => this.handleInput(value, tpl.fieldName)}
              >
                {ops}
              </el-checkbox-group>
            );
          }

        case "number":
          return (
            <el-input-number
              disabled={!!isBindingField}
              clearable={tpl.clearable}
              value={
                isBindingField
                  ? this.form[isBindingField]
                  : this.form[tpl.fieldName]
              }
              onInput={value => this.handleInput(value, tpl.fieldName)}
            />
          );
      }
    },
    layout(layoutData) {
      let {
        widgetSpace,
        sectionMargin,
        sectionPadding,
        sectionBdWidth,
        sectionBdColor,
        sectionBdRadius
      } = this.layoutStyle;

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
              rowData={tpl}
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
            <div class={["section-container"]} style={styleObjects}>
              <h3 class="section-title">{tpl.title}</h3>
              <div class="section-content" style={sectionContentStyleObjects}>
                {this.layout(tpl.children)}
              </div>
            </div>
          );
        } else if (tpl.type === "processSteps") {
          const styleObjects = this.assignStyle(tpl.style, {
            height: tpl.height,
            width: tpl.width
          });
          return (
            <div style={styleObjects}>
              <process-steps procInstId="procInstId" ruleForm="ruleForm" />
            </div>
          );
        } else {
          const styleObjects = this.assignStyle(tpl.style, {
            height: tpl.height,
            width: tpl.width,
            marginBottom: widgetSpace
          });
          return (
            <el-form-item
              style={styleObjects}
              class={"layout-form-item"}
              label={tpl.label}
            >
              {this.renderWidget(tpl)}
            </el-form-item>
          );
        }
      });
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
  .el-textarea > .el-textarea__inner {
    height: 100% !important;
  }
  .el-cascader {
    width: 100%;
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
}
</style>