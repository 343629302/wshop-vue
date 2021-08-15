<template>
  <div class="upload-image">
    <ul>
      <li v-for="(item, index) in imageList" :key="index">
        <img :src="item" alt="" />
        <div class="replace" @click="handleImageGalleryShow(index)">替换</div>
        <div class="delete" @click="handleDeleteImage(index)">
          <i class="iconfont icon-guanbi"></i>
        </div>
      </li>
      <li
        class="add-image"
        @click="handleImageGalleryShow()"
        v-show="imageList.length < maxLength"
      >
        <i class="icon-tianjiajiahaowubiankuang iconfont"></i>
      </li>
    </ul>

    <image-gallery
      v-model:visible="imageGalleryShow"
      :maxLength="maxLength"
      @handleSelectConfirm="handleSelectConfirm"
      ref="galleryRef"
    ></image-gallery>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import ImageGallery from './image-gallery.vue';

const props = defineProps({
  maxLength: {
    type: Number,
    default: 10,
  },
  modelValue: {
    type: [String, Array],
    default: () => [],
  },
});
const emit = defineEmits();

const imageList = ref([]);
const imageGalleryShow = ref(false);
const editImageIndex = ref(-1);
const galleryRef = ref(null);

//图片选择器显示
const handleImageGalleryShow = (editIndex) => {
  imageGalleryShow.value = true;
  if (typeof editIndex === 'number') {
    editImageIndex.value = editIndex;
    galleryRef.value.handleEditChange();
  } else {
    editImageIndex.value = -1;
  }
};

//确认选择图片
const handleSelectConfirm = (images) => {
  imageGalleryShow.value = false;
  const editIndex = editImageIndex.value;
  if (editIndex === -1) {
    //非编辑状态
    let value = images;
    if (props.maxLength === 1) {
      imageList.value = [];
      value = images[0];
    }
    emit('update:modelValue', [].concat(imageList.value, value));
  } else if (editIndex !== -1 && images.length) {
    //编辑状态
    const value = imageList.value;
    value.splice(editIndex, 1, images[0]);
    emit('update:modelValue', value);
  }
};

//删除图片
const handleDeleteImage = (index) => {
  let value = '';
  if (props.maxLength > 1) {
    value = imageList.value;
    value.splice(index, 1);
  }
  emit('update:modelValue', value);
};

//监听图片列表
watch(
  () => props.modelValue,
  (val) => {
    if (val && val.length) {
      if (typeof val === 'string') {
        imageList.value = [val];
      } else {
        imageList.value = val;
      }
    } else {
      imageList.value = [];
    }
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.upload-image {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 90px;
      height: 90px;
      border: 1px solid #ededed;
      margin-right: 10px;
      margin-bottom: 10px;
      @extend .d-flex;
      justify-content: center;
      position: relative;
      &:hover {
        .replace {
          display: flex;
        }
        .delete {
          display: block;
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
      .delete {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 50%;
        cursor: pointer;
        display: none;
        width: 20px;
        height: 20px;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        text-align: center;
        line-height: 20px;
        i {
          color: #fff;
          font-size: 11px;
        }
      }
      .replace {
        position: absolute;
        display: none;
        bottom: 0px;
        left: 0px;
        height: 24px;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        width: 100%;
        font-size: 12px;
        cursor: pointer;
      }
      &.add-image {
        border: 1px dashed #ededed;
        cursor: pointer;
        i {
          font-size: 30px;
          color: #dad9d9;
        }
      }
    }
  }
}
</style>
