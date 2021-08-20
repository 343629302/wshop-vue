<template>
  <a-layout-sider width="120">
    <div class="logo">
      <img src="src/assets/logo.png" alt="" />
    </div>
    <div class="menu">
      <a-menu v-model:selectedKeys="selectedKeys">
        <a-menu-item
          v-for="(item, index) in menus"
          :key="index"
          @click="handleMenuChange(item)"
        >
          <i class="iconfont" :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script setup>
import menus from 'libs/menu.js';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const selectedKeys = ref([0]);
const route = useRoute();
const router = useRouter();
const emit = defineEmits();

//初始化路由
const init = () => {
  const seesionPath = sessionStorage.getItem('secondRouterPath');
  const path = seesionPath ? seesionPath : route.path;
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i];
    if (item.path && item.path === path) {
      handleListenRouteChange(item, path);
      selectedKeys.value = [i];
      return;
    }
    if (item.childrens) {
      for (let j = 0; j < item.childrens.length; j++) {
        if (item.childrens[j].path === path) {
          handleListenRouteChange(item, path);
          selectedKeys.value = [i];
          return;
        }
      }
    }
  }
};

//点击路由菜单
const handleMenuChange = (item) => {
  if (item.path) {
    router.push(item.path);
    handleListenRouteChange(item, item.path);
  } else {
    const path = item?.childrens[0]?.path;
    if (item.childrens?.length && path) {
      router.push(path);
    }
    handleListenRouteChange(item, path);
  }
};

//监听路由变化，并且记录路由
const handleListenRouteChange = (item, path) => {
  const ars = item.childrens ? item.childrens : [];
  emit('handleFirstRouteChange', {
    ars,
    path,
  });
};

init();
</script>

<style lang="scss" scoped>
.ant-layout-sider {
  background-color: #22242f;
  .logo {
    padding: 20px;
    margin: 0 20px;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .menu {
    ::v-deep(.ant-menu) {
      background-color: transparent;
      border: none;
      .ant-menu-item {
        background-color: transparent !important;
        color: #757993;
        font-size: 14px;
        position: relative;
        i {
          margin-right: 10px;
        }
        &.ant-menu-item-selected {
          color: #fff;
          &::after {
            content: '';
            width: 4px;
            background: #fff;
            border-radius: 2px;
            position: absolute;
            right: 10px;
            top: 25%;
            bottom: 25%;
            border: none;
            opacity: 1;
            transform: scaleY(1);
          }
        }
      }
    }
  }
}
</style>
