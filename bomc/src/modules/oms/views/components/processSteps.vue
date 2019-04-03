<template>
  <el-table
    class="process-step-data"
    :data="processStepData"
    style="width: 100%"
  >
    <el-table-column
      align="center"
      type="expand"
    >
      <template slot-scope="props">
        <el-form
          label-position="left"
          class="demo-table-expand"
        >
          <el-form-item
            label="无"
            v-if="!props.row.comment.message && !props.row.comment.subProcInstId && !props.row.comment.action"
          >
            <span></span>
          </el-form-item>

          <el-form-item
            label="处理意见："
            v-if="props.row.comment.message"
          >
            <span class="word-wrap">{{ props.row.comment.message | fullMsg}}</span>
          </el-form-item>
          <el-form-item
            label="转单记录："
            v-if="props.row.comment.subProcInstId"
          >
            <span>{{ props.row.comment.subProcInstId | fullMsg}}</span>
          </el-form-item>
          <el-form-item
            label="是否解决："
            v-if="props.row.comment.action"
          >
            <span>{{ props.row.comment.action | filterAction }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="操作步骤"
    >
      <template slot-scope="scope">
        <span>{{scope.row.name | formatStepName}}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="参与者"
      prop="assignee"
    >
      <template slot-scope="scope">
        <el-popover
          popper-class="user-detail-container"
          placement="right"
          width="300"
          trigger="click"
        >
          <div>
            <h3 class="user-name">{{scope.row.userInfo.realName}}</h3>
            <el-form
              label-position="left"
              class="demo-table-expand"
              label-width="120px"
            >
              <!-- <el-form-item label="处理记录：">
                      <span>{{ scope.row.userInfo.deptId | fullMsg}}</span>
              </el-form-item>-->
              <el-form-item label="部门：">
                <span>{{ scope.row.userInfo.deptName | fullMsg}}</span>
              </el-form-item>
              <el-form-item label="E-MAIL：">
                <span>{{ scope.row.userInfo.email | fullMsg }}</span>
              </el-form-item>
              <el-form-item label="手机：">
                <span>{{ scope.row.userInfo.phonenumber | fullMsg }}</span>
              </el-form-item>
            </el-form>
          </div>

          <el-button
            slot="reference"
            type="text"
          >{{scope.row.userInfo.realName}}</el-button>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="开始时间"
      width="160"
    >
      <template slot-scope="scope">
        <span>{{scope.row.createTime}}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="结束时间"
      width="160"
    >
      <template slot-scope="scope">
        <span>{{scope.row.endTime}}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="有效处理时间（分钟）"
      prop="name"
      width="160"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.duration | minutesToHour }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="文件名称"
    >
      <template slot-scope="scope">
        <el-popover
          v-if="scope.row.attachmentList"
          popper-class="warn-table-container"
          placement="right"
          width="300"
          trigger="click"
        >
          <el-table
            :data="selectAttachmentData"
            v-loading="selectAttachmentDataLoading"
            width="100%"
          >
            <!-- <el-table-column align="center" width="60" type="index" label="序号"></el-table-column> -->
            <el-table-column
              align="center"
              property="name"
              label="名称"
            ></el-table-column>
            <el-table-column
              align="center"
              property="name"
              label="大小"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.size | size }}</span>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            :page-size="5"
            v-if="selectAttachmentDataTotal > 5"
            :current-page.sync="selectAttachmentPagination.start"
            layout="total, prev, pager, next"
            :total="selectAttachmentDataTotal"
          ></el-pagination>

          <el-button
            slot="reference"
            @click="queryCurrentAttachment(scope.row.taskId)"
            type="text"
          >{{scope.row.attachmentList | attachmentList}}</el-button>
        </el-popover>

        <span v-else>--</span>
      </template>
    </el-table-column>

    <el-table-column align="center">
      <template
        slot="header"
        slot-scope="slot"
      >
        <span>文件大小</span>
        <i
          title="下载所有"
          @click="downLoadAttachmentListByProcessInstanceID"
          class="el-icon-download header-icon"
        ></i>
      </template>

      <template slot-scope="scope">
        <el-button
          v-if="scope.row.attachmentList"
          type="text"
          @click="downLoadAttachmentList(scope.row.taskId, scope.row)"
        >
          {{scope.row.allSize | size}}
          <i class="el-icon-download"></i>
        </el-button>
        <span v-else>--</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// 处理步骤
import * as service from "@/modules/oms/api/oms/eventForm";

import request from "@/modules/oms/api/index";

export default {
  data() {
    return {
      processStepData: [],

      selectAttachmentData: [],
      selectAttachmentPagination: {
        start: 1,
        limit: 5
      },
      selectAttachmentDataTotal: 0,
      selectAttachmentDataLoading: true,

      currenProcessStepTaskId: "", // 流程步骤选中的 taskId

      previousNodeEndTime: "" // 上一节点的结束时间，作为当前节点的到达时间
    };
  },
  props: {
    procInstId: {
      type: String,
      required: true
    },
    ruleForm: {
      type: Object,
      required: false
    }
  },
  watch: {
    selectAttachmentPagination: {
      handler() {
        this.queryCurrentAttachment();
      },
      deep: true
    },
    procInstId() {
      this.queryProcessStep();
    }
  },
  mounted() {
    this.queryProcessStep();
  },
  methods: {
    queryProcessStep() {
      // 查询处理步骤
      const procInstId = this.procInstId;

      if (!procInstId) {
        return;
      }

      service.queryProcessStep({ procInstId: procInstId }).then(async res => {
        const { result } = res;
        // task id array
        const taskIdArray = result.map(item => {
          return service.queryAttachmentsWithTaskId({
            taskId: item.taskId,
            start: 1,
            limit: 100
          });
        });
        // user array
        const userArray = result.map(item => {
          item.comment = {};
          item.userInfo = {};
          return item.assignee;
        });

        if (userArray.length !== 0) {
          // query user detail
          taskIdArray.push(
            service.queryUser({
              userIds: userArray.toString()
            })
          );
        }

        // query process comment
        taskIdArray.push(service.queryProcessComment(procInstId));

        const results = await Promise.all(taskIdArray);
        // assign data
        results.forEach((item, index) => {
          if (item.result.length) {
            // has acion
            const hasAction = item.result[0].hasOwnProperty("action");
            // has user
            const hasUser = item.result[0].hasOwnProperty("realName");

            if (hasUser) {
              //合并用户信息
              item.result.forEach(userItem => {
                result.forEach((resultItem, i) => {
                  if (resultItem.assignee == userItem.userId) {
                    resultItem.userInfo = userItem;
                  }
                });
              });
            }

            if (hasAction) {
              // 合并处理意见
              item.result.forEach(actionsItem => {
                result.forEach((resultItem, i) => {
                  if (resultItem.taskId === actionsItem.taskId) {
                    resultItem.comment = actionsItem;
                  }
                });
              });
            } else {
              // 合并附件
              result.forEach((resultItem, i) => {
                if (resultItem.taskId === item.result[0].taskId && !hasAction) {
                  let allSize = 0;
                  item.result.forEach(item => {
                    allSize += parseInt(item.size, 10);
                  });

                  resultItem.allSize = allSize;
                  resultItem.attachmentList = item.result;
                }
              });
            }
          }
        });

        this.processStepData = result;

        let fullMsg;
        if (this.processStepData.length !== 0) {
          fullMsg = this.processStepData[this.processStepData.length - 1]
            .comment.fullMsg;
        }

        console.log("fullMsg", fullMsg);
        this.$emit("getFullMsg", fullMsg);

        if (this.processStepData.length !== 0) {
          this.previousNodeEndTime = this.processStepData[
            this.processStepData.length - 1
          ].endTime;
        }

        this.$emit("getArrivedTime", this.previousNodeEndTime);
      });
    },
    queryCurrentAttachment(taskId) {
      // 跟taskId 分页查询附件
      if (taskId) {
        this.currenProcessStepTaskId = taskId;
      }

      this.selectAttachmentDataLoading = true;

      service
        .queryAttachmentsWithTaskId({
          taskId: this.currenProcessStepTaskId,
          start: this.selectAttachmentPagination.start,
          limit: 5
        })
        .then(res => {
          this.selectAttachmentDataLoading = false;
          this.selectAttachmentData = res.result;
          this.selectAttachmentDataTotal = res.count;
        });
    },
    downLoadAttachmentList(taskId, row) {
      // 根据taskId 下载附件

      // request({
      //   method: "GET",
      //   responseType: "blob",
      //   url: `/oms/api/v1/tasks/batchDownload/${taskId}`
      // }).then(res => {
      //   console.log(res.headers);


      //   // const reader = new FileReader();

      //   // reader.onload = function(e) {
      //   //   console.log(e.target.result);
      //   // }

      //   // reader.readAsBinaryString(res)

      //   //  ie
      //   if (window.navigator.msSaveOrOpenBlob) {
      //     navigator.msSaveBlob(res);
      //   } else {
      //     const links = URL.createObjectURL(res);

      //     const a = document.createElement("a");
      //     document.body.appendChild(a);

      //     // a.download = "test.txt";

      //     a.href = links;

      //     const evt = document.createEvent("MouseEvents");

      //     evt.initEvent("click", false, false);

      //     a.dispatchEvent(evt);
      //   }

      //   // const blob = new Blob([res]);

      //   // console.log(blob.type);
      // });

      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = `${
        service.request.defaults.baseURL
      }/oms/api/v1/tasks/batchDownload/${taskId}`;

      document.body.appendChild(iframe);

      const timer = setTimeout(() => {
        document.body.removeChild(iframe);
        clearTimeout(timer);
      }, 700);
    },
    downLoadAttachmentListByProcessInstanceID() {
      // 根据流程实例下载附件
      const procInstId = this.procInstId;

      if (!procInstId) {
        return;
      }

      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = `${
        service.request.defaults.baseURL
      }/oms/api/v1/processInstances/batchDownload/${procInstId}`;

      document.body.appendChild(iframe);

      const timer = setTimeout(() => {
        document.body.removeChild(iframe);
        clearTimeout(timer);
      }, 700);
    }
  }
};
</script>

<style scoped>
</style>