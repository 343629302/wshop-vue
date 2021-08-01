const store = [
  {
    //装修页面
    path: '/store-list',
    name: 'store-list',
    component: () => import('@/views/store/list.vue'),
  },
  {
    //店铺导航
    path: '/store-tabbar',
    name: 'store-tabbar',
    component: () => import('@/views/store/tabbar.vue'),
  },
];

export default store;
