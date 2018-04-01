function searchPoi(features) {
  if (!features || features.length < 1) {
    return
  }
  var points = []
  for (let i = 0, len = features.length; i < len; i++) {
    let geometry = features[i].getGeometry().clone().transform('EPSG:3857', 'EPSG:4326')
    points.push(
      geometry.getCoordinates().map(data => {
        return data.toFixed(6)
      }).join(',')
    )
  }
  points.push(points[0])
  points = points.join('|')
  let url = `http://restapi.amap.com/v3/place/polygon?key=c673e715513d38b5dd75564d8ec4f717&types=050000&polygon=${points}&keywords=美食&output=json`
  fetch(url).then(data => {
    console.log(data)
  })
}

export {
  searchPoi
}
