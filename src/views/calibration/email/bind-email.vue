<template>
  <div class="content-container">
    <div class="bg-decoration">
      <svg-icon icon-class="line-decoration" />
    </div>
    <div class="content-main-container">
      <div class="content__title">{{ $t("FormSubmit.BindEmail") }}</div>
      <div class="content__info">{{ $t("FormSubmit.EnterPasswordBinding") }}</div>
      <div class="content__main">
        <el-form ref="ruleForm" :model="form" :rules="formRules" class="form-container" auto-complete="on" label-position="left">
          <el-form-item prop="code">
            <div class="label-container">
              <svg-icon icon-class="code" />
              <span>{{ $t('FormSubmit.VerificationCode') }}</span>
            </div>
            <el-input
              ref="code"
              v-model="form.code"
              type="code"
              name="code"
              tabindex="2"
              auto-complete="on"
            />
          </el-form-item>
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
import { bindEmail } from '@/api/common'
import { validateConfirmPassword } from './utils'
import md5 from 'js-md5'
import { loadingMixin } from '@/mixin'
import { mapGetters } from 'vuex'

export default {
  name: 'SetPassword',
  mixins: [loadingMixin],
  data() {
    return {
      form: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    formRules() {
      return {
        code: [
          { required: true, trigger: 'blur', message: this.$t('FormVaildMsg.EnterInvitationCode') }
        ],
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
      const { userInfo } = this
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return

        const queryParams = {
          code: this.form.code,
          email: this.$route.params.email,
          password: md5(this.form.password)
        }
        this.$_loadingMixin_start(async() => {
          await bindEmail(queryParams)
          this.$store.dispatch('/user/setAllUserInfo', { ...userInfo, email: 'abc@wenchu.io' })
          this.$message.success(this.$t('FormVaildMsg.ConfirmBindEmailTips'))
          this.$router.push('/userInfo/index')
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
