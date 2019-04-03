<template>
  <el-row class="clearfix uploadArea">
    <span class="uploadName left">上传附件：</span>
    <span class="upload-tips">提示：最多上传10个文件，每个文件最大10M</span>
    <div class="oms-upload">
      <el-upload
        class="upload-demo"
        action=""
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="10"
        :on-change="onChange"
        :file-list="fileList"
        :auto-upload="false"
      >
        <i class="el-icon-upload oms-icon upload-icon"></i>
      </el-upload>
    </div>
  </el-row>
</template>
<script>
export default {
  name: "oms-upload",
  props: [],
  data() {
    return {
      fileList: [], // 文件存储数组
    };
  },
  mounted() {},
  methods: {
    onChange(file, fileList) {
      //文件状态改变时的钩子
      let size = file.size / 1024 / 1024 > 10;
      if(size){
        this.$message({
          message: "上传文件大小不能超过 10MB!,将自动滤过10M大文件",
          type: "error"
        });
        fileList.pop();
      }
      this.fileList = fileList;
      this.$emit('fileListChange',fileList)
    },
    beforeRemove(file) {
      //删除文件之前的钩子
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      //文件列表移除文件时的钩子
      this.fileList = fileList;
      this.$emit('fileListChange',fileList)
    }
  }
};
</script>
<style lang="scss" scoped>

</style>