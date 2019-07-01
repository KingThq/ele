import Vue from 'vue'
import App from './App.vue'
import Login from './views/Login.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import filter from './filter'
import component from './components'

Vue.use(filter)
Vue.use(ElementUI)
Vue.use(component)
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

//路由守卫
router.beforeEach((to, from, next) => {
  if(to.meta.authorization) {
    //验证是否要登录才能访问
    if(localStorage.token) next();
    else store.commit("OUT_LOGIN");
  } else {
    next();
  }
});

//axios拦截器
axios.interceptors.request.use((config) => {
  store.commit("CHANGE_IS_LOADING", true);
  if(localStorage.token) {
    config.headers = {
      authorization: localStorage.token
    }
  }

  // config.url = "http://127.0.0.1" + config.url;
  config.url = "/ele" + config.url;
  return config;
});
axios.interceptors.response.use(({data}) => {
  if(data.pageSize && data.total) {
    store.commit("CHANGE_PAGE_INFO", {
      pageSize: data.pageSize,
      total: data.total,
      currentPageIndex: data.pageIndex
    });
  }
  if(data.ok === -3) {
    store.commit('OUT_LOGIN');
  }
  store.commit("CHANGE_IS_LOADING", false);
  return data;
})

new Vue({
  router,
  store,
  render: function (h) { return h(this.$store.state.token ? App : Login) }
}).$mount('#app')
