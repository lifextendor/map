<template>
<el-container>
  <el-header>Header</el-header>
  <el-main><router-view/></el-main>
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
  top: 4.5em;
  left: .7em;
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
  text-align: center;
  line-height: 160px;
  padding: 0;
  margin-top: -60px;
}

.el-container {
  line-height: 320px;
}
</style>
