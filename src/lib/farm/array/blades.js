import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { setInstanceArray, findModelParts } from './array'
import {mergeBufferGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils'

const ROTATION_INCREMENT = -0.01
const ROTOR_NAME = "rotor"
const BLADES_NAME = "blades"

const BladesArray = (props) => {
  const ref = useRef()
  const [combine, setCombine] = useState(props.combine)
  const [count, setCount] = useState(0)
  const [geometry, setGeometry] = useState(new THREE.BufferGeometry())
  const [rotorTranslation, setRotorTranslation] = useState(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    setCombine(props.combine)
  }, [props.combine])

  useEffect(() => {
    setCount(Math.max(props.positions.length - 1, 0))
  }, [props.positions])

  useEffect(() => {
    if (!ref.current){return}
    setCount(Math.max(props.positions.length - 1, 0))
    setInstanceArray(ref, props.positions, props.currentTurbine, rotorTranslation)
  }, [props.currentTurbine, count, rotorTranslation])

  useFrame(() => {
    // Rotate rotor
    ref.current.geometry.rotateX(ROTATION_INCREMENT)

    // Build array from initial model
    if (combine) {
      const model = props.modelRef.current

      // check model parts exist
      const inScene = model.children.map(meshOrGroup => meshOrGroup.name)
      if (!inScene.includes(ROTOR_NAME)){ return }
      const group = model.children.filter(meshOrGroup => {return meshOrGroup.name === ROTOR_NAME})
      if (!(group[0].children.length > 0)){ return }
      const bladeGroup = group[0].children.filter(meshOrGroup => {return meshOrGroup.name === BLADES_NAME})
      if (bladeGroup[0].children.length < 3){ return }

      // set rotor transformation
      setRotorTranslation(
        new THREE.Vector3(group[0].position.x, group[0].position.y, group[0].position.z)
      )
      
      // get correct geometries and combine into a single geometry
      const geometries = findModelParts(model, BLADES_NAME)
      const buffer = mergeBufferGeometries(geometries)
      setGeometry(buffer)
      setCombine(false)
    }
  })

  return (
    <instancedMesh ref={ref} visible={props.visible} args={[null, null, count]} geometry={geometry} castShadow={false} receiveShadow={false}>
      <meshBasicMaterial color={props.color}/>
    </instancedMesh>
  )
}

BladesArray.defaultProps = {
  color: 0xadadad
}

BladesArray.propTypes = {
  modelRef: PropTypes.any.isRequired,
  visible: PropTypes.bool.isRequired,
  combine: PropTypes.bool.isRequired,
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  ).isRequired,
  currentTurbine: PropTypes.number.isRequired,
  color: PropTypes.string
}

export {BladesArray}