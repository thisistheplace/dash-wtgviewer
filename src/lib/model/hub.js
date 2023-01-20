import React, {useRef, useEffect, useState} from 'react'
import * as THREE from 'three'

import * as ModelPropTypes from './../proptypes/model'
import {nodeDistance, nodeVector} from './../geometry/vectors'

const Hub = (props) => {
  const ref = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [geom, setGeom] = useState(new THREE.BufferGeometry())
  const defaultColor = 0xadadad

  useEffect(() => {
    if (!props.cone) { return }
    const distance = nodeDistance(props.cone.nodes[0], props.cone.nodes[1])
    
    // Create lathe geometry
    const points = []
    const numPoints = 10
    const numSegments = 24
    const startAngle = 0
    const endAngle = Math.PI * 2
    const inc = 0.2
    for ( let i = 0; i < numPoints; i ++ ) {
      points.push( new THREE.Vector2( Math.sin( i * inc ) * props.cone.diameter / 2, i * distance / numPoints ) )
    }
    setGeom(
      new THREE.LatheGeometry(points, numSegments, startAngle, endAngle)
    )

    const axis = nodeVector(props.cone.nodes[0], props.cone.nodes[1])
    var quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(
      new THREE.Vector3(0, -1, 0).normalize(),
      axis.normalize()
    )
    ref.current.rotation.setFromQuaternion(quaternion)
    
    ref.current.position.x += props.cone.nodes[1].x - props.cone.nodes[0].x
    ref.current.position.y += props.cone.nodes[1].y - props.cone.nodes[0].y
    ref.current.position.z += props.cone.nodes[1].z - props.cone.nodes[0].z
  }, [props.cone])

  return (
    <mesh
    ref={ref}
    name={props.name}
    onClick={() => setActive(!active)}
    castShadow={true}
    receiveShadow={true}
    geometry={geom}
    onPointerOver={() => {
        setHover(true)
        props.callbacks.tooltip({text: props.name, display: 'block'})
    }}
    onPointerOut={() => {
        setHover(false)
        props.callbacks.tooltip({text: "", display: 'none'})
    }}
  >
    <meshPhongMaterial opacity={1.0} transparent={false} color={hovered ? 'red' : defaultColor} side={THREE.DoubleSide}/>
  </mesh>
  )

}

Hub.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  ...ModelPropTypes.Hub.isRequired
}

export {Hub}