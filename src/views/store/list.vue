<template>
  <a-layout>
    <div class="scroll-box">
      <div class="public-page bg-white">
        <div class="page-name">
          <span class="name">页面列表</span>
        </div>
        <div class="page-bg-gray">
          <div class="page-search-content">
            <div class="d1">
              <a-button class="default-primary mr-md w-90px">新增页面</a-button>
              <c-select
                class="mr-md w-90px"
                :columns="listStatus"
                value="id"
                label="name"
                v-model="tableOpt.search.status"
              ></c-select>
              <a-button class="w-90px">删除页面</a-button>
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
            >
              <template v-slot:action="{ record }">
                <div class="table-action">
                  <a @click="handleEdit(record)">编辑</a>
                  <a>发布</a>
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

<script>
import cSelect from '../../components/c-select.vue';
import { reactive, toRefs } from 'vue';
import CPagination from '../../components/c-pagination.vue';
export default {
  components: { cSelect, CPagination },
  setup() {
    const listStatus = [
      {
        id: 0,
        name: '全部状态',
      },
      {
        id: 1,
        name: '已发布',
      },
      {
        id: 2,
        name: '未发布',
      },
    ];

    const state = reactive({
      tableOpt: {
        columns: [
          {
            title: '页面名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '页面状态',
            dataIndex: 'status',
            key: 'status',
            customRender: (item) => {
              return item.text === 0 ? '未发布' : '已发布';
            },
          },
          {
            title: '最后保存时间',
            dataIndex: 'saveTime',
            key: 'saveTime',
          },
          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            slots: { customRender: 'action' },
          },
        ],
        search: {
          status: 0,
          page: 1,
        },
        data: [
          {
            id: 0,
            name: '页面1',
            status: 0,
            saveTime: '2020-01-01',
            endTime: '2020-01-01',
          },
          {
            id: 1,
            name: '页面2',
            status: 0,
            saveTime: '2020-01-01',
            endTime: '2020-01-01',
          },
          {
            id: 2,
            name: '页面3',
            status: 1,
            saveTime: '2020-01-01',
            endTime: '2020-01-01',
          },
        ],
        total: 3,
      },
    });

    //编辑页面
    const handleEdit = (item) => {
      console.log(item);
    };

    //获取页面列表
    const getTableList = () => {
      state.tableOpt.search.page = 1;
    };

    return {
      listStatus,
      getTableList,
      handleEdit,
      ...toRefs(state),
    };
  },
};
</script>
