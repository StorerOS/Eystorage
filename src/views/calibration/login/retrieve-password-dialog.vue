<template>
  <el-dialog
    :visible.sync="visible"
    :before-close="closeDialog"
    destroy-on-close
    :append-to-body="true"
  >
    <div class="content__title">{{ $t('FormSubmit.RecoverYourPassword') }}</div>
    <div class="content__text">{{ $t('FormSubmit.EnterYourEmailAddress') }}.</div>
    <div class="content__form">
      <el-form ref="ruleForm" :model="form" :rules="formRules" class="form-container" auto-complete="on" label-position="left">
        <el-form-item prop="email">
          <div class="label-container">
            <svg-icon icon-class="email" />
            <span>{{ $t('FormSubmit.Email') }}</span>
          </div>
          <el-input
            ref="email"
            v-model="form.email"
            name="email"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-button type="primary" class="large-special-button operation-btn" :loading="loadingMixin.operation" @click.native.prevent="recoverPassword">{{ $t('FormSubmit.RECOVERPASSWORD') }}</el-button>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { formRules } from './utils'
import { loadingMixin } from '@/mixin'
import { sendEmail } from '@/api/user'

export default {
  name: 'RetrievePasswordDialog',
  mixins: [loadingMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {}
    }
  },
  computed: {
    formRules() {
      return formRules
    }
  },
  methods: {
    closeDialog() {
      this.form = {}
      this.$emit('update:visible', false)
    },
    recoverPassword() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return
        const queryParams = {
          ...this.form,
          email_type: 1
        }
        this.$_loadingMixin_start(async() => {
          await sendEmail(queryParams)
          this.$message.success(this.$t('FormSubmit.ResetPasswordEmailSent'))
          this.closeDialog()
        }, 'operation')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  max-width: 600px;
  border-radius: $borderRadiusTopSmall;
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
  &__form {
    margin-top: 46px;
    .label-container {
      display: flex;
      align-items: center;
      .svg-icon {
        font-size: $fontSizeMedium;
      }
      span {
        @include font-size-ceil-large;
        @include mediumFontFamily;
        margin-left: 17px;
        color: $colorTextPrimary;
      }
    }
    ::v-deep.el-input {
      margin-top: 14px;
      .el-input__inner {
        height: 50px;
        border-radius: $borderRadiusMedium;
      }
    }
  }
}
.operation-btn {
  width: 100%;
  margin-top: 5px;
}
</style>
