<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
    <!-- <el-button @click="getInfo">按钮</el-button> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AdminDashboard from './admin'
// import store from '@/store'
// import { getData } from '@/modules/portal/api/test'
// 获取用户信息
export default {
  name: 'Dashboard',
  components: { AdminDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'

    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    // cli:()=>{
    //   getData.then(res=>(){console.log(res)})
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    /*margin: 30px;*/
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
