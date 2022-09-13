<template>
  <div class="content-container">
    <div class="bg-decoration">
      <svg-icon icon-class="line-decoration" />
    </div>
    <div class="content-main-container">
      <div class="content__title">{{ $t('FormSubmit.SetNewPassword') }}</div>
      <!-- <div class="content__info">Enter the password and verification code.</div> -->
      <div class="content__main">
        <el-form ref="ruleForm" :model="form" :rules="formRules" class="form-container" auto-complete="on" label-position="left">
          <!-- <el-form-item prop="code">
            <div class="label-container">
              <svg-icon icon-class="code" />
              <span>Verification Code</span>
            </div>
            <el-input
              ref="code"
              v-model="form.code"
              type="code"
              name="code"
              tabindex="2"
              auto-complete="on"
            />
          </el-form-item> -->
          <el-form-item prop="password">
            <div class="label-container">
              <svg-icon icon-class="password2" />
              <span>{{ $t('FormSubmit.PASSWORD') }}</span>
            </div>
            <el-input
              ref="password"
              v-model="form.password"
              type="password"
              name="password"
              tabindex="2"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="confirm_password">
            <div class="label-container">
              <svg-icon icon-class="password2" />
              <span>{{ $t('FormSubmit.CONFIRMPASSWORD') }}</span>
            </div>
            <el-input
              ref="confirmPassword"
              v-model="form.confirm_password"
              type="password"
              name="confirmPassword"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="recoverPassword"
            />
          </el-form-item>
          <el-button type="primary" class="large-special-button operation-btn" :loading="loadingMixin.operation" @click.native.prevent="recoverPassword">{{ $t('FormSubmit.CONFIRM') }}</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { forgetPassword, unlockAccount } from '@/api/user'
import { validateConfirmPassword } from './utils'
import md5 from 'js-md5'
import { loadingMixin } from '@/mixin'

export default {
  name: 'SetPassword',
  mixins: [loadingMixin],
  data() {
    return {
      form: {}
    }
  },
  computed: {
    formRules() {
      return {
        password: [
          { required: true, validator: validateConfirmPassword.call(this, this.$t('FormVaildMsg.EnterPassword')), trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, validator: validateConfirmPassword.call(this, this.$t('FormVaildMsg.EnterConfirmPassword')), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    recoverPassword() {
      const { type, code } = this.$route.params
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return
        const queryParams = {
          random_code: code,
          password: md5(this.form.password)
        }
        const request = type === '1' ? forgetPassword : unlockAccount
        this.$_loadingMixin_start(async() => {
          await request(queryParams)
          this.$message.success(this.$t('FormVaildMsg.PasswordRecoverySucceeded'))
          // await this.$store.dispatch('user/logout')
          this.$router.push('/login')
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
