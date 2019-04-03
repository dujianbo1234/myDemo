<template>
  <div class="content">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-container>
        <el-header class="el_head">
          <h3>新增模型</h3>
          <el-button class="console" @click="open2()" size="mini">关 闭</el-button>
        </el-header>
        <el-main class="el_main">
          <div class="content_head">
            <h3 class="content_title">模型基本信息</h3>
            <div class="edition">版本号
              <span>V1.0</span>
            </div>
            <div class="content_main">
              <div style="width:30%">
                <el-form-item label="模型名称" prop="name">
                  <el-input v-model="ruleForm.name" placeholder="请输入模型名称"></el-input>
                </el-form-item>
              </div>
              <div style="width:80%">
                <el-form-item label="模型描述" prop="description">
                  <el-input v-model="ruleForm.description" placeholder="请输入模型描述"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="content_head">
            <h3 class="content_title">通用属性设置*</h3>
            <div class="content_main" style="height: 100px;">
              <div class="block">
                <el-form-item label="所属层级/资源类型/资源模型父类" prop="region" class="content_main_select">
                  <el-cascader
                    :options="treeData"
                    change-on-select
                    v-model="ruleForm.region"
                    @change="handleChange"
                  ></el-cascader>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="content_head Proper">
            <h3 class="content_title">专有属性设置*</h3>
            <div class="content_main allAttributes">
              <div class="attr_set_left">
                <el-button
                  type="primary"
                  @click="yes_dialogFormVisible()"
                  size="mini"
                  class="appAttr"
                >新增属性</el-button>
                <el-table
                  :data="form_arry"
                  style="width: 100%;" height="250" header-align='left'>
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
                  <!-- <el-table-column type="selection">
                  </el-table-column> -->
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
                        @click="deleteAttr(scope.$index,scope.row)"
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="attr_set_left" style="margin-left:20px">
                <el-button
                  type="info"
                  size="mini"
                  class="appAttr"
                >继承父类属性</el-button>
                  <el-table
                  :data="Proprietary"
                  style="width: 100%;" height="250" header-align='left'>
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
                  <!-- <el-table-column type="selection">
                  </el-table-column> -->
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
                  <el-table-column label="是否继承" min-width="25%">
                      <template slot-scope="scope">
                        <el-button :type="scope.row.is_inherit?'info':'success'" round size="mini" @click="handleEdit(scope.$index, scope.row)">{{scope.row.is_inherit?'开启继承':'关闭继承'}}</el-button>
                      </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-main>
        <el-footer class="el_foot">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button type="info" @click="open2()">取消</el-button>
          </el-form-item>
        </el-footer>
        <el-dialog
          title="选择属性"
          :visible.sync="dialogFormVisible"
          class="allAttributes"
          :before-close="handleClose"
          width="60%"
          >
          <el-card class="box-card" style="margin-bottom: 10px">
            <div class="resource_name">
                <span>属性名称</span>
                <el-input v-model="page.name" placeholder="请输入内容" size="mini"></el-input>
              </div>
              <div class="resource_name">
                <span>属性分类</span>
                <el-select v-model="page.select" placeholder="请选择" size="mini">
                  <el-option label="全部分类" value="全部"></el-option>
                  <el-option label="运行类" value="运行类"></el-option>
                  <el-option label="工程类" value="工程类"></el-option>
                  <el-option label="维保类" value="维保类"></el-option>
                </el-select>
              </div>
              <div class="resource_crux">
                <el-checkbox v-model="page.checked" label="关键属性" border size="mini"></el-checkbox>
              </div>
              <el-button size="mini" @click="reset">重置</el-button>
              <el-button type="primary" size="mini" @click="queryattributeManag(page)">开始搜索</el-button>
              <!-- <el-button type="primary" icon="el-icon-delete" size="mini"  @click="delAll">删除</el-button> -->
          </el-card>
          <el-card class="box-card">
            <el-table
              :data="temp"
              style="width: 100%; text-align: left" @selection-change="handleSelectionChange" header-align='left'>
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
              <paging :page="page" :size-change="sizeChange" :current-change="currentChange"/>
           </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose()">取 消</el-button>
            <el-button type="primary" @click="on_dialogFormVisible()">确 定</el-button>
          </div>
        </el-dialog>
      </el-container>
    </el-form>
  </div>
</template>

<script>
import * as service from "../../../../api/model/resourceData/resourceData.js";
import router from "../../../../router";
import * as serviceAttr from "../../../../api/model/resourceData/attributeManag.js";
import Paging from "@/modules/rms/components/Paging";
export default {
  components: {
    Paging
  },
  data() {
    var levelType = (rule, value, callback) => {
      if (value.length < 2) {
        return callback(new Error("资源类型不能为空"));
      } else {
        callback();
      }
    };
    var checkData = (rule, value, callback) => {
      if (this.isname) {
        this.isname = false;
        return callback(new Error("该模型已存在,请重新输入!"));
      }
      if (
        value == "IaaS" ||
        value == "PaaS" ||
        value == "SaaS" ||
        value == "Others"
      ) {
        return callback(new Error("名称不能为层级关键字!"));
      }
      if (/^[a-zA-Z]*$/.test(value) === false) {
        return callback(new Error("名称只能输入英文!"));
      } else {
        callback();
      }
    };
    var attributeData = (rule, value, callback) => {
      if (/^[a-zA-Z]*$/.test(value) === false) {
        return callback(new Error("名称只能输入英文!"));
      } else {
        callback();
      }
    };
    var isdescription = (rule, value, callback) => {
      // let regExp = /^(?!_)(?!.*?_$)[a-zA-Z0-9-_\u4e00-\u9fa5]*$/; "^[\u4E00-\u9FA5a-zA-Z0-9_]*$"
      let regExp = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]*$/;
      if (regExp.test(value) === false) {
        return callback(new Error("只能输入中英文和数字,下划线,连接符!"));
      } else {
        callback();
      }
    };

    return {
      isname: false,
      URL: true,
      labelPosition: "right",
      is_inherit: [],
      Proprietary: [],
      ruleForm: {
        name: "",
        region: [],
        description: ""
      },
      page: {
        pageSize: 5, //每页条数,  默认8条
        totalRecords: 0, //总条数
        pageSizes: [5, 10, 15, 20], // 分几页
        pageNum: 0, //页数从0开始
        select: "",
        checked: false,
        name: ""
      },
      multipleSelection: [], //多选的数据
      delarr: [], //存放删除的数据
      temp: [], // 所有数据
      rules: {
        name: [
          { required: true, message: "请输入模型名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          },
          { validator: checkData, trigger: "blur" }
        ],
        region: [
          {
            required: true,
            message: "请选择所属层级/资源类型/资源模型父类",
            trigger: "change"
          },
          { validator: levelType, trigger: "change" }
        ],
        description: [
          { required: true, message: "请输入模型描述", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          },
          { validator: isdescription, trigger: "blur" }
        ]
      },
      options: [],
      selectedOptions: [],
      selectedOptions2: [],
      dialogFormVisible: false,
      form: {
        name: "",
        auto_get: [],
        description: ""
      },
      form_arry: [],
      params: {
        name: "",
        alias: "",
        superclass: "",
        level: "",
        type: "",
        uri: "",
        create_time: 0,
        lastp_udate_staff: "温博文",
        last_update_staff: "暂时的",
        last_update_time: 0,
        current: true,
        version: "1.0",
        attributes: []
      }
    };
  },
  created() {
    debugger;
    if (!this.$store.state.resourceManagement.on_treeData) {
      this.$store.dispatch("treeData");
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
    treeData() {
      return this.$store.state.resourceManagement.treeData;
    }
  },
  methods: {
    // 初始化扩展属性数据
    init() {
      this.temp = [];
      serviceAttr.queryattributeManag(this.page).then(res => {
        if (res) {
          debugger;
          this.page.totalRecords = parseInt(res.count);
          this.temp = res.datas;
          this.dialogFormVisible = true;
        }
      });
    },
    open4() {
      this.$message.error("您还未选择数据！");
    },
    // 多选触发
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 按条件查询
    queryattributeManag() {
      let regExp = /^[a-zA-Z0-9\-_\u4e00-\u9fa5]*$/;
      if (regExp.test(this.page.name) === false) {
        this.$message.error("只能输入中英文和数字,下划线,连接符,进行查询");
        return;
      }
      this.page.pageSize = 5; //每页条数,  默认8条
      this.page.pageNum = 0;
      this.init();
    },
    // 查询条件重置
    reset() {
      this.page.select = "全部";
      this.page.name = "";
      this.page.code = "";
      this.page.checked = false;
    },
    handleEdit(index, row) {
      debugger;
      if (row.is_inherit) {
        this.$set(this.Proprietary[index], "is_inherit", false);
        this.is_inherit.push(row);
        // this.is_inherit.splice(this.is_inherit.indexOf(row),1);
      } else {
        this.$set(this.Proprietary[index], "is_inherit", true);
        // this.is_inherit.push(row);
        this.is_inherit.splice(this.is_inherit.indexOf(row), 1);
      }
    },
    handleClose() {
      debugger;
      this.dialogFormVisible = false;
    },
    submitForm(formName) {
      debugger;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form_arry.length == 0 && this.is_inherit.length == 0) {
            debugger;
            this.$message.error("专有属性不能为空");
            return;
          }
          this.params.attributes = this.form_arry.concat(this.is_inherit);
          var temp = []; //一个新的临时数组
          for (var i = 0; i < this.params.attributes.length; i++) {
            if (temp.indexOf(this.params.attributes[i].name) == -1) {
              temp.push(this.params.attributes[i].name);
            } else {
              this.$alert(
                "添加失败，存在相同的属性名称,属性名称为:" +
                  this.params.attributes[i].name,
                "消息提示",
                {
                  confirmButtonText: "确定"
                }
              );
              return;
            }
          }
          this.params.name = this.ruleForm.name;
          this.params.alias = this.ruleForm.description;
          this.params.uri = this.params.uri + "." + this.ruleForm.name;
          console.log('uri:'+this.params.uri,'整个数据:'+this.params);
          service
            .abbResource(this.params)
            .then(res => {
              debugger;
              console.log(res);
              if (res.type == 0) {
                // this.$store.dispatch('modelList');
                this.URL = false;
                this.$store.dispatch("treeData");
                this.$alert("添加成功", "消息提示", {
                  confirmButtonText: "确定",
                  callback: action => {
                    this.$router.push({ path: "/resourceData/resourceData" });
                  }
                });
              }
              if (res.type == 1) {
                this.isname = true;
                this.$alert("添加失败，该模型已存在", "消息提示", {
                  confirmButtonText: "确定",
                  callback: action => {
                    this.$refs.ruleForm.validateField("name");
                  }
                });
              }
              if (res.type == 7) {
                this.isname = true;
                this.$alert("添加失败，存在相同的专有属性", "消息提示", {
                  confirmButtonText: "确定",
                  callback: action => {
                    this.$refs.ruleForm.validateField("name");
                  }
                });
              }
            })
            .catch(err => {
              this.$message.error("请求失败！");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      if (value[1] == "Business") {
        this.params.type = "业务类";
      }
      if (value[1] == "Physical") {
        this.params.type = "物理类";
      }
      if (value[1] == "Application") {
        this.params.type = "应用类";
      }
      if (value[1] == "Logic") {
        this.params.type = "逻辑类";
      }
      if (value[1] == "Other") {
        this.params.type = "其他类";
      }
      if (value[value.length - 1] == "null") {
        // this.params.type = value[value.length-2];
        this.params.superclass = value[value.length - 2];
      } else {
        // this.params.type = value[value.length-1];
        this.params.superclass = value[value.length - 1];
      }
      this.params.level = value[0];
      this.params.uri = value.join(".");
      if (value.length >= 3) {
        service.attProprietary(this.params.superclass).then(res => {
          debugger;
          this.Proprietary = res.datas[0].attributes;
          this.is_inherit = JSON.parse(JSON.stringify(res.datas[0].attributes));
        });
      } else {
        this.Proprietary = [];
        this.is_inherit = [];
      }
    },
    // 加入到模型属性中
    on_dialogFormVisible(formName) {
      debugger;
      this.delarr = [];
      const length = this.multipleSelection.length;
      if (length == 0) {
        this.open4();
        return;
      }
      for (let i = 0; i < length; i++) {
        this.delarr.push(this.multipleSelection[i]);
      }
      for (var i = 0; i < this.form_arry.length; i++) {
        for (var j = 0; j < this.delarr.length; j++) {
          if (this.form_arry[i].name == this.delarr[j].name) {
            // 如果数据能保证id和name一直配对，则可以少一个比较条件
            this.$alert(
              "添加失败，存在相同的属性名称,属性名称为:" + this.delarr[j].name,
              "消息提示",
              {
                confirmButtonText: "确定"
              }
            );
            return;
          }
        }
      }
      this.form_arry = this.form_arry.concat(this.delarr);
      debugger;
      this.dialogFormVisible = false;
      this.$message.success("添加成功！");
    },
    // 打开新增属性页面
    yes_dialogFormVisible() {
      debugger;
      this.page.pageSize = 5; //每页条数,  默认8条
      this.page.pageNum = 0;
      this.reset();
      this.init();
    },
    deleteAttr(index) {
      debugger;
      this.form_arry[index];
      this.form_arry.splice(index, 1);
      this.$message.success("成功删除了数据!");
    },
    open2(formName) {
      // this.$confirm(
      //   "内容还未保存，离开当前页面将导致已填内容丢失，是否确认离开?",
      //   "提示",
      //   {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   }
      // )
      //   .then(() => {
      this.$router.push({ path: "/resourceData/resourceData" });
      // })
      // .catch(() => {});
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
.content {
  padding: 10px;
}
.el_head {
  height: 40px !important;
  line-height: 40px;
  border-bottom: 1px solid #cccccc;
}
.console {
  padding: 10px;
  position: absolute;
  top: 0;
  right: 10px;
  color: #aaa;
}
h3.content_title {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
}
header.el-header.el_head {
  padding-left: 10px;
}
main.el-main.el_main {
  padding: 8px 15px;
}
.content_main {
  height: 170px;
  padding: 20px;
}
.Proper .content_main {
  height: 300px;
  padding-top: 15px;
}
.edition {
  float: right;
  margin-top: 30px;
  margin-right: 453px;
}
.edition span {
  color: #ccc;
}
.el-form-item {
  margin-top: 20px;
}
.el_foot {
  height: 50px;
  border-top: 1px solid #ccc;
}
.attr_set_left {
  height: 100%;
  width: 49%;
  float: left;
  display: block;
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
  cursor: pointer;
}
.attr_set_right {
  width: 50%;
  display: inline-block;
  height: 100%;
  vertical-align: top;
}
.attr_set_right p {
  margin-top: 15px;
  font-size: 14px;
  color: #999;
}
.attr_set_right p input {
  margin-left: 30px;
}
.attr_set_right p label {
  font-weight: 400 !important;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 85%;
}
.el-textarea {
  display: inline-block;
  width: 85%;
  vertical-align: bottom;
  font-size: 14px;
}
.appAttr {
  margin-bottom: 10px;
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
.el-dialog__body {
  padding: 20px;
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
</style>

