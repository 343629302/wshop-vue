<template>
  <a-table
    :data-source="tableList"
    :columns="columns"
    :row-selection="isSelect ? rowSelection : null"
  >
    <template v-for="item in slotColumns" v-slot:[item]="slotProps">
      <slot
        :name="item"
        v-bind="{ record: slotProps.record, props: slotProps }"
      ></slot>
    </template>
  </a-table>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue';
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
      slots.push(item.slots.customRender);
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
