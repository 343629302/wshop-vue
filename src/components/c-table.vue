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

<script>
import { watch, reactive, toRefs, onMounted } from 'vue';
export default {
  props: {
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
  },
  setup(props) {
    const state = reactive({
      tableList: [],
      columns: [],
      slotColumns: [],
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
      },
    };

    onMounted(() => {
      if (props?.request?.NoMounted && props?.request?.url) {
        this.getTableList();
      }
      if (!props?.request?.url) {
        initDataWatch();
      }
    });

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
          state.tableList = val;
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
      state.columns = ars;
      state.slotColumns = slots;
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

    return {
      ...toRefs(state),
      rowSelection,
    };
  },
};
</script>

<style lang="scss">
.ant-table {
  border-radius: 10px;
  border: 1px solid #e3e2e5;
  overflow: hidden;
}
</style>
