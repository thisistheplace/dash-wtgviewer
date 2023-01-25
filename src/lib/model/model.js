import PropTypes from 'prop-types'
import React, {forwardRef} from 'react'
import Rotor from './rotor'
import Nacelle from './nacelle'
import Tower from './tower'
import Foundation from './foundation'
import * as ModelPropTypes from './../proptypes/model'

// TODO: should make cylinders instanced meshes with scaling / rotation etc
// TODO: merge buffer geometries to make wind farm
// TODO: add map

// Use memo so we only re-render on props change!
const Model = forwardRef((props, ref) => {
  return (
    <group ref={ref} name={props.name} position={props.position}>
      <Rotor {...props.rotor} callbacks={props.callbacks}/>
      <Nacelle {...props.nacelle} callbacks={props.callbacks}/>
      <Tower {...props.tower} callbacks={props.callbacks}/>
      <Foundation {...props.foundation} callbacks={props.callbacks}/>
    </group>
  )
})

Model.defaultProps = {
  position: [0, 0, 0]
}

Model.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  position: PropTypes.arrayOf(PropTypes.number),
  ...ModelPropTypes.Model
}

export default Model