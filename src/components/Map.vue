<template>
  <div id='map' ref='myMap'>
    <div class="step-tools">
      <el-steps :active="active">
        <el-step title="开始" icon="el-icon-time"></el-step>
        <el-step title="标位置" icon="map-tools-icons-map-marker-radius"></el-step>
        <el-step title="搜索Poi" icon="el-icon-search"></el-step>
        <el-step title="找最优点" icon="el-icon-success"></el-step>
      </el-steps>
      <el-button style="margin-top: 12px;" v-bind:disabled="isButtonDisabled" @click="previous">上一步</el-button>
      <el-button style="margin-top: 12px;" v-bind:disabled="isButtonDisabled" @click="next">下一步</el-button>
      <el-button type="info" icon="el-icon-delete" @click="clear"></el-button>
      <i class="el-icon-loading loading-icon" v-if="isShowLoading"></i>
    </div>
    <el-dialog title="参数设置" :visible.sync="dialogFormVisible" @close="onDialogClose">
      <el-form>
        <el-form-item label="路径类型" :label-width="formLabelWidth">
          <el-select v-model="type" placeholder="请选择路径类型">
            <el-option label="驾车" value="1"></el-option>
            <el-option label="公交" value="2"></el-option>
            <el-option label="步行" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  createMap,
  createVector,
  createMarkers,
  createDraw
} from '../maputils/map.js'
import Feature from 'ol/feature'
import Point from 'ol/geom/point'
import { searchPoi } from '../maputils/poi.js'
export default {
  name: 'Map',
  mounted() {
    let target = this.$refs.myMap
    this.initMap(target)
    this.resize()
    document.body.onresize = this.resize.bind(this)
  },
  data() {
    return {
      active: 0,
      isButtonDisabled: false,
      isShowLoading: false,
      type: '1',
      dialogFormVisible: false
    }
  },
  methods: {
    previous() {
      if (this.active < 0) this.active = 3
    },
    next() {
      if (this.active++ > 3) this.active = 0
    },
    initMap(target) {
      let map = (this.map = createMap(target))
      let { vector, source } = createVector(map)
      let { markers, markerSource, textMarkers, textSource } = createMarkers()
      this.vector = vector
      this.source = source
      this.markers = markers
      this.markerSource = markerSource
      this.textMarkers = textMarkers
      this.textSource = textSource

      map.addLayer(vector)
      map.addLayer(markers)
      map.addLayer(textMarkers)
    },
    resize() {
      let width = window.innerWidth
      let height = window.innerHeight
      this.map.setSize([width, height])
    },
    showLoading() {
      this.isButtonDisabled = true
      this.isShowLoading = true
    },
    hideLoading() {
      this.isButtonDisabled = false
      this.isShowLoading = false
    },
    drawPoint() {
      let firstDraw = !this.draw
      this.draw = createDraw(this.map, this.source)
      this.draw.setActive(true)
      this.showLoading()
      this.$message('请在地图上标三个点以上')
      firstDraw &&
        this.draw.on('drawend', () => {
          let features = this.source.getFeatures()
          if (features && features.length >= 2) {
            this.hideLoading()
            this.$message('现在可以下一步查询三个点中间的美食点')
          }
        })
    },
    searchPoi() {
      if (this.draw) {
        this.draw.setActive(false)
      }
      this.showLoading()
      let features = this.source.getFeatures()
      searchPoi(features).then(data => {
        this.markerSource.clear()
        this.textSource.clear()
        let pois = data.pois
        for (let i in pois) {
          let poi = pois[i].location
          let xy = poi.split(',')
          let point = new Point([+xy[0], +xy[1]])
          point = point.transform('EPSG:4326', 'EPSG:3857')
          let feature = new Feature({
            geometry: point,
            labelPoint: point.clone(),
            name: pois[i].name
          })
          this.markerSource.addFeature(feature)
          this.textSource.addFeature(feature.clone())
        }
        this.hideLoading()
        this.$message('请下一步查询离三个点都比较近的美食点')
      })
    },
    clear() {
      if (this.draw) {
        this.draw.setActive(false)
      }
      this.source.clear()
      this.markerSource.clear()
      this.textSource.clear()
      this.active = 0
      this.draw.un('drawend')
    },
    findBestPlace() {
      if (this.draw) {
        this.draw.setActive(false)
      }
      this.dialogFormVisible = true
    },
    onDialogClose() {
      this.$message('正在开发中...')
    }
  },
  watch: {
    active: function(val) {
      switch (val) {
        case 1:
          this.drawPoint()
          break
        case 2:
          this.searchPoi()
          break
        case 3:
          this.findBestPlace()
          break
        default:
          this.hideLoading()
          this.clear()
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
.step-tools {
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  width: 320px;
  background-color: white;
  padding: 15px;
  z-index: 999;
}
.loading-icon {
  margin-left: 10px;
}
</style>
