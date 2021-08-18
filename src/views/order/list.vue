<template>
  <a-layout>
    <div class="scroll-box">
      <div class="public-page bg-white">
        <div class="page-name">
          <span class="name">订单列表</span>
        </div>
        <div class="page-bg-gray">
          <div class="page-search-content">
            <div class="d1"></div>
            <div class="d2">
              <a-input-search
                placeholder="请输入订单单号"
                enter-button="搜索"
                @search="getTableList"
              />
            </div>
          </div>
          <div class="page-table-content">
            <c-table
              :columns="tableOpt.columns"
              :data="tableOpt.data"
              rowKey="id"
              :pagination="false"
              isSelect
            >
              <template v-slot:price="{ record }">
                <div>
                  <span>¥{{ record.price }}</span>
                </div>
              </template>
            </c-table>
          </div>
        </div>
      </div>
    </div>
    <a-layout-footer>
      <c-pagination
        v-model="tableOpt.search.page"
        :dataTotal="tableOpt.total"
      ></c-pagination>
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import { reactive } from "vue";
import useCommonHooks from "@/hooks/useCommonHooks";

const tableOpt = reactive({
  columns: [
    {
      title: "商品信息",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "实收金额",
      dataIndex: "price",
      key: "price",
      slots: { customRender: "price" },
    },
    {
      title: "客户信息",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "订单状态",
      dataIndex: "status",
      key: "status",
    },
  ],
  data: [
    {
      id: 0,
      price: "1000",
      customer: "梁先生",
      status: "已下单",
      name: "商品A",
    },
    {
      id: 1,
      price: "1000",
      customer: "梁先生",
      status: "已下单",
      name: "商品A",
    },
    {
      id: 2,
      price: "1000",
      customer: "梁先生",
      status: "已下单",
      name: "商品A",
    },
    {
      id: 3,
      price: "1000",
      customer: "梁先生",
      status: "已下单",
      name: "商品A",
    },
  ],
  search: {
    page: 1,
  },
  total: 10,
});
const { jumpToPage } = useCommonHooks();

//获取页面列表
const getTableList = () => {
  console.log(tableOpt.data[0]);
};

//编辑商品
const handleEdit = (item) => {};
</script>

<style lang="scss" scoped>
.goods-status {
  > span {
    padding-right: 10px;
    font-size: 12px;
  }
}
</style>
