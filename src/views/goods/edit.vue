<template>
  <a-layout>
    <div class="scroll-box">
      <div class="public-page">
        <a-tabs v-model:activeKey="activeTab" :animated="false">
          <a-tab-pane key="1" tab="基础信息">
            <edit-info />
          </a-tab-pane>
          <a-tab-pane key="2" tab="产品详情"> 详情 </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <a-layout-footer>
      <div class="public-page-bottom">
        <a-button type="primary" @click="handleSaveConfirm()"> 保存 </a-button>
        <a-button class="ml-md" @click="handleSaveConfirm(activeTab)">{{
          activeTab == '1' ? '下一步' : '上一步'
        }}</a-button>
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import EditInfo from './components/edit-info.vue';

const activeTab = ref('1');

//保存表单
const handleSaveConfirm = (status) => {
  if (status) {
    activeTab.value = status === '1' ? '2' : '1';
  }
};
</script>

<style lang="scss" scoped>
.public-page {
  background-color: #f2f2f6;
  padding: 20px;
  ::v-deep(.ant-tabs) {
    .ant-tabs-top-bar {
      background-color: #fff;
      padding: 0px 30px;
      border-radius: 5px;
    }
  }
}
</style>
