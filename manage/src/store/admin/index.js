import axios from 'axios'
export default {
    state: {
        adminLog: []
    },
    mutations: {
        CHANGE_ADMIN_LOG(state, {adminLog}) {
            state.adminLog = adminLog;
        }
    },
    actions: {
        login({commit}, vm) {
            // console.log(vm);
            axios.post("/login", vm.ruleForm).then(data => {
                // commit("CHANGE_IS_LOADING");
                if(data.ok === 1) {
                    commit("CHANGE_TOKEN", {
                        token: data.token,
                        adminName: data.adminName
                    });
                    vm.$message({
                        message: data.msg,
                        type: 'success'
                    });
                } else {
                    vm.$message.error(data.msg);
                }
            })
        },
        adminLog({commit}, pageObj) {
            pageObj = pageObj || {};
            let pageIndex = pageObj.pageIndex || 1;
            axios.get("/adminLog", {
                params: {
                    pageIndex
                }
            }).then(data => {
                // console.log(data);
                commit("CHANGE_ADMIN_LOG", data);
                // commit("CHANGE_PAGE_INFO", {
                //     pageSize: data.pageSize,
                //     total: data.total
                // });
            })
        },
        deleteLoginLog({rootState, dispatch}, pageInfo) {
            const id = pageInfo.id;
            // console.log(pageInfo); 
            axios.delete("/deleteLoginLog", {
                data: {
                    id
                }
            }).then(data => {
                dispatch("adminLog", {pageIndex:rootState.currentPageIndex});
            })
        }
    }
}