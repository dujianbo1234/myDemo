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
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ["#f35f5f", "#f78c8c", "#fcd2d2"],
        grid: {
          top: 10,
          left: '2%',
          right: 20,
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            color: '#c9c9c9'
          },
          axisLine: {
            show: false
          }
        },
        yAxis: [{
          type: 'value',
          splitArea: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#c9c9c9'
          },
          axisLine: {
            show: false
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
    var api = this.sourceApi === '' ? '/AlertDistribute' : this.sourceApi;
    setTimeout(function() {
      _this.initChart()
      _this.dealData(api)
    }, 0)
    // if(this.sourceApi) this.dealData(this.sourceApi);
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

      // this.chart.setOption()
    },
    dealData(url) {
      const _this = this;
      var seriesTemp = {
        name: 'pageA',
        type: 'bar',
        // stack: 'vistors',
        barWidth: '20%',
        itemStyle: {
          normal: {
            barBorderRadius: 40,
            // color: '#3bb983',
            shadowColor: 'rgba(0,0,0,0.4)',
            shadowBlur: 5,
          }
        },
        data: [],
        animationDuration
      };
      page.AlertDistribute(url).then(function(res) {
        console.log(res);
        _this.options.series = [];
        if (res.xAxis && res.xAxis.data.length >= 1) _this.options.xAxis.data = res.xAxis.data;
        if (res.series && res.series.length >= 1) {
          for (var i = 0; i <= res.series.length - 1; i++) {
            seriesTemp.name = res.series[i].legendName
            seriesTemp.data = res.series[i].data
            _this.options.series.push(JSON.parse(JSON.stringify(seriesTemp)))
          }
        }
        _this.chart.clear()
        _this.chart.setOption(_this.options)
        _this.timer = setTimeout(function() {
          _this.dealData(url);
        }, 300000);
      })
      // var res = {
      //   "type": "bar",
      //   "xAxis": {
      //     "data": ['监控系统', '国漫集中BOSS', '支付产品化清洁算', '小额话费在线支付', '交易运维系统告警']
      //   },
      //   "series": [{
      //     "legendName": "告警总量",
      //     "data": [135, 115, 128, 131, 135]
      //   }]
      // };


      // _this.chart.setOption({xAxis:res.data.xAxis})
      // if(res.data.yAxis)  _this.chart.setOption({yAxis:res.data.yAxis})
      // console.log('barChart.js',_this.chart.getOption());
      // })
    },
    dealStyle() {
      this.$el.style.height = Math.round(30 * this.height + Math.max(0, this.height - 1) * 10) - 50 + 'px';
    }
  },
  watch: {
    sourceApi(val) {
      console.log('cylinderBar', val);
      this.dealData(val);
    }
  }
}
</script>
