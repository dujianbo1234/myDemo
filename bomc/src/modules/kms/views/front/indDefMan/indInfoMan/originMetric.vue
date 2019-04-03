<template>
  <div class="cont">
    <div>
      <el-dialog
        :close-on-click-modal="false"
        :visible="excelVisible"
        top="5vh"
        width="400px "
        @close="excelClosed()"
      >
        <div class="details-title">
          <span class="sp">
            <span>数据备份</span>
          </span>
          <div class="logAdd-obj-name">
            <template>
              <el-radio
                v-model="radio"
                label="1"
                style="display:block;margin-top: 10px;"
                @change="allexcel()"
              >选定数据备份(共计{{this.selectionData.length}}条)</el-radio>
              <el-radio
                v-model="radio"
                label="2"
                style="display:block;margin: 0; margin-top: 10px;"
                @change="allexcel()"
              >全部备份(共计{{this.dataCount}}条)</el-radio>
            </template>
            <div class="BF">
              <span class="sp" style="margin-top: 50px;">
                <span>备份位置</span>
              </span>
            </div>
            <div class="logAdd-obj">
              <div style="display:flex">
                <span style="width: 100px;line-height: 36px;">备份到本地:</span>
                <el-input label="备份到本地" placeholder="请选择文件备份" class="el-icon-ump-addition"></el-input>
                <img
                  src="../../../../../../assets/images/files.png"
                  @click="exportExcels()"
                  style="width: 35px;position: absolute;right: 30px;bottom: 58px;"
                >
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
   <div>
     <el-dialog
        :close-on-click-modal="false"
        :visible="sucVisible"
        top="5vh"
        :width="widthDialog"
        @close="sucClosed()"
      >
                  <!-- this.$message({
        type: type,
        message:
          "数据备份结果:共" +
          res.total +
          "条;成功:" +
          res.success +
          "条;失败:" +
          (res.total - res.success) +
          "条"
      }); -->
       <div class="details-title">
        <span class="sp">
            <span>数据恢复结果</span>
          </span>
          <div class="logAdd-obj-name">
            <span>恢复数据:共{{this.totalData}}条;成功:{{this.successData}}条;失败:{{this.totalData-this.successData}}条</span>
            <span  class="sp" style="margin-left: 15px" @click="ErrordataList()">恢复数据失败详情</span>
            <template>
              <el-table
                :header-cell-style="headStyle"
                :data="detailData"
                style="margin-top: 25px;"
                v-show="showT"
                height="300"
                >
                <el-table-column
                  prop="key"
                  label="指标名">
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="错误详情">
                </el-table-column>
              </el-table>
            </template>
            <span v-show="succes" style="display:block;margin-top: 20px;text-align: center;">无</span>
        </div>
       </div>
     </el-dialog>
   </div>
    <div class="RightRow">
      <el-card>
        <el-form :inline="true" label-position="right"  size="small">
          <el-form-item label="指标名称" width="33.3%" style="margin-right: 15px;">
            <el-input
             style="width: 260px;"
              v-model="search.name"
              placeholder="请输入指标名称"
              @keyup.enter.native="queryMetricsDef(search)"
            ></el-input>
          </el-form-item>
          <el-form-item label="指标编码"  width="33.3%">
            <el-select
              style="width: 260px;"
              v-model="search.code"
              filterable
              :filter-method="dataFilter"
              default-first-option
              placeholder="请选择编码"
            >
              <el-option
                v-for="item in codeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item  width="33.3%">
            <el-button
              size="small"
              class="search_btn"
              @click="queryMetricsDef(search)"
              style="margin-left:10px;"
            >查询</el-button>
            <el-button size="small" class="opt_btn" @click.stop="reset">重置</el-button>
            <i class="iconfont step_btn" @click="showTime()">&#xe619;</i>
            <el-popover placement="bottom" width="400" trigger="click">
              <template>
                <div></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox label="指标名" disabled></el-checkbox>
                  <el-checkbox label="指标别名" disabled></el-checkbox>
                  <el-checkbox label="指标编码" disabled></el-checkbox>
                  <el-checkbox label="指标类型" style="margin-left:0"></el-checkbox>
                  <el-checkbox label="所属资源类型" style></el-checkbox>
                  <el-checkbox label="频率"></el-checkbox>
                  <el-checkbox label="指标维度"></el-checkbox>
                </el-checkbox-group>
              </template>
              <i class="iconfont step_btn" slot="reference">&#xe615;</i>
            </el-popover>
          </el-form-item>
        </el-form>
        <el-form :inline="true" label-position="right"  size="small">
          <el-form-item label="资源类型" v-show="oneShow"  width="50%" style="margin-right: 15px;">
            <el-cascader
              v-model="search.resourceType"
              :options="treeData"
              style="width:260px"
              placeholder="请选择资源类型"
            />
          </el-form-item>
          <el-form-item label="指标标签" v-show="oneShow"  width="50%">
            <el-select
             style="width: 260px;"
              v-model="search.tags"
              filterable
              :filter-method="tagsFilter"
              default-first-option
              placeholder="请选择标签"
            >
              <el-option v-for="tag in listData" :key="tag" :value="tag"/>
            </el-select>
          </el-form-item>
          <el-form-item label="指标别名" v-show="oneShow"  width="100%%" style="display: block;">
            <el-input
              style="width: 260px;"
              v-model="search.alias"
              placeholder="请输入指标别名"
              @keyup.enter.native="queryMetricsDef(search)"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="RightRow">
      <el-card>
        <div class="buttonItem">
          <el-button size="small" class="search_btn" @click="addDialog()">新增指标</el-button>
          <el-button
            :disabled="multipleSelectionNames===''"
            class="opt_btn del_btn"
            @click="deleteConfirm(multipleSelectionNames, canIdelete)"
          >批量删除</el-button>
          <el-button
            class="opt_btn start_btn"
            :disabled="multipleSelectionNames===''&&multipleSelectionStatus==0&&multipleSelectionStatus==1"
            @click="startConfirm(multipleSelectionStatus,multipleSelectionNames)"
          >批量启用</el-button>
          <el-button
            class="opt_btn del_btn"
            :disabled="multipleSelectionNames===''"
            @click="stopConfirm(multipleSelectionStatus,multipleSelectionNames)"
          >批量停止</el-button>
          <el-button plain class="opt_btn" @click.stop="exportExcel()">数据备份</el-button>
          <el-upload
            class="upload-demo"
            ref="upload"
            multiple
            :action="importUrl"
            :on-success="handleSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :headers="headers"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-tooltip class="item" effect="dark" content="请导入已备份的文件" placement="top">
              <el-button size="small" plain class="opt_btn" style="padding: 10px 20px;">数据恢复</el-button>
            </el-tooltip>
          </el-upload>
        </div>
        <el-table
          ref="multipleTable"
          :data="metricsDefData"
          :fit="true"
          tooltip-effect="dark"
          :header-cell-style="headStyle"
          style="width: 100%;"
          align="center"
          @selection-change="handleSelectionChange($event)"
          @row-dblclick="createDetail"
        >
          <el-table-column type="selection" width="50" align="center"/>
          <!-- <el-table-column prop="metricId" label="序号" /> -->
          <el-table-column prop="name" label="指标名" v-if="oneshow" align="center"/>
          <el-table-column prop="alias" label="指标别名" v-if="twoshow" align="center"/>
          <el-table-column prop="metricType" label="指标类型" v-if="fourshow" align="center"/>
          <el-table-column prop="code" label="指标编码" v-if="thirdshow" align="center"/>
          <el-table-column
            prop="resourceType"
            label="所属资源类型"
            width="200"
            v-if="fiveshow"
            align="center"
          />
          <el-table-column prop="metricDimension" label="指标维度" v-if="sevenshow" align="center"/>
          <el-table-column label="频率/s" v-if="sixshow" align="center">
            <template slot-scope="scope">{{ scope.row.frequency+'s' }}</template>
          </el-table-column>
          <el-table-column width="100" label="状态" align="center">
            <!-- <template slot-scope="scope"> -->
            <!-- {{ scope.row.status }} -->
            <!-- <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                @change="operate(scope.$index,scope.row.status)"
                >
            </el-switch>-->
            <!-- </template> -->
            <template slot-scope="scope">
              <div v-if="scope.row.status==1">
                <img :src="runImg" title="运行中" alt="运行中" content="运行中" placement="top">
              </div>
              <div v-if="scope.row.status==2">
                <img :src="stopImg" title="同步任务异常" alt="同步任务异常" content="异同步任务异常常" placement="top">
              </div>
              <div v-if="scope.row.status==3">
                <img :src="stopImg" title="聚合任务异常" alt="聚合任务异常" content="聚合任务异常" placement="top">
              </div>
              <div v-if="scope.row.status==4">
                <img :src="stopImg" title="停止中" alt="停止中" content="停止中" placement="top">
              </div>
              <div v-if="scope.row.status==0">
                <img :src="waitImg" title="未启动" alt="未启动" content="未启动" placement="top">
              </div>
            </template>
          </el-table-column>
          <el-table-column label="任务操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status==1"
                el-button
                type="text"
                size="small"
                @click.stop="optTask('start',scope.row.status,scope.$index)"
              >
                <!-- <img :src="runImg" alt="启动"> -->
                <el-tooltip content="停止" placement="top" effect="light" class="item">
                  <span class="iconfont" style="color: rgba(95,195,150,1);outline:none">&#xe60a;</span>
                </el-tooltip>
              </el-button>
              <el-button
                v-if="scope.row.status==0"
                el-button
                type="text"
                size="small"
                @click.stop="optTask('stop',scope.row.status,scope.$index)"
              >
                <!-- <img :src="stopImg" alt="停止"> -->
                <el-tooltip class="item" effect="light" content="启动" placement="top">
                  <span class="iconfont" style="color: rgba(95,195,150,1);outline:none">&#xe603;</span>
                </el-tooltip>
              </el-button>
              <el-button
                v-if="scope.row.status!==1&&scope.row.status!==0"
                el-button
                type="text"
                size="small"
                @click.stop="optTask('wait',scope.row.status,scope.$index)"
              >
                <!-- <img :src="stopImg" alt="停止"> -->
                <el-tooltip class="item" effect="light" content="停止" placement="top">
                  <span class="iconfont" style="color: rgba(95,195,150,1);outline:none">&#xe60a;</span>
                </el-tooltip>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="编辑操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                class="table_btn"
                size="small"
                @click.stop="putMetricsDefData(scope.$index)"
              >修改</el-button>
              <el-button
                type="text"
                class="table_btn"
                size="small"
                @click.stop="deleteConfirm(scope.row.name,scope.row.status)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          :total="dataCount"
          align="right"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-card>
      <create-original-dialog
        :outer-visible="outerVisible"
        :update-type="updateType"
        :outer-data="outerData"
        :code-options="codeOptions"
        :code-map="codeMap"
        @closedEvent="handleClose"
        v-on:send="getCodes"
      />
      <create-details-dialog
        :details-visible="detailsVisible"
        :update-type="updateType"
        :code-options="codeOptions"
        :code-map="codeMap"
        @closedEvent="handleCloseNo"
        :outer-data="outerData"
      />
      <!-- <import-Excel-Dialog
          :excel-visible="excelVisible"
          :update-type="updateType"
          @closedEvent="handleClose"
          :outer-data="outerData"
      />-->

      <indInfo-Details-Dialog
        :indinfo-visible="indinfoVisible"
        :update-type="updateType"
        :outer-data="outerData"
        :code-options="codeOptions"
        :code-map="codeMap"
        @closedEvent="handleCloseNo"
      />
    </div>
  </div>
</template>

<script>
import createOriginalDialog from "./createOriginalDialog";
//聚合详情
import indInfoDetailsDialog from "./indInfoDetailsDialog";
// 数据备份
import createDetailsDialog from "./createDetailsDialog";
import * as server from "../../../../api/kms";
import { defaultCoreCipherList } from "constants";
import request from "@/utils/request";
import { debug } from "util";
import { getToken } from "@/utils/auth";
import runImg from "@/assets/images/run.png";
import stopImg from "@/assets/images/stop.png";
import waitImg from "@/assets/images/waiting.png";

var _ = require("lodash");
export default {
  name: "IndInfo",
  components: {
    createOriginalDialog,
    createDetailsDialog,
    indInfoDetailsDialog
  },
  data() {
    return {
      showT:false,
      succes:false,
      widthDialog:'400px',
      totalData:"",
      successData:"",
      detailData:[],
      radio: "1",
      runImg: runImg,
      stopImg: stopImg,
      waitImg: waitImg,
      // 显示隐藏
      oneShow: false,
      // 下拉绑定table
      checkedCities: [
        "指标名",
        "指标别名",
        "指标编码",
        "指标类型",
        "所属资源类型",
        "频率",
        "指标维度"
      ],
      oneshow: true,
      twoshow: true,
      thirdshow: true,
      fourshow: true,
      fiveshow: true,
      sixshow: true,
      sevenshow: false,
      //表格头部
      headStyle: {
        "background-color": "#F4F8F9",
        color: "rgba(0,0,0,0.60)"
      },
      importUrl: "",
      // 指标查询表单
      search: {
        name: "",
        alias: "",
        metricType: "",
        code: "",
        calcType: 0,
        tags: "",
        resourceType: []
      },
      //导入
      resourceName: "",
      codeMap: {},
      selectionData: [],
      isUp: true, // 是否启用
      selected: null,
      currentPage: 1,
      pageSize: 5,
      dataCount: 0,
      sucVisible:false,
      outerVisible: false,
      detailsVisible: false,
      excelVisible: false,
      indinfoVisible: false,
      updateType: "create",
      codeOptions: [],
      listData: [],
      metricTypeOpt: [],
      formLabelWidth: "120px",
      metricsDefData: [],
      outerData: {},
      multipleSelectionIds: "",
      multipleSelectionNames: "",
      canIdelete: 1,
      multipleSelectionStatus: "",
      metricTypeMap: {},
      calcTypeMap: new Map()
    };
  },
  watch: {
    metricsDefData: {
      handler(newValue, oldValue) {
        console.log(newValue);
      },
      deep: true
    },
    pageSize(current, last) {
      this.getMetricsDef();
    }
  },
  computed: {
    headers: function() {
      // `this` 指向 vm 实例
      const datas = {
        "X-Token": getToken()
      };
      return datas;
    },
    treeData() {
      return this.$store.state.resourceManagement.treeData;
    }
  },
  created() {
    this.showTagList();
    this.getMetricsDef();
    this.getCodes({
      model: "MetricsDef",
      params: "code",
      // value: "0",
      keys: "calcType"
    });
    this.addMetricsDef();
    // this.getMetricType()
    this.getMetricTypeOpt();
    this.importUrl = "/kms/api/v1/metricsDef/importExcel";
  },
  mounted() {},
  methods: {
    //下拉搜索
    dataFilter(val) {
      if (val) {
        //val存在
        this.search.code = val;
      } else {
        //val为空时，还原数组
        this.queryMetricsDef();
      }
    },
    //下拉搜索
    tagsFilter(val) {
      if (val) {
        //val存在
        this.search.tags = val;
      } else {
        //val为空时，还原数组
        this.queryMetricsDef();
      }
    },
    //标签
    allexcel() {
      if (this.radio == 2) {
        this.$confirm("此操作将全部备份, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
      }
    },

    showTagList() {
      server.tagList().then(res => {
        this.listData = [];
        this.listvisible = true;
        res.forEach(e => {
          this.listData.push(Object.values(e)[0]);
        });
      });
    },
    //任务操作
    optTask(type, value, index) {
      if (type == "stop" && value == 0&&value!==4) {
        this.$confirm("此操作将启用, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var metricsDefData = this.metricsDefData[index];
            // metricsDefData.trigger.normalStrategy.ciid = "";
            var table = [metricsDefData];
            server.putMetricsDefs(table).then(
              res => {
                this.$message({
                  showClose: true,
                  message: this.metricsDefData[index].name + "已开启",
                  type: "success"
                });
                console.log(res);
                this.getMetricsDef();
              },
              error => {
                console.error("请求异常！" + error);
                this.$message({
                  showClose: true,
                  message: "指标正在启动中!请稍后刷新页面查看启动状态!",
                  type: "info"
                });
              }
            );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消启动"
            });
          });
      } else {
      }
      if (type == "start" && value == 1) {
        this.$confirm("此操作将停止, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var metricsDefData = this.metricsDefData[index];
            // metricsDefData.trigger.normalStrategy.ciid = "";
            var table = [metricsDefData];
            server.putMetricsDefUpdate(table).then(
              res => {
                this.$message({
                  showClose: true,
                  message: this.metricsDefData[index].name + "已停止",
                  type: "success"
                });
                this.getMetricsDef();
              },
              error => {
                console.error("请求异常！" + error);
                this.$message({
                  showClose: true,
                  message: "停止失败！",
                  type: "error"
                });
              }
            );

            // 请求
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消停止"
            });
          });
      }
      if (type == "wait" && value !== 1 && value !== 0&& value !== 4) {
        this.$confirm("此操作将停止, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnClickModal: false
        })
          .then(() => {
            var metricsDefData = this.metricsDefData[index];
            // metricsDefData.trigger.normalStrategy.ciid = "";
            var table = [metricsDefData];
            server.putMetricsDefUpdate(table).then(
              res => {
                this.$message({
                  showClose: true,
                  message: this.metricsDefData[index].name + "已停止",
                  type: "success"
                });
                this.getMetricsDef();
              },
              error => {
                console.error("请求异常！" + error);
                this.$message({
                  showClose: true,
                  message: "停止失败！",
                  type: "error"
                });
              }
            );
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消停止"
            });
          });
      }
      if(type == "wait" && value == 4){
         this.$message({
          showClose: true,
          message: "请刷新页面后再操作",
          type: "error"
        });
      }
    },
    //显示隐藏
    showTime() {
      this.oneShow = !this.oneShow;
    },
    //  下拉绑定table
    handleCheckedCitiesChange(value) {
      var a = [];
      for (var i = 0; i < value.length; i++) {
        a.push(value[i]);
      }
      if (a.indexOf("指标名") == -1) {
        this.oneshow = false;
      } else {
        this.oneshow = true;
      }
      if (a.indexOf("指标别名") == -1) {
        this.twoshow = false;
      } else {
        this.twoshow = true;
      }
      if (a.indexOf("指标编码") == -1) {
        this.thirdshow = false;
      } else {
        this.thirdshow = true;
      }
      if (a.indexOf("指标类型") == -1) {
        this.fourshow = false;
      } else {
        this.fourshow = true;
      }
      if (a.indexOf("所属资源类型") == -1) {
        this.fiveshow = false;
      } else {
        this.fiveshow = true;
      }
      if (a.indexOf("频率") == -1) {
        this.sixshow = false;
      } else {
        this.sixshow = true;
      }
      if (a.indexOf("指标维度") == -1) {
        this.sevenshow = false;
      } else {
        this.sevenshow = true;
      }
    },

    addMetricsDef() {
      const params = {
        params: "code,resourceType",
        model: "MetricsDef"
      };
      server.getCodes(params).then(res => {
        this.codeOptions = _.uniqWith(
          res.datas.MetricsDef.map(item => {
            return {
              value: item.code,
              label: item.code
            };
          }),
          _.isEqual
        );
        this.codeMap = {};
        _.uniqWith(
          res.datas.MetricsDef.map(item => {
            this.codeMap[item.code] = item.resourceType;
          }),
          _.isEqual
        );
      });
    },
    addDialog() {
      this.updateType = "create";
      this.addMetricsDef();
      (this.outerVisible = true), (this.outerData = {});
    },
    //导出
    exportExcels() {
      if (this.radio == 1) {
        console.log(this.multipleSelectionNames);
        if (this.multipleSelectionNames == "") {
          this.$message({
            showClose: true,
            message: "请先勾选数据再操作！",
            type: "error"
          });
          this.excelClosed();
        } else {
          const params = {
            isWhole: false,
            expertNames: this.multipleSelectionNames
          };
          server
            .exportExcel(params)
            .then(res => {
              let url = window.URL.createObjectURL(new Blob([res]));
              let link = document.createElement("a");
              link.style.display = "none";
              link.href = url;
              link.setAttribute("download", "metrics.xlsx");
              document.body.appendChild(link);
              link.click();
              this.excelClosed();
              this.getMetricsDef();
            })
            .catch(error => {
              console.log(error);
            });
        }
      } else {
        const params = {
          isWhole: true
        };
        server
          .exportExcel(params)
          .then(res => {
            let url = window.URL.createObjectURL(new Blob([res]));
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", "metrics.xlsx");
            document.body.appendChild(link);
            link.click();
            this.excelClosed();
            this.getMetricsDef();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    exportExcel() {
      if (this.detailsVisible) {
        return;
      }
      this.excelVisible = true;
      this.updateType = "create";
    },

    ormatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    formatJsonAll(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            // return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },

    //导入
    beforeUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "xls";
      const extension2 = testmsg === "xlsx";
      if (!extension && !extension2) {
        this.$message({
          message: "请导入xls、xlsx格式的文件!",
          type: "warning"
        });
      }
      return extension || extension2;
    },
    uploadText() {
      this.$confirm("只能恢复备份的文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.handleRemove();
          this.handlePreview();
          this.handleSuccess();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消恢复"
          });
        });
    },
    // 关闭弹窗
    dialogClosed() {
      this.flag = true;
      this.$emit("closedEvent", false);
    },
    excelClosed() {
      this.excelVisible = false;
      this.radio = "1";
      this.$emit("closedEvent", false);
    },
    sucClosed(){
      this.sucVisible = false;
      this.showT=false
      this.succes=false
      this.widthDialog='400px'
      this.$emit("closedEvent", false);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(res, file, fileList) {
      let type = "success";
      if (res.name) {
        type = "error";
        name = res.name;
      } 
      this.totalData=res.total
      this.successData=res.success
      // let details={}
      //    details=res.detail
      // var detailkey= Object.keys(details)
      // var detailvalue= Object.values(details)
      // let detailData=[]
      // for(let i=0;i<details.length;i++){
      //   detailData.push({key:detailkey[i],value:detailvalue[i]})
      // }
      // this.detailData=detailData
      // console.log(this.detailData)
      let arr=res.detail
      let arr1=Object.keys(arr);
      let arr2=Object.values(arr);
      let arr3=[]
      for(let i=0;i<arr1.length;i++){
        arr3.push({key:arr1[i],value:arr2[i]})
      }
      this.detailData=arr3
      console.log(this.detailData)
      this.sucVisible=true
      this.getCodes();
      this.getMetricsDef();
      this.$emit("closedEvent", false);
      this.$refs.upload.clearFiles();
    },
    ErrordataList(){
     if(this.totalData!=this.successData){
       this.showT=true
       this.succes=false
       this.widthDialog='600px'
       this.sucVisible.style
     }else{
      this.showT=false
      this.succes=true
      this.widthDialog='400px'
     }
    },
    getMetricsDef() {
      var params = {};
       var value =
        this.search.name +
        "," +
        this.search.alias +
        "," +
         this.search.metricType +
        "," +
         this.search.code +
        "," +
         this.search.tags +
        "," +
        `${this.resourceName}`;

      params["keys"] = "name,alias,metricType,code,tags,resourceType",
      params["value"] = value,
      params["search"] = true;
      params["limit"] = this.pageSize;
      params["start"] = this.pageSize * (this.currentPage - 1) + 1;
      params["sortfield"] = "createTime";
      params["sortorder"] = "DESC";

      server.queryMetricsDef(params).then(
        res => {
          this.dataCount = res.count;
          this.metricsDefData = res.metricsData;
          console.log(this.metricsDefData);
        },
        error => {
          console.error("请求异常！" + error);
        }
      );
    },

    getCodes() {
      const params = {
        model: "MetricsDef",
        params: "code",
        value: "0",
        keys: "calcType"
      };
      server.getCodes(params).then(res => {
        this.codeOptions = _.uniqWith(
          res.datas.MetricsDef.map(item => {
            return {
              value: item.code,
              label: item.code
            };
          }),
          _.isEqual
        );
        console.info(JSON.stringify(this.codeOptions));
      });
    },
    handleClose(closed) {
      // console.info('yes' + closed)
      this.outerVisible = closed;
      this.excelVisible = closed;
      this.getMetricsDef();
    },
    handleCloseNo(closed) {
      this.indinfoVisible = closed;
      this.detailsVisible = closed;
    },
    queryMetricsDef(search) {
      if (search.resourceType != "" && search.resourceType != undefined) {
        this.resourceName = search.resourceType.join(".");
      } else {
        this.resourceName = "";
      }
      const reg = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
      );
      if (reg.test(this.search.name)) {
        this.$message.warning("模板名称请勿输入特殊字符！");
        return;
      }
      const regs = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
      );
      if (regs.test(this.search.alias)) {
        this.$message.warning("模板名称请勿输入特殊字符！");
        return;
      }
      String.prototype.trim = function() {
        // 用正则表达式将前后空格
        // 用空字符串替代。
        return this.replace(/(^\s*)|(\s*$)/g, "");
      };
      this.search.name = this.search.name.trim();
      this.search.alias = this.search.alias.trim();
      var value =
        search.name +
        "," +
        search.alias +
        "," +
        search.metricType +
        "," +
        search.code +
        "," +
        search.tags +
        "," +
        `${this.resourceName}`;
      const params = {};
      // for (const item in search) {
      // if (search.hasOwnProperty(item) && search[item] !== '') {
      //   params[item] = search[item]
      // }
      // }
      // if((this.dataCount- (this.pageSize * (this.currentPage - 1) + 1)>=5)){
      //   params["limit"] = this.pageSize;
      // }else{
      //   params["limit"] =1
      // }
      params["keys"] = "name,alias,metricType,code,tags,resourceType",
      params["value"] = value,
      params["limit"] = this.pageSize;
      params["start"] = this.pageSize * (this.currentPage - 1) + 1;
      // params["calcType"] = 0;
      params["search"] = true;
      params["sortfield"] = "createTime";
      params["sortorder"] = "DESC";
      server.queryMetricsDef(params).then(
        res => {
          this.metricsDefData = res.metricsData;
          this.dataCount = res.count;
          this.currentPage = 1;
          if (res === "") this.metricsDefData = [];
        },
        error => {
          console.error("请求异常！" + error);
        }
      );
    },
    putMetricsDefData(index) {
      console.log(this.outerData);
      this.outerData = this.metricsDefData[index];
      if (this.outerData.status!= 0) {
        this.$message({
          showClose: true,
          message: "该任务已启动，请停止后再操作！",
          type: "error"
        });
      } else {
        this.outerVisible = true;
        this.updateType = "update";
      }
    },
    createDetail(row) {
      if (row.calcType == 0) {
        this.detailsVisible = true;
        this.updateType = "update";
      } else {
        this.indinfoVisible = true;
        this.updateType = "update";
      }
      this.outerData = row;
    },
    /**
     * 任务操作
     * @param index
     * @param status
     */
    //开启关闭(单)
    operate(index, status) {
      var metricsDefData = this.metricsDefData[index];
      if (status === 1) {
        //开启
        this.$confirm("此操作将开启, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            metricsDefData.status = 0;
            // metricsDefData.trigger.normalStrategy.ciid = "";
            var table = [metricsDefData];
            server.putMetricsDefs(table).then(
              res => {
                this.$message({
                  showClose: true,
                  message: this.metricsDefData[index].name + "已开启",
                  type: "success"
                });
              },
              error => {
                console.error("请求异常！" + error);
                this.$message({
                  showClose: true,
                  message: "开启失败！",
                  type: "error"
                });
              }
            );
            this.getMetricsDef();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消开启"
            });
          });
      }
      if (status === 0) {
        //停止
        this.$confirm("此操作将关闭, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            metricsDefData.status = 1;
            // metricsDefData.trigger.normalStrategy.ciid = "";
            var table = [metricsDefData];
            server.putMetricsDefUpdate(data).then(
              res => {
                this.$message({
                  showClose: true,
                  message: this.metricsDefData[index].name + "已关闭",
                  type: "success"
                });
              },
              error => {
                console.error("请求异常！" + error);
                this.$message({
                  showClose: true,
                  message: "关闭失败！",
                  type: "error"
                });
              }
            );
            this.getMetricsDef();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消关闭"
            });
          });
      }
    },

    //批量开启
    startConfirm(status, name) {
      var selectionData = this.selectionData;
      this.selectionData.forEach((item, index) => {
        status = item.status;
      });
      if (status == 1||status == 0) {
        this.$confirm("此操作将启用, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var selectionData = this.selectionData;
            var data = selectionData;
            server.startMetricsDefData(data).then(
              res => {
                this.$message({
                  showClose: true,
                  message: "启用成功！",
                  type: "success"
                });
                this.getMetricsDef();
              },
              error => {
                console.error("请求异常！" + error);
                this.$message({
                  showClose: true,
                  message: "指标正在启动中!请稍后刷新页面查看启动状态!",
                  type: "info"
                });
              }
            );
            this.getMetricsDef();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消启用"
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "任务异常状态！请勿再操作！",
          type: "error"
        });
      }
    },
    //批量关闭
    stopConfirm(status, name) {
      var selectionData = this.selectionData;
      this.selectionData.forEach((item, index) => {
        status = item.status;
      });
      if (status==1||status==2||status==3) {
        this.$confirm("此操作将停止, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var selectionData = this.selectionData;
            var data = selectionData;
            server.stopMetricsDefData(data).then(
              res => {
                this.$message({
                  showClose: true,
                  message: "停止成功！",
                  type: "success"
                });
                this.getMetricsDef();
              },
              error => {
                console.error("请求异常！" + error);
                this.$message({
                  showClose: true,
                  message: "停止失败！",
                  type: "error"
                });
              }
            );
            this.getMetricsDef();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消停止"
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "任务异常状态！请勿再操作！",
          type: "error"
        });
      }
    },

    // 禁止详情弹窗显示
    reset() {
      this.search = {
        name: "",
        alias: "",
        metricType: "",
        code: "",
        calcType: 0,
        tags: "",
        resourceType: []
      };
    },
    getMetricType() {
      server.getMetricsType().then(
        res => {
          const data = res.metricsData;
          this.metricTypeMap = {};
          data.forEach(item => {
            this.metricTypeMap[item.typeId] = item.alias;
            // return { value: item.typeId, label: item.alias }
          });
          console.info(this.metricTypeMap);
          // const metricsTypeData = res
        } // 查询
      );
    },
    handleSelectionChange(val) {
      this.selectionData = val;
      this.exportExcelData = val;
      this.multipleSelectionIds = val.map(item => item.metricId).join(",");
      this.multipleSelectionNames = val.map(item => item.name).join(",");
      this.multipleSelectionStatus = val.map(item => item.status).join(",");
      this.canIdelete = 0;
      val.forEach(item => {
        if (item.status !== 0) {
          this.canIdelete = 1;
          return;
        }
      });
    },
    formatterStatus(row, column) {
      var val = "未启动";
      switch (row.status) {
        case 0:
          val = "未启动";
          break;
        case 1:
          val = "运行中";
          break;
        case 2:
          val = "暂停";
          break;
        case 3:
          val = "重分配";
          break;
        case 4:
          val = "停止";
          break;
      }
      return val;
    },
    formatterCalcType(row, column) {
      var val = "未知类型";
      switch (row.calcType) {
        case 0:
          val = "原始指标";
          break;
        case 1:
          val = "聚合指标";
          break;
      }
      return val;
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log("currentChangge", val);
      this.currentPage = val;
      this.getMetricsDef();
    },
    formatterMetricType(row, column) {
      return this.metricTypeMap[row.metricType];
    },

    //删除
    deleteConfirm(name, canIdelete) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteMetricsDefData(name, canIdelete);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //批量删除
    deleteMetricsDefData(name, canIdelete) {
      if (canIdelete == 0 || canIdelete == 4) {
        const params = {
          name: name
          // metricStatus: 0,
        };
        server.deleteMetricsDefData(params).then(
          res => {
            this.getMetricsDef();
            // this.metricsTypeData.splice(index, 1)
            this.$message({
              showClose: true,
              message: "删除成功！",
              type: "success"
            });
            this.getCodes();
            this.handleCurrentChange(1);
            this.showTagList();
          },
          error => {
            console.error("请求异常！" + error);
            this.$message({
              showClose: true,
              message: "删除失败！",
              type: "error"
            });
          }
        );
      } else {
        this.$message({
          showClose: true,
          message: "任务已开启！请关闭后再操作！",
          type: "error"
        });
      }
    },

    getMetricTypeOpt() {
      server.getMetricsType().then(
        res => {
          const data = res.metricsData;
          this.metricTypeOpt = _.uniqBy(
            data.map(item => {
              return {
                value: item.alias,
                label: item.alias
              };
            }),
            "value"
          );
        },
        error => {
          // console.error("请求异常！" + error);
        }
      );
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-checkbox + .el-checkbox {
  width: 186px;
  margin: 0;
}
// UI的需求

.RightRow {
  height: auto;
  margin: 10px 0 20px;
  border-radius: 5px;
}
.search_btn {
  background: #42b983;
  border: 1px solid #42b983;
  color: #ffffff;
  font-size: 14px;
  &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
}
.search_b {
  background: #42b983;
  border: 1px solid #42b983;
  color: #ffffff;
  font-size: 14px;
  &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
}
.table_btn {
  color: rgba(66, 185, 131, 1);
  font-size: 14px;
}
.step_btn {
  background: rgba(66, 185, 131, 0.4);
  border: 1px solid #42b983;
  color: rgba(66, 185, 131, 1);
  cursor: pointer;
  margin-left: 8px;
  border-radius: 3px;
  padding: 8px 11px;
  &:hover {
    background: rgba(66, 185, 131, 0.2);
  }
}
.opt_btn {
  background: #f4f8f9;
  color: rgba(0, 0, 0, 0.7);
  margin-left: 8px;
  font-size: 14px;
  border: none;
  height: 34px;
  &:hover {
    background: #42b983;
    border-color: #42b983;
    color: #fff;
  }
}
.del_btn {
  &:hover {
    background: #fa5555;
    border-color: #fa5555;
    color: #fff;
  }
}
.start_btn {
  &:hover {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
}
.cont {
  .buttonItem {
    margin-bottom: 20px;
  }
  .buttonItem .upload-demo {
    display: inline-block;
  }

  .block {
    margin-top: 12px;
  }

  .RightRow {
    height: auto;
    margin: 10px 0 20px;
    border-radius: 5px;
  }
}
.el-form-item {
  margin: 10px 0;
}
.el-table {
  border-collapse: collapse;
  border-spacing: 0;
  text-align: center;
}
</style>

