const goods = [
  {
    //商品列表
    path: '/goods-list',
    name: 'goods-list',
    component: () => import('@/views/goods/list.vue'),
  },
  {
    //添加/编辑商品
    path: '/goods-edit',
    name: 'goods-edit',
    component: () => import('@/views/goods/edit.vue'),
  },
];

export default goods;
