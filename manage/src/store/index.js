import Vue from "vue";
import Vuex from 'vuex';
import admin from './admin';
import shop from './shop';
import goods from './goods';
import axios from 'axios';

Vue.use(Vuex)

const state = {
    token: localStorage.token,
    adminName: localStorage.adminName,
    isLoading: false,
    pageSize: 6, //每页显示的数量
    total: 0, //总记录数,
    currentPageIndex: 1, //当前页
    shopTypeList: []
}
const mutations = {
    CHANGE_PAGE_INFO(state, {pageSize, total, currentPageIndex}) {
        state.pageSize = pageSize;
        state.total = total;
        state.currentPageIndex = currentPageIndex;
    },
    //退出登录
    OUT_LOGIN(state) {
        localStorage.clear();
        state.token = localStorage.token;
        state.adminName = localStorage.adminName;
    },
    CHANGE_TOKEN(state, {token, adminName}) {
        state.token = localStorage.token = token;
        state.adminName = localStorage.adminName = adminName;
    },
    CHANGE_IS_LOADING(state, loading) {
        state.isLoading = loading;
    },
    CHANGE_SHOP_TYPE_LIST(state, shopTypeList) {
        state.shopTypeList = shopTypeList;
    }
};
const actions = {
    getAllShopType({commit}) {
        axios.get("/allShopType").then(data => {
            commit("CHANGE_SHOP_TYPE_LIST", data.shopTypeList);
        })
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        admin,
        shop,
        goods
    }
})