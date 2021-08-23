<template>
  <div class="form-image">
    <div class="form-title">图片</div>
    <div class="tab-style">
      <a-radio-group v-model:value="styleActive" button-style="solid">
        <a-radio-button
          :value="index"
          v-for="(item, index) in styleList"
          :key="index"
          class="style-item"
        >
          <img :src="item.normalImage" alt="" v-show="styleActive != index" />
          <img :src="item.activeImage" alt="" v-show="styleActive === index" />
        </a-radio-button>
      </a-radio-group>
    </div>
    <a-tabs v-model:activeKey="activeKey" class="decorate-form-tabs">
      <a-tab-pane key="1" tab="内容设置"> </a-tab-pane>
      <a-tab-pane key="2" tab="样式设置"></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const styleList = [
  {
    activeImage: 'src/assets/store/image_shu_tile_active.png',
    normalImage: 'src/assets/store/image_shu_tile_normal.png',
  },
  {
    activeImage: 'src/assets/store/image_heng_tile_active.png',
    normalImage: 'src/assets/store/image_heng_tile_normal.png',
  },
];
const styleActive = ref(0);
const activeKey = ref('1');
</script>

<style lang="scss" scoped>
@import './styles/index.scss';
// 1px solid #d9d9d9
</style>
