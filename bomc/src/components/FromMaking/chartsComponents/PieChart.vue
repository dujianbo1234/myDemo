<template>
  <div :class="className" :style="{width:width,height:vHeight}" ref="charts"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import request from '../util/request'
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
      vHeight: '300px'
    }
  },
  mounted() {
    const _this = this;
    this.dealStyle()
    setTimeout(function () {
    _this.initChart()
    })
    this.__resizeHanlder = debounce(() => {
      this.dealStyle()
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    if(this.sourceApi) this.dealData(this.sourceApi);
    window.addEventListener('resize', this.__resizeHanlder)
     // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {   
      this.chart = echarts.init(this.$el, 'romas')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        },
        calculable: true,
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 320, name: 'Industries' },
              { value: 240, name: 'Technology' },
              { value: 149, name: 'Forex' },
              { value: 100, name: 'Gold' },
              { value: 59, name: 'Forecasts' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    },
    dealData(url){   
      const _this = this;
      const baseUrl = 'https://easy-mock.com/mock/5bd7b650a0fa6d218201b6d0/charts';
      request({
        url: baseUrl + url
      }).then(function(res){
        res.data.legend && _this.chart.setOption({legend:{data:res.data.legend}})
        res.data.series && _this.chart.setOption({series:res.data.series})
        res.data.xAxis && _this.chart.setOption({xAxis:[{data:res.data.xAxis}]})
      })
    },
    dealStyle(){
      this.$el.style.height = Math.round(30 * this.height + Math.max(0, this.height - 1) * 10) - 50 + 'px';
    }
  },
  watch: {
    sourceApi (val){
      this.dealData(val);
    }
  }
}
</script>
