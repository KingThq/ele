<template>
    <el-dialog title="添加商品类别" :visible="visible" @update:visible="changeVisible">
        <el-form :model="form" ref="myForm">
            <el-form-item label="商品类别名称：" label-width="120px" prop="goodsTypeName">
            <el-input v-model="form.goodsTypeName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺：" label-width="120px" prop="shopId">
                <el-select @change="getShopList" :disabled="disabled" v-model="form.shopTypeId" placeholder="请选择店铺类别">
                    <el-option
                            v-for="item in $store.state.shopTypeList"
                            :key="item._id"
                            :label="item.shopTypeName"
                            :value="item._id">
                    </el-option>
                </el-select>
                <el-select v-model="form.shopId" :disabled="disabled" placeholder="请选择店铺">
                    <el-option
                            v-for="item in shopList"
                            :key="item._id"
                            :label="item.shopName"
                            :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-upload
                    class="upload-demo"
                    action="/ele/goodsType"
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
            <el-button type="primary" @click="addGoodsType">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'add-goods-type',
        props:["visible", "shopTypeId", "shopId"],
        data() {
            return {
                form: {
                    goodsTypeName: '',
                    shopTypeId: '',
                    shopId: ''
                },
                shopList: [],
                disabled: false
            }
        },
        methods: {
            changeVisible(v) {
                this.$emit("update:visible",v);
            },
            success() {
                this.$refs.picInfo.clearFiles();
                this.$refs.myForm.resetFields();
                this.changeVisible(false);
                //更新列表
                this.$store.dispatch("getGoodsTypeList");
                if(this.$route.name !== "goodsType") {
                    this.$router.push({name:"goodsType"});
                }
            },
            addGoodsType() {
                this.$refs.picInfo.submit();
            },
            getShopList(typeId) {
                this.form.shopId = "";
                this.$axios.get("/shopList/" + typeId).then(data => {
                    this.shopList = data.shopList;
                })
            }
        },
        mounted() {
            if(this.shopTypeId) {
                this.form.shopTypeId = this.shopTypeId;
                this.getShopList(this.shopTypeId);
            }
            if(this.shopId) {
                this.form.shopId = this.shopId;
                this.disabled = true;
            }
            this.$store.dispatch("getAllShopType");
        }
    }
</script>

<style scope>

</style>