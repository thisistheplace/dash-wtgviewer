import React, {useRef} from 'react'

import * as ModelPropTypes from './../proptypes/model'
import {Box} from './../geometry/box'

type NacelleProps = {
  callbacks: ModelPropTypes.Callbacks
} & ModelPropTypes.Nacelle

function Nacelle(props: NacelleProps){
  const ref = useRef<THREE.Group>(null!)

  return (
    <group ref={ref} name={props.name}>
      <Box
        {...props.element}
        smoothness={1}
        callbacks={props.callbacks}
      />
    </group>
  )
}

export {Nacelle}