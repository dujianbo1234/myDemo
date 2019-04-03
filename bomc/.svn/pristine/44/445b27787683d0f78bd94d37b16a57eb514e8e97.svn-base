<template>
  <div :class="className" :style="{width:width,height:vHeight}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import request from '../util/request'

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
      default: '/projectGradientLine'
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
          axisLabel:{
            color: '#c9c9c9'
          },
          axisLine: {
            show: false
          }
        },
        dataZoom: [ {
            start: 50,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)'
            }
        }],
        grid: {
          left: 10,
          right: 20,
          bottom: 70,
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
          axisLabel:{
            color: '#c9c9c9'
          },
          axisLine: {
            show: false
          },
          splitArea : {show : false}
        },
        series: []
      }
    }
  },
  mounted() {
    let _this = this;
    this.dealStyle()
    setTimeout(function () {
     _this.initChart()
    _this.dealData('/projectGradientLine6')
    })
    console.log(this.sourceApi);
    if(this.sourceApi) this.dealData(this.sourceApi);
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
  methods: {
    setOptions({ expectedData, actualData } = {}) {

      this.chart.setOption()
    },
    initChart() {
      this.chart = echarts.init(this.$el)
      // this.setOptions(this.chartData)
    },
    dealData(url){
      const _this = this;
      const baseUrl = 'https://easy-mock.com/mock/5bd7b650a0fa6d218201b6d0/charts';
      // request({
      //   url: baseUrl + url
      // }).then(function(res){
      var res = {
        "type": "bar",
        "xAxis": {
          "data": ["00:00", "01:00", "02:00","03:00", "04:00", "05:00", "06:00", "07:00", "08:00","09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00" ]
        },
        "series": [{
          "legendName": "告警趋势",
          "data": [60, 72, 98, 61, 43, 60, 74, 58, 42,60, 72, 98, 61, 43, 60, 74]
        }]
      };
        var seriesTemp = {
          symbol:'circle',
          name: 'expected',
          lineStyle: {
        normal: {
          color: "#3bb983"   // 线条颜色
        }
      },
      areaStyle: { //区域填充样式
                normal: {
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
             { offset: 0,  color: 'rgba(59,185,131, 0.9)'},
             { offset: 1,  color: 'rgba(59,185,131, 0)'}
           ], false),
                 shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                 shadowBlur: 10 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
             }
         },
          smooth: true,
          type: 'line',
          data: [],
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        };
        _this.options.series = [];
         if(res.xAxis && res.xAxis.data.length >=1) _this.options.xAxis.data = res.xAxis.data;
        if(res.series && res.series.length >=1) {
            for(var i =0 ; i<= res.series.length-1 ; i++){
                seriesTemp.name = res.series[i].legendName
                seriesTemp.data = res.series[i].data
                _this.options.series.push(JSON.parse(JSON.stringify(seriesTemp)))
            }
        }
        _this.chart.setOption( _this.options)
      // })
    },
    dealStyle(){
      this.$el.style.height = Math.round(30 * this.height + Math.max(0, this.height - 1) * 10) - 50 + 'px';
    }
  },
  watch: {
    sourceApi:{
      handler:function(val,oldval){
      console.log('GradientLine',val,oldval);
      this.dealData(val);
          console.log(val.name)
      },
      deep:true//对象内部的属性监听，也叫深度监听
    }
  }
}
</script>
