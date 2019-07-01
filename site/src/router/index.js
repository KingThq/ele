import Vue from 'vue'
import Router from 'vue-router'
import home from './home'
import discover from './discover'
import order from './order'
import profile from './profile'
import msite from './msite'
import shop from './shop'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...home,
        ...discover,
        ...order,
        ...profile,
        ...msite,
        ...shop
    ]
})
