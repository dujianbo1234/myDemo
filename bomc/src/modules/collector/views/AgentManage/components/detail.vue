<template>
      <el-dialog title="Agent详情" :visible.sync="showDetail" width='50%' id="dialog" @close="closeDialog('detailForm')">
      <div class="monitor-obj" style="padding:10px 20px">
        <el-form :inline="true" style="text-align:left;" :model="details" class="demo-form-inline" label-position="right" label-width="100px" size="medium" ref="detailForm">
          <el-form-item label="任务名称" prop="task_name">
            <el-input v-model="details.task_name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="资源类型" prop="resourceType">
            <el-input v-model="details.resourceType" :disabled="true"></el-input>
          </el-form-item>
          <h3 style="text-align:left;margin: 10px 0">1.选择模板</h3>
          <hr style="margin-bottom: 10px;" />
          <el-form-item label="模板名称" prop="templateName">
            <el-input v-model="details.templateName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="details.template_type" :disabled="true"></el-input>
            </el-select>
          </el-form-item>
          <el-table ref="multhostIpleTable" :data="tableDataEnd" toolthostIp-effect="dark" border :header-cell-style="rowClass" @selection-change="quotaSelection">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="ability" label="类型描述">
            </el-table-column>
            <el-table-column label="能力描述">
              <template slot-scope="props">{{props.row.status}}</template>
            </el-table-column>
          </el-table>
            <!-- 分页 -->
            <agent-page :totalItems="totalItems"></agent-page>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" align='center'>
        <el-button @click="closeDialog('detailForm')">关闭 </el-button>
      </div>
    </el-dialog>
</template>

<script>
 import AgentPage from "./page"
  export default {
      name: "AgentDetail",
      props: {
      	details: Object,
      	tableDataEnd: Array,
      	totalItems: Number,
      	type: Boolean
      },
      data () {
      	return {
      	    showDetail: false
      	}
      },
      components: {
      	AgentPage
      },
      created () {
      	this.showDetail = this.type
      },
      methods: {
      	 quotaSelection(val) {
	      console.log(val)
	 },
             rowClass ({ row, rowIndex }) {
                  return 'textAlign:center'
             },
              closeDialog(f) {
                   this.showDetail = false;
                   this.$emit('close');
	      this.$refs.multhostIpleTable.clearSelection();
	      this.$refs[f].resetFields();
             }
      }
  }
</script>

<style lang="scss" scoped>
	
</style>
