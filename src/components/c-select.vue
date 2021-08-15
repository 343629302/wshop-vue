<template>
  <a-select @change="handleSelectChange" :value="modelValue">
    <a-select-option
      :value="item[value]"
      v-for="item in columns"
      :key="item[value]"
    >
      {{ item[label] }}
    </a-select-option>
  </a-select>
</template>

<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  value: {
    type: String,
    default: 'value',
  },
  label: {
    type: String,
    default: 'label',
  },
  modelValue: {
    type: [Number, String, undefined],
    default: undefined,
  },
});
const emit = defineEmits();

//选择器修改时触发，反馈给父级
const handleSelectChange = (value) => {
  emit('change', value);
  emit('update:modelValue', value);
};
</script>
