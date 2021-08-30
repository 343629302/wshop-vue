<template>
  <div class="form-search decorate-form-public-warpper">
    <div class="form-title">搜索</div>
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
      <a-tab-pane key="2" tab="样式设置">
        <div class="setting-block">
          <div class="block-title">内容样式</div>
          <div class="block-item">
            <span class="block-item-title">搜索栏样式</span>
            <a-radio-group v-model:value="form.style" button-style="solid">
              <a-radio-button value="outline">描边</a-radio-button>
              <a-radio-button value="fill">填充</a-radio-button>
            </a-radio-group>
          </div>
          <div class="block-item" v-show="form.style === 'outline'">
            <div class="block-item-title">
              <span>描边颜色</span>
              <span class="ml-lg">{{ form.outlineColor }}</span>
            </div>
            <div class="color-item">
              <a-button type="link" @click="form.outlineColor = '#595961'"
                >重置</a-button
              >
              <color-select v-model="form.outlineColor"></color-select>
            </div>
          </div>
          <div class="block-item">
            <div class="block-item-title">
              <span>背景颜色</span>
              <span class="ml-lg">{{ form.backgroundColor }}</span>
            </div>
            <div class="color-item">
              <a-button type="link" @click="form.backgroundColor = '#ffffff'"
                >重置</a-button
              >
              <color-select v-model="form.backgroundColor"></color-select>
            </div>
          </div>
          <div class="block-item">
            <span class="block-item-title">框体样式</span>
            <a-radio-group
              v-model:value="form.borderStyle"
              button-style="solid"
            >
              <a-radio-button value="round">圆角</a-radio-button>
              <a-radio-button value="square">方角</a-radio-button>
            </a-radio-group>
          </div>
          <div class="block-item">
            <span class="block-item-title">文本位置</span>
            <a-radio-group v-model:value="form.position" button-style="solid">
              <a-radio-button value="left">居左</a-radio-button>
              <a-radio-button value="center">居中</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div class="setting-block">
          <div class="block-title">组件样式</div>
          <div class="block-item">
            <div class="block-item-title">
              <span>上边距</span>
              <span class="ml-lg">{{ form.topPadding }}</span>
            </div>
            <a-radio-group v-model:value="form.topPadding" button-style="solid">
              <a-radio-button value="0px">小</a-radio-button>
              <a-radio-button value="15px">中</a-radio-button>
              <a-radio-button value="30px">大</a-radio-button>
            </a-radio-group>
          </div>
          <div class="block-item">
            <div class="block-item-title">
              <span>下边距</span>
              <span class="ml-lg">{{ form.bottomPadding }}</span>
            </div>
            <a-radio-group
              v-model:value="form.bottomPadding"
              button-style="solid"
            >
              <a-radio-button value="0px">小</a-radio-button>
              <a-radio-button value="15px">中</a-radio-button>
              <a-radio-button value="30px">大</a-radio-button>
            </a-radio-group>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import ColorSelect from "@/components/color-select.vue";

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
  style: "outline",
  outlineColor: "#595961",
  backgroundColor: "#ffffff",
  borderStyle: "round",
  position: "left",
  topPadding: "0px",
  bottomPadding: "0px",
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
