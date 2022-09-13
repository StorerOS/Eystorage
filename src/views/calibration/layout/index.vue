<template>
  <div class="calibration-layout">
    <img src="@/assets/grid_bg.png" alt="layout background" class="layout-bg">
    <div class="calibration-main">
      <div class="main-decoration" />
      <div class="content-body">
        <div class="content-decoration" />
        <router-view :key="key" />
      </div>
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
  min-height: calc(1080px - 100px);
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
  display: flex;
  justify-content: center;
  position: relative;
}

.content-body {
  margin-top: 100px;
  position: relative;
}

</style>
