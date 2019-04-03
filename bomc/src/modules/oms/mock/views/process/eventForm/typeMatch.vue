<template>
  <div class="type-match-container">
    <el-row :gutter="8">
      <el-col :span="14">
          
        <el-form
          ref="configTypeForms"
          label-position="top"
          label-width="80px"
          :model="configTypeForm"
          size="mini"
        >

          <el-row :gutter="8">

            <el-col :span="12">
              <el-form-item
                label="配置项类型"
                prop="type"
                :rules="[
                            { required: true, message: '请选择配置项类型', trigger: 'change' },
                          ]"
              >
                <el-cascader
                  id="config-type-form"
                  placeholder="请选择配置项类型"
                  :options="configData"
                  v-model="configTypeForm.type"
                >
                </el-cascader>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="过滤字段"
                prop="field"
                :rules="[
                          { required: true, message: '请选择查询字段', trigger: 'change' },
                        ]"
              >
                <el-select
                  @focus="handleChange"
                  v-model="configTypeForm.field"
                  placeholder="请选择查询字段（先选择配置项）"
                >
                  <el-option
                    v-for="(item, index) in fieldsArray"
                    :key="index"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>

      </el-col>

      <el-col :span="10">

        <el-form
          label-position="top"
          label-width="80px"
          :model="CIConfigFrom"
          size="mini"
        >
          <el-tooltip
            class="item"
            effect="dark"
            content="该字段输入内容与过滤字段关联"
            placement="top"
          >
            <i class="el-icon-info ci-info"></i>
          </el-tooltip>

          <el-form-item label="CI 过滤条件">
            <el-row :gutter="8">
              <el-col :span="16">
                <el-input
                  placeholder="请输入与查询字段关联的查询条件"
                  @keyup.enter.native="queryCIConfig"
                  v-model="CIConfigFrom.type"
                ></el-input>
              </el-col>

              <el-col :span="8">
                <el-button
                  style="width: 100%;"
                  type="primary"
                  @click="queryCIConfig()"
                >
                  搜索CI选项
                </el-button>
              </el-col>
            </el-row>

          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
    
    <el-card class="box-card">
      <el-table
        :data="CIData"
        v-loading="CIDataLoading"
        tooltip-effect="dark"
        style="width: 100%; margin-top:8px;"
      >

        <el-table-column
          align="center"
          label="选择"
          width="50"
        >
          <template slot-scope="scope">
            <el-radio
              v-model="radioCI"
              :label="scope.row.ciid"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" type="index" label="序号" width="50">
        </el-table-column> -->
        <el-table-column
          align="center"
          prop="ciid"
          label="CI-ID"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="ciname"
          label="CI名称"
        >
        </el-table-column>

        <el-table-column
          align="center"
          label="创建时间"
        >
          <template slot-scope="scope">
            {{scope.row.create_time | time}}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="create_time"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              @click="CIDetail(scope.row)"
              type="text"
            >查看详情</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-dialog
        title="CI 属性"
        :visible.sync="CIPropertydialogVisible"
        width="35%"
      >

        <el-form
          label-position="right"
          label-width="200px"
        >

          <el-form-item
            v-for="(val, key, index) in CISelectData"
            :label="key"
            :key="index"
          >
            <span class="info-detail">{{val}}</span>
          </el-form-item>

        </el-form>

        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="CIPropertydialogVisible = false"
          >确定</el-button>
        </div>

      </el-dialog>

      <el-pagination
        class="pagination"
        :page-size="CIDataPagination.limit"
        v-if="CIDataTotal > 10"
        :current-page.sync="CIDataPagination.start"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="queryCIConfig"
        :total="CIDataTotal"
        background
      >
      </el-pagination>

    </el-card>

    <el-card
      class="box-card"
      style="text-align: right;"
    >
      <el-button @click="back">取消</el-button>
      <el-button
        @click="save"
        type="primary"
      >保存草稿</el-button>
    </el-card>

  </div>
</template>

<script>
import * as service from "@/modules/oms/api/oms/eventForm";

import resource from "@/modules/oms/resource.js";

export default {
  name: "typeMatch", // 类型匹配
  data() {
    return {
      configData: [], // 资源数据数组

      fieldsArray: [], // 字段数据数组集合

      configTypeForm: {
        // 类型配置 form 参数
        type: [],
        fields: []
      },

      CIConfigFrom: {
        type: ""
      }, // CI选项 form 参数

      CIData: [], // CI 数据
      CIDataLoading: false,
      CIDataPagination: {
        // CI选项分页参数
        start: 1,
        limit: 10
      },
      CIDataTotal: 0,

      radioCI: "",

      CISelectData: {},

      CIPropertydialogVisible: false
    };
  },
  computed: {
    procInstId() {
      // 流程实例ID
      return this.$route.params.procInstId;
    },
    taskId() {
      return this.$route.params.taskId;
    }
  },
  mounted() {
    // 查询配置项类型
    this.queryResModelType();
  },
  methods: {
    back() {
      // 返回上一页
      this.$router.go(-1);
    },
    save() {
      const radioCI = this.radioCI;

      if (radioCI) {
        const selectData = this.CIData.filter(item => item.ciid === radioCI)[0];

        const { ciid, ciname } = selectData;

        const { taskId, procInstId, configTypeForm } = this;

        const params = {
          taskId: taskId,
          procInstId: procInstId,
          ciCategory: configTypeForm.type.join("."),
          ciId: ciid,
          ciName: ciname
        };

        // 关联 CI 选项
        service.updateCI(JSON.stringify(params)).then(res => {
          this.back();
        });
      }
    },
    CIDetail(row) {
      // 查看详情
      this.CISelectData = row;
      this.CIPropertydialogVisible = true;
    },
    queryCIConfig() {
      // 规则校验
      this.$refs.configTypeForms.validate(valid => {
        if (valid) {
          

          const CIDataPagination = this.CIDataPagination;

          const { type, field } = this.CIConfigFrom;

          const params = Object.assign(
            {
              value: this.CIConfigFrom.type,
              model: this.configTypeForm.type.slice(-1)[0],
              key: this.configTypeForm.field,
              search: true
            },
            {
              ...CIDataPagination,
              start: (CIDataPagination.start - 1) * CIDataPagination.limit
            }
          );

          service.queryResCI(params).then(res => {
            const { datas, count } = res;

            this.CIDataTotal = parseInt(count, 10);

            this.CIData = Object.keys(datas)
              .map(item => datas[item])
              .reduce((a, b) => a.concat(b), []);
          });
        } else {
          return false;
        }
      });
    },
    handleChange() {
      const type = this.configTypeForm.type;

      if (type.length > 1) {
        const params = { key: "name" };

        params.value = type.slice(-1)[0]; // 获取数组最后一个元素

        service.queryResModal(params).then(res => {
          // 合并数组
          const reduces = array =>
            array
              .map(item => Object.keys(item))
              .reduce((a, b) => a.concat(b), []);

          let nameArray = res.map(item => item.name);

          let common = reduces(resource.common);

          if (resource[type[0]]) {
            const currentRes = reduces(resource[type[0]]);
            common = common.concat(currentRes);
          }

          this.fieldsArray = nameArray.concat(common);
        });
      }
    },
    queryResModelType() {
      // query resource model type data
      // 查询事件类型数据 级联
      service.queryResModelType().then(res => {
        const result = res;

        const deep = res => {
          res.forEach(item => {
            const name = item.object.name.split("##");
            item.label = name[0];
            item.value = name[1];
            if (item.children) {
              deep(item.children);
            }
          });
        };

        // 递归处理
        deep(result);

        this.configData = result;
      });
    }
  }
};
</script>

<style lang="scss">
.type-match-container {
  padding: 16px;

  .el-cascader {
    width: 100%;
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

  .el-select {
    width: 100%;
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