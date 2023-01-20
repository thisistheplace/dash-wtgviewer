import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'

import * as FarmPropTypes from './../../proptypes/farm'

import { Boundary } from './boundary'
import { Turbines } from './turbines'
import { distance } from './math'


function latLngtoXY(latLngArray){
  // Relative to first point
  const origin = L.latLng(latLngArray[0].lat, latLngArray[0].lng)
  const xy = []
  // skip first
  // latLngArray.slice(1).forEach((pnt)=>{
  latLngArray.forEach((pnt)=>{
    xy.push(
      distance(origin, pnt)
    )
  })
  return xy
}


function ChangeView({ center }) {
  const map = useMap()
  map.setView(center)
  return null
}

const Map = (props) => {
  const [center, setCenter] = useState([0, 0])
  const [boundary, setBoundary] = useState([])
  const [turbines, setTurbines] = useState([])

  useEffect(()=>{
    if (props.center){
      setCenter([props.center.lat, props.center.lng])
    }
    if (props.boundary){
      setBoundary(props.boundary)
    }
    if (props.turbines){
      setTurbines(props.turbines)
    }
  },[props])

  useEffect(() => {
    if (!props.turbines){return}
    const xy = latLngtoXY(props.turbines.positions)
    props.callbacks.setTurbinexy(xy)
  }, [props.turbines])

  return (
    <MapContainer center={center} zoom={9} style={{"height":"100%", "width":"100%"}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={center}/>
      <Boundary {...boundary}/>
      <Turbines {...turbines} callbacks={props.callbacks}/>
    </MapContainer>
  )
}

Map.defaultProps = {
}

Map.propTypes = FarmPropTypes.Map

export {Map}