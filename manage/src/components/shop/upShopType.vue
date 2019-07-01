<template>
     <el-dialog title="修改店铺类别" :visible="visible" @update:visible="changeVisible">
        <el-form :model="form" ref="myForm">
            <el-form-item label="店铺类别名称：" label-width="120px" prop="shopTypeName">
            <el-input v-model="form.shopTypeName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-upload
                    class="upload-demo"
                    action="/ele/upShopType"
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
            <el-button type="primary" @click="upShopType">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'up-shop-type',
        props: ["visible", "shopTypeName", "shopTypeId"],
        data() {
            return {
                form: {
                    shopTypeName: "",
                    shopTypeId: ""
                }
            }
        },
        methods: {
            changeVisible(v) {
                this.$emit("update:visible", v);
            },
            upShopType() {
                // console.log(22222, this.$refs.picInfo.uploadFiles.length);
                if(this.$refs.picInfo.uploadFiles.length) {
                    //上传图片
                    this.$refs.picInfo.submit();
                } else {
                    this.$axios.post("/upShopType", {
                        upPicBool: 1,
                        shopTypeName: this.form.shopTypeName,
                        shopTypeId: this.shopTypeId
                    }).then(data => {
                        // console.log(data);
                        this.success();
                    })
                }
            },
            success() {
                this.$refs.picInfo.clearFiles();
                this.$refs.myForm.resetFields();
                this.changeVisible(false);
                //更新列表
                this.$store.dispatch("getShopType");
            }
        },
        mounted() {
            if(this.shopTypeName) {
                this.form.shopTypeName = this.shopTypeName;
            }
            if(this.shopTypeId) {
                this.form.shopTypeId = this.shopTypeId;
            }
        }
    }
</script>

<style scope>

</style>