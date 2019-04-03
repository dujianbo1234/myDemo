<template>
  <div class="attachment-info-container">
    <div class="el-row">
      <el-button
        class="left"
        type="primary"
        size="small"
        @click="batchDownLoad"
      >批量下载</el-button>
      <el-button
        class="right"
        type="text"
        @click="showChangeTableColDialog"
      >设置列隐藏/显示</el-button>
    </div>

    <el-table
      :data="attachmentData"
      v-loading="attachmentDataLoading"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>

      <!-- 遍历选中的 table 列 -->
      <el-table-column
        v-for="col in currentTableCol"
        :sortable="col.label === '上传时间' ? 'custom' : false"
        :key="col.label"
        :label="col.label"
        :prop="col.prop"
        align="center"
        show-overflow-tooltip
      >   
          <template slot-scope="scope">
            <span>{{formats(scope.row[col.prop], col.label)}}</span>
          </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="level"
        label="下载"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-download"
            @click="singleDownLoad(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      v-if="attachmentDataTotal > 10"
      :current-page.sync="attachmentDataPagination.start"
      :page-size.sync="attachmentDataPagination.limit"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="queryAttachment"
      @size-change="queryAttachment"
      :total="attachmentDataTotal"
      background
    ></el-pagination>

    <el-dialog
      custom-class="attachment-info-dialog"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <!-- 自定义 dialog 标题 -->
      <span
        slot="title"
        class="attachment-info-dialog-title"
      >设置列隐藏/显示</span>

      <el-row>
        <el-checkbox-group
          v-model="checkedTableCols"
          @change="handleCheckedChange"
        >
          <el-col
            v-for="col in allTableCol"
            :span="8"
            :key="col.label"
          >
            <el-checkbox :label="col.label">{{col.label}}</el-checkbox>
          </el-col>
        </el-checkbox-group>
      </el-row>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="small"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import * as service from "@/modules/oms/api/oms/eventForm.js";

export default {
  name: "attachmentInfo",
  data() {
    return {
      allTableCol: [
        // 所有 table 列
        // {
        //   prop: "",
        //   label: "附件编号"
        // },
        {
          prop: "name",
          label: "附件名称"
        },
        {
          prop: "isExtra",
          label: "上传类型"
        },
        {
          prop: "uploadTime",
          label: "上传时间"
        },
        {
          prop: "uploadLink",
          label: "操作步骤",
          disabled: true
        },
        {
          prop: "userName",
          label: "上传人员",
          disabled: true
        },
        {
          prop: "size",
          label: "文件大小",
          disabled: true
        }
      ],

      attachmentData: [], // 附件列表
      multipleSelection: [], //多选数据
      attachmentDataLoading: true, // table loading
      attachmentDataTotal: 0, // 总数
      attachmentDataPagination: {
        // 分页参数
        start: 1,
        limit: 10
      },
      sortOrder: "DESC",

      dialogVisible: false, // dialog 显示
      checkedTableCols: [] // 选中的 checkbox
    };
  },
  props: {
    procInstId: {
      // 流程实例 ID
      type: String,
      required: true
    }
  },
  watch: {
    procInstId() {
      this.queryAttachment();
    }
  },
  mounted() {
    // 默认选中的 checkbox
    this.checkedTableCols = this.allTableCol
      .filter(item => item.disabled !== true)
      .map(item => item.label);

    this.queryAttachment();
  },
  computed: {
    currentTableCol() {
      // 当前选中的 table 列
      return this.allTableCol.filter(item => item.disabled !== true);
    }
  },
  methods: {
    queryAttachment() {
      // 查询 附件列表
      if (!this.procInstId) {
        return;
      }
      this.attachmentDataLoading = true;

      const attachmentDataPagination = this.attachmentDataPagination;

      const { start, limit } = attachmentDataPagination;

      const params = {
        sortOrder: this.sortOrder,
        procInstId: this.procInstId,
        limit: limit,
        start: (start - 1) * limit
      };

      service.queryAttachments(params).then(res => {
        const { count, result } = res;
        this.attachmentDataLoading = false;
        this.attachmentData = result;
        this.attachmentDataTotal = count;
      }).catch(err => {
        this.attachmentDataLoading = false;
      });
    },
    formats(val, label) {
      // 格式化 table 列
      switch(label) {
        case "文件大小":
          return Math.ceil(val / 1024) + 'KB';
        case "上传类型":
          return val == 0 ? "初次提交" : "追加";
        default:
           return val ? val : "--"
      }
    },
    sortChange(col) {
      // 排序事件监听
      const { order } = col;
      this.sortOrder = order === "ascending" ? "ASC" : "DESC";
      this.attachmentDataPagination.start = 1;
      this.queryAttachment();
    },
    batchDownLoad() {
      // 批量下载
      if(!this.multipleSelection.length) {
        return this.$message.warning("请先多选后再进行批量操作！");
      } 
      this.singleDownLoad(this.multipleSelection)
    },
    handleSelectionChange(data) {
      // 全选事件监听
      // 返回附件 id
      this.multipleSelection = data.map(item => item.id);
    },
    singleDownLoad(id) {
      // 单个/多个下载
     const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = `${
        service.request.defaults.baseURL
      }/oms/api/v1/tasks/batchDownloads?ids=${id}`;

      document.body.appendChild(iframe);

      const timer = setTimeout(() => {
        document.body.removeChild(iframe);
        clearTimeout(timer);
      }, 700);
    },

    showChangeTableColDialog() {
      // 弹出 dialog
      this.dialogVisible = true;
    },
    handleCheckedChange(checkVal) {
      // checkbox 选中事件监听
      // 动态改变 table 列
      this.allTableCol = this.allTableCol.map(item => {
        if (checkVal.includes(item.label)) {
          item.disabled = false;
        } else {
          item.disabled = true;
        }
        return item;
      });
    }
  }
  
};
</script>

<style lang="scss">
.attachment-info-container {
  padding: 32px 16px 16px 16px;
  background: #fff;
  .right {
    float: right;
  }
  .attachment-info-dialog {
    .el-dialog__body {
      padding: 20px 20px 0 20px;
      text-align: center;
      .el-col {
        margin-bottom: 20px;
      }
    }
  }
  .left {
    float: left;
  }
  .el-icon-download {
    font-size: 18px;
  }
  .pagination {
    text-align: center;
  }
  .attachment-info-dialog-title {
    color: #42b983;
    position: relative;
    padding-left: 14px;
    font-size: 16px;
    display: block;
    &::before {
      content: "";
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      border-left: 4px solid #42b983;
    }
  }
}
</style>