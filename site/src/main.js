import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from '@/store'
import 'amfe-flexible'
import iconfont from '@/iconfont/iconfont.css'
import component from './components'
import axios from 'axios'
import filter from './filter'

Vue.use(component);
Vue.use(filter);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

axios.interceptors.request.use((config) => {
  config.url = "/ele" + config.url;
  return config;
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
