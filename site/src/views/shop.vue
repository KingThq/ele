<template>
    <div>
        <div class="bg">
            <div class="back" @click="$router.go(-1)"><</div>
        </div>
        <div class="shop-imgInfo">
            <div v-if="shopInfo.shopPic">
                <img :src="shopInfo.shopPic | img" alt="">
            </div>
            <h4 >{{shopInfo.shopName}}</h4>
        </div>
        <div class="sale-num">
            <span>评价4.0</span>
            <span>月售4848单</span>
            <span>蜂鸟快送约28分钟</span>
        </div>
        <div class="youhui">
            <p>
                <span>￥6</span>
                <span>无门槛</span>
                <span>领取</span>
            </p>
        </div>
        <div class="manjian">
            <span>满减</span>
            <span>满10减1，</span>
            <span>满15减2，</span>
            <span>满20减3，</span>
            <span>满30减5</span>
        </div>
        <div class="notice">
            <p>公告：本店所有蔬菜为绿色有机菜品，精工细致，欢迎新老顾客品尝</p>
        </div>
        <div class="shop-tab-mgbk">
            <div @click="index=0">
                <p :style="{fontWeight:index===0?'700':'500'}">点餐</p>
                <span class="xiahuaxian" v-if="index===0"></span>
            </div>
            <div @click="index=1">
                <p :style="{fontWeight:index===1?'700':'500'}">评价</p>
                <span class="xiahuaxian" v-if="index===1"></span>
            </div>
            <div @click="index=2">
                <p :style="{fontWeight:index===2?'700':'500'}">商家</p>
                <span class="xiahuaxian" v-if="index===2"></span>
            </div>
        </div>
       
       <!-- 点餐 -->
       <!-- <orderFood v-if="index===0"></orderFood> -->
       <!-- 评价 -->
       <!-- <appraise v-if="index===1"></appraise> -->
       <!-- 商家介绍 -->
       <!-- <shopInfo v-if="index===2"></shopInfo> -->
       <component :is="arr[index]"></component>

        <div class="shop-footer">
            <div class="shop-car">
                <i class="iconfont icongouwuche"></i>
            </div>
            <div class="goods">未选购商品</div>
            <div class="priceInfo">￥15元起送</div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'shop',
        data() {
            return {
                shopInfo: {},
                index: 0,
                arr: ["orderFood", "appraise", "shopInfo"]
            }
        },
        mounted() {
            this.$axios.get("/shop/" + this.$route.params.shopId).then(({data}) => {
                this.shopInfo = data.shopInfo;
            })
        }
    }
</script>

<style lang="less" scoped>
    @import '../assets/css/shop/shop.less';
</style>