<template>
  <div class="resourceOverview-container">
    <h2 class="title" style="margin-top: 5px;">统计资源图表</h2>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <p>按状态资源统计</p>
          <div>
            <div id="State" :style="{ height: '400px'}"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <p>按层级资源统计</p>
          <div>
            <div id="Level" :style="{ height: '400px'}"></div>
            <!-- <div style="width: 100%; height:75px">
              <el-table size="mini" :data="hierarchyNum" border style="width: 100%;">
                <el-table-column align="center" prop="SaaS" label="SaaS" width="80"></el-table-column>
                <el-table-column align="center" prop="PaaS" label="PaaS" width="80"></el-table-column>
                <el-table-column align="center" prop="IaaS" label="IaaS" width="80"></el-table-column>
                <el-table-column align="center" prop="Others" label="其他"></el-table-column>
              </el-table>
            </div> -->
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="8">
        <el-card>
          <p>按系统资源统计</p>
          <div>
            <div id="Tendency" :style="{ height: '375px'}"></div>
          </div>
        </el-card>
      </el-col> -->
    </el-row>
    <h2 class="title">统计资源变更</h2>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="table-style">
        <el-card>
          <p class="resource-title">资源统计</p>
          <div>
            <div id="Tendency" :style="{ height: '400px'}"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <h2 class="title">统计系统资源</h2>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="table-style">
        <el-card>
          <p class="resource-title">资源统计</p>
          <div>
            <div id="System" :style="{ height: '400px'}"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <h2 class="title">资源快速入口</h2>
    <div class="resource-entrance">
      <div class="resource-item">
        <p class="entrance-title">SaaS层</p>
        <div class="entrance-item">
          <div class="sass">
            <p>应用类资源</p>
            <ul class="info">
              <li
                v-for="(item, index) in S_Application"
                :key="index"
                @click="quickAccess(item)"
              >{{item.alias}}</li>
            </ul>
          </div>
          <div class="sass">
            <p>业务类资源</p>
            <ul class="info">
              <li
                v-for="(item, index) in S_BusinessData"
                :key="index"
                @click="quickAccess(item)"
              >{{item.alias}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="resource-item">
        <p class="entrance-title">PaaS层</p>
        <div class="entrance-item">
          <div class="sass">
            <p>逻辑类资源</p>
            <ul class="info">
              <li
                v-for="(item, index) in P_Logic"
                :key="index"
                @click="quickAccess(item)"
              >{{item.alias}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="resource-item">
        <p class="entrance-title">laaS层</p>
        <div class="entrance-item">
          <div class="sass">
            <p>逻辑类资源</p>
            <ul class="info">
              <li
                v-for="(item, index) in I_Logic"
                :key="index"
                @click="quickAccess(item)"
              >{{item.alias}}</li>
            </ul>
          </div>
          <div class="sass">
            <p>物理类资源</p>
            <ul class="info">
              <li
                v-for="(item, index) in I_Physical"
                :key="index"
                @click="quickAccess(item)"
              >{{item.alias}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="resource-item">
        <p class="entrance-title">Others层</p>
        <div class="entrance-item">
          <div class="sass">
            <p>其他类资源</p>
            <ul class="info">
              <li
                v-for="(item, index) in O_Other"
                :key="index"
                @click="quickAccess(item)"
              >{{item.alias}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import * as service from "@/modules/rms/api/resourceOverview/resourceOverview.js";
export default {
  created() {
    if (!this.$store.state.resourceManagement.on_treeData) {
      this.$store
        .dispatch("treeData")
        .then(result => {
          
          var data = this.$store.state.resourceManagement.treeData;
          // console.log(JSON.stringify(data));
          for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].children.length; j++) {
              if (data[i].children[j].children) {
                for (var k = 0; k < data[i].children[j].children.length; k++) {
                  if (
                    data[i].value == "SaaS" &&
                    data[i].children[j].value == "Application"
                  ) {
                    this.S_Application.push({
                      uri: data[i].children[j].children[k].uri,
                      value: data[i].children[j].children[k].value,
                      alias: data[i].children[j].children[k].alias,
                      id: data[i].children[j].children[k].id
                    });
                  }
                  if (
                    data[i].value == "SaaS" &&
                    data[i].children[j].value == "Business"
                  ) {
                    this.S_BusinessData.push({
                      uri: data[i].children[j].children[k].uri,
                      value: data[i].children[j].children[k].value,
                      alias: data[i].children[j].children[k].alias,
                      id: data[i].children[j].children[k].id
                    });
                  }
                  if (
                    data[i].value == "PaaS" &&
                    data[i].children[j].value == "Logic"
                  ) {
                    this.P_Logic.push({
                      uri: data[i].children[j].children[k].uri,
                      value: data[i].children[j].children[k].value,
                      alias: data[i].children[j].children[k].alias,
                      id: data[i].children[j].children[k].id
                    });
                  }
                  if (
                    data[i].value == "IaaS" &&
                    data[i].children[j].value == "Logic"
                  ) {
                    this.I_Logic.push({
                      uri: data[i].children[j].children[k].uri,
                      value: data[i].children[j].children[k].value,
                      alias: data[i].children[j].children[k].alias,
                      id: data[i].children[j].children[k].id
                    });
                  }
                  if (
                    data[i].value == "IaaS" &&
                    data[i].children[j].value == "Physical"
                  ) {
                    this.I_Physical.push({
                      uri: data[i].children[j].children[k].uri,
                      value: data[i].children[j].children[k].value,
                      alias: data[i].children[j].children[k].alias,
                      id: data[i].children[j].children[k].id
                    });
                  }
                  if (
                    data[i].value == "Others" &&
                    data[i].children[j].value == "Other"
                  ) {
                    this.O_Other.push({
                      uri: data[i].children[j].children[k].uri,
                      value: data[i].children[j].children[k].value,
                      alias: data[i].children[j].children[k].alias,
                      id: data[i].children[j].children[k].id
                    });
                  }
                }
              }
            }
          }
        })
        .catch(err => {});
    } else {
      var data = this.$store.state.resourceManagement.treeData;
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].children.length; j++) {
          if (data[i].children[j].children) {
            for (var k = 0; k < data[i].children[j].children.length; k++) {
              if (
                data[i].value == "SaaS" &&
                data[i].children[j].value == "Application"
              ) {
                this.S_Application.push({
                  uri: data[i].children[j].children[k].uri,
                  value: data[i].children[j].children[k].value,
                  alias: data[i].children[j].children[k].alias,
                  id: data[i].children[j].children[k].id
                });
              }
              if (
                data[i].value == "SaaS" &&
                data[i].children[j].value == "Business"
              ) {
                this.S_BusinessData.push({
                  uri: data[i].children[j].children[k].uri,
                  value: data[i].children[j].children[k].value,
                  alias: data[i].children[j].children[k].alias,
                  id: data[i].children[j].children[k].id
                });
              }
              if (
                data[i].value == "PaaS" &&
                data[i].children[j].value == "Logic"
              ) {
                this.P_Logic.push({
                  uri: data[i].children[j].children[k].uri,
                  value: data[i].children[j].children[k].value,
                  alias: data[i].children[j].children[k].alias,
                  id: data[i].children[j].children[k].id
                });
              }
              if (
                data[i].value == "IaaS" &&
                data[i].children[j].value == "Logic"
              ) {
                this.I_Logic.push({
                  uri: data[i].children[j].children[k].uri,
                  value: data[i].children[j].children[k].value,
                  alias: data[i].children[j].children[k].alias,
                  id: data[i].children[j].children[k].id
                });
              }
              if (
                data[i].value == "IaaS" &&
                data[i].children[j].value == "Physical"
              ) {
                this.I_Physical.push({
                  uri: data[i].children[j].children[k].uri,
                  value: data[i].children[j].children[k].value,
                  alias: data[i].children[j].children[k].alias,
                  id: data[i].children[j].children[k].id
                });
              }
              if (
                data[i].value == "Others" &&
                data[i].children[j].value == "Other"
              ) {
                this.O_Other.push({
                  uri: data[i].children[j].children[k].uri,
                  value: data[i].children[j].children[k].value,
                  alias: data[i].children[j].children[k].alias,
                  id: data[i].children[j].children[k].id
                });
              }
            }
          }
        }
      }
    }
  },
  data() {
    return {
      // 资源数据分类
      S_BusinessData: [],
      S_Application: [],
      P_Logic: [],
      I_Logic: [],
      I_Physical: [],
      O_Other: [],
      // 三个饼图
      State: {
        level: '3',
        type: 'all',
        data: [],
        legend_data: [],
        series_data: [],
      },
      Level: {
        level: '5',
        type: 'all',
        IaaS: {
          level: '5',
          type: 'IaaS'
        },
        PaaS: {
          level: '5',
          type: 'PaaS'
        },
        SaaS: {
          level: '5',
          type: 'SaaS'
        },
        Others: {
          level: '5',
          type: 'Others'
        },
        level_data: [],
        IaaS_data: [],
        PaaS_data: [],
        SaaS_data: [],
        Others_data: [],
        legend_data: [],
        type_data: []
      },
      Tendency: {
        level: '6',
        type: 'all',
        data: [],
        Updated: [],
        Increase: [],
        Deleted: [],
      },
      System: {
        level: '2',
        type: 'all',
        data: [],
        legend_data: [],
        value_data: [],
      },
      systemShow_X: [],
      systemShow_Y: [],

      // 拼成的四组数据数据
      stateNum: 0,
      hierarchyNum: [{}],
      resourceNum: [],
      systemNum: [],
      // 查询字段
      queryType: {
        
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
        this.drawstateShow();
        this.drawhierarchyShow();
        this.drawsystemShow();
        this.drawResourceShow();
      
    },
    // 拼接饼图数据
    conversionData(data, type) {
      for (let i = 0; i < data.length; i++) {
        if (type == "Level") {
          this.Level.level_data.push({value:data[i]['count'], name:data[i]['name']})
        }
        if (type == "State") {
          this.stateNum += data[i]["count"];
          this.State.legend_data.push(data[i]['state'])
          this.State.series_data.push({value:data[i]['count'], name:data[i]['state']})
        }
        if (type == "Tendency") {
          this.Tendency.data.push(data[i]['Id'])
          this.Tendency.Deleted.push(data[i]['Deleted'])
          this.Tendency.Increase.push(data[i]['Increase'])
          this.Tendency.Updated.push(data[i]['Updated'])
        }
        if (type == "System") {
          this.System.legend_data.push(data[i]['name'])
          this.System.value_data.push(data[i]['count'])
        }
        // if (type == "state") {
        //   this.stateNum += data[i]["count"];
        //   data[i]["value"] = data[i]["count"];
        //   data[i]["name"] = `${data[i]["state"]}:${data[i]["count"]}/个`;
        // }
      }
    },
    // 拼接分类数据
    classification(data,type){
      for (let i = 0; i < data.length; i++) {
        if(type == 'IaaS' && data[i]["name"] == 'Physical'){
          this.Level.IaaS_data.push({value:data[i]['count'], name:"IaaS/物理"})
          this.Level.legend_data.push("IaaS/物理")
        }
        if(type == 'IaaS' && data[i]["name"] == 'Logic'){
          this.Level.IaaS_data.push({value:data[i]['count'], name:"IaaS/逻辑"})
          this.Level.legend_data.push("IaaS/逻辑")
        }
        if(type == 'PaaS' && data[i]["name"] == 'Logic'){
          this.Level.PaaS_data.push({value:data[i]['count'], name:"PaaS/逻辑"})
          this.Level.legend_data.push("PaaS/逻辑")
        }
        if(type == 'SaaS' && data[i]["name"] == 'Application'){
          this.Level.SaaS_data.push({value:data[i]['count'], name:"SaaS/应用"})
          this.Level.legend_data.push("SaaS/应用")
        }
        if(type == 'SaaS' && data[i]["name"] == 'Business'){
          this.Level.SaaS_data.push({value:data[i]['count'], name:"SaaS/业务"})
          this.Level.legend_data.push("SaaS/业务")
        }
        if(type == 'Others' && data[i]["name"] == 'Others'){
          this.Level.Others_data.push({value:data[i]['count'], name:"Others/其他"})
          this.Level.legend_data.push("Others/其他")
        }
      }
    },
    // 判断字节长度
    gblen(str) {
      var len = 0;
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
          len += 2;
        } else {
          len++;
        }
      }
      return len;
    },
    // 资源状态
    drawstateShow() {
      service.queryResourceOverview(this.State).then(res => {
        if(res){
          this.conversionData(res[Object.keys(res)[0]], Object.keys(res)[0]);
          let myChart = this.$echarts.init(document.getElementById("State"));
          myChart.setOption({
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data:this.State.legend_data
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
                    name:'状态资源',
                    type:'pie',
                    radius : [40, 130],
                    center : ['50%', '50%'],
                    roseType : 'area',
                    data: this.State.series_data
                }
            ],
            graphic: {
              type: "text",
              left: "center",
              top: "center",
              z: 2,
              zlevel: 100,
              style: {
                text: `物理类\n ${this.stateNum}/个`,
                font: "bolder 18px cursive",
                textAlign: "center"
              }
            }
        });
        }
      })
    },
    // 资源层级
    drawhierarchyShow() {
      service.queryResourceOverview(this.Level).then(res => {
        
        if(res){
          this.conversionData(res[Object.keys(res)[0]], Object.keys(res)[0]);
          service.queryResourceOverview(this.Level.IaaS).then(res => {
              
            if(res){
              this.classification(res[Object.keys(res)[0]],this.Level.IaaS.type)
              service.queryResourceOverview(this.Level.PaaS).then(res => {
                if(res){
                  this.classification(res[Object.keys(res)[0]],this.Level.PaaS.type)
                  service.queryResourceOverview(this.Level.SaaS).then(res => {
                    if(res){
                      this.classification(res[Object.keys(res)[0]],this.Level.SaaS.type)
                      service.queryResourceOverview(this.Level.Others).then(res => {
                        if(res){
                          this.classification(res[Object.keys(res)[0]],this.Level.Others.type)

                          let myChart = this.$echarts.init(document.getElementById("Level"));

                          myChart.setOption({
                                        tooltip: {
                                            trigger: 'item',
                                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                                        },
                                        legend: {
                                            x : 'center',
                                            y : 'bottom',
                                            data: this.Level.legend_data
                                        },
                                        series: [
                                            {
                                                name:'系统层级',
                                                type:'pie',
                                                selectedMode: 'single',
                                                radius: [0, '30%'],

                                                label: {
                                                    normal: {
                                                        position: 'inner'
                                                    }
                                                },
                                                labelLine: {
                                                    normal: {
                                                        show: false
                                                    }
                                                },
                                                data: this.Level.level_data
                                            },
                                            {
                                                name:'资源分类',
                                                type:'pie',
                                                radius: ['38%', '50%'],
                                                label: {
                                                    normal: {
                                                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  ',
                                                        backgroundColor: '#eee',
                                                        borderColor: '#aaa',
                                                        borderWidth: 1,
                                                        borderRadius: 4,
                                                        // shadowBlur:3,
                                                        // shadowOffsetX: 2,
                                                        // shadowOffsetY: 2,
                                                        // shadowColor: '#999',
                                                        // padding: [0, 7],
                                                        rich: {
                                                            a: {
                                                                color: '#999',
                                                                lineHeight: 22,
                                                                align: 'center'
                                                            },
                                                            // abg: {
                                                            //     backgroundColor: '#333',
                                                            //     width: '100%',
                                                            //     align: 'right',
                                                            //     height: 22,
                                                            //     borderRadius: [4, 4, 0, 0]
                                                            // },
                                                            hr: {
                                                                borderColor: '#aaa',
                                                                width: '100%',
                                                                borderWidth: 0.5,
                                                                height: 0
                                                            },
                                                            b: {
                                                                fontSize: 16,
                                                                lineHeight: 33
                                                            },
                                                            per: {
                                                                color: '#eee',
                                                                backgroundColor: '#334455',
                                                                padding: [2, 4],
                                                                borderRadius: 2
                                                            }
                                                        }
                                                    }
                                                },
                                                data:this.Level.type_data.concat(this.Level.IaaS_data,this.Level.PaaS_data,this.Level.SaaS_data,this.Level.Others_data)
                                            }
                                        ]
                                    });
                                    
                          }
                      })
                    }
                  })
                }
              })
            }
          })
          
        }
      })
    },
    // 资源变更
    drawResourceShow() {
      service.queryResourceOverview(this.Tendency).then(res => {
        
        if(res){
          this.conversionData(res[Object.keys(res)[0]], Object.keys(res)[0]);
          let myChart = this.$echarts.init(document.getElementById("Tendency"));
          myChart.setOption({
              color: ['#003366', '#006699', '#4cabce'],
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'shadow'
                  }
              },
              legend: {
                  data: ['本月新增','本月变更','本月删除']
              },
              toolbox: {
                  show: true,
                  orient: 'vertical',
                  lineheight: '90px',
                  left: '93%',
                  top: 'center',
                  feature: {
                      mark: {show: true},
                      dataView: {show: true, readOnly: false},
                      magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                      restore: {show: true},
                      saveAsImage: {show: true}
                  }
              },
              calculable: true,
              xAxis: [
                  {
                      type: 'category',
                      axisTick: {show: false},
                      data: this.Tendency.data
                  }
              ],
              yAxis: [
                  {
                      type: 'value'
                  }
              ],
              series: [
                  {
                      name: '本月新增',
                      type: 'bar',
                      barGap: 0,
                      label: labelOption,
                      data: this.Tendency.Increase
                  },
                  {
                      name: '本月变更',
                      type: 'bar',
                      label: labelOption,
                      data: this.Tendency.Updated
                  },
                  {
                      name: '本月删除',
                      type: 'bar',
                      label: labelOption,
                      data: this.Tendency.Deleted
                  }
              ]
          })
          var labelOption = {
              normal: {
                  show: true,
                  formatter: '{c}  {name|{a}}',
                  fontSize: 16,
                  rich: {
                      name: {
                          textBorderColor: '#fff'
                      }
                  }
              }
          };
        }
      })
    },
    // 资源系统
    drawsystemShow() {
      service.queryResourceOverview(this.System).then(res => {
        
        if(res){
          this.conversionData(res[Object.keys(res)[0]], Object.keys(res)[0]);
          let myChart = this.$echarts.init(document.getElementById("System"));
          // myChart.setOption({
          //   title: {
          //       text: '系统资源TOP10',
          //       left: 'center'
          //   },
          //   color: ["#3398DB"],
          //   tooltip: {
          //     trigger: "axis",
          //     axisPointer: {
          //       // 坐标轴指示器，坐标轴触发有效
          //       type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          //     }
          //   },
          //   toolbox: {
          //         show: true,
          //         orient: 'vertical',
          //         left: '98%',
          //         top: 'center',
          //         feature: {
          //             mark: {show: true},
          //             dataView: {show: true, readOnly: false},
          //             magicType: {show: true, type: ['line', 'bar']},
          //             restore: {show: true},
          //             saveAsImage: {show: true}
          //         }
          //     },
          //   calculable: true,
          //   grid: {
          //     left: "3%",
          //     right: "4%",
          //     bottom: "3%",
          //     containLabel: true
          //   },
          //   xAxis: [
          //     {
          //       type: "category",
          //       data: this.systemShow_X,
          //       axisTick: {
          //         alignWithLabel: true
          //       }
          //     }
          //   ],
          //   yAxis: [
          //     {
          //       type: "value"
          //     }
          //   ],
          //   series: [
          //     {
          //       name: "系统资源",
          //       type: "bar",
          //       barWidth: "60%",
          //       data: this.systemShow_Y,
          //     }
          //   ],
          //   axisLabel: {
          //     //坐标轴刻度标签的相关设置。
          //     formatter: function(params) {
          //       var newParamsName = ""; // 最终拼接成的字符串
          //       var paramsNameNumber = params.length; // 实际标签的个数
          //       var provideNumber = 5; // 每行能显示的字的个数
          //       var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
          //       /**
          //        * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
          //        */
          //       // 条件等同于rowNumber>1
          //       if (paramsNameNumber > provideNumber) {
          //         /** 循环每一行,p表示行 */
          //         for (var p = 0; p < rowNumber; p++) {
          //           var tempStr = ""; // 表示每一次截取的字符串
          //           var start = p * provideNumber; // 开始截取的位置
          //           var end = start + provideNumber; // 结束截取的位置
          //           // 此处特殊处理最后一行的索引值
          //           if (p == rowNumber - 1) {
          //             // 最后一次不换行
          //             tempStr = params.substring(start, paramsNameNumber);
          //           } else {
          //             // 每一次拼接字符串并换行
          //             tempStr = params.substring(start, end) + "\n";
          //           }
          //           newParamsName += tempStr; // 最终拼成的字符串
          //         }
          //       } else {
          //         // 将旧标签的值赋给新标签
          //         newParamsName = params;
          //       }
          //       //将最终的字符串返回
          //       return newParamsName;
          //     }
          //   }
          // })
          myChart.setOption({
              title: {
                  text: '系统资源TOP10',
                  left: 'center'
              },
              color: ['#337ab7'],
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'shadow'
                  }
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              toolbox: {
                  show: true,
                  orient: 'vertical',
                  lineheight: '90px',
                  left: '96%',
                  top: 'center',
                  feature: {
                      mark: {show: true},
                      dataView: {show: true, readOnly: false},
                      magicType: {show: true, type: ['line', 'bar']},
                      restore: {show: true},
                      saveAsImage: {show: true}
                  }
              },
              calculable: true,
              xAxis: [
                  {
                      type: 'category',
                      axisTick: {show: false},
                      data: this.System.legend_data
                  }
              ],
              yAxis: [
                  {
                      type: 'value'
                  }
              ],
              series: [
                  {
                      name: '本月新增',
                      type: 'bar',
                      barGap: 0,
                      label: labelOption,
                      data: this.System.value_data
                  },
              ],
              axisLabel: {
              //坐标轴刻度标签的相关设置。
              formatter: function(params) {
                var newParamsName = ""; // 最终拼接成的字符串
                var paramsNameNumber = params.length; // 实际标签的个数
                var provideNumber = 5; // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ""; // 表示每一次截取的字符串
                    var start = p * provideNumber; // 开始截取的位置
                    var end = start + provideNumber; // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr; // 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName;
              }
            }
          })
           var labelOption = {
              normal: {
                  show: true,
                  formatter: '{c}  {name|{a}}',
                  fontSize: 16,
                  rich: {
                      name: {
                          textBorderColor: '#fff'
                      }
                  }
              }
          };
        }
      })
    },
    quickAccess(item) {
      
      this.$store.dispatch("quickAccess", item).then(res => {
        this.$router.push({ name: "data" });
      });
    }
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
.resourceOverview-container {
  padding: 10px;
  .title {
    margin: 18px 0 5px 0;
  }
  .resource-title {
    margin-bottom: 20px;
  }
  .table-style tr {
    margin: 15px 50px;
    display: block;
    td {
      display: inline-block;
    }
    .tr-style {
      width: 100px;
      margin-right: 90px;
    }
  }
  .table-style1 tr {
    .tr-style {
      width: 80px;
      margin-right: 76px;
    }
  }
  .resource-entrance {
    // padding: 20px;
    .resource-item {
      margin-bottom: 20px;
      background: #fff;
      padding: 10px;
      border-radius: 6px;
      -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      .entrance-title {
        font-size: 18px;
      }
      .entrance-item {
        padding-top: 15px;
        .sass {
          display: flex;
          padding: 5px 0;
          p {
            width: 150px;
            color: #aaa;
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 5px;
          }
          .info {
            width: 1000px;
            display: flex;
            flex-wrap: wrap;
            li {
              padding: 5px 10px;
              cursor: pointer;
            }
            li:hover {
              color: #409EFF;
            }
          }
        }
      }
    }
  }
}
.tb-edit .el-table th > .cell {
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

