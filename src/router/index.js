import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layouts/index.vue";
import store from "./store";
import situation from "./situation";
import goods from "./goods";
import order from "./order";
import customer from "./customer";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: { name: "situation" },
    children: [...situation, ...store, ...goods, ...order, ...customer],
  },
  {
    //自定义装修页面
    path: "/store-decorate",
    component: () => import("@/views/store/decorate.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
