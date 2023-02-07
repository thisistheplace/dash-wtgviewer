import React, {useRef, useState, useEffect} from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { setInstanceArray, findModelParts } from './array'
import {mergeBufferGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils'

const ROTATION_INCREMENT = -0.01
const ROTOR_NAME = "rotor"
const BLADES_NAME = "blades"

type BladesArrayProps = {
  modelRef: any,
  visible: boolean,
  combine: boolean,
  positions: {
    x: number,
    y: number
  }[],
  currentTurbine: number,
  color: string
}

const BladesArray = (props: BladesArrayProps) => {
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
    if (!ref.current){return}
    
    // Rotate rotor
    const mesh:THREE.InstancedMesh = ref.current
    mesh.geometry.rotateX(ROTATION_INCREMENT)

    // Build array from initial model
    if (combine) {
      const model = props.modelRef.current

      // check model parts exist
      const inScene = model.children.map(meshOrGroup => meshOrGroup.name)
      if (!inScene.includes(ROTOR_NAME)){ return }
      const rotorGroup = model.children.filter(meshOrGroup => {return meshOrGroup.name === ROTOR_NAME})
      if (!(rotorGroup[0].children.length > 0)){ return }
      const bladeGroup = rotorGroup[0].children.filter(meshOrGroup => {return meshOrGroup.name === BLADES_NAME})
      if (bladeGroup[0].children.length < 3){ return }

      // set rotor transformation
      setRotorTranslation(
        new THREE.Vector3(rotorGroup[0].position.x, rotorGroup[0].position.y, rotorGroup[0].position.z)
      )
      
      // get correct geometries and combine into a single geometry
      const geometries = findModelParts(model, BLADES_NAME)
      const buffer = mergeBufferGeometries(geometries)
      console.log(buffer)
      if (!buffer.attributes.normal || !buffer.attributes.position || !buffer.attributes.uv){return}
      // check if geometries are NaNs
      if (isNaN(buffer.attributes.normal[0])){return}
      if (isNaN(buffer.attributes.position[0])){return}
      if (isNaN(buffer.attributes.uv[0])){return}
      
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

export {BladesArray}