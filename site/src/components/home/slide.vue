<template>
    <cube-slide ref="slide" :data="slideList" @change="changePage">
        <cube-slide-item v-for="(item, index) in slideList" :key="index" class="slide">
            <div v-for="info in item" @click="$router.push('/msite/'+info._id)" class="slide-item">
                <img :src="info.shopTypePic | img" alt="">
                <span>{{info.shopTypeName}}</span>
            </div>
        </cube-slide-item>
    </cube-slide>
</template>

<script>
    export default {
        name: 'slide',
        props: ["num"],
        data() {
            return {
                slideList: []
            }
        },
        methods: {
            changePage(v) {
                // console.log(v);
            }
        },
        mounted() {
            this.$axios.get("/slideList/" + this.num).then(({data}) => {
                this.slideList = data.slideList;
            })
        }
    }
</script>

<style lang="less" scope>
    @import '~@/assets/css/home/slide.less';
</style>