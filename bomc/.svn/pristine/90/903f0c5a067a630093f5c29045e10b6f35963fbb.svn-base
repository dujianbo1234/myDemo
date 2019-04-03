<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>资源拓扑图</el-breadcrumb-item>
        <el-breadcrumb-item>Topology</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <div id="topo_contextmenu" ref="topo_conn" hidden>
      <ul>
        <li id="li_addRelation" hidden>
          <el-button id="topo_addRelation" type="info" plain>新增关系&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
        </li>
        <li id="li_delCI" hidden>
          <el-button id="topo_delCI" type="danger" plain>删除资源&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
        </li>
        <li id="li_delRelation" hidden>
          <el-button id="topo_delRelation" type="danger" plain>删除资源&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
        </li>
      </ul>
    </div>
    <el-col>
      <!--资源详情弹出框-->
      <el-dialog :title.sync="dialogTitle" :visible.sync="dialogVisible" style="padding: 0px">
        <el-tabs type="border-card">
          <el-tab-pane label="通用属性">
            <el-table :data="ResData" style="width: 100%" border size="mini">
              <el-table-column prop="value" label="属性" width="160"/>
              <el-table-column prop="label" label="描述" width="220"/>
              <el-table-column prop="data" label="属性值"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="分类属性">
            <el-table :data="TypeData" style="width: 100%" border size="mini">
              <el-table-column prop="value" label="属性" width="160"/>
              <el-table-column prop="label" label="描述" width="220"/>
              <el-table-column prop="data" label="属性值"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="专有属性">
            <el-table :data="ModelData" style="width: 100%" border size="mini">
              <el-table-column prop="value" label="属性" width="160"/>
              <el-table-column prop="label" label="描述" width="220"/>
              <el-table-column prop="data" label="属性值"/>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>

      <!--工具栏-->
      <div id="toolmenu">
        <el-checkbox v-model="booleanZoom" class="toolmenu_zoom">允许缩放</el-checkbox>
        <el-button id="toolmenu_center" class="toolmenu" icon="el-icon-location" type="primary" size="mini" plain>
          默认
        </el-button>
        <el-button id="toolmenu_type" class="toolmenu" icon="el-icon-location" type="primary" size="mini" plain>
          按资源类型
        </el-button>
        <el-button id="toolmenu_location" class="toolmenu" icon="el-icon-location" type="primary" size="mini" plain>
          按物理位置
        </el-button>
        <el-button id="toolmenu_fullscreen" class="toolmenu" icon="el-icon-rank" type="primary" size="mini" plain>
          全屏
        </el-button>
        <el-button id="toolmenu_saveAsPng" class="toolmenu" size="mini" icon="el-icon-picture" type="primary" plain>
          保存图片
        </el-button>
        <el-input size="mini" placeholder="请输入内容" style="width:200px;float: left;margin-top: 6px;margin-left: 180px"
                  v-model="searchParam"/>
        <el-button size="mini" icon="el-icon-search" circle style="float: left;margin-top: 6px;margin-left: 10px"/>
      </div>
      <!--拓扑图主界面-->
      <svg width="1100px" height="540px" id="topology_container" ref="main_svg">

      </svg>
    </el-col>
  </el-row>
</template>
<script>
  import * as d3 from "d3";
  import _svg from './svg'
  import data from './data'
  import _node from './node'
  import _link from './link'
  import _link_text from './link_text'
  import _force from './force'
  import _listener from './_listener'

  export default {
    data() {
      return {
        key_array: [],//模型名称数组{Host，App，。。。}
        node_obj: null,//右键菜单选中资源实例
        link_obj: null,//右键菜单选中资源关系

        dialogTitle: "Resource", //查看资源详情弹窗标题
        dialogVisible: false,//查看资源详情弹窗是否可见
        ResData: [],
        TypeData: [],
        ModelData: [],

        booleanZoom: true,//鼠标滚轮缩放开关
        forceSwitch: true,//节点固定或力拖拽效果开关
        searchParam: "",//用户查询输入字符
      }
    },
    mounted() {
      this.initTopology(data);
      document.onclick = function (e) {
        d3.select("#topo_contextmenu").attr("hidden", "hidden");
      }
    },
    methods: {
      initTopology: function (data) {
        let svg = _svg(), force = _force(svg);
        let that = this;
        debugger
        update(data);
        force.restart();

        function update() {
          debugger
          force.nodes(data.nodes);
          force.force("link").links(data.links);
          let node = _node(data.keys, data.datas),
            link = _link(data.links),
            link_text = _link_text(data.links);
          _listener(that, force, node, link, link_text, update, data);
        }
      },
    }
  }
</script>
<style scope="css">
  #topology_container {
    border: solid black;
    background-color: rgba(255, 255, 255, 255);
    box-shadow: 0 0 4px #cc7e65;
    border: 2px solid #66595a;
  }

  .toolmenu {
    float: left;
    margin-top: 6px;
    margin-left: 30px;
  }

  .toolmenu_zoom {
    float: left;
    margin-top: 10px;
    margin-left: 30px;
  }

  #topo_contextmenu {
    position: fixed;
    background-color: white;
    border-radius: 1px;
    min-height: 20px;
    border-radius: 5px;
    min-width: 120px;
    max-height: 540px;
    box-shadow: 0 0 10px #5bcc84;
    border: 2px solid #d4d674
  }

  #topo_contextmenu ul {
    list-style-type: none;
    margin: 0 0 0 0;
    border-radius: 5px;
    padding-left: 0px;
    -webkit-border-radius: 5px;
    background-color: rgba(62, 97, 121, 0.58);
  }

  #topo_contextmenu li {
    background-color: #fff;
    line-height: 22px;
    font-size: 15px;
    color: black;
    border-bottom: 0px solid #ccc;
  }

  .link {
    animation: line_ani 20s linear infinite;
  }

  #dragline {
    position: fixed;
    fill: none;
    stroke: #000;
    stroke-width: 1px;
    cursor: default;
  }

  @keyframes line_ani {
    from {
      stroke-dashoffset: 100;
    }
    to {
      stroke-dashoffset: 1;
    }
  }

  #toolmenu {
    width: auto;
    height: 40px;
    box-shadow: 0 0 10px #cc7e65;
  }
</style>
