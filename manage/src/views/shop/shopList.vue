<template>
    <div>
        <h3>店铺管理</h3>
        <div class="toolbar">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="店铺名称：">
                    <el-input @input="fn" v-model="formInline.shopName" placeholder="店铺名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="$store.dispatch('findByShopName',formInline.shopName)" type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="addShopVisible=true">添加店铺</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="dialogFormVisible=true">添加店铺类别</el-button>
                </el-form-item>
            </el-form>  
        </div>

        <addShop :visible.sync="addShopVisible"></addShop> 
        <addShopType :visible.sync="dialogFormVisible"></addShopType>

        <el-table
            :data="$store.state.shop.shopList"
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
            label="店铺名称"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.shopName}}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="店铺图片"
            width="180">
            <template slot-scope="scope">
                <img height="50" :src="scope.row.shopPic | img" alt="">
            </template>
            </el-table-column>
             <el-table-column
            label="是否推荐"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.isTop | isTop }}</span>
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
                @click="openUpShop(scope.row.shopTypeName,scope.row.shopName,scope.row._id,scope.row.isTop)"
                size="mini">编辑</el-button>
                <el-button
                size="mini"
                @click="$store.dispatch('deleteShopList', scope.row._id)"
                type="danger">删除</el-button>
                <el-button
                size="mini"
                @click="openAddGoodsType(scope.row.shopTypeId,scope.row._id)"
                type="success">添加商品类别</el-button>
            </template>
            </el-table-column>
        </el-table> 

        <addGoodsType 
            v-if="addGoodsTypeVisible" 
            :visible.sync="addGoodsTypeVisible"
            :shop-type-id="shopTypeId"
            :shop-id="shopId">
        </addGoodsType>

        <upShop 
            v-if="upShopVisible" 
            :visible.sync="upShopVisible"
            :shop-type-name="shopTypeName"
            :shop-name="shopName"
            :isTop="isTop"
            :shop-id="shopId">
        </upShop>

        <div class="toolbar">
            <pageInfo action-name="getShopList"></pageInfo>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'shop-list',
        data() {
            return {
                dialogFormVisible: false,
                addShopVisible: false,
                addGoodsTypeVisible: false,
                upShopVisible: false,
                shopTypeId: "",
                shopId: "",
                shopName: "",
                shopTypeName: "",
                isTop: "",
                formInline: {
                    shopName: ""
                }
            }
        },
        methods: {
            openAddGoodsType(typeId, shopId) {
                this.addGoodsTypeVisible = true;
                this.shopTypeId = typeId;
                this.shopId = shopId;
            },
            fn(v) {
                this.$store.dispatch('findByShopName', v);
            },
            openUpShop(typeName, shopName, shopId, isTop) {
                this.shopTypeName = typeName;
                this.shopName = shopName;
                this.shopId = shopId;
                this.isTop = isTop;
                this.upShopVisible = true;
            }
        }
    }
</script>

<style scope>

</style>