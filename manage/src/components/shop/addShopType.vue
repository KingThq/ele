<template>
    <el-dialog title="添加店铺类别" :visible="visible" @update:visible="changeVisible">
        <el-form :model="form" ref="myForm">
            <el-form-item label="店铺类别名称：" label-width="120px" prop="shopTypeName">
            <el-input v-model="form.shopTypeName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-upload
                    class="upload-demo"
                    action="/ele/shopType"
                    name="shopTypePic"
                    ref="picInfo"
                    :on-success="success"
                    :auto-upload="false"
                    :headers="{authorization:$store.state.token}"
                    :data="form"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传店铺类别图片</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="changeVisible(false)">取 消</el-button>
            <el-button type="primary" @click="addShopType">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'add-shop-type',
        props:["visible"],
        data() {
            return {
                form: {
                    shopTypeName: ''
                }
            }
        },
        methods: {
            changeVisible(v) {
                // console.log(v);
                this.$emit("update:visible",v);
            },
            success() {
                this.$refs.picInfo.clearFiles();
                this.$refs.myForm.resetFields();
                this.changeVisible(false);
                //更新列表
                this.$store.dispatch("getShopType");
                // console.log(this.$router, this.$route);
                if(this.$route.name !== "shopType") {
                    this.$router.push({name:"shopType"});
                }
            },
            addShopType() {
                this.$refs.picInfo.submit();
            }
        }
    }
</script>

<style scope>

</style>