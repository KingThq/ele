<template>
    <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        @click="clickHandler"
        @change="changeHandler"
        class="footer">
    </cube-tab-bar>
</template>

<script>
    export default {
        name: 'ele-footer',
        data() {
            return {
                selectedLabelDefault: "首页",
                tabs: [
                    {
                        label: "首页",
                        icon: "iconfont iconelement",
                        name: "home"
                    },
                    {
                        label: "发现",
                        icon: "iconfont iconicon-test",
                        name: "discover"
                    },
                    {
                        label: "订单",
                        icon: "iconfont iconicon-order",
                        name: "order"
                    },
                    {
                        label: "我的",
                        icon: "iconfont iconwo",
                        name: "profile"
                    }
                ]
            }
        },
        created() {
            this.selectedLabelDefault = this.tabs.find(v => v.name === this.$route.name).label;
        },
        methods: {
            clickHandler(label) {
                // console.log(v)
                this.$router.push({name: this.tabs.find(v => v.label === label).name});
            },
            changeHandler() {
                
            }
        }
    }
</script>

<style lang="less" scope>
    @import '~@/assets/css/elefooter.less';
</style>