import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'
import {useFrame} from '@react-three/fiber'

function Blade(props){
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // useEffect to change mesh orientation on first render
  useEffect(() => {
    // Runs only on the first render
    // Define orientation
    mesh.current.applyMatrix4(props.orient)
    mesh.current.position.x = props.pos.x
    mesh.current.position.y = props.pos.y
    mesh.current.position.z = props.pos.z
    mesh.current.castShadow = true
    mesh.current.receiveShadow = true
  }, [])
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      ref={mesh}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => {
        setHover(true)
        props.parent.setState({tooltip: {text: props.cmpt_str, display: 'block'}})
      }}
      onPointerOut={(event) => {
        setHover(false)
        props.parent.setState({tooltip: {text: "", display: 'none'}})
    }}
    >
      <cylinderGeometry args={[props.radius1, props.radius2, props.len, 32, 1]}/>
      <meshPhongMaterial opacity={1.0} transparent={false} color={hovered ? 'red' : 0xadadad} />
    </mesh>
  )
}

function Blades(props){
    const group = useRef()
    const [rotation] = useState(Math.PI * 2 / props.blades.length)

    useEffect(() => {
      group.current.position.x = props.pos[0]
      group.current.position.y = props.pos[1]
      group.current.position.z = props.pos[2]
      group.current.castShadow = true
      group.current.receiveShadow = true
    }, [])
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame(() => (group.current.rotation.y += 0.01))
  
    // create blades
    const blades = []
    props.blades.forEach(bladeData => {
      blades.push(
        <Blade {...bladeData} parent={props.parent} rotation={rotation}/>
      )
    })
  
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <group ref={group}>
          {blades}
      </group>
    )
  }

Blade.propTypes = {
  parent: PropTypes.any,
  name: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
  node: PropTypes.shape({
      id: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number
  }),
  rotation: PropTypes.number
}

Blades.propTypes = {
  parent: PropTypes.any,
  blades: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      url: PropTypes.string,
      node: PropTypes.shape({
          id: PropTypes.number,
          x: PropTypes.number,
          y: PropTypes.number,
          z: PropTypes.number
      })
    })
  )
}

export {Blade, Blades}