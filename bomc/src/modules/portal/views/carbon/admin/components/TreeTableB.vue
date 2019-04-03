<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <tree-grid :columns="columns" :tree-structure="true" :data-source="dataSource"></tree-grid>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import  {TreeGrid}  from './components_treeTable'

export default {
  name: 'dashboard',
  data () {
    return {
      columns: [
          {
            text: '姓名',
            dataIndex: 'name'
          },
          {
            text: '年龄',
            dataIndex: 'age'
          },
          {
            text: '性别',
            dataIndex: 'sex'
          }
        ],
      dataSource: [
        {
          id: 1,
          parentId: 0,
          name: '测试1',
          age: 18,
          sex: '男',
          children: [
            {
              id: 2,
              parentId: 1,
              name: '测试2',
              age: 22,
              sex: '男'
            }
          ]
        },
        {
          id: 3,
          parentId: 0,
          name: '测试3',
          age: 23,
          sex: '女',
          children: [
            {
              id: 4,
              parentId: 3,
              name: '测试4',
              age: 22,
              sex: '男'
            },
            {
              id: 5,
              parentId: 3,
              name: '测试5',
              age: 25,
              sex: '男'
            },
            {
              id: 6,
              parentId: 3,
              name: '测试6',
              age: 26,
              sex: '女',
              children: [
                {
                  id: 7,
                  parentId: 6,
                  name: '测试7',
                  age: 27,
                  sex: '男'
                }
              ]
            }
          ]
        },
        {
          id: 18,
          parentId: 0,
          name: '测试8',
          age: 18,
          sex: '男'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  components:{
    TreeGrid
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
