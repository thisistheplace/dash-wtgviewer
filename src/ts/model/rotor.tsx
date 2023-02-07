import React, {useRef, useEffect, useState} from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import * as ModelPropTypes from './../proptypes/model'
import { Blades } from './blades'
import { Hub } from './hub'
import { nodeVector } from '../geometry/vectors'

type RotorProps = {
  callbacks: ModelPropTypes.Callbacks
} & ModelPropTypes.Rotor

const Rotor = (props: RotorProps) => {
  const ref = useRef()
  const [axis, setAxis] = useState({x:0, y:0, z:0})

  useEffect(() => {
    if (!props.hub) { return }
    setAxis(
      nodeVector(props.hub.cone.nodes[0], props.hub.cone.nodes[1])
    )
  }, [props.hub])

  useEffect(() => {
    if (!props.node || !ref.current) { return }
    const group:THREE.Group = ref.current
    group.position.x = props.node.x
    group.position.y = props.node.y
    group.position.z = props.node.z
  }, [props.node])

  useFrame(() => {
    if (ref.current){
      const group:THREE.Group = ref.current
      group.rotation.x -= 0.01
    }
  })

  return (
    <group ref={ref} name={props.name}>
      <Blades blades={props.blades} callbacks={props.callbacks} axis={axis}/>
      <Hub {...props.hub} callbacks={props.callbacks}/>
    </group>
  )

}

export { Rotor }