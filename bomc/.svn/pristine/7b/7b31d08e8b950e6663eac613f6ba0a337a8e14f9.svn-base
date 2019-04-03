<template>
  <div class="uploadFiles">
    <el-row class="clearfix uploadArea">
      <span class="uploadName uploadNameEvent left">上传附件：</span>
      <span class="upload-tips">提示：最多上传10个文件，每个文件最大10M</span>
      <div class="oms-upload">
        <el-upload
          class="upload-demo"
          action
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="10"
          :on-change="onChange"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button type="primary" size="mini">点击上传</el-button>
        </el-upload>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "uploadFiles",

  data() {
    return {
      inputFile: ""
    };
  },
  props: {
    fileList: {
      required: true,
      type: Array
    }
  },
  methods: {
    beforeRemove(file) {
      //删除文件之前的钩子
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      //文件列表移除文件时的钩子
      this.fileList = fileList;
      if (this.fileList.length > 0) {
        this.inputFile = this.fileList[0].name;
      } else {
        this.inputFile = "";
      }
    },
    onChange(file, fileList) {
      //文件状态改变时的钩子
      let size = file.size / 1024 / 1024 > 10;
      if (size) {
        this.$message({
          message: "上传文件大小不能超过 10MB!,将自动滤过10M大文件",
          type: "error"
        });
        fileList.pop();
      }
      this.fileList = fileList;
      if (this.fileList.length > 0) {
        this.inputFile = this.fileList[0].name;
      }

      this.$emit("fileList", this.fileList);
    }
  }
};
</script>

<style lang="scss">
.uploadFiles {
  .filesArea {
    margin-top: 20px;
    padding: 20px 10px;
    border: 1px solid #99c1f4;
    background: #fff;
    .el-upload-list__item-name {
      width: 165px;
    }
  }
  .files-input {
    width: 150px;
  }
  .uploadName {
    width: 100px;
    text-align: right;
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    color: #606266;
    padding-right: 12px;
  }
  .uploadNameEvent {
    width: 130px;
  }
  .el-upload-list {
    margin-top: 15px;
    overflow: auto;
  }
  .el-upload-list__item {
    float: left;
    width: auto;
  }
  .el-upload-list__item:first-child {
    margin-top: 5px;
  }
  .upload-icon {
    position: absolute;
    top: -1px;
    left: 130px;
    margin-left: 10px;
    line-height: 26px;
  }
  .upload-tips {
    position: absolute;
    top: 6px;
    left: 220px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>