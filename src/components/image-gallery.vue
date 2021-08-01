<template>
  <a-modal title="图片选择器" width="790px" centered>
    <div class="image-gallery">
      <div class="classify-list">
        <ul>
          <li
            v-for="item in groupList"
            :key="item.id"
            :class="{ active: activeGroup === item.id }"
            @click="handleActiveChange(item.id)"
          >
            <span>{{ item.name }}</span>
          </li>
        </ul>

        <a-button type="dashed" @click="handleAddGroupShow"> 新建文件夹 </a-button>
      </div>
    </div>

    <a-modal
      title="创建分组"
      width="200px"
      centered
      v-model:visible="addGroupShow"
      zIndex="1002"
    >
    222
    </a-modal>
  </a-modal>
</template>

<script>
import { toRefs, reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      groupList: [
        {
          id: 0,
          name: '全部',
        },
        {
          id: 1,
          name: '未分组',
        },
      ],
      activeGroup: 0,
      addGroupShow: false,
    });

    //点击分组触发
    const handleActiveChange = (id) => {
      state.activeGroup = id;
    };

    //显示添加分组弹窗
    const handleAddGroupShow = () => {
      state.addGroupShow = true;
    }

    return {
      ...toRefs(state),
      handleActiveChange,
      handleAddGroupShow
    };
  },
};
</script>

<style lang="scss" scoped>
.image-gallery {
  height: 500px;
  display: flex;
  .classify-list {
    width: 160px;
    border-right: 1px solid $border-color;
    display: flex;
    flex-direction: column;
    ul {
      flex: 1;
      height: 0;
      li {
        height: 32px;
        line-height: 32px;
        @extend .text-ellipsis;
        cursor: pointer;
        font-size: 12px;
        border-radius: 5px;
        padding: 0 8px;
        margin-right: 10px;
        &.active {
          background-color: rgba(71, 156, 247, 0.1);
          color: #479cf7;
        }
      }
    }
    > .ant-btn {
      margin-right: 10px;
    }
  }
}
</style>
