<template>
  <div style="background-color:white" class="a">
    <el-row :gutter="20" class>
      <el-form :inline="true" :model="search">
        <el-form-item label="指标名称">
          <el-input
            v-model="search.name"
            placeholder="指标名称"
            @keyup.enter.native="queryMetricsDef(search)"
          />
        </el-form-item>
        <el-form-item label="指标别名">
          <el-input
            v-model="search.alias"
            placeholder="指标别名"
            @keyup.enter.native="queryMetricsDef(search)"
          />
        </el-form-item>
        <!-- <el-form-item>
          <el-select id="indicatorType" v-model="search.metricType" placeholder="指标类型">
            <el-option
              v-for="item in metricTypeOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item label="指标编码">
          <el-select v-model="search.code" filterable default-first-option placeholder="请选择编码">
            <el-option
              v-for="item in codeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
            <el-button size="small" class="search_btn" @click="queryMetricsDef(search)" style="margin-left:10px;">查询</el-button>
            <el-button size="small" class="opt_btn"    @click.stop="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="btnInfo">
      <el-col>
        <el-button
          type="primary"
          @click="add()"
        >新增指标</el-button>
        <!-- <el-button type="primary">修改指标</el-button> -->
        <el-button
          :disabled="multipleSelectionIds===''"
          type="danger"
          @click="deleteConfirm(multipleSelectionIds,canIdelete)"
        >批量删除</el-button>
        <el-button 
        type="warning"
        :disabled="multipleSelectionIds===''"
         @click="startConfirm(multipleSelectionIds,canIdelete)">批量启用
         </el-button>
         <el-button 
         type="info"
        :disabled="multipleSelectionIds===''"
         @click="stopConfirm(multipleSelectionIds,canIdelete)">批量停止
         </el-button>
        <!-- <el-button type="primary">批量启用</el-button>
        <el-button type="primary">批量停用</el-button>-->
       <el-upload
            class="upload-demo"
            ref="upload"
            :action="importUrl"
            :on-success="handleSuccess" 
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :headers="headers"
            :show-file-list="false"
            :before-upload="beforeUpload"
            >
            <el-tooltip class="item" effect="dark" content="请导出已备份的文件" placement="top">
                <el-button type="primary" plain size="small" style="position: absolute;right: 100px;padding: 9px 18px;top: 15px;">数据恢复</el-button>
            </el-tooltip>
        </el-upload>
         <el-button  @click="exportExcel()" type="primary" plain size="small" 
         style="position: absolute;right: 13px;top: 15px;">数据备份</el-button>
      </el-col>
    </el-row>
    <el-row class="block">
      <el-col :span="24">
        <el-table
          ref="multipleTable"
          :data="metricsDefData"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange($event)"
          @row-dblclick="indInfoDialog">
          <el-table-column type="selection" width="50"/>
          <el-table-column prop="name" label="指标名"/>
          <el-table-column prop="alias" label="指标别名"/>
          <el-table-column prop="metricType" label="指标类型"/>
          <el-table-column prop="code" label="指标编码"/>
          <el-table-column prop="resourceType" label="所属资源类型" width="120"/>
          <el-table-column label="聚合频率/s">
            <template slot-scope="scope">{{ scope.row.frequency+'s' }}</template>
          </el-table-column>
          <el-table-column :formatter="formatterStatus" prop="status" label="任务状态"/>
          <el-table-column  width="130" label="任务操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="启动" placement="top-start">
                <el-button
                  :disabled="scope.row.status ==1 || scope.row.status ==3"
                  type="text"
                  size="mini"
                  class="el-button-padding"
                  circle
                  @click="operate(scope.$index,1)">
                  <svg-icon icon-class="start" style="font-size:2em;"/>
                </el-button>
              </el-tooltip>
              <el-tooltip  class="item" effect="dark" content="停止" placement="top-start">
                <el-button
                  :disabled="scope.row.status == 4 || scope.row.status ==0  "
                  type="text"
                  size="mini"
                  class="el-button-padding"
                  circle
                  @click.stop="operate(scope.$index, 4)">
                  <svg-icon icon-class="black" style="font-size:2em"/>
                </el-button>
              </el-tooltip>
              <el-tooltip  class="item" effect="dark" content="重分配" placement="top-start">
                <el-button
                  :disabled="scope.row.status ==3  || scope.row.status ==0 ||scope.row.status ==4 "
                  type="text"
                  size="mini"
                  class="el-button-padding"
                  circle
                  @click.stop="operate(scope.$index,3)">
                  <svg-icon icon-class="balance" style="font-size:2em"/>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column  width="100" label="编辑操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                class=".el-button-padding"
                icon="el-icon-edit"
                circle
                @click.stop="putMetricsDefData(scope.$index)"
              >
              </el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                @click.stop="deleteConfirm(scope.row.metricId,scope.row.status)"
              >
              </el-button>
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
      </el-col>
    </el-row>
    <create-merge-dialog
      :outer-visible="outerVisible"
      :update-type="updateType"
      :outer-data="outerData"
      :code-options="codeOptions"
      :code-map="codeMap"
      @closedEvent="handleClose"
      v-on:send="getCode"
    />
    <indInfo-Details-Dialog
      :indinfo-visible="indinfoVisible"
      :update-type="updateType"
      :outer-data="outerData"
      :code-options="codeOptions"
      :code-map="codeMap"
      @closedEvent="handleClose"
    />
  </div>
</template>
<script>
import createMergeDialog from "./createMergeDialog";
import indInfoDetailsDialog from "./indInfoDetailsDialog";

import * as server from "../../../../api/kms";
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
var _ = require("lodash");
export default {
  name: "MergeMetric",
  components: {
    createMergeDialog,
    indInfoDetailsDialog,
  },
  data() {
    return {
            //导入
      selectionData:[],
      //恢复的url
         importUrl: '',
      // 指标查询表单
      search: {
        name:"",
        alias:"",
        metricType:"",
        code:"",
        calcType:1
      },
      currStatus:'',
      currIndex:'',
      metricTypeOpt: [],
      selected: null,
      currentPage: 1,
      pageSize: 5,
      dataCount: 0,
      excelVisible:false,
      outerVisible: false,
      indinfoVisible: false,
      updateType: "create",
      codeOptions: [],
      codeMap: {},
      formLabelWidth: "120px",
      metricsDefData: [],
      outerData: {},
      multipleSelectionIds: "",
      canIdelete: 1,
      metricTypeMap: {},
      calcTypeMap: new Map()
    };
  },
  watch: {
    metricsDefData: {
      handler(newValue, oldValue) {
        console.info(newValue);
      },
      deep: true
    },
    pageSize(current, last) {
      this.getMetricsDef();
    }
  },
  computed:{
    	headers: function() {
				// `this` 指向 vm 实例
				const datas = {
					'X-Token': getToken()
				}
				return datas
			}
  },
  created() {
    this.importUrl ='/kms/api/v1/metricsDef/importExcel';
    this.getMetricsDef();
    this.getCode({
      params: "code,resourceType",
      model: "MetricsDef",
      value: "1",
      keys:"calcType"
    });
    this.getMetricTypeOpt();
  },
  mounted() {},
  methods: {
    //导入
    beforeUpload(file) {
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)				
				const extension = testmsg === 'xls'
        const extension2 = testmsg === 'xlsx'
				if(!extension && !extension2) {
					this.$message({
						message: '请导入xls、xlsx格式的文件!',
						type: 'warning'
					});
				}
				return extension || extension2 
    },
     uploadText(){
      this.$confirm("只能恢复备份的文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        this.handleRemove()
        this.handlePreview()
        this.handleSuccess()
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
            this.flag = true
            this.$emit('closedEvent', false)
        },
      handleRemove(file, fileList) {
          // console.log(file, fileList);
        },
      handlePreview(file) {
          // console.log(file);
        },
      handleSuccess(res, file, fileList) {
        console.log(res)
        let type = 'success';
        let name = '导入成功'
        if (res.name) {
          type = 'error';
          name = res.name;
        }
        this.$message({
          type: type,
          message: "数据备份结果:共"+res.total+"条;成功:"+res.success+"条;失败:"+(res.total-res.success)+"条"
        });
        this.getCode()
        this.getMetricsDef();
        this.$emit('closedEvent', false)
        this.$refs.upload.clearFiles()
      }, 
   
   
   //导出
      exportExcel() {
        const params={
           keys:"calcType",
           value:1
        }
      server.exportExcel(params).then((res) => {
          let url = window.URL.createObjectURL(new Blob([res]))
          let link = document.createElement('a')

          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', 'metrics.xlsx')
          document.body.appendChild(link)
          link.click()
        })
        .catch((error) => {
          console.log(error);
        });
    },
      ormatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        formatJsonAll(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === 'timestamp') {
                        // return parseTime(v[j]);
                    } else {
                        return v[j]
                    }
                })
            )
        },
    add(){
    this.getMetricsDef();
        const params={
          params: "code,resourceType",
          model: "MetricsDef", 
          }
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
      this.getMetricTypeOpt();
      this.outerVisible= true,
      this.updateType='create',
      this.outerData = {}
    },
    indInfoDialog(row) {
      this.outerData = row;
      this.indinfoVisible = true;
      this.updateType = "update";
    },
    getMetricsDef() {
      var params = {};
      params["limit"] = this.pageSize;
      params["start"] = this.pageSize * (this.currentPage - 1) + 1;
      params["keys"] = "calcType";
      params["value"] = 1;
      params["sortfield"] = "createTime";
      params["sortorder"] = "DESC";
      // server.queryMetricsDef(params).then(
      //   res => {
      //     this.dataCount = res.count;
      //     this.metricsDefData = res.metricsData;
      //   },
      //   error => {
      //     console.error("请求异常！" + error);
      //   }
      // );
    },
    getCode(){
     const params = {  
      params: "code,resourceType",
      model: "MetricsDef",
      value: "1",
      keys:"calcType"
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
    handleClose(closed) {
      this.outerVisible = closed;
      this.indinfoVisible = closed;
      this.excelVisible=closed;
      this.getMetricsDef();
    },
    queryMetricsDef(search) {
      const reg = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
      );
      if (reg.test(this.search.name)) {
        this.$message.warning("模板名称请勿输入特殊字符!");
        return;
      }
      const regs = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
      );
      if (regs.test(this.search.alias)) {
        this.$message.warning("模板名称请勿输入特殊字符、汉字！");
        return;
      }

      var value = search.name +","+ search.alias +","+ search.metricType +","+search.code+",1";
      const params = {}
        for (const item in search) {
          if (search.hasOwnProperty(item) && search[item] !== '') {
            params[item] = search[item]
          }
        }
      params["keys"] = "name,alias,metricType,code,calcType",
      params["value"] = value,
      params["limit"] = this.pageSize;
      params["start"] = this.pageSize * (this.currentPage - 1) + 1;
      // params["calcType"] = 1;
      params["search"] = true;
      params["sortfield"] = "createTime";
      params["sortorder"] = "DESC";
      server.queryMetricsDef(params).then(
        res => {
          this.metricsDefData = res.metricsData;
          this.dataCount = res.count;
          if (res === "") this.metricsDefData = []; },
        error => {
          console.error("请求异常！" + error);
        }
      );
    },
    putMetricsDefData(index) {
      if (
        this.metricsDefData[index].status === 0 || this.metricsDefData[index].status === 4
      ) {
        this.outerData = this.metricsDefData[index];
        this.outerVisible = true;
        this.updateType = "update";
      } else {
        this.$message({
          showClose: true,
          message: "该任务已启动，请停止后再操作！",
          type: "error"
        });
      }
    }, 
    
    /**
     * 任务操作
     * @param index
     * @param status
     */
    operate(index, status) {
      debugger
      this.currIndex= this.metricsDefData[index]
      this.currStatus=this.metricsDefData[index].status
      var taskId = this.metricsDefData[index].taskId;

      var metricsDefData = this.metricsDefData[index];
      metricsDefData.trigger.normalStrategy.ciid = "";
      var table = [metricsDefData];
      if (taskId) {

        if (status === 3) {
        this.$confirm("此操作将重分配, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() => {
        metricsDefData.status = status;
        server.putMetricsDefUpdate(table).then(res => {
        this.getMetricsDef();
          });
        })  .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重分配"
          });
        });
      }
        if (status === 4) {
        this.$confirm("此操作将停止, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() => {
        metricsDefData.status = status;
        server.putMetricsDefUpdate(table).then(res => {
          console.log(res)
        this.getMetricsDef();
          this.$message({
            type: "success",
            message: this.metricsDefData[index].name+"已停止"
          });
          });
        }) .catch(() => {
          this.$message({
            type: "info",
            message: "已取消停止"
          });
        });
        }
       if (status === 1) {
         this.$confirm("此操作将启动, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() => {
        if(this.currStatus===4){
        this.$message({
            type: "info",
            message: "任务正在停止中,请稍后重试！"
           });
        }else{
          metricsDefData.status = status;
          server.putMetricsDefUpdate(table).then(res => {
          this.getMetricsDef(); 
          });
        }
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消启动"
          });
        })
        }
      } else if (!taskId) {
        if (status === 1) {
         this.$confirm("此操作将启动, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      }).then(() => {
        metricsDefData.status = status;
        server.putMetricsDefUpdate(table).then(res => {
        this.getMetricsDef();
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消启动"
          });
        })
        } else {
          this.$message({
            showClose: true,
            message: "任务状态正在切换,请稍后重试",
            type: "error"
          });
        }
      }
    },
    //批量开启
      startConfirm(ids, status) {  
        this.$confirm("此操作将启用, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
           var selectionData = this.selectionData;
           this.selectionData.forEach((item, index) => {
             item.status=1
          });
          var data=selectionData
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
                  message: "启用失败！",
                  type: "error"
                });
              }
            );
          })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消启用"
          });
        });
    
    },
      //批量关闭
    stopConfirm(ids, status){
       this.$confirm("此操作将停止, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
           var selectionData = this.selectionData;
           this.selectionData.forEach((item, index) => {
             item.status=0
          });
           var data=selectionData
            server.startMetricsDefData(data).then(
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
          })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消停止"
          });
        });
    },


    reset() {
      this.search = {
        alias:"",
        name: "",
        code: "",
        metricType: "",
        calcType:1
      };
    },
    deleteMetricsDefData(ids, canIdelete) {
      if(canIdelete == 0) {      
        const params = {
          metricIds: ids,
          metricStatus: 0,
          // taskIds: '',
          //  codes: ''
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
            this.getCode()
          },
          error => {
            console.error("请求异常！" + error);
            this.$message({
              showClose: true,
              message: "删除失败！",
              type: "error"
            });
          });
      }
      else {
        this.$message({
          showClose: true,
          message: "任务已启动！请停止后再操作！",
          type: "error"
        });
      }
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
        } // 查询
      );
    },

    handleSelectionChange(val) {
            this.selectionData=val
      this.multipleSelectionIds = val.map(item => item.metricId).join(",");
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
          val = "已暂停";
          break;
        case 3:
          val = "重分配";
          break;
        case 4:
          val = "停止中";
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
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log("currentChangge", val);
      this.currentPage = val;
      this.getMetricsDef();
    },
    formatterMetricType(row, column) {
      return this.metricTypeMap[row.metricType];
    },
    deleteConfirm(ids, status) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteMetricsDefData(ids, status);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
              // var map = {}
              // map[item.typeId] = item.alias
              // return map
            }),
            "value"
          );
          // console.info(this.metricTypeOpt)
          // const metricsTypeData = res
          // 查询
        },
        error => {
          console.error("请求异常！" + error);
        }
      );
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.a {
  margin: 20px 10px 12px 10px;
  overflow-x: hidden;
  padding: 10px;
}
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
    margin-bottom: 0;
  }
}
.el-button-padding {
  padding: 0px;
}
.el-crad {
  border: none;
}
.upload-demo {
  display: inline-block;
 }

       // UI的需求
.search_btn {
  background: #42B983;
  border: 1px solid #42B983;
  color: #FFFFFF;
  font-size:14px;
  &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
}
.table_btn {
  color: rgba(66, 185, 131, 1);
  font-size:14px;
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
  font-size:13px;
  border: none;
  height: 34px;
  &:hover {
    background: #42B983;
    border-color: #42B983;
    color: #fff;
  }
}
</style>
