<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" :class="{'mobile-sidebar-container': device==='mobile' && sidebar.opened}" />
    <div class="main-container">
      <app-header />
      <!-- <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div> -->
      <app-main />
      <app-footer />
    </div>
    <!-- <code-dialog :tips="codeData.tips" :visible="codeData.visible" :uri="codeData.uri" :title="codeData.title" :icon="codeData.icon" /> -->
    <!-- <changePasswordDialog :visible="changePasswordVisible" type="password" /> -->
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, AppHeader, AppFooter } from './components'
import { mapGetters } from 'vuex'
import ResizeMixin from './mixin/ResizeHandler'
// import codeDialog from '@/components/CodeDialog'
// import changePasswordDialog from '@/components/ChangePasswordDialog'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    AppHeader,
    AppFooter
    // codeDialog,
    // changePasswordDialog
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'codeData',
      'changePasswordVisible'
    ]),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    min-height: 100%;
    width: 100%;
    // overflow: hidden;
    display: inline-block;
    background:$bodyBackgroundColor;
    // background:#000;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
