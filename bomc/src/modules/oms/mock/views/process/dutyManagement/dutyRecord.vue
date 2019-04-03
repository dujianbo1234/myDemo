<template>
  <div class="dutyManage oms-diy-elementui">
    <el-tabs
      class="topTab"
      v-model="tabActive"
    >
      <el-tab-pane
        label="查看详情"
        name="form"
      >
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-card class="cardContent">
            <div class="moduleTitle">基本信息</div>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="值班单ID"
                  prop
                >
                  <el-input
                    type="text"
                    v-model="ruleForm.procInstId"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="任务名称"
                  prop
                >
                  <el-input
                    type="text"
                    v-model="ruleForm.taskName"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="值班人"
                >
                  <el-input
                    v-show="false"
                    type="text"
                    v-model="ruleForm.dutyUserId"
                  ></el-input>
                  <el-input
                    type="text"
                    v-model="name"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="创建时间"
                  prop
                >
                  <el-input
                    type="text"
                    v-model="ruleForm.createTime"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="值班开始时间"
                  prop=""
                >
                  <el-time-picker
                    class="oms-select"
                    :disabled="true"
                    v-model="ruleForm.dutyStartTime"
                    value-format="hh:mm:ss"
                    type="datetime"
                    placeholder="选择值班开始时间"
                  ></el-time-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="值班结束时间"
                  prop=""
                >
                  <el-time-picker
                    class="oms-select"
                    :disabled="true"
                    v-model="ruleForm.dutyEndTime"
                    value-format="hh:mm:ss"
                    type="datetime"
                    placeholder="选择值班结束时间"
                  ></el-time-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- <el-col :span="8">
                <el-form-item
                  label="接班人"
                  prop
                >
                  <el-input
                    type="text"
                    v-model="ruleForm.successorId"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="审核人">
                  <el-cascader
                    :disabled="true"
                    class="oms-select"
                    :options="reviewerList"
                    :show-all-levels="false"
                    v-model="ruleForm.auditorId"
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>

          <el-card class="cardContent">
            <div class="moduleTitle">处理步骤</div>
            <div class="dealStepsArea">
              <process-steps :procInstId.sync="procInstId"></process-steps>
            </div>
          </el-card>

          <el-card class="cardContent">
            <div class="moduleTitle">上传附件</div>
            <upload-files :file-list.sync="fileList"></upload-files>
          </el-card>

          <el-card class="cardContent">
            <el-tabs
              type="border-card"
              v-model="infoTab"
              class="bottomTab"
            >
              <el-tab-pane
                label="值班内容"
                name="dutyContent"
              >
                <el-table
                  :data="dutyContentData"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="content"
                    label="值班详细"
                  />
                  <el-table-column
                    prop="description"
                    label="值班描述"
                  />
                  <el-table-column label="是否正常">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.isAbnormal">
                        <el-option
                          label="正常"
                          :value="1"
                        ></el-option>
                        <el-option
                          label="异常"
                          :value="0"
                        ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="备注"
                    width="180"
                  />
                </el-table>
              </el-tab-pane>

              <el-tab-pane
                label="值班人记录"
                name="successorRecord"
              >
                <el-form-item label="工作记录">
                  <el-input
                    v-model="ruleForm.dutyRecord"
                    type="textarea"
                    class="textarea"
                    placeholder="请填写值班人记录"
                  ></el-input>
                </el-form-item>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-form>
        <el-row class="btnGroup">
          <el-button @click="saveAsDraft">保存草稿</el-button>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >提交</el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        label="附件信息"
        name="attachmentInfo"
      >
        <el-card class="cardContent">
          <attachment-info :procInstId="procInstId"></attachment-info>
        </el-card>
      </el-tab-pane>
      <el-tab-pane
        label="查看流程图"
        name="chart"
        :lazy="true"
      >
        <el-card class="cardContent">
          <flow-charts
            :procInstId="procInstId"
            :procDefId="procDefId"
            :tabActive="tabActive"
          ></flow-charts>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import * as eventFormService from "@/modules/oms/api/oms/eventForm";

import uploadFiles from "@/modules/oms/views/components/uploadFile";
import processSteps from "@/modules/oms/views/components/processSteps";
import attachmentInfo from "@/modules/oms/views/components/attachmentInfo";
import flowCharts from "@/modules/oms/views/components/flowCharts";
import { callbackify } from "util";
import _ from "lodash";

export default {
  name: "successorRecord",
  data() {
    return {
      tabActive: "", // 表单tab页显示
      infoTab: "dutyContent", // 页面底部的tab页
      userId: "",
      name: "",
      procInstId: "", // 流程实例ID
      procDefId: "",
      taskId: "",
      workListId: "",
      // isOver: "",
      isSaved: false,
      isDraft: "",

      fileList: [], // 附件
      reviewerList: [], // 审核人数组
      dutyContentData: [], // 值班内容

      ruleForm: {
        procInstId: "", // 值班单ID
        taskName: "", // 任务名称
        createTime: "", // 创建时间
        dutyUserId: "", //值班人
        dutyStartTime: "", //值班开始时间
        dutyEndTime: "", //值班结束时间
        successorId: "", //接班人
        auditorId: [], //审核人
        dutyRecord: "" // 值班记录
      },
      rules: {
        dutyStartTime: [
          {
            required: true,
            validator: this.validatePass,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        dutyEndTime: [
          {
            required: true,
            validator: this.validatePass,
            message: "不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    processSteps,
    uploadFiles,
    attachmentInfo,
    flowCharts
  },
  // beforeRouteLeave(to, from, next) {
  //   if (!this.isSaved) {
  //     this.$confirm(
  //       "是否确定离开当前页面，离开该页面该条工单将被删除?",
  //       "提示",
  //       {
  //         confirmButtonText: "确定",
  //         cancelButtonText: "取消",
  //         type: "warning"
  //       }
  //     )
  //       .then(() => {
  //         this.$message({
  //           type: "success",
  //           message: "删除成功！"
  //         });
  //         this.removeTag();
  //         next();
  //       })
  //       .catch(() => {
  //         this.$message({
  //           type: "info",
  //           message: "已取消删除"
  //         });
  //       });
  //   } else {
  //     next();
  //   }
  // },
  watch: {
    // dutyContentData: {
    //   handler: function(val, oldVal) {
    //     console.log("dutyContentData");
    //     console.log(val);
    //   },
    //   deep: true
    // }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isSaved) {
      this.$confirm(
        "是否离开当前页面? 离开当前页面所做修改内容将不被保存",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.removeTag();
          next();
        })
        .catch(() => {});
    } else {
      next();
    }
  },
  destroyed() {
    window.onbeforeunload = null;
  },
  created() {
    this.userId = this.$store.getters.userId; //获取用户id
    this.taskId = this.$route.params.taskId;
    this.procInstId = this.$route.params.procInstId;
    this.tabActive = this.$route.query.tabActive || "form";
    this.isDraft = this.$route.query.isDraft
  },
  mounted() {
    window.onbeforeunload = function() {
      return true;
    };
    this.init();
  },
  methods: {
    init() {
      // this.isOver = this.$route.query.isOver

      this.ruleForm.createTime = this.$route.query.createTime;
      this.previousPathTwo = this.$route.query.previousPathTwo;
      this.queryData();
      this.queryReviewer();
    },
    //查询表单数据
    queryData() {
      let params = {
        procInstId: this.procInstId
      };
      eventFormService.queryData(params).then(res => {
        this.ruleForm = { ...this.ruleForm, ...res.result[0].form };
        this.ruleForm.auditorId = res.result[0].form.auditorId.split(",");
        this.workListId = res.result[0].form.workListId;
        this.queryUser(this.userId)
        this.queryDutyContent(this.ruleForm.dutyContentName);
      });
    },
    queryUser(id){
      let params = {
        userIds: id
      }
      eventFormService.queryUser(params).then(res=>{
        this.name = res.result[0].realName
      })
    },
    // 查询值班内容
    queryDutyContent(val) {
      let params = {
        name: val
      };
      eventFormService.queryDutyContent(params).then(res => {
        this.dutyContentData = res.result[0].content;
      });
    },
    // 级联根据id查人名
    queryReviewer() {
      eventFormService.serarchNextNodeDealMan().then(res => {
        let deep = function(arr) {
          arr.forEach(item => {
            item.value = item.object.deptId;
            item.label = item.object.deptName;
            if (item.children) {
              deep(item.children);
            }
          });
        };
        deep(res);
        this.reviewerList = res;
      });
    },
    // 保存草稿
    saveAsDraft() {
      const loading = this.$loading({
        fullscreen: true,
        lock: true,
        text: "正在保存，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      let ruleForm = _.cloneDeep(this.ruleForm);
      ruleForm.auditorId = ruleForm.auditorId.join(",");
      let data = {
        procInstId: this.procInstId,
        taskId: this.taskId,
        isDraft: 1,
        title: ruleForm.taskName,
        description: ruleForm.taskName,
        form: {
          ...ruleForm
        }
      };

      let updateFormData = eventFormService.updateFormData(
        this.procInstId,
        data
      );
      // 值班内容的参数
      let contentData = JSON.parse(JSON.stringify(this.dutyContentData));
      contentData.forEach(item => {
        delete item.id;
        item.procInstId = this.procInstId;
        item.isDraft = 1;
      });

      let saveDutyContent = eventFormService.saveDutyContent(contentData);
      let postArr = [];
      postArr.push(updateFormData, saveDutyContent);
      Promise.all(postArr)
        .then(res => {
          this.isSaved = true;
          loading.close();
          this.$message({
            message: "保存成功！",
            type: "success"
          });
        })
        .catch(e => {
          loading.close();
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            fullscreen: true,
            lock: true,
            text: "正在提交，请稍后...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          let ruleForm = _.cloneDeep(this.ruleForm);
          ruleForm.auditorId = ruleForm.auditorId.join(",");
          ruleForm.dutyUserId = this.userId
          // 表单的参数
          let dataString = {
            procInstId: this.procInstId,
            title: ruleForm.taskName, // 任务名称
            description: ruleForm.taskName, // 任务名称
            form: {
              ...ruleForm
            }
          };
          debugger
          let data = {
            data: JSON.stringify(dataString),
            status: 1,
            variables: [
              {
                key: "nextDutyPerson",
                type: "string",
                value: ruleForm.successorId
              }
            ],
            procInstId: this.procInstId, // 流程实例id
            taskId: this.taskId, // 环节id
            assignee: this.userId
          };

          // 值班内容的参数
          let contentData = JSON.parse(JSON.stringify(this.dutyContentData));
          contentData.forEach(item => {
            delete item.id;
            item.procInstId = this.procInstId;
            item.isDraft = 0;
          });

          try {
            let postArr = [];
            let submitForm = eventFormService.submitForm(data);
            let saveDutyContent = eventFormService.saveDutyContent(contentData);
            postArr = postArr.concat(submitForm, saveDutyContent);
            if (this.fileList.length > 0) {
              postArr.push(this.uploadAttachment());
            }
            Promise.all(postArr)
              .then(res => {
                if (res.length === 2) {
                  loading.close();
                  this.$message({
                    message: "提交成功！",
                    type: "success"
                  });
                  this.isSaved = true;
                  this.$store.dispatch("changeNeedDealCount");
                  this.removeTag();
                  this.$router.push({
                    path: "/myDesk/myNeedDeal"
                  });
                }
              })
              .catch(e => {
                loading.close();
              });
          } catch (e) {
            loading.close();
          }

          // Promise.all(postArr)
          //   .then(res => {
          //     if (res.length === 2) {
          //       loading.close();
          //       this.$message({
          //         message: "提交成功！",
          //         type: "success"
          //       });
          //       this.isSaved = true;
          //       this.$store.dispatch("changeNeedDealCount");
          //       this.removeTag();
          //       this.$router.push({
          //         path: "/myDesk/myNeedDeal"
          //       });
          //     }
          //   })
          //   .catch(e => {
          //     loading.close();
          //   });
        } else {
          return false;
        }
      });
    },
    // 上传附件
    uploadAttachment() {
      const formdatas = new FormData();
      this.fileList.forEach((item, index) => {
        formdatas.append("files", item.raw);
      });
      formdatas.append("taskId", this.taskId);
      formdatas.append("procInstId", this.procInstId);
      formdatas.append("userId", this.userId);

      return eventFormService.uploadAttachment(formdatas);
    },
    validatePass(rule, value, callback) {
      if (!value) {
        callback(new Error(" "));
        const h = this.$createElement;
        this.$notify({
          title: "提示",
          message: rule.message,
          duration: 2000
        });
      } else {
        if (rule.fullField === "startTime") {
          if (
            new Date(value).getTime() >
            new Date(this.ruleForm.endTime).getTime()
          ) {
            callback(new Error(" "));
            const h = this.$createElement;
            this.$notify({
              title: "提示",
              message: "值班开始时间不能大于值班结束时间",
              duration: 2000
            });
          } else {
            callback();
          }
        } else if (rule.fullField === "endTime") {
          if (
            new Date(value).getTime() <
            new Date(this.ruleForm.startTime).getTime()
          ) {
            callback(new Error(" "));
            const h = this.$createElement;
            this.$notify({
              title: "提示",
              message: "值班结束时间不能小于值班值班结束开始时间",
              duration: 2000
            });
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    }
  }
};
</script>

<style lang="scss">
.dutyManage {
  .topTab .el-tabs__nav-wrap {
    padding: 0 20px;
    background-color: #fff;
  }
  .bottomTab .el-tabs__nav-wrap {
    padding: 0 20px;
    background-color: #f5f7fa;
  }
  .cardContent {
    margin: 0 20px 20px 20px;
  }
  .moduleTitle {
    margin: 15px 0;
    border-left: 4px solid #42b983;
    padding-left: 10px;
    color: #42b983;
    font-size: 15px;
    font-weight: bold;
  }
  .btnGroup {
    text-align: center;
  }
  .textarea {
    .el-textarea__inner {
      height: 120px;
    }
  }
}
</style>