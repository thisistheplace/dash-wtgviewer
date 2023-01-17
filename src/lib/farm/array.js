import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'


function TurbineArray(props){
  const ref = useRef()
  const geometries = useState([])

  useEffect(() => {
    if (!ref.current | !props.modelRef.current) {return}
    // Find geometries which aren't rotors
    console.log(props.modelRef.current)
  }, [props.modelRef.current])

  return (
    <group ref={ref}>
      {/* {
        elements.map((elementData, i) =>
          <Cylinder
            key={i}
            {...elementData}
            callbacks={props.callbacks}
          />
        )
      } */}
    </group>
  )
}


TurbineArray.propTypes = {
  modelRef: PropTypes.any.isRequired
}

export {TurbineArray}