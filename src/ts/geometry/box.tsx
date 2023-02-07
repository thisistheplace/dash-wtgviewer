import React, {useRef, useState, useEffect} from 'react'
import * as THREE from 'three'

import * as ModelPropTypes from './../proptypes/model'
import { nodeDistance } from '../geometry/vectors'
import { nodeVector } from '../geometry/vectors'

type BoxProps = {
  callbacks: ModelPropTypes.Callbacks,
  color: string,
  smoothness: number
} & ModelPropTypes.Element

const Box = (props: BoxProps) => {
  const ref = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [geometry, setGeometry] = useState(new THREE.BufferGeometry())
  const hoverOpacity = 0.8

  useEffect(() => {
    if (!ref.current) {return}
    const length = nodeDistance(props.nodes[0], props.nodes[1])

    // Pinched from here: https://discourse.threejs.org/t/round-edged-box/1402
    const shape = new THREE.Shape()
    const eps = 0.00001
    const radius0 = length / 10
    const radius = radius0 - eps
    shape.absarc( eps, eps, eps, -Math.PI / 2, -Math.PI, true )
    shape.absarc( eps, length -  radius * 2, eps, Math.PI, Math.PI / 2, true )
    shape.absarc( props.width - radius * 2, length -  radius * 2, eps, Math.PI / 2, 0, true )
    shape.absarc( props.width - radius * 2, eps, eps, 0, -Math.PI / 2, true )
    const geometry = new THREE.ExtrudeGeometry( shape, {
      depth: props.height - radius0 * 2,
      bevelEnabled: true,
      bevelSegments: props.smoothness,
      steps: 1,
      bevelSize: radius,
      bevelThickness: radius0,
      curveSegments: props.smoothness
    })
    geometry.center()
    setGeometry(geometry)

    // Set orientation
    const axis = nodeVector(props.nodes[0], props.nodes[1])
    var quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(
      new THREE.Vector3(0, -1, 0).normalize(),
      axis.normalize()
    )
    ref.current.rotation.setFromQuaternion(quaternion)

    // Set position
    ref.current.position.x = props.nodes[0].x - length / 2
    ref.current.position.y = props.nodes[0].y
    ref.current.position.z = props.nodes[0].z
  }, [props.height, props.width, props.nodes, props.smoothness])
  
  return (
    <mesh
      ref={ref}
      geometry={geometry}
      castShadow={false}
      receiveShadow={false}
      onClick={() => setActive(!active)}
      onPointerOver={() => {
        setHover(true)
        props.callbacks.tooltipStyle({display: 'block'})
        props.callbacks.tooltipContents([props.id])
      }}
      onPointerOut={() => {
        setHover(false)
        props.callbacks.tooltipStyle({display: 'none'})
        props.callbacks.tooltipContents([])
      }}
    >
      <meshPhongMaterial
        opacity={hoverOpacity}
        color={hovered ? 'red' : props.color}
        transparent={false}
      />
    </mesh>
  )
}

Box.defaultProps = {
  color: "#ADADAD"
}

export {Box}