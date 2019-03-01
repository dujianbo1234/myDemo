<template>
  <div id="app">
    <router-view/>

    <!-- 底部导航 -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="label-o" to="/Category">分类</van-tabbar-item>
      <van-tabbar-item icon="search" to="/News">新闻</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/ShopCar">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/Me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>


<style>
</style>
