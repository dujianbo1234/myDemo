<template>
  <div class="process-manage-container">
    <el-card class="box-card">
      <div class="form-container">

        <el-form
          :inline="true"
          ref="form"
          :model="form"
          label-width="80px"
        >
          <!-- <el-form-item>
              <el-input v-model="form.name" placeholder="请输入流程创建人"></el-input>
            </el-form-item> -->
          <el-form-item>
            <el-input
              v-model="form.processDefinitionNameLike"
              clearable
              @keyup.enter.native="getProcessDefinitionCategories(true)"
              placeholder="请输入流程名称"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-select
              v-model="form.processDefinitionCategory"
              clearable
              filterable
              @focus="getAllProcessDefinitionCategories"
              @change="getProcessDefinitionCategories(true)"
              placeholder="请选择流程类别"
            >
              <el-option
                v-for="item in processClassData"
                :key="item.processDefinitionCategory"
                :label="item.processDefinitionCategory"
                :value="item.processDefinitionCategory"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="getProcessDefinitionCategories(true)"
            >查询</el-button>
          </el-form-item>

          <el-form-item>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>

          <el-form-item>
            <el-button
              type="danger"
              @click="batchDelete"
            >批量删除</el-button>

            <el-dialog
              :title="deleteDialogTitle"
              :visible.sync="batchDeleteVisible"
              width="30%"
            >
              <p class="warning-text">
                确定删除该部署流程定义以及其所关联的流程实例、历史流程实例和作业?
              </p>

              <!-- <el-select v-model="cascade" placeholder="请选择">
                    <el-option label="是" :value="true">
                    </el-option>
                    <el-option label="否" :value="false">
                    </el-option>
                  </el-select> -->

              <div
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="batchDeleteVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="batchDeleteConfirm"
                >确定</el-button>
              </div>

            </el-dialog>

          </el-form-item>

          <el-form-item>
            <el-button
              type="success"
              @click="createProcess"
            >新建流程</el-button>
          </el-form-item>
        </el-form>

        <el-dialog
          title="新建流程"
          :visible.sync="uploadDialogVisible"
          width="30%"
          :before-close="handleClose"
          class="avatar-uploader"
          :close-on-click-modal="false"
        >

          <el-upload
            ref="uploadComponent"
            :before-upload="beforeAvatarUpload"
            action="/"
            drag
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="warning-text">请上传 zip 格式的文件</div>
          </el-upload>

          <div
            class="file-info"
            v-if="Object.keys(files).length > 0"
          >
            <i class="el-icon-document"></i>
            <span class="info-detail">文件名：{{files.name}}</span>
            <span class="info-detail">大小： {{files.size}}M</span>
          </div>

          <el-form
            :label-position="'left'"
            :model="processNameUpload"
            :rules="processNameUploadRules"
            ref="processForm"
            label-width="80px"
            class="processNameUpload-Form"
          >
            <el-form-item
              label="流程类别"
              prop="processDefinitionCategory"
            >
              <el-select
                allow-create
                filterable=""
                v-model="processNameUpload.processDefinitionCategory"
                placeholder="请选择流程类别（可手动输入）"
              >
                <el-option
                  v-for="item in processClassData"
                  :key="item.processDefinitionCategory"
                  :label="item.processDefinitionCategory"
                  :value="item.processDefinitionCategory"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="流程名称"
              prop="name"
            >
              <el-input
                v-model="processNameUpload.name"
                placeholder="请输入流程名称"
                clearable
              ></el-input>
            </el-form-item>

            <el-form-item
              label="流程Key"
              prop="key"
            >
              <el-input
                v-model="processNameUpload.key"
                placeholder="请输入流程Key（流程名称的英文名称）"
                class="process-key-class"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>

          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="handleClose">取 消</el-button>
            <el-button
              type="primary"
              @click="uploadProcess('processForm')"
            >确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>

    <el-card class="box-card">
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="processDefineData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @row-click="viewDetail"
        >
          <el-table-column
            type="selection"
            width="40px"
            align="center"
          >
          </el-table-column>

          <el-table-column
            type="index"
            label="序号"
            width="55px"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="processDefinitionName"
            label="流程名称"
            align="center"
            width="120px"
          >
          </el-table-column>

          <el-table-column
            prop="processDefinitionId"
            label="流程ID"
            align="center"
          >
          </el-table-column>

          <el-table-column
            label="版本号"
            width="70px"
            prop="processDefinitionVersion"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="processDefinitionCategory"
            label="流程类别"
            align="center"
          >
          </el-table-column>

          <!-- <el-table-column prop="creater" label="创建人" align="center">
            </el-table-column> -->

          <el-table-column
            show-overflow-tooltip
            prop="processDefinitionDeploymentTime"
            label="创建时间"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.processDefinitionDeploymentTime | time}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="265px"
            align="center"
          >
            <template slot-scope="scope">
              <!-- <el-button
                size="mini"
                type="primary"
                @click="viewDetail(scope.$index, scope.row)"
              >查看</el-button> -->
              <el-button
                size="mini"
                type="primary"
                @click="editProcessDefine(scope.row, $event)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="batchDelete(scope.$index, scope.row, $event)"
              >删除</el-button>
              <el-button
                size="mini"
                type="info"
                @click="versionManage(scope.$index, scope.row, $event)"
              >版本管理</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog
          title="流程详情"
          :visible.sync="detailVisable"
          width="60%"
          custom-class="process-detail"
        >
          <el-row :gutter="16">
            <el-col :span="8">
              <el-card class="box-card">
                <div
                  slot="header"
                  class="clearfix"
                >
                  <span class="process-title">流程信息</span>

                  <div class="header-buttons">
                    <el-tooltip
                      effect="dark"
                      content="编辑流程类别"
                      placement="top"
                    >
                      <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="changeCategoryVisable = true"
                      ></el-button>
                    </el-tooltip>

                    <el-tooltip
                      effect="dark"
                      content="下载流程"
                      placement="top"
                    >
                      <el-button
                        type="text"
                        icon="el-icon-download"
                        @click="downLoadProcessResource"
                      ></el-button>
                    </el-tooltip>

                    <el-tooltip
                      effect="dark"
                      content="删除流程"
                      placement="top"
                    >
                      <el-button
                        type="text"
                        icon="el-icon-delete"
                        @click="batchDelete(true, selectDetailData)"
                      ></el-button>
                    </el-tooltip>

                  </div>
                </div>

                <div class="process-info">
                  <span class="name">流程名称：</span>
                  <p class="name-detail">{{selectDetailData.processDefinitionName}}</p>
                </div>

                <div class="process-info">
                  <span class="name">流程分类：</span>
                  <p class="name-detail">{{selectDetailData.processDefinitionCategory}}</p>
                </div>

                <div class="process-info">
                  <span class="name">流程定义ID：</span>
                  <p class="name-detail">{{selectDetailData.processDefinitionId}}</p>
                </div>

                <div class="process-info">
                  <span class="name">创建时间：</span>
                  <p class="name-detail">{{selectDetailData.processDefinitionDeploymentTime | time}}</p>
                </div>
              </el-card>
            </el-col>

            <el-col :span="16">
              <a
                :href="imgSrc"
                target="_blank"
              >
                <img
                  class="img"
                  :src="imgSrc"
                  alt="流程图"
                  title="流程图"
                >
              </a>
            </el-col>
          </el-row>

          <el-dialog
            width="30%"
            title="修改流程类别"
            :visible.sync="changeCategoryVisable"
            append-to-body
          >
            <el-form
              :label-position="'left'"
              :model="categoriesParams"
              :rules="processNameUploadRules"
              ref="categoriesParams"
              label-width="80px"
              class="processNameUpload-Form"
            >
              <el-form-item
                label="流程类别"
                prop="processDefinitionCategory"
              >
                <el-select
                  allow-create
                  filterable=""
                  v-model="categoriesParams.processDefinitionCategory"
                  placeholder="请选择流程类别"
                >
                  <el-option
                    v-for="item in processClassData"
                    :key="item.processDefinitionCategory"
                    :label="item.processDefinitionCategory"
                    :value="item.processDefinitionCategory"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>

            <div
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="changeCategoryVisable = false">取 消</el-button>
              <el-button
                type="primary"
                @click="changeCategory('categoriesParams')"
              >确定</el-button>
            </div>
          </el-dialog>
        </el-dialog>

        <div class="pagination">
          <el-pagination
            v-if="showPagination"
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            background
          >
          </el-pagination>
        </div>

        <el-dialog
          title="历史版本"
          :visible.sync="historyVersionVisable"
          custom-class="history-version-dialog"
          width="60%"
        >
          <div class="history-version-dialog-top">
            <el-row :gutter="16">
              <el-col :span="12">
                <span class="process-info">流程名称：{{selectVerionData.processDefinitionName}}</span>
              </el-col>
              <!-- <el-col :span="8">
                    <span class="process-info">流程类别：{{selectVerionData.processDefinitionCategory}}</span>
                  </el-col> -->
              <el-col
                :span="12"
                style="text-align: right"
              >
                <el-button
                  size="mini"
                  type="danger"
                  @click="batchDelete"
                >批量删除</el-button>
              </el-col>
            </el-row>
          </div>

          <el-table
            :data="historyVersionData"
            v-loading="historyVersionVisableLoading"
            @selection-change="handleVersionSelectionChange"
            @row-click="viewDetail"
          >
            <el-table-column
              type="selection"
              width="55px"
              align="center"
            >
            </el-table-column>

            <el-table-column
              type="index"
              label="序号"
              width="50px"
              align="center"
            ></el-table-column>

            <el-table-column
              property="processDefinitionVersion"
              label="版本号"
              align="center"
            ></el-table-column>

            <el-table-column
              property="processDefinitionCategory"
              label="流程类别"
              align="center"
            ></el-table-column>

            <el-table-column
              property="processDefinitionDeploymentTime"
              label="创建时间"
              width="200px"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{scope.row.processDefinitionDeploymentTime | time}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              width="260px"
            >
              <template slot-scope="scope">
                <!-- <el-button
                  size="mini"
                  type="primary"
                  @click="viewDetail(scope.$index, scope.row)"
                >查看</el-button> -->
                <el-button
                  size="mini"
                  type="primary"
                  @click="editProcessDefine(scope.row, $event)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="batchDelete(scope.$index, scope.row, $event)"
                >删除</el-button>
                <el-button
                  size="mini"
                  type="info"
                  @click="redeploy(scope.$index, scope.row, $event)"
                >生成新版本</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination
              v-if="historyVersionTotal > 10"
              :current-page.sync="paginationParamsForHistoryVersion.start"
              :page-size.sync="paginationParamsForHistoryVersion.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="historyVersionTotal"
              background
            >
            </el-pagination>
          </div>
        </el-dialog>
      </div>
    </el-card>
    <!-- <el-row :gutter="16">
      <el-col :span="4">
        <el-card class="box-card">
          <div class="process-classify">
            <el-input
              placeholder="输入关键字查询"
              v-model="filterText"
            >
            </el-input>

            <div class="tree-container">
              <el-tree
                class="filter-tree"
                highlight-current
                node-key="processDefinitionCategory"
                :data="processClassData"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
                ref="processTree"
                @node-click="handleNodeClick"
                :render-content="renderContent"
              >
                <span
                  class="custom-tree-node"
                  slot-scope="{ node, data }"
                >
                  <span>{{node.processDefinitionCategory}}</span>
                </span>
              </el-tree>
            </div>
          </div>
        </el-card>

      </el-col>

      <el-col :span="20">
       

      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import * as request from "@/modules/pms/api/pms/index.js";

import axiosInstance from "@/modules/pms/api/index.js";

import { api } from "@/modules/pms/api/api.js";

export default {
  name: "processManage",
  data() {
    return {
      processNameUpload: {
        // create process define params
        name: "",
        key: "",
        processDefinitionCategory: ""
      },
      categoriesParams: {
        // change processDefinitionCategory params
        processDefinitionCategory: ""
      },
      processNameUploadRules: {
        // upload rules
        name: [
          { required: true, message: "流程名称不能为空", trigger: "blur" },
          {
            pattern: /^\s*[\S].{0,29}\s*$/,
            message: "流程名称长度在 1 到 30 个字符",
            trigger: "blur"
          }
        ],
        processDefinitionCategory: [
          { required: true, message: "流程类别不能为空", trigger: "change" },
          {
            pattern: /^\s*[\S].{0,24}\s*$/,
            message: "流程类别长度在 1 到 25 个字符",
            trigger: "change"
          }
        ],
        key: [
          { required: true, message: "流程Key不能为空", trigger: "blur" },
          {
            pattern: /^\s*[\S].{0,29}\s*$/,
            message: "流程Key长度在 1 到 30 个字符",
            trigger: "blur"
          }
        ]
      },
      historyVersionVisable: false, // default history version dialog visable
      historyVersionVisableLoading: false, // nistory version table loading
      uploadDialogVisible: false, // upload dialog visable
      detailVisable: false, // detail visable
      batchDeleteVisible: false, // batch delete dialog
      changeCategoryVisable: false, // change category dialog visable
      historyVersionData: [],
      filterText: "", // filter text
      processClassData: [
        // process class data
        // test process class data
      ],
      defaultProps: {
        children: "children",
        label: "processDefinitionCategory"
      },
      form: {}, //
      processDefineData: [],
      currentPage: 1, // The default current page should start with 1
      pageSize: 10,
      total: 0, // default total,
      historyVersionTotal: 0,
      paginationParamsForHistoryVersion: {
        start: 1,
        limit: 10
      },
      selectVerionData: {},
      selectDetailData: {},
      uploadData: new FormData(),
      selectChangeData: [],
      selectVersionData: [], // batch delete data
      isBatchDelete: false,
      // cascade: false, // delete process define releted,
      deleteData: {},
      historyCascade: false,
      files: {} // files list
    };
  },
  computed: {
    showPagination() {
      // should show pagination
      return this.total > 10;
    },
    paginationParams() {
      // pagination params
      return {
        start: this.currentPage,
        limit: this.pageSize
      };
    },
    imgSrc() {
      return `${axiosInstance.defaults.baseURL}${api}/processDefinitions/${
        this.selectDetailData.processDefinitionId
      }/image`;
    },
    deleteDialogTitle() {
      let batchTitle = "批量删除流程";

      let historyVersion = "";

      const isHistoryDialog = this.historyVersionVisable;

      if (isHistoryDialog) {
        batchTitle = "批量删除流程历史版本";
        historyVersion = "历史版本";
      }

      return this.isBatchDelete
        ? batchTitle
        : "删除--" +
            this.selectDetailData.processDefinitionName +
            historyVersion;
    }
  },
  mounted() {
    // componments in mounted fetch process define data
    this.getProcessDefinitionCategories();
    // this.queryProcessDefinitionCategories();
    this.getAllProcessDefinitionCategories();
  },
  watch: {
    filterText(val) {
      // watch filter text
      this.$refs.processTree.filter(val);
    },
    currentPage: function(val, oldVal) {
      // watch current page
      this.getProcessDefinitionCategories();
    },
    pageSize: function() {
      // watch page size
      this.getProcessDefinitionCategories();
    },
    paginationParamsForHistoryVersion: {
      handler() {
        this.versionManage();
      },
      deep: true // deep for Object property
    },
    selectDetailData: function(val) {
      this.categoriesParams.processDefinitionCategory =
        val.processDefinitionCategory;
    }
  },
  methods: {
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span title={data.processDefinitionCategory}>
            {data.processDefinitionCategory}
          </span>
        </span>
      );
    },
    getAllProcessDefinitionCategories() {
      request
        .getProcessDefinitionCategories()
        .then(res => {
          if (res) {
            // this.processClassData = res;
            const { result } = res;

            let processClassData = result.map(
              item => item.processDefinitionCategory
            );

            const arr = [];

            processClassData.forEach(item => {
              if (arr.indexOf(item) === -1) {
                arr.push(item);
              }
            });

            this.processClassData = arr.map(item => {
              const obj = {};
              obj["processDefinitionCategory"] = item;
              return obj;
            });
          }
        })
        .catch(err => console.log(err));
    },
    handleNodeClick(node) {
      // tree node handle click
      // node label

      let params = {
        start: 1,
        limit: 10
      };

      const { processDefinitionNameLike } = this.form;

      if (processDefinitionNameLike) {
        Object.assign(params, {
          processDefinitionNameLike: processDefinitionNameLike
        });
      }

      Object.assign(params, {
        processDefinitionCategory: node.processDefinitionCategory
      });

      request
        .getProcessDefinitionCategories(params)
        .then(res => {
          if (res) {
            this.total = res.total;
            this.processDefineData = res.result;
          }
        })
        .catch(err => console.log(err));
    },
    downLoadProcessResource() {
      // download provess resource
      // use iframe src to upload resource
      const iframe = document.createElement("iframe");
      
      iframe.src = `${axiosInstance.defaults.baseURL}${api}/deployments/${
        this.selectDetailData.id
      }/resources`;

      iframe.style.display = "none";

      document.body.appendChild(iframe);

      // clear setTimeout timer
      const timer = setTimeout(() => {
        clearTimeout(timer);
        document.body.removeChild(iframe);
      }, 1550);
    },
    resetForm() {
      // this.$refs.form.resetFields();
      this.form = {};
      this.getProcessDefinitionCategories();
    },
    getProcessDefinitionCategories(bool) {
      // get Process defines with pageing
      if (bool === true) {
        // this.pageSize = 10;
        this.currentPage = 1;
      }

      let params = this.paginationParams;

      const form = this.form;

      Object.keys(form).forEach(item => {
        if (form[item]) {
          const assignObj = {};
          assignObj[item] = form[item];
          params = this.assign(params, assignObj);
        }
      });

      request
        .getProcessDefinitionCategories(params)
        .then(res => {
          if (res) {
            this.total = res.total;
            this.processDefineData = res.result;
          }
        })
        .catch(err => console.log(err));
    },
    filterNode(value, data) {
      // filter text
      if (!value) return true;
      return data.processDefinitionCategory.indexOf(value) !== -1;
    },
    handleClose(done) {
      // upload handle close
      // use icon to close upload dialog
      // hock handle
      this.$confirm("确认取消上传吗?")
        .then(_ => {
          // reset uploadData
          this.uploadData = new FormData();
          // reset fields
          this.$refs["processForm"].resetFields();

          this.files = {};

          // other way to call
          // and done is event object
          if (typeof done !== "function") {
            return (this.uploadDialogVisible = false);
          }

          // normal to call
          done();
        })
        .catch(_ => {});
    },
    query() {},
    batchDelete(index, row, event) {
      if (event) {
        event.stopPropagation();
      }

      if (
        this.selectChangeData.length === 0 &&
        this.selectVersionData.length === 0 &&
        !row
      ) {
        return this.$message.warning("当前未选择任何流程！");
      }
      // batch delete handle
      this.batchDeleteVisible = true;

      // batch delete or single delete
      this.isBatchDelete = row || index === true ? false : true;

      if (!this.isBatchDelete && row) {
        this.selectDetailData = row;
      }
    },
    createProcess() {
      this.uploadDialogVisible = true;
    },
    closeAllDialog() {
      // close all dialog
      this.batchDeleteVisible = false;
    },
    changeCategory(formName) {
      // change category
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .changeCategory(this.selectDetailData.processDefinitionId, {
              processDefinitionCategory: this.categoriesParams
                .processDefinitionCategory
            })
            .then(res => {
              if (res) {
                this.$message.success("修改成功");
                this.changeCategoryVisable = false;
                this.getProcessDefinitionCategories();
              }
            })
            .catch(err => console.log(err));
        } else {
          return false;
        }
      });
    },
    handleDeleteVersion(index, row) {
      // delete history version
      this.batchDelete(true);
    },
    editProcessDefine(row, event) {
      // edit process define
      if (event) {
        event.stopPropagation();
      }
      this.$router.push({
        name: "drawProcess",
        query: { id: row.processDefinitionId, name: row.processDefinitionName }
      });
    },
    batchDeleteConfirm() {
      // batch delete confirm
      // success handle
      const success = () => {
        this.$message.success(this.deleteDialogTitle + "成功");

        this.paginationParams.start > 1 && this.paginationParams.start--;

        // updata data
        this.getProcessDefinitionCategories();

        // some property reset to default
        this.batchDeleteVisible = false;

        // if (this.cascade) {
        //   this.cascade = false;
        // }

        if (this.detailVisable) {
          this.detailVisable = false;
        }

        // update data
        if (this.historyVersionVisable) {
          this.paginationParamsForHistoryVersion.start > 1 &&
            this.paginationParamsForHistoryVersion.start--;
          this.versionManage();
        }
      };

      // if is batch delete
      if (this.isBatchDelete) {
        // multiple data
        let data = this.selectChangeData.toString();

        if (this.historyVersionVisable) {
          data = this.selectVersionData.toString();
        }

        request
          .deleteProcessDefine(data, {
            cascade: true
          })
          .then(res => {
            success();

            // to default
            this.isBatchDelete = false;
            this.selectChangeData = [];
            this.selectVersionData = [];
          })
          .catch(err => console.log(err));
      } else {
        request
          .deleteProcessDefine(this.selectDetailData.id, {
            cascade: true
          })
          .then(res => {
            success();
          })
          .catch(err => console.log(err));
      }
    },
    uploadProcess(formName) {
      // upload process define
      // rules validate process
      this.$refs[formName].validate(valid => {
        // if validate valid
        if (valid) {
          const formData = this.uploadData;

          // if didn't upload file
          if (!formData.hasFile) {
            return this.$message.error("相关部署文件必须上传！");
          }

          // formdata append params
          Object.keys(this.processNameUpload).forEach(key => {
            formData.append(key, this.processNameUpload[key]);
          });

          // create prcres define request
          request
            .createProcessDefinition(formData)
            .then(res => {
              if (res) {
                // data refresh
                if (res.message) {
                  return this.$message.error(res.message);
                }

                this.getProcessDefinitionCategories();

                this.$message.success("部署成功");

                // reset to new intance
                // IE is not support delete method of new FormData()
                this.uploadData = new FormData();
                // reset fields
                this.$refs["processForm"].resetFields();
                this.files = {};
                // hide dialog
                this.uploadDialogVisible = false;
              }
            })
            .catch(err => console.log(err));
        } else {
          return false;
        }
      });
    },
    beforeAvatarUpload(file) {
      if (file.type.indexOf("zip") === -1) {
        this.$message.warning("请上传 zip 格式的文件！");
        return false;
      }

      const floor = (p, n) => {
        const precision = Math.pow(10, p);
        return Math.floor(n * precision) / precision;
      };

      const size = floor(2, file.size / 1024 / 1024);

      if (size > 10) {
        this.$message.warning("上传文件大小不能超过10M！");
        return false;
      }

      // 如果已经有文件，则重置 uploadData (清除有兼容问题)
      if (this.uploadData.hasFile) {
        this.uploadData = new FormData();
      }

      // before upload hook
      this.uploadData.append("file", file, file.name);
      // need to judge has upload file
      // add proerty hasFile
      this.uploadData.hasFile = true;

      this.files = {
        name: file.name,
        size: size
      };

      return false;
    },
    handleSelectionChange(val) {
      // push id into selectChangeData
      this.selectChangeData = val.map(item => {
        return item.id;
      });
    },
    handleVersionSelectionChange(val) {
      // push id into selectVersionData
      this.selectVersionData = val.map(item => {
        return item.id;
      });
    },
    viewDetail(row) {
      // view process define detail
      this.selectDetailData = row;
      this.detailVisable = true;
    },
    versionManage(index, row, event) {
      // process define version manage
      // if change process define

      if (row) {
        this.selectVerionData = row;
      }

      if (event) {
        // event stopPropagation
        event.stopPropagation();
      }

      // show dialog
      // show loading
      this.historyVersionVisable = this.historyVersionVisableLoading = true;

      request
        .getProcessDefinitionVersion(
          this.assign(
            {
              processDefinitionKey: this.selectVerionData.processDefinitionKey
            },
            this.paginationParamsForHistoryVersion
          )
        )
        .then(res => {
          // hide loading
          this.historyVersionVisableLoading = false;

          const historyVersionData = res.result;

          // sort
          historyVersionData &&
            historyVersionData.sort((a, b) => {
              return (
                parseInt(b.processDefinitionVersion, 10) -
                parseInt(a.processDefinitionVersion, 10)
              );
            });

          this.historyVersionData = historyVersionData;

          this.historyVersionTotal = res.total;
        })
        .catch(err => console.log(err));
    },
    redeploy(index, row, event) {
      event.stopPropagation();

      request
        .redeploy(row.id)
        .then(res => {
          if (res) {
            this.$message.success("部署成功");
            this.versionManage();
          }
        })
        .catch(err => console.log(err));
    },
    assign(...params) {
      return Object.assign({}, ...params);
    }
  }
};
</script>

<style lang="scss">
$borderCr: #dedede;

.process-manage-container {
  padding: 16px;

  .box-card {
    margin: 8px 0 16px 0;
  }

  .el-card__body {
    .form-container {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }

  .el-upload-dragger {
    height: 150px;
    .el-icon-upload {
      margin: 34px 0 16px;
    }
  }

  .avatar-uploader {
    .el-dialog__body {
      padding: 16px;

      .el-upload {
        display: block;
      }
      .el-upload-dragger {
        width: 100%;
      }
      .el-form-item {
        margin-bottom: 22px;
      }
    }
  }

  .process-key-class {
    .el-input__inner {
      padding-right: 16px;
    }
  }

  .el-select {
    width: 100%;
  }

  .warning-text {
    line-height: 1.5;
    margin-bottom: 16px;
    color: #999;
  }

  .file-info {
    margin: 8px 0;
    color: #999;
    // .el-icon-document {

    // }
    .info-detail {
      margin-left: 24px;
    }
  }

  .processNameUpload-Form {
    margin-top: 16px;
  }

  .tree-container {
    margin-top: 8px;
    .el-tree-node__content > .el-tree-node__expand-icon {
      padding: 2px;
    }
    .custom-tree-node {
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .process-classify {
    // border: 1px solid $borderCr;
    // padding: 8px;

    .el-tree-node__content {
      width: 100%;
    }

    .el-tree-node__label {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .table {
    border: 1px solid $borderCr;
    border-bottom: none;
    padding: 8px 8px 0 8px;
    position: relative;
    &::after {
      // resolve two line fold
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
      border-top: 1px solid #eee;
    }

    .pagination {
      margin-top: 24px;
      padding-bottom: 16px;
      text-align: center;
    }
  }
  .history-version-dialog {
    .history-version-dialog-top {
      margin-bottom: 16px;
    }
    .process-info {
      display: inline-block;
      padding: 7px 0;
    }
  }

  .process-detail {
    .process-title {
      font-size: 16px;
      color: #111;
    }
    .header-buttons {
      float: right;
      .el-button {
        font-size: 18px;
        padding: 0;
      }
    }
    .process-info {
      margin-bottom: 12px;
    }
    .name {
      color: #999;
      margin-bottom: 4px;
    }
    .name-detail {
      margin-top: 4px;
      margin-left: 2em;
      word-break: break-all;
      word-wrap: break-word;
    }
    .img {
      width: 100%;
    }
  }
}
</style>
