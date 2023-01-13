import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'
import { useGLTF } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'
extend({THREE})


const Blade = (props) => {
  const ref = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const gltf = useGLTF(props.url)
  // gltf.scene.children[0].rotation.set(0, 0, 0)
  console.log("loaded", gltf)
  const defaultColor = 0xadadad

  useEffect(() => {
    if (!ref.current) { return }
    if (!props.node) { return }

    const axis = new THREE.Vector3(props.axis.x, props.axis.y, props.axis.z)
    var quaternion = new THREE.Quaternion()
    quaternion.setFromAxisAngle(
      axis.normalize(),
      props.rotation
    )
    ref.current.rotation.setFromQuaternion(quaternion)

    ref.current.scale.set(
      props.scale.x,
      props.scale.y,
      props.scale.z
    )

    // ref.current.position.x = props.node.x
    // ref.current.position.y = props.node.y
    // ref.current.position.z = props.node.z
  }, [props])
  
  return (
    <mesh
      ref={ref}
      geometry={gltf.scene.children[0].geometry}
      name={props.name}
      castShadow={true}
      receiveShadow={true}
      onClick={() => setActive(!active)}
      onPointerOver={() => {
        setHover(true)
        props.parent.setState({tooltip: {text: props.name, display: 'block'}})
      }}
      onPointerOut={() => {
        setHover(false)
        props.parent.setState({tooltip: {text: "", display: 'none'}})
      }}
    >
      <meshPhongMaterial opacity={1.0} transparent={false} color={hovered ? 'red' : defaultColor} />
    </mesh>
  )
}

function Blades(props){
    const ref = useRef()
    const [blades, setBlades] = useState([])
    const [rotation, setRotation] = useState(0)

    useEffect(() => {
      if (!props.blades) { return }
      setBlades(props.blades)
      // setRotation(Math.PI * 2 / props.blades.length)
      setRotation(0)
    }, [props.blades])
  
    return (
      <group ref={ref}>
        {
          blades.map((bladeData, i) =>
            <Blade
              key={i}
              {...bladeData}
              parent={props.parent}
              rotation={rotation * (i + 1)}
              axis={props.axis}
            />
          )
        }
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
  scale: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  }),
  rotation: PropTypes.number,
  axis: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  })
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
      }),
      scale: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        z: PropTypes.number
      })
    })
  ),
  axis: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  })
}

export {Blade, Blades}