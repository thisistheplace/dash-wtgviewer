import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'

import {nodeDistance} from './../geometry/vectors'

function Cuboid(props){
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [length] = useState(nodeDistance(props.nodes[0], props.nodes[1]))
  // useEffect to change mesh orientation on first render
  useEffect(() => {
    // Position correctly
    mesh.current.position.x = props.nodes[0].x
    mesh.current.position.y = props.nodes[0].y
    mesh.current.position.z = props.nodes[0].z
    mesh.current.castShadow = true
    mesh.current.receiveShadow = true
  }, [])
  // Return view, these are regular three.js elements expressed in JSX
  const defaultColor = 0xadadad
  return (
    <mesh
      ref={mesh}
      onClick={() => setActive(!active)}
      onPointerOver={() => {
          setHover(true)
          props.parent.setState({tooltip: {text: props.id, display: 'block'}})
      }}
      onPointerOut={() => {
          setHover(false)
          props.parent.setState({tooltip: {text: "", display: 'none'}})
      }}
    >
      <boxGeometry args={[props.width, length, props.height]}/>
      <meshPhongMaterial opacity={1.0} transparent={false} color={hovered ? 'red' : defaultColor} />
    </mesh>
  )
}

Cuboid.propTypes = {
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
  height: PropTypes.number,
  parent: PropTypes.any
}

export {Cuboid}