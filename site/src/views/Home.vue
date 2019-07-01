<template>
    <div>
        <div class="header">
            <input type="text" placeholder="搜索饿了么商家、商品名称">
        </div>
        <slide :num="15"></slide>

        <div class="banner">
            <!-- <img src="http://127.0.0.1/banner2.jpg" alt=""> -->
            <img src="@/assets/img/banner2.jpg" alt="">
        </div>

        <cube-slide class="slide-default" :data="items"/>
        <div class="tuijian">
            <h6>—— 推荐商家 ——</h6>
        </div>

        <shopList :is-top="true"></shopList>
    </div>
</template>

<script>
    export default {
        name: 'home',
         data() {
            return {
                items: [
                    {
                    url: 'http://www.didichuxing.com/',
                    image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
                    },
                    {
                    url: 'http://www.didichuxing.com/',
                    image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
                    },
                    {
                    url: 'http://www.didichuxing.com/',
                    image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
                    }
                ]
            }
        }
    }
</script>

<style lang="less">
    .header{
        background-color: #0085ff;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        input{
            height: 35px;
            width: 350px;
            border-radius: 3px;
            font-size: 13px;
            text-align: center;
        }
    }
    .banner{
        margin: 8px 0;
        img{
            width: 100%;
        }
    }
    .slide-default{
        margin: 7px 0;
    }
    .cube-slide-item > a > img {
        width: 100%;
    }
    .tuijian{
        display: flex;
        flex-direction: column;
        align-items: center;
        h6{
            font-size: 13px;
            margin: 7px 0;
        }
    }
</style>
