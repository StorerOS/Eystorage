<template>
  <div class="lang-container">
    <div :class="[lang == 'zh'?'active':'']" @click="changeLang('zh')">中</div>
    /
    <div :class="[lang == 'en'?'active':'']" @click="changeLang('en')">En</div>
  </div>
</template>

<script>
import { setLang } from '@/utils/auth'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['lang'])
  },
  methods: {
    changeLang(tip) {
      const { lang } = this
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLang', tip)
      window.localStorage.setItem('lang', tip)
      setLang(tip)
    }
  }
}
</script>

<style lang="scss" scoped>
.lang-container{
    display: flex;
    font-size: 18px;
    color: #333333;
    margin:0 20px;
    div{
        margin:0 5px;
        position: relative;
    }
    .active::after{
        position: absolute;
        content:'';
        bottom: 0;
        height: 2px;
        width: 100%;
        left: 0;
        background: $colorPrimary;
    }
}
</style>
