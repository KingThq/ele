<template>
     <el-dialog title="修改店铺信息" :visible="visible" @update:visible="changeVisible">
        <el-form :model="form" ref="myForm">
            <el-form-item label="店铺类别名称：" label-width="120px" prop="shopTypeName">
                <el-input v-model="form.shopTypeName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称：" label-width="120px" prop="shopName">
                <el-input v-model="form.shopName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否推荐" label-width="120px" prop="isTop">
                <el-radio v-model="form.isTop" label="true">是</el-radio>
                <el-radio v-model="form.isTop" label="false">否</el-radio>
            </el-form-item>
            <el-form-item>
                <el-upload
                    class="upload-demo"
                    action="/ele/upShop"
                    name="shopPic"
                    ref="picInfo"
                    :on-success="success"
                    :auto-upload="false"
                    :headers="{authorization:$store.state.token}"
                    :data="form"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传店铺图片</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="changeVisible(false)">取 消</el-button>
            <el-button type="primary" @click="upShop">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'up-shop',
        props: ["visible", "shopTypeName", "shopId", "shopName", "isTop"],
        data() {
            return {
                form: {
                    shopTypeName: "",
                    shopName: "",
                    shopId: "",
                    isTop: ""
                }
            }
        },
        methods: {
            changeVisible(v) {
                this.$emit("update:visible", v);
            },
            upShop() {
                // console.log(22222, this.$refs.picInfo.uploadFiles.length);
                if(this.$refs.picInfo.uploadFiles.length) {
                    //上传图片
                    this.$refs.picInfo.submit();
                } else {
                    this.$axios.post("/upShop", {
                        upPicBool: 1,
                        shopTypeName: this.form.shopTypeName,
                        shopName: this.form.shopName,
                        shopId: this.shopId,
                        isTop: this.form.isTop
                    }).then(data => {
                        this.success();
                    })
                }
            },
            success() {
                this.$refs.picInfo.clearFiles();
                this.$refs.myForm.resetFields();
                this.changeVisible(false);
                //更新列表
                this.$store.dispatch("getShopList");
            }
        },
        mounted() {
            if(this.shopTypeName) {
                this.form.shopTypeName = this.shopTypeName;
            }
            if(this.shopName) {
                this.form.shopName = this.shopName;
            }
            if(this.shopId) {
                this.form.shopId = this.shopId;
            }
            if(this.isTop) {
                this.form.isTop = this.isTop;
            }
        }
    }
</script>

<style scope>

</style>