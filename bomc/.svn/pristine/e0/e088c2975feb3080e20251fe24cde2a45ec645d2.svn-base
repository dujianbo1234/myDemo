<template>
  <div>
    <el-form>
      <el-form-item label="数据类型" style="display:block">
        <el-select v-model="myDataType" placeholder="请选择" style="width:185px" @change="updateDataType(myDataType) ">
          <el-option key="text" :value="0" label="文本" />
          <el-option key="float" :value="1" label="浮点数" />
          <el-option key="int" :value="2" label="正整数" />
          <el-option key="char" :value="3" label="字符" />
          <el-option key="log" :value="4" label="日志" />
        </el-select>
      </el-form-item>
      <el-form-item label="采集方式" style="display:block">
        <el-checkbox-group v-model="myCollectType" @change="updateCollectType(myCollectType)">
          <el-row>
            <el-checkbox :label="0">
              主机资源模板
            </el-checkbox>
            <el-checkbox :label="1">
              网络设备模板
            </el-checkbox>
            <el-checkbox :label="2">
              中间件模板
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox :label="3">
              日志模板
            </el-checkbox>
            <el-checkbox :label="4">
              数据库模板
            </el-checkbox>
            <el-checkbox :label="5">
              自定义脚本模板
            </el-checkbox>
          </el-row>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Original',
  props: {
    dataType: {
      type: Number,
      default: 0
    },
    collectType: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      myDataType: this.dataType,
      myCollectType: this.collectType
    }
  },
  computed: {
  },
  created() {

  },
  methods: {
    updateDataType(dataType) {
      this.$emit('update:dataType', this.myDataType)
    },
    updateCollectType(collectType) {
      this.$emit('update:collectType', this.myCollectType)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
