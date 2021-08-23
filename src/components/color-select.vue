<template>
  <div class="color-select" ref="colorPicker">
    <div class="color-show" @click="handleInputShow">
      <div></div>
    </div>
    <input
      type="color"
      ref="inputRef"
      :value="modelValue"
      @change="handleUpdataValue"
      class="color-input"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits();
const inputRef = ref();

//显示颜色选择器
const handleInputShow = () => {
  inputRef.value.click();
  console.log(inputRef.value.click);
};

// 更新组件的值 value
const handleUpdataValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<style lang="scss" scoped>
.color-select {
  position: relative;
  .color-show {
    width: 60px;
    height: 30px;
    border-radius: 4px;
    background-color: #e9e7ec;
    padding: 5px;
    cursor: pointer;
    @extend .d-flex;
    align-items: center;
    justify-content: center;
    div {
      width: 50px;
      height: 20px;
      background-color: v-bind(modelValue);
    }
  }
  .color-input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>
