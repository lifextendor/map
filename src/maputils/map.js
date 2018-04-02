import Map from 'ol/map'
import View from 'ol/view'
import TileLayer from 'ol/layer/tile'
import XYZ from 'ol/source/xyz'
import Vector from 'ol/layer/vector'
import Control from 'ol/control'
import Draw from 'ol/interaction/draw'
import VSource from 'ol/source/vector'
import Style from 'ol/style/style'
import Fill from 'ol/style/fill'
import Stroke from 'ol/style/stroke'
import Circle from 'ol/style/circle'
import 'ol/ol.css'

const GOOGLE_MAP_URL = 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'
function createMap(target) {
  let map = new Map({
    layers: [
      new TileLayer({
        source: new XYZ({
          url: GOOGLE_MAP_URL
        })
      })
    ],
    target: target,
    controls: Control.defaults({
      attributionOptions: {
        collapsible: false
      }
    }),
    view: new View({
      center: [12685153.492296234, 2577384.2465164554],
      zoom: 12
    })
  })
  map.on('moveend', () => {
    let view = map.getView()
    console.log(view.getCenter())
    console.log(view.getZoom())
  })
  return map
}

function createVector(map) {
  let source = new VSource()
  let vector = new Vector({
    source: source,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2
      }),
      image: new Circle({
        radius: 7,
        fill: new Fill({
          color: '#ffcc33'
        })
      })
    })
  })
  return {
    source,
    vector
  }
}

function createMarkers() {
  let source = new VSource()
  let markers = new Vector({
    source: source,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2
      }),
      image: new Circle({
        radius: 7,
        fill: new Fill({
          color: '#ffcc33'
        })
      })
    })
  })
  return {
    markers,
    source
  }
}

let draw

function createDraw(map, source) {
  if (draw) {
    return draw
  }
  draw = new Draw({
    source: source,
    type: 'Point'
  })
  map.addInteraction(draw)
  return draw
}

export {
  createMap,
  createVector,
  createMarkers,
  createDraw
}
