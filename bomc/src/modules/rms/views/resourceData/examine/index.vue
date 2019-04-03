<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <div class="operation">
          <div class="resource_name">
            <el-input v-model="query" placeholder="请输入关键字" size="mini"></el-input>
          </div>
          <el-button type="primary" size="mini" @click="queryConditionExamine()">查询</el-button>
          <el-button type="primary" icon="el-icon-delete" size="mini" class="fr" @click="delAll">删除</el-button>
          <!-- <el-button
            type="primary"
            icon="el-icon-caret-right"
            size="mini"
            class="fr"
            @click="implement()"
          >执行</el-button> -->
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            class="fr"
            @click="on_dialogAddFormVisible()"
          >添加规则</el-button>
        </div>
      </el-header>
      <el-main>
        <div class="template_tab">
          <template>
            <el-table
              :data="temp"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection"/>
              <el-table-column prop="name" label="规则名称" min-width="25%"/>
              <el-table-column prop="model" label="审核对象" min-width="20%"/>
              <el-table-column prop="cycle" label="审核周期" min-width="15%"/>
              <el-table-column label="审核报告" min-width="15%">
                <template slot-scope="scope">
                  <el-button size="mini" @click="auditReport(scope.row)">查看报告</el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="15%">
                <template slot-scope="scope">
                  <a href="javascript:;">
                    <i
                      :class="scope.row.state?'el-icon-loading':'el-icon-caret-right'"
                      size="mini"
                      style="margin: 0 5px;font-size: 16px;font-weight: 700;"
                      @click="implement(scope.$index,scope.row)"
                    />
                  </a>
                  <a href="javascript:;">
                    <i
                      class="el-icon-edit-outline"
                      size="mini"
                      style="margin: 0 5px;font-size: 16px;font-weight: 700;"
                      @click="on_dialogFormVisible(scope.row)"
                    />
                  </a>
                  <a href="javascript:;">
                    <i
                      class="el-icon-delete"
                      size="mini"
                      type="danger"
                      style="margin: 0 5px;font-size: 16px;font-weight: 700;"
                      @click="delete_tab(scope.row)"
                    />
                  </a>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-main>
      <el-footer>
        <paging :page="page" :size-change="sizeChange" :current-change="currentChange"/>
      </el-footer>
      <el-dialog
          title="规则详情"
          :visible.sync="dialogFormVisible"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
        <el-form :model="form">
          <el-form-item label="规则名称" :label-width="formLabelWidth">
            <span>{{form.name}}</span>
          </el-form-item>
          <el-form-item label="审核对象" :label-width="formLabelWidth">
            <span>{{form.model}}</span>
          </el-form-item>
          <el-form-item label="审核周期" :label-width="formLabelWidth">
            <span>{{form.cycle}}</span>
          </el-form-item>
          <el-form-item label="规则" :label-width="formLabelWidth">
            <ol>
              <li v-for="(item, index) in form.rule" :key="index">{{item[0]}}</li>
            </ol>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">关 闭</el-button>
        </div>
      </el-dialog>
      <el-dialog
          title="新增规则"
          :visible.sync="dialogAddFormVisible"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :before-close="handleClose"
          width="80%"
        >
        <el-form
          :model="addForm"
          :rules="rules"
          ref="addForm"
          label-width="100px"
          class="demo-addForm addfrom"
        >
          <el-form-item label="审核对象" :label-width="formLabelWidth" prop="model">
            <el-cascader
              expand-trigger="hover"
              :options="treeData"
              change-on-select
              v-model="addForm.model"
              size="mini"
              style="width: 60%;"
              placeholder="请选择审核对象"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="规则名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addForm.name" size="mini" placeholder="请选择规则名称" class="addInput"></el-input>
          </el-form-item>
          <el-form-item label="审核周期" :label-width="formLabelWidth" prop="cycle">
            <el-select v-model="addForm.cycle" placeholder="请选择审核周期" size="mini">
              <el-option label="一小时" value="一小时"></el-option>
              <el-option label="半天" value="半天"></el-option>
              <el-option label="一天" value="一天"></el-option>
              <el-option label="一周" value="一周"></el-option>
              <el-option label="一个月" value="一个月"></el-option>
              <el-option label="一季度" value="一季度"></el-option>
              <el-option label="一年" value="一年"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规则填写" :label-width="formLabelWidth">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="addlist()"
              :disabled="isdisabled"
              size="mini"
            >新增规则</el-button>
            <ul>
              <li v-for="(item,index) in addForm.rule" :key="index" class="automation">
                <div class="content_col">
                  <el-form-item
                    label="属性名称"
                    :prop="'rule.' + index + '.propertyFields'"
                    :rules="[{ required: true, message: '属性名称不能为空', trigger: 'change'}]"
                  >
                    <el-cascader
                      expand-trigger="hover"
                      placeholder="请选择属性名称"
                      :options="options"
                      v-model="addForm.rule[index].propertyFields"
                      size="mini"
                    ></el-cascader>
                  </el-form-item>
                </div>
                <div class="content_col">
                  <el-form-item
                    label="规则种类"
                    :prop="'rule.' + index + '.relation'"
                    :rules="[{ required: true, message: '规则种类不能为空', trigger: 'change'}]"
                  >
                    <el-select
                      v-model="addForm.rule[index].relation"
                      placeholder="请选择规则种类"
                      @change="choiceRelation(index,addForm.rule[index].relation)"
                      :disabled="isdisabled"
                      size="mini"
                    >
                      <el-option label="字符长度大于" value="gt"></el-option>
                      <el-option label="字符长度小于" value="lt"></el-option>
                      <el-option label="字符长度等于" value="eq"></el-option>
                      <el-option label="字符不包含" value="no"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="content_col">
                  <el-form-item
                    label="规则范围"
                    :prop="'rule.' + index + '.target'"
                    :rules="[{ required: true, message: '规则范围不能为空', trigger: 'change'}]"
                  >
                    <el-select
                      v-model="addForm.rule[index].target"
                      placeholder="请选择规则范围"
                      :disabled="isdisabled"
                      size="mini"
                      v-if="addForm.rule[index].relation == 'no'"
                    >
                      <el-option label="中文" value="a"></el-option>
                      <el-option label="英文" value="b"></el-option>
                      <el-option label="数字" value="c"></el-option>
                      <el-option label="特殊字符" value="d"></el-option>
                    </el-select>
                    <el-input-number
                      v-model="addForm.rule[index].target"
                      controls-position="right"
                      @change="handleChangeNum(index,target)"
                      :min="2"
                      :max="100"
                      :disabled="isdisabled"
                      placeholder="请选择规则范围"
                      size="mini"
                      v-if="addForm.rule[index].relation != 'no'"
                    ></el-input-number>
                  </el-form-item>
                </div>
                <el-button
                  type="danger"
                  @click.prevent="removeDomain(item)"
                  v-if="index > 0"
                  size="mini"
                >删除</el-button>
              </li>
            </ul>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('addForm')" :disabled = isDisable >确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="审核报告" :visible.sync="dialogReport" class="dialogReport">
        <div class="dialogReport_search">
          <el-input
            size="mini"
            placeholder="请输入代码关键字"
            suffix-icon="el-icon-search"
            v-model="search">
          </el-input>
          <span class="fr">共{{count}}条</span>
        </div>
        <el-table :data="gridData.filter(data => !search || data.ciid.toLowerCase().includes(search.toLowerCase()))"  height="250" border>
          <el-table-column property="model" label="审核对象" width="150"></el-table-column>
          <el-table-column property="ciid" label="搜索代码" width="200"></el-table-column>
          <el-table-column property="error" label="违反规则"></el-table-column>
        </el-table>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import Paging from "@/modules/rms/components/Paging";
import * as service from "../../../api/data/examine.js";
export default {
  components: {
    Paging
  },
  computed: {
    treeData() {
      return this.$store.state.resourceManagement.treeData;
    }
  },
  created() {
    debugger;
    if (!this.$store.state.resourceManagement.on_treeData) {
      this.$store.dispatch("treeData");
    }
  },
  data() {
    var levelType = (rule, value, callback) => {
      if (value.length < 3) {
        return callback(new Error("资源模型父类不能为空"));
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
    return {
      className: 'el-icon-caret-right',
      query: "",
      temp: [],
      target: "",
      isDisable: false,
      page: {
        pageSize: 10, //每页条数,  默认8条
        totalRecords: 0, //总条数
        pageSizes: [10, 20, 30, 40], // 分几页
        pageNum: 0, //页数从0开始
        name: ""
      },
      form: {},
      search: '',
      formLabelWidth: "120px",
      multipleSelection: [], //多选的数据
      delarr: [], //存放删除的数据
      dialogFormVisible: false,
      dialogAddFormVisible: false,
      dialogReport: false,
      isdisabled: true,
      addForm: {
        name: "",
        model: [],
        cycle: "",
        // rule: [],
        rule: [
          {
            propertyFields: [],
            relation: "",
            target: ""
          }
        ]
      },
      field_description: {},
      ruleDescription: {
        a: "中文",
        b: "英文",
        c: "数字",
        d: "特殊字符",
        gt: "字符长度大于",
        lt: "字符长度小于",
        eq: "字符长度等于",
        no: "字符不包含"
      },
      gridData: [],
      count:'',
      rules: {
        name: [
          { required: true, message: "请输入规则名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          },
          { validator: regExpInput, trigger: "blur" }
        ],
        cycle: [{ required: true, message: "请选择周期", trigger: "change" }],
        model: [
          {
            required: true,
            message: "请选择所属层级/资源类型/资源模型父类",
            trigger: "change"
          },
          { validator: levelType, trigger: "change" }
        ]
      },
      options: [
        {
          value: "通用属性",
          label: "通用属性",
          disabled: true,
          children: []
        },
        {
          value: "分类属性",
          label: "分类属性",
          disabled: true,
          children: []
        },
        {
          value: "专有属性",
          label: "专有属性",
          disabled: true,
          children: []
        }
      ]
    };
  },
  mounted() {
    this.init(); //页面内初始加载就调用这个函数
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 执行审核
    implement(index,item) {
      debugger;
      this.$set(this.temp[index],'state',true);
      // this.delarr = [];
      // const length = this.multipleSelection.length;
      // if (length == 0) {
      //   this.$confirm("此操作将执行所有数据审核, 是否继续?", "提示", {
      //     type: "warning"
      //   })
      //     .then(() => {
      //       service.all_implement().then(res => {
      //         debugger
      //         if (res.type == 0) {
      //           this.$message.success("执行成功!");
      //         }
      //       });
      //     })
      //   return;
      // }
      // for (let i = 0; i < length; i++) {
      //   this.delarr.push(this.multipleSelection[i].id);
      // }
      service.implement(item.id).then(res => {
        debugger;
        if (res.type == 0) {
          setTimeout(() => {
            this.temp[index].state = false;
            this.$message.success("执行成功!");
          }, 1500);
          
        }
      });
    },
    // 审核报告
    auditReport(item) {
      this.dialogReport = true
      service.auditReport(item.id).then(res => {
        debugger
        if(res.datas){
          this.gridData = res.datas;
          this.count = res.count;
        }else{
          this.gridData = [];
          this.count = 0;
        }
        
      });
    },
    // 单个删除
    delete_tab(user) {
      this.$confirm(
        "此操作将永久删除数据 " + user.name + ", 是否继续?",
        "提示",
        { type: "warning" }
      )
        .then(() => {
          // 向服务端请求删除
          service.deleteInfo(user).then(res => {
            if (res.type == 0) {
              this.$message.success("成功删除了数据" + user.name + "!");
              if (this.temp.length === 1) {
                this.page.pageNum = this.page.pageNum - 1;
              }
              if (this.page.pageNum <= 0) {
                this.page.pageNum = 0;
              }
              this.init();
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    // 新增时选择规则模型
    handleChange(data) {
      if (data.length < 3) {
        return;
      } else {
        debugger;
        // this.addForm.model = data[data.length - 1];
        service.queryPropertyFields(data[data.length - 1]).then(res => {
          if (res) {
            this.options[0].children = res.ResProperty;
            this.options[1].children = res.TypeProperty;
            this.options[2].children = res.ModelProperty;
            this.options[0].disabled = false;
            this.options[1].disabled = false;
            this.options[2].disabled = false;
            this.$set(this, "isdisabled", false);
            for (const key in res) {
              debugger;
              for (var i = 0; i < res[key].length; i++) {
                var field_key = "";
                var field_value = "";
                field_key += res[key][i].value;
                field_value += res[key][i].label;
                this.field_description[field_key] = field_value;
              }
            }
          }
        });
      }
    },
    // 选择规则种类
    choiceRelation(index, item) {
      debugger;
      item.name;
      if (item == "no") {
        this.addForm.rule[index].target = "";
      }
    },
    // 选择规则范围
    handleChangeNum(index, value) {
      // this.addForm.rule[index].target = value
      console.log(value);
    },
    // 多选触发
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    open4() {
      this.$message.error("您还未选择数据！");
    },
    handleClose() {
      debugger;
      this.$refs["addForm"].resetFields();
      this.dialogAddFormVisible = false;
      this.options[0].disabled = true;
      this.options[1].disabled = true;
      this.options[2].disabled = true;
      this.$set(this, "isdisabled", true);
      this.addForm.rule = [
        {
          propertyFields: [],
          relation: "",
          target: ""
        }
      ];
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
                if (this.temp.length === length) {
                  this.page.pageNum = this.page.pageNum - 1;
                }
                if (this.page.pageNum <= 0) {
                  this.page.pageNum = 0;
                }
                this.init();
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
    // 删除规则
    removeDomain(item) {
      debugger;
      var index = this.addForm.rule.indexOf(item);
      if (index !== -1) {
        this.addForm.rule.splice(index, 1);
      }
    },
    // 新增提交规则
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isDisable = true;
          var obj = {};
          obj = JSON.parse(JSON.stringify(this.addForm));
          obj.model = this.addForm.model[this.addForm.model.length - 1];
          obj.rule = [];
          var _this = this;
          this.addForm.rule.map(function(item) {
            var temp = [];
            var str = "";
            if (item.relation == "no") {
              str +=
                _this.field_description[item.propertyFields[1]] +
                _this.ruleDescription[item.relation] +
                _this.ruleDescription[item.target];
            } else {
              str +=
                _this.field_description[item.propertyFields[1]] +
                _this.ruleDescription[item.relation] +
                item.target;
            }
            temp.push(
              str,
              item.propertyFields[1],
              item.relation,
              item.target + ""
            );
            obj.rule.push(temp);
          });
          obj.rule = JSON.stringify(obj.rule);
          debugger;
          service.addExamine(obj).then(res => {
            debugger;
            if (res.type == 0) {
              this.isDisable = false;
              this.dialogAddFormVisible = false;
              this.$refs["addForm"].resetFields();
              this.dialogAddFormVisible = false;
              this.options[0].disabled = true;
              this.options[1].disabled = true;
              this.options[2].disabled = true;
              this.$set(this, "isdisabled", true);
              this.addForm.rule = [
                {
                  propertyFields: [],
                  relation: "",
                  target: ""
                }
              ];
              this.$message.success('添加成功');
              this.page.pageNum = 0;
              this.init();
            }
            if (res.type == 1) {
              this.isDisable = false;
              this.$message.error('规则名称已存在,请重新输入!');
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    init() {
      this.temp = [];
      service.queryExamine(this.page).then(res => {
        if (res) {
          debugger;
          this.page.totalRecords = parseInt(res.count);
          this.temp = res.datas;
        }
      });
    },
    // 按条件查询
    queryConditionExamine() {
      let regExp = /^[a-zA-Z0-9\-_\u4e00-\u9fa5]*$/;
      if (regExp.test(this.query) === false) {
        this.$message.error("只能输入中英文和数字,下划线,连接符,进行查询");
        return;
      }
      this.page.pageSize = 10; //每页条数,  默认8条
      this.page.pageNum = 0;
      this.page.name = this.query;
      this.init();
      
    },
    // 查看规则详情
    on_dialogFormVisible(tab) {
      this.dialogFormVisible = true;
      debugger;
      this.form = tab;
      this.form.rule = JSON.parse(tab.rule);
    },
    on_dialogAddFormVisible() {
      this.dialogAddFormVisible = true;
    },
    addlist() {
      debugger;
      this.addForm.rule.push({
        propertyFields: [],
        relation: "",
        target: ""
      });
    },
    // 每页显示多少条数据
    sizeChange(val) {
      debugger;
      this.page.pageSize = val;
      this.init();
    },
    //翻页
    currentChange(val) {
      debugger;
      this.page.pageNum = val - 1;
      this.init();
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
  background-color: #fff;
  border-radius: 4px;
  margin-right: 10px;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  /* background-color: #E9EEF3; */
  /* color: #333; */
  text-align: center;
  /* line-height: 160px; */
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
  width: 18%;
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
.el-form-item {
  margin-bottom: 0px;
}
.addfrom .el-form-item {
  margin-bottom: 20px;
}
.content_col {
  width: 30%;
  display: inline-block;
}
.el-input {
  width: 45%;
}
.resource_name .el-input {
  width: 100%;
}
.automation .addForm_input {
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  height: 22px;
  line-height: 31px;
  padding: 0;
  width: 60%;
  margin-right: 25px;
  outline: none;
}
.automation .el-input {
  width: 60%;
}
.dialogReport .dialogReport_search {
    width: 100%;
    display: inline-block;
    padding: 10px;
}
.dialogReport_search .el-input {
  width: 25%;
}

</style>

