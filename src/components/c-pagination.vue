<template>
  <div class="c-pagination-warpper">
    <div class="data-info">共{{ dataTotal }}条，当前为第{{ modelValue }}页</div>
    <a-pagination
      :current="modelValue"
      :total="dataTotal"
      show-less-items
      @change="handlePageChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
    dataTotal: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const handlePageChange = (page) => {
      if (page != props.modelValue) {
        emit('update:modelValue', page);
        emit('change', page);
      }
    };
    return {
      handlePageChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.c-pagination-warpper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 60px;
  padding: 0px 15px;
  background: #fff;
  box-shadow: 0 0 4px hsl(0deg 0% 78% / 40%);
  .data-info {
    font-size: 12px;
    color: rgb(89, 89, 97);
  }
}
</style>
