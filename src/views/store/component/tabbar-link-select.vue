<template>
  <a-modal @ok="handleLinkSelectConfirm">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane
        v-for="(item, index) in linkList"
        :key="index"
        :tab="item.title"
      >
        <ul class="link-list">
          <li>
            <div class="title">页面名称</div>
            <div class="operation">操作</div>
          </li>
          <li v-for="linkItem in item.list" :key="linkItem.id">
            <div class="title">
              {{ linkItem.name }}
            </div>
            <div class="operation">
              <span
                v-if="
                  (item.code === 'function' && linkItem.path === activeLink) ||
                  (item.code === 'custom' && linkItem.id === activeLink)
                "
                >已选</span
              >
              <a-button type="link" v-else @click="handleLinkSelect(linkItem)"
                >选择链接</a-button
              >
            </div>
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
import { reactive, toRefs } from 'vue';
export default {
  props: {
    activeLink: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      activeKey: 0,
      activeLinkItem: {},
      linkList: [
        {
          title: '功能页面',
          code: 'function',
          list: [
            {
              name: '分类页',
              path: '/pages/tab/classify',
            },
            {
              name: '购物车',
              path: '/pages/tab/car',
            },
            {
              name: '用户中心',
              path: '/pages/tab/user',
            },
          ],
        },
        {
          title: '装修页面',
          code: 'custom',
          list: [
            {
              id: 0,
              name: '装修1',
            },
            {
              id: 1,
              name: '装修2',
            },
            {
              id: 2,
              name: '胡花花花怙',
            },
          ],
        },
      ],
    });

    //选择链接
    const handleLinkSelect = (item) => {
      state.activeLinkItem = item;
      let link = '';
      if (item.path) {
        link = item.path;
      } else {
        link = item.id;
      }
      emit('update:activeLink', link);
    };

    //确认选择链接
    const handleLinkSelectConfirm = () => {
      if (Object.keys(state.activeLinkItem).length) {
        let tem = {};
        if (state.activeLinkItem.path) {
          tem = {
            code: 'function',
            path: state.activeLinkItem.path,
            name: state.activeLinkItem.name,
          };
        } else {
          tem = {
            code: 'custom',
            path: state.activeLinkItem.id,
            name: `装修页面 - ${state.activeLinkItem.name}`,
          };
        }
        emit('confirm', tem);
      }
    };

    return {
      ...toRefs(state),
      handleLinkSelect,
      handleLinkSelectConfirm,
    };
  },
};
</script>

<style lang="scss" scoped>
.ant-tabs-line {
  ::v-deep(.ant-tabs-bar) {
    border: none;
  }
}
.link-list {
  border-radius: 10px;
  border: 1px solid #e3e2e5;
  li {
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 13px;
    &:not(:nth-last-of-type(1)) {
      border-bottom: 1px solid #e3e2e5;
    }
    .title {
      flex: 1;
      padding-left: 15px;
    }
    .operation {
      width: 100px;
      > span {
        color: $theme-color;
      }
      button {
        padding: 0;
        color: #595961;
        &:hover {
          color: $theme-color;
        }
      }
    }
  }
}
</style>
