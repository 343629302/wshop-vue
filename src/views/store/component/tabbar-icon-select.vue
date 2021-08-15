<template>
  <a-modal>
    <div class="win-warpper">
      <ul>
        <li v-for="(item, index) in styleList" :key="index">
          <div class="title">风格{{ index + 1 }}</div>
          <div class="style-imgae">
            <div
              class="image-item"
              v-for="(imageItem, imageIndex) in item"
              :key="imageIndex"
              :class="{ active: activeIcon === imageItem }"
              @click="handleSelectIcon(imageItem)"
            >
              <img :src="`src/assets/tab-icon/${imageItem}-gray.png`" alt="" />
              <span class="icon-youxiajiaogouxuan iconfont"></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </a-modal>
</template>

<script setup>
const props = defineProps({
  activeIcon: {
    type: String,
    default: '',
  },
});
const emit = defineEmits();

const styleList = [
  ['home', 'classify', 'car', 'user', 'member'],
  ['home-solid', 'classify-solid', 'car-solid', 'user-solid', 'member-solid'],
];

//选择图标
const handleSelectIcon = (icon) => {
  emit('update:activeIcon', icon);
};
</script>

<style lang="scss" scoped>
.win-warpper {
  height: 300px;
  ul {
    li {
      .title {
        font-size: 12px;
        padding-bottom: 5px;
      }
      .style-imgae {
        @extend .d-flex;
        flex-wrap: wrap;
        .image-item {
          height: 40px;
          width: 40px;
          float: left;
          margin-right: 20px;
          border: 1px solid #e0e0e0;
          margin-bottom: 20px;
          border-radius: 4px;
          padding: 5px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
          .iconfont {
            position: absolute;
            bottom: -7px;
            color: #2589ff;
            right: 0;
            font-size: 22px;
            display: none;
          }
          &.active {
            border-color: #2589ff;
            .iconfont {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
