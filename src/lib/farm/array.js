import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect, createRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import {mergeBufferGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils'
import {SimplifyModifier} from 'three/examples/jsm/modifiers/SimplifyModifier'

const TurbineArray = (props) => {
  const ref = useRef()
  const rotorRef = createRef()
  const structureRef = createRef()
  const nacelleRef = createRef()
  const [rotors, setRotors] = useState(new THREE.BufferGeometry())
  const [structures, setStructures] = useState(new THREE.BufferGeometry())
  const [nacelle, setNacelle] = useState(new THREE.BufferGeometry())
  const [combine, setCombine] = useState(true)
  const temp = new THREE.Object3D()
  var count = 200

  useEffect(() => {
    if (!structureRef.current || !rotorRef.current || !nacelleRef.current){return}
    // Set positions
    for (let i = 0; i < count; i++) {
      temp.position.set(Math.random() * 100, Math.random() * 100, Math.random())
      temp.updateMatrix()
      rotorRef.current.setMatrixAt(i, temp.matrix)
      structureRef.current.setMatrixAt(i, temp.matrix)
      nacelleRef.current.setMatrixAt(i, temp.matrix)
    }
    // Update the instance
    rotorRef.current.instanceMatrix.needsUpdate = true
    structureRef.current.instanceMatrix.needsUpdate = true
    nacelleRef.current.instanceMatrix.needsUpdate = true
  }, [])

  // use name to find rotor at the moment...not ideal!!!
  // TODO: do this better!!!
  useFrame(() => {
    if (combine) {
      const model = props.modelRef.current
      var rotorGeometries = []
      var structureGeometries = []
      var nacelleGeometry = null
      model.children.map(meshOrGroup => {
        if (meshOrGroup.name === "rotor"){
          meshOrGroup.children.forEach(rotorPart => {
            if (rotorPart.isGroup){
              rotorPart.children.forEach(blade => {
                var bladeGeom = blade.geometry.clone()
                // const modifier = new SimplifyModifier()
                // const numVertex = 0.6
                // const count = Math.floor( bladeGeom.attributes.position.count * numVertex ) // number of vertices to remove
					      // bladeGeom = modifier.modify( bladeGeom, count );
                bladeGeom.applyQuaternion(blade.quaternion)
                bladeGeom.translate(blade.position.x, blade.position.y, blade.position.z)
                bladeGeom.applyQuaternion(meshOrGroup.quaternion)
                bladeGeom.translate(meshOrGroup.position.x, meshOrGroup.position.y, meshOrGroup.position.z)
                rotorGeometries.push(bladeGeom)
              })
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
      if (rotorGeometries.length > 2){
        // Combine rotor geometries
        console.log(rotorGeometries)
        const rotorBuffer = mergeBufferGeometries(rotorGeometries)
        setRotors(rotorBuffer)
        console.log(rotorBuffer)
        console.log(structureGeometries)
        console.log(props.modelRef.current.children)
        const structureBuffer = mergeBufferGeometries(structureGeometries)
        setStructures(structureBuffer)
        console.log(structureBuffer)
        setNacelle(nacelleGeometry)
        setCombine(false)
      }
    }
    // ref.current.rotation.x += 0.01
  })

  return (
    <group ref={ref}>
      <instancedMesh ref={rotorRef} args={[null, null, count]} geometry={rotors} castShadow={false}>
        <meshPhongMaterial />
      </instancedMesh>
      <instancedMesh ref={structureRef} args={[null, null, count]} geometry={structures} castShadow={false}>
        <meshPhongMaterial />
      </instancedMesh>
      <instancedMesh ref={nacelleRef} args={[null, null, count]} geometry={nacelle} castShadow={false}>
        <meshPhongMaterial />
      </instancedMesh>
    </group>
  )
}


TurbineArray.propTypes = {
  modelRef: PropTypes.any.isRequired
}

export {TurbineArray}