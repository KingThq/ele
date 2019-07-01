import goodsList from '@/views/goods/goodsList';
import goodsType from '@/views/goods/goodsType';

export default [
    {
        path: '/goodsList',
        name: 'goodsList',
        component: goodsList
    },
    {
        path: '/goodsType',
        name: 'goodsType',
        component: goodsType
    }
]