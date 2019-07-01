<template>
    <div class="container">
        <cube-scroll-nav-bar class="cube-scroll" :current="current" :labels="shopTypeNames" @change="changeHandler" />

        <div class="shopList">
            <shopList :is-top="false" :shop-type-id="$route.params.shopTypeId"></shopList>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'msite',
        data() {
            return {
                current: '全部',
                shopTypeNames: [
                    '全部'
                ]
            }
        },
        methods: {
            changeHandler(cur) {
                this.current = cur;
            }
        },
        mounted() {
            this.$axios.get("/allShopType").then(({data}) => {
                let typeList = data.shopTypeList;
                for(let key in typeList) {
                    this.shopTypeNames.push(typeList[key].shopTypeName);
                }
            });
        }
    }
</script>

<style lang="less" scope>
    .container{
        display: flex;
        flex-direction: column;
    }
    .cube-scroll{
        background: #0af;
        // position: fixed; 
        // top: 0;
    }
    .cube-scroll-nav-bar-item{
        padding: 16px 14px;
        span{
            color: #fff;
            opacity: 0.7;
        }
    }
    .cube-scroll-nav-bar-item_active span{
        opacity: 1;
    }
    .shopList{
       flex: 1;
    }
</style>