<template>
  <div class="home-container">
    <div class="main-layout-container">
      <img src="@/assets/grid_bg.png" alt="layout background" class="layout-bg">
      <div class="layout-main">
        <!-- <div class="main-decoration" /> -->
        <div class="main-content">
          <div class="main-content__title">{{ $t('common.title') }}</div>
          <div class="main-content__description">{{ $t('home.canDo') }}</div>
        </div>
        <div class="what-body-container">
          <img src="@/assets/what_bg.png" alt="what_bg background" class="what-bg">
          <div class="content-title">{{ $t('home.whatIsT') }}</div>
          <div class="content-value">
            <div>{{ $t('home.whatIsM') }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="section1">
      <div class="section-container">
        <div class="section-block">
          <div class="content-title">{{ $t('home.whyChooseUsT') }}</div>
          <div class="content-container">
            <el-row :gutter="30">
              <el-col :sm="12" class="content__item">
                <div class="content__item__title">{{ $t('home.buildT') }}</div>
                <div class="content__item__main">
                  <p>{{ $t('home.buildM1') }}</p>
                  <p>{{ $t('home.buildM2') }}</p>
                  <p>{{ $t('home.buildM3') }}</p>
                </div>
              </el-col>
              <el-col :sm="12" class="content__item">
                <div class="content__item__title">{{ $t('common.title') }}</div>
                <div class="content__item__main">
                  <p>{{ $t('home.buildM4') }}</p>
                  <p>{{ $t('home.buildM5') }}</p>
                  <p>{{ $t('home.buildM6') }}</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="section2">
      <div class="section-block">
        <div class="content-title">{{ $t('home.ourService') }}</div>
        <div class="block-container content-container">
          <el-row :gutter="100">
            <el-col :md="8" class="block-item">
              <div class="block-item__decoration"><div class="round"><svg-icon icon-class="facilities" /></div></div>
              <div class="block-item__content">
                {{ $t('home.ourServiceM1') }}
              </div>
            </el-col>
            <el-col :md="8" class="block-item">
              <div class="block-item__decoration"><div class="round"><svg-icon icon-class="network" /></div></div>
              <div class="block-item__content">
                {{ $t('home.ourServiceM2') }}
              </div>
            </el-col>
            <el-col :md="8" class="block-item">
              <div class="block-item__decoration"><div class="round"><svg-icon icon-class="cloud" /></div></div>
              <div class="block-item__content">
                {{ $t('home.ourServiceM3') }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { codeLanguageMap } from './utils'
import { getHostEnv } from '@/utils/index'
import { docsHostMap } from '@/utils/data-const'
import { loadingMixin } from '@/mixin'
import { getRequestTotalData } from '@/api/user'
import copy from 'copy-to-clipboard'

export default {
  name: 'Home',
  mixins: [loadingMixin],
  data() {
    return {
      activeName: 'eth',
      isShowCode: true,
      requestInfo: {},
      codeLanguageMap
    }
  },
  computed: {
    highlightConfig() {
      return { }
    },
    docsHostURL() {
      return docsHostMap[getHostEnv()]
    }
  },
  created() {
    // this.getTotalInfo()
  },
  methods: {
    async getTotalInfo() {
      this.$_loadingMixin_start(async() => {
        const { data } = await getRequestTotalData()
        this.requestInfo = data || {}
      }, 'total')
    },
    toDocs() {
      window.open(this.docsHostURL)
    },
    handleCopyCode() {
      const { codeLanguageMap, activeName } = this
      copy(codeLanguageMap[activeName])
      this.$message.success('Copy successfully')
    }
  }
}
</script>
<style lang="scss" scoped>
.home-container {
  position: relative;
  overflow: hidden;
}
.home-decoration {
  width: 1724px;
  height: 4361px;
  position: absolute;
  top: 352px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 88;
  .svg-icon {
    width: 100%;
    height: 100%;
  }
}
.main-layout-container {
  position: relative;
  min-height: calc(900px - 100px);
  z-index: 99;
}
.layout-bg {
  object-fit: cover;
  min-height: 900px;
  width: 100%;
  position: absolute;
  left: 0;
  z-index: -1;
}
.main-decoration {
  width: 561px;
  height: 583px;
  background: 0px 0px url("~@/assets/home_main_decoration.png") transparent no-repeat;
  background-size: cover;
  position: absolute;
  top: 80px;
  right: 14.6875%;
  z-index: -1;
}
.main-content {
  @include boldFontFamily;
  padding: 240px 0 260px;
  margin-left: 30%;
  color: #ffffff;
  max-width: 770px;
  &__title {
    font-size: 86px;
  }
  &__description {
    margin-top: 12px;
    font-size: 32px;
    line-height: 44px;
  }
}
.what-body-container{
  max-width: $layoutContentWidth;
  position: relative;
  background: #FFFFFF;
  box-shadow: 0px 3px 12px 1px rgba(43, 216, 199, 0.8000);
  text-align: center;
  margin:0 auto;
  border-radius: 5px;
  padding:77px 54px 135px;

  .content-value{
    font-size: $fontSizeCeilVeryLarge;
    @include mediumFontFamily;
    div{
      margin:80px 0 0 0;
    }
  }
  .what-bg{
    object-fit: cover;
    width: 80%;
    right: 0;
    margin:80px auto;
    position: absolute;
    left: 0;
  }
}
.content-title{
    font-size: $fontSizeVeryLarge;
    @include HeavyFontFamily;
  }
.section1, .section2, .section3 {
  .section-container {
    position: relative;
    z-index: 99;
  }
}
.section1 {
  padding-top: 328px;
  padding-bottom: 30px;
  position: relative;
  color: $colorTextPrimary;
  margin-bottom: 208px;
  &::before {
    content: '';
    width: 748px;
    height: 748px;
    background: 0px 0px url("~@/assets/round_decoration.png") transparent no-repeat;
    background-size: cover;
    position: absolute;
    left: -124px;
    top: 198px;
  }
  .section-block {
    margin-bottom: 152px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .content {
    &-title {
      @include font-size-very-large;
      @include HeavyFontFamily;
      text-align: center;
    }
    &-container {
      max-width: 1258px;
      margin: 84px auto 0;
    }
    &__item {
      margin-bottom: 20px;
      &__title {
        @include font-size-ceil-large;
        @include HeavyFontFamily;
      }
      &__main {
        @include font-size-ceil-very-large;
        @include mediumFontFamily;
        line-height: 32px;
        margin-top: 32px;
        p {
          margin-bottom: 14px;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
  }

}
.section2{
  text-align: center;
  max-width: $layoutContentWidth;
  margin:0 auto 225px;
  .block {
    &-container {
      display: flex;
      justify-content: center;
      margin: 67px 0 0;
    }
    &-item {
      position: relative;
      &__decoration, &__content {
        &::before {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          border: 1px solid $colorPrimary;
          background-color: rgba(216, 255, 251, 1);
        }
      }
      &__decoration {
        width: 100px;
        height: 100px;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        &::before {
          border-radius: 50%;
          top: -8px;
          right: -12px;
          z-index: 1;
        }
        .round {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid $colorPrimary;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          position: absolute;
          z-index: 2;
        }
        .svg-icon {
          font-size: 40px;
          position: relative;
        }
      }
      &__content {
        @include font-size-ceil-very-large;
        @include mediumFontFamily;
        font-size: $colorTextPrimary;
        padding: 63px 10px 20px;
        text-align: center;
        border: 1px solid $colorPrimary;
        border-radius: $borderRadiusSpecialSmall;
        background-color: #ffffff;
        position: relative;
        margin: 62px auto 20px;
        min-height: 216px;
        &::before {
          top: -9px;
          right: -11px;
          z-index: -1;
        }
      }
    }
  }
}
</style>
