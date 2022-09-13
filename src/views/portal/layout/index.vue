<template>
  <div class="app-wrapper">
    <login-switch :visible.sync="loginDialogVisible" />
    <app-header class="portal-header-container" @showSwitchLogin="loginDialogVisible =true" />
    <div class="portal-main-container">
      <app-main />
    </div>
    <app-footer class="portal-footer-container" />

  </div>
</template>

<script>
import { AppMain, AppHeader, AppFooter } from './components'
import loginSwitch from '@/components/LoginSwitch'

export default {
  name: 'Layout',
  components: {
    AppMain,
    AppHeader,
    AppFooter,
    loginSwitch
  },
  data() {
    return {
      loginDialogVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    .portal-main-container {
      padding-top: 100px;
      z-index: 1;
      flex: 1;
    }
    .portal-header-container {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 80;
    }
    .portal-header-container,
    .portal-footer-container {
      width: 100%;
    }
  }
</style>
