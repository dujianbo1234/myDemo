<template>
  <el-container>
    <el-aside style="wdith: 250px;height: calc(100vh - 94px);">

      <div class="components-list">
        <div class="widget-cate">基础字段</div>
        <draggable element="ul" :list="basicComponents" 
          :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove"
        >
          
          <li class="form-edit-widget-label" v-for="(item, index) in basicComponents" :key="index">
            <a>
              <icon class="icon" :name="item.icon"></icon>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>

       <!-- <div class="widget-cate">高级字段</div>
        <draggable element="ul" :list="advanceComponents" 
          :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove"
        >
          
          <li class="form-edit-widget-label" v-for="(item, index) in advanceComponents" :key="index">
            <a>
              <icon class="icon" :name="item.icon"></icon>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable> -->
        
        <div class="widget-cate">布局字段</div>
        <draggable element="ul" :list="layoutComponents" 
          :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove"
        >
          
          <li class="form-edit-widget-label data-grid" v-for="(item, index) in layoutComponents" :key="index">
            <a>
              <icon class="icon" :name="item.icon"></icon>
              <span>{{item.name}}</span>
            </a>
          </li>
        </draggable>
      </div>
      
    </el-aside>
    <el-container class="center-container" direction="vertical">
      <el-header class="btn-bar" style="height: 45px;">
        <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
        <el-button type="text" size="medium" icon="el-icon-tickets" @click="dialogVisible = true">保存</el-button>
        <!-- <el-button type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">生成代码</el-button> -->
      </el-header>
       <el-dialog title="请填写组件信息" :visible.sync="dialogVisible" width="30%">
          <!-- <el-select v-model="role">
            <el-option v-for="item in roleList" :key="item.key" :value="item.value" :label="item.label"></el-option>
          </el-select> -->
          <el-input type="text" v-model="role" placeholder="请输入组件名称" maxlength="30"></el-input>
          <div style="margin-top:10px;">
          选择图标：
          <el-select
        v-model="iconClass"
      >
            <el-option v-for="item in iconSource" :key="item.code" :value="item.code" :label="item.name">
            <span style="float: left">{{ item.name }}</span>
            <i style="float: right; color: #8492a6; font-size: 13px" class="iconfont" :class="item.code"></i>
        </el-option>
        </el-select>
        </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleGenerateJson">确 定</el-button>
          </span>
      </el-dialog>
      <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
        
        <widget-form ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
      </el-main>
    </el-container>
    
    <el-aside class="widget-config-container" :width="'306px'">
      <el-container>
        <el-header height="45px">
          <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
          <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
        </el-header>
        <el-main class="config-content">
          <widget-config v-show="configTab=='widget'" :data="widgetFormSelect"></widget-config>
          <form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config>
        </el-main>
      </el-container>
      
    </el-aside>

    <cus-dialog
      :visible="previewVisible"
      @on-close="previewVisible = false"
      ref="widgetPreview"
      @on-submit="handleTest"
      width="1000px"
      form
    >
      <generate-form v-if="previewVisible" :data="widgetForm" :remote="remoteFuncs" :value="widgetModels" ref="generateForm">

        <template slot="blank" slot-scope="scope">
          宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
          高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
        </template>
      </generate-form>
    </cus-dialog>

    <cus-dialog
      :visible="jsonVisible"
      @on-close="jsonVisible = false"
      ref="jsonPreview"
      width="800px"
      form
    >
      <div id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</div>
      
      <template slot="action">
        <el-button id="copybtn" data-clipboard-target=".ace_text-input">双击复制</el-button>
      </template>
    </cus-dialog>

    <cus-dialog
      :visible="codeVisible"
      @on-close="codeVisible = false"
      ref="codePreview"
      width="800px"
      form
      :action="false"
    >
      <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
    </cus-dialog>
  </el-container>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
// import JSONEditor from 'jsoneditor'
// import 'jsoneditor/dist/jsoneditor.min.css'
import Clipboard from 'clipboard'
import {basicComponents, layoutComponents, advanceComponents} from './componentsConfig.js'
import {loadJs, loadCss} from './util/index.js'
import request from './util/request.js'
import generateCode from './generateCode.js'
import portalApi  from '@/modules/portal/api/portal'


export default {
  name: 'fm-making-form',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm
  },
  data () {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'top'
        },
      },
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      remoteFuncs: {
        func_test (resolve) {
          setTimeout(() => {
            const options = [
              {id: '1', name: '1111'},
              {id: '2', name: '2222'},
              {id: '3', name: '3333'}
            ]

            resolve(options)
          }, 2000)
        }
      },
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
      dialogVisible: false,
      role: '',
      roleList: [],
      routerParams: null,
      iconClass: '',
      iconSource: []
    }
  },
  mounted () {
    const _this = this;
    var htmlScript = document.createElement('iframe');
    htmlScript.src = './static/fontDemo/demo_index.html';
    htmlScript.style = 'display:none';
    htmlScript.onload = function(event,res){
      var body = htmlScript.contentWindow.document.getElementsByClassName('font-class')[0];
      var list = body.getElementsByClassName('dib');
      for(var i = 0; i<list.length -1;i++){
        _this.iconSource.push({'name':list[i].getElementsByClassName('name')[0].innerText.trim(),'code': list[i].getElementsByClassName('code-name')[0].innerText.trim().split('.')[1]});
      }
      console.log('dataList', _this.iconSource);
    }
    document.body.appendChild(htmlScript)
    // console.log('params',this.$route.params.data.templetJson);
    if(!!this.$route.params.data){
      const data = JSON.parse(this.$route.params.data.templetJson);
     this.routerParams = this.$route.params.data
     this.widgetForm = data
     this.widgetFormSelect = data.list[0]
    }
    //获取角色列表
      // request({
      //   url: 'http://192.168.127.246:7300/mock/5ba1bc874e26725b96a882d5/html/editor',
      //   method: 'put',
      //   data: this.widgetForm
      // }).then(function (res) {
      //   res.data && res.data.data &&(_this.resource = res.data.data, _this.layout = res.data.data.filter(item => item.visible != false) )
      // })
    // loadCss('https://unpkg.com/jsoneditor/dist/jsoneditor.min.css')
    // loadJs('https://unpkg.com/jsoneditor/dist/jsoneditor.min.js')
    // loadJs('src/components/FromMaking/lib/ace/src/ace.js')
  },
  methods: {
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleMoveEnd (evt) {
      console.log('end', evt)
    },
    handleMoveStart ({oldIndex}) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true
    },
    handlePreview () {
      this.previewVisible = true
    },
    handleTest () {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e=>{})
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    handleGenerateJson () {
      this.dialogVisible = false
      let config = {};
      const _this = this; 
      config.templetJson = JSON.stringify(this.widgetForm)
      config.templetName = this.role || '默认组件'
      config.iconClass = this.iconClass || 'icon-location'
      config.templetId = this.routerParams&&this.routerParams.templetId || 0
      // this.jsonVisible = true
      this.jsonTemplate = this.widgetForm
      // console.log('widgetForm',JSON.stringify(this.widgetForm));
      if(this.routerParams){
        portalApi.update_template(config,1).then(function(res){
            _this.$message({
              type: 'success',
              message: '更新成功!'
            });
        })
      }else{
        portalApi.add_template(config,1).then(function(res){
            _this.$message({
              type: 'success',
              message: '保存成功!'
            });
        })
      }
      // request({
        // url: 'https://easy-mock.com/mock/5bd7b650a0fa6d218201b6d0/charts/templte',
  // url: 'http://10.0.2.11:8092/templet?userId=1',
  // url: 'http://10.0.2.11:8092/chart?userId=1',
  // url: 'http://10.0.2.11:8092/chart?userId=1&chartId=5',
        // method: 'post',
  //       data: {
  // "authority": "string",
  // "stateFlag": "string",
  // "templetId": 0,
  // "templetJson": JSON.stringify(this.widgetForm),
  // "templetName": "string",
  // "templetType": "string"
  //         }
 //  data: {
 // "chartId": 5,
 //  "chartJson": "WWWWWWWWWWWWWW",
 //  "chartName": "string",
 //  "chartType": "stribbbbng",
 //  "stateFlag": "string"
 //          }
      // }).then(function (res) {
        // res.data && res.data.data &&(_this.resource = res.data.data, _this.layout = res.data.data.filter(item => item.visible != false) )

      // })
      // this.$nextTick(() => {

      //   const editor = ace.edit('jsoneditor')
      //   editor.session.setMode("ace/mode/json")

      //   const btnCopy = new Clipboard('#copybtn')
      // })
    },
    handleGenerateCode () {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm))
      // this.$nextTick(() => {
      //   const editor = ace.edit('codeeditor')
      //   editor.session.setMode("ace/mode/html")
      // })
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
        console.log('widgetFormHandler',this.$refs.widgetForm)
      }
    }
  }
}
</script>

<style lang="scss">
@import './styles/cover.scss';
@import './styles/index.scss';

.widget-empty{
  background: url('./assets/form_empty.png') no-repeat;
  background-position: 50%;
}
.el-container{
  background:#fff;
}
</style>
