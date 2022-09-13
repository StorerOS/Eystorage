<template>
  <el-dialog
    :visible.sync="visible"
    :before-close="closeDialog"
    destroy-on-close
    :append-to-body="true"
  >
    <div class="content__title">{{ title }}</div>
    <div class="content__text">{{ content }}</div>
    <el-button type="primary" class="large-special-button operation-btn" @click.native.prevent="confirm">CONFIRM</el-button>
  </el-dialog>
</template>

<script>

export default {
  name: 'TipsDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    confirm() {
      this.closeDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  max-width: 600px;
  border-radius: $borderRadiusTopSmall;
  box-shadow: 0px 3px 12px 1px rgba(52, 208, 255, 0.55), inset 0px 3px 6px 1px rgba(52, 208, 255, 0.24);
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: $colorTextPrimary;
    font-weight: bold;
  }
  .el-dialog__body {
    padding: 42px 30px;
  }
}
.content {
  &__title {
    @include font-size-very-large;
    @include HeavyFontFamily;
    color: $colorTextPrimary;
    text-align: center;
  }
  &__text {
    @include font-size-ceil-large;
    @include mediumFontFamily;
    padding: 29px 5px 0;
    color: $colorTextPrimary;
  }
}
.operation-btn {
  width: 100%;
  margin-top: 27px;
}
</style>
