<template>
  <div v-if="showFooter" class="app-footer">
    <div class="bg-decoration" />
    <div class="app-footer__container">
      <div class="content-body">
        <div class="content-body__item login-container">
          <img src="@/assets/name_while.png" alt="logo" class="name">
          <div class="content__main">
            <div class="content__main__item">{{ $t('footer.signUpTips') }}</div>
            <div class="content__main__item"><el-button class="small-plain-btn">{{ $t('footer.signUp') }}</el-button></div>
          </div>
        </div>
        <div class="content-body__item link-container">
          <div class="content__title">{{ $t('footer.resources') }}</div>
          <div class="content__main">
            <div class="content__main__item"><div><el-link class="link-btn">Discord</el-link><svg-icon icon-class="Discord" /></div></div>
            <div class="content__main__item"><div><el-link class="link-btn">{{ $t('footer.docs') }}</el-link></div></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="lang === 'zh'" class="footer-an">
      <div class="footer-an__content">
        <div>
          <span class="copyright">@2022 Eystorage</span>
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" class="copyright">粤ICP备2021173752号</a>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502009197" target="_blank" class="copyright"><span class="beian">粤公网安备 44030502009197号</span></a>
        </div>
        <router-link to="/contactUs"><div><svg-icon icon-class="lianxi" />{{ $t('footer.connatUs') }}</div></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import settings from '@/settings'
import { getHostEnv } from '@/utils/index'
import { docsHostMap } from '@/utils/data-const'
import { mapGetters } from 'vuex'

export default {
  name: 'AppFooter',
  data() {
    return {
      settings,
      docsHostURL: docsHostMap[getHostEnv()]
    }
  },
  computed: {
    ...mapGetters(['lang']),
    showFooter() {
      const bol = this.$route.meta.showFooter
      return bol || false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

$fontColor: #ffffff;
$backgroundColor: #000000;

.app-footer {
  @include regularFontFamily;
  padding-top: 88px;
  padding-bottom: 122px;
  color: $fontColor;
  background-color: $backgroundColor;
  position: relative;
  &__container {
    max-width:1065px;
    margin: 0px auto;
    position: relative;
    z-index: 2;
  }
  .content-body {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
  }
  .content__title {
    @include boldFontFamily;
    font-size: $fontSizeVeryLarge;
  }
  .content__main {
    margin-top: 15px;
    &__item {
      @include font-size-large;
      @include regularFontFamily;
      margin-bottom: 18px;
      &:last-of-type {
        margin-bottom: 0;
      }
      .svg-icon{
        font-size: 26px;
        margin-left: 10px;
      }
    }
  }
  .logo-container {
    display: flex;
    align-items: center;
  }
  .logo {
      width: 54px;
    }
  .name{
    width: 174px;
   }
  .login-container {
    margin-left: 23px;
  }
  .link-container {
    margin-left: 177px;

    .content__main__item {
      > div {
        display: flex;
      }
    }
  }
}
.bg-decoration {
  width: 1381px;
  height: 100%;
  background: 0px 0px url("~@/assets/footer_bg2.png") transparent no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 1;
}
.link-btn {
  @include font-size-large;
  @include regularFontFamily;
  color: #ffffff;
  display: inline-block;
}
.footer-an{
  position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    z-index: 999;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    /* max-width: 1340px; */
    box-shadow: inset 0px 3px 6px 1px rgb(255 255 255 / 20%);
    color: rgba(159, 159, 159, 1);
    &__content{
      justify-content: space-between;
      display: flex;
      max-width:1065px;
      margin:0 auto;
      padding:16px 128px;
    }
    .svg-icon{
      margin-right: 10px;
    }
    span{
      margin-right: 10px;
    }
    .beian{
      margin: 40px;
      position: relative;
      &::before{
        position: absolute;
        content:'';
        width:20px;
        height: 20px;
        left: -25px;
        background-image: url("~@/assets/ba.png") ;
        background-size: cover;
      }
    }
}
</style>
