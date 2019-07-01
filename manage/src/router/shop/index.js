import shopList from '@/views/shop/shopList';
import shopType from '@/views/shop/shopType';

export default [
    {
        path: '/shopList',
        name: 'shopList',
        component: shopList
    },
    {
        path: '/shopType',
        name: 'shopType',
        component: shopType
    }
]