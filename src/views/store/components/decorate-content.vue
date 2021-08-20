<template>
  <div class="scrollbar-container">
    <div class="module-mobile-content">
      <div class="page-header">
        <img src="src/assets/other-mobile-top.png" alt="" />
        <span>店铺名称</span>
      </div>
      <draggable
        v-model="componentList"
        tag="ul"
        item-key="key"
        class="page-component-list"
        :group="{
          name: 'decorate',
          pull: false,
        }"
        :onAdd="handleDragAdd"
      >
        <template #item="{ element, index }">
          <li
            @click="
              handleEmitFormChange(element.id, index, element.key, element.form)
            "
          >
            <!-- <img :src="element.img" alt="" /> -->
            <!-- <span>{{ element.name }}</span> -->
            <component
              :is="element.instance"
              :form="element.form"
              :key="element.id"
            />
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>


<script setup>
import { ref, markRaw, nextTick } from "vue";
import Draggable from "vuedraggable";
import Search from "./decorate-component/search.vue";
import emitter from "tiny-emitter/instance";
import { v4 } from "uuid";

const componentList = ref([]);
const componentActive = ref(-1);

const getComponentInstance = (key) => {
  let instance = null;
  switch (key) {
    case "search":
      instance = Search;
      break;
  }
  return markRaw(instance);
};

//初始化监听
const initEventBus = () => {
  emitter.on("decorate-form-change", (value) => {
    componentList.value[componentActive.value].form = value;
  });
};

//添加新组件触发
const handleDragAdd = (event) => {
  const index = event.newIndex;
  const item = componentList.value[index];
  const val = {
    instance: getComponentInstance(item.key),
    instanceName: item.name,
    key: item.key,
    form: {},
    id: v4(),
  };
  componentList.value.splice(index, 1, val);
  handleEmitFormChange(val.id, index, val.key, {});
};

//触发表单组件更换
const handleEmitFormChange = (id, index, key, form) => {
  componentActive.value = index;
  nextTick(() => {
    emitter.emit("decorate-component-change", id, key, form);
  });
};

initEventBus();
</script>

<style lang="scss" scoped>
.scrollbar-container {
  overflow-y: auto;
  height: 100%;
  .module-mobile-content {
    margin: 60px auto;
    width: 375px;
    background-color: #fff;
    box-shadow: 0 0 28px 0 #ccc;
    min-height: 667px;
    display: flex;
    flex-direction: column;
    .page-header {
      flex-shrink: 0;
      position: relative;
      > img {
        width: 100%;
      }
      span {
        width: 200px;
        font-size: 18px;
        font-weight: 600;
        color: #000;
        position: absolute;
        top: 32px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
      }
    }
    .page-component-list {
      flex: 1;
      height: 0;
    }
  }
}
.dragging-item {
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>