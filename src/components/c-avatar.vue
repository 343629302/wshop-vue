<template>
  <div class="c-avatar">
    <img :src="src" alt="" v-if="src" />
    <img src="@/assets/avatar.png" alt="" v-else />
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  size: {
    type: [Number, String],
    default: 40,
  },
  src: {
    type: String,
    default: "",
  },
});

const imgSize = computed(() => {
  return `${props.size}px`;
});
</script>

<style lang="scss" scoped>
.c-avatar {
  > img {
    width: v-bind(imgSize);
  }
}
</style>

