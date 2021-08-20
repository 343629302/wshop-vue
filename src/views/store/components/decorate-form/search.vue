<template>
  <div class="form-search">
    <a-tabs v-model:activeKey="activeKey" class="decorate-form-tabs">
      <a-tab-pane key="1" tab="内容设置">
        <div class="setting-block">
          <div class="block-title">功能设置</div>
          <div class="block-item">
            <span class="block-item-title">预设内容</span>
            <a-input
              v-model:value="form.placeholder"
              placeholder="请输入预设内容"
              maxLength="9"
              :suffix="`${form.placeholder.length}/9`"
            />
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="样式设置" force-render
        >Content of Tab Pane 2</a-tab-pane
      >
    </a-tabs>
  </div>
</template>


<script setup>
import { ref, reactive, watch } from "vue";

const props = defineProps({
  initForm: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits();
const activeKey = ref("1");
const form = reactive({});
const localInitForm = {
  placeholder: "搜索你感兴趣的内容",
};

//初始化
const init = () => {
  if (Object.keys(props.initForm).length) {
    Object.assign(form, props.initForm);
  } else {
    Object.assign(form, localInitForm);
  }
};

//监听表单改变触发
watch(form, (val) => {
  emit("formChange", val);
});

init();
</script>


<style lang="scss" scoped>
@import "./styles/index.scss";
</style>

