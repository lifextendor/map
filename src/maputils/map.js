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

function createMap(target) {
  let map = new Map({
    layers: [
      new TileLayer({
        source: new XYZ({
          url: 'http://t2.supermapcloud.com/FileService/image?map=quanguo&type=web&x={x}&y={y}&z={z}'
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
    source: source,
    vector: vector
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
    markers: markers,
    source: source
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
