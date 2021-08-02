<template>
  <div class="goods-edit-info">
    <div class="bg-white info-item">
      <div class="page-title">基础信息</div>
      <div class="page-form">
        <a-form
          :model="form"
          :label-col="{
            style: 'width:150px',
          }"
        >
          <a-form-item label="商品名称">
            <a-input
              v-model:value="form.name"
              placeholder="请输入商品名称"
              maxLength="40"
              :suffix="`${form.name.length}/40`"
              class="w-550px"
            />
          </a-form-item>

          <a-form-item label="副标题">
            <div class="w-550px">
              <c-textarea
                v-model:value="form.subhead"
                placeholder="请输入商品名称"
                type="textarea"
                maxLength="30"
                :auto-size="{ minRows: 4 }"
              />
            </div>
          </a-form-item>

          <a-form-item label="商品主图">
            <upload-image
              :maxLength="1"
              v-model="form.coverImage"
            ></upload-image>

            <div class="form-hint">
              作用于商城列表、分享头图；建议尺寸：750*750像素。
            </div>
          </a-form-item>

          <a-form-item label="商品轮播图">
            <upload-image
              :maxLength="10"
              v-model="form.swiperImage"
            ></upload-image>
            <div class="form-hint">
              作用于商品详情页顶部轮播；建议尺寸：750*750像素，轮播图可以拖拽图片调整顺序，最多上传10张（至少1张）
            </div>
          </a-form-item>

          <a-form-item label="分类">
            <div class="w-550px">
              <c-select
                value="id"
                label="name"
                :columns="classifyList"
                v-model="form.classify"
                placeholder="请选择分类"
                :allowClear="true"
              ></c-select>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>

    <div class="mt-lg bg-white info-item">
      <div class="page-title">价格库存</div>
      <div class="page-form">
        <a-form
          :model="form"
          :label-col="{
            style: 'width:150px',
          }"
        >
          <a-form-item label="规格类型">
            <a-radio-group name="radioGroup" v-model:value="form.type">
              <a-radio value="0">单规格商品</a-radio>
              <a-radio value="1">多规格商品</a-radio>
            </a-radio-group>
          </a-form-item>
          <div v-show="form.type === '0'">123</div>
          <div v-show="form.type === '1'">321</div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive } from 'vue';
import uploadImage from '@/components/upload-image.vue';
export default {
  components: {
    uploadImage,
  },
  setup() {
    const state = reactive({
      form: {
        name: '',
        subhead: '',
        swiperImage: [],
        type: '0',
      },
      classifyList: [
        {
          id: 0,
          name: '分类1',
        },
        {
          id: 1,
          name: '分类2',
        },
      ],
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.goods-edit-info {
  .info-item {
    border-radius: 5px;
    overflow: hidden;
  }
  .page-title {
    height: 50px;
    @extend .d-flex;
    padding: 0px 20px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }
  .page-form {
    margin-top: 25px;
  }
  .w-550px {
    width: 550px;
  }
  .form-hint {
    color: #999;
    font-size: 12px;
  }
}
</style>
