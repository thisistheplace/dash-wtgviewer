import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'
import * as THREE from 'three'

import {nodeDistance} from './../geometry/vectors'

function createBoxWithRoundedEdges( width, height, depth, radius0, smoothness ) {
  // Pinched from here: https://discourse.threejs.org/t/round-edged-box/1402
  const shape = new THREE.Shape()
  const eps = 0.00001
  const radius = radius0 - eps
  shape.absarc( eps, eps, eps, -Math.PI / 2, -Math.PI, true )
  shape.absarc( eps, height -  radius * 2, eps, Math.PI, Math.PI / 2, true )
  shape.absarc( width - radius * 2, height -  radius * 2, eps, Math.PI / 2, 0, true )
  shape.absarc( width - radius * 2, eps, eps, 0, -Math.PI / 2, true )
  const geometry = new THREE.ExtrudeBufferGeometry( shape, {
    amount: depth - radius0 * 2,
    bevelEnabled: true,
    bevelSegments: smoothness * 2,
    steps: 1,
    bevelSize: radius,
    bevelThickness: radius0,
    curveSegments: smoothness
  })
  
  geometry.center()
  
  return geometry
}

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
      onClick={() => setActive(!active)}
      castShadow={true}
      receiveShadow={true}
      geometry={geom}
      onPointerOver={() => {
          setHover(true)
          props.parent.setState({tooltip: {text: props.name, display: 'block'}})
      }}
      onPointerOut={() => {
          setHover(false)
          props.parent.setState({tooltip: {text: "", display: 'none'}})
      }}
    >
      <meshPhongMaterial opacity={1.0} transparent={false} color={hovered ? 'red' : defaultColor} />
    </mesh>
  )
}


Nacelle.propTypes = {
  parent: PropTypes.any,
  name: PropTypes.string,
  id: PropTypes.string,
  element: PropTypes.shape({
    id: PropTypes.number,
    eltype: PropTypes.string,
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number,
        z: PropTypes.number
      })
    ),
    width: PropTypes.number,
    height: PropTypes.number
  })
}

export {Nacelle}