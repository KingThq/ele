<template>
    <div>
        <h3>商品类别管理</h3>
        <div class="toolbar">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="商品类别名称：">
                    <el-input v-model="formInline.goodsTypeName" placeholder="商品类别名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="$store.dispatch('findByGoodsTypeName',formInline.goodsTypeName)" type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="dialogFormVisible=true">添加商品类别</el-button>
                </el-form-item>
            </el-form>  
        </div>

        <el-table
            :data="$store.state.goods.goodsTypeList"
            v-loading="$store.state.isLoading"
            :border="true"
            style="width: 100%">
            <el-table-column
            label="商品类别名称"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.goodsTypeName}}</span>
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
            label="商品类别图片"
            width="180">
            <template slot-scope="scope">
                <img height="50" :src="scope.row.goodsTypePic | img" alt="">
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
                @click="openUpGoodsType(scope.row.goodsTypeName,scope.row.shopName,scope.row._id)"
                size="mini">编辑</el-button>
                <el-button
                size="mini"
                @click="$store.dispatch('deleteGoodsType',scope.row._id)"
                type="danger">删除</el-button>
                <el-button
                size="mini"
                @click="openAddGoods(scope.row._id,scope.row.shopId,scope.row.shopTypeId)"
                type="success">添加商品</el-button>
            </template>
            </el-table-column>
        </el-table>   
        
        <addGoodsType :visible.sync="dialogFormVisible"></addGoodsType>
        <addGoods v-if="addGoodsVisible" 
                :visible.sync="addGoodsVisible" 
                :shop-type-id="shopTypeId"
                :goods-type-id="goodsTypeId"
                :shop-id="shopId">
        </addGoods>
        <upGoodsType v-if="upGoodsTypeVisible" 
                :visible.sync="upGoodsTypeVisible" 
                :goods-type-name="goodsTypeName"
                :goods-type-id="goodsTypeId"
                :shop-name="shopName">
        </upGoodsType>

        <div class="toolbar">
            <pageInfo action-name="getGoodsTypeList"></pageInfo>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'goods-type',
        data() {
            return {
                dialogFormVisible: false,
                addGoodsVisible: false,
                upGoodsTypeVisible: false,
                shopTypeId: '',
                goodsTypeId: '',
                goodsTypeName: '',
                shopName: '',
                shopId: '',
                formInline: {
                    goodsTypeName: ""
                }
            }
        },
        methods: {
            openAddGoods(goodsTypeId, shopId, shopTypeId) {
                this.addGoodsVisible = true;
                this.shopTypeId = shopTypeId;
                this.goodsTypeId = goodsTypeId;
                this.shopId = shopId;
            },
            openUpGoodsType(typeName, shopName, id) {
                this.goodsTypeId = id;
                this.shopName = shopName;
                this.goodsTypeName = typeName;
                this.upGoodsTypeVisible = true;
            }
        }
    }
</script>

<style scope>

</style>