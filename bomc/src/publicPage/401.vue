<template>
  <div class="errPage-container" style="">
     <img
      :src="er404Img"
      alt="禁用11"
      style="    width: 100%;
    height: 100%;">
  
  <div  style="      border: 1px solid transparent;
    width: 11%;
    height: 6.5%;
    position: relative;
    top: -42.5%;
    left: 14%;">
        
        <el-button @click="back" icon='arrow-left' class="pan-back-btn" style=" 
        	           width: 100%;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 30px 0px;
    border-radius: 30px;
    letter-spacing: 5px;
    font-weight: bolder;
    font-family: PingFang-SC-Bold;
    border: none;
    height: 96%;font-size: 1.3em;
    background-image: linear-gradient(-116deg, rgb(142, 198, 26) 0%, rgb(34, 142, 220) 100%);
    line-height: 4%;
    font-size: 1.3rem;
  ">返回</el-button>

   </div> 
  
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'
import er404Img from '@/assets/images/er404.png'


export default {
  name: 'page401',
  data() {
    return {
    	er404Img: er404Img,
   
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errPage-container {
  	position: fixed;
    width: 100%;
    min-width: 1110px;;
    min-height: 586px;
    height: 100%;
    /*margin: 100px auto;*/
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
