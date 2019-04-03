<template>
    <div class="block">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :current-page.sync="page.pageNum +1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalRecords">
        </el-pagination>
    </div>
</template>
<script>
  export default {
    props :{
      page:{
        type : Object,
        required: true
      },
      sizeChange:  Function,
      currentChange:  Function,
    },
    methods: {
    },
    data() {
      return {
        
      };
    }
  }
</script>