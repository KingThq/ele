const components = {
    pageInfo: () => import('./common/pageInfo.vue'),
    addShopType: () => import('./shop/addShopType.vue'),
    upShopType: () => import('./shop/upShopType.vue'),
    addShop: () => import('./shop/addShop.vue'),
    upShop: () => import('./shop/upShop.vue'),
    addGoodsType: () => import('./goods/addGoodsType.vue'),
    upGoodsType: () => import('./goods/upGoodsType.vue'),
    addGoods: () => import('./goods/addGoods.vue'),
    upGoods: () => import('./goods/upGoods.vue')
}

export default {
    install(Vue) {
        for(let key in components) {
            Vue.component(key, components[key]);
        }
    }
}