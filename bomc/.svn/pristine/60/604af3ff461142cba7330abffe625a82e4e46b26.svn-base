<template>
  <div class="content">
      <el-container>
        <el-header>
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
          <el-button
                  type="primary"
                  icon="el-icon-plus"
                  @click="yes_dialogFormVisible()"
                  size="mini"
                >新增属性</el-button>
            <el-button type="primary" icon="el-icon-delete" size="mini"  @click="delAll">删除</el-button>
      </el-header>
        <el-main class="el_main">
          <div class="content_head Proper">
            <div class="content_main">
              <div class="attr_set_left">
                <el-table :data="temp" border style="width: 100%; text-align: center" @selection-change="handleSelectionChange">
                  <el-table-column type="selection"/>
                  <el-table-column prop="name" label="属性名称" min-width="20%"></el-table-column>
                  <el-table-column prop="type" label="属性类型" min-width="20%">
                    <template slot-scope="scope">
                      <span v-if="scope.row.type =='string'">文本</span>
                      <span v-if="scope.row.type =='int'">数字</span>
                      <span v-if="scope.row.type =='boolean'" >是/否</span>
                      <span v-if="scope.row.type =='date'">时间</span>
                      <span v-if="scope.row.type =='array'">数组</span>
                      <span v-if="scope.row.type =='password'">帐号</span>
                    </template>
                    
                    
                  </el-table-column>
                  <el-table-column label="关键属性" min-width="20%">
                    <template slot-scope="scope">{{scope.row.required == true?"是":"否"}}</template>
                  </el-table-column>
                  <el-table-column prop="description" label="说明" min-width="45%"></el-table-column>
                  <el-table-column prop="classification" label="属性分类" min-width="20%"></el-table-column>
                  <el-table-column label="创建时间" min-width="45%">
                    <template slot-scope="scope">{{scope.row.create_time|formatTime('YMDHMS')}}</template>
                  </el-table-column>
                  <el-table-column label="自动采集" min-width="20%">
                    <template slot-scope="scope">{{scope.row.auto_get == true?"是":"否"}}</template>
                  </el-table-column>
                  <el-table-column label="操作" min-width="20%">
                    <template slot-scope="scope">
                      <i
                        class="el-icon-edit-outline"
                        size="mini"
                        style="margin: 0 5px;font-size: 16px;font-weight: 700;"
                        @click="modifyAttribute(scope.$index, scope.row)"
                      />
                      <i
                        class="el-icon-delete"
                        size="mini"
                        type="danger"
                        style="margin: 0 5px;font-size: 16px;font-weight: 700;"
                        @click="delete_tab(scope.row)"
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-main>
        <el-footer class="el_foot">
          <paging :page="page" :size-change="sizeChange" :current-change="currentChange"/>
        </el-footer>
        <el-dialog
          title="新增属性"
          :visible.sync="dialogFormVisible"
          class="addAttributes"
          :before-close="handleClose"
          :close-on-click-modal = 'false'
          width="50%"
          >
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="form"
            ref="form"
            :rules="rules2"
            >
            <el-form-item label="属性名称" prop="name">
              <el-input v-model.number="form.name"></el-input>
            </el-form-item>
            <el-row>
            <el-col :span="12">
              <el-form-item label="属性类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择属性类型">
                  <el-option label="文本" value="string"></el-option>
                  <el-option label="数字" value="int"></el-option>
                  <el-option label="是/否" value="boolean"></el-option>
                  <el-option label="时间" value="date"></el-option>
                  <el-option label="数组" value="array"></el-option>
                  <el-option label="帐号" value="password"></el-option>
                </el-select>
              </el-form-item>
             </el-col>
             <el-col :span="12">
                <el-form-item label="属性分类" prop="classification">
                  <el-select v-model="form.classification" placeholder="请选择属性分类">
                    <el-option label="运行类" value="运行类"></el-option>
                    <el-option label="工程类" value="工程类"></el-option>
                    <el-option label="维保类" value="维保类"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="说明" prop="description">
              <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item>
                  <el-checkbox-group v-model="form.auto_get">
                    <el-checkbox label="自动采集" name="auto_get"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <el-checkbox-group v-model="form.required">
                    <el-checkbox label="关键属性" name="required"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose()">取 消</el-button>
            <el-button type="primary" @click="on_dialogFormVisible('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="修改属性"
          :visible.sync="revise_Visible"
          class="addAttributes"
          :before-close="up_handleClose"
          :close-on-click-modal = 'false'
          width="50%"
         >
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="modifyForm"
            ref="modifyForm"
            :rules="rules2"
            >
            <el-form-item label="属性名称">
              <el-input v-model.number="modifyForm.name" disabled></el-input>
            </el-form-item>
            <el-row>
            <el-col :span="12">
              <el-form-item label="属性类型" prop="type">
                <el-select v-model="modifyForm.type" placeholder="请选择属性类型">
                  <el-option label="文本" value="string"></el-option>
                  <el-option label="数字" value="int"></el-option>
                  <el-option label="是/否" value="boolean"></el-option>
                  <el-option label="时间" value="date"></el-option>
                  <el-option label="数组" value="array"></el-option>
                  <el-option label="帐号" value="password"></el-option>
                </el-select>
              </el-form-item>
             </el-col>
             <el-col :span="12">
                <el-form-item label="属性分类" prop="classification">
                  <el-select v-model="modifyForm.classification" placeholder="请选择属性分类">
                    <el-option label="运行类" value="运行类"></el-option>
                    <el-option label="工程类" value="工程类"></el-option>
                    <el-option label="维保类" value="维保类"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="说明" prop="description">
              <el-input type="textarea" v-model="modifyForm.description"></el-input>
            </el-form-item>
            <el-col :span="12">
              <el-form-item>
                <el-checkbox-group v-model="modifyForm.auto_get">
                  <el-checkbox label="自动采集" name="auto_get"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-checkbox-group v-model="modifyForm.required">
                  <el-checkbox label="关键属性" name="required"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="revise_Visible = false">取 消</el-button>
            <el-button type="primary" @click="on_revise_Visible('modifyForm')">确 定</el-button>
          </div>
        </el-dialog>
      </el-container>
  </div>
</template>

<script>
import * as service from "../../../../api/model/resourceData/resourceData.js";
import * as serviceAttr from "../../../../api/model/resourceData/attributeManag.js";
import Paging from "@/modules/rms/components/Paging";

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
      // let regExp = /^(?!_)(?!.*?_$)[a-zA-Z0-9-_\u4e00-\u9fa5]*$/; "^[\u4E00-\u9FA5a-zA-Z0-9_]*$"
      let regExp = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]*$/;
      if (regExp.test(value) === false) {
        return callback(new Error("只能输入中英文和数字,下划线,连接符!"));
      } else {
        callback();
      }
    };
    return {
      isname: false,  // 模型是否存在
      labelPosition: "right",
      is_inherit:[], // 用来继承
      Proprietary: [], // 专有属性
      rules2: {
        name: [
          { required: true, message: "请输入属性名称", trigger: "blur" },
          { validator: attributeData, trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入属性说明", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          },
          { validator: isdescription, trigger: "blur" }
        ],
        type: [
          { required: true, message: '请选择属性类型', trigger: 'change' }
        ],
        classification: [
          { required: true, message: '请选择属性分类', trigger: 'change' }
        ],
      },
      dialogFormVisible: false,
      form: {
        auto_get: false,
        classification: "",
        create_time: 0,
        description: "",
        name: "",
        required: '',
        type: "",
      },
      modifyForm: {
        auto_get: false,
        classification: "",
        create_time: 0,
        description: "",
        name: "",
        required: false,
        type: "",
      },
      revise_Visible: false,
      multipleSelection: [], //多选的数据
      delarr: [], //存放删除的数据
      temp: [],  // 所有数据
      page: {
        pageSize: 10, //每页条数,  默认8条
        totalRecords: 0, //总条数
        pageSizes: [10, 20, 30, 40], // 分几页
        pageNum: 0, //页数从0开始
        select: "",
        checked: false,
        name: "",
      },
    };
  },
  created() {
    debugger;
    // if(document.querySelector(".is-active")){
    //     document.querySelector(".is-active").classList.remove("is-active");
    // }
    if (!this.$store.state.resourceManagement.on_treeData) {
      this.$store.dispatch("treeData");
    }
  },
  mounted() {
    this.init(); //页面内初始加载就调用这个函数
  },
  computed: {
    treeData() {
      return this.$store.state.resourceManagement.treeData;
    }
  },
  methods: {
    init() {
      this.temp = [];
      serviceAttr.queryattributeManag(this.page).then(res => {
        if (res) {
          debugger;
          this.page.totalRecords = parseInt(res.count);
          this.temp = res.datas;
        }
      });
    },
    handleClose() {
      debugger;
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
      this.resetForm("form")

    },
    up_handleClose() {
      debugger;
      this.revise_Visible = false;
      this.$refs["form"].resetFields();
      this.resetForm("form")

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
      this.page.pageSize = 10; //每页条数,  默认8条
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
    //  修改属性
    modifyAttribute(index, data) {
      debugger;
      this.modifyForm = JSON.parse(JSON.stringify(data));
      this.revise_Visible = true;
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.form = {
        auto_get: false,
        classification: "",
        create_time: 0,
        description: "",
        name: "",
        required: false,
        type: "",
      }
        this.$refs[formName].resetFields();
      });
    },
    // 添加提交属性
    on_dialogFormVisible(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          debugger;
          for (let i = 0; i < this.temp.length; i++) {
            if (this.temp[i].name == this.form.name) {
              this.$message.error("属性名称已存在！");
              return;
            }
          }
          serviceAttr.addAttributeManag(this.form).then(res => {
              debugger
              if(res.type == 0){
                this.dialogFormVisible = false;
                this.revise_Visible = false;
                this.resetForm("form")
                this.$message.success("添加成功！");
                this.init();
              }
              if(res.type == 1){
                this.$message.error("属性名称已存在！");
              }
          }).catch(err => {
            this.$message.error('请求失败!')
          })
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 修改提交属性
    on_revise_Visible(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          debugger;
          serviceAttr.modifyAttribute(this.modifyForm).then(res => {
            debugger
              if(res.type == 0){
                this.$message.success("修改成功")
                this.revise_Visible = false;
                this.init()
              }
          })
          .catch(function(res){
              console.log('error');
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增打开页面
    yes_dialogFormVisible() {
      debugger;
      this.dialogFormVisible = true;
      this.resetForm('form');
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
          serviceAttr.deleteInfo(user.name).then(res => {
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
            if (res.type == 4) {
                this.$message.error("该属性已被使用!");
            }
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
        this.delarr.push(this.multipleSelection[i].name);
      }
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          // 向服务端请求删除
          serviceAttr
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
              if (res.type == 4) {
                this.$message.error("属性已被使用!");
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
.el-header {
  height: 50px !important;
  line-height: 50px !important;
  color: #333;
  text-align: left !important;
  font-size: 14px;
  background-color: #fff;
  border-radius: 4px;
  margin: 10px;
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
  width: 25%;
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
.el-form-item {

}
.addfrom .el-form-item {
  margin-bottom: 20px;
}
.content_col {
  width: 30%;
  display: inline-block;
}

.addAttributes .el-select{
  width: 75%;
}
.addAttributes .el-input {
  width: 30%;
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

