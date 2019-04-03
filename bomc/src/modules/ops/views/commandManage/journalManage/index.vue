<template>
    <div class="container">
        <allJournal v-bind:types="types" v-bind:typeBol="typeBol" ref="allJournal"></allJournal>
    </div>
</template>

<script>
// 日志表格组件
import allJournal from '@/modules/ops/components/table/log/allJournal'
export default {
    components: {
        allJournal,
    },
    data (){
        return{
			types:'0',
			typeBol:'0',
        }
    },
    mounted() {
    },
    methods: {
    },
    
}
</script>

<style scoped lang="scss">
    @import "./index.scss";
</style>