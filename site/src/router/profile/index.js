import profile from '@/views/profile.vue';

export default [
    {
        path: '/profile',
        name: 'profile',
        component: profile,
        meta: {
            isFooter: true
        }
    }
]