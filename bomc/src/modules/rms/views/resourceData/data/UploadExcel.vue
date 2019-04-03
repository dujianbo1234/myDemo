<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="excel-upload-input"
      action=""
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-change="fileData"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      accept=".xlsx"
      @change="handleClick"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">请选择xlsx文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
  import XLSX from 'xlsx'

  export default {
    props: {
      onfileList:{
        type : Array,
      },
      beforeUpload: Function, // eslint-disable-line
      onSuccess: Function// eslint-disable-line
    },
    created() {
      debugger
      this.fileList = this.onfileList;
    },
    watch: {
      onfileList: function (val, oldVal) {
        debugger
        console.log('new: %s, old: %s', val, oldVal)
        // this.fileList = [];
        // this.$set(this.temp[index],"active", 1)
        this.$refs['excel-upload-input']['uploadFiles'] = [];
        this.$set(this,'fileList',[])
    },
    },
    data() {
      return {
        fileList: [],
        loading: false,
        excelData: {
          results: null
        }
      }
    },
    methods: {
      handleRemove(file, fileList) {
        debugger
        console.log(file, fileList);
        this.fileList = [];
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      fileData(file) {
        debugger
        this.fileList = file
      },
      submitUpload() {
        console.log(this.fileList)
        debugger
        if(!this.fileList.raw){
          this.$message.error('您还未选择文件！');
        }
        this.handleClick(this.fileList.raw)
      },




      generateData({results}) {
        debugger
        this.excelData.results = results
        this.$refs['excel-upload-input']['uploadFiles'] = [];
        this.$set(this,'fileList',[])
        this.onSuccess && this.onSuccess(this.excelData)
      },
      handleDrop(e) {
        e.stopPropagation()
        e.preventDefault()
        if (this.loading) return
        const files = e.dataTransfer.files
        if (files.length !== 1) {
          this.$message.error('Only support uploading one file!')
          return
        }
        const rawFile = files[0] // only use files[0]
        if (!this.isExcel(rawFile)) {
          this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
          return false
        }
        this.upload(rawFile)
        e.stopPropagation()
        e.preventDefault()
      },
      handleDragover(e) {
        e.stopPropagation()
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
      },
      handleUpload() {
        debugger
        this.$refs['excel-upload-input'].click()
      },
      handleClick(e) {
        // debugger
        // const files = e.target.files
        // const rawFile = files[0] // only use files[0]
        // if (!rawFile) return
        // this.upload(rawFile)
        if (!e) return
        this.upload(e)
      },
      upload(rawFile) {
        this.$refs['excel-upload-input'].value = null // fix can't select the same excel
        if (!this.beforeUpload) {
          this.readerData(rawFile)
          return
        }
        const before = this.beforeUpload(rawFile)
        if (before) {

          this.readerData(rawFile)
        }
      },
      readerData(rawFile) {
        this.loading = true
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = e => {
            const data = e.target.result
            const fixedData = this.fixData(data)
            const workbook = XLSX.read(btoa(fixedData), {type: 'base64'})
            let results = {};
            for (let i = 0; i < workbook.SheetNames.length; i++) {
              const SheetName = workbook.SheetNames[i]
              const worksheet = workbook.Sheets[SheetName]
              let re = XLSX.utils.sheet_to_json(worksheet, {header: 1});
              re.shift();
              if(SheetName==='资源关系') {
                results[SheetName] = re;
                break;
              }
              re.shift();
              results[SheetName] = re;
            }
            this.generateData({results})
            this.loading = false
            resolve()
          }
          reader.readAsArrayBuffer(rawFile)
        })
      },
      fixData(data) {
        let o = ''
        let l = 0
        const w = 10240
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
      },
      isExcel(file) {
        return /\.(xlsx|xls|csv)$/.test(file.name)
      }
    }
  }
</script>

<style scoped>
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }

  .drop {
    border: 2px dashed #bbb;
    width: 600px;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
  }
</style>
