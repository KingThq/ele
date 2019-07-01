<template>
    <div>
        <h3>店铺类别管理</h3>
        <div class="toolbar">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="店铺类别名称：">
                    <el-input v-model="formInline.shopTypeName" placeholder="店铺类别名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="$store.dispatch('findByShopTypeName',formInline.shopTypeName)">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="dialogFormVisible=true">添加店铺类别</el-button>
                </el-form-item>
            </el-form>  
        </div>

        <addShopType :visible.sync="dialogFormVisible"></addShopType>

        <!-- <el-dialog title="添加店铺类别" :visible.sync="dialogFormVisible">
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
                        :data="form"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传店铺类别图片</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addShopType">确 定</el-button>
            </div>
        </el-dialog> -->
        
        <el-table
            :data="$store.state.shop.shopTypeList"
            v-loading="$store.state.isLoading"
            :border="true"
            style="width: 100%">
            <el-table-column
            label="店铺类别名称"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.shopTypeName}}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="店铺类别图片"
            width="180">
            <template slot-scope="scope">
                <img height="50" :src="scope.row.shopTypePic | img" alt="">
            </template>
            </el-table-column>
            <el-table-column
            label="添加时间"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.addTime | date }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="更新时间"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.upTime | date }}</span>
            </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                @click="openUpShopType(scope.row.shopTypeName,scope.row._id)"
                size="mini">编辑</el-button>
                <el-button
                size="mini"
                @click="$store.dispatch('deleteShopType',scope.row._id)"
                type="danger">删除</el-button>
                <el-button
                size="mini"
                @click="openAddShop(scope.row._id)"
                type="success">添加店铺</el-button>
            </template>
            </el-table-column>
        </el-table>     

        <upShopType 
            v-if="upShopTypeViseble" 
            :visible.sync="upShopTypeViseble" 
            :shop-type-name="shopTypeName"
            :shop-type-id="shopTypeId">
        </upShopType>

        <addShop v-if="addShopVisible" :visible.sync="addShopVisible" :shop-type-id="shopTypeId"></addShop>

        <div class="toolbar">
            <pageInfo action-name="getShopType"></pageInfo>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'shop-type',
        data() {
            return {
                dialogFormVisible: false,
                addShopVisible: false,
                upShopTypeViseble: false,
                shopTypeId: "0",
                shopTypeName: "",
                formInline: {
                    shopTypeName: ""
                }
                // form: {
                //     shopTypeName: ''
                // }
            }
        },
        methods: {
            openAddShop(id) {
                this.shopTypeId = id;
                this.addShopVisible = true;
            },
            openUpShopType(shopTypeName, typeId) {
                this.shopTypeName = shopTypeName;
                this.shopTypeId = typeId;
                this.upShopTypeViseble = true;
            }



            // success(response) {
            //     // console.log(response);
            //     this.$refs.picInfo.clearFiles(); //清空上传文件列表
            //     this.$refs.myForm.resetFields(); //清空表单
            //     this.dialogFormVisible = false;
            // },
            // addShopType() {
            //     this.$refs.picInfo.submit();
            // }
        }
    }
</script>

<style scope>

</style>