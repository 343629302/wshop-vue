<template>
  <a-layout>
    <div class="scroll-box">
      <div class="public-page bg-white">
        <div class="page-name">
          <span class="name">商品列表</span>
        </div>
        <div class="page-bg-gray">
          <div class="page-search-content">
            <div class="d1">
              <a-button class="default-primary mr-md w-90px" @click="jumpToPage('goods-edit')">新增商品</a-button>
              <a-button class="mr-md w-90px">批量上架</a-button>
              <a-button class="w-90px">批量下架</a-button>
            </div>
            <div class="d2">
              <a-input-search
                placeholder="请输入页面名称"
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

              <template v-slot:status="{ record }">
                <div class="goods-status">
                  <span>{{ record.status == '0' ? '下架' : '上架' }}</span>
                  <a-switch
                    v-model:checked="record.status"
                    checkedValue="1"
                    unCheckedValue="0"
                  />
                </div>
              </template>

              <template v-slot:action="{ record }">
                <div class="table-action">
                  <a @click="handleEdit(record)">编辑</a>
                </div>
              </template>
            </c-table>
          </div>
        </div>
      </div>
    </div>
    <!-- <a-layout-footer>
      <c-pagination
        v-model="tableOpt.search.page"
        :dataTotal="tableOpt.total"
      ></c-pagination>
    </a-layout-footer> -->
  </a-layout>
</template>

<script>
import { toRefs, reactive } from 'vue';
import useCommonHooks from '@/hooks/useCommonHooks';
export default {
  setup() {
    const state = reactive({
      tableOpt: {
        columns: [
          {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            slots: { customRender: 'price' },
          },
          {
            title: '库存',
            dataIndex: 'stock',
            key: 'stock',
          },
          {
            title: '销量',
            dataIndex: 'sales',
            key: 'sales',
          },
          {
            title: '上下架时间',
            dataIndex: 'statusTime',
            key: 'statusTime',
          },
          {
            title: '上架状态',
            dataIndex: 'status',
            key: 'status',
            slots: { customRender: 'status' },
          },
          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            slots: { customRender: 'action' },
          },
        ],
        data: [
          {
            id: 0,
            status: '0',
            name: '商品1',
            price: '1000',
            statusTime: '2021-10-10 20:00:00',
            stock: 50,
            sales: 100,
          },
          {
            id: 1,
            status: '0',
            name: '商品2',
            price: '1000',
            statusTime: '2021-10-10 20:00:00',
            stock: 50,
            sales: 100,
          },
          {
            id: 2,
            status: '0',
            name: '商品3',
            price: '1000',
            statusTime: '2021-10-10 20:00:00',
            stock: 50,
            sales: 100,
          },
          {
            id: 3,
            status: '0',
            name: '商品4',
            price: '1000',
            statusTime: '2021-10-10 20:00:00',
            stock: 50,
            sales: 100,
          },
        ],
      },
    });
    
    //获取页面列表
    const getTableList = () => {
      console.log(state.tableOpt.data[0]);
    };

    const { jumpToPage } = useCommonHooks();

    return {
      getTableList,
      ...toRefs(state),
      jumpToPage
    };
  },
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
