<template>
  <a-layout>
    <div class="scroll-box">
      <div class="public-page bg-white">
        <div class="page-name">
          <span class="name">客户列表</span>
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
              <template v-slot:name="{ record }">
                <div class="d-flex">
                  <c-avatar />
                  <span class="ml-md">{{ record.name }}</span>
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
      title: "客户信息",
      dataIndex: "name",
      key: "name",
      slots: { customRender: "name" },
    },
    {
      title: "成为客户时间",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "最近消费时间",
      dataIndex: "consumeDate",
      key: "consumeDate",
      slots: {
        customRender: "consumeDate",
        format: (event) => {
          return event.consumeDate || "--";
        },
      },
    },
    {
      title: "消费金额",
      dataIndex: "consumePrice",
      key: "consumePrice",
    },
  ],
  data: [
    {
      id: 0,
      consumePrice: "1000",
      name: "梁先生",
      consumeDate: "2020-08-20 10:20:00",
      date: "2020-08-20 10:20:00",
    },
    {
      id: 1,
      consumePrice: "1000",
      name: "梁先生",
      consumeDate: "2020-08-20 10:20:00",
      date: "2020-08-20 10:20:00",
    },
    {
      id: 2,
      consumePrice: "0",
      name: "梁先生",
      consumeDate: "",
      date: "2020-08-20 10:20:00",
    },
    {
      id: 3,
      consumePrice: "0",
      name: "梁先生",
      consumeDate: "",
      date: "2020-08-20 10:20:00",
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