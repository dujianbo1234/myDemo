<template>
  <div class="container">
    <el-tabs v-model="activeName2" type="border-card" tab-position="top" @tab-click="handleClick">
      <el-tab-pane label="指标基本信息" name="first">
        <!--   <el-card shadow="never" class="block">
          <el-row :gutter="20" class="">
            <el-col :span="10" :push="3">
              <label for="indicatorType" style="width:50%">指标名称:</label>
              <el-input id="indicatorType" v-model="input" size="medium" style="width:50%" placeholder="请输入内容" />
            </el-col>
            <el-col :span="10" :push="1">
              <label for="indicatorType" style="width:50%">指标编码:</label>
              <el-select v-model="code" filterable default-first-option placeholder="请选择编码">
                <el-option v-for="item in codeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18" :push="3">
              <label for="indicatorType" style="width:50%">指标类型:</label>
              <el-input id="indicatorType" v-model="input" size="medium" style="width:50%" placeholder="请输入内容" />
              <el-button type="primary" style="margin:0 0 0 10px" round>
                搜索
              </el-button>
              <el-button type="primary" style="margin:0 0 0 10px" round>
                重置
              </el-button>
            </el-col>
          </el-row>
        </el-card>-->
        <el-row class="btnInfo">
          <el-col :push="2">
            <el-button type="primary" @click="outerVisible = true">新增指标</el-button>
            <el-button type="primary">修改指标</el-button>
            <el-button type="primary">删除指标</el-button>
            <el-button type="primary">批量启用</el-button>
            <el-button type="primary">批量停用</el-button>
          </el-col>
        </el-row>
        <el-row class="block">
          <el-col :span="20" :push="2">
            <el-table ref="multipleTable" :data="metricsDefData" tooltip-effect="dark" style="width: 100%" fit="true" border>
              <el-table-column type="selection" width="50" />
              <el-table-column prop="num" label="序号" />
              <el-table-column prop="name" label="指标名" />
              <el-table-column prop="alias" label="指标别名" />
              <el-table-column prop="code" label="指标编码" width="160" />
              <el-table-column prop="source_metric" label="所属资源类型" width="120" />
              <el-table-column prop="frequency" label="采集频率" />
              <el-table-column prop="calc_type" label="计算类型" />
              <el-table-column prop="status" label="是否启用" />
            </el-table>
            <el-pagination :page-size="100" :total="1000" align="right" layout="prev, pager, next, jumper" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="指标计算规则" name="second">
        指标计算规则
      </el-tab-pane>
    </el-tabs>
    <!-- Form -->
    <el-dialog :visible.sync="outerVisible" width="80%" title="新增指标" top="5vh">
      <!-- <el-dialog :visible.sync="innerVisible" width="40%" title="选择特殊对象" append-to-body>
        <el-form ref="form" :model="form" label-width="140px">
          <keep-alive>
            <el-select v-model="value5" multiple placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </keep-alive>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog> -->
      <el-form ref="form" :model="form" :rules="rules"  inline="true" size="small" label-width="140px">
        <el-form-item label="指标名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="指标编码" prop="name">
          <el-input v-model="form.name" />
        </el-form-item> 
        <el-form-item label="指标别名(规范)" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="指标别名(自定义)" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="指标类型" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="指标维度" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="是否启用" style="display:block">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="指标描述" style="display:block">
          <el-input v-model="form.desc" type="textarea" rows="4" cols="60" />
        </el-form-item>
        <el-form-item label="指标所属资源类型">
          <el-cascader :options="options" placeholder="试试搜索" filterable style="width:185px" />
        </el-form-item>
        <el-form-item label="采集频率">
          <el-select v-model="value" placeholder="请选择" style="width:185px">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="指标单位">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" size="small" label-width="100px">
        <el-row>
          <el-col :push="1">
            <el-tabs type="border-card" style="width:90%" tab-position="left" center="true">
              <el-tab-pane label="指标配置">
                <el-form-item label="计算类型">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="原始指标" />
                    <el-radio label="聚合指标" />
                  </el-radio-group>
                </el-form-item>
                <el-card shadow="never" style="width:60%">
                  <el-form-item label="数据类型">
                    <el-select v-model="value1" placeholder="请选择" style="width:185px">
                      <el-option key="text" label="文本" value="text" />
                      <el-option key="float" label="浮点数" value="float" />
                      <el-option key="int" label="正整数" value="text" />
                      <el-option key="char" label="字符" value="text" />
                      <el-option key="log" label="日志" value="text" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="采集方式">
                    <el-checkbox-group v-model="form.type">
                      <el-row>
                        <el-checkbox label="zabbix agent" name="type" />
                        <el-checkbox label="snmp" name="type" />
                        <el-checkbox label="jmx" name="type" />
                      </el-row>
                      <el-row>
                        <el-checkbox label="flume" name="type" />
                        <el-checkbox label="jdbc" name="type" />
                        <el-checkbox label="自定义脚本" name="type" />
                      </el-row>
                    </el-checkbox-group>
                  </el-form-item>
                </el-card>
                <el-form-item label="指标类别">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="性能指标" />
                    <el-radio label="告警指标" />
                  </el-radio-group>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="告警配置">
                <el-row>
                  <el-col :span="4">
                    <el-card class="box-card" style="text-align:center">
                      <ol>
                        <li>
                          <a :key="moren" class="text item active" style="display:block" href="javascript:void(0);">
                            默认
                          </a>
                        </li>
                        <li>
                          <a v-for="o in 4" :key="o" class="text item" style="display:block" href="javascript:void(0);">
                            {{ '特殊策略' + o }}
                          </a>
                        </li>
                      </ol>
                      <el-button icon="el-icon-plus" size="mini" circle />
                    </el-card>
                  </el-col>
                  <el-col :span="20">
                    <el-form-item label="校验时间">
                      <el-date-picker v-model="formInline.startTime" :default-time="['12:00:00']" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" />
                    </el-form-item>
                    <el-form-item label="特殊对象选择">
                      <el-select v-model="value5" multiple filterable default-first-option placeholder="请选择">
                        <el-option
                          v-for="item in options2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"/>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="校验器类型">
                      <el-select v-model="value1" placeholder="请选择" style="width:185px">
                        <el-option value="数值校验器" label="数值校验器" />
                        <el-option value="变化百分比校验器" label="变化百分比校验器" />
                        <el-option value="变化量校验器" label="变化量校验器" />
                        <el-option value="变化率校验器" label="变化率校验器" />
                        <el-option value="变化校验器" label="变化校验器" />
                        <el-option value="表达式校验器" label="表达式校验器" />
                        <el-option value="动态阈值波动率校验器" label="动态阈值波动率校验器" />
                        <el-option value="动态阈值绝对值校验器" label="动态阈值绝对值校验器" />
                        <el-option value="时间校验器" label="时间校验器" />
                        <el-option value="线性差异比例校验器" label="线性差异比例校验器" />
                        <el-option value="字符串校验器" label="字符串校验器" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="校验器配置">
                      <el-table :data="tableData1" border>
                        <el-table-column prop="level" label="级别" width="112" />
                        <el-table-column prop="flag" label="阈值" width="150">
                          <template slot-scope="scope">
                            <el-col :span="11">
                              <el-input v-model="form.name"/>
                            </el-col>
                            <el-col :span="2" class="line" style="text-align:center">-</el-col>
                            <el-col :span="11">
                              <el-input v-model="form.name"/>
                            </el-col>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="告警内容"
                          width="150">
                          <template slot-scope="scope">
                            <p>
                              XXXXX</p>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="操作"
                          width="150">
                          <template slot-scope="scope">
                            <el-button>
                              编辑</el-button>
                            <el-button type="danger">删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-form-item>
                  </el-col>

                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DefinitionManagement',
  data() {
    return {
      options2: [{
        value: '选项1',
        label: '主机1'
      }, {
        value: '选项2',
        label: '主机2'
      }, {
        value: '选项3',
        label: '主机3'
      }, {
        value: '选项4',
        label: '主机4'
      }, {
        value: '选项5',
        label: '主机5'
      }],
      value5: [],
      value11: [],
      activeName2: 'first',
      title: '',
      input: '',
      value: '',
      value1: '',
      checkType: '',
      visible2: false,
      outerVisible: false,
      innerVisible: false,
      check: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '', 
      },
      tableData1: [{
        level: '严重',
        type: '数值校验器',
        flag: '是'
      },
      {
        level: '主要',
        type: '百分比校验器',
        flag: '否'
      },
      {
        level: '一般',
        type: '百分比校验器',
        flag: '否'
      },
      {
        level: '恢复',
        type: '百分比校验器',
        flag: '否'
      }
      ],
      formLabelWidth: '120px',
      options1: [{
        value: '时/次',
        label: '时/次'
      }, {
        value: '分/次',
        label: '分/次'
      }, {
        value: '秒/次',
        label: '秒/次'
      }],
      tableData3: [{
        num: '1',
        type: '使用率',
        name: 'zz2',
        date: '2018-08-21 10:00:00'
      },
      {
        num: '1',
        type: '使用率',
        name: 'zz2',
        date: '2018-08-21 10:00:00'
      },
      {
        num: '1',
        type: '使用率',
        name: 'zz2',
        date: '2018-08-21 10:00:00'
      },
      {
        num: '1',
        type: '使用率',
        name: 'zz2',
        date: '2018-08-21 10:00:00'
      },
      {
        num: '1',
        type: '使用率',
        name: 'zz2',
        date: '2018-08-21 10:00:00'
      },
      {
        num: '1',
        type: '使用率',
        name: 'zz2',
        date: '2018-08-21 10:00:00'
      }
      ],
      codeOptions: [{
        value: 'PM-00-01-001-01',
        label: 'PM-00-01-001-01'
      }, {
        value: 'PM-00-01-001-02',
        label: 'PM-00-01-001-02'
      }, {
        value: 'PM-00-01-001-03',
        label: 'PM-00-01-001-03'
      }],
      metricsDefData: [{
        num: '1',
        name: 'ss_q',
        alias: '指标1',
        code: 'PM-00-01-001-03',
        source_metric: 'MySql',
        frequency: '1h',
        calc_type: '平台采集',
        status: '是'
      },
      {
        num: '1',
        name: 'ss_q',
        alias: '指标1',
        code: 'PM-00-01-001-03',
        source_metric: 'MySql',
        frequency: '1h',
        calc_type: '平台采集',
        status: '是'
      },
      {
        num: '1',
        name: 'ss_q',
        alias: '指标1',
        code: 'PM-00-01-001-03',
        source_metric: 'MySql',
        frequency: '1h',
        calc_type: '平台采集',
        status: '是'
      },
      {
        num: '1',
        name: 'ss_q',
        alias: '指标1',
        code: 'PM-00-01-001-03',
        source_metric: 'MySql',
        frequency: '1h',
        calc_type: '平台采集',
        status: '是'
      }
      ],
      code: '',
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      formInline: {
        name: '',
        code: 'test_metrics-kafka',
        metric_type: '',
        startTime: '',
        endTime: ''
      },

      rules: {
        name: [{ required:true, message:"不能为空", trigger: "blur" }],
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    showDialog(type,formName) {
      this.dialogFormVisible = true
      if (type === '1') {
        this.title = '指标类型'
      } else {
        this.title = '维度信息'
      };
     },
     submitForm(formName){
       this.$refs.form.validate((valid)=>{
         if(valid){
           alert('submit');
           console.log("11111")
         }else {
           alert("不允许提交空白表单!请完整填写弹框信息！");
           console.log("11111") 
           return false;
         }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    padding: 10px;
    font-family: sans-serif;
    .block {
      margin: 20px 0 12px 0;
    }
    .text {
      font-size: 14px;
    }
    .item {
      padding: 8px 0;
    }
  }
  ol li a,
  ol li a:visited {
    background-color: #fff;
    /* 背景色 */
    border: 0px #4e667d solid;
    /* 边框 */

    /* 文字颜色 */
    display: block;
    /* 此元素将显示为块级元素，此元素前后会带有换行符 */
    line-height: 1.35em;
    /* 行高 */
    padding: 4px 20px;
    /* 内部填充的距离 */
    text-decoration: none;
    /* 不显示超链接下划线 */
    white-space: nowrap;
    /* 对于文本内的空白处，不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
  }
  /* 所有class为menu的div中的ul中的a样式(鼠标移动到元素中的样式) */
  ol li a:hover {
    background-color: #DCDFE6;
    /* 背景色 */
    color: #000;
    /* 文字颜色 */
    text-decoration: none;
    /* 不显示超链接下划线 */
  }
  /* 所有class为menu的div中的ul中的a样式(鼠标点击元素时的样式) */
  ol li a:active ,.active{
    background-color: #409EFF;
    /* 背景色 */
    color: #fff;
    /* 文字颜色 */
    text-decoration: none;
    /* 不显示超链接下划线 */
  }
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-card{
   border: 0px gray solid; 
  }
</style>
