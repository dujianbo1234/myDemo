<template>
  <div>
    <el-tabs v-model="activeName2" type="border-card" tab-position="top" @tab-click="handleClick">
      <el-tab-pane label="指标类型" name="first">
        <in-le/>
      </el-tab-pane>
      <el-tab-pane label="指标维度" name="second">
        <in-ri/>
      </el-tab-pane>
   </el-tabs>   
  </div>
</template>

<script>
import indInfo from './moComponents/inLeft'
import indRule from './moComponents/inRight'
export default {
  name: 'indModman',
  components: {
    inLe,
    inRi
  },
  data() {
    return {
      activeName2: 'first'
    }
  },
  created() {
    console.info(this.activeName2)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
