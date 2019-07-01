<template>
     <el-dialog title="修改商品信息" :visible="visible" @update:visible="changeVisible">
        <el-form :model="form" ref="myForm">
            <el-form-item label="店铺名称：" label-width="120px" prop="shopName">
                <el-input v-model="form.shopName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品类别名称：" label-width="120px" prop="goodsTypeName">
                <el-input v-model="form.goodsTypeName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品名称：" label-width="120px" prop="goodsName">
                <el-input v-model="form.goodsName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品价格：" label-width="120px" prop="goodsPrice">
                <el-input v-model="form.goodsPrice" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否热销" label-width="120px" prop="isHot">
                <el-radio v-model="form.isHot" label="true">是</el-radio>
                <el-radio v-model="form.isHot" label="false">否</el-radio>
            </el-form-item>
            <el-form-item>
                <el-upload
                    class="upload-demo"
                    action="/ele/upGoods"
                    name="goodsPic"
                    ref="picInfo"
                    :on-success="success"
                    :auto-upload="false"
                    :headers="{authorization:$store.state.token}"
                    :data="form"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传商品图片</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="changeVisible(false)">取 消</el-button>
            <el-button type="primary" @click="upGoods">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'up-goods',
        props: ["visible", "goodsTypeName", "goodsName", "shopName", "goodsPrice", "isHot", "goodsId"],
        data() {
            return {
                form: {
                    shopTypeName: "",
                    goodsId: "",
                    shopName: "",
                    goodsName: "",
                    isHot: "",
                    goodsPrice: ""
                }
            }
        },
        methods: {
            changeVisible(v) {
                this.$emit("update:visible", v);
            },
            upGoods() {
                // console.log(22222, this.$refs.picInfo.uploadFiles.length);
                if(this.$refs.picInfo.uploadFiles.length) {
                    //上传图片
                    this.$refs.picInfo.submit();
                } else {
                    this.$axios.post("/upGoods", {
                        upPicBool: 1,
                        shopName: this.form.shopName,
                        goodsTypeName: this.form.goodsTypeName,
                        goodsId: this.goodsId,
                        goodsPrice: this.form.goodsPrice,
                        isHot: this.form.isHot,
                        goodsName: this.form.goodsName
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
                this.$store.dispatch("getGoodsList");
            }
        },
        mounted() {
            if(this.goodsTypeName) {
                this.form.goodsTypeName = this.goodsTypeName;
            }
            if(this.goodsId) {
                this.form.goodsId = this.goodsId;
            }
            if(this.shopName) {
                this.form.shopName = this.shopName;
            }
            if(this.goodsName) {
                this.form.goodsName = this.goodsName;
            }
            if(this.goodsPrice) {
                this.form.goodsPrice = this.goodsPrice;
            }
            if(this.isHot) {
                this.form.isHot = this.isHot;
            }
        }
    }
</script>

<style scope>

</style>