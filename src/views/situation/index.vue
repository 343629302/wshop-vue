<template>
  <div class="situation-warpper flex-1">
    <div class="order bg-white">
      <ul>
        <li
          v-for="item in orderList"
          :key="item.title"
          class="flex items-center justify-center flex-col"
        >
          <span>{{ item.count }}</span>
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const orderList = ref([
  {
    title: "待付款订单",
    count: 0,
  },
  {
    title: "待发货订单",
    count: 0,
  },
  {
    title: "待处理售后",
    count: 0,
  },
  {
    title: "已售罄商品",
    count: 0,
  },
]);
</script>

<style lang="scss" scoped>
.situation-warpper {
  padding: 0px 10px;
  .order {
    margin-top: 10px;
    border-radius: 6px;
    box-shadow: 0 0 4px 0 rgb(200 200 200 / 50%);
    height: 190px;
    ul {
      display: flex;
      height: 100%;
      li {
        flex: 1;
        height: 100%;
        cursor: pointer;
        span:first-of-type {
          font-size: 22px;
          font-weight: 700;
          color: #2589ff;
        }
        span:last-of-type {
          font-weight: 700;
          font-size: 15px;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
