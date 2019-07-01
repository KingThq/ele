<template>
    <div>
        <el-pagination
            background
            @current-change="disAction"
            layout="prev, pager, next"
            :page-size="$store.state.pageSize"
            :total="$store.state.total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'page-info',
        props:["actionName"],
        methods: {
            disAction(pageIndex=1) {
                //执行对应的actions方法
                this.$store.dispatch(this.actionName, {pageIndex});
            }
        },
        mounted() {
            this.disAction();
        }
    }
</script>

<style scope>

</style>