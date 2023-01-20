import React, {useRef, useEffect, useState} from 'react'
import { useFrame } from '@react-three/fiber'

import * as ModelPropTypes from './../proptypes/model'
import { Blades } from './blades'
import { Hub } from './hub'
import { nodeVector } from '../geometry/vectors'

const Rotor = (props) => {
  const ref = useRef()
  const [axis, setAxis] = useState({x:0, y:0, z:0})

  useEffect(() => {
    if (!props.hub) { return }
    setAxis(
      nodeVector(props.hub.cone.nodes[0], props.hub.cone.nodes[1])
    )
  }, [props.hub])

  useEffect(() => {
    if (!props.node) { return }
    ref.current.position.x = props.node.x
    ref.current.position.y = props.node.y
    ref.current.position.z = props.node.z
  }, [props.node])

  useFrame(() => (ref.current.rotation.x += 0.01))

  return (
    <group ref={ref} name={props.name}>
      <Blades blades={props.blades} callbacks={props.callbacks} axis={axis}/>
      <Hub {...props.hub} callbacks={props.callbacks}/>
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
  console.log(areEqual)
  return areEqual
}

Rotor.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  ...ModelPropTypes.Rotor.isRequired
}

export default React.memo(Rotor, areEqual)