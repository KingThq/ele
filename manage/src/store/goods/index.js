import axios from 'axios';

const state = {
    goodsTypeList: [],
    goodsList: []
};
const mutations = {
    CHANGE_GOODS_TYPE_LIST(state, goodsTypeList) {
        state.goodsTypeList = goodsTypeList;
    },
    CHANGE_GOODS_LIST(state, goodsList) {
        state.goodsList = goodsList;
    }
};
const actions = {
    getGoodsTypeList({commit}, obj) {
        obj = obj || {};
        const pageIndex = obj.pageIndex || 1;
        axios.get("/goodsTypeList", {
            params: {
                pageIndex
            }
        }).then(data => {
            commit("CHANGE_GOODS_TYPE_LIST", data.goodsTypeList);
        })
    },
    getGoodsList({commit}, obj) {
        obj = obj || {};
        const pageIndex = obj.pageIndex || 1;
        axios.get("/goodsList", {
            params: {
                pageIndex
            }
        }).then(data => {
            commit("CHANGE_GOODS_LIST", data.goodsList);
        })
    },
    deleteGoodsType({dispatch}, id) {
        axios.delete("/deleteGoodsType", {
            data: {
                id
            }
        }).then(data => {
            dispatch("getGoodsTypeList");
        })
    },
    deleteGoodsList({dispatch}, id) {
        axios.delete("/deleteGoodsList", {
            data: {
                id
            }
        }).then(data => {
            dispatch("getGoodsList");
        })
    },
    findByGoodsTypeName({commit}, goodsTypeName) {
        axios.get("/findByGoodsTypeName", {
            params: {
                goodsTypeName
            }
        }).then(data => {
            commit("CHANGE_GOODS_TYPE_LIST", data.goodsTypeList);
        })
    },
    findByGoodsName({commit}, goodsName) {
        axios.get("/findByGoodsName", {
            params: {
                goodsName
            }
        }).then(data => {
            commit("CHANGE_GOODS_LIST", data.goodsList);
        })
    }
}

export default {
    state,
    mutations,
    actions
}