<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="8" class="logo" :style="{width: isCollapse?'64px':'240px'}">
                    <strong>{{isCollapse?'饿':'饿了么管理系统'}}</strong>
                </el-col>
                <el-col :span="8" class="info">
                    <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" @click="isCollapse=!isCollapse"></i>
                </el-col>
                <el-col :span="8" class="adminInfo">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <img src="./assets/jide.png" alt="">
                            <span>{{$store.state.adminName}}</span>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item divided @click.native="$store.commit('OUT_LOGIN')">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside :style="{width:isCollapse?'auto':'240px'}">
                <el-menu :collapse-transition="false" :default-active="active" class="el-menu-vertical-demo" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">管理员设置</span>
                        </template>
                        <el-menu-item index="1-1" @click="$router.push('/adminLog')">管理员登陆日志</el-menu-item>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">店铺管理</span>
                        </template>
                        <el-menu-item index="2-1" @click="$router.push('/shopType')">店铺类别管理</el-menu-item>
                        <el-menu-item index="2-2" @click="$router.push('/shopList')">店铺管理</el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-set-up"></i>
                            <span slot="title">商品管理</span>
                        </template>
                        <el-menu-item index="3-1" @click="$router.push('/goodsType')">商品类别管理</el-menu-item>
                        <el-menu-item index="3-2" @click="$router.push('/goodsList')">商品管理</el-menu-item>
                    </el-submenu>

                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                isCollapse: false,
                active: "1-1"
            }
        },
        mounted() {
            switch(this.$route.name) {
                case "adminLog":
                    this.active = "1-1";
                    break;
                case "shopType":
                    this.active = "2-1";
                    break;
                case "shopList":
                    this.active = "2-2";
                    break;
                case "goodsType":
                    this.active = "3-1";
                    break;
                case "goodsList":
                    this.active = "3-2";
                    break;
            }
        }
    }
</script>

<style lang="less">
    *{
        margin: 0;
        padding: 0;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 240px;
        min-height: 950px;
    }
    .el-header {
        padding: 0px!important;
        background: #409EFF;
        color: #ffffff;
        .info{
            font-size:30px;
            line-height: 60px;
        }
        .logo {
            text-align:center;
            width: 240px;
            font-size: 25px;
            line-height: 60px;
            border-right: 1px solid rgba(238, 241, 146, 0.3);
        }
        .adminInfo {
            float: right;
            text-align: right;
            padding-right: 20px;
            line-height: 60px;
            .el-dropdown-link {
                cursor: pointer;
                span {
                    color: #fff;
                    margin-left: 5px;
                }
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
        }
    }
    .el-menu{
        background-color: rgb(221, 230, 240) !important;
    }
    .toolbar {
        background:#f4f4f4;
        padding:10px;
        margin:20px 0!important;
    }
    .el-table th,.el-table td{
        text-align:center!important;
    }
    .toolbar .el-form-item{
        margin-bottom:0px;
    }
</style>