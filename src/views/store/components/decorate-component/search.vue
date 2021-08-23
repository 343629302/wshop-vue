<template>
  <div
    class="component-search"
    :style="{ 'background-color': props.form.backgroundColor }"
  >
    <div
      class="search-padding"
      :style="{
        'padding-top': props.form.topPadding,
        'padding-bottom': props.form.bottomPadding,
      }"
    >
      <div class="search-input">
        <div
          class="input-content"
          :class="{
            round: props.form.borderStyle === 'round',
            left: props.form.position === 'left',
            outline: props.form.style === 'outline',
          }"
        >
          <i class="icon-sousuo iconfont"></i>
          <span> {{ form.placeholder }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps({
  form: {
    type: Object,
    default: () => {},
  },
});
const outlineColor = computed(() => {
  return props.form.outlineColor || '#595961';
});
</script>

<style lang="scss" scoped>
.component-search {
  .search-padding {
    .search-input {
      padding: 10px 15px;
      .input-content {
        height: 35px;
        width: 100%;
        box-sizing: border-box;
        background-color: #f8f8f8;
        @extend .d-flex;
        justify-content: center;
        border: 1px solid #f8f8f8;
        &.round {
          border-radius: 50px;
        }
        &.left {
          justify-content: flex-start;
          i {
            padding-left: 20px;
          }
        }
        &.outline {
          border-color: v-bind(outlineColor);
          background-color: transparent;
          span {
            color: v-bind(outlineColor);
          }
          i {
            color: v-bind(outlineColor);
          }
        }
        i {
          font-size: 15px;
        }
        span {
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
