<template>
  <div class="c-textarea">
    <a-textarea type="textarea" :maxLength="maxLength" v-bind="$attrs" />
    <span class="textarea-length">{{ $attrs.value.length }} / {{maxLength}}</span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    maxLength: {
      type: [Number,String],
      default: 50,
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.c-textarea {
  position: relative;
  .textarea-length {
    position: absolute;
    bottom: 2px;
    right: 2px;
    font-size: 12px;
    background-color: #fff;
    padding:1px 5px
  }
}
</style>
