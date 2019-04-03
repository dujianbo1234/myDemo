<template>
  <div :class="className" :style="{width:width,height:vHeight}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import page from '@/modules/portal/api/page'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
}
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
    autoResize: {
      type: Boolean,
      default: true
    },
    sourceApi: {
      type: String,
      default: '/projectGradientLine4'
    }
  },
  data() {
    return {
      chart: null,
      vHeight: '300px',
      chartData: lineChartData.newVisitis,
      options: {
        xAxis: {
          data: [],
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#c9c9c9'
          },
          axisLine: {
            show: false
          }
        },
        color: ['#42b983'],
        grid: {
          left: 10,
          right: '3%',
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#c9c9c9'
          },
          splitArea: {
            show: false
          }
        },
        legend: {
          data: ['expected', 'actual']
        },
        series: []
      },
      timer: null
    }
  },
  mounted() {
    let _this = this;
    this.dealStyle()
    setTimeout(function() {

      _this.initChart()
    })
    // this.dealData('/projectGradientLine4')
    if (this.sourceApi) this.dealData(this.sourceApi);
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        this.dealStyle()
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    setOptions({
      expectedData,
      actualData
    } = {}) {
      this.chart.setOption()
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      var api = this.sourceApi === '' ? '/AlertDirection' : this.sourceApi;
      this.dealData(api);
    },
    dealData(url) {
      const _this = this;
      var seriesTemp = {
        name: '',
        lineStyle: {
          normal: {
            width: 3,
            shadowColor: 'rgba(66,185,131,0.4)',
            shadowBlur: 10,
            shadowOffsetY: 10
          }
        },
        symbol: 'circle',
        smooth: true,
        type: 'line',
        data: [],
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
      };
      page.AlertDirection(url).then(function(res) {
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
      //     "data": ["8/01", "8/02", "8/03", "8/04", "8/05", "8/06", "8/07", "8/08", "8/09", "8/10", "8/11", "8/12", "8/13", "8/14", "8/15", "8/16", "8/17", "8/18", "8/19", "8/20", "8/21", "8/22", "8/23", "8/24", "8/25", "8/26", "8/27", "8/28", "8/29", "8/30", "8/31"]
      //   },
      //   "series": [{
      //     "legendName": "告警趋势",
      //     "data": [227, 585, 396, 358, 466, 402, 576, 596, 277, 349, 479, 412, 254, 331, 561, 220, 478, 489, 245, 458, 234, 209, 552, 397, 428, 330, 258, 581, 221, 521, 414]
      //   }]
      // };

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
