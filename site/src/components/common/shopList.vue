<template>
    <div class="shop">
        <div v-for="item in (isTop ? $store.state.shop.topShopList : shopList)" 
             @click="$router.push('/shop/'+item._id)"
             class="shop-list">
            <div class="shop-pic">
                <img :src="item.shopPic | img">
            </div>

            <div class="right-info">
                <div class="shop-info">
                    <h4>{{item.shopName}}</h4>
                </div>
                <div class="star-info">
                    <cube-rate v-model="value" :disabled="true" class="star"></cube-rate>
                    <span>4.0 月售4848单</span>
                </div>
                <div class="info">
                    <div class="price-info">
                        <span>￥15元起送 | 免配送费</span>
                    </div>
                    <div class="price-info">
                        <span>1.40km | 28分钟</span>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: 'shop-list',
        props: ["isTop", "shopTypeId"],
        data() {
            return {
                value: 4,
                shopList: []
            }
        },
        mounted() {
            if(this.isTop) {
                //推荐店铺
                this.$store.dispatch("getTopShopList");
            } else {
                //非推荐店铺
                this.$axios.get("/shopList/" + this.shopTypeId).then(({data}) => {
                    this.shopList = data.shopList;
                })
            }  
        }
    }
</script>

<style lang="less" scope>
    .shop{
        display: flex;
        flex-direction: column;
        margin-bottom: 50px;
    }
    .shop-list{
        display: flex;
        border-bottom: 1px solid #ccc;
        padding: 20px 0;
    }
    .shop-pic{
        img{
            width: 50px;
            height: 50px;
            margin: 0 15px;
        }
        
    }
    .right-info{
        display: flex;
        flex-direction: column;
        flex: 1;
        padding-right: 15px;
        .shop-info{
            h4{
                font-size: 15px;
                font-weight: 620;
                line-height: 20px;
            }
        }
        .star-info{
            display: flex;
            height: 20px;
            align-items: center;
            .star{
                width: 65px;
                .cube-rate-item{
                    margin-right: 1px;
                    width: 10px;
                }
            }
            span{
                font-size: 11px;
                color: #666;
            }
        }
        .info{
            display: flex;
            justify-content: space-between;
            height: 25px;
            align-items: center;
            .price-info{
                font-size: 11px;
                color: #666;
            }
        }
    }
    
</style>