<template>
  <a-layout>
    <a-layout-header>
      <div class="d1"></div>
      <div class="d2">
        <a-button type="text">
          <c-icon type="config" theme="filled" size="20" fill="#b0b0ba" />
          <span>设置</span>
        </a-button>
        <a-button type="text">
          <c-icon type="save-one" theme="filled" size="20" fill="#b0b0ba" />
          <span>保存</span>
        </a-button>
        <a-button type="primary" class="issue">发布</a-button>
      </div>
    </a-layout-header>
    <a-layout-content>
      <div class="decorate-component">
        <decorate-component />
      </div>
      <div class="decorate-content">
        <decorate-content />
      </div>
      <div class="decorate-form">
        <decorate-form />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import DecorateComponent from "./components/decorate-component.vue";
import DecorateContent from "./components/decorate-content.vue";
import DecorateForm from "./components/decorate-form/index.vue";
</script>

<style lang="scss" scoped>
.ant-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .ant-layout-header {
    background: #f8f9fa;
    border-bottom: 1px solid #e9e7ec;
    height: 50px;
    box-shadow: 2px 6px 6px #eee;
    line-height: normal;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    justify-content: space-between;
    .d2 {
      @extend .d-flex;
      .ant-btn {
        margin-left: 10px;
        @extend .d-flex;
        justify-content: center;
        span {
          margin-left: 5px;
          font-size: 14px;
        }
        &.issue {
          width: 70px;
        }
      }
    }
  }
  .ant-layout-content {
    display: flex;
    .decorate-component {
      width: 320px;
      flex-shrink: 0;
      background: #f8f9fa;
    }
    .decorate-content {
      flex: 1;
      width: 0;
    }
    .decorate-form {
      width: 360px;
      flex-shrink: 0;
      background: #f8f9fa;
      padding:2px 0 2px 5px;
      height: 100%;
    }
  }
}
</style>