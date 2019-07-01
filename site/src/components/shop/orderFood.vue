<template>
    <div>
         <div class="shop-container">
            <div class="index-2v">
                <img src="../../assets/img/youhui.webp" alt="">
            </div>
        </div>
        <div class="goods-hot">
            <h3>商家推荐</h3>
            <!-- 推荐商品 -->
            <div ref="wrapper" class="hot-goods-wrapper">
                <ul class="hot-list" ref="tabcontent"> 
                    <li class="hot-list-content" v-for="item in hotGoodsList">
                        <div>
                            <img class="hot-goods-pic" :src="item.goodsPic | img" alt="">
                        </div>
                        <p class="hot-goods-name">{{item.goodsName}}</p>
                        <div class="hot-goods-bottom">
                            <div class="hot-price">{{item.goodsPrice | currency}}</div>
                            <div class="add-goods">+</div>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 所有商品 -->
            <div class="all-goods">
                <div class="goods-type" ref="left">
                    <ul>
                        <li v-for="(item, index) in goodsTypeList" :class="{current:currentIndex===index}" 
                            @click="selectItem(index,$event)">
                            {{item.goodsTypeName}}
                        </li>
                    </ul>
                </div>

                <div class="goods-right" ref="right">
                    <ul>
                        <li v-for="(item, index) in goodsList" class="goods-description right-item-hook">
                            <div>
                                <img :src="item.goodsPic | img" alt="">
                            </div>
                            <div class="goods-introduce">
                                <p :typeName="item.goodsTypeName">{{item.goodsName}}</p>
                                <div class="hot-goods-bottom">
                                    <div class="hot-price">{{item.goodsPrice | currency}}</div>
                                    <div class="add-goods">+</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        name: 'order-food',
        data() {
            return {
                hotGoodsList:[],
                goodsList:[],
                goodsTypeList: [],
                scrollY: 0, //实时获取当前Y轴的高度
                listHeight: [],
                clickEvent: false,
                goodsTypeNames: []
            }
        },
        methods: {
            getGoodsType() {
                return this.$axios.get("/goodsTypeList/" + this.$route.params.shopId);
            },
            getGoodsInfo() {
                return this.$axios.get("/goodsInfo/" + this.$route.params.shopId);
            },
            //重新整理商品列表
            resetGoodsList() {
                //对商品列表进行二次处理
                // for(let key in this.goodsTypeList) {
                //     this.goodsTypeNames.push(this.goodsTypeList[key].goodsTypeName)
                // }
                // console.log(this.goodsTypeNames);
                // for(let i = 0; i < this.goodsTypeNames.length; i ++) {
                //     for(let key in this.goodsList) {
                //         if(this.goodsList[key].goodsTypeName)
                //     }
                // }
            },
            // 水平滑动
            initScroll() {
                let width = this.hotGoodsList.length * 118;
                this.$refs.tabcontent.style.width = width + "px";
                 this.$nextTick(() => {
                    if(!this.scroll1) {
                        this.scroll1 = new BScroll(this.$refs.wrapper, {
                            startX: 0,
                            click: true,
                            scrollX: true,
                            scrollY: false,
                            eventPassthrough: 'vertical'
                        });
                    } else {
                        this.scroll1.refresh();
                    }
                })
            },
            // 左右联动，上下滑动
            _initScroll() {
                this.lefts = new BScroll(this.$refs.left, {
                    click: true
                });
                this.rights = new BScroll(this.$refs.right, {
                    probeType: 3  //探针效果，实时获取滚动高度
                });
                this.rights.on("scroll", (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y))
                })
            },
            _getHeight() {
                let rightItems = this.$refs.right.getElementsByClassName("right-item-hook");
                let height = 0;
                this.listHeight.push(height);
                for(let i = 0; i < rightItems.length; i ++) {
                    let item = rightItems[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
                // console.log(this.listHeight);
            },
            selectItem(index, e) {
                this.clickEvent = true;
                if(!e._constructed) {
                    //浏览器原生点击事件没有这个属性
                    return 
                } else {
                    let rightItems = this.$refs.right.getElementsByClassName("right-item-hook");
                    let el = rightItems[index];
                    for(let i = 0; i < rightItems.length; i ++) {
                        let typeName = rightItems[i].children[1].children[0].getAttribute('typeName');
                        // console.log(e.target.innerText, typeName)
                        if(e.target.innerText === typeName) {
                            el = rightItems[i]
                            break;
                        } 
                    }
                    this.rights.scrollToElement(el, 300);
                }
            }
        },
        computed: {
            currentIndex() {
                
                for(let i = 0; i < this.listHeight.length; i ++) {
                    let height = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if(!height2 || (this.scrollY >= height && this.scrollY < height2)) {
                        if(this.clickEvent) {
                            return i + 1;
                        } else {
                            return i;
                        }
                    }
                }
                return 0;
            }
        },
        watch: {
            hotGoodsList() {
                this.$nextTick(() => {
                this.initScroll();
            })
            }
        },
        mounted() {
            this.$axios.all([this.getGoodsType(), this.getGoodsInfo()])
                .then(this.$axios.spread((typeData, goodsData) => {
                    this.goodsTypeList = typeData.data.goodsTypeList;
                    this.goodsList = goodsData.data.goodsList;
                    this.hotGoodsList = this.goodsList.filter(v => {
                        return v.isHot === "true"
                    });

                    this.resetGoodsList();
                }));
            this.$nextTick(() => {
                this._initScroll();
                this._getHeight();
            });
        }
    }
</script>

<style lang="less" scope>
    @import '~@/assets/css/shop/orderFood.less';
</style>