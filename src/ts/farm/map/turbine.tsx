import React, {useEffect, useRef, useState, useMemo} from 'react'
import { Circle, Popup } from 'react-leaflet'
import * as FarmPropTypes from './../../proptypes/farm'

type TurbineProps = {
  index: number,
} & FarmPropTypes.Turbine

const Turbine = (props: TurbineProps) => {
  const ref = useRef()
  const [position, setPosition] = useState(props.position)

  const eventHandlers = useMemo(
    () => ({
      mouseover() {
        if (ref) {ref.current.openPopup()}
      },
      mouseout() {
        if (ref) {ref.current.closePopup()}
      },
      click() {
        if (ref) {
          props.callbacks.setCurrentTurbine(props.index)
          props.callbacks.setMapVisible(false)
        }
      }
    }),
    []
  )

  useEffect(()=>{
    if (!props.position || !ref.current) {return}
    setPosition(props.position)
  }, [props.position])

  return (
    <Circle ref={ref} center={[position.lat, position.lng]} radius={200} eventHandlers={eventHandlers}>
      <Popup className='request-popup'>
        <div className='map-tooltip'>
          {position.id}
        </div>
      </Popup>
    </Circle>
  )
}

Turbine.defaultProps = {
}

export {Turbine}