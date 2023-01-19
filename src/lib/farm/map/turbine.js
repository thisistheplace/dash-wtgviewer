import React, {useEffect, useRef, useState, useMemo} from 'react'
import { Circle, Popup } from 'react-leaflet'
import * as FarmPropTypes from './../../proptypes/farm'

const Turbine = (props) => {

  const ref = useRef()
  const [position, setPosition] = useState(props)

  const eventHandlers = useMemo(
    () => ({
      mouseover() {
        if (ref) {ref.current.openPopup()}
      },
      mouseout() {
        if (ref) {ref.current.closePopup()}
      },
      click() {
        console.log("setting", props.callbacks)
        if (ref) {props.callbacks.setMapVisible(false)}
      }
    }),
    []
  )

  useEffect(()=>{
    if (!props) {return}
    setPosition(props)
  }, [props])

  return (
    <Circle ref={ref} center={[position.lat, position.lng]} radius={10} eventHandlers={eventHandlers}>
      <Popup>
        {position.id}
      </Popup>
    </Circle>
  )
}

Turbine.defaultProps = {
}

Turbine.propTypes = FarmPropTypes.LatLng

export {Turbine}