import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'
import * as THREE from 'three'

import { nodeVector, nodeDistance } from '../geometry/vectors'

// function to build tubulars
function makeCylinder(pointX, pointY) {
  var direction = new THREE.Vector3().subVectors(pointY, pointX)
  var orientation = new THREE.Matrix4()
  orientation.lookAt(pointX, pointY, new THREE.Object3D().up)
  orientation.multiply(new THREE.Matrix4().set(1, 0, 0, 0,
      0, 0, 1, 0,
      0, -1, 0, 0,
      0, 0, 0, 1))
  var position = new THREE.Vector3(
      (pointY.x + pointX.x) / 2,
      (pointY.y + pointX.y) / 2,
      (pointY.z + pointX.z) / 2
  )
  return [direction.length(), position, orientation]
}

function Cylinder(props){
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [orientation] = useState(nodeVector(props.nodes[0], props.nodes[1]))
  const [length] = useState(nodeDistance(props.nodes[0], props.nodes[1]))

  const numberOfFaces = 32
  const hoverOpacity = 0.8

  // useEffect to change mesh orientation on first render
  useEffect(() => {
    // Define orientation
    mesh.current.applyMatrix4(orientation)
    // Position correctly
    mesh.current.position.x = props.nodes[0].x
    mesh.current.position.y = props.nodes[0].y
    mesh.current.position.z = props.nodes[0].z
    mesh.current.castShadow = true
    mesh.current.receiveShadow = true
  }, [])

  return (
    <mesh
      ref={mesh}
      onClick={(event) => {
        // Only the mesh closest to the camera will be processed
        event.stopPropagation()
        setActive(!active)
        if (active){
          props.parent.props.setProps({active_cmpt: props.id})
        }
      }}
      onPointerOver={(event) => {
        // Only the mesh closest to the camera will be processed
        event.stopPropagation()
        props.parent.setState({mouse: {x: event.clientX, y: event.clientY}})
        setHover(true)
        var result_value = Math.format(props.parent.props.values[props.id], {notation: "engineering"})
        props.parent.setState({tooltip: {text: props.id, display: 'block'}, value: `Value: ${result_value}`})
      }}
      onPointerOut={(event) => {
        // Only the mesh closest to the camera will be processed
        event.stopPropagation()
        setHover(false)
        props.parent.setState({tooltip: {text: "", display: 'none'}, value: ""})
    }}
    >
      <cylinderGeometry args={[props.diameters[0], props.diameters[1], length, numberOfFaces, 1]}/>
      <meshPhongMaterial
        opacity={hovered ? hoverOpacity : 1.0}
        transparent={false}
      />
    </mesh>
  )
}

Cylinder.propTypes = {
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
  diameters: PropTypes.arrayOf(PropTypes.number),
  thicknesses: PropTypes.arrayOf(PropTypes.number),
  parent: PropTypes.any
}

export {Cylinder, makeCylinder}