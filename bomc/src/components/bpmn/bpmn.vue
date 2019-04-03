<template>
<div class="containers" ref="content">
    <div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="panel"></div>
    <ul class="buttons">
      <li>
        <a ref="saveDiagram" href="javascript:;" title="download BPMN diagram">保存流程图</a>
      </li>
      <li>
        <!-- <a ref="saveSvg" href="javascript:;" title="download as SVG image">SVG image</a> -->
      </li>
    </ul>
    <!-- <el-button class="save" type="primary" @click="save" :disabled="!xmlStr">新增保存</el-button> -->
  </div>


</template>

<script>
 // 引入保存要用的API接口
  // import {saveBpmnData} from '../../api/modeler'
      //import BpmnViewer from 'bpmn-js'
      import BpmnModeler from 'bpmn-js/lib/Modeler'
      import propertiesPanelModule from 'bpmn-js-properties-panel'
      import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
      import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
      import modeling from 'bpmn-js/lib/features/modeling/Modeling.js'
      import elementRegistry from 'diagram-js/lib/core/ElementRegistry.js'
      import taskCustomization from '@/modules/ops/views/taskManagement/taskCustomization/index.vue'
      var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject

  export default {
    data(){
      return {
        id: null,
        bpmnModeler: null,
        container: null,
        canvas: null,
        xmlStr: null,
        processName: '',
      }
    },

    mounted(){
        this.container = this.$refs.content;
        var canvas = this.$refs.canvas;

        this.bpmnModeler = new BpmnModeler({
          container: canvas,
          //添加控制板
          propertiesPanel: {
            parent: '#js-properties-panel'
          },
          additionalModules: [
            propertiesPanelModule,
            propertiesProviderModule
          ],
          moddleExtensions: {
            camunda: camundaModdleDescriptor
          }
        });
        
        // 创建图形
        this.createNewDiagram();
        
        // 下载画图
        let _this = this;
        // 获取a标签dom节点
        var downloadLink = this.$refs.saveDiagram;
        //var downloadSvgLink = this.$refs.saveSvg;
        // 给图绑定事件，当图有发生改变就会触发这个事件
        this.bpmnModeler.on('commandStack.changed', function(){
          // _this.saveSVG(function(err, svg) {
          //   _this.setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg);
          // });

          _this.saveDiagram(function(err, xml) {
            _this.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml);
          });
        });
    },

    methods:{
      createNewDiagram() {
        // 定义空的图的模型，这里我们根据用户输入，利用字符串的拼接，定义了这个流程图的名字，不需要的就把字符串的拼接去掉。
        // 把 <bpmn2:process id=\"Process_1\" name=\"" + this.processName + "\" isExecutable=\"false\"> 改成 <bpmn2:process id=\"Process_1\" isExecutable=\"false\"> 就好
        const newDiagramXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<bpmn2:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn2=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd\" id=\"sample-diagram\" targetNamespace=\"http://bpmn.io/schema/bpmn\">\r\n  <bpmn2:process id=\"Process_1\" name=\"" + this.processName + "\" isExecutable=\"true\">\r\n    <bpmn2:startEvent id=\"StartEvent_1\"/>\r\n  </bpmn2:process>\r\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\r\n    <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_1\">\r\n      <bpmndi:BPMNShape id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\">\r\n        <dc:Bounds height=\"36.0\" width=\"36.0\" x=\"412.0\" y=\"240.0\"/>\r\n      </bpmndi:BPMNShape>\r\n    </bpmndi:BPMNPlane>\r\n  </bpmndi:BPMNDiagram>\r\n</bpmn2:definitions>";
        this.bpmnModeler.importXML(newDiagramXML, function(err) {
          if (err) {
            console.error(err);
          }
        }); 
      },

     // 下载为SVG格式,done是个函数，调用的时候传入的 
      // saveSVG(done) {
      //  // 把传入的done再传给bpmn原型的saveSVG函数调用
      //   this.bpmnModeler.saveSVG(done);
      // },
      // 下载为SVG格式,done是个函数，调用的时候传入的 
      saveDiagram(done) {
        // 把传入的done再传给bpmn原型的saveXML函数调用
        this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
          done(err, xml);
        });
      },
      // 当图发生改变的时候会调用这个函数，这个data就是图的xml
      setEncoded(link, name, data) {
        //console.log('into setEncoded');
        //console.log(link);
        // 把xml转换为URI，下载要用到的
        var encodedData = encodeURIComponent(data);
        // 获取到图的xml，保存就是把这个xml提交给后台
        this.xmlStr = data;
        // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
        if (data) {
          
          link.className = 'active';
          link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData;
          link.download = name;
        } else {
        }
      },

      // 从用户输入获取流程名称
      getProcessName() {
        this.$prompt('请输入流程名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消创建'
        }).then(({ value }) => {
          if(value === ''){
            this.$message({
              type: 'error',
              message: '流程名字不能为空'
            });
            this.getProcessName()
          }
          else {
            this.processName = value;
            this.createNewDiagram();
          }

        }).catch(() => {
          // this.back()
        });
      },

      //将子组件的值传给父组件
      sendDialogFlag(){
        //console.log('into sendDialogFlag function')
        this.$emit('sonDialogFlag',false)
      }
    },
 
    props: ['parentDialog'],
    watch: {
      parentDialog: function(newValue,oldValue){
        //判断父组件的对话框是否已经关闭，若关闭，调用函数createNewDiagram重新进行初始化
        if(newValue){
          console.log('into parentDialog function')
          this.createNewDiagram();
          var downloadLink = this.$refs.saveDiagram;
          //关闭对话框后，将下载bpmn diagram的链接设置为不可点击
          downloadLink.href = "javascript:;"
          downloadLink.className = "disabled"
          console.log(this.$refs.saveDiagram);
          this.sendDialogFlag();
        }
      }
    }

  }
</script>



<style lang="scss">
  @import "bpmn-js/dist/assets/diagram-js.css";
  //@import "./css/app.css";
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
  @import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
  .containers{
    //position: absolute;
    background-color: #ffffff;
    width: 80%;
    height: 90%;
  }
  .canvas{
    position: absolute;
    width: 85%;
    height: 80%;
  }
  .panel{
    position: absolute;
    right: 25px;
    top: 30px;
    width: 300px;
  }
  .buttons{
    position: absolute;left: 20px;bottom: 20px;
    
    &>li{
      display:inline-block;margin: 5px;
      &>a{
        color: #999;background: #eee;cursor:not-allowed;
        padding: 8px;border: 1px solid #ccc;
        &.active{color: #333;backgroud: #fff;cursor:pointer;}
      }
    }
  }
  .save {
    display: inline-block;
    //position: absolute;
    bottom: 20px;
    left: 25%;
  }
</style>
