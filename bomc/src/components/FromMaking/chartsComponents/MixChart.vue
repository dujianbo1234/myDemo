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
      dHeight: '300px',
      options: {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    backgroundColor: "#ffffff",
    legend: {
       // data:['监控对象','监控指数']
       right: 10
    },
    xAxis: [
        {
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              color: '#c9c9c9'
            },
            axisLine: {
              show: false
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            // name: '水量',
            min: 0,
            max: 600,
            interval: Math.ceil(600 / 5),
            splitArea : {show : false},
            axisLabel:{
              color: '#c9c9c9'
            },
            axisTick:{
              show:false
            },
            axisLine: {
              show: false
            }
            // axisLabel: {
            //     formatter: '{value} ml'
            // }
        },
        {
            type: 'value',
            // name: '温度',
            min: 0,
            max: 6000,
            interval: Math.ceil(6000 / 5),
            splitArea : {show : false},
            axisLabel:{
              color: '#c9c9c9'
            },
            axisTick:{
              show:false
            },
            axisLine: {
              show: false
            }
            // axisLabel: {
            //     formatter: '{value} °C'
            // }
        }
    ],
    series: [
    ]
}
    }
  },
  mounted() {
    const _this = this;
    // this.$el.style.height = Math.round(30 * this.height + Math.max(0, this.height - 1) * 10) - 50 + 'px';
    this.dealStyle()
    setTimeout(function(){
     _this.initChart()
    _this.dealData('/projectMix');
    },0)
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

      //this.chart.setOption()
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
    "data": ['2018年1月', '2018年2月', '2018年3月', '2018年4月', '2018年5月', '2018年6月']
  },
  "series": [{
      "legendName": "监控对象",
      "data": [380, 409, 370, 232, 256, 367]
    },
    {
      "legendName": "监控指数",
      "data": [1234, 2002, 2333, 2450, 2300, 3200]
    }
  ]
};
        var seriesTemp = [
        {
            name:'',
            type:'bar',
            barWidth: '20%',
             itemStyle: {
                normal: {
                    barBorderRadius: 40,
                    color: '#3bb983',
                    shadowColor: 'rgba(0,0,0,0.4)',
                    shadowBlur: 5,
                }
            },
            data:[]
        },
        {
            name:'',
            type:'line',
            yAxisIndex: 1,
            lineStyle:{
                width: '3',
                color:'#f69090'
            },
             itemStyle: {
                borderWidth: '8',
                color:'#f36161'
            },
            data:[]
        }
    ];
    _this.options.series = [];
        if(res.xAxis && res.xAxis.data.length >=1) _this.options.xAxis[0].data = res.xAxis.data;
        if(res.series && res.series.length >=1) {
            for(var i =0 ; i<= res.series.length-1 ; i++){
                seriesTemp[i].name = res.series[i].legendName
                seriesTemp[i].data = res.series[i].data
                _this.options.series.push(JSON.parse(JSON.stringify(seriesTemp[i])))
            }
        }
        _this.chart.clear()
        _this.chart.setOption(_this.options)
        // _this.chart.setOption({xAxis:res.data.xAxis})
        // if(res.data.yAxis)  _this.chart.setOption({yAxis:res.data.yAxis})
          // console.log('barChart.js',_this.chart.getOption());
      // })
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
