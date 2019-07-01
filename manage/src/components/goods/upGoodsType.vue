<template>
     <el-dialog title="修改商品类别" :visible="visible" @update:visible="changeVisible">
        <el-form :model="form" ref="myForm">
            <el-form-item label="商品类别名称：" label-width="120px" prop="goodsTypeName">
                <el-input v-model="form.goodsTypeName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称：" label-width="120px" prop="shopName">
                <el-input v-model="form.shopName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-upload
                    class="upload-demo"
                    action="/ele/upGoodsType"
                    name="goodsTypePic"
                    ref="picInfo"
                    :on-success="success"
                    :auto-upload="false"
                    :headers="{authorization:$store.state.token}"
                    :data="form"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传商品类别图片</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="changeVisible(false)">取 消</el-button>
            <el-button type="primary" @click="upGoodsType">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'up-goods-type',
        props: ["visible", "goodsTypeName", "goodsTypeId", "shopName"],
        data() {
            return {
                form: {
                    shopTypeName: "",
                    goodsTypeId: "",
                    shopName: ""
                }
            }
        },
        methods: {
            changeVisible(v) {
                this.$emit("update:visible", v);
            },
            upGoodsType() {
                // console.log(22222, this.$refs.picInfo.uploadFiles.length);
                if(this.$refs.picInfo.uploadFiles.length) {
                    //上传图片
                    this.$refs.picInfo.submit();
                } else {
                    this.$axios.post("/upGoodsType", {
                        upPicBool: 1,
                        shopName: this.form.shopName,
                        goodsTypeName: this.form.goodsTypeName,
                        goodsTypeId: this.goodsTypeId
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
                this.$store.dispatch("getGoodsTypeList");
            }
        },
        mounted() {
            if(this.goodsTypeName) {
                this.form.goodsTypeName = this.goodsTypeName;
            }
            if(this.goodsTypeId) {
                this.form.goodsTypeId = this.goodsTypeId;
            }
            if(this.shopName) {
                this.form.shopName = this.shopName;
            }
        }
    }
</script>

<style scope>

</style>