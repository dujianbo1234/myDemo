<template>
  <div class="cont">
    <div class="RightRow">
      <el-card>
        <el-form :inline="true" label-position="right" label-width="70px" size="small">
          <el-form-item label="系统">
            <el-input v-model="initData.conSystem" placeholder="请输入系统名称" @keyup.enter.native="queryContacts()"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="initData.conName" placeholder="请输入对应名字" @keyup.enter.native="queryContacts()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" class="search_btn" @click="queryContacts()" style="margin-left:10px;">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="RightRow">
      <el-card>
        <div class="buttonItem">
          <el-button size="small" class="search_btn" @click="addTmp">新增</el-button>
          <el-button size="small" plain class="opt_btn del_btn" @click="deleteContacts(multipleSelection)">批量删除</el-button>
          <el-upload class="upload-demo" con_name="templateFile" :action="importUrl" :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeUpload" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList" :show-file-list="false" :headers="headers">
            <el-tooltip class="item" effect="dark" content="只能上传xml文件" placement="top">
              <el-button size="small" class="opt_btn">导入</el-button>
            </el-tooltip>
          </el-upload>
          <el-button size="small" class="opt_btn" @click.stop="export_m($event)">
            导出
          </el-button>
        </div>
        <el-table ref="multipleTable" :data="dataList" tooltip-effect="dark" @selection-change="handleSelectionChange" :header-cell-style="headStyle">
          <el-table-column type="selection" width="40">
          </el-table-column>
          <el-table-column label="系统" prop="con_system">
          </el-table-column>
          <el-table-column label="角色" prop="con_role">
          </el-table-column>
          <el-table-column label="姓名" prop="con_name">
          </el-table-column>
          <el-table-column label="部门" prop="con_department">
          </el-table-column>
          <el-table-column label="手机" prop="con_phone">
          </el-table-column>
          <el-table-column label="邮箱" prop="con_email" width="200">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" class="table_btn" size="small" @click.stop="see(scope.row,'edit')">编辑</el-button>
              <el-button type="text" class="table_btn" size="small" @click.stop="see(scope.row,'clone')">更新</el-button>
              <el-button type="text" class="table_btn" size="small" @click.stop="deleteContacts(scope.row.con_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" align="right">
          <el-pagination align="right" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="[10,20,50]" layout="prev, pager, next, total,sizes,jumper" :total="totalItems" :pager-count="5">
          </el-pagination>
        </div>
      </el-card>
    </div>
    <div class="cLog">
      <!-- 新增-->
      <el-dialog :close-on-click-modal="false" :visible.sync="tmpDialog" width='64%' @close="close(false)" class="logAdd-dialog opt">
        <div class="details-title">
          <el-form :model="tableForm" ref="tableForm" class="addForm">
            <span class="sp"><span>编辑</span></span>
            <el-table class="bankTable" :data="tableForm.bankData" style="width: 100%;margin:20px 0;" @selection-change="handleSelectionChange">
              <el-table-column type="index" width="50" label="序号"></el-table-column>
              <el-table-column label="系统" prop="con_system">
                <template slot-scope="scope">
                  <el-form-item :prop="`bankData.${scope.$index}.con_system`" :rules="rules.con_system">
                    <el-input v-model="scope.row.con_system"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="角色" prop="con_role">
                <template slot-scope="scope">
                  <el-form-item :prop="`bankData.${scope.$index}.con_role`" :rules="rules.con_role">
                    <el-input v-model="scope.row.con_role"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="姓名" prop="con_name">
                <template slot-scope="scope">
                  <el-form-item :prop="`bankData.${scope.$index}.con_name`" :rules="rules.con_name">
                    <el-input v-model="scope.row.con_name"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="部门" prop="con_department">
                <template slot-scope="scope">
                  <el-form-item :prop="`bankData.${scope.$index}.con_department`" :rules="rules.con_department">
                    <el-input v-model="scope.row.con_department"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="手机" prop="con_phone">
                <template slot-scope="scope">
                  <el-form-item :prop="`bankData.${scope.$index}.con_phone`" :rules="rules.con_phone">
                    <el-input v-model="scope.row.con_phone"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="邮箱" prop="con_email">
                <template slot-scope="scope">
                  <el-form-item :prop="`bankData.${scope.$index}.con_email`" :rules="rules.con_email">
                    <el-input v-model="scope.row.con_email"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column width="55">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="添加" placement="top">
                    <i class="el-icon-circle-plus-outline table_btn" @click.stop="add(scope.row,scope.$index)"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除" placement="top">
                    <i class="el-icon-remove-outline table_btn" @click.stop="del(scope.$index)" v-if="tableForm.bankData.length>1 &&scope.$index>0"></i>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
        <div class="details-title">
          <div class="sBtn">
            <el-button class="finish" @click="increase('tableForm')">保存</el-button>
          </div>
        </div>
      </el-dialog>
      <!-- 编辑-->
      <el-dialog :close-on-click-modal="false" :visible.sync="editDialog" width='34%' @close="close(false)" class="logAdd-dialog opt">
        <div class="details-title">
          <div>
            <el-form :rules="rules" :inline="true" :model="selectData" label-position="right" label-width="90px" size="small" ref="qForm" style="text-align:left;" class="editForm">
              <span class="sp"><span>编辑</span></span>
              <div class="logAdd-obj">
                <el-form-item label="系统:" prop="con_system">
                  <el-input v-model="selectData.con_system" placeholder="请输入系统名称"></el-input>
                </el-form-item>
                <el-form-item label="角色:" prop="con_role">
                  <el-input v-model="selectData.con_role" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="姓名:" prop="con_name">
                  <el-input v-model="selectData.con_name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="部门:" prop="con_department">
                  <el-input v-model="selectData.con_department" placeholder="请输入部门名称"></el-input>
                </el-form-item>
                <el-form-item label="手机:" prop="con_phone">
                  <el-input v-model="selectData.con_phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="con_email">
                  <el-input v-model="selectData.con_email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
        <div class="details-title">
          <div class="sBtn">
            <el-button class="finish" @click="editContacts('qForm')">保存</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth';
import { mapState, mapMutations } from 'vuex';
import server from '@/modules/mms/api/malfunctionWarning';
export default {
  name: "malfunctionWarning",
  data() {
    let valid_phone = (rule, value, callback) => {
      if(value.length>0){
        let reg = /^1(3|4|5|7|8)\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error('号码有误，请重填'));
        } else {
          callback();
        } 
      }else {
        callback(new Error('请输入手机号码'));
      }     
    };
    let valid_email = (rule,value,callback) =>{
      if(value.length>0){
        let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(value)) {
          callback(new Error('地址有误，请重填'));
        } else {
          callback();
        } 
      }else {
        callback(new Error('请输入邮箱'));
      }   
    };  
    return {
      tableForm: {
        bankData: [{
          con_system: '',
          con_role: '',
          con_name: '',
          con_department: '',
          con_phone: '',
          con_email: ''
        }],
      },
      rules: {
        con_name: [
          { required: true, message: '请输入姓名', trigger: 'change' },
        ],
        con_system: [
          { required: true, message: '请输入系统名称', trigger: 'change' }
        ],
        con_role: [
          { required: true, message: '请输入角色名称', trigger: 'change' }
        ],
        con_phone: [
          { required: true, message: '请输入手机号码', trigger: 'change' },
          { validator: valid_phone, trigger: 'blur' }
        ],
        con_email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          { validator: valid_email, trigger: 'blur' }
        ],
        con_department: [
          { required: true, message: '请输入部门名称', trigger: 'change' }
        ]
      },
      importUrl: '',
      headers: {
        'X-Token': getToken()
      },
      headStyle: {
        'background-color': '#F4F8F9',
        'color': 'rgba(0,0,0,0.60)',
      },
      addObj: {
        con_system: '',
        con_role: '',
        con_name: '',
        con_department: '',
        con_phone: '',
        con_email: ''
      },
      tmpDialog: false,
      editDialog: false,
      pageSize: 10,
      currentPage: 1,
      totalItems: 0,
      initData: {
        conSystem: '',
        conName: ''
      },
      addInit: { //初始化新增模板参数
      },
      dataList: [],
      multipleSelection: [],
      selectData: {},
      detele_ids: [],
      //模板导入
      fileList: [],
    };
  },
  created() {
    this.queryContacts()
    this.importUrl = '/collector/api/v1/template/import?create_user_id=' + (this.usercon_name || 'admin') + '&template_type=' + this.collectType;
  },
  computed: {
    ...mapState({
      usercon_name: state => state.user.con_name
    })
  },
  mounted() {},
  methods: {
    queryContacts(pageSize, currentPage) {
      if (!pageSize) {
        this.currentPage = 1;
        this.pageSize = 10;
      }
      let conName = this.initData.conName.replace(/ /g, '');
      let conSystem = this.initData.conSystem.replace(/ /g, '');
      server.queryContacts(this.currentPage, this.pageSize,conName, conSystem).then((res) => {
        this.dataList = res.data.params;
        this.totalItems = res.data.pageCount;
      });
    },
    editContacts(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          server.editContacts([this.selectData])
            .then((res) => {
              this.$message.success("修改成功！");
              this.close(true);
            });
        } else {
          this.$message.error('请填写对应内容后提交');
          return;
        }
      });
    },
    increase(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          server.addContacts(this.tableForm.bankData).then(res => {
              this.$message.success("新增成功！");
              this.close(true);
            })
            .catch(error => {

            });
        } else {
          this.$message.error('请填写对应内容后提交');
          return;
        }
      });
    },
    add() {
      this.tableForm.bankData.push(this.addObj)
    },
    del(index) {
      this.tableForm.bankData.splice(index, 1);
    },
    reset() {
      this.initData.con_system = '';
      this.initData.con_name = '';
    },
    close(bool) {
      this.tmpDialog = false;
      this.editDialog = false;
      this.tableForm.quotaData = [];
      this.$refs['tableForm'].resetFields();
      if (true) {
        this.queryContacts();
      }
    },
    //删除
    deleteContacts(value) {
      let conIds = '';
      if (value.length === 0) {
        this.$message.warning("请勾选需要删除的联系人！");
        return;
      }
      if (!Array.isArray(value)) {
        conIds = value;
      } else {
        conIds = this.getIds(value).join(',');
      }
      this.$confirm('此操作将永久删除所选联系人, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        server.deleteContacts(conIds).then(res => {
          this.queryContacts();
          this.$message.success("删除成功！");
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getIds(arr) {
      let ids = [];
      arr.map((item) => {
        ids.push(item.con_id);
      });
      return ids;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      for (var i = 0; i < val.length; i++) {
        this.detele_ids.push(val[i].template_id);
      }
    },
    see(row, type) {
      this.editDialog = true;
      this.selectData = {
        con_id: row.con_id,
        con_system: row.con_system,
        con_name: row.con_name,
        con_department: row.con_department,
        con_role: row.con_role,
        con_email: row.con_email,
        con_phone: row.con_phone
      };
    },
    addTmp() {
      this.tmpDialog = true;
      // this.quotaData.push(this.addObj);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.queryContacts(this.pageSize, this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryContacts(this.pageSize, this.currentPage);
    },
    //导入
    beforeUpload(file) {
      if (file.type != "text/xml") {
        this.$message({
          type: "error",
          message: "请导入正确类型的文件！"
        });
        return false;
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleSuccess(res, file, fileList) {
      let type = 'success';
      let con_name = '导入成功'
      this.$message({
        type: type,
        message: con_name
      });
      this.fileList = [];
      this.allquery();
    },
    handleError(error, file, fileList) {
      let err = JSON.parse(error.message);
      let errMsg = '<strong>错误编码: <i>' + err.code + '</i></strong></br>' +
        '<strong>错误类型: <i>' + err.con_name + '</i></strong></br>' +
        '<strong>详细信息: <i>' + err.msg + '</i></strong>';
      this.$message({
        dangerouslyUseHTMLString: true,
        type: 'error',
        message: errMsg
      });
    },
    //导出
    export_m(event) {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择至少一条数据导出'
        });
        event.preventDefault();
        return;
      }
      var ids = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].template_id);
      }
      server.export_module(ids).then((res) => {
          let url = window.URL.createObjectURL(new Blob([res]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', 'templates.xml')
          document.body.appendChild(link)
          link.click()
        })
        .catch((error) => {
          console.log(error);
        });
      for (var i = 0; i < this.dataList.length; i++) {
        this.$refs.multipleTable.toggleRowSelection(this.dataList[i], false);
      }
    }
  }
};

</script>
<style lang="scss" scoped>
.setDown {
  position: relative;
  top: -54px;
}

.table_btn {
  color: rgba(66, 185, 131, 1);
  font-size: 14px;
  cursor: pointer;
}

.step_btn {
  background: rgba(66, 185, 131, 0.4);
  border: 1px solid #42B983;
  color: rgba(66, 185, 131, 1);
  cursor: pointer;
  margin-left: 8px;
  border-radius: 3px;
  padding: 8px 11px;

  &:hover {
    background: rgba(66, 185, 131, 0.2);
  }
}

.search_btn {
  background: #42B983;
  border: 1px solid #42B983;
  color: #FFFFFF;
  font-size: 14px;

  &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
}

.opt_btn {
  background: #F4F8F9;
  color: rgba(0, 0, 0, 0.70);
  margin-left: 8px;
  font-size: 14px;
  border: none;
  height: 34px;

  &:hover {
    background: #42B983;
    border-color: #42B983;
    color: #fff;
  }
}

.del_btn {
  &:hover {
    background: #FA5555;
    border-color: #FA5555;
    color: #fff;
  }
}

/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: rgba(66, 185, 131, 1);
}

/deep/.el-pagination.is-background .btn-next {
  background: #fff;
}

/deep/.el-pagination.is-background .btn-prev {
  background: #fff;
}

/deep/.el-pagination.is-background .el-pager li {
  border-radius: 3px;
  min-width: 28px;
}


.el-table /deep/ {
  .el-checkbox.is-checked .el-checkbox__inner {
    background-color: #42B983;
    border-color: #42B983;
  }

  .el-checkbox__inner {
    &:hover {
      border-color: #42B983;
    }
  }

  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #42B983;
  }

  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #42B983;
    border-color: #42B983;
  }
}

.el-form /deep/ {
  text-align: left;

  .el-input {
    width: 260px;
  }

  .el-form-item--small .el-form-item__label {
    line-height: 34px;
  }

  .el-input--small .el-input__inner {
    height: 34px;
    line-height: 34px;
  }

  .el-form-item {
    margin: 10px 0;
  }
}


.opt /deep/.el-button {
  margin-left: 10px;
}

.cont {
  .buttonItem {
    margin-bottom: 20px;

    .upload-demo {
      display: inline-block;
    }
  }

  .block {
    margin-top: 12px;
  }

  .RightRow {
    height: auto;
    margin: 10px 0 20px;
    border-radius: 5px;
  }

}

.addForm {
  .el-form-item {
    margin: 10px 0 18px;
  }

  .el-input {
    width: 100px
  }
}

.cLog {
  .icon_pass {
    cursor: pointer;
    width: 25px;
    color: #606266;
    padding-left: 5px;
  }
}

.details-title {
  margin-bottom: 20px;

  .sp {
    display: inline-block;
    min-height: 28px;
    color: #42B983;

    span {
      padding-left: 10px;
      border-left: 3px solid #42B983;
    }

    i {
      padding-left: 10px;
    }
  }

  .sBtn {
    text-align: right;
    margin: 20px 56px;

    button {
      padding: 9px 17px;
    }
  }
}

/deep/.details-obj {
  background: #F4F8F9;
  border-radius: 4px;
  margin: 0 56px;

  .el-form-item {
    width: 45%;
    margin: 6px 10px;
    min-height: 28px;
  }

  .el-form-item__label {
    color: rgba(0, 0, 0, 0.40);
  }

  .el-form-item__content {
    color: rgba(0, 0, 0, 1);
    width: 75%;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .down_class {
    word-wrap: break-word;
  }

  .details-log {
    height: 275px;

    .el-form-item__label {
      display: block;
      float: left;
      width: 25% !important;
      text-align: left;
      padding: 0 0 0 20px;
    }

    .el-form-item__content {
      display: block;
      float: left;
      width: 75%;
    }

    .longItem .el-form-item__label {
      width: 192px !important;
    }

    .longItem .el-form-item__content {
      width: auto;
    }

    .tab_left {
      width: 20%;
      float: left;
      height: inherit;
      background: #fff;
    }

    .tab_right {
      width: 80%;
      float: right;
      min-height: 275px;

      .el-form-item {
        height: 28px;
        margin: 6px 0;
        width: 95%;
        height: auto;
      }

      .sp {
        .el-form-item__label {
          width: 136px !important;
        }

        .el-form-item__content {
          width: auto;
        }
      }
    }

    ul {
      li {
        line-height: 40px;
        height: 40px;
        background: #fff;
        border: 1px solid #f4f8f9;
        padding: 0 5px;
        margin-bottom: -1px;
        margin-right: -1px;
        text-align: center;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.60);
        text-overflow: ellipsis;
        overflow: hidden;

        &:nth-child(1) {
          cursor: default;
        }
      }

      .is-active {
        background: #F4F8F9;
        color: rgba(0, 0, 0, 0.80);
      }
    }
  }

  .des {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;

    .el-form-item__content {
      width: 85%;
    }
  }
}

.logAdd-dialog /deep/ {
  .des {
    min-height: 28px;
    width: 100%;
    text-overflow: ellipsis;
    word-wrap: break-word;

    .el-form-item__content {
      width: 85%;
    }
  }

  .logAdd-obj {
    margin: 0 56px 0 26px;

    /deep/ {
      .el-form-item {
        width: 100%;
      }

      .el-form-item__content {
        width: calc(100% - 90px);

        .el-input,
        .el-cascader,
        .el-select {
          width: 100%;
        }
      }

      .des {
        width: calc(96% + 20px);

        .el-form-item__content {
          width: calc(100% - 90px - 5px);
        }
      }
    }
  }

  .logAdd-form /deep/ {
    .el-input {
      width: 80%;
    }

    .el-tabs--border-card {
      box-shadow: none;
    }

    i {
      padding-left: 5px;
    }

    .desTop {
      display: inline-block;
      position: absolute;
      float: right;
    }
  }
}

.finish {
  background: #42B983;
  border: 1px solid #42B983;
  color: #FFFFFF;

  &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
}

.el-form {
  text-align: left;
}

/deep/ {
  .el-dialog__header {
    padding: 0px 20px 10px;
  }

  .el-dialog__headerbtn {
    top: 10px;
  }

  .el-dialog__body {
    padding: 10px 20px;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.el-table /deep/ {
  .el-checkbox.is-checked .el-checkbox__inner {
    background-color: #42B983;
    border-color: #42B983;
  }

  .el-checkbox__inner {
    &:hover {
      border-color: #42B983;
    }
  }

  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #42B983;
  }

  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #42B983;
    border-color: #42B983;
  }
}



.opt /deep/ {
  .el-form-item--small .el-form-item__label {
    line-height: 34px;
  }

  .el-input--small .el-input__inner,
  .el-checkbox,
  .el-checkbox__input {
    height: 34px;
    line-height: 34px;
  }
}

</style>
