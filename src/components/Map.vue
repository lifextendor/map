<template>
  <div id='map' ref='myMap'>
    <div class="tools">
      <el-row>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-location" v-on:click.native="drawPoint" circle></el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-button type="success" icon="el-icon-check" v-on:click.native="searchPoi" circle></el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-button type="info" icon="el-icon-delete" v-on:click.native="clear" circle></el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-button type="warning" icon="el-icon-edit-outline" v-on:click.native="findBestPlace" circle></el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {
  createMap,
  createVector,
  createMarkers,
  createDraw
} from './maputils/map.js'
import { searchPoi } from './maputils/poi.js'
export default {
  name: 'Map',
  mounted() {
    let target = this.$refs.myMap
    this.initMap(target)
  },
  data() {
    return {
      msg: 'Hello Map'
    }
  },
  methods: {
    initMap(target) {
      this.map = createMap(target)
      let { vector, source } = createVector(this.map)
      this.vector = vector
      this.source = source
    },
    drawPoint() {
      this.draw = createDraw(this.map, this.source)
    },
    searchPoi() {
      if (this.draw) {
        this.draw.setActive(false)
      }
      searchPoi(this.source.getFeatures())
    },
    clear() {
      if (this.draw) {
        this.draw.setActive(false)
      }
      this.source.clear()
    },
    findBestPlace() {
      if (this.draw) {
        this.draw.setActive(false)
      }
    }
  }
}
</script>
<style scoped>
#map {
  width: 100%;
}
.el-row {
  line-height: 60px;
}
.tools {
  position: absolute;
  top: 8.5em;
  left: 0.5em;
  z-index: 999;
}
</style>
