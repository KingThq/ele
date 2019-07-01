<template>
    <div>
        <el-dialog title="添加商品" :visible="visible" @update:visible="changeVisible">
            <el-form :model="form" ref="myForm">
                <el-form-item label="商品名称：" label-width="120px" prop="goodsName">
                <el-input v-model="form.goodsName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品类别：" label-width="120px" prop="goodsId">
                    <el-select @change="getShopList" :disabled="disabled" v-model="form.shopTypeId" placeholder="请选择店铺类别">
                        <el-option
                                v-for="item in $store.state.shopTypeList"
                                :key="item._id"
                                :label="item.shopTypeName"
                                :value="item._id">
                        </el-option>
                    </el-select>
                    <el-select @change="getGoodsTypeList" :disabled="disabled" v-model="form.shopId" placeholder="请选择店铺">
                        <el-option
                                v-for="item in shopList"
                                :key="item._id"
                                :label="item.shopName"
                                :value="item._id">
                        </el-option>
                    </el-select>
                    <el-select v-model="form.goodsTypeId" :disabled="disabled" placeholder="请选择商品类别">
                        <el-option
                                v-for="item in goodsTypeList"
                                :key="item._id"
                                :label="item.goodsTypeName"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品价格：" label-width="120px" prop="goodsPrice">
                    <el-input v-model="form.goodsPrice" autocomplete="off" placeholder="请输入商品价格"></el-input>
                </el-form-item>
                <el-form-item label="是否热销：" label-width="120px" prop="isHot">
                    <el-radio v-model="form.isHot" label="true">是</el-radio>
                    <el-radio v-model="form.isHot" label="false">否</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-upload
                        action="/ele/goods"
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
                <el-button type="primary" @click="addGoods">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'add-goods',
        props: ["visible", "shopTypeId", "goodsTypeId", "shopId"],
        data() {
            return {
                form: {
                    goodsName: '',
                    shopId: '',
                    shopTypeId: '',
                    goodsTypeId: '',
                    isHot: "",
                    goodsPrice: ""
                },
                shopList: [],
                goodsTypeList: [],
                disabled: false
            }
        },
        methods: {
            getShopList(typeId) {
                this.form.shopId = "";
                this.form.goodsTypeId = "";
                this.$axios.get("/shopList/" + typeId).then(data => {
                    this.shopList = data.shopList;
                })
            },
            getGoodsTypeList(shopId){
                this.form.goodsTypeId = "";
                this.$axios.get("/goodsTypeList/" + shopId).then(data => {
                    this.goodsTypeList = data.goodsTypeList;
                })
            },
            changeVisible(v) {
                this.$emit("update:visible", v);
            },
            success() {
                this.$refs.picInfo.clearFiles();
                this.$refs.myForm.resetFields();
                this.changeVisible(false);
                //更新列表
                this.$store.dispatch("getGoodsList");
                if(this.$route.name !== "goodsList") {
                    this.$router.push({name:"goodsList"});
                }
            },
            addGoods() {
                this.$refs.picInfo.submit();
            }
        },
        mounted() {
            if(this.shopTypeId) {
                this.form.shopTypeId = this.shopTypeId;
                this.getShopList(this.shopTypeId);
            }
            if(this.shopId) {
                this.form.shopId = this.shopId;
                this.getGoodsTypeList(this.shopId);
            }
            if(this.goodsTypeId) {
                this.form.goodsTypeId = this.goodsTypeId;
                this.disabled = true;
            }

            this.$store.dispatch("getAllShopType");
        }
    }
</script>

<style scope>

</style>