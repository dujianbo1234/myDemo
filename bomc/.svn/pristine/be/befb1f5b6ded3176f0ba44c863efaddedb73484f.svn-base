
<template>
  <div>
    <el-form-item v-if="isServiceable" style="float: right;">
      <el-button
        @click="addConfigurationAssociation"
        type="primary"
        plain
      >添加配置关联项</el-button>
    </el-form-item>

    <el-dialog
      v-if="isServiceable"
      :visible.sync="CIDialogVisible"
      width="65%"
      custom-class="type-match-container"
      title="添加配置关联项"
    >

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
                      ref="configTypeFormEle"
                      id="config-type-form"
                      placeholder="请选择配置项类型"
                      change-on-select
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
        <!-- <el-card class="box-card"> -->
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
              {{scope.row.create_time | times}}
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
          append-to-body
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
          @size-change="queryCIConfig"
          @current-change="queryCIConfig"
          :page-size.sync="CIDataPagination.limit"
          :page-sizes="[5, 10, 20, 50]"
          :current-page.sync="CIDataPagination.start"
          layout="total, sizes, prev, pager, next, jumper"
          :total="CIDataTotal"
          background
        >
        </el-pagination>

        <!-- </el-card> -->

        <div style="text-align: right; margin-top: 16px;">
          <el-button @click="CIDialogVisible = false">取消</el-button>
          <el-button
            @click="save"
            type="primary"
          >保存</el-button>
        </div>

      </div>

    </el-dialog>

    <el-table
      :data="configurationAssociationData"
      v-loading="configurationAssociationDataLoading"
      tooltip-effect="dark"
      style="width: 100%"
    >

      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="50"
      >
      </el-table-column>

      <el-table-column
        align="center"
        prop="ciCategory"
        width="245"
        label="配置项类型"
      >
      </el-table-column>

      <el-table-column
        align="center"
        prop="ciName"
        label="配置项名称"
      >
      </el-table-column>

      <el-table-column
        align="center"
        prop="level"
        label="关联创建人"
      >
        <template slot-scope="scope">
          <span>{{scope.row.userInfo.realName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="createTime"
        label="关联创建时间"
      >
        <template slot-scope="scope">
          <span>{{scope.row.createTime | time}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="time"
        label="配置项已关联工单"
      >
        <template slot-scope="scope">
          <el-button
            @click="jumpToAssociationForm(scope.row)"
            type="text"
          >
            查看CI已关联工单
          </el-button>
        </template>
      </el-table-column>
      
      <el-table-column
        align="center"
        prop="level"
        label="操作"
        v-if="isServiceable"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteconfigurationAssociation(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      class="pagination"
      :page-size="5"
      v-if="configurationAssociationDataTotal > 5"
      :current-page.sync="configurationAssociationPagination.start"
      layout="total, prev, pager, next, jumper"
      @current-change="queryConfigurationAssociation"
      :total="configurationAssociationDataTotal"
      background
    ></el-pagination>
  </div>
</template>

<script>
// 配置关联组件
import * as service from "@/modules/oms/api/oms/eventForm";

import resource from "@/modules/oms/resource.js";

import moment from 'moment';

export default {
  props: {
    procInstId: {
      type: String,
      required: true
    },
    taskId: {
      type: String,
      required: true
    },
    isServiceable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      configData: [],

      fieldsArray: [], // 字段数据数组集合

      configTypeForm: {
        // 类型配置 form 参数
        type: [],
        fields: []
      },

      configurationAssociationData: [], // 配置关联项
      configurationAssociationPagination: {
        // 配置关联项分页参数
        start: 1,
        limit: 5
      },
      configurationAssociationDataTotal: 0, // 配置关联项 total
      configurationAssociationDataLoading: true, // 配置关联项 table loading

      CIConfigFrom: {
        type: ""
      }, // CI选项 form 参数

      CIData: [], // CI 数据
      CIDataLoading: false,
      CIDataPagination: {
        // CI选项分页参数
        start: 1,
        limit: 5
      },
      CIDataTotal: 0,

      radioCI: "",

      CISelectData: {},

      CIPropertydialogVisible: false,

      CIDialogVisible: false
    };
  },
  watch: {
    procInstId() {
      this.queryConfigurationAssociation();
    }
  },
  mounted() {
    this.queryConfigurationAssociation();
  },
  methods: {
    queryConfigurationAssociation() {
      // 查询配置关联项数据
      const { procInstId, taskId } = this;
      // 判断是否获取到 procInstId
      if (!procInstId) {
        return;
      }

      const params = Object.assign(
        {},
        { procInstId: procInstId },
        {
          ...this.configurationAssociationPagination,
          start: (this.configurationAssociationPagination.start - 1) * 5
        }
      );

      service.queryConfigurationAssociation(params).then(res => {
        const { result } = res;

        const userArray = result.map(item => {
          if (!item.userId) {
            return (item.userId = this.$store.state.user.userId);
          }
          return item.userId;
        });

        // 查询用户数据并配置关联项合并
        if (!userArray.length) {
          this.configurationAssociationData = [];
          return (this.configurationAssociationDataLoading = false);
        }

        // 获取用户信息并与配置关联项关联
        service
          .queryUser({
            userIds: userArray.toString()
          })
          .then(response => {
            response.result.forEach(userItem => {
              result.forEach((resultItem, i) => {
                if (resultItem.userId == userItem.userId) {
                  resultItem.userInfo = userItem;
                }
              });
            });

            this.configurationAssociationDataLoading = false;

            this.configurationAssociationData = result;
            this.configurationAssociationDataTotal = res.count;
          });
      });
    },
    deleteconfigurationAssociation(row) {
      // 删除配置关联项
      this.$confirm("此操作将删除此条配置关联项, 是否继续?", "删除配置关联项", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          service.deleteCI(row.id).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.queryConfigurationAssociation();
          });
        })
        .catch(() => {});
    },
    addConfigurationAssociation() {
      this.CIDialogVisible = true;
      this.queryResModelType();
    },
    save() {
      const radioCI = this.radioCI;
      if (radioCI) {
        const selectData = this.CIData.filter(item => item.ciid === radioCI)[0];

        if(!selectData) {
          return this.$message.error("选中的数据不在当前分页！");
        }

        const { ciid, ciname } = selectData;

        const { taskId, procInstId, configTypeForm } = this;

        const params = {
          taskId: taskId,
          procInstId: procInstId,
          ciCategory: document
            .querySelector("#config-type-form .el-input__inner")
            .getAttribute("value"),
          ciId: ciid,
          ciName: ciname
        };

        // 关联 CI 选项
        service.updateCI(JSON.stringify(params)).then(res => {
          // this.back();
          if(res && res.message) {
            return this.$message.error(res.message);
          }
          this.queryConfigurationAssociation();
          this.CIDialogVisible = false;
        });
      } else {
        return this.$message.warning("请先勾选单选框！");
      }
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
    CIDetail(row) {
      // 查看CI详情
      this.CISelectData = row;
      this.CIPropertydialogVisible = true;
    },
    jumpToAssociationForm(row) {
      // 跳转到关联表单
      this.$router.push({
        name: "associationForm",
        params: {
          procInstId: row.procInstId,
          taskId: row.taskId,
          ciId: row.ciId,
          ciName: row.ciName
        },
        query: { ciCategory: row.ciCategory }
      });
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
    },
    handleChange() {
      // 下拉获取字段列表
      const type = this.configTypeForm.type;

      if (type.length > 2) {
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
      } else {
        this.fieldsArray = [];
      }
    }
  },
  filters: {
    times(val) {
      if(!val) {
        return '--'
      }
      // debugger
      const format = val => moment(val).format('YYYY-MM-DD HH:mm:ss');

      if(val.includes('-')) {
        return format(val);
      }
      const toNum = Number(val);
      return isNaN(toNum) ? '--' : format(toNum);
    }
  }
};
</script>

<style scoped>
</style>