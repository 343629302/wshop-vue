<template>
  <div class="goods-edit-detail">
    <div class="detail-operation">
      <div class="editor">
        <editor />
      </div>
    </div>
  </div>
</template>

<script setup>
import Editor from "@/components/editor.vue";
</script>


<style lang="scss" scoped>
.detail-operation {
  .editor {
    width: 375px;
    height: 668px;
  }
}
</style>