<template>
  <div class="dashboard-container">
    <h1>指标用户管理</h1>
    <el-button>接口联调</el-button>
    <img :src="mydata">
  </div>
</template>

<script>
import { getTree } from '@/utils/tree'
// import * as server from '../../api/kms'
export default {
  name: 'UserManagement',
  data() {
    return {
      menus: [],
      mydata: '',
      data1: [{ a: [1, 2, 3, 4] }, { b: [1, 2, 3, 4] }],
      arr: [
        { TypeId: '4', name: 'Host', alias: '主机', uri: 'IaaS.Physical.Host', TypeSubId: '3' },
        { TypeId: '4', name: 'Server', alias: 'PC服务器', uri: 'IaaS.Physical.Server', TypeSubId: '2' },
        { TypeId: '5', name: 'App', alias: '应用服务', uri: 'SaaS.Application.App', TypeSubId: '1' },
        { TypeId: '3', name: 'test', alias: '', uri: 'IaaS.Physical.Host.test', TypeSubId: '6' }
      ],
      myTree: [{ 'pid': 0, 'id': 100 }, { 'name': '研发部门', 'pid': 100, 'id': 101, 'title': '研发部门' }, { 'name': '市场部门', 'pid': 100, 'id': 102, 'title': '市场部门' }, { 'name': '测试部门', 'pid': 100, 'id': 103, 'title': '测试部门' }, { 'name': '财务部门', 'pid': 100, 'id': 104, 'title': '财务部门' }, { 'name': '运维部门', 'pid': 100, 'id': 105, 'title': '运维部门' }, { 'name': '研发一部', 'pid': 101, 'id': 106, 'title': '研发一部' }, { 'name': '研发二部', 'pid': 101, 'id': 107, 'title': '研发二部' }, { 'name': '市场一部', 'pid': 102, 'id': 108, 'title': '市场一部' }]
    }
  },
  created() {
    // console.info('mytree')
    // server.getImage().then(
    //   res => {
    //     this.mydata = res.data
    //   }
    // )
    // debugger
    this.myTree = this.arrFormatter(this.arr)
    var data = getTree(this.myTree)
    // debugger
    console.info(JSON.stringify(data))
  },
  methods: {
    arrFormatter(arr) {
      var treeTable = []
      treeTable = arr.map(item => {
        item['pid'] = Number(item['TypeId'])
        item['id'] = Number(item['TypeSubId'])
        delete item['TypeId']
        delete item['TypeSubId']
        return item
      })
      return treeTable
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

