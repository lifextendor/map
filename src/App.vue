<template>
  <el-container>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
}
.ol-control.ol-zoom {
  top: inherit;
  left: inherit;
  bottom: 2.5em;
  right: 0.5em;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  opacity: 0.8;
  z-index: 9999;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
}
.el-step__icon-inner.map-tools-icons-map-marker-radius{
  font-size: 23px;
}
</style>
