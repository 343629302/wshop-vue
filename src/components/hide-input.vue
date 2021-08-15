<template>
  <div>
    <a-input
      v-if="inputShow"
      :value="modelValue"
      @blur="handleInputHide"
      @input="handleInputChange"
      ref="inputRef"
      size="small"
      :type="type"
    />
    <div v-else @click="handleInputShow" class="hide-text">
      {{ modelValue }}
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
const props = defineProps({
  modelValue: {
    type: [String, Number, undefined],
    default: undefined,
  },
  type: {
    type: String,
    default: 'text',
  },
});
const emit = defineEmits();
const inputShow = ref(false);
const inputRef = ref(null);

//显示输入框
const handleInputShow = () => {
  inputShow.value = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};

//隐藏输入框
const handleInputHide = () => {
  inputShow.value = false;
  if (props.modelValue == '') {
    emit('update:modelValue', 0);
  }
};

//监听输入框改变触发
const handleInputChange = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<style lang="scss" scoped>
.hide-text {
  height: 32px;
  line-height: 32px;
}
</style>
