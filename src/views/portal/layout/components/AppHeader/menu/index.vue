<template>
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    background-color="transparent"
    class="header-menu"
  >
    <sidebar-item v-for="route in routes" :key="route.path" :item="route" :is-top="true" :base-path="route.path" />
  </el-menu>

</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  name: 'HeaderMenu',
  components: {
    SidebarItem
  },
  computed: {
    routes() {
      const findRoutes = this.$router.options.routes.find(item => item.name === 'Root')
      return findRoutes && findRoutes.children || []
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

$fontColor: #{$colorTextPrimary} + 80;
$activeFontColor: $colorTextPrimary;
$backgroundColor: transparent;

.header-menu.el-menu--horizontal {
  display: inline-block;
  height: 100%;
  border-bottom: none;
  * {
    font-size: $fontSizeCeilVeryLarge;
  }
  .sidebar-item {
    margin: 0px 30px;
  }
  .sidebar-item,
  .sidebar-item > a,
  .el-menu-item,
  .el-submenu {
    height: 100%;
  }
  .sidebar-item > a {
    display: inline-block;
  }
  .el-menu-item, .el-submenu {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .el-menu-item, .el-submenu .el-submenu__title {
    @include mediumFontFamily;
    color: rgba(9, 150, 136,0.5);
    background-color: $backgroundColor!important;
    transition: color .3s;
  }
  .el-menu-item, .el-submenu__title {
      background-color: $backgroundColor!important;
  }
  .el-submenu:hover .el-submenu__title,
  .el-menu-item:not(.is-disabled):hover,
  .el-menu-item:not(.is-disabled):focus,
  .el-submenu__title:not(.is-disabled):hover,
  :not(.is-disabled):hover .el-submenu__icon-arrow {
    color: #099486;
  }
  .el-menu-item.is-active,
  .el-submenu.is-active .el-submenu__title,
  .el-submenu.is-active .el-submenu__title .el-submenu__icon-arrow {
    @include boldFontFamily;
    color: #099486;
  }
  .el-submenu__title * {
    vertical-align: baseline;
  }
  .el-submenu {
    .el-submenu__icon-arrow {
      @include mediumFontFamily;
      position:static;
      margin-left: 8px;
      margin-top: -3px;
      color: $fontColor;
    }
  }
}
.el-menu--horizontal {
  .el-menu--popup {
    min-width: 130px;
    background-color: white !important;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.12);
    .el-menu-item {
      @include mediumFontFamily;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: $colorTextPrimary;
      &:not(.is-disabled):hover {
        color: $colorPrimary;
        background-color: $backgroundColor !important;
      }
      &.is-active {
        color: $colorPrimary;
      }
    }
  }
}
</style>
