<template>
  <div class="form-image decorate-form-public-warpper">
    <div class="form-title">图片</div>
    <div class="tab-style">
      <a-radio-group
        v-model:value="form.style"
        button-style="solid"
        @change="handleImageStyleChange"
      >
        <a-radio-button
          :value="item.key"
          v-for="(item, index) in styleList"
          :key="index"
          class="style-item"
        >
          <img :src="item.normalImage" alt="" v-show="form.style != item.key" />
          <img
            :src="item.activeImage"
            alt=""
            v-show="form.style === item.key"
          />
        </a-radio-button>
      </a-radio-group>
    </div>
    <a-tabs v-model:activeKey="activeKey" class="decorate-form-tabs">
      <a-tab-pane key="1" tab="内容设置">
        <div class="image-list">
          <div class="top-text">
            添加图片（最多{{ form.style === "vertical" ? 10 : 4 }}张，可拖动排序
          </div>
          <ul>
            <li v-for="(item, index) in form.imgs" :key="index">
              <div class="item-title">
                <span>图片{{ index + 1 }}</span>
                <a-button type="link" @click="handleImageDelete(index)">
                  删除
                </a-button>
              </div>
              <div class="item-content">
                <div class="content-left">
                  <div>
                    <span>图片</span>
                    <span class="image-name">{{ item.imageName }}</span>
                  </div>
                  <div>
                    <span>链接</span>
                    <a-button type="link">{{
                      item.linkName ? item.linkName : "请选择跳转链接"
                    }}</a-button>
                  </div>
                </div>
                <div class="content-right">
                  <div class="image-box" @click="handleReplaceImage(index)">
                    <img :src="item.image" alt="" />
                    <div class="size-info">
                      {{ item.imageWidth }} * {{ item.imageHeight }}
                    </div>
                    <div class="replace-btn">
                      <div>替换</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div
            class="add-image-btn"
            @click="imageGalleryShow = true"
            v-show="canFillImageLength != 0"
          >
            <i class="icon-tianjiajiahaowubiankuang iconfont"></i>
            <span>添加照片</span>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="样式设置"></a-tab-pane>
    </a-tabs>

    <image-gallery
      v-model:visible="imageGalleryShow"
      :maxLength="canFillImageLength"
      @handleSelectConfirm="handleImageSelectConfirm"
      @handleSelectCancel="replaceImageIndex = -1"
      :isInfo="true"
      ref="imageGalleryRef"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from "vue";
import ImageGallery from "@/components/image-gallery.vue";
const props = defineProps({
  initForm: {
    type: Object,
    default: () => {},
  },
});
const styleList = [
  {
    activeImage: "src/assets/store/image_shu_tile_active.png",
    normalImage: "src/assets/store/image_shu_tile_normal.png",
    key: "vertical",
  },
  {
    activeImage: "src/assets/store/image_heng_tile_active.png",
    normalImage: "src/assets/store/image_heng_tile_normal.png",
    key: "across",
  },
];
const activeKey = ref("1");
const imageGalleryShow = ref(false);
const form = reactive({});
const localInitForm = {
  style: "vertical",
  imgs: [],
};
const imageGalleryRef = ref();
const canFillImageLength = computed(() => {
  const imageTotalLength = form.style === "vertical" ? 10 : 4;
  return imageTotalLength - form.imgs.length;
});
const replaceImageIndex = ref(-1);

//初始化
const init = () => {
  if (Object.keys(props.initForm).length) {
    Object.assign(form, props.initForm);
  } else {
    Object.assign(form, localInitForm);
  }
};

//选择图片确认
const handleImageSelectConfirm = (images) => {
  const replaceIndex = replaceImageIndex.value;
  //如果存在替换索引，则替换，否则就新增
  if (replaceIndex === -1) {
    const tem = images.map((item) => {
      return {
        imageName: item.name,
        imageWidth: item.width,
        imageHeight: item.height,
        image: item.url,
        link: "",
        linkName: "",
      };
    });
    form.imgs.push(...tem);
  } else {
    const item = images[0];
    form.imgs[replaceIndex] = {
      imageName: item.name,
      imageWidth: item.width,
      imageHeight: item.height,
      image: item.url,
      link: "",
      linkName: "",
    };
    replaceImageIndex.value = -1;
  }
  imageGalleryShow.value = false;
};

//图片模块风格改变触发
const handleImageStyleChange = () => {
  if (form.style === "across") {
    const ars = [].concat(form.imgs).splice(0, 4);
    form.imgs = ars;
  }
};

//替换图片
const handleReplaceImage = (index) => {
  replaceImageIndex.value = index;
  imageGalleryShow.value = true;
  nextTick(() => {
    imageGalleryRef.value.handleEditChange();
  });
};

//删除图片
const handleImageDelete = (index) => {
  form.imgs.splice(index, 1);
};

init();
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";
.image-list {
  height: 100%;
  overflow-y: scroll;
  > .top-text {
    font-size: 14px;
    color: #9797a1;
    margin: 15px 0px;
    text-align: center;
  }
  > ul {
    li {
      padding: 15px 10px 20px;
      border-radius: 4px;
      margin-bottom: 10px;
      min-height: 100px;
      background: #f0f2f5;
      .item-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > span {
          font-size: 14px;
          font-weight: bold;
        }
      }
      .item-content {
        @extend .d-flex;
        justify-content: space-between;
        .content-left {
          .image-name {
            padding: 4px 15px;
          }
        }
        .content-right {
          .image-box {
            width: 70px;
            height: 70px;
            cursor: pointer;
            border-radius: 5px;
            overflow: hidden;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .size-info {
              position: absolute;
              bottom: 0;
              left: 0;
              color: #fff;
              height: 26px;
              line-height: 26px;
              text-align: center;
              width: 100%;
              background-color: rgba(0, 0, 0, 0.6);
              font-size: 12px;
            }
            &:hover {
              .replace-btn {
                display: flex;
              }
            }
            .replace-btn {
              background-color: rgba(0, 0, 0, 0.3);
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              align-items: center;
              justify-content: center;
              z-index: 2;
              display: flex;
              position: absolute;
              display: none;
              div {
                width: 60px;
                height: 30px;
                background-color: #fff;
                font-size: 12px;
                border-radius: 4px;
                line-height: 30px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
  .add-image-btn {
    background-color: #fff;
    color: $theme-color;
    border-color: #fff;
    height: 40px;
    width: 100%;
    @extend .d-flex;
    justify-content: center;
    cursor: pointer;
    i {
      font-size: 14px;
      padding-right: 10px;
    }
  }
}
</style>
