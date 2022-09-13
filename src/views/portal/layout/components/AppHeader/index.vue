<template>
  <div>
    <div class="app-header">
      <div class="app-header__content">
        <div class="left-container">
          <div class="item logo-container" @click="$router.push('/home')">
            <img src="@/assets/logo2.png" alt="logo" class="logo">
          </div>
          <div class="item">
            <header-menu />
          </div>
          <!-- <search-address /> -->
        </div>
        <div class="right-container">
          <el-button v-if="token" type="primary" class="special-button" @click="toDashboard">{{ $t('common.DASHBOARD') }}</el-button>
          <el-button v-else type="primary" class="special-button" @click="toLogin">{{ $t('common.SIGNIN') }}</el-button>
          <!-- <switch-lang /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import HeaderMenu from './menu/index'
import { mapGetters } from 'vuex'
import axios from 'axios'
import { mapActions } from 'vuex'
import searchAddress from '@/components/SearchAddress'
import SwitchLang from '@/components/SwitchLang'
export default {
  name: 'AppHeader',
  components: {
    HeaderMenu,
    searchAddress,
    SwitchLang
  },

  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    // this.checkLogin()
  },
  methods: {
    ...mapActions({
      setAllUserInfo: 'user/setAllUserInfo',
      resetToken: 'user/resetToken'
    }),
    async checkLogin() {
      const res = await axios({
        baseURL: process.env.VUE_APP_BASE_API,
        url: '/session/timeout',
        method: 'post',
        timeout: 30 * 1000,
        responseType: 'json',
        headers: { 'Auth-Token': this.token },
        data: {}
      })
      const { data, header } = res.data
      header.code === 0 ? this.setAllUserInfo(data) : this.resetToken()
    },
    toDashboard() {
      this.$router.push('/dashboard')
    },
    toLogin() {
      this.$emit('showSwitchLogin', true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

$logoFontColor: #ffffff;
$backgroundColor: transparent;
$borderColor: #AEEAFF;
$fontColor: #AEEAFF;

.app-header {
  height: 100px;
  background-color: rgba(256, 256, 256);
  &__content {
    max-width: $layoutContentWidth;
    min-width: 920px;
    height: 100%;
    margin: 0px auto;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    .item {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  .logo-container {
    margin-right: 18px;
    cursor: pointer;
    .logo {
      //width: 175px;
    }
    .logo-title {
      @include boldFontFamily;
      color: $logoFontColor;
      font-size: $fontSizeVeryLarge;
      margin-left: 8px;
    }
  }
  .left-container {
    display: flex;
    align-items: center;
  }
  .right-container {
    display: flex;
    align-items: center;
  }
}
</style>
