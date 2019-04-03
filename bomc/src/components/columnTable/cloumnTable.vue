<template>
  <table class="mailTable" :style="styleObject" v-if="s_showByRow">
    <tr v-for="index in rowCount" :key="index">
      <td class="column">{{tableData[index*2-2].label}}</td>
      <td>{{tableData[index*2-2].val}}</td>
      <td class="column">{{tableData[index*2-1] !== undefined ? tableData[index*2-1].label : ''}}</td>
      <td>{{tableData[index*2-1] !== undefined ? tableData[index*2-1].val : ''}}</td>
    </tr>
  </table>
  <table class="mailTable" :style="styleObject" v-else>
    <tr v-for="index in rowCount" :key="index">
      <td class="column">{{tableData[index-1].label}}</td>
      <td>{{tableData[index-1].val}}</td>
      <td class="column">{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].label : ''}}</td>
      <td>{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].val : ''}}</td>
    </tr>
  </table>
  <!-- key - label    value:key-->
</template>

<script>
export default {
  data() {
    return {
      styleObject: {},
      s_showByRow: true,
    };
  },
  props: ['tableData', 'tableStyle', 'showByRow'],
  computed: {
    rowCount: function() {
      return Math.ceil(this.tableData.length/2);
    }
  },
  created() {
    this.styleObject = this.tableStyle;
    if(this.showByRow !== undefined){
      this.s_showByRow = this.showByRow;
    }
  },
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.mailTable {
    margin: 0 auto;
    tr {
        height: 40px;
    }
    td {
        border: 1px solid #F2F2F2;
        width: 150px;;
        text-align: center;
    }
    .column {
        width: 100px;
        background-color: #F4F8FB;
        font-weight: bold;
    }
}

</style>
