import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

import * as ModelPropTypes from './../proptypes/model'
import { nodeVector, nodeDistance } from '../geometry/vectors'
import { GradientPhongMaterial } from './gradientphong'

extend({GradientPhongMaterial})

const DEFAULT_COLOR = "#ADADAD"

function Cylinder(props){
  // This reference will give us direct access to the mesh
  const ref = useRef()
  const [color1, setColor1] = useState(DEFAULT_COLOR)
  const [color2, setColor2] = useState(DEFAULT_COLOR)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [diameters, setDiameters] = useState([0, 0])
  const [length, setLength] = useState(0)

  const numberOfFaces = 32
  const hoverOpacity = 0.6

  useEffect(()=>{
    if (!props.colors){return}
    if (props.colors.length < 2){
      setColor1(props.colors[0])
      setColor2(props.colors[0])
    } else {
      setColor1(props.colors[0])
      setColor2(props.colors[1])
    }
  }, [props.colors])

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
  }, [props.nodes, props.diameter])

  return (
    <mesh
      ref={ref}
      castShadow={false}
      receiveShadow={false}
      onClick={() => setActive(!active)}
      onPointerOver={() => {
        setHover(true)
        props.callbacks.tooltip({text: "element: " + props.id, display: 'block'})
      }}
      onPointerOut={() => {
        setHover(false)
        props.callbacks.tooltip({text: "", display: 'none'})
      }}
    >
      <cylinderGeometry args={[diameters[0] / 2, diameters[1] / 2, length, numberOfFaces, 1]}/>
      <gradientPhongMaterial attach="material" args={[
        hovered ? "red" : color1,
        hovered ? "red" : color2,
        hovered ? hoverOpacity : 1.0
      ]}/>
    </mesh>
  )
}

Cylinder.defaultProps = {
  colors: [DEFAULT_COLOR, DEFAULT_COLOR]
}

Cylinder.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  colors: PropTypes.arrayOf(PropTypes.string),
  ...ModelPropTypes.Element
}

export {Cylinder}