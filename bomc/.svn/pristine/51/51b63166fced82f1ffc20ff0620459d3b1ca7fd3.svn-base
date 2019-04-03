<template>
  <div :class="className" :style="{width:width, height:dHeight}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import page from '@/modules/portal/api/page'

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: Number,
      // default: '300px'
    },
    sourceApi: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      dHeight: '300px',
      options: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          // show: true,
          // backgroundColor: '#fff',
          borderColor: "#ddd",
          textStyle: {
            // color: '#3c3c3c',
            fontSize: 16
          },
          formatter: function(p) {
            var relVal = p[0].name;
            var sum = 0;
            for (var z = 0; z < p.length; z++) {
              if (!(p[z].seriesName == 1001 || p[z].seriesName == 1000)) {
                sum += p[z].value;
              }
            }
            for (var i = 0; i < p.length; i++) {
              if (!(p[i].seriesName == 1001 || p[i].seriesName == 1000)) {
                relVal += "<br>" + p[i].marker + p[i].seriesName + " " + p[i].value + " " + "(" + ((100 * parseFloat(p[i].value)) / parseFloat(sum)).toFixed(2) + "%)";
              }
            }
            return relVal;
          }
        },
        backgroundColor: "#ffffff",
        color: ["#f35f5f", "#f78c8c", "#fcd2d2"],
        legend: {
          top: -15,
          right: 10,
          itemWidth: 30,
          itemHeight: 5,
          itemGap: -10,
          align: 'right',
          formatter: '{a|{name}}',
          textStyle: {
            width: 30,
            padding: [30, -35, 0, 0],
            rich: {
              a: {
                align: 'center',
                fontSize: 10,
                color: '#a0a1a5'
              }
            }
          },
        },
        grid: {
          left: "10%",
          right: "8%",
          bottom: "10%",
          top: "5%",
          containLabel: true
        },
        xAxis: [{
          type: "value",
          show: false
        }, {
          type: "value",
          show: false
        }],
        yAxis: [{
          type: "category",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#333333",
            fontSize: 16, // 文字大小
            fontWeight: 400,
            interval: 0
          },
          offset: 20,
          data: []
        }, {
          type: "category",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#fff",
            fontSize: 36,
            fontWeight: 300,
            interval: 0
          }
        }],
        series: []
      },
      timer: null
    }
  },
  mounted() {
    const _this = this;
    // this.$el.style.height = Math.round(30 * this.height + Math.max(0, this.height - 1) * 10) - 50 + 'px';
    this.dealStyle()
    var api = this.sourceApi === '' ? '/AreaAlertStatus' : this.sourceApi;
    setTimeout(function() {
      _this.initChart()
      _this.dealData(api);
    }, 0)

    this.__resizeHanlder = debounce(() => {
      this.dealStyle()
      // this.$el.style.height = Math.round(30 * this.height + Math.max(0, this.height - 1) * 10) - 50 + 'px';
      // console.log('resizeHanlder22',this.$refs.charts);
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    const _this = this;
    clearTimeout(_this.timer);
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption(this.options)
    },
    dealData(url) {
      const _this = this;
      page.AreaAlertStatus(url).then(function(res){
        _this.options.series = [];
        if (res.yAxis && res.yAxis.data.length >= 1) _this.options.yAxis[0].data = res.yAxis.data.reverse();
        if (res.series && res.series.length >= 1) {
          for (var i = 0; i <= res.series.length - 1; i++) {
            var dataObj = {
              name: res.series[i].legendName,
              type: "bar",
              barWidth: 20,
              stack: "总量",
              zlevel: 10,
              data: res.series[i].data
            };
            if (i == res.series.length - 1) dataObj.itemStyle = {
              normal: {
                show: true,
                barBorderRadius: [0, 30, 30, 0]
              }
            }
            _this.options.series.push(dataObj)
          }
        }
        _this.chart.clear()
        _this.chart.setOption(_this.options)
        _this.timer = setTimeout(function(){
          _this.dealData(url);
        },300000);
      })

      // var res = {
      //   "type": "bar",
      //   "yAxis": {
      //     "data": ["北京中心", "深圳中心", "南方基地", "支付基地", "在线公司"]
      //   },
      //   "series": [{
      //     "legendName": "严重",
      //     "data": [100, 92, 150, 200, 50]
      //   }, {
      //     "legendName": "主要",
      //     "data": [50, 92, 50, 50, 10]
      //   }, {
      //     "legendName": "一般",
      //     "data": [90, 50, 102, 50, 100]
      //   }]
      // };
      // _this.options.series = [];
      // if (res.yAxis && res.yAxis.data.length >= 1) _this.options.yAxis[0].data = res.yAxis.data.reverse();
      // if (res.series && res.series.length >= 1) {
      //   for (var i = 0; i <= res.series.length - 1; i++) {
      //     var dataObj = {
      //       name: res.series[i].legendName,
      //       type: "bar",
      //       barWidth: 20,
      //       stack: "总量",
      //       zlevel: 10,
      //       data: res.series[i].data
      //     };
      //     if (i == res.series.length - 1) dataObj.itemStyle = {
      //       normal: {
      //         show: true,
      //         barBorderRadius: [0, 30, 30, 0]
      //       }
      //     }
      //     _this.options.series.push(dataObj)
      //   }
      // }
      // // parseData(res)
      // // console.log('barChart.js',_this.options);
      // _this.chart.clear()
      // _this.chart.setOption(_this.options)
      // _this.chart.setOption({xAxis:res.data.xAxis})
      // if(res.data.yAxis)  _this.chart.setOption({yAxis:res.data.yAxis})

    },
    dealStyle() {
      this.$el.style.height = Math.round(30 * this.height + Math.max(0, this.height - 1) * 10) - 50 + 'px';
    }
  },
  watch: {
    sourceApi(val) {
      this.dealData(val);
    }
  }
}
</script>
