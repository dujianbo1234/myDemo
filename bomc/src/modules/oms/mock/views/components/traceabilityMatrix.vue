<template>
  <deep-table :data="traceabilityMatrixData"></deep-table>
</template>

<script>
// 跟踪矩阵
import * as service from "@/modules/oms/api/oms/eventForm";

import DeepTable from "@/modules/oms/views/layout/components/DeepTable";

export default {
  data() {
    return {
      traceabilityMatrixData: [] // 跟踪矩阵数据
    };
  },
  props: {
    procInstId: {
      type: String,
      required: true
    },
    ruleForm: {
      type: Object,
      required: true,
      default: {}
    }
  },
  components: {
    DeepTable
  },
  watch: {
    procInstId() {
      this.queryTraceabilityMatrix();
    },
    ruleForm: {
      handler() {
        this.queryTraceabilityMatrix();
      },
      deep: true
    }
  },
  methods: {
    queryTraceabilityMatrix() {
      // 查询跟踪矩阵
      const { procInstId, ruleForm, traceabilityMatrixData } = this;
      // 判断是否有 流程实例id 工单 或者已经请求过
      if (!procInstId | !ruleForm.workListId | traceabilityMatrixData.length) {
        return;
      }

      service
        .queryTraceabilityMatrix({ procInstId: this.procInstId })
        .then(res => {
          const result = res;

          const userArray = [];

          // get all user assignee
          const deep = arr => {
            arr.map(item => {
              if (item.object.assignee) {
                userArray.push(item.object.assignee);
              } else {
                item.user = {};
              }

              if (item.children) {
                // recursion children
                deep(item.children);
              }
            });
          };

          deep(result);

          // get user detail info
          if (userArray.length) {
            service
              .queryUser({
                userIds: userArray.toString()
              })
              .then(res => {
                const usersDetailArray = res.result;
                // this.ruleForm.workListId = "IT-20181114190607-28";
                // assign user detail info
                const deep = arr => {
                  arr.map(item => {
                    if (item.object.workListId === this.ruleForm.workListId) {
                      item.isSameWorkListId = true;
                    }
                    usersDetailArray.forEach(user => {
                      if (item.object.assignee == user.userId) {
                        item.user = user;
                      }
                    });
                    if (item.children) {
                      // recursion chirdren
                      deep(item.children);
                    }
                  });
                };

                deep(result);

                this.traceabilityMatrixData = result;
              });
          }
        });
    }
  }
};
</script>

<style scoped>
</style>