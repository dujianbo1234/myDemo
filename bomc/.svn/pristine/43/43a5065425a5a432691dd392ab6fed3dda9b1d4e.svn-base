<template>
  <div :class="className" :style="{width:width}">
    <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column v-for="item in tableHead" :prop="item.prop" :label="item.label"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { debounce } from '@/utils'
import request from '../util/request'
const table = {
    tableData: [{
        d1: '张三',
        d2: '北京',
        d3: '2018年10月18日'
      }, {
        d1: '李四',
        d2: '上海',
        d3: '2018年10月18日'
      }, {
        d1: '钱五',
        d2: '广州',
        d3: '2018年10月18日'
      }],
    tableHead: [
        {prop:'d1',label:'姓名'},
        {prop:'d2',label:'地址'},
        {prop:'d3',label:'时间'},
      ]
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
    sourceApi: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableData:[],
      tableHead:[]
    }
  },
  mounted() {
    const _this = this;
    this.__resizeHanlder = debounce(() => {
      // if (this.chart) {
      //   this.chart.resize()
      // }
    }, 100)
    if(this.sourceApi) {
      this.dealData(this.sourceApi);
    }else{
      this.tableData = table.tableData
      this.tableHead = table.tableHead
    }
    window.addEventListener('resize', this.__resizeHanlder)
     // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHanlder)
  },
  methods: {
    dealData(url){   
      const _this = this;
      const baseUrl = 'https://easy-mock.com/mock/5bd7b650a0fa6d218201b6d0/charts';
      request({
        url: baseUrl + url
      }).then(function(res){
          console.log('tableView',res);
          if(res.data){
            _this.tableData = res.data.tableData
            _this.tableHead = res.data.head
          }
      })
    }
  },
  watch: {
    sourceApi (val){
      this.dealData(val);
    }
  }
}
</script>
