<template>
  <a-layout>
    <div class="scroll-box">
      <div class="public-page bg-white">
        <div class="page-name">
          <span class="name">分类列表</span>
        </div>
        <div class="page-bg-gray">
          <div class="page-search-content">
            <div class="d1">
              <a-button
                class="default-primary mr-md w-90px"
                @click="handleEdit()"
                >新增分类</a-button
              >
            </div>
            <div class="d2">
              <a-input-search
                placeholder="请输入分类名称"
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
            >
              <template v-slot:action="{ record }">
                <div class="table-action">
                  <a @click="handleEdit(record)">编辑</a>
                  <a>删除</a>
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

    <category-edit
      v-model:visible="editOpt.show"
      :title="editOpt.title"
      :width="editOpt.width"
      ref="editRef"
      @editSuccess="editSuccess"
    />
  </a-layout>
</template>

<script setup>
import { nextTick, reactive, ref } from "vue";
import CategoryEdit from "./components/category-edit.vue";

const tableOpt = reactive({
  columns: [
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "商品数量",
      dataIndex: "goods",
      key: "goods",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      slots: { customRender: "action" },
    },
  ],
  data: [
    {
      id: 0,
      name: "分类1",
      goods: "100",
    },
    {
      id: 1,
      name: "分类2",
      goods: "100",
    },
    {
      id: 2,
      name: "分类3",
      goods: "100",
    },
    {
      id: 3,
      name: "分类4",
      goods: "100",
    },
  ],
  search: {
    page: 1,
  },
  total: 10,
});
const editOpt = reactive({
  show: false,
  title: "新增分类",
  width: "500px",
});
const editRef = ref();

//获取页面列表
const getTableList = () => {};

//编辑分类
const handleEdit = (item) => {
  editOpt.show = true;
  editOpt.title = item ? "编辑分类" : "新增分类";
  nextTick(() => {
    editRef.value.init(item);
  });
};

//修改/编辑成功
const editSuccess = () => {
  editOpt.show = false;
};

</script>

<style lang="scss" scoped>
.goods-status {
  > span {
    padding-right: 10px;
    font-size: 12px;
  }
}
</style>
