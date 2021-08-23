<template>
  <a-collapse v-model:activeKey="activeKey" :bordered="false">
    <a-collapse-panel key="1" :showArrow="false">
      <template v-slot:header>
        <div class="panel-header">
          <span>基础组件</span>
          <c-icon type="down" fill="#595961" />
        </div>
      </template>
      <div class="panel-content">
        <draggable
          v-model="basicComponentList"
          tag="ul"
          item-key="key"
          :sort="false"
          :group="{
            name: 'decorate',
            pull: 'clone',
            put: false,
          }"
        >
          <template #item="{ element }">
            <li>
              <img :src="element.img" alt="" />
              <span>{{ element.name }}</span>
            </li>
          </template>
        </draggable>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup>
import { ref } from "vue";
import Draggable from "vuedraggable";
const activeKey = ref(["1", "2"]);
const basicComponentList = [
  {
    img: "src/assets/store/search.png",
    key: "search",
    name: "搜索",
  },
  {
    img: "src/assets/store/img.png",
    key: "image",
    name: "图片",
  },
  {
    img: "src/assets/store/advPlay.png",
    key: "slide",
    name: "轮播图",
  },
  {
    img: "src/assets/store/title.png",
    key: "title",
    name: "标题栏",
  },
  {
    img: "src/assets/store/goods.png",
    key: "goods",
    name: "商品",
  },
  {
    img: "src/assets/store/text.png",
    key: "text",
    name: "文本",
  },
  {
    img: "src/assets/store/sepPlaceHolder.png",
    key: "placeholder",
    name: "分割占位",
  },
  {
    img: "src/assets/store/imgTextNavi.png",
    key: "imgNav",
    name: "图文导航",
  },
  {
    img: "src/assets/store/classify.png",
    key: "classify",
    name: "商品分组",
  },
  // {
  //   img: "src/assets/store/storeHead.png",
  //   key: "storeHead",
  //   name: "店铺头部",
  // },
  {
    img: "src/assets/store/storeNotice.png",
    key: "storeNotice",
    name: "店铺公告",
  },
];
</script>

<style lang="scss" scoped>
.ant-collapse {
  height: 100%;
  overflow-y: auto;
  ::v-deep(.ant-collapse-item) {
    border: 0;
    .ant-collapse-header {
      padding: 0px;
      .panel-header {
        @extend .d-flex;
        padding: 0px 10px;
        justify-content: space-between;
        border-bottom: 1px solid #d9d9d9;
        height: 50px;
      }
    }
    .ant-collapse-content-box {
      padding: 4px 10px;
      .panel-content {
        ul {
          display: grid;
          grid-template-columns: repeat(3, 33.33%);
          grid-row-gap: 10px;
          li {
            width: 90px;
            height: 90px;
            @extend .d-flex;
            flex-direction: column;
            justify-content: center;
            background-color: #f8f9fa;
            > img {
              width: 74px;
            }
            > span{
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
.sortable-ghost {
  height: 45px;
  @extend .d-flex;
  justify-content: center;
  background-color: rgba(145,224,248,.3);
  > img {
    width: 45px;
  }
}
</style>