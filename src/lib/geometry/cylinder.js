import React, {useRef, useState, useEffect} from 'react'
import * as THREE from 'three'

import * as ModelPropTypes from './../proptypes/model'
import { nodeVector, nodeDistance } from '../geometry/vectors'

function Cylinder(props){
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
    if (props.diameters){
      setDiameters(props.diameters)
    } else {
      setDiameters([props.diameter, props.diameter])
    }
    // Set orientation
    const axis = nodeVector(props.nodes[0], props.nodes[1])
    var quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(
      new THREE.Vector3(0, -1, 0).normalize(),
      axis.normalize()
    )
    ref.current.rotation.setFromQuaternion(quaternion)
    // Position correctly (this sets the center of the bounding box...!!!)
    ref.current.position.x = (props.nodes[0].x + props.nodes[1].x) / 2
    ref.current.position.y = (props.nodes[0].y + props.nodes[1].y) / 2
    ref.current.position.z = (props.nodes[0].z + props.nodes[1].z) / 2
  }, [props.nodes])

  return (
    <mesh
      ref={ref}
      castShadow={true}
      receiveShadow={true}
      onClick={() => setActive(!active)}
      onPointerOver={() => {
        setHover(true)
        props.callbacks.tooltip({tooltip: {text: props.id, display: 'block'}})
      }}
      onPointerOut={() => {
        setHover(false)
        props.callbacks.tooltip({tooltip: {text: "", display: 'none'}})
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
  callbacks: ModelPropTypes.Callbacks,
  ...ModelPropTypes.Element
}

export {Cylinder}