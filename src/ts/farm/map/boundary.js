import React, {useState, useEffect} from 'react'
import { Polygon } from 'react-leaflet'
import * as FarmPropTypes from './../../proptypes/farm'

const Boundary = (props) => {

  const [points, setPoints] = useState([])

  useEffect(()=>{
    if (!props.positions) {return}
    const newPoints = []
    props.positions.forEach((position) => {
      newPoints.push(
        [
          position.lat,
          position.lng
        ]
      )
    })
    setPoints(newPoints)
  }, [props])

  return (
    <Polygon positions={points} pathOptions={{color: "purple"}}/>
  )
}

Boundary.defaultProps = {
  positions: []
}

Boundary.propTypes = FarmPropTypes.Boundary

export {Boundary}