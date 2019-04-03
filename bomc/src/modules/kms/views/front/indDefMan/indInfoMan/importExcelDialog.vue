<template>
  <div>
    <el-dialog 
    :close-on-click-modal="false" 
    :visible="excelVisible"
     top="5vh" 
     width="550px " 
     @close="dialogClosed()">
           <div class="details-title-name">
              <span class="sp"><span>待选指标</span></span>
                <div class="logAdd-obj-name">
                  <!-- <template>
                       <el-checkbox-group 
                          v-model="tagsListName"
                          @change="tagsChange">
                          <el-checkbox   v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                  </template>
                </div>
                <div class="pjright clearfix">
                    <el-checkbox-group 
                          v-model="checkedCities1">
                          <el-checkbox checked v-for="city in tagsName" :label="city" :key="city" class="pjright-item">{{city}}</el-checkbox>
                        </el-checkbox-group>
                </div> -->
                <div class="BF">
                   <span class="sp" style="margin-top: 50px;"><span>备份位置</span></span>
                </div>
               
                <div class="logAdd-obj">
                  <div style="display:flex">
                        <span style="width: 100px;line-height: 36px;">备份到本地:</span>
                        <el-input label="备份到本地"  placeholder="请选择文件备份" class="el-icon-ump-addition"></el-input>
                        <img src="../../../../../../assets/images/files.png" @click="exportExcel()" style=" width: 35px;position: absolute; right: 22px;bottom: 51px;"/>
                  </div> 
                  </div>
           </div>
     </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/request'
import * as server from "../../../../api/kms";
import { getToken } from '@/utils/auth'
export default {
    props: {
      excelVisible: {
        type: Boolean,
        default: false
      },
    },
      data(){
        return{
         checkedCities1: [],
        //  tagsListName:['tag1','tag2'],
          // pjlist: ['上海', '北京1','上海1', '北京','上海3', '北京5'],
          // checkAll: false,
          // checked:true,
          // checkedCities:[],
          // cities:[],
          tagData:[],
          tagsName:[],
          tagsD:[],
          tags:"",
          isIndeterminate: true
        }
        
    },
    created(){
      // this.showTagList()
    },
    methods:{
      // tagsChange(val){
      //   const params={
      //       tag:val[val.length-1]
      //   }      
      //      server.metricsDefName(params).then(res => {
      //       res.forEach(e=>{
      //            this.tagsName.push(Object.values(e)[0])

      //         })
      //         this.tagsName=[...new Set(this.tagsName)];
      //    })
      // },
          // 显示数据
      // showTagList(){
      //    server.tagList().then(res => {
      //       res.forEach(e=>{
      //            this.cities.push(Object.values(e)[0])
      //         })
      //    })
      // },
            // handleCheckAllChange(val) {
            //   this.checkedCities = val ? this.cities:[];
            //   this.isIndeterminate = false;
            // },
      //  handleCheckedCitiesChange(value) {
      //         let checkedCount = value.length;
      //         this.checkAll = checkedCount === this.cities.length;
      //         this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      //       },
      dialogClosed(){
        //  this.tagsName=[]
        //  this.tagsListName=['comprehensive','biz'],
        //  this.checkedCities=[]
         this.flag = true
         this.$emit('closedEvent', false)
      },
      exportExcel(){ 
       if(this.tagsName.length>1){    
          var obj=""
          this.tagsName.forEach(e=>{
              obj+="tags,"
          })
         obj=obj.substring(0,obj.length-1)
        //  Console.log(obj)
        const params={
           keys:obj,
           value:[...this.tagsName].join(),
           search:true,
           searchByAny:true,
         }
          server.exportExcel(params).then((res) => {
          let url = window.URL.createObjectURL(new Blob([res]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', 'metrics.xlsx')
          document.body.appendChild(link)
          link.click()
          this.dialogClosed()
        })
        .catch((error) => {
          console.log(error);
        });
       }else{
        const params={
           keys:"tags",
           value:[...this.tagsName].join(),
           search:true
         }
          server.exportExcel(params).then((res) => {
          let url = window.URL.createObjectURL(new Blob([res]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', 'metrics.xlsx')
          document.body.appendChild(link)
          link.click()
          this.dialogClosed()
        })
        .catch((error) => {
          console.log(error);
        });
       }
    

        // const params={
        //    keys:"tags,tags",
        //    value:"biz,comprehensive",
        //    search:true,
        //    searchByAny:true,
        //  }
        //   server.exportExcel(params).then((res) => {
        //   let url = window.URL.createObjectURL(new Blob([res]))
        //   let link = document.createElement('a')
        //   link.style.display = 'none'
        //   link.href = url
        //   link.setAttribute('download', 'metrics.xlsx')
        //   document.body.appendChild(link)
        //   link.click()
        //   this.dialogClosed()
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
       

      }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  // 弹窗样式
  .search_btn {
  background: #42B983;
  border: 1px solid #42B983;
  color: #FFFFFF;
  font-size:14px;
  &:hover {
    background: rgba(66, 185, 131, 0.8);
  }
}
.details-title-name{
  margin-bottom: 20px;
  .sp {
    display: inline-block;
    min-height: 28px;
    color: #42B983;

    span {
      padding-left: 10px;
      border-left: 3px solid #42B983;
    }

    i {
      padding-left: 10px;
    }
  }

  .sBtn {
    text-align: right;
    margin: 20px 56px;
  }
    button {
      padding: 9px 17px;
    }
  }
  .BF{
    clear:both;
  }
  .details-title-name .logAdd-obj-name .el-checkbox-group{
    width: 120px;
    height: 120px;
    float: left;
    // border: 1px solid #ddd;
    overflow-y: scroll;
  }
  .details-title-name .logAdd-obj-name .el-checkbox{
    width: 100%
  }
  .details-title-name .logAdd-obj-name .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
  .pjright{
    float: left;
    width: 328px;
    margin-left: 20px;
    height:120px ;
     .el-checkbox-group{
      width: 100%;
      height: 100%;
    }
    .pjright-item{
      width: 50%;
      float: left;
      margin-left: 0;
    }
  }
  .clearfix:after{
    display: block;
    content:'';
    clear: both;
  }
</style>

