import React, {useRef, useState, useEffect} from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import {mergeBufferGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils'
import { setInstanceArray } from './array'
import { findModelParts } from './array'

type InstanceArrayProps = {
  modelRef: any,
  visible: boolean,
  combine: boolean,
  name: string,
  positions: {
    x: number,
    y: number
  }[],
  currentTurbine: number,
  color: string
}

const InstanceArray = (props: InstanceArrayProps) => {
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
      if (isNaN(buffer.attributes.normal[0])){return}

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

export {InstanceArray}