import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store';
import router from './router';
import Antd from 'ant-design-vue';
import CSelect from '@/components/c-select.vue';
import CTable from '@/components/c-table.vue';
import CPagination from '@/components/c-pagination.vue';
import CTextarea from '@/components/c-textarea.vue';
import 'ant-design-vue/dist/antd.css';
import './styles/index.scss';
import './styles/iconfont.scss';
import './styles/init.scss';
import './styles/public.scss';
import global from './libs/global';


const app = createApp(App);

app.use(router);
app.use(store);
app.use(Antd);
app.use(global);
app.component('c-select', CSelect);
app.component('c-table', CTable);
app.component('c-pagination', CPagination);
app.component('c-textarea', CTextarea);
app.mount('#app');
