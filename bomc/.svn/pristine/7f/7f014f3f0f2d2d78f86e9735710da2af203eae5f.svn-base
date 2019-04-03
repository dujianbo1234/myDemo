<template>
  <div class="a">
    <div class="RightRow">
      <el-card>
      <el-form :inline="true" class="elform">
       <el-form-item label="规则名称">
        <el-input v-model="search.name" style="width:260px" placeholder="请输入规则名称" @keyup.enter.native="queryMetricsRul(search)"></el-input>
       </el-form-item>
        <el-form-item label="规则别名">
        <el-input v-model="search.alias" style="width:260px" placeholder="请输入规则别名" @keyup.enter.native="queryMetricsRul(search)"></el-input>
       </el-form-item>
       <el-form-item>
       <el-button  class="search_btn" @click="queryMetricsRul(search)">查询</el-button>
       <el-button  class="opt_btn" @click.stop="reset">重置</el-button>
        <i class="iconfont step_btn">&#xe619;</i>            
        <el-popover
            placement="bottom"
            width="400"
            trigger="click">
              <template>
                <div></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox label="规则名" disabled></el-checkbox>
                  <el-checkbox label="规则别名" disabled></el-checkbox>
                  <el-checkbox label="规则描述"></el-checkbox>
                  <el-checkbox label="创建人" style="margin-left:0px"></el-checkbox>
                  <el-checkbox label="创建时间" ></el-checkbox>
                </el-checkbox-group>
              </template>
            <i class="iconfont step_btn"  slot="reference">&#xe615;</i> 
        </el-popover> 
       </el-form-item>
      </el-form>
      </el-card>
    </div>  
    <div class="buttonItem">
      <el-card>
      <div>
        <el-button class="search_btn" @click="showDialog" style="margin-bottom:15px">新增规则</el-button>
        <el-button
          :disabled="multipleSelectionIds===''"
          class="opt_btn del_btn"
          @click="deleteMetricsRule(multipleSelectionIds,good, '')"
        >批量删除</el-button>
      </div>
      <div  class="block">
        <el-table
          ref="multipleTable"
          :data="metricsRuleData"
          :header-cell-style="headStyle"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @row-dblclick="openDialog"
         >
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="name" label="规则名" v-if="oneshow"/>
          <el-table-column prop="alias" label="规则别名" v-if="twoshow"/>
          <el-table-column prop="description" label="规则描述" v-if="thirdshow"/>
          <el-table-column prop="founder" label="创建人" v-if="fourshow"/>
          <el-table-column label="创建时间" v-if="fiveshow">
            <template slot-scope="scope">{{ scope.row.createTime | dateFilter }}</template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                class="table_btn"
                @click.stop="showUpdateDialog(scope.row,dialogVisibleUpdate)"
              >修改</el-button>
              <el-button
                type="text"
                size="small"
                class="table_btn"
                @click="deleteMetricsRule(scope.row.ruleId,scope.row.name,scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="totalCount3>0" class="pagination">
          <el-pagination
            :current-page.sync="currentPage3"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            :total="totalCount3"
            align="right"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      </el-card>
    </div>

    <!-- 
      新增指标规则
     -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
      top="5vh"
      :close-on-click-modal="false"
      @close="closeDialog"
     >
     <div class="details-title">
      <span class="sp"><span>规则信息</span></span>
      <div class="logAdd-obj">
      <el-form :model="form" :rules="rules" ref="form" label-width="150px">
        <el-form-item :label-width="formLabelWidth" label="计算规则名" prop="name">
          <el-input
            v-model="form.name"
            autocomplete="npm off"
            required
            style="width:80%"
            placeholder="请输入英文或者数字"
            @keyup.native="form.name=form.name.replace(/[^\w\.\/]/ig,'')"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="计算规则别名" prop="alias">
          <el-input
            v-model="form.alias"
            autocomplete="off"
            required
            style="width:80%"
            placeholder="请输入别名"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="规则描述" prop="description">
          <el-input
            v-model="form.description"
            autocomplete="off"
            :autosize="{ minRows: 2, maxRows: 5}"
            required
             style="width:80%"
            type="textarea"
            placeholder="请输入规则描述"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="规则脚本" prop="scriptTemplet">
          <el-input
            v-model="form.scriptTemplet"
            :autosize="{ minRows: 5, maxRows: 18}"
            autocomplete="off"
            required
            style="width:80%"
            type="textarea"
            placeholder="请输入规则脚本"
          />
        </el-form-item>
        <div class="scro">
        <template v-for="(paramsTemplet, index) in form.paramsTemplet" class="t1">
          <el-form-item
            style="width:100%;"
            :label="'规则参数' + (index+1)"
            :prop="'paramsTemplet.' + index + '.ParamsTempletName'"
            :key="'createdParamsTempletName'+paramsTemplet.key"
            :rules="{
           required: true, message: '规则参数不能为空', trigger: 'blur' 
           }"
          >
            <br>
            <el-row :gutter="2" style="margin-bottom:10px;margin-left:-9.5%">
              <el-col :span="2">
                <span>name</span>
              </el-col>
              <el-col :span="6">
                <el-input
                  v-model="paramsTemplet.ParamsTempletName"
                  label="name"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            style="width:100%;"
            :prop="'paramsTemplet.' + index + '.ParamsTempletType'"
            :key="'createdParamsTempletType'+paramsTemplet.key"
            :rules="{
           required: true, message: '规则参数不能为空', trigger: 'blur' 
           }"
            class="item1"
          >
            <el-row :gutter="2">
              <el-col :span="2" style="padding-top:0px;margin-left:-10%">
                <span>type</span>
              </el-col>
              <el-col :span="6" style="margin-left:-1%">
                <el-select v-model="paramsTemplet.ParamsTempletType" placeholder="请选择" label="type" >
                 <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-button @click.prevent="removeDomain(paramsTemplet)" class="btn1">删除</el-button>
          </el-form-item>
          <!-- <el-button :key="'createdParamsTempletTypeButton'+paramsTemplet.key" @click.prevent="removeDomain(paramsTemplet)" >删除</el-button> -->
        </template>
        </div>
        <el-form-item>
          <!-- <el-button  @click="resetFormParamsTemplet(form)">重置</el-button> -->
          <el-button @click="addDomain">新增规则参数</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearValidate(form)">取消</el-button>
        <el-button class="finish" :disabled="disabled" @click="creatMetricsRule(form)">提交</el-button>
      </div>
      </div>
     </div>
    </el-dialog>
    <!-- 
    修改规则弹框
    --> 
    <el-dialog
      :visible.sync="dialogVisibleUpdate"
      @close="closeUpdateDialog"
      :close-on-click-modal="false"
      width="60%"
      style="overflow-x:hidden;"
      >
      <div class="details-title">
      <span class="sp"><span>修改规则信息</span></span>
      <div class="logAdd-obj">
      <el-form :model="form1" :rules="rules" ref="form1">
        <el-form-item :label-width="formLabelWidth" label="计算规则名 " prop="name" style="margin-left:2.1%">
          <el-input
            v-model="form1.name"
            style="width:55%;"
            autocomplete="off"
            required
            placeholder="请输入英文或者数字"
            @keyup.native="form1.name=form1.name.replace(/[^\w\.\/]/ig,'')"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="计算规则别名" prop="alias">
          <el-input
            v-model="form1.alias"
            style="width:55%;"
            autocomplete="off"
            required
            placeholder="请输入别名(仅支持中文)"
          />
          <!--  <el-input v-model="form.alias" autocomplete="off" required placeholder="请输入别名" @keyup.native="form.alias=form.alias.replace(/[^\u4E00-\u9FA5]/g,'')"/> -->
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="规则描述" prop="description" style="margin-left:3.6%">
          <el-input
            v-model="form1.description"
            style="width:80%;"
            autocomplete="off"
            :autosize="{ minRows: 2, maxRows: 5}"
            required
            type="textarea"
            placeholder="请输入规则描述"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="规则脚本" prop="scriptTemplet" style="margin-left:3.6%">
          <el-input
            v-model="form1.scriptTemplet"
            :autosize="{ minRows: 5, maxRows: 18}"
            style="width:80%;"
            autocomplete="off"
            required
            type="textarea"
            placeholder="请输入规则脚本"
          />
        </el-form-item>
        <div class="scro">
        <template v-for="(paramsTemplet, index) in form1.paramsTemplet" class="t2">
          <el-form-item
            :label="'规则参数' + (index+1)"
            :prop="'paramsTemplet.' + index + '.ParamsTempletName'"
            :key="'createdParamsTempletName'+paramsTemplet.key"
            style="width:100%;;margin-left:2.5%"
            :rules="{
              required: true, message: '规则参数不能为空', trigger: 'blur'
          }" >
            <br>
            <el-row :gutter="2" style="margin-bottom:10px;margin-left:3.5%">
              <el-col :span="2">
                <span>name</span>
              </el-col>
              <el-col :span="6">
                <el-input
                  v-model="paramsTemplet.ParamsTempletName"
                  label="name"
                  style="width:100%;"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            :prop="'paramsTemplet.' + index + '.ParamsTempletType'"
            :key="'createdParamsTempletType'+paramsTemplet.key"
            :rules="{
              required: true, message: '规则参数不能为空', trigger: 'blur'
          }"
            style="width:100%;"
            class="item2"
          >
            <el-row :gutter="2">
              <el-col :span="2" style="padding-top:0px;;margin-left:2%">
                <span>type</span>
              </el-col>
              <el-col :span="6" style="margin-left:-1%">
                <el-select v-model="paramsTemplet.ParamsTempletType" placeholder="请选择" label="type" >
                 <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-button class="btn2" @click.prevent="removeDomainU(paramsTemplet)">删除</el-button>
          </el-form-item>
          <!-- <el-button :key="'createdParamsTempletTypeButton'+paramsTemplet.key" @click.prevent="removeDomain(paramsTemplet)" >删除</el-button> -->
        </template>
        </div>
        <el-form-item>
          <el-button @click="addDomainU">新增规则参数</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cleardialog(form1)">取消</el-button>
        <el-button class="finish" :disabled="disabled" @click="updateTable(form1)">提交</el-button>
      </div>
      </div>
     </div>
    </el-dialog>
    <!--
     详细信息，点击某一行查看此行的详情
     -->
    <el-dialog
      :visible.sync="dialogInformation"
      @close="clearInformation"
      width="60%"
      style="overflow-x:hidden;"
      >
      <div class="details-title">
      <span class="sp"><span>规则信息</span></span>
      <div class="logAdd-obj">      
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item :label-width="formLabelWidth" label="计算规则名 " prop="name" style="margin-left:2.1%">
          <el-input
            v-model="form.name"
            style="width:55%;"
            autocomplete="off"
            :readonly="true"
            placeholder="请输入名称(仅支持英文)"
            @keyup.native="form.name=form.name.replace(/[^\w\.\/]/ig,'')"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="计算规则别名" prop="alias">
          <el-input
            v-model="form.alias"
            style="width:55%;"
            autocomplete="off"
            :readonly="true"
            placeholder="请输入别名(仅支持中文)"
          />
          <!--  <el-input v-model="form.alias" autocomplete="off" required placeholder="请输入别名" @keyup.native="form.alias=form.alias.replace(/[^\u4E00-\u9FA5]/g,'')"/> -->
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="规则描述" prop="description" style="margin-left:3.6%">
          <el-input
            v-model="form.description"
            style="width:80%;"
            autocomplete="off"
            :autosize="{ minRows: 2, maxRows: 5}"
            :readonly="true"
            type="textarea"
            placeholder="请输入规则描述"
          />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="规则脚本" prop="scriptTemplet" style="margin-left:3.6%">
          <el-input
            v-model="form.scriptTemplet"
            :autosize="{ minRows: 5, maxRows: 18}"
            style="width:80%;"
            autocomplete="off"
            :readonly="true"
            type="textarea"
            placeholder="请输入规则脚本"
          />
        </el-form-item>
        <div class="scro">
        <template v-for="(paramsTemplet, index) in form.paramsTemplet">
          <el-form-item
            style="width:100%;;margin-left:2.5%"
            :label="'规则参数' + (index+1)"
            :prop="'paramsTemplet.' + index + '.ParamsTempletName'"
            :key="'createdParamsTempletName'+paramsTemplet.key"
            :rules="{
           required: true, message: '规则参数不能为空', trigger: 'blur' 
           }"
          >
            <br>
            <el-row :gutter="2" style="margin-bottom:10px;margin-left:3.5%">
              <el-col :span="2">
                <span>name</span>
              </el-col>
              <el-col :span="6">
                <el-input
                  v-model="paramsTemplet.ParamsTempletName"
                  :readonly="true"
                  label="name"
                  style="width:100%;"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            style="width:100%;"
            :prop="'paramsTemplet.' + index + '.ParamsTempletType'"
            :key="'createdParamsTempletType'+paramsTemplet.key"
            :rules="{
           required: true, message: '规则参数不能为空', trigger: 'blur' 
           }"
            class="item1"
          >
            <el-row :gutter="2">
              <el-col :span="2" style="padding-top:0px;;margin-left:2%">
                <span>type</span>
              </el-col>
              <el-col :span="6" style="margin-left:-1%">
                <el-input
                  v-model="paramsTemplet.ParamsTempletType"
                  :readonly="true"
                  label="type"
                  style="width:100%;"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- <el-button :key="'createdParamsTempletTypeButton'+paramsTemplet.key" @click.prevent="removeDomain(paramsTemplet)" >删除</el-button> -->
        </template>
        </div>
      </el-form>
      </div>
     </div>      
    </el-dialog>
  </div>
</template>
<script>
import * as server from "../../../../api/kms";
import * as utils from "../../../../utils/utils.js";
import { getUserName } from "@/utils/auth";
var _ = require("lodash");
export default {
  filters: {
    dateFilter(value) {
      return utils.dateFilter(value);
    }
  },
  data() {
    return {
      search: {
        name: '',
        alias:'',
        createTime: "",
      },
      options: [{
          value: '选项一',
          label: 'string'
        }, {
          value: '选项二',
          label: 'int'
        }, {
          value: '选项三',
          label: 'double'
        }],
        value: '',

      disabled:false,
      oneshow:true,
      twoshow:true,
      thirdshow:true,
      fourshow:true,
      fiveshow:true,
      headStyle: {
        'background-color': '#F4F8F9',
        'color': 'rgba(0,0,0,0.60)',
      }, 
      checkedCities:  ['规则名', '规则别名','规则描述', '创建人','创建时间'],      
      mustcount:"",
      allcount:'',
      numName:"",
      multipleSelectionIds: "",
      good:"",
      formLabelWidth: "",
      totalCount3: "", // 指标规则总条数
      currentPage3: 1, // 指标规则当前页
      pageSize: 5, // 每页显示默认条数
      tableDataTemplet: [{}], //指标规则参数详情输入框数据
      currentId: "",
      form: {
        name: "",
        alias: "",
        code: "",
        createTime: "",
        description: "",
        founder: getUserName(),
        scriptTemplet: "",
        paramsTemplet: []
      },
      form1: {
        name: "",
        alias: "",
        code: "",
        createTime: "",
        description: "",
        founder: getUserName(),
        scriptTemplet: "",
        paramsTemplet: []
      },
      rules: {
        name: [{ required: true, message: "请填写英文或者数字", trigger: "blur" },
               { min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur' }],
        alias: [{ required: true, message: "请填写别名", trigger: "blur" },
                { min: 1, max: 10, message: '长度不能超过10个字符', trigger: 'blur' }],
        description: [
          { required: true, message: "请填写规则描述", trigger: "blur" }
        ],
        scriptTemplet: [
          { required: true, message: "请填写规则脚本", trigger: "blur" }
        ]
      },
      dialogVisible: false,
      dialogVisibleUpdate: false,
      dialogInformation: false,
      metricsRuleData: [],
      multipleSelection: []
    };
  },
  created() {
    this.getMetricsRule(this.search);
  },
  methods: {
    handleCheckedCitiesChange(value) {
      var a=[]
        //  debugger
        for(var i=0;i<value.length;i++){
           a.push(value[i])
        }
        if(a.indexOf("规则名")==-1){
            this.oneshow=false
        }else{
          this.oneshow=true
        }
        if(a.indexOf("规则别名")==-1){
           this.twoshow=false
        }else {
           this.twoshow=true
        }
        if(a.indexOf("规则描述")==-1){
           this.thirdshow=false
        }else{
           this.thirdshow=true
        }
        if(a.indexOf("创建人")==-1){
          this.fourshow=false
        }else{
          this.fourshow=true
        }if(a.indexOf("创建时间")==-1){
          this.fiveshow=false
        }else{
          this.fiveshow=true
        }
      },
    clearValidate(form) {
      this.dialogVisible = false;
      this.$refs.form.resetFields();
      this.$refs.form.clearValidate();
    },
    cleardialog(row) {
      // debugger
      this.dialogVisibleUpdate = false;
      this.$refs.form1.resetFields();
      // debugger
      this.$refs.form1.clearValidate();
    },
    clearInformation(form) {
      this.dialogInformation = false;
      this.$refs.form.clearValidate();
    },
    removeDomain(item) {
      // debugger;
      var index = this.form.paramsTemplet.indexOf(item);
      if (index !== -1) {
        this.form.paramsTemplet.splice(index, 1);
      }
    },
    removeDomainU(item) {
      // debugger;
      var index = this.form1.paramsTemplet.indexOf(item);
      if (index !== -1) {
        this.form1.paramsTemplet.splice(index, 1);
      }
    },
    showDialog() {
      this.initDialog();
      this.dialogVisible = true;
      this.disabled=false;
    },
    openDialog(row) {
      // debugger
      this.dialogInformation = !this.dialogInformation;
      // this.form=rule
      this.form.name='';
      this.form.alias='';
      this.form.code='';
      this.form.description='';
      this.form.scriptTemplet='';
      this.form.paramsTemplet='';
      console.table(row)
      // debugger
      this.form.name=row.name;
      this.form.alias=row.alias;
      this.form.code=row.code;
      this.form.description=row.description;
      this.form.scriptTemplet=row.scriptTemplet;
      // this.form = row;
      this.$set(this.form, "paramsTemplet", JSON.parse(row.paramsTemplet));
      
    },
    initDialog() {
      // debugger
      this.form = {
        name: "",
        alias: "",
        code: "",
        createTime: "",
        description: "",
        scriptTemplet: "",
        paramsTemplet: []
      };
    },
    closeDialog(form) {
      // debugger
      this.initDialog();
      this.$refs.form.resetFields();
      this.$refs.form.clearValidate();
    },
    closeUpdateDialog() {
      this.$refs.form1.clearValidate();
    },
    handleClick() {
      this.getMetricsRule();
    },
     //修改
    async  showUpdateDialog(row, rule, dialogVisibleUpdate) {
      this.disabled=false;
       let a = this.queryMetricsDef(row)
       await a
       console.log(this.mustcount)
       if(this.mustcount !== 0){
         this.$alert('该指标计算规则已绑定指标定义，不能修改', '提示', {
          confirmButtonText: '确定',
        });
       }else{

      this.dialogVisibleUpdate = !dialogVisibleUpdate;
      // debugger;
      this.form1 = _.cloneDeep(row);
      if(typeof row.paramsTemplet === 'string'){
        this.$set(this.form1, "paramsTemplet", JSON.parse(row.paramsTemplet));
      }
      this.currentId = row.ruleId;
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    /**
     * 提示
     */
     handleSelectionChange(val) {
      // debugger
      this.multipleSelectionIds = val.map(item => item.ruleId).join(",");
      this.good=val.map(item=>item.name).join(",")
    },
    open(p, index) {
      let param, val;
      if (p === "scriptTe") {
        param = "scriptTemplet";
        val = "脚本详情";
      } else {
        param = "paramsTemplet";
        val = "参数详情";
      }
      this.$alert(this.metricsRuleData[index][param], val, {
        confirmButtonText: "确定"
      });
    },
    /**
     * 指标信息的接口
     */
     queryMetricsDef(row) {
       const params = {}
       var value=row.name
      console.log(value)
       params['search']=true
       params["keys"] ="ruleName"
       params["value"] = value
       return server.queryMetricsDef(params).then(
        res => {
          this.mustcount = res.count;
          }
       );
     },
     /**
      * 数据查询 
      * */  
    getMetricsRule(search) {
      debugger
      //从后台查询指标规则整个表格信息，再加上指标规则分页
      const params = {
        start: (this.currentPage3 - 1) * this.pageSize + 1, // （当前页数-1）*每页显示的条数
        limit: this.pageSize
      };
      params['value'] = search.name+","+search.alias
      
      params['keys'] = "name,alias"
      
      params["search"] = "true";
      params["sortfield"] = "createTime"; 
      params["sortorder"] = "DESC";
      server.getMetricsRule(params).then(
        res => {
          this.metricsRuleData = res.metricsData;
          this.totalCount3 = res.count; //后台的页面总数给前端
          console.info(res);
          console.info(this.metricsRuleData);
        } // 查询指标规则
      );
    },
    // 新增指标规则
    creatMetricsRule(form) {
      this.disabled=true; 
      // debugger
      var Userfounder = getUserName();
      this.form.founder = Userfounder;
      // debugger
      let postForm = _.cloneDeep(form);
      postForm.paramsTemplet = JSON.stringify(form.paramsTemplet)
      var a=[]
      for(var i=0;i<form.paramsTemplet.length;i++){
         a.push(form.paramsTemplet[i].ParamsTempletName)
      };
        var s = a.join(",")+",";
        var b=""
        for(var i=0;i<a.length;i++) {
        if(s.replace(a[i]+",","").indexOf(a[i]+",")>-1) {
          b=a[i]
        break;
        }
      }
      //  debugger
      this.$refs.form.validate(valid => {
        if (valid) {
          //  alert("submit!");
          // debugger
          var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
          if(reg.test(this.form.name)){
              this.$message({
                showClose: true,
                message: '规则名中不能含有文字!',
                type: 'error'
              })
              this.disabled=false;
             this.dialogVisible = true
          }else{
           if(b){
             this.$message({
                showClose: true,
                message: '参数规则名'+b+"重复",
                type: 'error'
              })
              this.disabled=false;
           }else{
            server.postMetricsRule(postForm).then(res => {
            this.getMetricsRule(this.search);
            if (res.errorMsg=="请求成功") {
              this.$message({
                showClose: true,
                message: "新增成功！",
                type: "success"
              });
              this.form.name = "";
              this.form.alias = "";
              this.form.description = "";
              this.form.scriptTemplet = "";              
              this.dialogVisible = false;             
            }else{
              this.dialogVisible=true;
              this.disabled=false; 
            }
          });
          }
         }
        } else {
          //alert("不允许提交空白表单!请完整填写弹框信息！");
          this.$message({
            showClose: true,
            message: "不允许提交空白表单!请完整填写弹框信息！！",
            type: "error"
          });
          this.disabled=false; 
          console.log("111");
          return false;
        }
      });
    },
    // 修改规则
    changeMetricsRule(form1, ruleId) {
      this.disabled=true; 
      // debugger
      var Userfounder = getUserName();
      this.form1.founder = Userfounder;
      (ruleId = this.form1.ruleId), (this.rule = this.form1);
      console.log(this.form1)
      console.log(this.rule)
      let postForm = _.cloneDeep(form1);
      postForm.paramsTemplet = JSON.stringify(form1.paramsTemplet);
      var a=[]
      for(var i=0;i<form1.paramsTemplet.length;i++){
         a.push(form1.paramsTemplet[i].ParamsTempletName)
      };
        var s = a.join(",")+",";
        var b=""
        for(var i=0;i<a.length;i++) {
        if(s.replace(a[i]+",","").indexOf(a[i]+",")>-1) {
          b=a[i]
        break;
        }
      }
      this.$refs.form1.validate(valid => {
        if (valid) { 
          var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
            if(reg.test(this.form1.name)){
              this.$message({
                showClose: true,
                message: '规则名中不能含有文字!',
                type: 'error'
              })
              this.disabled=false;
             this.dialogVisibleUpdate = true
              }else{
            if(b){
             this.$message({
                showClose: true,
                message: '参数规则名'+b+"重复",
                type: 'error'
              })
              this.disabled=false;
           }else{ 
          server.putMetricsRule(postForm).then(res => {
            this.getMetricsRule(this.search);
            // this.form1.name = "";
            // this.form1.alias = "";
            // this.form1.description = "";
            // this.form1.scriptTemplet = "";
            // this.form1.ruleId = "";
            if (res.errorMsg=="请求成功") {
              this.$message({
                showClose: true,
                message: "修改成功！",
                type: "success"
              });
            this.form1.name = "";
            this.form1.alias = "";
            this.form1.description = "";
            this.form1.scriptTemplet = "";
            this.form1.ruleId = "";         
            this.dialogVisibleUpdate = false;           
            }else{
              this.dialogVisibleUpdate=true;
              this.disabled=false; 
            }
          });
           }
          }
        }else {
          this.$message({
            showClose: true,
            message: "不允许提交空白表单!请完整填写弹框信息！！",
            type: "error"
          });
          this.disabled=false; 
          console.log("111");
          return false;
        }
        error => {
          console.error("请求异常！" + error);
          (this.dialogVisibleUpdate = false),
            this.$message({
              showClose: true,
              message: "修改失败！",
              type: "error"
            });
        };
      });
    },
    addDomain() {
      // debugger
      this.form.paramsTemplet.push({
        ParamsTempletName: "",
        ParamsTempletType: ""
      }); 
      // debugger;
    },
    addDomainU() {
      this.form1.paramsTemplet.push({
        ParamsTempletName: "",
        ParamsTempletType: ""
      });
      // debugger;
    },
    updateTable(form1) {
      this.changeMetricsRule(form1, this.currentId);
    },
    //删除
     deleteMetricsRule(ids,index,row) {
      // debugger
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          server.deleteMetricsRule(index).then(res => {
          if(res.errorMsg!=="请求成功" ){
              console.log("111")
          }else{           
            this.currentPage3 = 1;
            this.getMetricsRule(this.search);
            this.$message.success("删除成功！");
           }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        }),
        error => {
          console.error("请求异常！" + error);
          this.$message({
            showClose: true,
            message: "删除失败！",
            type: "error"
          });
        };
      event.cancelBubble = true;
    },
    // 指标规则搜索
    queryMetricsRul(search) {
      let reg = new RegExp(
        "[`~!@#%$^&*()=|{}':',\\[\\].<>《》~！@#￥……&*（）——|{}【】‘；;：”“'。，、？]",
        "g"
      );
      if (reg.test(this.search.name)) {
        this.$message.warning("规则名称请勿输入特殊字符！");
        return;
      }
      String.prototype.trim = function()
            {
                // 用正则表达式将前后空格
                // 用空字符串替代。
                return this.replace(/(^\s*)|(\s*$)/g, "");
            }
        this.search.name=this.search.name.trim();
        this.search.alias=this.search.alias.trim();
      const params = {
        start: 1, // （当前页数-1）*每页显示的条数
        limit: this.pageSize
      };
      // alert(this.form.createTime);
      params['keys'] = "name,alias"
      params['value'] = search.name+","+search.alias
      params["search"] = true;
      params["sortfield"] = "createTime";
      params["sortorder"] = "DESC";
      server.queryMetricsRul(params).then(
        res => {
          this.metricsRuleData = res.metricsData;
          this.currentPage3 = 1; //搜索后数据从第一页开始显示
          this.totalCount3 = res.count; //后台的页面总数给前端
        } // 查询
      );
    },
    handleSizeChange(val) {
      // 设置每页多少条
      this.pageSize = val;
      this.getMetricsRule(this.search);
    },
    handleCurrentChange(val) {
      // 当前页
      this.currentPage3 = val;
      this.getMetricsRule(this.search);
    },
    //重置
    reset() {
      this.search.name = "";
      this.search.alias="";
      // this.search.code = '';
    }
  }
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.block {
  margin: 20px 0 12px 0;
}
.text {
  font-size: 14px;
}
.item {
  padding: 8px 0;
}
.el-row {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0px;
  }
}
.btnInfo {
  margin-top: 30px;
}
.t1 {
  position: relative;
  margin-bottom: 20px;
}
.item1 {
  position: absolute;
  margin-top: -69px;
  margin-left: 40%;
  position: relative;
  padding: 0px;
}
.btn1 {
  position: absolute;
  margin-top: -45px;
  margin-left: 30%;
}
.t2 {
  position: relative;
  margin-bottom: 20px;
}
.item2 {
  position: absolute;
  margin-top: -69px;
  margin-left: 40%;
  position: relative;
  padding: 0px;
}
.btn2 {
  position: absolute;
  margin-top: -45px;
  margin-left: 40%;
}
.scro{
  max-height:400px;
  overflow-y: auto;
  overflow-x:hidden
}
.RightRow {
    margin: 20px 10px 12px 20px;
    border-radius: 5px;
    height:auto;

    .elform{
      margin-bottom: -15px;
      margin-top: 5px;
    }
}
.buttonItem {
    margin: 20px 10px 20px 20px;
    border-radius: 5px;
}
.search_btn{
  background: #42B983;
  border: 1px solid #42B983;
  color: #FFFFFF;
    &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
}
.step_btn {
  background: rgba(66, 185, 131, 0.4);
  border: 1px solid #42B983;
  color: rgba(66, 185, 131, 1);
  cursor:pointer;
  margin-left:8px;
  border-radius: 3px;
  padding: 8px 11px;
  &:hover {
    background: rgba(66, 185, 131, 0.2);
  }
}
.opt_btn {
  background: #F4F8F9;
  color: rgba(0, 0, 0, 0.70);
  margin-left: 8px;
  font-size:14px;
  border: none;
  height: 34px;
  &:hover {
    background: #42B983;
    border-color: #42B983;
    color: #fff;
  }
}
.del_btn {
  &:hover {
    background: #FA5555;
    border-color: #FA5555;
    color: #fff;
  }
}
.table_btn {
  color: rgba(66, 185, 131, 1);
  font-size:14px;
}
.finish {
  background: #42B983;
  border: 1px solid #42B983;
  color: #FFFFFF;

  &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
}

.details-title {
  // margin-bottom: 20px;
  margin-top:-30px;

  .sp {
    display: inline-block;
    height: 20px;
    color: #42B983;
    margin-bottom: 10px;
    font-size:15px;

    span {
      padding-left: 10px;
      border-left: 3px solid #42B983;
    }
  }
}
.logAdd-obj {
    margin-top:20px;
}
.dialog-footer{
  margin-top:-17px;
  margin-left: 559px;
}
.el-checkbox+.el-checkbox{
  margin-left:74px;
}
</style>
