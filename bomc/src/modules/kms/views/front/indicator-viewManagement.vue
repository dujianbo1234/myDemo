<template>
  <div class="block">
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="12">
        <el-card class="box-card">
          <span class="title"><b>|</b>&nbsp;&nbsp;&nbsp;指标运行状态统计</span>
          <div>
            <div id="firstShow" :style="{height: '350px'}"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <span class="title"><b>|</b>&nbsp;&nbsp;&nbsp;指标分组</span>
          <div>
            <div id="thirdShow" :style="{height: '350px'}"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
     <el-col :span="12" class="titleTwo">
      <el-card style="height:570px">
      <p class="title" :class={active1:isTrue1}>
        <b>|</b>&nbsp;&nbsp;&nbsp;近7日指标库数据量增长趋势
      </p>  
      <span v-show="Show3" class="ABC">暂无数据</span>
      <div v-show="Show31">
      <div id="fourShow" :style="{ height:'500px'}" class="pic"></div>
      </div>
      </el-card>
     </el-col>
     <el-col :span="12" class="titleThird" style="overflow-x:hidden;">
      <el-card style="height:570px">
      <p class="title">
        <b>|</b>&nbsp;&nbsp;&nbsp;近7日单个指标数据趋势
      </p>
      <span class="ding" >指标编码</span>
      <el-select  v-model="value"  @change="mubiao" style="width:180px"  class="ding1"  :class={active2:isTrue2}>
        <el-option
        v-for="item in Options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        />
      </el-select>   
      <span v-if="Show4" class="ABC">暂无数据</span>
      <div v-if="Show41">
      <!-- <el-select class="select">
      </el-select> -->
      <div id="fiveShow" :style="{ height:'450px'}" class="pic1"></div>
      </div>
      </el-card>
     </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
import * as server from "../../api/kms.js";
require("echarts/theme/macarons");
export default {
  data() {
    return {
    seach: {
        count: ""
    },
    Options:[],
    value:"",
    Code:"",
    isTrue1:false,
    isTrue2:false,
    Show3:false,
    Show31:true,
    Show4:false,
    Show41:true,
    OneAll:[],
     OneNum:"",
     TwoNum:"",
     ThirdNum:"",
     NumAll:"",
    numAll:[],
    numOall:[],
    ThirdTime:[],
    dataAll:[0,0,0,0,0,0,0],
    ThridAll:[],
      ThirdOne:"",
      ThirdTwo:"",
      ThirdThird:"",
      ThirdFour:"",
      ThirdFive:"",
      ThirdSix:"",
      ThirdSeven:"",
    // 50, 90, 145, 148, 160, 196, 231
    FiveAll:[],
      FiveOne:"",
      FiveTwo:"",
      FiveThird:"",
      FiveFour:"",
      FiveFive:"",
      FiveSix:"",
      FiveSeven:"",
    // [14, 12, 19, 18, 12, 20, 17]
    // FiveAll2:[60, 55, 95, 95, 55, 100, 80],
    // [60, 55, 95, 95, 55, 100, 80]
    };
  },
  mounted() {
    (async () => {
    await this.metricsTag()
    this.drawThirdShow();;

    await this.overview();
    this.drawFirstShow();

    await this.metricsCapacity();
    this.drawFourShow();

    await this.metricsGrowth();
    this.drawFiveShow(); 
    })()
    // console.log(echarts.version)
  },  
  created(){
    this.getCodes();
  },
  methods: {
    // 编码接码
    getCodes(){
      const params = {  
      model: "MetricsDef",
      params: "code",
      keys:"calcType"
      };
      server.getCodes(params).then(res => {
        // console.log(res)
        this.Options = res.datas.MetricsDef.map(item => {
            return {
              value: item.code,
              label: item.code
            };
          });
        this.value=this.Options[0].value
        this.Code=this.Options[0].value
        // console.log(this.Options)
      });
    },
    // 获取参数Code
    mubiao(data){
         this.Code=data;
             (async () => {
            await this.metricsGrowth();
            this.drawFiveShow(); 
    })()
        // this.FiveAll=[]; 
    },
    // 一图数据
    overview(){
      var params={};
      // debugger
      return server.overview(params).then(res => {     
        for (let i in res) {
         this.OneAll.push(res[i]); //属性
       }
       this.OneNum=this.OneAll[0];
       this.TwoNum=this.OneAll[1];
       this.ThirdNum=this.OneAll[2];
       this.NumAll=this.OneNum+this.TwoNum+this.ThirdNum
        },
        error => {
          console.error("请求异常！" + error);
        }
      );
    },
    //二图数据
    metricsTag(){
      var params={};
      // debugger
     return server.metricsTag(params).then(res => {     
        this.numAll=res.map(item=>{
          return {
            value:item.count,
            name:item.tag
          }
        })
        // console.log(this.numAll)
        if(this.numAll.length>9){
        var a =[]
        var aa=[]
        aa=this.numAll.slice(0,9)
        a=this.numAll.slice(9)
        // console.log(a)
        var b=[]
        for(var i = 0;i<a.length;i++){
            b.push(a[i].value)
         }
        var c =eval(b.join('+'))
        // console.log(c)
        c=c+""
        // console.log(c)
        var d={"value":c,"name":"其他"}
         aa.push(d)
         this.numOall=aa.map(item=>{
           return{
             value:item.value,
             name:item.name
           }
         })
        }else{
          this.numOall=this.numAll
        }
        //  console.log(this.numOall)
        },
        error => {
          console.error("请求异常！" + error);
        }
      );
    },
    // 三图数据
    metricsCapacity(){
      // debugger
      var params=[];
      // debugger
      function dataNow(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
      //  var y = dd.getFullYear();
      var m = dd.getMonth()+1;//获取当前月份的日期
      var d = dd.getDate();
      if(d<10){
        d="0"+d
      }
      return m+"-"+d;
      }
      // var Time1=dataNow(-1);
      // var Time2=dataNow(-2);
      // var Time3=dataNow(-3);
      // var Time4=dataNow(-4);
      // var Time5=dataNow(-5);
      // var Time6=dataNow(-6);
      // var Time7=dataNow(-7);
      var dataTime=[]
      for(var i =-1;i>-8;i--){
        dataTime.unshift(dataNow(i))
      }
     return server.metricsCapacity(params).then(res => {            
         for(let i in res){
            this.ThirdTime.push(i) 
            this.ThridAll.push(res[i])
         }
         debugger
         
         for(var i =0; i<this.ThirdTime.length;i++){
            for(var j=0;j<dataTime.length;j++){
               if(this.ThirdTime[i] == dataTime[j]){
                this.dataAll[j]=this.ThridAll[i]
                //  dataTime.splice(j,1)
               }else{
                this.dataAll[j]=this.dataAll[j]
               }
            }
         }
         console.log("你好啊啊啊啊哈哈哈"+this.dataAll)
         console.log(this.ThridAll)
          //  while(this.ThridAll.length<7){
          //     this.ThridAll.unshift("0")
          //  }
        
      }) 
      
    },
    // 四图数据
    metricsGrowth(){
      return server.metricsGrowth(this.Code).then(res => { 
        // console.log(res)
        // debugger
          for(let i in res){
            this.FiveAll.unshift(res[i])
          }
      if(this.FiveAll == 0){
        this.Show4=true
        this.Show41=false;
        this.isTrue2=true;
      }else{
        this.Show4=false;
        this.Show41=true;
        this.isTrue2=false
       } 
          this.FiveOne=this.FiveAll[0];
          this.FiveTwo=this.FiveAll[1];
          this.FiveThird=this.FiveAll[2];
          this.FiveFour=this.FiveAll[3];
          this.FiveFive=this.FiveAll[4];
          this.FiveSix=this.FiveAll[5];
          this.FiveSeven=this.FiveAll[6];
          console.log("哦也"+this.FiveAll)
           this.FiveAll=[]; 
      })
    },

    /**
     * 图形
     */
    drawFirstShow() {
      let myChart = echarts.init(document.getElementById("firstShow"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 140,
          bottom: 20,
        },
        color: ["#F36161", "#42B983","#DCDFE6"],
        series: [
          {
            name: "运行状态",
            type: "pie",
            symbol: "circle",
            radius: ["20%", "70%"],
            center: ["center", "center"],

            label: {
              position: "outside",
              normal: {
                // textStyle: {
                //   color: "#F35F5F"
                // }
              }
            },
            labelLine: {
              normal: {
                // lineStyle: {
                //   color: "#F35F5F"
                // },
                smooth: 0.2,
                length: 8,
                // length2: 20
              }
            },
            data: [
              { value: this.ThirdNum  , name: "异常" },
              { value: this.OneNum, name: "运行中" },
              { value: this.TwoNum, name: "未启动" },
            ]
          }
        ],
        graphic: {
          type: "text",
          left: "center",
          top: "center",
          z: 2,
          zlevel: 100,
          style: {
            text: this.NumAll,
            font: " 28px cursive ",
            textAlign: "center",
            fill: " #42B983"
          }
        }
      });
    },
    drawThirdShow() { 
      let myChart = echarts.init(document.getElementById("thirdShow"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
        type: 'scroll',
        orient: 'vertical',          
        right: 5,
        top: 30,
        bottom: 20,
        },
        color: ["#75ACFF","#72CBA2","#FC8080","#FFA257","#DCDFE6","#B5D2FE","#A0DCC1",
        "#FCAAAA","#FFEA9C","#FED4D4","#FFEA9C"],

        series: [
          {
            name: "标签",
            type: "pie",
            symbol: "circle",
            // radius: ["20%", "50%"],
            center: ["210", "center"],
            label: {
              position: "outside",
              normal: {
                // textStyle: {
                //   color: "#65A7F5"
                // }
              }
            },
            labelLine: {
              normal: {
                // lineStyle: {
                //   color: "#65A7F5"
                // },
                smooth: 0.2,
                length: 8,
                // length2: 20
              }
            },
            data: this.numOall
          }
        ],
        // graphic: {
        //   type: "text",
        //   left: "center",
        //   top: "center",
        //   z: 2,
        //   zlevel: 100,
        //   style: {
        //     text: this.dataCount,
        //     font: " 20px cursive ",
        //     textAlign: "center",
        //     fill: "#65A7F5"
        //   }
        // }
      });
    },
    drawFourShow() {
      function dataNow(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        //  var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return m+"."+d;
      }
      var Time1=dataNow(-1);
      var Time2=dataNow(-2);
      var Time3=dataNow(-3);
      var Time4=dataNow(-4);
      var Time5=dataNow(-5);
      var Time6=dataNow(-6);
      var Time7=dataNow(-7);
      // debugger
      /**
       * 判断有无数据
       */
      // if(this.ThridAll.length == 0){
      //   this.Show3=true
      //   this.Show31=false;
      //   this.isTrue1=true;
      // }else{
      //   this.Show31=true
      //  } 
      let myChart = echarts.init(document.getElementById("fourShow"));
      myChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
          type: "category",
          name: "T/月.日",
          data: [
              Time7,
              Time6,
              Time5,
              Time4,
              Time3,
              Time2,
              Time1
          ],
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [5, 7],
            lineStyle: {
              color: "#979797"
            }
          }
        },
        yAxis: {
          name: "数据量/MB",
          type: "value",
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [5, 7],
            lineStyle: {
              color: "#979797"
            }
          }
        },
        series: [
          {
            data: this.dataAll,
            type: "line",
            // symbol: "circle", //设定为实心点
            smooth: true,
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: "#68C79C ",
                label: {
                  show: true
                }
              }
            },
            lineStyle: {
              normal: {
                color: "#68C79C "
              }
            }
          }
        ]
      });
     
    },
    drawFiveShow() {
      function dataNow(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
      //  var y = dd.getFullYear();
      var m = dd.getMonth()+1;//获取当前月份的日期
      var d = dd.getDate();
      return m+"-"+d;
      }
      var Time1=dataNow(-1);
      var Time2=dataNow(-2);
      var Time3=dataNow(-3);
      var Time4=dataNow(-4);
      var Time5=dataNow(-5);
      var Time6=dataNow(-6);
      var Time7=dataNow(-7);

      let myChart = echarts.init(document.getElementById("fiveShow"));
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["数据量"]
          // , "数量"
        },
        xAxis: [
          {
            type: "category",
            data: [
              Time7,
              Time6,
              Time5,
              Time4,
              Time3,
              Time2,
              Time1
            ],
            axisLine: {
              symbol: ["none", "arrow"],
              symbolSize: [5, 7],
              lineStyle: {
                color: "#979797"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "数据量/KB",
            // min: 0,
            // max: 50,
            axisLine: {
              symbol: ["none", "arrow"],
              symbolSize: [5, 7],
              lineStyle: {
                color: "#979797"
              }
            }
          },
          // {
          //   type: "value",
          //   name: "数量/条",
          //   max: 300,
          //   min: 0,
          //   axisLine: {
          //     symbol: ["none", "arrow"],
          //     symbolSize: [5, 7],
          //     lineStyle: {
          //       color: "#979797"
          //     }
          //   },
          //   splitLine: {
          //     show: false
          //   }
          // }
        ],
        series: [
          {
            name: "数据量",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#42B983",
                barBorderRadius: [18, 18, 18, 18]
              }
            },
            data: [this.FiveOne,
                   this.FiveTwo,
                   this.FiveThird,
                   this.FiveFour,
                   this.FiveFive,
                   this.FiveSix,
                   this.FiveSeven]
          },
          // {
          //   name: "数量",
          //   type: "line",
          //   // symbol: "circle",
          //   symbolSize: 10,
          //   itemStyle: {
          //     /*设置折线颜色*/
          //     normal: {
          //       color: "#F36161"
          //     }
          //   },
          //   yAxisIndex: 1,
          //   data: this.FiveAll2
          // }
        ]
      });
    },

  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ding{
    margin-left: 27%;
}
.ding1{
  margin-top: 6%
}
.ABC{
      padding-left: 43%;
      color:#DCDFE6;
    font-size: 20px;
}
.active1{
  margin-bottom: 200px;
}
.active2{
  margin-bottom: 33%
}
.block {
  margin: 20px 10px 12px 20px;
}
.titleOne {
  height: 184px;
  position: relative;
}
.title {
  font-size: 16px;
  padding-top: 1.5%;
  margin-left: 3.7%;
  color: #42b983;
}
.titlepic {
  position: absolute;
  margin-top: 10px;
  margin-left: 35.9%;
  width: 70px;
  height: 70px;
}
.titleFont {
  position: absolute;
  margin-top: 10px;
  margin-left: 42.5%;
}
.test {
  font-size: 36px;
  color: #50e3c2;
  letter-spacing: 0;
  line-height: 14px;
  padding-top: 28px;
}
.titleTwo {
  height: 544px;
  position: relative;
  margin-top: 20px;
}
.trend {
  position: absolute;
  font-size: 16px;
  padding-top: 50px;
  margin-left: 4.5%;
  color: #42b983;
}
.pic {
  padding-top: 100px;
}
.titleThird {
  height: 600px;
  position: relative;
  margin-top: 20px;
}
.trend1 {
  position: absolute;
  font-size: 16px;
  padding-top: 3.2%;
  margin-left: 4.4%;
  color: #42b983;
}
.trend2 {
  position: absolute;
  font-size: 14px;
  margin-top: 45px;
  margin-left: 30%;
}
.select {
  position: absolute;
  padding-top: 35px;
  margin-left: 40%;
}
.pic1 {
  padding-top:30px;
}
</style>
