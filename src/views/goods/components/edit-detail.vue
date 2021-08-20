<template>
  <div class="goods-edit-detail">
    <div class="detail-operation">
      <div class="title">编辑详情</div>
      <div class="content">
        <editor height="608" v-model="form.detail" />
      </div>
    </div>
    <div class="detail-preview">
      <div class="title">商品详情预览</div>
      <div class="content show-content">
        <img src="src/assets/righttop.png" alt="" />
        <div v-html="form.detail"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Editor from "@/components/editor.vue";
import { reactive } from "vue";
const form = reactive({
  detail: "",
});

//返回表单
const handleGetForm = () => {
  return form;
};

//初始化
const init = (detail) => {
  if (detail) {
    form.detail = detail;
  }
};

defineExpose({
  handleGetForm,
  init,
});
</script>


<style lang="scss" scoped>
.goods-edit-detail {
  display: flex;
  > div {
    flex: 1;
    background-color: #fff;
    &.detail-operation {
      margin-right: 10px;
    }
    &.detail-preview {
      margin-left: 10px;
    }
    > .title {
      padding: 10px 20px;
      border-bottom: 1px solid #f2f2f2;
      font-weight: bold;
      font-size: 13px;
    }
    > .content {
      width: 375px;
      margin: 20px auto;
    }
    .show-content {
      border: 1px solid #dadada;
      height: 688px;
      display: flex;
      flex-direction: column;
      > img {
        width: 100%;
        flex-shrink: 0;
      }
      > div {
        flex: 1;
        height: 0;
        overflow-y: auto;
      }
    }
  }
}
</style>