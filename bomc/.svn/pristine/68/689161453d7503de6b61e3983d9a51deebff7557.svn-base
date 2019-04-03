<template>
  <div class="log-manage">
    <el-card class="box-card">
      <el-form
        :inline="true"
        ref="draftBoxForm"
        :model="draftBoxForm"
        class="demo-form-inline"
      >
        <el-form-item>
          <el-input
            v-model="draftBoxForm.id"
            clearable
            placeholder="请输入草稿ID"
            @keyup.enter.native="queryDraftBoxData(true)"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="draftBoxForm.nameLike"
            clearable
            placeholder="请输入草稿名称"
            @keyup.enter.native="queryDraftBoxData(true)"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="queryDraftBoxData(true)"
          >搜索</el-button>
          <el-button
            type="danger"
            @click="batchDelete"
          >批量删除</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div
      class="canvas low-indexs"
      ref="canvas"
    ></div>

    <div
      id="js-properties-panel"
      class="panel-container low-indexs"
    ></div>

    <el-card class="box-card">

      <el-table
        :data="draftBoxData"
        v-loading="draftBoxDataLoading"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >

        <el-table-column
          type="selection"
          width="55"
          align="center"
        >
        </el-table-column>

        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
        >
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="id"
          label="草稿ID"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="draftsName"
          label="草稿名称"
        >
          <template slot-scope="scope">
            <span>{{scope.row.draftsName | filterNull}}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="latestTime"
          label="最近修改时间"
        >
          <template slot-scope="scope">
            <span>{{scope.row.latestTime | time}}</span>
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          align="center"
          prop="bpmnFile"
          label="BPMN文件"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="level"
          label="操作"
          width="220"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="editDraft(scope.row.id)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="success"
              @click="logDetail(scope.row)"
            >查看</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteSignleLog(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-dialog
        title="草稿-流程图详情"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <img
          ref="proecssImg"
          :src="base64String"
          class="draft-process-img"
          alt="流程图"
          title="流程图"
          @click="jumpNewWindow"
        >
        <!-- 
        <el-form
          label-position="right"
          label-width="110px"
        >
          <el-form-item label="草稿ID">
            <span class="info-detail">{{selectData.id}}</span>
          </el-form-item>
          <el-form-item label="草稿名称">
            <span class="info-detail">{{selectData.draftsName}}</span>
          </el-form-item>
          <el-form-item label="最近修改时间">
            <span class="info-detail">{{selectData.latestTime | time}}</span>
          </el-form-item>
          <el-form-item label="BPMN 文件">
            <span class="info-detail">{{selectData.bpmnFile}}</span>
          </el-form-item>
        </el-form> -->

        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >确定</el-button>
        </div>

      </el-dialog>
      
      <el-pagination
        class="pagination"
        v-if="draftBoxDataTotal > 10"
        :current-page.sync="draftBoxDataPagination.start"
        :page-size.sync="draftBoxDataPagination.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="draftBoxDataTotal"
        background
      ></el-pagination>

    </el-card>

  </div>
</template>

<script>
import * as request from "@/modules/pms/api/pms/draftBox.js";
import BpmnModeler from "bpmn-js/lib/Modeler";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";

export default {
  name: "draftBox",
  data() {
    return {
      draftBoxForm: {
        // log manage form
        id: "",
        nameLike: ""
      },
      
      draftBoxData: [], // log manage data
      draftBoxDataPagination: {
        start: 1,
        limit: 10
      },
      draftBoxDataTotal: 0,
      draftBoxDataLoading: true,

      dialogVisible: false,

      // selectData: {},

      base64String: "",

      selectChangeData: [] // mutile select data
    };
  },
  watch: {
    draftBoxDataPagination: {
      deep: true,
      handler() {
        this.queryDraftBoxData();
      }
    }
  },
  mounted() {
    this.queryDraftBoxData();
  },
  methods: {
    assign(...params) {
      return Object.assign({}, ...params);
    },
    handleSelectionChange(val) {
      this.selectChangeData = val.map(item => {
        return item.id;
      });
    },
    deleteMethod(id) {
      request.deleteDraft(id).then(res => {
        this.$message.success("删除成功！");
        this.queryDraftBoxData();
      });
    },
    deleteSignleLog(id) {
      
      const isBatch = Array.isArray(id);

      this.$confirm(`此操作将${isBatch ? '批量删除' : '删除此'}草稿, 是否继续?`, "删除草稿", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.deleteMethod(id);
        })
        .catch(() => {});
    },
    batchDelete() {
      const selectChangeData = this.selectChangeData;
      if (!selectChangeData.length) {
        return this.$message.warning("请先多选后再删除！");
      }

      this.deleteSignleLog(selectChangeData);

      // this.$confirm("此操作将批量删除草稿, 是否继续?", "删除草稿", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "error"
      // })
      //   .then(() => {
      //     this.deleteMethod(this.selectChangeData.toString());
      //   })
      //   .catch(() => {});
    },
    queryDraftBoxData(bool) {
      // query log manage data
      // 查询草稿数据
      if (bool === true) {
        this.draftBoxDataPagination.start = 1;
      }

      let params = {};

      const draftBoxForm = this.draftBoxForm;

      Object.keys(draftBoxForm).forEach(item => {
        if (draftBoxForm[item]) {
          params[item] = draftBoxForm[item].trim();
        }
      });

      this.draftBoxDataLoading = true;

      request
        .queryDraft(this.assign(params, this.draftBoxDataPagination))
        .then(res => {
          this.draftBoxDataLoading = false;

          this.draftBoxData = res.result;
          this.draftBoxDataTotal = res.total;
        })
        .catch(err => {
          this.draftBoxDataLoading = false;
        });
    },
    editDraft(id) {
      // 编辑草稿
      this.$router.push({
        name: "drawProcess",
        query: { draftId: id }
      });
    },
    logDetail(row) {
      // 查看详情
      this.dialogVisible = true;

      const canvas = this.$refs.canvas;

      // 创建 bpmn 实例
      if (!this.bpmnModeler) {
        this.bpmnModeler = new BpmnModeler({
          container: canvas,
          // 添加控制板
          propertiesPanel: {
            parent: "#js-properties-panel"
          },
          moddleExtensions: {
            camunda: camundaModdleDescriptor
          }
        });
      }

      // 导入 bpmn 文件
      this.bpmnModeler.importXML(
        row.bpmnFile
          .replace(
            "http://activiti.org/bpmn",
            "http://camunda.org/schema/1.0/bpmn"
          )
          .replace(/activiti/g, "camunda"),
        error => {
          if (error) {
            this.$message.error("BPMN 文件读取失败！");
          }

          this.bpmnModeler.saveSVG((err, xml) => {
            if (err) {
              this.$message.error("BPMN 文件读取失败！");
            }
            // 将 svg 格式转换成 base 64格式
            this.base64String =
              "data:image/svg+xml;base64, " +
              window.btoa(unescape(encodeURIComponent(xml)));
          });
        }
      );

      // this.selectData = row;
    },
    jumpNewWindow() {
      // 跳转到新窗口
      const img = new Image();
      img.src = this.base64String;
      const w = window.open("", "_blank");
      w.document.write(img.outerHTML);
      w.document.title = "流程图";
      w.document.close();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.log-manage {
  padding: 16px;

  .draft-process-img {
    width: 100%;
    cursor: pointer;
  }

  .canvas {
    width: 100%;
    height: 100%;
  }

  .low-indexs {
    position: absolute;
    bottom: -9999px;
  }

  .warning-text {
    line-height: 1.5;
    margin-bottom: 16px;
    color: #999;
  }

  .info-detail {
    word-break: break-word;
    white-space: pre-wrap;
  }

  .pagination {
    text-align: center;
    margin-top: 24px;
  }

  .el-form--inline .el-form-item {
    margin-right: 16px;
  }

  .box-card {
    margin: 8px 0 16px 0;
  }

  .el-card__body {
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
