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
import Icon from 'ol/style/Icon'
import Text from 'ol/style/text'
import Attribution from 'ol/attribution'
import 'ol/ol.css'
import mapMarker from '../assets/map-marker-32.png'
import mapMarkerRadius from '../assets/map-marker-radius-32.png'

const GOOGLE_MAP_URL = '//www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'

function createMap(target) {
  let map = new Map({
    layers: [
      new TileLayer({
        source: new XYZ({
          attributions: new Attribution({
            html: '地图数据 © 2018 Google'
          }),
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
      image: new Icon(({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        size: [32, 32],
        src: mapMarkerRadius
      }))
    })
  })
  return {
    source,
    vector
  }
}

function createMarkers() {
  let markerSource = new VSource()
  let style = new Style({
    image: new Icon(({
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      size: [32, 32],
      src: mapMarker
    }))
  })
  let textStyle = new Style({
    text: new Text({
      font: 'bold 11px "Open Sans", "Arial Unicode MS", "sans-serif"',
      placement: 'point',
      offsetY: -40,
      fill: new Fill({
        color: '#2f2f2f'
      })
    })
  })
  let markers = new Vector({
    source: markerSource,
    style: style
  })

  let textSource = new VSource()
  let textMarkers = new Vector({
    declutter: true,
    source: textSource,
    style: function (feature) {
      textStyle.getText().setText(feature.get('name'))
      return textStyle
    }
  })
  return {
    markers,
    markerSource,
    textMarkers,
    textSource
  }
}

let draw

function createDraw(map, source) {
  if (draw) {
    return draw
  }
  let style = new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new Icon(({
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      size: [32, 32],
      src: mapMarker
    }))
  })
  draw = new Draw({
    source: source,
    style: style,
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
