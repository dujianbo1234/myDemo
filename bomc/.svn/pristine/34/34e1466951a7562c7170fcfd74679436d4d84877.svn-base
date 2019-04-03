<template>
  <div class='monitor-overView'>
        <el-row  class="header" :gutter='20'>
               <el-col class="item">
                   <el-card class="box-card item1">
                       <el-col>
                           <div class="itemInfo">
                               <p>22</p>
                               <p>待处理</p>
                           </div>
                       </el-col>
                   </el-card>
               </el-col>
               <el-col class="item">
                   <el-card class="box-card item2">
                       <el-col>
                           <div class="itemInfo">
                               <p>48</p>
                               <p>处理中</p>
                           </div>
                       </el-col>
                   </el-card>
               </el-col>
               <el-col class="item">
                   <el-card class="box-card item3">
                       <el-col>
                           <div class="itemInfo">
                               <p>56</p>
                               <p>已处理</p>
                           </div>
                       </el-col>
                   </el-card>
               </el-col>
               <el-col class="item">
                   <el-card class="box-card item4">
                       <el-col>
                           <div class="itemInfo">
                               <p>40</p>
                               <p>处理超时</p>
                           </div>
                       </el-col>
                   </el-card>
               </el-col>
               <el-col class="item">
                   <el-card class="box-card item5">
                       <el-col>
                           <div class="itemInfo">
                               <p>143</p>
                               <p>告警总数</p>
                           </div>
                       </el-col>
                   </el-card>
               </el-col>
        </el-row>
        <el-row :gutter='10' class="overView-itme1">
               <el-col :span='12'>
                   <el-card class="pending-alert cardBgColor" >
                        <el-row >
                            <el-col :span='12'>
                                <h2>待处理告警</h2>
                            </el-col>
                            <el-col :span='12'>
                                <i class="circle"></i>
                                <span>严重告警</span>
                                <i class="circle circleBlue"></i>
                                <span>主要告警</span>
                                <i class="circle circleYellow"></i>
                                <span>一般告警</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <div class="scroll-wrap">
                                <ul class="scroll-content" :style="{ top }" @mouseenter="Stop()" @mouseleave="Up()">
                                <!-- <ul class="scroll-content"  @mouseenter="Stop()" @mouseleave="Up()"> -->
                                    <li v-for="(item,index) in prizeList" :key="index">
                                        <el-col :span='20'>
                                            <i class="circle"></i>
                                            <p class="padding-alert-info">{{item.name}}</p>
                                        </el-col>
                                        <el-col :span='4' class='time-info'>{{item.time}}</el-col>
                                    </li>
                                </ul>
                            </div>
                        </el-row>
                   </el-card>
               </el-col>
               <el-col :span='12'>
                   <el-card class="alert-log-info cardBgColor">
                       <h2>告警日志分布</h2>
                       <div>
                           <div id="alertLog" :style="{width: '600px', height: '300px'}"></div>
                       </div>
                   </el-card>
               </el-col>
        </el-row>
        <el-row :gutter='10' class="overView-itme2">
            <el-col :span='12'>
                <el-card class="cardBgColor">
                    <h2>按告警级别统计</h2>
                    <div>
                        <div id="alertLeaveShow" :style="{width: '560px', height: '300px'}"></div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span='12'>
                <el-card class="cardBgColor">
                    <h2>按系统统计</h2>
                    <div id="systemShow" :style="{width: '560px', height: '300px'}"></div>
                </el-card>
            </el-col>
       </el-row>
       <el-row>
           <el-col :span='12'>
               <el-card class="cardBgColor">
                    <h2>按类型统计</h2>
                    <div id="typeShow" :style="{width: '560px', height: '300px'}"></div>
                </el-card>
           </el-col>
       </el-row>
  </div>
</template>

<script>
export default {
  name: "overview",
  data() {
    return {
      prizeList: [
        { name: "实时检查,线程池活动数大于0", time: "52分钟前" },
        { name: "实时检查,线程池活动数大于1", time: "52分钟前" },
        { name: "实时检查,线程池活动数大于0", time: "53分钟前" },
        { name: "实时检查,线程池活动数大于0", time: "53分钟前" },
        { name: "实时检查,线程池活动数大于0", time: "53分钟前" },
        { name: "实时检查,线程池活动数大于0", time: "53分钟前" }
      ],
      activeIndex: 0,
      intnum: undefined
    };
  },
  methods: {
    ScrollUp() {
      this.intnum = setInterval(() => {
        if (this.activeIndex < this.prizeList.length) {
          this.activeIndex += 1;
        } else {
          this.activeIndex = 0;
        }
      }, 1000);
    },

    Stop() {
      clearInterval(this.intnum);
    },
    Up() {
      this.ScrollUp();
    },
    drawAlertLog() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("alertLog"));
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: "category",
          data: [
            "2018/6/1",
            "2018/6/2",
            "2018/6/3",
            "2018/6/4",
            "2018/6/5",
            "2018/6/6",
            "2018/6/7"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            itemStyle: { normal: { label: { show: true } } }
          }
        ]
      });
    },
    drawAlertLeave() {
      let myChart = this.$echarts.init(
        document.getElementById("alertLeaveShow")
      );
      myChart.setOption({
        color: ["#3398DB"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["严重告警", "主要告警", "一般告警"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "告警数量",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 300],
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: "black"
                }
              }
            }
          }
        ]
      });
    },
    drawAlertSystem() {
      let myChart = this.$echarts.init(document.getElementById("systemShow"));
      myChart.setOption({
        color: ["#3398DB"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "BOMC系统",
              "CRM系统",
              "BOSS系统",
              "BASS系统",
              "呼叫中心系统"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "告警数量",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 300, 55, 345],
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: "black"
                }
              }
            }
          }
        ]
      });
    },
    drawAlertType() {
      let myChart = this.$echarts.init(document.getElementById("typeShow"));
      myChart.setOption({
        color: ["#3398DB"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Toptea", "Orade", "表间数据差异", "aqent", "业务探测结果"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "告警数量",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 300, 55, 345],
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: "black"
                }
              }
            }
          }
        ]
      });
    }
  },
  computed: {
    top() {
      return -this.activeIndex * 50 + "px";
    }
  },
  created() {
    this.ScrollUp();
  },
  mounted() {
    this.drawAlertLog();
    this.drawAlertLeave();
    this.drawAlertSystem();
    this.drawAlertType();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.monitor-overView {
  padding: 10px;
  .box-card {
    height: 100px;
  }
  .header {
    .item {
      width: 20%;
      .item1 {
        background-color: #a78ecf;
      }
      .item2 {
        background-color: #6c6ec1;
      }
      .item3 {
        background-color: #33b2bb;
      }
      .item4 {
        background-color: #4aabd5;
      }
      .item5 {
        background-color: #d8d6eb;
      }
      .itemInfo {
        text-align: center;
        margin: 10px auto;
        color: white;
      }
    }
  }
  .overView-itme1 {
    margin: 20px 0;
    .pending-alert {
      background-color: #f2f2f2;
      span {
        font-size: 12px;
      }
      .circle {
        display: inline-block;
        width: 12px;
        height: 12px;
        box-sizing: border-box;
        background-color: red;
        border-radius: 50%;
        line-height: 12px;
        &.circleBlue {
          background-color: blue;
        }
        &.circleYellow {
          background-color: yellow;
        }
      }
      .scroll-wrap {
        background-color: white;
        margin-top: 20px;
        height: 250px;
        overflow: hidden;
      }
      .scroll-content {
        // padding: 10px;
        position: relative;
        transition: top 0.5s;
        .time-info {
          font-size: 14px;
        }
        li {
          padding-left: 10px;
          height: 40px;
          line-height: 40px;
        }
        li:hover {
          background-color: #e6e6e6;
        }
        .padding-alert-info {
          display: inline;
          color: #3eabf3;
        }
      }
    }
  }
  .overView-itme2 {
    margin-bottom: 20px;
  }
  .cardBgColor {
    background-color: #fff;
    background-color: #f2f2f2;
    height: 340px;
  }
}
</style>
