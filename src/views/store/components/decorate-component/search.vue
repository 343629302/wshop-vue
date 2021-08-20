<template>
  <div class="component-search">{{ form.placeholder }}</div>
</template>


<script setup>
const props = defineProps({
  form: {
    type: Object,
    default: () => {},
  },
});
</script>


<style lang="scss" scoped>
.component-search {
  height: 50px;
}
</style>





