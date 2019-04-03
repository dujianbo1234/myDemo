<template>
      <el-cascader
        :options="scriptData"
        v-model="scriptAddressName"
        @change="handleChange">
      </el-cascader>
</template>
<script>
  import * as publicjs from '@/modules/ops/api/ops/public/public.js'
  export default {
    props :{
      scriptAddressName: {
				type: Array,
				default: []
			},
    },
    mounted() {
			this.scriptLink();
		},
    methods: {
      handleChange(val){
        console.log(val)
        console.log(this.scriptAddressName)
      },
      // 选择脚本的接口
			scriptLink(){
				const params = {
					name: this.searchScriptInput,
				}
				publicjs.scriptLink(params).then(res => {
					let deep = function(arr) {
					arr.forEach(item => {
						item.value = item.id+'-'+item.path;
						item.label = item.object.name;
						if (item.children) {
						deep(item.children);
						}
					});
					};
					deep(res);
					this.scriptData = res;
					console.log(this.scriptData)
				})
			},
    },
    data() {
      return {
        scriptData:[],
      };
    }
  }
</script>