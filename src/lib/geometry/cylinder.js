import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

import * as ModelPropTypes from './../proptypes/model'
import * as ResultPropTypes from './../proptypes/results'
import { nodeVector, nodeDistance } from '../geometry/vectors'
import { GradientPhongMaterial } from './gradientphong'

extend({GradientPhongMaterial})

function Cylinder(props){
  // This reference will give us direct access to the mesh
  const ref = useRef()
  const [results, setResults] = useState([])
  const [color1, setColor1] = useState(props.defaultColor)
  const [color2, setColor2] = useState(props.defaultColor)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [diameters, setDiameters] = useState([0, 0])
  const [length, setLength] = useState(0)

  const numberOfFaces = 32
  const hoverOpacity = 0.6

  useEffect(()=>{
    setColor1(props.defaultColor)
    setColor2(props.defaultColor)
  }, [props.defaultColor])

  useEffect(()=>{
    if (!props.results){return}
    if (props.results.length < 2){
      setColor1(props.results[0].color)
      setColor2(props.results[0].color)
    } else {
      setColor1(props.results[0].color)
      setColor2(props.results[1].color)
    }
    setResults(props.results)
  }, [props.results])

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
        props.callbacks.tooltipStyle({display: 'block'})
        props.callbacks.tooltipContents(()=>{
          const el = ["element: " + props.id]
          const res = []
          if (results.length > 0){
            res.push("results: " + results.map(result => result.value.toExponential(3).toString()).join(", "))
          }
          return el.concat(res)
        })
      }}
      onPointerOut={() => {
        setHover(false)
        props.callbacks.tooltipStyle({display: 'none'})
        props.callbacks.tooltipContents([])
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

Cylinder.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  defaultColor: PropTypes.string,
  results: PropTypes.arrayOf(ResultPropTypes.Result),
  ...ModelPropTypes.Element
}

export {Cylinder}