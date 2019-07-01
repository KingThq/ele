<template>
    <div>
        <div class="toolbar">
            管理员日志列表
        </div>
        <el-table
            :data="$store.state.admin.adminLog"
            v-loading="$store.state.isLoading"
            :border="true"
            style="width: 100%">
            <el-table-column
            label="最后登录时间"
            width="200">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.logTime | date }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="管理员帐号"
            width="220">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.adminName }}</span>
            </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini">编辑</el-button>
                <el-button
                size="mini"
                @click="$store.dispatch('deleteLoginLog',{id:scope.row._id,index:scope.$index})"
                type="danger">删除</el-button>
            </template>
            </el-table-column>
        </el-table>       

        <div class="toolbar">
            <pageInfo action-name="adminLog"></pageInfo>
            <!-- <el-pagination
                background
                @current-change="(pageIndex)=>{$store.dispatch('adminLog',{pageIndex})}"
                layout="prev, pager, next"
                :page-size="$store.state.pageSize"
                :total="$store.state.total">
            </el-pagination> -->
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'admin-log',
        mounted() {
            // this.$store.dispatch("adminLog");
            this.$store.state.pageIndex;
        }
    }
</script>

<style scope>

</style>