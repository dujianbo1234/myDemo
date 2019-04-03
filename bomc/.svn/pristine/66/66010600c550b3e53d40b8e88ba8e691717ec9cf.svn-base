<template>
  <div :class="className" :style="{width:width, height:dHeight}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import request from '../util/request'

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
      dHeight: '300px'
    }
  },
  mounted() {
    const _this = this;
    // this.$el.style.height = Math.round(30 * this.height + Math.max(0, this.height - 1) * 10) - 50 + 'px';
    this.dealStyle()
    setTimeout(function(){
      _this.initChart()
    },0)
    if(this.sourceApi) this.dealData(this.sourceApi);
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

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series:  [{
          name: 'pageA',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration
        }, {
          name: 'pageB',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [80, 52, 200, 334, 390, 330, 220],
          animationDuration
        }, {
          name: 'pageC',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [30, 52, 200, 334, 390, 330, 220],
          animationDuration
        }]
      })
    },
     dealData(url){
      const _this = this;
      const baseUrl = 'https://easy-mock.com/mock/5bd7b650a0fa6d218201b6d0/charts';
      request({
        url: baseUrl + url
      }).then(function(res){
        _this.chart.clear()
        _this.chart.setOption(res.data)
        // _this.chart.setOption({xAxis:res.data.xAxis})
        // if(res.data.yAxis)  _this.chart.setOption({yAxis:res.data.yAxis})
          console.log('barChart.js',_this.chart.getOption());
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
