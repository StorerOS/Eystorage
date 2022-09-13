<template>
  <div class="calibration-layout">
    <img src="@/assets/grid_bg.png" alt="layout background" class="layout-bg">
    <div class="calibration-main">
      <router-view :key="key" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalibrationLayout',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.calibration-layout {
  position: relative;
  padding: 250px 0;
  top: -250px;
}
.layout-bg {
  object-fit: cover;
  min-height: 1080px;
  width: 100%;
  position: absolute;
  left: 0;
}
.calibration-main {
  width: 100%;
  position: relative;
}

.content-body {
  margin-top: 100px;
  position: relative;
}

</style>
