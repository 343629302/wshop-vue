<template>
  <component
    :is="activeFormComponent"
    :initForm="form"
    :key="activeFormKey"
    @formChange="handleFormChange"
  />
</template>

<script setup>
import { ref, shallowRef } from "vue";
import emitter from "tiny-emitter/instance";
import Search from "./search.vue";

const activeFormComponent = shallowRef(null);
const activeFormKey = ref(null);
const form = ref({});

//初始化监听
const initEventBus = () => {
  emitter.on("decorate-component-change", (id, key, value) => {
    form.value = JSON.parse(JSON.stringify(value));
    activeFormKey.value = id;
    getComponentInstance(key);
  });
};

//获取表单实例
const getComponentInstance = (key) => {
  let instance = null;
  switch (key) {
    case "search":
      instance = Search;
      break;
  }
  activeFormComponent.value = instance;
};

//表单改变触发
const handleFormChange = (value) => {
  const form = JSON.parse(JSON.stringify(value));
  emitter.emit("decorate-form-change", form);
};

initEventBus();
</script>