import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'
import * as THREE from 'three'

import { nodeVector, nodeDistance } from '../geometry/vectors'

function Cylinder(props){
  console.log("cylinder", props)
  // This reference will give us direct access to the mesh
  const ref = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [diameters, setDiameters] = useState([0, 0])
  const [length, setLength] = useState(0)
  const defaultColor = 0xadadad

  const numberOfFaces = 32
  const hoverOpacity = 0.8

  useEffect(() => {
    if (!ref.current) {return}
    // Store updated values
    setLength(nodeDistance(props.nodes[0], props.nodes[1]))
    setDiameters(props.diameters)
    const axis = nodeVector(props.nodes[0], props.nodes[1])
    var quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(
      new THREE.Vector3(0, -1, 0).normalize(),
      axis.normalize()
    )
    ref.current.rotation.setFromQuaternion(quaternion)
    // Position correctly
    ref.current.position.x = props.nodes[0].x
    ref.current.position.y = props.nodes[0].y
    ref.current.position.z = props.nodes[0].z
  }, [props.nodes])

  return (
    <mesh
      ref={ref}
      castShadow={true}
      receiveShadow={true}
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
      <cylinderGeometry args={[diameters[0], diameters[1], length, numberOfFaces, 1]}/>
      <meshPhongMaterial
        opacity={hoverOpacity}
        color={hovered ? 'red' : defaultColor}
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

export {Cylinder}