<template>
  <div class="statistics-container">
    <h2 class="item-title">资源统计</h2>
    <el-row class="tac">
      <el-tabs tab-position="left">
        <el-tab-pane label="按类型">
          <el-tabs v-model="activeName">
            <el-tab-pane label="所有类型" name="first">
              <p class="info-title">按类型统计</p>
              <el-row type="flex" justify="start" :gutter="10">
                <el-col :span="3">
                  <el-card class="box-card">
                    <p class="info-total">资源总量</p>
                    <p class="info-count" v-cloak>{{s_total}}</p>
                  </el-card>
                </el-col>
                <el-col :span="3">
                  <el-card class="box-card">
                    <p class="info-total">物理类</p>
                    <p class="info-count">{{s_physical}}</p>
                  </el-card>
                </el-col>
                <el-col :span="3">
                  <el-card class="box-card">
                    <p class="info-total">逻辑类</p>
                    <p class="info-count">{{s_logic}}</p>
                  </el-card>
                </el-col>
                <el-col :span="3">
                  <el-card class="box-card">
                    <p class="info-total">应用类</p>
                    <p class="info-count">{{s_application}}</p>
                  </el-card>
                </el-col>
                <el-col :span="3">
                  <el-card class="box-card">
                    <p class="info-total">业务类</p>
                    <p class="info-count">{{s_business}}</p>
                  </el-card>
                </el-col>
                <el-col :span="3">
                  <el-card class="box-card">
                    <p class="info-total">其他类</p>
                    <p class="info-count">{{s_other}}</p>
                  </el-card>
                </el-col>
              </el-row>
              <p class="info-title">各类型对比</p>
              <el-row>
                <el-col :span="18">
                  <el-card>
                    <div id="stateShow" :style="{width:'700px',height: '500px'}"></div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="物理资源" name="second">
              <el-row>
                <el-col :span="18">
                  <el-card>
                    <div id="physicsCharts" :style="{width:'700px',height: '500px'}"></div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="逻辑资源" name="third">
              <el-row>
                <el-col :span="18">
                  <el-card>
                    <div id="logicCharts" :style="{width:'700px',height: '500px'}"></div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="应用资源" name="fourth">
              <el-row>
                <el-col :span="18">
                  <el-card>
                    <div id="applicationCharts" :style="{width:'700px',height: '500px'}"></div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="业务资源" name="five">
              <!-- 业务资源类型 -->
              <el-row>
                <el-col :span="18">
                  <el-card>
                    <div id="businessCharts" :style="{width:'700px',height: '500px'}"></div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="其他资源" name="six">
              <el-row>
                <el-col :span="18">
                  <el-card>
                    <div id="otherCharts" :style="{width:'700px',height: '500px'}"></div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <!-- 按系统分类 -->
        <el-tab-pane label="按系统">
          <el-tabs v-model="sysName">
            <el-tab-pane label="所有系统" name="first">
              <el-row>
                <p class="info-title">按系统统计</p>
                <el-row type="flex" justify="start" :gutter="10">
                  <el-col :span="3">
                    <el-card class="box-card">
                      <p class="info-total">系统总量</p>
                      <p class="info-count">{{sys_sum}}</p>
                    </el-card>
                  </el-col>
                  <el-col :span="3" v-for="key in sysarr" :key="key.name">
                    <el-card class="box-card">
                      <p class="info-total">{{key.name}}</p>
                      <p class="info-count">{{key.value}}</p>
                    </el-card>
                  </el-col>
                </el-row>
                <p class="info-title">各系统占比</p>
                <el-col :span="18">
                  <el-card>
                    <div id="allSystemChart" :style="{width:'700px',height: '500px'}"></div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="物理系统" name="second">
              <el-row>
                <el-col :span="18">
                  <el-card>
                    <div id="physysChart" :style="{width:'700px',height: '500px'}"></div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="逻辑系统" name="third">
              <el-row>
                <el-col :span="18">
                  <el-card>
                    <div id="logsysChart" :style="{width:'700px',height: '500px'}"></div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="应用系统" name="fourth">
              <el-row>
                <el-col :span="18">
                  <el-card>
                    <div id="appsysChart" :style="{width:'700px',height: '500px'}"></div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="业务系统" name="fifth">
              <el-row>
                <el-col :span="18">
                  <el-card>
                    <div id="bussysChart" :style="{width:'700px',height: '500px'}"></div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="其他系统" name="sixth">
              <el-row>
                <el-col :span="18">
                  <el-card>
                    <div id="othsysChart" :style="{width:'700px',height: '500px'}"></div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="按状态">
          <el-tabs v-model="statusName">
            <el-tab-pane label="所有状态" name="first">
              <el-row>
                <p class="info-title">按状态统计</p>
                <el-row type="flex" justify="start" :gutter="10">
                  <el-col :span="3">
                    <el-card class="box-card">
                      <p class="info-total">状态总量</p>
                      <p class="info-count">{{s_physical}}</p>
                    </el-card>
                  </el-col>
                  <el-col :span="3" v-for="key in status_arr" :key="key.name">
                    <el-card class="box-card">
                      <p class="info-total">{{key.name}}</p>
                      <p class="info-count">{{key.value}}</p>
                    </el-card>
                  </el-col>
                </el-row>
                <p class="info-title">各状态占比</p>
                <el-col :span="18">
                  <el-card>
                    <div id="allstatusChart" :style="{width:'450px',height: '372px'}"></div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="按地区">按地区</el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.statistics-container {
  padding: 10px 20px;
  .item-title {
    padding: 10px 10px;
    font-size: 20px;
  }
  .box-card {
    height: 90px;
    text-align: center;
  }
  .info-title {
    padding: 10px 0;
  }
  .info-count {
    margin: 5px 0;
    font-size: 30px;
    font-weight: blod;
  }
  .echarts-box {
    background-color: #ffddd4;
  }
}
</style>

<script>
import * as qc from "@/modules/rms/api/toShow/toShow.js";

export default {
  data() {
    return {
      lang: {},
      activeName: "first",
      sysName: "first",
      statusName: "first",
      s_total: "",
      s_physical: "",
      s_application: "",
      s_logic: "",
      s_business: "",
      s_other: "",
      l_obj: {},
      a_obj: {},
      b_obj: {},
      o_obj: {},
      asys_obj: {},
      sysarr: [],
      sys_sum: 0,
      psys_obj: "",
      lsys_obj: "",
      apsys_obj: "",
      bsys_obj: "",
      osys_obj: "",
      status_arr: "",
      area_obj: ""
    };
  },
  created() {},
  methods: {
    getDraw(fn) {
      qc.queryClass().then(dat => {
        debugger;
        if (dat) {
          this.$data.s_total = dat["Type"][0].count;
          this.$data.s_physical = dat["Type"][4].count;
          this.$data.s_application = dat["Type"][2].count;
          this.$data.s_business = dat["Type"][1].count;
          this.$data.s_logic = dat["Type"][3].count;
          this.$data.s_other = dat["Type"][5].count;
          fn(dat);
        }
      });
    },
    getPhysical(fn) {
      qc.queryPhysical().then(dat => {
        if (dat) {
          fn(dat);
        }
      });
    },
    drawstateShow(dat) {
      let da = dat["Type"];
      let name = [];
      let count = [];
      for (let i = 0; i < da.length; i++) {
        name.push(da[i].name);
        count.push(da[i].count);
      }
      let myChart = this.$echarts.init(document.getElementById("stateShow"));
      myChart.setOption({
        title: {
          text: "所有类型资源",
          subtext: "统计分析"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          x: "center",
          data: name
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        polar: [
          {
            indicator: [
              { text: "物理资源", max: 200 },
              { text: "逻辑资源", max: 200 },
              { text: "应用资源", max: 200 },
              { text: "业务资源", max: 200 },
              { text: "其他资源", max: 200 }
            ],
            radius: 200
          }
        ],
        series: [
          {
            name: "数量",
            type: "radar",
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default"
                }
              }
            },
            data: [
              {
                value: count,
                name: "所有类型资源"
              }
            ]
          }
        ]
      });
    },
    drawPhysicsShow(dat) {
      let da = dat["Type"];
      let name = [];
      let count = [];
      for (let i = 0; i < da.length; i++) {
        name.push(da[i].name);
        count.push(da[i].count);
      }
      let myChart = this.$echarts.init(
        document.getElementById("physicsCharts")
      );
      myChart.setOption({
        tooltip: {
          trigger: "item" //悬浮提示框不显示
        },
        grid: {
          //绘图区调整
          x: 150, //左留白
          y: 10, //上留白
          //   x2: 10, //右留白
          y2: 20 //下留白
        },
        xAxis: [
          {
            show: false,
            type: "value",
            boundaryGap: [0, 0],
            position: "top"
          }
        ],
        yAxis: [
          {
            type: "category",
            data: name, //遍历数据库的键
            axisLine: { show: false }, //坐标轴
            axisTick: [
              {
                //坐标轴小标记
                show: false
              }
            ],
            axisLabel: {
              textStyle: {
                fontSize: "16"
              }
            }
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            tooltip: { show: false },
            barMinHeight: 18, //最小柱高
            barWidth: 40, //柱宽度
            barMaxWidth: 30, //最大柱宽度
            data: count,
            itemStyle: {
              normal: {
                //柱状图颜色
                color: "#199ED8",
                label: {
                  show: true,
                  position: "right", //数据值位置
                  textStyle: {
                    color: "#000",
                    fontSize: "20"
                  }
                }
              }
            }
          }
        ]
      });
    },
    getLogic(fn) {
      qc.queryLogic().then(dat => {
        if (dat) {
          this.$data.l_obj = dat;
          fn(this.$data.l_obj);
        }
      });
    },
    drawlogicShow(dat) {
      let arr = dat.Type;
      let arr1 = [];
      let name = [];
      for (let i = 0; i < arr.length; i++) {
        let obj = {};
        obj.name = arr[i]["name"];
        name[i] = arr[i]["name"];
        obj.value = arr[i]["count"];
        arr1.push(obj);
      }
      let myChart = this.$echarts.init(document.getElementById("logicCharts"));
      myChart.setOption({
         title : {
        text: '逻辑资源',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:name
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true, 
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'面积模式',
            type:'pie',
            radius : [40, 180],
            center : ['65%', 250],
            roseType : 'area',
            x: '50%',               // for funnel
            max: 40,                // for funnel
            sort : 'ascending',     // for funnel
            data:arr1
        }
    ]
      });
    },
    getApplication(fn) {
      qc.queryApplication().then(dat => {
        if (dat) {
          this.$data.a_obj = dat;
          fn(this.$data.a_obj);
        }
      });
    },
    drawApplicationShow(dat) {
      let arr = dat["Type"];
      let namearr = [];
      let daarr = [];
      for (let i = 0; i < arr.length; i++) {
        namearr[i] = arr[i].name;
        daarr[i] = arr[i].count;
      }
      let myChart = this.$echarts.init(
        document.getElementById("applicationCharts")
      );
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [""]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
          data: namearr //纵轴的名称
        },
        series: [
          {
            name: "",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: daarr
          }
        ]
      });
    },
    getBusiness(fn) {
      qc.queryBusiness().then(dat => {
        if (dat) {
          this.$data.b_obj = dat;
          fn(this.$data.b_obj);
        }
      });
    },
    drawbusinessShow(dat) {
      let arr = dat["Type"];
      let arrname = [];
      let arrda = [];
      for (let i = 0; i < arr.length; i++) {
        arrname[i] = arr[i].__ob__.value.name;
        arrda[i] = arr[i].__ob__.value.count;
      }
      let myChart = this.$echarts.init(
        document.getElementById("businessCharts")
      );
      myChart.setOption({
        title: {
          text: "业务资源类型",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: arrname
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            data: arrda,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    getOther(fn) {
      qc.queryOther().then(dat => {
        if (dat) {
          this.$data.o_obj = dat;
          fn(this.$data.o_obj);
        }
      });
    },
    drawotherShow(dat) {
      let arr = dat["Type"];
      let arrname = [];
      let arrda = [];
      for (let i = 0; i < arr.length; i++) {
        arrname[i] = arr[i].name;
        arrda[i] = arr[i].count;
      }
      let myChart = this.$echarts.init(document.getElementById("otherCharts"));
      myChart.setOption({
        title: {
          text: "其他资源类型",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: arrname
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            data: arrda,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    getallsys(fn) {
      qc.queryAllsys().then(dat => {
        if (dat) {
          this.$data.asys_obj = dat;
          fn(this.$data.asys_obj);
        }
      });
    },
    drawallsysShow(dat) {
      let arr = dat["System"];
      let arrname = [];
      let arrda = [];
      let arrobj = [];
      for (let i = 0; i < arr.length; i++) {
        arrname[i] = arr[i].name;
        arrda[i] = arr[i].count;
        let obj = {};
        obj.name = arr[i].name;
        obj.value = arr[i].count;
        arrobj.push(obj);
      }
      let sum = 0;
      for (let i = 0; i < arrda.length; i++) {
        sum += arrda[i];
      }
      this.$data.sys_sum = sum;
      this.$data.sysarr = arrobj;
      let myChart = this.$echarts.init(
        document.getElementById("allSystemChart")
      );
      myChart.setOption({
        title: {
          text: "所有系统占比",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: arrname
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
              option: {
                funnel: {
                  x: "25%",
                  width: "50%",
                  funnelAlign: "left",
                  max: 1548
                }
              }
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "系统占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: arrobj
          }
        ]
      });
    },
    // 物理系统
    getphysys(fn) {
      qc.queryphysys().then(dat => {
        if (dat) {
          this.$data.psys_obj = dat;
          fn(this.$data.psys_obj);
        }
      });
    },
    drawsaasShow(dat) {
      let arr = dat["System"];
      let arrname = [];
      let arrda = [];
      let arrobj = [];
      for (let i = 0; i < arr.length; i++) {
        arrname[i] = arr[i].name;
        arrda[i] = arr[i].count;
        let obj = {};
        obj.name = arr[i].name;
        obj.value = arr[i].count;
        arrobj.push(obj);
      }
      let myChart = this.$echarts.init(document.getElementById("physysChart"));
      myChart.setOption({
        title: {
          text: "物理系统",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: arrname
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            data: arrda,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    // 逻辑系统
    getlogsys(fn) {
      qc.querylogsys().then(dat => {
        if (dat) {
          this.$data.lsys_obj = dat;
          fn(this.$data.lsys_obj);
        }
      });
    },
    drawpaasShow(dat) {
      let arr = dat["System"];
      let arrname = [];
      let arrda = [];
      let arrobj = [];
      for (let i = 0; i < arr.length; i++) {
        arrname[i] = arr[i].name;
        arrda[i] = arr[i].count;
        let obj = {};
        obj.name = arr[i].name;
        obj.value = arr[i].count;
        arrobj.push(obj);
      }
      let myChart = this.$echarts.init(document.getElementById("logsysChart"));
      myChart.setOption({
        title: {
          text: "逻辑系统",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["逻辑系统"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: arrname
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            data: arrda,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    // 应用系统
    getappsys(fn) {
      qc.queryappsys().then(dat => {
        if (dat) {
          this.$data.apsys_obj = dat;
          fn(this.$data.apsys_obj);
        }
      });
    },
    drawlaasShow(dat) {
      let arr = dat["System"];
      let arrname = [];
      let arrda = [];
      let arrobj = [];
      for (let i = 0; i < arr.length; i++) {
        arrname[i] = arr[i].name;
        arrda[i] = arr[i].count;
        let obj = {};
        obj.name = arr[i].name;
        obj.value = arr[i].count;
        arrobj.push(obj);
      }
      let myChart = this.$echarts.init(document.getElementById("appsysChart"));
      myChart.setOption({
        title: {
          text: "应用系统",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["应用系统"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: arrname
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            data: arrda,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    //业务系统
    getbussys(fn) {
      qc.querybussys().then(dat => {
        if (dat) {
          this.$data.bsys_obj = dat;
          fn(this.$data.bsys_obj);
        }
      });
    },
    drawbussysShow(dat) {
      let arr = dat["System"];
      let arrname = [];
      let arrda = [];
      let arrobj = [];
      for (let i = 0; i < arr.length; i++) {
        arrname[i] = arr[i].name;
        arrda[i] = arr[i].count;
        let obj = {};
        obj.name = arr[i].name;
        obj.value = arr[i].count;
        arrobj.push(obj);
      }
      let myChart = this.$echarts.init(document.getElementById("bussysChart"));
      myChart.setOption({
        title: {
          text: "业务系统",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["业务系统"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: arrname
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            data: arrda,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    //其他系统
    getothsys(fn) {
      qc.queryothsys().then(dat => {
        if (dat) {
          this.$data.osys_obj = dat;
          fn(this.$data.osys_obj);
        }
      });
    },
    drawothsysShow(dat) {
      let arr = dat["System"];
      let arrname = [];
      let arrda = [];
      let arrobj = [];
      for (let i = 0; i < arr.length; i++) {
        arrname[i] = arr[i].name;
        arrda[i] = arr[i].count;
        let obj = {};
        obj.name = arr[i].name;
        obj.value = arr[i].count;
        arrobj.push(obj);
      }
      let myChart = this.$echarts.init(document.getElementById("othsysChart"));
      myChart.setOption({
        title: {
          text: "其他系统",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["其他系统"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: arrname
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            data: arrda,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    //状态
    getstatus(fn) {
      qc.queryStatus().then(dat => {
        if (dat) {
          this.$data.status_obj = dat;
          fn(this.$data.status_obj);
        }
      });
    },
    drawstatusShow(dat) {
      let arr = dat["State"];
      let arrname = [];
      let arrda = [];
      let arrobj = [];
      let arrobj1 = [];
      for (let i = 0; i < arr.length; i++) {
        arrname[i] = arr[i].state;
        arrda[i] = arr[i].count;
        let obj = {};
        let obj1 = {};
        obj1.name = arr[i].state;
        obj1.value = arr[i].count;
        obj.name = arr[i].state + ":" + arrda[i] + "/个";
        obj.value = arr[i].count;
        arrobj.push(obj);
        arrobj1.push(obj1);
      }
      this.$data.status_arr = arrobj1;
      let myChart = this.$echarts.init(
        document.getElementById("allstatusChart")
      );
      myChart.setOption({
        series: [
          {
            name: "按状态统计",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["center", "center"],
            avoidLabelOverlap: false,
            label: {
              position: "outside"
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 10
            },
            data: arrobj
          }
        ],
        graphic: {
          type: "text",
          left: "center",
          top: "center",
          z: 2,
          zlevel: 100,
          style: {
            text: "物理类\n" + this.$data.s_physical + "/个",
            font: "bolder 18px cursive",
            textAlign: "center"
          }
        }
      });
    },
    //地区
    getArea(fn) {
      qc.queryArea().then(dat => {
        if (dat) {
          this.$data.status_obj = dat;
          fn(this.$data.status_obj);
        }
      });
    },
    drawareaShow(dat) {
      console.log(dat);
    }
  },

  mounted() {
    this.getDraw(this.drawstateShow);
    this.getPhysical(this.drawPhysicsShow);
    this.getLogic(this.drawlogicShow);
    this.getApplication(this.drawApplicationShow);
    this.getBusiness(this.drawbusinessShow);
    this.getOther(this.drawotherShow);
    this.getallsys(this.drawallsysShow);
    this.getphysys(this.drawsaasShow);
    this.getlogsys(this.drawpaasShow);
    this.getappsys(this.drawlaasShow);
    this.getbussys(this.drawbussysShow);
    this.getothsys(this.drawothsysShow);
    this.getstatus(this.drawstatusShow);
    this.getArea(this.drawareaShow);
  }
};
</script>
