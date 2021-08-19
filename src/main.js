import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import router from "./router";
import Antd from "ant-design-vue";
import CSelect from "@/components/c-select.vue";
import CTable from "@/components/c-table.vue";
import CPagination from "@/components/c-pagination.vue";
import CTextarea from "@/components/c-textarea.vue";
import CAvatar from "@/components/c-avatar.vue";
import { IconPark } from "@icon-park/vue-next/es/all";
import "ant-design-vue/dist/antd.css";
import "./styles/index.scss";
import "./styles/iconfont.scss";
import "./styles/init.scss";
import "./styles/public.scss";
import global from "./libs/global";

const app = createApp(App);
const components = [
  {
    name: "c-select",
    component: CSelect,
  },
  {
    name: "c-table",
    component: CTable,
  },
  {
    name: "c-pagination",
    component: CPagination,
  },
  {
    name: "c-textarea",
    component: CTextarea,
  },
  {
    name: "c-avatar",
    component: CAvatar,
  },
  {
    name: "c-icon",
    component: IconPark,
  },
];

components.forEach((item) => {
  app.component(item.name, item.component);
});

app.use(router);
app.use(store);
app.use(Antd);
app.use(global);
app.mount("#app");
