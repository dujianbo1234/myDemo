<template>
  <div class="app-container">
    <el-container>
      <el-aside width="200px" style="" class="test test-1">
        <div class="head">资源模型树</div>
        <el-input placeholder="请输入资源模型名称" style="width: 90%;display: block;margin: 0 auto;" v-model="filterText" size="mini"></el-input>

        <el-tree
          class="filter-tree"
          :data="nav_treeData"
          :props="defaultProps"
          :expand-on-click-node="false"
          node-key="id"
          :default-expanded-keys="treekeys"
          :filter-node-method="filterNode"
          ref="tree2"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-aside>
      <el-container>
        <el-header>
          <div class="resource_name">
            <span>资源名称</span>
            <el-input v-model="query.name" placeholder="请输入内容" size="mini"></el-input>
          </div>
          <div class="resource_name">
            <span>搜索代码</span>
            <el-input v-model="query.code" placeholder="请输入内容" size="mini"></el-input>
          </div>
          <div class="resource_name">
            <span>生命周期状态</span>
            <el-select v-model="query.select" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="resource_crux">
            <el-checkbox v-model="query.checked" label="关键资源" border size="mini"></el-checkbox>
          </div>
          <div class="operation">
            <el-button type="primary" size="mini" @click="conditionQuery(query)">开始搜索</el-button>
            <el-button size="mini" @click="reset">重置</el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              class="fr"
              @click="delAll"
            >删除</el-button>
            <!-- <router-link :to="{name:'appResourceLink'}"> -->
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              class="fr"
              @click="resourceType()"
            >新增</el-button>
            <!-- </router-link> -->
            <el-button @click="doit()" class="fr" type="primary" icon="el-icon-check" size="mini">下载</el-button>
            <el-button
              @click="dialogGetdata = true"
              class="fr"
              type="primary"
              icon="el-icon-check"
              size="mini"
            >下载模板</el-button>
            <el-button
              @click="dialogimportVisible = true"
              class="fr"
              type="primary"
              icon="el-icon-check"
              size="mini"
            >导入</el-button>
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
                <el-table-column type="selection" width="40"/>
                <!-- <el-table-column
                  type="index"
                  label="序号"
                width="50"/>-->
                <el-table-column prop="ciid" label="搜索代码" min-width="30%"/>
                <el-table-column prop="state" label="状态" min-width="20%"/>
                <el-table-column prop="ciname" label="资源名称" min-width="20%">
                  <template slot-scope="scope">
                    <!-- <span>{{scope.row.ciname.slice(0,1) == '*'?scope.row.ciname.slice(1):scope.row.ciname}}</span> -->
                    <span>{{scope.row.ciname}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="modelName" width="100" label="模型名称"></el-table-column>
                <el-table-column prop="ciname" label="是否关键" min-width="20%">
                  <template slot-scope="scope">
                    <span>{{scope.row.isimportant == "true"?'是':'否'}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="最后更新时间" min-width="30%">
                  <template slot-scope="scope">{{scope.row.last_update_time|formatTime('YMDHMS')}}</template>
                </el-table-column>
                <el-table-column label="操作" min-width="20%">
                  <template slot-scope="scope">
                    <!-- <router-link :to="{name:'resourceDetailsLink'}"> -->
                    <i
                      class="el-icon-edit-outline"
                      size="mini"
                      style="margin: 0 5px;font-size: 16px;font-weight: 700;"
                      @click="handleEdit(scope.$index, scope.row)"
                    />
                    <!-- </router-link> -->
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
            </template>
          </div>
        </el-main>
        <el-footer>
          <div class="block">
            <el-pagination
              @size-change="sizeChange"
              @current-change="currentChange"
              :page-sizes="[10, 20, 30,40]"
              :page-size="page.pageSize"
              :current-page.sync="page.pageNum +1"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.totalRecords"
            ></el-pagination>
          </div>
        </el-footer>
        <el-dialog
          title="选择模型"
          :visible.sync="dialogFormVisible"
          width="35%"
          :close-on-click-modal="false"
          :close-on-press-escape="false" class="choice_model"
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
                ></el-cascader>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="下载资源模型模板"
          :visible.sync="dialogGetdata"
          width="50%"
          :close-on-press-escape="false"
          :close-on-click-modal="false"
        >
          <div style="text-align: center">
            <el-transfer
              style="text-align: left; display: inline-block"
              v-model="value3"
              filterable
              :render-content="renderFunc"
              :titles="['资源模型列表', '待下载模型模板']"
              :button-texts="['到左边', '到右边']"
              :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
              }"
              @change="handleChangeModel"
              @right-check-change="downloadData"
              :data="getData"
            >
              <!-- <el-button class="transfer-footer" slot="right-footer" size="small" @click="downloadModel()">确认下载</el-button> -->
            </el-transfer>
            <el-button class="transfer-foot" size="small" @click="downloadModel()">确认下载</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="资源数据导入"
          :visible.sync="dialogimportVisible"
          width="40%"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          :before-close="handleClose"
        >
          <upload-excel
            :onfileList="onfileList"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          />
        </el-dialog>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import Paging from '../../components/Paging'
// import * as service from '../../../api/model/resourceData/resourceData.js';
// import * as service from '@/modules/rms/api/data/data.js';
import * as service from "../../../api/data/data.js";
import * as exceltool from "../../../api/data/exceltool.js";
import UploadExcel from "./UploadExcel";
export default {
  watch: {
    filterText(val) {
      debugger
      this.$refs.tree2.filter(val);
    }
  },
  components: { UploadExcel },
  data() {
    var levelType = (rule, value, callback) => {
      if (value.length < 3) {
        return callback(new Error("资源模型父类不能为空"));
      } else {
        callback();
      }
    };
    return {
      treekeys: [0, 1, 2, 3, 4],
      dialogGetdata: false,
      dialogimportVisible: false,
      getData: [], // 渲染模板列表数据
      value3: [], // 模板数据
      value4: [], // 下载模板所选数据
      res: "",
      renderFunc(h, option) {
        console.log(h, option);
        return <span>{option.label}</span>;
      },
      form: {
        type: []
      },
      filterText: "",
      onfileList: [],
      data: [
        {
          label: "全部资源",
          children: []
        }
      ],
      options: [
        {
          value: "已接收",
          label: "已接收"
        },
        {
          value: "已部署",
          label: "已部署"
        },
        {
          value: "测试中",
          label: "测试中"
        },
        {
          value: "使用中",
          label: "使用中"
        },
        {
          value: "维护中",
          label: "维护中"
        },
        {
          value: "已下线",
          label: "已下线"
        },
        {
          value: "报废",
          label: "报废"
        }
      ],
      query: {
        select: "",
        checked: false,
        name: "",
        code: "",
        model: ""
      },
      temp: [],
      page: {
        pageSize: 10, //每页条数,  默认10条
        totalRecords: 0, //总条数
        totalPages: 0, //总页数
        pageNum: 0,
        model: ""
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      multipleSelection: [], //多选的数据
      delarr: [], //存放删除的数据
      dialogFormVisible: false,
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
  created() {
    debugger;
    // this.$store.dispatch("stateType");
    if (!this.$store.state.resourceManagement.on_treeData) {
      this.$store.dispatch("treeData");
    }
  },
  mounted() {
    debugger;
    if (this.$store.state.resourceManagement.quickAccess.id) {
      this.$refs.tree2.setCurrentKey(this.$store.state.resourceManagement.quickAccess.id);
      this.treekeys.push(this.$store.state.resourceManagement.quickAccess.id);
      this.handleNodeClick(this.$store.state.resourceManagement.quickAccess);
      this.$store.state.resourceManagement.quickAccess.id = false;
    }else{
      this.$store.dispatch("stateType").then(res => {
        this.handleNodeClick({label:'全部资源'});
      })
    }
    this.dataList();
  },
  computed: {
    treeData() {
      return this.$store.state.resourceManagement.treeData;
    },
    nav_treeData() {
      return this.$store.state.resourceManagement.nav_treeData;
    }
  },
  methods: {
    // 按条件查询
    conditionQuery() {
      debugger;
      if(document.querySelector(".is-current")){
        document.querySelector(".is-current").classList.remove("is-current");
      }
      let regExp = /^[a-zA-Z0-9\-_\u4e00-\u9fa5]*$/;
      if (
        regExp.test(this.query.name) === false ||
        regExp.test(this.query.code) === false
      ) {
        this.$message.error("只能输入中英文和数字,下划线,连接符,进行查询");
        return;
      }
      if (this.query.model == "") {
        this.query.model = "ResObject";
      }
      this.page.model = this.query.model;
      this.page.pageSize ? this.page.pageSize : 10; //每页条数,  默认5条 ciname,ciid,state,ciname
      this.page.pageNum = 0;
      this.page.checked = "*";
      this.page.ciname = this.query.name;
      this.page.ciid = this.query.code;
      this.page.state = this.query.select;
      this.page.is_checked = this.query.checked;
      this.temp = [];
      service.conditionQuery(this.page).then(res => {
        debugger;
        if (res) {
          if (res.datas == "") {
            this.$message.error("未查到数据！");
            return;
          }
          this.page.totalRecords = parseInt(res.count);
        }
        var tempData = res.datas;
        var _this = this;
        _this.temp = [];
        for (var key in tempData) {
          for (var i = 0; i < tempData[key].length; i++) {
            tempData[key][i]["modelName"] = key;
          }
        }
        for (var key in tempData) {
          _this.temp.push.apply(_this.temp, tempData[key]);
        }
      });
    },
    // 树状点击查询
    handleNodeClick(data, node,event) {
      debugger;
      this.temp = [];
      if(event){
        event.$el.classList.add("is-current");
      }
      this.page.pageSize = 10; //每页条数,  默认5条
      this.page.pageNum = 0;
      this.page.checked = false;
      this.page.ciname = "";
      this.page.ciid = "";
      this.page.state = "";

      if (data.label == "全部资源") {
        this.page.value = "";
        this.page.model = "";
        this.init();
        return;
      }
      if (
        data.value == "SaaS" ||
        data.value == "PaaS" ||
        data.value == "IaaS" ||
        data.value == "Others"
      ) {
        this.page.value = data.value;
        this.temp = [];
        service.queryResourcesParent(this.page).then(res => {
          debugger;
          var temp = res.datas;
          this.page.totalRecords = parseInt(res.count);
          var _this = this;
          // var getModel = Object.keys(res);
          // 循环添加 nodelname 字段用于显示
          _this.temp = [];
          for (var key in temp) {
            for (var i = 0; i < temp[key].length; i++) {
              temp[key][i]["modelName"] = key;
            }
          }
          for (var key in temp) {
            _this.temp.push.apply(_this.temp, temp[key]);
          }
        });
        return;
      }
      if (
        node &&
        (node.parent.data.value == "SaaS" ||
          node.parent.data.value == "PaaS" ||
          node.parent.data.value == "IaaS" ||
          node.parent.data.value == "Others")
      ) {
        this.page.value = node.parent.data.value + "." + data.value;
        this.temp = [];
        service.queryResourcesParent(this.page).then(res => {
          debugger;
          var temp = res.datas;
          this.page.totalRecords = parseInt(res.count);
          var _this = this;
          // var getModel = Object.keys(res);
          // 循环添加 nodelname 字段用于显示
          _this.temp = [];
          for (var key in temp) {
            for (var i = 0; i < temp[key].length; i++) {
              temp[key][i]["modelName"] = key;
            }
          }
          for (var key in temp) {
            _this.temp.push.apply(_this.temp, temp[key]);
          }
        });
        return;
      }
      if (data.uri) {
        debugger;
        this.page.model = data.value;
        this.page.value = data.value;
        // let value = data.uri.split(".");
        // this.$store.dispatch("addstateType", value);
        this.init();
        return;
      }
      this.init();
    },
    // 穿缩框用于下载模型的数据
    dataList() {
      service.dataList().then(res => {
        debugger;
        var _this = this;
        var alias = res;
        for (var i = 0; i < alias.length; i++) {
          _this.getData.push({
            key: alias[i].name,
            label: `${i + 1 + " " + alias[i].name}`
            // disabled: i % 4 === 0
          });
        }
        // 穿缩框用于下载模型的数据
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 查询条件重置
    reset() {
      this.query.select = "";
      this.query.name = "";
      this.query.code = "";
      this.query.checked = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        debugger;
        if (valid) {
          // console.log(this.$refs[formName]);
          this.$store.dispatch("addstateType", this.handleChangeData);
          this.dialogFormVisible = false;
          this.$router.push({ path: "/resourceData/appResource" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    delete_tab(user) {
      debugger
      this.$confirm(
        "此操作将永久删除数据 " + user.ciid + ", 是否继续?",
        "提示",
        { type: "warning" }
      )
        .then(() => {
          debugger;
          service
            .deleteInfo(user)
            .then(res => {
              if(res.type == 0){
                this.$message.success("成功删除了数据!");
                debugger
                if(this.temp.length ===1){
                  this.page.pageNum = this.page.pageNum - 1;
                }
                if(this.page.pageNum <= 0){
                  this.page.pageNum = 0;
                }
                if (this.page.checked) {
                  service.conditionQuery(this.page).then(res => {
                    debugger;
                    if (res) {
                      if (res.datas == "") {
                        this.$message.error("未查到数据！");
                        return;
                      }
                      this.page.totalRecords = parseInt(res.count);
                    }
                    this.temp = [];
                    var temp = res.datas;
                    var _this = this;
                    for (var key in temp) {
                      for (var i = 0; i < temp[key].length; i++) {
                        temp[key][i]["modelName"] = key;
                      }
                    }
                    for (var key in temp) {
                      _this.temp.push.apply(_this.temp, temp[key]);
                    }
                  });
                } else {
                  if (
                    this.page.value == "SaaS" ||
                    this.page.value == "PaaS" ||
                    this.page.value == "IaaS" ||
                    this.page.value == "Others"
                  ) {
                    service.queryResourcesParent(this.page).then(res => {
                      debugger;
                      var temp = res.datas;
                      this.page.totalRecords = parseInt(res.count);
                      this.temp = [];
                      var _this = this;
                      // var getModel = Object.keys(res);
                      // 循环添加 nodelname 字段用于显示
                      for (var key in temp) {
                        for (var i = 0; i < temp[key].length; i++) {
                          temp[key][i]["modelName"] = key;
                        }
                      }
                      for (var key in temp) {
                        _this.temp.push.apply(_this.temp, temp[key]);
                      }
                    });
                    return;
                  }
                  if (this.page.value && this.page.value.indexOf(".") != -1) {
                    service.queryResourcesParent(this.page).then(res => {
                      debugger;
                      var temp = res.datas;
                      this.page.totalRecords = parseInt(res.count);
                      this.temp = [];
                      var _this = this;
                      // var getModel = Object.keys(res);
                      // 循环添加 nodelname 字段用于显示
                      for (var key in temp) {
                        for (var i = 0; i < temp[key].length; i++) {
                          temp[key][i]["modelName"] = key;
                        }
                      }
                      for (var key in temp) {
                        _this.temp.push.apply(_this.temp, temp[key]);
                      }
                    });
                    return;
                  }
                  this.init();
                }
              }
              
            })
            .catch(response => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    resourceType() {
      debugger;
      if (!this.$store.state.resourceManagement.type) {
        this.dialogFormVisible = true;
      } else {
        this.dialogFormVisible = false;
        this.$router.push({ path: "/resourceData/appResource" });
      }
    },
    handleSelectionChange(val) {
      debugger;
      this.multipleSelection = val; // 多选的数据
    },
    handleChange(data) {
      if (data.length < 3) {
        return;
      }
      this.handleChangeData = data;
    },
    handleChangeModel(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    handleEdit(index, item) {
      debugger;
      var models = [item.modelName];
      service.allQueryModel(models).then(res => {
        debugger;
        if (res) {
          item.type = res.datas[0].type;
          this.$store.dispatch("resourceDetails", item);
          this.$router.push({ name: "resourceDetailsLink" });
        }
      });
    },
    handleClose() {
      this.dialogimportVisible = false;
      this.onfileList = [];
    },
    open4() {
      this.$message.error("您还未选择数据！");
    },
    // 批量删除
    delAll() {
      this.delarr = [];
      debugger;
      const length = this.multipleSelection.length;
      if (length == 0) {
        this.open4();
        return;
      }
      for (let i = 0; i < length; i++) {
        this.delarr.push(this.multipleSelection[i].ciid);
      }
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          // 向服务端请求删除
          service
            .deleteInfoMultiple(
              this.multipleSelection[0].modelName,
              this.delarr
            )
            .then(res=> {
              this.$message.success("成功删除了数据!");
              if(this.temp.length === length){
                this.page.pageNum = this.page.pageNum - 1;
              }
              if(this.page.pageNum <= 0){
                  this.page.pageNum = 0;
                }
              if (this.page.checked) {
                  service.conditionQuery(this.page).then(res => {
                    debugger;
                    if (res) {
                      if (res.datas == "") {
                        this.$message.error("未查到数据！");
                        return;
                      }
                      this.page.totalRecords = parseInt(res.count);
                    }
                    this.temp = [];
                    var temp = res.datas;
                    var _this = this;
                    for (var key in temp) {
                      for (var i = 0; i < temp[key].length; i++) {
                        temp[key][i]["modelName"] = key;
                      }
                    }
                    for (var key in temp) {
                      _this.temp.push.apply(_this.temp, temp[key]);
                    }
                  });
                } else {
                  if (
                    this.page.value == "SaaS" ||
                    this.page.value == "PaaS" ||
                    this.page.value == "IaaS" ||
                    this.page.value == "Others"
                  ) {
                    service.queryResourcesParent(this.page).then(res => {
                      debugger;
                      var temp = res.datas;
                      this.page.totalRecords = parseInt(res.count);
                      this.temp = [];
                      var _this = this;
                      // var getModel = Object.keys(res);
                      // 循环添加 nodelname 字段用于显示
                      for (var key in temp) {
                        for (var i = 0; i < temp[key].length; i++) {
                          temp[key][i]["modelName"] = key;
                        }
                      }
                      for (var key in temp) {
                        _this.temp.push.apply(_this.temp, temp[key]);
                      }
                    });
                    return;
                  }
                  if (this.page.value && this.page.value.indexOf(".") != -1) {
                    service.queryResourcesParent(this.page).then(res => {
                      debugger;
                      var temp = res.datas;
                      this.page.totalRecords = parseInt(res.count);
                      this.temp = [];
                      var _this = this;
                      // var getModel = Object.keys(res);
                      // 循环添加 nodelname 字段用于显示
                      for (var key in temp) {
                        for (var i = 0; i < temp[key].length; i++) {
                          temp[key][i]["modelName"] = key;
                        }
                      }
                      for (var key in temp) {
                        _this.temp.push.apply(_this.temp, temp[key]);
                      }
                    });
                    return;
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
    downloadData(value) {
      debugger;
      this.value4 = value;
    },
    // 下载模型
    downloadModel(value, direction, movedKeys) {
      debugger;
      console.log(value, direction, movedKeys);
      if (!this.value4.length) {
        return this.$message.error("您还未选择模型！");
      }
      var models = "";
      service.allQueryModel(this.value4).then(res => {
        debugger;
        if (res) {
          console.log(res);
          models = this.splicing(res.datas);
          debugger;
          exceltool.export_excel(models);
          this.dialogGetdata = false;
        }
      });
    },
    // 拼接导入和导出数据
    splicing(data) {
      var model = {};
      for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
          if (data[i].hasOwnProperty(key)) {
            // var element = object[key];
            model[data[i].name] = data[i];
          }
        }
      }
      return model;
    },
    // 导出方法
    doit() {
      const length = this.multipleSelection.length;
      if (length == 0) {
        this.open4();
        return;
      }
      var models = {};
      const jsondata = {};
      debugger;
      let array = [];
      let temp = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        debugger;
        array.push(this.multipleSelection[i].modelName);
        if (!jsondata[this.multipleSelection[i].modelName]) {
          jsondata[this.multipleSelection[i].modelName] = [];
        }
        jsondata[this.multipleSelection[i].modelName].push(
          this.multipleSelection[i]
        );
      }
      for (var i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) == -1) {
          temp.push(array[i]);
        }
      }
      service.allQueryModel(temp).then(res => {
        debugger;
        if (res) {
          console.log(res);
          models = this.splicing(res.datas);
          debugger;
        }
      });
      this.$confirm("是否下载所选数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          debugger;
          exceltool.export_excel(models, jsondata);
        })
        .catch(() => {});
    },
    // 导入前验证
    beforeUpload(file) {
      debugger;
      if (/\.(xlsx)$/.test(file.name)) {
      } else {
        this.$message({
          message: "只能上传xlsx文件！",
          type: "warning"
        });
        return false;
      }
      if (file.size / 1024 / 1024 < 0.5) {
        return true;
      }
      this.$message({
        message: "文件过大！",
        type: "warning"
      });
      return false;
    },
    // 导入
    handleSuccess({ results }) {
      debugger;
      var models = {};
      var modelsKey = [];
      var result = {}; //mdoels为根据Object.keys(results);中的资源模型查询出来的表结构
      if (results.资源关系) {
        delete results.资源关系;
      }
      models = Object.keys(results);
      modelsKey = Object.keys(results);
      if (results[modelsKey[0]].length == 0) {
        this.$message.error("导入数据不能为空！");
        return;
      }
      service.allQueryModel(models).then(res => {
        debugger;
        if (!res.datas) {
          this.$message.error("未找到数据模型,请重新选择！");
          return;
        }
        if (res.datas) {
          models = this.splicing(res.datas);
          result = exceltool.import_excel(models, results);
          service
            .importData(result, modelsKey)
            .then(res => {
              debugger;
              if (res.type == 0) {
                debugger
                this.$message.success("导入成功!");
                this.dialogimportVisible = false;
                this.init();
              }
              if (res.type == 3) {
                this.$message.error("导入失败,该数据ID有误!");
              }
              if (res.type == 5) {
                this.$message.error("导入失败,关系模型不存在!");
              }
              if (res.type == 8) {
                this.$message.error("导入失败,必填字段为空!");
              }
              if (res.type == 9) {
                this.$message.error("导入失败,资源名称有误!");
              }
            })
            .catch(res => {
              this.$message.error("导入失败!");
            });
        }
      });
    },
    //初始化数据
    init() {
      debugger;
      if (!this.page.model) {
        this.page.model = "ResObject";
      }
      this.temp = [];
      service.resourcesData(this.page).then(res => {
        debugger;
        var temp = res.datas;
        this.page.totalRecords = parseInt(res.count);
        var _this = this;
        // var getModel = Object.keys(res);
        // 循环添加 nodelname 字段用于显示
        _this.temp = [];
        for (var key in temp) {
          for (var i = 0; i < temp[key].length; i++) {
            temp[key][i]["modelName"] = key;
          }
        }
        for (var key in temp) {
          _this.temp.push.apply(_this.temp, temp[key]);
        }
      });
    },
    // 每页显示多少条数据
    sizeChange(val) {
      debugger;
      this.page.pageSize = val;
      if (this.page.checked) {
        service.conditionQuery(this.page).then(res => {
        debugger;
        if (res) {
          if (res.datas == "") {
            this.$message.error("未查到数据！");
            return;
          }
          this.page.totalRecords = parseInt(res.count);
        }
        this.temp = [];
        var temp = res.datas;
        var _this = this;
        for (var key in temp) {
          for (var i = 0; i < temp[key].length; i++) {
            temp[key][i]["modelName"] = key;
          }
        }
        for (var key in temp) {
          _this.temp.push.apply(_this.temp, temp[key]);
        }
      });
      } else {
        if (
          this.page.value == "SaaS" ||
          this.page.value == "PaaS" ||
          this.page.value == "IaaS" ||
          this.page.value == "Others"
        ) {
          service.queryResourcesParent(this.page).then(res => {
            debugger;
            var temp = res.datas;
            this.page.totalRecords = parseInt(res.count);
            this.temp = [];
            var _this = this;
            // var getModel = Object.keys(res);
            // 循环添加 nodelname 字段用于显示
            for (var key in temp) {
              for (var i = 0; i < temp[key].length; i++) {
                temp[key][i]["modelName"] = key;
              }
            }
            for (var key in temp) {
              _this.temp.push.apply(_this.temp, temp[key]);
            }
          });
          return;
        }
        if (this.page.value && this.page.value.indexOf(".") != -1) {
          service.queryResourcesParent(this.page).then(res => {
            debugger;
            var temp = res.datas;
            this.page.totalRecords = parseInt(res.count);
            this.temp = [];
            var _this = this;
            // var getModel = Object.keys(res);
            // 循环添加 nodelname 字段用于显示
            for (var key in temp) {
              for (var i = 0; i < temp[key].length; i++) {
                temp[key][i]["modelName"] = key;
              }
            }
            for (var key in temp) {
              _this.temp.push.apply(_this.temp, temp[key]);
            }
          });
          return;
        }
        this.init();
      }
    },
    //翻页
    currentChange(val) {
      debugger;
      this.page.pageNum = val - 1;
      if (this.page.checked) {
        service.conditionQuery(this.page).then(res => {
        debugger;
        if (res) {
          if (res.datas == "") {
            this.$message.error("未查到数据！");
            return;
          }
          this.page.totalRecords = parseInt(res.count);
        }
        this.temp = [];
        var temp = res.datas;
        var _this = this;
        for (var key in temp) {
          for (var i = 0; i < temp[key].length; i++) {
            temp[key][i]["modelName"] = key;
          }
        }
        for (var key in temp) {
          _this.temp.push.apply(_this.temp, temp[key]);
        }
      });
      } else {
        if (
          this.page.value == "SaaS" ||
          this.page.value == "PaaS" ||
          this.page.value == "IaaS" ||
          this.page.value == "Others"
        ) {
          service.queryResourcesParent(this.page).then(res => {
            debugger;
            var temp = res.datas;
            this.page.totalRecords = parseInt(res.count);
            this.temp = [];
            var _this = this;
            // var getModel = Object.keys(res);
            // 循环添加 nodelname 字段用于显示
            for (var key in temp) {
              for (var i = 0; i < temp[key].length; i++) {
                temp[key][i]["modelName"] = key;
              }
            }
            for (var key in temp) {
              _this.temp.push.apply(_this.temp, temp[key]);
            }
          });
          return;
        }
        if (this.page.value && this.page.value.indexOf(".") != -1) {
          service.queryResourcesParent(this.page).then(res => {
            debugger;
            var temp = res.datas;
            this.page.totalRecords = parseInt(res.count);
            this.temp = [];
            var _this = this;
            // var getModel = Object.keys(res);
            // 循环添加 nodelname 字段用于显示
            for (var key in temp) {
              for (var i = 0; i < temp[key].length; i++) {
                temp[key][i]["modelName"] = key;
              }
            }
            for (var key in temp) {
              _this.temp.push.apply(_this.temp, temp[key]);
            }
          });
          return;
        }
        this.init();
      }
    }
  }
};
</script>

<style scoped>
.el-header {
  height: 90px !important;
  color: #333;
  text-align: left !important;
  font-size: 14px;
  line-height: 45px !important;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
}
.el-aside {
  background-color: #fff;
  border-radius: 4px;
  margin-right: 10px;
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
  padding: 0px;
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
span.el-cascader.el-cascader--medium {
  width: 80%;
  margin-top: 10px;
  margin-bottom: 5px;
}
.el-form-item__error {
  top: 103%;
  left: 26px;
}
.transfer-foot {
  position: absolute;
  top: 72%;
  left: 44.1%;
}
</style>

