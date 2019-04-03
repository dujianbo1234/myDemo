<template>
  <div class="cLog">
    <!-- 规则新增、修改-->
    <el-dialog :close-on-click-modal="false" :visible.sync="detailsDialog" width='64%' v-if="optType !== 'details'" class="logAdd-dialog opt" @close="close(false)">
      <div class="details-title">
        <div>
          <el-form :rules="rules" :inline="true" :model="selectData" label-position="right" label-width="100px" size="small" ref="qForm" style="text-align:left;">
            <span class="sp"><span>基本信息</span></span>
            <div class="logAdd-obj">
              <el-form-item label="规则名称:" prop="ruleName">
                <el-input v-model="selectData.ruleName" :disabled="optType==='edit'"></el-input>
              </el-form-item>
              <el-form-item label="资源类型:" prop="resourceType" required>
                <el-cascader expand-trigger="hover" :options="treeData" v-model="selectData.resourceType">
                </el-cascader>
              </el-form-item>
              <el-form-item label="I P 段:" prop="ipRange">
                <el-input v-model="selectData.ipRange"></el-input>
              </el-form-item>
              <el-form-item label="规则类型:" prop="identify">
                <el-select v-model="selectData.identify" @change="selectChange">
                  <el-option v-for="item in identifys" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="前置机名称:" prop="proxyId">
                <el-select v-model="selectData.proxyId">
                  <el-option v-for="p in proxys" :key="p.proxyId" :label="p.proxyName" :value="p.proxyId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发现规则:" prop="rules">
                <el-input v-model="selectData.rules" :disabled="selectData.identify === 0"></el-input>
              </el-form-item>
              <el-form-item label="描述:" prop="description" class="des">
                <el-input type="textarea" :autosize="{ minRows: 3}" v-model="selectData.description"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="details-title">
        <div class="sBtn">
          <el-button class="finish" v-if="optType==='add'" @click="increase('qForm')">保存</el-button>
          <el-button class="finish" v-show="optType==='edit'" @click="updateSave('qForm')">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <!--规则详情 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="detailsDialog" width='64%' @close="close(false);" v-if="optType === 'details'" class="logAdd-dialog">
      <div class="details-title">
        <span class="sp"><span>基本信息</span></span>
        <div class="details-obj">
          <el-form :inline="true" :model="selectData" label-position="right" label-width="90px" size="mini" style="text-align:left;">
            <el-form-item label="规则名称:">
              <div @click="downClick" :class="{down_class:down}" style="text-overflow: ellipsis;overflow: hidden;">
                {{selectData.ruleName}}
              </div>
            </el-form-item>
            <el-form-item label="资源类型:">
              <el-cascader expand-trigger="hover" :options="treeData" v-model="selectData.resourceType" ref="cascader" v-show="false">
              </el-cascader>
              {{resource_name}}
            </el-form-item>
            <el-form-item label="I P 段:">
              {{selectData.ipRange}}
            </el-form-item>
            <el-form-item label="规则类型:">
              {{selectData.identify === 0 ?'主机' : '进程'}}
            </el-form-item>
            <el-form-item label="前置机名称:">
              {{selectData.proxyName}}
            </el-form-item>
            <el-form-item label="发现规则:">
              {{selectData.rules}}
            </el-form-item>
            <el-form-item label="描述:" class="des">
              {{selectData.description}}
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import server from '@/modules/collector/api/discovery';
  import { mapState } from 'vuex';
  export default {
    name: 'ruleDialog',
    props: {
      optType: String,
      selectData: Object,
      treeData: Array
    },
    data() {
      let valid_name = (rule, value, callback) => {
        if (value.length > 64) {
          callback(new Error('长度不能超过64个字符'));
        } else {
          let reg = new RegExp("[`~!@#%$^&*()+=|{}':',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；;：”“'。，、？\u4E00-\u9FA5 ]",'u');
          if (reg.test(value)) {
            callback(new Error('不能含有特殊字符、空格、汉字'));
          } else {
            callback();
          }
        }
      };
      let valid_des = (rule, value, callback) => {
        if (!value || value === null) {
          callback();
          return;
        }
        if (value.length > 64) {
          callback(new Error('长度不能超过64个字符'));
        } else {
          callback();
        }
      };
      let ipReg = (rule , value, callback) =>{
        let reg = /^(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\-(2(5[0-5]{1}|[0-4]\d{1})|[1]?\d{1,2}))?(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\-(2(5[0-5]{1}|[0-4]\d{1})|[1]?\d{1,2}))?){3}(\,(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\-(2(5[0-5]{1}|[0-4]\d{1})|[1]?\d{1,2}))?(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\-(2(5[0-5]{1}|[0-4]\d{1})|[1]?\d{1,2}))?){3})*$/;
        if (!reg.test(value)) {
          callback(new Error('请输入合法的IP范围'));
        } else {
          callback();
        }
      };
      return {
        detailsDialog: false,
        proxys: [],
        identifys: [
        { value: 0, name: '主机' },
        { value: 1, name: '进程' }
        ],
        resource_name:'',
        down:false,
        rules: {
          ruleName: [
          { required: true, message: '请输入规则名称', trigger: 'change' },
          { validator: valid_name, trigger: 'blur' }
          ],
          resourceType: [
          { required: true, message: '请输入资源类型', trigger: 'change' }
          ],
          proxyId: [
          { required: true, message: '请选择前置机名称', trigger: 'change' }
          ],
          identify: [
          { required: true, message: '请选择规则类型', trigger: 'change' }
          ],
          ipRange: [
          { required: true, message: '请输入IP范围', trigger: 'change' },
          { validator: ipReg, trigger: 'blur' }
          ],
          rules: [
          { required: true, message: '请输入规则', trigger: 'change' },
          ],
          description: [
          { validator: valid_des, trigger: 'blur' }
          ],
        },
      }
    },
    created() {
      this.detailsDialog = true;
    },
    methods: {
      selectChange(){
        if(this.selectData.identify === 0){
          this.selectData.rules = 'SSH';
        }
      },
      downClick(){
        this.down = !this.down;
      },
      close(bool) {
        this.$emit('closeClog', bool);
        if (this.optType === 'details') {
          return;
        } else {
          this.$refs['qForm'].resetFields();
        }
      },
    //新增
    increase(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.getParams()
          server.addRule(params).then(res => {
            this.$message.success('新增成功！');
            this.close(true);
          });
        } else {
          this.$message.error('请填写对应内容后提交');
          return;
        }
      });
    },
    //修改
    updateSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         let params = this.getParams()
         server.editRule(params.ruleId,params)
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
    getParams(){
      let resource_type = this.selectData.resourceType.join('.');
      let params = {
        createUser: this.userName || 'admin',
        ruleName:this.selectData.ruleName,
        resourceType:resource_type,
        proxyId:this.selectData.proxyId,
        identify:this.selectData.identify,
        rules:this.selectData.rules,
        ipRange:this.selectData.ipRange,
        description:this.selectData.description
      };
      if(this.optType === 'edit'){
        params.ruleId = this.selectData.ruleId;
      }
      return params;
    },
  },
  mounted() {
    if (this.optType === 'details') {
      this.$nextTick(_ => {
        this.resource_name = this.$refs.cascader.currentLabels.join(' / ');
      });
    }
    server.getProxy().then((res) => {
      this.proxys = res;
    });
  },
  computed:{
    ...mapState({
      userName: state => state.user.name
    })
  }
}

</script>
<style lang="scss" scoped>
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
    width: 71%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .down_class {
    word-wrap: break-word;
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
    margin: 0 46px 0 56px;

    /deep/ {
      .el-form-item {
        width: 48%;
      }

      .el-form-item__content {
        width: calc(100% - 100px);

        .el-input,
        .el-cascader,
        .el-select {
          width: 100%;
        }
      }

      .des {
        width: calc(96% + 20px);

        .el-form-item__content {
          width: calc(100% - 100px - 5px);
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

    .nbtns {
      text-align: right;
      margin-left: 120px;

      .nbtn {
        background: rgba(66, 185, 131, 0.30);
        border: 1px solid #42B983;
        color: #42b983;

        &:hover {
          background: rgba(66, 185, 131, 0.60);
        }
      }
    }

    .tab-pane1 {
      margin: 0 56px;

      .nbtns /deep/.el-form-item__content {
        margin-right: calc(100% * 0.2);

      }
    }

    .tab-pane2 {

      .el-input,
      .el-textarea {
        width: 90%;
      }

      .nbtns {
        /deep/.el-form-item__content {
          margin-right: calc(100% * 0.1);
        }
      }
    }

    .tab-pane3 {
      .el-input {
        width: 70%;
      }

      .nbtns {
        /deep/.el-form-item__content {
          margin-right: calc((100% * 0.3) - 72px);
        }
      }

      .el-form-item__label {
        width: 192px !important;
      }

      .el-form-item__content {
        width: auto;
      }
    }

    .tab-pane4 {
      .el-input {
        width: 44%;
      }

      .nbtns /deep/.el-form-item__content {
        margin-right: calc((100% * 0.12) + 5px);
      }
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

.table_btn {
  color: rgba(66, 185, 131, 1);
  cursor: pointer;
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
