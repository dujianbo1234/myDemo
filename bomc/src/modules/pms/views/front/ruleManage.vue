<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <el-form :inline="true" ref="ruleManageForm" :model="ruleManageForm" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="ruleManageForm.ruleName" clearable placeholder="请输入规则集名" @keyup.enter.native="queryRuleManageData"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="ruleManageForm.createMan" clearable placeholder="请输入创建人" @keyup.enter.native="queryRuleManageData"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRuleDefinitionCategories">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="batchDelete">批量删除</el-button>
          <el-dialog>
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="batchExportRule">批量导出规则集</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="inputRule">导入规则集</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="createRule">新建规则集</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="新建规则集" class="avatar-uploader" :visible.sync="uploadDialogVisible" width="40%" :before-close="handleClose" :close-on-click-model="false">
        <el-form :label-position="'left'" :model="ruleNameUpload" :rules="ruleNameUploadRules" ref="ruleForm" label-width="80px" class="ruleNameUpload-Form">
          <el-form-item label="规则名字" prop="name" >
            <el-input  v-model="ruleNameUpload.name" placeholder="请输入规则名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="规则集ID" prop="id">
            <el-input v-model="ruleNameUpload.id" placeholder="请输入规则ID" clearable></el-input>
          </el-form-item>
          <el-form-item label="规则描述" prop="describe">
            <el-input v-model="ruleNameUpload.describe" placeholder="请输入规则描述" clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="uploadRule('ruleForm')">确定</el-button>
        </span>        
      </el-dialog>
    </el-card>
    <el-card class="box-card">
      <el-table  :data="ruleManageData" v-loading="ruleManageDataLoading" tooltip-effect="dark" style="width:100%">
        <el-table-column type="selection" width="90px" aligh="center">
        </el-table-column>
        <el-table-column type="index" label="序号" width="90px" align="center">
        </el-table-column>
        <el-table-column property="" label="规则集名" width="180px" align="center">
        </el-table-column>
        <el-table-column property="" label="版本号" width="150px" align="center">
        </el-table-column>
        <el-table-column property="" label="创建人" width="180px" align="center">
        </el-table-column>
        <el-table-column property="" label="最后修改时间" width="280px" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template slot-scope="scope">
            <el-button>编辑</el-button>
            <el-button>查看详情</el-button>
             <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog>
      </el-dialog>
      <el-pagination class="pagination" v-if="ruleManageDataTotal > -10" :current-page.sync="ruleManageDataPagination.start" :page-size.sync="ruleManageDataPagination.limit" layout="total, sizes, prev, pager, next, jumper" :total="ruleManageDataTotal" background></el-pagination>
    </el-card>
  </div>
</template>

<script>

import * as request from "@/modules/pms/api/pms/logmanage.js";
import axiosInstance from "@/modules/pms/api/index.js";

import { api } from "@/modules/pms/api/api.js";

export default {
  name: 'ruleManage',
  data(){
    return {
        ruleManageForm:{
            ruleName: "",
            createMan: ""
        },
        ruleNameUpload:{
            name:"",
            id:"",
            describe:""
        },
    ruleManageData:[],
    ruleManageDataPagination: {
        start: 1,
        limit: 10
      },
      ruleNameUploadRules:{
        name:[
          {required: true, message: "规则名称不能为空", trigger: "blur" }
        ],
        id:[
          {required: true, message: "规则ID不能为空", trigger: "blur"}
        ],
        describe:[
          {required: true, message: "规则描述不能为空", trigger: "blur"}
        ]
      },
      ruleManageDataTotal: 0,
      uploadDialogVisible:false,

    };
  },
  methods:{
    createRule(){
      console.log('hi');
      this.uploadDialogVisible=true;
    },
    getRuleDefinitionCategories(){

    },
    batchDelete(){
      
    },
    batchExportRule(){

    },
    inputRule(){

    },
    handleClose(){
      this.uploadDialogVisible = false;
    },
    uploadRule(ruleform){

    }
  },
  watch: {
    ruleManageDataPagination: {
      deep: true,
      handler() {
        this.queryLogManageData();
      }
    }
  },
  mounted(){
    this.getRuleDefinitionCategories();
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.pagination {
    text-align: center;
    margin-top: 24px;
  }
.avatar-uploader {
  .el-dialog__body {
    padding: 16px;
    .el-form-item {
      margin-bottom: 22px;
    }
  }
}
.ruleNameUpload-Form {
    margin-top: 16px;
    padding-right: 16px;
  }

</style>
