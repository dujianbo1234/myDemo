<template>
  <div :class="className" :style="{width:width}">
    <el-table
              :data="tableData"
              :show-header = 'false'
              :max-height = '300'
              :stripe="true"
              :size = "'mini'"
              class="tableClass"
              style="font-size: 14px;">
              <el-table-column width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template slot-scope="scope">
                  <span></span>
                  <a :href="scope.row.url">{{ scope.row.number }}</a>
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template slot-scope="scope">
                  <span>{{ scope.row.date }}</span>
                </template>
              </el-table-column>
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
      default: '/todoList'
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
    console.log('todoList:',this.sourceApi);
    // if(this.sourceApi) {
      this.dealData(this.sourceApi);
    // }else{
    //   this.tableData = table.tableData
    //   this.tableHead = table.tableHead
    // }
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
      url = '/todoList'
      // request({
      //   url: baseUrl + url
      // }).then(function(res){
        var res = {
  "data": {
    "head": [{
        prop: 'name',
        label: '姓名'
      },
      {
        prop: 'number',
        label: '住址'
      },
      {
        prop: 'date',
        label: '日期'
      }
    ],
    "tableData": [{
      date: '2016-07-02 9:00逾期',
      name: '王1虎',
      number: 'AB-12435465545',
      url: 'a.html'
    }, {
      date: '2016-08-04 9:00逾期',
      name: '王2虎',
      number: 'TD-87564224354',
      url: 'a.html'
    }, {
      date: '2016-09-01 9:00逾期',
      name: '王3虎',
      number: 'BC-4576576546657564',
      url: 'a.html'
    }, {
      date: '2016-04-08 9:00逾期',
      name: '王4虎',
      number: 'LD-4355978675645567',
      url: 'a.html'
    }, {
      date: '2016-04-08 9:00逾期',
      name: '王4虎',
      number: 'LD-4355978675645567',
      url: 'a.html'
    }, {
      date: '2016-04-08 9:00逾期',
      name: '王4虎',
      number: 'LD-4355978675645567',
      url: 'a.html'
    }, {
      date: '2016-04-08 9:00逾期',
      name: '王4虎',
      number: 'LD-4355978675645567',
      url: 'a.html'
    }, {
      date: '2016-04-08 9:00逾期',
      name: '王4虎',
      number: 'LD-4355978675645567',
      url: 'a.html'
    }]
  }
};
          if(res.data){
            _this.tableData = res.data.tableData
            _this.tableHead = res.data.head
          }
      // })
    }
  },
  watch: {
    sourceApi (val){
      this.dealData(val);
    }
  }
}
</script>
<style scoped>
  .tableClass{
    width: 98%;
    margin: auto;
  }
</style>
