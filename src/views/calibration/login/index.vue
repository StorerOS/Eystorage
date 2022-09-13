<template>
  <div class="content-container">
    <div class="bg-decoration">
      <!-- <svg-icon icon-class="bar_bg" class="bg_left_top" />
      <svg-icon icon-class="bar_bg" class="bg_right_bottom" /> -->
    </div>
    <div class="content-main-container">
      <div class="content__title">{{ $t('Login.GetStartedforFree') }}</div>
      <div class="content__main">
        <el-form ref="ruleForm" :model="form" :rules="formRules" class="form-container" auto-complete="on" label-position="left">
          <el-form-item prop="email">
            <div class="label-container">
              <svg-icon icon-class="email" />
              <span>{{ $t('Login.EMAIL') }}</span>
            </div>
            <el-input
              ref="name"
              v-model="form.email"
              name="name"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
            <div class="label-container">
              <svg-icon icon-class="password2" />
              <span>{{ $t('Login.PASSWORD') }}</span>
            </div>
            <el-input
              ref="password"
              v-model="form.password"
              type="password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="login"
            />
          </el-form-item>
          <div v-if="lockTips" class="lockTips">{{ $t('Login.LockTips') }}</div>
          <div v-if="lockedTips" class="lockedTips">The account has been locked and the unlock time is {{ lockTime }}. If you need to unlock in advance, please <span class="def_col" @click="handleUnLockAccount">click unlock</span> application.</div>
          <el-button type="primary" class="large-special-button operation-btn" :loading="loadingMixin.operation" @click.native.prevent="login">{{ $t('Login.SIGN IN') }}</el-button>
          <div class="link-text secondary-text" @click="retrievePassword"><el-link>I've lost my password</el-link></div>
          <!-- <div class="link-text primary-text" @click="registerAccount"><el-link type="primary"><svg-icon icon-class="add-user" />Create an account</el-link></div> -->
        </el-form>
      </div>
    </div>
    <retrieve-password-dialog :visible.sync="retrievePassowrdDialogVisible" />
    <un-lock :visible.sync="unLockDialog" />
  </div>
</template>

<script>
import unLock from './un-lock.vue'
import RetrievePasswordDialog from './retrieve-password-dialog.vue'
import { loadingMixin } from '@/mixin'
import md5 from 'js-md5'
import { formRules } from './utils'
import { login } from '@/api/user'

export default {
  name: 'Login',
  components: {
    RetrievePasswordDialog,
    unLock
  },
  mixins: [loadingMixin],
  data() {
    return {
      retrievePassowrdDialogVisible: false,
      formRules,
      lockTips: false,
      lockedTips: false,
      lockTime: '',
      unLockDialog: false,
      form: {
        email: ''
      }
    }
  },
  methods: {
    retrievePassword() {
      this.retrievePassowrdDialogVisible = true
    },
    registerAccount() {
      this.$router.push('/register')
    },
    handleUnLockAccount() {
      this.unLockDialog = true
    },
    login() {
      const { email, password } = this.form
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return
        // await this.$store.dispatch('user/login', queryParams)
        this.$_loadingMixin_start(async() => {
          login({ email: email.trim(), password: md5(password) }).then(response => {
            const { data } = response
            this.$store.dispatch('user/setAllUserInfo', data)
            this.$router.push({ path: this.redirect || '/dashboard' })
            // commit('SET_ALL_USER_INFO', data)
            debugger
          }).catch(error => {
            switch (error.code) {
              case 1045 : {
                this.lockTips = true
                break
              }
              case 1043: {
                this.lockTips = false
                this.lockedTips = true
                this.lockTime = error.message
                break
              }
            }
            console.log(error)
          })
        }, 'operation')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

.content-container {
  padding-bottom: 44px;
}
.link-text {
  text-align: center;
  position: relative;
  .el-link {
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
  }
}
.link-text.primary-text {
  margin-top: 100px;
  .el-link {
    &::after {
      background-color: #FFB000;
    }
    &:hover::after {
      border-color: #FFB000;
    }
    .svg-icon {
      margin-right: 15px;
    }
  }
}
.secondary-text-container {
  margin-top: 15px;
}
.secondary-text {
  margin-top: 15px;
  * {
    color: $colorTextLight;
  }
}
</style>
