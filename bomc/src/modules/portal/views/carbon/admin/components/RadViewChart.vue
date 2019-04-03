<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 3000

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
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
let _this = this;
    setTimeout(function(){
    _this.initChart()
      
    })
    this.__resizeHanlder = debounce(() => {
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
        title: {
        text: '基础雷达图'
    },
    tooltip: {},
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
           }
        },
        indicator: [
           { name: 'BOMC系统', max: 650},
           { name: '呼叫中心系统', max: 1600},
           { name: 'BASS系统', max: 3000},
           { name: 'BOSS系统', max: 5200},
           { name: 'CRM系统', max: 2500}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        symbol: 'circle',
        data : [
            {
                value : [430, 1000, 2800, 500, 1900],
                name : '预算分配（Allocated Budget）',
                areaStyle: {
                        normal: {
                            opacity: 0.7,
                            color: '#38a5e0'
                        }
                },
                lineStyle: {
                    color: '#38a5e0'
                },
                itemStyle: {
                    color: '#0085d0'
                }
            }
        ]
    }]
      })
    }
  }
}
</script>
