import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layouts/index.vue";
import store from "./store";
import situation from "./situation";
import goods from "./goods";
import order from "./order";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: { name: "situation" },
    children: [...situation, ...store, ...goods, ...order],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
