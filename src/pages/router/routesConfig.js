// 路由配置
export default [
    {
        path: '/',
        exact: false,
        name: '~layout', // 特殊路由
        entry: '/pages/Layout/index.js',
        level: 1,
    },

    {
        path: '/',
        exact: true,
        name: 'index',
        entry: '/pages/Index',
        level: 2,
    },
    {
        path: '/index',
        exact: true,
        name: '~index',
        entry: '/pages/Index',
        level: 2,
    },

    {
        path: '/client-page',
        exact: true,
        name: 'clientPage',
        entry: '/pages/ClientPage',
        level: 2,
    },

    {
        path: '/second-client-page',
        exact: true,
        name: 'secondClientPage',
        entry: '/pages/SecondClientPage',
        level: 2,
    },

    {
        path: '/second-page',
        exact: true,
        name: 'secondPage',
        entry: '/pages/SecondPage',
        level: 2,
    },

    {
        path: '/translation',
        exact: true,
        name: 'translation',
        entry: '/pages/Translation',
        level: 2,
    },
];
