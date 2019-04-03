<template>
  <div class="container">
    <Template :collectType="5"></Template>
  </div>
</template>
<script>
import Template from '../Template';
export default {
  name: "middleware",
  components: {
    Template
  }
};

</script>
<style lang="scss" scoped>
.container {
  padding: 10px 20px;
  background-color: #F5F5F5;
}

</style>
