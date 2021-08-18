<template>
  <div ref="editorRef" class="wangeditor"></div>
  <image-gallery
    v-model:visible="imageGalleryShow"
    :maxLength="99"
    @handleSelectConfirm="handleSelectConfirm"
  />
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import WangEditor from "wangeditor";
import xss from "xss";
import ImageGallery from "./image-gallery.vue";

const props = defineProps({
  height: {
    type: [Number, String],
    default: "300",
  },
  modelValue: {
    type: [String, Number, undefined],
    default: "",
  },
});
const emit = defineEmits();
const editorRef = ref();
const imageGalleryShow = ref(false);
const cxss = new xss.FilterXSS({
  onIgnoreTagAttr: (tag, name, value) => {
    if (name.substr(0, 5) === "style") {
      return name + '="' + xss.escapeAttrValue(value) + '"';
    }
  },
});
let instance = null;

const handleSelectConfirm = (images) => {
  imageGalleryShow.value = false;
  images.forEach((item) => {
    instance.cmd.do("insertHTML", `<img src="${item}" style="width:100%;"/>`);
  });
};

onMounted(() => {
  //创建实例
  instance = new WangEditor(editorRef.value);
  Object.assign(instance.config, {
    height: props.height,
    pasteIgnoreImg: true,
    placeholder: "",
    zIndex: 50,
    onchangeTimeout: 500,
    excludeMenus: [
      "head",
      "lineHeight",
      "list",
      "link",
      "todo",
      "emoticon",
      "quote",
      "video",
      "table",
      "code",
    ],
    showLinkImg: false,
    onchange(event) {
      emit("update:modelValue", cxss.process(event));
    },
    uploadImgFromMedia() {
      imageGalleryShow.value = true;
    },
  });
  instance.create();
  instance.txt.html(props.modelValue);
});

onBeforeUnmount(() => {
  //销毁实例
  instance.destroy();
  instance = null;
});
</script>