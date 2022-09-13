<template>
  <div v-if="hasNavbar" class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="navbar__hamburger" @toggleClick="toggleSideBar" /> -->
    <breadcrumb class="breadcrumb-container" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      title: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    hasNavbar() {
      const isShow = !this.$route.meta.hiddenNavbar
      return isShow
    }
  },
  watch: {
    '$route': function(to, from) {
      this.setTitle(to)
    }
  },
  created() {
    this.setTitle(this.$route)
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    setTitle(route) {
      this.title = route.meta.title
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navbar {
  height: 50px;
  padding: 13px 0;
  overflow: hidden;
  position: relative;
  background: #fff;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);
  box-sizing: border-box;
  display: flex;
  padding: 0 15px;
  border-radius: 10px;
  &__hamburger {
    height: 100%;
    cursor: pointer;
    display: inline-block;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    align-items: center;
  }
  .breadcrumb-container {
    float: left;
  }
}
</style>
