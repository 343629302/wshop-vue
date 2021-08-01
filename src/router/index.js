import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layouts/index.vue';
import store from './store';
import situation from './situation';
import goods from './goods';

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: { name: 'situation' },
    children: [...situation, ...store, ...goods],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
