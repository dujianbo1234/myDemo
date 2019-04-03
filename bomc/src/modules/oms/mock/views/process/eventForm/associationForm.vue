<template>
  <div class="association-form-container">
    <el-card class="box-card">
      <el-form :inline="true" :model="associationForm" size="mini">
        <el-form-item>
          <el-input
            clearable
            v-model="associationForm.workListId"
            placeholder="工单编号"
            @keyup.enter.native="queryAssociationData(true, 'filter')"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-select v-model="associationForm.category" clearable placeholder="工单类型">
            <el-option
              v-for="(item,index) in sheetTypeList"
              :key="index"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>

        <!-- <el-form-item>
          <el-input v-model="associationForm.localtionLike" placeholder="工单描述" @keyup.enter.native="queryAssociationData"></el-input>
        </el-form-item>
          
        <el-form-item>
          <el-date-picker type="date" placeholder="创建时间范围" v-model="associationForm.time" value-format="yyyy-MM-dd" style="width: 100%;" format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="queryAssociationData(true, 'filter')">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table
        :data="associationData"
        v-loading="associationDataLoading"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>

        <el-table-column align="center" prop="ciId" label="配置项"></el-table-column>

        <el-table-column align="center" prop="workListId" label="工单ID">
          <template slot-scope="scope">
            <el-button type="text" @click="jumpAllInfo(scope.row)">{{scope.row.workListId}}</el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="category" label="工单类型"></el-table-column>
        <!-- <el-table-column
          align="center"
          prop="title"
          label="工单标题"
        >
        </el-table-column>-->
        <!-- <el-table-column
          align="center"
          prop="level"
          label="工单描述"
        >
        </el-table-column>-->
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | time}}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column
          align="center"
          prop="level"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="lassociationFormDetail(scope.row)"
            >查看详情</el-button>
          </template>
        </el-table-column>-->
      </el-table>

      <el-dialog title="表单详情" :visible.sync="dialogVisible" width="50%">
        <el-form label-position="right" label-width="80px">
          <el-form-item label="ID">
            <span class="info-detail">{{selectData.id}}</span>
          </el-form-item>
          <el-form-item label="级别">
            <span class="info-detail">{{selectData.level}}</span>
          </el-form-item>
          <el-form-item label="时间">
            <span class="info-detail">{{selectData.time | time}}</span>
          </el-form-item>
          <el-form-item label="Category">
            <span class="info-detail">{{selectData.category}}</span>
          </el-form-item>
          <el-form-item label="位置">
            <span class="info-detail">{{selectData.location}}</span>
          </el-form-item>
          <el-form-item label="Note">
            <span class="info-detail">{{selectData.note}}</span>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </el-dialog>

      <el-pagination
        class="pagination"
        v-if="associationDataTotal > 10"
        :current-page.sync="associationDataPagination.start"
        :page-size.sync="associationDataPagination.limit"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="queryAssociationData"
        :total="associationDataTotal"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import * as service from "@/modules/oms/api/oms/eventForm";

import * as serviceProcessInstances from "@/modules/oms/api/oms/myDesk/myLaunch";

import * as publicService from "@/modules/oms/api/oms/oms.js";

export default {
  name: "associationForm", //关联表单
  data() {
    return {
      // association form
      associationForm: {
        workListId: "",
        category: ""
      },

      sheetTypeList: [],

      associationData: [], // log manage data
      associationDataPagination: {
        start: 1,
        limit: 10
      },
      associationDataTotal: 0,
      associationDataLoading: true,

      filterPagination: {
        start: 1,
        limit: 10
      },

      dialogVisible: false,
      selectData: {}
    };
  },
  watch: {
    logManageDataPagination: {
      deep: true,
      handler() {
        this.queryLogManageData();
      }
    }
  },
  async mounted() {
    this.sheetTypeList = await publicService.queryType(); // 查询工单类型
    this.queryAssociationData();
  },
  methods: {
    dupRemove(resource) {
      const array = [];
      const obj = {};
      resource.forEach(item => {
        const procInstId = item.procInstId;
        if (!obj.hasOwnProperty(procInstId)) {
          obj[procInstId] = true;
          array.push(item);
        }
      });
      return array;
    },
    requestCallBack(res) {
      // 异步回调
      let { result, count } = res;

      this.associationDataTotal = count;

      result = this.dupRemove(result);

      // 移除当前流程实例
      // result.forEach((item, index) => {
      //   if(item.procInstId === this.$route.params.procInstId) {
      //     result.splice(index, 1);
      //   }
      // });

      const procInstIdArray = result.map(item => {
        return serviceProcessInstances.queryData({
          procInstId: item.procInstId
        });
      });

      // 执行完所有的请求
      Promise.all(procInstIdArray).then(response => {
        // 合并数组
        // const associationData = response.reduce((a, b) => {
        //   if (b.result.length) {
        //     b.result[0].ciCategory = this.$route.query.ciCategory;
        //   }
        //   return a.concat(b.result);
        // }, []);

        response.forEach(item => {
          result.forEach(ass => {
            if (item.result.length) {
              if (item.result[0].procInstId === ass.procInstId) {
                Object.assign(ass, item.result[0]);
              }
            }
          });
        });

        this.associationData = result;

        this.associationDataLoading = false;
      });
    },
    assignParams(pagination, params) {
      const { start, limit } = pagination;
      return Object.assign(
        {},
        { ...pagination, start: (start - 1) * limit },
        params
      );
    },
    queryAssociationData(isInitiative, filter) {
      this.associationDataLoading = true;

      const { ...params } = this.$route.params;

      delete params.procInstId;
      delete params.taskId;

      // 是否调用过滤
      if (filter === "filter") {
        // 是否用户触发
        if (isInitiative) {
          this.associationDataPagination = {
            start: 1,
            limit: 10
          };
        }

        const param = this.assignParams(this.associationDataPagination, {
          ...this.associationForm,
          ciId: params.ciId
        });

        service.queryWithFilterAssociationData(param).then(res => {
          this.requestCallBack(res);
        });
      } else {
        const param = this.assignParams(this.associationDataPagination, params);

        service.queryConfigurationAssociation(param).then(res => {
          this.requestCallBack(res);
        });
      }

      // query association data
    },
    jumpAllInfo(row) {
      this.$router.push({
        name: "allInfo",
        params: {
          procDefId: row.procDefId,
          procInstId: row.procInstId,
          taskId: "taskId"
        }
      });
    },
    lassociationFormDetail(row) {}
  }
};
</script>

<style lang="scss">
.association-form-container {
  padding: 16px;

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