import axios from 'axios';

const state = {
    shopTypeList: [],
    shopList: []
};
const mutations = {
    CHANGE_SHOP_TYPE_LIST(state, shopTypeList) {
        state.shopTypeList = shopTypeList;
    },
    CHANGE_SHOP_LIST(state, shopList) {
        state.shopList = shopList;
    }
};
const actions = {
    getShopType({commit}, obj) {
        obj = obj || {};
        const pageIndex = obj.pageIndex || 1;
        axios.get("/shopType", {
            params: {
                pageIndex
            }
        }).then(data => {
            commit("CHANGE_SHOP_TYPE_LIST", data.shopTypeList);
        })
    },
    getShopList({commit}, obj) {
        obj = obj || {};
        const pageIndex = obj.pageIndex || 1;
        axios.get("/shopList", {
            params: {
                pageIndex
            }
        }).then(data => {
            commit("CHANGE_SHOP_LIST", data.shopList);
        })
    },
    deleteShopType({dispatch}, id) {
        axios.delete("/deleteShopType", {
            data: {
                id
            }
        }).then(data => {
            dispatch("getShopType");
        })
    },
    deleteShopList({dispatch}, id) {
        axios.delete("/deleteShopList", {
            data: {
                id
            }
        }).then(data => {
            dispatch("getShopList");
        })
    },
    findByShopTypeName({commit}, shopTypeName) {
        axios.get("/findByShopTypeName", {
            params: {
                shopTypeName
            }
        }).then(data => {
            commit("CHANGE_SHOP_TYPE_LIST", data.shopTypeList);
        })
    },
    findByShopName({commit}, shopName) {
        axios.get("/findByShopName", {
            params: {
                shopName
            }
        }).then(data => {
            commit("CHANGE_SHOP_LIST", data.shopList);
        })
    }
};

export default {
    state,
    mutations,
    actions
}