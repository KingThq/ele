<template>
    <div>
        <div class="my-top">
            <div class="login">
                <div class="login-img">
                    <img src="@/assets/logo.png" alt="">
                </div>
                <span>登录 / 注册</span>
            </div>
        </div>
        <div class="maininfo">
            <div class="index-red">
                <div class="info-top">
                    <span>0</span>
                    <span class="num">个</span>
                </div>
                <span class="info-name">红包</span>
            </div>
            <div class="index-money">
                <div class="money-top">
                    <span>0</span>
                    <span class="num">个</span>
                </div>
                <span class="info-name">金币</span>
            </div>
        </div>
        <div class='my-contain'>
            <div class="my-contain-items">
                <div class="my-contain-item">
                    <div class="my-item">
                        <i class="iconfont icondizhi"></i>
                        <span>我的地址</span>
                    </div>
                    <span class="my-right">></span>
                </div>
            </div>

            <div class="my-contain-items">
                <div class="my-contain-item">
                    <div class="my-item">
                        <i class="iconfont iconziyuan"></i>
                        <span>金币商城</span>
                    </div>
                    <span class="my-right">></span>
                </div>
                <div class="my-contain-item">
                    <div class="my-item">
                        <i class="iconfont iconliwu"></i>
                        <span>分享拿20元现金</span>
                    </div>
                    <span class="my-right">></span>
                </div>
            </div>

            <div class="my-contain-items">
                <div class="my-contain-item">
                    <div class="my-item">
                        <i class="iconfont iconkefu"></i>
                        <span>我的客服</span>
                    </div>
                    <span class="my-right">></span>
                </div>
                <div class="my-contain-item">
                    <div class="my-item">
                        <i class="iconfont iconeliaomo"></i>
                        <span>下载饿了么APP</span>
                    </div>
                    <span class="my-right">></span>
                </div>
                <div class="my-contain-item">
                    <div class="my-item">
                        <i class="iconfont iconguize"></i>
                        <span>规则中心</span>
                    </div>
                    <span class="my-right">></span>
                </div>
            </div> 
        </div>

    </div>
</template>

<script>
    export default {
        name: 'profile'
    }
</script>

<style lang="less" scope>
    @import '../assets/css/profile/profile.less';
</style>