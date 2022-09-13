<template>
  <div class="content-container">
    <div class="bg-decoration">
      <svg-icon icon-class="line-decoration" />
    </div>
    <div class="content-main-container">
      <div class="content__title">{{ $t("FormSubmit.BindEmail") }}</div>
      <div class="content__info">{{ $t("FormSubmit.SendEmailTips") }}</div>
      <div class="content__main">
        <el-form
          ref="ruleForm"
          :model="form"
          :rules="formRules"
          class="form-container"
          auto-complete="on"
          label-position="left"
        >
          <el-form-item prop="email">
            <div class="label-container">
              <svg-icon icon-class="email" />
              <span>{{ $t("FormSubmit.Email") }}</span>
            </div>
            <el-input
              ref="email"
              v-model="form.email"
              name="email"
              tabindex="2"
              auto-complete="on"
            />
          </el-form-item>
          <el-button
            type="primary"
            class="large-special-button operation-btn"
            :loading="loadingMixin.operation"
            @click.native.prevent="recoverPassword"
          >{{ $t("FormSubmit.CONFIRM") }}</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { sendEmailCode } from '@/api/common'
import md5 from 'js-md5'
import { loadingMixin } from '@/mixin'
import { formRules } from './utils'
import { isReturnStatement } from '@babel/types'
export default {
  name: 'SetPassword',
  mixins: [loadingMixin],
  data() {
    return {
      form: {},
      formRules
    }
  },
  methods: {
    recoverPassword() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) isReturnStatement
        const queryParams = {
          email: this.form.email,
          type: 1
        }
        this.$_loadingMixin_start(async() => {
          await sendEmailCode(queryParams)
          this.$message.success(this.$t('AlertMsg.VerificationCodeMsg'))
          this.$router.push(`/bind/email/${this.form.email}`)
        }, 'operation')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

.content-container {
  padding-bottom: 93px;
}
.bg-decoration {
  height: 364px;
}
</style>
