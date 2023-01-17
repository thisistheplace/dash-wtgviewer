import PropTypes from 'prop-types'
import * as ModelPropTypes from './../proptypes/model'
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
  const defaultColor = 0xadadad

  useEffect(() => {
    if (!ref.current) { return }
    if (!props.node) { return }

    // Adjust geometry by axis first
    const axis = new THREE.Vector3(props.axis.x, props.axis.y, props.axis.z)
    var quaternion1 = new THREE.Quaternion()
    quaternion1.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1).normalize(),
      axis.normalize()
    )
    axis.applyQuaternion(quaternion1)

    var quaternion2 = new THREE.Quaternion()
    quaternion2.setFromAxisAngle(
      axis.normalize(),
      props.rotation
    )

    var combined = new THREE.Quaternion()
    combined.multiplyQuaternions(quaternion1, quaternion2)
    ref.current.rotation.setFromQuaternion(combined)

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
        props.callbacks.tooltip({tooltip: {text: props.name, display: 'block'}})
      }}
      onPointerOut={() => {
        setHover(false)
        props.callbacks.tooltip({tooltip: {text: "", display: 'none'}})
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
      setRotation(Math.PI * 2 / props.blades.length)
    }, [props.blades])
  
    return (
      <group ref={ref}>
        {
          blades.map((bladeData, i) =>
            <Blade
              key={i}
              {...bladeData}
              callbacks={props.callbacks}
              rotation={rotation * (i + 1)}
              axis={props.axis}
            />
          )
        }
      </group>
    )
  }

Blade.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  ...ModelPropTypes.Blade
}

Blades.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  blades: PropTypes.arrayOf(
    ModelPropTypes.Blade
  ).isRequired,
  axis: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  }).isRequired
}

export {Blade, Blades}