<template>
  <div class="upload-image">
    <ul>
      <li v-for="(item, index) in imageList" :key="index"></li>
      <li class="add-image" @click="handleImageGalleryShow">
        <i class="icon-tianjiajiahaowubiankuang iconfont"></i>
      </li>
    </ul>

    <image-gallery v-model:visible="imageGalleryShow"></image-gallery>
  </div>
</template>

<script>
import { toRefs, reactive } from 'vue';
import imageGallery from './image-gallery.vue';
export default {
  components: { imageGallery },
  props: {
    maxLength: {
      type: Number,
      default: 10,
    },
  },
  setup() {
    const state = reactive({
      imageList: [],
      imageGalleryShow: false,
      imageGalleryLength: 1,
    });

    //图片选择器显示
    const handleImageGalleryShow = () => {
      state.imageGalleryShow = true;
    };

    return {
      ...toRefs(state),
      handleImageGalleryShow,
    };
  },
};
</script>

<style lang="scss" scoped>
.upload-image {
  ul {
    li {
      width: 80px;
      height: 80px;
      border: 1px solid #ededed;
      margin-right: 10px;
      @extend .d-flex;
      justify-content: center;
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
