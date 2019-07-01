const comList = {
    eleFooter: () => import('./common/eleFooter.vue'),
    slide: () => import('./home/slide.vue'),
    shopList: () => import('./common/shopList.vue'),
    orderFood: () => import('./shop/orderFood.vue'),
    appraise: () => import('./shop/appraise.vue'),
    shopInfo: () => import('./shop/shopInfo.vue'),
}

export default {
    install(Vue) {
        for(let key in comList) {
            Vue.component(key, comList[key]);
        }
    }
}