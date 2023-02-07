import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import {mergeBufferGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils'

// Assumes each named object is a group with children meshes (not nested groups)
const findModelParts = (model, name) => {
  var geometries = []
  model.children.map(meshOrGroup => {
    if (meshOrGroup.name === name){
      meshOrGroup.children.map(mesh => {
        var geom = mesh.geometry.clone()
        geom.scale(mesh.scale.x, mesh.scale.y, mesh.scale.z)
        geom.applyQuaternion(mesh.quaternion)
        geom.translate(mesh.position.x, mesh.position.y, mesh.position.z)
        // geom.applyQuaternion(meshOrGroup.quaternion)
        // geom.translate(meshOrGroup.position.x, meshOrGroup.position.y, meshOrGroup.position.z)
        geometries.push(geom)
      })
    } else if (meshOrGroup.children.length > 0){
      meshOrGroup.children.map(mesh => {
        if ("isGroup" in mesh){
          geometries.push(...findModelParts(meshOrGroup, name))
        }
      })
    }
  })
  return geometries
}

const setInstanceArray = (ref, positions, exclude, trans=new THREE.Vector3(0, 0, 0)) => {
  const temp = new THREE.Object3D()
  var j = 0
  var indexOffset = 0
  for (let i = 0; i < positions.length; i++) {
    if (i === exclude){
      indexOffset = -1
      continue
    }
    j = i + indexOffset
    const point = positions[i]
    temp.position.set(point.x + trans.x, point.y + trans.y, 0 + trans.z)
    temp.updateMatrix()
    ref.current.setMatrixAt(j, temp.matrix)
  }
  ref.current.instanceMatrix.needsUpdate = true
}

const InstanceArray = (props) => {
  const ref = useRef()
  const [combine, setCombine] = useState(props.combine)
  const [count, setCount] = useState(0)
  const [geometry, setGeometry] = useState(new THREE.BufferGeometry())

  useEffect(() => {
    setCombine(props.combine)
  }, [props.combine, props.name])

  useEffect(() => {
    setCount(Math.max(props.positions.length - 1, 0))
  }, [props.positions])

  useEffect(() => {
    if (!ref.current){return}
    setCount(Math.max(props.positions.length - 1, 0))
    setInstanceArray(ref, props.positions, props.currentTurbine)
  }, [props.currentTurbine, count])

  useFrame(() => {
    // Build array from initial model
    if (combine) {
      const model = props.modelRef.current

      // check model parts exist
      const inScene = model.children.map(meshOrGroup => meshOrGroup.name)
      if (!inScene.includes(props.name)){ return }
      const group = model.children.filter(meshOrGroup => {return meshOrGroup.name === props.name})
      if (!(group[0].children.length > 0)){ return }
      
      // get correct geometries and combine into a single geometry
      const geometries = findModelParts(model, props.name)
      const buffer = mergeBufferGeometries(geometries)
      // console.log(buffer)
      if (!buffer.attributes.normal){return}
      // check if geometries are NaNs
      if (isNaN(buffer.attributes.normal.array[0])){return}

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

InstanceArray.defaultProps = {
  color: 0xadadad
}

InstanceArray.propTypes = {
  modelRef: PropTypes.any.isRequired,
  visible: PropTypes.bool.isRequired,
  combine: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  ).isRequired,
  currentTurbine: PropTypes.number.isRequired,
  color: PropTypes.string
}

export {InstanceArray, findModelParts, setInstanceArray}