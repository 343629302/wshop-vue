const menus = [
  {
    title: '概况',
    path: '/situation',
    icon: 'icon-gaikuang',
  },
  {
    title: '店铺',
    icon: "icon-shangdian",
    childrens: [
      {
        title: '店铺页面',
        path: '/store-list',
      },
      {
        title: '店铺导航',
        path: '/store-tabbar',
      },
    ],
  },
  {
    title: '商品',
    icon: "icon-shangpin",
    childrens: [
      {
        title: '全部商品',
        path: '/goods-list',
      },
    ],
  },
  {
    title: '订单',
    icon: "icon-aiguifanfile",
    childrens: [
      {
        title: '全部订单',
        path: '',
      },
    ],
  },
  {
    title: '客户',
    icon: "icon-kehu",
    childrens: [
      {
        title: '全部客户',
        path: '',
      },
    ],
  },
  // {
  //   title: '数据',
  //   icon: "icon-ico_data",
  //   childrens: [],
  // },
];

export default menus;
