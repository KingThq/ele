<template>
    <div>
        <h3>商品管理</h3>
        <div class="toolbar">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="商品名称：">
                    <el-input v-model="formInline.goodsName" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="$store.dispatch('findByGoodsName',formInline.goodsName)" type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="addGoodsVisible=true">添加商品</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="dialogFormVisible=true">添加商品类别</el-button>
                </el-form-item>
            </el-form>  
        </div>

        <addGoods v-if="addGoodsVisible" :visible.sync="addGoodsVisible"></addGoods>
        <addGoodsType :visible.sync="dialogFormVisible"></addGoodsType>

        <el-table
            :data="$store.state.goods.goodsList"
            v-loading="$store.state.isLoading"
            :border="true"
            style="width: 100%">
            <el-table-column
            label="店铺名称"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.shopName}}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="商品类别名称"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.goodsTypeName}}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="商品名称"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.goodsName}}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="商品图片"
            width="180">
            <template slot-scope="scope">
                <img height="50" :src="scope.row.goodsPic | img" alt="">
            </template>
            </el-table-column>
            <el-table-column
                label="商品价格"
                width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.goodsPrice | currency}}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="是否热销"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.isHot | isHot}}</span>
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
                @click="openUpGoods(scope.row.goodsTypeName,scope.row.shopName,
                        scope.row.goodsName,scope.row.goodsPrice,
                        scope.row.isHot,scope.row._id)"
                size="mini">编辑</el-button>
                <el-button
                size="mini"
                @click="$store.dispatch('deleteGoodsList',scope.row._id)"
                type="danger">删除</el-button>
            </template>
            </el-table-column>
        </el-table>   
        
        <upGoods v-if="upGoodsVisible" 
                :visible.sync="upGoodsVisible" 
                :goods-type-name="goodsTypeName"
                :goods-id="goodsId"
                :goods-price="goodsPrice"
                :is-hot="isHot"
                :goods-name="goodsName"
                :shop-name="shopName">
        </upGoods>

        <div class="toolbar">
            <pageInfo action-name="getGoodsList"></pageInfo>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'goods-list',
        data() {
            return {
                dialogFormVisible: false,
                addGoodsVisible: false,
                upGoodsVisible: false,
                shopName: "",
                goodsTypeName: "",
                goodsName: "",
                goodsId: "",
                goodsPrice: "",
                isHot: "",
                formInline: {
                    goodsName: ""
                }
            }
        },
        methods: {
            openUpGoods(typeName, shopName, goodsName, price, isHot, id) {
                this.shopName = shopName;
                this.goodsTypeName = typeName;
                this.goodsName = goodsName;
                this.goodsId = id;
                this.goodsPrice = price;
                this.isHot = isHot;
                this.upGoodsVisible = true;
            }
        }
    }
</script>

<style scope>

</style>