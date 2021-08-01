<template>
  <div class="goods-edit-info">
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
          <div class="w-550px">
              <upload-image></upload-image>
          </div>
        </a-form-item>
      </a-form>
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
      },
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.goods-edit-info {
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
}
</style>
