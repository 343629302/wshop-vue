<template>
  <a-modal
    title="图片选择器"
    width="790px"
    centered
    @cancel="handleModalCancel"
    @ok="handleSelectConfirm"
  >
    <div class="image-gallery">
      <div class="group-list">
        <ul>
          <li
            v-for="item in groupList"
            :key="item.id"
            :class="{ active: search.activeGroup === item.id }"
            @click="handleActiveChange(item.id)"
          >
            <span>{{ item.name }}</span>
          </li>
        </ul>

        <a-button type="dashed" @click="handleAddGroupShow">
          新建文件夹
        </a-button>
      </div>
      <div class="image-content">
        <div class="search-head">
          <div class="left">
            <a-input-search
              v-model:value="search.keyWord"
              placeholder="搜索图片名称"
              style="width: 200px"
              @search="getImageList"
            />
          </div>
          <div class="right">
            <span>大小不要超过20M</span>
            <a-upload
              name="file"
              :multiple="true"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleUploadChange"
              accept="image/*"
              :showUploadList="false"
            >
              <a-button type="primary">上传照片</a-button>
            </a-upload>
          </div>
        </div>
        <div class="image-list">
          <ul>
            <li
              v-for="item in imageList"
              :key="item.id"
              :class="{ select: checkIsSelect(item) }"
            >
              <div class="image" @click="handleSelectImage(item)">
                <img :src="item.url" alt="" />
                <div class="size">{{ item.width }} * {{ item.height }}</div>
                <div class="select-box">
                  <i class="icon-dui iconfont"></i>
                </div>
              </div>
              <div class="title">{{ item.name }}</div>
            </li>
          </ul>
        </div>
        <div class="image-page">
          <a-pagination
            v-model:current="search.pageNo"
            :total="50"
            show-less-items
          />
        </div>
      </div>
    </div>

    <a-modal
      title="创建分组"
      width="500px"
      centered
      v-model:visible="addGroupShow"
      :zIndex="1002"
      @ok="handleAddGroupConfirm"
    >
      <a-input
        v-model:value="groupName"
        placeholder="请输入分组名称"
        maxLength="10"
        :suffix="`${groupName.length}/10`"
      />
    </a-modal>
  </a-modal>
</template>

<script setup>
import { ref, reactive } from "vue";
const props = defineProps({
  maxLength: {
    type: Number,
    default: 10,
  },
  isInfo: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits();
const groupList = ref([
  {
    id: 0,
    name: "全部",
  },
  {
    id: 1,
    name: "未分组",
  },
]);
const addGroupShow = ref(false);
const groupName = ref("");
const search = reactive({
  activeGroup: 0,
  keyWord: "",
  pageNo: 1,
});
const imageList = ref([
  {
    id: 0,
    url: "https://img2.baidu.com/it/u=1271368579,724005262&fm=26&fmt=auto&gp=0.jpg",
    width: 200,
    height: 200,
    name: "1.png",
  },
  {
    id: 1,
    url: "https://img2.baidu.com/it/u=1271368579,724005262&fm=26&fmt=auto&gp=0.jpg",
    width: 200,
    height: 200,
    name: "1.png",
  },
  {
    id: 2,
    url: "https://img2.baidu.com/it/u=1271368579,724005262&fm=26&fmt=auto&gp=0.jpg",
    width: 200,
    height: 200,
    name: "1.png",
  },
  {
    id: 3,
    url: "https://img0.baidu.com/it/u=526718526,523325445&fm=26&fmt=auto&gp=0.jpg",
    width: 200,
    height: 200,
    name: "1.png",
  },
  {
    id: 4,
    url: "https://img2.baidu.com/it/u=1271368579,724005262&fm=26&fmt=auto&gp=0.jpg",
    width: 200,
    height: 200,
    name: "1.png",
  },
]);
const selectImageList = ref([]);
const edit = ref(false);

//点击分组触发
const handleActiveChange = (id) => {
  search.activeGroup = id;
};

//显示添加分组弹窗
const handleAddGroupShow = () => {
  groupName.value = "";
  addGroupShow.value = true;
};

//添加新分组
const handleAddGroupConfirm = () => {
  addGroupShow.value = false;
};

//获取图片列表
const getImageList = () => {};

//上传照片
const handleUploadChange = (event) => {
  console.log(event);
};

//选择图片
const handleSelectImage = (event) => {
  if (
    selectImageList.value.length >= props.maxLength ||
    (edit.value && selectImageList.value.length === 1)
  ) {
    selectImageList.value = [
      {
        id: event.id,
        url: event.url,
        name: event.name,
        width: event.width,
        height: event.height,
      },
    ];
  } else {
    const index = selectImageList.value.findIndex(
      (item) => item.id === event.id
    );
    if (index === -1) {
      selectImageList.value.push({
        id: event.id,
        url: event.url,
        name: event.name,
        width: event.width,
        height: event.height,
      });
    } else {
      selectImageList.value.splice(index, 1);
    }
  }
};

//检查是否已选
const checkIsSelect = (event) => {
  return selectImageList.value.find((item) => item.id === event.id);
};

//修改编辑状态
const handleEditChange = () => {
  edit.value = true;
};

//弹窗关闭触发
const handleModalCancel = () => {
  selectImageList.value = [];
  edit.value = false;
  emit("handleSelectCancel");
};

//确认选择图片
const handleSelectConfirm = () => {
  const image = props.isInfo
    ? selectImageList.value.map((item) => {
        return {
          name: item.name,
          url: item.url,
          width: item.width,
          height: item.height,
        };
      })
    : selectImageList.value.map((item) => item.url);
  emit("handleSelectConfirm", image);
  handleModalCancel();
};

defineExpose({
  handleEditChange,
});
</script>

<style lang="scss" scoped>
.image-gallery {
  height: 500px;
  display: flex;
  .group-list {
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
  .image-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 10px;
    .search-head {
      @extend .d-flex;
      justify-content: space-between;
      .right {
        > span {
          font-size: 12px;
          color: #999;
          padding-right: 10px;
        }
      }
    }
    .image-list {
      margin-top: 16px;
      flex: 1;
      height: 0;
      overflow: hidden;
      overflow-y: scroll;
      ul {
        @extend .d-flex;
        flex-wrap: wrap;
        li {
          margin-right: 10px;
          margin-bottom: 10px;
          position: relative;
          &:not(.select) {
            .image:hover {
              .size {
                display: flex;
              }
            }
          }
          &.select {
            .image {
              .select-box {
                display: block;
              }
            }
          }
          .image {
            width: 105px;
            height: 105px;
            overflow: hidden;
            position: relative;
            border-radius: 4px;
            flex-shrink: 0;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .select-box {
              position: absolute;
              display: none;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              text-align: center;
              color: #fff;
              line-height: 105px;
              i {
                font-size: 20px;
              }
            }
            .size {
              position: absolute;
              display: none;
              bottom: 0px;
              left: 0px;
              height: 24px;
              align-items: center;
              justify-content: center;
              background-color: rgba(0, 0, 0, 0.5);
              color: #fff;
              width: 100%;
              font-size: 12px;
            }
          }
        }
      }
    }
    .image-page {
      margin-top: 16px;
      text-align: right;
    }
  }
}
</style>
