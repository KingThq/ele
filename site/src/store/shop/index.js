import axios from 'axios'

const state = {
    topShopList: []
};
const mutations = {
    CHANGE_TOP_SHOP_LIST(state, topList) {
        state.topShopList = topList;
    }
};
const actions = {
    getTopShopList({commit}) {
        axios.get("/topShopList").then(({data}) => {
            if(data.ok === 1) {
                commit("CHANGE_TOP_SHOP_LIST", data.shopList);
            }
        })
    }
};

export default {
    state, 
    mutations,
    actions
}