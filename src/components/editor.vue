<template>
  <div ref="editorRef"></div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import WangEditor from "wangeditor";

const editorRef = ref();
let instance;

onMounted(() => {
  //创建实例
  instance = new WangEditor(editorRef.value);
  Object.assign(instance.config, {
    onchange(event) {
      console.log(event);
    },
  });
  instance.create();
});

onBeforeUnmount(() => {
  //销毁实例
  instance.destroy();
  instance = null;
});
</script>

<style lang="scss" scoped>
</style>