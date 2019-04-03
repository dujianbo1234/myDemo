<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import page from '@/modules/portal/api/page'

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
    },
    sourceApi: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null,
      echartData: [],
      timer: null
    }
  },
  mounted() {
    let _this = this;
    var api = this.sourceApi===''?'/AlertLevel':this.sourceApi;
    this.dealData(api);
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
      const _this = this;
      this.chart = echarts.init(this.$el, 'macarons')
      let con = 0
      this.chart.setOption({
        title: [{
          text: this.getAll(),
          // x: '38%',
          // y: '45%',
          left: '49%',
          top: '40%',
          textAlign: 'center',
          textStyle: {
            fontSize: 45,
            fontWeight: 'normal',
            fontStyle: 'normal',
            color: '#f35f5f'
          }
        }, {
          text: '告警总数',
          // x: '38%',
          // y: '45%',
          left: '49%',
          // top: '46%',
          bottom: '35%',
          textAlign: 'center',
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal',
            fontStyle: 'normal',
            color: '#f78c8c'
          }
        }],
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //     orient: 'vertical',
        //     x: 'left',
        //     data:['严重警告','主要警告','一般警告']
        // },
        color: ["#f35f5f", "#f78c8c", "#fcd2d2"],
        series: {
          name: '访问来源',
          type: 'pie',
          radius: ['45%', '70%'],
          // center: ['30%', '50%'],
          // radius: ['45%', '55%'],
          startAngle: 360,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          label: {
            normal: {},
          },
          labelLine: {
            show: false

          },
          data: this.echartData
        }
      })
    },
    dealData(url){
      const _this = this;
      page.AlertLevel(url).then(function(res){
        _this.echartData = [
                {value:res.serious_AMOUNT, name:'严重警告'},
                {value:res.main_AMOUNT, name:'主要警告'},
                {value:res.common_AMOUNT, name:'一般警告'}
            ];
            _this.initChart();
        _this.timer = setTimeout(function(){
          _this.dealData(url);
        },300000);
      })
    },
    getAll(){
      var total = 0; //考生总数量
      var percent = 0; //考生占比
      this.echartData.forEach(function(value, index, array) {
          total += value.value;
      });
      return total
    }
  }
}
</script>
