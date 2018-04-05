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
  let url = `//restapi.amap.com/v3/place/polygon?key=c673e715513d38b5dd75564d8ec4f717&types=050000&polygon=${points}&keywords=美食&output=json&offset=25&page=1`
  return fetch(url).then(res => {
    console.log(res)
    if (res.status >= 200 && res.status < 400) {
      return res.json()
    }
  })
}

export {
  searchPoi
}
