<template>
  <div class="content-container">
    <div class="bg-decoration">
      <svg-icon icon-class="line-decoration" />
    </div>
    <div class="content-main-container">
      <div class="content__title">Get Started for Free</div>
      <div class="content__main">
        <el-form ref="ruleForm" :model="form" :rules="formRules" class="form-container" auto-complete="on" label-position="left">
          <el-form-item prop="email">
            <div class="label-container">
              <svg-icon icon-class="email" />
              <span>EMAIL</span>
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
          <el-form-item prop="password">
            <div class="label-container">
              <svg-icon icon-class="password2" />
              <span>PASSWORD</span>
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
              <span>CONFIRM PASSWORD</span>
            </div>
            <el-input
              ref="confirmPassword"
              v-model="form.confirm_password"
              type="password"
              name="confirmPassword"
              tabindex="2"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="invite_code">
            <div class="label-container">
              <svg-icon icon-class="email" />
              <span>INVITATION CODE</span>
            </div>
            <el-input
              ref="invite_code"
              v-model="form.invite_code"
              name="invite_code"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="register"
            />
          </el-form-item>
          <div><el-link type="primary" href="https://discord.gg/RHTjMyzuNm" target="_blank">Contact us</el-link> and get a invitation code.</div>
          <el-button type="primary" class="large-special-button operation-btn" :loading="loadingMixin.operation" @click.native.prevent="register">CONFIRM</el-button>
          <div class="tips-container">
            <el-checkbox v-model="checked" />
            <div class="tips-text">
              By clicking the “Sign Up” button, you are creating an
              Eynode account and you agree to Consensy's Terms of
              Use and Privacy Policy.
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div
      class="link-text secondary-text"
      @mouseover="loginLinkIconName = 'user-round-over'"
      @mouseout="loginLinkIconName = 'user-round'"
      @click="toLogin"
    >
      <el-link><svg-icon :icon-class="loginLinkIconName" />Already have an account? Log In</el-link>
    </div>
    <tips-dialog :visible.sync="tipsDialogVisible" title="Mail was sent" content="Simply enter your email address below and we'll send you a password recovery link." @close="confirmRegister" />
  </div>
</template>

<script>
import TipsDialog from '../components/tips-dialog.vue'
import { register } from '@/api/user'
import { formRules, validateConfirmPassword } from './utils'
import md5 from 'js-md5'
import { loadingMixin } from '@/mixin'

export default {
  name: 'Register',
  components: {
    TipsDialog
  },
  mixins: [loadingMixin],
  data() {
    return {
      tipsDialogVisible: false,
      form: {},
      checked: false,
      loginLinkIconName: 'user-round'
    }
  },
  computed: {
    formRules() {
      return {
        ...formRules,
        password: [
          { required: true, validator: validateConfirmPassword.call(this, 'Please enter the password'), trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, validator: validateConfirmPassword.call(this, 'Please enter the confirm password'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return
        if (!this.checked) {
          this.$message.error('Please agree to Consensy\'s Terms of Use and Privacy Policy')
          return
        }
        const { email, password, invite_code } = this.form
        const queryParams = {
          email: email,
          password: md5(password),
          invite_code
        }
        this.$_loadingMixin_start(async() => {
          await register(queryParams)
          this.tipsDialogVisible = true
        }, 'operation')
      })
    },
    toLogin() {
      this.$router.push('/login')
    },
    confirmRegister() {
      this.form = {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

.content-container {
  padding-bottom: 38px;
}
.tips-container {
  @include font-size-large;
  @include mediumFontFamily;
  margin-top: 43px;
  color: $colorTextLight;
  display: flex;
  ::v-deep.el-checkbox {
    height: 18px;
    margin-right: 18px;
    .el-checkbox__inner {
      background-color: white;
      border-radius: 0;
      &::after {
        width: 7px;
        height: 15px;
        border-color: #5EC4F4;
        border-width: 2px;
        top: -9px;
        left: -2px;
        transform-origin: bottom;
      }
    }
  }
}
.link-text {
  text-align: center;
  position: relative;
  ::v-deep.el-link {
    font-size: $fontSizeCeilLarge;
    &::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: $backgroundColorLight;
    }
    &:hover {
      * {
        color: #51cdf9!important;
      }
    }
    span {
      display: flex;
      align-items: center;
    }
  }
}
.secondary-text {
  position: absolute;
  bottom: -51px;
  left: 50%;
  width: 56%;
  transform: translate3d(-50%, 0, 0);
  * {
    color: $colorTextLight;
  }
  .svg-icon {
    font-size: $fontSizeLarge;
    margin-right: 15px;
  }
}
</style>
