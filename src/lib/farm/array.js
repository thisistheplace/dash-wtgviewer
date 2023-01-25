import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect, createRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import {mergeBufferGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils'

import Model from '../model/model'
import * as ModelPropTypes from './../proptypes/model'

const ROTATION_INCREMENT = 0.01

const TurbineArray = (props) => {
  const ref = useRef()
  const modelRef = createRef()
  const rotorRef = createRef()
  const structureRef = createRef()
  const nacelleRef = createRef()
  const [rotors, setRotors] = useState(new THREE.BufferGeometry())
  const [structures, setStructures] = useState(new THREE.BufferGeometry())
  const [nacelle, setNacelle] = useState(new THREE.BufferGeometry())
  const [combine, setCombine] = useState(true)
  const [count, setCount] = useState(0)
  const [rotorTranslation, setRotorTranslation] = useState(new THREE.Vector3(0, 0, 0))
  const temp = new THREE.Object3D()

  useEffect(() => {
    // Set positions
    setCount(Math.max(props.positions.length - 1, 0))
  }, [props.positions])

  useEffect(() => {
    if (!structureRef.current || !rotorRef.current || !nacelleRef.current){return}
    var j = 0
    var indexOffset = 0
    for (let i = 0; i < props.positions.length; i++) {
      if (i === props.currentTurbine){
        indexOffset = -1
        continue
      }
      j = i + indexOffset
      const point = props.positions[i]
      temp.position.set(point.x, point.y, 0)
      temp.updateMatrix()
      structureRef.current.setMatrixAt(j, temp.matrix)
      nacelleRef.current.setMatrixAt(j, temp.matrix)
      // do something special for rotor so we can rotate it!
      temp.position.set(point.x + rotorTranslation.x, point.y + rotorTranslation.y, rotorTranslation.z)
      temp.updateMatrix()
      rotorRef.current.setMatrixAt(j, temp.matrix)
    }
    // Update the instance
    rotorRef.current.instanceMatrix.needsUpdate = true
    structureRef.current.instanceMatrix.needsUpdate = true
    nacelleRef.current.instanceMatrix.needsUpdate = true
  }, [count, props.currentTurbine, rotorTranslation])

  // use name to find rotor at the moment...not ideal!!!
  // TODO: do this better!!!
  useFrame(() => {
    // Rotate the geometry not the mesh, not the most performant
    rotorRef.current.geometry.rotateX(ROTATION_INCREMENT)

    // Build array from initial model
    if (combine) {
      const model = modelRef.current

      // check model parts exist
      const names = ["rotor", "foundation", "tower", "nacelle"]
      const inScene = model.children.map(meshOrGroup => meshOrGroup.name)
      names.forEach(name => {
        if (!inScene.includes(name)){
          return
        }
      })
      
      // Check we've got three blades
      const blades = []
      model.children.map(meshOrGroup => {
        if (meshOrGroup.name === "rotor"){
          meshOrGroup.children.forEach(rotorPart => {
            if (rotorPart.isGroup){
              rotorPart.children.forEach(blade => blades.push(blade))
            }
          })
        }
      })
      if (blades.length < 3){return}

      // Combine geometries
      var rotorGeometries = []
      var structureGeometries = []
      var nacelleGeometry = null
      model.children.map(meshOrGroup => {
        if (meshOrGroup.name === "rotor"){
          meshOrGroup.children.forEach(rotorPart => {
            if (rotorPart.isGroup){
              rotorPart.children.forEach(blade => {
                var bladeGeom = blade.geometry.clone()
                bladeGeom.applyQuaternion(blade.quaternion)
                // bladeGeom.translate(blade.position.x, blade.position.y, blade.position.z)
                bladeGeom.applyQuaternion(meshOrGroup.quaternion)
                // bladeGeom.translate(meshOrGroup.position.x, meshOrGroup.position.y, meshOrGroup.position.z)
                rotorGeometries.push(bladeGeom)
              })
              // Store rotor translation
              setRotorTranslation(
                new THREE.Vector3(meshOrGroup.position.x, meshOrGroup.position.y, meshOrGroup.position.z)
              )
            } else {
              // Currently ignore the hub since it's not compatible with the blades
              // rotorGeometries.push(rotorPart.geometry.clone())
            }
          })
        } else if (meshOrGroup.isGroup){
          meshOrGroup.children.map(mesh => {
            var geom = mesh.geometry.clone()
            geom.applyQuaternion(mesh.quaternion)
            geom.translate(mesh.position.x, mesh.position.y, mesh.position.z)
            structureGeometries.push(geom)
          })
        } else {
          if (meshOrGroup.name === "nacelle"){
            nacelleGeometry = meshOrGroup.geometry.clone()
            nacelleGeometry.applyQuaternion(meshOrGroup.quaternion)
            nacelleGeometry.translate(meshOrGroup.position.x, meshOrGroup.position.y, meshOrGroup.position.z)
          } else {
            var geom = meshOrGroup.geometry.clone()
            geom.applyQuaternion(meshOrGroup.quaternion)
            geom.translate(meshOrGroup.position.x, meshOrGroup.position.y, meshOrGroup.position.z)
            structureGeometries.push(geom)
          }
        }
      })

      // Combine rotor geometries
      const rotorBuffer = mergeBufferGeometries(rotorGeometries)
      setRotors(rotorBuffer)
      const structureBuffer = mergeBufferGeometries(structureGeometries)
      setStructures(structureBuffer)
      setNacelle(nacelleGeometry)
      setCombine(false)
    }
  })

  return (
    <group ref={ref}>
      <Model ref={modelRef} {...props.model} />
      <instancedMesh ref={rotorRef} visible={props.array} args={[null, null, count]} geometry={rotors} castShadow={false} receiveShadow={false}>
        <meshBasicMaterial />
      </instancedMesh>
      <instancedMesh ref={structureRef} visible={props.array} args={[null, null, count]} geometry={structures} castShadow={false} receiveShadow={false}>
        <meshBasicMaterial />
      </instancedMesh>
      <instancedMesh ref={nacelleRef} visible={props.array} args={[null, null, count]} geometry={nacelle} castShadow={false} receiveShadow={false}>
        <meshBasicMaterial />
      </instancedMesh>
    </group>
  )
}

function areEqual(prevProps, nextProps){
  var areEqual = true
  Object.keys(prevProps).forEach(function(key){
    if (prevProps[key] !== nextProps[key]){
      if (key === "model"){
        Object.keys(prevProps.model).forEach(function(modelKey){
          if (prevProps.model[modelKey] !== nextProps.model[modelKey] && modelKey !== "callbacks"){
            areEqual = false
          }
        })
      } else {
        areEqual = false
      }
    }
  })
  return areEqual
}

TurbineArray.propTypes = {
  currentTurbine: PropTypes.number.isRequired,
  array: PropTypes.bool.isRequired,
  model: ModelPropTypes.Model.isRequired,
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  )
}

export default React.memo(TurbineArray, areEqual)