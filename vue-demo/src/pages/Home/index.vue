<template>
  <div class="home">
    <!-- 头部搜索 -->
    <van-row gutter="0" class="searchBox" style="width:100%;">
      <van-col span="3" class="category">
        <router-link to="/category">
          <van-icon name="label-o"/>
        </router-link>
      </van-col>
      <van-col span="18" class="searchForm">
        <van-search
          style="background:white;height:32px;border-radius:22px;border:1px solid #ccc;"
          placeholder="大家在搜索：衣服"
          @click.stop
          @keydown.enter="getGoodsListByKeys(searchKeys)"
        />
      </van-col>
      <van-col span="3" class="login">
        <router-link to="/me/login">登录</router-link>
      </van-col>
    </van-row>
    <!-- 轮播图 -->
    <div class="swiper">
      <van-swipe :autoplay="2000" indicator-color="white">
        <van-swipe-item v-for="item in swiper" :key="item.id">
          <img :src="item.img" alt>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品展示 -->
    <ul class="list">
      <li>
        <img src alt>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      swiper: [] // 保存录播图的数组
    };
  },
  created() {
    this.getSwiper();
  },
  methods: {
    getSwiper() {
      //获取轮播图数据方法
      this.$http.get("http://litc.pro:9999/v1/home/getBanners").then(result => {
        console.log(result.body);
        if (result.body.status === 200) {
          this.swiper = result.body.data;
        } else {
          Toast("获取加载轮播图失败");
        }
      });
    }
    // getGoodsListByKeys() {
    //   if (!keys.trim()) return this.$toast("请输入搜索关键词!");
    //   this.$router.push({ path: "/Me", query: { keys } });
    // }
  }
};
</script>

<style lang="less">
.home {
  .searchBox {
    padding-top: 5px;
    position: fixed;
    z-index: 999;
    .login,
    .category {
      text-align: center;
      line-height: 35px;
      a {
        color: black;
      }
    }
    .category {
      a {
        display: block;
        padding-top: 3px;
        color: black;
      }
      .van-icon-label-o {
        font-size: 18px;
      }
    }
    .searchForm {
      .van-search .van-cell {
        padding: 0px 10px 0px 0;
        background-color: #fff;
        
      }
      .van-search__content {
          background-color: #fff;
        }
    }
  }
  .swiper {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .list {
    li {
      width: 33.3333%;
      img {
        width: 100%;
      }
    }
  }
}
</style>










