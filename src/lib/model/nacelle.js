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

Nacelle.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  ...ModelPropTypes.Nacelle.isRequired
}

export {Nacelle}