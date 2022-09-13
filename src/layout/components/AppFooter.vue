<template>
  <div class="app-footer">
    <!-- <span class="copyright">©2022 深圳文储科技有限公司</span>
    <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">粤ICP备2021173752号</a> -->
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss" scoped>
.app-footer {
  height: $footerHeight;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  color: $colorTextSecondary;
  .copyright {
    margin-right: 10px;
  }
}
</style>
