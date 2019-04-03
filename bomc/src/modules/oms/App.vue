<template>
  <div id="app">
    <router-view />
  </div>
</template>
  
<script>
export default {
  name: "App",
  data() {
    return {
      userId: ""
    };
  },
  mounted() {
  }
};
</script>

<style>
.oms-need-deel-counts {
  background: rgb(245, 108, 108);
  position: absolute;
  right: 12px;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  line-height: 20px;
  text-align: center;
  color: #fff;
  top: 16px;
  font-size: 12px;
}
</style>