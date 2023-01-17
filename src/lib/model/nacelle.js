import React, {useRef, useState, useEffect} from 'react'
import * as THREE from 'three'

import * as ModelPropTypes from './../proptypes/model'
import {nodeDistance} from './../geometry/vectors'
import {createBoxWithRoundedEdges} from './../geometry/box'

function Nacelle(props){
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [geom, setGeom] = useState(new THREE.BufferGeometry())
  const defaultColor = 0xadadad

  useEffect(() => {
    if (!props.element) {return}
    const length = nodeDistance(props.element.nodes[0], props.element.nodes[1])
    const numSegments = 8
    setGeom(createBoxWithRoundedEdges(length, props.element.height, props.element.width, length / 10., numSegments))
    // TODO: handle orientation!
    mesh.current.position.x = props.element.nodes[0].x - length / 2
    mesh.current.position.y = props.element.nodes[0].y
    mesh.current.position.z = props.element.nodes[0].z
  }, [props.element])

  return (
    <mesh
      ref={mesh}
      name={props.name}
      onClick={() => setActive(!active)}
      castShadow={true}
      receiveShadow={true}
      geometry={geom}
      onPointerOver={() => {
          setHover(true)
          props.callbacks.tooltip({tooltip: {text: props.name, display: 'block'}})
      }}
      onPointerOut={() => {
          setHover(false)
          props.callbacks.tooltip({tooltip: {text: "", display: 'none'}})
      }}
    >
      <meshPhongMaterial opacity={1.0} transparent={false} color={hovered ? 'red' : defaultColor} />
    </mesh>
  )
}


Nacelle.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  ...ModelPropTypes.Nacelle.isRequired
}

export {Nacelle}