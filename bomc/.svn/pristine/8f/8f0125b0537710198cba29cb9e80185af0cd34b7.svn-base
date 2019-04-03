<template>
  <div class="selfMonitor-container">
    <el-row :gutter='10'>
      <el-col :span='6' class="set-tree">
        <el-tabs type="border-card">
          <el-tab-pane label="BOMC性能展示">
            <el-tree
              class="filter-tree"
              :data="data2"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              ref="tree2">
            </el-tree>
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="全局性能展示">下载树</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col  :span='18'>
        <p>内容区域</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>


export default {
  name: 'selfMonitor',
  data(){
    return {
      filterText: "",
      data2: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
    }
  },
  methods:{
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.selfMonitor-container {
  padding: 10px;
}
</style>
