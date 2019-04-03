<template>
  <div class="preview-container">
    <div class="back-custom">
      <router-link to="/custom">返回表单设计</router-link>
      <el-button size="small" @click="getAllData">获取填入的数据</el-button>
    </div>
    
    <el-dialog title="所有表单数据" :visible.sync="visible">
       <el-form label-position="right" label-width="180px">
          <el-form-item :label="key" :key="key" v-for="(value, key) in allData">
            <span class="info-detail">{{value}}</span>
          </el-form-item>
       </el-form>
    </el-dialog>
    
    <resolve-template
      :all-data.sync="allData"
      :layout-data="layoutData"
      :layout-style="layout"
      :queryEventGroup="queryEventGroup"
    ></resolve-template>
  </div>
</template>

<script>
import resolveTemplate from "../layout/components/resolveTemplate";
import { mapState } from "vuex";

export default {
  name: "preview",
  data() {
    return {
      visible: false,
      allData: {}
    }
  },
  components: {
    resolveTemplate
  },
  methods: {
    getAllData() {
      this.visible = true;
    },
    queryEventGroup(cb) {
      setTimeout(() => {
        cb([
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ]);
      }, 500);
    },
   
  },
  computed: {
    ...mapState({
      layoutData: state => state.layout.layoutWithWidgetData,
      layout: state => state.layout.layout
    })
  }
};
</script>

<style lang="scss">
.preview-container {
  padding: 16px;
  .back-custom {
    margin-bottom: 24px;
    a {
      color: rgb(63, 135, 230);
    }
  }
  .section-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 3px;
  }
  .section-content {
    min-height: 32px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>