import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'

import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils'

function TurbineArray(props){

  const ref = useRef()

  // const get = useThree((state) => state.get)
  const {scene} = useThree()
  console.log(scene)

  // use name to find rotor at the moment...not ideal!!!
  // TODO: do this better!!!
  useEffect(() => {
    const model = props.modelRef.current
    console.log(model.children.length)
    console.log(model.children)
    var rotorGeometries = []
    var newGeometries = []
    model.children.map(meshOrGroup => {
      console.log(meshOrGroup.name, meshOrGroup)
      if (meshOrGroup.name === "rotor"){
        meshOrGroup.children.forEach(rotorPart => {
          if (rotorPart.isGroup){
            console.log("rotor group")
            console.log(rotorPart.children.length)
            console.log(rotorPart.children)
            rotorPart.children.forEach(blade => {
              console.log("adding rotor mesh")
              rotorGeometries.push(blade.clone())
            })
          } else {
            rotorGeometries.push(rotorPart.clone())
          }
        })
      } else if (meshOrGroup.isGroup){
        meshOrGroup.children.map(mesh => {
          newGeometries.push(mesh.clone())
        })
      } else {
        newGeometries.push(meshOrGroup.clone())
      }
    })
    console.log(rotorGeometries)
    console.log(newGeometries)
  }, [scene.children.length])

  return (
    <group ref={ref}>
      {/* {
        elements.map((elementData, i) =>
          <Cylinder
            key={i}
            {...elementData}
            callbacks={props.callbacks}
          />
        )
      } */}
    </group>
  )
}


TurbineArray.propTypes = {
  modelRef: PropTypes.any.isRequired
}

export {TurbineArray}