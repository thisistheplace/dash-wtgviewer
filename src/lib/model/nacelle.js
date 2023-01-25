import React, {useRef} from 'react'

import * as ModelPropTypes from './../proptypes/model'
import {Box} from './../geometry/box'

function Nacelle(props){
  const ref = useRef()

  return (
    <group ref={ref} name={props.name}>
      <Box
        {...props.element}
        id={props.name}
        callbacks={props.callbacks}
      />
    </group>
  )
}

function areEqual(prevProps, nextProps){
  var areEqual = true
  Object.keys(prevProps).forEach(function(key){
    if (prevProps[key] !== nextProps[key] && key !== "callbacks"){
      areEqual = false
    }
  })
  return areEqual
}

Nacelle.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  ...ModelPropTypes.Nacelle.isRequired
}

// export default React.memo(Nacelle, areEqual)
export default Nacelle