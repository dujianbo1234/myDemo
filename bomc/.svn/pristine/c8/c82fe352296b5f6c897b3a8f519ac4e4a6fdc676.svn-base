<script>
import draggable from "vuedraggable";

export default {
  name: "layoutRow",
  props: {
    rowData: {
      type: Object,
      required: true
    },
    layout: {
      type: Function,
      required: true
    },
    handleSelect: {
      type: Function,
      required: true
    },
    deleteWidget: {
      type: Function,
      required: true
    },
    isActive: [Object, null],
    layoutData: {
      type: Array,
      required: true,
      default: []
    },
    index: {
      type: Number,
      required: true
    }
  },
  components: {
    draggable
  },
  render(h) {
    const {
      rowData,
      isActive,
      handleSelect,
      rowLayout,
      layoutData,
      index
    } = this;
    
    return (
      <div
        onClick={e => handleSelect(e, rowData)}
        class={{ "current-active": isActive === rowData }}
        onKeyup={e => this.deleteWidget(e, layoutData, index, rowData)}
        tabIndex="-1"
        style={rowData.style}
      >
        <el-row gutter={rowData.gutter || 0}>{rowLayout(rowData.rows)}</el-row>
      </div>
    );
  },
  methods: {
    rowLayout(rows) {
      const classList = ["bg-purple", "bg-purple-light"];

      return rows.map((row, index) => {
        return (
          <el-col span={row.span}>
            <draggable
              list={row.children}
              options={{ group: "dragLayout" }}
              class={classList[index % 2] + " grid-content"}
            >
              {this.layout(row.children)}
            </draggable>
          </el-col>
        );
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 6px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #eceff7;
}
.edit-layout {
  margin-bottom: 16px;
}
</style>


