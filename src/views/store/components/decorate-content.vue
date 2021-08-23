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
            :class="{ active: componentActive === index }"
            @click="
              handleEmitFormChange(element.id, index, element.key, element.form)
            "
          >
            <component
              :is="element.instance"
              :form="element.form"
              :key="element.id"
            />

            <div class="affter-box" v-if="componentActive === index">
              <span>{{ element.instanceName }}</span>
              <c-icon
                type="delete-one"
                theme="filled"
                fill="#b0b0ba"
                size="14"
                @click="handleDeleteItem(index)"
              ></c-icon>
            </div>
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw, nextTick } from 'vue';
import Draggable from 'vuedraggable';
import DecorateSearch from './decorate-component/search.vue';
import DecorateImage from './decorate-component/image.vue';
import emitter from 'tiny-emitter/instance';
import { v4 } from 'uuid';

const componentList = ref([]);
const componentActive = ref(-1);

const getComponentInstance = (key) => {
  let instance = null;
  switch (key) {
    case 'search':
      instance = DecorateSearch;
      break;
    case 'image':
      instance = DecorateImage;
  }
  return markRaw(instance);
};

//初始化监听
const initEventBus = () => {
  emitter.on('decorate-form-change', (value) => {
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
    emitter.emit('decorate-component-change', id, key, form);
  });
};

//删除组件
const handleDeleteItem = (index) => {
  componentList.value.splice(index, 1);
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
      > li {
        position: relative;
        border: 2px solid transparent;
        cursor: pointer;
        &:hover {
          border-color: #2589ff;
        }
        &.active {
          border-color: #2589ff;
          box-shadow: 0 1px 25px 2px rgb(50 59 77 / 50%);
        }
        > .affter-box {
          position: absolute;
          top: 0px;
          right: -20px;
          padding: 0px 10px;
          height: 30px;
          transform: translateX(100%);
          background-color: #fff;
          box-shadow: 0 0 20px 0 rgb(0 0 0 / 10%);
          border-radius: 4px;
          @extend .d-flex;
          font-size: 12px;
          > .i-icon {
            margin-left: 15px;
            cursor: pointer;
          }
        }
      }
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
