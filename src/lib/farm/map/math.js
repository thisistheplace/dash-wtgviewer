import L from 'leaflet'

const SCALE = 1

function distance(pnt1, pnt2) {
  const temp1 = new L.latLng(0, 0)
  const temp2 = new L.latLng(0, 0)
  // Get latitude
  temp1.lat = pnt1.lat
  temp1.lng = 0
  temp2.lat = pnt2.lat
  temp2.lng = 0
  const x = temp1.distanceTo(temp2) * SCALE * Math.sign(temp2.lat - temp1.lat)
  // Get longitude
  temp1.lat = 0
  temp1.lng = pnt1.lng
  temp2.lat = 0
  temp2.lng = pnt2.lng
  const y = temp1.distanceTo(temp2) * SCALE * Math.sign(temp1.lng - temp2.lng)
  return {x: x, y: y}
}

export {distance}