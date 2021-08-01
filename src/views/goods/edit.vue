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
  </a-layout>
</template>

<script>
import { toRefs, reactive } from 'vue';
import EditInfo from './components/edit-info.vue';
export default {
  components: { EditInfo },
  setup() {
    const state = reactive({
      activeTab: '1',
    });

    return {
      ...toRefs(state),
    };
  },
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
    .ant-tabs-tabpane,
    .ant-tabs-content {
      background-color: #fff;
      border-radius: 5px;
      overflow: hidden;
    }
  }
}
</style>
