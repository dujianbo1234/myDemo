<script>
export default {
  name: "resolveRows",
  props: {
    rowData: {
      type: Object,
      required: true
    },
    layout: {
      type: Function,
      required: true
    }
  },
  render(h) {
    const { rowData, rowLayout } = this;
    return (
      <el-row style={rowData.style} gutter={rowData.gutter || 0}>
        {rowLayout(rowData.rows)}
      </el-row>
    );
  },
  methods: {
    rowLayout(rows) {
      return rows.map((row, index) => {
        return <el-col span={row.span}>{this.layout(row.children)}</el-col>;
      });
    }
  }
};
</script>

<style scoped>
</style>