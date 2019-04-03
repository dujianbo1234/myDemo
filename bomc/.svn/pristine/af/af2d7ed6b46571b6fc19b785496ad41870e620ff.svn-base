<template>
  <div class="cont">
    <div class="RightRow">
      <el-card>
        <el-form :inline="true" label-position="right" label-width="70px" size="small">
          <el-form-item label="模板名称">
            <el-input v-model="initData.template_name" placeholder="请输入模板名称" @keyup.enter.native="allquery()"></el-input>
          </el-form-item>
          <el-form-item label="分组">
            <el-input v-model="initData.group" placeholder="请输入分组" @keyup.enter.native="allquery()"></el-input>
          </el-form-item>
          <!-- <transition-group name="fade" class="adf"> -->
            <!-- </transition-group> -->
           <!--  <el-button size="small" class="step_btn" icon="el-icon-arrow-down"  @mouseover.native="enter" @mouseout.native="leave">
           </el-button> -->
           <!-- <div class="adf" :class="{sef:!setDown}" @mouseover.native="enter" @mouseout.native="leave"> -->
              <!-- <div style="padding: 10px 20px 20px;display: block;white-space: initial;text-align: left;">
                <el-form-item label="初始编号" key="1">
              <el-input v-model="initData.group" placeholder="请输入初始编号" @keyup.enter.native="allquery()"></el-input>
            </el-form-item>
            <el-form-item label="文件描述" key="2" >
              <el-input v-model="initData.group" placeholder="请输入文件描述" @keyup.enter.native="allquery()"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" key="3" >
              <el-input v-model="initData.group" placeholder="请输入开始时间" @keyup.enter.native="allquery()"></el-input>
            </el-form-item>
            <el-form-item label="结束时间" key="4">
              <el-input v-model="initData.group" placeholder="请输入结束时间" @keyup.enter.native="allquery()"></el-input>
            </el-form-item>
              </div>
            </div> -->
            <el-form-item>
              <el-button size="small" class="search_btn" @click="allquery()" style="margin-left:10px;">查询</el-button>
              <el-button size="small" class="opt_btn" @click.stop="reset">重置</el-button>
              <i class="iconfont step_btn">&#xe619;</i>
              <!-- </button> -->
              <!-- <el-button size="small" class="step_btn" v-show="collectType===3&&setDown===false" icon="el-icon-arrow-up"></el-button> -->
              
              <i class="iconfont step_btn">&#xe615;</i>
              
            </el-form-item>
          </el-form>
        </el-card>
      </div>
      <div class="RightRow">
        <el-card>
          <div class="buttonItem">
            <el-button size="small" class="search_btn" @click="addTmp">新增</el-button>
            <el-button size="small" plain class="opt_btn del_btn" @click="deleteModule(multipleSelection)">批量删除</el-button>
            <el-upload class="upload-demo" name="templateFile" :action="importUrl" :on-success="handleSuccess" :on-error="handleError" :before-upload="beforeUpload" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList" :show-file-list="false" :headers="headers">
              <el-tooltip class="item" effect="dark" content="只能上传xml文件" placement="top">
                <el-button size="small" class="opt_btn">导入</el-button>
              </el-tooltip>
            </el-upload>
            <el-button size="small" class="opt_btn" @click.stop="export_m($event)">
              导出
            </el-button>
            <span class="setShow" @click="setShow">设置列隐藏/显示</span>
          </div>
          <el-table ref="multipleTable" :data="alertData" tooltip-effect="dark" @selection-change="handleSelectionChange" :header-cell-style="headStyle" @row-click="rowClick">
            <el-table-column type="selection" key="1">
            </el-table-column>
            <el-table-column prop="template_name" label="模板名称" v-if="show.name" key="2">
            </el-table-column>
            <el-table-column label="分组" prop="group" v-if="show.group" key="3">
            </el-table-column> 
            <el-table-column label="描述" prop="description" show-overflow-tooltip popper-class="toolTipClass" v-if="show.des" key="4">
            </el-table-column>
            <el-table-column label="指标数量" v-if="collectType!==3 && show.count" width="120" key="5">
              <template slot-scope="scope">
                {{scope.row.used_kpi_count}}/{{scope.row.kpi_count}}
              </template>
            </el-table-column> 
            <el-table-column label="创建者" prop="create_user_id" width="120" v-if="show.person" key="6">
            </el-table-column>
            <el-table-column label="创建时间" v-if="show.time" key="7">
              <template slot-scope="scope">
                {{scope.row.create_time | dateFilter}}
              </template>
            </el-table-column>
            <el-table-column label="操作" key="8">
              <template slot-scope="scope">
                <el-button type="text" class="table_btn" size="small" @click.stop="see(scope.row,'edit')">修改</el-button>
                <el-button type="text" class="table_btn" size="small" @click.stop="deleteModule(scope.row.template_id)">删除</el-button>
                <el-button type="text" class="table_btn" size="small" @click.stop="see(scope.row,'clone')">克隆</el-button>
                <el-button el-button type="text" size="small" @click.stop="jump(scope.row.template_id)"class="table_btn">跟踪</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" align="right">
            <el-pagination align="right" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="[10,20,50]" layout="total,sizes,prev, pager, next, jumper" :total="totalItems" :pager-count="5">
            </el-pagination>
          </div>
        </el-card>
      </div>
      <!-- 表单设置显示隐藏 -->
      <el-dialog title="设置列隐藏/显示" class="cloumnStyle" :visible.sync="showDialog" width="25%">
        <ul>
          <li v-for="(item,index) in tmpDialogData" :key="index">
            <el-checkbox v-model="item.select" :disabled="index===0"><span>{{item.name}}</span></el-checkbox> 
          </li>
        </ul>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button class='search_btn' @click="confirmShow">确定</el-button>
        </div>
      </el-dialog>
      <Clog v-if="tmpDialog" :collectType="collectType" :optType="optType" :selectData="selectData" ref="clog" @closeClog="closeClog" :treeData="treeData"></Clog>
    </div>
  </template>
  <script>
    import { getToken } from '@/utils/auth';
    import * as server from "@/modules/collector/api/tmpManage";
    import { treeDataHandle } from '@/modules/collector/utils/getTree';
    import { mapState, mapMutations } from 'vuex';

    import Clog from './Clog.vue';
    export default {
      props: {
        collectType: Number
      },
      name: "template_list",
      components: {
        Clog
      },
      data() {
        return {
          resType:[],
          headers: {
            'X-Token': getToken()
          },
          showDialog:false,
          show:{
            name:true,
            group:true,
            count:true,
            des:true,
            time:true,
            person:true
          },
          tmpDialogData:[
          {
            name: "模板名称",
            select: true,
            flag: "name"
          },
          {
            name: "分组",
            select: true,
            flag: "group"
          },
          {
            name: "指标数量",
            select: true,
            flag: "count"
          },
          {
            name: "描述",
            select: true,
            flag: "des"
          },
          {
            name: "创建时间",
            select: true,
            flag: "time"
          },
          {
            name: "创建者",
            select: true,
            flag: "person"
          }
          ],
          importUrl: '',
          setDown: true,
          headStyle: {
            'background-color': '#F4F8F9',
            'color': 'rgba(0,0,0,0.60)',
          },
          tmpDialog: false,
          optType: '',
          title: '',
          pageSize: 10,
          currentPage: 1,
          totalItems: 0,
          initData: {
            template_name: '',
            group: ''
          },
          addInit: { //初始化新增模板参数
            template_name: '',
            template_content: [],
            resource_type: [],
            group: '',
            // push_position:0,
            description: '',
            is_agent: false,
            userName: '',
            passWord: '',
            port: '',
            sid:''
          },
          alertData: [],
          multipleSelection: [],
          selectData: {},
          detele_ids: [],
          //模板导入
          fileList: [],
          //资源管理数据
          treeData: []
        };
      },
      created() {
        switch(this.collectType){
          case 0:
          this.resType = ['IaaS','Physical','Host'];
          break;
          case 2:
          this.resType = ['PaaS','Logic','Middleware'];
          break;
          case 3:
          this.tmpDialogData.splice(2,1);
          break;
          case 4:
          this.resType = ['PaaS','Logic','Database'];
          break;
        }
        this.allquery();
        this.importUrl = '/collector/api/v1/template/import?create_user_id=' + (this.userName || 'admin')+'&template_type='+this.collectType;
      },
      computed: {
        ...mapState({
          userName: state => state.user.name
        })
      },
      mounted(){
        this.query_r();
      },
      methods: {
        confirmShow() {
          this.tmpDialogData.forEach(val => {
            this.show[val.flag] = val.select;
          });
          this.showDialog = false;
        },
        setShow(){
          this.showDialog = true;
          this.tmpDialogData.forEach(val => {
            if (this.show[val.flag]) {
              val.select = true;
            } else {
              val.select = false;
            }
          });
        },
        jump(id) {
          this.$router.push({ name: 'trackTask', params: { template_id: id } })
        },
        ...mapMutations([
          'SELECT_MET'
          ]),
    // enter(){
    //   this.setDown = false;
    //   console.log(1)
    // },
    // leave(){
    //   this.setDown = true;
    //   console.log(2)
    // },
    rowClick(row, evt) {
      this.see(row, 'details');
    },
    reset() {
      this.initData.template_name = '';
      this.initData.group = '';
    },
    closeClog(bool) {
      this.tmpDialog = false;
      if (bool) {
        this.allquery();
      }
    },
    //查询资源类型数据
    query_r() {
      server.query_resource().then((res) => {
        this.treeData = treeDataHandle(res,this.resType);
      });
    },
    //查询模板列表
    allquery(pageSize, currentPage) {
      if (!pageSize) {
        this.currentPage = 1;
        this.pageSize = 10;
      }
      let start = (this.currentPage - 1) * this.pageSize;
      let limit = this.pageSize;
      let reg = new RegExp("[`~!@#%$^&*()+=|{}':',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；;：”“'。，、？\u4E00-\u9FA5]", 'ug');
      let reg1 = new RegExp("[`~!@#%$^&*()+=|{}':',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；;：”“'。，、？]", 'ug');
      if (reg.test(this.initData.template_name)) {
        this.$message.warning("模板名称请勿输入特殊字符、汉字！");
        return;
      }
      if (reg1.test(this.initData.group)) {
        this.$message.warning("分组请勿输入特殊字符！");
        return;
      }
      let name = this.initData.template_name.replace(/ /g, '');
      let group = this.initData.group.replace(/ /g, '');
      server.query(start, limit, this.collectType, name, group).then(res => {
        this.alertData = res.data;
        if (this.collectType === 3) {
          for (var i = 0; i < res.data.length; i++) {
            for (var j = 0; j < res.data[i].template_content.length; j++) {
              res.data[i].template_content[j].isAlarmLog = !res.data[i].template_content[j].isAlarmLog;
            }
          }
        }
        this.totalItems = res.count;
      });
    },
    //删除模板
    deleteModule(value) {
      let taskIds = [];
      if (value.length === 0) {
        this.$message.warning("请勾选需要删除的模板！");
        return;
      }
      if (typeof value === 'string') {
        taskIds = value;
      } else {
        taskIds = this.getMoudleIds(value);
      }
      this.$confirm('此操作将永久删除所选模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        server.detele_module(taskIds).then(res => {
          this.allquery();
          this.$message.success("删除成功！");
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getMoudleIds(arr) {
      let ids = [];
      arr.map((item) => {
        ids.push(item.template_id);
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
      var resource_type = row.resource_type;
      this.optType = type;
      this.tmpDialog = true;
      this.$nextTick(_ => {
        this.SELECT_MET(row.template_content);
      });
      this.selectData = {
        template_id: row.template_id,
        create_user_id: row.create_user_id,
        template_name: row.template_name,
        resource_type: resource_type.split('.'),
        is_agent: row.is_agent,
        // push_position:row.push_position,
        group: row.group,
        description: row.description,
        template_content: [],
        userName: row.template_content.userName,
        passWord: row.template_content.passWord,
        port: row.template_content.port,
        sid:row.template_content.sid
      };
      switch (this.collectType) {
        case 0:
        this.selectData.template_content = row.template_content;
        break;
        case 2:
        this.selectData.template_content = row.template_content.templateKpiInners;
        break;
        case 3:
        this.selectData.template_content = row.template_content.slice();
        break;
        case 4:
        this.selectData.template_content = row.template_content.templateKpiInners;
        break;
        case 5:
        this.selectData.template_content = row.template_content.templateCmdInners;
        break;
      }
      if (row.resource_type.indexOf('.') > -1) {
        this.selectData.resource_type = row.resource_type.split('.');
      } else {
        this.selectData.resource_type = !Array.isArray(row.resource_type) ? [row.resource_type] : row.resource_type;
      }
      if (row.group === null) {
        this.selectData.group = '';
      }
      if (row.description === null) {
        this.selectData.description = '';
      }
      
      if (type === 'clone') {       
        this.selectData.template_name = "";
      } 
    },
    addTmp() {
      this.optType = 'add';
      this.tmpDialog = true;
      this.title = '新增模板';
      this.selectData = Object.assign({}, this.addInit);
      this.selectData.template_content = [];
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.allquery(this.pageSize, this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.allquery(this.pageSize, this.currentPage);
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
      console.log(res)
      let type = 'success';
      let name = '导入成功'
      // if (res.name) {
      //   type = 'error';
      //   name = res.name;
      // }
      this.$message({
        type: type,
        message: name
      });
      this.fileList = [];
      this.allquery();
    },
    handleError(error, file, fileList){
      let err = JSON.parse(error.message);
      let errMsg = '<strong>错误编码: <i>'+err.code+'</i></strong></br>'
      +'<strong>错误类型: <i>'+err.name+'</i></strong></br>'
      +'<strong>详细信息: <i>'+err.msg+'</i></strong>';
      this.$message({
        dangerouslyUseHTMLString: true,
        type: 'error',
        message: errMsg
      });
      this.allquery();
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
      for (var i = 0; i < this.alertData.length; i++) {
        this.$refs.multipleTable.toggleRowSelection(this.alertData[i], false);
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
.setShow{
  float: right;
  color: #42b983;
  font-size: 14px;
  line-height: 34px;
  cursor: pointer;
}
.cloumnStyle {
  ul {
    padding-left: 35px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    li {
      margin-top: 10px;
      width: 50%;
    }
  }
}
.table_btn {
  color: rgba(66, 185, 131, 1);
  font-size:14px;
}

.step_btn {
  background: rgba(66, 185, 131, 0.4);
  border: 1px solid #42B983;
  color: rgba(66, 185, 131, 1);
  cursor:pointer;
  margin-left:8px;
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
  font-size:14px;
  &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
}

.opt_btn {
  background: #F4F8F9;
  color: rgba(0, 0, 0, 0.70);
  margin-left: 8px;
  font-size:14px;
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

.el-table ,.cloumnStyle /deep/ {
  .el-button+.el-button {
    margin-left: 2px;
  }
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

  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #f2f6fc;
    border-color: #dcdfe6;
  }
  .el-checkbox__input.is-disabled+span.el-checkbox__label {
    color: #c0c4cc !important;;
    cursor: not-allowed;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color:#000;
  }
}

.el-form /deep/{
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

//.fade-enter-active,
//.fade-leave-active {
  //opacity: 1;
  //-ms-transform: scaleY(1);
  //transform: scaleY(1);
  //transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0.1s,
  //opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0.1s;
  //-ms-transform-origin: center top;
  //transform-origin: center top;
  //}

  //.fade-enter,
  //.fade-leave-active {
    //opacity: 0;
    //transform: translateY(-10px);
    //}
    .adf {
      position: fixed;
      z-index: 2;
      top: 125px;
      left: 201px;
      margin: 53px 21px 0 0px;
      /* width: 100%; */
      height: 0;
      background: #fff;
      /* min-width: 1200px; */
      color: red;
      font-size: 20px;
      overflow: hidden;
      background: #fff;
    }

    .sef {
      overflow: none;
      height: auto;
    }

  </style>
