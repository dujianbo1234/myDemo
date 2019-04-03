<template>
  <div v-loading="loading">
    <img
      :src="flowChartData"
      class="chart"
      alt="流程图"
      @click="enlarge"
    >
  </div>
</template>
<script>
import * as service from "@/modules/oms/api/oms/eventForm";
export default {
  props: ["procInstId", "procDefId", "tabActive", "isOver"],
  data() {
    return {
      loading: true,
      flowChartData: null
    };
  },
  computed: {
  },
  watch: {
    tabActive: function(val) {
      if (val === "chart") {
        this.getCharts();
      }
    }
  },
  mounted() {
    this.getCharts();
  },
  methods: {
    getCharts() {
      let baseURL = service.request.defaults.baseURL;
      let flowChartURL = "";
      if (this.isOver) {
        flowChartURL = `${baseURL}/oms/api/v1/processInstances/flowchart?procDefId=${
          this.procDefId
        }`;
      } else {
        flowChartURL = `${baseURL}/oms/api/v1/processInstances/flowchart?procInstId=${
          this.procInstId
        }`;
      }
      this.flowChartData = flowChartURL;
      this.loading = false
    },
    enlarge() {
      //点击新窗口打开大图
      let baseURL = service.request.defaults.baseURL;
      let flowChartURL = "";
      if (this.isOver) {
        flowChartURL = `${baseURL}/oms/api/v1/processInstances/flowchart?procDefId=${
          this.procDefId
        }&time=${Date.now()}`;
      } else {
        flowChartURL = `${baseURL}/oms/api/v1/processInstances/flowchart?procInstId=${
          this.procInstId
        }&time=${Date.now()}`;
      }
      window.open(flowChartURL);
    }
  }
};
</script>
<style lang="scss" scoped>

.chart{
  // width: 100%;
  min-height: 200px;
  cursor: pointer;
}
</style>
