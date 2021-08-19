<template>
  <a-table
    :data-source="tableList"
    :columns="columns"
    :row-selection="isSelect ? rowSelection : null"
  >
    <template
      v-for="item in slotColumns"
      v-slot:[item.name]="slotProps"
      :key="item.name"
    >
      <slot
        :name="item.name"
        v-bind="{ record: slotProps.record, props: slotProps }"
        v-if="item.key === 'custom'"
      ></slot>

      <span v-else>{{ item.callback(slotProps.record) }}</span>
    </template>
  </a-table>
</template>

<script setup>
import { watch, ref, onMounted } from "vue";
const props = defineProps({
  request: {
    type: Object,
    default: () => {},
  },
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  isSelect: {
    type: Boolean,
    default: false,
  },
  selectList: {
    type: Array,
    default: () => [],
  },
});
const tableList = ref([]);
const columns = ref([]);
const slotColumns = ref([]);
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(selectedRowKeys, selectedRows);
  },
};

//初始化
const init = () => {
  initColumns();
};

//启动数据监听
const initDataWatch = () => {
  //监听表格数据变化
  watch(
    () => props.data,
    (val) => {
      if (props?.request?.url || props.columns.length === 0) return;
      tableList.value = val;
    },
    {
      immediate: true,
    }
  );
};

//初始化表格配置
const initColumns = () => {
  const ars = [].concat(...props.columns);
  let slots = [];
  ars.forEach((item) => {
    if (item.slots && item.slots.customRender) {
      //判断是否格式方法，如果不是则使用自定义
      if (item.slots.format && typeof item.slots.format === "function") {
        slots.push({
          name: item.slots.customRender,
          key: "format",
          callback: item.slots.format,
        });
      } else {
        slots.push({
          name: item.slots.customRender,
          key: "custom",
        });
      }
    }
    if (item.ellipsis !== false) {
      item.ellipsis = true;
    }
  });
  columns.value = ars;
  slotColumns.value = slots;
};

//获取表格数据
const getTableList = () => {};

//监听表格配置变化
watch(
  () => props.data,
  () => {
    this.initColumns();
  }
);

init();

onMounted(() => {
  if (props?.request?.NoMounted && props?.request?.url) {
    this.getTableList();
  }
  if (!props?.request?.url) {
    initDataWatch();
  }
});
</script>

<style lang="scss">
.ant-table {
  border-radius: 10px;
  border: 1px solid #e3e2e5;
  overflow: hidden;
}
</style>
