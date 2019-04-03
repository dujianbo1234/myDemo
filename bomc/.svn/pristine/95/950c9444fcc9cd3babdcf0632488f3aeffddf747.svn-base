<template>
  <div
    class="containers"
    ref="content"
  >
    <div
      class="canvas"
      ref="canvas"
    ></div>

    <el-button
      class="toggle-icon"
      :class="{'toggle-icon-hide': !showPanel}"
      :icon="showPanel ?'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"
      @click="changePanelShow"
    ></el-button>

    <div
      id="js-properties-panel"
      class="panel-container"
      :class="{'hide-panel': !showPanel}"
    ></div>
    <ul class="buttons clearfix">
      <li>下载</li>
      <li>
        <!-- <el-button ref="saveDiagram">BPMN 流程图</el-button>
        <el-button ref="saveSvg">SVG 图片</el-button> -->
        <a
          ref="saveDiagram"
          href="javascript:"
          title="下载 BPMN 文件"
        >BPMN 流程图</a>
      </li>
      <li>
        <a
          ref="saveSvg"
          href="javascript:"
          title="下载 SVG 图片"
        >SVG 图片</a>
      </li>
      <li>
        <a
          ref="savePng"
          href="javascript:"
          title="下载 JPG 图片"
        >JPG 图片</a>
      </li>

      <!-- <li v-if="processDefinitionId">
        <el-button
          type="primary"
          :disabled="!isActive"
          :loading="testProcessDefinitionIdLoading"
          @click="testProcessDefinitionId"
        >测试流程定义</el-button>
      </li> -->

      <li>
        <el-button
          type="primary"
          :disabled="!isActive"
          :loading="testBpmnLoading"
          @click="testBpmn"
        >测试</el-button>
      </li>

      <li>
        <el-button
          type="primary"
          :disabled="!isActive"
          :loading="saveDraftLoading"
          @click="saveDraft"
        >保存草稿</el-button>
      </li>

      <li>
        <el-button
          type="primary"
          :disabled="!isActive"
          @click="saveBpmn"
        >部署</el-button>
      </li>
    </ul>

    <el-dialog
      title="新建流程"
      :visible.sync="uploadDialogVisible"
      width="30%"
      :before-close="handleClose"
      class="avatar-uploader"
      :close-on-click-modal="false"
    >
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
            :disabled="isSameProcessId"
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
</template>

<script>
// 引入相关的依赖
// import BpmnViewer from 'bpmn-js'
import BpmnModeler from "bpmn-js/lib/Modeler";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
import translate from "../layout/translate/translate";

import * as request from "@/modules/pms/api/pms/drawProcess.js";
import * as manageRequest from "@/modules/pms/api/pms/index.js";

import {
  createDraft,
  queryDraft,
  updateDraft
} from "@/modules/pms/api/pms/draftBox.js";

import { Message } from "element-ui";

// import * as processMonitoringRequest from "@/modules/pms/api/pms/processMonitoring.js";

// 汉化
const customTranslate = {
  translate: ["value", translate]
};

const defaultUploadForm = {
  name: "",
  key: "",
  processDefinitionCategory: ""
};

export default {
  name: "drawProcess",
  data() {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      xmlStr: "",
      downloadLink: null,
      downloadSvgLink: null,
      downLoadPngLink: null,

      isActive: false, // 是否可以新建 / 保存
      processName: "",

      // testProcessDefinitionIdLoading: false, // 测试流程定义按钮 loading 状态

      testBpmnLoading: false, // 测试bpmn按钮 loading 状态

      saveDraftLoading: false,

      base64String: "",
      showPanel: true, // 是否显示右侧面板

      processClassData: [],

      isSameProcessId: false,

      uploadDialogVisible: false,
      processNameUpload: {
        ...defaultUploadForm
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
      }
    };
  },
  computed: {
    processDefinitionId() {
      // 流程定义 id
      return this.$route.query.id;
    },
    draftId() {
      return this.$route.query.draftId;
    }
  },
  destroyed() {
    // 跳转其他路由 取消 onbeforeunload 事件
    window.onbeforeunload = null;
  },
  methods: {
    registerFileDrop(container, callback) {
      // 拖拽文件监听
      const _this = this;

      function handleFileSelect(e) {
        e.stopPropagation();
        e.preventDefault();

        var files = e.dataTransfer.files;

        var file = files[0];

        var reader = new FileReader();

        reader.onload = function(e) {
          var xml = e.target.result;

          callback(xml).then(res => {
            if (res) {
              _this.upDateBpmn();
            }
          });
        };

        reader.readAsText(file);
      }

      function handleDragOver(e) {
        e.stopPropagation();
        e.preventDefault();

        e.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
      }

      container.addEventListener("dragover", handleDragOver, false);
      container.addEventListener("drop", handleFileSelect, false);
    },
    createNewDiagram() {
      const bpmnXmlStr =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
        '  <bpmn2:process id="Process_1" isExecutable="true">\n' +
        '    <bpmn2:startEvent id="StartEvent_1"/>\n' +
        "  </bpmn2:process>\n" +
        '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
        '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
        '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
        '        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>\n' +
        "      </bpmndi:BPMNShape>\n" +
        "    </bpmndi:BPMNPlane>\n" +
        "  </bpmndi:BPMNDiagram>\n" +
        "</bpmn2:definitions>";
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(bpmnXmlStr, function(err) {
        if (err) {
          this.$message.error(err.message);
        }
      });
    },
    getProcessDefineId() {
      // 获取流程定义的 id
      return this.bpmnModeler._definitions.rootElements[0].id;
    },
    testBpmn() {
      console.log(this.getProcessDefineId());

      // 测试 bpmn 文件 是否绘制正确
      // 由于测试时间可能较长，将按钮置为 loading
      this.testBpmnLoading = true;

      return request
        .testBpmnFile(this.xmlStr)
        .then(res => {
          this.testBpmnLoading = false;

          if (res && res.code) {
            return this.$message.error(res.message) && false;
          }

          return this.$message.success(res) || true;
        })
        .catch(e => {
          this.testBpmnLoading = false;
          this.$message.error(e.response.data.message);
        });
    },
    callBack(cb) {
      return cb
        .then(res => {
          this.saveDraftLoading = false;
          if (res && res.message) {
            this.$message.error(res.message);
            return new Error("test");
          }
          this.$message.success("保存草稿成功！");
          return true;
        })
        .catch(err => {
          this.saveDraftLoading = false;
        });
    },
    saveDraft() {
      // 保存草稿
      this.saveDraftLoading = true;

      if (this.draftId) {
        this.callBack(updateDraft(this.draftId, this.xmlStr));
      } else {
        this.$prompt("请输入草稿名称", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          closeOnClickModal: false,
          inputPattern: /^\s*[\S].{0,29}\s*$/,
          inputErrorMessage: "草稿名称长度为1-30",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              this.callBack(
                createDraft({
                  draftsName: instance.inputValue,
                  bpmnFile: this.xmlStr
                })
              ).then(res => {
                if (res === true) {
                  done();
                }
              });
            } else {
              done();
            }
          }
        })
          // .then(({ value }) => {
          //   try {
          //     return this.callBack(
          //       createDraft({
          //         draftsName: value,
          //         bpmnFile: this.xmlStr
          //       })
          //     );
          //   } catch (e) {
          //     debugger;
          //   }
          // })
          .catch(() => {
            this.saveDraftLoading = false;
          });
      }
    },
    openDiagram(xml) {
      return new Promise((resolve, reject) => {
        this.bpmnModeler.importXML(xml, err => {
          if (err) {
            // this.$message.error('导入流程文件错误！');
            this.$message.error(err.message);
            reject(false);
          } else {
            resolve(true);
          }
        });
      });
    },
    handleClose(done) {
      // upload handle close
      // use icon to close upload dialog
      // hock handle
      this.$confirm("确认取消部署吗?")
        .then(_ => {
          // reset fields
          this.$refs["processForm"].resetFields();

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
    getAllProcessDefinitionCategories() {
      manageRequest
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
    uploadProcess(formName) {
      // upload process define
      // rules validate process
      this.$refs[formName].validate(valid => {
        // if validate valid
        if (valid) {
          // form data Object
          const formData = new FormData();

          // formdata append params
          Object.keys(this.processNameUpload).forEach(key => {
            formData.append(key, this.processNameUpload[key]);
          });

          formData.append("processDefinitionKey", this.getProcessDefineId());

          formData.append(
            "picturePath",
            this.convertBase64UrlToBlob(this.base64String)
          );
          formData.append("BPMNFile", this.xmlStr);

          // create prcress define request
          request
            .createProcessDefine(formData)
            .then(res => {
              if (res) {
                // data refresh
                if (res.message) {
                  return this.$message.error(res.message);
                }

                this.$message.success("部署成功");

                // reset to new intance
                // IE is not support delete method of new FormData()
                // reset fields
                this.$refs["processForm"].resetFields();
                // hide dialog
                this.uploadDialogVisible = false;

                this.getAllProcessDefinitionCategories();
              }
            })
            .catch(err => console.log(err));
        } else {
          return false;
        }
      });
    },
    upDateBpmn() {
      // 更新 bpmn，包括图片、文件、svg
      const _this = this;

      const { downloadSvgLink, downLoadPngLink, downloadLink } = _this;

      _this.saveSVG(function(err, svg) {
        _this.setEncoded(downloadSvgLink, "diagram.svg", err ? null : svg);
      });

      _this.saveSVG(function(err, svg) {
        _this.setEncoded(
          downLoadPngLink,
          "diagram.jpg",
          err ? null : svg,
          "jpg",
          _this
        );
      });

      _this.saveDiagram(function(err, xml) {
        const newXml = xml
          .replace(
            "http://camunda.org/schema/1.0/bpmn",
            "http://activiti.org/bpmn"
          )
          .replace(/camunda/g, "activiti");

        _this.xmlStr = newXml;
        _this.setEncoded(downloadLink, "diagram.bpmn", err ? null : newXml);
      });
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveSVG(done) {
      // 把传入的done再传给bpmn原型的saveSVG函数调用
      this.bpmnModeler.saveSVG(done);
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveDiagram(done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml);
      });
    },
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded(link, name, data, jpg, _this) {
      if (!this.isActive) {
        this.isActive = true;
      }
      // 把xml转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data);
      // 获取到图的xml，保存就是把这个xml提交给后台
      // this.xmlStr = data;
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      if (data && jpg) {
        // 下载 jpg
        // 利用 canvas 转换为 base64
        const canvas = document.createElement("canvas");

        const img = new Image();
        // img.crossOrigin = "Anonymous";

        img.onload = function() {
          const width = img.width;
          const height = img.height;

          canvas.width = width;
          canvas.height = img.height;

          const context = canvas.getContext("2d");

          context.fillStyle = "#fff";

          context.fillRect(0, 0, width, height);

          context.drawImage(img, 0, 0);

          const base64String = canvas.toDataURL("image/jpg");

          link.className = "active";

          _this.base64String = link.href = base64String;

          link.download = name;
        };
        img.src =
          "data:image/svg+xml;base64, " +
          window.btoa(unescape(encodeURIComponent(data)));

        return;
      }

      if (data) {
        link.className = "active";
        link.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        link.download = name;
      }
    },
    changePanelShow() {
      this.showPanel = !this.showPanel;
    },
    saveBpmn() {
      // 新建保存
      // 判断是否已经请求过流程类别
      if (!this.processClassData.length) {
        this.getAllProcessDefinitionCategories();
      }

      // 测试流程图是否绘制正确
      this.testBpmn().then(valid => {
        if (valid) {
          this.uploadDialogVisible = true;
          Message.closeAll(); // 如果正确的，则不弹出提示
        }
      });

      // 校验流程定义 id 是否之前有定义过
      this.$nextTick(function() {
        const processDefineId = this.getProcessDefineId();
        manageRequest
          .getProcessDefinitionVersion({
            processDefinitionKey: processDefineId
          })
          .then(res => {
            let { result } = res;
            if (result.length) {
              result = result[0];
              this.processNameUpload = {
                processDefinitionCategory: result.processDefinitionCategory,
                name: result.processDefinitionName,
                key: result.processDefinitionKey
              };
              this.isSameProcessId = true;
            } else {
              this.isSameProcessId = false;
              this.processNameUpload = { ...defaultUploadForm };
            }
          });
      });
    },
    convertBase64UrlToBlob(base64String) {
      let bytes = window.atob(base64String.split(",")[1]); //去掉url的头，并转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: "image/jpg" });
    }
  },
  mounted() {
    // 获取到属性ref为“content”的dom节点
    this.container = this.$refs.content;
    // 获取到属性ref为“canvas”的dom节点
    const canvas = this.$refs.canvas;

    // check file api availability
    if (!window.FileList || !window.FileReader) {
      this.$message.error(
        "拖拽文件的功能需要高版本的浏览器，请使用 IE11 或谷歌、火狐等浏览器！"
      );
    } else {
      this.registerFileDrop(this.container, this.openDiagram);
    }

    // 监听用户离开此页面并提示
    window.onbeforeunload = function() {
      const answer = window.confirm("确定离开此页面吗？");
      return answer;
    };

    // 建模，官方文档这里讲的很详细
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
      // 添加控制板
      propertiesPanel: {
        parent: "#js-properties-panel"
      },
      additionalModules: [
        // 左边工具栏以及节点
        propertiesProviderModule,
        // 右边的工具栏
        propertiesPanelModule,
        // 汉化
        customTranslate
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    });

    // 下载画图
    let _this = this;
    // 获取a标签dom节点

    _this.downloadLink = this.$refs.saveDiagram;
    _this.downloadSvgLink = this.$refs.saveSvg;
    _this.downLoadPngLink = this.$refs.savePng;

    const panel = document.querySelector("#js-properties-panel");

    // 监听属性面板输入事件
    panel.addEventListener(
      "click",
      e => {
        e.target.addEventListener("input", e_input => {
          // 设置输入的最大长度 25
          const target = e_input.target;

          if (target.tagName !== "SELECT") {
            const textContent = target.textContent.replace(
              /(^\s*)|(\s*$)/g,
              ""
            );
            if (textContent.length > 25) {
              this.$message({
                showClose: true,
                message: "此输入框的字符长度不能超过25！",
                type: "warning"
              });
              e_input.target.textContent = textContent.substring(0, 25);
            }
          }
        });
      },
      false
    );

    // 给图绑定事件，当图有发生改变就会触发这个事件
    _this.bpmnModeler.on("commandStack.changed", function() {
      _this.upDateBpmn();
      // _this.testBpmn(); // 监听改变并测试
    });

    this.createNewDiagram(this.bpmnModeler);

    const { processDefinitionId, draftId } = this;
    // 是否是编辑
    if (processDefinitionId) {
      request
        .queryBpmnResData(processDefinitionId)
        .then(res => {
          if (res && typeof res === "string") {
            const xml = res
              .replace(
                "http://activiti.org/bpmn",
                "http://camunda.org/schema/1.0/bpmn"
              )
              .replace(/activiti/g, "camunda");

            this.openDiagram(xml).then(res => {
              if (res) {
                _this.upDateBpmn();
              }
            });
          } else {
            this.$message.error("数据格式有问题");
          }
        })
        .catch(err => {
          console.log(err);
        });

      manageRequest
        .getProcessDefinitionCategories({
          processDefinitionId: processDefinitionId,
          start: 1,
          limit: 10
        })
        .then(res => {
          const result = res.result[0];
          if (Object.keys(result).length) {
            this.processNameUpload = {
              name: result.processDefinitionName,
              key: result.processDefinitionKey,
              processDefinitionCategory: result.processDefinitionCategory
            };
          }
        });
    }

    if (draftId) {
      queryDraft({ id: draftId, start: 1, limit: 10 }).then(res => {
        const draftData = res.result[0];
        const xml = draftData.bpmnFile
          .replace(
            "http://activiti.org/bpmn",
            "http://camunda.org/schema/1.0/bpmn"
          )
          .replace(/activiti/g, "camunda");

        this.openDiagram(xml).then(res => {
          if (res) {
            _this.upDateBpmn();
          }
        });
      });
    }
  }
};
</script>

<style lang="scss">
/*左边工具栏以及编辑节点的样式*/
@import "bpmn-js/dist/assets/diagram-js.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
/*右边工具栏样式*/
@import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
.containers {
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  font-size: 14px;
  .group-label {
    font-style: normal;
  }
  .el-select {
    width: 100%;
  }
  .canvas {
    width: 100%;
    height: 100%;
  }
  .panel-container {
    position: absolute;

    top: 0;
    bottom: 0;
    right: 0;
    width: 260px;
    z-index: 10;
    border-left: 1px solid #ccc;
    overflow-y: auto;
    transition: all 0.15s;
  }
  .toggle-icon {
    position: absolute;
    right: 260px;
    top: 0;
  }
  .toggle-icon-hide {
    right: 0;
  }
  .hide-panel {
    right: -260px;
  }
  .buttons {
    position: absolute;
    left: 20px;
    bottom: 20px;
    & > li {
      display: inline-block;
      margin: 5px;
      & > a {
        color: #999;
        background: #eee;
        cursor: not-allowed;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        transition: all 0.3s;
        &.active {
          color: #333;
          background: #fff;
          cursor: pointer;
          &:hover {
            color: #409eff;
            background: #ecf5ff;
            border-color: #b3d8ff;
          }
        }
      }
    }
  }
}
</style>
