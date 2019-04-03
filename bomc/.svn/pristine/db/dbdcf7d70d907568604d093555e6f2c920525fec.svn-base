<template>
  <div class="container">
    <el-tabs v-model="activeName2" type="border-card" tab-position="top" @tab-click="handleClick">
      <el-tab-pane label="指标类型" name="first">
        <el-row :gutter="20" class="block">
          <el-col :span="12" :push="3">
            <label for="indicatorType" style="width:50%"></label>
            <el-input id="indicatorType" v-model="search.name" size="medium" style="width:50%" placeholder="请输入指标类型"
              @keyup.enter.native="queryMetricsType(search)" />

            <!-- <el-form :model="form" ref="form" >
            <el-form-item label="指标类型:" prop="name" style="width:50%">
            <el-input  v-model="search.name" placeholder="请输入内容" style="width:50%"> </el-input>
            </el-form-item>
            </el-form> -->

            <el-button type="primary" style="margin:0 0 0 10px" @click="queryMetricsType(search)">搜索</el-button>
            <el-button type="primary" style="margin:0 0 0 10px" @click="reset">重置</el-button>
          </el-col>
        </el-row>
        <el-row class="btnInfo">
          <el-col :push="3">
            <el-button type="primary" @click="showDialog('',dialogFormVisible,'add_type_id')">新增类型</el-button>
            <el-button :disabled="multipleSelectionIds===''" type="danger" @click="deleteMetricsType(multipleSelectionIds, '')">批量删除</el-button>
          </el-col>
        </el-row>
        <el-row class="block">
          <el-col :span="18" :push="3">
            <el-table ref="multipleTable" :data="metricsTypeData" tooltip-effect="dark" style="width: 100%" border
              @selection-change="handleSelectionChange('type',$event)">
              <el-table-column type="selection" width="55" />
              <!--  <el-table-column prop="typeId" label="序号"/> -->
              <el-table-column prop="name" label="指标类型名" />
              <el-table-column prop="alias" label="指标类型别名" />
              <el-table-column prop="founder" label="创建人" />
              <!-- <el-table-column prop="createTime" label="创建时间"/> -->
              <el-table-column label="创建时间">
                <template slot-scope="scope">
                  {{ scope.row.createTime | dateFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="showDialog(scope.row,dialogFormVisible,'change_type_id')">修改</el-button>
                  <el-button type="text" size="small" @click="deleteMetricsType(scope.row.typeId,scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div v-if="totalCount1>0" class="pagination">
              <el-pagination 
              :current-page.sync="currentPage1" 
              :page-sizes="[5, 10, 15, 20]" 
              :page-size="pageSize" 
              :total="totalCount1"
              align="right" 
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange(currentPage1,'getMetricsType')"
              @current-change="handleCurrentChange(currentPage1,'getMetricsType')" />
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="指标维度" name="second">
        <el-row :gutter="20" class="block">
          <el-col :span="12" :push="3">
            <label for="indicatorType" style="width:50%"></label>
            <el-input id="indicatorType" v-model="search.name" size="medium" style="width:50%" placeholder="请输入指标维度"
              @keyup.enter.native="queryMetricsDimension(search)" />
            <el-button type="primary" style="margin:0 0 0 10px" round @click="queryMetricsDimension(search)">搜索</el-button>
            <el-button type="primary" style="margin:0 0 0 10px" round @click="reset">重置</el-button>
          </el-col>
        </el-row>
        <el-row class="btnInfo">
          <el-col :push="3">
            <el-button type="primary" @click="showDialog('',dialogFormVisible,'add_dimension_id')">新增维度</el-button>
            <el-button :disabled="multipleSelectionIds===''" type="danger" @click="deleteMetricsDimension(multipleSelectionIds, '')">批量删除</el-button>
          </el-col>
        </el-row>
        <el-row class="block">
          <el-col :span="18" :push="3">
            <el-table ref="multipleTable" :data="metricsDimensionData" tooltip-effect="dark" style="width: 100%" border
              @selection-change="handleSelectionChange('dimension',$event)">
              <el-table-column type="selection" width="55" />
              <!--  <el-table-column prop="dimensionId" label="序号"/> -->
              <el-table-column prop="name" label="指标维度名" />
              <el-table-column prop="alias" label="指标维度别名" />

              <el-table-column prop="founder" label="创建人" />
              <el-table-column label="创建时间">
                <template slot-scope="scope">
                  {{ scope.row.createTime | dateFilter }}
                </template>
              </el-table-column>

              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="showDialog(scope.row,dialogFormVisible,'change_dimension_id')">修改</el-button>
                  <el-button type="text" size="small" @click="deleteMetricsDimension(scope.row.dimensionId,scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div v-if="totalCount2>0" class="pagination">
              <el-pagination
               :current-page.sync="currentPage2" 
               :page-sizes="[5, 10, 15, 20]" 
               :page-size="pageSize" 
               :total="totalCount2"
               align="right"
               layout="total, sizes, prev, pager, next, jumper"
               @size-change="handleSizeChange(currentPage2,'getMetricsDimension')"
               @current-change="handleCurrentChange(currentPage2,'getMetricsDimension')" />
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :visible.sync="dialogFormVisible" :title="title" :close-on-click-modal='false' style="width:1200px;">
      <el-form :model="form" :rules="rules" ref="form" >
        <el-form-item :label-width="formLabelWidth" :label="lableType" prop="name">
          <el-input v-model="form.name" autocomplete="off" required placeholder="请输入名称（仅支持英文）" style="width:240px;" @keyup.native="form.name=form.name.replace(/[^\w\.\/]/ig,'')" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="lableChiese" prop="alias">
          <el-input  v-model="form.alias" autocomplete="off" required placeholder="请输入别名" style="width:240px;"/>
          <!--  <el-input v-model="form.alias" autocomplete="off" required placeholder="请输入别名" @keyup.native="form.alias=form.alias.replace(/[^\u4E00-\u9FA5]/g,'')"/> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTable(form.name,form.alias,touch_button)">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as server from "../../api/kms";
  import * as utils from '../../utils/utils.js'
  export default {
    name: "ModuleManagement",
    filters: {
      dateFilter(value) {
        return utils.dateFilter(value)
      }
    },
    dialogFormVisible: false,
    title: "",
    data() {
      return {
        search: {
          name: ""
        },

        totalCount1: "", // 指标类型总条数
        totalCount2: "", // 指标维度总条数
        currentPage1: 1, // 指标类型当前页
        currentPage2: 1, // 指标维度当前页
        
        pageSize: 5, // 每页条数

        multipleSelectionIds: "",
        touch_button: "",
        currentId: "",
        activeName2: "first",
        title: this.title,
        lableType: this.lableType,
        lableChiese: this.lableChiese,
        input: "",
        dialogFormVisible: this.dialogFormVisible,
        form: {
          name: "",
               alias: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        },

        rules: {
          name: [{
            required: true,
            message: "请输入名称（仅支持英文）",
            trigger: "blur"
          }],
          alias: [{
            required: true,
            message: "请输入别名",
            trigger: "blur"
          }]
        },

        formLabelWidth: "160px",
        metricsTypeData: [],
        metricsDimensionData: []
      };
    },
    created() {
      this.getMetricsType(this.search);
      this.getMetricsDimension(this.search);
      console.info("kms  created");
    },
    mounted() {
      console.info("kms  mounted");
    },
    methods: {
      handleClick() {},
      showDialog(row, dialogFormVisible, touch_button) {
        this.dialogFormVisible = !dialogFormVisible; //取反表示弹框
        this.touch_button = touch_button;
        // debugger
        if (touch_button === "add_type_id") {
          this.title = "指标类型";
          this.lableType = "类型名";
          this.lableChiese = "类型别名";
        } else if (touch_button === "add_dimension_id") {
          this.title = "指标维度";
          this.lableType = "指标维度名称";
          this.lableChiese = "指标维度别名";
        } else if (touch_button === "change_type_id") {
          this.title = "修改指标信息";
          this.lableType = "类型名";
          this.lableChiese = "类型别名";
          this.currentId = row.typeId;
          this.form.name = row.name;
          this.form.alias = row.alias;
        } else {
          this.title = "修改维度信息";
          this.lableType = "维度名";
          this.lableChiese = "维度别名";
          this.currentId = row.dimensionId;
          this.form.name = row.name;
          this.form.alias = row.alias;
        }
      },
      /**
       * 指标类型查询
       * @param search 
       */
      getMetricsType(search) {
        //从后台查询指标类型整个表格信息，再加上指标类型分页
        const params = {
          start: (this.currentPage1 - 1) * this.pageSize + 1, // （当前页数-1）*每页显示的条数
          limit: this.pageSize
        };
        for (const item in search) {
          if (search.hasOwnProperty(item) && search[item].trim() !== "") {
            params[item] = search[item].trim();
          }
        }
        server.getMetricsType(params).then(
          res => {
            this.metricsTypeData = res.metricsData; //后台获取的整个表格的数据给前台数组中
            this.totalCount1 = res.count; //后台的页面总数给前端
          } // 查询
        ); //拿到数据后，这里可以先判断下当前页拿到的数据是否为空？免得批量删除当前页时候，后面不显示。
      },
      /**
       * 指标类型搜索
       * @param search 
       */
      queryMetricsType(search) {
        const params = {
          start: 1, // （当前页数-1）*每页显示的条数
          limit: this.pageSize
        };
        params['search']=true;
        for (const item in search) {
          if (search.hasOwnProperty(item) && search[item].trim() !== "") {
            params[item] = search[item].trim();
            
          }
        }
        server.getMetricsType(params).then(
          res => {
            this.metricsTypeData = res.metricsData; //后台获取的整个表格的数据给前台数组中
            this.currentPage1 = 1; //搜索后数据从第一页开始显示
            this.totalCount1 = res.count; //后台的页面总数给前端
          } // 查询
        );
        //拿到数据后，这里可以先判断下当前页拿到的数据是否为空？免得批量删除当前页时候，后面不显示。
      },
/*       handleSizeChange(val) {
        // 设置每页多少条
        this.pageSize = val;
        this.getMetricsType(this.search);
        this.getMetricsDimension(this.search);
      },
      handleCurrentChange(val) {
        // 当前页
        debugger
        this.currentPage1 = val;
        this.currentPage2 = val;
        this.getMetricsType(this.search);
        this.getMetricsDimension(this.search);
      }, 
 */
      handleSizeChange(val,type) {
      // 设置每页多少条
      
      this.pageSize = val;
      if (type="getMetricsType") {
        this.getMetricsType();
      } else {
         this.getMetricsDimension();
      }
   },
    handleCurrentChange(val,type) {
      // 当前页
      if (type="getMetricsType") {
         this.currentPage1 = val;
        this.getMetricsType();
      } else {
        this.currentPage2 = val;
        this.getMetricsDimension();
      }
   }, 

      /*     resetForm(form) {     
           //this.$refs.form.resetFields();
           //debugger
             this.$nextTick(function(){
             this.$refs.form.resetFields();
           });
           },
      */
      //重置
      reset() {
        this.search.name = '';
      },

      /**
       * 指标维度查询
       * @param search 
       */
      getMetricsDimension(search) {
        //从后台查询指标维度整个表格信息，指标维度分页
        const params = {
          start: (this.currentPage2 - 1) * this.pageSize + 1, // （当前页数-1）*每页显示的条数
          limit: this.pageSize
        };
        for (const item in search) {
          if (search.hasOwnProperty(item) && search[item].trim() !== "") {
            params[item] = search[item].trim();
          }
        }
        server.getMetricsDimension(params).then(
          res => {
            this.metricsDimensionData = res.metricsData; //后台获取的整个表格的数据给前台数组中
            this.totalCount2 = res.count; //后台的页面总数给前端
          } // 查询
        );
      },
      /**
       * 指标维度搜索
       * @param search 
       */
      queryMetricsDimension(search) {
        const params = {
          start: 1, // （当前页数-1）*每页显示的条数
          limit: this.pageSize
        };
        params['search']=true;
        for (const item in search) {
          if (search.hasOwnProperty(item) && search[item].trim() !== "") {
            params[item] = search[item].trim();
          }
        }
        server.getMetricsDimension(params).then(res => {
          this.currentPage2 = 1; //搜索后数据从第一页开始显示
          this.metricsDimensionData = res.metricsData;
          this.totalCount2 = res.count; //搜搜到的后台的页面总数给前端
        });
      },

      // 新增指标类型
      createMetricsType(name, alias) {

        this.dialogFormVisible = false,
          this.$refs.form.validate(valid => {
            if (valid) {
              //  alert("submit!");
              server.postMetricsType(name, alias).then(res => {
                // debugger
                this.getMetricsType(this.search);
                this.form.name = "";
                this.form.alias = "";
              });
            } else {
              alert("不允许提交空白表单!请完整填写弹框信息！");
              return false;
            }
          });
      },
      // 新增指标维度
      createMetricsDimension(name, alias) {
        this.dialogFormVisible = false,
          this.$refs.form.validate(valid => {
            if (valid) {
              // alert("submit!");
              server.postMetricsDimension(name, alias).then(res => {
                this.getMetricsDimension(this.search);
                this.form.name = "";
                this.form.alias = "";
              });
            } else {
              alert("不允许提交空白表单!请完整填写弹框信息！");
              return false;
            }
          });
      },

      // 修改指标类型
      changeMetricsType(name, alias, typeId) {
        (this.dialogFormVisible = false),
        server.putMetricsType(name, alias, typeId).then(res => {
          // console.info(res)
          // this.metricsTypeData.push({name,alias,founder:"houtt",createTime:"20181022" ,typeId:"3"});
          // this.metricsTypeData=res
          this.getMetricsType(this.search);
          this.form.name = "";
          this.form.alias = "";
          alert("已成功修改指标类型！");
        });
      },
      // 修改指标维度
      changeMetricsDimension(name, alias, dimensionId) {
        (this.dialogFormVisible = false),
        server.putMetricsDimension(name, alias, dimensionId).then(res => {
          // console.info(res)
          // this.metricsTypeData.push({name,alias,founder:"houtt",createTime:"20181022" ,typeId:"3"});
          // this.metricsTypeData=res
          this.getMetricsDimension(this.search);
          this.form.name = "";
          this.form.alias = "";
          alert("已成功指标维度！");
        });
      },
      deleteMetricsType(ids, index) {
        //alert("确定删除该指标类型？？？");
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          server.deleteMetricsType(ids).then(res => {
            console.info("ids");
            this.currentPage1 = 1;
            this.getMetricsType(this.search);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        // this.metricsTypeData.splice(index,1);
      },
      deleteMetricsDimension(ids, index) {
        //alert("确定删除该指标类型？？？");
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          server.deleteMetricsDimension(ids).then(res => {
            console.info("ids");
            this.currentPage2 = 1;
            this.getMetricsDimension(this.search);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      updateTable(name, alias, touch_button) {

        if (touch_button === "add_type_id") {

          this.createMetricsType(name, alias);
        } else if (touch_button === "add_dimension_id") {
          this.createMetricsDimension(name, alias);
        } else if (touch_button === "change_type_id") {
          this.changeMetricsType(name, alias, this.currentId);
        } else {
          this.changeMetricsDimension(name, alias, this.currentId);
        }
      },
      handleSelectionChange(flag, val) {
        if (flag === "type") {
          this.multipleSelectionIds = val.map(item => item.typeId).join(",");
        } else if (flag === "dimension") {
          this.multipleSelectionIds = val.map(item => item.dimensionId).join(",");
        }
        console.info(this.multipleSelectionIds);
      }



    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    padding: 10px;

    .block {
      margin: 20px 0 12px 0;
    }
  }
</style>