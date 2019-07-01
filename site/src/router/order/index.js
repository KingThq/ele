import order from '@/views/order.vue';

export default [
    {
        path: '/order',
        name: 'order',
        component: order,
        meta: {
            isFooter: true
        }
    }
]