<template>
  <div class="header">
    <div class="header__operation">
      <!-- <search-address /> -->
      <div class="header__operation__btn ">
        <el-dropdown class="avatar-container" trigger="hover">
          <router-link to="/userInfo/index">
            <div class="header__user__wrapper">
              <svg-icon icon-class="ic_header_user" />
              <span>{{ userInfo && userInfo.user_did | hiddenMiddleText }} </span>
            </div>
          </router-link>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <!-- <el-dropdown-item @click.native="showChangePassword">
              <span style="display:block;">修改密码</span>
            </el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- <switch-lang /> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'
import { title } from '@/settings'
import searchAddress from '@/components/SearchAddress'
import SwitchLang from '@/components/SwitchLang'

export default {
  name: 'AppHeader',
  components: {
    searchAddress,
    SwitchLang
  },
  data() {
    return {
      title
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'sidebar'
    ])
  },
  methods: {
    ...mapActions('user', ['updateChangePasswordDialog']),
    showChangePassword() {
      this.updateChangePasswordDialog(true)
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push('/login')
    },
    refresh() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.header {
  width: 100%;
  padding:15px 0 10px;
  display: flex;
  align-items: center;
  z-index: 99;
  .svg-icon{
    font-size: $headerIconSize;
  }
  &__operation {
    width: 100%;
    font-size: $fontSizeLarge;
    background:$headerBackgroundColor;
    display: flex;
    justify-content: flex-end;
    padding:0 60px;
    border-radius: 10px;
    align-items: center;
    &__btn {
      height: $headerHeight;
      display: flex;
      font-size: 16px;
      justify-content: center;
      align-items: center;
      padding: 0px 0 0 10px;
      margin: 0px 0 0 10px;
      cursor: pointer;
      span{
        margin: 0 0 0 12px;
      }
    }

    :last-of-type {
      margin-right: 0;
    }
  }
  &__user {
    &__wrapper {
      .el-icon-user {
        font-size: $fontSizeLarge;
      }
    }
  }
  .avatar-container {
    height: 100%;
    ::v-deep .header__user__wrapper {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
