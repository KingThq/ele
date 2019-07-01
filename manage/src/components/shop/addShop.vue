<template>
    <el-dialog title="添加店铺" :visible="visible" @update:visible="changeVisible">
        <el-form :model="form" ref="myForm">
            <el-form-item label="店铺名称：" label-width="120px" prop="shopName">
            <el-input v-model="form.shopName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺类别：" label-width="120px" prop="shopTypeId">
                <el-select v-model="form.shopTypeId" :disabled="disabled" placeholder="请选择">
                    <el-option
                            v-for="item in $store.state.shopTypeList"
                            :key="item._id"
                            :label="item.shopTypeName"
                            :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否推荐" label-width="120px" prop="isTop">
                <el-radio v-model="form.isTop" label="true">是</el-radio>
                <el-radio v-model="form.isTop" label="false">否</el-radio>
            </el-form-item>
            <el-form-item>
                <el-upload
                    class="upload-demo"
                    action="/ele/shop"
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
            <el-button type="primary" @click="addShop">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'add-shop',
        props: ["visible", "shopTypeId"],
        data() {
            return {
                // shopTypeList: [],
                form: {
                    shopName: "",
                    shopTypeId: "",
                    isTop: ""
                },
                disabled: false
            }
        },
        methods: {
            changeVisible(v) {
                this.$emit("update:visible", v);
            },
            success() {
                this.$refs.picInfo.clearFiles();
                this.$refs.myForm.resetFields();
                this.changeVisible(false);
                //更新列表
                this.$store.dispatch("getShopList");
                if(this.$route.name !== "shopList") {
                    this.$router.push({name:"shopList"});
                }
            },
            addShop() {
                this.$refs.picInfo.submit();
            }
        },
        mounted() {
            /* 
                在店铺类别中添加店铺时默认选中类别
            */
            if(this.shopTypeId) {
                this.form.shopTypeId = this.shopTypeId;
                this.disabled = true;
            }

            this.$store.dispatch("getAllShopType");
            // this.$axios.get("/allShopType").then(data => {
            //     this.shopTypeList = data.shopTypeList;
            // })
        }
    }
</script>

<style scope>

</style>