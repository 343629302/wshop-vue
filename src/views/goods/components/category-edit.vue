<template>
  <a-modal @ok="handleFormConfirm" @cancel="handleModalClose">
    <div class="win-warpper">
      <a-form
        :model="form"
        :label-col="{
          style: 'width:80px',
        }"
        :rules="rules"
        ref="formRef"
      >
        <a-form-item label="分类名称" name="name">
          <a-input v-model:value="form.name" />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup>
import { reactive, ref } from "vue";

const emit = defineEmits();
const form = reactive({ name: "" });
const rules = {
  name: [{ required: true, message: "请输入分类名称", trigger: "change" }],
};
const formRef = ref();

//初始化
const init = (item) => {
  if (item) {
    Object.assign(form, item);
  } else {
    Object.assign(form, { name: "" });
  }
};

//表单确认
const handleFormConfirm = async () => {
  formRef.value
    .validate()
    .then(() => {
      emit("editSuccess");
    })
    .catch(() => {});
};

//弹窗关闭触发
const handleModalClose = () => {
  formRef.value.resetFields();
};

defineExpose({
  init,
});
</script>

<style lang="scss" scoped>
.win-warpper {
  .ant-form {
    margin-top: 10px;
  }
}
</style>